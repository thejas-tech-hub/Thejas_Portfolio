# Thejas J — Engineering Portfolio

A high-performance, dark-mode engineering portfolio showcasing production AI/ML architectures, agentic workflows, RAG systems, and CPU-only ranking pipelines.

- **Developer**: Thejas J (B.E. AI & ML, A.J. Institute of Engineering and Technology, Mangalore)
- **Target Repository**: [https://github.com/thejas-tech-hub/Thejas_Portfolio.git](https://github.com/thejas-tech-hub/Thejas_Portfolio.git)
- **Live**: [thejas-portfolio-9te3anzbu-thejas8.vercel.app](https://thejas-portfolio-navy.vercel.app/)
- **Profile / Connect**: [GitHub](https://github.com/thejas-tech-hub) · [LinkedIn](https://linkedin.com/in/thejas-j-b2695433a) · [LeetCode](https://leetcode.com/u/thejasbejja)

---

## Technical Architecture & Stack

- **Framework**: TanStack Start (full-stack React with Nitro engine)
- **Core**: React 19, TypeScript 5.9, Vite 8
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`), Vanilla OKLCH design tokens, `tw-animate-css`
- **3D / Visuals**: `@react-three/fiber`, Three.js (custom reactive network graph with auto-pausing `IntersectionObserver` lifecycle and WebGL error boundary)
- **Routing**: TanStack Router (file-based route tree with loaders and type-safe routing)
- **Testing & Quality**: Vitest, React Testing Library, ESLint 9, Prettier

---

## Local Setup & Development

### Prerequisites
- Node.js v20+ or v22+
- Bun (v1.2+) or npm (v10+)

### Installation
```bash
# Using Bun (recommended, matches bun.lock)
bun install

# Or using npm
npm install
```

### Commands
```bash
# Start local development server (port 5173)
bun run dev

# Run test suite
bun run test

# Type-check TypeScript files
bun x tsc --noEmit

# Run ESLint
bun run lint

# Format code with Prettier
bun run format

# Build production bundle (.output)
bun run build
```

---

## Content Management

### Profile & Skills
Edit `src/data/profile.ts`:
- **Identity & Contact**: Name, location, email, LinkedIn, GitHub, LeetCode.
- **Privacy**: `showPhone` is `false` by default to keep phone numbers off public pages.
- **Education**: Degree, college, scheme, CGPA, PUC, CBSE scores.
- **Skill Groups**: AI/ML & GenAI, Backend & APIs, Languages & framework, Databases, Cloud & tools.
- **Hackathons & Leadership**: Role, event, organization, and verified details.

### Case Studies & Archive
Edit `src/data/projects.ts`:
- **Primary Case Studies**: `iep-continuity-partner`, `rag-llm-engine`, `pathfinder-ai`, `sevasphere`, `india-runs`.
- **Metrics**: Labeled as project-reported results from hackathon runs and pytest suites.
- **Archive Repositories**: Prototypes and experimental builds (`StreamVerse`, `HealVision`, `Trading Signal Pipeline`, `AEGIS / HTF-07`, etc.) clearly labeled as prototypes.

### Resume PDF
- Place your public resume file at `public/resume.pdf`.
- The site downloads it as `ThejasJ_Resume.pdf`.
- To hide the resume button site-wide, set `resumeUrl: null` in `src/data/profile.ts`.

---

## Performance & Accessibility

- **Three.js Lifecycle**: The 3D scene uses `IntersectionObserver` to pause continuous render loops when scrolled out of view.
- **Reduced Motion**: Respects `prefers-reduced-motion: reduce` by freezing animations and switching the canvas frameloop to `"demand"`.
- **WebGL Fallback**: When WebGL is unavailable or fails to initialize, `GLBoundary` gracefully falls back to a CSS ambient glow.
- **Accessibility**: Includes skip-to-content link, semantic HTML5 tags, high-contrast focus rings, and screen-reader accessible button labels.

---

## Deployment Guide

The app builds with Nitro into `.output/` (Cloudflare Pages/Workers preset by default).

### Option 1: Cloudflare Pages / Workers
Deploy the prebuilt output:
```bash
npx wrangler pages deploy .output/public
```

### Option 2: Firebase Hosting
To deploy to Firebase Hosting on a dedicated project (do not reuse or overwrite `sevasphere-2026` or `iep-continuity-partner`):
1. Create or select a dedicated portfolio project in Firebase:
   ```bash
   firebase use --add
   ```
2. Configure `firebase.json`:
   ```json
   {
     "hosting": {
       "public": ".output/public",
       "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
       "rewrites": [{ "source": "**", "destination": "/index.html" }]
     }
   }
   ```
3. Deploy:
   ```bash
   firebase deploy --only hosting
   ```

### Option 3: Vercel
1. Run `npx vercel` to link to your authorized Vercel account and set output directory to `.output/public`.

---

## Repository & Version Control

- **Remote**: `https://github.com/thejas-tech-hub/Thejas_Portfolio.git`
- **Branch**: `main`
- Commits sync back cleanly without rewriting published git history.
