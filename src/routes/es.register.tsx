import { createFileRoute } from "@tanstack/react-router";
import { RegisterPage } from "@/pages/register";
import { buildHead } from "@/lib/i18n";

export const Route = createFileRoute("/es/register")({
  head: () => buildHead("es", "/register"),
  component: RegisterPage,
});
