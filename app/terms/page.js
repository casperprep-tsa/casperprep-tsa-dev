import { SITE } from "@/lib/constants";

export const metadata = {
  title: "Terms of Service",
  description:
    "Terms of service, refund policy, and privacy policy for the CASPer Expert Strategy Course by The Success Architect.",
};

export default function TermsPage() {
  return (
    <div>
      <section className="bg-gradient-to-br from-brand-blue-deep to-brand-blue pt-[140px] pb-[60px] px-6">
        <div className="max-w-[660px] mx-auto text-center">
          <h1 className="font-display text-[28px] md:text-[30px] font-bold text-white mb-2">
            Terms of Service &amp; Policies
          </h1>
          <p className="font-body text-sm text-white/55">
            Last updated: February 19, 2026
          </p>
        </div>
      </section>

      <section className="bg-surface-cream py-[60px] px-6 pb-20">
        <div className="max-w-[660px] mx-auto bg-white rounded-[14px] border border-surface-border p-8 md:p-10">
          <div className="prose-custom">

            {/* ── 1 ── */}
            <h3>1. Overview</h3>
            <p>
              These Terms of Service (&quot;Terms&quot;) govern your purchase and use of the
              CASPer Expert Strategy Course v2.0 (&quot;the Course&quot;) offered by The
              Success Architect (&quot;TSA,&quot; &quot;we,&quot; &quot;us,&quot; or
              &quot;our&quot;) through the website{" "}
              <a href="https://casperpreptsa.com">casperpreptsa.com</a>. By purchasing or
              accessing the Course, you agree to these Terms in full. If you do not agree,
              please do not purchase or use the Course.
            </p>

            {/* ── 2 ── */}
            <h3>2. Course Access</h3>
            <p>
              Upon purchase, you receive full access to all 7 modules and associated
              materials for <strong>6 months</strong> from the date of purchase. This
              includes text content, video tutorials, practice scenarios, sample answers,
              response frameworks, and the High-Impact Ideas Bank.
            </p>
            <p>
              Access is granted to <strong>one individual only</strong> — the person whose
              name and email were used at the time of purchase. Each purchase entitles a
              single user to access the Course on their personal devices.
            </p>
            <p>
              If you need additional time beyond 6 months and can demonstrate you&apos;ve
              been actively working through the material, you may request an extension by
              contacting{" "}
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>. Extensions are granted at
              our discretion on a case-by-case basis.
            </p>

            {/* ── 3 ── */}
            <h3>3. Intellectual Property &amp; Content Sharing</h3>
            <p>
              All course materials — including but not limited to written content, video
              tutorials, response frameworks, practice scenarios, sample answers, the
              High-Impact Ideas Bank, and any downloadable resources — are the intellectual
              property of The Success Architect (TSA) and are protected by copyright law.
            </p>
            <p>
              <strong>You may not, under any circumstances:</strong>
            </p>
            <ul>
              <li>Share, forward, or distribute any course materials to any other person</li>
              <li>Share your login credentials or allow anyone else to access your account</li>
              <li>Copy, reproduce, screenshot, screen-record, or photograph course content</li>
              <li>Upload, post, or publish any portion of the course content on social media, forums, messaging apps, file-sharing platforms, or any other website</li>
              <li>Resell, sublicense, or commercially exploit any course materials</li>
              <li>Create derivative works based on course content (such as your own course, guide, or resource using our frameworks, scenarios, or ideas)</li>
              <li>Use the course content to train, fine-tune, or feed any artificial intelligence, machine learning model, or automated system</li>
            </ul>
            <p>
              <strong>This includes sharing the question bank, practice scenarios, sample
              answers, frameworks, and any other course content — even informally, even with
              friends, even &quot;just to help someone.&quot;</strong> Each person who wants
              access to the Course must purchase their own license.
            </p>
            <p>
              We take content protection seriously. Violation of these terms will result in{" "}
              <strong>immediate and permanent termination</strong> of your access without
              refund. We reserve the right to pursue legal action and seek damages for any
              unauthorized distribution of our materials.
            </p>

            {/* ── 4 ── */}
            <h3>4. Payment &amp; Pricing</h3>
            <p>
              The Course is offered in multiple tiers: the Strategy Course
              (Modules 1–5), the Question Bank (Modules 6–7), and the Full
              Course (All 7 Modules). Pricing is listed on our website and may
              be updated from time to time. All purchases are one-time payments
              — there are no subscriptions or recurring charges. Prices are
              listed in Canadian Dollars (CAD) and may be subject to applicable
              taxes. Currency conversion for international purchases is handled
              by your payment provider.
            </p>

            {/* ── 5 ── */}
            <h3>5. Refund Policy</h3>
            <p>
              We want you to feel confident in your purchase. We&apos;ve designed a fair
              refund policy that gives you enough time to evaluate the Course while
              protecting the value of our content.
            </p>
            <p>
              <strong>Within the first 7 days of purchase:</strong>
            </p>
            <ul>
              <li>
                If you have completed <strong>no more than 20%</strong> of the course
                content (7 out of 35 lessons), you may request a full refund by emailing{" "}
                <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
              </li>
              <li>
                Refund requests must be submitted within 7 calendar days of your original
                purchase date.
              </li>
              <li>
                We will verify your course usage to confirm eligibility. Refunds will be
                processed within 5–10 business days to your original payment method.
              </li>
            </ul>
            <p>
              <strong>After 7 days from the date of purchase, all sales are final.</strong>{" "}
              No refunds will be issued after the 7-day window, regardless of how much
              content has been accessed.
            </p>
            <p>
              We encourage you to review the detailed course outline, preview content, and
              the introductory video on our website before purchasing to ensure the Course
              is right for you.
            </p>
            <p>
              If you experience any technical difficulties accessing the Course at any time,
              please contact us and we will work to resolve the issue promptly. Technical
              issues do not void your access period, and we will make every reasonable effort
              to ensure you can access all materials you&apos;ve paid for.
            </p>

            {/* ── 6 ── */}
            <h3>6. Account Conduct</h3>
            <p>
              You are responsible for maintaining the security of your account and login
              credentials. You agree to notify us immediately if you suspect unauthorized
              access to your account.
            </p>
            <p>
              We reserve the right to suspend or terminate your access if we reasonably
              believe you are in violation of these Terms, including but not limited to
              sharing content, sharing account credentials, or engaging in fraudulent
              activity (such as requesting a refund after downloading or sharing course
              materials).
            </p>

            {/* ── 7 ── */}
            <h3>7. Disclaimer of Guarantees</h3>
            <p>
              The CASPer Expert Strategy Course is an educational preparation resource
              designed to help you develop effective strategies for the CASPer exam. We
              provide proven frameworks, structured practice, and expert guidance.
            </p>
            <p>
              However, <strong>we do not guarantee</strong> any specific test score,
              quartile placement, admission decision, or outcome. Your results depend on
              your individual effort, preparation, prior experience, and performance on
              exam day. Testimonials and results shared on our website represent individual
              experiences and are not guaranteed for every student.
            </p>

            {/* ── 8 ── */}
            <h3>8. Limitation of Liability</h3>
            <p>
              To the fullest extent permitted by law, The Success Architect, its team
              members, affiliates, and contractors shall not be liable for any indirect,
              incidental, special, or consequential damages arising from your use of (or
              inability to use) the Course. Our total liability shall not exceed the amount
              you paid for the Course.
            </p>

            {/* ── 9 ── */}
            <h3>9. Privacy &amp; Data</h3>
            <p>
              We collect only the information necessary to process your purchase and provide
              course access, including your name, email address, and payment information.
              Payment processing is handled securely by Stripe — we do not store your
              credit card details.
            </p>
            <p>
              <strong>We will never sell, trade, or share your personal information with
              third parties</strong> for marketing purposes. We may use your email to send
              course-related communications (such as access confirmations, important
              updates, or expiration reminders). You may opt out of non-essential emails at
              any time.
            </p>
            <p>
              Your course progress data is stored securely and used solely to provide you
              with the dashboard experience (tracking your progress, resume points, etc.).
            </p>

            {/* ── 10 ── */}
            <h3>10. Modifications to Terms</h3>
            <p>
              We may update these Terms from time to time. If we make significant changes,
              we will notify you via email. Your continued use of the Course after changes
              are posted constitutes acceptance of the updated Terms.
            </p>

            {/* ── 11 ── */}
            <h3>11. Governing Law</h3>
            <p>
              These Terms are governed by and construed in accordance with the laws of the
              Province of Ontario, Canada, without regard to conflict of law principles.
              Any disputes shall be resolved in the courts of Ontario, Canada.
            </p>

            {/* ── 12 ── */}
            <h3>12. Contact Us</h3>
            <p>
              We&apos;re here to help. If you have any questions about these Terms, your
              account, or need support with the Course, please reach out:
            </p>
            <p>
              <strong>The Success Architect</strong>
              <br />
              Email:{" "}
              <a href={`mailto:${SITE.email}`} className="font-semibold">
                {SITE.email}
              </a>
              <br />
              Website:{" "}
              <a href="https://casperpreptsa.com" className="font-semibold">
                casperpreptsa.com
              </a>
            </p>
            <p>
              We aim to respond to all inquiries within 24–48 hours.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}