import { createFileRoute } from "@tanstack/react-router";
import { SuccessPage } from "@/pages/success";
import { buildHead } from "@/lib/i18n";

export const Route = createFileRoute("/pt/success")({
  head: () => buildHead("pt", "/success", { noindex: true }),
  component: SuccessPage,
});
