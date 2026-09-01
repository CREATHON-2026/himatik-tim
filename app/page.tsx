"use client";

import React, { useRef, useEffect, useCallback, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Lenis from "lenis";
import { HeroNavbar } from "@/features/landing/components/hero-portal/HeroNavbar";
import { HeroBoneLayer } from "@/features/landing/components/hero-portal/HeroBoneLayer";
import { HeroDarkLayer } from "@/features/landing/components/hero-portal/HeroDarkLayer";
import { HeroSphereLens } from "@/features/landing/components/hero-portal/HeroSphereLens";
import { SectionFlavors } from "@/features/landing/components/flavors/SectionFlavors";
import { SectionInside } from "@/features/landing/components/inside/SectionInside";
import { SectionStory } from "@/features/landing/components/story/SectionStory";
import { SectionPress } from "@/features/landing/components/press/SectionPress";
import { SectionWhereAvailable } from "@/features/landing/components/where-available/SectionWhereAvailable";
import { DirectProduct } from "@/features/landing/components/where-available/types";
import { useSpherePortal } from "@/features/landing/hooks/useSpherePortal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

export default function StillLandingPage() {
  const mainContainerRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLElement>(null);
  const flavorsSectionRef = useRef<HTMLElement>(null);
  const insideSectionRef = useRef<HTMLElement>(null);
  const storySectionRef = useRef<HTMLElement>(null);
  const pressSectionRef = useRef<HTMLElement>(null);
  const whereAvailableRef = useRef<HTMLElement>(null);
  const darkIrisRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const auraGlowRef = useRef<HTMLDivElement>(null);
  const canWrapperRef = useRef<HTMLDivElement>(null);
  const sphereOverlayRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);

  // Dynamic cart state for e-commerce interaction
  const [cartCount, setCartCount] = useState(0);

  const handleAddToCart = useCallback((_product: DirectProduct, _packSize: string) => {
    setCartCount((prev) => prev + 1);
  }, []);

  // Initialize Ultra-Luxury Lenis Momentum Smooth Scroll synchronized with GSAP Ticker
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Luxurious exponential ease
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.2,
      syncTouch: true,
    });

    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Programmatic smooth scroll handler with cinematic deceleration
  const handleNavigate = useCallback((targetId: string) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(targetId, {
        duration: 1.4,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      gsap.to(window, {
        scrollTo: { y: targetId, autoKill: false },
        duration: 1.4,
        ease: "power3.inOut",
      });
    }
  }, []);

  // Encapsulated physics and smooth lens portal tracking for Hero
  const {
    lensPos,
    currentRadius,
    currentClipPath,
    handleMouseMove,
    handleMouseLeave,
  } = useSpherePortal({
    containerRef: heroSectionRef,
    lettersRef,
    auraGlowRef,
    canWrapperRef,
    baseRadius: 240,
  });

  return (
    <div
      ref={mainContainerRef}
      className="relative min-h-screen w-full bg-[#EFEDE6] font-sans text-[#1A1B1D] selection:bg-[#BCD3D8] selection:text-[#1A1B1D]"
    >
      {/* 1. Header Navigation with Smooth Programmatic Scrolling & Dynamic Cart */}
      <HeroNavbar cartCount={cartCount} onNavigate={handleNavigate} />

      {/* 2. Section 1: Hero (Natural flow with butter-smooth momentum scroll) */}
      <section
        ref={heroSectionRef}
        id="hero"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative flex h-dvh w-full items-center justify-center overflow-hidden bg-[#EFEDE6]"
      >
        {/* Layer A: Light Bone Base Layer */}
        <HeroBoneLayer lettersRef={lettersRef} />

        {/* Layer B: Dark Iris Portal Layer (peek into the formula) */}
        <HeroDarkLayer
          ref={darkIrisRef}
          clipPath={currentClipPath}
          auraGlowRef={auraGlowRef}
          canWrapperRef={canWrapperRef}
        />

        {/* Layer C: 3D Transparent Sphere Lens Overlay (Absolute inside Hero) */}
        <HeroSphereLens
          ref={sphereOverlayRef}
          lensPos={lensPos}
          currentRadius={currentRadius}
        />
      </section>

      {/* 3. Section 2: Three Formulations (Pinned GSAP Continuous Scrub + Magnetic Snap) */}
      <SectionFlavors ref={flavorsSectionRef} />

      {/* 4. Section 3: Functional Ingredients (Pinned GSAP Continuous Scrub + Magnetic Snap) */}
      <SectionInside ref={insideSectionRef} />

      {/* 5. Section 4: Story Timeline (Pinned GSAP 5-Year Archive Scrub 2021 -> 2025) */}
      <SectionStory ref={storySectionRef} />

      {/* 6. Section 5: Press & Infinite Marquee Ticker */}
      <SectionPress ref={pressSectionRef} />

      {/* 7. Section 6: Where Available / Stockists, Direct Shop & Editorial Footer */}
      <SectionWhereAvailable
        ref={whereAvailableRef}
        onAddToCart={handleAddToCart}
        onNavigate={handleNavigate}
      />
    </div>
  );
}
