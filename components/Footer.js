"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { BrandMark } from "./ui/Primitives";
import { IconMail, IconInstagram, IconTikTok } from "./Icons";
import { SITE } from "@/lib/constants";

export default function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith("/auth") || pathname?.startsWith("/course/learn")) return null;

  return (
    <footer className="bg-brand-blue-deep text-white/60 pt-14 pb-7 px-6">
      <div className="max-w-[1140px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-9">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="no-underline inline-block mb-3.5">
              <BrandMark light />
            </Link>
            <p className="text-[13px] leading-relaxed max-w-[300px]">
              Helping future healthcare professionals master the CASPer exam with
              proven frameworks, expert strategies, and structured practice.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-white text-[13px] font-semibold mb-3.5 font-body">
              Platform
            </h4>
            {[
              ["Course Overview", "/"],
              ["Course Preview", "/course"],
              ["Blog", "/blog"],
              ["Enroll", "/checkout"],
            ].map(([label, href]) => (
              <Link
                key={label}
                href={href}
                className="block text-[13px] no-underline text-white/60 hover:text-white/90 mb-2 transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white text-[13px] font-semibold mb-3.5 font-body">
              Legal
            </h4>
            {["Terms of Service", "Refund Policy", "Privacy Policy"].map(
              (label) => (
                <Link
                  key={label}
                  href="/terms"
                  className="block text-[13px] no-underline text-white/60 hover:text-white/90 mb-2 transition-colors"
                >
                  {label}
                </Link>
              )
            )}
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-white text-[13px] font-semibold mb-3.5 font-body">
              Connect
            </h4>
            <a
              href={`mailto:${SITE.email}`}
              className="flex items-center gap-2 text-[13px] no-underline text-white/60 hover:text-white/90 mb-2.5 transition-colors"
            >
              <IconMail size={15} className="text-white/60" /> Email Us
            </a>
            <a
              href={SITE.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[13px] no-underline text-white/60 hover:text-white/90 mb-2.5 transition-colors"
            >
              <IconInstagram size={15} className="text-white/60" />{" "}
              {SITE.handle}
            </a>
            <a
              href={SITE.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[13px] no-underline text-white/60 hover:text-white/90 mb-2.5 transition-colors"
            >
              <IconTikTok size={15} className="text-white/60" /> {SITE.handle}
            </a>
          </div>
        </div>

        <div className="border-t border-white/[0.08] pt-5 flex flex-col md:flex-row justify-between text-[11px]">
          <p>2025 CASPer Prep by TSA. All rights reserved.</p>
          <p className="mt-1 md:mt-0">
            Built for students who refuse to leave their future to chance.
          </p>
        </div>
      </div>
    </footer>
  );
}