import { useEffect, useRef } from "react";
import { useT } from "@/lib/i18n";

export function PriceScreen() {
  const t = useT();
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    if (!section || !title) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const update = () => {
      frame = 0;
      if (reducedMotion.matches) {
        title.style.transform = "none";
        title.style.opacity = "1";
        return;
      }
      const rect = section.getBoundingClientRect();
      const height = window.innerHeight;
      const entrance = Math.max(0, Math.min(1, 1 - rect.top / height));
      const exit = Math.max(0, Math.min(1, -rect.top / Math.max(1, rect.height - height)));
      title.style.transform = `translateY(${(1 - entrance) * 120 - exit * height * 0.42}px)`;
      title.style.opacity = String(entrance * (1 - exit));
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    reducedMotion.addEventListener("change", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      reducedMotion.removeEventListener("change", schedule);
    };
  }, []);

  return <section ref={sectionRef} className="price-scroll" aria-labelledby="price-title">
    <div className="price-screen"><h2 ref={titleRef} id="price-title">{t("Price?")}</h2></div>
  </section>;
}