"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { FlavorItem } from "./types";

interface FlavorCanShowcaseProps {
  flavor: FlavorItem;
}

export const FlavorCanShowcase: React.FC<FlavorCanShowcaseProps> = ({
  flavor,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLSpanElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  // GSAP Choreographed Animation on flavor switch (matching STILL..mp4)
  useGSAP(
    () => {
      // 1. Watermark depth scale & fade animation
      if (watermarkRef.current) {
        gsap.fromTo(
          watermarkRef.current,
          {
            scale: 0.94,
            opacity: 0,
          },
          {
            scale: 1,
            opacity: 1,
            duration: 0.55,
            ease: "power2.out",
          }
        );
      }

      // 2. Can Label Graphics Crossfade
      if (labelRef.current) {
        gsap.fromTo(
          labelRef.current,
          {
            opacity: 0,
            y: 8,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            ease: "power2.out",
          }
        );
      }

      // 3. Can Micro-Rotation on variant switch
      if (canRef.current) {
        gsap.fromTo(
          canRef.current,
          {
            rotateY: -6,
          },
          {
            rotateY: 0,
            duration: 0.7,
            ease: "power3.out",
          }
        );
      }
    },
    { dependencies: [flavor.id], scope: containerRef }
  );

  // Mouse Parallax Tilt Handler
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!canRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const normX = (x - rect.width / 2) / (rect.width / 2);
    const normY = (y - rect.height / 2) / (rect.height / 2);

    gsap.to(canRef.current, {
      rotateY: normX * 16,
      rotateX: -normY * 12,
      x: normX * 12,
      y: normY * 8,
      duration: 0.6,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    if (!canRef.current) return;
    gsap.to(canRef.current, {
      rotateY: 0,
      rotateX: 0,
      x: 0,
      y: 0,
      duration: 1,
      ease: "elastic.out(1, 0.4)",
    });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex h-[clamp(340px,50vh,460px)] w-full items-center justify-center overflow-hidden"
    >
      {/* 1. Giant Outlined Watermark Number (01 / 02 / 03 with GSAP spatial depth) */}
      <span
        ref={watermarkRef}
        aria-hidden="true"
        className="pointer-events-none absolute right-2 select-none font-sans font-black tracking-tight will-change-[transform,opacity]"
        style={{
          fontSize: "clamp(200px, 22vw, 360px)",
          color: "transparent",
          WebkitTextStroke: "1.5px rgba(26, 27, 29, 0.08)",
          lineHeight: 0.8,
        }}
      >
        {flavor.number}
      </span>

      {/* 2. Flavor-Specific Dynamic Ambient Radial Aura Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute h-[45vh] w-[45vh] rounded-full transition-all duration-700"
        style={{
          background: `radial-gradient(circle, ${flavor.accentColor} 0%, ${flavor.glowColor} 45%, transparent 75%)`,
          filter: "blur(50px)",
          opacity: 0.8,
        }}
      />

      {/* 3. Matte White Aluminum Minimalist Can (Reference: STILL..mp4) */}
      <div
        ref={canRef}
        className="relative z-10 flex h-[clamp(330px,46vh,430px)] w-[clamp(180px,20vw,235px)] flex-col items-center justify-between rounded-[32px] p-5 shadow-2xl transition-all duration-700 will-change-transform"
        style={{
          background:
            "linear-gradient(135deg, #FFFFFF 0%, #FAF9F6 40%, #EFECE6 100%)",
          border: "1px solid rgba(26, 27, 29, 0.12)",
          boxShadow:
            "0 25px 50px -10px rgba(26, 27, 29, 0.22), inset 0 2px 4px rgba(255, 255, 255, 0.9), inset 0 -4px 8px rgba(0, 0, 0, 0.08)",
        }}
      >
        {/* Top Aluminum Rim */}
        <div className="flex w-full items-center justify-between border-b border-[#1A1B1D]/10 pb-2">
          <span className="text-[8px] font-mono font-bold tracking-[0.28em] uppercase text-[#1A1B1D]/60">
            Nootropic Blend
          </span>
          <span className="text-[8px] font-mono tracking-[0.2em] uppercase text-[#737578]">
            250ml
          </span>
        </div>

        {/* Can Center Body Graphics (Crossfading with GSAP) */}
        <div
          ref={labelRef}
          className="relative my-auto flex w-full items-center justify-between px-1 will-change-[transform,opacity]"
        >
          {/* Vertical STILL Wordmark on Left */}
          <div
            className="select-none text-xl font-black tracking-tight text-[#1A1B1D]"
            style={{
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
            }}
          >
            STILL
          </div>

          {/* Big Number & Flavor Title */}
          <div className="flex flex-1 flex-col items-center text-center pl-1.5">
            <span className="font-sans text-5xl font-black leading-none tracking-tighter text-[#1A1B1D]">
              {flavor.number}
            </span>
            <h4 className="mt-0.5 font-serif text-2xl font-light tracking-tight text-[#1A1B1D]">
              {flavor.name}
            </h4>
            <p className="mt-1 text-[10px] italic text-[#737578]">
              Sustained focus, naturally
            </p>

            {/* Micro Ingredient Table on Can Face */}
            <div className="mt-3 flex flex-col gap-0.5 w-full max-w-28 border-t border-[#1A1B1D]/10 pt-2">
              {flavor.ingredients.map((ing, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between text-[7.5px] font-mono uppercase text-[#737578]"
                >
                  <span className="truncate">{ing.name}</span>
                  <span className="font-semibold text-[#1A1B1D]">{ing.dose}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Base Stamp */}
        <div className="w-full border-t border-[#1A1B1D]/10 pt-2 text-center">
          <p className="text-[8px] font-mono tracking-[0.26em] uppercase text-[#737578]">
            0 Sugar · 0 Caffeine
          </p>
        </div>

        {/* Specular White Light Reflection Strip */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-5 w-6 bg-linear-to-r from-transparent via-white/40 to-transparent blur-[1px]"
        />
      </div>
    </div>
  );
};
