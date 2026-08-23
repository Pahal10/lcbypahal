import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — Let's Connect" },
      { name: "description", content: "Terms of service for Let's Connect, the app that helps you make friends and feel less lonely." },
      { property: "og:title", content: "Terms of Service — Let's Connect" },
      { property: "og:description", content: "The terms that govern your use of Let's Connect." },
      { property: "og:url", content: "https://lcbypahal.lovable.app/terms" },
    ],
    links: [{ rel: "canonical", href: "https://lcbypahal.lovable.app/terms" }],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <div className="min-h-screen bg-background px-6 py-16">
      <div className="mx-auto max-w-2xl">
        <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">← Back</Link>
        <h1 className="mt-6 font-display text-4xl">Terms of Service</h1>
        <p className="mt-2 text-sm text-muted-foreground">Last updated: July 8, 2026</p>

        <div className="prose prose-neutral mt-8 space-y-6 text-foreground/80">
          <section>
            <h2 className="font-display text-xl text-foreground">1. Agreement</h2>
            <p className="mt-2 text-sm leading-relaxed">
              By using Let's Connect ("the app", "the service") you agree to these Terms. If you don't agree, please don't use the service.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-foreground">2. The service</h2>
            <p className="mt-2 text-sm leading-relaxed">
              Let's Connect is a companion app that helps users feel less lonely through prompts, journaling and community features. Premium is an optional paid tier that unlocks additional rewards, curated online hacks and discounts.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-foreground">3. Accounts</h2>
            <p className="mt-2 text-sm leading-relaxed">
              You're responsible for keeping your login credentials safe and for all activity on your account. Provide accurate information when registering.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-foreground">4. Payments & subscriptions</h2>
            <p className="mt-2 text-sm leading-relaxed">
              Premium is billed at $1/month via our payment processor (Paddle). Subscriptions renew automatically until cancelled. You can cancel anytime from your account; access continues until the end of the current billing period.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-foreground">5. Acceptable use</h2>
            <p className="mt-2 text-sm leading-relaxed">
              Don't misuse the service: no harassment, no illegal activity, no attempting to break or resell the platform. We may suspend accounts that violate these rules.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-foreground">6. Content</h2>
            <p className="mt-2 text-sm leading-relaxed">
              You own the content you create. By posting, you grant us a limited license to display it inside the service. Premium rewards, hacks and discounts are curated from publicly available sources.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-foreground">7. Disclaimer</h2>
            <p className="mt-2 text-sm leading-relaxed">
              Let's Connect is not a substitute for professional mental-health care. If you're in crisis, please contact a qualified professional or local emergency services.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-foreground">8. Changes</h2>
            <p className="mt-2 text-sm leading-relaxed">
              We may update these Terms. Continued use of the service after changes means you accept the updated Terms.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-foreground">9. Contact</h2>
            <p className="mt-2 text-sm leading-relaxed">
              Questions? Email <a className="text-primary underline" href="mailto:pahal.bhatti11@gmail.com">pahal.bhatti11@gmail.com</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
