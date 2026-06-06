import { createFileRoute } from "@tanstack/react-router";
import logoAsset from "@/assets/logo.png.asset.json";
import heroImg from "@/assets/hero-connection.jpg";
import featureCalm from "@/assets/feature-calm.jpg";
import featureMeet from "@/assets/feature-meet.jpg";
import { Sparkles, MessageCircleHeart, Compass, ShieldCheck, ArrowRight, Heart, Leaf, Utensils, TrendingDown, MapPin, UserMinus, Users, Coffee, Flame, Gamepad2, Lightbulb } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Nav />
      <Hero />
      <Marquee />
      <Why />
      <Patterns />
      <Features />
      <Journey />
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
          <a href="#why" className="hover:text-foreground transition">Why we&apos;re lonely</a>
          <a href="#journey" className="hover:text-foreground transition">The journey</a>
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

function Why() {
  return (
    <section id="why" className="py-28 lg:py-36 bg-secondary/40 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 grid lg:grid-cols-2 gap-16 items-center">
        <div className="relative order-2 lg:order-1">
          <div className="rounded-[2rem] overflow-hidden shadow-[var(--shadow-elegant)]">
            <img src={featureCalm} alt="A calm moment" loading="lazy" className="w-full h-[560px] object-cover" />
          </div>
          <div className="absolute -bottom-8 -right-4 lg:-right-12 bg-card border border-border rounded-2xl p-6 max-w-[280px] shadow-[var(--shadow-soft)]">
            <div className="flex items-center gap-2 text-gold mb-2">
              <Utensils className="h-4 w-4" />
              <span className="text-xs uppercase tracking-widest font-medium">Social hunger</span>
            </div>
            <p className="font-script text-2xl text-primary leading-tight">&ldquo;A snack won&apos;t fix starvation.&rdquo;</p>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <p className="text-sm font-medium text-primary uppercase tracking-[0.2em]">The why</p>
          <h2 className="mt-4 text-4xl lg:text-5xl font-display leading-tight">
            Loneliness is <span className="font-script text-primary text-6xl">social hunger</span>.
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            When you expect a real meal of connection and get a snack instead — a like, a dry &ldquo;hey,&rdquo; a half-listening chat — the hunger grows. Sometimes connection doesn&apos;t drip away; it crashes, like a market correction. One move, one loss, one quiet season, and your portfolio of closeness halves overnight.
          </p>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-border bg-card p-5">
              <Utensils className="h-5 w-5 text-primary" />
              <p className="mt-3 font-display text-lg">The hunger model</p>
              <p className="mt-1 text-sm text-muted-foreground">Light connection can&apos;t feed deep need. We help you find the right meal.</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5">
              <TrendingDown className="h-5 w-5 text-gold" />
              <p className="mt-3 font-display text-lg">The crash model</p>
              <p className="mt-1 text-sm text-muted-foreground">When connection drops fast, recovery needs structure — not just willpower.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Patterns() {
  const items = [
    { icon: Users, t: "I can&apos;t make friends", d: "You show up, you try, the spark never lands. We rebuild the muscle — gently, with words ready when yours aren&apos;t." },
    { icon: MapPin, t: "I moved cities", d: "Group chats fade. Voice notes get shorter. Online retention isn&apos;t real retention. Start a new local circle, one hello at a time." },
    { icon: ShieldCheck, t: "Nobody around me gets me", d: "Being surrounded and unseen is its own kind of alone. Get matched on what actually matters to you." },
    { icon: UserMinus, t: "I lost someone close", d: "A whole shape goes missing. No replacing — only slowly making room for new warmth, at your pace." },
  ];
  return (
    <section className="py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-primary uppercase tracking-[0.2em]">Sound familiar?</p>
          <h2 className="mt-4 text-4xl lg:text-5xl font-display leading-tight">
            Four quiet ways loneliness <span className="italic font-script text-primary text-6xl">arrives</span>.
          </h2>
          <p className="mt-5 text-muted-foreground">We studied real stories. These patterns came up again and again. If one of them is yours, you&apos;re in good company — and there&apos;s a way through.</p>
        </div>
        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((p, i) => (
            <div key={i} className="rounded-3xl border border-border bg-card p-7 hover:shadow-[var(--shadow-soft)] transition">
              <div className="h-11 w-11 rounded-2xl bg-primary/10 grid place-items-center">
                <p.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="mt-5 font-display text-xl" dangerouslySetInnerHTML={{ __html: p.t }} />
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: p.d }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Journey() {
  const stages = [
    { icon: MessageCircleHeart, n: "Stage 01", t: "Small talk", d: "Low-stakes openers, weather, weekend plans. The reps that make the rest possible.", prompt: "&ldquo;What&apos;s a small thing that made you smile today?&rdquo;" },
    { icon: Heart, n: "Stage 02", t: "Big talk", d: "Real questions, real answers. Where small talk warms up, big talk lights up.", prompt: "&ldquo;What part of your life feels unfinished right now?&rdquo;" },
    { icon: Gamepad2, n: "Stage 03", t: "Playtime", d: "Shared activities, inside jokes, doing things together. Friendship moves into the body.", prompt: "&ldquo;Pick a game. Loser picks the next one.&rdquo;" },
    { icon: Coffee, n: "Stage 04", t: "Hygge", d: "Easy silence. Pajamas on the couch. The friendship has weight now — and it&apos;s warm.", prompt: "&ldquo;Come over. We don&apos;t have to do anything.&rdquo;" },
  ];
  return (
    <section id="journey" className="py-28 lg:py-36 bg-secondary/40">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-6">
          <h2 className="text-4xl lg:text-5xl font-display max-w-xl leading-tight">
            The <span className="font-script text-primary text-6xl">journey</span> — small talk to hygge.
          </h2>
          <p className="text-muted-foreground max-w-sm">Every real friendship climbs the same four rungs. We just hand you the ladder.</p>
        </div>

        <div className="mb-14 inline-flex items-center gap-3 rounded-full border border-border bg-card px-5 py-2.5 text-sm">
          <Lightbulb className="h-4 w-4 text-gold" />
          <span className="text-muted-foreground">Powered by gentle <span className="text-foreground font-medium">nudge engineering</span> — tiny prompts, well-timed insights, never guilt.</span>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {stages.map((s, i) => (
            <div key={i} className="relative rounded-3xl bg-card border border-border p-7 overflow-hidden hover:-translate-y-1 transition-all duration-500">
              <div className="absolute -top-6 -right-2 font-display text-[6rem] leading-none text-primary/10 select-none">{String(i+1).padStart(2,"0")}</div>
              <div className="relative">
                <div className="h-11 w-11 rounded-2xl bg-primary/10 grid place-items-center">
                  <s.icon className="h-5 w-5 text-primary" />
                </div>
                <p className="mt-5 text-xs uppercase tracking-widest text-muted-foreground">{s.n}</p>
                <h3 className="mt-1 font-display text-2xl">{s.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.d}</p>
                <div className="mt-5 rounded-2xl border border-dashed border-border bg-secondary/50 p-4">
                  <p className="text-[10px] uppercase tracking-widest text-primary font-medium">Sample prompt</p>
                  <p className="mt-1 font-script text-lg text-foreground/90" dangerouslySetInnerHTML={{ __html: s.prompt }} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 grid sm:grid-cols-3 gap-6">
          {[
            { n: "92%", t: "feel less alone in 30 days" },
            { n: "4.9★", t: "average user rating" },
            { n: "12k+", t: "real conversations weekly" },
          ].map((s, i) => (
            <div key={i} className="rounded-2xl bg-card border border-border p-6">
              <div className="font-display text-3xl text-primary">{s.n}</div>
              <p className="mt-2 text-sm text-muted-foreground">{s.t}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-[2rem] overflow-hidden relative h-80 shadow-[var(--shadow-elegant)]">
          <img src={featureMeet} alt="Two people meeting for coffee" loading="lazy" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-forest/85 via-forest/40 to-transparent" />
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
