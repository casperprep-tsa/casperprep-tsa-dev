"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function handleReset(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(
      email,
      {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      }
    );

    if (resetError) {
      setError(resetError.message);
      setLoading(false);
      return;
    }

    setSent(true);
    setLoading(false);
  }

  return (
    <div className="relative z-10">
      <div className="bg-white rounded-2xl p-8 shadow-xl">
        <div className="text-center mb-6">
          <h1 className="font-display text-2xl font-bold text-ink mb-1">
            Reset Your Password
          </h1>
          <p className="font-body text-sm text-ink-muted">
            Enter your email and we&apos;ll send you a reset link
          </p>
        </div>

        {sent ? (
          <div className="text-center">
            <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-green-600"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h2 className="font-body text-lg font-semibold text-ink mb-2">
              Check your email
            </h2>
            <p className="font-body text-sm text-ink-muted leading-relaxed mb-6">
              We sent a password reset link to{" "}
              <span className="font-semibold text-ink">{email}</span>. Click the
              link in the email to set a new password.
            </p>
            <Link
              href="/auth/login"
              className="text-brand-blue font-body font-semibold text-sm no-underline hover:underline"
            >
              Back to Sign In
            </Link>
          </div>
        ) : (
          <>
            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200">
                <p className="text-sm text-red-600 font-body text-center">
                  {error}
                </p>
              </div>
            )}

            <form onSubmit={handleReset} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-ink mb-1.5 font-body">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-lg border border-surface-border bg-surface-cream font-body text-sm text-ink placeholder:text-ink-muted/50 focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-lg bg-brand-orange text-white font-body font-semibold text-[15px] hover:brightness-110 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Sending..." : "Send Reset Link"}
              </button>
            </form>

            <p className="text-center text-sm text-ink-muted font-body mt-5">
              Remember your password?{" "}
              <Link
                href="/auth/login"
                className="text-brand-blue font-semibold no-underline hover:underline"
              >
                Sign in
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
