import { createFileRoute } from "@tanstack/react-router";
import { PricingPage } from "@/pages/pricing";
import { buildHead } from "@/lib/i18n";

export const Route = createFileRoute("/es/pricing")({
  head: () => buildHead("es", "/pricing"),
  component: PricingPage,
});
