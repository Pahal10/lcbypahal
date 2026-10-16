import { createFileRoute } from "@tanstack/react-router";
import { RegisterPage } from "@/pages/register";
import { buildHead } from "@/lib/i18n";

export const Route = createFileRoute("/pt/register")({
  head: () => buildHead("pt", "/register"),
  component: RegisterPage,
});
