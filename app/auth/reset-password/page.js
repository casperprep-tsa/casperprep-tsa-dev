"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleUpdate(e) {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    const supabase = createClient();
    const { error: updateError } = await supabase.auth.updateUser({
      password,
    });

    if (updateError) {
      setError(updateError.message);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);

    // Redirect to dashboard after 2 seconds
    setTimeout(() => {
      router.push("/dashboard");
      router.refresh();
    }, 2000);
  }

  return (
    <div className="relative z-10">
      <div className="bg-white rounded-2xl p-8 shadow-xl">
        <div className="text-center mb-6">
          <h1 className="font-display text-2xl font-bold text-ink mb-1">
            Set New Password
          </h1>
          <p className="font-body text-sm text-ink-muted">
            Choose a new password for your account
          </p>
        </div>

        {success ? (
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
              Password updated
            </h2>
            <p className="font-body text-sm text-ink-muted">
              Redirecting you to your dashboard...
            </p>
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

            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-ink mb-1.5 font-body">
                  New Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="At least 6 characters"
                  className="w-full px-4 py-3 rounded-lg border border-surface-border bg-surface-cream font-body text-sm text-ink placeholder:text-ink-muted/50 focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-ink mb-1.5 font-body">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  placeholder="Confirm your new password"
                  className="w-full px-4 py-3 rounded-lg border border-surface-border bg-surface-cream font-body text-sm text-ink placeholder:text-ink-muted/50 focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-lg bg-brand-orange text-white font-body font-semibold text-[15px] hover:brightness-110 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Updating..." : "Update Password"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
