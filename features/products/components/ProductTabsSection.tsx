"use client";

import React, { forwardRef } from "react";
import { motion } from "framer-motion";
import { FolderHeart, Scale, Tag, Truck, Barcode, Package } from "lucide-react";
import { BotanicalOrnament } from "./BotanicalOrnament";
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
      <div
        ref={ref}
        className="gsap-fade-in flex flex-col gap-5 border-t border-[#78865C]/20 pt-8 mt-4"
      >
        {/* Tab Navigation Header */}
        <div className="flex gap-6 sm:gap-8 border-b border-[#78865C]/15 pb-2">
          {(["deskripsi", "spesifikasi", "ulasan"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => onTabChange(tab)}
              className={`relative cursor-pointer pb-2.5 font-heading text-base font-bold capitalize transition-colors ${
                activeTab === tab
                  ? "text-[#3E5237]"
                  : "text-[#78865C]/70 hover:text-[#3E5237]"
              }`}
            >
              {tab === "ulasan" ? `Ulasan (${product.reviewCount})` : tab}
              {activeTab === tab && (
                <motion.div
                  layoutId="activeTabUnderline"
                  className="absolute right-0 bottom-0 left-0 h-0.5 bg-[#566B4D]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Tab Contents */}
        <div className="min-h-56">
          {/* TAB 1: DESKRIPSI */}
          {activeTab === "deskripsi" && (
            <div className="relative flex flex-col gap-4 font-sans text-sm leading-relaxed text-neutral-800 bg-[#FAF4EC] p-6 sm:p-7 rounded-art-nouveau border border-[#78865C]/20 shadow-xs paper-texture">
              <BotanicalOrnament
                size={110}
                className="absolute bottom-2 right-2 opacity-20 hidden sm:block pointer-events-none"
              />
              <div className="text-sm text-neutral-800 leading-relaxed font-sans">
                {renderFormattedDescription(product.description)}
              </div>
            </div>
          )}

          {/* TAB 2: SPESIFIKASI */}
          {activeTab === "spesifikasi" && (
            <div className="bg-[#FAF4EC] border border-[#78865C]/20 rounded-art-nouveau p-5 sm:p-6 shadow-xs paper-texture">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3.5 text-sm select-none">
                {/* Kategori */}
                <div className="flex items-center justify-between py-2 border-b border-[#78865C]/12">
                  <div className="flex items-center gap-2 text-[#78865C] font-semibold text-xs sm:text-sm">
                    <FolderHeart className="w-4 h-4 text-[#566B4D]" />
                    <span>Kategori Produk</span>
                  </div>
                  <span className="font-bold text-[#3E5237] text-xs sm:text-sm">
                    {product.category}
                  </span>
                </div>

                {/* Berat Produk */}
                <div className="flex items-center justify-between py-2 border-b border-[#78865C]/12">
                  <div className="flex items-center gap-2 text-[#78865C] font-semibold text-xs sm:text-sm">
                    <Scale className="w-4 h-4 text-[#566B4D]" />
                    <span>Berat Produk</span>
                  </div>
                  <span className="font-bold text-[#3E5237] text-xs sm:text-sm">
                    {product.weight || 500} gram
                  </span>
                </div>

                {/* Tipe Kesiapan */}
                <div className="flex items-center justify-between py-2 border-b border-[#78865C]/12">
                  <div className="flex items-center gap-2 text-[#78865C] font-semibold text-xs sm:text-sm">
                    <Tag className="w-4 h-4 text-[#566B4D]" />
                    <span>Tipe Kesiapan</span>
                  </div>
                  <span className="font-bold text-[#3E5237] text-xs sm:text-sm">
                    {product.type === "PREORDER"
                      ? "Pre-order (Dibuat sesuai pesanan)"
                      : "Ready Stock (Siap Kirim)"}
                  </span>
                </div>

                {/* Opsi Pengiriman */}
                <div className="flex items-center justify-between py-2 border-b border-[#78865C]/12">
                  <div className="flex items-center gap-2 text-[#78865C] font-semibold text-xs sm:text-sm">
                    <Truck className="w-4 h-4 text-[#566B4D]" />
                    <span>Opsi Pengiriman</span>
                  </div>
                  <span className="font-bold text-[#3E5237] text-xs sm:text-sm text-right">
                    {product.shippingOptions && product.shippingOptions.length > 0
                      ? product.shippingOptions
                          .map((opt) =>
                            opt === "INSTANT"
                              ? "Kurir Instan"
                              : opt === "SAMEDAY"
                              ? "Sameday"
                              : opt === "PICKUP"
                              ? "Ambil di Toko"
                              : opt === "REGULER"
                              ? "Kurir Reguler"
                              : opt
                          )
                          .join(", ")
                      : "Kurir Instan, Sameday"}
                  </span>
                </div>

                {/* SKU */}
                {product.sku && (
                  <div className="flex items-center justify-between py-2 border-b border-[#78865C]/12">
                    <div className="flex items-center gap-2 text-[#78865C] font-semibold text-xs sm:text-sm">
                      <Barcode className="w-4 h-4 text-[#566B4D]" />
                      <span>Kode SKU</span>
                    </div>
                    <span className="font-bold text-[#3E5237] text-xs sm:text-sm font-mono">
                      {product.sku}
                    </span>
                  </div>
                )}

                {/* Status Stok */}
                <div className="flex items-center justify-between py-2 border-b border-[#78865C]/12">
                  <div className="flex items-center gap-2 text-[#78865C] font-semibold text-xs sm:text-sm">
                    <Package className="w-4 h-4 text-[#566B4D]" />
                    <span>Ketersediaan Stok</span>
                  </div>
                  <span className="font-bold text-[#3E5237] text-xs sm:text-sm">
                    {product.showStock ? `${product.stock} Unit Tersedia` : "Stok Tersedia"}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: ULASAN */}
          {activeTab === "ulasan" && (
            <ReviewSection
              productId={product.id}
              productName={product.name}
              reviews={product.reviews}
              averageRating={product.averageRating}
              reviewCount={product.reviewCount}
            />
          )}
        </div>
      </div>
    );
  }
);

ProductTabsSection.displayName = "ProductTabsSection";
