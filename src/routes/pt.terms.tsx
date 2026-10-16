import { createFileRoute } from "@tanstack/react-router";
import { TermsPage } from "@/pages/terms";
import { buildHead } from "@/lib/i18n";

export const Route = createFileRoute("/pt/terms")({
  head: () => buildHead("pt", "/terms"),
  component: TermsPage,
});
