"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface AuthLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  heroHeadline?: React.ReactNode;
  heroSubtitle?: string;
  imagePosition?: "left" | "right";
}

export function AuthLayout({
  children,
  title,
  subtitle,
  heroHeadline,
  heroSubtitle = "Discover creators, share ideas, and turn your vision into something real.",
  imagePosition = "right",
}: AuthLayoutProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".auth-card",
        { opacity: 0, scale: 0.99, y: 12 },
        { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );
      gsap.fromTo(
        ".hero-text-block > *",
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.06,
          delay: 0.1,
          ease: "power2.out",
        }
      );
    },
    { scope: containerRef }
  );

  const isImageLeft = imagePosition === "left";

  return (
    <main
      ref={containerRef}
      className="min-h-screen w-full bg-[#EFEFED] text-neutral-900 flex items-center justify-center p-2 sm:p-4 md:p-6 lg:p-8 relative overflow-hidden antialiased selection:bg-indigo-600 selection:text-white"
    >
      {/* Ambient Background Glow */}
      <div className="absolute top-12 left-1/4 w-[400px] h-[400px] bg-violet-200/20 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-12 right-1/4 w-[380px] h-[380px] bg-amber-100/25 blur-[120px] rounded-full pointer-events-none" />

      {/* ─── MAIN CARD CONTAINER ──────────────────────────────────
          - Fluid max width & height: fits inside screen without cutting off
          - grid-cols-1 lg:grid-cols-2
          ─────────────────────────────────────────────────────────── */}
      <div
        className="auth-card w-full bg-white border border-neutral-200/80 shadow-2xl shadow-neutral-900/8 overflow-hidden grid grid-cols-1 lg:grid-cols-2 relative z-10 rounded-[clamp(16px,2vw,28px)] max-h-[calc(100dvh-1rem)] sm:max-h-[calc(100dvh-2rem)]"
        style={{
          maxWidth: "clamp(320px, 90vw, 1140px)",
        }}
      >
        {/* Center Inter-Panel Diamond Ornament (Desktop) */}
        <div
          aria-hidden="true"
          className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none items-center justify-center w-6 h-6 rounded-full bg-white border border-neutral-200/90 shadow-xs text-[#6355D9] text-xs font-serif select-none"
        >
          ✦
        </div>

        {/* ─── VISUAL / PHOTOGRAPHY HERO PANEL ─── */}
        <section
          aria-label="Editorial Showcase"
          className={`hidden lg:flex relative bg-[#EBE7DF] overflow-hidden flex-col justify-between select-none p-[clamp(20px,2.8vw,44px)] ${
            isImageLeft ? "order-1" : "order-2"
          }`}
        >
          {/* Background Photography Asset */}
          <Image
            src="/aset/bglogin.png"
            alt="Gifteria Studio Desk with Creative Artwork"
            fill
            priority
            quality={90}
            className="object-cover object-center pointer-events-none"
          />

          {/* Top Botanical Line Art + Dot Grid */}
          <div
            className={`absolute top-3 ${
              isImageLeft ? "left-3" : "right-3"
            } pointer-events-none select-none opacity-45 z-10`}
          >
            <svg
              style={{ width: "clamp(64px, 7vw, 110px)", height: "clamp(64px, 7vw, 110px)" }}
              viewBox="0 0 180 180"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-[#6355D9]"
            >
              <path
                d="M170 10C140 40 120 85 80 100M80 100C105 115 120 140 115 160M80 100C60 120 35 125 20 120M80 100C65 85 60 55 70 35M115 60C125 75 140 80 150 75"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div
              className={`grid grid-cols-4 gap-1.5 pt-1 ${
                isImageLeft ? "pl-2" : "pr-2"
              } opacity-30`}
            >
              {Array.from({ length: 16 }).map((_, i) => (
                <div key={i} className="w-1 h-1 rounded-full bg-[#6355D9]" />
              ))}
            </div>
          </div>

          {/* Bottom Floral Accent (Register: image left) */}
          {isImageLeft && (
            <div className="absolute -bottom-1 -left-1 pointer-events-none select-none opacity-35 z-10">
              <svg
                width="90"
                height="90"
                viewBox="0 0 160 160"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-[#8B7CF6]"
              >
                <path
                  d="M10 150C35 125 50 85 90 70M90 70C65 55 50 30 55 10M90 70C110 50 135 45 150 50M90 70C105 85 110 115 100 135M55 110C45 95 30 90 20 95M75 90C70 105 55 120 40 120"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          )}

          {/* Hero Text Block */}
          <div className="hero-text-block relative z-20 space-y-2.5 max-w-[320px]">
            {/* Star Motif */}
            <div className="inline-flex items-center">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                className="text-[#6355D9]"
              >
                <path
                  d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z"
                  fill="currentColor"
                />
              </svg>
            </div>

            {/* Headline — fluid font size */}
            {heroHeadline ?? (
              <h2
                className="font-serif font-normal leading-[1.18] text-[#111827] tracking-tight"
                style={{ fontSize: "clamp(20px, 2.4vw, 32px)" }}
              >
                Where creativity <br />
                becomes a trusted <br />
                <span className="italic text-[#4F46E5]">conversation.</span>
              </h2>
            )}

            {/* Divider */}
            <div className="w-8 h-[1.5px] bg-[#DDD6FE]" />

            {/* Subtitle — fluid font size */}
            <p
              className="text-neutral-600 leading-relaxed font-sans max-w-[260px]"
              style={{ fontSize: "clamp(10.5px, 0.95vw, 13px)" }}
            >
              {heroSubtitle}
            </p>

            {/* Coral Sparkle (Register) */}
            {isImageLeft && (
              <div className="pt-1.5">
                <span className="text-[#E76F61] text-xs select-none opacity-80 inline-block">
                  ✦
                </span>
              </div>
            )}
          </div>

          <div className="relative z-20" />
        </section>

        {/* ─── AUTHENTICATION FORM PANEL ─── */}
        <section
          aria-label="Form Autentikasi"
          className={`flex flex-col justify-center relative bg-white overflow-y-auto px-[clamp(18px,2.8vw,42px)] py-[clamp(14px,2vh,32px)] ${
            isImageLeft ? "order-2" : "order-1"
          }`}
        >
          {/* Corner Bracket + Dot Grid */}
          <div
            className={`absolute top-2.5 ${
              isImageLeft
                ? "right-2.5 sm:top-3 sm:right-3"
                : "left-2.5 sm:top-3 sm:left-3"
            } pointer-events-none select-none`}
          >
            <svg
              width="26"
              height="26"
              viewBox="0 0 40 40"
              fill="none"
              className={`text-[#6355D9] opacity-60 ${
                isImageLeft ? "scale-x-[-1]" : ""
              }`}
            >
              <path
                d="M1 28V6C1 3.23858 3.23858 1 6 1H28"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <circle cx="28" cy="1" r="1.5" fill="currentColor" />
            </svg>
            <div
              className={`grid grid-cols-4 gap-1 pt-1 ${
                isImageLeft ? "pr-1" : "pl-1"
              } opacity-20`}
            >
              {Array.from({ length: 16 }).map((_, i) => (
                <div key={i} className="w-0.5 h-0.5 rounded-full bg-[#6355D9]" />
              ))}
            </div>
          </div>

          {/* Bottom Floral (Login: form left) */}
          {!isImageLeft && (
            <div className="absolute -bottom-1 -left-1 pointer-events-none select-none opacity-25">
              <svg
                width="80"
                height="80"
                viewBox="0 0 160 160"
                fill="none"
                className="text-[#8B7CF6]"
              >
                <path
                  d="M10 150C35 125 50 85 90 70M90 70C65 55 50 30 55 10M90 70C110 50 135 45 150 50M90 70C105 85 110 115 100 135M55 110C45 95 30 90 20 95M75 90C70 105 55 120 40 120"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          )}

          {/* Form Content — fluid max-width */}
          <div
            className="w-full mx-auto relative z-10"
            style={{ maxWidth: "clamp(260px, 32vw, 360px)" }}
          >
            {title && (
              <div className="text-center space-y-0.5 pb-2.5">
                <h1 className="font-serif text-xl sm:text-2xl font-normal text-neutral-900">
                  {title}
                </h1>
                {subtitle && (
                  <p className="text-[11px] sm:text-xs text-neutral-500">
                    {subtitle}
                  </p>
                )}
              </div>
            )}
            {children}
          </div>
        </section>
      </div>
    </main>
  );
}
