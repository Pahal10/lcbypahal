import { useEffect, useRef, useState } from "react";
import logoPng from "@/assets/logo.png";
import handPhone from "@/assets/hand-phone-lc.jpg";
import featureCalm from "@/assets/feature-calm.jpg";
import featureMeet from "@/assets/feature-meet.jpg";
import loyaltyPng from "@/assets/loyalty-steps.png";
import auroraJpg from "@/assets/aurora-deep.jpg";
import { OpeningArtwork } from "@/components/OpeningArtwork";
import { ProductFeatures } from "@/components/ProductFeatures";
import { PriceScreen } from "@/components/PriceScreen";
import { QrCard } from "@/components/QrCard";
import { androidUrl, iosUrl } from "@/lib/store-links";
import { fireSideConfetti } from "@/lib/confetti";
import { Sparkles, MessageCircleHeart, ArrowRight, Heart, Leaf, Utensils, TrendingDown, MapPin, UserMinus, Users, Coffee, Gamepad2, Lightbulb, Mail, ShieldCheck, Gift, CheckCircle2, Instagram, MessageCircle, Smartphone, Ticket, Coins, Banknote, BadgeCheck, HandHeart, ChevronDown } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { LLink, LangSwitcher, useT } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
const logoAsset = { url: logoPng };
const loyaltySteps = { url: loyaltyPng };
const aurora = { url: auroraJpg };
// Drop real QR images at src/assets/qr-ios.png and src/assets/qr-android.png; they are picked up automatically.
const qrImages = import.meta.glob("../assets/qr-*.png", { eager: true, query: "?url", import: "default" }) as Record<string, string>;
const QR_IOS_SRC = qrImages["../assets/qr-ios.png"];
const QR_ANDROID_SRC = qrImages["../assets/qr-android.png"];

export function ResearchPage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Nav />
      <div className="pt-24" />
      <Why />
      <Patterns />
      <Different />
      <Evidence />
      <Journey />
      <Footer />
    </div>
  );
}

function ResearchTeaser({ pos }: { pos: "top" | "bottom" }) {
  const t = useT();
  return (
    <section className={`research-teaser research-teaser-${pos}`}>
      <p>{t("Curious about the R&D behind Let's Connect?")}</p>
      <LLink to="/research">{t("Read the research")} <ArrowRight className="h-4 w-4" /></LLink>
    </section>
  );
}

export function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-clip">
      <div className="product-presentation aurora-surface">
        <img src={aurora.url} alt="" aria-hidden="true" className="aurora-backdrop" fetchPriority="high" />
        <OpeningArtwork />
        <ProductFeatures />
      </div>
      <div className="loyalty-presentation aurora-surface">
        <img src={aurora.url} alt="" aria-hidden="true" className="aurora-backdrop" loading="lazy" />
        <PriceScreen />
        <Loyalty />
      </div>
      <Testimonials />
      <CTA />
      <ResearchTeaser pos="bottom" />
      <Footer />
    </div>
  );
}

function Nav({ dark = false }: { dark?: boolean }) {
  const t = useT();
  return (
    <header className="absolute top-0 inset-x-0 z-30">
      <nav className="mx-auto max-w-7xl px-6 lg:px-10 py-6 flex flex-wrap gap-y-3 items-center justify-between">
        <a href="#" className="flex items-center gap-3">
          <img src={logoAsset.url} alt="Let's Connect" className="h-10 w-10 rounded-xl shadow-[var(--shadow-soft)]" />
          <span className={`font-display text-xl tracking-tight ${dark ? "text-white" : ""}`}>
            Let&apos;s <span className={`font-script text-2xl ${dark ? "text-emerald-300" : "text-primary"}`}>Connect</span>
          </span>
        </a>
        <div className={`hidden md:flex items-center gap-9 text-sm ${dark ? "text-white/70" : "text-foreground/70"}`}>
          <LLink to="/research" className={`transition-colors ${dark ? "hover:text-white" : "hover:text-foreground"}`}>{t("Why we're lonely")}</LLink>
          <LLink to="/research" className={`transition-colors ${dark ? "hover:text-white" : "hover:text-foreground"}`}>{t("The journey")}</LLink>
          <a href="/#stories" className={`transition-colors ${dark ? "hover:text-white" : "hover:text-foreground"}`}>{t("Stories")}</a>
        </div>
        <div className="flex items-center gap-3 sm:gap-5">
          <LangSwitcher className={dark ? "text-white/80" : "text-foreground/80"} />
          <a
            href="/#download"
            className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium shadow-[var(--shadow-soft)] hover:opacity-95 transition"
          >
            {t("Get started")} <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </nav>
    </header>
  );
}

function Why() {
  const t = useT();
  return (
    <section id="why" className="py-28 lg:py-36 bg-secondary/40 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 grid lg:grid-cols-2 gap-16 items-center">
        <div className="relative order-2 lg:order-1">
          <div className="rounded-[2rem] overflow-hidden shadow-[var(--shadow-elegant)]">
            <img src={featureCalm} alt={t("A calm moment")} loading="lazy" className="w-full h-[560px] object-cover" />
          </div>
          <div className="absolute -bottom-8 -right-4 lg:-right-12 bg-card border border-border rounded-2xl p-6 max-w-[280px] shadow-[var(--shadow-soft)]">
            <div className="flex items-center gap-2 text-gold mb-2">
              <Heart className="h-4 w-4" />
              <span className="text-xs uppercase tracking-widest font-medium">{t("Real talk")}</span>
            </div>
            <p className="font-script text-2xl text-primary leading-tight">&ldquo;{t("Honestly? It just helped.")}&rdquo;</p>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <p className="text-sm font-medium text-primary uppercase tracking-[0.2em]">{t("The why")}</p>
          <h2 className="mt-4 text-4xl lg:text-5xl font-display leading-tight">
            {t("Loneliness is")} <span className="font-script text-primary text-6xl">{t("social hunger")}</span>.
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            {t("We researched patterns in various cases and came up with an understanding of loneliness. To explain, we break it down into two analogies.")}
          </p>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-border bg-card p-5 hover:shadow-[var(--shadow-soft)] transition-shadow duration-500">
              <Utensils className="h-5 w-5 text-primary" />
              <p className="mt-3 font-display text-lg">{t("The hunger model")}</p>
              <p className="mt-1 text-sm text-muted-foreground">{t("Loneliness is like social hunger. When you expect food (connection) but don't get it — or get a snack when you're starving — you feel lonely.")}</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5 hover:shadow-[var(--shadow-soft)] transition-shadow duration-500">
              <TrendingDown className="h-5 w-5 text-gold" />
              <p className="mt-3 font-display text-lg">{t("The crash model")}</p>
              <p className="mt-1 text-sm text-muted-foreground">{t("You can also think of it like a stock market crash. A sudden crash of connection causes loneliness.")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Patterns() {
  const t = useT();
  const items = [
    { icon: Users, t: "I can't make friends", d: "You show up, you try, the spark never lands. We rebuild the muscle — gently, with words ready when yours aren't." },
    { icon: MapPin, t: "I moved cities", d: "Group chats fade. Voice notes get shorter. Online retention isn't real retention. Start a new local circle, one hello at a time." },
    { icon: ShieldCheck, t: "Nobody around me gets me", d: "Being surrounded and unseen is its own kind of alone. Get matched on what actually matters to you." },
    { icon: UserMinus, t: "I lost someone close", d: "A whole shape goes missing. No replacing — only slowly making room for new warmth, at your pace." },
  ];
  return (
    <section className="py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-primary uppercase tracking-[0.2em]">{t("Sound familiar?")}</p>
          <h2 className="mt-4 text-4xl lg:text-5xl font-display leading-tight">
            {t("Four quiet ways loneliness")} <span className="italic font-script text-primary text-6xl">{t("arrives")}</span>.
          </h2>
          <p className="mt-5 text-muted-foreground">{t("We studied real stories. These patterns came up again and again. If one of them is yours, you're in good company — and there's a way through.")}</p>
        </div>
        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((p, i) => (
            <div key={i} className="rounded-3xl border border-border bg-card p-7 hover:shadow-[var(--shadow-soft)] transition-all duration-500 hover:-translate-y-1">
              <div className="h-11 w-11 rounded-2xl bg-primary/10 grid place-items-center">
                <p.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="mt-5 font-display text-xl">{t(p.t)}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{t(p.d)}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-2xl border border-dashed border-gold/40 bg-gold/[0.04] p-8 text-center max-w-2xl mx-auto">
          <Mail className="h-6 w-6 text-gold mx-auto mb-3" />
          <p className="font-display text-lg text-foreground">{t("None of these quite fit?")}</p>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            {t("That's perfectly fine. Loneliness wears many faces — and the app is designed to meet you where you are, no matter your story.")}
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            {t("Reach out directly at")}{" "}
            <a href="mailto:pahal.bhatti11@gmail.com" className="text-primary font-medium hover:underline underline-offset-4 transition-colors">
              pahal.bhatti11@gmail.com
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

function Different() {
  const t = useT();
  const nots = [
    { icon: Smartphone, t: "Not a social media platform", d: "No feed, no followers, no performing. Nothing here is built to keep you scrolling." },
    { icon: MessageCircleHeart, t: "Not an AI chatbot friend", d: "We won't pretend to be your friend. We help you find real ones." },
  ];
  return (
    <section className="py-28 lg:py-36 bg-forest text-cream relative overflow-hidden">
      <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-gold/10 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <div>
            <p className="text-sm font-medium text-gold uppercase tracking-[0.2em]">{t("The rough solution")}</p>
            <h2 className="mt-4 text-4xl lg:text-5xl font-display leading-tight">
              {t("Make")} <span className="font-script text-gold text-6xl">{t("new")}</span> {t("connections.")}
            </h2>
            <p className="mt-5 text-cream/75 leading-relaxed">
              {t("Our research points to one thing: forming new connections is what actually helps. So that's what we help you do — start conversations with strangers, then deepen them, one prompt at a time.")}
            </p>
            <p className="mt-4 text-cream/75 leading-relaxed">
              {t("That means Let's Connect isn't a social media platform, and it isn't an AI chatbot. It's a guide that walks you out the door.")}
            </p>
            <div className="mt-8 rounded-2xl border border-gold/25 bg-gold/[0.06] p-6">
              <p className="font-script text-2xl text-gold">{t("The whole point")}</p>
              <p className="mt-1 text-sm text-cream/80">
                {t("Every prompt ends with you talking to an actual human, in an actual room.")}
              </p>
            </div>
          </div>
          <div className="space-y-5">
            {nots.map((n, i) => (
              <div key={i} className="rounded-3xl border border-cream/12 bg-cream/[0.04] p-7 transition-all duration-500 hover:-translate-y-1 hover:bg-cream/[0.07]">
                <div className="h-11 w-11 rounded-2xl bg-gold/15 grid place-items-center">
                  <n.icon className="h-5 w-5 text-gold" />
                </div>
                <h3 className="mt-5 font-display text-xl">{t(n.t)}</h3>
                <p className="mt-2 text-sm text-cream/70 leading-relaxed">{t(n.d)}</p>
              </div>
            ))}
            <div className="rounded-3xl border border-cream/12 bg-cream/[0.04] p-7">
              <div className="h-11 w-11 rounded-2xl bg-gold/15 grid place-items-center">
                <Users className="h-5 w-5 text-gold" />
              </div>
              <h3 className="mt-5 font-display text-xl">{t("A coach for real-life connection")}</h3>
              <p className="mt-2 text-sm text-cream/70 leading-relaxed">
                {t("Prompts, nudges and small missions that take you from a stranger's hello all the way to easy, comfortable friendship.")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Evidence() {
  const t = useT();
  const sources = [
    {
      icon: Lightbulb,
      cite: "Nicholas Epley, A Little More Social (2026)",
      href: "https://www.penguinrandomhouse.com/books/671591/a-little-more-social-by-nicholas-epley/9780593319550",
      finding: "We expect reaching out to go worse than it does, so we skip conversations that would have been good for us. Small, repeated choices to be a little more social add up.",
      app: "Every task is a small, low-stakes choice to try, not a big leap.",
    },
    {
      icon: MessageCircle,
      cite: "Schroeder, Lyons & Epley, Hello, stranger? (2022)",
      href: "https://pubmed.ncbi.nlm.nih.gov/34618536/",
      finding: "People expect starting a conversation to be less pleasant than it actually is, mostly because they assume the other person won't be interested.",
      app: "Nudges and framing calm the fear before you approach someone, then you see how it really went.",
    },
    {
      icon: MessageCircleHeart,
      cite: "Collins, Minson, Kristal & Brooks, Conveying and Detecting Listening (2023)",
      href: "https://www.hks.harvard.edu/publications/conveying-and-detecting-listening-during-live-conversation",
      finding: "Speakers overestimate how well their partners are listening. Feeling heard and being heard are not the same thing.",
      app: "Quick Help guides focus on showing real interest, not just looking interested.",
    },
    {
      icon: Users,
      cite: "Jerry Harvey, The Abilene Paradox (1974)",
      href: "https://palousemindfulness.com/docs/Abilene-Paradox.pdf",
      finding: "Groups can end up doing what no one wants because each person privately assumes everyone else wants it, and nobody says so.",
      app: "Later-stage prompts help you say the quiet part out loud, like \u201CCome over. We don't have to do anything.\u201D",
    },
  ];
  return (
    <section className="py-28 lg:py-36 bg-secondary/40 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-primary uppercase tracking-[0.2em]">{t("The evidence")}</p>
          <h2 className="mt-4 text-4xl lg:text-5xl font-display leading-tight">
            {t("What the research says about")} <span className="font-script text-primary text-6xl">{t("talking")}</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            {t("Our design draws on published work in social psychology. Here is what we learned and how it shows up in the app.")}
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {sources.map((x, i) => (
            <div key={i} className="rounded-3xl border border-border bg-card p-7 hover:shadow-[var(--shadow-soft)] transition-shadow duration-500">
              <x.icon className="h-5 w-5 text-primary" />
              <a href={x.href} target="_blank" rel="noopener noreferrer" className="mt-4 block font-display text-lg leading-snug hover:underline underline-offset-4">
                {x.cite}
              </a>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{t(x.finding)}</p>
              <p className="mt-4 text-sm leading-relaxed">
                <span className="font-medium text-primary">{t("In the app:")}</span> {t(x.app)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Journey() {
  const t = useT();
  const stages = [
    { icon: MessageCircleHeart, n: "Stage 01", t: "Small talk", d: "Low-stakes openers, weather, weekend plans. The reps that make the rest possible.", prompt: "Ask someone what the time is" },
    { icon: Heart, n: "Stage 02", t: "Big talk", d: "Real questions, real answers. Where small talk warms up, big talk lights up.", prompt: "If you could recreate a memory with me, which one would you want to recreate" },
    { icon: Gamepad2, n: "Stage 03", t: "Playtime", d: "Shared activities, inside jokes, doing things together. Friendship moves into the body.", prompt: "Learn a new card game together and play it" },
    { icon: Coffee, n: "Stage 04", t: "Hygge", d: "Easy silence. Pajamas on the couch - Routines that focus on comfort.", prompt: "Come over. We don't have to do anything." },
  ];
  return (
    <section id="journey" className="py-28 lg:py-36 bg-secondary/40">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-6">
          <h2 className="text-4xl lg:text-5xl font-display max-w-xl leading-tight">
            {t("The")} <span className="font-script text-primary text-6xl">{t("journey")}</span> {t("— small talk to hygge.")}
          </h2>
          <p className="text-muted-foreground max-w-sm">{t("Every real friendship climbs the same four rungs. We just hand you the ladder.")}</p>
        </div>

        <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-border bg-card px-5 py-2.5 text-sm">
          <Lightbulb className="h-4 w-4 text-gold" />
          <span className="text-muted-foreground">{t("Powered by gentle")} <span className="text-foreground font-medium">{t("nudge engineering")}</span> {t("— tiny prompts, well-timed insights, never guilt.")}</span>
        </div>
        <p className="mb-14 max-w-2xl text-sm text-muted-foreground leading-relaxed">
          {t("The prompts aren't there to be read and scrolled past. Each one is something to go and")}
          <span className="text-foreground font-medium"> {t("actually try with a real person")}</span> {t("— a stranger for small talk, then the same people again as you deepen those connections stage by stage.")}
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {stages.map((s, i) => (
            <div key={i} className="relative rounded-3xl bg-card border border-border p-7 overflow-hidden hover:-translate-y-1 hover:shadow-[var(--shadow-soft)] transition-all duration-500">
              <div className="absolute -top-6 -right-2 font-display text-[6rem] leading-none text-primary/10 select-none">{String(i + 1).padStart(2, "0")}</div>
              <div className="relative">
                <div className="h-11 w-11 rounded-2xl bg-primary/10 grid place-items-center">
                  <s.icon className="h-5 w-5 text-primary" />
                </div>
                <p className="mt-5 text-xs uppercase tracking-widest text-muted-foreground">{t(s.n)}</p>
                <h3 className="mt-1 font-display text-2xl">{t(s.t)}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{t(s.d)}</p>
                <div className="mt-5 rounded-2xl border border-dashed border-border bg-secondary/50 p-4">
                  <p className="text-[10px] uppercase tracking-widest text-primary font-medium">{t("Sample prompt")}</p>
                  <p className="mt-1 font-script text-lg text-foreground/90">&ldquo;{t(s.prompt)}&rdquo;</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-[2rem] overflow-hidden relative h-80 shadow-[var(--shadow-elegant)] group">
          <img src={featureMeet} alt={t("Two people meeting for coffee")} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          <div className="absolute inset-0 bg-gradient-to-r from-forest/85 via-forest/40 to-transparent" />
          <div className="absolute inset-0 flex items-center p-10 lg:p-16">
            <div className="max-w-md text-cream">
              <p className="font-script text-4xl text-gold">{t("small steps,")}</p>
              <h3 className="font-display text-3xl lg:text-4xl mt-2">{t("big, ordinary, beautiful moments.")}</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const t = useT();
  const quotes = [
    { q: "I used to script every text for an hour. Now I just send it.", a: "Priya, 27" },
    { q: "The daily nudge feels like a friend checking in — not an app.", a: "Marcus, 19" },
    { q: "Made my first real friend in three years. I'm crying writing this.", a: "Ellie, 34" },
  ];
  return (
    <section id="stories" className="py-28 lg:py-36 bg-forest text-cream relative overflow-hidden">
      <div className="absolute inset-0 bg-noise opacity-30" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <p className="text-sm font-medium text-gold uppercase tracking-[0.2em]">{t("Quiet wins")}</p>
        <h2 className="mt-4 text-4xl lg:text-5xl font-display max-w-2xl leading-tight">
          {t("Small messages from people who finally felt")} <span className="font-script text-gold text-6xl">{t("connected")}</span>.
        </h2>

        <div className="mt-14 grid sm:grid-cols-3 gap-6">
          {[
            { v: "100", l: "Net Promoter Score" },
            { v: "89%", l: "of the time, users said they felt less lonely after doing a suggested task" },
            { v: "75%", l: "of users would be very disappointed if the platform disappeared" },
          ].map((m, i) => (
            <div key={i} className="rounded-3xl border border-gold/25 bg-gold/[0.07] p-8 text-center transition-all duration-500 hover:bg-gold/[0.12]">
              <p className="font-display text-5xl text-gold">{m.v}</p>
              <p className="mt-3 text-sm leading-relaxed text-cream/70">{t(m.l)}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {quotes.map((q, i) => (
            <figure key={i} className="rounded-3xl border border-cream/15 bg-cream/5 backdrop-blur p-8 hover:bg-cream/10 hover:border-cream/25 transition-all duration-500">
              <Sparkles className="h-5 w-5 text-gold" />
              <blockquote className="mt-6 font-display text-2xl leading-snug">&ldquo;{t(q.q)}&rdquo;</blockquote>
              <figcaption className="mt-6 text-sm text-cream/60">— {q.a}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  const t = useT();
  const iosHref = iosUrl("download_section");
  const androidHref = androidUrl("download_section");
  const storeButton = "inline-flex w-full items-center justify-center gap-2 rounded-xl bg-foreground text-background px-6 py-3.5 font-medium hover:opacity-90 transition";
  return (
    <section id="download" className="relative overflow-hidden bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 grid lg:grid-cols-2 gap-10 items-center">
        <div className="py-20 lg:py-28 text-foreground">
          <h2 className="font-display text-5xl lg:text-6xl leading-[1.05]">
            {t("Download Let's Connect today")}
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-lg leading-relaxed">
            {t("Feeling lonely or socially anxious? We are here to help :)")}
          </p>
          <div className="mt-10 max-w-md">
            <div className="flex flex-col gap-3">
              <a href={iosHref} target="_blank" rel="noopener noreferrer" className={storeButton}>
                <Smartphone className="h-5 w-5" /> {t("Download for iOS")}
              </a>
              <a href={androidHref} target="_blank" rel="noopener noreferrer" className={storeButton}>
                <Smartphone className="h-5 w-5" /> {t("Download for Android")}
              </a>
            </div>
            <div className="mt-7 hidden md:flex items-center gap-4 text-xs uppercase tracking-[0.2em] text-muted-foreground" role="separator">
              <span className="h-px flex-1 bg-border" />
              {t("or")}
              <span className="h-px flex-1 bg-border" />
            </div>
            <div className="mt-7 hidden md:flex gap-4">
              <QrCard src={QR_IOS_SRC} label="iPhone & iPad" caption="Scan to download" alt={t("QR code to download Let's Connect on iPhone or iPad")} />
              <QrCard src={QR_ANDROID_SRC} label="Android" caption="Scan to download" alt={t("QR code to download Let's Connect on Android")} />
            </div>
          </div>
        </div>
        <div className="relative self-end flex justify-center lg:justify-end">
          <img src={handPhone} alt={t("A hand holding a phone showing the Let's Connect app")} loading="lazy" className="download-product-image w-full max-w-md lg:max-w-lg" />
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const t = useT();
  const [contactOpen, setContactOpen] = useState(false);
  return (
    <>
      <footer className="border-t border-border bg-cream/40">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-14 grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <img src={logoAsset.url} alt="Let's Connect" className="h-9 w-9 rounded-xl" />
              <span className="font-display text-lg">
                Let&apos;s <span className="font-script text-primary text-xl">Connect</span>
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {t("A quiet companion that helps you start real conversations and turn them into lasting connection — offline, at your own pace.")}
            </p>
            <p className="mt-5 text-xs leading-relaxed text-muted-foreground/80">
              {t("Operated by Tesserae Holdings LLC")}
              <br />
              {t("A Wyoming limited liability company")}
              <br />
              30 N Gould St, Ste R, Sheridan, WY 82801, USA
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-foreground/60">{t("Product")}</p>
            <div className="mt-4 flex flex-col gap-2.5 text-sm text-muted-foreground">
              <LLink to="/research" className="hover:text-foreground transition-colors">{t("Why we're lonely")}</LLink>
              <LLink to="/research" className="hover:text-foreground transition-colors">{t("The journey")}</LLink>
              <a href="/#download" className="hover:text-foreground transition-colors">{t("Download the app")}</a>
            </div>
          </div>

          <div className="md:col-span-4">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-foreground/60">{t("Legal & support")}</p>
            <div className="mt-4 flex flex-col gap-2.5 text-sm text-muted-foreground">
              <a href="https://www.termsfeed.com/live/c439c7ce-dbd4-4336-88aa-f89cce03625a" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">{t("Privacy policy")}</a>
              <LLink to="/terms" className="hover:text-foreground transition-colors">{t("Terms of service")}</LLink>
              <LLink to="/refund" className="hover:text-foreground transition-colors">{t("Refund policy")}</LLink>
              <button type="button" onClick={() => setContactOpen(true)} className="text-left hover:text-foreground transition-colors">{t("Contact us")}</button>
            </div>
          </div>
        </div>

        <div className="border-t border-border">
          <div className="mx-auto max-w-7xl px-6 lg:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
            <p>© {new Date().getFullYear()} Tesserae Holdings LLC. {t("All rights reserved.")}</p>
            <LangSwitcher className="text-foreground/70" />
            <p>{t("Let's Connect is a product of Tesserae Holdings LLC.")}</p>
          </div>
        </div>
      </footer>

      <Dialog open={contactOpen} onOpenChange={setContactOpen}>
        <DialogContent className="sm:max-w-md border-gold/25 bg-cream">
          <DialogHeader>
            <DialogTitle className="font-display text-3xl">
              {t("Let's")} <span className="font-script text-primary text-4xl">{t("talk")}</span>
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              {t("Reach out — I'd genuinely love to hear from you.")}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-2 space-y-3">
            <a href="mailto:pahal.bhatti11@gmail.com" className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-4 hover:border-gold/40 hover:shadow-[var(--shadow-soft)] transition-all">
              <div className="h-11 w-11 rounded-xl bg-primary/10 grid place-items-center shrink-0">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div className="min-w-0">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">{t("Email")}</p>
                <p className="font-medium truncate">pahal.bhatti11@gmail.com</p>
              </div>
            </a>
            <a href="https://wa.me/97433720786" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-4 hover:border-gold/40 hover:shadow-[var(--shadow-soft)] transition-all">
              <div className="h-11 w-11 rounded-xl bg-primary/10 grid place-items-center shrink-0">
                <MessageCircle className="h-5 w-5 text-primary" />
              </div>
              <div className="min-w-0">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">WhatsApp</p>
                <p className="font-medium">+974 33720786</p>
              </div>
            </a>
            <a href="https://instagram.com/pahal.bhatti11" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-4 hover:border-gold/40 hover:shadow-[var(--shadow-soft)] transition-all">
              <div className="h-11 w-11 rounded-xl bg-primary/10 grid place-items-center shrink-0">
                <Instagram className="h-5 w-5 text-primary" />
              </div>
              <div className="min-w-0">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">Instagram</p>
                <p className="font-medium">@pahal.bhatti11</p>
              </div>
            </a>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

function Loyalty() {
  const t = useT();
  const [open, setOpen] = useState(false);
  const freeRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    const el = freeRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    let armed = true;
    let lastFire = 0;
    let stop: (() => void) | null = null;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && armed) {
        armed = false;
        lastFire = performance.now();
        stop?.();
        stop = fireSideConfetti();
      } else if (!entry.isIntersecting && !armed && performance.now() - lastFire > 3000) {
        armed = true;
      }
    }, { threshold: 0.9 });
    io.observe(el);
    return () => { io.disconnect(); stop?.(); };
  }, []);
  const prefetchSteps = () => { if (typeof window !== "undefined") new Image().src = loyaltySteps.url; };
  const tiers = [
    { icon: Coins, amount: "$0", label: "Fewer than 3 tasks this quarter", note: "No payout — but the price of a coffee isn't a bad bet on your social life." },
    { icon: Banknote, amount: "$20.20", label: "3 or more tasks this quarter", note: "Do the little tasks we suggest, and more than you paid comes straight back." },
    { icon: BadgeCheck, amount: "$21", label: "3 or more verified tasks this quarter", note: "Verify what you actually did, and the payout grows again." },
  ];
  return (
    <section className="loyalty-section relative py-28 lg:py-36 text-cream">
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/15 px-4 py-1.5 text-xs uppercase tracking-widest text-cream">
            <Ticket className="h-3.5 w-3.5 text-gold" /> {t("The loyalty program")}
          </span>
          <h2 ref={freeRef} className="mt-8 free-gold font-script text-[5.5rem] sm:text-[8rem] lg:text-[10rem] leading-[0.9]">{t("It's free!!")}</h2>
          <p className="mt-8 text-3xl lg:text-4xl font-display leading-tight text-cream">
            <span className="inline-block whitespace-nowrap">{t("Want to get paid")}</span>{" "}
            <span className="inline-block whitespace-nowrap">{t("to make friends?")}</span>
          </p>
        </div>

        <div className="mt-8 text-center">
          <button type="button" onClick={() => setOpen((o) => !o)} onMouseEnter={prefetchSteps} onFocus={prefetchSteps} aria-expanded={open} className="inline-flex items-center gap-2 rounded-full border border-cream/40 px-6 py-2.5 text-sm font-medium text-cream hover:bg-cream/10 transition">
            {t("Learn more")} <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
          </button>
        </div>

        {open && <div className="mt-10 animate-fade-up">
          <img src={loyaltySteps.url} alt={t("Deposit $20, make friends, get paid $21")} decoding="async" className="mx-auto w-full max-w-5xl rounded-[2rem] shadow-[var(--shadow-elegant)]" />
          <div className="relative mt-10 max-w-3xl mx-auto">
          <div className="absolute -inset-4 rounded-[2.5rem] bg-gold/15 blur-2xl pointer-events-none" />
          <div className="relative rounded-[2rem] border-2 border-dashed border-gold/60 bg-white p-8 lg:p-10 shadow-[var(--shadow-elegant)] text-foreground">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-8 border-b border-dashed border-gold/40">
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">{t("Entry price")}</p>
                <p className="mt-1 font-display text-3xl">$20 <span className="text-base text-muted-foreground font-sans">{t("/ quarter")}</span></p>
              </div>
              <div className="rounded-full bg-gold/15 border border-gold/30 px-4 py-2 text-sm font-medium text-foreground/80">
                {t("Cash payout, every quarter")}
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-5">
              {tiers.map((tier, i) => (
                <div key={i} className="rounded-2xl border border-border bg-white p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                    <div className="h-11 w-11 shrink-0 rounded-2xl bg-primary/10 grid place-items-center">
                      <tier.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="sm:w-32 shrink-0">
                      <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{t("You get back")}</p>
                      <p className="font-display text-3xl text-foreground">{tier.amount}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground/90">{t(tier.label)}</p>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{t(tier.note)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-8 text-center text-sm text-muted-foreground max-w-xl mx-auto">
              {t("Yes — $20.20 and $21 are")} <span className="text-foreground font-medium">{t("more than you paid")}</span>{t(". Real money back in your pocket for doing the thing that actually helps: going out and connecting with people.")}
            </p>
            <p className="mt-4 text-center text-xs">
              <LLink to="/refund" className="text-muted-foreground underline underline-offset-4 hover:text-foreground transition-colors">{t("Refund policy")}</LLink>
            </p>
          </div>
          </div>
          <div className="mt-10 text-center">
            <a
              href="https://forms.gle/XzazRPugRzwu1uWS6"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-2 rounded-full bg-gold px-8 py-4 text-gold-foreground font-medium shadow-[var(--shadow-gold)] transition-all duration-500 overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-cream/60 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <HandHeart className="relative h-4 w-4" />
              <span className="relative">{t("Show your interest")}</span>
            </a>
            <p className="mt-3 text-sm text-cream/75">
              {t("Showing interest is")} <span className="text-cream font-medium">{t("completely free")}</span> {t("— no card, no commitment, just a raised hand.")}
            </p>
          </div>
        </div>}

      </div>
    </section>
  );
}
