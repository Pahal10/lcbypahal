import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { iosUrl, redirectResponse } from "@/lib/store-links";

export const Route = createFileRoute("/go/ios")({
  server: {
    handlers: {
      GET: async () => redirectResponse(iosUrl("qr_ios")),
    },
  },
});
