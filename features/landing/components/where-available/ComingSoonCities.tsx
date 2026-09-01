"use client";

import React from "react";
import { COMING_SOON_CITIES } from "./types";

export const ComingSoonCities: React.FC = () => {
  return (
    <div className="mt-20 md:mt-24 text-center">
      <div className="font-sans text-[11px] font-semibold tracking-[0.4em] uppercase text-[#737578]">
        Coming Soon
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
        {COMING_SOON_CITIES.map((city, idx) => (
          <React.Fragment key={city}>
            <span className="font-sans text-base sm:text-lg font-medium text-[#1A1B1D]/80 hover:text-[#1A1B1D] transition-colors duration-300">
              {city}
            </span>
            {idx < COMING_SOON_CITIES.length - 1 && (
              <span
                aria-hidden="true"
                className="font-sans text-[#BCD3D8] text-base font-bold select-none"
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
