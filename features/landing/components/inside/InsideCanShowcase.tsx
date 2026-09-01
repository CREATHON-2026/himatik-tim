"use client";

import React, { useRef } from "react";
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
  const canRef = useRef<HTMLDivElement>(null);
  const specularRef = useRef<HTMLDivElement>(null);

  // GSAP 3D Spin & Specular Light Sweep when ingredient changes
  useGSAP(
    () => {
      if (!canRef.current) return;

      const tl = gsap.timeline();

      // 1. Can 3D Rotation
      tl.to(canRef.current, {
        rotateY: ingredient.rotationY,
        duration: 0.85,
        ease: "power2.out",
      });

      // 2. Dynamic Specular Light Sweep on Rotation
      if (specularRef.current) {
        tl.fromTo(
          specularRef.current,
          {
            x: -20,
            opacity: 0.2,
          },
          {
            x: 25,
            opacity: 0.7,
            duration: 0.85,
            ease: "power2.out",
          },
          "<"
        );
      }
    },
    { dependencies: [ingredient.rotationY], scope: containerRef }
  );

  // Mouse Parallax Physics
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!canRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const normX = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const normY = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);

    gsap.to(canRef.current, {
      rotateX: -normY * 10,
      x: normX * 8,
      y: normY * 6,
      duration: 0.6,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    if (!canRef.current) return;
    gsap.to(canRef.current, {
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
      className="relative flex h-[clamp(320px,46vh,440px)] w-full items-center justify-center"
    >
      {/* 1. Overhead Expansive Soft Spotlight (Unclipped, zero hard borders) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 h-[520px] w-[520px] rounded-full opacity-60"
        style={{
          background:
            "radial-gradient(ellipse at center top, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.06) 45%, transparent 72%)",
          filter: "blur(45px)",
        }}
      />

      {/* 2. 3D Matte White Can with Dynamic Y-Spin */}
      <div
        ref={canRef}
        className="relative z-10 flex h-[clamp(300px,42vh,400px)] w-[clamp(170px,18vw,220px)] flex-col items-center justify-between rounded-[30px] p-5 shadow-2xl transition-shadow duration-500 will-change-transform"
        style={{
          background:
            "linear-gradient(135deg, #FFFFFF 0%, #F5F4F0 40%, #E8E5DD 100%)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          boxShadow:
            "0 30px 60px -12px rgba(0, 0, 0, 0.85), inset 0 2px 4px rgba(255, 255, 255, 0.95), inset 0 -4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Top Rim */}
        <div className="flex w-full items-center justify-between border-b border-[#111214]/10 pb-2">
          <span className="text-[8px] font-mono font-bold tracking-[0.25em] uppercase text-[#111214]/70">
            STILL.01
          </span>
          <span className="text-[8px] font-mono tracking-[0.2em] uppercase text-[#737578]">
            250ml
          </span>
        </div>

        {/* Center Can Graphics */}
        <div className="my-auto flex w-full items-center justify-between px-1">
          {/* Vertical Wordmark */}
          <div
            className="select-none text-lg font-black tracking-tight text-[#111214]"
            style={{
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
            }}
          >
            STILL
          </div>

          <div className="flex flex-1 flex-col items-center text-center pl-1">
            <span className="font-sans text-4xl font-black leading-none tracking-tighter text-[#111214]">
              01
            </span>
            <h4 className="mt-0.5 font-serif text-xl font-light text-[#111214]">
              Clear
            </h4>
            <p className="mt-1 text-[9px] italic text-[#737578]">
              Sustained focus
            </p>

            {/* Micro Clinical Table */}
            <div className="mt-2.5 flex flex-col gap-0.5 w-full max-w-[105px] border-t border-[#111214]/10 pt-1.5">
              <div className="flex items-center justify-between text-[7px] font-mono uppercase text-[#737578]">
                <span>L-Theanine</span>
                <span className="font-bold text-[#111214]">200mg</span>
              </div>
              <div className="flex items-center justify-between text-[7px] font-mono uppercase text-[#737578]">
                <span>Lion&apos;s Mane</span>
                <span className="font-bold text-[#111214]">400mg</span>
              </div>
              <div className="flex items-center justify-between text-[7px] font-mono uppercase text-[#737578]">
                <span>Rhodiola</span>
                <span className="font-bold text-[#111214]">150mg</span>
              </div>
              <div className="flex items-center justify-between text-[7px] font-mono uppercase text-[#737578]">
                <span>Bacopa</span>
                <span className="font-bold text-[#111214]">300mg</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Rim */}
        <div className="w-full border-t border-[#111214]/10 pt-2 text-center">
          <p className="text-[7.5px] font-mono tracking-[0.25em] uppercase text-[#737578]">
            Clinical Efficacy
          </p>
        </div>

        {/* Dynamic Specular Light Strip */}
        <div
          ref={specularRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-4 w-6 bg-gradient-to-r from-transparent via-white/50 to-transparent blur-[1px] will-change-transform"
        />
      </div>
    </div>
  );
};
