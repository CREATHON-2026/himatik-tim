"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Leaf, Sparkles, Sprout, Trees } from "lucide-react";
import { AdaptogenIngredient } from "./types";

interface InsideIngredientDetailsProps {
  ingredient: AdaptogenIngredient;
}

export const InsideIngredientDetails: React.FC<InsideIngredientDetailsProps> = ({
  ingredient,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // GSAP Kinetic Masked Blur & Slide Entrance on ingredient change
  useGSAP(
    () => {
      if (!containerRef.current) return;

      const tl = gsap.timeline();

      tl.fromTo(
        containerRef.current.querySelectorAll("[data-anim='true']"),
        {
          y: 24,
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
    switch (ingredient.glyph) {
      case "leaf":
        return <Leaf className="h-3.5 w-3.5 text-[#BCD3D8]" />;
      case "mushroom":
        return <Trees className="h-3.5 w-3.5 text-[#E8C9A0]" />;
      case "root":
        return <Sprout className="h-3.5 w-3.5 text-[#E8C9A0]" />;
      case "herb":
        return <Sparkles className="h-3.5 w-3.5 text-[#C9B5C8]" />;
      default:
        return <Leaf className="h-3.5 w-3.5 text-[#BCD3D8]" />;
    }
  };

  return (
    <div ref={containerRef} className="flex flex-col justify-center">
      {/* Big Bold Ingredient Title in Masked Container */}
      <div className="overflow-hidden py-1">
        <h3
          data-anim="true"
          className="font-sans text-3xl font-black uppercase tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl leading-[0.95] will-change-[transform,opacity,filter]"
        >
          {ingredient.name}
        </h3>
      </div>

      {/* Botanical Latin Binomial Subtitle */}
      <div
        data-anim="true"
        className="mt-2.5 flex items-center gap-2 text-white/60 will-change-[transform,opacity,filter]"
      >
        {renderGlyph()}
        <span className="font-serif text-sm sm:text-base italic tracking-wide text-white/80">
          {ingredient.botanicalName}
        </span>
      </div>
    </div>
  );
};
