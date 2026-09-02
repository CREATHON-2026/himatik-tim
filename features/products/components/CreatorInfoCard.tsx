"use client";

import React from "react";
import Image from "next/image";
import {
  Store,
  MapPin,
  Clock,
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

  const storeName = creator.shopName || "Gifteria";
  const storeBio =
    creator.bio ||
    "Pengrajin buket bunga segar, kado personal, dan hampers premium berkualitas tinggi.";
  const locationCity = creator.district || "Korean";
  const avatarUrl = creator.photoUrl || "/aset/gifteria-logo.png";
  const whatsappNumber = creator.whatsapp?.replace(/\D/g, "") || "089526293221";

  const handleWhatsApp = () => {
    if (!whatsappNumber) return;
    const formattedNumber = whatsappNumber.startsWith("0")
      ? `62${whatsappNumber.slice(1)}`
      : whatsappNumber.startsWith("62")
      ? whatsappNumber
      : `62${whatsappNumber}`;
    const text = encodeURIComponent(
      `Halo ${storeName}, saya melihat produk Anda di Gifteria dan tertarik untuk bertanya/memesan.`
    );
    window.open(`https://wa.me/${formattedNumber}?text=${text}`, "_blank");
  };

  return (
    <div
      className={`relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 sm:p-6 rounded-3xl border border-[#E7E5E4] bg-white shadow-xs ${className}`}
    >
      {/* Left Avatar & Store Info */}
      <div className="flex items-start sm:items-center gap-4 min-w-0 flex-1">
        {/* Circular Avatar */}
        <div className="relative size-14 sm:size-16 rounded-full overflow-hidden border-2 border-white bg-[#FAF8FF] shadow-sm shrink-0">
          <Image
            src={avatarUrl}
            alt={storeName}
            fill
            unoptimized
            className="object-cover object-center"
          />
        </div>

        {/* Store Name, Status & Bio */}
        <div className="space-y-1 min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="font-serif text-lg sm:text-xl font-bold text-[#111827] leading-tight">
              {storeName}
            </h4>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-semibold border border-emerald-200">
              <span className="size-1.5 rounded-full bg-emerald-500" />
              <span>Aktif</span>
            </span>
          </div>

          <p className="text-xs text-[#78716C] leading-relaxed line-clamp-2">
            {storeBio}
          </p>

          <div className="flex items-center gap-4 text-xs text-[#78716C] pt-0.5 flex-wrap">
            <span className="flex items-center gap-1 font-medium text-[#44403C]">
              <MapPin className="size-3.5 text-[#6355D9]" />
              <span>{locationCity}</span>
            </span>
            <span className="flex items-center gap-1 text-[#78716C]">
              <Clock className="size-3.5 text-[#A8A29E]" />
              <span>Respons ~15 Menit</span>
            </span>
          </div>
        </div>
      </div>

      {/* Right Action Buttons */}
      <div className="flex sm:flex-col items-center gap-2.5 w-full sm:w-auto shrink-0 select-none pt-2 sm:pt-0">
        <Button
          onClick={() => {
            router.push(`/katalog`);
          }}
          variant="outline"
          size="sm"
          className="flex-1 sm:w-36 h-9 rounded-xl border-[#DDD6FE] text-[#6355D9] hover:bg-[#FAF8FF] text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs transition"
        >
          <Store className="size-3.5" />
          <span>Kunjungi Toko</span>
        </Button>

        <Button
          onClick={handleWhatsApp}
          variant="outline"
          size="sm"
          className="flex-1 sm:w-36 h-9 rounded-xl border-[#DDD6FE] text-[#6355D9] hover:bg-[#FAF8FF] text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs transition"
        >
          <MessageCircle className="size-3.5" />
          <span>Chat</span>
        </Button>
      </div>
    </div>
  );
}
