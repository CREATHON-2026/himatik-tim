"use client";

import React from "react";
import { LucideIcon } from "lucide-react";

export interface CardBenefitSkeuoProps {
  title: string;
  badgeTag: string;
  description: string;
  icon: LucideIcon;
  highlightText?: string;
  className?: string;
}

export function CardBenefitSkeuo({
  title,
  badgeTag,
  description,
  icon: Icon,
  highlightText,
  className = "",
}: CardBenefitSkeuoProps) {
  return (
    <div
      className={`subtle-paper-skeuo relative w-full rounded-[20px] p-1.5 border border-[#D8C4A7] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#B89A57] hover:shadow-md group overflow-hidden ${className}`}
    >
      {/* DOUBLE-LINE BORDER FRAME */}
      <div className="w-full h-full rounded-[14px] border border-[#D8C4A7] p-0.5">
        <div className="w-full h-full rounded-[12px] border border-[#EBC3A8] p-4 sm:p-5 flex flex-col justify-between gap-3 bg-transparent text-left relative z-10">

          {/* TOP ROW: SUNKEN MEDALLION ICON & BADGE TAG */}
          <div className="flex items-center justify-between gap-3 w-full">
            {/* CIRCULAR SUNKEN MEDALLION */}
            <div className="subtle-paper-skeuo relative flex size-12 sm:size-14 shrink-0 items-center justify-center rounded-full p-0.5 border border-[#D8C4A7] transition-transform group-hover:scale-105">
              <div className="w-full h-full rounded-full border border-[#D8C4A7] p-[1px] flex items-center justify-center">
                <div className="w-full h-full rounded-full border border-[#EBC3A8] bg-[#F5E8D5]/60 shadow-[inset_0px_2px_4px_rgba(62,82,55,0.18),inset_0px_-1px_2px_rgba(255,255,255,0.85)] flex items-center justify-center relative p-1.5">
                  <Icon className="size-5 sm:size-6 text-[#9E4A48]" />
                </div>
              </div>
            </div>

            {/* BADGE TAG */}
            <span className="inline-flex items-center rounded-full border border-[#C9A96E]/50 bg-[#F5E8D5] px-3 py-1 text-[10px] sm:text-xs font-bold tracking-wide uppercase text-[#705929] shadow-xs">
              {badgeTag}
            </span>
          </div>

          {/* MIDDLE: TITLE & HIGHLIGHT */}
          <div className="flex flex-col gap-1">
            <h3 className="font-heading text-lg sm:text-xl font-bold text-[#3E5237] leading-snug">
              {title}
            </h3>
            {highlightText && (
              <span className="font-sans text-xs font-bold text-[#9E4A48]">
                {highlightText}
              </span>
            )}
          </div>

          {/* DIVIDER */}
          <span className="h-px w-10 bg-[#B89A57]/50 my-0.5" />

          {/* BOTTOM: DESCRIPTION */}
          <p className="font-sans text-xs sm:text-sm text-[#566B4D] leading-relaxed">
            {description}
          </p>

        </div>
      </div>
    </div>
  );
}

export default CardBenefitSkeuo;
