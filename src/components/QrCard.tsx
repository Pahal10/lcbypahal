import { useT } from "@/lib/i18n";

interface QrCardProps {
  /** URL of the QR image. Leave undefined to show the placeholder. */
  src?: string;
  label: string;
  caption: string;
  alt: string;
}

/** Dark QR on a light card with a generous quiet zone, so phone cameras scan it reliably. */
export function QrCard({ src, label, caption, alt }: QrCardProps) {
  const t = useT();
  return (
    <figure className="flex-1 rounded-2xl border border-forest/20 bg-white p-4 text-center shadow-[var(--shadow-soft)]">
      <div className="mx-auto aspect-square w-full max-w-[160px] overflow-hidden rounded-xl bg-white">
        {src ? (
          <img src={src} alt={alt} width={320} height={320} loading="lazy" className="h-full w-full object-contain" />
        ) : (
          <div className="grid h-full w-full place-items-center rounded-xl border-2 border-dashed border-forest/25 px-2 text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
            {t("QR coming soon")}
          </div>
        )}
      </div>
      <figcaption className="mt-3">
        <p className="font-display text-base text-foreground">{t(label)}</p>
        <p className="text-xs text-muted-foreground">{t(caption)}</p>
      </figcaption>
    </figure>
  );
}
