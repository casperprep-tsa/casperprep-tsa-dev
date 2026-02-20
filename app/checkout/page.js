import Link from "next/link";
import { CHECKOUT_MODULES, SITE } from "@/lib/constants";
import { SectionLabel, Btn } from "@/components/ui/Primitives";
import { IconCheck, IconLock, IconMail } from "@/components/Icons";
import EnrollButton from "@/components/EnrollButton";

export const metadata = {
  title: "Enroll",
  description: "Enroll in the CASPer Expert Strategy Course v2.0. 7 modules, expert video tutorials, 40+ high-impact ideas. $249 CAD one-time payment.",
};

export default function CheckoutPage() {
  return (
    <div>
      <section className="bg-gradient-to-br from-brand-blue-deep to-brand-blue pt-[140px] pb-[60px] px-6">
        <div className="max-w-[660px] mx-auto text-center">
          <SectionLabel>Enrollment</SectionLabel>
          <h1 className="font-display text-[32px] md:text-[34px] font-bold text-white mb-2.5">
            Here&apos;s Everything You&apos;re Getting
          </h1>
          <p className="font-body text-[15px] text-white/60">
            This isn&apos;t just a course. It&apos;s the complete system to transform how you
            approach CASPer.
          </p>
        </div>
      </section>

      <section className="bg-surface-cream py-[60px] px-6 pb-20">
        <div className="max-w-[640px] mx-auto">
          {/* Value Stack */}
          <div className="bg-white rounded-[14px] border border-surface-border overflow-hidden mb-7">
            {/* Header */}
            <div className="px-7 py-6 border-b border-surface-border bg-brand-orange-light">
              <div className="flex items-center gap-2.5 flex-wrap">
                <h2 className="font-display text-xl font-bold text-ink">
                  The CASPer Expert Strategy Course
                </h2>
                <span className="bg-brand-orange-light text-brand-orange-dark border border-brand-orange px-3.5 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase">
                  v2.0
                </span>
              </div>
              <p className="font-body text-[13px] text-ink-muted mt-0.5">
                Complete 7-Module Program
              </p>
            </div>

            {/* Modules */}
            <div className="px-7 py-5">
              {CHECKOUT_MODULES.map((item, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-3 py-3 ${
                    i < CHECKOUT_MODULES.length - 1 ? "border-b border-surface-border-light" : ""
                  }`}
                >
                  <div className="mt-0.5">
                    <IconCheck size={16} />
                  </div>
                  <div>
                    <p className="font-body text-sm font-semibold text-ink mb-0.5">
                      {item.title}
                    </p>
                    <p className="font-body text-[12px] text-ink-muted leading-snug">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Also included */}
            <div className="px-7 py-[18px] bg-[#f7f7f4] border-t border-surface-border-light">
              <p className="font-body text-[13px] font-semibold text-ink mb-2">
                Also included:
              </p>
              {[
                "6 full months of course access",
                "All content updates within your access period",
                "Structured progression from beginner to exam-ready",
                "Frameworks applicable to MMI interviews as well",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 mb-1.5">
                  <IconCheck size={12} className="text-brand-orange" />
                  <span className="text-[12px] text-ink-soft font-body">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Price & CTA */}
          <div className="bg-white rounded-[14px] border-2 border-brand-orange p-8 text-center">
            <p className="font-body text-[13px] text-ink-muted mb-2">
              One-time payment. No subscriptions. No hidden fees.
            </p>
            <div className="mb-1.5">
              <span className="font-display text-[50px] font-bold text-ink">
                ${SITE.priceCAD}
              </span>
              <span className="text-lg text-ink-muted font-body"> CAD</span>
            </div>
            <p className="text-[13px] text-ink-muted font-body mb-6">
              Approx. ~${SITE.priceUSD} USD
            </p>

            {/* This button will become a Stripe checkout redirect in Phase 3 */}
            <EnrollButton />

            <div className="flex items-center justify-center gap-1.5 mt-3.5">
              <IconLock size={13} />
              <span className="text-[11px] text-ink-muted font-body">
                Secure checkout. Instant access after payment.
              </span>
            </div>
          </div>

          {/* Full Support */}
          <div className="mt-5 p-6 bg-white rounded-xl border border-surface-border flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <p className="font-body text-sm font-semibold text-ink mb-0.5">
                Want personalized 1-on-1 support?
              </p>
              <p className="font-body text-[13px] text-ink-muted">
                Full course plus direct coaching tailored to you.
              </p>
            </div>
            <a
              href={`mailto:${SITE.email}?subject=Full%20Support%20Package%20Inquiry`}
              className="flex items-center gap-2 px-[18px] py-2.5 rounded-lg font-body font-semibold text-[13px] no-underline bg-brand-blue text-white hover:brightness-110 transition-all shrink-0"
            >
              <IconMail size={15} className="text-white" /> Email Us
            </a>
          </div>

          {/* Terms note */}
          <p className="text-center text-[12px] text-ink-muted font-body mt-4 leading-snug">
            By enrolling, you agree to our{" "}
            <Link href="/terms" className="text-brand-blue underline">
              Terms of Service
            </Link>
            . Access is granted for 6 months from the date of purchase.
          </p>
        </div>
      </section>
    </div>
  );
}