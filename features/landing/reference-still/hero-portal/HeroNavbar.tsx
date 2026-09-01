"use client";

import React from "react";
import { ArrowRight, ShoppingBag } from "lucide-react";

interface HeroNavbarProps {
  cartCount?: number;
  onNavigate?: (targetId: string) => void;
}

export const HeroNavbar: React.FC<HeroNavbarProps> = ({
  cartCount = 0,
  onNavigate,
}) => {
  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(targetId);
    } else {
      const el = document.querySelector(targetId);
      el?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 right-0 left-0 z-50 h-14 border-b border-[#1A1B1D]/5 bg-[#EFEDE6]/80 backdrop-blur-md transition-all duration-300">
      <div className="mx-auto flex h-full max-w-360 items-center justify-between px-6 md:px-12">
        {/* Brand Wordmark */}
        <a
          href="#hero"
          onClick={(e) => handleLinkClick(e, "#hero")}
          className="group inline-flex items-baseline text-xl font-black tracking-tighter uppercase text-[#1A1B1D]"
        >
          <span>STILL</span>
          <span
            aria-hidden="true"
            className="ml-1 inline-block h-1.5 w-1.5 bg-[#BCD3D8] align-baseline transition-transform duration-300 group-hover:scale-125"
          />
        </a>

        {/* Navigation Links */}
        <nav className="hidden items-center gap-8 md:flex">
          {[
            { label: "Flavors", href: "#flavors" },
            { label: "Inside", href: "#inside" },
            { label: "Story", href: "#story" },
            { label: "Press", href: "#press" },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleLinkClick(e, item.href)}
              className="text-[12px] font-medium tracking-[0.16em] uppercase text-[#737578] transition-colors duration-300 hover:text-[#1A1B1D]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Action Link & Cart */}
        <div className="flex items-center gap-5">
          <a
            href="#flavors"
            onClick={(e) => handleLinkClick(e, "#flavors")}
            className="group hidden items-center gap-1.5 text-[12px] font-semibold tracking-[0.18em] uppercase text-[#1A1B1D] md:inline-flex"
          >
            <span>Shop</span>
            <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5" />
          </a>

          <button
            type="button"
            aria-label={`Open cart, ${cartCount} items`}
            className="relative flex h-8 w-8 items-center justify-center rounded-full border border-[#1A1B1D]/15 text-[#1A1B1D] transition-colors hover:bg-[#1A1B1D]/5"
          >
            <ShoppingBag className="h-3.5 w-3.5" />
            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#BCD3D8] text-[8px] font-bold text-[#1A1B1D]">
              {cartCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
