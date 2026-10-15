import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { BadgeCheck, Loader2, ArrowRight, Sparkles, Gift, Frown } from "lucide-react";
import logo from "@/assets/logo.png.asset.json";
import { verifyConnection, spinReward, claimWheelReward } from "@/lib/verify.functions";

export const Route = createFileRoute("/verify")({
  head: () => ({
    meta: [
      { title: "Verify a Connection — Let's Connect" },
      { name: "description", content: "Verify a real-world meetup with a friend to unlock rewards on Let's Connect." },
      { property: "og:title", content: "Verify a Connection — Let's Connect" },
      { property: "og:description", content: "Confirm you met up in real life and unlock a reward." },
      { property: "og:url", content: "https://lcbypahal.lovable.app/verify" },
    ],
    links: [{ rel: "canonical", href: "https://lcbypahal.lovable.app/verify" }],
  }),
  component: VerifyPage,
});

type Stage =
  | "choice"
  | "form"
  | "wheel"
  | "success-verify"
  | "success-wheel"
  | "sorry-wheel"
  | "thanks-notverify";

function VerifyPage() {
  const [stage, setStage] = useState<Stage>("choice");
  const [user1, setUser1] = useState("");
  const [user2, setUser2] = useState("");

  return (
    <Shell>
      {stage === "choice" && (
        <ChoiceView
          onVerify={() => setStage("form")}
          onNotVerify={() => setStage("thanks-notverify")}
        />
      )}
      {stage === "form" && (
        <UsernameForm
          user1={user1}
          user2={user2}
          setUser1={setUser1}
          setUser2={setUser2}
          onSuccess={() => setStage("success-verify")}
          onOtherSaidNo={() => setStage("wheel")}
        />
      )}
      {stage === "wheel" && (
        <WheelView
          user1={user1}
          user2={user2}
          onWin={() => setStage("success-wheel")}
          onLose={() => setStage("sorry-wheel")}
        />
      )}
      {stage === "success-verify" && (
        <ResultView
          icon={<Gift className="h-9 w-9" />}
          title="You're verified ✨"
          message="Nice work! We've sent a Premium reward to both of your emails. Check your inbox in a few minutes."
        />
      )}
      {stage === "success-wheel" && (
        <ResultView
          icon={<Gift className="h-9 w-9" />}
          title="You won! 🎉"
          message="Lucky spin! We've sent a Premium reward to your email. Check your inbox in a few minutes."
        />
      )}
      {stage === "sorry-wheel" && (
        <ResultView
          icon={<Frown className="h-9 w-9" />}
          title="Sorry, next time!"
          message="No reward this time. Keep connecting — the next verification could unlock a Premium reward."
        />
      )}
      {stage === "thanks-notverify" && (
        <ResultView
          icon={<Sparkles className="h-9 w-9" />}
          title="Thank you for opening the link"
          message="No pressure. We appreciate you being here 💛"
        />
      )}
    </Shell>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
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
          <Link to="/" className="text-sm text-cream/70 hover:text-cream">← Home</Link>
          <img src={logo.url} alt="Let's Connect" className="h-9 w-auto" />
        </div>
        {children}
      </div>
    </div>
  );
}

function ChoiceView({ onVerify, onNotVerify }: { onVerify: () => void; onNotVerify: () => void }) {
  return (
    <div className="text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold/20 text-gold">
        <BadgeCheck className="h-9 w-9" />
      </div>
      <h1 className="mt-6 font-display text-3xl text-cream sm:text-4xl">
        Verify your connection
      </h1>
      <p className="mt-3 text-cream/75">
        We want to know if you actually did the task. If you verify, you can unlock a
        Premium reward.
      </p>

      <div className="mt-8 space-y-3">
        <button
          onClick={onVerify}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-6 py-3.5 text-sm font-semibold text-[color:var(--gold-foreground)] shadow-[0_20px_50px_-15px_oklch(0.7_0.14_70/0.6)] transition hover:brightness-105"
        >
          Verify <ArrowRight className="h-4 w-4" />
        </button>
        <button
          onClick={onNotVerify}
          className="inline-flex w-full items-center justify-center rounded-full border border-cream/20 bg-cream/[0.04] px-6 py-3.5 text-sm font-semibold text-cream transition hover:bg-cream/[0.08]"
        >
          Not verify
        </button>
      </div>
    </div>
  );
}

function UsernameForm({
  user1,
  user2,
  setUser1,
  setUser2,
  onSuccess,
  onOtherSaidNo,
}: {
  user1: string;
  user2: string;
  setUser1: (v: string) => void;
  setUser2: (v: string) => void;
  onSuccess: () => void;
  onOtherSaidNo: () => void;
}) {
  const doVerify = useServerFn(verifyConnection);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!user1.trim() || !user2.trim()) {
      setError("Please enter both usernames.");
      return;
    }
    setLoading(true);
    try {
      await doVerify({ data: { user1: user1.trim(), user2: user2.trim() } });
      onSuccess();
    } catch (err: any) {
      setError(err?.message ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold/20 text-gold">
          <BadgeCheck className="h-9 w-9" />
        </div>
        <h1 className="mt-6 font-display text-3xl text-cream sm:text-4xl">
          Enter both usernames
        </h1>
        <p className="mt-3 text-sm text-cream/70">
          We'll check that you're two different people who actually met up.
        </p>
      </div>

      <form
        onSubmit={onSubmit}
        className="mt-8 space-y-4 rounded-3xl border border-cream/10 bg-cream/[0.04] p-6 backdrop-blur-sm"
      >
        <Field label="Username 1" value={user1} onChange={setUser1} />
        <Field label="Username 2" value={user2} onChange={setUser2} />

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
              <Loader2 className="h-4 w-4 animate-spin" /> Checking…
            </>
          ) : (
            <>
              Check <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>

        <button
          type="button"
          onClick={onOtherSaidNo}
          className="w-full text-sm text-cream/70 underline-offset-4 hover:text-cream hover:underline"
        >
          The other user said no
        </button>
      </form>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs uppercase tracking-widest text-cream/60">{label}</span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-cream/15 bg-cream/[0.06] px-4 py-3 text-cream placeholder-cream/40 outline-none transition focus:border-gold/60 focus:bg-cream/[0.09]"
      />
    </label>
  );
}

const SLICES = [
  { label: "Premium\nReward", reward: true },
  { label: "Better Luck\nNext Time", reward: false },
  { label: "Bonus\nReward", reward: true },
  { label: "Almost\nThere!", reward: false },
  { label: "Secret\nSurprise", reward: true },
  { label: "Try\nAgain", reward: false },
  { label: "Mini\nReward", reward: true },
  { label: "Keep\nConnecting!", reward: false },
];

function WheelView({
  user1,
  onWin,
  onLose,
}: {
  user1: string;
  user2: string;
  onWin: () => void;
  onLose: () => void;
}) {
  const doSpin = useServerFn(spinReward);
  const doClaim = useServerFn(claimWheelReward);
  const [spinning, setSpinning] = useState(false);
  const [angle, setAngle] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [claimName, setClaimName] = useState(user1 ?? "");
  const [claiming, setClaiming] = useState(false);
  const [needsClaim, setNeedsClaim] = useState(false);

  async function spin() {
    if (spinning || needsClaim) return;
    setError(null);
    setSpinning(true);
    try {
      const result = await doSpin();
      const won = result.won;
      const candidates = [0, 1, 2, 3, 4, 5, 6, 7].filter((i) => SLICES[i].reward === won);
      const target = candidates[Math.floor(Math.random() * candidates.length)];
      const spins = 5 + Math.floor(Math.random() * 4);
      const base = angle - (angle % 360);
      setAngle(base + spins * 360 - target * 45);
      window.setTimeout(() => {
        setSpinning(false);
        if (won) setNeedsClaim(true);
        else onLose();
      }, 4600);
    } catch (err: any) {
      setError(err?.message ?? "Something went wrong");
      setSpinning(false);
    }
  }

  async function claim(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!claimName.trim()) {
      setError("Please enter your username.");
      return;
    }
    setClaiming(true);
    try {
      await doClaim({ data: { username: claimName.trim() } });
      onWin();
    } catch (err: any) {
      setError(err?.message ?? "Something went wrong");
    } finally {
      setClaiming(false);
    }
  }

  const R = 108;

  return (
    <div className="text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold/20 text-gold">
        <Sparkles className="h-9 w-9" />
      </div>
      <h1 className="mt-6 font-display text-3xl text-cream sm:text-4xl">Lucky spin</h1>
      <p className="mt-3 text-sm text-cream/75">
        The other user declined verification. You still have a small chance of unlocking a
        Premium reward.
        <br />
        <span className="text-cream/60">Chance of winning: 5%</span>
      </p>

      <div className="relative mx-auto mt-8 h-[320px] w-[320px]">
        {/* pointer */}
        <div
          className="absolute left-1/2 top-[2px] z-20 -translate-x-1/2"
          style={{
            width: 0,
            height: 0,
            borderLeft: "13px solid transparent",
            borderRight: "13px solid transparent",
            borderTop: "24px solid oklch(0.78 0.14 85)",
            filter: "drop-shadow(0 2px 3px oklch(0 0 0 / 0.5))",
          }}
        />

        {/* outer gold ring */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "conic-gradient(oklch(0.85 0.13 88), oklch(0.58 0.12 70), oklch(0.9 0.12 90), oklch(0.55 0.11 65), oklch(0.85 0.13 88))",
            boxShadow: "0 25px 70px -20px oklch(0.7 0.14 70 / 0.7)",
          }}
        >
          {/* bulbs */}
          {Array.from({ length: 20 }).map((_, i) => {
            const a = (i * 360) / 20;
            return (
              <span
                key={i}
                className="absolute left-1/2 top-1/2 block h-[7px] w-[7px] rounded-full"
                style={{
                  background: "oklch(0.95 0.09 95)",
                  boxShadow: "0 0 6px oklch(0.9 0.13 90)",
                  transform: `translate(-50%,-50%) rotate(${a}deg) translateY(-152px)`,
                }}
              />
            );
          })}
        </div>

        {/* rotating face */}
        <div
          className="absolute inset-[18px] rounded-full overflow-hidden"
          style={{
            transition: spinning ? "transform 4.5s cubic-bezier(0.15,0.7,0.15,1)" : "none",
            transform: `rotate(${angle}deg)`,
            background: `conic-gradient(from -22.5deg, ${SLICES.map((s, i) => {
              const color = s.reward ? "oklch(0.97 0.03 90)" : "oklch(0.32 0.14 305)";
              return `${color} ${(i * 100) / 8}% ${((i + 1) * 100) / 8}%`;
            }).join(", ")})`,
            boxShadow: "inset 0 0 0 3px oklch(0.75 0.13 85)",
          }}
        >
          {SLICES.map((s, i) => {
            const a = (i * 45 * Math.PI) / 180;
            const x = 50 + (R / 2.84) * Math.sin(a);
            const y = 50 - (R / 2.84) * Math.cos(a);
            return (
              <div
                key={i}
                className="absolute w-[86px] -translate-x-1/2 -translate-y-1/2 whitespace-pre-line text-[11px] font-bold leading-tight"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  color: s.reward ? "oklch(0.28 0.12 305)" : "oklch(0.97 0.02 90)",
                }}
              >
                <span className="mb-1 block text-base">{s.reward ? "🎁" : "🙁"}</span>
                {s.label}
              </div>
            );
          })}
        </div>

        {/* center spin button */}
        <button
          onClick={spin}
          disabled={spinning || needsClaim}
          aria-label="Spin the wheel"
          className="absolute left-1/2 top-1/2 z-10 h-[104px] w-[104px] -translate-x-1/2 -translate-y-1/2 rounded-full transition hover:brightness-110 active:scale-95 disabled:cursor-not-allowed"
          style={{
            background:
              "radial-gradient(circle at 50% 35%, oklch(0.42 0.16 305), oklch(0.22 0.1 305))",
            border: "5px solid oklch(0.8 0.13 87)",
            boxShadow: "0 10px 30px -8px oklch(0 0 0 / 0.6), inset 0 0 20px oklch(0 0 0 / 0.5)",
          }}
        >
          {spinning ? (
            <Loader2 className="mx-auto h-7 w-7 animate-spin text-gold" />
          ) : (
            <>
              <span className="block font-display text-2xl tracking-wide text-gold">SPIN</span>
              <span className="mt-0.5 block text-[10px] text-gold/70">Good luck!</span>
            </>
          )}
        </button>
      </div>

      {needsClaim && (
        <form
          onSubmit={claim}
          className="mt-8 space-y-4 rounded-3xl border border-cream/10 bg-cream/[0.04] p-6 text-left backdrop-blur-sm"
        >
          <p className="text-center text-sm text-cream/80">
            You won 🎉 Enter the username linked to your Let&apos;s Connect account so we can
            send your reward.
          </p>
          <Field label="Your username" value={claimName} onChange={setClaimName} />
          <button
            type="submit"
            disabled={claiming}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-6 py-3.5 text-sm font-semibold text-[color:var(--gold-foreground)] transition hover:brightness-105 disabled:opacity-60"
          >
            {claiming ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Sending…
              </>
            ) : (
              <>
                Claim reward <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </form>
      )}

      {error && (
        <div className="mt-4 rounded-lg border border-red-400/40 bg-red-400/10 px-3 py-2 text-sm text-red-100">
          {error}
        </div>
      )}

      {!needsClaim && (
        <p className="mt-6 text-sm text-cream/60">Tap the wheel&apos;s centre to spin.</p>
      )}
    </div>
  );
}


function ResultView({
  icon,
  title,
  message,
}: {
  icon: React.ReactNode;
  title: string;
  message: string;
}) {
  return (
    <div className="text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold/20 text-gold">
        {icon}
      </div>
      <h1 className="mt-6 font-display text-3xl text-cream sm:text-4xl">{title}</h1>
      <p className="mt-3 text-cream/75">{message}</p>
      <Link
        to="/"
        className="mt-8 inline-flex items-center justify-center rounded-full border border-cream/20 bg-cream/[0.04] px-6 py-3 text-sm text-cream transition hover:bg-cream/[0.08]"
      >
        Back to home
      </Link>
    </div>
  );
}
