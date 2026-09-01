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
    <div className="flex flex-col items-start gap-4 border-l border-[#1A1B1D]/15 pl-4 select-none">
      {STORY_CHAPTERS_DATA.map((chapter, idx) => {
        const chapterNumber = idx + 1; // 1 to 5
        const isActive = activeIdx === chapterNumber;

        return (
          <button
            key={chapter.id}
            type="button"
            onClick={() => onSelectYear(chapterNumber)}
            className={`group relative flex items-center text-sm font-mono tracking-widest transition-all duration-300 ${
              isActive
                ? "font-bold text-[#1A1B1D] scale-110 translate-x-1"
                : "text-[#737578]/40 hover:text-[#1A1B1D] hover:scale-105"
            }`}
          >
            {/* Smooth Active Notch Bar */}
            {isActive && (
              <span className="absolute -left-[19px] h-4 w-[3.5px] bg-[#1A1B1D] rounded-full shadow-sm" />
            )}
            <span>{chapter.year}</span>
          </button>
        );
      })}
    </div>
  );
};
