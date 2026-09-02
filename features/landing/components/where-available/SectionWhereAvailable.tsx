"use client";

import React, { forwardRef } from "react";
import { CITIES_STOCKISTS_DATA } from "./types";
import { StockistCityColumn } from "./StockistCityColumn";
import { ComingSoonCities } from "./ComingSoonCities";
import { DualCtaBanner } from "./DualCtaBanner";
import { LandingFooter } from "./LandingFooter";

interface SectionWhereAvailableProps
  extends React.HTMLAttributes<HTMLElement> {
  onNavigate?: (targetId: string) => void;
}

export const SectionWhereAvailable = forwardRef<
  HTMLElement,
  SectionWhereAvailableProps
>(({ onNavigate, ...props }, ref) => {
  return (
    <section
      ref={ref}
      id="stockists"
      {...props}
      className="relative w-full bg-[#FAFAF9] text-[#111827] overflow-hidden border-t border-[#E7E5E4] select-none"
    >
      <div className="mx-auto w-full max-w-360 px-6 md:px-14 pt-20 md:pt-28 pb-16">
        {/* Section 6 Top Header */}
        <div className="border-t border-[#E7E5E4] pt-6">
          <div className="flex items-center gap-2 text-[10px] sm:text-[11px] font-semibold tracking-[0.28em] uppercase text-[#78716C] mb-3">
            <span className="text-[#111827]">06</span>
            <span className="text-[#78716C]/40">/</span>
            <span>Jangkauan Sanggar Nusantara</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-[#111827] max-w-4xl leading-tight">
            Hadir dari sanggar terkurasi di berbagai penjuru Indonesia.
          </h2>
        </div>

        {/* 3-Column City Artisan Hubs Directory */}
        <div className="mt-14 md:mt-20 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-14">
          {CITIES_STOCKISTS_DATA.map((cityData) => (
            <StockistCityColumn key={cityData.city} data={cityData} />
          ))}
        </div>

        {/* Next Expansion Cities */}
        <ComingSoonCities />

        {/* Dual Call-to-Action Banner (Replaces Canned Direct Purchase Cards) */}
        <DualCtaBanner />
      </div>

      {/* Luxury Editorial Footer */}
      <LandingFooter onNavigate={onNavigate} />
    </section>
  );
});

SectionWhereAvailable.displayName = "SectionWhereAvailable";
