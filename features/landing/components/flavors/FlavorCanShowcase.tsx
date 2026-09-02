"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, ShieldCheck, Heart, Gift } from "lucide-react";
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
  const cardRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLSpanElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // GSAP Choreographed Animation on category switch
  useGSAP(
    () => {
      // 1. Watermark depth scale & fade animation
      if (watermarkRef.current) {
        gsap.fromTo(
          watermarkRef.current,
          {
            scale: 0.92,
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

      // 2. Card Content Crossfade
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current,
          {
            opacity: 0,
            y: 12,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            ease: "power2.out",
          }
        );
      }

      // 3. Card Micro-Tilt on variant switch
      if (cardRef.current) {
        gsap.fromTo(
          cardRef.current,
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
    if (!cardRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const normX = (x - rect.width / 2) / (rect.width / 2);
    const normY = (y - rect.height / 2) / (innerHeight / 2);

    gsap.to(cardRef.current, {
      rotateY: normX * 12,
      rotateX: -normY * 9,
      x: normX * 10,
      y: normY * 6,
      duration: 0.6,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
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
      className="relative flex h-[clamp(340px,50vh,460px)] w-full items-center justify-center overflow-hidden [perspective:1000px]"
    >
      {/* 1. Giant Outlined Watermark Number (01 / 02 / 03) */}
      <span
        ref={watermarkRef}
        aria-hidden="true"
        className="pointer-events-none absolute right-2 select-none font-serif font-bold tracking-tight will-change-[transform,opacity]"
        style={{
          fontSize: "clamp(200px, 24vw, 380px)",
          color: "transparent",
          WebkitTextStroke: "1.5px rgba(99, 85, 217, 0.08)",
          lineHeight: 0.8,
        }}
      >
        {flavor.number}
      </span>

      {/* 2. Category-Specific Dynamic Ambient Radial Aura Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute h-[48vh] w-[48vh] rounded-full transition-all duration-700"
        style={{
          background: `radial-gradient(circle, ${flavor.accentColor}25 0%, ${flavor.glowColor} 45%, transparent 75%)`,
          filter: "blur(60px)",
          opacity: 0.8,
        }}
      />

      {/* 3. Modern Editorial Exhibition Card (3D Tilt) */}
      <div
        ref={cardRef}
        className="relative z-10 flex h-[clamp(320px,46vh,420px)] w-[clamp(260px,26vw,340px)] flex-col justify-between rounded-3xl p-6 bg-white/95 backdrop-blur-md border border-[#E7E5E4] shadow-xl transition-all duration-700 will-change-transform"
      >
        {/* Top Header Row */}
        <div className="flex items-center justify-between border-b border-[#F5F5F4] pb-3">
          <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#78716C]">
            <Sparkles className="size-3.5" style={{ color: flavor.accentColor }} />
            <span>Koleksi Terkurasi</span>
          </div>
          <span
            className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border"
            style={{
              borderColor: `${flavor.accentColor}40`,
              color: flavor.accentColor,
              backgroundColor: `${flavor.accentColor}10`,
            }}
          >
            {flavor.previewBadge}
          </span>
        </div>

        {/* Center Emblem Visual */}
        <div
          ref={contentRef}
          className="my-auto flex flex-col items-center justify-center text-center py-4 space-y-3"
        >
          <div
            className="size-16 rounded-2xl flex items-center justify-center shadow-xs transition-transform duration-500 hover:scale-105"
            style={{
              backgroundColor: `${flavor.accentColor}15`,
              color: flavor.accentColor,
            }}
          >
            {flavor.id === "floral" ? (
              <Heart className="size-8" />
            ) : flavor.id === "hampers" ? (
              <Gift className="size-8" />
            ) : (
              <Sparkles className="size-8" />
            )}
          </div>

          <div>
            <span className="font-mono text-xs font-bold tracking-widest text-[#78716C] uppercase">
              Karya Nomor {flavor.number}
            </span>
            <h4 className="font-serif text-2xl font-bold text-[#111827] mt-0.5">
              {flavor.name}
            </h4>
            <p className="text-xs text-[#78716C] mt-1 line-clamp-2 max-w-xs">
              {flavor.subtitle}
            </p>
          </div>
        </div>

        {/* Bottom Card Footer */}
        <div className="border-t border-[#F5F5F4] pt-3 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[11px] text-[#78716C]">
            <ShieldCheck className="size-3.5 text-emerald-600" />
            <span>100% Escrow</span>
          </div>

          <Link
            href="/katalog"
            className="text-xs font-semibold flex items-center gap-1 hover:underline"
            style={{ color: flavor.accentColor }}
          >
            <span>Beli Sekarang</span>
            <ArrowRight className="size-3" />
          </Link>
        </div>
      </div>
    </div>
  );
};
