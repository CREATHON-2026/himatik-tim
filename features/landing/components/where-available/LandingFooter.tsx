"use client";

import React, { useState } from "react";
import { Check } from "lucide-react";

interface LandingFooterProps {
  onNavigate?: (targetId: string) => void;
}

export const LandingFooter: React.FC<LandingFooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubscribed(true);
    setEmail("");
  };

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(targetId);
    } else {
      document.querySelector(targetId)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="relative w-full border-t border-[#1A1B1D]/15 bg-[#EFEDE6] text-[#1A1B1D] overflow-hidden">
      <div className="mx-auto w-full max-w-360 px-6 md:px-14 pt-16 md:pt-24 pb-12">
        {/* Newsletter Signup Row */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-12 pb-14 border-b border-[#1A1B1D]/15">
          <div className="md:col-span-6">
            <span className="font-mono text-xs font-semibold tracking-[0.24em] uppercase text-[#737578]">
              Newsletter
            </span>
            <h3 className="mt-3 font-serif text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-[#1A1B1D] leading-tight">
              Get notified when we ship to your city.
            </h3>
          </div>

          <div className="md:col-span-6 flex flex-col justify-end">
            {isSubscribed ? (
              <div className="flex items-center gap-2 text-sm font-mono text-[#1A1B1D] bg-[#BCD3D8]/30 p-4 rounded-xl border border-[#BCD3D8]">
                <Check className="h-4 w-4 text-[#1A1B1D]" />
                <span>Thank you. We will let you know the day we arrive.</span>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex items-end gap-4 border-b border-[#1A1B1D]/30 pb-3"
              >
                <input
                  type="email"
                  required
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-transparent font-sans text-base text-[#1A1B1D] placeholder:text-[#737578] focus:outline-none"
                />
                <button
                  type="submit"
                  className="font-mono text-xs font-bold tracking-[0.2em] uppercase text-[#1A1B1D] hover:text-[#737578] transition-colors duration-300"
                >
                  Sign Up
                </button>
              </form>
            )}
          </div>
        </div>

        {/* 4-Column Footer Navigation Links */}
        <div className="mt-12 grid grid-cols-2 gap-8 md:grid-cols-12 md:gap-12">
          {/* Col 1: Brand Wordmark & Mission */}
          <div className="col-span-2 md:col-span-4">
            <div className="flex items-baseline font-sans text-xl font-black tracking-tighter uppercase text-[#1A1B1D]">
              <span>STILL</span>
              <span
                aria-hidden="true"
                className="ml-1 inline-block h-1.5 w-1.5 bg-[#BCD3D8] align-baseline"
              />
            </div>
            <p className="mt-3 font-sans text-xs text-[#737578] leading-relaxed max-w-xs">
              A nootropic blend for sustained natural focus. Caffeine-free. Made
              in Wellington, New Zealand.
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="col-span-1 md:col-span-3 md:col-start-6">
            <span className="font-mono text-[10px] font-bold tracking-[0.24em] uppercase text-[#737578]">
              Site
            </span>
            <ul className="mt-3 flex flex-col gap-2 font-sans text-xs sm:text-sm text-[#1A1B1D]">
              {[
                { label: "Flavors", href: "#flavors" },
                { label: "Inside", href: "#inside" },
                { label: "Story", href: "#story" },
                { label: "Stockists", href: "#stockists" },
                { label: "Shop", href: "#shop" },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={(e) => handleLinkClick(e, item.href)}
                    className="hover:text-[#737578] transition-colors duration-200"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Legal Links */}
          <div className="col-span-1 md:col-span-3 md:col-start-10">
            <span className="font-mono text-[10px] font-bold tracking-[0.24em] uppercase text-[#737578]">
              Legal
            </span>
            <ul className="mt-3 flex flex-col gap-2 font-sans text-xs sm:text-sm text-[#1A1B1D]">
              <li>
                <a
                  href="/privacy"
                  className="hover:text-[#737578] transition-colors duration-200"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  className="hover:text-[#737578] transition-colors duration-200"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Baseline Copyright */}
        <div className="mt-14 pt-6 border-t border-[#1A1B1D]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#737578]">
          <span>© {new Date().getFullYear()} STILL Beverages Ltd.</span>
          <span>Brewed & Poured in Wellington, New Zealand.</span>
        </div>
      </div>
    </footer>
  );
};
