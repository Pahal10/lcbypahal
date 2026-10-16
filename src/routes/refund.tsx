import { createFileRoute } from "@tanstack/react-router";
import { RefundPage } from "@/pages/refund";
import { buildHead } from "@/lib/i18n";

export const Route = createFileRoute("/refund")({
  head: () => buildHead("en", "/refund"),
  component: RefundPage,
});
