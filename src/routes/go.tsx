import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { androidUrl, iosUrl, redirectResponse } from "@/lib/store-links";

/** Smart link: sends phones to their store, everyone else to the download section. */
export const Route = createFileRoute("/go")({
  server: {
    handlers: {
      GET: async ({ request }: { request: Request }) => {
        const ua = request.headers.get("user-agent") ?? "";
        if (/iPhone|iPod/i.test(ua)) return redirectResponse(iosUrl("qr_auto"));
        if (/Android/i.test(ua)) return redirectResponse(androidUrl("qr_auto"));
        return redirectResponse(new URL("/#download", request.url).toString());
      },
    },
  },
});
