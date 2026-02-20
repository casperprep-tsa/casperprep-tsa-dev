"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { PLANS, SITE } from "@/lib/constants";
import { IconCheck, IconLock } from "@/components/Icons";
import EnrollButton from "@/components/EnrollButton";

var PLAN_DETAILS = {
  strategy: {
    key: "strategy",
    heading: "Strategy Course",
    sub: "Modules 1–5",
    tagline: "Master the frameworks and mindset to dominate CASPer.",
    modules: [
      { title: "Module 1: Understanding the CASPer Exam", desc: "Introduction to CASPer, assessment format, evaluation criteria, question types & resources" },
      { title: "Module 2: Developing a Winning Strategy", desc: "Core competency phrases, 40+ creative examples, meaningful experiences & language tips" },
      { title: "Module 3: 6 Structured Frameworks", desc: "Situational Judgment, Reform, STAR-T, Improvement, Big Thought-Provoking & Reflection frameworks" },
      { title: "Module 4: Expert Video Analysis Tutorials", desc: "3 expert video breakdowns — perspectives, assumptions, and actions" },
      { title: "Module 5: The 30-Second Success Formula", desc: "30-second reflection strategy, quick notes template & typing speed optimization" },
    ],
    extras: [
      "6 response frameworks for every question type",
      "40+ high-impact ideas bank",
      "3 expert video analysis tutorials",
      "6 months of full access",
    ],
  },
  question_bank: {
    key: "question_bank",
    heading: "Question Bank",
    sub: "Modules 6–7",
    tagline: "Practice with real questions and track your progress.",
    modules: [
      { title: "Module 6: Comprehensive Question Bank", desc: "4 practice sets with 40+ questions, video & written formats, built-in timer, expert answer keys" },
      { title: "Module 7: CASPer Self-Evaluation", desc: "Reflection tools, daily practice logs & self-assessment score tracker" },
    ],
    extras: [
      "40+ practice questions with expert answers",
      "Video & written response practice",
      "Built-in practice timer per scenario",
      "Self-evaluation & progress tracking tools",
      "6 months of full access",
    ],
  },
  full: {
    key: "full",
    heading: "Full Course",
    sub: "All 7 Modules",
    tagline: "The complete CASPer preparation system — strategy, practice, and evaluation.",
    modules: [
      { title: "Module 1: Understanding the CASPer Exam", desc: "Introduction to CASPer, assessment format, evaluation criteria, question types & resources" },
      { title: "Module 2: Developing a Winning Strategy", desc: "Core competency phrases, 40+ creative examples, meaningful experiences & language tips" },
      { title: "Module 3: 6 Structured Frameworks", desc: "Situational Judgment, Reform, STAR-T, Improvement, Big Thought-Provoking & Reflection frameworks" },
      { title: "Module 4: Expert Video Analysis Tutorials", desc: "3 expert video breakdowns — perspectives, assumptions, and actions" },
      { title: "Module 5: The 30-Second Success Formula", desc: "30-second reflection strategy, quick notes template & typing speed optimization" },
      { title: "Module 6: Comprehensive Question Bank", desc: "4 practice sets with 40+ questions, video & written formats, built-in timer, expert answer keys" },
      { title: "Module 7: CASPer Self-Evaluation", desc: "Reflection tools, daily practice logs & self-assessment score tracker" },
    ],
    extras: [
      "All 7 modules + 35 lessons",
      "6 response frameworks + 40+ ideas bank",
      "40+ practice questions + expert answers",
      "3 expert video analysis tutorials",
      "Self-evaluation & tracking tools",
      "6 months of full access",
    ],
  },
  upgrade: {
    key: "upgrade",
    heading: "Upgrade to Full Course",
    sub: "Add Modules 6–7",
    tagline: "You already have the Strategy Course. Unlock the rest for a special price.",
    modules: [
      { title: "Module 6: Comprehensive Question Bank", desc: "4 practice sets with 40+ questions, video & written formats, built-in timer, expert answer keys" },
      { title: "Module 7: CASPer Self-Evaluation", desc: "Reflection tools, daily practice logs & self-assessment score tracker" },
    ],
    extras: [
      "40+ practice questions with expert answers",
      "Video & written response practice",
      "Built-in practice timer per scenario",
      "Self-evaluation & progress tracking tools",
      "Exclusive upgrade pricing — save $33",
    ],
  },
};

function CheckoutContent() {
  var searchParams = useSearchParams();
  var planKey = searchParams.get("plan") || "full";
  var details = PLAN_DETAILS[planKey] || PLAN_DETAILS.full;
  var planConfig = PLANS[planKey] || PLANS.full;
  var isFull = planKey === "full";

  return (
    <div>
      <section className="bg-gradient-to-br from-brand-blue-deep to-brand-blue pt-[140px] pb-[60px] px-6">
        <div className="max-w-[660px] mx-auto text-center">
          <p className="font-mono text-[11px] text-brand-orange font-bold tracking-[2px] uppercase mb-3">Enrollment</p>
          <h1 className="font-display text-[32px] md:text-[34px] font-bold text-white mb-2.5">
            {details.heading}
          </h1>
          <p className="font-body text-[15px] text-white/60">
            {details.tagline}
          </p>
        </div>
      </section>

      <section className="bg-surface-cream py-[60px] px-6 pb-20">
        <div className="max-w-[640px] mx-auto">
          {/* Value Stack */}
          <div className="bg-white rounded-[14px] border border-surface-border overflow-hidden mb-7">
            <div className={"px-7 py-6 border-b border-surface-border " + (isFull ? "bg-brand-orange-light" : "bg-brand-blue-light")}>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h2 className="font-display text-xl font-bold text-ink">
                  {details.heading}
                </h2>
                {isFull && (
                  <span className="bg-brand-orange-light text-brand-orange-dark border border-brand-orange px-3.5 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase">
                    Save ${PLANS.full.savings}
                  </span>
                )}
              </div>
              <p className="font-body text-[13px] text-ink-muted mt-0.5">
                {details.sub}
              </p>
            </div>

            <div className="px-7 py-5">
              {details.modules.map(function (item, i) {
                return (
                  <div
                    key={i}
                    className={"flex items-start gap-3 py-3 " + (i < details.modules.length - 1 ? "border-b border-surface-border-light" : "")}
                  >
                    <div className="mt-0.5"><IconCheck size={16} /></div>
                    <div>
                      <p className="font-body text-sm font-semibold text-ink mb-0.5">{item.title}</p>
                      <p className="font-body text-[12px] text-ink-muted leading-snug">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="px-7 py-[18px] bg-[#f7f7f4] border-t border-surface-border-light">
              <p className="font-body text-[13px] font-semibold text-ink mb-2">Also included:</p>
              {details.extras.map(function (item, i) {
                return (
                  <div key={i} className="flex items-center gap-2 mb-1.5">
                    <IconCheck size={12} className="text-brand-orange" />
                    <span className="text-[12px] text-ink-soft font-body">{item}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Price & CTA */}
          <div className={"bg-white rounded-[14px] p-8 text-center " + (isFull ? "border-2 border-brand-orange" : "border-2 border-brand-blue")}>
            <p className="font-body text-[13px] text-ink-muted mb-2">
              One-time payment. No subscriptions. No hidden fees.
            </p>
            <div className="mb-1.5">
              {isFull && (
                <span className="font-display text-[24px] text-ink-muted line-through mr-2">
                  ${PLANS.strategy.price + PLANS.question_bank.price}
                </span>
              )}
              <span className="font-display text-[50px] font-bold text-ink">
                ${planConfig.price}
              </span>
              <span className="text-lg text-ink-muted font-body"> CAD</span>
            </div>
            {isFull && (
              <p className="text-[13px] text-brand-orange font-body font-semibold mb-4">
                You save ${PLANS.full.savings} vs buying separately
              </p>
            )}
            {!isFull && <div className="mb-4" />}

            <EnrollButton plan={planKey} label={"Get " + details.heading + " — $" + planConfig.price + " CAD"} />

            <div className="flex items-center justify-center gap-1.5 mt-3.5">
              <IconLock size={13} />
              <span className="text-[11px] text-ink-muted font-body">
                Secure checkout. Instant access after payment.
              </span>
            </div>
          </div>

          {/* Other plans link */}
          <div className="mt-5 text-center">
            <Link href="/#pricing" className="text-[13px] text-brand-blue font-body font-medium no-underline hover:underline">
              ← View all plans
            </Link>
          </div>

          {/* 1-on-1 support */}
          <div className="mt-5 p-6 bg-white rounded-xl border border-surface-border flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <p className="font-body text-sm font-semibold text-ink mb-0.5">
                Want personalized 1-on-1 support?
              </p>
              <p className="font-body text-[13px] text-ink-muted">
                Get direct coaching tailored to your needs.
              </p>
            </div>
            <a
              href={`mailto:${SITE.email}?subject=1-on-1%20CASPer%20Coaching%20Inquiry`}
              className="flex items-center gap-2 px-[18px] py-2.5 rounded-lg font-body font-semibold text-[13px] no-underline bg-brand-blue text-white hover:brightness-110 transition-all shrink-0"
            >
              Email Us
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

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-surface-cream flex items-center justify-center"><p className="font-body text-sm text-ink-muted">Loading...</p></div>}>
      <CheckoutContent />
    </Suspense>
  );
}