import Link from "next/link";
import { BrandMark } from "@/components/ui/Primitives";

export const metadata = {
  title: "Sign In",
  robots: { index: false, follow: false },
};

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-blue-deep via-brand-blue-dark to-brand-blue flex flex-col">
      <div className="px-6 pt-6">
        <Link href="/" className="no-underline inline-block">
          <BrandMark light />
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-[420px]">{children}</div>
      </div>

      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03] z-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.8) 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />
    </div>
  );
}