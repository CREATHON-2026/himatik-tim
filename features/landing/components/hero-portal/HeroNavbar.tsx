"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, LogIn, UserPlus } from "lucide-react";

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
    if (targetId.startsWith("#")) {
      e.preventDefault();
      if (onNavigate) {
        onNavigate(targetId);
      } else {
        const el = document.querySelector(targetId);
        el?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header className="fixed top-0 right-0 left-0 z-50 h-16 border-b border-[#E7E5E4]/80 bg-[#FAFAF9]/80 backdrop-blur-md transition-all duration-300">
      <div className="mx-auto flex h-full max-w-360 items-center justify-between px-6 md:px-14">
        {/* Brand Logo & Wordmark (Emblem + GIFTERIA Text) */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 sm:gap-3 transition-opacity hover:opacity-90"
        >
          {/* Square Emblem Logo */}
          <div className="relative h-9 w-9 sm:h-10 sm:w-10 shrink-0">
            <Image
              src="/logo/brand-logo.webp"
              alt="Gifteria Emblem"
              fill
              className="object-contain"
              priority
            />
          </div>

          <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#111827] transition-colors group-hover:text-[#6355D9]">
            GIFTERIA
          </span>
        </Link>

        {/* Center Navigation Links */}
        <nav className="hidden items-center gap-8 lg:flex">
          <Link
            href="/katalog"
            className="text-xs font-semibold tracking-wider uppercase text-[#44403C] transition-colors duration-200 hover:text-[#6355D9]"
          >
            Katalog Kado
          </Link>
          <a
            href="#flavors"
            onClick={(e) => handleLinkClick(e, "#flavors")}
            className="text-xs font-semibold tracking-wider uppercase text-[#78716C] transition-colors duration-200 hover:text-[#6355D9]"
          >
            Koleksi Unggulan
          </a>
          <a
            href="#inside"
            onClick={(e) => handleLinkClick(e, "#inside")}
            className="text-xs font-semibold tracking-wider uppercase text-[#78716C] transition-colors duration-200 hover:text-[#6355D9]"
          >
            Untuk Kreator
          </a>
          <a
            href="#story"
            onClick={(e) => handleLinkClick(e, "#story")}
            className="text-xs font-semibold tracking-wider uppercase text-[#78716C] transition-colors duration-200 hover:text-[#6355D9]"
          >
            Cerita Sanggar
          </a>
        </nav>

        {/* Right Actions: Cart, Login, and Register Buttons */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Cart Icon / Counter */}
          <Link
            href="/katalog"
            className="flex items-center gap-1.5 rounded-xl border border-[#E7E5E4] bg-white px-3 py-1.5 text-xs font-medium text-[#44403C] shadow-2xs transition-all hover:bg-[#F5F5F4] hover:text-[#111827]"
          >
            <ShoppingBag className="h-3.5 w-3.5 text-[#6355D9]" />
            <span className="font-sans font-semibold text-[11px]">
              Kado ({cartCount})
            </span>
          </Link>

          {/* Tombol Masuk (Login) */}
          <Link
            href="/login"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-[#44403C] hover:text-[#6355D9] hover:bg-white/60 transition"
          >
            <LogIn className="size-3.5" />
            <span>Masuk</span>
          </Link>

          {/* Tombol Daftar (Register) - Solid Royal Violet CTA */}
          <Link
            href="/register"
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-[#6355D9] hover:bg-[#5145C6] text-white text-xs font-semibold shadow-xs transition active:scale-98"
          >
            <UserPlus className="size-3.5" />
            <span>Daftar</span>
          </Link>
        </div>
      </div>
    </header>
  );
};
