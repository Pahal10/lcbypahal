import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Smartphone } from "lucide-react";
import logo from "@/assets/logo.png.asset.json";

export const Route = createFileRoute("/success")({
  head: () => ({
    meta: [
      { title: "You're in — Let's Connect" },
      { name: "description", content: "Your Let's Connect account is ready. Download the app and sign in to start connecting." },
      { property: "og:title", content: "You're in — Let's Connect" },
      { property: "og:description", content: "Your account is ready — download the app and sign in." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: SuccessPage,
});

function SuccessPage() {
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

      <div className="relative mx-auto flex min-h-screen max-w-lg flex-col items-center justify-center px-6 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gold/20 text-gold">
          <CheckCircle2 className="h-9 w-9" />
        </div>
        <h1 className="mt-6 font-display text-4xl text-cream sm:text-5xl">You're in ✨</h1>
        <p className="mt-3 text-cream/75">
          Your account is ready. Open the Let's Connect app and sign in with the username and password you just created.
        </p>

        <a
          href="/#download"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-[color:var(--gold-foreground)] shadow-[0_20px_50px_-15px_oklch(0.7_0.14_70/0.6)] transition hover:brightness-105"
        >
          <Smartphone className="h-4 w-4" /> Download the app
        </a>

        <Link to="/" className="mt-4 text-sm text-cream/60 hover:text-cream">← Back to home</Link>
      </div>
    </div>
  );
}
