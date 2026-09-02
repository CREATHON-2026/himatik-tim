"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { StoryChapter } from "./types";

interface StoryNarrativeProps {
  chapter: StoryChapter;
}

export const StoryNarrative: React.FC<StoryNarrativeProps> = ({ chapter }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Soft GSAP Kinetic Masked Blur & Slide Reveal on chapter change
  useGSAP(
    () => {
      if (!containerRef.current) return;

      const tl = gsap.timeline();

      tl.fromTo(
        containerRef.current.querySelectorAll("[data-anim='true']"),
        {
          y: 20,
          opacity: 0,
          filter: "blur(5px)",
        },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.65,
          stagger: 0.06,
          ease: "power2.out",
        }
      );
    },
    { dependencies: [chapter.id], scope: containerRef }
  );

  return (
    <div ref={containerRef} className="flex flex-col justify-center max-w-xl">
      {/* Chapter Tag */}
      <div className="overflow-hidden">
        <div
          data-anim="true"
          className="text-[10px] sm:text-xs font-mono font-semibold tracking-[0.28em] uppercase text-[#6355D9] will-change-[transform,opacity,filter]"
        >
          <span>Babak {chapter.chapterNumber}</span>
          <span className="mx-2 text-[#78716C]/40">·</span>
          <span>{chapter.year}</span>
        </div>
      </div>

      {/* Main Chapter Title */}
      <div className="overflow-hidden mt-2.5">
        <h3
          data-anim="true"
          className="font-serif text-3xl font-normal tracking-tight text-[#111827] sm:text-4xl md:text-5xl leading-[1.1] will-change-[transform,opacity,filter]"
        >
          {chapter.title}
        </h3>
      </div>

      {/* Story Narrative Paragraph */}
      <div className="overflow-hidden mt-4">
        <p
          data-anim="true"
          className="text-xs sm:text-sm leading-relaxed text-[#44403C] font-normal will-change-[transform,opacity,filter]"
        >
          {chapter.description}
        </p>
      </div>
    </div>
  );
};
