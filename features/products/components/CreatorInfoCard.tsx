"use client";

import React from "react";
import Image from "next/image";
import {
  Star,
  Store,
  CheckCircle2,
  MapPin,
  Clock,
  Package,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import type { CreatorMinimal } from "@/features/products/types";

interface CreatorInfoCardProps {
  creator: CreatorMinimal & {
    averageRating?: number;
    totalReviewCount?: number;
    activeProductCount?: number;
    whatsapp?: string | null;
    openingHours?: string | null;
  };
  className?: string;
}

export function CreatorInfoCard({ creator, className = "" }: CreatorInfoCardProps) {
  const router = useRouter();
  // Extract genuine metrics without any dummy fallbacks
  const hasRating = typeof creator.averageRating === "number" && creator.averageRating > 0;
  const ratingVal = hasRating ? creator.averageRating!.toFixed(1) : null;
  const reviewCount = creator.totalReviewCount && creator.totalReviewCount > 0 ? `${creator.totalReviewCount} ulasan` : null;
  const districtName = creator.district ? creator.district.split(",")[0].trim() : null;
  const productCount = creator.activeProductCount && creator.activeProductCount > 0 ? `${creator.activeProductCount} Produk` : null;
  const openingHours = creator.openingHours?.trim() || null;
  const whatsappNumber = creator.whatsapp?.replace(/\D/g, "") || null;

  // Build array of genuine metadata items to display
  const metricsItems: React.ReactNode[] = [];
  if (ratingVal) {
    metricsItems.push(
      <span key="rating" className="flex items-center gap-0.5">
        <span>{ratingVal}</span>
        <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
        {reviewCount && <span className="text-[10px] text-[#78865C]/80 font-normal">({reviewCount})</span>}
      </span>
    );
  }
  if (productCount) {
    metricsItems.push(
      <span key="products" className="flex items-center gap-1">
        <Package className="w-3 h-3 text-[#78865C]" />
        <span>{productCount}</span>
      </span>
    );
  }
  if (districtName) {
    metricsItems.push(
      <span key="district" className="flex items-center gap-1">
        <MapPin className="w-3 h-3 text-[#78865C]" />
        <span>{districtName}</span>
      </span>
    );
  }

  const handleWhatsApp = () => {
    if (!whatsappNumber) return;
    const formattedNumber = whatsappNumber.startsWith("0")
      ? `62${whatsappNumber.slice(1)}`
      : whatsappNumber.startsWith("62")
      ? whatsappNumber
      : `62${whatsappNumber}`;
    const text = encodeURIComponent(`Halo ${creator.shopName}, saya melihat produk Anda di Bicket dan tertarik untuk bertanya/memesan.`);
    window.open(`https://wa.me/${formattedNumber}?text=${text}`, "_blank");
  };

  return (
    <div
      className={`paper-texture paper-skeuo relative flex flex-col rounded-[22px] border border-[#78865C]/25 bg-[#FAF4EC] shadow-sm overflow-hidden ${className}`}
    >
      {/* 1. Art Nouveau Botanical Header Banner */}
      <div className="relative h-12 lg:h-14 w-full bg-linear-to-r from-[#3E5237] via-[#4D6344] to-[#3E5237] flex items-center justify-between px-3 overflow-hidden">
        {/* Subtle Decorative Floral Line-Art Curves */}
        <svg
          className="absolute inset-0 w-full h-full text-white/12 pointer-events-none"
          viewBox="0 0 300 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M-10 60C30 20 80 50 120 15C160 -20 200 45 250 20C290 0 320 40 340 60"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <circle cx="60" cy="25" r="8" stroke="currentColor" strokeWidth="0.8" />
          <circle cx="240" cy="25" r="8" stroke="currentColor" strokeWidth="0.8" />
        </svg>
      </div>

      {/* 2. Main Content: Centered on Mobile/MD, Side-by-side on Desktop (LG) */}
      <div className="relative flex flex-col lg:flex-row items-center lg:items-start gap-3 lg:gap-4 px-4 pb-3.5 -mt-6 lg:-mt-7">
        {/* Avatar: Standard 60px on Mobile/MD, +50% Enlarged (90px) on Desktop (LG) */}
        <div className="relative h-15 w-15 lg:h-22 lg:w-22 rounded-full overflow-hidden border-2 lg:border-3 border-[#FAF4EC] bg-[#FAF6F0] shadow-md shrink-0">
          {creator.photoUrl ? (
            <Image
              src={creator.photoUrl}
              alt={creator.shopName}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-[#78865C]/15 text-[#3E5237]">
              <Store className="h-6 w-6 lg:h-9 lg:w-9" />
            </div>
          )}
          {/* Verified Badge Icon */}
          <div className="absolute bottom-0 right-0 p-0.5 rounded-full bg-[#FAF4EC] shadow-xs">
            <CheckCircle2 className="h-3.5 w-3.5 lg:h-4.5 lg:w-4.5 text-[#566B4D] fill-[#566B4D]" />
          </div>
        </div>

        {/* Shop Details: Centered on Mobile/MD, Left-aligned on Desktop (LG) */}
        <div className="flex flex-col items-center lg:items-start flex-1 min-w-0 text-center lg:text-left w-full">
          {/* Shop Name */}
          <h4 className="font-heading text-base lg:text-lg font-bold text-white leading-tight truncate max-w-full drop-shadow-xs">
            {creator.shopName}
          </h4>

          {/* Shop Bio / Tagline with pt-2 padding */}
          {creator.bio && (
            <p className="text-[11px] font-sans text-[#78865C] pt-2 line-clamp-2 leading-tight">
              {creator.bio}
            </p>
          )}

          {/* Genuine Metrics (Only rendered if actual data exists) */}
          {metricsItems.length > 0 && (
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-2.5 gap-y-1 mt-1.5 text-[10.5px] lg:text-[11px] font-sans font-semibold text-[#3E5237] select-none">
              {metricsItems.map((item, idx) => (
                <React.Fragment key={idx}>
                  {idx > 0 && <span className="text-[#78865C]/40">•</span>}
                  {item}
                </React.Fragment>
              ))}
            </div>
          )}

          {/* Opening Hours if available */}
          {openingHours && (
            <div className="flex items-center gap-1 text-[10.5px] font-sans text-[#78865C] mt-1 select-none">
              <Clock className="w-3 h-3 text-[#78865C]" />
              <span>{openingHours}</span>
            </div>
          )}

          {/* Action Buttons: Kunjungi Toko + Chat WhatsApp (Secondary Skeuo) */}
          <div className="flex items-center gap-2 w-full mt-2.5 select-none">
            <Button
              onClick={() => {
                router.push(`/market/creators/${creator.id}`);
              }}
              variant="skeuo-paper-secondary"
              size="sm"
              className="flex-1 h-8 lg:h-8.5 text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer rounded-xl border-[#78865C]/25 text-[#3E5237] shadow-xs"
            >
              <Store className="h-3.5 w-3.5 text-[#78865C]" />
              <span>Kunjungi Toko</span>
            </Button>

            {whatsappNumber && (
              <Button
                onClick={handleWhatsApp}
                variant="skeuo-forest-secondary"
                size="sm"
                className="h-8 lg:h-8.5 px-3 text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer rounded-xl shadow-xs"
                title="Chat WhatsApp Toko"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Chat</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
