import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/pages/Home";
import { buildHead } from "@/lib/i18n";

export const Route = createFileRoute("/")({
  head: () => buildHead("en", "/"),
  component: HomePage,
});
