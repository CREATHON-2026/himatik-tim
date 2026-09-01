"use client";

import React, { forwardRef } from "react";
import { ArrowRight, Sparkles } from "lucide-react";

interface HeroDarkLayerProps {
  clipPath: string;
  auraGlowRef: React.RefObject<HTMLDivElement | null>;
  canWrapperRef: React.RefObject<HTMLDivElement | null>;
}

export const HeroDarkLayer = forwardRef<HTMLDivElement, HeroDarkLayerProps>(
  ({ clipPath, auraGlowRef, canWrapperRef }, ref) => {
    return (
      <div
        ref={ref}
        suppressHydrationWarning
        className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center bg-[#1A1B1D] text-[#EFEDE6] will-change-[clip-path]"
        style={{ clipPath }}
      >
        {/* Dynamic Cyan Radial Ambient Aura */}
        <div
          ref={auraGlowRef}
          aria-hidden="true"
          className="pointer-events-none absolute h-[50vh] w-[50vh] rounded-full opacity-80"
          style={{
            background:
              "radial-gradient(circle, #BCD3D8 0%, rgba(188, 211, 216, 0.75) 22%, rgba(188, 211, 216, 0.25) 48%, transparent 75%)",
            filter: "blur(60px)",
          }}
        />

        <div className="relative z-10 mx-auto grid h-full w-full max-w-360 grid-cols-1 items-center px-6 pt-[calc(56px+clamp(6px,1.5vh,16px))] pb-[clamp(24px,4vh,44px)] md:grid-cols-12 md:px-14">
          {/* Left Content Column */}
          <div className="z-20 flex flex-col justify-center md:col-span-6 lg:col-span-5">
            <div className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.3em] uppercase text-[#BCD3D8]">
              <span className="text-[#EFEDE6]">01</span>
              <span className="text-[#EFEDE6]/40">/</span>
              <span>The Formula</span>
            </div>

            <h2 className="mt-3 font-serif text-2xl font-light leading-[1.12] tracking-tight text-[#EFEDE6] sm:text-3xl md:text-4xl">
              Sustained natural focus, without caffeine.
            </h2>

            <div className="my-3 h-px w-16 bg-[#BCD3D8]" />

            <p className="max-w-md text-xs sm:text-sm leading-relaxed text-[#EFEDE6]/80 font-light">
              A clinical nootropic blend of four adaptogens calibrated at exact
              efficacious doses. Brewed and canned in Wellington, poured wherever
              the work is.
            </p>

            {/* Functional Pills */}
            <div className="mt-4 flex flex-wrap items-center gap-5 text-xs text-[#EFEDE6]/70">
              <div className="flex items-baseline gap-1.5">
                <span className="font-serif text-xl font-normal text-[#EFEDE6] tabular-nums">
                  1,150
                </span>
                <span className="text-[10px] uppercase tracking-wider text-[#EFEDE6]/50">
                  mg active blend
                </span>
              </div>

              <span className="text-[#EFEDE6]/30">·</span>

              <div className="flex items-baseline gap-1.5">
                <span className="font-serif text-xl font-normal text-[#EFEDE6] tabular-nums">
                  0
                </span>
                <span className="text-[10px] uppercase tracking-wider text-[#EFEDE6]/50">
                  mg caffeine
                </span>
              </div>
            </div>

            {/* Action Button */}
            <div className="mt-5">
              <a
                href="#flavors"
                className="pointer-events-auto group inline-flex items-center gap-2.5 rounded-full border border-[#EFEDE6]/25 bg-[#EFEDE6]/10 px-5 py-2 text-[11px] font-semibold tracking-[0.2em] uppercase text-[#EFEDE6] backdrop-blur-md transition-all duration-300 hover:border-[#BCD3D8] hover:bg-[#BCD3D8] hover:text-[#1A1B1D]"
              >
                <span>Explore Formulations</span>
                <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          {/* Right Interactive 3D Can Showcase */}
          <div className="relative flex h-full items-center justify-center md:col-span-6 lg:col-span-7">
            <div
              ref={canWrapperRef}
              className="relative flex h-[clamp(320px,42vh,400px)] w-[clamp(180px,19vw,225px)] flex-col items-center justify-between rounded-[28px] border border-white/10 p-4 shadow-2xl transition-shadow duration-500 will-change-transform"
              style={{
                background:
                  "linear-gradient(135deg, #4A565C 0%, #1E2528 35%, #0F1315 100%)",
                boxShadow:
                  "0 25px 50px -10px rgba(0, 0, 0, 0.85), inset 0 2px 4px rgba(255, 255, 255, 0.35), inset 0 -4px 8px rgba(0, 0, 0, 0.6)",
              }}
            >
              {/* Brushed Aluminum Top Rim */}
              <div className="flex w-full items-center justify-between border-b border-white/15 pb-2">
                <span className="text-[9px] font-bold tracking-[0.28em] uppercase text-[#BCD3D8]">
                  STILL.01
                </span>
                <span className="text-[9px] tracking-[0.2em] uppercase text-[#EFEDE6]/50">
                  250ml
                </span>
              </div>

              {/* Cylinder Center Branding */}
              <div className="my-auto flex flex-col items-center text-center">
                <span className="text-[10px] font-medium tracking-[0.35em] uppercase text-[#BCD3D8]">
                  CLEAR
                </span>
                <h3 className="mt-1 font-serif text-2xl font-light tracking-tight text-[#EFEDE6]">
                  Cucumber & Yuzu
                </h3>
                <div className="mt-2.5 flex items-center gap-1.5 text-[9px] tracking-[0.2em] uppercase text-[#EFEDE6]/60">
                  <Sparkles className="h-2.5 w-2.5 text-[#BCD3D8]" />
                  <span>L-Theanine · Lion&apos;s Mane</span>
                </div>
              </div>

              {/* Bottom Base Stamp */}
              <div className="w-full border-t border-white/15 pt-2 text-center">
                <p className="text-[8px] tracking-[0.3em] uppercase text-[#EFEDE6]/40">
                  Non-Carbonated · 0 Sugar
                </p>
              </div>

              {/* Specular Light Reflection Line */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 left-5 w-6 bg-linear-to-r from-transparent via-white/15 to-transparent blur-[2px]"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
);

HeroDarkLayer.displayName = "HeroDarkLayer";
