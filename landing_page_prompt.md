# Landing Page Redesign Prompt — Phantom.land-Inspired Portfolio

## Reference
**Inspiration:** [phantom.land](https://www.phantom.land/)  
**Goal:** Redesign the landing page (Hero section and beyond) of a full-stack developer portfolio to follow the same visual concept, spatial design philosophy, and interactive patterns found on Phantom.land — NOT a direct copy, but the same *design language* and *spatial storytelling approach* adapted for a solo developer.

---

## 1. Core Design Concept — "The 3D Project Gallery Wall"

The defining feature of Phantom.land is a **full-viewport 3D-perspective grid of project cards** that feels like you're looking at a wall of illuminated screens floating in a dark void. The entire page is essentially one massive composition:

### What Makes It Work
- **The grid is CSS-perspective-transformed** — the entire grid of cards is rotated slightly in 3D space (rotateX + rotateY), creating the illusion that you're looking at an angled gallery wall from a cinematic vantage point. It's NOT flat. It's NOT a simple masonry grid. The perspective creates depth and drama.
- **Jet-black void background** — the cards float in pure darkness (`#000` or near-black). There is no visible page background pattern, gradient, or texture. The darkness makes the card thumbnails pop like glowing screens.
- **Cards are the hero** — there is no traditional "hero section" with a big headline. The projects ARE the hero. The entire viewport is filled with the 3D card grid immediately on load.
- **Minimal chrome** — the nav bar, tagline, and metadata are overlaid on top of the grid with semi-transparent styling, never competing with the cards.

### The 3D Perspective Effect (Critical Detail)
```
The grid container has a CSS 3D transform applied, something like:
- Parent: perspective(1200px) or similar
- Grid container: transform: rotateX(~5-10deg) rotateY(~-5-10deg)
- This tilts the entire grid so it recedes into the distance, creating a vanishing-point effect
- The grid appears to extend beyond the viewport in all directions
- Scrolling should feel like panning across this angled wall
```

---

## 2. Layout Structure

### Header / Navigation (Overlay on top of grid)
- **Top-left:** Logo/icon (small, iconic — Phantom uses a ghost icon)
- **Top-center:** Compact metadata row in monospace/uppercase micro-text:
  - Sound toggle (optional)
  - Brief tagline: e.g., "FULL STACK DEVELOPER BUILDING DIGITAL EXPERIENCES"
  - Location + timezone: e.g., "MANILA, PH — 08:49 UTC+8"
- **Top-right:** Primary CTA button with border/outline style: e.g., "Let's Talk" or "Hire Me"
- **Bottom-center:** Simple text navigation links: "Work", "About", "Contact" — floating at bottom of viewport
- The header is **fixed/sticky**, transparent, overlaying the card grid beneath it
- All text is **uppercase, small, monospaced or tight-tracked sans-serif** — functional, not decorative

### Main Content — The Project Grid
- A CSS Grid of project cards (3–4 columns on desktop, 2 on tablet, 1 on mobile)
- The entire grid is wrapped in a 3D-perspective container
- Grid has generous gap between cards (16–24px)
- The grid should feel like it extends infinitely — it overflows the viewport and the user scrolls through it
- No section headings breaking up the grid — it's one continuous wall of work

### Footer
- Minimal, almost invisible — just the bottom nav links or a small copyright line
- Lives at the very end of the scrollable grid

---

## 3. Project Card Design

Each card represents a project and follows this anatomy:

### Card Structure
```
┌─────────────────────────────────┐
│  [Project Thumbnail / Visual]   │  ← Large image/visual, ~70-80% of card height
│                                 │
│                                 │
├─────────────────────────────────┤
│  CLIENT NAME        YEAR        │  ← Monospace, uppercase, micro text
│  PROJECT TITLE                  │  ← Slightly larger, still small
│  tag1  tag2  tag3               │  ← Category/tech pills or comma-separated
└─────────────────────────────────┘
```

### Card Visual Style
- **Dark card background** (`#0a0a0a` or `#111`) with subtle border (`border: 1px solid rgba(255,255,255,0.06)`)
- **Rounded corners** (8–12px)
- **Thumbnail area:** Fills most of the card, object-fit cover, slightly rounded top corners
- **Text area:** Below the thumbnail, padding 12–16px, all text is white/gray on dark
- **Hover effect:** Subtle scale-up (1.02–1.03), slight brightness increase on the thumbnail, maybe a soft glow or border-color shift
- **Typography in cards:** ALL CAPS, letter-spacing 0.05–0.1em, font-size 10–12px for metadata, 13–14px for title

### Card Content Mapping (For a Developer Portfolio)
Instead of client names, adapt to:
- **Project name** (e.g., "E-Commerce Platform")
- **Tech stack tags** (e.g., "NEXT.JS", "TYPESCRIPT", "POSTGRESQL")
- **Category** (e.g., "WEB APP", "MOBILE", "API", "FULL STACK")
- **Year** (e.g., "2024")
- **Brief one-liner** (optional, very short)

### Thumbnail Visuals
Since this is a developer portfolio:
- Use **actual project screenshots** if available
- Or create **programmatic placeholder visuals**: CSS gradient cards, code snippet previews, or abstract geometric patterns unique to each project
- Each card thumbnail should feel visually distinct — varied colors, compositions
- Consider showing a mix: some with browser mockups, some with mobile frames, some abstract

---

## 4. Typography System

### Fonts
- **Primary (UI/body):** A clean, geometric sans-serif — Inter, Söhne, or similar
- **Monospace (metadata):** JetBrains Mono, IBM Plex Mono, or Space Mono — for tags, timestamps, labels
- **Display (if any headings needed):** Same as primary but heavier weight, ultra-tight letter-spacing

### Text Styling Rules
- Nearly ALL text on the page is **uppercase** and uses **wide letter-spacing** (0.05–0.15em)
- Font sizes are deliberately **small** — the site whispers, it doesn't shout. Largest text might be 14–16px. Metadata is 10–11px.
- Text colors: `rgba(255,255,255,0.9)` for primary, `rgba(255,255,255,0.5)` for secondary/muted
- NO large hero headlines — the visual grid is the statement

---

## 5. Color Palette

| Role | Color | Notes |
|------|-------|-------|
| Background | `#000000` or `#050505` | Pure/near-black void |
| Card BG | `#0a0a0a` to `#111111` | Slightly lighter than page BG |
| Card Border | `rgba(255,255,255,0.06)` | Barely visible edge |
| Primary Text | `rgba(255,255,255,0.9)` | Off-white |
| Secondary Text | `rgba(255,255,255,0.5)` | Muted gray |
| Accent | Developer's choice (keep existing `#7cf5c4` or go neutral) | Used sparingly — CTA button, hover states |
| Card Hover Border | `rgba(255,255,255,0.15)` | Subtle brightening |

---

## 6. Interaction & Motion Design

### Page Load
- Cards should animate in with a **staggered fade-up** — each card fades in and translates up slightly, with each successive card delayed by ~50–80ms
- The 3D perspective should animate from a more extreme angle to its resting position (like the camera is settling into place)
- Total entrance animation: ~1.5–2.5s

### Scroll Behavior
- **Smooth scroll** through the 3D grid
- Optional: slight **parallax** — cards closer to the "camera" (bottom of grid) move faster than those further away
- The 3D perspective should remain constant while scrolling (don't re-animate on scroll)

### Card Hover
- Scale: `transform: scale(1.02)` with `transition: 0.3s ease`
- Thumbnail brightness increase: `filter: brightness(1.1)`
- Border color shift: more visible white border
- Optional: subtle `box-shadow` glow
- Cursor changes to pointer

### Card Click
- Navigate to project detail page (or open modal/expanded view)
- Smooth transition out

### Navigation Hover
- Text opacity shift from 0.5 to 1.0
- Optional: underline animation

---

## 7. Responsive Behavior

### Desktop (1200px+)
- 3–4 column grid
- Full 3D perspective effect
- All metadata visible in header

### Tablet (768–1199px)
- 2 column grid
- Reduced perspective angle (less dramatic tilt)
- Simplified header — collapse some metadata

### Mobile (< 768px)
- 1 column grid
- **Flatten the perspective** — remove or heavily reduce the 3D tilt (it doesn't work well on small screens)
- Stack navigation vertically or use hamburger menu
- Cards fill full width with reduced padding

---

## 8. Technical Implementation Notes

### Existing Tech Stack (DO NOT change)
- **Next.js 14** (App Router)
- **React 18** + **TypeScript**
- **Tailwind CSS 3**
- **Framer Motion 11** (for animations)
- Three.js / R3F are installed but NOT needed for the landing page

### Key CSS for 3D Grid Effect
```css
.grid-perspective-wrapper {
  perspective: 1200px;
  perspective-origin: 50% 50%;
  overflow: visible;
}

.project-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  transform: rotateX(8deg) rotateY(-5deg) rotateZ(1deg);
  transform-style: preserve-3d;
}
```

### Component Structure
```
components/
  landing/
    ProjectGrid.tsx       — The 3D-perspective grid container
    ProjectCard.tsx       — Individual project card component
    LandingNav.tsx        — Overlay navigation header
    LandingFooter.tsx     — Minimal bottom navigation
```

### Data Structure for Projects
```typescript
interface Project {
  id: string;
  title: string;
  category: string;         // "Web App" | "Mobile" | "API" | etc.
  tags: string[];            // ["Next.js", "TypeScript", "PostgreSQL"]
  year: number;
  thumbnail: string | null;  // URL or null for programmatic visual
  color: string;             // Fallback gradient color for programmatic thumbnails
  description?: string;      // One-liner (optional)
  href: string;              // Link to project detail or external
}
```

---

## 9. What This Is NOT

To be absolutely clear, this design is:
- **NOT a traditional hero + sections layout** — no big headline, no "Hi I'm X" intro block
- **NOT a scroll-based storytelling page** — no animated sections revealing on scroll
- **NOT minimal/empty** — the viewport is FULL of content (the card grid) immediately
- **NOT flat** — the 3D perspective is the entire personality of the page
- **NOT colorful** — it's dark, moody, cinematic. Color comes from the project thumbnails only.

---

## 10. Summary of the Vibe

Imagine walking into a dark, sleek gallery where every wall is covered with glowing screens showing your best work. You're viewing it from a slightly cinematic angle — not straight-on, but from a dramatic vantage point that makes the space feel infinite. The typography is whisper-quiet, functional, almost like terminal output. The projects speak for themselves through their visuals. Everything else — navigation, labels, metadata — is subordinate to the work.

That's Phantom.land. That's what this landing page should feel like, but for a solo full-stack developer's portfolio.
