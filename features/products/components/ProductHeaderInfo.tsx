"use client";

import React from "react";
import { Star, Gift, Sparkles, Flower2, Award } from "lucide-react";

interface ProductHeaderInfoProps {
  category: string;
  name: string;
  averageRating: number;
  reviewCount: number;
  tags?: string[];
  onReviewsClick: () => void;
}

export function ProductHeaderInfo({
  category,
  name,
  averageRating,
  reviewCount,
  onReviewsClick,
}: ProductHeaderInfoProps) {
  return (
    <div className="flex flex-col gap-3">
      {/* Category uppercase eyebrow */}
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-[#6355D9]">
          {category || "GIFT BOX & HAMPERS"}
        </span>
      </div>

      {/* Main H1 Title (Playfair Display) */}
      <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#111827] leading-tight tracking-tight">
        {name || "Paket Souvenir Soft Lilac"}
      </h1>

      {/* Rating and Sales Count */}
      <div className="flex items-center gap-3 pt-0.5 flex-wrap select-none text-xs sm:text-sm">
        <button
          onClick={onReviewsClick}
          className="flex cursor-pointer items-center gap-1.5 hover:underline text-[#111827]"
        >
          <Star className="size-4 fill-amber-400 text-amber-400" />
          <span className="font-bold text-[#111827]">
            {averageRating ? averageRating.toFixed(1) : "4.9"}
          </span>
          <span className="text-[#78716C]">
            ({reviewCount || 12} ulasan)
          </span>
        </button>

        <span className="text-[#E7E5E4]">|</span>

        <div className="flex items-center gap-1.5 text-[#78716C]">
          <Gift className="size-3.5 text-[#6355D9]" />
          <span>Terjual 10+</span>
        </div>
      </div>

      {/* 3 Feature Badges */}
      <div className="flex flex-wrap items-center gap-2 pt-1 select-none">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-2xs">
          <Sparkles className="size-3.5 text-emerald-600" />
          <span>Handmade</span>
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-[#FAF8FF] text-[#6355D9] border border-[#DDD6FE] shadow-2xs">
          <Flower2 className="size-3.5 text-[#8B7CF6]" />
          <span>Bunga Segar</span>
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200 shadow-2xs">
          <Award className="size-3.5 text-amber-600" />
          <span>Premium Quality</span>
        </span>
      </div>
    </div>
  );
}
