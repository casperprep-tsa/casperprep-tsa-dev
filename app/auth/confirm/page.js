import Link from "next/link";

export const metadata = {
  title: "Check Your Email",
};

export default function ConfirmPage() {
  return (
    <div className="relative z-10">
      <div className="bg-white rounded-2xl p-8 shadow-xl text-center">
        <div className="w-16 h-16 rounded-full bg-brand-blue-light flex items-center justify-center mx-auto mb-5">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-blue">
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
        </div>
        <h1 className="font-display text-2xl font-bold text-ink mb-2">
          Check Your Email
        </h1>
        <p className="font-body text-sm text-ink-muted leading-relaxed mb-2 max-w-sm mx-auto">
          We sent a confirmation link to your email address. 
          Click the link in the email to verify your account.
        </p>
        <p className="font-body text-[12px] text-ink-muted/70 mb-6 max-w-sm mx-auto">
          Don&apos;t see it? Check your spam folder. The link expires in 24 hours.
        </p>
        <div className="space-y-3">
          <Link
            href="/auth/login"
            className="block w-full py-3 rounded-lg bg-brand-orange text-white font-body font-semibold text-[15px] text-center hover:brightness-110 transition-all no-underline"
          >
            Go to Sign In
          </Link>
          <Link
            href="/"
            className="block font-body text-sm text-brand-blue no-underline hover:underline text-center"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}