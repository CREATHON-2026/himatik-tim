"use client";

import React, { forwardRef } from "react";
import { PressQuoteCards } from "./PressQuoteCards";
import { PressMarquee } from "./PressMarquee";

export const SectionPress = forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  (props, ref) => {
    return (
      <section
        ref={ref}
        id="press"
        {...props}
        className="relative w-full min-h-screen bg-[#18181B] text-white px-6 md:px-14 flex flex-col justify-between overflow-hidden border-t border-white/10 shadow-[0_-30px_80px_rgba(0,0,0,0.75)] z-40 select-none"
      >
        {/* Top Header Area */}
        <div className="mx-auto w-full max-w-360 pt-[calc(56px+clamp(16px,3vh,36px))] pb-6">
          <div className="flex items-center gap-2 text-[10px] sm:text-[11px] font-semibold tracking-[0.28em] uppercase text-white/50 mb-2">
            <span className="text-white">05</span>
            <span className="text-white/30">/</span>
            <span>Apresiasi & Pengakuan</span>
          </div>

          <h2 className="font-serif text-3xl font-light tracking-tight text-white sm:text-5xl md:text-6xl">
            Dipercaya untuk momen paling berharga.
          </h2>
        </div>

        {/* Center Editorial Quote Cards */}
        <div className="my-auto py-8 w-full">
          <PressQuoteCards />
        </div>

        {/* Bottom Infinite Marquee Ticker */}
        <div className="w-full pb-4">
          <PressMarquee />
        </div>
      </section>
    );
  }
);

SectionPress.displayName = "SectionPress";
