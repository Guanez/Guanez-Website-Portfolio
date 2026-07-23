"use client";

import { motion } from "framer-motion";

interface CursorProps {
  x: number;
  y: number;
  clicking?: boolean;
}

/**
 * Scripted, code-drawn cursor used inside the simulation.
 * Drawn entirely with SVG — no image assets.
 * - Click animation with scale down + spring bounce
 * - Glow effect
 * - Ripple effect on click
 */
export default function Cursor({ x, y, clicking = false }: CursorProps) {
  return (
    <motion.div
      style={{ x, y }}
      className="pointer-events-none absolute top-0 left-0 z-40"
    >
      {/* glow */}
      <motion.div
        animate={{ scale: clicking ? 0.6 : 1, opacity: clicking ? 1 : 0.7 }}
        transition={{ duration: 0.18 }}
        className="absolute -inset-3 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(124,245,196,0.55) 0%, rgba(124,245,196,0) 70%)",
          filter: "blur(2px)",
        }}
      />
      {/* arrow with spring bounce on click */}
      <motion.svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        animate={{
          scale: clicking ? [0.85, 1.05, 1] : 1,
        }}
        transition={{
          duration: clicking ? 0.3 : 0,
          ease: clicking ? [0.4, 0, 0.2, 1] : "linear",
        }}
        className="relative drop-shadow-[0_0_8px_rgba(124,245,196,0.7)]"
      >
        <path
          d="M3 2 L3 17 L7.5 13 L10 19 L12.5 18 L10 12 L16 12 Z"
          fill="white"
          stroke="#0b0d10"
          strokeWidth="1"
          strokeLinejoin="round"
        />
      </motion.svg>

      {/* click ripple */}
      {clicking && (
        <motion.span
          initial={{ scale: 0, opacity: 0.6 }}
          animate={{ scale: 2.4, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="absolute left-2 top-2 h-3 w-3 rounded-full border border-accent"
        />
      )}
    </motion.div>
  );
}
