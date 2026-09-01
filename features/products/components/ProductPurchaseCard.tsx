"use client";

import React, { useState } from "react";
import { Plus, Minus, ShieldCheck, Zap, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductPurchaseCardProps {
  price: number;
  stock: number;
  onAddToCart: (qty: number) => void;
  onBuyNow: (qty: number) => void;
  className?: string;
}

export function ProductPurchaseCard({
  price,
  stock,
  onAddToCart,
  onBuyNow,
  className = "",
}: ProductPurchaseCardProps) {
  const [qty, setQty] = useState(1);

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "decimal",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleIncrement = () => {
    if (qty < stock) setQty((prev) => prev + 1);
  };

  const handleDecrement = () => {
    if (qty > 1) setQty((prev) => prev - 1);
  };

  return (
    <div
      className={`bg-[#FAF4EC] border border-[#78865C]/25 rounded-[22px] p-4.5 sm:p-5 shadow-md flex flex-col gap-4 paper-skeuo paper-texture relative ${className}`}
    >
      {/* Decorative Art Nouveau Corner Notches / Double Frame Lines */}
      <div className="pointer-events-none absolute inset-1.5 rounded-[18px] border border-[#78865C]/12" />

      {/* Price Header Display */}
      <div className="flex flex-col items-center text-center gap-0.5 pt-1">
        <div className="text-2xl sm:text-3xl font-heading text-[#3E5237] font-bold tracking-tight">
          Rp{formatPrice(price)}
        </div>
      </div>

      {/* Quantity Selector Section: Compact Centered Pill */}
      <div className="flex items-center justify-between w-32 mx-auto py-0.5 px-1.5 rounded-full border border-[#78865C]/25 bg-[#FAF6F0] shadow-inner select-none">
        <Button
          variant="ghost"
          size="icon-xs"
          onClick={handleDecrement}
          disabled={qty <= 1}
          aria-label="Kurangi jumlah"
          className="h-6 w-6 rounded-full hover:bg-[#FAF4EC] text-[#3E5237] cursor-pointer p-0"
        >
          <Minus className="w-3 h-3" />
        </Button>
        <span className="font-bold text-[#3E5237] font-sans text-xs">
          {qty}
        </span>
        <Button
          variant="ghost"
          size="icon-xs"
          onClick={handleIncrement}
          disabled={qty >= stock}
          aria-label="Tambah jumlah"
          className="h-6 w-6 rounded-full hover:bg-[#FAF4EC] text-[#3E5237] cursor-pointer p-0"
        >
          <Plus className="w-3 h-3" />
        </Button>
      </div>

      {/* Action CTA Buttons using official Skeuomorphic Buttons (Forest for Buy Now, Paper for Add to Cart) */}
      <div className="flex flex-col gap-2.5 select-none pt-1 w-full">
        {/* Beli Sekarang: skeuo-forest */}
        <Button
          variant="skeuo-forest"
          size="sm"
          onClick={() => onBuyNow(qty)}
          className="w-full h-9.5 text-xs font-bold cursor-pointer"
        >
          <Zap className="w-3.5 h-3.5 mr-1" />
          <span>Beli Sekarang</span>
        </Button>

        {/* Tambah ke Keranjang: Disabled / Segera Hadir */}
        <Button
          variant="outline"
          size="sm"
          disabled
          aria-disabled="true"
          className="w-full h-9.5 text-xs font-medium text-[#A8A29E] bg-[#F5F5F4]/60 border-dashed border-[#E7E5E4] cursor-not-allowed opacity-75"
        >
          <ShoppingCart className="w-3.5 h-3.5 mr-1 text-[#A8A29E]" />
          <span>Tambah ke Keranjang (Segera Hadir)</span>
        </Button>
      </div>

      {/* Security Indicator: Clearer, High Contrast & Refined */}
      <div className="flex items-center gap-1.5 text-xs text-[#3E5237] font-semibold justify-center select-none pt-0.5 border-t border-[#78865C]/15">
        <ShieldCheck className="w-4 h-4 text-[#566B4D] shrink-0" />
        <span>Transaksi Aman & Terpercaya</span>
      </div>
    </div>
  );
}
