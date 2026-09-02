"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ShieldCheck, Heart, Sparkles, Package, Award } from "lucide-react";
import { AdaptogenIngredient } from "./types";

interface InsideIngredientDetailsProps {
  ingredient: AdaptogenIngredient;
}

export const InsideIngredientDetails: React.FC<InsideIngredientDetailsProps> = ({
  ingredient,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // GSAP Kinetic Masked Blur & Slide Entrance on step change
  useGSAP(
    () => {
      if (!containerRef.current) return;

      const tl = gsap.timeline();

      tl.fromTo(
        containerRef.current.querySelectorAll("[data-anim='true']"),
        {
          y: 20,
          opacity: 0,
          filter: "blur(6px)",
        },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.5,
          stagger: 0.06,
          ease: "power3.out",
        }
      );
    },
    { dependencies: [ingredient.id], scope: containerRef }
  );

  const renderGlyph = () => {
    switch (ingredient.id) {
      case "kurasi":
        return <Award className="h-4 w-4 text-[#E76F61]" />;
      case "personalisasi":
        return <Heart className="h-4 w-4 text-[#8B7CF6]" />;
      case "escrow":
        return <ShieldCheck className="h-4 w-4 text-emerald-400" />;
      case "pengiriman":
        return <Package className="h-4 w-4 text-amber-400" />;
      default:
        return <Sparkles className="h-4 w-4 text-[#8B7CF6]" />;
    }
  };

  return (
    <div ref={containerRef} className="flex flex-col justify-center">
      {/* Step Number Tag */}
      <div
        data-anim="true"
        className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.24em] text-white/50 mb-2 will-change-[transform,opacity,filter]"
      >
        <span>STANDAR {ingredient.number} / 04</span>
      </div>

      {/* Big Bold Title in Masked Container */}
      <div className="overflow-hidden py-1">
        <h3
          data-anim="true"
          className="font-serif text-3xl font-light uppercase tracking-tight text-white sm:text-4xl md:text-5xl leading-[1.05] will-change-[transform,opacity,filter]"
        >
          {ingredient.name}
        </h3>
      </div>

      {/* Subtitle / Value Category */}
      <div
        data-anim="true"
        className="mt-3 flex items-center gap-2 text-white/70 will-change-[transform,opacity,filter]"
      >
        {renderGlyph()}
        <span className="font-sans text-xs sm:text-sm font-medium tracking-wide text-white/90">
          {ingredient.botanicalName}
        </span>
      </div>
    </div>
  );
};
