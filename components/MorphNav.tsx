"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";

const sections = [
  { id: "hero", num: "00", label: "Home" },
  { id: "about", num: "01", label: "About" },
  { id: "skills", num: "02", label: "Skills" },
  { id: "work", num: "03", label: "Work" },
  { id: "experience", num: "04", label: "Experience" },
  { id: "education", num: "05", label: "Education" },
  { id: "contact", num: "06", label: "Contact" },
];

// One spring shared by every layout animation so the whole row travels as a unit
const SPRING = { type: "spring", stiffness: 220, damping: 30, mass: 0.9 } as const;

/**
 * Hero nav that morphs into the left sidebar index on scroll.
 * Same DOM nodes in both states — framer's `layout` prop animates the
 * horizontal row into the vertical rail instead of cross-fading two navs.
 */
export default function MorphNav() {
  const [docked, setDocked] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [hovered, setHovered] = useState<string | null>(null);

  // Dock once the hero is mostly out of view
  useEffect(() => {
    const handleScroll = () => {
      setDocked(window.scrollY > window.innerHeight * 0.55);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track active section with Intersection Observer
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: "-35% 0px -35% 0px", threshold: 0 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  const scrollTo = useCallback((id: string) => {
    if (id === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <motion.nav
      layout
      transition={SPRING}
      className={`fixed hidden lg:flex ${
        docked
          ? "left-8 inset-y-0 z-40 flex-col justify-center items-start gap-1"
          : "inset-x-0 top-[58vh] z-10 flex-row justify-between items-center px-8"
      }`}
    >
      {/* Vertical rail — only in docked state (no `layout`: framer's layout transform
          would override the -translate-y-1/2 centering and drop the line downward) */}
      <motion.span
        aria-hidden
        initial={false}
        animate={{ opacity: docked ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="pointer-events-none absolute left-[3px] top-1/2 h-[336px] w-[1px] -translate-y-1/2 bg-[var(--border)]"
      />

      {sections.map(({ id, num, label }, i) => {
        const isActive = activeSection === id;
        const isHovered = hovered === id;

        return (
          <div
            key={id}
            className={`flex items-center ${i > 0 && !docked ? "flex-1" : ""}`}
          >
            {/* Separator — heynesh-style pipes, stretch to spread the row edge to edge */}
            {i > 0 && (
              <motion.span
                aria-hidden
                layout
                initial={false}
                animate={{
                  opacity: docked ? 0 : 0.3,
                  flexGrow: docked ? 0 : 1,
                  width: docked ? 0 : "auto",
                }}
                transition={SPRING}
                className="overflow-hidden text-center text-[var(--fg)] select-none"
              >
                |
              </motion.span>
            )}

            <motion.button
              layout
              transition={SPRING}
              onClick={() => scrollTo(id)}
              onMouseEnter={() => setHovered(id)}
              onMouseLeave={() => setHovered(null)}
              className={`relative flex items-center ${
                docked ? "h-[52px] gap-3 pl-4 pr-2" : "gap-2 px-2"
              }`}
            >
              {/* Dot indicator — fades in with the rail */}
              <motion.span
                aria-hidden
                initial={false}
                animate={{
                  opacity: docked ? 1 : 0,
                  scale: isActive || isHovered ? 1.6 : 1,
                }}
                transition={{ duration: 0.25 }}
                className="absolute left-[1px] h-[5px] w-[5px] rounded-full"
                style={{
                  background: isActive ? "var(--accent)" : "var(--fg-faint)",
                  boxShadow: isActive ? "0 0 6px var(--accent)" : "none",
                }}
              />

              <motion.span
                layout="position"
                transition={SPRING}
                initial={false}
                animate={{ opacity: docked ? 1 : 0, width: docked ? "auto" : 0 }}
                className="overflow-hidden font-mono text-[10px] tracking-wider"
                style={{ color: isActive ? "var(--accent)" : "var(--fg-faint)" }}
              >
                {num}
              </motion.span>

              <motion.span
                layout="position"
                transition={SPRING}
                className={`whitespace-nowrap uppercase transition-colors duration-200 ${
                  docked
                    ? "text-xs font-medium tracking-wider"
                    : "text-base font-extrabold tracking-[0.06em]"
                }`}
                style={{
                  color: docked
                    ? isActive
                      ? "var(--accent)"
                      : isHovered
                      ? "var(--fg)"
                      : "var(--fg-faint)"
                    : "var(--fg)",
                }}
              >
                {label}
              </motion.span>
            </motion.button>
          </div>
        );
      })}
    </motion.nav>
  );
}
