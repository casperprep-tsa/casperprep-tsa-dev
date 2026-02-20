"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function UpgradeToast({ daysRemaining }) {
  var ref = useState(false);
  var visible = ref[0], setVisible = ref[1];

  useEffect(function () {
    /* Show after 2 seconds */
    var timer = setTimeout(function () {
      setVisible(true);
    }, 2000);
    return function () { clearTimeout(timer); };
  }, []);

  if (!visible || daysRemaining <= 0) return null;

  return (
    <div className="fixed bottom-6 right-6 left-6 sm:left-auto sm:w-[380px] z-50 animate-slideUp">
      <div className="bg-white rounded-xl border-2 border-brand-orange shadow-lg p-5 relative">
        <button
          onClick={function () { setVisible(false); }}
          className="absolute top-3 right-3 text-ink-muted hover:text-ink text-lg leading-none cursor-pointer bg-transparent border-none"
        >
          ✕
        </button>
        <div className="flex items-start gap-3">
          <span className="text-2xl">🔥</span>
          <div>
            <p className="font-body text-[14px] font-bold text-ink mb-1">
              Upgrade to Full Course — Just $66
            </p>
            <p className="font-body text-[12px] text-ink-muted leading-relaxed mb-3">
              As a Strategy Course student, you can unlock the Question Bank &
              Self-Evaluation for only <b>$66 CAD</b> (instead of $99).{" "}
              <b className="text-brand-orange">
                {daysRemaining} day{daysRemaining !== 1 ? "s" : ""} left
              </b>{" "}
              on this offer.
            </p>
            <Link
              href="/checkout?plan=upgrade"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-orange text-white font-body font-semibold text-[13px] hover:brightness-110 transition-all no-underline"
            >
              Upgrade Now — $66 CAD
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}