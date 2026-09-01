"use client";

import React from "react";

interface ProductMobileActionBarProps {
  price: number;
  onAddToCart: () => void;
  onBuyNow: () => void;
}

export function ProductMobileActionBar({
  price,
  onAddToCart,
  onBuyNow,
}: ProductMobileActionBarProps) {
  return (
    <div className="fixed right-0 bottom-0 left-0 z-50 flex items-center justify-between gap-4 border-t border-[#78865C]/20 bg-[#FAF4EC] p-3.5 shadow-2xl md:hidden paper-skeuo">
      <div className="flex flex-col min-w-0">
        <span className="text-[10px] font-sans text-[#78865C] font-semibold">
          Total Harga
        </span>
        <span className="text-lg font-heading font-bold text-[#3E5237] truncate">
          {new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0,
          }).format(price)}
        </span>
      </div>
      <div className="flex max-w-60 flex-1 gap-2 select-none">
        <button
          onClick={onAddToCart}
          className="flex-1 cursor-pointer rounded-xl border border-[#78865C]/40 py-2.5 text-xs font-bold text-[#3E5237] bg-[#FAF6F0] shadow-xs active:scale-95 transition-transform"
        >
          Keranjang
        </button>
        <button
          onClick={onBuyNow}
          className="flex-1 cursor-pointer rounded-xl py-2.5 text-xs font-bold text-[#3E5237] peach-skeuo btn-interactive shadow-sm active:scale-95 transition-transform border border-[#EBC3A8]/60"
        >
          Beli
        </button>
      </div>
    </div>
  );
}
