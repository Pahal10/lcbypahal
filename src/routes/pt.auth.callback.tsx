import { createFileRoute } from "@tanstack/react-router";
import { CallbackPage } from "@/pages/auth.callback";
import { buildHead } from "@/lib/i18n";

export const Route = createFileRoute("/pt/auth/callback")({
  validateSearch: (s: Record<string, unknown>) => ({ lang: s.lang === "pt" || s.lang === "es" ? s.lang : "en" }),
  head: () => buildHead("pt", "/auth/callback", { noindex: true }),
  component: CallbackPage,
});
