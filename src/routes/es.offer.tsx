import { createFileRoute } from "@tanstack/react-router";
import { OfferPage } from "@/pages/offer";
import { buildHead } from "@/lib/i18n";

export const Route = createFileRoute("/es/offer")({
  validateSearch: (s: Record<string, unknown>) => ({ userId: typeof s.userId === "string" ? s.userId : "", email: typeof s.email === "string" ? s.email : "" }),
  head: () => buildHead("es", "/offer"),
  component: OfferPage,
});
