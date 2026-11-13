import { useState } from "react";
import { ArrowRight, Dumbbell, Footprints, Menu, X } from "lucide-react";
import logo from "@/assets/logo.png.asset.json";
import phones from "@/assets/hero/phones.webp";
import { Button } from "@/components/ui/button";
import { LLink, LangSwitcher, useT } from "@/lib/i18n";

export function OpeningArtwork() {
  const t = useT();
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <section id="product" className="opening-ui" aria-label={t("Meet Let's Connect")}>
      <header className="opening-header absolute inset-x-0 top-0 z-10">
        <LLink to="/" className="opening-brand"><img src={logo.url} alt="" /><span>Let's <i>Connect</i></span></LLink>
        <nav className="opening-desktop-nav" aria-label={t("Main navigation")}><LLink to="/research">{t("Why we're lonely")}</LLink><LLink to="/research">{t("The journey")}</LLink><a href="#stories">{t("Stories")}</a></nav>
        <div className="opening-header-actions"><LangSwitcher /><Button asChild className="hidden lg:inline-flex rounded-full"><a href="/#download">{t("Get started")}<ArrowRight /></a></Button><Button variant="ghost" size="icon" className="lg:hidden" aria-label={t(menuOpen ? "Close menu" : "Open menu")} aria-expanded={menuOpen} aria-controls="opening-menu" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</Button></div>
      </header>
      {menuOpen && <nav id="opening-menu" className="opening-mobile-nav absolute inset-x-0 top-[72px] z-20" aria-label={t("Main navigation")}><LLink to="/research">{t("Why we're lonely")}</LLink><LLink to="/research">{t("The journey")}</LLink><a href="#stories" onClick={() => setMenuOpen(false)}>{t("Stories")}</a><a href="/#download" onClick={() => setMenuOpen(false)}>{t("Get started")}</a></nav>}
      <div className="opening-content">
        <h1>{t("We can help you start conversations,")}<br className="hidden sm:block" /> {t("make friends, and turn everyday moments")}<br className="hidden sm:block" /> {t("into")} <em>{t("meaningful connections.")}</em></h1>
        <div className="opening-product">
          <div className="opening-benefit"><Footprints /><h2>{t("Real-world Activities")}</h2><p>{t("Hands-on activities to try with strangers that you approach with our help.")}</p></div>
          <div className="opening-phones"><img src={phones} alt={t("Let's Connect app preview")} className="opening-phone-pair" fetchPriority="high" /></div>
          <div className="opening-benefit"><Dumbbell /><h2>{t("Conversation Gym")}</h2><p>{t("Build your social muscle — anytime, anywhere.")}</p></div>
        </div>
      </div>
    </section>
  );
}
