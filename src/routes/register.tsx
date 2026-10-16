import { createFileRoute } from "@tanstack/react-router";
import { RegisterPage } from "@/pages/register";
import { buildHead } from "@/lib/i18n";

export const Route = createFileRoute("/register")({
  head: () => buildHead("en", "/register"),
  component: RegisterPage,
});
