"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { FiBookOpen, FiAward, FiChevronUp } from "react-icons/fi";
import { useRef, useState } from "react";

const education = {
  degree: "Bachelor of Science in Information Technology",
  school: "Polytechnic University of the Philippines",
  period: "Expected 2026",
  description:
    "Graduating Magna Cum Laude with a 1.29 GWA and President's Lister standing. Thesis: UniQue — a customizable real-time digital queueing system with SMS notifications.",
  coursework: [
    "Magna Cum Laude",
    "GWA 1.29",
    "President's Lister",
    "Web Development",
    "Software Engineering",
    "Database Management",
    "Data Structures",
  ],
};

const certifications = [
  {
    name: "Salesforce Capstone Project",
    issuer: "Salesforce",
    year: "Jan 2026",
  },
  {
    name: "Salesforce Developer",
    issuer: "Salesforce Trailhead",
    year: "Nov 2025",
  },
  {
    name: "Start-up: Preparing Students for Innovation Challenges",
    issuer: "DICT PUPSMB",
    year: "May 2025",
  },
  {
    name: "Introduction to Cybersecurity",
    issuer: "CISCO",
    year: "Apr 2025",
  },
  {
    name: "Introduction to Packet Tracer",
    issuer: "CISCO",
    year: "May 2024",
  },
];

// Marquee items — credentials, tools, and badges for the scrolling strip
const marqueeRow1 = [
  "Salesforce Developer",
  "Salesforce Capstone Project",
  "Introduction to Cybersecurity",
  "Introduction to Packet Tracer",
  "DICT Start-up Program",
  "Magna Cum Laude",
  "President's Lister",
  "GWA 1.29",
];

const marqueeRow2 = [
  "Salesforce",
  "Salesforce Trailhead",
  "CISCO",
  "DICT PUPSMB",
  "Polytechnic University of the Philippines",
  "PUP Sta. Maria",
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
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

const rungVariants = {
  hidden: { opacity: 0, x: -20, scaleX: 0 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    scaleX: 1,
    transition: {
      duration: 0.6,
      delay: i * 0.15,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

const cardVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      delay: i * 0.15 + 0.1,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export default function EducationSection() {
  const ladderRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ladderRef,
    offset: ["start end", "end start"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 0.6], ["0%", "100%"]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="education" className="py-32 px-6 lg:px-24">
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
          <span className="text-accent text-sm font-mono tracking-widest uppercase">Education</span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          variants={itemVariants}
          className="text-4xl md:text-6xl font-bold tracking-tighter mb-20"
        >
          <span className="text-gradient">Learning</span>{" "}
          <span className="text-gradient-muted italic">& Growth</span>
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Education Card */}
          <motion.div variants={itemVariants}>
            <div className="group relative p-8 rounded-2xl border border-[var(--border)] bg-[var(--fg-ghost)] backdrop-blur-sm hover:border-accent/20 transition-colors duration-500 h-full">
              <div className="absolute inset-0 rounded-2xl bg-accent/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                  <FiBookOpen className="text-accent" size={22} />
                </div>

                <span className="text-sm font-mono text-[var(--fg-faint)] tracking-wider">
                  {education.period}
                </span>
                <h3 className="text-xl md:text-2xl font-bold tracking-tight mt-2 mb-1">
                  {education.degree}
                </h3>
                <p className="text-accent text-sm font-medium mb-5">{education.school}</p>
                <p className="text-sm text-[var(--fg-muted)] leading-relaxed mb-6">
                  {education.description}
                </p>

                {/* Coursework tags */}
                <div className="flex flex-wrap gap-2">
                  {education.coursework.map((course, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 text-xs font-mono text-[var(--fg-faint)] border border-[var(--border)] rounded-md"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Certifications Ladder Timeline */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-3 mb-8">
              <FiAward className="text-accent" size={18} />
              <h3 className="text-lg font-bold tracking-tight">Certifications</h3>
              <FiChevronUp className="text-accent/50 ml-auto" size={16} />
              <span className="text-xs font-mono text-[var(--fg-faint)]">climb</span>
            </div>

            {/* Ladder structure */}
            <div ref={ladderRef} className="relative pl-8">
              {/* Left rail (vertical line) */}
              <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[var(--border)] rounded-full">
                <motion.div
                  className="absolute bottom-0 left-0 w-full bg-accent/60 rounded-full"
                  style={{ height: lineHeight }}
                />
              </div>

              {/* Right rail */}
              <div className="absolute left-[280px] md:left-[320px] top-0 bottom-0 w-[2px] bg-[var(--border)]/30 rounded-full hidden md:block" />

              {/* Rungs & Cards */}
              <div className="flex flex-col gap-0">
                {certifications.map((cert, i) => (
                  <div
                    key={i}
                    className="relative"
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    {/* Rung (horizontal connector) */}
                    <motion.div
                      custom={i}
                      variants={rungVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      className="absolute left-[-37px] top-1/2 -translate-y-1/2 flex items-center"
                    >
                      {/* Node on the rail */}
                      <div
                        className={`w-3 h-3 rounded-full border-2 transition-colors duration-300 ${
                          hoveredIndex === i
                            ? "bg-accent border-accent shadow-[0_0_8px_rgba(var(--accent-rgb),0.5)]"
                            : "bg-[var(--bg)] border-accent/40"
                        }`}
                      />
                      {/* Horizontal rung line */}
                      <div
                        className={`h-[2px] w-[26px] transition-colors duration-300 ${
                          hoveredIndex === i ? "bg-accent" : "bg-[var(--border)]"
                        }`}
                      />
                    </motion.div>

                    {/* Cert Card */}
                    <motion.div
                      custom={i}
                      variants={cardVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      className={`group relative p-5 rounded-xl border backdrop-blur-sm transition-all duration-500 mb-4 ${
                        hoveredIndex === i
                          ? "border-accent/40 bg-accent/[0.04] translate-x-1"
                          : "border-[var(--border)] bg-[var(--fg-ghost)]"
                      }`}
                    >
                      {/* Glow on hover */}
                      <div
                        className={`absolute inset-0 rounded-xl bg-accent/[0.03] transition-opacity duration-500 ${
                          hoveredIndex === i ? "opacity-100" : "opacity-0"
                        }`}
                      />

                      <div className="relative z-10 flex items-start justify-between gap-4">
                        <div>
                          <h4 className="font-semibold tracking-tight mb-1">{cert.name}</h4>
                          <p className="text-sm text-[var(--fg-muted)]">{cert.issuer}</p>
                        </div>
                        <span
                          className={`text-xs font-mono whitespace-nowrap mt-1 px-2 py-0.5 rounded transition-colors duration-300 ${
                            hoveredIndex === i
                              ? "text-accent bg-accent/10"
                              : "text-[var(--fg-faint)]"
                          }`}
                        >
                          {cert.year}
                        </span>
                      </div>

                      {/* Step number indicator */}
                      <div
                        className={`absolute -left-1 -bottom-1 text-[10px] font-mono transition-colors duration-300 ${
                          hoveredIndex === i ? "text-accent/60" : "text-[var(--fg-faint)]/30"
                        }`}
                      >
                        {String(certifications.length - i).padStart(2, "0")}
                      </div>
                    </motion.div>
                  </div>
                ))}
              </div>

              {/* Top arrow (indicates upward climb) */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="absolute left-[-5px] -top-4"
              >
                <div className="w-0 h-0 border-l-[5px] border-r-[5px] border-b-[8px] border-l-transparent border-r-transparent border-b-accent/60" />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scrolling Credentials Marquee */}
        <motion.div
          variants={itemVariants}
          className="mt-24 relative overflow-hidden"
          style={{
            maskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
          }}
        >

          {/* Row 1 — scrolls left */}
          <div className="flex w-max gap-6 mb-4 animate-marquee-left">
            {[...marqueeRow1, ...marqueeRow1].map((item, i) => (
              <div
                key={i}
                className="flex-shrink-0 px-5 py-2.5 rounded-full border border-[var(--border)] bg-[var(--fg-ghost)] backdrop-blur-sm text-sm font-medium tracking-tight whitespace-nowrap text-[var(--fg)] hover:border-accent/30 transition-colors duration-300"
              >
                {item}
              </div>
            ))}
          </div>

          {/* Row 2 — scrolls right */}
          <div className="flex w-max gap-6 animate-marquee-right">
            {[...marqueeRow2, ...marqueeRow2].map((item, i) => (
              <div
                key={i}
                className="flex-shrink-0 px-5 py-2.5 rounded-full border border-[var(--border)] bg-[var(--fg-ghost)] backdrop-blur-sm text-sm font-mono text-[var(--fg-muted)] whitespace-nowrap hover:border-accent/30 hover:text-[var(--fg)] transition-colors duration-300"
              >
                {item}
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
