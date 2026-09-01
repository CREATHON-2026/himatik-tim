"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { FlavorItem } from "./types";

interface FlavorStageDetailsProps {
  flavor: FlavorItem;
}

export const FlavorStageDetails: React.FC<FlavorStageDetailsProps> = ({
  flavor,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // GSAP Entrance & Stagger Animation on flavor change
  useGSAP(
    () => {
      if (!containerRef.current) return;

      gsap.fromTo(
        containerRef.current.querySelectorAll("[data-anim='true']"),
        {
          y: 14,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.45,
          stagger: 0.035,
          ease: "power2.out",
        }
      );
    },
    { dependencies: [flavor.id], scope: containerRef }
  );

  return (
    <div ref={containerRef} className="flex flex-col justify-center">
      {/* Top SKU Tag */}
      <div
        data-anim="true"
        className="flex items-baseline justify-between text-[10px] font-semibold tracking-[0.24em] uppercase text-[#737578]"
      >
        <span className="font-mono text-xs font-bold tracking-tight text-[#1A1B1D]">
          STILL.{flavor.number}
        </span>
        <span>{flavor.tag}</span>
      </div>

      {/* Flavor Title with Accent Dot */}
      <h3
        data-anim="true"
        className="mt-2 font-serif text-4xl font-light tracking-tight text-[#1A1B1D] sm:text-5xl md:text-6xl lg:text-7xl"
      >
        {flavor.name}
        <span style={{ color: flavor.accentColor }}>.</span>
      </h3>

      {/* Subtitle / Botanical note */}
      <p data-anim="true" className="mt-1 font-serif text-base italic text-[#737578]">
        {flavor.subtitle}
      </p>

      {/* Description */}
      <p
        data-anim="true"
        className="mt-3 max-w-md text-xs leading-relaxed text-[#1A1B1D]/80 sm:text-sm"
      >
        {flavor.description}
      </p>

      {/* Accent Divider Line */}
      <div
        data-anim="true"
        className="my-3.5 h-px w-16 transition-colors duration-500"
        style={{ backgroundColor: flavor.accentColor }}
      />

      {/* Ingredient Dosage Breakdown (Staggered Animation) */}
      <ul data-anim="true" className="flex flex-col gap-1.5 max-w-sm">
        {flavor.ingredients.map((item, idx) => (
          <li
            key={idx}
            className="flex items-baseline justify-between text-xs border-b border-[#1A1B1D]/10 pb-1"
          >
            <div className="flex items-baseline gap-2.5">
              <span className="font-mono text-xs font-semibold text-[#1A1B1D] tabular-nums">
                {item.dose}
              </span>
              <span className={item.isLead ? "font-semibold text-[#1A1B1D]" : "text-[#737578]"}>
                {item.name}
              </span>
            </div>
            {item.isLead && (
              <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#1A1B1D]/70">
                Lead
              </span>
            )}
          </li>
        ))}
      </ul>

      {/* Active Blend Total */}
      <div
        data-anim="true"
        className="mt-3 flex items-baseline justify-between max-w-sm pt-1"
      >
        <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#737578]">
          Active Blend
        </span>
        <span className="font-serif text-lg font-medium text-[#1A1B1D] tabular-nums">
          {flavor.totalActiveBlend}{" "}
          <span className="text-[9px] uppercase tracking-widest text-[#737578]">
            mg
          </span>
        </span>
      </div>
    </div>
  );
};
