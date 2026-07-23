"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function SectionDivider() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="relative h-px overflow-hidden my-0 mx-6 lg:mx-24">
      {/* Base line */}
      <motion.div
        className="absolute inset-0 bg-[var(--border)]"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.3, duration: 0.4 }}
      />

      {/* Sweeping light pulse */}
      {isInView && (
        <motion.div
          className="absolute top-0 h-full w-24"
          initial={{ left: "-96px" }}
          animate={{ left: "100%" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            className="w-full h-full"
            style={{
              background:
                "linear-gradient(90deg, transparent, var(--accent) 40%, var(--accent) 60%, transparent)",
              boxShadow: "0 0 12px var(--accent-glow)",
            }}
          />
        </motion.div>
      )}
    </div>
  );
}
