"use client";

import React, { useRef } from "react";
import { ShieldCheck, Heart, Package, Award, Sparkles } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { AdaptogenIngredient } from "./types";

interface InsideCanShowcaseProps {
  ingredient: AdaptogenIngredient;
}

export const InsideCanShowcase: React.FC<InsideCanShowcaseProps> = ({
  ingredient,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const specularRef = useRef<HTMLDivElement>(null);

  // GSAP 3D Spin & Specular Light Sweep when standard changes
  useGSAP(
    () => {
      if (!cardRef.current) return;

      const tl = gsap.timeline();

      // 1. Card 3D Rotation
      tl.to(cardRef.current, {
        rotateY: (ingredient.rotationY % 30) - 15,
        duration: 0.85,
        ease: "power2.out",
      });

      // 2. Dynamic Specular Light Sweep on Rotation
      if (specularRef.current) {
        tl.fromTo(
          specularRef.current,
          {
            x: -40,
            opacity: 0.1,
          },
          {
            x: 40,
            opacity: 0.6,
            duration: 0.85,
            ease: "power2.out",
          },
          "<"
        );
      }
    },
    { dependencies: [ingredient.id], scope: containerRef }
  );

  // Mouse Parallax Physics
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const normX = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const normY = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);

    gsap.to(cardRef.current, {
      rotateX: -normY * 10,
      x: normX * 8,
      y: normY * 6,
      duration: 0.6,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      rotateX: 0,
      x: 0,
      y: 0,
      duration: 1,
      ease: "elastic.out(1, 0.4)",
    });
  };

  const getIcon = () => {
    switch (ingredient.id) {
      case "kurasi":
        return <Award className="size-16 text-[#E76F61]" />;
      case "personalisasi":
        return <Heart className="size-16 text-[#8B7CF6]" />;
      case "escrow":
        return <ShieldCheck className="size-16 text-emerald-400" />;
      case "pengiriman":
        return <Package className="size-16 text-amber-400" />;
      default:
        return <Sparkles className="size-16 text-[#8B7CF6]" />;
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex h-[clamp(320px,46vh,440px)] w-full items-center justify-center [perspective:1000px]"
    >
      {/* 1. Overhead Expansive Soft Spotlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 h-[520px] w-[520px] rounded-full opacity-50"
        style={{
          background:
            "radial-gradient(ellipse at center top, rgba(139, 124, 246, 0.25) 0%, rgba(99, 85, 217, 0.08) 45%, transparent 72%)",
          filter: "blur(50px)",
        }}
      />

      {/* 2. 3D Craft Quality Emblem Badge */}
      <div
        ref={cardRef}
        className="relative z-10 flex h-[clamp(290px,42vh,390px)] w-[clamp(210px,22vw,270px)] flex-col items-center justify-between rounded-3xl p-6 shadow-2xl transition-shadow duration-500 will-change-transform bg-white/10 backdrop-blur-xl border border-white/20"
        style={{
          boxShadow:
            "0 30px 60px -12px rgba(0, 0, 0, 0.75), inset 0 1px 2px rgba(255, 255, 255, 0.25)",
        }}
      >
        {/* Top Header */}
        <div className="flex w-full items-center justify-between border-b border-white/10 pb-2.5">
          <span className="text-[9px] font-mono font-bold tracking-[0.25em] uppercase text-white/70">
            STANDAR {ingredient.number}
          </span>
          <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-white/50">
            VERIFIED
          </span>
        </div>

        {/* Center Emblem Visual */}
        <div className="my-auto flex flex-col items-center justify-center text-center space-y-3">
          <div className="size-24 rounded-2xl bg-white/5 border border-white/15 flex items-center justify-center shadow-lg transition-transform duration-500 hover:scale-105">
            {getIcon()}
          </div>

          <div>
            <h4 className="font-serif text-lg font-bold text-white tracking-wide">
              {ingredient.name}
            </h4>
            <p className="text-[11px] font-sans text-white/60 mt-1 max-w-[190px]">
              {ingredient.role}
            </p>
          </div>
        </div>

        {/* Bottom Seal */}
        <div className="w-full border-t border-white/10 pt-2 text-center">
          <p className="text-[8px] font-mono tracking-[0.26em] uppercase text-white/50">
            ✦ Jaminan Kualitas Gifteria ✦
          </p>
        </div>

        {/* Dynamic Specular Light Strip */}
        <div
          ref={specularRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-4 w-8 bg-gradient-to-r from-transparent via-white/20 to-transparent blur-[2px] will-change-transform"
        />
      </div>
    </div>
  );
};
