# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Medialane DAO is a Next.js 16 / React 19 governance site for a Starknet-based decentralized autonomous organization. It is a static/SSR informational site — there is no backend, database, or authentication layer.

## Commands

```bash
pnpm dev          # Start dev server at localhost:3000
pnpm build        # Production build (TypeScript errors are ignored — see next.config.mjs)
pnpm lint         # ESLint
pnpm start        # Serve production build
```

There are no tests in this project.

## Architecture

### Route Structure

All public-facing pages live under `app/(site)/` (a route group wrapping every page in `AppShell`):

- `/` — Homepage
- `/explore` — Apps, features & services
- `/dao` — DAO governance documents rendered from Markdown
- `/members` — Members page
- `/connect` — Get-involved page
- `/docs/[slug]` — Individual Markdown document viewer (reads from `content/` root)

The `app/docs` directory (without the route group) also exists but only contains the `[slug]` dynamic route served under `(site)`.

### The AppShell Pattern

Every (site) page is wrapped by `AppShell` (`components/app-shell.tsx`), which renders three layers:

1. **`SceneCanvas`** — a full-viewport `position: fixed; z-index: -10` Three.js canvas
2. **`SiteNav`** — navigation (desktop sidebar + mobile bottom bar/drawer)
3. **`<main>`** — page content with `bg-background/80` producing a glassmorphism effect over the 3D scene

### 3D Scene (`components/three/`)

- `scene-canvas.tsx` — dynamically imports `Scene` with `ssr: false` to avoid hydration issues
- `scene.tsx` — `react-three-fiber` `<Canvas>`, mounts only after hydration (`useState(mounted)`)
- `scene-controller.tsx` — reads `usePathname()` and smoothly animates the camera to route-specific positions defined in `lib/site-config.ts → cameraTargets`
- `media-lanes.tsx` / `integrity-web.tsx` — the actual Three.js geometry objects

Camera targets per route are configured in `lib/site-config.ts` alongside nav links and brand colors.

### Content / Markdown

DAO governance documents live in `content/dao/*.md` with gray-matter frontmatter (`title`, `date`, `author`, `description`). The `/dao` page server component fetches all of them via `lib/markdown.ts → getAllPosts('dao')` and passes rendered HTML to a client component (`page.client.tsx`).

The `/docs/[slug]` route reads from `content/` (root level, no subdirectory). Add new top-level docs there.

### Styling

- **Tailwind v4** with `@tailwindcss/typography` for prose content
- Custom brand tokens defined in `globals.css` as CSS variables and mapped via `@theme inline`:
  - `ml-blue` (#0000FF), `ml-deep` (#0C0C4F), `ml-orange` (#EC796B), `ml-mauve` (#E175B1)
  - `ml-glass` / `ml-glass-border` — used by `GlassCard` for the frosted-glass UI pattern
- Brand colors are also centralized in `lib/site-config.ts → colors` for use in TypeScript (Three.js lighting etc.)
- Fonts: Space Grotesk (sans) and Geist Mono (mono), loaded via `next/font`
- Dark mode default; `next-themes` with `class` strategy

### UI Components

`components/ui/` — shadcn/ui components (Radix UI primitives + Tailwind). Do not hand-edit these; regenerate via shadcn CLI if updates are needed.

Custom project components:
- `GlassCard` — primary card primitive using `ml-glass`/`ml-glass-border` tokens, accepts `intensity` prop (`light` | `medium` | `heavy`)
- `PageHeader` — standardized page title/description header
- `HeroSection` — homepage hero
- `SiteNav` — splits into `DesktopNav` (vertical sidebar, right edge) and `MobileBar`/`MobileDrawer` (bottom bar + sheet)

### Animation

`lib/motion.ts` exports `createContainerVariants` and `createItemVariants` — shared Framer Motion variant factories used across pages for staggered entrance animations.

### Key Config Files

- `lib/site-config.ts` — single source of truth for site name/URL, nav sections, brand colors, and 3D camera positions per route
- `next.config.mjs` — TypeScript build errors are suppressed (`ignoreBuildErrors: true`); images are unoptimized

## Content Conventions

Markdown files must include frontmatter:
```yaml
---
title: Document Title
date: YYYY-MM-DD
author: Optional Author
description: Optional description
---
```
