import { useState } from "react";
import { Loader2 } from "lucide-react";
import { getBrowserSupabase } from "@/lib/supabase-browser";

function GoogleIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-5 w-5" aria-hidden>
      <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.6l6.7-6.7C35.6 2.6 30.2.5 24 .5 14.6.5 6.5 5.8 2.6 13.6l7.8 6c1.9-5.7 7.2-10.1 13.6-10.1z" />
      <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.2-.4-4.7H24v9h12.7c-.5 3-2.2 5.6-4.7 7.3l7.4 5.7c4.3-4 6.8-9.9 6.8-17.3z" />
      <path fill="#FBBC05" d="M10.4 28.4a14.4 14.4 0 0 1 0-8.8l-7.8-6a24 24 0 0 0 0 20.8l7.8-6z" />
      <path fill="#34A853" d="M24 47.5c6.5 0 11.9-2.1 15.9-5.8l-7.4-5.7c-2.1 1.4-4.8 2.2-8.5 2.2-6.4 0-11.7-4.4-13.6-10.1l-7.8 6C6.5 42.2 14.6 47.5 24 47.5z" />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg viewBox="0 0 384 512" className="h-5 w-5 fill-white" aria-hidden>
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
    </svg>
  );
}

export function SocialAuthButtons() {
  const [pending, setPending] = useState<"google" | "apple" | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function signIn(provider: "google" | "apple") {
    setError(null);
    setPending(provider);
    try {
      const supabase = await getBrowserSupabase();
      const { error: err } = await supabase.auth.signInWithOAuth({
        provider,
        options: { redirectTo: `${window.location.origin}/auth/callback` },
      });
      if (err) throw err;
    } catch (e: any) {
      setError(e?.message ?? "Could not start sign-in");
      setPending(null);
    }
  }

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={() => signIn("google")}
        disabled={pending !== null}
        className="flex w-full items-center gap-4 rounded-2xl bg-white px-5 py-4 text-[17px] font-medium text-neutral-600 shadow-[0_6px_20px_-8px_rgba(0,0,0,0.45)] transition hover:brightness-95 disabled:opacity-60"
      >
        {pending === "google" ? <Loader2 className="h-5 w-5 animate-spin" /> : <GoogleIcon />}
        <span>Continue with Google</span>
      </button>

      <button
        type="button"
        onClick={() => signIn("apple")}
        disabled={pending !== null}
        className="flex w-full items-center gap-4 rounded-2xl bg-black px-5 py-4 text-[17px] font-medium text-white shadow-[0_6px_20px_-8px_rgba(0,0,0,0.6)] transition hover:brightness-125 disabled:opacity-60"
      >
        {pending === "apple" ? <Loader2 className="h-5 w-5 animate-spin" /> : <AppleIcon />}
        <span>Continue with Apple</span>
      </button>

      {error && (
        <div className="rounded-lg border border-red-400/40 bg-red-400/10 px-3 py-2 text-sm text-red-100">
          {error}
        </div>
      )}
    </div>
  );
}
