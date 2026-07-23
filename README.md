# Guanez Portfolio v2

A full-stack developer portfolio with an immersive opening simulation: a CSS 3D laptop, scripted custom cursor, simulated browser typing the URL, loading bar, and a zoom transition that morphs into the live hero.

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- Framer Motion
- 100% programmatic visuals (CSS 3D + SVG, no image assets)

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Behavior

- The simulation runs once per session (stored in `localStorage`).
- A **Replay intro** button in the corner re-runs the sequence.
- Respects `prefers-reduced-motion` and includes a **Skip** affordance.

## Structure

```
app/
  layout.tsx
  page.tsx
  globals.css
components/
  Hero.tsx
  Nav.tsx
  SimulationSequence.tsx
  simulation/
    Cursor.tsx
    Laptop.tsx
    Browser.tsx
    TypingAnimation.tsx
```

## Deploy

Deploy to Vercel: import the repo, no env vars required.
