import { LLink, LangSwitcher, useT } from "@/lib/i18n";

const SECTIONS: Array<[string, string]> = [
  ["1. Agreement", "By using Let's Connect (\"the app\", \"the service\") you agree to these Terms. If you don't agree, please don't use the service."],
  ["2. The service", "Let's Connect is a companion app that helps users feel less lonely through prompts, journaling and community features. Premium is an optional paid tier that unlocks additional rewards, curated online hacks and discounts."],
  ["3. Accounts", "You're responsible for keeping your login credentials safe and for all activity on your account. Provide accurate information when registering."],
  ["4. Payments & subscriptions", "Premium is billed at $1/month via our payment processor (Paddle). Subscriptions renew automatically until cancelled. You can cancel anytime from your account; access continues until the end of the current billing period."],
  ["5. Acceptable use", "Don't misuse the service: no harassment, no illegal activity, no attempting to break or resell the platform. We may suspend accounts that violate these rules."],
  ["6. Content", "You own the content you create. By posting, you grant us a limited license to display it inside the service. Premium rewards, hacks and discounts are curated from publicly available sources."],
  ["7. Disclaimer", "Let's Connect is not a substitute for professional mental-health care. If you're in crisis, please contact a qualified professional or local emergency services."],
  ["8. Changes", "We may update these Terms. Continued use of the service after changes means you accept the updated Terms."],
];

export function TermsPage() {
  const t = useT();
  return (
    <div className="min-h-screen bg-background px-6 py-16">
      <div className="mx-auto max-w-2xl">
        <div className="flex items-center justify-between">
          <LLink to="/" className="text-sm text-muted-foreground hover:text-foreground">{t("← Back")}</LLink>
          <LangSwitcher className="text-muted-foreground" />
        </div>
        <h1 className="mt-6 font-display text-4xl">{t("Terms of Service")}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{t("Last updated: July 8, 2026")}</p>

        <div className="prose prose-neutral mt-8 space-y-6 text-foreground/80">
          {SECTIONS.map(([h, p]) => (
            <section key={h}>
              <h2 className="font-display text-xl text-foreground">{t(h)}</h2>
              <p className="mt-2 text-sm leading-relaxed">{t(p)}</p>
            </section>
          ))}
          <section>
            <h2 className="font-display text-xl text-foreground">{t("9. Contact")}</h2>
            <p className="mt-2 text-sm leading-relaxed">
              {t("Questions? Email")} <a className="text-primary underline" href="mailto:pahal.bhatti11@gmail.com">pahal.bhatti11@gmail.com</a>.
            </p>
          </section>
        </div>
      </div>
      <footer className="relative flex justify-center px-6 py-6"><LangSwitcher /></footer>
    </div>
  );
}
