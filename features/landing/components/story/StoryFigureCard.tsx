"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Camera, FileText, FlaskConical, MapPin, Store, Sparkles } from "lucide-react";
import { StoryChapter } from "./types";

interface StoryFigureCardProps {
  chapter: StoryChapter;
}

export const StoryFigureCard: React.FC<StoryFigureCardProps> = ({ chapter }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Soft GSAP Expanding Spring Scale & Elevation on chapter change
  useGSAP(
    () => {
      if (!cardRef.current) return;

      gsap.fromTo(
        cardRef.current,
        {
          opacity: 0,
          scale: 0.94,
          y: 18,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
        }
      );
    },
    { dependencies: [chapter.id], scope: cardRef }
  );

  const renderFigureVisual = () => {
    switch (chapter.year) {
      case "2021":
        return (
          <div className="relative flex h-full w-full flex-col items-center justify-between p-6 bg-[#FAF9F5] border border-[#1A1B1D]/10 rounded-xl overflow-hidden shadow-inner">
            <div className="flex w-full items-center justify-between text-[8px] font-mono text-[#737578] uppercase">
              <span>Draft V.01</span>
              <span>Nov 2021</span>
            </div>
            
            <div className="my-auto flex flex-col items-center justify-center text-center">
              <FileText className="h-12 w-12 text-[#1A1B1D]/40 mb-3" />
              <div className="w-48 flex flex-col gap-2">
                <div className="h-2 w-3/4 bg-[#1A1B1D]/25 rounded-full mx-auto" />
                <div className="h-1.5 w-full bg-[#1A1B1D]/15 rounded-full" />
                <div className="h-1.5 w-5/6 bg-[#1A1B1D]/20 rounded-full mx-auto" />
                <div className="h-2 w-1/2 bg-[#BCD3D8] rounded-full mx-auto mt-2" />
              </div>
            </div>

            <div className="w-full text-center border-t border-[#1A1B1D]/10 pt-2">
              <span className="text-[9px] font-mono font-bold tracking-wider text-[#1A1B1D]">
                CUBA ST. STUDIO SKETCH
              </span>
            </div>
          </div>
        );
      case "2022":
        return (
          <div className="relative flex h-full w-full flex-col items-center justify-between p-6 bg-[#F7F5EE] border border-[#1A1B1D]/10 rounded-xl overflow-hidden shadow-inner">
            <div className="flex w-full items-center justify-between text-[8px] font-mono text-[#737578] uppercase">
              <span>Massey Research</span>
              <span>Aug 2022</span>
            </div>

            <div className="my-auto flex flex-col items-center justify-center text-center">
              <FlaskConical className="h-12 w-12 text-[#E8C9A0] mb-3" />
              <div className="flex items-center gap-3">
                <div className="h-16 w-8 rounded-full border border-[#1A1B1D]/20 bg-white/80 shadow-sm flex flex-col items-center justify-center text-[9px] font-mono text-[#737578]">
                  <span>B.1</span>
                </div>
                <div className="h-18 w-9 rounded-full border-2 border-[#1A1B1D] bg-[#BCD3D8]/50 shadow-md flex flex-col items-center justify-center text-[10px] font-mono font-bold text-[#1A1B1D]">
                  <span>B.14</span>
                  <Sparkles className="h-2.5 w-2.5 text-[#1A1B1D] mt-0.5" />
                </div>
                <div className="h-16 w-8 rounded-full border border-[#1A1B1D]/20 bg-white/80 shadow-sm flex flex-col items-center justify-center text-[9px] font-mono text-[#737578]">
                  <span>B.22</span>
                </div>
              </div>
            </div>

            <div className="w-full text-center border-t border-[#1A1B1D]/10 pt-2">
              <span className="text-[9px] font-mono font-bold tracking-wider text-[#1A1B1D]">
                ACTIVE BLEND ITERATIONS
              </span>
            </div>
          </div>
        );
      case "2023":
        return (
          <div className="relative flex h-full w-full flex-col items-center justify-between p-6 bg-[#F4F3EC] border border-[#1A1B1D]/10 rounded-xl overflow-hidden shadow-inner">
            <div className="flex w-full items-center justify-between text-[8px] font-mono text-[#737578] uppercase">
              <span>Retail Stockist</span>
              <span>Mar 2023</span>
            </div>

            <div className="my-auto flex flex-col items-center justify-center text-center">
              <Store className="h-12 w-12 text-[#1A1B1D]/40 mb-3" />
              <div className="flex items-center gap-2.5">
                <div className="h-16 w-9 rounded-lg bg-white border border-[#1A1B1D]/15 shadow-md flex flex-col items-center justify-between p-1.5">
                  <span className="text-[8px] font-bold text-[#1A1B1D]">01</span>
                  <span className="text-[6px] text-[#737578]">CLEAR</span>
                </div>
                <div className="h-16 w-9 rounded-lg bg-white border border-[#1A1B1D]/15 shadow-md flex flex-col items-center justify-between p-1.5">
                  <span className="text-[8px] font-bold text-[#1A1B1D]">01</span>
                  <span className="text-[6px] text-[#737578]">CLEAR</span>
                </div>
                <div className="h-16 w-9 rounded-lg bg-white border border-[#1A1B1D]/15 shadow-md flex flex-col items-center justify-between p-1.5">
                  <span className="text-[8px] font-bold text-[#1A1B1D]">01</span>
                  <span className="text-[6px] text-[#737578]">CLEAR</span>
                </div>
              </div>
            </div>

            <div className="w-full text-center border-t border-[#1A1B1D]/10 pt-2">
              <span className="text-[9px] font-mono font-bold tracking-wider text-[#1A1B1D]">
                MOORE WILSON&apos;S SHELF PLACEMENT
              </span>
            </div>
          </div>
        );
      case "2024":
        return (
          <div className="relative flex h-full w-full flex-col items-center justify-between p-6 bg-[#F8F6F0] border border-[#1A1B1D]/10 rounded-xl overflow-hidden shadow-inner">
            <div className="flex w-full items-center justify-between text-[8px] font-mono text-[#737578] uppercase">
              <span>Expansion</span>
              <span>Jul 2024</span>
            </div>

            <div className="my-auto flex flex-col items-center justify-center text-center">
              <MapPin className="h-12 w-12 text-[#E8C9A0] mb-3" />
              <div className="flex items-center gap-3">
                <div className="h-16 w-9 rounded-lg bg-white border border-[#1A1B1D]/15 shadow-md flex flex-col items-center justify-between p-1.5">
                  <span className="text-[8px] font-bold text-[#1A1B1D]">01</span>
                  <span className="text-[6px] text-[#737578]">CLEAR</span>
                </div>
                <div className="h-16 w-9 rounded-lg bg-[#E8C9A0]/30 border-2 border-[#E8C9A0] shadow-md flex flex-col items-center justify-between p-1.5">
                  <span className="text-[8px] font-bold text-[#1A1B1D]">02</span>
                  <span className="text-[6px] font-bold text-[#1A1B1D]">DAWN</span>
                </div>
              </div>
            </div>

            <div className="w-full text-center border-t border-[#1A1B1D]/10 pt-2">
              <span className="text-[9px] font-mono font-bold tracking-wider text-[#1A1B1D]">
                AUCKLAND & CHRISTCHURCH
              </span>
            </div>
          </div>
        );
      case "2025":
      default:
        return (
          <div className="relative flex h-full w-full flex-col items-center justify-between p-6 bg-[#F6F4EE] border border-[#1A1B1D]/10 rounded-xl overflow-hidden shadow-inner">
            <div className="flex w-full items-center justify-between text-[8px] font-mono text-[#737578] uppercase">
              <span>Trans-Tasman</span>
              <span>Sep 2025</span>
            </div>

            <div className="my-auto flex flex-col items-center justify-center text-center">
              <Camera className="h-12 w-12 text-[#C9B5C8] mb-3" />
              <div className="flex items-center gap-2">
                <div className="h-16 w-9 rounded-lg bg-white border border-[#1A1B1D]/15 shadow-md flex flex-col items-center justify-between p-1.5">
                  <span className="text-[8px] font-bold text-[#1A1B1D]">01</span>
                  <span className="text-[6px] text-[#737578]">CLEAR</span>
                </div>
                <div className="h-16 w-9 rounded-lg bg-[#E8C9A0]/30 border border-[#1A1B1D]/15 shadow-md flex flex-col items-center justify-between p-1.5">
                  <span className="text-[8px] font-bold text-[#1A1B1D]">02</span>
                  <span className="text-[6px] text-[#737578]">DAWN</span>
                </div>
                <div className="h-16 w-9 rounded-lg bg-[#C9B5C8]/40 border-2 border-[#C9B5C8] shadow-md flex flex-col items-center justify-between p-1.5">
                  <span className="text-[8px] font-bold text-[#1A1B1D]">03</span>
                  <span className="text-[6px] font-bold text-[#1A1B1D]">DUSK</span>
                </div>
              </div>
            </div>

            <div className="w-full text-center border-t border-[#1A1B1D]/10 pt-2">
              <span className="text-[9px] font-mono font-bold tracking-wider text-[#1A1B1D]">
                MELBOURNE LAUNCH TRIO
              </span>
            </div>
          </div>
        );
    }
  };

  return (
    <div
      ref={cardRef}
      className="flex flex-col w-[clamp(280px,26vw,380px)] will-change-[transform,opacity]"
    >
      {/* Archival Polaroid Frame */}
      <div className="relative flex h-[clamp(360px,50vh,460px)] w-full flex-col justify-between rounded-2xl border border-[#1A1B1D]/15 bg-white p-5 shadow-2xl shadow-[#1A1B1D]/10">
        {/* Figure Card Header */}
        <div className="flex items-center justify-between border-b border-[#1A1B1D]/10 pb-2.5">
          <span className="text-[10px] font-mono font-bold tracking-[0.24em] uppercase text-[#1A1B1D]">
            {chapter.figureNumber}
          </span>
          <span className="rounded-full bg-[#1A1B1D]/5 px-2.5 py-0.5 text-[8.5px] font-mono font-medium uppercase tracking-wider text-[#737578]">
            {chapter.figureTag}
          </span>
        </div>

        {/* Visual Showcase Center */}
        <div className="my-auto h-[clamp(210px,30vh,280px)] w-full py-2">
          {renderFigureVisual()}
        </div>

        {/* Figure Card Bottom Metadata */}
        <div className="border-t border-[#1A1B1D]/10 pt-2.5">
          <p className="text-[10px] font-mono font-semibold tracking-wider uppercase text-[#1A1B1D] truncate">
            {chapter.figureCaption}
          </p>
          <div className="flex items-center justify-between text-[9px] font-mono text-[#737578] mt-1">
            <span>{chapter.figureLocation}</span>
            <span>{chapter.figureDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
