"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface Props {
  onDone: () => void;
}

const COMMAND = "npx guanez-portfolio deploy";

type Line = {
  id: number;
  type: "info" | "success" | "progress" | "ready" | "blank" | "url";
  text: string;
};

export default function SimulationSequence({ onDone }: Props) {
  const [phase, setPhase] = useState<"idle" | "typing" | "running" | "exit" | "done">("idle");
  const [typedCommand, setTypedCommand] = useState("");
  const [lines, setLines] = useState<Line[]>([]);
  const [progress, setProgress] = useState(0);
  const lineId = useRef(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const addLine = (type: Line["type"], text = "") => {
    const id = lineId.current++;
    setLines((prev) => [...prev, { id, type, text }]);
  };

  // Start the sequence
  useEffect(() => {
    const t = setTimeout(() => setPhase("typing"), 500);
    return () => clearTimeout(t);
  }, []);

  // Type the command character by character
  useEffect(() => {
    if (phase !== "typing") return;
    if (typedCommand.length >= COMMAND.length) {
      // Command fully typed — start output
      const t = setTimeout(() => setPhase("running"), 400);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setTypedCommand(COMMAND.slice(0, typedCommand.length + 1));
    }, 32 + Math.random() * 28);
    return () => clearTimeout(t);
  }, [phase, typedCommand]);

  // Run the terminal output sequence
  useEffect(() => {
    if (phase !== "running") return;
    const ts = timers.current;
    let acc = 0;
    const at = (delay: number, fn: () => void) => {
      acc += delay;
      ts.push(setTimeout(fn, acc));
    };

    at(100, () => addLine("blank"));
    at(50, () => addLine("info", "◇  Scaffolding project..."));
    at(650, () => addLine("success", "✓  Project created"));

    at(250, () => addLine("blank"));
    at(50, () => addLine("info", "◇  Installing dependencies..."));
    at(150, () => addLine("progress", ""));
    // Progress bar driven by separate effect
    at(1150, () => addLine("success", "✓  247 packages installed"));

    at(250, () => addLine("blank"));
    at(50, () => addLine("info", "◇  Compiling for production..."));
    at(800, () => addLine("success", "✓  Compiled in 1.8s"));

    at(250, () => addLine("blank"));
    at(50, () => addLine("info", "◇  Deploying to guanez.dev..."));
    at(900, () => addLine("success", "✓  Deployed successfully"));

    at(200, () => addLine("blank"));
    at(50, () => addLine("url", "https://guanez.dev"));

    at(300, () => addLine("blank"));
    at(100, () => addLine("ready", "● Ready"));

    at(900, () => setPhase("exit"));

    return () => ts.forEach(clearTimeout);
  }, [phase]);

  // Animate progress bar when the progress line is visible
  useEffect(() => {
    const hasProgress = lines.some((l) => l.type === "progress");
    if (!hasProgress || progress >= 1) return;

    const start = performance.now();
    const duration = 950;
    let raf: number;

    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      setProgress(1 - Math.pow(1 - p, 2.5));
      if (p < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [lines, progress]);

  // Exit transition
  useEffect(() => {
    if (phase !== "exit") return;
    const id = setTimeout(() => {
      setPhase("done");
      onDone();
    }, 1000);
    return () => clearTimeout(id);
  }, [phase, onDone]);

  const skip = () => {
    timers.current.forEach(clearTimeout);
    setPhase("done");
    onDone();
  };

  const isExiting = phase === "exit";

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          key="sim"
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
          style={{ background: "#06070a" }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Grid pattern with radial fade */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
              backgroundSize: "54px 54px",
              maskImage:
                "radial-gradient(ellipse 70% 60% at 50% 50%, black 0%, transparent 100%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 70% 60% at 50% 50%, black 0%, transparent 100%)",
            }}
          />

          {/* Slow-drifting aurora glow */}
          <div
            className="absolute pointer-events-none"
            style={{
              width: "140%",
              height: "140%",
              left: "-20%",
              top: "-20%",
              background:
                "radial-gradient(ellipse 40% 50% at 35% 40%, rgba(124,245,196,0.04) 0%, transparent 60%), radial-gradient(ellipse 35% 45% at 65% 55%, rgba(100,180,255,0.03) 0%, transparent 60%)",
              animation: "aurora 12s ease-in-out infinite alternate",
            }}
          />

          {/* Accent dot at grid center */}
          <div
            className="absolute pointer-events-none"
            style={{
              width: "2px",
              height: "2px",
              borderRadius: "50%",
              background: "#7cf5c4",
              boxShadow: "0 0 20px 4px rgba(124,245,196,0.12), 0 0 60px 10px rgba(124,245,196,0.05)",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />

          {/* Skip */}
          <button
            onClick={skip}
            className="absolute top-5 right-5 z-50 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/60 backdrop-blur transition hover:bg-white/10 hover:text-white cursor-pointer"
            aria-label="Skip intro"
          >
            Skip →
          </button>

          {/* Terminal window */}
          <motion.div
            className="relative w-full max-w-[600px] mx-5"
            initial={{ y: 30, opacity: 0, scale: 0.97 }}
            animate={{
              y: isExiting ? -20 : 0,
              opacity: isExiting ? 0 : 1,
              scale: isExiting ? 1.04 : 1,
              filter: isExiting ? "blur(6px)" : "blur(0px)",
            }}
            transition={{
              duration: isExiting ? 0.9 : 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div
              className="rounded-xl overflow-hidden"
              style={{
                background: "#0c0e12",
                border: "1px solid rgba(255,255,255,0.06)",
                boxShadow:
                  "0 25px 80px rgba(0,0,0,0.6), 0 0 1px rgba(255,255,255,0.05), 0 0 60px rgba(124,245,196,0.02)",
              }}
            >
              {/* Title bar */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.05]">
                <div className="flex gap-[6px]">
                  <span className="h-[10px] w-[10px] rounded-full bg-[#ff5f57]/70" />
                  <span className="h-[10px] w-[10px] rounded-full bg-[#febc2e]/70" />
                  <span className="h-[10px] w-[10px] rounded-full bg-[#28c840]/70" />
                </div>
                <span className="flex-1 text-center text-[11px] text-white/25 font-mono tracking-wide">
                  zsh — guanez.dev
                </span>
              </div>

              {/* Terminal body */}
              <div className="px-5 py-5 font-mono text-[13px] leading-[1.7] min-h-[300px] selection:bg-accent/20">
                {/* Command line */}
                {phase !== "idle" && (
                  <div className="flex items-center gap-2">
                    <span className="text-accent/80 text-xs select-none">❯</span>
                    <span className="text-white/90">{typedCommand}</span>
                    {phase === "typing" && (
                      <span className="inline-block w-[7px] h-[16px] bg-white/70 animate-pulse" />
                    )}
                  </div>
                )}

                {/* Output lines */}
                {lines.map((line) => (
                  <TerminalLine key={line.id} line={line} progress={progress} />
                ))}

                {/* Final blinking cursor */}
                {lines.some((l) => l.type === "ready") && (
                  <motion.div
                    className="flex items-center gap-2 mt-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <span className="text-accent/80 text-xs select-none">❯</span>
                    <span className="inline-block w-[7px] h-[16px] bg-accent/60 animate-pulse" />
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* --- Terminal line renderer --- */

function TerminalLine({ line, progress }: { line: Line; progress: number }) {
  if (line.type === "blank") return <div className="h-2" />;

  if (line.type === "progress") {
    const filled = Math.max(0, Math.min(28, Math.round(progress * 28)));
    const bar = "█".repeat(filled) + "░".repeat(28 - filled);
    const pct = Math.round(progress * 100);
    return (
      <div className="text-white/30 pl-4 text-[12px]">
        {bar} {pct}%
      </div>
    );
  }

  if (line.type === "info") {
    return (
      <motion.div
        initial={{ opacity: 0, x: -6 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2 }}
        className="text-white/45"
      >
        {line.text}
      </motion.div>
    );
  }

  if (line.type === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, x: -6 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2 }}
        className="text-accent/90"
      >
        {line.text}
      </motion.div>
    );
  }

  if (line.type === "url") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="text-white/60 pl-3 text-[12px]"
      >
        → <span className="text-accent/70 underline underline-offset-2 decoration-accent/30">{line.text}</span>
      </motion.div>
    );
  }

  if (line.type === "ready") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="text-accent font-semibold tracking-wide"
      >
        {line.text}
      </motion.div>
    );
  }

  return null;
}
