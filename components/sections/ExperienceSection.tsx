"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiBriefcase } from "react-icons/fi";

const experiences = [
  {
    role: "Full-Stack Developer (Co-Developer)",
    company: "Oracle Petroleum Corporation",
    period: "2026",
    type: "Freelance Contract",
    description:
      "Co-developed the Oracle Client Meeting & Field Management Platform — a multi-tenant web app for client-meeting oversight and field-activity management, coordinating with a 4-developer team across web and mobile integration.",
    highlights: [
      "Built role-based dashboards with live GPS map tracking and meeting oversight",
      "Implemented real-time field-activity monitoring across tenants",
      "Collaborated with a 4-developer team coordinating web and mobile app integration",
    ],
  },
  {
    role: "Full-Stack Developer & QA Tester",
    company: "Oracle Petroleum Corporation",
    period: "2026",
    type: "OJT · On-site",
    description:
      "Built and tested production web platforms across e-commerce, internal tooling, and field-operations systems — contributing as both a full-stack developer and a QA tester.",
    highlights: [
      "KST E-commerce (Main Developer): built a customizable product-design platform with a no-code admin CMS, enabling non-technical staff to manage catalog, promotions, and landing pages independently",
      "CRS System (Co-Developer & QA): developed an internal request-management platform from scratch, streamlining company-wide task tracking and workflows",
      "BAGANIOIL.PH (Co-Developer & QA): executed comprehensive testing to ensure live-site stability and validated CMS functionality for admin users",
      "Agent Operation App (QA Tester): tested a dual-platform app for real-time field-agent tracking, activity logging, and performance monitoring",
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const timelineCardVariants = {
  hidden: { opacity: 0, x: -40, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function ExperienceSection() {
  const timelineRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 80%", "end 60%"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="experience" className="py-32 px-6 lg:px-24">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-6xl mx-auto"
      >
        {/* Section Label */}
        <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6">
          <div className="w-8 h-[1px] bg-accent" />
          <span className="text-accent text-sm font-mono tracking-widest uppercase">Experience</span>
        </motion.div>

        {/* Heading (slide from right for variety) */}
        <motion.h2
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl md:text-6xl font-bold tracking-tighter mb-6"
        >
          <span className="text-gradient">Where I&apos;ve</span>{" "}
          <span className="text-gradient-muted italic">Worked</span>
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="text-[var(--fg-muted)] text-lg max-w-xl mb-20"
        >
          A timeline of my professional journey, from first lines of code to full-stack development.
        </motion.p>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Vertical line — animated on scroll */}
          <div className="absolute left-0 md:left-8 top-0 bottom-0 w-px bg-[var(--border)]" />
          <motion.div
            className="absolute left-0 md:left-8 top-0 bottom-0 w-px bg-accent origin-top"
            style={{ scaleY: lineScale }}
          />

          <div className="flex flex-col gap-16">
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                variants={timelineCardVariants}
                className="relative pl-8 md:pl-24"
              >
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-8 top-1 -translate-x-1/2 z-10">
                  <div className="w-4 h-4 rounded-full border-2 border-accent bg-[var(--bg)] flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                  </div>
                </div>

                {/* Card */}
                <div className="group relative p-6 md:p-8 rounded-2xl border border-[var(--border)] bg-[var(--fg-ghost)] backdrop-blur-sm hover:border-accent/20 transition-colors duration-500">
                  {/* Hover glow */}
                  <div className="absolute inset-0 rounded-2xl bg-accent/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <FiBriefcase className="text-accent" size={16} />
                          <span className="text-xs font-mono text-accent tracking-wider uppercase">
                            {exp.type}
                          </span>
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold tracking-tight">
                          {exp.role}
                        </h3>
                        <p className="text-[var(--fg-muted)] font-medium">{exp.company}</p>
                      </div>
                      <span className="text-sm font-mono text-[var(--fg-faint)] whitespace-nowrap">
                        {exp.period}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-[var(--fg-muted)] text-sm leading-relaxed mb-5">
                      {exp.description}
                    </p>

                    {/* Highlights */}
                    <ul className="space-y-2">
                      {exp.highlights.map((highlight, j) => (
                        <li
                          key={j}
                          className="flex items-start gap-2 text-sm text-[var(--fg-muted)]"
                        >
                          <span className="text-accent mt-1.5 flex-shrink-0">▸</span>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
