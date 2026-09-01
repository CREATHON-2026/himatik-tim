"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  MessageCircle,
  ShoppingBag,
  UserPlus,
  FileText,
  Shield,
  Info,
  HelpCircle,
  Mail,
  MapPin,
  Video,
  ChevronRight,
  Compass,
  Headphones,
  Share2,
} from "lucide-react";

/* ─── Social Media Icons (Inline SVG) ─── */
function InstagramIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function YoutubeIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.56 49.56 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </svg>
  );
}



export function SectionFooter() {
  return (
    <footer className="relative w-full overflow-hidden bg-[#FAF4EC] text-[#3E5237]">
      {/* ════════════════════════════════════════════════════════════════ */}
      {/* PART A: FINAL CALL BANNER (CREATOR ACQUISITION INVITATION PLATE) */}
      {/* ════════════════════════════════════════════════════════════════ */}
      <section className="relative w-full pt-4 pb-12 sm:pb-16 md:pb-20">
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="subtle-paper-skeuo group relative overflow-hidden rounded-art-nouveau border-2 border-[#D8C4A7] bg-[#F5E9D5]/90 p-6 sm:p-10 md:p-12 shadow-[8px_8px_0px_0px_#D79C9A] transition-all duration-300">
            {/* VINTAGE WATERCOLOR BOTANICAL LEFT FRAME (-LEFT-2 -BOTTOM-2, 120% SCALE, OPACITY 80) */}
            <div className="pointer-events-none absolute -left-4 sm:-left-2 md:-left-6 -bottom-2 top-0 z-10 w-56 sm:w-54 md:w-62 select-none opacity-60 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/asset-landing/cta-left-rose-frame.webp"
                alt="Vintage Rose Frame Left"
                width={380}
                height={420}
                unoptimized
                className="h-full w-full origin-bottom-left scale-125 object-contain object-bottom-left mix-blend-multiply"
              />
            </div>

            {/* ARTISAN HANDMADE GIFT ASSET (BEHIND LEFT ROSES: Z-0, RIGHT-8 BOTTOM-8) */}
            <div className="pointer-events-none absolute scale-x-[-1] left-4 sm:left-12 bottom-22 sm:bottom-28 z-0 w-32 sm:w-64 md:w-88 select-none opacity-70 transition-opacity duration-300 group-hover:opacity-100">
              <Image
                src="/asset-landing/cta-left-artisan-gift.webp"
                alt="Artisan Handmade Gift"
                width={320}
                height={320}
                unoptimized
                className="h-full w-full object-contain object-bottom-right mix-blend-multiply"
              />
            </div>

            {/* ARTISAN HANDMADE GIFT ASSET (BEHIND RIGHT ROSES: Z-0, RIGHT-8 BOTTOM-8) */}
            <div className="pointer-events-none absolute right-10 bottom-2 md:right-10 md:bottom-2 z-0 w-40 sm:right-20 sm:bottom-32 sm:w-44 md:w-118 select-none opacity-70 transition-opacity duration-300 group-hover:opacity-100">
              <Image
                src="/asset-landing/cta-right-artisan-gift.webp"
                alt="Artisan Handmade Gift"
                width={320}
                height={320}
                unoptimized
                className="h-full w-full object-contain object-bottom-right mix-blend-multiply"
              />
            </div>

            {/* VINTAGE ROSE FRAME RIGHT (IN FRONT OF GIFT: Z-10, 120% SCALE, -RIGHT-2 -BOTTOM-2) */}
            <div className="pointer-events-none absolute -right-14 sm:-right-14 -bottom-6   z-0 w-52 sm:w-58 md:w-56 select-none opacity-70 transition-opacity duration-300 group-hover:opacity-100">
              <Image
                src="/asset-landing/cta-right-rose-frame.webp"
                alt="Vintage Rose Frame Right"
                width={350}
                height={380}
                unoptimized
                className="h-full w-full origin-bottom-right scale-125 object-contain object-bottom-right mix-blend-multiply"
              />
            </div>



            {/* INNER BANNER CONTENT */}
            <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center">
              {/* TOP ARTISAN ROSE EMBLEM WITH SHADCN SEPARATOR */}
              <div className=" flex items-center justify-center gap-4 w-full max-w-xs mx-auto">
                <Separator className="bg-[#B89A57]/50 h-px flex-1" />
                <div className="relative size-12 sm:size-18 shrink-0 rounded-full">
                  <Image
                    src="/asset-landing/cta-button-rose-emblem.webp"
                    alt="Artisan Rose Emblem"
                    width={48}
                    height={48}
                    unoptimized
                    className="size-full rounded-full object-cover border border-[#B89A57]/60 shadow-[0_2px_6px_rgba(0,0,0,0.15)]"
                  />
                </div>
                <Separator className="bg-[#B89A57]/50 h-px flex-1" />
              </div>

              {/* HEADLINE H2 */}
              <h2 className="font-heading mb-2 text-2xl font-bold leading-[1.12] tracking-tight text-[#3E5237] sm:text-4xl lg:text-5xl">
                Siap Mengembangkan Karya Anda?
              </h2>

              {/* SUBHEADLINE NARRATIVE */}
              <p className="font-sans mb-6 text-xs font-medium leading-relaxed text-[#4A5A42] sm:text-sm md:text-base max-w-xl">
                Bicket adalah panggung Anda. Mari berkolaborasi dan wujudkan
                potensi kreatif Anda dari Makassar untuk Indonesia.
              </p>

              {/* MAIN HERO CTA BUTTON (CLEAN SKEUO-FOREST STYLE) */}
              <div className="mb-8 w-full sm:w-auto">
                <Link href="/register?role=creator">
                  <Button
                    variant="skeuo-forest"
                    size="lg"
                    className="min-h-12 w-full cursor-pointer rounded-full px-8 py-4 font-sans text-xs sm:text-sm md:text-base font-bold transition-all duration-300 shadow-[4px_4px_0px_0px_#B89A57] hover:shadow-[6px_6px_0px_0px_#3E5237] active:translate-x-1 active:translate-y-1 active:shadow-none flex items-center justify-center gap-3 sm:w-auto"
                  >
                    <span>Daftar Sebagai Kreator Sekarang - 100% Gratis</span>
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>

              {/* TRUST BADGES BAR (3D SKEUOMORPHIC PILLS WITH 2-LINE TEXT SUPPORT & HIGH CONTRAST BG) */}
              <div className="flex w-full flex-wrap items-center justify-center gap-2 sm:gap-4 md:gap-6 border-t border-[#D8C4A7]/60 pt-4 sm:pt-6 select-none">
                {/* ITEM 1: ESCROW */}
                <div className="flex items-center gap-2 rounded-full border border-[#B89A57]/60 bg-[#FAF4EC]/95 px-4 py-2 shadow-[2px_2px_0px_0px_#B89A57] transition-all duration-200 hover:scale-102">
                  <div className="flex size-7 sm:size-8 shrink-0 items-center justify-center rounded-full bg-[#F5E9D5] border border-[#B89A57]/60 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)]">
                    <ShieldCheck className="size-3.5 sm:size-4 text-[#3E5237]" />
                  </div>
                  <span className="font-sans text-[10px] sm:text-xs font-bold leading-tight text-[#3E5237] max-w-32.5 sm:max-w-none text-left">
                    100% Rekening Bersama Escrow
                  </span>
                </div>

                <span className="hidden text-[#B89A57]/60 text-xs sm:inline">|</span>

                {/* ITEM 2: PAYOUT CEPAT */}
                <div className="flex items-center gap-2 rounded-full border border-[#B89A57]/60 bg-[#FAF4EC]/95 px-4 py-2 shadow-[2px_2px_0px_0px_#B89A57] transition-all duration-200 hover:scale-102">
                  <div className="flex size-7 sm:size-8 shrink-0 items-center justify-center rounded-full bg-[#F5E9D5] border border-[#B89A57]/60 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)]">
                    <Zap className="size-3.5 sm:size-4 text-[#B89A57]" />
                  </div>
                  <span className="font-sans text-[10px] sm:text-xs font-bold leading-tight text-[#3E5237] text-left">
                    Payout Cepat
                  </span>
                </div>

                <span className="hidden text-[#B89A57]/60 text-xs sm:inline">|</span>

                {/* ITEM 3: WA SUPPORT */}
                <div className="flex items-center gap-2 rounded-full border border-[#B89A57]/60 bg-[#FAF4EC]/95 px-4 py-2 shadow-[2px_2px_0px_0px_#B89A57] transition-all duration-200 hover:scale-102">
                  <div className="flex size-7 sm:size-8 shrink-0 items-center justify-center rounded-full bg-[#F5E9D5] border border-[#B89A57]/60 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)]">
                    <MessageCircle className="size-3.5 sm:size-4 text-[#566B4D]" />
                  </div>
                  <span className="font-sans text-[10px] sm:text-xs font-bold leading-tight text-[#3E5237] text-left">
                    WA Support 24/7
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════ */}
      {/* PART B: MAIN ARTISAN FOOTER (DEEP FOREST GREEN BRANDED FOOTER)   */}
      {/* ════════════════════════════════════════════════════════════════ */}
      <div className="relative mx-auto w-full max-w-7xl overflow-hidden rounded-t-art-nouveau border-t-2 border-l-2 border-r-2 border-[#B89A57]/60 bg-[#3E5237] text-[#FAF4EC] shadow-lg shadow-[#3E5237]/20">
        {/* BOTANICAL WATERMARK OVERLAY */}
        <div className="pointer-events-none absolute inset-0 bg-radial from-transparent via-[#222E1F]/30 to-[#222E1F]/60" />

        {/* ARTWORK 1: ARTISAN BOUQUET (BEHIND RIGHT VINES: Z-0, -RIGHT-10 -BOTTOM-10, OPACITY 70) */}
        <div className="pointer-events-none absolute -left-15 bottom-2 z-0 h-72 w-96 md:w-105 opacity-60 select-none">
          <Image
            src="/assets/footer-left-artisan-bouquet.webp"
            alt="Artisan Bouquet Background"
            width={450}
            height={350}
            unoptimized
            className="h-full w-full object-contain object-bottom-right mix-blend-screen"
          />
        </div>

        {/* ARTWORK 2A: GOLD FILIGREE VINES LEFT (Z-10, FLIPPED HORIZONTALLY) */}
        <div className="pointer-events-none absolute -left-10 -bottom-4 z-10 h-64 w-64 opacity-90 select-none">
          <Image
            src="/assets/right-vines-gold.webp"
            alt="Gold Vines Left"
            width={300}
            height={300}
            unoptimized
            className="h-full w-full -scale-x-100 object-contain object-bottom-left"
          />
        </div>

        {/* ARTWORK 2B: GOLD FILIGREE VINES RIGHT (Z-10, IN FRONT OF BOUQUET) */}
        <div className="pointer-events-none absolute -right-10 -bottom-4 z-10 h-64 w-64 opacity-90 select-none">
          <Image
            src="/assets/right-vines-gold.webp"
            alt="Gold Vines Right"
            width={300}
            height={300}
            unoptimized
            className="h-full w-full object-contain object-bottom-right"
          />
        </div>

        {/* MAIN FOOTER CONTAINER */}
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pt-4 pb-2 sm:px-6 lg:px-8">
          {/* 4 COLUMNS RESPONSIVE GRID (2x2 GRID ON MOBILE/TABLET -> 4 COLUMNS ON DESKTOP) */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-8  lg:grid-cols-4 lg:gap-0 lg:divide-x divide-[#B89A57]/30 mb-8">
            
            {/* COLUMN 1: BRAND INFO & VISION (ROW 1 LEFT) */}
            <div className="col-span-1 flex flex-col items-start pr-0 sm:pr-2 lg:pr-6">
              {/* BRAND EMBLEM LOGO (BALANCED PROPORTIONAL SIZE MB-1) */}
              <Link href="/" className=" block group self-center">
                <Image
                  src="/logo/brand-logo-gold.webp"
                  alt="Bicket Creative Launchpad Logo"
                  width={170}
                  height={170}
                  unoptimized
                  className="h-auto w-40 sm:w-56 md:w-48 object-contain self-center transition-transform group-hover:scale-102 filter drop-shadow-xs"
                />
              </Link>

              {/* BRAND DESCRIPTION */}
              <p className="font-sans text-xs leading-relaxed text-[#F5E9D5]/80 mb-3 sm:mb-4">
                Platform marketplace buket & kado kustom buatan tangan mahasiswa
                & pengrajin lokal Makassar.
              </p>

              {/* ART NOUVEAU ACCENT LINE */}
             <Separator variant="flourish-gold" className="my-4" />
            </div>

            {/* COLUMN 2: QUICK NAVIGATION (ROW 1 RIGHT) */}
            <div className="col-span-1 flex flex-col text-left pl-2 sm:pl-4 lg:px-6">
              <h3 className="font-heading mb-3 sm:mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-[#B89A57]">
                <Compass className="size-4 text-[#B89A57]" />
                <span>Navigasi Cepat</span>
              </h3>

              <ul className="space-y-1.5 sm:space-y-2 font-sans text-xs">
                <li>
                  <Link
                    href="/market"
                    className="group flex min-h-9 sm:min-h-11 items-center justify-between rounded-lg px-2 py-1.5 sm:py-2 text-[#FAF4EC]/90 transition-all hover:bg-[#566B4D]/40 hover:text-[#B89A57]"
                  >
                    <span className="flex items-center gap-2 truncate">
                      <ShoppingBag className="size-3.5 sm:size-4 shrink-0 text-[#B89A57]" />
                      <span className="truncate">Katalog Market</span>
                    </span>
                    <ChevronRight className="size-3.5 shrink-0 transition-transform group-hover:translate-x-1" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="/register?role=creator"
                    className="group flex min-h-9 sm:min-h-11 items-center justify-between rounded-lg px-2 py-1.5 sm:py-2 text-[#FAF4EC]/90 transition-all hover:bg-[#566B4D]/40 hover:text-[#B89A57]"
                  >
                    <span className="flex items-center gap-2 truncate">
                      <UserPlus className="size-3.5 sm:size-4 shrink-0 text-[#B89A57]" />
                      <span className="truncate">Daftar Kreator</span>
                    </span>
                    <ChevronRight className="size-3.5 shrink-0 transition-transform group-hover:translate-x-1" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="group flex min-h-9 sm:min-h-11 items-center justify-between rounded-lg px-2 py-2 text-[#FAF4EC]/90 transition-all hover:bg-[#566B4D]/40 hover:text-[#B89A57]"
                  >
                    <span className="flex items-center gap-2 truncate">
                      <FileText className="size-3.5 sm:size-4 shrink-0 text-[#B89A57]" />
                      <span className="truncate">Syarat & Ketentuan</span>
                    </span>
                    <ChevronRight className="size-3.5 shrink-0 transition-transform group-hover:translate-x-1" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="group flex min-h-9 sm:min-h-11 items-center justify-between rounded-lg px-2 py-1.5 sm:py-2 text-[#FAF4EC]/90 transition-all hover:bg-[#566B4D]/40 hover:text-[#B89A57]"
                  >
                    <span className="flex items-center gap-2 truncate">
                      <Shield className="size-3.5 sm:size-4 shrink-0 text-[#B89A57]" />
                      <span className="truncate">Kebijakan Privasi</span>
                    </span>
                    <ChevronRight className="size-3.5 shrink-0 transition-transform group-hover:translate-x-1" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="group flex min-h-9 sm:min-h-11 items-center justify-between rounded-lg px-2 py-1.5 sm:py-2 text-[#FAF4EC]/90 transition-all hover:bg-[#566B4D]/40 hover:text-[#B89A57]"
                  >
                    <span className="flex items-center gap-2 truncate">
                      <Info className="size-3.5 sm:size-4 shrink-0 text-[#B89A57]" />
                      <span className="truncate">Tentang Bicket</span>
                    </span>
                    <ChevronRight className="size-3.5 shrink-0 transition-transform group-hover:translate-x-1" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="/help"
                    className="group flex min-h-9 sm:min-h-11 items-center justify-between rounded-lg px-2 py-1.5 sm:py-2 text-[#FAF4EC]/90 transition-all hover:bg-[#566B4D]/40 hover:text-[#B89A57]"
                  >
                    <span className="flex items-center gap-2 truncate">
                      <HelpCircle className="size-3.5 sm:size-4 shrink-0 text-[#B89A57]" />
                      <span className="truncate">Pusat Bantuan</span>
                    </span>
                    <ChevronRight className="size-3.5 shrink-0 transition-transform group-hover:translate-x-1" />
                  </Link>
                </li>
              </ul>
            </div>

            {/* COLUMN 3: KONTAK ADMIN (ROW 2 LEFT) */}
            <div className="col-span-1 flex flex-col text-left pr-0 sm:pr-2 lg:px-6">
              <h3 className="font-heading mb-3 sm:mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-[#B89A57]">
                <Headphones className="size-4 text-[#B89A57]" />
                <span>Kontak Admin</span>
              </h3>

              <div className="space-y-2.5 sm:space-y-3 font-sans text-xs">
                {/* WHATSAPP CARD */}
                <motion.a
                  href="https://wa.me/6281234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="group flex min-h-10 sm:min-h-12 items-center gap-2 sm:gap-3.5 rounded-xl sm:rounded-2xl border border-[#566B4D]/80 bg-linear-to-b from-[#33462E] to-[#243320] p-2.5 sm:p-3.5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.18),0_4px_12px_rgba(0,0,0,0.3)] hover:border-[#B89A57]"
                >
                  <div className="flex size-8 sm:size-9 shrink-0 items-center justify-center rounded-lg sm:rounded-xl bg-linear-to-b from-[#465C3E] to-[#30412B] border border-[#B89A57]/60 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]">
                    <MessageCircle className="size-3.5 sm:size-4 text-[#FAF4EC]" />
                  </div>
                  <div className="flex flex-col min-w-0 overflow-hidden text-left">
                    <span className="text-[8.5px] sm:text-[10px] font-medium text-[#B89A57] truncate">WhatsApp Admin</span>
                    <span className="font-bold text-[10px] sm:text-xs text-[#FAF4EC] truncate">+62 812-3456-7890</span>
                    <span className="text-[8px] sm:text-[9px] text-[#F5E9D5]/60 truncate">Fast Response</span>
                  </div>
                </motion.a>

                {/* EMAIL CARD */}
                <motion.a
                  href="mailto:hello@bicket.id"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="group flex min-h-10 sm:min-h-12 items-center gap-2 sm:gap-3.5 rounded-xl sm:rounded-2xl border border-[#566B4D]/80 bg-linear-to-b from-[#33462E] to-[#243320] p-2.5 sm:p-3.5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.18),0_4px_12px_rgba(0,0,0,0.3)] hover:border-[#B89A57]"
                >
                  <div className="flex size-8 sm:size-9 shrink-0 items-center justify-center rounded-lg sm:rounded-xl bg-linear-to-b from-[#465C3E] to-[#30412B] border border-[#B89A57]/60 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]">
                    <Mail className="size-3.5 sm:size-4 text-[#FAF4EC]" />
                  </div>
                  <div className="flex flex-col min-w-0 overflow-hidden text-left">
                    <span className="text-[8.5px] sm:text-[10px] font-medium text-[#B89A57] truncate">Email Support</span>
                    <span className="font-bold text-[10px] sm:text-xs text-[#FAF4EC] truncate">hello@bicket.id</span>
                    <span className="text-[8px] sm:text-[9px] text-[#F5E9D5]/60 truncate">Kami siap membantu</span>
                  </div>
                </motion.a>

                {/* STUDIO ADDRESS CARD */}
                <motion.div
                  whileHover={{ scale: 1.02, y: -2 }}
                  transition={{ duration: 0.2 }}
                  className="flex min-h-10 sm:min-h-12 items-center gap-2 sm:gap-3.5 rounded-xl sm:rounded-2xl border border-[#566B4D]/80 bg-linear-to-b from-[#33462E] to-[#243320] p-2.5 sm:p-3.5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.18),0_4px_12px_rgba(0,0,0,0.3)]"
                >
                  <div className="flex size-8 sm:size-9 shrink-0 items-center justify-center rounded-lg sm:rounded-xl bg-linear-to-b from-[#465C3E] to-[#30412B] border border-[#B89A57]/60 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]">
                    <MapPin className="size-3.5 sm:size-4 text-[#FAF4EC]" />
                  </div>
                  <div className="flex flex-col min-w-0 overflow-hidden text-left">
                    <span className="text-[8.5px] sm:text-[10px] font-medium text-[#B89A57] truncate">Studio Makassar</span>
                    <span className="font-bold text-[10px] sm:text-xs text-[#FAF4EC] truncate">Jl. Boulevard, MKS</span>
                    <span className="text-[8px] sm:text-[9px] text-[#F5E9D5]/60 line-clamp-1 sm:line-clamp-none">Sulsel, Indonesia</span>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* COLUMN 4: MEDIA SOSIAL (ROW 2 RIGHT) */}
            <div className="col-span-1 flex flex-col text-left pl-2 sm:pl-4 lg:pl-6">
              <h3 className="font-heading mb-3 sm:mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-[#B89A57]">
                <Share2 className="size-4 text-[#B89A57]" />
                <span>Media Sosial</span>
              </h3>

              <div className="space-y-2.5 sm:space-y-3 font-sans text-xs">
                {/* INSTAGRAM */}
                <motion.a
                  href="https://instagram.com/bicket.makassar"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="group flex min-h-10 sm:min-h-12 items-center gap-2 sm:gap-3.5 rounded-xl sm:rounded-2xl border border-[#566B4D]/80 bg-linear-to-b from-[#33462E] to-[#243320] p-2.5 sm:p-3.5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.18),0_4px_12px_rgba(0,0,0,0.3)] hover:border-[#D79C9A]"
                >
                  <div className="flex size-8 sm:size-9 shrink-0 items-center justify-center rounded-lg sm:rounded-xl bg-linear-to-b from-[#D87672] to-[#B3524E] border border-[#EAA6A3]/60 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)] text-white">
                    <InstagramIcon className="size-3.5 sm:size-4" />
                  </div>
                  <div className="flex flex-col min-w-0 overflow-hidden text-left">
                    <span className="font-bold text-[10px] sm:text-xs text-[#FAF4EC] truncate">Instagram</span>
                    <span className="text-[8.5px] sm:text-[10px] text-[#F5E9D5]/70 truncate">@bicket.makassar</span>
                  </div>
                </motion.a>

                {/* TIKTOK */}
                <motion.a
                  href="https://tiktok.com/@bicket.makassar"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="group flex min-h-10 sm:min-h-12 items-center gap-2 sm:gap-3.5 rounded-xl sm:rounded-2xl border border-[#566B4D]/80 bg-linear-to-b from-[#33462E] to-[#243320] p-2.5 sm:p-3.5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.18),0_4px_12px_rgba(0,0,0,0.3)] hover:border-[#B89A57]"
                >
                  <div className="flex size-8 sm:size-9 shrink-0 items-center justify-center rounded-lg sm:rounded-xl bg-linear-to-b from-[#2D3A4B] to-[#17202C] border border-[#B89A57]/60 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] text-white">
                    <Video className="size-3.5 sm:size-4 text-[#EBC3A8]" />
                  </div>
                  <div className="flex flex-col min-w-0 overflow-hidden text-left">
                    <span className="font-bold text-[10px] sm:text-xs text-[#FAF4EC] truncate">TikTok</span>
                    <span className="text-[8.5px] sm:text-[10px] text-[#F5E9D5]/70 truncate">@bicket.makassar</span>
                  </div>
                </motion.a>

                {/* YOUTUBE */}
                <motion.a
                  href="https://youtube.com/@bicket.makassar"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="group flex min-h-10 sm:min-h-12 items-center gap-2 sm:gap-3.5 rounded-xl sm:rounded-2xl border border-[#566B4D]/80 bg-linear-to-b from-[#33462E] to-[#243320] p-2.5 sm:p-3.5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.18),0_4px_12px_rgba(0,0,0,0.3)] hover:border-[#C86B67]"
                >
                  <div className="flex size-8 sm:size-9 shrink-0 items-center justify-center rounded-lg sm:rounded-xl bg-linear-to-b from-[#E04545] to-[#B02828] border border-[#FFA3A3]/60 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)] text-white">
                    <YoutubeIcon className="size-3.5 sm:size-4" />
                  </div>
                  <div className="flex flex-col min-w-0 overflow-hidden text-left">
                    <span className="font-bold text-[10px] sm:text-xs text-[#FAF4EC] truncate">YouTube</span>
                    <span className="text-[8.5px] sm:text-[10px] text-[#F5E9D5]/70 truncate">Bicket Official</span>
                  </div>
                </motion.a>
              </div>
            </div>

          </div>

          {/* FLOURISH GOLD SEPARATOR ABOVE COPYRIGHT */}
          <Separator variant="flourish-gold" className="my-0" />

        </div>
      </div>
    </footer>
  );
}

export default SectionFooter;
