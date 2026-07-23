"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion, useScroll, useSpring, useTransform, useMotionTemplate, AnimatePresence } from "framer-motion";
import { FiArrowUp, FiGithub, FiLinkedin, FiTwitter, FiMail, FiExternalLink, FiCopy, FiCheck, FiX, FiPhone, FiSun, FiMoon, FiZap, FiShield, FiLayers, FiCode, FiTrendingUp } from "react-icons/fi";
import { useTheme } from "next-themes";
import Link from "next/link";
import Image from "next/image";
import MorphNav from "@/components/MorphNav";
import MobileNav from "@/components/MobileNav";
import SectionDivider from "@/components/sections/SectionDivider";
import MarqueeTicker from "@/components/sections/MarqueeTicker";
import AboutSection from "@/components/sections/AboutSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ProjectsCarousel from "@/components/sections/ProjectsCarousel";
import ExperienceSection from "@/components/sections/ExperienceSection";
import EducationSection from "@/components/sections/EducationSection";

// Sample thrown images for the footer
const thrownItems = [
  { id: 1, src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=400&auto=format&fit=crop", alt: "Tech 1", rotate: -15, x: "-25vw", y: "-15vh", width: "w-48 md:w-64" },
  { id: 2, src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=400&auto=format&fit=crop", alt: "Project SS", rotate: 10, x: "25vw", y: "-20vh", width: "w-56 md:w-72" },
  { id: 3, src: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=400&auto=format&fit=crop", alt: "Tech 2", rotate: -5, x: "-35vw", y: "15vh", width: "w-40 md:w-56" },
  { id: 4, src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=400&auto=format&fit=crop", alt: "Project SS 2", rotate: 20, x: "30vw", y: "20vh", width: "w-64 md:w-80" },
  { id: 5, src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=400&auto=format&fit=crop", alt: "Tech 3", rotate: -25, x: "5vw", y: "-30vh", width: "w-48 md:w-60" },
  { id: 6, src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=400&auto=format&fit=crop", alt: "Project SS 3", rotate: 15, x: "-15vw", y: "30vh", width: "w-56 md:w-72" },
];

// Rotating tech stack for the ticker
const techStack = ["React", "Next.js", "TypeScript", "Node.js", "Tailwind CSS", "PostgreSQL"];

// Hero stats for social proof
const heroStats = [
  { value: "9+", label: "Projects Built" },
  { value: "1.29", label: "GWA · Magna Cum Laude" },
  { value: "5", label: "Certifications" },
];

// Portrait for the hero — background-removed cut-out (transparent subject
// standing in front of the giant name).
const HERO_PORTRAIT = "/portrait.png";
// Taller head-to-thigh cut-out used only on mobile, where the portrait is a
// full-bleed background rather than a contained figure.
const HERO_PORTRAIT_TALL = "/portrait-tall.png";

// Right-hand trait card
const heroTraits = [
  { icon: FiZap, label: "Fast" },
  { icon: FiShield, label: "Reliable" },
  { icon: FiLayers, label: "Full Stack" },
  { icon: FiCode, label: "Builder" },
  { icon: FiTrendingUp, label: "Efficient" },
];

export default function HomeV2() {
  const [mounted, setMounted] = useState(false);
  const [techIndex, setTechIndex] = useState(0);
  const [contactOpen, setContactOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [phoneCopied, setPhoneCopied] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { theme, setTheme } = useTheme();
  const { scrollYProgress, scrollY } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Parallax layers for hero orbs
  const heroParallax1 = useTransform(scrollY, [0, 800], [0, -150]);
  const heroParallax2 = useTransform(scrollY, [0, 800], [0, -100]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  // Portrait blurs out as the hero scrolls away
  const heroBlur = useTransform(scrollY, [0, 500], [0, 14]);
  const heroBlurFilter = useMotionTemplate`blur(${heroBlur}px)`;

  useEffect(() => {
    setMounted(true);
  }, []);

  // Rotate tech stack every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setTechIndex((prev) => (prev + 1) % techStack.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Show the scroll-to-top button only once past the hero
  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > window.innerHeight * 0.8);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!mounted) return null;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("markadrianguanez@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const copyPhone = () => {
    navigator.clipboard.writeText("+639473273898");
    setPhoneCopied(true);
    setTimeout(() => setPhoneCopied(false), 2000);
  };

  return (
    <div className="relative min-h-screen text-[var(--fg)] selection:bg-accent/30 code-grid">
      {/* Code Syntax Watermarks — decorative dev texture */}
      <div aria-hidden className="code-watermark top-[12%] left-[3%] opacity-[0.03]">
        {`const dev = {\n  name: "Mark",\n  stack: ["React", "Next.js"],\n  passion: true,\n};`}
      </div>
      <div aria-hidden className="code-watermark top-[45%] right-[2%] opacity-[0.025] text-right">
        {`<Component\n  className="crafted"\n  responsive={true}\n/>`}
      </div>
      <div aria-hidden className="code-watermark bottom-[20%] left-[5%] opacity-[0.02]">
        {`// building the web\nimport { creativity } from "mind";\nexport default function Portfolio() {`}
      </div>
      <div aria-hidden className="code-watermark top-[70%] right-[8%] opacity-[0.025]">
        {`async function deploy() {\n  await build();\n  return success;\n}`}
      </div>

      {/* Header — top bar with branding left, socials + theme right */}
      <header className="fixed top-0 w-full z-40 px-6 py-5 lg:px-12 hidden lg:flex justify-between items-center">
        <Link href="/" className="text-lg font-bold tracking-tighter hover:opacity-70 transition-opacity font-mono">
          <span className="text-accent">~</span>/guanez
        </Link>
        <div className="hidden lg:flex items-center gap-4">
          {[
            { icon: FiGithub, href: "https://github.com/Guanez" },
            { icon: FiLinkedin, href: "https://www.linkedin.com/in/gua%C3%B1ez-adrian-mark-m-99461b297" },
            { icon: FiTwitter, href: "https://twitter.com" },
          ].map((social, i) => (
            <Link
              key={i}
              href={social.href}
              target="_blank"
              className="p-2 text-[var(--fg-faint)] hover:text-[var(--fg)] transition-colors duration-200"
            >
              <social.icon size={16} />
            </Link>
          ))}
          <div className="w-[1px] h-4 bg-[var(--border)] mx-1" />
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full hover:bg-[var(--fg-ghost)] transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <FiSun size={16} /> : <FiMoon size={16} />}
          </button>
        </div>
      </header>

      {/* Nav — horizontal across the hero, morphs into the left rail on scroll */}
      <MorphNav />
      <MobileNav />

      <main className="relative">
        {/* Hero Section — giant name behind, portrait in front, nav across the middle.
            Each layer blurs individually on scroll so the nav keeps interleaving. */}
        <section id="hero" className="relative">
        {/* ═══════════ Desktop / large-screen hero ═══════════ */}
        <div className="relative hidden h-dvh min-h-[700px] overflow-hidden lg:block">
          {/* Ambient Gradient Orbs — with scroll parallax */}
          <motion.div aria-hidden className="pointer-events-none absolute inset-0 -z-10" style={{ opacity: heroOpacity }}>
            <motion.div
              className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full opacity-20"
              style={{
                background: `radial-gradient(circle, var(--orb-1) 0%, transparent 70%)`,
                filter: "blur(80px)",
                y: heroParallax1,
              }}
              animate={{
                x: [0, 30, -20, 0],
                scale: [1, 1.1, 0.95, 1],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full opacity-15"
              style={{
                background: `radial-gradient(circle, var(--orb-2) 0%, transparent 70%)`,
                filter: "blur(80px)",
                y: heroParallax2,
              }}
              animate={{
                x: [0, -25, 20, 0],
                scale: [1, 0.95, 1.1, 1],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>

          {/* Giant name — SVG so the word stretches exactly edge to edge behind the portrait */}
          <motion.svg
            aria-hidden
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            viewBox="0 0 1000 275"
            preserveAspectRatio="xMidYMid meet"
            className="absolute inset-x-0 top-[-5vh] z-0 w-full select-none"
            style={{ filter: heroBlurFilter }}
          >
            <text
              x="0"
              y="258"
              textLength="1000"
              lengthAdjust="spacingAndGlyphs"
              fill="var(--accent)"
              style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
              fontSize="244"
            >
              GUAÑEZ
            </text>
          </motion.svg>
          <h1 className="sr-only">Adrian Mark M. Guañez — Full Stack Developer</h1>

          {/* Portrait — background-removed cut-out standing in front of the name */}
          <motion.div
            initial={{ opacity: 0, scale: 1.05, y: 30, x: "-50%" }}
            animate={{ opacity: 1, scale: 1, y: 0, x: "-50%" }}
            transition={{ duration: 1.2, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-none absolute bottom-0 left-1/2 z-20 h-[100vh] w-[min(58vw,780px)]"
            style={{ filter: heroBlurFilter }}
          >
            <Image
              src={HERO_PORTRAIT}
              alt="Adrian Mark M. Guañez"
              fill
              priority
              className="object-contain object-bottom"
            />
          </motion.div>

          {/* Stat card — 24+ (wide, upper) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-none absolute left-[21%] top-[43vh] z-30 hidden h-[168px] w-[340px] flex-col justify-center glass-card rounded-2xl px-7 py-6 md:flex"
            style={{ filter: heroBlurFilter }}
          >
            <div className="font-display text-6xl font-bold leading-none text-accent">{heroStats[0].value}</div>
            <div className="mt-3 text-xs font-semibold uppercase tracking-[0.15em] text-[var(--fg-secondary)]">
              {heroStats[0].label}
            </div>
            {/* accent progress hint */}
            <div className="mt-4 h-[3px] w-full overflow-hidden rounded-full bg-[var(--fg-ghost)]">
              <div className="h-full w-[82%] rounded-full bg-accent" />
            </div>
          </motion.div>

          {/* Stat card — 5+ (narrow, lower) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-none absolute left-[25%] top-[63vh] z-30 hidden h-[216px] w-[170px] flex-col items-center justify-center glass-card rounded-2xl px-6 py-6 text-center md:flex"
            style={{ filter: heroBlurFilter }}
          >
            <div className="font-display text-6xl font-bold leading-none text-accent">{heroStats[1].value}</div>
            <div className="mt-3 text-xs font-semibold uppercase tracking-[0.15em] text-[var(--fg-secondary)]">
              {heroStats[1].label}
            </div>
            {/* accent progress hint */}
            <div className="mt-4 h-[3px] w-3/4 overflow-hidden rounded-full bg-[var(--fg-ghost)]">
              <div className="h-full w-[55%] rounded-full bg-accent" />
            </div>
          </motion.div>

          {/* Trait card — right */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-none absolute left-[64%] top-[43vh] z-30 hidden h-[285px] w-[200px] flex-col justify-center glass-card rounded-2xl px-6 py-5 md:flex"
            style={{ filter: heroBlurFilter }}
          >
            <ul className="flex flex-col gap-3.5">
              {heroTraits.map((trait) => (
                <li key={trait.label} className="flex items-center gap-3">
                  <trait.icon className="text-accent" size={16} />
                  <span className="text-lg font-bold tracking-tight text-[var(--fg)]">
                    {trait.label}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Headline — centered over the portrait */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-none absolute inset-x-0 top-[69vh] z-40 flex flex-col items-center px-6 text-center"
            style={{ filter: heroBlurFilter }}
          >
            <h2 className="font-display text-[clamp(2rem,4.2vw,4.5rem)] font-bold leading-[0.95] tracking-tight text-[var(--fg)] drop-shadow-[0_4px_24px_var(--bg)]">
              Full stack
              <br />
              Zero gaps
            </h2>
          </motion.div>

          {/* CTAs — dropped lower, on their own row above the tagline */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-x-0 top-[89vh] z-40 flex flex-wrap items-center justify-center gap-4 px-6"
            style={{ filter: heroBlurFilter }}
          >
            <Link
              href="#contact"
              className="group rounded-full bg-accent px-8 py-4 font-bold text-[var(--ink)] transition-transform hover:scale-105"
            >
              <span className="flex items-center gap-2">
                Book a Call <FiArrowUp className="rotate-45 transition-transform group-hover:rotate-90" size={18} />
              </span>
            </Link>
            <Link
              href="#work"
              className="rounded-full border border-[var(--border)] bg-[var(--fg-ghost)] px-8 py-4 font-bold text-[var(--fg)] backdrop-blur-md transition-transform hover:scale-105"
            >
              View Work
            </Link>
          </motion.div>

          {/* Bottom rail — tagline left, blurb right */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 1.1 }}
            className="absolute inset-x-0 bottom-6 z-30 hidden items-end justify-between gap-10 px-6 lg:flex lg:px-12"
            style={{ filter: heroBlurFilter }}
          >
            <div className="text-lg font-medium leading-snug text-[var(--fg-secondary)]">
              <p>
                The Full Stack Developer.
                <br />
                That&apos;s Adrian Mark.
              </p>
              {/* Rotating stack line */}
              <span className="mt-2 flex items-center gap-2 text-sm text-[var(--fg-muted)]">
                focused on
                <span className="relative inline-flex h-6 overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={techStack[techIndex]}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="font-semibold text-accent"
                    >
                      {techStack[techIndex]}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </span>
            </div>
            <p className="max-w-sm text-right text-base leading-relaxed text-[var(--fg-muted)]">
              Working closely with your team to ship web products that merge clean
              engineering, sharp design, and long-term value.
            </p>
          </motion.div>
        </div>

        {/* ═══════════ Mobile / small-screen hero ═══════════ */}
        <div className="lg:hidden">
          {/* Hero visual — the portrait is a full-bleed background; everything overlays it */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative h-[100svh] min-h-[640px] w-full overflow-hidden"
          >
            {/* Giant name — behind the portrait; the cut-out's opaque body overlaps it */}
            <svg
              aria-hidden
              viewBox="0 0 1000 250"
              preserveAspectRatio="xMidYMid meet"
              className="absolute inset-x-0 top-[7vh] z-0 w-full px-5 select-none"
            >
              <text
                x="0"
                y="210"
                textLength="1000"
                lengthAdjust="spacingAndGlyphs"
                fill="var(--accent)"
                style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
                fontSize="230"
              >
                GUAÑEZ
              </text>
            </svg>

            {/* Full-bleed portrait — fills top to bottom, sits above the name.
                Nudged down so ~half the name shows above the head. */}
            <Image
              src={HERO_PORTRAIT_TALL}
              alt="Adrian Mark M. Guañez"
              fill
              priority
              sizes="100vw"
              className="z-10 translate-y-[8vh] object-cover object-top"
            />
            {/* Fade the lower body into the page bg so the headline stays legible */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-1/2 bg-gradient-to-t from-[var(--bg)] via-[var(--bg)]/80 to-transparent" />

            {/* Trait card — mid-left, over the chest */}
            <div className="glass-card absolute left-5 top-[42%] z-30 rounded-2xl px-4 py-3">
              <ul className="flex flex-col gap-2">
                {heroTraits.map((trait) => (
                  <li key={trait.label} className="flex items-center gap-2.5">
                    <trait.icon className="text-accent" size={14} />
                    <span className="text-sm font-bold tracking-tight text-[var(--fg)]">{trait.label}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Stat card — staggered lower-right */}
            <div className="glass-card absolute right-5 top-[54%] z-30 flex flex-col items-center justify-center rounded-2xl px-5 py-4 text-center">
              <div className="font-display text-4xl font-bold leading-none text-accent">{heroStats[0].value}</div>
              <div className="mt-1.5 text-[10px] font-semibold uppercase leading-tight tracking-[0.12em] text-[var(--fg-secondary)]">
                Projects
                <br />
                Built
              </div>
            </div>

            {/* Bottom overlay — headline + GWA card, anchored to the bottom of the image */}
            <div className="absolute inset-x-0 bottom-0 z-30 flex flex-col items-center px-5 pb-8">
              <h2 className="text-center font-display text-[clamp(2.75rem,14vw,4rem)] font-bold leading-[0.92] tracking-tight text-[var(--fg)]">
                Full stack
                <br />
                Zero gaps
              </h2>
              <div className="glass-card mt-6 inline-flex items-center gap-3.5 rounded-2xl px-5 py-3.5">
                <FiTrendingUp className="text-accent" size={26} />
                <div className="text-left">
                  <div className="font-display text-2xl font-bold leading-none text-[var(--fg)]">{heroStats[1].value}</div>
                  <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--fg-muted)]">
                    {heroStats[1].label}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quote — below the visual, on the dark bg */}
          <div className="px-5 py-10">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-md text-left text-[15px] leading-relaxed text-[var(--fg-muted)]"
            >
              The Full Stack Developer. That&apos;s Adrian Mark — shipping web products that merge
              clean engineering, sharp design, and long-term value.
            </motion.p>
          </div>
        </div>
        </section>
      </main>

      {/* Hero Marquee Ticker — full width, outside main padding */}
      <div className="border-y border-[var(--border)] py-4">
        <MarqueeTicker
          items={techStack}
          direction="left"
          speed={25}
          separator="✦"
          className="opacity-50"
        />
      </div>

      {/* Section: About */}
      <SectionDivider />
      <AboutSection />

      {/* Section: Skills */}
      <SectionDivider />
      <SkillsSection />

      {/* Section: Projects Carousel */}
      <SectionDivider />
      <ProjectsCarousel />


      {/* Section: Experience */}
      <SectionDivider />
      <ExperienceSection />

      {/* Section: Education */}
      <SectionDivider />
      <EducationSection />

      <SectionDivider />

      {/* Combined Contact + Footer */}
      <footer id="contact" className="relative h-screen flex flex-col overflow-hidden" style={{ background: 'var(--bg-secondary-surface)', backgroundColor: 'var(--bg-secondary)' }}>
        {/* Thrown/Scattered Images Background */}
        <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none" style={{ bottom: "auto", height: "70%" }}>
          {thrownItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ x: 0, y: 0, rotate: 0, opacity: 0, scale: 0 }}
              whileInView={{ 
                x: item.x, 
                y: item.y, 
                rotate: item.rotate, 
                opacity: 0.6, 
                scale: 1 
              }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ 
                type: "spring", 
                stiffness: 40, 
                damping: 15, 
                delay: i * 0.1,
                mass: 0.8
              }}
              className={`absolute ${item.width} aspect-[4/3] rounded-xl overflow-hidden shadow-2xl pointer-events-auto cursor-pointer`}
              style={{ willChange: "transform" }}
              whileHover={{ 
                scale: 1.1, 
                opacity: 1,
                zIndex: 30,
                rotate: 0,
                transition: { duration: 0.3 }
              }}
            >
              <Image 
                src={item.src} 
                alt={item.alt}
                fill
                className="object-cover"
              />
            </motion.div>
          ))}
        </div>

        {/* Let's Talk — Centered in upper area */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center pointer-events-none">
          <h2 className="text-6xl md:text-9xl font-bold tracking-tighter mb-8 text-[var(--fg)]">Let&apos;s talk</h2>
          <button
            onClick={() => setContactOpen(true)}
            className="pointer-events-auto group relative px-10 py-4 bg-[var(--fg)] text-[var(--bg)] font-semibold text-lg rounded-full overflow-hidden transition-all hover:scale-105"
          >
            <span className="flex items-center gap-2">
              Get in Touch <FiMail size={18} />
            </span>
          </button>
        </div>

        {/* Bottom Footer Bar + Giant Name */}
        <div className="relative z-10 mt-auto border-t border-[var(--border)]">
          {/* Links Row */}
          <div className="px-6 lg:px-24 pt-2 pb-0 flex items-center justify-between text-sm text-[var(--fg-muted)]">
            <div className="flex gap-6">
              <Link href="https://www.linkedin.com/in/gua%C3%B1ez-adrian-mark-m-99461b297" target="_blank" className="hover:text-[var(--fg)] transition-colors">LinkedIn</Link>
              <Link href="https://github.com/Guanez" target="_blank" className="hover:text-[var(--fg)] transition-colors">GitHub</Link>
            </div>
            <div className="flex gap-6">
              <Link href="https://web.facebook.com/markguanez" target="_blank" className="hover:text-[var(--fg)] transition-colors">Facebook</Link>
              <Link href="https://twitter.com" target="_blank" className="hover:text-[var(--fg)] transition-colors">Twitter</Link>
            </div>
          </div>
          {/* Giant Name */}
          <div className="text-center -mt-3">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-[clamp(4rem,15vw,14rem)] font-bold tracking-tight leading-none text-[var(--fg-faint)] select-none whitespace-nowrap -mb-[0.15em]"
            >
              DEV GUAÑEZ
            </motion.h2>
          </div>
        </div>
      </footer>

      {/* Fixed Scroll Up Arrow — hidden on the hero so the blurb can reach the edge */}
      <button
        onClick={scrollToTop}
        className={`fixed right-6 lg:right-10 bottom-6 p-4 bg-[var(--fg-ghost)] hover:bg-[var(--fg-faint)] backdrop-blur-md border border-[var(--border)] rounded-full transition-all hover:-translate-y-2 group z-40 ${showScrollTop ? "opacity-100" : "pointer-events-none opacity-0"}`}
        aria-label="Scroll to top"
      >
        <FiArrowUp className="text-[var(--fg-muted)] group-hover:text-[var(--fg)] transition-colors" />
      </button>

      {/* Contact Modal */}
      <AnimatePresence>
        {contactOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-6"
            onClick={() => setContactOpen(false)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md bg-[var(--bg-secondary)] border border-[var(--border)] rounded-2xl p-8 shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setContactOpen(false)}
                className="absolute top-4 right-4 p-2 text-[var(--fg-faint)] hover:text-[var(--fg)] transition-colors"
              >
                <FiX size={20} />
              </button>

              <h3 className="text-2xl font-bold tracking-tight mb-2">Let&apos;s work together</h3>
              <p className="text-[var(--fg-muted)] text-sm mb-8">Choose your preferred way to reach me.</p>

              <div className="flex flex-col gap-3">
                {/* Email */}
                <div className="flex items-center justify-between bg-[var(--fg-ghost)] border border-[var(--border)] rounded-xl px-5 py-4 group">
                  <div className="flex items-center gap-3">
                    <FiMail className="text-accent" size={20} />
                    <div>
                      <p className="text-xs text-[var(--fg-faint)] uppercase tracking-wider">Email</p>
                      <p className="text-sm font-medium">markadrianguanez@gmail.com</p>
                    </div>
                  </div>
                  <button
                    onClick={copyEmail}
                    className="p-2 rounded-lg bg-[var(--fg-ghost)] hover:bg-[var(--fg-faint)] transition-colors"
                    title="Copy email"
                  >
                    {copied ? <FiCheck className="text-accent" size={16} /> : <FiCopy className="text-[var(--fg-muted)]" size={16} />}
                  </button>
                </div>

                {/* Phone */}
                <div className="flex items-center justify-between bg-[var(--fg-ghost)] border border-[var(--border)] rounded-xl px-5 py-4 group">
                  <div className="flex items-center gap-3">
                    <FiPhone className="text-accent" size={20} />
                    <div>
                      <p className="text-xs text-[var(--fg-faint)] uppercase tracking-wider">Phone</p>
                      <p className="text-sm font-medium">+63 947 327 3898</p>
                    </div>
                  </div>
                  <button
                    onClick={copyPhone}
                    className="p-2 rounded-lg bg-[var(--fg-ghost)] hover:bg-[var(--fg-faint)] transition-colors"
                    title="Copy phone number"
                  >
                    {phoneCopied ? <FiCheck className="text-accent" size={16} /> : <FiCopy className="text-[var(--fg-muted)]" size={16} />}
                  </button>
                </div>

                {/* LinkedIn */}
                <Link
                  href="https://www.linkedin.com/in/gua%C3%B1ez-adrian-mark-m-99461b297"
                  target="_blank"
                  className="flex items-center gap-3 bg-[var(--fg-ghost)] border border-[var(--border)] rounded-xl px-5 py-4 hover:bg-[var(--fg-faint)] transition-colors"
                >
                  <FiLinkedin className="text-accent" size={20} />
                  <div>
                    <p className="text-xs text-[var(--fg-faint)] uppercase tracking-wider">LinkedIn</p>
                    <p className="text-sm font-medium">Connect with me</p>
                  </div>
                  <FiExternalLink className="ml-auto text-[var(--fg-faint)]" size={14} />
                </Link>

                {/* GitHub */}
                <Link
                  href="https://github.com/Guanez"
                  target="_blank"
                  className="flex items-center gap-3 bg-[var(--fg-ghost)] border border-[var(--border)] rounded-xl px-5 py-4 hover:bg-[var(--fg-faint)] transition-colors"
                >
                  <FiGithub className="text-accent" size={20} />
                  <div>
                    <p className="text-xs text-[var(--fg-faint)] uppercase tracking-wider">GitHub</p>
                    <p className="text-sm font-medium">View my code</p>
                  </div>
                  <FiExternalLink className="ml-auto text-[var(--fg-faint)]" size={14} />
                </Link>
              </div>

              <p className="text-center text-[var(--fg-faint)] text-xs mt-6">Based in the Philippines · Open to remote work worldwide</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
