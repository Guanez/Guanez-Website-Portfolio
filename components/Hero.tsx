"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "7+", label: "Projects Completed" },
  { value: "12+", label: "Technologies Used" },
  { value: "1+", label: "Years Experience" },
];

export default function Hero() {
  return (
    <section className="relative min-h-dvh px-6 sm:px-10 pt-32 pb-16 flex flex-col">
      {/* ambient gradient */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 30%, rgba(124,245,196,0.10), transparent 70%), radial-gradient(40% 40% at 80% 80%, rgba(124,180,245,0.08), transparent 70%)",
        }}
      />

      {/* intro line */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="max-w-md text-sm sm:text-base text-white/70 leading-relaxed"
      >
        My work is driven by clarity, performance, and attention to detail.
        I build reliable digital experiences that feel simple, fast, and intentional.
      </motion.p>

      {/* big display headline */}
      <div className="mt-auto pt-20 sm:pt-32">
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
          }}
          className="display text-[clamp(3.5rem,12vw,11rem)]"
        >
          {[
            { t: "I", italic: false },
            { t: "Build", italic: false },
            { t: "Modern", italic: true },
            { t: "Websites", italic: false },
          ].map((w, i) => (
            <motion.span
              key={i}
              variants={{
                hidden: { y: "100%", opacity: 0 },
                visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
              }}
              className={`inline-block mr-[0.18em] ${w.italic ? "italic font-light text-white/80" : ""}`}
            >
              {w.t}
            </motion.span>
          ))}
          <br />
          <motion.span
            variants={{
              hidden: { y: "100%", opacity: 0 },
              visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
            }}
            className="inline-block"
          >
            That<span className="text-accent">.</span>Work
          </motion.span>
        </motion.h1>
      </div>

      {/* footer-ish stats row */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-white/10 pt-6"
      >
        {stats.map((s) => (
          <div key={s.label} className="flex items-baseline gap-3">
            <span className="font-mono text-2xl sm:text-3xl text-white">{s.value}</span>
            <span className="text-xs sm:text-sm text-white/50">{s.label}</span>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
