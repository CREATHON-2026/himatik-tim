"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  Pencil,
  Copy,
  MoreVertical,
  Heart,
  Trash2,
  ExternalLink,
  Star,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    imageUrl?: string | null;
    stock?: number;
    isActive?: boolean;
    rating?: number;
    reviewCount?: number;
    likeCount?: number;
  };
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onDuplicate?: (id: string) => void;
  onToggleActive?: (id: string, active: boolean) => void;
  animationDelay?: number;
}

const formatRupiah = (price: number) => {
  const formatted = new Intl.NumberFormat("id-ID", {
    style: "decimal",
    maximumFractionDigits: 0,
  }).format(price);
  return `Rp${formatted}`;
};

export function ProductCard({
  product,
  onEdit,
  onDelete,
  onDuplicate,
  onToggleActive,
}: ProductCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const [isLiked, setIsLiked] = React.useState(false);
  const stock = product.stock ?? 0;
  const isActive = product.isActive ?? false;
  const rating = product.rating ?? 4.7;
  const reviewCount = product.reviewCount ?? 6;
  const initialLikes = product.likeCount ?? 8;
  const currentLikes = isLiked ? initialLikes + 1 : initialLikes;

  return (
    <motion.div
      whileHover={shouldReduceMotion ? {} : { y: -2, scale: 1.01 }}
      whileTap={shouldReduceMotion ? {} : { scale: 0.99 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="h-full"
    >
      {/* ─── Outer Card Frame (rounded-2xl with p-2 artisan paper styling) ─── */}
      <Card className="bg-[#FAF4EC] border border-[#D8C4A7]/70 rounded-2xl p-2 shadow-[0_2px_8px_rgba(120,100,70,0.06)] hover:border-[#B89A57]/60 hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full group relative overflow-hidden">
        {/* Soft Ambient Gloss Effect on Hover */}
        <div className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/15 to-transparent group-hover:translate-x-full transition-transform duration-1000 ease-out z-30" />

        {/* ─── 1. Framed Media / Photo Area ─── */}
        <div className="relative aspect-4/3 sm:aspect-square w-full overflow-hidden rounded-xl bg-[#F5E9D5]/40 border border-[#D8C4A7]/40">
          {/* Product Image with Zoom */}
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover object-center group-hover:scale-106 transition-transform duration-500 ease-out"
            />
          ) : (
            <div className="size-full flex items-center justify-center bg-linear-to-br from-[#FAF4EC] to-[#F5E9D5] text-[#78865C]">
              <span className="text-xs font-serif font-semibold">Buket Karya</span>
            </div>
          )}

          {/* Top-Left Status Badge Overlay (2x Bigger) */}
          <div className="absolute top-2 left-2 z-20">
            {isActive ? (
              stock > 0 ? (
                <Badge
                  variant="skeuo-forest"
                  className="shadow-sm text-xs sm:text-sm px-4 py-1 h-7 sm:h-8 rounded-xl font-bold tracking-wide"
                >
                  Aktif
                </Badge>
              ) : (
                <Badge
                  variant="skeuo-peach"
                  className="shadow-sm text-xs sm:text-sm px-4 py-1 h-7 sm:h-8 rounded-xl font-bold tracking-wide bg-[#B85B58] text-white"
                >
                  Stok Habis
                </Badge>
              )
            ) : (
              <Badge
                variant="skeuo-gold"
                className="shadow-sm text-xs sm:text-sm px-4 py-1 h-7 sm:h-8 rounded-xl font-bold tracking-wide"
              >
                Draft
              </Badge>
            )}
          </div>

          {/* Top-Right 3-Dots Vertical Menu */}
          <div className="absolute top-2 right-2 z-20">
            <DropdownMenu>
              <DropdownMenuTrigger
                className="size-8 rounded-full bg-white/85 hover:bg-white text-[#2D3829] flex items-center justify-center shadow-xs backdrop-blur-md outline-none cursor-pointer transition-all hover:scale-105"
                aria-label="Opsi produk"
              >
                <MoreVertical className="size-4" />
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="w-44 rounded-xl border border-[#D8C4A7]/60 bg-[#FAF4EC] p-1 shadow-lg"
              >
                <DropdownMenuItem
                  onClick={() => onEdit(product.id)}
                  className="cursor-pointer gap-2 rounded-lg text-xs font-medium text-[#2D3829] hover:bg-[#F5E9D5]"
                >
                  <Pencil className="size-4 text-[#78865C]" />
                  <span>Edit Produk</span>
                </DropdownMenuItem>

                {onDuplicate && (
                  <DropdownMenuItem
                    onClick={() => onDuplicate(product.id)}
                    className="cursor-pointer gap-2 rounded-lg text-xs font-medium text-[#2D3829] hover:bg-[#F5E9D5]"
                  >
                    <Copy className="size-4 text-[#78865C]" />
                    <span>Duplikat Produk</span>
                  </DropdownMenuItem>
                )}

                <DropdownMenuItem
                  render={<Link href={`/dashboard/products/${product.id}`} target="_blank" />}
                  className="cursor-pointer gap-2 rounded-lg text-xs font-medium text-[#2D3829] hover:bg-[#F5E9D5]"
                >
                  <ExternalLink className="size-4 text-[#78865C]" />
                  <span>Lihat Halaman</span>
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => onDelete(product.id)}
                  className="cursor-pointer gap-2 rounded-lg text-xs font-medium text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="size-4" />
                  <span>Hapus Produk</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Bottom-Right Wishlist / Like Counter Pill (♡ 8) */}
          <div className="absolute bottom-2 right-2 z-20">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setIsLiked(!isLiked);
              }}
              className="bg-white/85 hover:bg-white text-[#2D3829] backdrop-blur-md px-2 py-1 rounded-full shadow-xs flex items-center gap-1 text-xs font-medium outline-none cursor-pointer transition-all active:scale-95"
              title="Favorit"
            >
              <Heart
                className={cn(
                  "size-4 transition-colors",
                  isLiked ? "fill-rose-500 text-rose-500" : "text-[#78865C]"
                )}
              />
              <span className="text-xs font-medium text-[#2D3829]">
                {currentLikes}
              </span>
            </button>
          </div>
        </div>

        {/* ─── 2. Information Body ─── */}
        <div className="pt-2 px-1 space-y-1 flex-1 flex flex-col justify-between">
          <div>
            {/* Title */}
            <Link
              href={`/dashboard/products/${product.id}`}
              className="font-serif text-base font-bold text-[#2D3829] leading-snug block truncate hover:text-[#566B4D] transition-colors"
              title={product.name}
            >
              {product.name}
            </Link>

            {/* Price */}
            <div className="font-serif text-base font-bold text-[#2D3829] mt-0.5">
              {formatRupiah(product.price)}
            </div>

            {/* Rich Stock & Rating Row */}
            <div className="flex items-center justify-between gap-2 pt-1">
              {/* Stock info + Restock tag */}
              <div className="flex items-center gap-2 flex-wrap">
                {stock === 0 ? (
                  <>
                    <span className="flex items-center gap-1 text-xs font-bold text-rose-600">
                      <span className="size-2 rounded-full bg-rose-500 inline-block" />
                      Stok: 0
                    </span>
                    <span className="bg-[#EED5CA] text-[#A25044] text-[10px] font-semibold px-2 py-0.5 rounded-md">
                      Restock segera!
                    </span>
                  </>
                ) : (
                  <span className="flex items-center gap-1 text-xs text-[#78865C] font-medium">
                    <span className="size-2 rounded-full bg-emerald-600 inline-block" />
                    Stok: {stock}
                  </span>
                )}
              </div>

              {/* Rating on the Right */}
              <div className="flex items-center gap-1 text-xs text-[#78865C] shrink-0 font-medium">
                <Star className="size-4 fill-[#D4AF37] text-[#D4AF37]" />
                <span className="font-bold text-[#2D3829]">{rating}</span>
                <span>({reviewCount})</span>
              </div>
            </div>
          </div>

          {/* ─── 3. Inset Action Panel (Edit, Copy & Active Toggle) ─── */}
          <div className="bg-[#F5E9D5]/60 border border-[#D8C4A7]/50 rounded-xl p-2 flex items-center justify-between mt-2 shadow-2xs">
            {/* Action buttons (Left) */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onEdit(product.id)}
                className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold text-[#2D3829] hover:bg-white/80 transition-all active:scale-95 cursor-pointer"
                title="Edit Produk"
              >
                <Pencil className="size-4 text-[#78865C]" />
                <span>Edit</span>
              </button>

              {onDuplicate && (
                <button
                  type="button"
                  onClick={() => onDuplicate(product.id)}
                  className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold text-[#2D3829] hover:bg-white/80 transition-all active:scale-95 cursor-pointer"
                  title="Duplikat Produk"
                >
                  <Copy className="size-4 text-[#78865C]" />
                  <span>Copy</span>
                </button>
              )}
            </div>

            {/* Active Toggle Switch (Right) */}
            <div className="flex items-center">
              <Switch
                checked={isActive}
                onCheckedChange={(checked) => onToggleActive?.(product.id, checked)}
                className="data-[state=checked]:bg-[#3E5237]"
                aria-label="Status aktif produk"
              />
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
