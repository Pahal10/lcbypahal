import { Leaf, TrendingUp, MessageCircle } from "lucide-react";
import aurora from "@/assets/aurora-deep.jpg.asset.json";
import { AppPhone } from "@/components/AppPhone";
import { useT } from "@/lib/i18n";

export function ProductFeatures() {
  const t = useT();
  const features = [
    { title: "Calming Social Nerves", description: "Gentle, low-stakes nudges and actionable framing to lower your anxiety before approaching anyone.", icon: Leaf, screen: "task" as const },
    { title: "Progress Beyond Small Talk", description: "Smart tracking that suggests when — and how — to take acquaintance interactions deeper at your own pace.", icon: TrendingUp, screen: "people" as const },
    { title: "Quick Conversation Save", description: "Instant, on-demand cheat codes for handling awkward silences or exiting conversations gracefully.", icon: MessageCircle, screen: "help" as const },
  ];
  return <section className="features-ui aurora-surface" aria-labelledby="features-title">
    <img src={aurora.url} alt="" aria-hidden="true" className="aurora-backdrop" loading="lazy" />
    <div className="features-inner"><h2 id="features-title">{t("What")} <span>Let's Connect</span> {t("consists of")}</h2><div className="feature-title-rule" />
      <div className="feature-grid">{features.map(({ title, description, icon: Icon, screen }, i) => <article key={title} className="product-feature"><div className="product-feature-copy"><span className="feature-number">0{i + 1}</span><h3>{t(title)}</h3><p>{t(description)}</p><div className="feature-icon"><Icon /></div></div><AppPhone screen={screen} className="feature-phone" /></article>)}</div>
    </div>
  </section>;
}