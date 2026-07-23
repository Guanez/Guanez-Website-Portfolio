"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface BrowserProps {
  url: string;
  showCaret?: boolean;
  loading?: number; // 0..1
  children?: ReactNode;
}

const NavBtn = ({ d }: { d: string }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-white/45">
    <path d={d} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function Browser({ url, showCaret = false, loading = 0, children }: BrowserProps) {
  return (
    <div className="absolute inset-0 flex flex-col bg-[#0d1014] text-white/90 overflow-hidden">
      {/* chrome */}
      <div className="flex items-center gap-2 px-3 py-2 bg-[#15191f] border-b border-black/40">
        {/* traffic lights */}
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>

        {/* nav */}
        <div className="flex items-center gap-1.5 ml-3">
          <NavBtn d="M15 18l-6-6 6-6" />
          <NavBtn d="M9 6l6 6-6 6" />
          <NavBtn d="M3 12a9 9 0 0 1 15-6.7L21 8M21 3v5h-5M21 12a9 9 0 0 1-15 6.7L3 16M3 21v-5h5" />
        </div>

        {/* address bar */}
        <div className="flex-1 mx-3 flex items-center gap-2 bg-[#0a0c0f] border border-white/5 rounded-md px-2.5 py-1 text-[11px] font-mono">
          {/* lock */}
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" className="text-white/55">
            <rect x="4" y="11" width="16" height="10" rx="2" stroke="currentColor" strokeWidth="2" />
            <path d="M8 11V7a4 4 0 0 1 8 0v4" stroke="currentColor" strokeWidth="2" />
          </svg>
          <span className="text-white/85 whitespace-nowrap overflow-hidden">
            {url}
            {showCaret && (
              <span className="inline-block w-[1px] h-3 align-middle ml-0.5 bg-accent animate-blink" />
            )}
          </span>
        </div>

        {/* tab placeholder */}
        <div className="hidden sm:flex items-center gap-1 text-[10px] text-white/40">
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="h-2 w-2 rounded-full bg-white/15" />
        </div>
      </div>

      {/* loading bar */}
      <div className="h-[2px] bg-transparent">
        <motion.div
          className="h-full bg-accent shadow-[0_0_8px_var(--accent)]"
          style={{ width: `${Math.min(100, Math.max(0, loading * 100))}%` }}
          transition={{ ease: "easeInOut" }}
        />
      </div>

      {/* viewport */}
      <div className="flex-1 relative bg-ink-950">{children}</div>
    </div>
  );
}
