"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sparkles, ArrowRight, Gem, Gift, Flower2, Palette } from "lucide-react";
import { CardShowcaseSkeuo } from "@/components/shadcn-studio/card/card-showcase-skeuo";

/* ─── Category Filter Configuration ─── */
const CATEGORIES = [
  { id: "all", label: "Semua Karya", icon: Sparkles },
  { id: "flower", label: "Buket Bunga", icon: Flower2 },
  { id: "giftbox", label: "Custom Gift Box", icon: Gift },
  { id: "jewelry", label: "Handmade Jewelry", icon: Gem },
  { id: "art", label: "Art Prints & Cards", icon: Palette },
];

/* ─── Showcase Product Items (Matching Section 5 Visual) ─── */
interface ShowcaseProduct {
  id: string;
  title: string;
  category: string;
  categoryBadge: string;
  artisan: string;
  price: string;
  rating: number;
  reviewsCount: number;
  image: string;
  buttonText: string;
}

const SHOWCASE_PRODUCTS: ShowcaseProduct[] = [
  {
    id: "1",
    title: "Vintage Sage Bouquet",
    category: "flower",
    categoryBadge: "Buket Bunga",
    artisan: "Warm Bloom Artisan",
    price: "Rp 185.000",
    rating: 4.9,
    reviewsCount: 24,
    image: "/asset-landing/showcase-vintage-sage.webp",
    buttonText: "Pesan Buket",
  },
  {
    id: "2",
    title: "Graduation Gift Box",
    category: "giftbox",
    categoryBadge: "Custom Gift Box",
    artisan: "Hasanuddin Craft",
    price: "Rp 250.000",
    rating: 5.0,
    reviewsCount: 42,
    image: "/asset-landing/showcase-graduation-box.webp",
    buttonText: "Pesan Gift Box",
  },
  {
    id: "3",
    title: "Pearl Rose Necklace",
    category: "jewelry",
    categoryBadge: "Handmade Jewelry",
    artisan: "Karaeng Studio",
    price: "Rp 120.000",
    rating: 4.8,
    reviewsCount: 15,
    image: "/asset-landing/showcase-pearl-necklace.webp",
    buttonText: "Lihat Detail",
  },
  {
    id: "4",
    title: "Dried Bloom Terrarium",
    category: "flower",
    categoryBadge: "Buket Bunga",
    artisan: "Nerimbunan Hati",
    price: "Rp 140.000",
    rating: 4.9,
    reviewsCount: 31,
    image: "/asset-landing/showcase-dried-terrarium.webp",
    buttonText: "Pesan Buket",
  },
  {
    id: "5",
    title: "Custom Watercolor Card",
    category: "art",
    categoryBadge: "Art Prints & Cards",
    artisan: "ArtSpire Makassar",
    price: "Rp 45.000",
    rating: 5.0,
    reviewsCount: 18,
    image: "/asset-landing/showcase-watercolor-card.webp",
    buttonText: "Pesan Sekarang",
  },
  {
    id: "6",
    title: "Velvet Red Rose",
    category: "flower",
    categoryBadge: "Buket Bunga",
    artisan: "Makassar Flora",
    price: "Rp 160.000",
    rating: 5.0,
    reviewsCount: 88,
    image: "/asset-landing/showcase-velvet-rose.webp",
    buttonText: "Pesan Buket",
  },
];

export function SectionShowcase() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredProducts =
    activeCategory === "all"
      ? SHOWCASE_PRODUCTS
      : SHOWCASE_PRODUCTS.filter((item) => item.category === activeCategory);

  return (
    <section className="relative w-full overflow-hidden border-b border-[#D8C4A7]/30 bg-[#FAF4EC] pt-4 pb-6 sm:pt-6 sm:pb-4 md:pb-10">
      {/* BACKGROUND ART NOUVEAU GLOW & SOFT WATERCOLOR PATTERN */}
      <div className="pointer-events-none absolute top-1/3 left-1/2 h-180 w-180 -translate-x-1/2 -translate-y-1/2 bg-radial from-[#F5E9D5]/40 via-[#FAF4EC]/20 to-transparent blur-3xl" />

      {/* ARTWORK 1: TOP LEFT ROSE FRAME OVERLAY */}
      <div className="pointer-events-none absolute md:-top-2 md:-left-12 -top-12 -left-12  sm:top-42 sm:-left-12 z-0 opacity-45 hover:opacity-80 select-none">
        <Image
          src="/assets/cta-left-rose-frame.webp"
          alt="Top Left Rose Frame"
          width={380}
          height={380}
          unoptimized
          className="h-auto w-64 sm:w-80 md:w-96 object-contain"
        />
      </div>

      {/* ARTWORK 2: TOP RIGHT ROSE FRAME OVERLAY */}
      <div className="pointer-events-none absolute md:-top-12 top-24 -right-12  sm:top-40 sm:-right-12 -rotate-10 opacity-45 md:-right-12 z-0  select-none">
        <Image
          src="/assets/cta-right-rose-frame.webp"
          alt="Top Right Rose Frame"
          width={380}
          height={380}
          unoptimized
          className="h-auto w-64 sm:w-80 md:w-96 object-contain"
        />
      </div>

      {/* ARTWORK 3: BOTTOM LEFT FLOWERS OVERLAY */}
      <div className="pointer-events-none absolute -bottom-10 -right-8 z-0 opacity-75 select-none">
        <Image
          src="/assets/flowers-assets.webp"
          alt="Bottom Left Flowers"
          width={300}
          height={300}
          unoptimized
          className="h-auto w-56 sm:w-72 object-contain"
        />
      </div>

      {/* ARTWORK 4: BOTTOM RIGHT FLOWERS OVERLAY */}
      <div className="pointer-events-none absolute -bottom-10 -left-8 z-0 opacity-75 select-none">
        <Image
          src="/assets/flowers-assets.webp"
          alt="Bottom Right Flowers"
          width={300}
          height={300}
          unoptimized
          className="h-auto w-56 sm:w-72 -scale-x-100 object-contain"
        />
      </div>

      {/* MAIN CONTAINER */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center px-4 text-center sm:px-6 md:px-8">
        
        {/* 1. HEADER SECTION */}
        <div className=" flex max-w-full flex-col items-center">
          {/* EYEBROW BADGE */}
          <div className=" inline-flex mb-4 items-center gap-2 rounded-full border border-[#566B4D]/40 bg-[#F5E9D5] px-4 py-2 shadow-[inset_0_1px_2px_rgba(255,255,255,0.8),0_1px_3px_rgba(62,82,55,0.12)]">
            <Sparkles className="size-3.5 text-[#566B4D]" />
            <span className="font-sans text-[10px] font-bold tracking-[0.15em] text-[#3E5237] uppercase sm:text-xs">
              Galeri Karya Unik Makassar
            </span>
          </div>

          {/* HEADLINE H2 */}
          <h2 className="font-heading text-2xl leading-[1.15] font-bold tracking-tight text-[#3E5237] sm:text-4xl lg:text-5xl">
            Lebih dari Sekadar Bunga: <br className="hidden sm:inline" />
            Rumah Bagi Segala Ekspresi Kreatif.
          </h2>

          {/* ART NOUVEAU SHOWCASE FLOURISH SEPARATOR */}
          <Separator variant="showcase-flourish" className="my-0 sm:my-1" />

          {/* SUBHEADLINE NARRATIVE */}
          <p className="font-sans text-xs leading-relaxed font-medium text-[#4A5A42] sm:text-sm md:text-base max-w-3xl">
            Bicket adalah panggung bagi berbagai karya tangan kustom. Dari buket bunga menawan,
            perhiasan handmade personal, hingga custom gift box wisuda yang tak terlupakan.
          </p>
        </div>

        {/* 2. CATEGORY FILTER TABS (3D Embossed Skeuomorphic Pill Selector) */}
        <div className="mb-8 flex w-full max-w-full items-center justify-start sm:justify-center gap-3 overflow-x-auto pb-3 pt-1.5 no-scrollbar px-2">
          {CATEGORIES.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`group flex min-h-10 shrink-0 cursor-pointer items-center gap-2 rounded-full px-4.5 py-2.5 text-xs sm:text-sm transition-all duration-200 ${
                  isActive
                    ? "bg-linear-to-br from-[#566B4D] to-[#3E5237] text-[#FAF4EC] border-t border-l border-white/40 border-b-2 border-r-2 shadow-[3.5px_3.5px_0px_0px_#B89A57] -translate-y-0.5 font-bold"
                    : "subtle-paper-skeuo bg-[#F5E9D5] text-[#4A5A42] border border-[#E9D7BE] shadow-[2.5px_2.5px_0px_0px_#D8C4A7] hover:bg-[#FAF4EC] hover:text-[#3E5337] hover:border-[#D79C9A] hover:shadow-[3.5px_3.5px_0px_0px_#D79C9A] hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none font-semibold"
                }`}
              >
                <Icon
                  className={`size-4 transition-transform group-hover:scale-110 ${
                    isActive ? "text-[#EBC3A8] drop-shadow-xs" : "text-[#78865C]"
                  }`}
                />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* 3. PRODUCT SHOWCASE GRID (Consuming Reusable CardShowcaseSkeuo Component) */}
        <div className="grid w-full grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-3 md:gap-2 mb-4">
          {filteredProducts.map((product) => (
            <CardShowcaseSkeuo
              key={product.id}
              id={product.id}
              title={product.title}
              categoryBadge={product.categoryBadge}
              artisan={product.artisan}
              price={product.price}
              rating={product.rating}
              reviewsCount={product.reviewsCount}
              image={product.image}
              buttonText={product.buttonText}
              actionUrl="/market"
            />
          ))}
        </div>

        {/* 4. MARKETPLACE DISCOVERY LINK (Bottom CTA Block with 200% Enlarged Flower Mawar Line Artwork) */}
        <div className="relative mt-2 flex items-center justify-center gap-3 sm:gap-6 w-full max-w-7xl">

          {/* Centered Main Pill CTA Button */}
          <Link href="/market">
            <Button
              variant="skeuo-forest"
              size="lg"
              className="min-h-12 cursor-pointer rounded-full px-8 py-3.5 font-sans text-xs sm:text-sm md:text-base font-bold flex items-center gap-2.5 group shadow-md shrink-0"
            >
              <span>Lihat Seluruh Katalog di Market</span>
              <span className="text-[#EBC3A8] transition-colors">❀</span>
              <ArrowRight className="size-4 sm:size-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>

        </div>

      </div>
    </section>
  );
}

export default SectionShowcase;
