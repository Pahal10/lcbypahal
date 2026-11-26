import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { androidUrl, redirectResponse } from "@/lib/store-links";

export const Route = createFileRoute("/go/android")({
  server: {
    handlers: {
      GET: async () => redirectResponse(androidUrl("qr_android")),
    },
  },
});
