"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { toast } from "sonner";

interface ImageGalleryProps {
  imageUrl: string | null;
  gallery: string[];
  averageRating?: number;
}

export function ImageGallery({
  imageUrl,
  gallery,
}: ImageGalleryProps) {
  const fallbackGallery = [
    "/aset/produk-soft-lilac.jpg",
    "/aset/produk-thumb-1.jpg",
    "/aset/produk-thumb-2.jpg",
    "/aset/produk-thumb-3.jpg",
    "/aset/produk-thumb-4.jpg",
  ];

  const dbImages = [imageUrl, ...gallery].filter((img): img is string => !!img);
  const images = dbImages.length > 0 ? dbImages : fallbackGallery;

  const [activeIndex, setActiveIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleToggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast.success(
      !isWishlisted
        ? "Ditambahkan ke daftar favorit!"
        : "Dihapus dari daftar favorit!"
    );
  };

  return (
    <div className="flex flex-col gap-4 w-full select-none">
      {/* 1. Main Viewport: Clean 4:3 / 1:1 Aspect Ratio */}
      <div className="relative aspect-[4/3] sm:aspect-[16/13] w-full overflow-hidden rounded-3xl border border-[#E7E5E4] bg-[#F5F3FF] shadow-2xs group">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, scale: 0.99 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.99 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-full w-full"
          >
            <Image
              src={images[activeIndex]}
              alt={`Product Image ${activeIndex + 1}`}
              fill
              unoptimized
              className="object-cover object-center"
              priority={activeIndex === 0}
            />
          </motion.div>
        </AnimatePresence>

        {/* Floating Heart Favorite Button Top Right */}
        <button
          onClick={handleToggleWishlist}
          className={`absolute top-4 right-4 z-20 size-10 rounded-full border border-white/80 bg-white/90 backdrop-blur-xs flex items-center justify-center shadow-md transition-all cursor-pointer hover:scale-105 active:scale-95 ${
            isWishlisted ? "text-rose-500 bg-rose-50" : "text-[#78716C] hover:text-rose-500"
          }`}
          title="Simpan ke Favorit"
        >
          <Heart className={`size-5 ${isWishlisted ? "fill-rose-500" : ""}`} />
        </button>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute top-1/2 left-4 z-20 -translate-y-1/2 size-10 rounded-full bg-white/90 backdrop-blur-xs border border-[#E7E5E4] flex items-center justify-center text-[#111827] shadow-md transition-all hover:bg-white hover:scale-105 active:scale-95 cursor-pointer"
              aria-label="Previous image"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              onClick={handleNext}
              className="absolute top-1/2 right-4 z-20 -translate-y-1/2 size-10 rounded-full bg-white/90 backdrop-blur-xs border border-[#E7E5E4] flex items-center justify-center text-[#111827] shadow-md transition-all hover:bg-white hover:scale-105 active:scale-95 cursor-pointer"
              aria-label="Next image"
            >
              <ChevronRight className="size-5" />
            </button>
          </>
        )}

        {/* Counter Badge Bottom Right */}
        <div className="absolute bottom-4 right-4 z-20 px-3 py-1 rounded-full bg-white/85 backdrop-blur-xs border border-[#E7E5E4] shadow-xs text-xs font-semibold text-[#111827]">
          {activeIndex + 1} / {images.length}
        </div>
      </div>

      {/* 2. Thumbnails Row (4 Columns Grid) */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-3 sm:gap-4 w-full">
          {images.slice(0, 4).map((img, idx) => {
            const isActive = activeIndex === idx;

            return (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`relative aspect-[4/3] sm:aspect-square w-full overflow-hidden rounded-2xl transition-all duration-200 cursor-pointer active:scale-95 ${
                  isActive
                    ? "border-2 border-[#6355D9] ring-2 ring-[#6355D9]/20 shadow-xs scale-[1.02]"
                    : "border border-[#E7E5E4] opacity-80 hover:opacity-100 hover:border-[#DDD6FE]"
                }`}
              >
                <Image
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  fill
                  unoptimized
                  className="object-cover object-center"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
