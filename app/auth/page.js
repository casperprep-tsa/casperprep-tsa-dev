"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function SignupPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSignup(e) {
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
    const { error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    // Redirect to email confirmation page
    router.push("/auth/confirm");
  }

  return (
    <div className="relative z-10">
      <div className="bg-white rounded-2xl p-8 shadow-xl">
        <div className="text-center mb-6">
          <h1 className="font-display text-2xl font-bold text-ink mb-1">
            Create Your Account
          </h1>
          <p className="font-body text-sm text-ink-muted">
            Get started with CASPer Prep by TSA
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200">
            <p className="text-sm text-red-600 font-body text-center">{error}</p>
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-ink mb-1.5 font-body">
              Full Name
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              placeholder="Your full name"
              className="w-full px-4 py-3 rounded-lg border border-surface-border bg-surface-cream font-body text-sm text-ink placeholder:text-ink-muted/50 focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all"
            />
          </div>

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

          <div>
            <label className="block text-sm font-medium text-ink mb-1.5 font-body">
              Password
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
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Confirm your password"
              className="w-full px-4 py-3 rounded-lg border border-surface-border bg-surface-cream font-body text-sm text-ink placeholder:text-ink-muted/50 focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-brand-orange text-white font-body font-semibold text-[15px] hover:brightness-110 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p className="text-center text-[12px] text-ink-muted font-body mt-4 leading-snug">
          By signing up, you agree to our{" "}
          <Link href="/terms" className="text-brand-blue no-underline hover:underline">
            Terms of Service
          </Link>
        </p>

        <p className="text-center text-sm text-ink-muted font-body mt-4">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="text-brand-blue font-semibold no-underline hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}