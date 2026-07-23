"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const sections = [
  { id: "about", num: "01", label: "About" },
  { id: "skills", num: "02", label: "Skills" },
  { id: "work", num: "03", label: "Work" },
  { id: "experience", num: "04", label: "Experience" },
  { id: "education", num: "05", label: "Education" },
  { id: "contact", num: "06", label: "Contact" },
];

export default function SidebarNav() {
  const [visible, setVisible] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [hovered, setHovered] = useState<string | null>(null);

  // Show sidebar after scrolling past hero
  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight * 0.7;
      setVisible(window.scrollY > heroHeight);
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
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { rootMargin: "-35% 0px -35% 0px", threshold: 0 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -40, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed left-6 top-[12vh] bottom-[10vh] z-40 hidden lg:flex flex-col items-start justify-between"
        >
          <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--fg-faint)] pl-5">
            Index
          </div>

          {/* Vertical track line */}
          <div className="absolute left-[5px] top-10 bottom-10 w-[1px] bg-[var(--border)]" />

          <div className="relative flex flex-col items-start">
            {sections.map(({ id, num, label }) => {
              const isActive = activeSection === id;
              const isHovered = hovered === id;

              return (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  onMouseEnter={() => setHovered(id)}
                  onMouseLeave={() => setHovered(null)}
                  className="relative flex items-center gap-3 h-[76px] pl-5 pr-3 group"
                >
                  {/* Dot indicator */}
                  <span
                    className="absolute left-[3px] w-[5px] h-[5px] rounded-full transition-all duration-300"
                    style={{
                      background: isActive ? "var(--accent)" : "var(--fg-faint)",
                      boxShadow: isActive
                        ? "0 0 6px var(--accent)"
                        : "none",
                      transform: isActive || isHovered ? "scale(1.6)" : "scale(1)",
                    }}
                  />

                  {/* Label — always visible with number */}
                  <span
                    className="font-mono text-[10px] tracking-wider transition-colors duration-200"
                    style={{
                      color: isActive ? "var(--accent)" : "var(--fg-faint)",
                    }}
                  >
                    {num}
                  </span>

                  {/* Expanded label on hover/active */}
                  <AnimatePresence>
                    {(isHovered || isActive) && (
                      <motion.span
                        initial={{ opacity: 0, x: -8, width: 0 }}
                        animate={{ opacity: 1, x: 0, width: "auto" }}
                        exit={{ opacity: 0, x: -8, width: 0 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="text-xs font-medium whitespace-nowrap overflow-hidden"
                        style={{
                          color: isActive ? "var(--accent)" : "var(--fg-muted)",
                        }}
                      >
                        {label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              );
            })}
          </div>

          <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--fg-faint)] pl-5">
            Scroll
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
