"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  FiX,
  FiExternalLink,
  FiGithub,
  FiArrowLeft,
  FiArrowRight,
  FiLock,
  FiImage,
} from "react-icons/fi";
import type { Project } from "@/lib/projects";

type Props = {
  project: Project | null;
  onClose: () => void;
};

export default function ProjectModal({ project, onClose }: Props) {
  const [mediaIndex, setMediaIndex] = useState(0);
  const media = project?.media ?? [];
  const hasMedia = media.length > 0;

  // Reset the gallery whenever a new project opens.
  useEffect(() => {
    setMediaIndex(0);
  }, [project?.slug]);

  const stepMedia = useCallback(
    (dir: number) => {
      if (!hasMedia) return;
      setMediaIndex((prev) => (prev + dir + media.length) % media.length);
    },
    [hasMedia, media.length]
  );

  // Escape closes; arrows page the gallery. These win over the carousel's own
  // key handler because the carousel bails while a modal is open.
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") stepMedia(-1);
      if (e.key === "ArrowRight") stepMedia(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [project, onClose, stepMedia]);

  // Lock scroll while open. Native overflow alone isn't enough — Lenis smooth
  // scroll hijacks the wheel globally, so we also freeze it via window.__lenis.
  useEffect(() => {
    if (!project) return;
    const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    lenis?.stop();
    return () => {
      document.body.style.overflow = original;
      lenis?.start();
    };
  }, [project]);

  const active = hasMedia ? media[mediaIndex] : null;

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden
          />

          {/* Panel */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${project.title} case study`}
            data-lenis-prevent
            className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl border border-[var(--border)] bg-[var(--bg)] shadow-2xl"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full border border-[var(--border)] bg-[var(--bg)]/80 backdrop-blur-md text-[var(--fg-muted)] hover:text-accent hover:border-accent/40 transition-colors"
              aria-label="Close case study"
            >
              <FiX size={18} />
            </button>

            {/* ── Media viewer ─────────────────────────────────────────── */}
            <div className="relative w-full aspect-video bg-[var(--bg-secondary)] border-b border-[var(--border)]">
              {active?.type === "video" ? (
                <video
                  key={active.src}
                  src={active.src}
                  poster={active.poster}
                  className="w-full h-full object-cover"
                  preload="metadata"
                  controls
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              ) : active?.type === "image" ? (
                <Image
                  key={active.src}
                  src={active.src}
                  alt={active.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 1024px"
                />
              ) : (
                // Empty state — media not added yet.
                <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-[var(--fg-faint)]">
                  <FiImage size={28} />
                  <p className="text-sm font-mono">
                    {project.isPrivate
                      ? "Media walkthrough coming soon"
                      : "Screenshots coming soon"}
                  </p>
                </div>
              )}

              {/* Gallery arrows */}
              {media.length > 1 && (
                <>
                  <button
                    onClick={() => stepMedia(-1)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/50 backdrop-blur-md text-white hover:bg-black/70 transition-colors"
                    aria-label="Previous media"
                  >
                    <FiArrowLeft size={16} />
                  </button>
                  <button
                    onClick={() => stepMedia(1)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/50 backdrop-blur-md text-white hover:bg-black/70 transition-colors"
                    aria-label="Next media"
                  >
                    <FiArrowRight size={16} />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail strip */}
            {media.length > 1 && (
              <div className="flex gap-2 overflow-x-auto px-6 py-3 border-b border-[var(--border)]">
                {media.map((m, i) => (
                  <button
                    key={m.src}
                    onClick={() => setMediaIndex(i)}
                    className={`relative shrink-0 w-20 h-14 rounded-md overflow-hidden border transition-all ${
                      i === mediaIndex
                        ? "border-accent"
                        : "border-[var(--border)] opacity-60 hover:opacity-100"
                    }`}
                    aria-label={`View media ${i + 1}`}
                  >
                    <Image
                      src={m.type === "video" ? m.poster : m.src}
                      alt={m.alt}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* ── Details ──────────────────────────────────────────────── */}
            <div className="p-6 md:p-10">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className="text-accent text-sm font-mono tracking-wider">
                  {project.category}
                </span>
                {project.isPrivate && (
                  <span className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-[var(--fg-faint)] border border-[var(--border)] rounded-full px-2.5 py-1">
                    <FiLock size={11} /> Private
                  </span>
                )}
              </div>

              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
                {project.title}
              </h2>
              <p className="text-xs font-mono uppercase tracking-widest text-[var(--fg-faint)] mb-6">
                {project.role}
              </p>

              <p className="text-[var(--fg-muted)] leading-relaxed max-w-2xl mb-8">
                {project.overview ?? project.description}
              </p>

              {project.highlights && project.highlights.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-sm font-mono uppercase tracking-widest text-[var(--fg-faint)] mb-4">
                    Highlights
                  </h3>
                  <ul className="grid sm:grid-cols-2 gap-3 max-w-2xl">
                    {project.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-3 text-[var(--fg-muted)]">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-sm font-mono uppercase tracking-widest text-[var(--fg-faint)] mb-4">
                  Stack
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-3.5 py-1.5 text-sm font-mono text-[var(--fg-faint)] border border-[var(--border)] rounded-lg"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {(project.liveUrl || project.repoUrl) && (
                <div className="flex flex-wrap items-center gap-3">
                  {project.liveUrl && (
                    <Link
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium border border-accent/40 text-accent hover:bg-accent/10 transition-colors"
                    >
                      Visit site <FiExternalLink size={14} />
                    </Link>
                  )}
                  {project.repoUrl && (
                    <Link
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium border border-[var(--border)] text-[var(--fg-muted)] hover:text-accent hover:border-accent/40 transition-colors"
                    >
                      View code <FiGithub size={14} />
                    </Link>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
