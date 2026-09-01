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

    // GSAP ScrollTrigger Pinned 3-Flavor Carousel with Continuous Smooth Scrub & Magnetic Snap
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
            snapTo: [0, 0.5, 1], // Magnetic snap to 01 Clear, 02 Dawn, 03 Dusk
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
        className="relative w-full h-dvh bg-[#EFEDE6] px-6 md:px-14 flex flex-col justify-between overflow-hidden border-t border-[#1A1B1D]/10 shadow-[0_-20px_50px_rgba(0,0,0,0.06)]"
      >
        {/* Top Header Badge & Dynamic Counter */}
        <div className="mx-auto w-full max-w-360 pt-[calc(56px+clamp(12px,2vh,24px))]">
          <div className="flex items-baseline justify-between gap-6 mb-1.5">
            <div className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#737578]">
              <span className="text-[#1A1B1D]">02</span>
              <span className="mx-2 text-[#737578]/50">/</span>
              <span>Three Flavors</span>
            </div>

            <div className="text-[11px] font-mono font-bold tracking-[0.2em] uppercase text-[#737578] tabular-nums">
              {activeIdx + 1} / {FLAVORS_DATA.length}
            </div>
          </div>

          <h2 className="font-serif text-2xl font-light tracking-tight text-[#1A1B1D] sm:text-3xl md:text-4xl lg:text-5xl">
            Three formulations.
          </h2>
        </div>

        {/* Main Interactive Stage Grid */}
        <div className="mx-auto w-full max-w-360 my-auto grid grid-cols-1 items-center gap-6 lg:grid-cols-12 min-h-0">
          {/* Left Column: Flavor Info & Ingredients */}
          <div className="lg:col-span-5">
            <FlavorStageDetails flavor={currentFlavor} />
          </div>

          {/* Right Column: 3D Matte White Can & Dynamic Watermark */}
          <div className="lg:col-span-7">
            <FlavorCanShowcase flavor={currentFlavor} />
          </div>
        </div>

        {/* Bottom Switcher Indicators */}
        <div className="mx-auto w-full max-w-360 pb-[clamp(12px,2vh,22px)] flex items-center justify-between border-t border-[#1A1B1D]/10 pt-2.5 shrink-0">
          <p className="text-[10px] font-medium tracking-[0.22em] uppercase text-[#737578]">
            Scroll to Switch Formulations
          </p>

          <div className="flex items-center gap-2.5">
            {FLAVORS_DATA.map((flv, idx) => {
              const isActive = idx === activeIdx;
              return (
                <button
                  key={flv.id}
                  type="button"
                  onClick={() => setActiveIdx(idx)}
                  className={`flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-mono font-bold uppercase transition-all duration-300 ${
                    isActive
                      ? "bg-[#1A1B1D] text-[#EFEDE6] shadow-sm"
                      : "bg-[#1A1B1D]/5 text-[#737578] hover:bg-[#1A1B1D]/10 hover:text-[#1A1B1D]"
                  }`}
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: flv.accentColor }}
                  />
                  <span>{flv.number}</span>
                  <span className="hidden sm:inline font-sans text-[10px] font-normal tracking-wider">
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
