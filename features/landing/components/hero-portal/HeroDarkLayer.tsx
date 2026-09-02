"use client";

import React, { forwardRef } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, ShieldCheck, Heart } from "lucide-react";

interface HeroDarkLayerProps {
  clipPath: string;
  auraGlowRef: React.RefObject<HTMLDivElement | null>;
  canWrapperRef: React.RefObject<HTMLDivElement | null>;
}

export const HeroDarkLayer = forwardRef<HTMLDivElement, HeroDarkLayerProps>(
  ({ clipPath, auraGlowRef }, ref) => {
    return (
      <div
        ref={ref}
        suppressHydrationWarning
        className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center bg-[#18181B] text-[#FAFAF9] will-change-[clip-path]"
        style={{ clipPath }}
      >
        {/* Dynamic Royal Violet & Coral Radial Ambient Aura */}
        <div
          ref={auraGlowRef}
          aria-hidden="true"
          className="pointer-events-none absolute h-[55vh] w-[55vh] rounded-full opacity-70"
          style={{
            background:
              "radial-gradient(circle, rgba(139, 124, 246, 0.4) 0%, rgba(99, 85, 217, 0.25) 28%, rgba(231, 111, 97, 0.15) 55%, transparent 75%)",
            filter: "blur(60px)",
          }}
        />

        <div className="relative z-10 mx-auto grid h-full w-full max-w-360 grid-cols-1 items-center px-6 pt-[calc(56px+clamp(6px,1.5vh,16px))] pb-[clamp(24px,4vh,44px)] md:grid-cols-12 md:px-14">
          {/* Left Content Column */}
          <div className="z-20 flex flex-col justify-center md:col-span-6 lg:col-span-5">
            <div className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.24em] uppercase text-[#C4B5FD]">
              <Sparkles className="size-3.5 text-[#A78BFA]" />
              <span className="text-[#EDE9FE]">01</span>
              <span className="text-white/40">/</span>
              <span>Sanggar Kriya Terkurasi</span>
            </div>

            <h2 className="mt-3 font-serif text-2xl font-light leading-[1.12] tracking-tight text-white sm:text-3xl md:text-4xl">
              Sentuhan tangan manusia di setiap detail kado.
            </h2>

            <div className="my-3 h-px w-16 bg-[#A78BFA]" />

            <p className="max-w-md text-xs sm:text-sm leading-relaxed text-white/80 font-light">
              Setiap karya bunga, hampers, dan kartu ucapan dirangkai satu per satu oleh kreator independen dengan perhatian penuh pada cerita penerima kado Anda.
            </p>

            {/* Functional Feature Pills */}
            <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-white/70">
              <div className="flex items-center gap-1.5">
                <Heart className="size-3.5 text-[#E76F61]" />
                <span className="text-[11px] uppercase tracking-wider text-white/80 font-mono">
                  100% Handcrafted
                </span>
              </div>

              <span className="text-white/30">·</span>

              <div className="flex items-center gap-1.5">
                <ShieldCheck className="size-3.5 text-[#A78BFA]" />
                <span className="text-[11px] uppercase tracking-wider text-white/80 font-mono">
                  Escrow Guarantee
                </span>
              </div>
            </div>

            {/* Action Button */}
            <div className="mt-5">
              <Link
                href="/katalog"
                className="group pointer-events-auto inline-flex items-center gap-2 rounded-xl bg-[#6355D9] hover:bg-[#5145C6] px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white transition-all shadow-md"
              >
                <span>Lihat Koleksi Kado</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

HeroDarkLayer.displayName = "HeroDarkLayer";
