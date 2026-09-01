"use client";

import React from "react";
import Link from "next/link";
import { Plus } from "lucide-react";

export function DashboardHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      {/* Title Block */}
      <div className="space-y-1">
        <span className="text-[11px] font-semibold tracking-wider text-[#6355D9] uppercase block leading-none">
          SELLER STUDIO
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#111827] tracking-tight leading-tight">
          Ringkasan
        </h1>
        <p className="text-xs sm:text-sm text-[#78716C] font-normal leading-normal">
          Pantau performa toko, pesanan, dan pendapatan Anda.
        </p>
      </div>

      {/* Action Button */}
      <div className="flex items-center gap-3 shrink-0">
        <Link
          href="/dashboard/creator/products/new"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#4338CA] hover:bg-[#3730A3] text-white font-medium text-xs sm:text-sm transition-all duration-150 shadow-md shadow-indigo-700/15 active:scale-[0.99] cursor-pointer"
        >
          <Plus className="size-4 stroke-[2.5]" />
          <span>Tambah Produk</span>
        </Link>
      </div>
    </div>
  );
}
