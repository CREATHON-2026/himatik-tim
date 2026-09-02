"use client";

import React, { forwardRef, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(TextPlugin);
}

interface HeroBoneLayerProps {
  lettersRef: React.MutableRefObject<(HTMLSpanElement | null)[]>;
}

export const HeroBoneLayer = forwardRef<HTMLDivElement, HeroBoneLayerProps>(
  ({ lettersRef }, ref) => {
    const typewriterTextRef = useRef<HTMLHeadingElement>(null);
    const cursorRef = useRef<HTMLSpanElement>(null);
    const finalWordmarkRef = useRef<HTMLDivElement>(null);

    // Wordmark letters centered in clean luxury editorial typography
    const wordmarkConfig = [
      { char: "G" },
      { char: "I" },
      { char: "F" },
      { char: "T" },
      { char: "E" },
      { char: "R" },
      { char: "I" },
      { char: "A" },
    ];

    // GSAP Typewriter Sequence: KADO -> G -> GIFTERIA.
    useGSAP(() => {
      // Blinking Cursor
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          opacity: 0,
          repeat: -1,
          yoyo: true,
          duration: 0.45,
          ease: "power2.inOut",
        });
      }

      const masterTypewriterTimeline = gsap.timeline({
        repeat: -1,
        repeatDelay: 3.5,
        defaults: { ease: "none" },
      });

      if (typewriterTextRef.current && finalWordmarkRef.current && cursorRef.current) {
        masterTypewriterTimeline
          .to(typewriterTextRef.current, {
            text: "KADO",
            duration: 0.6,
            ease: "none",
          })
          .to(typewriterTextRef.current, {
            text: "G",
            duration: 0.4,
            ease: "none",
            delay: 0.3,
          })
          .to(typewriterTextRef.current, {
            text: "GIFTERIA.",
            duration: 0.85,
            ease: "none",
          })
          .to(cursorRef.current, {
            opacity: 0,
            duration: 0.3,
            delay: 0.25,
            onComplete: () => {
              gsap.to(typewriterTextRef.current, { opacity: 0, duration: 0.3 });
              gsap.fromTo(
                finalWordmarkRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 0.4 }
              );
            },
          });
      }
    });

    return (
      <div
        ref={ref}
        className="absolute inset-0 z-10 flex flex-col justify-between px-6 md:px-14 lg:px-20 pt-[calc(64px+clamp(12px,2vh,24px))] pb-[clamp(18px,3vh,32px)] select-none text-[#111827] overflow-hidden bg-[#FAFAF9]"
      >
        {/* Subtle Ambient Radial Light Pattern (Zero Heavy Images) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 opacity-60"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 40%, rgba(99, 85, 217, 0.06) 0%, rgba(245, 243, 255, 0.5) 45%, transparent 75%)",
          }}
        />

        {/* Top Spacer */}
        <div className="w-full" />

        {/* ─── Center Hero Content (Fully Centered Layout) ─── */}
        <div className="relative z-20 flex flex-col items-center justify-center text-center my-auto w-full max-w-5xl mx-auto space-y-5">
          {/* Micro Tagline Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E7E5E4] shadow-2xs text-[#6355D9]">
            <Sparkles className="size-3.5" />
            <span className="font-mono text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase">
              Platform Kriya & Kado Personal Terkurasi
            </span>
          </div>

          {/* Centered Giant Typography: Typewriter Intro & Wordmark */}
          <div className="relative w-full py-2 flex items-center justify-center">
            {/* Live Typewriter Stage (Centered) */}
            <div className="flex items-baseline justify-center absolute inset-0 z-10">
              <h1
                ref={typewriterTextRef}
                className="inline-block text-[clamp(64px,14vw,190px)] font-serif font-light leading-[0.85] tracking-[-0.03em] text-[#111827]"
              >
                {/* Dynamically populated by GSAP */}
              </h1>
              <span
                ref={cursorRef}
                className="inline-block text-[clamp(56px,12vw,170px)] font-light text-[#6355D9] leading-none ml-1 select-none"
              >
                |
              </span>
            </div>

            {/* Permanent Magnetic Wordmark (Centered) */}
            <div ref={finalWordmarkRef} className="opacity-0 flex justify-center w-full">
              <h1 className="flex items-baseline justify-center text-[clamp(64px,14vw,190px)] font-serif font-light leading-[0.85] tracking-[-0.03em] text-[#111827]">
                {wordmarkConfig.map((item, i) => (
                  <span
                    key={i}
                    ref={(el) => {
                      lettersRef.current[i] = el;
                    }}
                    className="inline-block will-change-transform text-[#111827]"
                  >
                    {item.char}
                  </span>
                ))}
                <span
                  ref={(el) => {
                    lettersRef.current[wordmarkConfig.length] = el;
                  }}
                  className="inline-block text-[#6355D9] will-change-transform ml-1"
                >
                  .
                </span>
              </h1>
            </div>
          </div>

          {/* Centered Editorial Subtitle */}
          <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-[#78716C] leading-relaxed font-sans">
            Temukan buket bunga artisan, hampers tematik, dan kriya kustom buatan tangan langsung dari sanggar kreator independen di seluruh Indonesia.
          </p>

          {/* Centered Call to Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
            <Link
              href="/katalog"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#6355D9] hover:bg-[#5145C6] text-white text-xs sm:text-sm font-semibold shadow-xs transition active:scale-98"
            >
              <span>Jelajahi Katalog Kado</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-[#E7E5E4] bg-white hover:bg-[#F5F5F4] text-xs sm:text-sm font-semibold text-[#111827] transition shadow-2xs"
            >
              <span>Buka Sanggar Kriya</span>
            </Link>
          </div>
        </div>

        {/* ─── Bottom Baseline Bar (Centered Info) ─── */}
        <div className="flex items-end justify-between w-full max-w-360 mx-auto z-30 pt-4">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#6355D9]" />
            <span className="font-mono text-[9px] sm:text-[10px] font-medium tracking-[0.24em] uppercase text-[#78716C]">
              Kriya & Kado Terkurasi Indonesia
            </span>
          </div>

          <div className="hidden sm:flex flex-col items-center gap-1.5">
            <span className="font-mono text-[9px] font-semibold tracking-[0.24em] uppercase text-[#78716C]">
              Gulir untuk Eksplorasi
            </span>
            <div className="relative h-5 w-3 rounded-full border border-[#D6D3D1] p-0.5 flex justify-center">
              <div className="h-1 w-1 rounded-full bg-[#6355D9] animate-bounce" />
            </div>
          </div>

          <div className="text-right hidden sm:block">
            <span className="font-mono text-[9px] font-semibold tracking-[0.24em] uppercase text-[#78716C]">
              100% Escrow Protection
            </span>
          </div>
        </div>
      </div>
    );
  }
);

HeroBoneLayer.displayName = "HeroBoneLayer";
