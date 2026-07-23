"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { FiLayers, FiDatabase, FiCheckCircle, FiDownload, FiEye } from "react-icons/fi";

const pillars = [
  {
    icon: FiLayers,
    title: "Back-End Architecture",
    description:
      "Designing multi-tenant platforms, RESTful APIs, and scalable systems with clean separation of concerns and solid foundations.",
  },
  {
    icon: FiDatabase,
    title: "Database Engineering",
    description:
      "Modeling reliable schemas and query layers with MySQL, PostgreSQL, and Prisma — the backbone of every platform I build.",
  },
  {
    icon: FiCheckCircle,
    title: "Quality & Testing",
    description:
      "Shipping with confidence through comprehensive QA — validating stability, CMS behavior, and real-time flows before they go live.",
  },
];

// Floating background images (Cosmos-inspired)
const floatingImages = [
  {
    src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=300&auto=format&fit=crop",
    size: "w-32 h-24",
    position: "top-[8%] left-[5%]",
    rotate: -12,
    delay: 0,
  },
  {
    src: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=300&auto=format&fit=crop",
    size: "w-28 h-20",
    position: "top-[15%] right-[8%]",
    rotate: 8,
    delay: 1.5,
  },
  {
    src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=300&auto=format&fit=crop",
    size: "w-36 h-28",
    position: "bottom-[12%] left-[8%]",
    rotate: 6,
    delay: 3,
  },
  {
    src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=300&auto=format&fit=crop",
    size: "w-24 h-18",
    position: "bottom-[18%] right-[5%]",
    rotate: -8,
    delay: 2,
  },
  {
    src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=300&auto=format&fit=crop",
    size: "w-20 h-16",
    position: "top-[45%] left-[2%]",
    rotate: 15,
    delay: 4,
  },
  {
    src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=300&auto=format&fit=crop",
    size: "w-26 h-20",
    position: "top-[40%] right-[3%]",
    rotate: -10,
    delay: 2.5,
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

export default function AboutSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const floatY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section ref={sectionRef} id="about" className="relative py-32 px-6 lg:px-24 overflow-hidden">
      {/* Floating Background Images — Cosmos-style + scroll parallax */}
      <motion.div className="absolute inset-0 pointer-events-none z-0 hidden lg:block" style={{ y: floatY }}>
        {floatingImages.map((img, i) => (
          <motion.div
            key={i}
            className={`absolute ${img.position} ${img.size} rounded-xl overflow-hidden opacity-[0.07]`}
            animate={{
              y: [0, -15, 5, -10, 0],
              x: [0, 8, -5, 3, 0],
              rotate: [img.rotate, img.rotate + 3, img.rotate - 2, img.rotate + 1, img.rotate],
            }}
            transition={{
              duration: 12 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: img.delay,
            }}
          >
            <Image src={img.src} alt="" fill className="object-cover" />
          </motion.div>
        ))}
      </motion.div>

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="relative z-10 max-w-6xl mx-auto"
      >
        {/* Section Label */}
        <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6">
          <div className="w-8 h-[1px] bg-accent" />
          <span className="text-accent text-sm font-mono tracking-widest uppercase">About</span>
        </motion.div>

        {/* Main content — Split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-24">
          {/* Left — Bio (slide from left) */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-[1.1] mb-8"
            >
              <span className="text-gradient">Building digital </span>
              <span className="text-accent italic">experiences</span>
              <span className="text-gradient"> that matter.</span>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-lg text-[var(--fg-secondary)] leading-relaxed mb-6"
            >
              I&apos;m a full-stack developer from Santa Maria, Bulacan, graduating Magna Cum Laude
              (1.29 GWA) from the Polytechnic University of the Philippines. I specialize in back-end
              architecture and database design — building multi-tenant platforms, RESTful APIs, and
              scalable web applications with Laravel, Next.js, and modern stacks.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-[var(--fg-muted)] leading-relaxed"
            >
              I&apos;ve built and tested real-time systems across e-commerce, internal tooling, and
              field-operations platforms — as both a developer and a QA tester. I&apos;m driven by
              solving complex technical problems and delivering high-quality, dependable software.
            </motion.p>

            {/* CTA buttons */}
            <motion.div variants={itemVariants} className="flex items-center gap-3 mt-10">
              <a
                href="/resume.pdf"
                download
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-accent text-[var(--bg)] font-medium text-sm transition-transform duration-300 hover:-translate-y-0.5"
              >
                <FiDownload size={16} />
                Download CV
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-[var(--border)] text-[var(--fg-secondary)] font-medium text-sm transition-colors duration-300 hover:border-accent/40 hover:text-accent"
              >
                <FiEye size={16} />
                View
              </a>
            </motion.div>
          </motion.div>

          {/* Right — Résumé preview + download (scale-up reveal) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: 10 }}
            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="relative flex items-center justify-center"
          >
            <div className="relative w-full max-w-md">
              <div
                className="absolute -inset-4 rounded-3xl opacity-20 blur-3xl -z-10"
                style={{ background: "linear-gradient(135deg, var(--orb-1), var(--orb-2))" }}
              />

              {/* Document preview — opens the PDF on click */}
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View full résumé"
                className="group block relative aspect-[3/4] rounded-2xl overflow-hidden border border-[var(--border)] bg-[var(--fg-ghost)] backdrop-blur-sm transition-all duration-500 hover:border-accent/30 hover:-translate-y-1"
              >
                {/* Real résumé page (page 1) */}
                <Image
                  src="/resume-preview.jpg"
                  alt="Résumé of Adrian Mark M. Guañez — page 1"
                  fill
                  sizes="(max-width: 1024px) 100vw, 28rem"
                  className="object-cover object-top"
                />

                {/* Bottom fade — hints there's more of the page */}
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[var(--bg)] to-transparent" />

                {/* Hover overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="flex items-center gap-2 text-sm font-medium text-white">
                    <FiEye size={16} />
                    View full résumé
                  </span>
                </div>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Core Pillars */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {pillars.map((pillar, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="group relative p-8 rounded-2xl border border-[var(--border)] bg-[var(--fg-ghost)] backdrop-blur-sm hover:border-accent/30 transition-colors duration-500"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 rounded-2xl bg-accent/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                  <pillar.icon className="text-accent" size={22} />
                </div>
                <h3 className="text-lg font-bold tracking-tight mb-3">{pillar.title}</h3>
                <p className="text-sm text-[var(--fg-muted)] leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
