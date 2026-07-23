"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { useFrame } from "./useFrame";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    // Expose lenis globally for anchor links
    (window as any).__lenis = lenis;

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useFrame((time: number) => {
    lenisRef.current?.raf(time);
  });

  return <>{children}</>;
}
