"use client";

import React, { forwardRef } from "react";
import { SphereCoordinates } from "./types";

interface HeroSphereLensProps {
  lensPos: SphereCoordinates;
  currentRadius: number;
}

export const HeroSphereLens = forwardRef<HTMLDivElement, HeroSphereLensProps>(
  ({ lensPos, currentRadius }, ref) => {
    return (
      <div
        ref={ref}
        suppressHydrationWarning
        aria-hidden="true"
        className="pointer-events-none absolute z-30 rounded-full will-change-transform"
        style={{
          width: `${currentRadius * 2}px`,
          height: `${currentRadius * 2}px`,
          left: `${lensPos.x}px`,
          top: `${lensPos.y}px`,
          transform: "translate(-50%, -50%)",
          border: "1.5px solid rgba(255, 255, 255, 0.45)",
          boxShadow:
            "0 30px 70px rgba(0, 0, 0, 0.35), inset 0 0 50px rgba(0, 0, 0, 0.65), inset 0 2px 6px rgba(255, 255, 255, 0.4)",
          background: "transparent",
        }}
      >
        {/* Soft Ambient Edge Glow */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            boxShadow: "0 0 35px rgba(188, 211, 216, 0.4)",
          }}
        />
      </div>
    );
  }
);

HeroSphereLens.displayName = "HeroSphereLens";
