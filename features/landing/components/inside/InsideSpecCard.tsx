"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { AdaptogenIngredient } from "./types";

interface InsideSpecCardProps {
  ingredient: AdaptogenIngredient;
  totalCount: number;
}

export const InsideSpecCard: React.FC<InsideSpecCardProps> = ({
  ingredient,
  totalCount,
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
          y: 20,
          opacity: 0,
          filter: "blur(5px)",
        },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.5,
          stagger: 0.05,
          ease: "power3.out",
        }
      );
    },
    { dependencies: [ingredient.id], scope: containerRef }
  );

  return (
    <div ref={containerRef} className="flex flex-col justify-center max-w-md ml-auto">
      {/* Top Counter Index in Masked Box */}
      <div className="overflow-hidden">
        <div
          data-anim="true"
          className="text-xs font-mono font-bold tracking-[0.25em] text-white/50 uppercase will-change-[transform,opacity,filter]"
        >
          <span>{ingredient.number}</span>
          <span className="mx-2 text-white/30">/</span>
          <span>0{totalCount}</span>
        </div>
      </div>

      {/* Clinical Benefit Description */}
      <div className="overflow-hidden mt-2.5">
        <p
          data-anim="true"
          className="text-xs sm:text-sm font-light leading-relaxed text-white/80 will-change-[transform,opacity,filter]"
        >
          {ingredient.description}
        </p>
      </div>

      {/* Clinical Specification Table */}
      <div
        data-anim="true"
        className="mt-4 flex flex-col divide-y divide-white/10 border-y border-white/10 will-change-[transform,opacity,filter]"
      >
        {/* Source Row */}
        <div className="flex items-center justify-between py-2.5 text-xs">
          <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-white/50">
            Source
          </span>
          <span className="font-mono text-xs text-white/90 lowercase">
            {ingredient.source}
          </span>
        </div>

        {/* Role Row */}
        <div className="flex items-center justify-between py-2.5 text-xs">
          <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-white/50">
            Role
          </span>
          <span className="font-mono text-xs text-white/90">
            {ingredient.role}
          </span>
        </div>

        {/* Dose Row */}
        <div className="flex items-center justify-between py-2.5 text-xs">
          <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-white/50">
            Dose
          </span>
          <span className="font-mono text-xs font-semibold text-white">
            {ingredient.dose}
          </span>
        </div>
      </div>
    </div>
  );
};
