"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

export interface CardShowcaseSkeuoProps {
  id?: string;
  title: string;
  categoryBadge: string;
  artisan: string;
  price: string;
  rating: number;
  reviewsCount: number;
  image: string;
  buttonText?: string;
  actionUrl?: string;
  onClickAction?: () => void;
}

export function CardShowcaseSkeuo({
  title = "Vintage Sage Bouquet",
  categoryBadge = "Buket Bunga",
  artisan = "Warm Bloom Artisan",
  price = "Rp 185.000",
  rating = 4.9,
  reviewsCount = 24,
  image = "/asset-landing/showcase-vintage-sage.webp",
  actionUrl = "/market",
  onClickAction,
}: CardShowcaseSkeuoProps) {
  return (
    <Link
      href={actionUrl}
      onClick={onClickAction}
      className="block w-full text-left"
    >
      <div className="subtle-paper-skeuo group relative flex flex-row overflow-hidden rounded-[20px] border-2 border-[#E9D7BE] bg-[#FAF4EC] p-1 shadow-[4px_4px_0px_0px_#D79C9A] transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:border-[#D79C9A] hover:shadow-[6px_6px_0px_0px_#C86B67] active:translate-x-1 active:translate-y-1 active:shadow-none w-full">
        {/* ── LEFT SIDE: Image Frame (3/5 = 60% width) ── */}
        <div className="relative aspect-4/3 w-3/5 shrink-0 overflow-hidden rounded-[16px] bg-[#F5E9D5]">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, 35vw"
          />
          {/* Soft Bevel Inset Shadow for Tactile Depth */}
          <div className="pointer-events-none absolute inset-0 rounded-[16px] shadow-[inset_0_2px_4px_rgba(0,0,0,0.15)] border border-white/25" />
        </div>

        {/* ── RIGHT SIDE: Content & Metadata (2/5 = 40% width) ── */}
        <div className="flex w-2/5 flex-col justify-center pl-2.5 pr-1.5 py-1 text-left">
          {/* Category Badge */}
          <div className="mb-1 flex items-center justify-start">
            <span className="inline-block rounded-full bg-[#C86B67] px-2 py-0.5 font-sans text-[9px] sm:text-[10px] font-bold text-white shadow-xs tracking-wide">
              {categoryBadge}
            </span>
          </div>

          {/* Product Title - Prominent Serif Garamond (Noticeably larger than subtitle) */}
          <h3 className="font-heading text-base sm:text-lg font-bold text-[#3E5237] leading-[1.15] line-clamp-2 group-hover:text-[#566B4D] transition-colors">
            {title}
          </h3>

          {/* Artisan Creator Info - Distinctly Smaller Subtitle */}
          <p className="mt-0.5 font-sans text-[10px] sm:text-[11px] font-medium text-[#4A5A42] flex items-center gap-1">
            <span className="truncate">By: {artisan}</span>
            <span className="text-[#B89A57] text-[9px] shrink-0">❀</span>
          </p>

          {/* Faint Horizontal Divider Line */}
          <div className="my-1 border-b border-[#E9D7BE]/70 w-full" />

          {/* Price & Rating (Stacked Vertically) */}
          <div className="flex flex-col gap-0.5">
            <span className="font-sans text-xs sm:text-sm font-extrabold text-[#3E5237]">
              {price}
            </span>
            <div className="flex items-center gap-1 text-[10px] sm:text-[11px] font-semibold text-[#4A5A42]">
              <Star className="size-3 fill-[#B89A57] text-[#B89A57] shrink-0" />
              <span>{rating}</span>
              <span className="text-[#78865C] text-[9px]">({reviewsCount})</span>
            </div>
          </div>
        </div>

        {/* ── ABSOLUTE ASSET: Artisan Wax Seal Badge (Bottom Right) ── */}
        <div className="pointer-events-none absolute bottom-1.5 right-1.5 z-10 flex size-6 items-center justify-center rounded-full bg-[#F5E9D5] border border-[#B89A57]/60 shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.9),0_1.5px_3px_rgba(184,154,87,0.35)] transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110 group-hover:border-[#B89A57]">
          <span className="text-[#B89A57] text-[10px] leading-none select-none">❀</span>
        </div>
      </div>
    </Link>
  );
}

export default CardShowcaseSkeuo;

