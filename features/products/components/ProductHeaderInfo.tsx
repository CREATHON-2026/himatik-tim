"use client";

import React from "react";
import { Star } from "lucide-react";
import { ProductTagsBar } from "./ProductTagsBar";

interface ProductHeaderInfoProps {
  category: string;
  name: string;
  averageRating: number;
  reviewCount: number;
  tags: string[];
  onReviewsClick: () => void;
}

export function ProductHeaderInfo({
  category,
  name,
  averageRating,
  reviewCount,
  tags,
  onReviewsClick,
}: ProductHeaderInfoProps) {
  return (
    <div className="gsap-fade-in flex flex-col gap-2.5">
      {/* Category uppercase chip */}
      <div className="flex items-center justify-between">
        <span className="font-sans text-xs font-bold tracking-wider text-[#78865C] uppercase">
          {category}
        </span>
      </div>

      {/* Main H1 Title */}
      <h1 className="font-heading text-3xl sm:text-4xl leading-tight font-bold text-[#3E5237]">
        {name}
      </h1>

      {/* Rating and Sales Count */}
      <div className="flex items-center gap-3 pt-0.5 flex-wrap select-none">
        <button
          onClick={onReviewsClick}
          className="flex cursor-pointer items-center gap-1 text-sm hover:underline"
        >
          <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
          <span className="font-bold text-[#3E5237]">
            {averageRating.toFixed(1)}
          </span>
          <span className="text-[#78865C] text-xs">
            ({reviewCount} ulasan)
          </span>
        </button>
        <div className="h-1.5 w-1.5 rounded-full bg-[#78865C]/40" />
        <span className="text-xs text-[#78865C] font-semibold">
          Terjual 10+
        </span>
      </div>

      {/* Product Tags Chips */}
      <div className="pt-0.5">
        <ProductTagsBar tags={tags} />
      </div>
    </div>
  );
}
