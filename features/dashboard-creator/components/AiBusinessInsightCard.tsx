"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, Lightbulb, ArrowRight } from "lucide-react";

interface AiBusinessInsightCardProps {
  periodLabel?: string;
  headline?: string;
  narrative?: string;
  suggestion?: string;
  insightUrl?: string;
}

export function AiBusinessInsightCard({
  periodLabel = "4–31 Agu 2026",
  headline = "Performa toko Anda menunjukkan tren positif.",
  narrative = "Dalam 28 hari terakhir, toko mencatat 11 transaksi dengan total omzet Rp2.823.000. Produk Gift Box Anniversary Deluxe menjadi kontributor pendapatan terbesar.",
  suggestion = "Pertimbangkan menampilkan Gift Box Anniversary Deluxe lebih prominent di etalase karena memberikan kontribusi pendapatan terbesar.",
  insightUrl = "#",
}: AiBusinessInsightCardProps) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-[#FAF8FF] via-[#F8F7FF] to-[#FAF8FF] border border-[#DDD6FE]/80 rounded-2xl p-6 shadow-2xs">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
        {/* LEFT & MIDDLE CONTENT */}
        <div className="flex-1 space-y-3.5 max-w-3xl">
          {/* Header Tag + Period Pill */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#6355D9]">
              <Sparkles className="size-4 text-[#8B7CF6]" />
              <span>AI Business Insight</span>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-[#EDE9FE] text-[#6355D9] border border-[#DDD6FE]">
              {periodLabel}
            </span>
          </div>

          {/* Editorial Headline & Narrative */}
          <div className="space-y-1">
            <h4 className="font-semibold text-sm text-[#111827]">
              {headline}
            </h4>
            <p className="text-xs text-[#57534E] leading-relaxed">
              {narrative}
            </p>
          </div>

          {/* Actionable Suggestion Box with Lightbulb */}
          <div className="bg-[#F3F0FF] border border-[#DDD6FE] rounded-xl p-3 flex items-start gap-2.5">
            <div className="size-6 rounded-full bg-white flex items-center justify-center shrink-0 shadow-2xs mt-0.5">
              <Lightbulb className="size-3.5 text-[#6355D9]" />
            </div>
            <p className="text-xs text-[#4C1D95] font-normal leading-relaxed">
              {suggestion}
            </p>
          </div>
        </div>

        {/* RIGHT ACTION CTA & 3D ICON DECORATION */}
        <div className="flex items-center gap-4 self-stretch lg:self-center justify-between lg:justify-end shrink-0">
          <Link
            href={insightUrl}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-[#DDD6FE] hover:border-[#6355D9] text-xs font-medium text-[#6355D9] hover:bg-[#F5F3FF] transition-all duration-150 shadow-2xs cursor-pointer group"
          >
            <span>Lihat Insight</span>
            <ArrowRight className="size-3.5 text-[#8B7CF6] group-hover:translate-x-0.5 transition-transform" />
          </Link>

          {/* 3D Decorative Chart Badge Icon */}
          <div className="relative size-16 shrink-0 flex items-center justify-center select-none pointer-events-none">
            {/* Coral Star Accent */}
            <span className="absolute -top-1 right-1 text-[#E76F61] text-xs animate-pulse">
              ✦
            </span>
            {/* 3D Glassmorphic Metric Tablet Graphic */}
            <div className="size-13 rounded-xl bg-gradient-to-br from-[#C4B5FD] to-[#8B7CF6] p-0.5 shadow-md shadow-violet-500/20 transform rotate-6 hover:rotate-0 transition-transform">
              <div className="size-full rounded-[10px] bg-white/90 backdrop-blur-xs flex flex-col items-center justify-center p-1.5 space-y-1">
                <div className="w-full h-1.5 bg-[#6355D9] rounded-full" />
                <svg
                  className="w-full h-5 text-[#6355D9]"
                  viewBox="0 0 40 20"
                  fill="none"
                >
                  <path
                    d="M2 16L12 10L22 14L38 4"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
