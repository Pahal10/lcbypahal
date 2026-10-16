import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Sparkles, Loader2, ArrowRight, UserPlus, ChevronDown } from "lucide-react";
import logo from "@/assets/logo.png.asset.json";
import { registerUser } from "@/lib/registration.functions";
import { SocialAuthButtons } from "@/components/SocialAuthButtons";
import { LLink, LangSwitcher, useT, useLocalePath } from "@/lib/i18n";



export function RegisterPage() {
  const t = useT();
  const navigate = useNavigate();
  const lp = useLocalePath();
  const doRegister = useServerFn(registerUser);

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirm: "",
    promo_code: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  function upd<K extends keyof typeof form>(k: K, v: string) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (form.password !== form.confirm) {
      setError(t("Passwords do not match"));
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError(t("Please enter a valid email address"));
      return;
    }

    setLoading(true);
    try {
      await doRegister({
        data: {
          username: form.username.trim(),
          email: form.email.trim(),
          password: form.password,
          promo_code: form.promo_code.trim() || null,
        },
      });
      await navigate({ to: lp("/success") as "/success" });
    } catch (err: any) {
      setError(t(err?.message ?? "Something went wrong"));
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

      <div className="relative mx-auto max-w-md px-6 py-14">
        <div className="mb-8 flex items-center justify-between">
          <LLink to="/" className="text-sm text-cream/70 hover:text-cream">{t("← Back")}</LLink>
          <div className="flex items-center gap-4"><LangSwitcher className="text-cream/80" /><img src={logo.url} alt="Let's Connect" className="h-9 w-auto" /></div>
        </div>

        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-xs uppercase tracking-widest text-gold">
            <Sparkles className="h-3.5 w-3.5" /> {t("Free to join")}
          </span>
          <h1 className="mt-4 font-display text-3xl text-cream sm:text-4xl">{t("Create your account")}</h1>
          <p className="mt-2 text-sm text-cream/70">
            {t("Sign up here, then sign in on the mobile app.")}
          </p>
        </div>

        <div className="mt-8 space-y-3">
          <button
            type="button"
            onClick={() => setShowForm((v) => !v)}
            aria-expanded={showForm}
            className="flex w-full items-center gap-4 rounded-2xl border border-cream/15 bg-cream/[0.06] px-5 py-4 text-[17px] font-medium text-cream shadow-[0_6px_20px_-8px_rgba(0,0,0,0.45)] transition hover:bg-cream/[0.1]"
          >
            <UserPlus className="h-5 w-5 text-gold" />
            <span>{t("Traditional username and password account")}</span>
            <ChevronDown className={`ml-auto h-5 w-5 text-cream/50 transition-transform ${showForm ? "rotate-180" : ""}`} />
          </button>

          {showForm && (
            <form
              onSubmit={onSubmit}
              className="space-y-4 rounded-3xl border border-cream/10 bg-cream/[0.04] p-6 backdrop-blur-sm"
            >
              <Field label={t("Username")} value={form.username} onChange={(v) => upd("username", v)} autoComplete="username" required />
              <Field label={t("Email")} type="email" value={form.email} onChange={(v) => upd("email", v)} autoComplete="email" required />
              <Field label={t("Password")} type="password" value={form.password} onChange={(v) => upd("password", v)} autoComplete="new-password" required />
              <Field label={t("Confirm password")} type="password" value={form.confirm} onChange={(v) => upd("confirm", v)} autoComplete="new-password" required />
              <Field label={t("Promo code (optional)")} value={form.promo_code} onChange={(v) => upd("promo_code", v)} />

              {error && (
                <div className="rounded-lg border border-red-400/40 bg-red-400/10 px-3 py-2 text-sm text-red-100">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-6 py-3.5 text-sm font-semibold text-[color:var(--gold-foreground)] shadow-[0_20px_50px_-15px_oklch(0.7_0.14_70/0.6)] transition hover:brightness-105 disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> {t("Creating account…")}
                  </>
                ) : (
                  <>
                    {t("Create account")} <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          )}

          <SocialAuthButtons />
        </div>

        <p className="mt-5 text-center text-xs text-cream/50">
          {t("By signing up you agree to our")}{" "}
          <LLink to="/terms" className="underline hover:text-cream/80">{t("Terms")}</LLink> {t("and")}{" "}
          <LLink to="/refund" className="underline hover:text-cream/80">{t("Refund policy")}</LLink>.
        </p>
      </div>
      <footer className="relative flex justify-center px-6 py-6"><LangSwitcher /></footer>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  autoComplete,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  autoComplete?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs uppercase tracking-widest text-cream/60">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        required={required}
        className="w-full rounded-xl border border-cream/15 bg-cream/[0.06] px-4 py-3 text-cream placeholder-cream/40 outline-none transition focus:border-gold/60 focus:bg-cream/[0.09]"
      />
    </label>
  );
}
