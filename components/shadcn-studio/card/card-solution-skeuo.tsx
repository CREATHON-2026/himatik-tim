"use client";

import React from "react";
import Image from "next/image";
import { type LucideIcon } from "lucide-react";

export interface CardSolutionSkeuoProps {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  alt: string;
  icon: LucideIcon;
  /** Custom shadow color class or style, defaults to soft bottom-left #E9D7BE shadow */
  shadowClass?: string;
  className?: string;
}

export function CardSolutionSkeuo({
  title,
  subtitle,
  description,
  image,
  alt,
  icon: IconComponent,
  shadowClass = "shadow-[-8px_10px_20px_0px_#E9D7BE] hover:shadow-[-10px_14px_24px_0px_rgba(233,215,190,0.85)]",
  className = "",
}: CardSolutionSkeuoProps) {
  return (
    <div
      className={`subtle-paper-skeuo group relative flex flex-col justify-between overflow-hidden rounded-[22px] border border-[#D8C4A7] bg-[#F5E9D5]/70 p-2 text-left transition-all duration-300 hover:-translate-y-1.5 hover:border-[#B89A57] ${shadowClass} ${className}`}
    >
      {/* TOP-LEFT BOTANICAL ACCENT */}
      <Image
        src="/assets/bio-asset.webp"
        alt="Top Left Botanical Accent"
        width={350}
        height={350}
        unoptimized
        className="pointer-events-none absolute -top-1 -left-1 z-0 h-auto w-20 rotate-180 object-contain opacity-40 transition-all duration-300 group-hover:scale-105 group-hover:opacity-75 sm:w-28"
      />

      {/* BOTTOM-RIGHT FLORAL ACCENT */}
      <Image
        src="/assets/asset-card-flower.webp"
        alt="Card Flower Accent"
        width={420}
        height={420}
        unoptimized
        className="pointer-events-none absolute right-1 -bottom-6 z-0 h-auto w-48 object-contain opacity-50 transition-all duration-300 group-hover:scale-105 group-hover:opacity-85 sm:w-40"
      />

      {/* secondary flower */}
      <Image
        src="/assets/asset-card-flower-2.webp"
        alt="Secondary Card Flower Accent"
        width={420}
        height={420}
        unoptimized
        className="pointer-events-none absolute -right-1 bottom-4 z-0 h-auto w-48 object-contain opacity-60 transition-all duration-300 group-hover:scale-105 group-hover:opacity-85 sm:-right-2 sm:bottom-6 sm:w-36"
      />

      {/* DOUBLE-LINE BORDER INNER FRAME */}
      <div className="relative z-10 flex h-full w-full flex-col justify-between rounded-[18px] border border-[#D8C4A7] p-0.5">
        <div className="flex h-full w-full flex-col justify-between rounded-[16px] border border-[#EBC3A8] bg-transparent p-4">
          {/* CARD CONTENT TOP */}
          <div>
            {/* ICON MEDALLION & TITLE HEADER (HEADER GAP: GAP-4) */}
            <div className="mb-3 flex items-start gap-4">
              {/* CIRCULAR SUNKEN MEDALLION */}
              <div className="subtle-paper-skeuo relative flex size-12 shrink-0 items-center justify-center rounded-full border border-[#D8C4A7] p-0.5 transition-transform group-hover:scale-105">
                <div className="flex h-full w-full items-center justify-center rounded-full border border-[#D8C4A7] p-[1px]">
                  <div className="flex h-full w-full items-center justify-center rounded-full border border-[#EBC3A8] bg-[#FAF6F0] shadow-[inset_0px_2px_4px_rgba(62,82,55,0.15),inset_0px_-1px_2px_rgba(255,255,255,0.85)]">
                    <IconComponent className="size-5 text-[#566B4D]" />
                  </div>
                </div>
              </div>

              {/* TYPOGRAPHY HIERARCHY ACCORDING TO TypographyShowcase RULES */}
              <div className="flex flex-col">
                <h3 className="font-heading text-base leading-snug font-bold text-[#3E5237] sm:text-lg">
                  {title}
                </h3>
                <span className="mt-0.5 text-[11px] font-semibold tracking-wide text-[#9E4A48]">
                  {subtitle}
                </span>
              </div>
            </div>

            {/* UI MOCKUP IMAGE CONTAINER WITH FIXED ASPECT RATIO (16:10), THINNER BORDER & SOFT SHADOW */}
            <div className="relative my-2 aspect-[16/10] w-full overflow-hidden rounded-xl border border-[#D8C4A7]/40 bg-[#FAF6F0] p-0.5 shadow-[0_4px_12px_rgba(184,154,87,0.12),0_1px_3px_rgba(0,0,0,0.05)] transition-transform duration-300 group-hover:scale-[1.01]">
              <Image
                src={image}
                alt={alt}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                unoptimized
                className="rounded-lg object-cover object-top"
              />
            </div>

            {/* DESCRIPTION: text-muted / text-small scale from Design System, center aligned */}
            <p className="mt-2 mb-1 text-center font-sans text-xs leading-relaxed font-normal text-[#78865C]">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardSolutionSkeuo;
