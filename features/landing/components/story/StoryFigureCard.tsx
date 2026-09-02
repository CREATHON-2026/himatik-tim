"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  Sparkles,
  Gift,
  Package,
  Heart,
  MapPin,
  Camera,
  ShieldCheck,
} from "lucide-react";
import { StoryChapter } from "./types";

interface StoryFigureCardProps {
  chapter: StoryChapter;
}

export const StoryFigureCard: React.FC<StoryFigureCardProps> = ({ chapter }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Soft GSAP Expanding Spring Scale & Elevation on chapter change
  useGSAP(
    () => {
      if (!cardRef.current) return;

      gsap.fromTo(
        cardRef.current,
        {
          opacity: 0,
          scale: 0.94,
          y: 18,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
        }
      );
    },
    { dependencies: [chapter.id], scope: cardRef }
  );

  const renderFigureVisual = () => {
    switch (chapter.id) {
      case "story-niat":
        return (
          <div className="relative flex h-full w-full flex-col items-center justify-between p-6 bg-[#FAF9F5] border border-[#E7E5E4] rounded-2xl overflow-hidden shadow-inner">
            <div className="flex w-full items-center justify-between text-[9px] font-mono text-[#78716C] uppercase">
              <span>Draft Pesan</span>
              <span>Langkah 01</span>
            </div>

            <div className="my-auto flex flex-col items-center justify-center text-center">
              <div className="size-14 rounded-2xl bg-[#E76F61]/15 text-[#E76F61] flex items-center justify-center mb-3 shadow-xs">
                <Heart className="size-7" />
              </div>
              <div className="w-48 flex flex-col gap-2">
                <div className="h-2 w-3/4 bg-[#111827]/20 rounded-full mx-auto" />
                <div className="h-1.5 w-full bg-[#111827]/10 rounded-full" />
                <div className="h-1.5 w-5/6 bg-[#111827]/15 rounded-full mx-auto" />
                <div className="h-2 w-1/2 bg-[#E76F61]/50 rounded-full mx-auto mt-2" />
              </div>
            </div>

            <div className="w-full text-center border-t border-[#E7E5E4] pt-2">
              <span className="text-[9px] font-mono font-bold tracking-wider text-[#111827]">
                KARTU UCAPAN PERSONAL
              </span>
            </div>
          </div>
        );

      case "story-dialog":
        return (
          <div className="relative flex h-full w-full flex-col items-center justify-between p-6 bg-[#FAF9F5] border border-[#E7E5E4] rounded-2xl overflow-hidden shadow-inner">
            <div className="flex w-full items-center justify-between text-[9px] font-mono text-[#78716C] uppercase">
              <span>Konsultasi Sanggar</span>
              <span>Langkah 02</span>
            </div>

            <div className="my-auto flex flex-col items-center justify-center text-center">
              <div className="size-14 rounded-2xl bg-[#6355D9]/15 text-[#6355D9] flex items-center justify-center mb-3 shadow-xs">
                <Sparkles className="size-7" />
              </div>
              <div className="flex items-center gap-2.5">
                <div className="h-14 w-8 rounded-full border border-[#E7E5E4] bg-white shadow-xs flex flex-col items-center justify-center text-[9px] font-mono text-[#78716C]">
                  <span>Pita</span>
                </div>
                <div className="h-16 w-10 rounded-full border-2 border-[#6355D9] bg-[#6355D9]/20 shadow-sm flex flex-col items-center justify-center text-[10px] font-mono font-bold text-[#6355D9]">
                  <span>Satin</span>
                  <Sparkles className="h-2.5 w-2.5 text-[#6355D9] mt-0.5" />
                </div>
                <div className="h-14 w-8 rounded-full border border-[#E7E5E4] bg-white shadow-xs flex flex-col items-center justify-center text-[9px] font-mono text-[#78716C]">
                  <span>Kraft</span>
                </div>
              </div>
            </div>

            <div className="w-full text-center border-t border-[#E7E5E4] pt-2">
              <span className="text-[9px] font-mono font-bold tracking-wider text-[#111827]">
                PALET WARNA & PITA ARTISAN
              </span>
            </div>
          </div>
        );

      case "story-kriya":
        return (
          <div className="relative flex h-full w-full flex-col items-center justify-between p-6 bg-[#FAF9F5] border border-[#E7E5E4] rounded-2xl overflow-hidden shadow-inner">
            <div className="flex w-full items-center justify-between text-[9px] font-mono text-[#78716C] uppercase">
              <span>Meja Kerja Sanggar</span>
              <span>Langkah 03</span>
            </div>

            <div className="my-auto flex flex-col items-center justify-center text-center">
              <div className="size-14 rounded-2xl bg-[#D97706]/15 text-[#D97706] flex items-center justify-center mb-3 shadow-xs">
                <Gift className="size-7" />
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <span className="text-xs font-serif font-bold text-[#111827]">
                  100% Handcrafted Detail
                </span>
                <span className="text-[10px] text-[#78716C]">
                  Pahat Kayu Solid & Rangkaian Bunga
                </span>
              </div>
            </div>

            <div className="w-full text-center border-t border-[#E7E5E4] pt-2">
              <span className="text-[9px] font-mono font-bold tracking-wider text-[#111827]">
                AUTENTIK DARI SANGGAR LOKAL
              </span>
            </div>
          </div>
        );

      case "story-antar":
        return (
          <div className="relative flex h-full w-full flex-col items-center justify-between p-6 bg-[#FAF9F5] border border-[#E7E5E4] rounded-2xl overflow-hidden shadow-inner">
            <div className="flex w-full items-center justify-between text-[9px] font-mono text-[#78716C] uppercase">
              <span>Proteksi Berlapis</span>
              <span>Langkah 04</span>
            </div>

            <div className="my-auto flex flex-col items-center justify-center text-center">
              <div className="size-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-3 shadow-xs">
                <ShieldCheck className="size-7" />
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="text-xs font-mono font-bold text-emerald-700">
                  ESCROW GUARANTEE
                </span>
                <span className="text-[10px] text-[#78716C]">
                  Double Hardbox & Water Tube
                </span>
              </div>
            </div>

            <div className="w-full text-center border-t border-[#E7E5E4] pt-2">
              <span className="text-[9px] font-mono font-bold tracking-wider text-[#111827]">
                PENGIRIMAN SAMEDAY TERJAMIN
              </span>
            </div>
          </div>
        );

      case "story-kesan":
      default:
        return (
          <div className="relative flex h-full w-full flex-col items-center justify-between p-6 bg-[#FAF9F5] border border-[#E7E5E4] rounded-2xl overflow-hidden shadow-inner">
            <div className="flex w-full items-center justify-between text-[9px] font-mono text-[#78716C] uppercase">
              <span>Momen Bahagia</span>
              <span>Langkah 05</span>
            </div>

            <div className="my-auto flex flex-col items-center justify-center text-center">
              <div className="size-14 rounded-2xl bg-[#6355D9]/15 text-[#6355D9] flex items-center justify-center mb-3 shadow-xs">
                <Package className="size-7" />
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="text-xs font-serif font-bold text-[#111827]">
                  Kenangan Abadi Tersampaikan
                </span>
                <span className="text-[10px] text-[#78716C]">
                  Apresiasi & Kasih yang Tulus
                </span>
              </div>
            </div>

            <div className="w-full text-center border-t border-[#E7E5E4] pt-2">
              <span className="text-[9px] font-mono font-bold tracking-wider text-[#111827]">
                TUNTAS DENGAN SEMPURNA
              </span>
            </div>
          </div>
        );
    }
  };

  return (
    <div
      ref={cardRef}
      className="relative flex flex-col w-[clamp(240px,26vw,320px)] h-[clamp(330px,46vh,410px)] bg-white rounded-3xl p-4 shadow-xl border border-[#E7E5E4] will-change-[transform,opacity]"
    >
      {/* Top Polaroid Title Bar */}
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#F5F5F4] text-[9px] font-mono text-[#78716C] uppercase">
        <div className="flex items-center gap-1.5 font-bold text-[#111827]">
          <Camera className="h-3 w-3 text-[#6355D9]" />
          <span>{chapter.figureNumber}</span>
        </div>
        <span className="px-2 py-0.5 rounded-full bg-[#FAFAF9] border border-[#E7E5E4] text-[8.5px]">
          {chapter.figureTag}
        </span>
      </div>

      {/* Center Dynamic Visual Container */}
      <div className="relative flex-1 w-full overflow-hidden rounded-xl">
        {renderFigureVisual()}
      </div>

      {/* Bottom Archival Metadata Description */}
      <div className="pt-3 mt-1 flex flex-col gap-1 border-t border-[#F5F5F4]">
        <p className="text-xs font-medium text-[#111827] line-clamp-1">
          {chapter.figureCaption}
        </p>
        <div className="flex items-center justify-between text-[9px] font-mono text-[#78716C]">
          <div className="flex items-center gap-1">
            <MapPin className="h-2.5 w-2.5 text-[#6355D9]" />
            <span className="truncate max-w-[140px]">{chapter.figureLocation}</span>
          </div>
          <span>{chapter.figureDate}</span>
        </div>
      </div>
    </div>
  );
};
