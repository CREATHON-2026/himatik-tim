"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Quote, CheckCircle2 } from "lucide-react";
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
      {PRESS_QUOTES_DATA.map((item, idx) => (
        <div
          key={item.id}
          data-quote="true"
          className="group relative flex flex-col justify-between rounded-3xl border border-white/10 bg-white/[0.03] p-7 md:p-8 backdrop-blur-md transition-all duration-500 hover:border-[#8B7CF6]/40 hover:bg-white/[0.06] hover:-translate-y-1.5 shadow-xl shadow-black/40 will-change-[transform,opacity,filter]"
        >
          {/* Top Row: Quote Icon & Badge */}
          <div className="flex items-center justify-between mb-4">
            <Quote className="size-6 text-[#8B7CF6] opacity-80" />
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-white/80">
              <CheckCircle2 className="size-3 text-emerald-400" />
              <span>{item.badge}</span>
            </div>
          </div>

          {/* Quote Body */}
          <blockquote className="font-serif text-base sm:text-lg font-light italic leading-relaxed text-white/90 my-auto">
            &ldquo;{item.quote}&rdquo;
          </blockquote>

          {/* Attribution */}
          <div className="mt-8 flex items-baseline justify-between border-t border-white/10 pt-4">
            <div>
              <h4 className="font-serif text-sm sm:text-base font-medium text-white">
                {item.source}
              </h4>
              <p className="font-sans text-[11px] text-white/50 mt-0.5">
                {item.issue}
              </p>
            </div>

            <span className="font-mono text-xs tracking-wider text-amber-300">
              {idx === 2 ? "✓ Verified" : "★★★★★"}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
