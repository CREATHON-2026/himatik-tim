"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, Gift } from "lucide-react";
import { CardEarlyBirdSkeuo } from "@/components/shadcn-studio/card/card-earlybird-skeuo";

/* ─── 3 EARLY BIRD BENEFIT PILLAR CARDS DATA (Matching Section 4 Visual Reference) ─── */
const EARLY_BIRD_PILLARS = [
  {
    title: "0% Komisi Platform",
    description:
      "Nikmati 100% pendapatan utuh tanpa potongan komisi untuk 10 transaksi pertama toko anda .",
    image: "/asset-landing/asset-0-persen.webp",
    alt: "Mockup 0% Komisi Platform Bicket",
  },
  {
    title: "Promosi Medsos Gratis",
    description:
      "Produk buket & gift Anda ditampilkan secara eksklusif di Instagram dan Tiktok resmi Bicket Makassar",
    image: "/asset-landing/asset-free.webp",
    alt: "Mockup Gratis Pendaftaran & Lencana Pioneer Bicket",
  },
  {
    title: "Prioritas Support & Setup",
    description:
      "Tim Bicket siap membantu verifikasi toko, pengaturan foto produk, dan konsultasi penetapan harga.",
    image: "/asset-landing/assets-vip.webp",
    alt: "Mockup VIP Onboarding & Pendampingan 1-on-1 Bicket",
  },
];

export function SectionEarlyBird() {
  return (
    <section className="relative w-full overflow-hidden border-b border-[#D8C4A7]/30 bg-[#FAF4EC] pt-8 pb-10 md:pt-10 md:pb-12">
      {/* BACKGROUND ART NOUVEAU GLOW */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-162.5 w-162.5 -translate-x-1/2 -translate-y-1/2 bg-radial from-[#EBC3A8]/20 via-[#F5E9D5]/30 to-transparent blur-3xl" />

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
        <div className="animate-fade-up mb-2 flex sm:max-w-xl md:max-w-3xl flex-col items-center">
          {/* EYEBROW BADGE — Gold Skeuomorphic Pill */}
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-[#C9A96E]/60 bg-[#F5E8D5] px-4 py-2 shadow-[inset_0_1px_2px_rgba(255,255,255,0.8),0_1px_3px_rgba(180,150,80,0.20)]">
            <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-[#9E4A48]/15 text-[#9E4A48] sm:size-5">
              <Gift className="size-3" />
            </span>
            <span className="font-sans text-[10px] font-bold tracking-[0.15em] text-[#705929] uppercase sm:text-xs">
              Penawaran Terbatas
            </span>
          </div>

          {/* HEADLINE H2 — EXACT 2 LINES ON DESKTOP */}
          <h2 className="font-heading mb-2 text-2xl leading-[1.12] font-bold tracking-tight text-[#2D3E28] sm:mb-3 sm:text-4xl lg:text-5xl">
            Keuntungan Eksklusif untuk 50 Kreator Pertama Makassar
          </h2>

          {/* ORNAMENTAL ART NOUVEAU FLOURISH GOLD SEPARATOR */}
          <Separator variant="flourish-gold" className="my-2 sm:my-3" />

          {/* SUB-HEADLINE NARRATIVE */}
          <p className="w-full font-sans text-xs leading-snug font-medium text-[#4A5A42] sm:text-sm md:text-base">
            Dapatkan perlakuan prioritas dan keuntungan spesial yang dirancang
            khusus untuk mempercepat pertumbuhan bisnis Anda.
          </p>
        </div>

        {/* 2. 3 EARLY BIRD BENEFIT CARDS GRID (1 Col Mobile / 3 Col Desktop - Bento Layout With Overhanging Pop-Out Spacing) */}
        <div className="animate-fade-up mx-auto mt-2 mb-2 grid w-full max-w-360 grid-cols-1 gap-2 sm:mb-2 sm:gap-10 sm:pt-4 md:gap-4 lg:grid-cols-3">
          {EARLY_BIRD_PILLARS.map((pillar) => (
            <CardEarlyBirdSkeuo
              key={pillar.title}
              title={pillar.title}
              description={pillar.description}
              image={pillar.image}
              alt={pillar.alt}
            />
          ))}
        </div>

        {/* 3. BOTTOM URGENCY COUNTER BANNER (COMPACT BENTO BANNER WITH NUMERIC COUNTER & DUAL FLORAL ACCENTS) */}
        <div className="subtle-paper-skeuo group animate-fade-up relative w-full max-w-5xl overflow-hidden rounded-[20px] border border-[#D8C4A7] p-1.5 shadow-sm transition-all duration-300 hover:border-[#B89A57] hover:shadow-md">
          {/* TOP-LEFT BOTANICAL ACCENT */}
          <Image
            src="/assets/bio-asset.webp"
            alt="Top Left Botanical Accent"
            width={250}
            height={250}
            unoptimized
            className="pointer-events-none absolute -top-1 -right-12 z-0 h-auto rotate-270  object-contain opacity-60 transition-all duration-300 group-hover:scale-105 group-hover:opacity-85 w-68 sm:w-66 sm:-right-12 sm:top-2 md:-top-2 md:-right-2  md:w-32"
          />

          {/* BOTTOM-LEFT FLOWER ASSET (MIRRORED) */}
          <Image
            src="/assets/flower-main.webp"
            alt="Main Flower Accent"
            width={350}
            height={350}
            unoptimized
            className="pointer-events-none absolute -bottom-2  -left-12  z-0 h-auto w-76  -scale-x-100 group-hover:-scale-x-100 object-contain opacity-65 transition-all duration-300 group-hover:scale-105 group-hover:opacity-95 sm:-bottom-8 sm:-left-6 sm:w-68 md:w-56"
          />

          {/* DOUBLE-LINE BORDER FRAME WITH COMPACT PADDING */}
          <div className="relative z-10 h-full w-full rounded-[14px] border border-[#D8C4A7] p-0.5">
            <div className="flex h-full w-full flex-col items-center justify-between gap-4 rounded-[12px] border border-[#EBC3A8] bg-transparent p-4 text-center sm:gap-6 sm:p-6 md:flex-row md:px-8 md:py-6 md:text-left">
              {/* LEFT: URGENCY NUMERIC BADGE & PROGRESS */}
              <div className="relative z-10 flex w-full max-w-xl flex-col items-center gap-4 sm:flex-row">
                {/* SUNKEN MEDALLION WITH BIG NUMBER 12 */}
                <div className="subtle-paper-skeuo relative flex size-14 shrink-0 items-center justify-center rounded-full border border-[#D8C4A7] p-0.5 sm:size-16">
                  <div className="flex h-full w-full items-center justify-center rounded-full border border-[#D8C4A7] p-[1px]">
                    <div className="flex h-full w-full flex-col items-center justify-center rounded-full border border-[#EBC3A8] bg-[#FAF6F0] shadow-[inset_0px_2px_4px_rgba(62,82,55,0.15),inset_0px_-1px_2px_rgba(255,255,255,0.85)]">
                      <span className="font-heading text-xl leading-none font-extrabold text-[#9E4A48] sm:text-2xl">
                        12
                      </span>
                      <span className="font-sans text-[8px] font-bold tracking-tighter text-[#705929] uppercase">
                        Slot Sisa
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex w-full flex-col gap-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-heading text-base leading-snug font-bold text-[#3E5237] sm:text-xl">
                      <span className="text-[#9E4A48]">
                        Sisa 12 Slot Terakhir
                      </span>{" "}
                      dari 50 Kuota Pioneer
                    </h3>
                  </div>

                  {/* SKEUOMORPHIC PROGRESS BAR */}
                  <Progress
                    variant="skeuo"
                    value={76}
                    className="h-3 w-full max-w-md"
                  />

                  <span className="text-left font-sans text-[11px] text-[#78865C]">
                    38 perangkai di Makassar telah mengamankan slot benefit
                    Early Bird ini.
                  </span>
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
                      Ambil Slot Early Bird Sekarang
                      <ArrowRight className="size-4" />
                    </span>
                  </Button>
                </Link>
                <span className="mt-1.5 text-[10px] font-semibold text-[#78865C] sm:text-[11px]">
                  Proses 2 Menit • Langsung Aktif
                </span>
              </div>
            </div>
          </div>

          {/* BOTTOM-RIGHT SECONDARY FLOWER ASSET */}
          <Image
            src="/assets/asset-flower-2.webp"
            alt="Secondary Flower Accent"
            width={350}
            height={350}
            unoptimized
            className="pointer-events-none absolute  -right-12 -bottom-12 z-0 h-auto w-76 object-contain opacity-75 transition-all duration-300 group-hover:scale-105 group-hover:opacity-95 sm:-right-6 sm:-bottom-8 sm:w-68 md:w-56"
          />
        </div>
      </div>
    </section>
  );
}

export default SectionEarlyBird;
