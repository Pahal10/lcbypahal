import { createFileRoute } from "@tanstack/react-router";
import { RefundPage } from "@/pages/refund";
import { buildHead } from "@/lib/i18n";

export const Route = createFileRoute("/pt/refund")({
  head: () => buildHead("pt", "/refund"),
  component: RefundPage,
});
