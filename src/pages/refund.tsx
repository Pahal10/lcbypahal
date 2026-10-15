import { createFileRoute, Link } from "@tanstack/react-router";
import { XCircle } from "lucide-react";

export const Route = createFileRoute("/refund")({
  head: () => ({
    meta: [
      { title: "Refund Policy — Let's Connect" },
      { name: "description", content: "Refund policy for Let's Connect Premium subscriptions — cancel anytime, payments are non-refundable." },
      { property: "og:title", content: "Refund Policy — Let's Connect" },
      { property: "og:description", content: "How refunds and cancellations work for Let's Connect Premium." },
      { property: "og:url", content: "https://lcbypahal.lovable.app/refund" },
    ],
    links: [{ rel: "canonical", href: "https://lcbypahal.lovable.app/refund" }],
  }),
  component: RefundPage,
});

function RefundPage() {
  return (
    <div className="min-h-screen bg-background px-6 py-16">
      <div className="mx-auto max-w-2xl">
        <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">← Back</Link>
        <h1 className="mt-6 font-display text-4xl">Refund Policy</h1>
        <p className="mt-2 text-sm text-muted-foreground">Last updated: July 8, 2026</p>

        <div className="mt-8 flex items-start gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-destructive/10 text-destructive">
            <XCircle className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-display text-xl">No refunds</h2>
            <p className="mt-2 text-sm leading-relaxed text-foreground/80">
              All Premium subscription payments made to Let's Connect are <strong>non-refundable</strong>. Once a payment is processed, we do not offer refunds, prorated or otherwise, for any unused portion of the subscription period.
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-6 text-sm leading-relaxed text-foreground/80">
          <section>
            <h3 className="font-display text-lg text-foreground">Cancel anytime</h3>
            <p className="mt-2">
              You can cancel your Premium subscription at any time from your account settings. Cancellation stops future renewals — you'll keep Premium access until the end of your current billing period, after which you won't be charged again.
            </p>
          </section>

          <section>
            <h3 className="font-display text-lg text-foreground">Why no refunds?</h3>
            <p className="mt-2">
              Premium is priced at just $1/month to keep it accessible. Because the fee is small and access to hidden rewards and curated content is granted immediately, we can't offer refunds.
            </p>
          </section>

          <section>
            <h3 className="font-display text-lg text-foreground">Exceptions</h3>
            <p className="mt-2">
              If you were charged in error (for example, a duplicate charge or a technical issue on our side), please contact us and we'll investigate.
            </p>
          </section>

          <section>
            <h3 className="font-display text-lg text-foreground">Contact</h3>
            <p className="mt-2">
              For billing questions, email <a className="text-primary underline" href="mailto:pahal.bhatti11@gmail.com">pahal.bhatti11@gmail.com</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
