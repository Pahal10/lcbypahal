import { useState } from "react";
import { ArrowRight, Dumbbell, Footprints, Menu, X } from "lucide-react";
import logoPng from "@/assets/logo.png";
const logo = { url: logoPng };import phones from "@/assets/hero/phones.png";
import { Button } from "@/components/ui/button";
import { LLink, LangSwitcher, useT } from "@/lib/i18n";
import heroBg from "@/assets/hero/hero-bg.jpg";

export function OpeningArtwork() {
  const t = useT();
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <section id="product" className="hero2" aria-label={t("Meet Let's Connect")}>
      <img src={heroBg} alt="" aria-hidden="true" className="hero2-bg" fetchPriority="high" />
      <header className="opening-header absolute inset-x-0 top-0 z-10">
        <LLink to="/" className="opening-brand"><img src={logo.url} alt="" /><span>Let's <i>Connect</i></span></LLink>
        <nav className="opening-desktop-nav" aria-label={t("Main navigation")}><LLink to="/research">{t("Why we're lonely")}</LLink><LLink to="/research">{t("The journey")}</LLink><a href="#stories">{t("Stories")}</a></nav>
        <div className="opening-header-actions"><LangSwitcher /><Button asChild className="hidden lg:inline-flex rounded-full"><a href="/#download">{t("Get started")}<ArrowRight /></a></Button><Button variant="ghost" size="icon" className="lg:hidden" aria-label={t(menuOpen ? "Close menu" : "Open menu")} aria-expanded={menuOpen} aria-controls="opening-menu" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</Button></div>
      </header>
      {menuOpen && <nav id="opening-menu" className="opening-mobile-nav absolute inset-x-0 top-[72px] z-20" aria-label={t("Main navigation")}><LLink to="/research">{t("Why we're lonely")}</LLink><LLink to="/research">{t("The journey")}</LLink><a href="#stories" onClick={() => setMenuOpen(false)}>{t("Stories")}</a><a href="/#download" onClick={() => setMenuOpen(false)}>{t("Get started")}</a></nav>}
        <h1>{t("Build the confidence to start conversations,")}<br className="hidden min-[900px]:block" /> {t("make friends, and turn everyday moments")}<br className="hidden min-[900px]:block" /> {t("into")} <em>{t("meaningful connections.")}</em></h1>      <div className="hero2-stage">
        <div className="hero2-benefit hero2-benefit-left"><div className="hero2-icon"><Footprints /></div><h2>{t("Real-world Activities")}</h2><p>{t("Hands-on activities to try with strangers that you approach with our help.")}</p></div>
        <div className="hero2-phones"><img src={phones} alt={t("Let's Connect app preview")} fetchPriority="high" /></div>
        <div className="hero2-benefit hero2-benefit-right"><div className="hero2-icon"><Dumbbell /></div><h2>{t("Conversation Gym")}</h2><p>{t("Build your social muscle — anytime, anywhere.")}</p></div>
      </div>
    </section>
  );
}
