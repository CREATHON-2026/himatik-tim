"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { PRESS_QUOTES_DATA } from "./types";

export const PressQuoteCards: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // GSAP Staggered Entrance on Scroll
  useGSAP(
    () => {
      if (!containerRef.current) return;

      gsap.fromTo(
        containerRef.current.querySelectorAll("[data-quote='true']"),
        {
          y: 35,
          opacity: 0,
          filter: "blur(6px)",
        },
        {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8 w-full max-w-360 mx-auto"
    >
      {PRESS_QUOTES_DATA.map((item) => (
        <div
          key={item.id}
          data-quote="true"
          className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-7 md:p-8 backdrop-blur-md transition-all duration-500 hover:border-white/25 hover:bg-white/[0.06] hover:-translate-y-1 shadow-xl shadow-black/40 will-change-[transform,opacity,filter]"
        >
          {/* Quote Body */}
          <blockquote className="font-serif text-lg sm:text-xl font-light italic leading-relaxed text-white/90">
            &ldquo;{item.quote}&rdquo;
          </blockquote>

          {/* Publisher Attribution */}
          <div className="mt-8 flex items-baseline justify-between border-t border-white/10 pt-4">
            <span className="font-mono text-xs font-bold tracking-[0.25em] uppercase text-white">
              {item.source}
            </span>
            <span className="font-mono text-[9px] uppercase tracking-wider text-white/40">
              {item.issue}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
