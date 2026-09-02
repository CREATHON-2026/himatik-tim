"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { Badge } from "@/components/ui/badge";
import Heart from "@/assets/svg/heart";
import { Star, MapPin, Flower2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface CardProductProps {
  id?: string;
  name?: string;
  creator?: string;
  creatorAvatar?: string;
  /** Accepts string (already formatted) or number (auto-formatted Rupiah) */
  price?: string | number;
  image?: string;
  rating?: number;
  ratingCount?: number;
  salesCount?: number;
  badge?: string; // "Terlaris", "Baru", "Promo"
  sizeBadge?: string;
  typeBadge?: string;
  district?: string;
  isLiked?: boolean;
  onOrder?: () => void;
  onClick?: () => void;
}

const CardProductDemo = ({
  name = "Peach Romance Bouquet",
  creator = "Gifteria",
  creatorAvatar,
  price = 89000,
  image = "https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=600&q=80",
  rating = 5.0,
  ratingCount = 3,
  salesCount = 3,
  badge,
  district = "Makassar",
  isLiked = false,
  onOrder,
  onClick,
}: CardProductProps) => {
  const [liked, setLiked] = useState<boolean>(isLiked);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // Auto-format price when a raw number is passed (e.g. from API)
  const formattedPrice =
    typeof price === "number"
      ? new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(price)
      : price;

  const getBadgeStyle = (bName?: string) => {
    switch (bName) {
      case "Terlaris":
        return "bg-[#E5884B] text-white border-none";
      case "Baru":
        return "bg-[#5C7D52] text-white border-none";
      case "Promo":
        return "bg-[#D96B6B] text-white border-none";
      default:
        return "bg-[#E5884B] text-white border-none";
    }
  };

  const hasRating = ratingCount > 0 && rating > 0;
  const hasSales = salesCount > 0;

  return (
    <motion.article
      role="article"
      aria-label={`Kartu produk ${name} oleh ${creator}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
      className="group relative flex aspect-square w-full cursor-pointer flex-col rounded-lg sm:rounded-xl lg:rounded-2xl border-[1.5px] border-[#D8C4A7] bg-linear-to-br from-[#FAF4EC] via-[#F5E9D5] to-[#E9D7BE] p-1.5 sm:p-2 lg:p-2.5 shadow-xs select-none transition-all duration-300 hover:border-[#78865C]/70 hover:shadow-2xl"
      style={{
        boxShadow:
          "0 10px 32px rgba(120, 100, 70, 0.1), inset 0 1.5px 2px rgba(255, 255, 255, 0.95)",
      }}
    >
      {/* Invisible Accessible Main Overlay Link */}
      <div 
        onClick={onClick}
        className="absolute inset-0 z-0 cursor-pointer"
        aria-hidden="true"
      />

      {/* ── 1. SVG Vector Deep Line Overlay (Flush near outer border at inset-0.5 / 2px) ── */}
      <svg
        className="absolute inset-0.5 z-10 pointer-events-none h-[calc(100%-4px)] w-[calc(100%-4px)]"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          {/* Corner Fade: Top-Left and Bottom-Right vanish, sides visible */}
          <linearGradient id="deepLineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#B49B7A" stopOpacity="0" />
            <stop offset="8%"   stopColor="#B49B7A" stopOpacity="0" />
            <stop offset="20%"  stopColor="#B49B7A" stopOpacity="0.65" />
            <stop offset="43%"  stopColor="#B49B7A" stopOpacity="0.65" />
            <stop offset="50%"  stopColor="#B49B7A" stopOpacity="0" />
            <stop offset="58%"  stopColor="#B49B7A" stopOpacity="0" />
            <stop offset="70%"  stopColor="#B49B7A" stopOpacity="0.65" />
            <stop offset="90%"  stopColor="#B49B7A" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#B49B7A" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="deepHighlightGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#FFFFFF" stopOpacity="0" />
            <stop offset="8%"   stopColor="#FFFFFF" stopOpacity="0" />
            <stop offset="20%"  stopColor="#FFFFFF" stopOpacity="0.8" />
            <stop offset="43%"  stopColor="#FFFFFF" stopOpacity="0.8" />
            <stop offset="50%"  stopColor="#FFFFFF" stopOpacity="0" />
            <stop offset="58%"  stopColor="#FFFFFF" stopOpacity="0" />
            <stop offset="70%"  stopColor="#FFFFFF" stopOpacity="0.8" />
            <stop offset="90%"  stopColor="#FFFFFF" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Dark Sunken Groove Line */}
        <rect
          x="1"
          y="1"
          width="98"
          height="98"
          rx="7"
          fill="none"
          stroke="url(#deepLineGradient)"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
        />

        {/* White Bottom-Right Highlight Line (Deep Effect Offset) */}
        <rect
          x="1.6"
          y="1.6"
          width="97.5"
          height="97.5"
          rx="7"
          fill="none"
          stroke="url(#deepHighlightGradient)"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* ── 2. Pure Linen Canvas & Inner Photo Container ── */}
      <div className="relative h-full w-full overflow-hidden rounded-lg sm:rounded-xl flex items-center justify-center p-0.5">
        {/* Floating Subject Image Layer */}
        <motion.div
          animate={{
            scale: isHovered ? 1.04 : 1,
            y: isHovered ? -8 : 0,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
          className="relative h-full w-full overflow-hidden rounded-lg sm:rounded-xl"
        >
          {/* Main Product Image */}
          {image ? (
            <Image
              src={image}
              alt={`${name} buket bunga buatan tangan oleh ${creator}`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px"
              className="object-cover object-center"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <Flower2 className="size-10 sm:size-12 text-[#78865C]/30" />
            </div>
          )}

          {/* Category Badge Overlay */}
          {badge && (
            <div className="absolute top-10 sm:top-12 lg:top-14 left-1.5 sm:left-2 z-10">
              <Badge className={`px-1.5 py-0.5 sm:px-2 sm:py-0.5 text-[9px] sm:text-[10px] font-bold shadow-xs ${getBadgeStyle(badge)}`}>
                ⭐ {badge}
              </Badge>
            </div>
          )}
        </motion.div>
      </div>

      {/* ── 3. Top-Left Decorative Artisan Stamp Asset (3-Tier: 44px on Mobile, 56px on Tablet, 72px on Desktop) ── */}
      <div className="absolute top-0.5 left-0.5 sm:top-1 sm:left-1 lg:top-0 lg:left-0 z-20 pointer-events-none drop-shadow-md lg:drop-shadow-lg">
        <Image
          src="/assets/stempel-dekorative.webp"
          alt="Stempel Kualitas Handmade Makassar"
          width={72}
          height={72}
          className="size-11 sm:size-14 md:size-15 lg:size-18 object-contain select-none"
        />
      </div>

      {/* ── 4. Top-Right Heart/Wishlist Button (3-Tier: 32px on Mobile, 40-44px on Tablet, 56px on Desktop) ── */}
      <div className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 lg:top-0 lg:right-0 z-20">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setLiked(!liked);
          }}
          aria-label={liked ? "Hapus dari favorit" : "Tambah ke favorit"}
          aria-pressed={liked}
          className="flex size-8 sm:size-10 md:size-11 lg:h-14 lg:w-14 items-center justify-center p-0.5 lg:p-1 cursor-pointer"
        >
          <div className="flex size-7 sm:size-8.5 md:size-9 lg:h-10 lg:w-10 items-center justify-center rounded-full border border-white/80 lg:border-2 bg-white/95 backdrop-blur-md shadow-xs sm:shadow-sm lg:shadow-md transition-all duration-150 hover:bg-white active:scale-85 lg:active:scale-90">
            <Heart
              className={`size-3.5 sm:size-4.5 md:size-5 lg:size-6 transition-all ${
                liked ? "fill-rose-500 stroke-rose-500" : "stroke-[#3E5237]/80 fill-none"
              }`}
            />
          </div>
        </button>
      </div>

      {/* ── 5. Bottom-Right 3D Price Tag Asset (3-Tier: h-6.5 on Mobile, h-8/8.5 on Tablet, h-10 on Desktop) ── */}
      <div 
        aria-label={`Harga ${formattedPrice}`}
        className="absolute bottom-1 right-1 z-20 pointer-events-none drop-shadow-[0_2px_6px_rgba(0,0,0,0.3)] lg:drop-shadow-[0_4px_8px_rgba(0,0,0,0.35)]"
      >
        <div 
          className="relative flex h-6.5 sm:h-8 md:h-8.5 lg:h-10 items-center pl-5 sm:pl-6.5 md:pl-7 lg:pl-8 pr-2 sm:pr-3 lg:pr-4 bg-linear-to-b from-[#4A6041] via-[#3E5237] to-[#32422C] text-white border-t border-white/25"
          style={{
            clipPath: "polygon(12px 0%, 100% 0%, 100% 100%, 12px 100%, 0% calc(100% - 8px), 0% 8px)",
            borderTopRightRadius: "8px",
            borderBottomRightRadius: "8px",
            boxShadow: "inset 0 1px 1px rgba(255,255,255,0.4), inset 0 -2px 4px rgba(0,0,0,0.35)",
          }}
        >
          {/* Metallic Gold Eyelet Grommet Hole (3-Tier: 10px on Mobile, 13px on Tablet, 16px on Desktop) */}
          <span 
            className="absolute left-1.5 sm:left-2 lg:left-2 flex size-2.5 sm:size-3.5 lg:size-4 items-center justify-center rounded-full border border-[#C5A059] lg:border-2 bg-[#FAF4EC]"
            style={{
              boxShadow: "inset 0 1px 2px rgba(0,0,0,0.6), 0 1px 1px rgba(255,255,255,0.3)",
            }}
          />

          {/* Dynamic Formatted Price Text (3-Tier: 11px on Mobile, 13px on Tablet, 16px on Desktop) */}
          <span className="relative z-10 font-sans text-[11px] sm:text-[12.5px] md:text-sm lg:text-base font-extrabold text-[#FAF4EC] tracking-tight whitespace-nowrap pl-0.5 lg:pl-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
            {formattedPrice}
          </span>
        </div>
      </div>

      {/* ── 6. Interactive Reveal Info Drawer (3-Tier: Compact Mobile, Balanced Tablet, Luxury Desktop) ── */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 340, damping: 28 }}
            className="absolute inset-x-0 bottom-0 z-30 flex flex-col gap-1 sm:gap-1.5 md:gap-1.5 lg:gap-2 rounded-b-lg border-t border-[#D8C4A7] bg-[#FAF4EC]/95 p-2 sm:p-2.5 md:p-3 lg:p-3.5 backdrop-blur-md shadow-2xl text-left"
          >
            {/* Store & Location Row */}
            <div className="flex items-center justify-between text-[9.5px] sm:text-[10px] md:text-[11px] lg:text-micro text-[#566B4D]">
              <div className="flex items-center gap-1 sm:gap-1.5 min-w-0">
                <div className="relative size-3.5 sm:size-4 md:size-4.5 lg:size-4.5 shrink-0 overflow-hidden rounded-full bg-[#78865C]/20 border border-[#78865C]/30">
                  {creatorAvatar ? (
                    <Image
                      src={creatorAvatar}
                      alt={creator}
                      fill
                      sizes="20px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-[8px] sm:text-[9px] lg:text-micro font-bold text-[#3E5237]">
                      {creator.charAt(0)}
                    </div>
                  )}
                </div>
                <span className="truncate font-semibold text-[#566B4D] max-w-22 sm:max-w-30 lg:max-w-none">{creator}</span>
              </div>
              {district && (
                <span className="flex shrink-0 items-center gap-0.5 text-[9px] sm:text-[9.5px] md:text-[10.5px] lg:text-micro text-[#78865C] font-medium">
                  <MapPin className="size-2.5 sm:size-3 lg:size-3 text-[#78865C]" />
                  {district}
                </span>
              )}
            </div>

            {/* Product Title in Cormorant Garamond Font */}
            <h3 className="font-heading text-xs sm:text-[13px] md:text-sm lg:text-sm font-bold leading-snug text-[#3E5237] line-clamp-1 tracking-tight">
              {name}
            </h3>

            {/* Rating & Sales Row + Price Badge */}
            <div className="flex items-center justify-between text-[9.5px] sm:text-[10px] md:text-[11px] lg:text-micro">
              <div className="flex items-center gap-1">
                {hasRating ? (
                  <>
                    <Star className="size-2.5 sm:size-3 lg:size-3 fill-[#E5884B] text-[#E5884B]" />
                    <span className="font-bold text-[#3E5237]">{rating}</span>
                    <span className="text-[9px] sm:text-[9.5px] lg:text-micro text-[#78865C]">({ratingCount})</span>
                  </>
                ) : (
                  <span className="text-[9.5px] sm:text-[10px] lg:text-micro font-medium text-[#78865C]/75">Produk Baru</span>
                )}
                {hasSales && (
                  <span className="ml-0.5 text-[9px] sm:text-[9.5px] lg:text-micro text-[#78865C]">· Terjual {salesCount}</span>
                )}
              </div>

              <span className="font-sans text-[11px] sm:text-xs md:text-[13px] lg:text-small font-extrabold text-[#3E5237]">
                {formattedPrice}
              </span>
            </div>

            {/* CTA Order Button */}
            <div className="pt-0.5">
              <Button
                variant="skeuo-peach-secondary"
                size="xs"
                onClick={(e) => {
                  e.stopPropagation();
                  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                  onOrder ? onOrder() : onClick?.();
                }}
                className="w-full text-[10px] sm:text-[11px] md:text-xs lg:text-small font-bold h-6.5 sm:h-7.5 md:h-8 lg:h-8.5 gap-1 lg:gap-1.5 rounded-lg sm:rounded-xl shadow-xs cursor-pointer active:scale-95"
              >
                <ShoppingBag className="size-3 sm:size-3.5 lg:size-3.5 text-[#3E5237]" />
                <span>Pesan Sekarang</span>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
};

export default CardProductDemo;
