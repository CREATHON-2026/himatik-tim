"use client";

import React from "react";
import Image from "next/image";
import { Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CardArtSkeuo } from "@/components/shadcn-studio/card/card-art-skeuo";

const AGITATION_CARDS = [
  {
    icon: "whatsapp" as const,
    badgeText: "99+",
    title: "Chat WA Berantakan",
    description:
      "Lelah membalas chat satu per satu hanya untuk menjawab pertanyaan harga yang berulang?",
  },
  {
    icon: "file" as const,
    title: "Pesanan Tercecer",
    description:
      "Catatan di buku sering hilang dan pusing mengingat tanggal kirim buket pesanan kustom?",
  },
  {
    icon: "megaphone" as const,
    title: "Bingung Pemasaran",
    description:
      "Hasil buket karya Anda sudah sangat indah, tapi bingung bagaimana menjangkau pembeli di Makassar?",
  },
] as const;

export function SectionAgitation() {
  return (
    <section className="relative w-full bg-background pt-4 pb-16 md:pb-20 lg:pb-24 border-b border-[#D8C4A7]/30">
      
      {/* BACKGROUND DECORATIVE GLOW */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-radial from-[#F5E9D5]/40 to-transparent blur-3xl pointer-events-none" />

      {/* MAIN CONTAINER */}
      <div className="mx-auto max-w-7xl px-6 md:px-8 w-full relative z-10 flex flex-col items-center text-center">
        
        {/* 1. HEADER SECTION */}
        <div className="max-w-3xl flex flex-col items-center mb-6 sm:mb-8 animate-fade-up">
          
          {/* EYEBROW BADGE */}
          <Badge
            variant="skeuo-peach"
            className="h-7 px-4.5 py-1 text-xs font-bold tracking-wider text-[#9E4A48] uppercase rounded-full shadow-xs mb-4"
          >
            💔 KELUH KESAH KREATOR LOKAL
          </Badge>

          {/* HEADLINE H2 */}
          <h2 className="font-heading text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#3E5237] leading-[1.15] mb-2 sm:mb-4">
            Lelah Berjuang Sendiri Mengelola Pesanan dan Promosi?
          </h2>

          {/* ORNAMENTAL FLOURISH ACCENT */}
          <div className="flex items-center justify-center gap-2 mb-3 text-[#B89A57]">
            <span className="h-px w-8 bg-[#D8C4A7]" />
            <span className="text-xs font-serif">❖</span>
            <span className="h-px w-8 bg-[#D8C4A7]" />
          </div>

          {/* SUB-HEADLINE NARRATIVE */}
          <p className="font-sans text-sm sm:text-base text-[#78865C] max-w-2xl leading-relaxed">
            Sebagai kreator, waktu dan kreativitas Anda sangat berharga. Namun sering kali energi habis hanya untuk urusan administratif manual yang menyita waktu.
          </p>

        </div>

        {/* 2. 3 AGITATION CARDS GRID — z-20, menimpa TOP before/after */}
        <div className="relative z-20 grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-5 w-full -mb-16 animate-fade-up">
          {AGITATION_CARDS.map((card) => (
            <CardArtSkeuo
              key={card.title}
              icon={card.icon}
              badgeText={"badgeText" in card ? card.badgeText : undefined}
              title={card.title}
              description={card.description}
            />
          ))}
        </div>

        {/* 3. BEFORE vs AFTER VISUAL — z-10 (di belakang cards & banner), centered 50/50 */}
        <div className="relative z-10 w-full animate-fade-up">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-5 items-center">
            
            {/* LEFT IMAGE: BEFORE */}
            <div className="relative w-full overflow-hidden rounded-2xl group transition-all duration-300">
              <div className="absolute top-3 left-3 z-10 rounded-full bg-black/60 backdrop-blur-md px-3.5 py-1 text-[11px] font-bold text-white tracking-wider uppercase">
                BEFORE • Manual & Stres
              </div>
              <Image
                src="/asset-landing/section-2-side.webp"
                alt="Kreator Hadiah Kewalahan Mengurus Chat WA dan Catatan Manual"
                width={800}
                height={600}
                unoptimized
                className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-102 rounded-2xl"
              />
            </div>

            {/* RIGHT IMAGE: AFTER */}
            <div className="relative w-full overflow-hidden rounded-2xl group transition-all duration-300">
              <div className="absolute top-3 left-3 z-10 rounded-full bg-[#566B4D] px-3.5 py-1 text-[11px] font-bold text-white tracking-wider uppercase">
                AFTER • Otomatis & Tenang Bersama Bicket
              </div>
              <Image
                src="/asset-landing/section-2-assets.webp"
                alt="Kreator Hadiah Merangkai Bunga Didampingi Tablet Bicket Dashboard"
                width={900}
                height={675}
                unoptimized
                className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-102 rounded-2xl"
              />
            </div>

          </div>
        </div>

        {/* 4. BRIDGE BANNER — z-20 (di depan), -mt-20 menimpa BOTTOM before/after */}
        <div className="relative z-20 w-full max-w-4xl paper-skeuo rounded-2xl border border-[#D8C4A7] bg-[#F5E9D5]/90 p-4 sm:p-5 shadow-sm flex items-center justify-between gap-4 animate-fade-up -mt-20">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#566B4D]/15 text-[#3E5237]">
            <Sparkles className="size-5 text-[#B89A57]" />
          </div>
          
          <p className="font-heading text-sm sm:text-base font-bold text-[#3E5237] leading-relaxed text-center sm:text-left flex-1">
            ✨ Bicket Hadir untuk Mengubah Semua Itu — Anda Fokus Berkarya, Biarkan Sistem Kami Mengelola Toko & Promosi Anda.
          </p>
          
          <span className="hidden sm:inline-block text-xl">🌸</span>
        </div>

      </div>
    </section>
  );
}
