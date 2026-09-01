"use client";

import React, { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { DirectProduct } from "./types";

interface ProductPurchaseCardProps {
  product: DirectProduct;
  onAddToCart?: (product: DirectProduct, packSize: "4-PACK" | "12-PACK") => void;
}

export const ProductPurchaseCard: React.FC<ProductPurchaseCardProps> = ({
  product,
  onAddToCart,
}) => {
  const [packSize, setPackSize] = useState<"4-PACK" | "12-PACK">("4-PACK");
  const [isAdded, setIsAdded] = useState(false);

  const price = packSize === "4-PACK" ? product.price4Pack : product.price12Pack;

  const handleAdd = () => {
    if (onAddToCart) {
      onAddToCart(product, packSize);
    }
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1600);
  };

  return (
    <article className="group flex flex-col justify-between rounded-2xl border border-[#1A1B1D]/15 bg-white p-7 sm:p-8 shadow-lg shadow-[#1A1B1D]/5 transition-all duration-300 hover:shadow-2xl hover:shadow-[#1A1B1D]/10 hover:-translate-y-1">
      {/* 3D Can Showcase Area with Ambient Colored Radial Aura */}
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-[#FAF9F5] flex items-center justify-center p-6 transition-transform duration-500 group-hover:scale-[1.02]">
        {/* Ambient Radial Aura Glow */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none rounded-full blur-2xl opacity-60 transition-opacity duration-300 group-hover:opacity-80"
          style={{
            background: `radial-gradient(circle, ${product.glowColor} 0%, transparent 70%)`,
          }}
        />

        {/* 3D Matte White Can Graphic */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="relative h-44 w-22 rounded-2xl bg-gradient-to-b from-[#FAF9F6] via-[#FFFFFF] to-[#E8E6DE] p-2.5 shadow-xl border border-black/10 flex flex-col justify-between overflow-hidden">
            {/* Top Rim */}
            <div className="h-2 w-full rounded-full bg-gradient-to-r from-gray-200 via-white to-gray-300 border-b border-black/10" />

            {/* Vertical Typography Label */}
            <div className="my-auto flex flex-col items-center">
              <span className="font-sans text-[10px] font-black tracking-widest text-[#1A1B1D] uppercase">
                STILL.
              </span>
              <span
                className="mt-1 font-mono text-xs font-bold"
                style={{ color: product.accentColor }}
              >
                {product.sku.split(".")[1]}
              </span>
              <span className="font-serif text-[9px] italic text-[#737578] mt-0.5">
                {product.name}
              </span>
            </div>

            {/* Bottom Specular Rim */}
            <div className="h-2.5 w-full rounded-b-xl bg-gradient-to-r from-gray-300 via-white to-gray-200 border-t border-black/5" />
          </div>

          {/* Under-Can Ground Shadow */}
          <div className="mt-2 h-2 w-20 rounded-full bg-black/15 blur-sm" />
        </div>
      </div>

      {/* Product Information */}
      <div className="mt-6 flex flex-col flex-1 justify-between">
        <div>
          <div className="flex items-baseline gap-2">
            <span className="font-sans text-xl sm:text-2xl font-black tracking-tight text-[#1A1B1D]">
              {product.sku}
            </span>
            <span className="text-[#737578] text-lg">·</span>
            <span className="font-serif text-xl sm:text-2xl font-light text-[#1A1B1D]">
              {product.name}
            </span>
          </div>

          <p className="mt-1 font-sans text-xs font-semibold tracking-wider uppercase text-[#737578]">
            {product.subtitle}
          </p>

          <p className="mt-2.5 font-sans text-xs sm:text-sm text-[#1A1B1D]/80 leading-relaxed min-h-[38px]">
            {product.description}
          </p>
        </div>

        <div className="mt-6 pt-4 border-t border-[#1A1B1D]/10 flex flex-col gap-4">
          {/* Pack Switcher Pills */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPackSize("4-PACK")}
              className={`flex-1 rounded-full py-1.5 text-xs font-mono font-bold tracking-wider uppercase transition-all duration-300 ${
                packSize === "4-PACK"
                  ? "bg-[#1A1B1D] text-[#EFEDE6] shadow-sm"
                  : "border border-[#1A1B1D]/20 text-[#1A1B1D] hover:bg-[#1A1B1D]/5"
              }`}
            >
              4-PACK
            </button>
            <button
              type="button"
              onClick={() => setPackSize("12-PACK")}
              className={`flex-1 rounded-full py-1.5 text-xs font-mono font-bold tracking-wider uppercase transition-all duration-300 ${
                packSize === "12-PACK"
                  ? "bg-[#1A1B1D] text-[#EFEDE6] shadow-sm"
                  : "border border-[#1A1B1D]/20 text-[#1A1B1D] hover:bg-[#1A1B1D]/5"
              }`}
            >
              12-PACK
            </button>
          </div>

          {/* Price & Subscription Savings */}
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-sans text-3xl font-black text-[#1A1B1D] tabular-nums">
                ${price}
              </span>
              <span className="font-sans text-xs font-medium uppercase tracking-wider text-[#737578]">
                NZD
              </span>
            </div>
            <p className="font-serif italic text-xs text-[#737578] mt-0.5">
              Subscribe and save 15%
            </p>
          </div>

          {/* Add to Cart CTA Button */}
          <button
            type="button"
            onClick={handleAdd}
            className={`w-full flex items-center justify-center gap-2 rounded-xl py-3.5 text-xs font-mono font-bold tracking-[0.25em] uppercase transition-all duration-300 ${
              isAdded
                ? "bg-[#BCD3D8] text-[#1A1B1D]"
                : "bg-[#1A1B1D] text-[#EFEDE6] hover:bg-[#1A1B1D]/90 shadow-md"
            }`}
          >
            {isAdded ? (
              <>
                <Check className="h-4 w-4" />
                <span>ADDED TO CART</span>
              </>
            ) : (
              <span>ADD TO CART</span>
            )}
          </button>

          {/* Secondary Subscribe Link */}
          <button
            type="button"
            className="group/sublink inline-flex items-center gap-1 text-xs font-sans text-[#1A1B1D]/70 hover:text-[#1A1B1D] transition-colors duration-200 self-start"
          >
            <span>Subscribe instead</span>
            <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover/sublink:translate-x-1" />
          </button>
        </div>
      </div>
    </article>
  );
};
