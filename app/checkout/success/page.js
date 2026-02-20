"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { IconCheck } from "@/components/Icons";

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [status, setStatus] = useState("verifying");

  useEffect(() => {
    if (!sessionId) {
      setStatus("error");
      return;
    }

    async function verifyPayment() {
      try {
        const res = await fetch("/api/checkout/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ session_id: sessionId }),
        });

        const data = await res.json();

        if (res.ok && data.success) {
          setStatus("success");
        } else {
          console.error("Verification response:", data);
          setStatus("error");
        }
      } catch (err) {
        console.error("Verification error:", err);
        setStatus("error");
      }
    }

    verifyPayment();
  }, [sessionId]);

  if (status === "verifying") {
    return (
      <div className="min-h-screen bg-surface-cream flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-brand-blue border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="font-body text-sm text-ink-muted">
            Confirming your payment...
          </p>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div>
        <section className="bg-gradient-to-br from-brand-blue-deep to-brand-blue pt-[140px] pb-[60px] px-6">
          <div className="max-w-[540px] mx-auto text-center">
            <h1 className="font-display text-[28px] font-bold text-white mb-3">
              Something Went Wrong
            </h1>
            <p className="font-body text-[15px] text-white/60 leading-relaxed">
              We couldn&apos;t verify your payment automatically. Don&apos;t worry — if you
              were charged, your access will be activated shortly.
            </p>
          </div>
        </section>
        <section className="bg-surface-cream py-[60px] px-6 pb-20">
          <div className="max-w-[540px] mx-auto text-center">
            <div className="bg-white rounded-xl border border-surface-border p-8">
              <p className="font-body text-sm text-ink-muted mb-6">
                If your dashboard doesn&apos;t show course access within a few minutes,
                please email us and we&apos;ll fix it right away.
              </p>
              <div className="flex flex-col gap-3">
                <Link
                  href="/dashboard"
                  className="w-full py-3 rounded-lg bg-brand-blue text-white font-body font-semibold text-[15px] no-underline text-center inline-block hover:brightness-110 transition-all"
                >
                  Go to Dashboard
                </Link>
                <a
                  href="mailto:info.thesuccessarchitect@gmail.com?subject=Payment%20Verification%20Issue"
                  className="text-brand-blue font-body text-sm font-semibold no-underline hover:underline"
                >
                  Contact Support
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div>
      <section className="bg-gradient-to-br from-brand-blue-deep to-brand-blue pt-[140px] pb-[60px] px-6">
        <div className="max-w-[540px] mx-auto text-center">
          <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
            <div className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center">
              <IconCheck size={28} className="text-white" />
            </div>
          </div>
          <h1 className="font-display text-[30px] md:text-[34px] font-bold text-white mb-3">
            You&apos;re In!
          </h1>
          <p className="font-body text-[16px] text-white/70 leading-relaxed">
            Your enrollment is confirmed. You now have full access to the
            CASPer Expert Strategy Course v2.0.
          </p>
        </div>
      </section>

      <section className="bg-surface-cream py-[60px] px-6 pb-20">
        <div className="max-w-[540px] mx-auto">
          <div className="bg-white rounded-xl border border-surface-border p-8 text-center mb-6">
            <h2 className="font-display text-xl font-bold text-ink mb-3">
              What happens next
            </h2>
            <div className="text-left space-y-4 mb-8">
              {[
                {
                  step: "1",
                  title: "Go to your Dashboard",
                  desc: "Your course is now unlocked and ready to go.",
                },
                {
                  step: "2",
                  title: "Start with Module 1",
                  desc: "Begin with Foundations & Strategy to build your strategic mindset.",
                },
                {
                  step: "3",
                  title: "Work through at your own pace",
                  desc: "You have 6 full months of access. No rush, but no time to waste.",
                },
              ].map((item) => (
                <div key={item.step} className="flex gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-brand-blue text-white flex items-center justify-center font-display font-bold text-sm shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <p className="font-body text-sm font-semibold text-ink">
                      {item.title}
                    </p>
                    <p className="font-body text-[13px] text-ink-muted leading-snug">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/course/learn"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg bg-brand-orange text-white font-body font-semibold text-[15px] hover:brightness-110 transition-all no-underline"
            >
              Start the Course →
            </Link>
          </div>

          <div className="p-5 bg-white rounded-xl border border-surface-border text-center">
            <p className="font-body text-[13px] text-ink-muted">
              A receipt has been sent to your email. If you have any questions,
              reach out to{" "}
              <a
                href="mailto:info.thesuccessarchitect@gmail.com"
                className="text-brand-blue font-semibold no-underline hover:underline"
              >
                info.thesuccessarchitect@gmail.com
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-surface-cream flex items-center justify-center">
          <p className="font-body text-sm text-ink-muted">Loading...</p>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}