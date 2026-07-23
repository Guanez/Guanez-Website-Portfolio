"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView, type PanInfo } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  FiArrowLeft,
  FiArrowRight,
  FiExternalLink,
  FiGithub,
  FiMaximize2,
  FiImage,
} from "react-icons/fi";
import { projects, type Project } from "@/lib/projects";
import GitHubActivitySection from "./GitHubActivitySection";
import ProjectModal from "./ProjectModal";

// All project content lives in `lib/projects.ts` — edit there, not here.

export default function ProjectsCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [openProject, setOpenProject] = useState<Project | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(carouselRef, { once: true, margin: "-20%" });
  const [hasFannedOut, setHasFannedOut] = useState(false);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setHasFannedOut(true), 200);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  const navigate = useCallback(
    (dir: number) => {
      setDirection(dir);
      setActiveIndex((prev) => {
        const next = prev + dir;
        if (next < 0) return projects.length - 1;
        if (next >= projects.length) return 0;
        return next;
      });
    },
    []
  );

  // Drag / swipe navigation
  const handleDragEnd = useCallback(
    (_e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      const distanceThreshold = 60; // px dragged
      const velocityThreshold = 400; // px/s flick
      const { offset, velocity } = info;
      // Ignore mostly-vertical gestures so page scroll still works
      if (Math.abs(offset.x) < Math.abs(offset.y)) return;
      if (offset.x < -distanceThreshold || velocity.x < -velocityThreshold) {
        navigate(1); // drag left → next
      } else if (offset.x > distanceThreshold || velocity.x > velocityThreshold) {
        navigate(-1); // drag right → previous
      }
    },
    [navigate]
  );

  // Keyboard navigation — pause while the case-study modal owns the arrows.
  useEffect(() => {
    if (openProject) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") navigate(-1);
      if (e.key === "ArrowRight") navigate(1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigate, openProject]);

  const getCardStyle = (index: number) => {
    const diff = index - activeIndex;
    // Handle wrap-around
    const wrappedDiff =
      Math.abs(diff) > projects.length / 2
        ? diff > 0
          ? diff - projects.length
          : diff + projects.length
        : diff;

    if (wrappedDiff === 0) {
      // Center card
      return {
        x: 0,
        scale: 1,
        rotate: 0,
        zIndex: 30,
        opacity: 1,
        filter: "brightness(1)",
      };
    } else if (wrappedDiff === -1) {
      // Left card
      return {
        x: "-45%",
        scale: 0.82,
        rotate: -12,
        zIndex: 20,
        opacity: 0.7,
        filter: "brightness(0.7)",
      };
    } else if (wrappedDiff === 1) {
      // Right card
      return {
        x: "45%",
        scale: 0.82,
        rotate: 12,
        zIndex: 20,
        opacity: 0.7,
        filter: "brightness(0.7)",
      };
    } else if (wrappedDiff === -2) {
      // Far left
      return {
        x: "-80%",
        scale: 0.65,
        rotate: -20,
        zIndex: 10,
        opacity: 0.3,
        filter: "brightness(0.5)",
      };
    } else if (wrappedDiff === 2) {
      // Far right
      return {
        x: "80%",
        scale: 0.65,
        rotate: 20,
        zIndex: 10,
        opacity: 0.3,
        filter: "brightness(0.5)",
      };
    } else {
      // Hidden
      return {
        x: wrappedDiff > 0 ? "100%" : "-100%",
        scale: 0.5,
        rotate: wrappedDiff > 0 ? 25 : -25,
        zIndex: 0,
        opacity: 0,
        filter: "brightness(0.3)",
      };
    }
  };

  const activeProject = projects[activeIndex];

  return (
    <section id="work" className="py-32 overflow-hidden">
      <div className="px-6 lg:px-24 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-6xl mx-auto"
        >
          {/* Section Label */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-[1px] bg-accent" />
            <span className="text-accent text-sm font-mono tracking-widest uppercase">Work</span>
          </div>

          <div className="flex items-end justify-between">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">
              <span className="text-gradient">Selected</span>{" "}
              <span className="text-gradient-muted italic">Projects</span>
            </h2>

            {/* Navigation */}
            <div className="hidden md:flex items-center gap-3">
              <span className="font-mono text-sm text-[var(--fg-faint)] mr-4">
                {String(activeIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
              </span>
              <button
                onClick={() => navigate(-1)}
                className="p-3 rounded-full border border-[var(--border)] hover:border-accent/40 hover:bg-accent/5 transition-all duration-300"
                aria-label="Previous project"
              >
                <FiArrowLeft size={18} />
              </button>
              <button
                onClick={() => navigate(1)}
                className="p-3 rounded-full border border-[var(--border)] hover:border-accent/40 hover:bg-accent/5 transition-all duration-300"
                aria-label="Next project"
              >
                <FiArrowRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Fanned Card Carousel */}
      <div ref={carouselRef} className="relative h-[500px] md:h-[600px] lg:h-[650px] flex items-center justify-center mb-16">
        {/* Cards */}
        <motion.div
          className="relative w-full max-w-lg md:max-w-xl lg:max-w-2xl h-full cursor-grab active:cursor-grabbing"
          style={{ touchAction: "pan-y" }}
          onPanEnd={handleDragEnd}
        >
          {projects.map((project, index) => {
            const style = getCardStyle(index);
            const stackedStyle = {
              x: 0,
              scale: 1,
              rotateZ: 0,
              zIndex: projects.length - index,
              opacity: index === 0 ? 1 : 0.6,
              filter: index === 0 ? "brightness(1)" : "brightness(0.7)",
            };
            const animateStyle = hasFannedOut
              ? { x: style.x, scale: style.scale, rotateZ: style.rotate, zIndex: style.zIndex, opacity: style.opacity, filter: style.filter }
              : stackedStyle;
            return (
              <motion.div
                key={project.slug}
                className="absolute inset-0 cursor-pointer"
                initial={stackedStyle}
                animate={{
                  x: animateStyle.x,
                  scale: animateStyle.scale,
                  rotateZ: animateStyle.rotateZ,
                  zIndex: animateStyle.zIndex,
                  opacity: animateStyle.opacity,
                  filter: animateStyle.filter,
                }}
                transition={{
                  type: "spring",
                  stiffness: 120,
                  damping: 20,
                  mass: 1,
                  delay: hasFannedOut && !direction ? index * 0.08 : 0,
                }}
                onClick={() => {
                  if (index !== activeIndex) {
                    const diff = index - activeIndex;
                    const wrappedDiff =
                      Math.abs(diff) > projects.length / 2
                        ? diff > 0
                          ? diff - projects.length
                          : diff + projects.length
                        : diff;
                    navigate(wrappedDiff > 0 ? 1 : -1);
                  } else {
                    // Active card → open the case study.
                    setOpenProject(project);
                  }
                }}
                style={{ transformOrigin: "center bottom" }}
              >
                <div className="w-full h-full rounded-2xl overflow-hidden border border-[var(--border)] shadow-2xl bg-[var(--bg-secondary)]">
                  <div className="relative w-full h-full">
                    {index === activeIndex && project.cardVideo ? (
                      // Only the active card plays a clip — one video at a time.
                      <video
                        key={project.cardVideo}
                        src={project.cardVideo}
                        poster={project.cover}
                        className="absolute inset-0 w-full h-full object-cover"
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                      />
                    ) : project.cover ? (
                      <Image
                        src={project.cover}
                        alt={project.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 640px"
                      />
                    ) : (
                      // Placeholder until a real screenshot is captured.
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-[var(--fg-faint)]">
                        <FiImage size={44} strokeWidth={1.25} />
                        <span className="text-[10px] font-mono uppercase tracking-widest">
                          Image coming soon
                        </span>
                      </div>
                    )}
                    {/* Gradient overlay at bottom */}
                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent" />
                    {/* Hover cue — only on the active card */}
                    {index === activeIndex && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 hover:bg-black/40 hover:opacity-100">
                        <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-white text-sm font-medium">
                          View case study <FiMaximize2 size={14} />
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Mobile Navigation */}
        <div className="absolute bottom-4 flex md:hidden items-center gap-4 z-40">
          <button
            onClick={() => navigate(-1)}
            className="p-3 rounded-full border border-[var(--border)] bg-[var(--bg)]/80 backdrop-blur-md hover:border-accent/40 transition-all"
            aria-label="Previous project"
          >
            <FiArrowLeft size={16} />
          </button>
          <span className="font-mono text-xs text-[var(--fg-faint)]">
            {String(activeIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
          </span>
          <button
            onClick={() => navigate(1)}
            className="p-3 rounded-full border border-[var(--border)] bg-[var(--bg)]/80 backdrop-blur-md hover:border-accent/40 transition-all"
            aria-label="Next project"
          >
            <FiArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* Active Project Info */}
      <div className="px-6 lg:px-24">
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col md:flex-row md:items-end md:justify-between gap-6"
            >
              <div>
                <p className="text-accent text-sm font-mono tracking-wider mb-2">
                  {activeProject.category}
                </p>
                <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
                  {activeProject.title}
                </h3>
                <p className="text-xs font-mono uppercase tracking-widest text-[var(--fg-faint)] mb-3">
                  {activeProject.role}
                </p>
                <p className="text-[var(--fg-muted)] max-w-md">
                  {activeProject.description}
                </p>
              </div>

              <div className="flex flex-col items-start md:items-end gap-4 md:max-w-md">
                <div className="flex flex-wrap gap-2.5 md:justify-end">
                  {activeProject.tech.map((t) => (
                    <span
                      key={t}
                      className="px-4 py-2 text-sm font-mono text-[var(--fg-faint)] border border-[var(--border)] rounded-lg"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setOpenProject(activeProject)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border border-accent/40 text-accent hover:bg-accent/10 transition-colors"
                  >
                    Case study <FiMaximize2 size={14} />
                  </button>
                  {activeProject.liveUrl && (
                    <Link
                      href={activeProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border border-[var(--border)] text-[var(--fg-muted)] hover:text-accent hover:border-accent/40 transition-colors"
                    >
                      Live <FiExternalLink size={14} />
                    </Link>
                  )}
                  {activeProject.repoUrl && (
                    <Link
                      href={activeProject.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border border-[var(--border)] text-[var(--fg-muted)] hover:text-accent hover:border-accent/40 transition-colors"
                    >
                      Code <FiGithub size={14} />
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>


      {/* Dots Navigation */}
      <div className="flex justify-center gap-2">
        {projects.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setDirection(i > activeIndex ? 1 : -1);
              setActiveIndex(i);
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === activeIndex
                ? "bg-accent w-6"
                : "bg-[var(--fg-secondary)] opacity-60 hover:opacity-90"
            }`}
            aria-label={`Go to project ${i + 1}`}
          />
        ))}
      </div>

      {/* Case-study modal */}
      <ProjectModal project={openProject} onClose={() => setOpenProject(null)} />

      {/* GitHub Activity — Part 2 of Work */}
      <GitHubActivitySection />
    </section>
  );
}
