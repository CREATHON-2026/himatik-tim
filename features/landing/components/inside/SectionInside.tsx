"use client";

import React, { forwardRef, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ADAPTOGENS_DATA, AdaptogenIngredient } from "./types";
import { InsidePillTabs } from "./InsidePillTabs";
import { InsideIngredientDetails } from "./InsideIngredientDetails";
import { InsideCanShowcase } from "./InsideCanShowcase";
import { InsideSpecCard } from "./InsideSpecCard";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export const SectionInside = forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  (props, ref) => {
    const internalRef = useRef<HTMLElement>(null);
    const targetRef = (ref as React.RefObject<HTMLElement>) || internalRef;
    const [activeIdx, setActiveIdx] = useState(0);

    const currentIngredient: AdaptogenIngredient =
      ADAPTOGENS_DATA[activeIdx] ?? ADAPTOGENS_DATA[0];

    // GSAP ScrollTrigger Pinned 4-Step Standard Scrubbing with Smooth Scrub & Magnetic Snap
    useGSAP(
      () => {
        if (!targetRef.current) return;

        ScrollTrigger.create({
          trigger: targetRef.current,
          start: "top top",
          end: "+=300%",
          pin: true,
          scrub: 1, // Fluid momentum scrub
          snap: {
            snapTo: [0, 0.333, 0.666, 1], // Magnetic snap to 4 standard steps
            duration: { min: 0.25, max: 0.6 },
            ease: "power2.inOut",
          },
          onUpdate: (self) => {
            const p = self.progress;
            if (p < 0.25) {
              setActiveIdx(0);
            } else if (p < 0.5) {
              setActiveIdx(1);
            } else if (p < 0.75) {
              setActiveIdx(2);
            } else {
              setActiveIdx(3);
            }
          },
        });
      },
      { scope: targetRef }
    );

    return (
      <section
        ref={targetRef}
        id="inside"
        {...props}
        className="relative w-full h-dvh bg-[#18181B] text-white px-6 md:px-14 flex flex-col justify-between overflow-hidden border-t border-white/10 shadow-[0_-30px_70px_rgba(0,0,0,0.65)] select-none"
      >
        {/* Top Header Area with Title & Pill Tabs */}
        <div className="mx-auto w-full max-w-360 pt-[calc(56px+clamp(8px,1.6vh,20px))] text-center">
          <div className="text-[10px] sm:text-[11px] font-semibold tracking-[0.28em] uppercase text-white/50">
            <span className="text-white">03</span>
            <span className="mx-2 text-white/30">/</span>
            <span>Standar Mutu & Dedikasi</span>
          </div>

          <h2 className="mt-1 font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-white">
            Di balik setiap karya. Ketelitian manusia dan rasa aman.
          </h2>

          {/* Interactive Pill Tabs Dock */}
          <div className="mt-3">
            <InsidePillTabs
              activeIdx={activeIdx}
              onSelectTab={(idx) => setActiveIdx(idx)}
            />
          </div>
        </div>

        {/* Main 3-Column Studio Grid */}
        <div className="mx-auto w-full max-w-360 my-auto grid grid-cols-1 items-center gap-6 md:grid-cols-12 min-h-0">
          {/* Left Column: Title & Subtitle */}
          <div className="md:col-span-4 flex justify-start">
            <InsideIngredientDetails ingredient={currentIngredient} />
          </div>

          {/* Center Column: 3D Emblem Showcase */}
          <div className="md:col-span-4 flex justify-center">
            <InsideCanShowcase ingredient={currentIngredient} />
          </div>

          {/* Right Column: Spec & Guarantees Table */}
          <div className="md:col-span-4 flex justify-end">
            <InsideSpecCard
              ingredient={currentIngredient}
              totalCount={ADAPTOGENS_DATA.length}
            />
          </div>
        </div>

        {/* Bottom Tagline Baseline */}
        <div className="mx-auto w-full max-w-360 pb-[clamp(14px,2.2vh,24px)] flex items-center justify-center border-t border-white/10 pt-2.5 shrink-0">
          <p className="text-[9px] sm:text-[10px] font-mono tracking-[0.26em] uppercase text-white/50 text-center">
            Empat standar mutu kado personal. Dikerjakan dengan dedikasi dari hati sanggar.
          </p>
        </div>
      </section>
    );
  }
);

SectionInside.displayName = "SectionInside";
