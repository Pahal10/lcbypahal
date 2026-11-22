import { createFileRoute } from "@tanstack/react-router";
import { VerifyPage } from "@/pages/verify";
import { buildHead } from "@/lib/i18n";

export const Route = createFileRoute("/es/verify")({
  head: () => buildHead("es", "/verify", { noindex: true }),
  component: VerifyPage,
});
