"use client";

import { motion, useScroll, useVelocity, useTransform, useSpring, useMotionTemplate } from "framer-motion";

interface MarqueeTickerProps {
  items: string[];
  direction?: "left" | "right";
  speed?: number;
  separator?: string;
  className?: string;
}

export default function MarqueeTicker({
  items,
  direction = "left",
  speed = 30,
  separator = "·",
  className = "",
}: MarqueeTickerProps) {
  const content = items.join(` ${separator} `) + ` ${separator} `;
  // Duplicate 4x for seamless loop
  const repeated = `${content}${content}${content}${content}`;

  // Scroll velocity → skew + blur effect
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const skewValue = useTransform(scrollVelocity, [-3000, 0, 3000], [-3, 0, 3]);
  const blurValue = useTransform(scrollVelocity, [-3000, -500, 0, 500, 3000], [2, 0.5, 0, 0.5, 2]);
  const skew = useSpring(skewValue, { stiffness: 200, damping: 30 });
  const blur = useSpring(blurValue, { stiffness: 200, damping: 40 });
  const blurFilter = useMotionTemplate`blur(${blur}px)`;

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <motion.div
        className="inline-block font-mono text-sm md:text-base text-[var(--fg-muted)] tracking-wider will-change-transform"
        animate={{
          x: direction === "left" ? ["0%", "-25%"] : ["-25%", "0%"],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: speed,
            ease: "linear",
          },
        }}
        style={{
          skewX: skew,
          filter: blurFilter,
        }}
      >
        {repeated}
      </motion.div>
    </div>
  );
}
