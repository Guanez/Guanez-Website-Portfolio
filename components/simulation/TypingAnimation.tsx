"use client";

import { useEffect, useState } from "react";

interface TypingProps {
  text: string;
  startDelay?: number;
  baseSpeed?: number;
  onDone?: () => void;
}

export default function useTyping({
  text,
  startDelay = 0,
  baseSpeed = 70,
  onDone,
}: TypingProps) {
  const [typed, setTyped] = useState("");

  useEffect(() => {
    let cancelled = false;
    let i = 0;
    let timeoutId: ReturnType<typeof setTimeout>;

    const tick = () => {
      if (cancelled) return;
      if (i >= text.length) {
        onDone?.();
        return;
      }
      setTyped(text.slice(0, i + 1));
      i += 1;
      const jitter = Math.random() * 60;
      timeoutId = setTimeout(tick, baseSpeed + jitter);
    };

    const startId = setTimeout(tick, startDelay);

    return () => {
      cancelled = true;
      clearTimeout(startId);
      clearTimeout(timeoutId!);
    };
  }, [text, startDelay, baseSpeed, onDone]);

  return typed;
}
