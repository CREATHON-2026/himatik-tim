"use client";

import React from "react";
import { ADAPTOGENS_DATA } from "./types";

interface InsidePillTabsProps {
  activeIdx: number;
  onSelectTab: (idx: number) => void;
}

export const InsidePillTabs: React.FC<InsidePillTabsProps> = ({
  activeIdx,
  onSelectTab,
}) => {
  return (
    <div className="relative inline-flex flex-wrap items-center justify-center gap-1.5 sm:gap-2.5 p-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
      {ADAPTOGENS_DATA.map((item, idx) => {
        const isActive = idx === activeIdx;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelectTab(idx)}
            className={`group relative rounded-full px-3.5 sm:px-4 py-1 sm:py-1.5 text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.18em] transition-all duration-300 ${
              isActive
                ? "bg-white text-[#111214] font-bold shadow-lg shadow-white/15 scale-[1.02]"
                : "text-white/50 hover:text-white hover:bg-white/5"
            }`}
          >
            <span>{item.name}</span>
          </button>
        );
      })}
    </div>
  );
};
