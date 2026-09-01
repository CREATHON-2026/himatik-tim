"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Share2, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ProductBreadcrumbBarProps {
  category: string;
  productName: string;
}

export function ProductBreadcrumbBar({
  category,
  productName,
}: ProductBreadcrumbBarProps) {
  const router = useRouter();
  const [isSaved, setIsSaved] = useState(false);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Tautan produk berhasil disalin ke papan klip!");
    }
  };

  const handleToggleWishlist = () => {
    setIsSaved((prev) => !prev);
    toast.success(isSaved ? "Dihapus dari wishlist" : "Ditambahkan ke wishlist");
  };

  return (
    <div className="gsap-fade-in flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 py-1 select-none w-full">
      {/* Back Button & Breadcrumbs */}
      <div className="flex flex-wrap items-center gap-3">
        <Button
          onClick={() => router.back()}
          variant="skeuo-paper-secondary"
          className="flex h-8.5 shrink-0 cursor-pointer items-center gap-1.5 px-3 text-xs font-semibold"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Kembali
        </Button>

        <div className="hidden h-4 w-px bg-[#78865C]/25 sm:block" />

        <nav className="flex items-center gap-2 font-sans text-xs font-medium text-[#78865C]">
          <span
            className="cursor-pointer transition-colors hover:text-[#3E5237]"
            onClick={() => router.push("/market")}
          >
            Market
          </span>
          <span className="font-normal text-neutral-400">&gt;</span>
          <span
            className="cursor-pointer transition-colors hover:text-[#3E5237]"
            onClick={() => router.push(`/market?category=${category}`)}
          >
            {category}
          </span>
          <span className="font-normal text-neutral-400">&gt;</span>
          <span className="max-w-46 sm:max-w-60 truncate font-bold text-[#3E5237]">
            {productName}
          </span>
        </nav>
      </div>

      {/* Share & Save Actions */}
      <div className="flex items-center gap-2 self-end sm:self-auto">
        <Button
          onClick={handleShare}
          variant="skeuo-paper-secondary"
          className="h-8.5 px-3 flex items-center gap-1.5 text-xs font-semibold cursor-pointer shrink-0"
        >
          <Share2 className="w-3.5 h-3.5 text-[#78865C]" /> Bagikan
        </Button>
        <Button
          onClick={handleToggleWishlist}
          variant="skeuo-paper-secondary"
          className="h-8.5 px-3 flex items-center gap-1.5 text-xs font-semibold cursor-pointer shrink-0"
        >
          <Heart
            className={`w-3.5 h-3.5 transition-colors ${
              isSaved ? "fill-rose-500 text-rose-500" : "text-[#78865C]"
            }`}
          />
          {isSaved ? "Disimpan" : "Simpan"}
        </Button>
      </div>
    </div>
  );
}
