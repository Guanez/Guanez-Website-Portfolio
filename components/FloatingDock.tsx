"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "next-themes";

const sections = [
  { id: "about", num: "01", label: "About" },
  { id: "skills", num: "02", label: "Skills" },
  { id: "work", num: "03", label: "Work" },
  { id: "experience", num: "04", label: "Exp" },
  { id: "education", num: "05", label: "Edu" },
  { id: "contact", num: "06", label: "Contact" },
];

export default function FloatingDock() {
  const [visible, setVisible] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const { theme, setTheme } = useTheme();

  // Show dock after scrolling past hero (~100vh)
  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight * 0.85;
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
        { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
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
          initial={{ y: 80, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 80, opacity: 0, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 px-2 py-2 rounded-full border border-[var(--border)] shadow-2xl"
          style={{
            background: "rgba(var(--dock-bg-rgb), 0.7)",
            backdropFilter: "blur(16px) saturate(1.8)",
            WebkitBackdropFilter: "blur(16px) saturate(1.8)",
            boxShadow:
              "0 8px 32px rgba(0,0,0,0.12), 0 0 0 1px rgba(var(--accent-rgb) / 0.05), inset 0 1px 0 rgba(255,255,255,0.05)",
          }}
        >
          {sections.map(({ id, num, label }) => {
            const isActive = activeSection === id;
            return (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="relative flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium transition-colors duration-200"
                style={{
                  color: isActive ? "var(--accent)" : "var(--fg-muted)",
                }}
              >
                {/* Active background pill */}
                {isActive && (
                  <motion.div
                    layoutId="dock-active"
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: "var(--accent-glow)",
                      border: "1px solid rgba(var(--accent-rgb) / 0.2)",
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span
                  className="relative z-10 font-mono text-[10px] opacity-50"
                  style={{ opacity: isActive ? 0.9 : 0.4 }}
                >
                  {num}
                </span>
                <span className="relative z-10 hidden sm:inline">{label}</span>
              </button>
            );
          })}

          {/* Divider */}
          <div className="w-[1px] h-5 mx-1 bg-[var(--border)]" />

          {/* Theme toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="relative p-2 rounded-full text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <FiSun size={14} /> : <FiMoon size={14} />}
          </button>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
