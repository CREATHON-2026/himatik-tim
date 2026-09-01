"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { SlidersHorizontal, ArrowUpDown, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/ui/search-input";

interface ProductToolbarProps {
  search: string;
  setSearch: (val: string) => void;
  activeTab: "semua" | "aktif" | "habis" | "draft" | "arsip";
  setActiveTab: (tab: "semua" | "aktif" | "habis" | "draft" | "arsip") => void;
  onAddClick: () => void;
  counts?: {
    semua: number;
    aktif: number;
    habis: number;
    draft: number;
    arsip: number;
  };
}

export function ProductToolbar({
  search,
  setSearch,
  activeTab,
  setActiveTab,
  onAddClick,
  counts,
}: ProductToolbarProps) {
  const tabs: Array<{
    id: "semua" | "aktif" | "habis" | "draft" | "arsip";
    label: string;
    count?: number;
    isAlert?: boolean;
  }> = [
    { id: "semua", label: "Semua Produk", count: counts?.semua },
    { id: "aktif", label: "Aktif", count: counts?.aktif },
    {
      id: "habis",
      label: "Stok Habis",
      count: counts?.habis,
      isAlert: (counts?.habis ?? 0) > 0,
    },
    { id: "draft", label: "Draft", count: counts?.draft },
    { id: "arsip", label: "Diarsipkan", count: counts?.arsip },
  ];

  return (
    <div className="space-y-4 pt-2">
      {/* 1. Search Bar & Action Buttons Row */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        {/* Skeuomorphic Paper Search Input */}
        <div className="flex-1">
          <SearchInput
            variant="skeuo-paper"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onClear={() => setSearch("")}
            placeholder="Cari produk berdasarkan nama..."
            aria-label="Cari produk"
            className="w-full h-10 shadow-xs"
          />
        </div>

        {/* Action Controls */}
        <div className="flex shrink-0 items-center gap-2">
          <Button
            variant="skeuo-paper-secondary"
            size="default"
            className="gap-2 h-10 px-4 text-xs font-semibold shadow-xs"
            aria-label="Filter produk"
          >
            <SlidersHorizontal className="size-4" />
            <span>Filter</span>
          </Button>

          <Button
            variant="skeuo-paper-secondary"
            size="default"
            className="gap-2 h-10 px-4 text-xs font-semibold shadow-xs"
            aria-label="Urutkan produk"
          >
            <ArrowUpDown className="size-4" />
            <span>Urutkan</span>
          </Button>

          <Button
            variant="skeuo-forest-secondary"
            size="default"
            onClick={onAddClick}
            className="gap-2 h-10 px-4 text-xs font-bold shadow-sm"
          >
            <Plus className="size-4" />
            <span>Tambah Produk</span>
          </Button>
        </div>
      </div>

      {/* 2. Interactive Tactile Tab Bar with Animated Spring Underline & Count Badges */}
      <div className="border-b border-[#D8C4A7]/50 flex scrollbar-none gap-4 sm:gap-6 overflow-x-auto pt-2 relative">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "relative shrink-0 cursor-pointer pb-2 text-xs sm:text-sm whitespace-nowrap transition-colors outline-none flex items-center gap-2 group",
                isActive
                  ? "text-[#2D3829] font-bold"
                  : "text-[#78865C] hover:text-[#2D3829] font-medium"
              )}
              aria-selected={isActive}
              role="tab"
            >
              <span>{tab.label}</span>

              {tab.count !== undefined && (
                <span
                  className={cn(
                    "text-[10px] px-2 py-0.5 rounded-full font-bold transition-all tabular-nums",
                    isActive
                      ? "bg-[#3E5237] text-[#FAF4EC] shadow-2xs"
                      : tab.isAlert
                        ? "bg-[#D79C9A] text-white"
                        : "bg-[#D8C4A7]/30 text-[#78865C] group-hover:bg-[#D8C4A7]/60 group-hover:text-[#2D3829]"
                  )}
                >
                  {tab.count}
                </span>
              )}

              {/* Animated Floating Glide Line with Spring Physics */}
              {isActive && (
                <motion.div
                  layoutId="activeTabUnderline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#3E5237] rounded-full shadow-[0_1px_3px_rgba(62,82,55,0.3)]"
                  transition={{ type: "spring", stiffness: 420, damping: 32 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
