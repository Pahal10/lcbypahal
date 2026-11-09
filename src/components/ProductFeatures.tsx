import { Leaf, TrendingUp, MessageCircle } from "lucide-react";
import taskScreen from "@/assets/app-smalltalk-screen.png.asset.json";
import peopleScreen from "@/assets/app-people-screen.png.asset.json";
import helpScreen from "@/assets/app-help-screen.png.asset.json";
import { useT } from "@/lib/i18n";

export function ProductFeatures() {
  const t = useT();
  const features = [
    { title: "Calming Social Nerves", description: "Gentle, low-stakes nudges and actionable framing to lower your anxiety before approaching anyone.", icon: Leaf, screen: taskScreen },
    { title: "Progress Beyond Small Talk", description: "Smart tracking that suggests when — and how — to take acquaintance interactions deeper at your own pace.", icon: TrendingUp, screen: peopleScreen },
    { title: "Quick Conversation Save", description: "Instant, on-demand cheat codes for handling awkward silences or exiting conversations gracefully.", icon: MessageCircle, screen: helpScreen },
  ];
  return <section className="features-ui" aria-labelledby="features-title">
    <div className="features-inner"><h2 id="features-title">{t("What")} <span>Let's Connect</span> {t("consists of")}</h2><div className="feature-title-rule" />
      <div className="feature-grid">{features.map(({ title, description, icon: Icon, screen }, i) => <article key={title} className="product-feature"><div className="product-feature-copy"><span className="feature-number">0{i + 1}</span><h3>{t(title)}</h3><p>{t(description)}</p><div className="feature-icon"><Icon /></div></div><div className="app-phone feature-phone uploaded-app-phone"><img src={screen.url} alt={t(title)} loading="lazy" /></div></article>)}</div>
    </div>
  </section>;
}