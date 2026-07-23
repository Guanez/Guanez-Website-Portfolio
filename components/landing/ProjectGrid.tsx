"use client";

import { motion } from "framer-motion";
import ProjectCard, { type Project } from "./ProjectCard";

const projects: Project[] = [
  {
    id: "ecommerce-platform",
    title: "E-Commerce Platform",
    category: "Full Stack",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Stripe"],
    year: 2024,
    thumbnail: null,
    color: "#7cf5c4",
    description: "Scalable storefront with real-time inventory and payments",
    href: "#",
  },
  {
    id: "ai-dashboard",
    title: "AI Analytics Dashboard",
    category: "Web App",
    tags: ["React", "Python", "OpenAI", "D3.js"],
    year: 2024,
    thumbnail: null,
    color: "#c49bff",
    description: "Interactive data visualization with ML-powered insights",
    href: "#",
  },
  {
    id: "saas-crm",
    title: "SaaS CRM System",
    category: "Full Stack",
    tags: ["Next.js", "Prisma", "Tailwind", "Auth"],
    year: 2024,
    thumbnail: null,
    color: "#5bb8f5",
    description: "Multi-tenant customer management with role-based access",
    href: "#",
  },
  {
    id: "mobile-fitness",
    title: "Fitness Tracking App",
    category: "Mobile",
    tags: ["React Native", "Node.js", "MongoDB"],
    year: 2023,
    thumbnail: null,
    color: "#f5a623",
    description: "Cross-platform workout tracker with social features",
    href: "#",
  },
  {
    id: "api-gateway",
    title: "API Gateway Service",
    category: "API",
    tags: ["Node.js", "Redis", "Docker", "GraphQL"],
    year: 2023,
    thumbnail: null,
    color: "#f56b6b",
    description: "High-throughput gateway with rate limiting and caching",
    href: "#",
  },
  {
    id: "realtime-chat",
    title: "Real-Time Chat Platform",
    category: "Web App",
    tags: ["Next.js", "Socket.io", "Redis", "TypeScript"],
    year: 2023,
    thumbnail: null,
    color: "#6bf5d4",
    description: "Encrypted messaging with file sharing and video calls",
    href: "#",
  },
  {
    id: "portfolio-cms",
    title: "Headless CMS Portfolio",
    category: "Web App",
    tags: ["Astro", "Sanity", "Tailwind"],
    year: 2023,
    thumbnail: null,
    color: "#f5e16b",
    description: "Lightning-fast portfolio with content management",
    href: "#",
  },
  {
    id: "devops-monitor",
    title: "DevOps Monitoring Tool",
    category: "Full Stack",
    tags: ["React", "Go", "Prometheus", "Grafana"],
    year: 2022,
    thumbnail: null,
    color: "#a3f56b",
    description: "Infrastructure health dashboard with alerting pipeline",
    href: "#",
  },
  {
    id: "fintech-wallet",
    title: "Digital Wallet App",
    category: "Mobile",
    tags: ["React Native", "Plaid", "Node.js"],
    year: 2022,
    thumbnail: null,
    color: "#f56bbd",
    description: "Secure payment wallet with bank integration",
    href: "#",
  },
  {
    id: "social-media-app",
    title: "Social Media Platform",
    category: "Full Stack",
    tags: ["Next.js", "GraphQL", "AWS", "Redis"],
    year: 2022,
    thumbnail: null,
    color: "#5bb8f5",
    description: "Real-time social network with stories and messaging",
    href: "#",
  },
  {
    id: "task-manager",
    title: "Task Management System",
    category: "Web App",
    tags: ["React", "Firebase", "TypeScript"],
    year: 2022,
    thumbnail: null,
    color: "#7cf5c4",
    description: "Collaborative project management with kanban boards",
    href: "#",
  },
  {
    id: "data-visualization",
    title: "Data Visualization Tool",
    category: "Web App",
    tags: ["D3.js", "Vue", "Python", "FastAPI"],
    year: 2021,
    thumbnail: null,
    color: "#c49bff",
    description: "Interactive charts and graphs for business analytics",
    href: "#",
  },
  {
    id: "booking-system",
    title: "Booking System",
    category: "Full Stack",
    tags: ["Next.js", "PostgreSQL", "Stripe", "Twilio"],
    year: 2021,
    thumbnail: null,
    color: "#f5a623",
    description: "Appointment scheduling with payment and notifications",
    href: "#",
  },
  {
    id: "content-api",
    title: "Headless Content API",
    category: "API",
    tags: ["Node.js", "MongoDB", "Docker", "Redis"],
    year: 2021,
    thumbnail: null,
    color: "#f56b6b",
    description: "RESTful API for content management and delivery",
    href: "#",
  },
  {
    id: "video-streaming",
    title: "Video Streaming Platform",
    category: "Full Stack",
    tags: ["React", "Node.js", "FFmpeg", "AWS"],
    year: 2021,
    thumbnail: null,
    color: "#6bf5d4",
    description: "Video hosting with adaptive streaming and CDN",
    href: "#",
  },
  {
    id: "e-learning",
    title: "E-Learning Platform",
    category: "Web App",
    tags: ["Next.js", "MongoDB", "Stripe", "WebRTC"],
    year: 2020,
    thumbnail: null,
    color: "#f5e16b",
    description: "Online courses with video lessons and quizzes",
    href: "#",
  },
  {
    id: "iot-dashboard",
    title: "IoT Monitoring Dashboard",
    category: "Full Stack",
    tags: ["React", "InfluxDB", "MQTT", "Node.js"],
    year: 2020,
    thumbnail: null,
    color: "#a3f56b",
    description: "Real-time sensor data visualization and alerts",
    href: "#",
  },
  {
    id: "crypto-wallet",
    title: "Crypto Wallet Interface",
    category: "Mobile",
    tags: ["React Native", "Web3.js", "Ethers"],
    year: 2020,
    thumbnail: null,
    color: "#f56bbd",
    description: "Multi-chain cryptocurrency wallet with DeFi integration",
    href: "#",
  },
  {
    id: "analytics-platform",
    title: "Marketing Analytics",
    category: "Web App",
    tags: ["React", "Python", "PostgreSQL", "Chart.js"],
    year: 2020,
    thumbnail: null,
    color: "#5bb8f5",
    description: "Campaign tracking and ROI analytics dashboard",
    href: "#",
  },
  {
    id: "file-sharing",
    title: "Secure File Sharing",
    category: "Full Stack",
    tags: ["Next.js", "AWS S3", "Encryption", "Node.js"],
    year: 2019,
    thumbnail: null,
    color: "#7cf5c4",
    description: "End-to-end encrypted file transfer service",
    href: "#",
  },
  {
    id: "event-platform",
    title: "Event Management Platform",
    category: "Web App",
    tags: ["React", "Firebase", "Stripe", "QR Codes"],
    year: 2019,
    thumbnail: null,
    color: "#c49bff",
    description: "Virtual and in-person event ticketing system",
    href: "#",
  },
  {
    id: "inventory-system",
    title: "Inventory Management",
    category: "Full Stack",
    tags: ["Next.js", "PostgreSQL", "Barcode", "Node.js"],
    year: 2019,
    thumbnail: null,
    color: "#f5a623",
    description: "Warehouse inventory tracking with barcode scanning",
    href: "#",
  },
  {
    id: "chatbot-ai",
    title: "AI Customer Support Bot",
    category: "API",
    tags: ["Python", "OpenAI", "FastAPI", "Redis"],
    year: 2019,
    thumbnail: null,
    color: "#f56b6b",
    description: "Intelligent chatbot with context-aware responses",
    href: "#",
  },
  {
    id: "blog-cms",
    title: "Modern Blog CMS",
    category: "Web App",
    tags: ["Next.js", "Sanity", "MDX", "Vercel"],
    year: 2018,
    thumbnail: null,
    color: "#6bf5d4",
    description: "Headless blog with markdown support and SEO optimization",
    href: "#",
  },
];

// Radial distortion based on distance from center
// Grid is 6 columns x 4 rows
// Center is between columns 2-3 and rows 1-2 (0-indexed)
const getRadialTransform = (index: number) => {
  const col = index % 6;
  const row = Math.floor(index / 6);

  // Center coordinates (between cards)
  const centerX = 2.5; // Between column 2 and 3
  const centerY = 1.5; // Between row 1 and 2

  // Distance from center (normalized)
  const distX = col - centerX;
  const distY = row - centerY;

  // Calculate radial distance
  const distance = Math.sqrt(distX * distX + distY * distY);

  // Progressive distortion based on distance
  // Cards near center have minimal rotation
  // Cards further away tilt progressively more
  const maxRotation = 35; // Increased for more dramatic fish-eye
  const maxTranslateZ = 150; // Depth effect
  const maxScale = 0.75; // Minimum scale at edges
  const maxBlur = 18; // Increased blur for more dramatic effect
  const minOpacity = 0.25; // Minimum opacity at edges

  // Power function for more dramatic curve at edges
  const progressiveFactor = Math.pow(Math.min(distance / 3.2, 1), 2);

  // Calculate rotation based on direction from center
  const rotateX = distY * maxRotation * progressiveFactor * 0.9;
  const rotateY = -distX * maxRotation * progressiveFactor;
  const translateZ = maxTranslateZ * progressiveFactor;

  // Calculate scale: further away cards are scaled down
  const scale = 1 - (1 - maxScale) * progressiveFactor;

  // Calculate blur: further away cards are more blurred
  const blur = maxBlur * progressiveFactor;

  // Calculate opacity: further away cards are less opaque
  const opacity = 1 - (1 - minOpacity) * progressiveFactor;

  return {
    rotateX: `${rotateX}deg`,
    rotateY: `${rotateY}deg`,
    translateZ: `${translateZ}px`,
    scale,
    blur: `${blur}px`,
    opacity,
  };
};

export default function ProjectGrid() {
  return (
    <div className="grid-perspective-wrapper relative h-screen w-screen overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        className="project-grid"
      >
        {projects.map((project, i) => {
          const transform = getRadialTransform(i);
          return (
            <div
              key={project.id}
              className="preserve-3d"
              style={{
                transform: `rotateX(${transform.rotateX}) rotateY(${transform.rotateY}) translateZ(${transform.translateZ}) scale(${transform.scale})`,
                opacity: transform.opacity,
              }}
            >
              <ProjectCard project={project} index={i} />
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
