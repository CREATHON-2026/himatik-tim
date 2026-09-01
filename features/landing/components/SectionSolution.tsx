"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Package, Wallet, Megaphone, ArrowRight, Sparkles } from "lucide-react";
import { CardSolutionSkeuo } from "@/components/shadcn-studio/card/card-solution-skeuo";

const SOLUTION_PILLARS = [
  {
    icon: Package,
    title: "Smart Product Management",
    subtitle: "Kelola Stok & Pre-Order Tanpa Pusing",
    image: "/asset-landing/section-3-1-asset.webp",
    alt: "Mockup Manajemen Stok & Pre-Order Bicket",
    description:
      "Unggah katalog buket kustom, atur kuota slot pre-order harian, dan sesuaikan variasi pita/bunga tanpa khawatir pesanan melebihi kapasitas kerja Anda.",
    buttonText: "Manajemen Varian & Stok",
    href: "/register?role=creator",
  },
  {
    icon: Wallet,
    title: "Automated Cashflow",
    subtitle: "Pencatatan Keuangan Otomatis & Transparan",
    image: "/asset-landing/section-3-2-asset.webp",
    alt: "Mockup Dashboard Keuangan & Payout Bicket",
    description:
      "Pantau saldo masuk real-time, lihat transparansi rincian komisi platform 10%, dan ajukan penarikan dana (payout) kapan saja langsung ke rekening bank Anda.",
    buttonText: "Laporan & Payout Otomatis",
    href: "/register?role=creator",
  },
  {
    icon: Megaphone,
    title: "Local Promotion Boost",
    subtitle: "Kami Bantu Pasarkan Karya Anda di Makassar",
    image: "/asset-landing/section-3-3-asset.webp",
    alt: "Mockup Promosi & Rekomendasi Marketplace Bicket",
    description:
      "Produk Anda dipromosikan secara aktif ke pembeli lokal di Makassar melalui fitur pencarian pintar, rekomendasi katalog, dan kanal promosi Bicket.",
    buttonText: "Promosi & Rekomendasi Lokal",
    href: "/market",
  },
] as const;

export function SectionSolution() {
  return (
    <section className="bg-background relative w-full overflow-hidden border-b border-[#D8C4A7]/30 pt-8 pb-10 md:pt-10 md:pb-12">
      {/* BACKGROUND ART NOUVEAU GLOW */}
      <div className="pointer-events-none absolute top-1/3 left-1/2 h-175 w-175 -translate-x-1/2 -translate-y-1/2 bg-radial from-[#EBC3A8]/20 via-[#F5E9D5]/30 to-transparent blur-3xl" />

      {/* TOP LEFT BOTANICAL GOLD VINES CORNER OVERLAY */}
      <div className="pointer-events-none absolute -top-2 -left-2 z-0 opacity-60 select-none">
        <Image
          src="/assets/earlybird-corner-gold-vines.webp"
          alt="Top Left Gold Vines"
          width={320}
          height={320}
          unoptimized
          className="h-auto w-sm sm:w-md md:w-124 object-contain filter drop-shadow-xs"
        />
      </div>

      {/* TOP RIGHT BOTANICAL GOLD VINES CORNER OVERLAY */}
      <div className="pointer-events-none absolute -top-2 -right-2 z-0 opacity-60 select-none">
        <Image
          src="/assets/earlybird-corner-gold-vines.webp"
          alt="Top Right Gold Vines"
          width={320}
          height={320}
          unoptimized
          className="h-auto w-sm sm:w-md md:w-124 -scale-x-100 object-contain filter drop-shadow-xs"
        />
      </div>

      {/* MAIN CONTAINER */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center px-4 text-center sm:px-6 md:px-8">
        {/* 1. HEADER SECTION */}
        <div className="animate-fade-up mb-4 flex max-w-3xl flex-col items-center sm:mb-6">
          {/* EYEBROW BADGE — Gold Skeuomorphic Pill */}
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#C9A96E]/60 bg-[#F5E8D5] px-4 py-1.5 shadow-[inset_0_1px_2px_rgba(255,255,255,0.8),0_1px_3px_rgba(180,150,80,0.20)]">
            <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-[#566B4D]/10 text-[#566B4D] sm:size-5">
              <svg
                viewBox="0 0 16 16"
                fill="currentColor"
                className="size-3"
                aria-hidden="true"
              >
                <path d="M8 1.5C4.41 1.5 1.5 4.41 1.5 8S4.41 14.5 8 14.5 11.59 14.5 8 1.5zM8 4a1 1 0 110 2 1 1 0 010-2zm0 4.5a.75.75 0 01.75.75v3a.75.75 0 01-1.5 0v-3A.75.75 0 018 8.5z" />
              </svg>
            </span>
            <span className="font-sans text-[10px] font-bold tracking-[0.15em] text-[#705929] uppercase sm:text-xs">
              Solusi Digital Bicket
            </span>
          </div>

          {/* HEADLINE H2 — EXACT 2 LINES ON DESKTOP */}
          <h2 className="font-heading mb-2 max-w-2xl text-2xl leading-[1.12] font-bold tracking-tight text-[#2D3E28] sm:mb-3 sm:text-4xl lg:text-5xl">
            Bicket: Studio Digital Anda untuk Berkarya dan Berkembang
          </h2>

          {/* ORNAMENTAL ART NOUVEAU FLOURISH GOLD SEPARATOR */}
          <Separator variant="flourish-gold" className="my-2 sm:my-3" />

          {/* SUB-HEADLINE NARRATIVE */}
          <p className="max-w-[500px] font-sans text-xs leading-snug font-medium text-[#4A5A42] sm:text-sm md:text-base">
            Mendukung perjalanan kreatif Anda dengan alat digital yang tepat,
            transparan, dan mudah digunakan.
          </p>
        </div>

        {/* 2. 3 SOLUTION PILLAR CARDS GRID (BENTO GRID SPACING - GAP 3 / MB 4) */}
        <div className="animate-fade-up mb-4 grid w-full grid-cols-1 gap-3 sm:mb-6 sm:gap-4 lg:grid-cols-3">
          {SOLUTION_PILLARS.map((pillar) => (
            <CardSolutionSkeuo
              key={pillar.title}
              title={pillar.title}
              subtitle={pillar.subtitle}
              description={pillar.description}
              image={pillar.image}
              alt={pillar.alt}
              icon={pillar.icon}
            />
          ))}
        </div>

        {/* 3. BOTTOM CTA BANNER (COMPACT BENTO BANNER WITH DUAL FLORAL ACCENTS) */}
        <div className="subtle-paper-skeuo group animate-fade-up relative w-full max-w-5xl overflow-hidden rounded-[20px] border border-[#D8C4A7] p-1.5 shadow-sm transition-all duration-300 hover:border-[#B89A57] hover:shadow-md">
          {/* TOP-LEFT BOTANICAL ACCENT */}
          <Image
            src="/assets/bio-asset.webp"
            alt="Top Left Botanical Accent"
            width={250}
            height={250}
            unoptimized
            className="pointer-events-none absolute -top-1 -left-1 z-0 h-auto w-24 rotate-180 object-contain opacity-60 transition-all duration-300 group-hover:scale-105 group-hover:opacity-85 sm:w-32"
          />

          {/* BOTTOM-LEFT FLOWER ASSET (/assets/flower-main.webp) — MIRRORED (-scale-x-100) & SCALED UP */}
          <Image
            src="/assets/flower-main.webp"
            alt="Main Flower Accent"
            width={350}
            height={350}
            unoptimized
            className="pointer-events-none absolute bottom-8 left-2 z-0 h-auto w-36 -scale-x-100 object-contain opacity-75 transition-all duration-300 group-hover:scale-105 group-hover:-scale-x-100 group-hover:opacity-95 sm:-bottom-8 sm:-left-6 sm:w-48 md:w-56"
          />

          {/* DOUBLE-LINE BORDER FRAME WITH COMPACT PADDING */}
          <div className="relative z-10 h-full w-full rounded-[14px] border border-[#D8C4A7] p-0.5">
            <div className="flex h-full w-full flex-col items-center justify-between gap-4 rounded-[12px] border border-[#EBC3A8] bg-transparent p-4 text-center sm:gap-6 sm:p-6 md:flex-row md:px-8 md:py-6 md:text-left">
              {/* LEFT ICON MEDALLION & HEADLINE */}
              <div className="relative z-10 flex max-w-xl flex-col items-center gap-3.5 sm:flex-row">
                <div className="subtle-paper-skeuo relative flex size-12 shrink-0 items-center justify-center rounded-full border border-[#D8C4A7] p-0.5 sm:size-14">
                  <div className="flex h-full w-full items-center justify-center rounded-full border border-[#D8C4A7] p-[1px]">
                    <div className="flex h-full w-full items-center justify-center rounded-full border border-[#EBC3A8] bg-[#FAF6F0] shadow-[inset_0px_2px_4px_rgba(62,82,55,0.15),inset_0px_-1px_2px_rgba(255,255,255,0.85)]">
                      <Sparkles className="size-5 text-[#B89A57]" />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-heading text-base leading-snug font-bold text-[#3E5237] sm:text-xl">
                    <span className="text-[#9E4A48]">
                      Bergabunglah Sekarang
                    </span>{" "}
                    dan Ubah Hobi Merangkai Anda Menjadi{" "}
                    <span className="text-[#9E4A48]">Bisnis Berkelanjutan</span>
                  </h3>
                </div>
              </div>

              {/* RIGHT CTA BUTTON */}
              <div className="relative z-10 flex w-full shrink-0 flex-col items-center sm:w-auto">
                <Link
                  href="/register?role=creator"
                  className="w-full sm:w-auto"
                >
                  <Button
                    variant="skeuo-forest"
                    size="lg"
                    className="h-10 w-full cursor-pointer rounded-full px-5 text-xs font-bold shadow-sm transition-transform sm:h-11 sm:w-auto sm:text-sm"
                  >
                    <span className="flex items-center justify-center gap-2">
                      Daftar Sebagai Kreator Sekarang
                      <ArrowRight className="size-4" />
                    </span>
                  </Button>
                </Link>
                <span className="mt-1.5 text-[10px] font-semibold text-[#78865C] sm:text-[11px]">
                  Gratis & Mudah • 2 Menit Saja
                </span>
              </div>
            </div>
          </div>

          {/* BOTTOM-RIGHT SECONDARY FLOWER ASSET (/assets/asset-flower-2.webp) — SCALED UP */}
          <Image
            src="/assets/asset-flower-2.webp"
            alt="Secondary Flower Accent"
            width={350}
            height={350}
            unoptimized
            className="pointer-events-none absolute top-6 -right-2 z-0 h-auto w-42 object-contain opacity-75 transition-all duration-300 group-hover:scale-105 group-hover:opacity-95 sm:-right-6 sm:-bottom-8 sm:w-48 md:w-56"
          />
        </div>
      </div>
    </section>
  );
}
