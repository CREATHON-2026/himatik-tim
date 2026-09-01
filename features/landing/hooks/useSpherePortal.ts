"use client";

import { useState, useEffect, useCallback, useSyncExternalStore } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SphereCoordinates } from "../components/hero-portal/types";

interface UseSpherePortalOptions {
  containerRef: React.RefObject<HTMLElement | null>;
  lettersRef: React.MutableRefObject<(HTMLSpanElement | null)[]>;
  auraGlowRef: React.RefObject<HTMLDivElement | null>;
  canWrapperRef: React.RefObject<HTMLDivElement | null>;
  baseRadius?: number;
}

const DEFAULT_COORDINATES: SphereCoordinates = { x: 450, y: 380 };
const emptySubscribe = () => () => {};

export function useSpherePortal({
  containerRef,
  lettersRef,
  auraGlowRef,
  canWrapperRef,
  baseRadius = 240,
}: UseSpherePortalOptions) {
  // Official React 19 pattern to detect client mount with zero cascading renders
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  // Constant initial coordinates guarantees 100% SSR / Client HTML match
  const [mousePos, setMousePos] = useState<SphereCoordinates>(DEFAULT_COORDINATES);
  const [lensPos, setLensPos] = useState<SphereCoordinates>(DEFAULT_COORDINATES);

  // Smooth physics loop for floating sphere portal (lerp 0.08)
  useEffect(() => {
    if (!isMounted) return;
    let animationFrameId: number;

    const updatePhysics = () => {
      setLensPos((prev) => {
        const dx = mousePos.x - prev.x;
        const dy = mousePos.y - prev.y;
        return {
          x: prev.x + dx * 0.08,
          y: prev.y + dy * 0.08,
        };
      });
      animationFrameId = requestAnimationFrame(updatePhysics);
    };

    animationFrameId = requestAnimationFrame(updatePhysics);
    return () => cancelAnimationFrame(animationFrameId);
  }, [mousePos, isMounted]);

  // GSAP Animations with useGSAP
  useGSAP(
    () => {
      // 1. Initial Letter Entrance Animation for STILL.
      const validLetters = lettersRef.current.filter(Boolean);
      if (validLetters.length > 0) {
        gsap.fromTo(
          validLetters,
          { y: 80, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.2,
            stagger: 0.08,
            ease: "power3.out",
            delay: 0.1,
          }
        );
      }

      // 2. Cyan Aura Glow Ambient Breathing Animation
      if (auraGlowRef.current) {
        gsap.to(auraGlowRef.current, {
          scale: 1.18,
          opacity: 0.95,
          duration: 3.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    },
    { scope: containerRef }
  );

  // Mouse Move Event Handler (calculated relative to container)
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const localX = e.clientX - rect.left;
      const localY = e.clientY - rect.top;

      setMousePos({ x: localX, y: localY });

      if (canWrapperRef.current) {
        const normX = (localX - rect.width / 2) / (rect.width / 2);
        const normY = (localY - rect.height / 2) / (rect.height / 2);

        gsap.to(canWrapperRef.current, {
          rotateY: normX * 18,
          rotateX: -normY * 14,
          x: normX * 16,
          y: normY * 12,
          duration: 0.7,
          ease: "power2.out",
        });
      }
    },
    [canWrapperRef, containerRef]
  );

  const handleMouseLeave = useCallback(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: rect.width * 0.35,
        y: rect.height * 0.48,
      });
    }
    if (canWrapperRef.current) {
      gsap.to(canWrapperRef.current, {
        rotateY: 0,
        rotateX: 0,
        x: 0,
        y: 0,
        duration: 1.2,
        ease: "elastic.out(1, 0.4)",
      });
    }
  }, [canWrapperRef, containerRef]);

  // Dynamic clipPath for dark layer inside Hero
  const currentClipPath = `circle(${baseRadius}px at ${lensPos.x}px ${lensPos.y}px)`;

  return {
    lensPos,
    currentRadius: baseRadius,
    currentClipPath,
    isMounted,
    handleMouseMove,
    handleMouseLeave,
  };
}
