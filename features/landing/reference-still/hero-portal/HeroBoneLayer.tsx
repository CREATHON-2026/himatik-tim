"use client";

import React, { forwardRef } from "react";

interface HeroBoneLayerProps {
  lettersRef: React.MutableRefObject<(HTMLSpanElement | null)[]>;
}

export const HeroBoneLayer = forwardRef<HTMLDivElement, HeroBoneLayerProps>(
  ({ lettersRef }, ref) => {
    const wordmarkChars = ["S", "T", "I", "L", "L"];

    return (
      <div
        ref={ref}
        className="absolute inset-0 z-10 flex flex-col justify-between px-6 pt-[calc(56px+clamp(6px,1.5vh,16px))] pb-[clamp(24px,4vh,44px)] select-none md:px-14"
      >
        {/* Big Center Typography STILL. (2x Larger, Authentic 22vw from drinkstill.nz) */}
        <div className="flex flex-1 items-center justify-center my-auto min-h-0 overflow-hidden">
          <h1 className="flex items-baseline text-[clamp(100px,22vw,320px)] font-black leading-[0.78] tracking-[-0.04em] text-[#1A1B1D]">
            {wordmarkChars.map((char, i) => (
              <span
                key={i}
                ref={(el) => {
                  lettersRef.current[i] = el;
                }}
                className="inline-block will-change-transform"
              >
                {char}
              </span>
            ))}
            <span
              ref={(el) => {
                lettersRef.current[5] = el;
              }}
              className="inline-block text-[#BCD3D8] will-change-transform"
            >
              .
            </span>
          </h1>
        </div>

        {/* Bottom Editorial Meta Info (100% Visible Immediately On Load) */}
        <div className="flex items-end justify-between shrink-0 z-20 pt-2">
          <div>
            <p className="text-[10px] font-semibold tracking-[0.28em] uppercase text-[#737578]">
              Editorial Nootropic
            </p>
            <p className="mt-1 font-serif text-base font-light tracking-tight text-[#1A1B1D] sm:text-lg md:text-xl">
              Stay still. <br />
              Stay sharp.
            </p>
          </div>

          {/* Scroll Indicator */}
          <div className="hidden flex-col items-center gap-1.5 md:flex">
            <span className="text-[9px] font-medium tracking-[0.3em] uppercase text-[#737578]">
              Scroll
            </span>
            <div className="relative h-7 w-4 rounded-full border border-[#1A1B1D]/25 p-0.5">
              <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#BCD3D8]" />
            </div>
          </div>

          <div className="text-right">
            <p className="text-[10px] font-semibold tracking-[0.24em] uppercase text-[#737578]">
              Formula 01
            </p>
            <p className="mt-1 text-[11px] text-[#1A1B1D]/80 leading-tight">
              Wellington, New Zealand <br />
              Caffeine-Free
            </p>
          </div>
        </div>
      </div>
    );
  }
);

HeroBoneLayer.displayName = "HeroBoneLayer";
