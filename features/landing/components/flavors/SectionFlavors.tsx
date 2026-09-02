"use client";

import React, { forwardRef, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FLAVORS_DATA, FlavorItem } from "./types";
import { FlavorStageDetails } from "./FlavorStageDetails";
import { FlavorCanShowcase } from "./FlavorCanShowcase";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export const SectionFlavors = forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  (props, ref) => {
    const internalRef = useRef<HTMLElement>(null);
    const targetRef = (ref as React.RefObject<HTMLElement>) || internalRef;
    const [activeIdx, setActiveIdx] = useState(0);

    const currentFlavor: FlavorItem = FLAVORS_DATA[activeIdx] ?? FLAVORS_DATA[0];

    // GSAP ScrollTrigger Pinned 3-Category Carousel with Continuous Smooth Scrub & Magnetic Snap
    useGSAP(
      () => {
        if (!targetRef.current) return;

        ScrollTrigger.create({
          trigger: targetRef.current,
          start: "top top",
          end: "+=240%",
          pin: true,
          scrub: 1, // Fluid momentum scrub
          snap: {
            snapTo: [0, 0.5, 1], // Magnetic snap to 01 Floral, 02 Hampers, 03 Custom
            duration: { min: 0.25, max: 0.6 },
            ease: "power2.inOut",
          },
          onUpdate: (self) => {
            const p = self.progress;
            if (p < 0.33) {
              setActiveIdx(0);
            } else if (p < 0.67) {
              setActiveIdx(1);
            } else {
              setActiveIdx(2);
            }
          },
        });
      },
      { scope: targetRef }
    );

    return (
      <section
        ref={targetRef}
        id="flavors"
        {...props}
        className="relative w-full h-dvh bg-[#FAFAF9] px-6 md:px-14 flex flex-col justify-between overflow-hidden border-t border-[#E7E5E4] shadow-2xs select-none"
      >
        {/* Top Header Badge & Dynamic Counter */}
        <div className="mx-auto w-full max-w-360 pt-[calc(56px+clamp(12px,2vh,24px))]">
          <div className="flex items-baseline justify-between gap-6 mb-1.5">
            <div className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#78716C]">
              <span className="text-[#111827]">02</span>
              <span className="mx-2 text-[#78716C]/50">/</span>
              <span>Koleksi Karya Terkurasi</span>
            </div>

            <div className="text-[11px] font-mono font-bold tracking-[0.2em] uppercase text-[#78716C] tabular-nums">
              {activeIdx + 1} / {FLAVORS_DATA.length}
            </div>
          </div>

          <h2 className="font-serif text-2xl font-light tracking-tight text-[#111827] sm:text-3xl md:text-4xl lg:text-5xl">
            Tiga wujud kreativitas. Ratusan makna yang dirangkai.
          </h2>
        </div>

        {/* Main Interactive Stage Grid */}
        <div className="mx-auto w-full max-w-360 my-auto grid grid-cols-1 items-center gap-8 lg:grid-cols-12 min-h-0">
          {/* Left Column: Craft Details & Specs */}
          <div className="lg:col-span-5">
            <FlavorStageDetails flavor={currentFlavor} />
          </div>

          {/* Right Column: 3D Exhibition Card Showcase */}
          <div className="lg:col-span-7">
            <FlavorCanShowcase flavor={currentFlavor} />
          </div>
        </div>

        {/* Bottom Switcher Indicators */}
        <div className="mx-auto w-full max-w-360 pb-[clamp(12px,2vh,22px)] flex items-center justify-between border-t border-[#E7E5E4] pt-2.5 shrink-0">
          <p className="text-[10px] font-medium tracking-[0.22em] uppercase text-[#78716C]">
            Gulir untuk Mengganti Kategori Kriya
          </p>

          <div className="flex items-center gap-2 sm:gap-3">
            {FLAVORS_DATA.map((flv, idx) => {
              const isActive = idx === activeIdx;
              return (
                <button
                  key={flv.id}
                  type="button"
                  onClick={() => setActiveIdx(idx)}
                  className={`flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-mono font-bold uppercase transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-[#111827] text-white shadow-xs"
                      : "bg-white border border-[#E7E5E4] text-[#78716C] hover:bg-[#F5F5F4] hover:text-[#111827]"
                  }`}
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: flv.accentColor }}
                  />
                  <span>{flv.number}</span>
                  <span className="hidden sm:inline font-sans text-[11px] font-normal tracking-wide">
                    {flv.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>
    );
  }
);

SectionFlavors.displayName = "SectionFlavors";
