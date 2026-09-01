"use client";

import React, { forwardRef } from "react";
import { motion } from "framer-motion";
import {
  FolderHeart,
  Scale,
  Tag,
  Package,
  Sparkles,
  Truck,
  Gift,
  ArrowRight,
} from "lucide-react";
import { ReviewSection } from "./ReviewSection";
import { renderFormattedDescription } from "../utils/formatDescription";
import type { Product, ProductReview } from "../types";

export type TabType = "deskripsi" | "spesifikasi" | "ulasan";

interface ProductTabsSectionProps {
  product: Product & {
    reviews: ProductReview[];
    averageRating: number;
    reviewCount: number;
  };
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const ProductTabsSection = forwardRef<HTMLDivElement, ProductTabsSectionProps>(
  ({ product, activeTab, onTabChange }, ref) => {
    return (
      <div ref={ref} className="space-y-6">
        {/* Tab Navigation Header */}
        <div className="flex items-center gap-8 border-b border-[#F5F5F4] pb-2 select-none">
          {(["deskripsi", "spesifikasi", "ulasan"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => onTabChange(tab)}
              className={`relative cursor-pointer pb-2 text-sm font-bold capitalize transition-colors ${
                activeTab === tab
                  ? "text-[#6355D9]"
                  : "text-[#78716C] hover:text-[#111827]"
              }`}
            >
              {tab === "ulasan" ? `Ulasan (${product.reviewCount || 12})` : tab}
              {activeTab === tab && (
                <motion.div
                  layoutId="activeProductTabUnderline"
                  className="absolute right-0 bottom-0 left-0 h-0.5 bg-[#6355D9] rounded-full"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Tab Contents */}
        <div className="min-h-36">
          {/* TAB 1: DESKRIPSI (Full Width Clean Layout) */}
          {activeTab === "deskripsi" && (
            <div className="space-y-4 text-xs sm:text-sm text-[#57534E] leading-relaxed">
              <div>
                {product.description ? (
                  renderFormattedDescription(product.description)
                ) : (
                  <p>
                    Paket lengkap buat ngasih hadiah ke cowo/cewe. Cocok untuk ulang tahun, anniversary, graduation, welcome gift, dan berbagai momen spesial lainnya.
                  </p>
                )}
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => onTabChange("spesifikasi")}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6355D9] hover:underline cursor-pointer pt-1"
                >
                  <span>Lihat spesifikasi lengkap</span>
                  <ArrowRight className="size-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: SPESIFIKASI (2-Column Clean Key-Value List Layout) */}
          {activeTab === "spesifikasi" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2 select-none">
              {/* Kolom Kiri: 3 Spesifikasi Utama */}
              <div className="space-y-1">
                {/* 1. Kategori Produk */}
                <div className="flex items-center justify-between py-2.5 border-b border-[#F5F5F4] text-xs sm:text-sm">
                  <div className="flex items-center gap-2 text-[#78716C]">
                    <FolderHeart className="size-4 text-[#6355D9]" />
                    <span>Kategori Produk</span>
                  </div>
                  <span className="font-semibold text-[#111827]">
                    {product.category || "Gift Box & Hampers"}
                  </span>
                </div>

                {/* 2. Berat Produk */}
                <div className="flex items-center justify-between py-2.5 border-b border-[#F5F5F4] text-xs sm:text-sm">
                  <div className="flex items-center gap-2 text-[#78716C]">
                    <Scale className="size-4 text-[#6355D9]" />
                    <span>Berat Produk</span>
                  </div>
                  <span className="font-semibold text-[#111827]">
                    {product.weight || 500} gram
                  </span>
                </div>

                {/* 3. Tipe Kesiapan */}
                <div className="flex items-center justify-between py-2.5 border-b border-[#F5F5F4] text-xs sm:text-sm">
                  <div className="flex items-center gap-2 text-[#78716C]">
                    <Tag className="size-4 text-[#6355D9]" />
                    <span>Tipe Kesiapan</span>
                  </div>
                  <span className="font-semibold text-[#111827]">
                    {product.type === "PREORDER" ? "Pre-order" : "Ready Stock"}
                  </span>
                </div>
              </div>

              {/* Kolom Kanan: 4 Spesifikasi Kriya Tambahan */}
              <div className="space-y-1">
                {/* 1. Isi Paket */}
                <div className="flex items-center justify-between py-2.5 border-b border-[#F5F5F4] text-xs sm:text-sm">
                  <div className="flex items-center gap-2 text-[#78716C]">
                    <Package className="size-4 text-[#6355D9]" />
                    <span>Isi Paket</span>
                  </div>
                  <span className="font-semibold text-[#111827]">
                    6 Produk Kado
                  </span>
                </div>

                {/* 2. Material Kriya */}
                <div className="flex items-center justify-between py-2.5 border-b border-[#F5F5F4] text-xs sm:text-sm">
                  <div className="flex items-center gap-2 text-[#78716C]">
                    <Sparkles className="size-4 text-[#6355D9]" />
                    <span>Material</span>
                  </div>
                  <span className="font-semibold text-[#111827]">
                    Premium & Natural
                  </span>
                </div>

                {/* 3. Estimasi Pengiriman */}
                <div className="flex items-center justify-between py-2.5 border-b border-[#F5F5F4] text-xs sm:text-sm">
                  <div className="flex items-center gap-2 text-[#78716C]">
                    <Truck className="size-4 text-[#6355D9]" />
                    <span>Estimasi Pengiriman</span>
                  </div>
                  <span className="font-semibold text-[#111827]">
                    1 - 2 Hari Kerja
                  </span>
                </div>

                {/* 4. Cocok Untuk */}
                <div className="flex items-center justify-between py-2.5 border-b border-[#F5F5F4] text-xs sm:text-sm">
                  <div className="flex items-center gap-2 text-[#78716C]">
                    <Gift className="size-4 text-[#6355D9]" />
                    <span>Cocok Untuk</span>
                  </div>
                  <span className="font-semibold text-[#111827]">
                    Semua Momen Spesial
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: ULASAN (Full Width Clean Review Section) */}
          {activeTab === "ulasan" && (
            <div className="pt-2">
              <ReviewSection
                productId={product.id}
                productName={product.name}
                reviews={product.reviews}
                averageRating={product.averageRating}
                reviewCount={product.reviewCount}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
);

ProductTabsSection.displayName = "ProductTabsSection";
