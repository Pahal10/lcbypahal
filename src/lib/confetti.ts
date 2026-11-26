const COLORS = ["#e6c35c", "#f0d27a", "#34d399", "#10b981", "#f6f1e3", "#ffffff"];
const EMIT_SECONDS = 1.4;

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  rot: number;
  vr: number;
  flip: number;
  age: number;
  life: number;
}

/**
 * Confetti from both sides of the viewport, shooting up and inward. Returns a cancel function.
 * No-op on the server and when the visitor prefers reduced motion.
 */
export function fireSideConfetti(): () => void {
  if (typeof window === "undefined" || typeof document === "undefined") return () => {};
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return () => {};

  const w = window.innerWidth;
  const h = window.innerHeight;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const canvas = document.createElement("canvas");
  canvas.setAttribute("aria-hidden", "true");
  canvas.width = Math.floor(w * dpr);
  canvas.height = Math.floor(h * dpr);
  Object.assign(canvas.style, {
    position: "fixed",
    inset: "0",
    width: "100%",
    height: "100%",
    pointerEvents: "none",
    zIndex: "60",
  });
  const ctx = canvas.getContext("2d");
  if (!ctx) return () => {};
  ctx.scale(dpr, dpr);
  document.body.appendChild(canvas);

  const gravity = h * 1.55; // px / s^2
  const particles: Particle[] = [];

  const emit = (count: number) => {
    for (const side of [-1, 1] as const) {
      for (let i = 0; i < count; i++) {
        const angle = ((side === -1 ? 62 : 118) + (Math.random() - 0.5) * 44) * (Math.PI / 180);
        const reach = h * (0.55 + Math.random() * 0.4); // how high the piece climbs
        const speed = Math.sqrt(2 * gravity * reach) / Math.sin(angle > Math.PI / 2 ? Math.PI - angle : angle);
        particles.push({
          x: side === -1 ? -8 : w + 8,
          y: h * (0.8 + Math.random() * 0.14),
          vx: Math.cos(angle) * speed * 0.85,
          vy: -Math.sin(angle) * speed,
          size: 7 + Math.random() * 7,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          rot: Math.random() * Math.PI * 2,
          vr: (Math.random() - 0.5) * 12,
          flip: Math.random() * Math.PI * 2,
          age: 0,
          life: 2.6 + Math.random() * 1.0,
        });
      }
    }
  };

  let raf = 0;
  let stopped = false;
  let last = performance.now();
  const start = last;
  let emitted = 0;

  const cleanup = () => {
    stopped = true;
    cancelAnimationFrame(raf);
    canvas.remove();
  };

  const frame = (now: number) => {
    if (stopped) return;
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    const elapsed = (now - start) / 1000;

    if (elapsed <= EMIT_SECONDS && elapsed >= emitted * 0.12) {
      emit(emitted === 0 ? 55 : 7);
      emitted++;
    }

    ctx.clearRect(0, 0, w, h);
    const drag = Math.exp(-0.7 * dt);
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.age += dt;
      if (p.age >= p.life || p.y > h + 40) {
        particles.splice(i, 1);
        continue;
      }
      p.vx *= drag;
      p.vy = p.vy * drag + gravity * dt;
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.rot += p.vr * dt;
      p.flip += 9 * dt;
      const fade = p.age > p.life * 0.75 ? 1 - (p.age - p.life * 0.75) / (p.life * 0.25) : 1;
      ctx.save();
      ctx.globalAlpha = Math.max(0, fade);
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.scale(1, Math.cos(p.flip));
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size * 0.3, p.size, p.size * 0.6);
      ctx.restore();
    }

    if (elapsed > EMIT_SECONDS && particles.length === 0) {
      cleanup();
      return;
    }
    raf = requestAnimationFrame(frame);
  };

  raf = requestAnimationFrame(frame);
  return cleanup;
}
