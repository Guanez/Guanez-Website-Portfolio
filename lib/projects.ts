// ─────────────────────────────────────────────────────────────────────────────
// SINGLE SOURCE OF TRUTH for portfolio projects.
//
// Everything the carousel AND the case-study modal render comes from here.
// To update the portfolio in the future, you almost never touch a component —
// you edit this file.
//
// MEDIA — each project can have a `media[]` gallery shown in the modal:
//   • image → { type: "image", src: "/projects/<slug>/shot-1.jpg", alt: "..." }
//   • video → { type: "video", src: "/projects/<slug>/demo.mp4",
//               poster: "/projects/<slug>/demo-poster.jpg", alt: "..." }
// Drop the files in `public/projects/<slug>/` and reference them with a leading
// slash. Local paths need NO next.config change.
//
// COVER — the carousel card image. Omit it (leave `cover` unset) to show the
// image-placeholder state; add "/projects/<slug>/cover.jpg" once you have a real
// screenshot.
//
// LINKS — `liveUrl` makes the card + modal open the live site; `repoUrl` adds a
// Code button. Set `isPrivate: true` for NDA/internal work with no public link —
// the modal leans on the media gallery instead.
// ─────────────────────────────────────────────────────────────────────────────

export type MediaItem =
  | { type: "image"; src: string; alt: string }
  | { type: "video"; src: string; poster: string; alt: string };

export type Project = {
  slug: string;
  title: string;
  category: string;
  role: string;
  /** Short blurb shown on the carousel card. Keep it tight. */
  description: string;
  /** Longer writeup shown in the modal. Falls back to `description` if omitted. */
  overview?: string;
  /** Bullet points shown in the modal. Faithful facts only — edit freely. */
  highlights?: string[];
  tech: string[];
  /** Carousel card image. Unset → image-placeholder. Add "/projects/<slug>/cover.jpg". */
  cover?: string;
  /**
   * Optional looping clip that plays ONLY while this card is the active/center
   * one — muted, no controls, ambient. Side cards stay static (perf). Can reuse
   * the modal's demo.mp4, or a shorter silent loop, e.g. "/projects/<slug>/card.mp4".
   * `cover` doubles as its poster, so keep one even when you add a card video.
   */
  cardVideo?: string;
  /** Gallery for the modal. Empty for now — fill as media arrives. */
  media?: MediaItem[];
  liveUrl?: string;
  repoUrl?: string;
  isPrivate?: boolean;
};

export const projects: Project[] = [
  {
    slug: "oracle-field-management",
    title: "Oracle Field Management Platform",
    category: "Freelance · Full-Stack",
    role: "Co-Developer",
    description:
      "Multi-tenant platform with role-based dashboards, live GPS map tracking, meeting oversight, and real-time field activity monitoring.",
    overview:
      "Proposed as the ground-up successor to a defect-heavy legacy field-agent app, and built with a 4-developer team coordinating web and mobile app integration. The platform pairs role-based dashboards with live GPS map tracking, meeting oversight, and real-time monitoring of field activity across tenants.",
    highlights: [
      "Multi-tenant architecture with role-based dashboards",
      "Live GPS map tracking via Leaflet",
      "Real-time field activity monitoring and meeting oversight",
      "Coordinated web + React Native mobile integration across a 4-dev team",
    ],
    tech: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
      "Leaflet",
      "Recharts",
      "React Native",
      "Expo",
      "Tamagui",
    ],
    media: [],
    isPrivate: true,
  },
  {
    slug: "unique-queueing",
    title: "UniQue Queueing Platform",
    category: "Thesis · Multi-Tenant SaaS",
    role: "Main Developer",
    description:
      "Multi-tenant queue management platform with role-based access and omnichannel notifications across email, SMS, and web push.",
    overview:
      "A multi-tenant queue management platform with role-based access, omnichannel notifications across email, SMS, and web push, plus full audit logging. Built as a PWA so tenants and their customers can manage queues from any device.",
    highlights: [
      "Multi-tenant SaaS with role-based access control",
      "Omnichannel notifications: email (Brevo), SMS (PhilSMS), web push (VAPID)",
      "Full audit logging across tenant actions",
      "Installable PWA with Google OAuth sign-in",
    ],
    tech: [
      "PHP",
      "MySQL",
      "JavaScript",
      "Brevo (Email)",
      "PhilSMS",
      "Web Push (VAPID)",
      "Google OAuth",
      "PWA",
      "REST API",
    ],
    media: [],
  },
  {
    slug: "kst-merchandising",
    title: "KST Merchandising E-Commerce",
    category: "E-Commerce · OJT",
    role: "Main Developer",
    description:
      "Customizable product design platform with a no-code admin CMS for non-technical staff.",
    overview:
      "A customizable product design platform with a no-code admin CMS, letting non-technical staff manage catalog, promotions, and landing pages independently. Includes an interactive product customizer built on Three.js and PayMongo checkout.",
    highlights: [
      "No-code admin CMS for catalog, promotions, and landing pages",
      "Interactive 3D product customizer (Three.js)",
      "PayMongo checkout with Firebase Auth",
      "React Query data layer over a Django REST backend",
    ],
    tech: [
      "Django REST Framework",
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Firebase Auth",
      "PayMongo",
      "Three.js",
      "React Query",
      "Cloudinary",
    ],
    media: [],
  },
  {
    slug: "tindapos",
    title: "TindaPOS System",
    category: "Retail POS",
    role: "Main Developer",
    description:
      "Full-stack web POS for sari-sari stores with a real-time cart, inventory tracking, and analytics.",
    overview:
      "A full-stack web POS for sari-sari stores with a real-time cart, inventory tracking, sales history, role-based access, and analytics. Built on Laravel + Inertia with a Vue 3 front end for a snappy single-page feel.",
    highlights: [
      "Real-time cart and checkout",
      "Inventory tracking with sales history",
      "Role-based access control",
      "Analytics dashboard for store performance",
    ],
    tech: ["Laravel", "Inertia", "Vue 3", "MySQL"],
    media: [],
  },
  {
    slug: "coffee-shop",
    title: "Coffee Shop E-Commerce",
    category: "E-Commerce",
    role: "Main Developer",
    description:
      "Full-stack e-commerce app with a product catalog, category filtering, cart, and multi-method checkout.",
    overview:
      "A full-stack e-commerce web app with a product catalog and category filtering, cart, and a checkout system supporting multiple payment methods. Built on Next.js with a Prisma + PostgreSQL data layer.",
    highlights: [
      "Product catalog with category filtering",
      "Cart and multi-method checkout",
      "Type-safe data layer with Prisma + PostgreSQL",
    ],
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL"],
    media: [],
  },
  {
    slug: "doki-doki-takoyaki",
    title: "Doki-Doki Takoyaki E-Commerce",
    category: "E-Commerce · Student",
    role: "Full-Stack Lead",
    description:
      "Full-stack e-commerce app with a menu catalog, cart and checkout, and a COD/pickup flow.",
    overview:
      "A full-stack e-commerce web app featuring a menu catalog, cart and checkout, a COD/pickup flow, account login, and customer data protection. An early full-stack build on a PHP + MySQL backend.",
    highlights: [
      "Menu catalog with cart and checkout",
      "COD / pickup order flow",
      "Account login with customer data protection",
    ],
    tech: ["HTML", "CSS", "Tailwind CSS", "PHP", "MySQL"],
    media: [],
  },
  {
    slug: "customer-request-system",
    title: "Customer Request System",
    category: "Internal Tooling · OJT",
    role: "Co-Developer & QA",
    description:
      "Internal request management platform built from scratch to streamline company-wide task tracking and workflows.",
    overview:
      "An internal request management platform built from scratch to streamline company-wide task tracking and workflows. Includes email notifications, PDF generation, and error monitoring wired in from the start.",
    highlights: [
      "Company-wide request tracking and workflows",
      "Email notifications (Nodemailer) and PDF export (Puppeteer)",
      "Authenticated access via NextAuth",
      "Error monitoring with Sentry",
    ],
    tech: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Drizzle ORM",
      "PostgreSQL",
      "NextAuth",
      "Nodemailer",
      "Puppeteer (PDF)",
      "Sentry",
    ],
    media: [],
    isPrivate: true,
  },
  {
    slug: "agent-operation",
    title: "Agent Operation App",
    category: "Mobile + Web · OJT",
    role: "QA & Debugging",
    description:
      "Dual-platform app for real-time field agent tracking, activity logging, and performance monitoring.",
    overview:
      "A dual-platform app for real-time field agent tracking, activity logging, and performance monitoring. Handled QA and hands-on debugging across the system; the findings informed a proposal for a ground-up rebuild — which became the Oracle Field Management Platform.",
    highlights: [
      "Real-time field agent tracking (MapLibre GL)",
      "Activity logging and performance monitoring",
      "Web + React Native mobile platforms",
      "QA and debugging that seeded the Oracle rebuild proposal",
    ],
    tech: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Prisma",
      "PostgreSQL",
      "Supabase",
      "MapLibre GL",
      "React Native",
      "Expo",
      "Tamagui",
    ],
    media: [],
    isPrivate: true,
  },
  {
    slug: "baganioil",
    title: "Baganioil Website",
    category: "Website · OJT",
    role: "Co-Developer & QA",
    description:
      "Company website (baganioil.ph) with a CMS-driven admin, tested for live-site stability.",
    overview:
      "Company website (baganioil.ph) with a CMS-driven admin. Led comprehensive testing to ensure live-site stability and validated CMS functionality for admin users. Built on the Eleventy static-site stack and deployed to Netlify.",
    highlights: [
      "CMS-driven admin via Decap CMS",
      "Comprehensive live-site stability testing",
      "Static-site build on Eleventy (11ty) + Nunjucks",
      "Deployed on Netlify",
    ],
    tech: [
      "Eleventy (11ty)",
      "Nunjucks",
      "Decap CMS",
      "Bootstrap",
      "JavaScript",
      "Netlify",
    ],
    media: [],
    liveUrl: "https://baganioil.ph",
  },
];
