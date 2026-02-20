"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { IconCheck } from "@/components/Icons";

function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/dashboard";

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
        emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(redirectTo)}`,
      },
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    router.push("/auth/login?registered=true");
  }

  return (
    <div className="relative z-10">
      <div className="bg-white rounded-2xl p-8 shadow-xl">
        <div className="text-center mb-6">
          <h1 className="font-display text-2xl font-bold text-ink mb-1">
            Create Your Free Account
          </h1>
          <p className="font-body text-sm text-ink-muted">
            Join CASPer Prep by TSA — it&apos;s free to get started
          </p>
        </div>

        {/* Free benefits */}
        <div className="mb-5 p-3.5 rounded-lg bg-brand-blue-light border border-brand-blue/20">
          <p className="font-body text-[12px] font-semibold text-brand-blue mb-2">
            Your free account includes:
          </p>
          {[
            "Course preview with expert video tutorials",
            "Blog articles & CASPer strategy tips",
            "Updates on new resources & webinars",
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 mb-1">
              <IconCheck size={12} className="text-brand-blue" />
              <span className="font-body text-[12px] text-ink-soft">{item}</span>
            </div>
          ))}
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
            className="w-full py-3 rounded-lg bg-brand-blue text-white font-body font-semibold text-[15px] hover:brightness-110 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Creating account..." : "Sign Up Free"}
          </button>
        </form>

        <div className="mt-4 p-3 rounded-lg bg-brand-orange-light border border-brand-orange/20 text-center">
          <p className="font-body text-[12px] text-ink-soft">
            Want the full course?{" "}
            <Link href="/checkout" className="text-brand-orange font-semibold no-underline hover:underline">
              Enroll for $249 CAD
            </Link>{" "}
            after creating your account.
          </p>
        </div>

        <p className="text-center text-[12px] text-ink-muted font-body mt-3 leading-snug">
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

export default function SignupPage() {
  return (
    <Suspense fallback={
      <div className="relative z-10">
        <div className="bg-white rounded-2xl p-8 shadow-xl text-center">
          <p className="font-body text-sm text-ink-muted">Loading...</p>
        </div>
      </div>
    }>
      <SignupForm />
    </Suspense>
  );
}