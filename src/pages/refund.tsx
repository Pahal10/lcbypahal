import { XCircle } from "lucide-react";
import { LLink, LangSwitcher, useT } from "@/lib/i18n";

export function RefundPage() {
  const t = useT();
  return (
    <div className="min-h-screen bg-background px-6 py-16">
      <div className="mx-auto max-w-2xl">
        <div className="flex items-center justify-between">
          <LLink to="/" className="text-sm text-muted-foreground hover:text-foreground">{t("← Back")}</LLink>
          <LangSwitcher className="text-muted-foreground" />
        </div>
        <h1 className="mt-6 font-display text-4xl">{t("Refund Policy")}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{t("Last updated: July 8, 2026")}</p>

        <div className="mt-8 flex items-start gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-destructive/10 text-destructive">
            <XCircle className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-display text-xl">{t("No refunds")}</h2>
            <p className="mt-2 text-sm leading-relaxed text-foreground/80">
              {t("All Premium subscription payments made to Let's Connect are")} <strong>{t("non-refundable")}</strong>{t(". Once a payment is processed, we do not offer refunds, prorated or otherwise, for any unused portion of the subscription period.")}
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-6 text-sm leading-relaxed text-foreground/80">
          <section>
            <h3 className="font-display text-lg text-foreground">{t("Cancel anytime")}</h3>
            <p className="mt-2">{t("You can cancel your Premium subscription at any time from your account settings. Cancellation stops future renewals — you'll keep Premium access until the end of your current billing period, after which you won't be charged again.")}</p>
          </section>
          <section>
            <h3 className="font-display text-lg text-foreground">{t("Why no refunds?")}</h3>
            <p className="mt-2">{t("Premium is priced at just $1/month to keep it accessible. Because the fee is small and access to hidden rewards and curated content is granted immediately, we can't offer refunds.")}</p>
          </section>
          <section>
            <h3 className="font-display text-lg text-foreground">{t("Exceptions")}</h3>
            <p className="mt-2">{t("If you were charged in error (for example, a duplicate charge or a technical issue on our side), please contact us and we'll investigate.")}</p>
          </section>
          <section>
            <h3 className="font-display text-lg text-foreground">{t("Contact")}</h3>
            <p className="mt-2">
              {t("For billing questions, email")} <a className="text-primary underline" href="mailto:pahal.bhatti11@gmail.com">pahal.bhatti11@gmail.com</a>.
            </p>
          </section>
        </div>
      </div>
      <footer className="relative flex justify-center px-6 py-6"><LangSwitcher /></footer>
    </div>
  );
}
