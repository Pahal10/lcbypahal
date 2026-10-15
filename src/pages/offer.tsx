import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { Sparkles, Check, Gift, Tag, Lock, ShieldCheck, Loader2, ArrowRight } from "lucide-react";
import logo from "@/assets/logo.png.asset.json";
import { createCheckout } from "@/lib/registration.functions";
import { LLink, LangSwitcher, useT, useLocalePath } from "@/lib/i18n";

const searchSchema = z.object({
  userId: z.string().min(1),
  email: z.string().email(),
});


const perks = [
  { icon: Gift, title: "Premium rewards", desc: "Exclusive in-app rewards reserved for premium members." },
  { icon: Sparkles, title: "Online hacks", desc: "Curated internet hacks that most people never find." },
  { icon: Tag, title: "Hidden discounts", desc: "Real discounts on real brands — buried deep, surfaced for you." },
  { icon: ShieldCheck, title: "Legal & vetted", desc: "Everything is fully legal, just quietly tucked away online." },
  { icon: Lock, title: "Members only", desc: "A private stash that keeps growing every month." },
];

export function OfferPage() {
  const t = useT();
  const { userId, email } = useSearch({ strict: false }) as { userId: string; email: string };
  const navigate = useNavigate();
  const lp = useLocalePath();
  const doCheckout = useServerFn(createCheckout);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onPremium() {
    setError(null);
    setLoading(true);
    try {
      const { url } = await doCheckout({ data: { userId, email } });
      window.location.href = url;
    } catch (e: any) {
      setError(t(e?.message ?? "Could not start checkout"));
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[color:var(--forest)] text-cream">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at top left, oklch(0.55 0.14 155 / 0.55), transparent 55%), radial-gradient(ellipse at bottom right, oklch(0.7 0.14 70 / 0.25), transparent 60%), linear-gradient(180deg, oklch(0.28 0.08 155), oklch(0.18 0.05 155))",
        }}
      />
      <img
        src={logo.url}
        alt=""
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 w-[70vw] max-w-[720px] -translate-x-1/2 -translate-y-1/2 opacity-[0.05] blur-[1px]"
      />

      <div className="relative mx-auto max-w-3xl px-6 py-14 sm:py-20">
        <div className="mb-10 flex items-center justify-between">
          <LLink to="/" className="text-sm text-cream/70 hover:text-cream">{t("← Home")}</LLink>
          <div className="flex items-center gap-4"><LangSwitcher className="text-cream/80" /><img src={logo.url} alt="Let's Connect" className="h-9 w-auto" /></div>
        </div>

        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-xs uppercase tracking-widest text-gold">
            <Sparkles className="h-3.5 w-3.5" /> {t("Account created")}
          </span>
          <h1 className="mt-5 font-display text-4xl leading-tight text-cream sm:text-6xl">
            {t("One last choice —")} <span className="text-gold">{t("go premium?")}</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-cream/75">
            {t("You can continue for free right now, or unlock the hidden stash of rewards, hacks and discounts for just $1/month.")}
          </p>
        </div>

        <ul className="mt-10 space-y-3">
          {perks.map(({ icon: Icon, title, desc }) => (
            <li
              key={title}
              className="flex items-start gap-4 rounded-2xl border border-cream/10 bg-cream/[0.04] p-4 backdrop-blur-sm"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-display text-lg text-cream">{t(title)}</h3>
                  <Check className="h-4 w-4 text-gold" />
                </div>
                <p className="mt-0.5 text-sm text-cream/70">{t(desc)}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-10 grid gap-3 sm:grid-cols-2">
          <button
            onClick={() => navigate({ to: lp("/success") as "/success" })}
            disabled={loading}
            className="rounded-full border border-cream/25 bg-cream/[0.06] px-6 py-3.5 text-sm font-semibold text-cream transition hover:bg-cream/[0.12] disabled:opacity-60"
          >
            {t("Continue with free")}
          </button>
          <button
            onClick={onPremium}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-3.5 text-sm font-semibold text-[color:var(--gold-foreground)] shadow-[0_20px_50px_-15px_oklch(0.7_0.14_70/0.6)] transition hover:brightness-105 disabled:opacity-60"
          >
            {loading ? (
              <><Loader2 className="h-4 w-4 animate-spin" /> {t("Starting checkout…")}</>
            ) : (
              <>{t("Sign up for Premium — $1/mo")} <ArrowRight className="h-4 w-4" /></>
            )}
          </button>
        </div>

        {error && (
          <div className="mt-4 rounded-lg border border-red-400/40 bg-red-400/10 px-3 py-2 text-center text-sm text-red-100">
            {error}
          </div>
        )}

        <p className="mt-6 text-center text-xs text-cream/50">
          {t("You can always upgrade later from the app.")}
        </p>
      </div>
    </div>
  );
}
