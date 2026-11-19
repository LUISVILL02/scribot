# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

ESCRIBOT is a React + TypeScript educational web app for 5th-grade calligraphy practice. Students progress through three "Misiones" that cover motor warm-up, three-zone renglon recognition/tracing, and self-assessment (detective activity). The core pedagogical model uses three zones — Cielo (sky), Pasto (grass), Tierra (earth) — to teach letter proportions.

## Commands

```bash
npm run dev       # dev server at http://localhost:5173
npm run build     # tsc type-check + vite build
npm run preview   # serve built dist/
npm run lint      # ESLint (0 warnings allowed)
```

No test framework is configured.

## Architecture

### Routing (React Router v7)

| Route | Page | Purpose |
|-------|------|---------|
| `/` | `Inicio` | Landing: hero, three-zone explanation, missions overview, trazo lab |
| `/mision-1` | `Mision1` | Motor warm-up 4-step carousel |
| `/mision-2` | `Mision2` | Modules 2 & 3: zone quiz + letter tracing |
| `/mision-3` | `Mision3` | Detective self-assessment |

### Component layers

- **`src/components/layout.tsx`** — `HeaderDesktop` / `FooterDesktop`. Navigation links and external URLs (Padlet/Canva) are sourced from env vars `VITE_PADLET_URL` / `VITE_CANVA_URL`.
- **`src/components/renglon.tsx`** — `TraceCanvas` (ref-forwarded canvas with mouse + touch, ghost letter overlay, `clear()` / `save()` / `setColor()`) and `RenglonGuide` (zone legend). The three-zone bands are CSS classes `.renglon-band-cielo/pasto/tierra` defined in `index.css`.
- **`src/components/ui.tsx`** — Design system primitives: `MaterialIcon`, `StitchButton` (variants: `primary | secondary | outline | ghost`), `StitchCard`, `Insignia`, `CheckItem`, `ProgressPill`.

### State management

Entirely local `useState` / `useRef` — no global store. Each page owns its own step/selection/checklist state.

### Styling

Tailwind CSS with a custom palette in `tailwind.config.js`. Key tokens:
- Renglon zones: `cielo` (#38BDF8 / bg #E0F2FE), `pasto` (#22C55E / bg #DCFCE7), `tierra` (#B45309 / bg #FEF3C7)
- Brand: `primary` indigo, `secondary` cyan, `tertiary` amber
- Fonts: Quicksand (headings/labels), Nunito Sans (body) — loaded via Google Fonts in `index.html`
- Path alias `@` → `./src` (configured in both `vite.config.js` and `tsconfig.json`)

### Assets

Static images live in `public/assets/` (`inicio.jpg`, `mision-1.jpg`, `mision-2.jpg`, `mision-3.jpg`). The logo and profile avatar are served from Google Drive CDN URLs hardcoded in `layout.tsx`.
