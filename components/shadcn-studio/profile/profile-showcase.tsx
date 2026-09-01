"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { VerificationBadge } from "@/components/ui/verification-badge";
import {
  MapPin,
  Clock,
  Pencil,
  Store,
  Heart,
  Calendar,
  Camera,
  Star,
  Users,
  ShoppingBag,
  CheckCircle2,
  Truck,
  Sparkles,
  Gift,
  Award,
  ChevronDown,
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import CardProductDemo from "@/components/shadcn-studio/card/card-product";
import { ReviewSection } from "@/features/products/components/ReviewSection";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";

interface ProfileShowcaseProps {
  profile: {
    shopName: string;
    photoUrl?: string | null;
    bannerUrl?: string | null;
    bio?: string | null;
    whatsapp?: string | null;
    instagram?: string | null;
    facebook?: string | null;
    address?: string | null;
    openingHours?: string | null;
    verificationStatus?: "PENDING" | "APPROVED" | "REJECTED";
    createdAt?: string | Date;
    products?: import("@/features/creator-profile/types").CreatorProfileProduct[];
  };
  onEdit: () => void;
  isOwner?: boolean;
  userEmail?: string;
  className?: string;
}

export function ProfileShowcase({
  profile,
  onEdit,
  isOwner = true,
  userEmail = "",
  className,
}: ProfileShowcaseProps) {
  const [activeCategory, setActiveCategory] = React.useState("Semua Produk");
  const [sortBy, setSortBy] = React.useState("Terbaru");
  const [isSortedOpen, setIsSortedOpen] = React.useState(false);
  const [isLiked, setIsLiked] = React.useState(false);
  const [isReviewsOpen, setIsReviewsOpen] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<"profil" | "katalog">("profil");

  const getWaLink = (num: string) => {
    const cleaned = num.replace(/[^0-9]/g, "");
    const formatted = cleaned.startsWith("0")
      ? "62" + cleaned.slice(1)
      : cleaned;
    return `https://wa.me/${formatted}`;
  };

  const getIgLink = (username: string) => {
    const cleaned = username.replace("@", "").trim();
    return `https://instagram.com/${cleaned}`;
  };

  const getFbLink = (name: string) => {
    if (name.startsWith("http")) return name;
    return `https://facebook.com/${encodeURIComponent(name.trim())}`;
  };

  // Format join date dynamically
  const joinDateText = profile.createdAt
    ? format(new Date(profile.createdAt), "MMM yyyy", { locale: id })
    : "Jan 2023";

  // Real Products or Fallback to Mock list based on mockup
  const products = (profile.products && profile.products.length > 0)
    ? profile.products.map((prod) => ({
        name: prod.name,
        creator: profile.shopName,
        price: prod.price,
        image: prod.imageUrl || "https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=600&q=80",
        rating: prod.averageRating || 5.0,
        ratingCount: prod.reviewCount || 0,
        sizeBadge: prod.sizeBadge || "Sedang (M)",
        typeBadge: prod.typeBadge || "Fresh Cut",
      }))
    : [
        {
          name: "Peach Romance Bouquet",
          creator: profile.shopName,
          price: "Rp 450.000",
          image: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=600&q=80",
          rating: 4.9,
          ratingCount: 128,
          sizeBadge: "Sedang (M)",
          typeBadge: "Fresh Cut",
        },
        {
          name: "Tulip Whisper Bouquet",
          creator: profile.shopName,
          price: "Rp 380.000",
          image: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&w=600&q=80",
          rating: 4.8,
          ratingCount: 96,
          sizeBadge: "Sedang (M)",
          typeBadge: "Fresh Cut",
        },
        {
          name: "Blush Box Premium",
          creator: profile.shopName,
          price: "Rp 520.000",
          image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=600&q=80",
          rating: 4.9,
          ratingCount: 74,
          sizeBadge: "Besar (L)",
          typeBadge: "Premium Box",
        },
        {
          name: "Blue Serenity Bouquet",
          creator: profile.shopName,
          price: "Rp 480.000",
          image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=600&q=80",
          rating: 4.8,
          ratingCount: 92,
          sizeBadge: "Sedang (M)",
          typeBadge: "Fresh Cut",
        },
        {
          name: "Flower Box with Love",
          creator: profile.shopName,
          price: "Rp 550.000",
          image: "https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?auto=format&fit=crop&w=600&q=80",
          rating: 4.9,
          ratingCount: 66,
          sizeBadge: "Besar (L)",
          typeBadge: "Premium Box",
        },
      ];

  const categories = [
    "Semua Produk",
    "Buket Bunga",
    "Standing Flower",
    "Box Flower",
    "Fresh Flower",
    "Promo",
  ];

  // Map category keywords to filter active products list
  const filteredProducts = products.filter((prod) => {
    if (activeCategory === "Semua Produk") return true;
    return prod.name.toLowerCase().includes(activeCategory.toLowerCase().replace(" flower", "").replace(" buket", ""));
  });

  const getNumericPrice = (p: string | number): number => {
    if (typeof p === "number") return p;
    return parseInt(p.replace(/[^0-9]/g, "")) || 0;
  };

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "Termahal") {
      return getNumericPrice(b.price) - getNumericPrice(a.price);
    }
    if (sortBy === "Termurah") {
      return getNumericPrice(a.price) - getNumericPrice(b.price);
    }
    return 0; // Default
  });

  const dummyReviews = [
    {
      id: "rev-1",
      productId: "prod-1",
      buyerName: "Rina Kartika",
      rating: 5,
      comment: "Bunganya segar banget dan rangkaiannya cantik sesuai foto! Pengiriman juga cepat, terima kasih Flora Studio 🌺",
      createdAt: "2026-07-11T12:00:00.000Z",
    },
    {
      id: "rev-2",
      productId: "prod-2",
      buyerName: "Andi Pratama",
      rating: 5,
      comment: "Sangat puas! Packaging rapi dan bunga tetap segar saat sampai.",
      createdAt: "2026-07-06T12:00:00.000Z",
    },
  ];

  return (
    <div className={cn("w-full space-y-6 select-none", className)}>
      {/* Banner Section (Bleeds out to main container borders) */}
      <div className="relative -mx-5 -mt-5 h-48 w-[calc(100%+2.5rem)] overflow-hidden bg-gradient-to-r from-[#3E5237] to-[#566B4D] select-none sm:-mx-7 sm:-mt-7 sm:h-64 sm:w-[calc(100%+3.5rem)] md:-mx-8 md:-mt-8 md:w-[calc(100%+4rem)]">
        {profile.bannerUrl ? (
          <Image
            src={profile.bannerUrl}
            alt={`Banner Toko ${profile.shopName}`}
            fill
            className="animate-fade-in object-cover duration-300"
            priority
            sizes="100vw"
          />
        ) : (
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#B89A57_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-15" />
        )}
        {/* Decorative double border on the top-right corner of the banner */}
        <div className="pointer-events-none absolute top-0 right-0 m-3 h-32 w-32 rounded-tr-xl border-t-[3px] border-r-[3px] border-double border-[#B89A57]/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      </div>

      {/* ── CARD UTAMA: OVERLAPPING UNIFIED DETAIL & TABS CONTAINER ── */}
      <div className="skeuo-flat bg-card relative z-10 -mt-12 flex w-full flex-col justify-between rounded-t-[24px] border-t-2 border-r-2 border-b-0 border-l-2 border-[#B89A57]/60 shadow-md sm:-mt-16">
        {/* Part A: Profile Info Header */}
        <div className="flex flex-col items-center justify-between gap-6 px-5 pt-4 pb-6 sm:px-8 sm:pt-6 sm:pb-7 md:flex-row md:items-start">
          {/* Left: Logo & Details */}
          <div className="flex w-full flex-col items-center gap-5 text-center sm:flex-row sm:items-start sm:text-left md:w-auto">
            {/* Logo Wrapper (Elevated Floating Overlay) */}
            <div
              role="button"
              onClick={isOwner ? onEdit : undefined}
              className={cn(
                "group/logo relative z-20 -mt-16 flex size-32 shrink-0 items-center justify-center overflow-hidden rounded-full border-[4px] border-[#FAF4EC] bg-[#FAF4EC] shadow-xl ring-2 ring-[#B89A57]/50 sm:-mt-20 sm:size-40",
                isOwner && "cursor-pointer transition-transform active:scale-98"
              )}
            >
              {profile.photoUrl ? (
                <Image
                  src={profile.photoUrl}
                  alt={`Logo ${profile.shopName}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 128px, 160px"
                />
              ) : (
                <Store className="text-muted-foreground/60 size-16" />
              )}

              {/* Camera icon overlay if Owner */}
              {isOwner && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/25 opacity-0 transition-opacity duration-200 group-hover/logo:opacity-100">
                  <Camera className="size-6 text-white" />
                </div>
              )}
              {/* Gold Verification badge icon overlay */}
              <div className="absolute bottom-1 right-1 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#566B4D] border-2 border-[#FAF4EC] flex items-center justify-center shadow-md">
                <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#B89A57]" />
              </div>
            </div>

            {/* Shop Details */}
            <div className="space-y-1.5 pt-1">
              <div className="flex flex-col items-center justify-center gap-2 sm:flex-row sm:justify-start">
                <h1 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-neutral-800">
                  {profile.shopName}
                </h1>
                <VerificationBadge
                  status={profile.verificationStatus ?? "PENDING"}
                />
              </div>

              <p className="text-neutral-500 text-xs leading-relaxed font-medium italic sm:text-sm">
                {profile.bio || "Merangkai bunga, menyampaikan rasa 🌸"}
              </p>

              {/* Meta details */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1.5 text-xs text-neutral-400 font-sans pt-1">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#78865C]" />
                  {profile.address ? profile.address.split(",")[0] : "Makassar, Sulawesi Selatan"}
                </span>
                <span className="hidden sm:inline text-neutral-200">•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#78865C]" />
                  Bergabung sejak {joinDateText}
                </span>
              </div>
            </div>
          </div>

          {/* Right: CTA Actions */}
          <div className="flex sm:flex-row md:flex-col gap-3 justify-center md:justify-start items-center md:items-end shrink-0 pt-1">
            <Button
              onClick={() => setIsLiked(!isLiked)}
              className={`h-10 px-6 rounded-full font-semibold flex items-center gap-2 transition-all duration-200 active:scale-95 shadow-sm ${
                isLiked
                  ? "bg-[#FAF4EC] hover:bg-[#FAF6F0] text-[#78865C] border border-[#78865C]/30"
                  : "bg-[#566B4D] hover:bg-[#3E5237] text-white"
              }`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? "fill-[#78865C] text-[#78865C]" : "fill-white text-white"}`} />
              <span>{isLiked ? "Diikuti" : "Ikuti Toko"}</span>
            </Button>
            <Button
              variant="skeuo-paper"
              className="h-10 px-6 rounded-full font-semibold flex items-center gap-2 cursor-pointer border shadow-xs"
              onClick={onEdit}
            >
              <Pencil className="w-4 h-4 text-neutral-600" />
              <span>Edit Profil Toko</span>
            </Button>
          </div>
        </div>

        {/* 6-Column Credibility Bar (Stats) */}
        <div className="mx-6 sm:mx-8 mb-6 p-4.5 bg-[#FAF6F0] border border-[#78865C]/20 rounded-2xl shadow-inner grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-y-4 gap-x-2">
          {/* Stat 1 */}
          <div className="flex items-center gap-2.5 justify-center md:justify-start md:border-r border-[#78865C]/10 pr-2">
            <Star className="w-5 h-5 text-amber-500 fill-amber-500 shrink-0" />
            <div className="flex flex-col">
              <span className="text-sm font-bold text-neutral-800 font-serif leading-tight">4.9</span>
              <span className="text-[10px] text-neutral-400 font-sans">Rating Toko</span>
            </div>
          </div>
          {/* Stat 2 */}
          <div className="flex items-center gap-2.5 justify-center md:justify-start md:border-r border-[#78865C]/10 pr-2">
            <Users className="w-5 h-5 text-[#78865C] shrink-0" />
            <div className="flex flex-col">
              <span className="text-sm font-bold text-neutral-800 font-serif leading-tight">1.248</span>
              <span className="text-[10px] text-neutral-400 font-sans">Pengikut</span>
            </div>
          </div>
          {/* Stat 3 */}
          <div className="flex items-center gap-2.5 justify-center md:justify-start md:border-r border-[#78865C]/10 pr-2">
            <ShoppingBag className="w-5 h-5 text-[#78865C] shrink-0" />
            <div className="flex flex-col">
              <span className="text-sm font-bold text-neutral-800 font-serif leading-tight">248</span>
              <span className="text-[10px] text-neutral-400 font-sans">Produk</span>
            </div>
          </div>
          {/* Stat 4 */}
          <div className="flex items-center gap-2.5 justify-center md:justify-start md:border-r border-[#78865C]/10 pr-2">
            <Clock className="w-5 h-5 text-[#78865C] shrink-0" />
            <div className="flex flex-col">
              <span className="text-sm font-bold text-neutral-800 font-serif leading-tight">98%</span>
              <span className="text-[10px] text-neutral-400 font-sans">Respon Cepat</span>
            </div>
          </div>
          {/* Stat 5 */}
          <div className="flex items-center gap-2.5 justify-center md:justify-start md:border-r border-[#78865C]/10 pr-2">
            <CheckCircle2 className="w-5 h-5 text-[#78865C] shrink-0" />
            <div className="flex flex-col">
              <span className="text-sm font-bold text-neutral-800 font-serif leading-tight">15K+</span>
              <span className="text-[10px] text-neutral-400 font-sans">Pesanan Selesai</span>
            </div>
          </div>
          {/* Stat 6 */}
          <div className="flex items-center gap-2.5 justify-center md:justify-start pr-2">
            <MapPin className="w-5 h-5 text-[#78865C] shrink-0" />
            <div className="flex flex-col">
              <span className="text-sm font-bold text-neutral-800 font-serif leading-tight truncate max-w-[80px]">Makassar</span>
              <span className="text-[10px] text-neutral-400 font-sans">Area Utama</span>
            </div>
          </div>
        </div>

        {/* USP Bar */}
        <div className="mx-6 sm:mx-8 mb-6 p-3.5 bg-[#FAF6F0]/60 border border-[#78865C]/15 rounded-2xl flex flex-wrap gap-4 items-center justify-between">
          {/* USP 1 */}
          <div className="flex items-center gap-2 text-xs">
            <div className="p-1.5 bg-[#FAF4EC] border border-[#78865C]/10 rounded-lg shadow-2xs">
              <Truck className="w-4 h-4 text-[#78865C]" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-neutral-800 text-[11px] leading-tight">Same Day Delivery</span>
              <span className="text-[9.5px] text-neutral-400 leading-tight">Pesan sebelum 15.00</span>
            </div>
          </div>
          {/* USP 2 */}
          <div className="flex items-center gap-2 text-xs">
            <div className="p-1.5 bg-[#FAF4EC] border border-[#78865C]/10 rounded-lg shadow-2xs">
              <Sparkles className="w-4 h-4 text-[#78865C]" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-neutral-800 text-[11px] leading-tight">Fresh Flower Guarantee</span>
              <span className="text-[9.5px] text-neutral-400 leading-tight">Bunga segar berkualitas</span>
            </div>
          </div>
          {/* USP 3 */}
          <div className="flex items-center gap-2 text-xs">
            <div className="p-1.5 bg-[#FAF4EC] border border-[#78865C]/10 rounded-lg shadow-2xs">
              <Award className="w-4 h-4 text-[#78865C]" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-neutral-800 text-[11px] leading-tight">Handmade Bouquet</span>
              <span className="text-[9.5px] text-neutral-400 leading-tight">Dirangkai oleh florist ahli</span>
            </div>
          </div>
          {/* USP 4 */}
          <div className="flex items-center gap-2 text-xs">
            <div className="p-1.5 bg-[#FAF4EC] border border-[#78865C]/10 rounded-lg shadow-2xs">
              <Gift className="w-4 h-4 text-[#78865C]" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-neutral-800 text-[11px] leading-tight">Premium Packaging</span>
              <span className="text-[9.5px] text-neutral-400 leading-tight">Dikemas cantik & aman</span>
            </div>
          </div>
          {/* USP 5 */}
          <div className="flex items-center gap-2 text-xs">
            <div className="p-1.5 bg-[#FAF4EC] border border-[#78865C]/10 rounded-lg shadow-2xs">
              <Star className="w-4 h-4 text-[#78865C] fill-[#78865C]/20" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-neutral-800 text-[11px] leading-tight">Top Rated Shop</span>
              <span className="text-[9.5px] text-neutral-400 leading-tight">4.9 dari 128 ulasan</span>
            </div>
          </div>

          {/* Tab Navigation Menu */}
          <div className="flex w-full bg-[#FAF6F0]/80 px-6 sm:px-8 border-t border-[#78865C]/15 select-none mt-2">
            <div className="flex gap-6 sm:gap-8">
              {[
                { id: "profil", label: "PROFIL TOKO" },
                { id: "katalog", label: "KATALOG PRODUK" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as "profil" | "katalog")}
                  className={`relative py-3 text-xs font-bold tracking-wider transition-colors cursor-pointer focus:outline-hidden ${
                    activeTab === tab.id
                      ? "text-[#566B4D]"
                      : "text-neutral-500 hover:text-[#566B4D]/80"
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-[3px] rounded-t-full bg-[#566B4D]" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ─── TAB CONTENT ─── */}
      {activeTab === "profil" && (
        <div className="space-y-6 animate-fade-in">
          {/* ─── GRID BARIS PERTAMA: TIGA KOLOM INFORMASI ─── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Kolom 1: Tentang Kami */}
            <div className="bg-[#FAF6F0] border border-[#78865C]/20 rounded-[24px] p-6 shadow-sm paper-texture relative overflow-hidden flex flex-col justify-between min-h-[220px]">
              <div className="relative z-10 flex flex-col gap-3">
                <h3 className="font-serif text-base font-bold text-neutral-800 border-b border-[#78865C]/10 pb-2">
                  Tentang Kami
                </h3>
                <p className="text-neutral-500 text-xs leading-relaxed font-sans max-w-[90%]">
                  {profile.bio ||
                    `${profile.shopName} adalah florist lokal pilihan yang berkomitmen menghadirkan rangkaian bunga berkualitas untuk setiap momen berharga Anda. Setiap buket dirangkai dengan cinta, kreativitas, dan bunga segar pilihan.`}
                </p>
              </div>
              <div className="relative z-10 pt-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full bg-[#FAF4EC]/70 hover:bg-[#FAF4EC] border-[#78865C]/25 text-neutral-700 px-4.5 text-xs font-semibold shadow-2xs"
                >
                  Baca Selengkapnya
                </Button>
              </div>
              {/* Real Botanical Gold Floral Asset Overlay */}
              <Image
                src="/assets/bio-asset.webp"
                alt=""
                width={200}
                height={200}
                className="absolute -right-3 -bottom-4 z-0 opacity-20 pointer-events-none select-none mix-blend-multiply h-auto w-auto object-contain"
              />
            </div>

            {/* Kolom 2: Informasi Toko */}
            <div className="bg-[#FAF6F0] border border-[#78865C]/20 rounded-[24px] p-6 shadow-sm paper-texture relative overflow-hidden flex flex-col min-h-[220px]">
              <h3 className="font-serif text-base font-bold text-neutral-800 border-b border-[#78865C]/10 pb-2 mb-3.5">
                Informasi Toko
              </h3>
              <div className="flex flex-col gap-3 text-xs font-sans text-neutral-600">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#78865C] shrink-0 mt-0.5" />
                  <div className="flex flex-col leading-snug">
                    <span className="font-semibold text-neutral-800 text-[11px]">Alamat</span>
                    <span className="text-neutral-500 text-[10.5px] mt-0.5">
                      {profile.address || "Jl. Boulevard, Ruko Emerald No. 12, Panakkukang, Makassar"}
                    </span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-[#78865C] shrink-0 mt-0.5" />
                  <div className="flex flex-col leading-snug">
                    <span className="font-semibold text-neutral-800 text-[11px]">Jam Operasional</span>
                    <span className="text-neutral-500 text-[10.5px] mt-0.5">
                      {profile.openingHours || "Senin - Sabtu: 08:00 - 20:00, Minggu: 10:00 - 18:00"}
                    </span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <Truck className="w-4 h-4 text-[#78865C] shrink-0 mt-0.5" />
                  <div className="flex flex-col leading-snug">
                    <span className="font-semibold text-neutral-800 text-[11px]">Area Pengiriman</span>
                    <span className="text-neutral-500 text-[10.5px] mt-0.5">Makassar, Gowa, Maros, Takalar</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Kolom 3: Hubungi Kami */}
            <div className="bg-[#FAF6F0] border border-[#78865C]/20 rounded-[24px] p-6 shadow-sm paper-texture relative overflow-hidden flex flex-col min-h-[220px]">
              <h3 className="font-serif text-base font-bold text-neutral-800 border-b border-[#78865C]/10 pb-2 mb-3.5">
                Hubungi Kami
              </h3>
              <div className="flex flex-col gap-3 text-xs font-sans text-neutral-600">
                {profile.whatsapp && (
                  <div className="flex items-center justify-between gap-3 border-b border-[#78865C]/5 pb-2">
                    <span className="text-neutral-400 font-medium">WhatsApp</span>
                    <a
                      href={getWaLink(profile.whatsapp)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-neutral-800 hover:text-[#78865C] underline"
                    >
                      {profile.whatsapp}
                    </a>
                  </div>
                )}
                {profile.instagram && (
                  <div className="flex items-center justify-between gap-3 border-b border-[#78865C]/5 pb-2">
                    <span className="text-neutral-400 font-medium">Instagram</span>
                    <a
                      href={getIgLink(profile.instagram)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-neutral-800 hover:text-[#78865C] underline"
                    >
                      {profile.instagram.startsWith("@") ? profile.instagram : `@${profile.instagram}`}
                    </a>
                  </div>
                )}
                {profile.facebook && (
                  <div className="flex items-center justify-between gap-3 border-b border-[#78865C]/5 pb-2">
                    <span className="text-neutral-400 font-medium">Facebook</span>
                    <a
                      href={getFbLink(profile.facebook)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-neutral-800 hover:text-[#78865C] underline truncate max-w-[150px]"
                    >
                      {profile.facebook}
                    </a>
                  </div>
                )}
                <div className="flex items-center justify-between gap-3 pb-1">
                  <span className="text-neutral-400 font-medium">Email</span>
                  <a
                    href={`mailto:${userEmail || "hello@florastudio.id"}`}
                    className="font-bold text-neutral-800 hover:text-[#78865C] underline truncate max-w-[150px]"
                  >
                    {userEmail || "hello@florastudio.id"}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* ─── GRID BARIS KEDUA: KEBUTUHAN LAIN & ULASAN ─── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {/* Kolom 1: Galeri Toko */}
            <div className="bg-[#FAF6F0] border border-[#78865C]/20 rounded-[24px] p-6 shadow-sm paper-texture flex flex-col justify-between min-h-[350px]">
              <div className="flex flex-col gap-4">
                <h3 className="font-serif text-base font-bold text-neutral-800 border-b border-[#78865C]/10 pb-2">
                  Galeri Toko
                </h3>
                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=300&h=300&fit=crop",
                    "https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=300&h=300&fit=crop",
                    "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=300&h=300&fit=crop",
                    "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=300&h=300&fit=crop",
                  ].map((img, idx) => (
                    <div
                      key={idx}
                      className="relative aspect-square rounded-xl overflow-hidden border border-[#78865C]/15 bg-[#FAF6F0] shadow-2xs hover:scale-[1.03] transition-transform duration-200"
                    >
                      <Image
                        src={img}
                        alt={`galeri-${idx}`}
                        fill
                        sizes="(max-width: 640px) 50vw, 150px"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="pt-4">
                <Button variant="skeuo-paper" className="w-full text-xs font-semibold py-2">
                  Lihat Semua Galeri
                </Button>
              </div>
            </div>

            {/* Kolom 2 & 3: Ulasan Pelanggan */}
            <div className="md:col-span-2">
              <ReviewSection
                reviews={dummyReviews}
                averageRating={4.9}
                reviewCount={128}
                limit={3}
                onViewAll={() => setIsReviewsOpen(true)}
              />
            </div>
          </div>

          {/* Bottom Verification Footer Bar */}
          <div className="flex items-center justify-center gap-2 text-center text-xs text-neutral-400 border-t border-[#78865C]/10 pt-6 mt-4 font-sans">
            <div className="w-5 h-5 rounded-full bg-[#78865C]/10 border border-[#78865C]/25 flex items-center justify-center shrink-0 shadow-2xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#78865C]" />
            </div>
            <span>Toko ini telah diverifikasi dan diawasi oleh Bicket untuk pengalaman belanja yang aman.</span>
          </div>
        </div>
      )}

      {activeTab === "katalog" && (
        <div className="space-y-8 animate-fade-in">
          {/* Section: Produk Unggulan */}
          <div className="bg-[#FAF6F0] border border-[#78865C]/15 rounded-[24px] p-6 shadow-sm paper-texture flex flex-col gap-4">
            <div className="border-b border-[#78865C]/10 pb-3">
              <span className="block text-[10px] font-bold tracking-wider text-[#B89A57] uppercase select-none">
                Artisan Choice
              </span>
              <h3 className="font-serif text-base font-bold text-neutral-800">
                Produk Unggulan
              </h3>
            </div>
            {sortedProducts.length === 0 ? (
              <div className="py-8 text-center">
                <span className="text-neutral-400 text-sm font-serif">Belum ada produk unggulan</span>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {sortedProducts.slice(0, 4).map((prod) => (
                  <CardProductDemo
                    key={prod.name}
                    name={prod.name}
                    creator={prod.creator}
                    price={prod.price}
                    image={prod.image}
                    rating={prod.rating}
                    ratingCount={prod.ratingCount}
                    sizeBadge={prod.sizeBadge}
                    typeBadge={prod.typeBadge}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Section: Semua Produk */}
          <div className="bg-[#FAF6F0] border border-[#78865C]/15 rounded-[24px] p-6 shadow-sm paper-texture flex flex-col gap-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-b border-[#78865C]/10 pb-3 select-none">
              <div className="space-y-1 text-center md:text-left">
                <span className="block text-[10px] font-bold tracking-wider text-[#B89A57] uppercase">
                  Our Collection
                </span>
                <h3 className="font-serif text-base font-bold text-neutral-800">
                  Semua Produk
                </h3>
              </div>

              {/* Sorting Dropdown */}
              <div className="relative shrink-0">
                <Button
                  variant="skeuo-paper"
                  className="h-9.5 px-4 flex items-center gap-1.5 text-xs font-semibold cursor-pointer border shadow-xs"
                  onClick={() => setIsSortedOpen(!isSortedOpen)}
                >
                  Urutkan: {sortBy} <ChevronDown className="w-3.5 h-3.5" />
                </Button>
                {isSortedOpen && (
                  <div className="absolute right-0 bottom-11 z-30 w-36 bg-[#FAF6F0] border border-[#78865C]/20 rounded-xl shadow-md p-1.5 flex flex-col gap-1 paper-texture animate-fadeIn">
                    {["Terbaru", "Termahal", "Termurah"].map((opt) => (
                      <button
                        key={opt}
                        onClick={() => {
                          setSortBy(opt);
                          setIsSortedOpen(false);
                        }}
                        className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                          sortBy === opt
                            ? "bg-[#78865C]/10 text-neutral-800 font-bold"
                            : "text-neutral-600 hover:bg-[#FAF4EC]"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Category Filter Tags */}
            <div className="flex flex-wrap gap-2.5 justify-center md:justify-start">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all border cursor-pointer ${
                    activeCategory === cat
                      ? "bg-[#566B4D] border-[#566B4D] text-white shadow-sm"
                      : "bg-[#FAF6F0] border-[#78865C]/20 text-[#78865C] hover:bg-[#FAF4EC]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Grid of Product Cards */}
            {sortedProducts.length === 0 ? (
              <div className="py-12 text-center flex flex-col items-center justify-center">
                <span className="text-neutral-400 text-sm font-serif">Belum ada produk untuk kategori ini</span>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {sortedProducts.map((prod) => (
                  <CardProductDemo
                    key={prod.name}
                    name={prod.name}
                    creator={prod.creator}
                    price={prod.price}
                    image={prod.image}
                    rating={prod.rating}
                    ratingCount={prod.ratingCount}
                    sizeBadge={prod.sizeBadge}
                    typeBadge={prod.typeBadge}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Bottom Verification Footer Bar */}
      <div className="flex items-center justify-center gap-2 text-center text-xs text-neutral-400 border-t border-[#78865C]/10 pt-6 mt-4 font-sans">
        <div className="w-5 h-5 rounded-full bg-[#78865C]/10 border border-[#78865C]/25 flex items-center justify-center shrink-0 shadow-2xs">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#78865C]" />
        </div>
        <span>Toko ini telah diverifikasi dan diawasi oleh Bicket untuk pengalaman belanja yang aman.</span>
      </div>

      {/* Slide-over Drawer for All Reviews */}
      <Drawer open={isReviewsOpen} onOpenChange={setIsReviewsOpen} direction="right">
        <DrawerContent className="p-6 bg-[#FAF4EC] border-l border-[#78865C]/20 shadow-xl paper-texture h-full w-full sm:!w-[50vw] sm:!max-w-[50vw] overflow-y-auto">
          <DrawerHeader className="border-b border-[#78865C]/10 pb-4 mb-4">
            <DrawerTitle className="font-serif text-lg font-bold text-neutral-800">
              Ulasan Pelanggan (128)
            </DrawerTitle>
            <DrawerDescription className="text-xs text-neutral-400 font-sans mt-1">
              Semua ulasan dan bintang pembeli untuk {profile.shopName}
            </DrawerDescription>
          </DrawerHeader>
          <div className="flex-1 overflow-y-auto pr-1">
            <ReviewSection
              reviews={dummyReviews}
              averageRating={4.9}
              reviewCount={128}
            />
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
