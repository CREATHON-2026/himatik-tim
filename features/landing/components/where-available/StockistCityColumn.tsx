"use client";

import React from "react";
import { ArrowRight, MapPin } from "lucide-react";
import { CityStockists } from "./types";

interface StockistCityColumnProps {
  data: CityStockists;
}

export const StockistCityColumn: React.FC<StockistCityColumnProps> = ({ data }) => {
  return (
    <div className="flex flex-col w-full">
      {/* City Title Header */}
      <div className="flex items-center gap-2">
        <MapPin className="size-4 text-[#6355D9]" />
        <h3 className="font-serif text-2xl sm:text-3xl font-normal tracking-tight text-[#111827]">
          {data.city}
        </h3>
      </div>

      <div className="mt-4 h-px w-full bg-[#E7E5E4]" />

      {/* Stockists List with Inverted Hover Fill Micro-Interaction */}
      <ul className="mt-2 flex flex-col">
        {data.stores.map((store, idx) => {
          const isLast = idx === data.stores.length - 1;
          return (
            <li
              key={store.id}
              className={`group relative overflow-hidden transition-all duration-300 rounded-xl ${
                !isLast ? "border-b border-[#E7E5E4]" : ""
              }`}
            >
              {/* Animated Inverted Fill Background */}
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-[#6355D9] origin-bottom scale-y-0 transition-transform duration-300 ease-out group-hover:scale-y-100"
              />

              {/* Store Content */}
              <div className="relative z-10 flex items-center justify-between gap-4 py-3.5 px-3 transition-transform duration-300 group-hover:translate-x-1.5">
                <div className="flex flex-col min-w-0">
                  <span className="font-sans text-sm font-semibold text-[#111827] transition-colors duration-300 group-hover:text-white truncate">
                    {store.name}
                  </span>
                  <span className="mt-0.5 font-sans text-xs text-[#78716C] transition-colors duration-300 group-hover:text-white/80 truncate">
                    {store.address}
                  </span>
                </div>

                {/* Arrow Icon Reveal */}
                <ArrowRight
                  aria-hidden="true"
                  className="shrink-0 size-4 text-white opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0"
                />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
