# Portfolio Projects — Interview Prep & Stack Reference

> **Purpose:** A study guide for every project on the portfolio so you can explain
> the stack, architecture, and data flows in an interview — even for the parts an
> AI assistant helped write. The goal is *understanding*, not memorizing.
>
> **How to use this:** For each project, read the **Flow** section and try to
> re-explain it out loud in your own words without looking. If you can't, that's
> the part to go study in the real code. Sections marked
> **⚠️ VERIFY** are flows I described from the *typical* pattern for that stack —
> open the actual repo and confirm they match before you rely on them.

---

## The honest framing (read this first)

You used AI to help build these. That is **completely normal and fine** — most
working developers do now. Interviewers rarely care *whether* you used AI; they
care whether you **understand what was built and can maintain/extend it.** So:

- **Don't lie about it.** If asked "did you use AI?", "Yes, I use AI as a tool —
  like most developers. I still designed the architecture, chose the stack, and
  understand every flow." Then *prove the second half* by explaining a flow.
- **The differentiator is depth.** Anyone can generate code. Can you explain *why*
  Supabase over a custom backend? Why raw PHP on UniQue but Next.js on CRS? What
  happens on a failed payment? That's what this doc drills.
- **Know your role honestly.** You *built* UniQue, TindaPOS, KST, Coffee, Doki-Doki.
  You *co-built* CRS and Oracle. You *QA'd & debugged* Agent Ops (didn't build it).
  Never claim builder-level ownership of Agent Ops — but you *can* say you know its
  codebase well from debugging it.

---

## Cross-cutting concepts (interviewers love these)

These come up regardless of project. Be able to define each in one or two sentences.

| Concept | Your one-liner |
|---|---|
| **Multi-tenant** | One app instance serves many isolated organizations; each tenant's data is scoped so tenants never see each other's records (UniQue, Oracle). |
| **Role-based access control (RBAC)** | Users have roles (super-admin, admin, staff, customer); each role is allowed a different set of actions/routes. |
| **REST API** | Stateless HTTP endpoints (GET/POST/PUT/DELETE) that return JSON; the frontend calls them to read/write data. |
| **ORM** | Maps DB tables to code objects so you write queries in the language, not raw SQL (Prisma, Drizzle). UniQue uses **no** ORM — raw `mysqli`. |
| **Auth: session vs token** | Session = server stores a session id in a cookie (UniQue). Token/JWT = client holds a signed token, server verifies it statelessly (Firebase, NextAuth, Supabase). |
| **Web Push / VAPID** | Browser subscriptions let a server push notifications even when the tab is closed; VAPID keys identify/authorize the sender. |
| **PWA** | A web app with a service worker that enables offline caching, installability, and push. |
| **SSG (static site gen)** | Pages are pre-built to plain HTML at build time (Eleventy) — fast, cheap, no server per request. |
| **Headless CMS** | Content editing UI decoupled from the site; content is stored (often in Git) and the site reads it at build (Decap CMS). |
| **Optimistic UI / offline-first** | App writes to a local store first (e.g. expo-sqlite), then syncs to the server when online (Agent Ops mobile). |

---

## 1. Oracle Field Management Platform
**Role:** Co-Developer (freelance, 4-dev team) · **Category:** Freelance · Full-Stack

**What it is:** Multi-tenant platform for field operations — role-based dashboards,
live GPS map tracking, meeting oversight, real-time field activity monitoring.
Two clients over one backend: a **Next.js web** app + a **React Native (Expo) mobile** app.

**Stack**
- **Web:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, shadcn + Base UI, TanStack Table, Recharts, **Leaflet/react-leaflet** (maps), **Supabase** (`@supabase/supabase-js` + `@supabase/ssr`), date-fns, xlsx (Excel export), sonner.
- **Mobile:** React Native 0.86 on Expo SDK 57, expo-router, **Tamagui** (UI), **Supabase**, **expo-sqlite** (offline cache), expo-camera / expo-location / expo-image-picker / expo-secure-store, EAS Build.

**Flow (the story to tell)** ⚠️ VERIFY specifics against the repo
1. **One Supabase backend, two clients.** Postgres + Auth + Storage live in Supabase.
   Web and mobile are just two front-ends talking to the same DB — that's why the
   data stays consistent across them.
2. **Auth:** Supabase Auth issues a token; RBAC decides which dashboard a user sees
   (role stored on the user/profile row).
3. **Live GPS:** mobile app reads device location (`expo-location`), writes position
   rows to Supabase; the web map (Leaflet) reads and plots them ~live.
4. **Offline:** mobile caches to `expo-sqlite` so agents in the field keep working
   with no signal, then syncs up when back online.

**Why this stack:** Supabase gave auth + Postgres + realtime + storage out of the
box, so a small team didn't build a backend from scratch. TypeScript + React family
across both apps = one mental model.

**Likely questions**
- *"Two apps, one DB — how do you keep them in sync?"* → Same Supabase Postgres; both
  read/write the same tables; Supabase realtime pushes changes.
- *"What if the agent has no internet?"* → expo-sqlite offline cache, sync on reconnect.
- *"Why Supabase not a custom Node/Laravel API?"* → speed for a 4-person freelance team;
  managed auth/storage/realtime.
- **Honest note:** this replaced the buggy Agent Ops app (see §8) — good origin story.

---

## 2. UniQue Queueing Platform  *(you know this one deeply — you built it)*
**Role:** Main Developer (thesis) · **Category:** Thesis · Multi-Tenant SaaS

**What it is:** Multi-tenant queue-management platform. Businesses run queues;
customers join remotely and get notified across email/SMS/web-push; full audit logging.

**Stack (verified from the code)**
- **Backend:** **plain procedural PHP — NO framework** (big `api.php`, `admin_hierarchy_api.php`), `mysqli`.
- **DB:** **MySQL**.
- **Frontend:** **vanilla HTML/CSS/JS** (hand-written per-page `.css`/`.js`, no Tailwind, no framework).
- **Notifications:** **Brevo** (email), **PhilSMS** (SMS), **Web Push via VAPID** (`minishlink/web-push`).
- **Auth:** session cookies + **Google OAuth**.
- **PWA:** service worker (`sw.js`), push subscriptions, security middleware, rate limiting.

**Flow (real — this is your strongest "I understand the fundamentals" project)**
1. **Roles/pages:** super-admin → admin/business → staff → customer, each with its own
   dashboard HTML (`super-admin.html`, `business-dashboard.html`, `staff-dashboard.html`,
   `customer-home.html`).
2. **Request cycle:** browser JS calls endpoints in `api.php` → PHP validates the session
   → runs a `mysqli` query → returns JSON. **No ORM** — you wrote the SQL yourself.
3. **Multi-tenancy:** every query is scoped to a business/tenant id so one business
   never sees another's queue.
4. **Notifications:** when queue state changes, PHP fires the right channel — Brevo API
   (email), PhilSMS API (SMS), or a web-push message signed with your VAPID keys to
   subscribed browsers (works even with the tab closed, via `sw.js`).
5. **Auth:** login sets a PHP session cookie; Google OAuth is the social login path;
   `security_middleware.php` enforces rate limits and origin checks.

**Why raw PHP is a *strength* to talk about:** "I didn't hide behind a framework — I
handled routing, SQL, sessions, and security myself, so I understand what Laravel does
under the hood." That's a great line.

**Likely questions**
- *"No framework — how do you prevent SQL injection?"* → prepared statements / parameter
  binding in `mysqli` (⚠️ confirm you used bound params, not string concatenation).
- *"How does web push work when the tab is closed?"* → service worker + a push
  subscription; server sends to the push endpoint signed with VAPID; SW shows the notif.
- *"Difference between your session auth here and token auth elsewhere?"* → see the
  cross-cutting table.

---

## 3. KST Merchandising E-Commerce
**Role:** Main Developer (OJT) · **Category:** E-Commerce · OJT

**What it is:** Customizable product-design e-commerce with a no-code admin CMS;
non-technical staff manage catalog/promos/landing pages. Has a "Design Your Own" editor
and 3D product previews.

**Stack**
- **Backend (Python):** Django 4.2 + **Django REST Framework**, **Firebase Admin SDK** (verifies Bearer ID tokens — custom `FirebaseAuthentication`), Pillow (images), django-cors-headers, **Cloudinary** (asset storage), **PayMongo** (payments), SQLite (dev) / **Neon Postgres** (deploy).
- **Frontend (TypeScript):** React 19 + **Vite** + TS, **Tailwind CSS**, react-router, **@tanstack/react-query**, Axios, **Firebase client SDK** (auth), **three / react-three-fiber / drei** (3D previews), Recharts (admin charts), Leaflet (maps), GSAP, jsPDF/JSZip (design export). State via React Context.
- **Deploy:** Google Cloud Run (backend) + Cloudflare Pages + Cloudinary.

**Flow** ⚠️ VERIFY specifics
1. **Auth:** user logs in via Firebase (client SDK) → gets an ID token → frontend sends it
   as `Bearer` on API calls → Django's custom `FirebaseAuthentication` verifies it with
   the Firebase Admin SDK. **Firebase does auth; Django does the data/business logic.**
2. **Data:** React Query fetches from DRF endpoints via a single Axios `apiService`.
3. **Design Your Own:** canvas/3D editor (three.js) → export to image/PDF (jsPDF, html-to-image).
4. **Payments:** custom PayMongo integration in `orders/paymongo.py` handles checkout.
5. **Assets:** product images/fonts stored on Cloudinary.

**Likely questions**
- *"Why Firebase for auth but Django for the API?"* → Firebase = fast, managed auth
  (tokens, social login); Django/DRF = your business logic + relational data.
- *"Walk me through a checkout."* → cart → create order → PayMongo payment intent →
  confirm → update order status (⚠️ confirm the exact PayMongo steps in `paymongo.py`).
- *"What's the 3D preview doing?"* → three.js/react-three-fiber renders the product model
  in the browser so customers preview their design live.

---

## 4. TindaPOS System  *(your real Laravel project)*
**Role:** Main Developer · **Category:** Retail POS

**What it is:** Full-stack web POS for sari-sari stores — real-time cart, inventory
tracking, sales history, role-based access, analytics.

**Stack:** **Laravel** + **Inertia.js** + **Vue 3** + **MySQL**.

**Flow (know this — it's your Laravel credibility)** ⚠️ VERIFY specifics
1. **Inertia is the key concept to nail:** it's a "monolith SPA" — Laravel handles
   routing/controllers/DB on the server, but instead of returning a Blade HTML page or
   a JSON API, it returns **Vue page components with props**. So you get a SPA feel
   **without building a separate REST API.** Be ready to explain this — it's the #1
   thing they'll probe.
2. **Request cycle:** Vue calls an Inertia route → Laravel controller → Eloquent ORM
   queries MySQL → returns an Inertia response (Vue component + data props).
3. **Cart/inventory:** each sale decrements stock; sales history is persisted; analytics
   aggregate the sales tables.
4. **RBAC:** roles (e.g. owner vs cashier) gate which screens/actions are allowed.

**Likely questions**
- *"What is Inertia and why use it?"* → bridges Laravel + Vue without a separate API;
  server-side routing, client-side rendering. Simpler than Laravel-API + separate Vue SPA.
- *"Eloquent — what is it?"* → Laravel's ORM; models map to tables; relationships in code.
- *"How do you keep inventory correct on concurrent sales?"* → DB transactions /
  row updates (⚠️ confirm you used transactions).

---

## 5. Coffee Shop E-Commerce
**Role:** Main Developer · **Category:** E-Commerce

**What it is:** Full-stack e-commerce — product catalog with category filtering, cart,
checkout with multiple payment methods.

**Stack:** **Next.js** + **TypeScript** + **Tailwind CSS** + **Prisma** + **PostgreSQL**.

**Flow** ⚠️ VERIFY specifics
1. **Next.js full-stack:** pages/components on the front, API routes (or server actions)
   on the back — one codebase.
2. **Data:** **Prisma** (ORM) models map to Postgres tables; you query with `prisma.product.findMany(...)` etc.
3. **Catalog/filter:** query products by category; render grid.
4. **Cart → checkout:** build cart → create order → process payment (multiple methods).

**Likely questions**
- *"Prisma vs raw SQL?"* → type-safe queries, migrations, autocomplete; less boilerplate.
- *"Server vs client components in Next App Router?"* → server components fetch data on
  the server (no JS shipped); client components handle interactivity (⚠️ confirm which
  router/version you used).
- *"How do you store the cart?"* → (⚠️ confirm: DB, cookies, or client state).

---

## 6. Doki-Doki Takoyaki E-Commerce  *(oldest project — keep it humble)*
**Role:** Full-Stack Lead · **Category:** E-Commerce · Student

**What it is:** Full-stack e-commerce web app — menu catalog, cart & checkout,
COD/pickup flow, account login, customer data protection.

**Stack:** **HTML · CSS · Tailwind CSS · PHP · MySQL** (served locally via **XAMPP** = Apache + PHP + MySQL).

**Flow** ⚠️ VERIFY — old project, refresh your memory from the folder
1. **Classic LAMP-style:** HTML/CSS/Tailwind front-end; PHP handles form posts and
   business logic; MySQL stores products/orders/users; Apache (XAMPP) serves it.
2. **Login/accounts:** PHP sessions; passwords should be **hashed** (⚠️ confirm you used
   `password_hash()` — if not, that's a known weakness to acknowledge honestly).
3. **Checkout:** COD/pickup flow — order saved to MySQL, no online payment gateway.

**Interview framing:** "This was an earlier project — plain PHP/MySQL on XAMPP. It
taught me the fundamentals of server-side rendering and SQL before I moved to
frameworks." Being honest that it's older and simpler is *better* than overselling it.

---

## 7. Customer Request System (CRS)  *(you co-built + QA'd — modern Next.js)*
**Role:** Co-Developer & QA (OJT) · **Category:** Internal Tooling · OJT

**What it is:** Internal request-management platform built from scratch to streamline
company-wide task tracking and workflows.

**Stack (verified from `package.json`)**
- **Next.js 16** (App Router) + React 19 + TypeScript, Tailwind v4, shadcn + Base UI, framer-motion.
- **DB:** **Drizzle ORM** + **postgres** (Neon/Postgres).
- **Auth:** **NextAuth v5** + **bcryptjs** (password hashing).
- **Email:** **Nodemailer**.
- **PDF/docs:** **Puppeteer** + `@sparticuz/chromium` + **pdf-lib** + pdfjs (generate/render PDFs), **xlsx** (Excel export), **qrcode**.
- **Files:** **AWS S3** (`@aws-sdk/client-s3`) + **Vercel Blob**.
- **Data/validation:** TanStack React Query, **Zod**.
- **Monitoring:** **Sentry**. **Deploy:** Vercel.

**Flow** ⚠️ VERIFY specifics
1. **App Router + server actions/route handlers:** requests hit Next.js server code.
2. **Data:** **Drizzle** (type-safe SQL-ish ORM) queries Postgres. (Be ready to contrast
   Drizzle vs Prisma: Drizzle is closer to SQL, Prisma is more abstracted.)
3. **Auth:** NextAuth v5 handles sessions/login; bcryptjs hashes passwords.
4. **A request's life:** user submits a request (validated with Zod) → stored in Postgres →
   routed through a workflow/approval → documents generated as **PDF via Puppeteer/pdf-lib**,
   attachments in S3/Vercel Blob → email notifications via Nodemailer.
5. **Errors** are captured in Sentry.

**Likely questions**
- *"Drizzle vs Prisma — why Drizzle?"* → lighter, SQL-first, great TS types.
- *"How do you generate a PDF server-side?"* → Puppeteer renders HTML in headless
  Chromium → PDF; or pdf-lib builds it programmatically.
- *"Zod's job?"* → runtime schema validation of inputs (server trusts nothing from client).

---

## 8. Agent Operation App  *(⚠️ QA & DEBUGGING ONLY — you did NOT build this)*
**Role:** QA & Debugging (OJT) · **Category:** Mobile + Web · OJT

**What it is:** Dual-platform (web + mobile) field-agent tracking, activity logging,
and performance monitoring. You QA'd and debugged it; your findings led to proposing
the rebuild → which became the **Oracle Field Management Platform** (§1).

**Stack (verified from both repos)**
- **Web:** Next.js 16, React 19, TypeScript, Tailwind v4, **Prisma 7** (+ `pg`), **PostgreSQL**, **Supabase**, **MapLibre GL** (maps), Recharts, TanStack Table, **Zustand** (state), react-hook-form + Zod, Radix/shadcn.
- **Mobile:** React Native 0.81 on **Expo 54**, expo-router, **Tamagui**, **Supabase**, **expo-sqlite** (offline), **expo-location** (tracking), expo-camera, **expo-notifications**, expo-local-authentication, EAS Build.

**How to talk about it (honesty matters most here)**
- "I was **QA & debugging**, not the builder. I know the codebase well from hunting
  bugs across the Next.js web app and the React Native mobile app."
- **Value you can claim:** you can read/debug a full modern stack — Next.js + Prisma +
  Supabase on web, Expo + Tamagui + offline SQLite on mobile. That's real skill.
- **Origin story:** the app was buggy; you fixed what you could; the team proposed a
  ground-up rebuild → Oracle. Shows initiative and judgment, not just testing.

**Likely questions**
- *"What kinds of bugs did you find?"* → (prep 1–2 concrete real examples from your QA.)
- *"Web uses both Prisma AND Supabase — why?"* → Supabase for auth/realtime/storage,
  Prisma as the typed query layer over the same Postgres (⚠️ confirm the actual split).
- *"How does the mobile app track location in the background?"* → expo-location +
  expo-task-manager background tasks; cached offline in expo-sqlite.

---

## 9. Baganioil Website  *(you co-built + QA'd — static site + headless CMS)*
**Role:** Co-Developer & QA (OJT) · **Category:** Website · OJT

**What it is:** Company website (baganioil.ph) with a CMS-driven admin. You did
comprehensive testing for live-site stability and validated the CMS for admin users.

**Stack (verified from the code)**
- **Eleventy (11ty)** static site generator + **Nunjucks** templates (`.njk`).
- **Decap CMS** (formerly Netlify CMS) with **Netlify Identity** + **git-gateway** backend.
- **Bootstrap** + custom CSS, vanilla **JavaScript**. Hosted on **Netlify**.

**Flow (this is a genuinely different architecture — good to contrast)**
1. **Static generation:** Eleventy compiles Nunjucks templates + content into plain
   HTML **at build time** — no server runs per request. Fast, cheap, secure.
2. **Headless CMS:** an admin logs into `/admin` (Decap CMS UI). Content edits are
   **committed to the Git repo** via git-gateway; **Netlify Identity** handles admin login.
3. **Publish:** a commit triggers a Netlify build → Eleventy rebuilds → new static
   HTML deploys. So "editing content" literally means "making a Git commit through a UI."
4. **Products** (e.g. Amihan/Laon/Aman/Anitun lines) are defined as CMS collections in
   `admin/config.yml`.

**Likely questions**
- *"Static site vs a database-driven site — trade-offs?"* → static = fast/secure/cheap
  but content only updates on rebuild; DB-driven = dynamic but needs a server.
- *"Where is the content stored if there's no database?"* → in the Git repo as files;
  the CMS commits to it.
- *"What did QA cover?"* → cross-page stability, CMS admin flows, responsive layout
  (prep specifics).

---

## Final prep checklist

- [ ] For each project, explain the **auth flow** in 30 seconds.
- [ ] For each project, explain **how data gets from the DB to the screen**.
- [ ] Be able to justify **why that stack** (not just "it's what we used").
- [ ] Know the **ORM story**: none (UniQue, Doki-Doki), Eloquent (TindaPOS),
      Prisma (Coffee, Agent Ops web), Drizzle (CRS), DRF/Django ORM (KST).
- [ ] Know the **auth story**: PHP sessions (UniQue, Doki-Doki), Firebase (KST),
      NextAuth (CRS), Supabase (Oracle, Agent Ops), Netlify Identity (Bagani).
- [ ] Resolve every **⚠️ VERIFY** by reading the real code before the interview.
- [ ] Have **one concrete bug/challenge story** per project you built.
- [ ] Practice the **AI honesty line** until it's natural.
