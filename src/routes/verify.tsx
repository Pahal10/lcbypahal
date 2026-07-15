import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, ShieldCheck, XCircle } from "lucide-react";
import logo from "@/assets/logo.png.asset.json";

export const Route = createFileRoute("/verify")({
  head: () => ({
    meta: [
      { title: "Verify — Let's Connect" },
      { name: "description", content: "Confirm your identity to continue." },
    ],
  }),
  component: VerifyPage,
});

type State = "idle" | "verified" | "not-verified";

function VerifyPage() {
  const [state, setState] = useState<State>("idle");

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
        {state === "idle" && (
          <>
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gold/20 text-gold">
              <ShieldCheck className="h-9 w-9" />
            </div>
            <h1 className="mt-6 font-display text-4xl text-cream sm:text-5xl">Verify it's you</h1>
            <p className="mt-3 text-cream/75">
              Confirm you started this request. If this wasn't you, let us know.
            </p>

            <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                onClick={() => setState("verified")}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-[color:var(--gold-foreground)] shadow-[0_20px_50px_-15px_oklch(0.7_0.14_70/0.6)] transition hover:brightness-105"
              >
                <CheckCircle2 className="h-4 w-4" /> Verify
              </button>
              <button
                onClick={() => setState("not-verified")}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-cream/25 bg-transparent px-7 py-3.5 text-sm font-semibold text-cream transition hover:bg-cream/10"
              >
                <XCircle className="h-4 w-4" /> Not verify
              </button>
            </div>

            <Link to="/" className="mt-6 text-sm text-cream/60 hover:text-cream">← Back to home</Link>
          </>
        )}

        {state === "verified" && (
          <>
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gold/20 text-gold">
              <CheckCircle2 className="h-9 w-9" />
            </div>
            <h1 className="mt-6 font-display text-4xl text-cream sm:text-5xl">You're verified ✨</h1>
            <p className="mt-3 text-cream/75">
              Thanks for confirming. You can safely close this page and continue in the app.
            </p>
            <Link
              to="/"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-[color:var(--gold-foreground)] shadow-[0_20px_50px_-15px_oklch(0.7_0.14_70/0.6)] transition hover:brightness-105"
            >
              Back to home
            </Link>
          </>
        )}

        {state === "not-verified" && (
          <>
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-cream/10 text-cream">
              <XCircle className="h-9 w-9" />
            </div>
            <h1 className="mt-6 font-display text-4xl text-cream sm:text-5xl">Marked as not you</h1>
            <p className="mt-3 text-cream/75">
              Thanks for letting us know. If you think your account may be at risk, reach out and we'll take a look.
            </p>
            <button
              onClick={() => setState("idle")}
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-cream/25 bg-transparent px-7 py-3.5 text-sm font-semibold text-cream transition hover:bg-cream/10"
            >
              Back
            </button>
            <Link to="/" className="mt-4 text-sm text-cream/60 hover:text-cream">← Home</Link>
          </>
        )}
      </div>
    </div>
  );
}
