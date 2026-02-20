"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandMark, Btn } from "./ui/Primitives";
import { createClient } from "@/lib/supabase/client";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Course", href: "/course" },
  { label: "Blog", href: "/blog" },
  { label: "Terms", href: "/terms" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const pathname = usePathname();

  const hidden = pathname?.startsWith("/auth") || pathname?.startsWith("/course/learn");

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      setAuthLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (hidden) return null;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/[0.97] backdrop-blur-md border-b border-surface-border py-2.5"
          : "bg-transparent py-[18px]"
      }`}
    >
      <div className="max-w-[1140px] mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="no-underline">
          <BrandMark scrolled={scrolled} />
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`font-body text-sm no-underline transition-colors pb-1 ${
                  scrolled
                    ? active
                      ? "text-brand-blue font-semibold border-b-2 border-brand-blue"
                      : "text-ink-soft hover:text-ink border-b-2 border-transparent"
                    : active
                    ? "text-brand-orange font-semibold border-b-2 border-brand-orange"
                    : "text-white/80 hover:text-white border-b-2 border-transparent"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          {!authLoading && (
            user ? (
              <Btn variant="primary" size="sm" href="/dashboard">
                Dashboard
              </Btn>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/auth/login"
                  className={`font-body text-sm no-underline transition-colors ${
                    scrolled ? "text-ink-soft hover:text-ink" : "text-white/80 hover:text-white"
                  }`}
                >
                  Sign In
                </Link>
                <Btn variant="primary" size="sm" href="/checkout">
                  Enroll Now
                </Btn>
              </div>
            )
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`w-5 h-0.5 transition-all ${scrolled ? "bg-ink" : "bg-white"}`}
            />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-surface-border px-6 py-4 space-y-3">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block font-body text-sm text-ink-soft no-underline py-2"
            >
              {link.label}
            </Link>
          ))}
          <Btn variant="primary" size="sm" full href={user ? "/dashboard" : "/checkout"}>
            {user ? "Dashboard" : "Enroll Now"}
          </Btn>
        </div>
      )}
    </nav>
  );
}