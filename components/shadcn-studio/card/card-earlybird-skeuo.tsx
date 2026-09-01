"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface CardEarlyBirdSkeuoProps {
  title: string;
  description: string;
  image: string;
  alt: string;
  className?: string;
}

export function CardEarlyBirdSkeuo({
  title,
  description,
  image,
  alt,
  className = "",
}: CardEarlyBirdSkeuoProps) {
  return (
    <div
      className={cn(
        "subtle-paper-skeuo group relative mx-auto flex w-full max-w-[440px] flex-col justify-between overflow-visible rounded-[22px] border border-[#D8C4A7]/80 bg-[#F5E9D5]/75 p-2 text-left shadow-[-8px_10px_20px_0px_#E9D7BE] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#B89A57] hover:shadow-[-10px_14px_24px_0px_rgba(233,215,190,0.85)]",
        className
      )}
    >
      {/* 4 CORNER SVG ACCENTS (PRESISI ROTASI & SHAPES - ENLARGED 80PX) */}
      <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden rounded-[22px]">
        {/* TOP-RIGHT CORNER */}
        <div className="absolute -top-3 -right-3 h-32 w-32 opacity-85 transition-opacity duration-300 group-hover:opacity-100">
          <Image
            src="/assets/asset-rounded.svg"
            alt="Corner Accent Top Right"
            width={128}
            height={128}
            className="h-full w-full object-contain"
          />
        </div>
        {/* TOP-LEFT CORNER */}
        <div className="absolute -top-3 -left-3 h-32 w-32 -scale-x-100 transition-opacity duration-300 group-hover:opacity-100">
          <Image
            src="/assets/asset-rounded.svg"
            alt="Corner Accent Top Left"
            width={80}
            height={80}
            className="h-full w-full object-contain"
          />
        </div>
        {/* BOTTOM-LEFT CORNER */}
        <div className="absolute -bottom-3 -left-3 h-32 w-32 rotate-180 opacity-85 transition-opacity duration-300 group-hover:opacity-100">
          <Image
            src="/assets/asset-rounded.svg"
            alt="Corner Accent Bottom Left"
            width={80}
            height={80}
            className="h-full w-full object-contain"
          />
        </div>
        {/* BOTTOM-RIGHT CORNER */}
        <div className="absolute -right-3 -bottom-3 h-32 w-32 -scale-y-100 opacity-85 transition-opacity duration-300 group-hover:opacity-100">
          <Image
            src="/assets/asset-rounded.svg"
            alt="Corner Accent Bottom Right"
            width={80}
            height={80}
            className="h-full w-full object-contain"
          />
        </div>
      </div>

      {/* BACKGROUND BOTANICAL GLOW */}
      <Image
        src="/assets/bio-asset.webp"
        alt="Top Left Botanical Accent"
        width={350}
        height={350}
        unoptimized
        className="pointer-events-none absolute -top-1 -left-1 z-0 h-auto w-20 rotate-180 object-contain opacity-35 transition-all duration-300 group-hover:scale-105 group-hover:opacity-65 sm:w-28"
      />

      {/* DOUBLE INNER BORDER FRAME */}
      <div className="relative z-10 flex h-full w-full flex-col justify-between overflow-visible rounded-[16px] border border-[#D8C4A7] p-0.5">
        <div className="relative flex h-full w-full flex-col items-center overflow-visible rounded-[14px] border border-[#EBC3A8] bg-transparent p-4 pt-36 sm:pt-40 md:pt-44 text-center">
          {/* 1. ABSOLUTE OVERHANGING TOP IMAGE CONTAINER (RESPONSIVE POP-OUT FRAME) */}
          <div className="pointer-events-none absolute -top-9 left-1/2 z-30 aspect-16/10 w-[80%] sm:w-[85%] md:w-[92%] lg:w-[100%] -translate-x-1/2 overflow-visible transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-105">
            <Image
              src={image}
              alt={alt}
              fill
              sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 33vw"
              className="object-contain drop-shadow-[0_16px_20px_rgba(0,0,0,0.22)] filter"
            />
          </div>

          {/* 2. CENTERED HEADER TITLE (Standardized .text-h4 & font-bold) */}
          <h3 className="font-heading text-h4 mb-1 text-center leading-snug font-bold tracking-tight text-[#3E5237]">
            {title}
          </h3>

          {/* 3. CENTERED ART NOUVEAU SEPARATOR LINE */}
          <span className="mx-auto my-2 h-px w-16 bg-[#B89A57]/60" />

          {/* 4. CENTERED BODY DESCRIPTION (Standardized .text-body WCAG Compliant) */}
          <p className="text-body max-w-[280px] text-center font-sans text-sm leading-relaxed font-medium text-[#566B4D]">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CardEarlyBirdSkeuo;
