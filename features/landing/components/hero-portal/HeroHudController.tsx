"use client";

import React from "react";
import { Move } from "lucide-react";

interface HeroHudControllerProps {
  isIdle: boolean;
  scrollProgress: number;
}

export const HeroHudController: React.FC<HeroHudControllerProps> = ({
  isIdle,
  scrollProgress,
}) => {
  return (
    <div className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-5 rounded-full border border-[#1A1B1D]/15 bg-[#EFEDE6]/90 px-6 py-2.5 shadow-xl backdrop-blur-md">
      <div className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.18em] uppercase text-[#1A1B1D]/80">
        <Move className="h-3.5 w-3.5 text-[#4A565C]" />
        <span>
          {isIdle ? "Sphere Idle (40% Stepped)" : "Move Mouse to Guide Sphere"}
        </span>
      </div>

      <div className="h-4 w-px bg-[#1A1B1D]/20" />

      <div className="flex items-center gap-2">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-[#737578]">
          Scroll:
        </span>
        <div className="h-2 w-20 overflow-hidden rounded-full bg-[#1A1B1D]/10">
          <div
            className="h-full bg-[#BCD3D8] transition-all duration-150"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
        <span className="text-xs font-mono font-bold text-[#1A1B1D] tabular-nums">
          {scrollProgress}%
        </span>
      </div>
    </div>
  );
};
