import { useEffect, useState } from "react";
import { useT } from "@/lib/i18n";

const KEY = "lc_consent";
type Gtag = (...args: unknown[]) => void;

/**
 * The head script in __root.tsx detects the visitor's country (Cloudflare /cdn-cgi/trace)
 * and exposes window.__lcAsk: resolves true when consent must be asked (EU, EEA, UK,
 * Switzerland, Brazil, or country unknown) and false elsewhere (analytics already granted).
 */
type WindowWithAsk = Window & { __lcAsk?: Promise<boolean>; gtag?: Gtag };

function setAnalytics(value: "granted" | "denied") {
  (window as WindowWithAsk).gtag?.("consent", "update", { analytics_storage: value });
}

/** Re-open the banner from anywhere (e.g. a footer "Cookie settings" link). */
export function openCookieSettings() {
  window.dispatchEvent(new Event("lc-open-consent"));
}

function save(value: "granted" | "denied") {
  try {
    localStorage.setItem(KEY, value);
  } catch {
    /* storage unavailable: choice applies to this visit only */
  }
  setAnalytics(value);
}

export function CookieBanner() {
  const t = useT();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(KEY);
    } catch {
      /* storage unavailable */
    }
    // A saved choice is already applied by the head script; nothing to ask.
    if (!stored) {
      const ask = (window as WindowWithAsk).__lcAsk;
      if (!ask) setOpen(true);
      else
        ask.then((mustAsk) => {
          if (!cancelled && mustAsk) setOpen(true);
        });
    }
    const reopen = () => setOpen(true);
    window.addEventListener("lc-open-consent", reopen);
    return () => {
      cancelled = true;
      window.removeEventListener("lc-open-consent", reopen);
    };
  }, []);

  if (!open) return null;

  const choose = (value: "granted" | "denied") => {
    save(value);
    setOpen(false);
  };

  return (
    <div
      role="dialog"
      aria-label={t("Cookie settings")}
      className="fixed inset-x-3 bottom-3 z-[100] mx-auto max-w-md rounded-2xl border border-border bg-background p-4 text-sm text-foreground shadow-lg sm:left-4 sm:right-auto sm:mx-0"
    >
      <p className="text-muted-foreground">
        {t("We use analytics cookies to understand how people find this site.")}
      </p>
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={() => choose("granted")}
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          {t("Accept")}
        </button>
        <button
          type="button"
          onClick={() => choose("denied")}
          className="rounded-md border border-input px-4 py-2 text-sm font-medium transition-colors hover:bg-accent"
        >
          {t("Decline")}
        </button>
      </div>
    </div>
  );
}
