"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
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

  // GSAP Entrance & Stagger Animation on category change
  useGSAP(
    () => {
      if (!containerRef.current) return;

      gsap.fromTo(
        containerRef.current.querySelectorAll("[data-anim='true']"),
        {
          y: 16,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.45,
          stagger: 0.04,
          ease: "power2.out",
        }
      );
    },
    { dependencies: [flavor.id], scope: containerRef }
  );

  return (
    <div ref={containerRef} className="flex flex-col justify-center">
      {/* Top Tag & Number */}
      <div
        data-anim="true"
        className="flex items-center gap-2 text-[10px] sm:text-[11px] font-semibold tracking-[0.24em] uppercase text-[#78716C]"
      >
        <span className="font-mono text-xs font-bold tracking-tight text-[#111827]">
          GIFTERIA · {flavor.number}
        </span>
        <span>/</span>
        <span style={{ color: flavor.accentColor }}>{flavor.tag}</span>
      </div>

      {/* Category Title with Accent Dot */}
      <h3
        data-anim="true"
        className="mt-2 font-serif text-3xl font-normal tracking-tight text-[#111827] sm:text-4xl md:text-5xl lg:text-6xl"
      >
        {flavor.name}
        <span style={{ color: flavor.accentColor }}>.</span>
      </h3>

      {/* Subtitle / Poetic note */}
      <p data-anim="true" className="mt-1 font-serif text-sm sm:text-base italic text-[#78716C]">
        {flavor.subtitle}
      </p>

      {/* Description */}
      <p
        data-anim="true"
        className="mt-3 max-w-md text-xs sm:text-sm leading-relaxed text-[#44403C]"
      >
        {flavor.description}
      </p>

      {/* Accent Divider Line */}
      <div
        data-anim="true"
        className="my-3.5 h-0.5 w-16 transition-colors duration-500 rounded-full"
        style={{ backgroundColor: flavor.accentColor }}
      />

      {/* Craft Specifications Breakdown */}
      <ul data-anim="true" className="flex flex-col gap-2 max-w-md">
        {flavor.ingredients.map((item, idx) => (
          <li
            key={idx}
            className="flex items-center justify-between text-xs border-b border-[#E7E5E4] pb-1.5"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2
                className="size-3.5 shrink-0"
                style={{ color: flavor.accentColor }}
              />
              <span className={item.isLead ? "font-semibold text-[#111827]" : "text-[#78716C]"}>
                {item.name}
              </span>
            </div>
            <span className="font-mono text-xs font-medium text-[#44403C]">
              {item.dose}
            </span>
          </li>
        ))}
      </ul>

      {/* Price Starting & Direct Catalog CTA */}
      <div
        data-anim="true"
        className="mt-5 flex flex-wrap items-center gap-4 pt-1"
      >
        <div>
          <span className="text-[10px] uppercase font-bold tracking-wider text-[#A8A29E] block">
            Mulai Dari
          </span>
          <span className="font-serif text-xl font-bold text-[#111827]">
            {flavor.startingPrice}
          </span>
        </div>

        <Link
          href="/katalog"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-xs font-semibold shadow-xs transition active:scale-98"
          style={{ backgroundColor: flavor.accentColor }}
        >
          <span>Jelajahi {flavor.name}</span>
          <ArrowRight className="size-3.5" />
        </Link>
      </div>
    </div>
  );
};
