"use client";

import React from "react";
import { CityStockists } from "./types";

interface StockistCityColumnProps {
  data: CityStockists;
}

export const StockistCityColumn: React.FC<StockistCityColumnProps> = ({ data }) => {
  return (
    <div className="flex flex-col w-full">
      {/* City Title Header */}
      <h3 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-[#1A1B1D]">
        {data.city}
      </h3>

      <div className="mt-4 h-px w-full bg-[#1A1B1D]/15" />

      {/* Stockists List with Inverted Hover Fill Micro-Interaction */}
      <ul className="mt-2 flex flex-col">
        {data.stores.map((store, idx) => {
          const isLast = idx === data.stores.length - 1;
          return (
            <li
              key={store.id}
              className={`group relative overflow-hidden transition-all duration-300 ${
                !isLast ? "border-b border-[#1A1B1D]/10" : ""
              }`}
            >
              {/* Animated Inverted Fill Background */}
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-[#1A1B1D] origin-bottom scale-y-0 transition-transform duration-300 ease-out group-hover:scale-y-100"
              />

              {/* Store Content */}
              <div className="relative z-10 flex items-center justify-between gap-4 py-4 px-3 transition-transform duration-300 group-hover:translate-x-1.5">
                <div className="flex flex-col min-w-0">
                  <span className="font-sans text-sm sm:text-[15px] font-semibold text-[#1A1B1D] transition-colors duration-300 group-hover:text-[#EFEDE6] truncate">
                    {store.name}
                  </span>
                  <span className="mt-0.5 font-sans text-xs text-[#737578] transition-colors duration-300 group-hover:text-[#EFEDE6]/70 truncate">
                    {store.address}
                  </span>
                </div>

                {/* Arrow Icon Reveal */}
                <span
                  aria-hidden="true"
                  className="shrink-0 font-sans text-xs text-[#EFEDE6] opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0"
                >
                  →
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
