import { createFileRoute } from "@tanstack/react-router";
import { ResearchPage } from "@/pages/Home";
import { buildHead } from "@/lib/i18n";

export const Route = createFileRoute("/research")({
  head: () => buildHead("en", "/research"),
  component: ResearchPage,
});
