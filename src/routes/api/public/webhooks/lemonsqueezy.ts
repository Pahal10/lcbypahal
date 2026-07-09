import { createFileRoute } from "@tanstack/react-router";
import { createHmac, timingSafeEqual } from "node:crypto";

export const Route = createFileRoute("/api/public/webhooks/lemonsqueezy")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;
        if (!secret) return new Response("Server not configured", { status: 500 });

        const signature = request.headers.get("x-signature") ?? "";
        const raw = await request.text();

        const expected = createHmac("sha256", secret).update(raw).digest("hex");
        const sigBuf = Buffer.from(signature, "utf8");
        const expBuf = Buffer.from(expected, "utf8");
        if (sigBuf.length !== expBuf.length || !timingSafeEqual(sigBuf, expBuf)) {
          return new Response("Invalid signature", { status: 401 });
        }

        let payload: any;
        try {
          payload = JSON.parse(raw);
        } catch {
          return new Response("Invalid JSON", { status: 400 });
        }

        const eventName: string | undefined = payload?.meta?.event_name;
        const userId: string | undefined = payload?.meta?.custom_data?.user_id;

        // Grant premium on any successful subscription signal
        const grantEvents = new Set([
          "subscription_created",
          "subscription_payment_success",
          "subscription_updated",
          "subscription_resumed",
          "order_created",
        ]);
        const revokeEvents = new Set([
          "subscription_cancelled",
          "subscription_expired",
        ]);

        if (userId && (grantEvents.has(eventName ?? "") || revokeEvents.has(eventName ?? ""))) {
          const { getAppSupabase } = await import("@/lib/app-supabase.server");
          const supabase = getAppSupabase();
          const premium = grantEvents.has(eventName ?? "");
          const { error } = await supabase
            .from("users")
            .update({ premium })
            .eq("id", userId);
          if (error) {
            console.error("Failed to update premium", error);
            return new Response("DB update failed", { status: 500 });
          }
        }

        return new Response("ok", { status: 200 });
      },
    },
  },
});
