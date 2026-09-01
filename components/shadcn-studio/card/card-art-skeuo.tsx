"use client";

import React from "react";
import Image from "next/image";

export interface CardArtSkeuoProps {
  title: string;
  description: string;
  badgeText?: string;
  icon?: "whatsapp" | "file" | "megaphone";
  className?: string;
}

export function CardArtSkeuo({
  title,
  description,
  badgeText,
  icon = "whatsapp",
  className = "",
}: CardArtSkeuoProps) {
  return (
    <div
      className={`subtle-paper-skeuo relative w-full rounded-[20px] p-2 border border-[#D8C4A7] shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-[#D79C9A] hover:shadow-md group overflow-hidden ${className}`}
    >
      {/* TOP-LEFT BOTANICAL ACCENT (rotate-180 to face top-left corner) */}
      <Image
        src="/assets/bio-asset.webp"
        alt="Top Left Botanical Accent"
        width={250}
        height={250}
        unoptimized
        className="absolute -top-1 -left-1 w-24 sm:w-32 h-auto object-contain pointer-events-none z-0 opacity-75 group-hover:opacity-95 group-hover:scale-105 transition-all duration-300 rotate-180"
      />

      {/* DOUBLE-LINE BORDER FRAME */}
      <div className="w-full h-full rounded-[14px] border border-[#D8C4A7] p-0.5">
        <div className="w-full h-full rounded-[12px] border border-[#EBC3A8] p-4 sm:p-5 flex flex-row items-center gap-4 sm:gap-5 bg-transparent text-left">

          {/* LEFT: CIRCULAR SUNKEN MEDALLION */}
          <div className="subtle-paper-skeuo relative flex size-24 sm:size-28 shrink-0 items-center justify-center rounded-full p-1 border border-[#D8C4A7] transition-transform group-hover:scale-105 z-10">
            <div className="w-full h-full rounded-full border border-[#D8C4A7] p-[1.5px] flex items-center justify-center">
              <div className="w-full h-full rounded-full border border-[#EBC3A8] bg-[#F5E8D5]/60 shadow-[inset_0px_3px_5px_rgba(62,82,55,0.18),inset_0px_-2px_3px_rgba(255,255,255,0.85)] flex items-center justify-center relative p-1.5">

                {icon === "whatsapp" && (
                  <>
                    <Image
                      src="/icon-assets/whatsapp.webp"
                      alt="WhatsApp"
                      width={120}
                      height={120}
                      unoptimized
                      className="w-full h-full object-contain"
                    />
                    {badgeText && (
                      <span className="absolute -top-1.5 -right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-[#9E4A48] text-[10px] font-bold text-white shadow-xs border border-white/50 z-20">
                        {badgeText}
                      </span>
                    )}
                  </>
                )}

                {icon === "file" && (
                  <Image
                    src="/icon-assets/note-icon.webp"
                    alt="Note"
                    width={120}
                    height={120}
                    unoptimized
                    className="w-full h-full object-contain"
                  />
                )}

                {icon === "megaphone" && (
                  <Image
                    src="/icon-assets/announcement-icon.webp"
                    alt="Announcement"
                    width={120}
                    height={120}
                    unoptimized
                    className="w-full h-full object-contain"
                  />
                )}

              </div>
            </div>
          </div>

          {/* RIGHT: TITLE + DIVIDER + DESCRIPTION */}
          <div className="flex flex-col text-left flex-1 relative z-10">
            <h3 className="font-heading text-h4 font-bold text-[#3E5237]">
              {title}
            </h3>
            <span className="h-px w-8 bg-[#B89A57]/60 my-1.5" />
            <p className="font-sans text-[10px] sm:text-xs text-[#78865C] leading-relaxed">
              {description}
            </p>
          </div>

        </div>
      </div>

      {/* BOTTOM-RIGHT FLORAL BOUQUET (dual layer) */}
      {/* LAYER 1 (BEHIND): secondary flower */}
      <Image
        src="/assets/asset-card-flower-2.webp"
        alt="Secondary Card Flower Accent"
        width={320}
        height={320}
        unoptimized
        className="absolute bottom-4 sm:bottom-6 -right-1 sm:-right-2 w-28 sm:w-36 h-auto object-contain pointer-events-none z-0 opacity-60 group-hover:opacity-85 group-hover:scale-105 transition-all duration-300"
      />
      {/* LAYER 2 (FRONT): primary flower */}
      <Image
        src="/assets/asset-card-flower.webp"
        alt="Card Flower Accent"
        width={300}
        height={300}
        unoptimized
        className="absolute -bottom-7 sm:-bottom-8 right-2 w-44 sm:w-48 h-auto object-contain pointer-events-none z-0 opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
      />
    </div>
  );
}

export default CardArtSkeuo;
