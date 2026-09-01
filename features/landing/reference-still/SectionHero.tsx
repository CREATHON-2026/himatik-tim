"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/ui/search-input";
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Users,
  Percent,
} from "lucide-react";

export function SectionHero() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/market?keyword=${encodeURIComponent(searchQuery.trim())}`;
    } else {
      window.location.href = "/market";
    }
  };

  return (
    <section className="bg-background relative w-full overflow-visible border-[#D8C4A7]/30 pt-4 pb-10 md:pb-12 lg:pb-14">
      {/* BACKGROUND ART NOUVEAU GLOW & DECORATIVE ACCENTS */}
      <div className="pointer-events-none absolute top-0 left-0 h-96 w-96 bg-radial from-[#EBC3A8]/25 to-transparent blur-3xl" />

      {/* MAIN INNER CONTAINER WRAPPER (ACTS AS RELATIVE REFERENCE FOR ALL ASSETS) */}
      <div className="relative mx-auto flex min-h-145 w-full max-w-7xl flex-col justify-between px-6 md:px-8">
        {/* 1. PALING BELAKANG: HERO IMAGE (Z-0, 20% BLEED KE KANAN & TANPA SHADOW) */}
        <div className="pointer-events-none absolute top-0 right-[-8%] bottom-6 z-0 hidden w-[70%] lg:block xl:right-[-10%] xl:w-[75%]">
          <div className="relative flex h-full w-full items-center justify-end">
            <Image
              src="/asset-landing/section-1-image.webp"
              alt="Mahasiswi Kreator Bicket Makassar Merangkai Bunga"
              fill
              unoptimized
              className="scale-110 object-contain object-right"
            />
          </div>
        </div>

        {/* 2. LAYER PALING DEPAN: KONTEN TEKS & KOMPONEN KIRI (Z-20, EVEN SPACING STANDARDS) */}
        <div className="relative z-20 mx-auto flex max-w-2xl flex-col items-center pb-12 text-center md:pb-16 lg:mx-0 lg:max-w-xl lg:items-start lg:text-left xl:max-w-2xl">
          {/* TOP BADGE */}
          <div className="animate-fade-up mb-4 inline-flex items-center gap-2 self-center rounded-full border border-[#B89A57]/60 bg-[#F5E9D5]/80 px-4 py-1.5 shadow-xs lg:self-start">
            <Sparkles className="size-3.5 text-[#B89A57]" />
            <span className="text-xs font-semibold tracking-wider text-[#3E5237] uppercase">
              BICKET MAKASSAR • CREATIVE LAUNCHPAD
            </span>
          </div>

          {/* HEADLINE H1 */}
          <h1
            className="font-heading animate-fade-up animate-stagger mb-2 text-3xl leading-[1.15] font-bold tracking-tight text-[#3E5237] sm:mb-4 sm:text-5xl sm:leading-[1.12] lg:text-6xl"
            style={{ "--delay": "100ms" } as React.CSSProperties}
          >
            Waktunya Karya Mahasiswa Makassar{" "}
            <span className="relative inline-block text-[#D79C9A]">
              Naik Kelas.
            </span>
          </h1>

          {/* SUB-HEADLINE */}
          <p
            className="animate-fade-up animate-stagger mx-auto mb-4 max-w-xl font-sans text-sm leading-relaxed text-[#78865C] sm:mb-6 sm:text-lg lg:mx-0"
            style={{ "--delay": "200ms" } as React.CSSProperties}
          >
            Platform khusus untuk kreator hadiah unik di Makassar. Dari
            mahasiswa untuk dunia, kami bantu kelola toko, pencatatan otomatis,
            hingga promosi produk Anda.
          </p>

          {/* MOBILE HERO IMAGE VISUAL FALLBACK (<1024PX SCREENS) - PLACED INLINE FOR IMMEDIATE MOBILE IMPACT */}
          <div className="relative z-10 mx-auto my-2 mb-4 block w-full max-w-md lg:hidden">
            <Image
              src="/asset-landing/section-1-image.webp"
              alt="Mahasiswi Kreator Bicket Makassar Merangkai Bunga"
              width={600}
              height={600}
              unoptimized
              className="mx-auto h-auto w-full object-contain"
            />
          </div>

          {/* DUAL CTA BUTTONS (SKEUO FOREST & PAPER SECONDARY) */}
          <div
            className="animate-fade-up animate-stagger mx-auto mb-4 flex w-full flex-col items-stretch justify-center gap-2 sm:mb-6 sm:w-auto sm:flex-row sm:items-center sm:gap-4 lg:mx-0 lg:justify-start"
            style={{ "--delay": "300ms" } as React.CSSProperties}
          >
            {/* PRIMARY CTA (CREATOR REGISTRATION - SKEUO FOREST VARIANT) */}
            <Link href="/register?role=creator" className="w-full sm:w-auto">
              <Button
                variant="skeuo-forest"
                size="lg"
                className="h-12 w-full cursor-pointer rounded-full px-6 text-sm font-semibold transition-transform sm:h-13 sm:w-auto sm:px-8 sm:text-base"
              >
                <span className="flex items-center justify-center gap-2">
                  Daftar Sebagai Kreator Sekarang
                  <ArrowRight className="size-4" />
                </span>
              </Button>
            </Link>

            {/* SECONDARY CTA (BUYER DISCOVERY - SKEUO PAPER SECONDARY VARIANT) */}
            <Link href="/market" className="w-full sm:w-auto">
              <Button
                variant="skeuo-paper-secondary"
                size="lg"
                className="h-12 w-full cursor-pointer rounded-full px-6 text-sm font-semibold text-[#3E5237] transition-all sm:h-13 sm:w-auto sm:px-8 sm:text-base"
              >
                <span>Jelajahi Katalog Buket 🌸</span>
              </Button>
            </Link>
          </div>

          {/* INTEGRATED SEARCH BAR */}
          <form
            onSubmit={handleSearchSubmit}
            className="animate-fade-up animate-stagger mx-auto mb-4 w-full max-w-xl sm:mb-6 lg:mx-0"
            style={{ "--delay": "400ms" } as React.CSSProperties}
          >
            <SearchInput
              variant="skeuo-paper"
              placeholder="Cari mawar, wisuda, gift box, atau nama toko..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onClear={() => setSearchQuery("")}
              className="h-11 w-full rounded-full bg-[#FAF6F0] text-xs sm:h-12 sm:text-sm"
            />
          </form>

          {/* TRUST METRICS STRIP */}
          <div
            className="animate-fade-up animate-stagger grid w-full grid-cols-1 gap-4 sm:grid-cols-3"
            style={{ "--delay": "500ms" } as React.CSSProperties}
          >
            <div className="paper-skeuo flex items-center justify-center gap-3 rounded-xl border border-[#D8C4A7]/60 p-4 text-left sm:justify-start">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#566B4D]/15 text-[#3E5237]">
                <Percent className="size-4" />
              </div>
              <div>
                <h4 className="text-xs leading-snug font-bold text-[#3E5237]">
                  0% Biaya Pendaftaran
                </h4>
                <p className="text-[11px] text-[#78865C]">
                  Gratis untuk semua kreator
                </p>
              </div>
            </div>

            <div className="paper-skeuo flex items-center justify-center gap-3 rounded-xl border border-[#D8C4A7]/60 p-4 text-left sm:justify-start">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#566B4D]/15 text-[#3E5237]">
                <ShieldCheck className="size-4" />
              </div>
              <div>
                <h4 className="text-xs leading-snug font-bold text-[#3E5237]">
                  100% Escrow Safe
                </h4>
                <p className="text-[11px] text-[#78865C]">
                  Transaksi aman & terpercaya
                </p>
              </div>
            </div>

            <div className="paper-skeuo flex items-center justify-center gap-3 rounded-xl border border-[#D8C4A7]/60 p-4 text-left sm:justify-start">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#566B4D]/15 text-[#3E5237]">
                <Users className="size-4" />
              </div>
              <div>
                <h4 className="text-xs leading-snug font-bold text-[#3E5237]">
                  50+ Kreator Mahasiswa
                </h4>
                <p className="text-[11px] text-[#78865C]">
                  Bergabung di Makassar
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 4. LAYER TENGAH: ABSOLUTE BOTTOM ACCENT STRIP (TURUN 25% / TRANSLATE-Y-1/4, TANPA SHADOW) */}
        <div className="pointer-events-none absolute right-0 bottom-0 left-0 z-10 flex w-full translate-y-1/4 justify-center">
          <Image
            src="/asset-landing/section-1-asset.webp"
            alt="Bicket Art Nouveau Decorative Bottom Accent"
            width={1200}
            height={160}
            unoptimized
            className="h-auto w-full max-w-7xl object-contain object-center opacity-95"
          />
        </div>
      </div>
    </section>
  );
}
