import { Link, useRouterState } from "@tanstack/react-router";
import { useCallback, type ComponentProps } from "react";
import { pt } from "@/i18n/pt";
import { es } from "@/i18n/es";
import { PAGE_META, type PagePath } from "@/i18n/meta";

export type Lang = "en" | "pt" | "es";
export const LANGS: Lang[] = ["en", "pt", "es"];
export const BASE_URL = "https://lcbypahal.lovable.app";

const DICT: Record<"pt" | "es", Record<string, string>> = { pt, es };

export const HTML_LANG: Record<Lang, string> = { en: "en", pt: "pt-BR", es: "es" };
const OG_LOCALE: Record<Lang, string> = { en: "en_US", pt: "pt_BR", es: "es_419" };

export function asLang(v: string | undefined): Lang {
  return v === "pt" || v === "es" ? v : "en";
}

export function langFromPath(pathname: string): Lang {
  const seg = pathname.split("/")[1];
  return asLang(seg);
}

/** Remove the /pt or /es prefix, returning the English path. */
export function stripLang(pathname: string): string {
  const lang = langFromPath(pathname);
  if (lang === "en") return pathname || "/";
  const rest = pathname.slice(lang.length + 1);
  return rest === "" ? "/" : rest;
}

/** Build the URL of an English path in the given language. */
export function localePath(lang: Lang, path: string): string {
  if (lang === "en") return path;
  return path === "/" ? `/${lang}` : `/${lang}${path}`;
}

export function useLang(): Lang {
  return useRouterState({ select: (s) => s.location.pathname === "/auth/callback"
    ? asLang(new URLSearchParams(s.location.searchStr).get("lang") ?? undefined)
    : langFromPath(s.location.pathname) });
}

export function translate(lang: Lang, s: string): string {
  if (lang === "en") return s;
  return DICT[lang][s] ?? DICT[lang][s.replace(/\s+/g, " ").trim()] ?? s;
}

export function useT() {
  const lang = useLang();
  return useCallback((s: string) => translate(lang, s), [lang]);
}

export function useLocalePath() {
  const lang = useLang();
  return useCallback((p: string) => localePath(lang, p), [lang]);
}

/** Link that takes an English path and points to the same page in the current language. */
export function LLink({ to, ...rest }: Omit<ComponentProps<typeof Link>, "to"> & { to: string }) {
  const lang = useLang();
  return <Link {...(rest as ComponentProps<typeof Link>)} to={localePath(lang, to) as "/"} />;
}

export function LangSwitcher({ className = "" }: { className?: string }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const current = useLang();
  const t = useT();
  const base = stripLang(pathname);
  return (
    <div className={`flex items-center gap-1.5 text-xs font-medium ${className}`} aria-label={t("Language")}>
      {LANGS.map((l, i) => (
        <span key={l} className="flex items-center gap-1.5">
          {i > 0 && <span className="opacity-40">|</span>}
          <Link
            to={localePath(l, base) as "/"}
            search={(previous) => ({ ...previous, ...(base === "/auth/callback" ? { lang: l } : {}) })}
            hash={(previous) => previous ?? ""}
            hrefLang={HTML_LANG[l]}
            className={l === current ? "opacity-100 underline underline-offset-4" : "opacity-60 hover:opacity-100 transition-opacity"}
          >
            {l.toUpperCase()}
          </Link>
        </span>
      ))}
    </div>
  );
}

function absUrl(lang: Lang, path: string) {
  const p = localePath(lang, path);
  return `${BASE_URL}${p}`;
}

export function buildHead(lang: Lang, path: PagePath, opts: { noindex?: boolean; type?: string } = {}) {
  const m = PAGE_META[path][lang];
  const url = absUrl(lang, path);
  const meta: Array<Record<string, string>> = [
    { title: m.title },
    { name: "description", content: m.description },
    { property: "og:title", content: m.title },
    { property: "og:description", content: m.description },
    { property: "og:url", content: url },
    { property: "og:type", content: opts.type ?? "website" },
    { property: "og:locale", content: OG_LOCALE[lang] },
    ...LANGS.filter((l) => l !== lang).map((l) => ({ property: "og:locale:alternate", content: OG_LOCALE[l] })),
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: m.title },
    { name: "twitter:description", content: m.description },
  ];
  if (opts.noindex) meta.push({ name: "robots", content: "noindex" });
  const links = [
    { rel: "canonical", href: url },
    ...LANGS.map((l) => ({ rel: "alternate", hrefLang: HTML_LANG[l], href: absUrl(l, path) })),
    { rel: "alternate", hrefLang: "x-default", href: absUrl("en", path) },
  ];
  return { meta, links };
}
