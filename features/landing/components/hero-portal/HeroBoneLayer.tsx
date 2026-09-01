"use client";

import React, { forwardRef, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(TextPlugin);
}

interface HeroBoneLayerProps {
  lettersRef: React.MutableRefObject<(HTMLSpanElement | null)[]>;
}

export const HeroBoneLayer = forwardRef<HTMLDivElement, HeroBoneLayerProps>(
  ({ lettersRef }, ref) => {
    const typewriterTextRef = useRef<HTMLHeadingElement>(null);
    const cursorRef = useRef<HTMLSpanElement>(null);
    const finalWordmarkRef = useRef<HTMLDivElement>(null);
    const dioramaWrapperRef = useRef<HTMLDivElement>(null);
    const dioramaImageRef = useRef<HTMLDivElement>(null);

    // Wordmark configuration with Adaptive Dual-Tone Styling
    const wordmarkConfig = [
      { char: "B", className: "text-[#3E5237]" },
      { char: "I", className: "text-[#3E5237]" },
      { char: "C", className: "text-[#3E5237]" },
      { char: "K", className: "text-[#3E5237]" },
      {
        char: "E",
        // Transition letter bridging the boundary into the diorama
        className:
          "text-[#4A5D43] sm:text-[#65785E] lg:text-[#8D9F86] drop-shadow-[0_2px_10px_rgba(0,0,0,0.18)]",
      },
      {
        char: "T",
        // Positioned inside the dark diorama: Light Ivory Cream with 3D relief
        className:
          "text-[#FAF4EC] drop-shadow-[0_4px_16px_rgba(0,0,0,0.45)] sm:text-[#FAF4EC]",
      },
    ];

    // GSAP Animations (Typewriter + Diorama Cinematic Reveal + Ambient Levitation)
    useGSAP(() => {
      // 1. Diorama Cinematic Entrance
      if (dioramaWrapperRef.current) {
        gsap.fromTo(
          dioramaWrapperRef.current,
          { y: 70, opacity: 0, scale: 0.94 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.6,
            ease: "power3.out",
            delay: 0.25,
          }
        );
      }

      // 2. Diorama Organic Floating / Breathing Loop
      if (dioramaImageRef.current) {
        gsap.to(dioramaImageRef.current, {
          y: -7,
          duration: 3.4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      // 3. Blinking Cursor Animation
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          opacity: 0,
          repeat: -1,
          yoyo: true,
          duration: 0.45,
          ease: "power2.inOut",
        });
      }

      // 4. Typewriter Storytelling Sequence: BOUQUET -> B -> BICKET. -> Dual-Tone Magnetic Reveal
      const tl = gsap.timeline({ delay: 0.2 });

      if (typewriterTextRef.current && finalWordmarkRef.current && cursorRef.current) {
        tl.to(typewriterTextRef.current, {
          text: "BOUQUET",
          duration: 0.75,
          ease: "none",
        })
          .to(typewriterTextRef.current, {
            text: "B",
            duration: 0.45,
            ease: "none",
            delay: 0.35,
          })
          .to(typewriterTextRef.current, {
            text: "BICKET.",
            duration: 0.85,
            ease: "none",
          })
          .to(cursorRef.current, {
            opacity: 0,
            duration: 0.3,
            delay: 0.25,
            onComplete: () => {
              // Smoothly fade from plain typed text to dual-tone magnetic letters
              gsap.to(typewriterTextRef.current, { opacity: 0, duration: 0.3 });
              gsap.fromTo(
                finalWordmarkRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 0.4 }
              );
            },
          });
      }
    });

    // 5. Interactive 3D Parallax & Mouse Tilt Physics on Diorama
    const handleMouseMove = useCallback((e: MouseEvent) => {
      if (!dioramaWrapperRef.current) return;
      const { innerWidth, innerHeight } = window;
      const normX = (e.clientX - innerWidth / 2) / (innerWidth / 2);
      const normY = (e.clientY - innerHeight / 2) / (innerHeight / 2);

      gsap.to(dioramaWrapperRef.current, {
        rotateY: normX * 6,
        rotateX: -normY * 4.5,
        x: normX * 12,
        y: normY * 8,
        duration: 0.8,
        ease: "power2.out",
      });
    }, []);

    const handleMouseLeave = useCallback(() => {
      if (!dioramaWrapperRef.current) return;
      gsap.to(dioramaWrapperRef.current, {
        rotateY: 0,
        rotateX: 0,
        x: 0,
        y: 0,
        duration: 1.2,
        ease: "elastic.out(1, 0.5)",
      });
    }, []);

    useEffect(() => {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseleave", handleMouseLeave);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseleave", handleMouseLeave);
      };
    }, [handleMouseMove, handleMouseLeave]);

    return (
      <div
        ref={ref}
        className="absolute inset-0 z-10 flex flex-col justify-between px-6 md:px-14 lg:px-20 pt-[calc(64px+clamp(6px,1.5vh,16px))] pb-[clamp(18px,3vh,32px)] select-none text-[#3E5237] overflow-hidden"
      >
        {/* 1. Photorealistic Ivory Studio Background with Natural Dappled Sunlight Shadow */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
          <Image
            src="/asset-landing/hero-bg-ivory-sunlight.webp"
            alt="Warm Ivory Studio Wall with Natural Window Sunlight Shadows"
            fill
            priority
            quality={95}
            className="object-cover object-center"
          />
        </div>

        {/* 2. Right Side: Massive Circular Diorama Showcase with 3D Mouse Parallax & Ambient Levitation */}
        <div
          ref={dioramaWrapperRef}
          aria-hidden="true"
          className="pointer-events-none absolute right-[clamp(0px,3vw,80px)] bottom-[clamp(-10px,-8vh,-25px)] z-10 h-[clamp(440px,52vw,740px)] w-[clamp(440px,52vw,740px)] [perspective:1000px] will-change-transform"
        >
          <div
            ref={dioramaImageRef}
            className="relative h-full w-full will-change-transform"
          >
            <Image
              src="/asset-landing/hero-diorama-frame1.webp"
              alt="Bicket Curated Gifts & Floral Showcase"
              fill
              priority
              sizes="(max-width: 768px) 450px, (max-width: 1200px) 620px, 740px"
              className="object-contain object-bottom drop-shadow-[0_30px_50px_rgba(62,82,55,0.22)]"
            />
          </div>
        </div>

        {/* 3. Giant Center-Left Typography: Typewriter Intro + Dual-Tone Magnetic B I C K E T . */}
        <div className="relative flex flex-1 items-center my-auto w-full max-w-360 mx-auto z-20 pointer-events-none">
          <div className="w-full pl-[clamp(12px,2vw,40px)] pointer-events-auto relative">
            {/* Live Typewriter Intro Stage */}
            <div className="flex items-baseline absolute inset-0 z-10">
              <h1
                ref={typewriterTextRef}
                className="inline-block text-[clamp(96px,18.5vw,290px)] font-serif font-light leading-[0.76] tracking-[-0.02em] text-[#3E5237]"
              >
                {/* GSAP TextPlugin populates this dynamically */}
              </h1>
              <span
                ref={cursorRef}
                className="inline-block text-[clamp(80px,16vw,250px)] font-light text-[#566B4D] leading-none ml-1 align-baseline select-none"
              >
                |
              </span>
            </div>

            {/* Permanent Dual-Tone Interactive Magnetic Wordmark */}
            <div ref={finalWordmarkRef} className="opacity-0">
              <h1 className="flex items-baseline text-[clamp(96px,18.5vw,290px)] font-serif font-light leading-[0.76] tracking-[-0.02em]">
                {wordmarkConfig.map((item, i) => (
                  <span
                    key={i}
                    ref={(el) => {
                      lettersRef.current[i] = el;
                    }}
                    className={`inline-block will-change-transform ${item.className}`}
                  >
                    {item.char}
                  </span>
                ))}
                <span
                  ref={(el) => {
                    lettersRef.current[6] = el;
                  }}
                  className="inline-block text-[#FAF4EC] drop-shadow-[0_4px_16px_rgba(0,0,0,0.5)] will-change-transform ml-1"
                >
                  .
                </span>
              </h1>
            </div>
          </div>
        </div>

        {/* 4. Left Meta Description (Aligned vertically under letter 'B') */}
        <div className="absolute left-[clamp(32px,7.5vw,120px)] bottom-[clamp(80px,13vh,145px)] z-30 flex flex-col items-start gap-3.5 max-w-xs pointer-events-auto">
          {/* Micro Floral Star Icon */}
          <div className="flex items-center gap-1.5 text-[#566B4D]">
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <circle cx="12" cy="12" r="2" fill="currentColor" />
              <path d="M12 2v4M12 18v4M2 12h4M18 12h4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
            </svg>
          </div>

          <div className="space-y-0.5">
            <p className="font-mono text-[10px] sm:text-[11px] font-semibold tracking-[0.22em] uppercase text-[#3E5237]/85 leading-relaxed">
              Curated Gifts <br />
              And Creative Products <br />
              Made by Local Artisans
            </p>
          </div>

          <a
            href="#flavors"
            className="group inline-flex items-center gap-2 font-mono text-[10px] sm:text-[11px] font-bold tracking-[0.22em] uppercase text-[#3E5237] transition-all hover:text-[#566B4D]"
          >
            <span className="border-b border-[#3E5237]/40 pb-0.5 group-hover:border-[#566B4D]">
              Explore Collection
            </span>
            <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>

        {/* 5. Bottom Baseline Bar (Makassar Origin & Scroll Indicator - Clean No Border) */}
        <div className="flex items-end justify-between w-full max-w-360 mx-auto z-30 pt-4">
          {/* Bottom Left: Curated in Makassar */}
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#566B4D]" />
            <span className="font-mono text-[9px] sm:text-[10px] font-medium tracking-[0.26em] uppercase text-[#3E5237]/75">
              Curated in Makassar, Indonesia
            </span>
          </div>

          {/* Bottom Center: Scroll to Discover Pill Indicator */}
          <div className="hidden sm:flex flex-col items-center gap-2">
            <span className="font-mono text-[9px] font-semibold tracking-[0.28em] uppercase text-[#3E5237]/80">
              Scroll to Discover
            </span>
            <div className="relative h-6 w-3.5 rounded-full border border-[#3E5237]/35 p-0.5 flex justify-center">
              <div className="h-1.5 w-1 rounded-full bg-[#566B4D] animate-bounce" />
            </div>
          </div>

          {/* Bottom Right: Edition Label */}
          <div className="text-right hidden sm:block">
            <span className="font-mono text-[9px] font-semibold tracking-[0.24em] uppercase text-[#3E5237]/70">
              Artisan Edition 01
            </span>
          </div>
        </div>
      </div>
    );
  }
);

HeroBoneLayer.displayName = "HeroBoneLayer";
