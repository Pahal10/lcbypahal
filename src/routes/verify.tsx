import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { BadgeCheck, Loader2, ArrowRight, Sparkles, Gift, Frown } from "lucide-react";
import logo from "@/assets/logo.png.asset.json";
import { verifyConnection, spinReward } from "@/lib/verify.functions";

export const Route = createFileRoute("/verify")({
  head: () => ({
    meta: [
      { title: "Verify Connection — Let's Connect" },
      { name: "description", content: "Verify a real-world connection to unlock a Premium reward." },
    ],
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

function WheelView({
  user1,
  user2,
  onWin,
  onLose,
}: {
  user1: string;
  user2: string;
  onWin: () => void;
  onLose: () => void;
}) {
  const doSpin = useServerFn(spinReward);
  const [spinning, setSpinning] = useState(false);
  const [angle, setAngle] = useState(0);
  const [error, setError] = useState<string | null>(null);

  async function spin() {
    if (spinning) return;
    setError(null);
    if (!user1.trim()) {
      setError("Please enter your username on the previous step.");
      return;
    }
    setSpinning(true);
    try {
      const result = await doSpin({
        data: { user1: user1.trim(), user2: user2.trim() || null },
      });
      const sliceDeg = 360 / 8;
      // 8 slices: reward slices are even indices (0,2,4,6)
      const won = result.won;
      const candidates = [0, 1, 2, 3, 4, 5, 6, 7].filter(
        (i) => (i % 2 === 0) === won,
      );
      const target = candidates[Math.floor(Math.random() * candidates.length)];
      const spins = 5 + Math.floor(Math.random() * 4);
      const total = (angle - (angle % 360)) + spins * 360 + target * sliceDeg;
      setAngle(total);
      window.setTimeout(() => {
        if (won) onWin();
        else onLose();
      }, 4600);
    } catch (err: any) {
      setError(err?.message ?? "Something went wrong");
      setSpinning(false);
    }
  }

  const slices = [
    { label: "Premium", reward: true },
    { label: "Next time", reward: false },
    { label: "Bonus", reward: true },
    { label: "Almost", reward: false },
    { label: "Surprise", reward: true },
    { label: "Try again", reward: false },
    { label: "Mini", reward: true },
    { label: "Keep going", reward: false },
  ];

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

      <div className="relative mx-auto mt-8 h-[300px] w-[300px]">
        {/* pointer */}
        <div
          className="absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-1"
          style={{
            width: 0,
            height: 0,
            borderLeft: "12px solid transparent",
            borderRight: "12px solid transparent",
            borderTop: "20px solid oklch(0.7 0.14 70)",
          }}
        />
        <div
          className="h-full w-full rounded-full border-4 border-gold/50 shadow-[0_20px_60px_-15px_oklch(0.7_0.14_70/0.5)]"
          style={{
            transition: spinning ? "transform 4.5s cubic-bezier(0.15,0.7,0.15,1)" : "none",
            transform: `rotate(${-angle}deg)`,
            background: `conic-gradient(${slices
              .map((s, i) => {
                const color = s.reward ? "oklch(0.7 0.14 70)" : "oklch(0.25 0.05 155)";
                const start = (i * 100) / 8;
                const end = ((i + 1) * 100) / 8;
                return `${color} ${start}% ${end}%`;
              })
              .join(", ")})`,
          }}
        >
          {slices.map((s, i) => (
            <div
              key={i}
              className="absolute left-1/2 top-1/2 origin-left text-[10px] font-semibold uppercase tracking-wider"
              style={{
                transform: `rotate(${i * 45 + 22.5}deg) translateX(60px)`,
                color: s.reward ? "oklch(0.2 0.05 70)" : "oklch(0.95 0.02 90)",
              }}
            >
              {s.label}
            </div>
          ))}
        </div>
      </div>

      {error && (
        <div className="mt-4 rounded-lg border border-red-400/40 bg-red-400/10 px-3 py-2 text-sm text-red-100">
          {error}
        </div>
      )}

      <button
        onClick={spin}
        disabled={spinning}
        className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-6 py-3.5 text-sm font-semibold text-[color:var(--gold-foreground)] shadow-[0_20px_50px_-15px_oklch(0.7_0.14_70/0.6)] transition hover:brightness-105 disabled:opacity-60"
      >
        {spinning ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Spinning…
          </>
        ) : (
          "SPIN"
        )}
      </button>
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
