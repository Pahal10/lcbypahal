import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Sparkles, Gift, Tag, Lock, ShieldCheck } from "lucide-react";
import logo from "@/assets/logo.png.asset.json";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Premium — Let's Connect" },
      { name: "description", content: "Unlock premium rewards, hidden online hacks and discounts for $1/month." },
      { property: "og:title", content: "Premium — Let's Connect" },
      { property: "og:description", content: "Premium rewards, hidden hacks and discounts for $1/month." },
      { property: "og:url", content: "https://lcbypahal.lovable.app/pricing" },
    ],
    links: [{ rel: "canonical", href: "https://lcbypahal.lovable.app/pricing" }],
  }),
  component: PricingPage,
});

const perks = [
  { icon: Gift, title: "Premium rewards", desc: "Exclusive in-app rewards reserved for premium members." },
  { icon: Sparkles, title: "Online hacks", desc: "Curated internet hacks that most people never find." },
  { icon: Tag, title: "Hidden discounts", desc: "Real discounts on real brands — buried deep, surfaced for you." },
  { icon: ShieldCheck, title: "Legal & vetted", desc: "Everything is fully legal, just quietly tucked away online." },
  { icon: Lock, title: "Members only", desc: "A private stash that keeps growing every month." },
];

function PricingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[color:var(--forest)] text-cream">
      {/* Green gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at top left, oklch(0.55 0.14 155 / 0.55), transparent 55%), radial-gradient(ellipse at bottom right, oklch(0.7 0.14 70 / 0.25), transparent 60%), linear-gradient(180deg, oklch(0.28 0.08 155), oklch(0.18 0.05 155))",
        }}
      />
      {/* Faded logo watermark */}
      <img
        src={logo.url}
        alt=""
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 w-[70vw] max-w-[720px] -translate-x-1/2 -translate-y-1/2 opacity-[0.05] blur-[1px]"
      />

      <div className="relative mx-auto max-w-3xl px-6 py-14 sm:py-20">
        <div className="mb-10 flex items-center justify-between">
          <Link to="/" className="text-sm text-cream/70 hover:text-cream">← Back</Link>
          <img src={logo.url} alt="Let's Connect" className="h-9 w-auto" />
        </div>

        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-xs uppercase tracking-widest text-gold">
            <Sparkles className="h-3.5 w-3.5" /> Premium
          </span>
          <h1 className="mt-5 font-display text-4xl leading-tight text-cream sm:text-6xl">
            The good stuff, <span className="text-gold">quietly unlocked.</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-cream/75">
            A tiny monthly fee for a stash of rewards, hacks and discounts that live on the internet — just very well hidden.
          </p>
        </div>

        {/* Perks list */}
        <ul className="mt-12 space-y-3">
          {perks.map(({ icon: Icon, title, desc }) => (
            <li
              key={title}
              className="flex items-start gap-4 rounded-2xl border border-cream/10 bg-cream/[0.04] p-4 backdrop-blur-sm transition hover:border-gold/40 hover:bg-cream/[0.07]"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-display text-lg text-cream">{title}</h3>
                  <Check className="h-4 w-4 text-gold" />
                </div>
                <p className="mt-0.5 text-sm text-cream/70">{desc}</p>
              </div>
            </li>
          ))}
        </ul>

        {/* Price card */}
        <div className="mt-12 overflow-hidden rounded-3xl border border-gold/30 bg-gradient-to-b from-cream/[0.06] to-cream/[0.02] p-8 text-center backdrop-blur">
          <p className="text-sm uppercase tracking-widest text-cream/60">Only</p>
          <div className="mt-2 flex items-baseline justify-center gap-2">
            <span className="font-display text-6xl text-gold sm:text-7xl">$1</span>
            <span className="text-cream/70">/ month</span>
          </div>
          <p className="mx-auto mt-3 max-w-sm text-sm text-cream/70">
            Cancel anytime. No hidden fees. Just a small thanks that keeps the hidden perks flowing.
          </p>

          <Link
            to="/register"
            className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-gold px-8 py-3.5 text-sm font-semibold text-[color:var(--gold-foreground)] shadow-[0_20px_50px_-15px_oklch(0.7_0.14_70/0.6)] transition hover:brightness-105"
          >
            <Sparkles className="h-4 w-4" /> Sign up for Premium
          </Link>

          <div className="mt-5 flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-cream/50">
            <Link to="/terms" className="hover:text-cream/80">Terms of service</Link>
            <span>·</span>
            <Link to="/refund" className="hover:text-cream/80">Refund policy</Link>
            <span>·</span>
            <a href="https://www.termsfeed.com/live/c439c7ce-dbd4-4336-88aa-f89cce03625a" className="hover:text-cream/80">Privacy</a>
          </div>
        </div>
      </div>
    </div>
  );
}
