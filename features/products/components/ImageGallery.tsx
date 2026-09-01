"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
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
  const images = [imageUrl, ...gallery].filter((img): img is string => !!img);
  const [activeIndex, setActiveIndex] = useState(0);

  if (images.length === 0) {
    return (
      <div className="flex aspect-square w-full items-center justify-center rounded-[26px] border border-[#78865C]/20 bg-[#FAF4EC] paper-skeuo shadow-inner">
        <span className="font-heading text-sm text-[#78865C]">
          Gambar tidak tersedia
        </span>
      </div>
    );
  }

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="flex flex-col gap-3 sm:gap-3.5 w-full select-none">
      {/* 1. Main Viewport: Clean 1:1 Square with Soft Rounded Corners */}
      <div className="relative aspect-square w-full overflow-hidden rounded-art-nouveau sm:rounded-[28px] border border-[#78865C]/15 bg-[#FAF6F0] shadow-[0_10px_35px_rgba(62,82,55,0.08)] group">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, scale: 0.985 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.985 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-full w-full"
          >
            <Image
              src={images[activeIndex]}
              alt={`Product Image ${activeIndex + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 60vw"
              priority={activeIndex === 0}
            />
          </motion.div>
        </AnimatePresence>

        {/* Subtle Fine-line Inner Highlight Border */}
        <div className="pointer-events-none absolute inset-0 z-10 rounded-art-nouveau sm:rounded-[28px] shadow-[inset_0_1px_2px_rgba(255,255,255,0.4)]" />

        {/* Maximize Button: Minimal Glass Touch */}
        <button
          onClick={() => toast.info("Fitur Zoom/Fullscreen akan segera hadir!")}
          className="absolute top-3.5 right-3.5 z-20 cursor-pointer rounded-full bg-[#FAF4EC]/85 p-2 text-[#3E5237] shadow-sm backdrop-blur-xs transition-all hover:bg-[#FAF4EC] hover:scale-105 active:scale-95 opacity-0 group-hover:opacity-100 sm:opacity-90"
          aria-label="Zoom image"
        >
          <Maximize2 className="h-4 w-4" />
        </button>

        {/* Navigation Arrows: Low-Profile Glass on Hover */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute top-1/2 left-3 z-20 -translate-y-1/2 cursor-pointer rounded-full bg-[#FAF4EC]/85 p-2 text-[#3E5237] shadow-md backdrop-blur-xs transition-all hover:bg-[#FAF4EC] hover:scale-105 active:scale-95 opacity-0 group-hover:opacity-100"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-4.5 w-4.5" />
            </button>
            <button
              onClick={handleNext}
              className="absolute top-1/2 right-3 z-20 -translate-y-1/2 cursor-pointer rounded-full bg-[#FAF4EC]/85 p-2 text-[#3E5237] shadow-md backdrop-blur-xs transition-all hover:bg-[#FAF4EC] hover:scale-105 active:scale-95 opacity-0 group-hover:opacity-100"
              aria-label="Next image"
            >
              <ChevronRight className="h-4.5 w-4.5" />
            </button>
          </>
        )}
      </div>

      {/* 2. Thumbnails: Direct Clean Grid Under Main Photo */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 sm:grid-cols-4 gap-2.5 sm:gap-3.5 w-full">
          {images.slice(0, 4).map((img, idx) => {
            const isActive = activeIndex === idx;
            const isLastVisible = idx === 3 && images.length > 4;

            return (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`relative aspect-square w-full overflow-hidden rounded-xl sm:rounded-2xl transition-all duration-200 cursor-pointer active:scale-95 shadow-2xs ${
                  isActive
                    ? "border-2 border-[#3E5237] ring-2 ring-[#3E5237]/20 shadow-xs scale-[1.02]"
                    : "border border-[#78865C]/20 opacity-75 hover:opacity-100 hover:border-[#78865C]/40"
                }`}
              >
                <Image
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  fill
                  className="object-cover"
                  sizes="120px"
                />
                {isLastVisible && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/60 font-sans text-xs font-bold text-[#FAF4EC] backdrop-blur-[1px]">
                    +{images.length - 3}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
