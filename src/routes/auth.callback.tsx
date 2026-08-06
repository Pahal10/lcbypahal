import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Loader2, ArrowRight, Sparkles } from "lucide-react";
import logo from "@/assets/logo.png.asset.json";
import { getBrowserSupabase } from "@/lib/supabase-browser";
import { resolveOAuthUser, completeOAuthSignup } from "@/lib/oauth.functions";

export const Route = createFileRoute("/auth/callback")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Finishing sign-in — Let's Connect" },
      { name: "description", content: "Completing your Let's Connect sign-in." },
    ],
  }),
  component: CallbackPage,
});

function CallbackPage() {
  const navigate = useNavigate();
  const doResolve = useServerFn(resolveOAuthUser);
  const doComplete = useServerFn(completeOAuthSignup);

  const [status, setStatus] = useState<"loading" | "username" | "error">("loading");
  const [error, setError] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState("");
  const [email, setEmail] = useState<string | null>(null);
  const [username, setUsername] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [showInfo, setShowInfo] = useState(false);
  const [saving, setSaving] = useState(false);

  function finish(name: string) {
    try {
      localStorage.setItem("lc_username", name);
    } catch {
      /* ignore */
    }
    void navigate({ to: "/success" });
  }

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const supabase = await getBrowserSupabase();
        const { data, error: err } = await supabase.auth.getUser();
        if (err || !data.user) throw new Error("We couldn't complete the sign-in. Please try again.");
        const { data: sessionData } = await supabase.auth.getSession();
        const token = sessionData.session?.access_token;
        if (!token) throw new Error("We couldn't complete the sign-in. Please try again.");
        const result = await doResolve({ data: { accessToken: token } });
        if (cancelled) return;
        setAccessToken(token);
        setEmail(result.email);
        if (result.username) {
          finish(result.username);
          return;
        }
        setStatus("username");
      } catch (e: any) {
        if (cancelled) return;
        setError(e?.message ?? "Something went wrong");
        setStatus("error");
      }
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSaving(true);
    try {
      const { username: created } = await doComplete({
        data: { accessToken, username: username.trim(), promo_code: promoCode.trim() || null },
      });
      finish(created);
    } catch (err: any) {
      setError(err?.message ?? "Could not save your username");
      setSaving(false);
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

      <div className="relative mx-auto flex min-h-screen max-w-md flex-col justify-center px-6 py-14">
        {status === "loading" && (
          <div className="flex flex-col items-center gap-3 text-cream/80">
            <Loader2 className="h-7 w-7 animate-spin text-gold" />
            <p>Finishing your sign-in…</p>
          </div>
        )}

        {status === "error" && (
          <div className="text-center">
            <h1 className="font-display text-3xl text-cream">Sign-in didn't finish</h1>
            <p className="mt-3 text-sm text-cream/70">{error}</p>
            <button
              onClick={() => navigate({ to: "/register" })}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-[color:var(--gold-foreground)]"
            >
              Back to register <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}

        {status === "username" && (
          <>
            <div className="text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-xs uppercase tracking-widest text-gold">
                <Sparkles className="h-3.5 w-3.5" /> Almost there
              </span>
              <h1 className="mt-4 font-display text-3xl text-cream sm:text-4xl">Choose a username</h1>
              <p className="mt-2 text-sm text-cream/70">
                {email ? `Signed in as ${email}. ` : ""}This is the name you'll use in the app.
              </p>
            </div>

            <form
              onSubmit={onSubmit}
              className="mt-8 space-y-4 rounded-3xl border border-cream/10 bg-cream/[0.04] p-6 backdrop-blur-sm"
            >
              <label className="block">
                <span className="mb-1.5 block text-xs uppercase tracking-widest text-cream/60">Username</span>
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  minLength={3}
                  className="w-full rounded-xl border border-cream/15 bg-cream/[0.06] px-4 py-3 text-cream placeholder-cream/40 outline-none transition focus:border-gold/60 focus:bg-cream/[0.09]"
                />
              </label>

              <label className="block">
                <span className="mb-1.5 flex items-center gap-1.5 text-xs uppercase tracking-widest text-cream/60">
                  Promo code (optional)
                  <button
                    type="button"
                    onClick={() => setShowInfo((v) => !v)}
                    aria-label="What is this?"
                    className="grid h-4 w-4 place-items-center rounded-full border border-gold/50 text-gold transition hover:bg-gold/15"
                  >
                    <Info className="h-2.5 w-2.5" />
                  </button>
                </span>
                {showInfo && (
                  <p className="mb-2 rounded-lg border border-gold/30 bg-gold/10 px-3 py-2 text-[11px] normal-case tracking-normal text-cream/80">
                    Enter a promo code if you have one.
                  </p>
                )}
                <input
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="w-full rounded-xl border border-cream/15 bg-cream/[0.06] px-4 py-3 text-cream placeholder-cream/40 outline-none transition focus:border-gold/60 focus:bg-cream/[0.09]"
                />
              </label>



              {error && (
                <div className="rounded-lg border border-red-400/40 bg-red-400/10 px-3 py-2 text-sm text-red-100">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={saving}
                className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-6 py-3.5 text-sm font-semibold text-[color:var(--gold-foreground)] transition hover:brightness-105 disabled:opacity-60"
              >
                {saving ? (
                  <><Loader2 className="h-4 w-4 animate-spin" /> Saving…</>
                ) : (
                  <>Continue <ArrowRight className="h-4 w-4" /></>
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
