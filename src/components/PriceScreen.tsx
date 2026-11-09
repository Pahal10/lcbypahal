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
    let currentY = 260;
    let currentOpacity = 0;
    const update = () => {
      frame = 0;
      if (reducedMotion.matches) {
        title.style.transform = "none";
        title.style.opacity = "1";
        return;
      }
      const rect = section.getBoundingClientRect();
      const height = window.innerHeight;
      const clamp = (value: number) => Math.max(0, Math.min(1, value));
      const smooth = (value: number) => value * value * (3 - 2 * value);
      const entrance = smooth(clamp((height - rect.top) / (height * 2.5)));
      const exit = smooth(clamp((-rect.top / height - 2.2) / 1.8));
      const targetY = (1 - entrance) * height * 0.38 - exit * height * 0.42;
      const targetOpacity = entrance * (1 - exit);
      currentY += (targetY - currentY) * 0.085;
      currentOpacity += (targetOpacity - currentOpacity) * 0.085;
      title.style.transform = `translateY(${currentY}px)`;
      title.style.opacity = String(currentOpacity);
      if (Math.abs(targetY - currentY) > 0.1 || Math.abs(targetOpacity - currentOpacity) > 0.001) {
        frame = requestAnimationFrame(update);
      }
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