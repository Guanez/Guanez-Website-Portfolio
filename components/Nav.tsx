"use client";

import { useEffect, useState } from "react";

const items = [
  { num: "01", label: "About" },
  { num: "02", label: "Projects" },
  { num: "03", label: "Contact" },
];

export default function Nav() {
  const [time, setTime] = useState("");

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
    <header className="fixed top-0 left-0 right-0 z-30 px-6 sm:px-10 py-5 flex items-center justify-between text-xs sm:text-sm text-white/80">
      <div className="flex items-center gap-2 font-mono">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_2px_var(--accent)]" />
        <span className="tracking-wider">guanez<span className="text-white/40">.dev</span></span>
      </div>

      <nav className="hidden sm:flex items-center gap-7">
        {items.map((it) => (
          <a
            key={it.label}
            href={`#${it.label.toLowerCase()}`}
            className="group flex items-baseline gap-1.5 transition hover:text-white"
          >
            <span className="font-mono text-[10px] text-white/40 group-hover:text-accent">{it.num}</span>
            <span>{it.label}</span>
          </a>
        ))}
      </nav>

      <div className="font-mono tabular-nums text-white/50">
        <span className="hidden sm:inline">Local — </span>
        {time}
      </div>
    </header>
  );
}
