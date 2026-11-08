import mobileArtwork from "@/assets/lc-opening-mobile.jpg.asset.json";
import desktopArtwork from "@/assets/lc-opening-desktop.jpg.asset.json";
import { LLink, useT } from "@/lib/i18n";

const hotspot = "absolute block rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

export function OpeningArtwork() {
  const t = useT();
  return (
    <section id="product" className="relative w-full bg-forest" aria-label={t("Meet Let's Connect")}>
      <h1 className="sr-only">{t("Build the confidence to start conversations, make friends, and turn everyday moments into meaningful connections. Let's Connect conversation gym and small talk screens.")}</h1>
      <picture>
        <source media="(min-width: 768px)" srcSet={desktopArtwork.url} width={1920} height={1081} />
        <img src={mobileArtwork.url} width={1072} height={1920} fetchPriority="high" alt={t("Build the confidence to start conversations, make friends, and turn everyday moments into meaningful connections. Let's Connect conversation gym and small talk screens.")} className="block h-auto w-full" />
      </picture>
      <div className="md:hidden">
        <a className={`${hotspot} left-[10.4%] top-[91.7%] h-[5.1%] w-[36%] rounded-full`} href="https://apps.apple.com/qa/app/lc-lets-connect/id6792295616" target="_blank" rel="noopener noreferrer" aria-label={t("Download for iOS")} />
        <a className={`${hotspot} left-[49%] top-[91.7%] h-[5.1%] w-[46.2%] rounded-full`} href="https://play.google.com/store/apps/details?id=com.pahal.lc&pcampaignid=web_share" target="_blank" rel="noopener noreferrer" aria-label={t("Download on Google Play")} />
      </div>
      <nav className="hidden md:block" aria-label="Main navigation">
        <LLink to="/" className={`${hotspot} left-[3.5%] top-[1.5%] h-[7%] w-[14%]`} aria-label="Let's Connect" />
        <LLink to="/research" className={`${hotspot} left-[35.4%] top-[3%] h-[4.5%] w-[9.5%]`} aria-label={t("Why we're lonely")} />
        <LLink to="/research" className={`${hotspot} left-[47%] top-[3%] h-[4.5%] w-[7.2%]`} aria-label={t("The journey")} />
        <a href="#stories" className={`${hotspot} left-[58%] top-[3%] h-[4.5%] w-[5%]`} aria-label={t("Stories")} />
        <a href="/" hrefLang="en" className={`${hotspot} left-[78.4%] top-[3%] h-[4.5%] w-[2.1%]`} aria-label="English" />
        <a href="/pt" hrefLang="pt-BR" className={`${hotspot} left-[81.2%] top-[3%] h-[4.5%] w-[2.1%]`} aria-label="Português" />
        <a href="/es" hrefLang="es" className={`${hotspot} left-[83.8%] top-[3%] h-[4.5%] w-[2.1%]`} aria-label="Español" />
        <a href="#download" className={`${hotspot} left-[87.3%] top-[2.4%] h-[5.5%] w-[10%] rounded-full`} aria-label={t("Get started")} />
      </nav>
    </section>
  );
}