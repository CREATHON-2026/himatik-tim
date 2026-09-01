"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { PRESS_MARQUEE_ITEMS } from "./types";

export const PressMarquee: React.FC = () => {
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  // Smooth continuous infinite ticker
  useGSAP(() => {
    if (row1Ref.current) {
      gsap.to(row1Ref.current, {
        xPercent: -50,
        repeat: -1,
        duration: 28,
        ease: "none",
      });
    }

    if (row2Ref.current) {
      gsap.fromTo(
        row2Ref.current,
        { xPercent: -50 },
        {
          xPercent: 0,
          repeat: -1,
          duration: 32,
          ease: "none",
        }
      );
    }
  });

  const duplicatedItems = [...PRESS_MARQUEE_ITEMS, ...PRESS_MARQUEE_ITEMS, ...PRESS_MARQUEE_ITEMS, ...PRESS_MARQUEE_ITEMS];

  return (
    <div className="relative w-full overflow-hidden border-t border-white/10 py-6 select-none">
      {/* Side Fade Gradients for Luxury Fade Effect */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#111214] to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#111214] to-transparent"
      />

      {/* Row 1: Serif Italic Luxury Typography */}
      <div className="flex w-max items-center">
        <div ref={row1Ref} className="flex items-center gap-10 whitespace-nowrap will-change-transform">
          {duplicatedItems.map((item, idx) => (
            <div key={idx} className="flex items-center gap-10">
              <span className="font-serif text-2xl sm:text-3xl md:text-4xl font-light italic tracking-tight text-white/70 hover:text-white transition-colors duration-300">
                {item}
              </span>
              <span className="text-white/20 text-lg">·</span>
            </div>
          ))}
        </div>
      </div>

      {/* Row 2: Secondary Offset Typography */}
      <div className="flex w-max items-center mt-3">
        <div ref={row2Ref} className="flex items-center gap-10 whitespace-nowrap will-change-transform">
          {duplicatedItems.map((item, idx) => (
            <div key={idx} className="flex items-center gap-10">
              <span className="font-serif text-lg sm:text-xl md:text-2xl font-normal tracking-wide text-white/30 hover:text-white/60 transition-colors duration-300">
                {item}
              </span>
              <span className="text-white/15 text-sm">·</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
