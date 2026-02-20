import { SITE } from "@/lib/constants";

export const metadata = {
  title: "Terms of Service",
  description: "Terms of service, refund policy, and privacy policy for the CASPer Expert Strategy Course by The Success Architect.",
};

export default function TermsPage() {
  return (
    <div>
      <section className="bg-gradient-to-br from-brand-blue-deep to-brand-blue pt-[140px] pb-[60px] px-6">
        <div className="max-w-[660px] mx-auto text-center">
          <h1 className="font-display text-[28px] md:text-[30px] font-bold text-white mb-2">
            Terms of Service & Policies
          </h1>
          <p className="font-body text-sm text-white/55">Last updated: February 2026</p>
        </div>
      </section>

      <section className="bg-surface-cream py-[60px] px-6 pb-20">
        <div className="max-w-[640px] mx-auto bg-white rounded-[14px] border border-surface-border p-8 md:p-10">
          <div className="prose-custom">
            <h3>1. Course Access</h3>
            <p>
              Upon purchase of the CASPer Expert Strategy Course, you receive full access to
              all 7 modules and associated materials for 6 months from the date of purchase.
              This includes text content, video tutorials, practice scenarios, sample answers,
              and the High-Impact Ideas Bank.
            </p>
            <p>
              If you need additional time beyond 6 months and can demonstrate you&apos;ve been
              actively working through the material, you may request an extension by contacting{" "}
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>. Extensions are granted at our
              discretion.
            </p>

            <h3>2. Intellectual Property & Usage</h3>
            <p>
              All course materials are the intellectual property of The Success Architect (TSA).
              These materials are licensed for personal, individual use only.
            </p>
            <p>
              You may not copy, reproduce, distribute, share, upload, resell, or make available
              any course content to any third party. This includes screenshots, screen
              recordings, copy-pasting text, sharing login credentials, or posting any portion
              of the content on social media, forums, or file-sharing platforms.
            </p>
            <p>
              Violation of these terms may result in immediate termination of your access
              without refund and may be subject to legal action.
            </p>

            <h3>3. Payment & Pricing</h3>
            <p>
              The course is offered at a one-time payment of $249 CAD. This is not a
              subscription and there are no recurring charges. Payment grants you 6 months of
              access as described above.
            </p>

            <h3>4. Refund Policy</h3>
            <p>
              Due to the digital nature of this product and the immediate access granted upon
              purchase, all sales are final. We do not offer refunds after access has been
              granted. We encourage you to review the course outline and preview content
              available on our website before purchasing.
            </p>
            <p>
              If you experience technical difficulties accessing the course, please contact us
              and we will work to resolve the issue promptly.
            </p>

            <h3>5. Disclaimer</h3>
            <p>
              The CASPer Expert Strategy Course is an educational preparation resource. We do
              not guarantee any specific test score, quartile placement, or admission outcome.
              Results depend on individual effort, preparation, and performance.
            </p>

            <h3>6. Privacy</h3>
            <p>
              We collect only the information necessary to process your purchase and provide
              course access. We do not sell, trade, or share your personal information with
              third parties.
            </p>

            <h3>7. Contact</h3>
            <p>
              For any questions, concerns, or support requests:
              <br />
              <a href={`mailto:${SITE.email}`} className="font-semibold">
                {SITE.email}
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}