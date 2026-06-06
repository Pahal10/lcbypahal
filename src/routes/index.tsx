import { createFileRoute } from "@tanstack/react-router";
import logoAsset from "@/assets/logo.png.asset.json";
import heroImg from "@/assets/hero-connection.jpg";
import featureCalm from "@/assets/feature-calm.jpg";
import featureMeet from "@/assets/feature-meet.jpg";
import { Sparkles, MessageCircleHeart, Compass, ShieldCheck, ArrowRight, Heart, Leaf, Utensils, TrendingDown, MapPin, UserMinus, Users, Coffee, Gamepap, Flame, Coffee as CoffeeIcon, Gamepad2, Lightbulb } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Nav />
      <Hero />
      <Marquee />
      <Features />
      <Story />
      <Steps />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
}

function Nav() {
  return (
    <header className="absolute top-0 inset-x-0 z-30">
      <nav className="mx-auto max-w-7xl px-6 lg:px-10 py-6 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3">
          <img src={logoAsset.url} alt="Let's Connect" className="h-10 w-10 rounded-xl shadow-[var(--shadow-soft)]" />
          <span className="font-display text-xl tracking-tight">
            Let&apos;s <span className="font-script text-primary text-2xl">Connect</span>
          </span>
        </a>
        <div className="hidden md:flex items-center gap-9 text-sm text-foreground/70">
          <a href="#features" className="hover:text-foreground transition">Features</a>
          <a href="#how" className="hover:text-foreground transition">How it works</a>
          <a href="#stories" className="hover:text-foreground transition">Stories</a>
        </div>
        <a
          href="#download"
          className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium shadow-[var(--shadow-soft)] hover:opacity-95 transition"
        >
          Get the app <ArrowRight className="h-4 w-4" />
        </a>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative pt-32 pb-24 lg:pt-44 lg:pb-32" style={{ backgroundImage: "var(--gradient-hero)" }}>
      <div className="absolute inset-0 bg-noise opacity-60 pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 animate-fade-up">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 backdrop-blur px-4 py-1.5 text-xs text-muted-foreground">
            <Leaf className="h-3.5 w-3.5 text-primary" />
            A gentler way to feel less alone
          </div>
          <h1 className="mt-6 font-display text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] leading-[1.02] tracking-tight">
            Connection,
            <br />
            <span className="italic font-script text-gradient-emerald text-6xl sm:text-7xl lg:text-[7rem] block leading-none mt-3">
              one small hello
            </span>
            <span className="block mt-2 text-foreground/80">at a time.</span>
          </h1>
          <p className="mt-7 max-w-xl text-lg text-muted-foreground leading-relaxed">
            Let&apos;s Connect is a quiet companion for anyone who finds being social hard.
            Tiny prompts, real conversations, and a steady hand when the world feels loud.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#download"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 text-primary-foreground font-medium shadow-[var(--shadow-elegant)] hover:shadow-[var(--shadow-gold)] transition-all"
            >
              Start connecting
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition" />
            </a>
            <a href="#how" className="inline-flex items-center gap-2 text-sm font-medium text-foreground/80 hover:text-foreground">
              <span className="h-10 w-10 rounded-full border border-border grid place-items-center bg-card">
                <ArrowRight className="h-4 w-4" />
              </span>
              See how it works
            </a>
          </div>
          <div className="mt-10 flex items-center gap-6 text-sm text-muted-foreground">
            <div className="flex -space-x-2">
              {[1,2,3,4].map(i => (
                <div key={i} className="h-8 w-8 rounded-full border-2 border-background"
                  style={{ background: i % 2 ? "var(--gradient-emerald)" : "var(--gradient-gold)" }} />
              ))}
            </div>
            <span>Joined by <strong className="text-foreground">2,400+</strong> kind humans this month</span>
          </div>
        </div>

        <div className="lg:col-span-5 relative">
          <div className="relative animate-float">
            <div className="absolute -inset-6 rounded-[2.5rem] bg-gold/30 blur-3xl" />
            <div className="relative rounded-[2rem] overflow-hidden shadow-[var(--shadow-elegant)] border border-border">
              <img src={heroImg} alt="Friends sharing a warm moment" className="w-full h-[520px] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-forest/40 via-transparent to-transparent" />
            </div>
            {/* Floating card */}
            <div className="absolute -left-6 bottom-10 bg-card border border-border rounded-2xl p-4 shadow-[var(--shadow-soft)] w-60 hidden sm:block">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 grid place-items-center">
                  <MessageCircleHeart className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Maya said hi</p>
                  <p className="text-xs text-muted-foreground">Your daily nudge ✨</p>
                </div>
              </div>
            </div>
            <div className="absolute -right-4 top-10 bg-gold text-gold-foreground rounded-2xl px-4 py-3 shadow-[var(--shadow-gold)] hidden sm:flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-medium">Streak · 7 days</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const items = ["Build real friendships", "Calm the social nerves", "Tiny daily prompts", "Conversation guides", "Find your people", "Go at your pace"];
  return (
    <div className="border-y border-border bg-secondary/40 py-5 overflow-hidden">
      <div className="flex gap-12 animate-[float-soft_0s] whitespace-nowrap text-sm font-medium text-muted-foreground">
        <div className="flex gap-12 animate-[marquee_30s_linear_infinite]" style={{ animation: "none" }}>
          {[...items, ...items].map((t, i) => (
            <span key={i} className="flex items-center gap-3">
              <Heart className="h-3.5 w-3.5 text-gold" /> {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function Features() {
  const features = [
    {
      icon: Compass,
      title: "Conversation guides",
      desc: "Gentle scripts and openers for moments your mind goes blank. No more dreading the awkward pause.",
    },
    {
      icon: ShieldCheck,
      title: "Anxiety-safe spaces",
      desc: "Practice in low-pressure rooms before stepping into busier ones. We pace it with you.",
    },
    {
      icon: MessageCircleHeart,
      title: "Daily tiny hellos",
      desc: "One small nudge a day to reach out, reply back, or simply notice someone. Connection compounds.",
    },
    {
      icon: Sparkles,
      title: "Match by warmth",
      desc: "Find people who get it — matched on energy and interests, never on looks or hot takes.",
    },
  ];
  return (
    <section id="features" className="py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-primary uppercase tracking-[0.2em]">What&apos;s inside</p>
          <h2 className="mt-4 text-4xl lg:text-5xl font-display leading-tight">
            Built for the people who&apos;d rather <span className="italic font-script text-primary text-6xl">stay home</span>
            <span className="block">— and still want to belong.</span>
          </h2>
        </div>

        <div className="mt-16 grid md:grid-cols-2 gap-6">
          {features.map((f, i) => (
            <div key={i} className="group relative rounded-3xl border border-border bg-card p-8 hover:shadow-[var(--shadow-elegant)] transition-all duration-500 hover:-translate-y-1">
              <div className="absolute top-8 right-8 h-12 w-12 rounded-2xl bg-primary/10 grid place-items-center group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                <f.icon className="h-5 w-5 text-primary group-hover:text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-display pr-16">{f.title}</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">{f.desc}</p>
              <div className="mt-8 h-px w-12 bg-gold" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Story() {
  return (
    <section className="py-28 lg:py-36 bg-secondary/40 relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 grid lg:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <div className="rounded-[2rem] overflow-hidden shadow-[var(--shadow-elegant)]">
            <img src={featureCalm} alt="A calm moment" loading="lazy" className="w-full h-[560px] object-cover" />
          </div>
          <div className="absolute -bottom-8 -right-4 lg:-right-12 bg-card border border-border rounded-2xl p-6 max-w-[260px] shadow-[var(--shadow-soft)]">
            <p className="font-script text-3xl text-primary leading-none">&ldquo;Today felt easier.&rdquo;</p>
            <p className="mt-3 text-sm text-muted-foreground">— Sam, 23, joined last spring</p>
          </div>
        </div>

        <div>
          <p className="text-sm font-medium text-primary uppercase tracking-[0.2em]">Our story</p>
          <h2 className="mt-4 text-4xl lg:text-5xl font-display leading-tight">
            We made the app we wished existed when we couldn&apos;t leave the house.
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Loneliness isn&apos;t a personality flaw. It&apos;s a signal — that you&apos;re wired for closeness and the world made closeness hard.
            Let&apos;s Connect is the gentle in-between: a place to practice, to be heard, and to find the people who&apos;d show up for you.
          </p>
          <div className="mt-10 grid grid-cols-3 gap-6">
            {[
              { n: "92%", t: "feel less alone in 30 days" },
              { n: "4.9★", t: "average user rating" },
              { n: "12k+", t: "real conversations weekly" },
            ].map((s, i) => (
              <div key={i}>
                <div className="font-display text-3xl lg:text-4xl text-primary">{s.n}</div>
                <p className="mt-2 text-xs text-muted-foreground leading-snug">{s.t}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Steps() {
  const steps = [
    { n: "01", t: "Tell us where you are", d: "A short, kind questionnaire — no quizzes, no judgement." },
    { n: "02", t: "Get tiny daily prompts", d: "One soft action a day. Big enough to count, small enough to do." },
    { n: "03", t: "Meet your people", d: "Slow-matched conversations with humans who&apos;d genuinely show up." },
  ];
  return (
    <section id="how" className="py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
          <h2 className="text-4xl lg:text-5xl font-display max-w-xl leading-tight">
            How it <span className="font-script text-primary text-6xl">works</span>
          </h2>
          <p className="text-muted-foreground max-w-sm">A pace that respects your nervous system. No swipes, no streak guilt — promise.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {steps.map((s, i) => (
            <div key={i} className="relative rounded-3xl bg-gradient-to-br from-card to-secondary/60 p-10 border border-border overflow-hidden">
              <div className="absolute -top-6 -right-2 font-display text-[8rem] leading-none text-primary/8 select-none">{s.n}</div>
              <div className="relative">
                <div className="font-script text-3xl text-gold">{s.n}</div>
                <h3 className="mt-4 text-2xl font-display">{s.t}</h3>
                <p className="mt-3 text-muted-foreground" dangerouslySetInnerHTML={{ __html: s.d }} />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 rounded-[2rem] overflow-hidden relative h-80 shadow-[var(--shadow-elegant)]">
          <img src={featureMeet} alt="Two people meeting for coffee" loading="lazy" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-forest/80 via-forest/40 to-transparent" />
          <div className="absolute inset-0 flex items-center p-10 lg:p-16">
            <div className="max-w-md text-cream">
              <p className="font-script text-4xl text-gold">small steps,</p>
              <h3 className="font-display text-3xl lg:text-4xl mt-2">big, ordinary, beautiful moments.</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const quotes = [
    { q: "I used to script every text for an hour. Now I just send it.", a: "Priya, 27" },
    { q: "The daily nudge feels like a friend checking in — not an app.", a: "Marcus, 19" },
    { q: "Made my first real friend in three years. I&apos;m crying writing this.", a: "Ellie, 34" },
  ];
  return (
    <section id="stories" className="py-28 lg:py-36 bg-forest text-cream relative overflow-hidden">
      <div className="absolute inset-0 bg-noise opacity-30" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <p className="text-sm font-medium text-gold uppercase tracking-[0.2em]">Quiet wins</p>
        <h2 className="mt-4 text-4xl lg:text-5xl font-display max-w-2xl leading-tight">
          Small messages from people who finally felt <span className="font-script text-gold text-6xl">met</span>.
        </h2>

        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {quotes.map((q, i) => (
            <figure key={i} className="rounded-3xl border border-cream/15 bg-cream/5 backdrop-blur p-8 hover:bg-cream/10 transition">
              <Sparkles className="h-5 w-5 text-gold" />
              <blockquote className="mt-6 font-display text-2xl leading-snug" dangerouslySetInnerHTML={{ __html: `&ldquo;${q.q}&rdquo;` }} />
              <figcaption className="mt-6 text-sm text-cream/60">— {q.a}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section id="download" className="py-28 lg:py-36">
      <div className="mx-auto max-w-5xl px-6 lg:px-10">
        <div className="relative rounded-[2.5rem] p-12 lg:p-20 text-center overflow-hidden border border-border" style={{ background: "var(--gradient-emerald)" }}>
          <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-gold/30 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-cream/10 blur-3xl" />
          <div className="relative text-cream">
            <img src={logoAsset.url} alt="" className="h-16 w-16 mx-auto rounded-2xl shadow-[var(--shadow-gold)]" />
            <h2 className="mt-8 font-display text-4xl lg:text-6xl leading-tight">
              The world feels lighter with <span className="font-script text-gold text-7xl">one</span> good hello.
            </h2>
            <p className="mt-6 text-cream/80 max-w-xl mx-auto">
              Download Let&apos;s Connect. Take the tiny first step. We&apos;ll be right here.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <a href="#" className="inline-flex items-center gap-2 rounded-full bg-cream text-forest px-7 py-4 font-medium shadow-[var(--shadow-soft)] hover:scale-[1.02] transition">
                Download for iOS
              </a>
              <a href="#" className="inline-flex items-center gap-2 rounded-full bg-gold text-gold-foreground px-7 py-4 font-medium shadow-[var(--shadow-gold)] hover:scale-[1.02] transition">
                Download for Android
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <img src={logoAsset.url} alt="Let's Connect" className="h-9 w-9 rounded-xl" />
          <span className="font-display text-lg">
            Let&apos;s <span className="font-script text-primary text-xl">Connect</span>
          </span>
        </div>
        <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Let&apos;s Connect — made with care, for the quiet ones.</p>
        <div className="flex gap-6 text-sm text-muted-foreground">
          <a href="#" className="hover:text-foreground">Privacy</a>
          <a href="#" className="hover:text-foreground">Contact</a>
        </div>
      </div>
    </footer>
  );
}
