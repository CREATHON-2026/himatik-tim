"use client";

import React, { useRef } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useProducts } from "@/features/products/hooks/useProducts";
import CardProductDemo from "@/components/shadcn-studio/card/card-product";
import { Button } from "@/components/ui/button";

interface SimilarProductsCarouselProps {
  currentProductId: string;
  category: string;
}

export function SimilarProductsCarousel({
  currentProductId,
  category,
}: SimilarProductsCarouselProps) {
  const router = useRouter();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const { data, isLoading } = useProducts({
    flowerType: category || null,
    limit: 8,
  });

  const similarProducts = (data?.products || []).filter(
    (p) => p.id !== currentProductId
  );

  const handleScroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -320 : 320;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (!isLoading && similarProducts.length === 0) {
    return null;
  }

  return (
    <section className="flex flex-col gap-4 pt-6 pb-2 border-t border-[#78865C]/20 select-none">
      {/* Section Header with Title & Navigation Arrows */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="font-heading text-xl md:text-2xl font-bold text-[#3E5237]">
            Produk Serupa
          </h3>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#FAF6F0] border border-[#78865C]/20 text-[#78865C]">
            {category}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="skeuo-paper"
            size="icon-xs"
            onClick={() => handleScroll("left")}
            aria-label="Scroll left"
            className="cursor-pointer h-8 w-8 rounded-full"
          >
            <ChevronLeft className="w-4 h-4 text-[#3E5237]" />
          </Button>
          <Button
            variant="skeuo-paper"
            size="icon-xs"
            onClick={() => handleScroll("right")}
            aria-label="Scroll right"
            className="cursor-pointer h-8 w-8 rounded-full"
          >
            <ChevronRight className="w-4 h-4 text-[#3E5237]" />
          </Button>
        </div>
      </div>

      {/* Horizontal Carousel Container */}
      <div
        ref={scrollContainerRef}
        className="flex gap-4 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scrollbar-none -mx-1 px-1 scroll-smooth"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {isLoading ? (
          Array.from({ length: 4 }).map((_, idx) => (
            <div
              key={`skeleton-${idx}`}
              className="w-[260px] sm:w-[280px] h-[360px] flex-shrink-0 snap-start rounded-[20px] bg-[#FAF4EC] border border-[#78865C]/15 p-4 animate-pulse flex flex-col gap-3"
            >
              <div className="w-full aspect-square rounded-[16px] bg-[#78865C]/10" />
              <div className="h-4 w-3/4 bg-[#78865C]/10 rounded" />
              <div className="h-3 w-1/2 bg-[#78865C]/10 rounded" />
              <div className="mt-auto h-6 w-1/3 bg-[#78865C]/10 rounded" />
            </div>
          ))
        ) : (
          similarProducts.map((product) => (
            <div
              key={product.id}
              className="w-[260px] sm:w-[280px] flex-shrink-0 snap-start transition-transform duration-200 hover:-translate-y-1"
            >
              <CardProductDemo
                name={product.name}
                creator={product.shopName}
                creatorAvatar={product.creatorAvatar ?? undefined}
                price={product.price}
                image={product.imageUrl ?? undefined}
                rating={parseFloat(product.averageRating.toFixed(1))}
                ratingCount={product.reviewCount}
                salesCount={product.salesCount}
                badge={product.badge}
                district={product.district ?? undefined}
                onClick={() => router.push(`/market/products/${product.id}`)}
                onOrder={() => router.push(`/market/products/${product.id}`)}
              />
            </div>
          ))
        )}
      </div>
    </section>
  );
}
