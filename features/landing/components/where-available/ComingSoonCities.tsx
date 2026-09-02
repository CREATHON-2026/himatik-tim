"use client";

import React from "react";
import { Sparkles } from "lucide-react";
import { COMING_SOON_CITIES } from "./types";

export const ComingSoonCities: React.FC = () => {
  return (
    <div className="mt-16 md:mt-20 text-center">
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E7E5E4] text-[10px] sm:text-[11px] font-mono font-bold tracking-[0.2em] uppercase text-[#6355D9] shadow-2xs">
        <Sparkles className="size-3" />
        <span>Segera Hadir Sanggar Terkurasi</span>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
        {COMING_SOON_CITIES.map((city, idx) => (
          <React.Fragment key={city}>
            <span className="font-serif text-base sm:text-lg font-medium text-[#44403C] hover:text-[#6355D9] transition-colors duration-300">
              {city}
            </span>
            {idx < COMING_SOON_CITIES.length - 1 && (
              <span
                aria-hidden="true"
                className="font-sans text-[#D6D3D1] text-base font-bold select-none"
              >
                ·
              </span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
