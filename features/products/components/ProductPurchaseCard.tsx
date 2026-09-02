"use client";

import React, { useState } from "react";
import { Plus, Minus, ShieldCheck, Truck, Package, ShoppingBag, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductPurchaseCardProps {
  price: number;
  stock?: number;
  onAddToCart?: (qty: number) => void;
  onBuyNow: (qty: number) => void;
  className?: string;
}

export function ProductPurchaseCard({
  price,
  stock = 99,
  onAddToCart,
  onBuyNow,
  className = "",
}: ProductPurchaseCardProps) {
  const [qty, setQty] = useState(1);

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "decimal",
      maximumFractionDigits: 0,
    }).format(val || 110000);
  };

  const handleIncrement = () => {
    if (qty < stock) setQty((prev) => prev + 1);
  };

  const handleDecrement = () => {
    if (qty > 1) setQty((prev) => prev - 1);
  };

  return (
    <div
      className={`bg-white border border-[#E7E5E4] rounded-3xl p-6 shadow-xs flex flex-col gap-5 ${className}`}
    >
      {/* Price & Quantity Selector Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Big Price Display */}
        <div className="font-serif text-2xl sm:text-3xl font-bold text-[#111827] tracking-tight">
          Rp{formatPrice(price)}
        </div>

        {/* Quantity Selector Stepper */}
        <div className="flex items-center justify-between w-28 py-1 px-2 rounded-xl border border-[#E7E5E4] bg-white shadow-2xs select-none">
          <button
            type="button"
            onClick={handleDecrement}
            disabled={qty <= 1}
            aria-label="Kurangi jumlah"
            className="size-6 rounded-lg flex items-center justify-center text-[#78716C] hover:text-[#111827] hover:bg-[#F5F5F4] disabled:opacity-40 cursor-pointer transition"
          >
            <Minus className="size-3.5" />
          </button>
          <span className="font-bold text-sm text-[#111827] font-sans">
            {qty}
          </span>
          <button
            type="button"
            onClick={handleIncrement}
            disabled={qty >= stock}
            aria-label="Tambah jumlah"
            className="size-6 rounded-lg flex items-center justify-center text-[#78716C] hover:text-[#111827] hover:bg-[#F5F5F4] disabled:opacity-40 cursor-pointer transition"
          >
            <Plus className="size-3.5" />
          </button>
        </div>
      </div>

      {/* Action CTA Buttons */}
      <div className="flex flex-col gap-3 w-full select-none">
        {/* Beli Sekarang: Solid Violet (Primary Direct Gift Checkout) */}
        <Button
          size="lg"
          onClick={() => onBuyNow(qty)}
          className="w-full h-12 rounded-xl bg-[#6355D9] hover:bg-[#5145C6] text-white font-semibold text-sm shadow-xs transition-all cursor-pointer flex items-center justify-center gap-2"
        >
          <ShoppingBag className="size-4" />
          <span>Beli Sekarang</span>
        </Button>

        {/* Tambah ke Keranjang */}
        <Button
          variant="outline"
          size="lg"
          onClick={() => onAddToCart?.(qty)}
          disabled={!onAddToCart}
          className="w-full h-12 rounded-xl border-[#E7E5E4] bg-white hover:bg-[#F5F5F4] text-[#111827] font-semibold text-sm shadow-2xs transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <ShoppingCart className="size-4 text-[#6355D9]" />
          <span>Tambahkan ke Keranjang</span>
        </Button>
      </div>

      {/* Trust & Guarantee Indicators (3 Items) */}
      <div className="pt-3 border-t border-[#F5F5F4] grid grid-cols-3 gap-2 text-center text-[11px] sm:text-xs text-[#78716C] select-none">
        <div className="flex items-center justify-center gap-1.5">
          <ShieldCheck className="size-4 text-[#6355D9] shrink-0" />
          <span className="font-medium text-[#44403C]">Transaksi Aman</span>
        </div>
        <div className="flex items-center justify-center gap-1.5 border-x border-[#F5F5F4]">
          <Truck className="size-4 text-[#6355D9] shrink-0" />
          <span className="font-medium text-[#44403C]">Pengiriman Cepat</span>
        </div>
        <div className="flex items-center justify-center gap-1.5">
          <Package className="size-4 text-[#6355D9] shrink-0" />
          <span className="font-medium text-[#44403C]">Dikemas Rapi</span>
        </div>
      </div>
    </div>
  );
}
