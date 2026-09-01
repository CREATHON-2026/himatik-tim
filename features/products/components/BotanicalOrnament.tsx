"use client";

import React from "react";

interface BotanicalOrnamentProps {
  className?: string;
  size?: number;
}

export function BotanicalOrnament({
  className = "",
  size = 140,
}: BotanicalOrnamentProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none text-[#78865C]/35 ${className}`}
      aria-hidden="true"
    >
      {/* Central Flower */}
      <circle cx="80" cy="80" r="10" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2" fill="#FAF6F0" />
      
      {/* Petals */}
      <path
        d="M80 70C75 55 85 45 80 35C75 45 85 55 80 70Z"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="currentColor"
        fillOpacity="0.08"
      />
      <path
        d="M80 90C75 105 85 115 80 125C75 115 85 105 80 90Z"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="currentColor"
        fillOpacity="0.08"
      />
      <path
        d="M70 80C55 75 45 85 35 80C45 75 55 85 70 80Z"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="currentColor"
        fillOpacity="0.08"
      />
      <path
        d="M90 80C105 75 115 85 125 80C115 75 105 85 90 80Z"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="currentColor"
        fillOpacity="0.08"
      />

      {/* Diagonal Petals */}
      <path
        d="M73 73C60 62 66 52 57 45C64 54 74 60 73 73Z"
        stroke="currentColor"
        strokeWidth="1"
        fill="currentColor"
        fillOpacity="0.05"
      />
      <path
        d="M87 87C100 98 94 108 103 115C96 106 86 100 87 87Z"
        stroke="currentColor"
        strokeWidth="1"
        fill="currentColor"
        fillOpacity="0.05"
      />
      <path
        d="M87 73C100 62 94 52 103 45C96 54 86 60 87 73Z"
        stroke="currentColor"
        strokeWidth="1"
        fill="currentColor"
        fillOpacity="0.05"
      />
      <path
        d="M73 87C60 98 66 108 57 115C64 106 74 100 73 87Z"
        stroke="currentColor"
        strokeWidth="1"
        fill="currentColor"
        fillOpacity="0.05"
      />

      {/* Art Nouveau Tendrils / Vines */}
      <path
        d="M20 140C40 135 60 120 75 95"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M140 20C120 25 100 40 85 65"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <circle cx="20" cy="140" r="3" fill="currentColor" fillOpacity="0.3" />
      <circle cx="140" cy="20" r="3" fill="currentColor" fillOpacity="0.3" />

      {/* Decorative dots */}
      <circle cx="80" cy="20" r="1.5" fill="currentColor" />
      <circle cx="80" cy="140" r="1.5" fill="currentColor" />
      <circle cx="20" cy="80" r="1.5" fill="currentColor" />
      <circle cx="140" cy="80" r="1.5" fill="currentColor" />
    </svg>
  );
}
