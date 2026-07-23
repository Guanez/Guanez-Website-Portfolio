"use client";

import { motion } from "framer-motion";
import { IconType } from "react-icons";
import {
  SiReact, SiNextdotjs, SiTypescript, SiNodedotjs, SiTailwindcss,
  SiPostgresql, SiFramer, SiPrisma, SiGit, SiFigma, SiDocker,
  SiVercel, SiMongodb, SiExpress, SiFirebase, SiLaravel, SiPhp,
  SiHtml5, SiMysql, SiTrpc, SiVuedotjs, SiSalesforce, SiJavascript,
} from "react-icons/si";
import {
  FiMessageSquare, FiUsers, FiBookOpen, FiMic, FiHeart,
  FiStar, FiAward, FiTarget, FiCompass, FiShield,
  FiZap, FiCpu, FiEye, FiRefreshCw, FiClock,
  FiLayers, FiTrendingUp, FiCheckCircle, FiGlobe, FiActivity,
} from "react-icons/fi";

interface FloatingIcon {
  Icon: IconType;
  size: number;
  x: string;
  y: string;
  tilt: number;
  delay: number;
}

const skillCategories: {
  title: string;
  color: string;
  bgColor: string;
  borderColor: string;
  iconColor: string;
  skills: string[];
  icons: FloatingIcon[];
}[] = [
  {
    title: "Frontend",
    color: "text-blue-400",
    bgColor: "bg-blue-400/10",
    borderColor: "border-blue-400/20",
    iconColor: "text-blue-400/[0.2] dark:text-blue-400/[0.08]",
    skills: ["React", "Next.js", "Vue.js", "TypeScript", "JavaScript", "Tailwind CSS", "Framer Motion", "HTML5/CSS3"],
    icons: [
      { Icon: SiReact, size: 48, x: "75%", y: "15%", tilt: -12, delay: 0 },
      { Icon: SiNextdotjs, size: 36, x: "88%", y: "55%", tilt: 18, delay: 1.5 },
      { Icon: SiVuedotjs, size: 34, x: "60%", y: "70%", tilt: -8, delay: 3 },
      { Icon: SiTailwindcss, size: 40, x: "82%", y: "80%", tilt: 14, delay: 0.8 },
      { Icon: SiJavascript, size: 30, x: "70%", y: "40%", tilt: -20, delay: 2.2 },
      { Icon: SiHtml5, size: 30, x: "92%", y: "25%", tilt: 10, delay: 4 },
    ],
  },
  {
    title: "Backend",
    color: "text-emerald-400",
    bgColor: "bg-emerald-400/10",
    borderColor: "border-emerald-400/20",
    iconColor: "text-emerald-400/[0.2] dark:text-emerald-400/[0.08]",
    skills: ["Node.js", "Express", "REST APIs", "tRPC", "PHP", "Laravel", "QA & Testing"],
    icons: [
      { Icon: SiNodedotjs, size: 44, x: "72%", y: "12%", tilt: 15, delay: 0.5 },
      { Icon: SiExpress, size: 32, x: "85%", y: "50%", tilt: -10, delay: 2 },
      { Icon: SiTrpc, size: 28, x: "65%", y: "75%", tilt: 22, delay: 3.5 },
      { Icon: SiPhp, size: 36, x: "90%", y: "78%", tilt: -16, delay: 1 },
      { Icon: SiLaravel, size: 30, x: "78%", y: "35%", tilt: 8, delay: 2.8 },
    ],
  },
  {
    title: "Database",
    color: "text-amber-400",
    bgColor: "bg-amber-400/10",
    borderColor: "border-amber-400/20",
    iconColor: "text-amber-400/[0.2] dark:text-amber-400/[0.08]",
    skills: ["PostgreSQL", "MySQL", "MongoDB", "Prisma ORM", "Firebase"],
    icons: [
      { Icon: SiPostgresql, size: 42, x: "70%", y: "18%", tilt: -14, delay: 0 },
      { Icon: SiMysql, size: 36, x: "88%", y: "45%", tilt: 12, delay: 1.8 },
      { Icon: SiMongodb, size: 38, x: "76%", y: "72%", tilt: -6, delay: 3.2 },
      { Icon: SiPrisma, size: 30, x: "90%", y: "20%", tilt: 20, delay: 0.6 },
      { Icon: SiFirebase, size: 34, x: "62%", y: "50%", tilt: -18, delay: 2.5 },
    ],
  },
  {
    title: "Tools & Cloud",
    color: "text-purple-400",
    bgColor: "bg-purple-400/10",
    borderColor: "border-purple-400/20",
    iconColor: "text-purple-400/[0.2] dark:text-purple-400/[0.08]",
    skills: ["Git/GitHub", "VS Code", "Figma", "Salesforce", "Docker", "Vercel", "AWS"],
    icons: [
      { Icon: SiGit, size: 40, x: "74%", y: "14%", tilt: 16, delay: 0.3 },
      { Icon: SiFigma, size: 34, x: "86%", y: "60%", tilt: -12, delay: 2 },
      { Icon: SiSalesforce, size: 44, x: "68%", y: "75%", tilt: 8, delay: 3.8 },
      { Icon: SiVercel, size: 28, x: "92%", y: "30%", tilt: -22, delay: 1.2 },
      { Icon: SiDocker, size: 34, x: "80%", y: "45%", tilt: 14, delay: 2.6 },
    ],
  },
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

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function SkillsSection() {
  return (
    <section id="skills" className="relative py-32 overflow-hidden">
      <div className="px-6 lg:px-24">
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
            <span className="text-accent text-sm font-mono tracking-widest uppercase">Skills</span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-6xl font-bold tracking-tighter mb-6"
          >
            <span className="text-gradient">Tech</span>{" "}
            <span className="text-gradient-muted italic">Stack</span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-[var(--fg-muted)] text-lg max-w-xl mb-16"
          >
            The tools and technologies I use to bring ideas to life — from concept to deployment.
          </motion.p>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skillCategories.map((category, i) => (
              <motion.div
                key={i}
                variants={cardVariants}
                className="group relative p-6 md:p-8 rounded-2xl border border-[var(--border)] bg-[var(--fg-ghost)] backdrop-blur-sm hover:border-[var(--fg-faint)] transition-colors duration-500 overflow-hidden"
              >
                {/* Floating category icons — watermark bg */}
                <div className="absolute inset-0 pointer-events-none hidden md:block">
                  {category.icons.map((icon, j) => (
                    <motion.div
                      key={j}
                      className={`absolute ${category.iconColor}`}
                      style={{
                        left: icon.x,
                        top: icon.y,
                        transform: `rotate(${icon.tilt}deg)`,
                      }}
                      animate={{
                        y: [0, -8, 4, -6, 0],
                        x: [0, 4, -3, 2, 0],
                        rotate: [
                          icon.tilt,
                          icon.tilt + 3,
                          icon.tilt - 2,
                          icon.tilt + 1,
                          icon.tilt,
                        ],
                      }}
                      transition={{
                        duration: 12 + j * 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: icon.delay,
                      }}
                    >
                      <icon.Icon size={icon.size} />
                    </motion.div>
                  ))}
                </div>

                {/* Card content */}
                <div className="relative z-10">
                  <h3 className={`text-sm font-mono tracking-widest uppercase mb-6 ${category.color}`}>
                    {category.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, j) => (
                      <span
                        key={j}
                        className={`px-3 py-1.5 text-sm font-medium rounded-lg border ${category.borderColor} ${category.bgColor} transition-all duration-300 hover:scale-105`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Soft Skills Heading */}
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-6xl font-bold tracking-tighter mt-20 mb-6"
          >
            <span className="text-gradient">Soft</span>{" "}
            <span className="text-gradient-muted italic">Skills</span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-[var(--fg-muted)] text-lg max-w-xl mb-16"
          >
            Beyond code — the interpersonal and cognitive skills that drive effective teamwork and delivery.
          </motion.p>

          {/* Soft Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Communication",
                color: "text-rose-400",
                borderColor: "border-rose-400/20",
                bgColor: "bg-rose-400/10",
                iconColor: "text-rose-400/[0.2] dark:text-rose-400/[0.08]",
                skills: ["Clear Communication", "Active Listening", "Technical Writing", "Presentation", "Feedback"],
                icons: [
                  { Icon: FiMessageSquare, size: 42, x: "72%", y: "15%", tilt: -10, delay: 0 },
                  { Icon: FiMic, size: 32, x: "88%", y: "55%", tilt: 16, delay: 1.5 },
                  { Icon: FiBookOpen, size: 28, x: "65%", y: "72%", tilt: -8, delay: 3 },
                  { Icon: FiHeart, size: 34, x: "90%", y: "25%", tilt: 12, delay: 2.2 },
                  { Icon: FiGlobe, size: 26, x: "78%", y: "42%", tilt: -18, delay: 4 },
                ],
              },
              {
                title: "Leadership",
                color: "text-sky-400",
                borderColor: "border-sky-400/20",
                bgColor: "bg-sky-400/10",
                iconColor: "text-sky-400/[0.2] dark:text-sky-400/[0.08]",
                skills: ["Teamwork", "Team Leadership", "Mentoring", "Decision Making", "Collaboration"],
                icons: [
                  { Icon: FiUsers, size: 44, x: "74%", y: "12%", tilt: 14, delay: 0.5 },
                  { Icon: FiStar, size: 30, x: "86%", y: "50%", tilt: -12, delay: 2 },
                  { Icon: FiAward, size: 36, x: "68%", y: "70%", tilt: 20, delay: 3.5 },
                  { Icon: FiShield, size: 28, x: "92%", y: "78%", tilt: -8, delay: 1 },
                  { Icon: FiCompass, size: 32, x: "80%", y: "35%", tilt: 10, delay: 2.8 },
                ],
              },
              {
                title: "Problem Solving",
                color: "text-orange-400",
                borderColor: "border-orange-400/20",
                bgColor: "bg-orange-400/10",
                iconColor: "text-orange-400/[0.2] dark:text-orange-400/[0.08]",
                skills: ["Critical Thinking", "Creative Thinking", "Analytical Skills", "Research", "Root Cause Analysis"],
                icons: [
                  { Icon: FiZap, size: 40, x: "70%", y: "18%", tilt: -14, delay: 0 },
                  { Icon: FiCpu, size: 34, x: "88%", y: "45%", tilt: 12, delay: 1.8 },
                  { Icon: FiTarget, size: 36, x: "76%", y: "72%", tilt: -6, delay: 3.2 },
                  { Icon: FiEye, size: 28, x: "90%", y: "20%", tilt: 18, delay: 0.6 },
                  { Icon: FiActivity, size: 30, x: "62%", y: "50%", tilt: -16, delay: 2.5 },
                ],
              },
              {
                title: "Work Habits",
                color: "text-teal-400",
                borderColor: "border-teal-400/20",
                bgColor: "bg-teal-400/10",
                iconColor: "text-teal-400/[0.2] dark:text-teal-400/[0.08]",
                skills: ["Time Management", "Adaptability", "Fast Learner", "Attention to Detail", "Continuous Learning"],
                icons: [
                  { Icon: FiClock, size: 38, x: "72%", y: "14%", tilt: 16, delay: 0.3 },
                  { Icon: FiRefreshCw, size: 32, x: "86%", y: "60%", tilt: -12, delay: 2 },
                  { Icon: FiLayers, size: 36, x: "68%", y: "75%", tilt: 8, delay: 3.8 },
                  { Icon: FiTrendingUp, size: 28, x: "92%", y: "30%", tilt: -20, delay: 1.2 },
                  { Icon: FiCheckCircle, size: 30, x: "80%", y: "45%", tilt: 14, delay: 2.6 },
                ],
              },
            ].map((category, i) => (
              <motion.div
                key={i}
                variants={cardVariants}
                className="group relative p-6 md:p-8 rounded-2xl border border-[var(--border)] bg-[var(--fg-ghost)] backdrop-blur-sm hover:border-[var(--fg-faint)] transition-colors duration-500 overflow-hidden"
              >
                {/* Floating icons bg */}
                <div className="absolute inset-0 pointer-events-none hidden md:block">
                  {category.icons.map((icon, j) => (
                    <motion.div
                      key={j}
                      className={`absolute ${category.iconColor}`}
                      style={{
                        left: icon.x,
                        top: icon.y,
                        transform: `rotate(${icon.tilt}deg)`,
                      }}
                      animate={{
                        y: [0, -8, 4, -6, 0],
                        x: [0, 4, -3, 2, 0],
                        rotate: [
                          icon.tilt,
                          icon.tilt + 3,
                          icon.tilt - 2,
                          icon.tilt + 1,
                          icon.tilt,
                        ],
                      }}
                      transition={{
                        duration: 12 + j * 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: icon.delay,
                      }}
                    >
                      <icon.Icon size={icon.size} />
                    </motion.div>
                  ))}
                </div>

                {/* Card content */}
                <div className="relative z-10">
                  <h3 className={`text-sm font-mono tracking-widest uppercase mb-6 ${category.color}`}>
                    {category.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, j) => (
                      <span
                        key={j}
                        className={`px-3 py-1.5 text-sm font-medium rounded-lg border ${category.borderColor} ${category.bgColor} transition-all duration-300 hover:scale-105`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
