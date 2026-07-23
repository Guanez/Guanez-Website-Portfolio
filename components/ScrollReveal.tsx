"use client";

import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

type RevealVariant = "fade-up" | "fade-down" | "slide-left" | "slide-right" | "scale-up" | "rotate-in" | "blur-in" | "clip-up";

const revealVariants: Record<RevealVariant, Variants> = {
  "fade-up": {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 },
  },
  "fade-down": {
    hidden: { opacity: 0, y: -40 },
    visible: { opacity: 1, y: 0 },
  },
  "slide-left": {
    hidden: { opacity: 0, x: -80 },
    visible: { opacity: 1, x: 0 },
  },
  "slide-right": {
    hidden: { opacity: 0, x: 80 },
    visible: { opacity: 1, x: 0 },
  },
  "scale-up": {
    hidden: { opacity: 0, scale: 0.85 },
    visible: { opacity: 1, scale: 1 },
  },
  "rotate-in": {
    hidden: { opacity: 0, rotateX: 15, y: 40 },
    visible: { opacity: 1, rotateX: 0, y: 0 },
  },
  "blur-in": {
    hidden: { opacity: 0, filter: "blur(10px)", y: 30 },
    visible: { opacity: 1, filter: "blur(0px)", y: 0 },
  },
  "clip-up": {
    hidden: { opacity: 0, clipPath: "inset(100% 0 0 0)" },
    visible: { opacity: 1, clipPath: "inset(0% 0 0 0)" },
  },
};

interface ScrollRevealProps {
  children: ReactNode;
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

export default function ScrollReveal({
  children,
  variant = "fade-up",
  delay = 0,
  duration = 0.8,
  className = "",
  once = true,
}: ScrollRevealProps) {
  return (
    <motion.div
      variants={revealVariants[variant]}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-80px" }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
