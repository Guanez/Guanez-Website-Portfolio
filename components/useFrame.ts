"use client";

import { useEffect, useRef } from "react";

export function useFrame(callback: (time: number) => void) {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    let animationFrameId: number;

    const loop = (time: number) => {
      callbackRef.current(time);
      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);
}
