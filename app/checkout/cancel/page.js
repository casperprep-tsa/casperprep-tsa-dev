import Link from "next/link";
import { SITE } from "@/lib/constants";
import { IconMail } from "@/components/Icons";

export const metadata = {
  title: "Enrollment Cancelled | CASPer Prep by TSA",
};

export default function CancelPage() {
  return (
    <div>
      <section className="bg-gradient-to-br from-brand-blue-deep to-brand-blue pt-[140px] pb-[60px] px-6">
        <div className="max-w-[500px] mx-auto text-center">
          <h1 className="font-display text-[28px] md:text-[30px] font-bold text-white mb-3">
            Enrollment Not Completed
          </h1>
          <p className="font-body text-[15px] text-white/60 leading-relaxed">
            No worries — your payment was not processed and you haven&apos;t
            been charged.
          </p>
        </div>
      </section>

      <section className="bg-surface-cream py-[60px] px-6 pb-20">
        <div className="max-w-[500px] mx-auto">
          <div className="bg-white rounded-xl border border-surface-border p-8 text-center">
            <h2 className="font-display text-lg font-bold text-ink mb-2">
              Ready when you are
            </h2>
            <p className="font-body text-sm text-ink-muted leading-relaxed mb-6">
              The CASPer Expert Strategy Course is here whenever you&apos;re ready.
              Your free account still gives you access to video tutorials, blog
              articles, and updates.
            </p>

            <div className="flex flex-col gap-3">
              <Link
                href="/checkout"
                className="w-full py-3 rounded-lg bg-brand-orange text-white font-body font-semibold text-[15px] hover:brightness-110 transition-all no-underline text-center inline-block"
              >
                Try Again — ${SITE.priceCAD} CAD
              </Link>
              <Link
                href="/dashboard"
                className="w-full py-3 rounded-lg bg-surface-cream border border-surface-border text-ink-soft font-body font-semibold text-[15px] hover:bg-gray-100 transition-all no-underline text-center inline-block"
              >
                Back to Dashboard
              </Link>
            </div>
          </div>

          <div className="mt-5 p-5 bg-white rounded-xl border border-surface-border text-center">
            <p className="font-body text-[13px] text-ink-muted">
              Having trouble with payment? Contact us at{" "}
              <a
                href={`mailto:${SITE.email}`}
                className="text-brand-blue font-semibold no-underline hover:underline"
              >
                {SITE.email}
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}