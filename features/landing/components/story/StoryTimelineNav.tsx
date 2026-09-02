"use client";

import React from "react";
import { STORY_CHAPTERS_DATA } from "./types";

interface StoryTimelineNavProps {
  activeIdx: number; // 0 = intro, 1..5 = chapters
  onSelectYear: (chapterIdx: number) => void;
}

export const StoryTimelineNav: React.FC<StoryTimelineNavProps> = ({
  activeIdx,
  onSelectYear,
}) => {
  return (
    <div className="flex flex-col items-start gap-4 border-l border-[#E7E5E4] pl-4 select-none">
      {STORY_CHAPTERS_DATA.map((chapter, idx) => {
        const chapterNumber = idx + 1; // 1 to 5
        const isActive = activeIdx === chapterNumber;

        return (
          <button
            key={chapter.id}
            type="button"
            onClick={() => onSelectYear(chapterNumber)}
            className={`group relative flex items-center text-xs sm:text-sm font-mono tracking-widest transition-all duration-300 cursor-pointer ${
              isActive
                ? "font-bold text-[#111827] scale-105 translate-x-1"
                : "text-[#78716C]/60 hover:text-[#111827] hover:scale-102"
            }`}
          >
            {/* Smooth Active Notch Bar */}
            {isActive && (
              <span className="absolute -left-[19px] h-4 w-[3.5px] bg-[#6355D9] rounded-full shadow-xs" />
            )}
            <span>{chapter.year}</span>
          </button>
        );
      })}
    </div>
  );
};
