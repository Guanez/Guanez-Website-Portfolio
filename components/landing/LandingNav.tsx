"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function LandingNav() {
  const [time, setTime] = useState("");
  const [soundOn, setSoundOn] = useState(false);

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const hh = d.getHours().toString().padStart(2, "0");
      const mm = d.getMinutes().toString().padStart(2, "0");
      setTime(`${hh}:${mm}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.3 }}
      className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 sm:px-10 py-5"
    >
      {/* Logo */}
      <div className="flex items-center gap-2 font-mono">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_2px_var(--accent)]" />
        <span className="text-[11px] uppercase tracking-[0.12em] text-white/80">
          guanez<span className="text-white/40">.dev</span>
        </span>
      </div>

      {/* Center - SOUND toggle + metadata */}
      <div className="hidden md:flex items-center gap-6 font-mono text-[10px] uppercase tracking-[0.1em] text-white/40">
        <button
          onClick={() => setSoundOn(!soundOn)}
          className="flex items-center gap-2 transition hover:text-white/70"
        >
          <span className="text-white/30">SOUND</span>
          <span className="text-white/50">[</span>
          <span className={soundOn ? "text-white/90" : "text-white/50"}>
            {soundOn ? "ON" : "OFF"}
          </span>
          <span className="text-white/50">]</span>
        </button>
        <span className="text-white/20">|</span>
        <span className="tabular-nums">
          Manila, PH — {time} UTC+8
        </span>
      </div>

      {/* CTA */}
      <a
        href="#contact"
        className="rounded-full border border-white/20 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-white/70 transition-all duration-300 hover:border-accent/50 hover:text-white hover:shadow-[0_0_16px_rgba(124,245,196,0.15)]"
      >
        Let&apos;s Talk
      </a>
    </motion.header>
  );
}
