"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function LandingFooter() {
  const [cookiesAccepted, setCookiesAccepted] = useState(false);

  return (
    <>
      {/* Bottom-center floating nav */}
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="fixed bottom-6 inset-x-0 z-50 flex justify-center gap-8"
      >
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="font-mono text-[10px] uppercase tracking-[0.12em] text-white/40 transition-all duration-300 hover:text-white"
          >
            {link.label}
          </a>
        ))}
      </motion.nav>

      {/* Cookie consent popup */}
      <AnimatePresence>
        {!cookiesAccepted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
            className="fixed bottom-6 right-6 z-50 max-w-xs"
          >
            <div className="rounded-lg border border-white/10 bg-[#0a0a0a] p-4 backdrop-blur">
              <p className="font-mono text-[10px] uppercase tracking-[0.05em] text-white/60 leading-relaxed">
                We use cookies to enhance your experience.
              </p>
              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => setCookiesAccepted(true)}
                  className="flex-1 rounded border border-white/20 bg-white/5 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.1em] text-white/70 transition hover:bg-white/10 hover:text-white"
                >
                  Accept
                </button>
                <button
                  onClick={() => setCookiesAccepted(true)}
                  className="rounded border border-white/10 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.1em] text-white/40 transition hover:text-white/60"
                >
                  Decline
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Actual footer at end of scroll */}
      <footer className="relative z-10 py-8 text-center">
        <p className="font-mono text-[9px] uppercase tracking-[0.1em] text-white/20">
          &copy; {new Date().getFullYear()} Mark Guanez. All rights reserved.
        </p>
      </footer>
    </>
  );
}
