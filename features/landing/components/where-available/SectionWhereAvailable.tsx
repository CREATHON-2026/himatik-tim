"use client";

import React, { forwardRef } from "react";
import {
  CITIES_STOCKISTS_DATA,
  DIRECT_PRODUCTS_DATA,
  DirectProduct,
} from "./types";
import { StockistCityColumn } from "./StockistCityColumn";
import { ComingSoonCities } from "./ComingSoonCities";
import { ProductPurchaseCard } from "./ProductPurchaseCard";
import { LandingFooter } from "./LandingFooter";

interface SectionWhereAvailableProps
  extends React.HTMLAttributes<HTMLElement> {
  onAddToCart?: (product: DirectProduct, packSize: "4-PACK" | "12-PACK") => void;
  onNavigate?: (targetId: string) => void;
}

export const SectionWhereAvailable = forwardRef<
  HTMLElement,
  SectionWhereAvailableProps
>(({ onAddToCart, onNavigate, ...props }, ref) => {
  return (
    <section
      ref={ref}
      id="stockists"
      {...props}
      className="relative w-full bg-[#EFEDE6] text-[#1A1B1D] overflow-hidden border-t border-[#1A1B1D]/10"
    >
      <div className="mx-auto w-full max-w-360 px-6 md:px-14 pt-20 md:pt-28 pb-16">
        {/* Section 6 Top Header */}
        <div className="border-t border-[#1A1B1D]/15 pt-6">
          <div className="flex items-center gap-2 text-[10px] sm:text-[11px] font-semibold tracking-[0.28em] uppercase text-[#737578] mb-3">
            <span className="text-[#1A1B1D]">06</span>
            <span className="text-[#737578]/40">/</span>
            <span>Where Available</span>
          </div>

          <h2 className="font-sans text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-[#1A1B1D] max-w-4xl leading-[1.05]">
            Find STILL in store, or order direct.
          </h2>
        </div>

        {/* 3-Column City Stockists Directory */}
        <div className="mt-14 md:mt-20 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-14">
          {CITIES_STOCKISTS_DATA.map((cityData) => (
            <StockistCityColumn key={cityData.city} data={cityData} />
          ))}
        </div>

        {/* Global Expansion Cities */}
        <ComingSoonCities />

        {/* Divider Section: "OR ORDER DIRECT" */}
        <div
          id="shop"
          className="mt-24 md:mt-32 flex items-center justify-center gap-6"
        >
          <div className="h-px w-20 sm:w-28 bg-[#1A1B1D]/25" />
          <span className="font-mono text-xs sm:text-sm font-bold tracking-[0.3em] uppercase text-[#737578]">
            Or Order Direct
          </span>
          <div className="h-px w-20 sm:w-28 bg-[#1A1B1D]/25" />
        </div>

        {/* 3 Direct Purchase Product Cards Grid */}
        <div className="mt-12 md:mt-16 grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-8">
          {DIRECT_PRODUCTS_DATA.map((product) => (
            <ProductPurchaseCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      </div>

      {/* Luxury Editorial Footer */}
      <LandingFooter onNavigate={onNavigate} />
    </section>
  );
});

SectionWhereAvailable.displayName = "SectionWhereAvailable";
