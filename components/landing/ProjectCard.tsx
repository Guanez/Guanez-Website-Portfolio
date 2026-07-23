"use client";

import { motion } from "framer-motion";

export interface Project {
  id: string;
  title: string;
  category: string;
  tags: string[];
  year: number;
  thumbnail: string | null;
  color: string;
  description?: string;
  href: string;
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.7,
        delay: 0.15 + index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group block h-full w-full overflow-hidden relative"
      style={{
        background: `linear-gradient(135deg, ${project.color}15 0%, ${project.color}05 50%, #020202 100%)`,
      }}
    >
      {/* Content overlay - minimal */}
      <div className="absolute inset-0 flex flex-col justify-end p-3">
        <p className="text-[10px] font-medium uppercase tracking-[0.1em] text-white/80 leading-snug">
          {project.title}
        </p>
      </div>
    </motion.a>
  );
}
