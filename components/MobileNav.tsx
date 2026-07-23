"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiGithub, FiLinkedin, FiSun, FiMoon, FiCopy, FiCheck, FiArrowUpRight } from "react-icons/fi";
import { useTheme } from "next-themes";

const sections = [
  { id: "hero", num: "00", label: "Home" },
  { id: "about", num: "01", label: "About" },
  { id: "skills", num: "02", label: "Skills" },
  { id: "work", num: "03", label: "Work" },
  { id: "experience", num: "04", label: "Experience" },
  { id: "education", num: "05", label: "Education" },
  { id: "contact", num: "06", label: "Contact" },
];

/**
 * Mobile / tablet navigation — a fixed hamburger that opens a full-screen
 * menu with the section index, theme toggle, socials and a copy-email row.
 * Shown below `lg`, where the desktop MorphNav is hidden.
 */
export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const { theme, setTheme } = useTheme();

  // Lock body scroll while the menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = useCallback((id: string) => {
    setOpen(false);
    // Wait for the overlay to close before scrolling so layout is settled
    setTimeout(() => {
      if (id === "hero") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 120);
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText("markadrianguanez@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const bookCall = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="lg:hidden">
      {/* Full-width top bar — logo left, Book a Call + hamburger right */}
      <div className="fixed inset-x-0 top-0 z-[60] flex items-center justify-between px-5 py-4">
        <span className="font-mono text-lg font-bold tracking-tighter text-[var(--fg)]">
          <span className="text-accent">~</span>/guanez
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={bookCall}
            className="flex h-10 items-center gap-1.5 rounded-full bg-accent pl-4 pr-3 text-sm font-bold text-[var(--ink)] active:scale-95"
          >
            Book a Call <FiArrowUpRight size={16} />
          </button>
          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--fg-ghost)] text-[var(--fg)] backdrop-blur-md transition-colors hover:bg-[var(--fg-faint)]"
          >
            <FiMenu size={20} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[70] flex flex-col bg-[var(--bg)]/95 backdrop-blur-xl"
          >
            {/* Top bar inside the menu */}
            <div className="flex items-center justify-between px-6 py-5">
              <span className="font-mono text-lg font-bold tracking-tighter">
                <span className="text-accent">~</span>/guanez
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  aria-label="Toggle theme"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--fg-ghost)] text-[var(--fg)]"
                >
                  {theme === "dark" ? <FiSun size={18} /> : <FiMoon size={18} />}
                </button>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--fg-ghost)] text-[var(--fg)]"
                >
                  <FiX size={20} />
                </button>
              </div>
            </div>

            {/* Section links */}
            <nav className="flex flex-1 flex-col justify-center gap-1 px-6">
              {sections.map(({ id, num, label }, i) => (
                <motion.button
                  key={id}
                  onClick={() => go(id)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                  className="group flex items-baseline gap-4 py-2 text-left"
                >
                  <span className="font-mono text-xs text-[var(--fg-faint)] transition-colors group-hover:text-accent">
                    {num}
                  </span>
                  <span className="font-display text-4xl font-bold tracking-tight text-[var(--fg)] transition-colors group-hover:text-accent">
                    {label}
                  </span>
                </motion.button>
              ))}
            </nav>

            {/* Footer — copy email + socials */}
            <div className="space-y-4 px-6 pb-10">
              <button
                onClick={copyEmail}
                className="flex w-full items-center justify-between rounded-2xl border border-[var(--border)] bg-[var(--fg-ghost)] px-5 py-4 text-sm"
              >
                <span className="text-[var(--fg-secondary)]">markadrianguanez@gmail.com</span>
                {copied ? <FiCheck className="text-accent" size={16} /> : <FiCopy className="text-[var(--fg-muted)]" size={16} />}
              </button>

              <div className="flex items-center gap-3">
                <a
                  href="https://github.com/Guanez"
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-12 flex-1 items-center justify-center gap-2 rounded-2xl border border-[var(--border)] bg-[var(--fg-ghost)] text-sm font-medium"
                >
                  <FiGithub size={16} /> GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/gua%C3%B1ez-adrian-mark-m-99461b297"
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-12 flex-1 items-center justify-center gap-2 rounded-2xl border border-[var(--border)] bg-[var(--fg-ghost)] text-sm font-medium"
                >
                  <FiLinkedin size={16} /> LinkedIn
                </a>
              </div>

              <button
                onClick={() => go("contact")}
                className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-accent font-bold text-[var(--ink)]"
              >
                Book a Call <FiArrowUpRight size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
