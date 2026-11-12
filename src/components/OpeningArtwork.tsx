import { useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import logo from "@/assets/logo.png.asset.json";
import { Button } from "@/components/ui/button";
import { LLink, LangSwitcher, useLang, useT } from "@/lib/i18n";
import desktopEn from "@/assets/hero/hero-desktop-en.webp";
import desktopPt from "@/assets/hero/hero-desktop-pt.webp";
import desktopEs from "@/assets/hero/hero-desktop-es.webp";
import mobileEn from "@/assets/hero/hero-mobile-en.webp";
import mobilePt from "@/assets/hero/hero-mobile-pt.webp";
import mobileEs from "@/assets/hero/hero-mobile-es.webp";

const HERO = {
  desktop: { en: desktopEn, pt: desktopPt, es: desktopEs },
  mobile: { en: mobileEn, pt: mobilePt, es: mobileEs },
};

export function OpeningArtwork() {
  const t = useT();
  const lang = useLang();
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <section id="product" className="opening-ui" aria-label={t("Meet Let's Connect")}>
      <picture className="opening-hero-picture">
        <source media="(min-width: 900px)" srcSet={HERO.desktop[lang]} />
        <img src={HERO.mobile[lang]} alt={t("Let's Connect app preview")} className="opening-hero-img" fetchPriority="high" />
      </picture>
      <h1 className="sr-only">{t("We can help you start conversations,")} {t("make friends, and turn everyday moments")} {t("into")} {t("meaningful connections.")}</h1>
      <header className="opening-header absolute inset-x-0 top-0 z-10">
        <LLink to="/" className="opening-brand"><img src={logo.url} alt="" /><span>Let's <i>Connect</i></span></LLink>
        <nav className="opening-desktop-nav" aria-label={t("Main navigation")}><LLink to="/research">{t("Why we're lonely")}</LLink><LLink to="/research">{t("The journey")}</LLink><a href="#stories">{t("Stories")}</a></nav>
        <div className="opening-header-actions"><LangSwitcher /><Button asChild className="hidden lg:inline-flex rounded-full"><a href="/#download">{t("Get started")}<ArrowRight /></a></Button><Button variant="ghost" size="icon" className="lg:hidden" aria-label={t(menuOpen ? "Close menu" : "Open menu")} aria-expanded={menuOpen} aria-controls="opening-menu" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</Button></div>
      </header>
      {menuOpen && <nav id="opening-menu" className="opening-mobile-nav absolute inset-x-0 top-[72px] z-20" aria-label={t("Main navigation")}><LLink to="/research">{t("Why we're lonely")}</LLink><LLink to="/research">{t("The journey")}</LLink><a href="#stories" onClick={() => setMenuOpen(false)}>{t("Stories")}</a><a href="/#download" onClick={() => setMenuOpen(false)}>{t("Get started")}</a></nav>}
    </section>
  );
}
