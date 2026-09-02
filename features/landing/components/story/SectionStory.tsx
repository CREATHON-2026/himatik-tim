"use client";

import React, { forwardRef, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { STORY_CHAPTERS_DATA, StoryChapter } from "./types";
import { StoryTimelineNav } from "./StoryTimelineNav";
import { StoryNarrative } from "./StoryNarrative";
import { StoryFigureCard } from "./StoryFigureCard";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export const SectionStory = forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  (props, ref) => {
    const internalRef = useRef<HTMLElement>(null);
    const targetRef = (ref as React.RefObject<HTMLElement>) || internalRef;
    const watermarkRef = useRef<HTMLSpanElement>(null);
    const introStageRef = useRef<HTMLDivElement>(null);
    const mainStageRef = useRef<HTMLDivElement>(null);

    // 0 = Intro Stage, 1..5 = Chapters (01..05)
    const [activeStep, setActiveStep] = useState(0);

    const chapterIdx = Math.max(0, activeStep - 1);
    const currentChapter: StoryChapter =
      STORY_CHAPTERS_DATA[chapterIdx] ?? STORY_CHAPTERS_DATA[0];

    // GSAP ScrollTrigger Pinned Multi-Step Scrubbing with Soft Magnetic Snapping
    useGSAP(
      () => {
        if (!targetRef.current) return;

        ScrollTrigger.create({
          trigger: targetRef.current,
          start: "top top",
          end: "+=460%",
          pin: true,
          scrub: 1.1, // Softer fluid momentum scrub
          snap: {
            snapTo: [0, 0.22, 0.4, 0.58, 0.76, 1], // Magnetic snap points for Intro + 5 Chapters
            duration: { min: 0.35, max: 0.75 },
            delay: 0.08, // Natural breathing delay before magnetic lock
            ease: "power3.inOut",
          },
          onUpdate: (self) => {
            const p = self.progress;
            if (p < 0.14) {
              setActiveStep(0); // Intro Stage
            } else if (p < 0.32) {
              setActiveStep(1); // Babak 1
            } else if (p < 0.5) {
              setActiveStep(2); // Babak 2
            } else if (p < 0.68) {
              setActiveStep(3); // Babak 3
            } else if (p < 0.85) {
              setActiveStep(4); // Babak 4
            } else {
              setActiveStep(5); // Babak 5
            }
          },
        });
      },
      { scope: targetRef }
    );

    // Sequential Transition with 0.1s Clean Pause: Intro exits completely before Chapter enters
    useGSAP(
      () => {
        const isIntro = activeStep === 0;

        if (isIntro) {
          // 1. Hide Main Stage first
          if (mainStageRef.current) {
            gsap.to(mainStageRef.current, {
              opacity: 0,
              y: 24,
              duration: 0.3,
              ease: "power2.in",
              pointerEvents: "none",
            });
          }

          // 2. Show Intro Stage with clean delay
          if (introStageRef.current) {
            gsap.to(introStageRef.current, {
              opacity: 1,
              y: 0,
              duration: 0.5,
              delay: 0.1,
              ease: "power3.out",
              pointerEvents: "auto",
            });
          }
        } else {
          // 1. Hide Intro Stage completely first
          if (introStageRef.current) {
            gsap.to(introStageRef.current, {
              opacity: 0,
              y: -24,
              duration: 0.3,
              ease: "power2.in",
              pointerEvents: "none",
            });
          }

          // 2. Show Main Stage after intro is completely gone
          if (mainStageRef.current) {
            gsap.to(mainStageRef.current, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              delay: 0.12,
              ease: "power3.out",
              pointerEvents: "auto",
            });
          }
        }
      },
      { dependencies: [activeStep === 0], scope: targetRef }
    );

    // Watermark scale parallax animation on chapter change
    useGSAP(
      () => {
        if (!watermarkRef.current || activeStep === 0) return;

        gsap.fromTo(
          watermarkRef.current,
          {
            scale: 0.92,
            opacity: 0,
          },
          {
            scale: 1,
            opacity: 1,
            duration: 0.75,
            ease: "power2.out",
          }
        );
      },
      { dependencies: [currentChapter.id, activeStep], scope: targetRef }
    );

    return (
      <section
        ref={targetRef}
        id="story"
        {...props}
        className="relative w-full h-dvh bg-[#FAFAF9] text-[#111827] px-6 md:px-14 flex flex-col justify-between overflow-hidden border-t border-[#E7E5E4] shadow-2xs select-none"
      >
        {/* Top Header Badge */}
        <div className="mx-auto w-full max-w-360 pt-[calc(56px+clamp(8px,1.6vh,20px))]">
          <div className="flex items-baseline justify-between gap-6 mb-1">
            <div className="text-[10px] sm:text-[11px] font-semibold tracking-[0.28em] uppercase text-[#78716C]">
              <span className="text-[#111827]">04</span>
              <span className="mx-2 text-[#78716C]/40">/</span>
              <span>Perjalanan Karya</span>
            </div>

            <div className="text-[11px] font-mono font-bold tracking-[0.2em] uppercase text-[#78716C] tabular-nums">
              {activeStep === 0
                ? "INTRO"
                : `BABAK ${chapterIdx + 1} / ${STORY_CHAPTERS_DATA.length}`}
            </div>
          </div>
        </div>

        {/* STAGE A: Dedicated Centered Hero Intro Stage */}
        <div
          ref={introStageRef}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center max-w-2xl mx-auto my-auto will-change-[transform,opacity]"
        >
          <div className="text-[10px] sm:text-xs font-semibold tracking-[0.3em] uppercase text-[#6355D9] mb-3">
            04 / Perjalanan Sebuah Kado
          </div>

          <h2 className="font-serif text-3xl font-light tracking-tight text-[#111827] sm:text-4xl md:text-5xl lg:text-6xl">
            Dari percakapan hati, mewujud jadi kado abadi.
          </h2>

          <p className="mt-4 max-w-lg text-xs sm:text-sm md:text-base leading-relaxed text-[#44403C] font-normal">
            Setiap bingkisan di Gifteria melewati lima babak penuh dedikasi—menghubungkan perhatian tulus Anda dengan ketelitian tangan sanggar kriya terpercaya.
          </p>

          <div className="mt-8 flex flex-col items-center gap-2">
            <span className="text-[9px] font-mono font-semibold tracking-[0.3em] uppercase text-[#78716C]">
              Gulir untuk Menelusuri Babak
            </span>
            <div className="h-6 w-px bg-[#6355D9]/40 animate-pulse" />
          </div>
        </div>

        {/* STAGE B: Main 3-Zone Spatial Story Timeline Stage */}
        <div
          ref={mainStageRef}
          className="relative mx-auto w-full max-w-360 my-auto grid grid-cols-1 items-center gap-8 lg:grid-cols-12 min-h-0 opacity-0 will-change-[transform,opacity]"
        >
          {/* Massive Overlapping Watermark Number (01 - 05) */}
          <span
            ref={watermarkRef}
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-serif font-bold tracking-tighter will-change-[transform,opacity]"
            style={{
              fontSize: "clamp(320px, 42vw, 650px)",
              color: "transparent",
              WebkitTextStroke: "1.5px rgba(99, 85, 217, 0.07)",
              lineHeight: 0.75,
            }}
          >
            {currentChapter.watermarkNumber}
          </span>

          {/* Left Column: Chapter Monograph Narrative */}
          <div className="relative z-10 lg:col-span-6">
            <StoryNarrative chapter={currentChapter} />
          </div>

          {/* Right Column: Archival Polaroid Figure Card + Vertical Timeline Dock */}
          <div className="relative z-10 lg:col-span-6 flex items-center justify-end gap-6 sm:gap-10">
            <StoryFigureCard chapter={currentChapter} />
            <StoryTimelineNav
              activeIdx={activeStep}
              onSelectYear={(stepIdx) => setActiveStep(stepIdx)}
            />
          </div>
        </div>

        {/* Bottom Footer Indicator */}
        <div className="mx-auto w-full max-w-360 pb-[clamp(12px,2vh,22px)] flex items-center justify-between border-t border-[#E7E5E4] pt-2.5 shrink-0">
          <p className="text-[10px] font-medium tracking-[0.22em] uppercase text-[#78716C]">
            Gulir untuk Menjelajahi Setiap Babak
          </p>

          <span className="text-[10px] font-mono text-[#78716C] uppercase">
            5 Babak Kriya Terkurasi
          </span>
        </div>
      </section>
    );
  }
);

SectionStory.displayName = "SectionStory";
