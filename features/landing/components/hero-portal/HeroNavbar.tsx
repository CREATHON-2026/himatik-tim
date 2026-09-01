"use client";

import React from "react";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";

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
    <header className="fixed top-0 right-0 left-0 z-50 h-16 border-b border-[#3E5237]/10 bg-[#FAF4EC]/60 backdrop-blur-md transition-all duration-300">
      <div className="mx-auto flex h-full max-w-360 items-center justify-between px-6 md:px-14">
        {/* Brand Logo & Wordmark (Emblem + BICKET Text) */}
        <a
          href="#hero"
          onClick={(e) => handleLinkClick(e, "#hero")}
          className="group flex items-center gap-2.5 sm:gap-3 transition-opacity hover:opacity-85"
        >
          {/* Square Emblem Logo */}
          <div className="relative h-9 w-9 sm:h-10 sm:w-10 shrink-0">
            <Image
              src="/logo/brand-logo.webp"
              alt="Bicket Emblem"
              fill
              priority
              className="object-contain"
            />
          </div>

          {/* Luxury Serif Brand Wordmark */}
          <span className="font-serif text-lg sm:text-xl font-normal tracking-[0.24em] uppercase text-[#3E5237]">
            BICKET
          </span>
        </a>

        {/* Center Navigation Links (Matching Frame 1: SHOP · DISCOVER · FOR CREATORS · OUR STORY) */}
        <nav className="hidden items-center gap-10 lg:flex">
          {[
            { label: "Shop", href: "#shop" },
            { label: "Discover", href: "#flavors" },
            { label: "For Creators", href: "#inside" },
            { label: "Our Story", href: "#story" },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleLinkClick(e, item.href)}
              className="text-[11px] font-semibold tracking-[0.24em] uppercase text-[#3E5237] transition-colors duration-300 hover:text-[#566B4D]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right Actions: Cart Count & More Menu */}
        <div className="flex items-center gap-3 sm:gap-4">
          <a
            href="#shop"
            onClick={(e) => handleLinkClick(e, "#shop")}
            className="flex items-center gap-2 rounded-full border border-[#3E5237]/25 px-3.5 py-1.5 text-[10px] sm:text-[11px] font-mono font-semibold tracking-[0.2em] uppercase text-[#3E5237] transition-all hover:bg-[#3E5237]/10"
          >
            <ShoppingBag className="h-3.5 w-3.5" />
            <span>CART ({cartCount})</span>
          </a>

          <button
            type="button"
            aria-label="More options"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-[#3E5237]/25 text-[#3E5237] transition-colors hover:bg-[#3E5237]/10"
          >
            <span className="font-mono text-xs font-bold leading-none tracking-widest">
              ···
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
