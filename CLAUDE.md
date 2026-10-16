# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Medialane DAO is the institutional / governance site for Medialane (medialane.org) — a monetization platform for creative work and intellectual property on Starknet. It is a Next.js 16 / React 19 static/SSR informational site. No database or authentication layer; it does make best-effort server-side reads of public APIs (Snapshot, Etherscan, the Medialane backend, a Starknet RPC).

**medialane.org is the institution; docs.medialane.io is the product documentation.** The DAO site owns the vision, governance, the token, the airdrop, and legal/founding documents. Protocol/product docs live on docs.medialane.io — do not add them here.

## Commands

```bash
bun dev           # Dev server at localhost:3000
bun run build     # Production build (TypeScript errors are ignored — see next.config.mjs)
bun run lint      # ESLint
bun test <file>   # Bun's built-in runner — used for lib/*.test.ts (no framework added)
```

## Architecture

### Route Structure

Public pages live under `app/(site)/`, wrapped by `SiteShell`:

- `/` — Homepage: hero, live collection mosaic, interactive feature showcase, Launchpad cards, Airdrop callout
- `/explore` — What you can do on Medialane (create, trade, launch, protect, build)
- `/dao` — Governance: live Snapshot proposals, MDLN figures, founding documents
- `/token` — the MDLN token (was `/members`; `/members` 301-redirects here)
- `/airdrop` — the Creator's Airdrop
- `/creators-fund` — the Creator's Fund dashboard (live balance, distribution rounds). It is its own top-level page, not a child of `/airdrop` — the Fund outlives the airdrop campaign (was `/airdrop/fund`, which 301-redirects here)
- `/build` — slim signpost into docs.medialane.io for developers
- `/connect` — get-involved page
- `/guidelines`, `/guidelines/[slug]` — the DAO library: founding + legal documents (was `/docs`; `/docs/*` 301-redirects here)

`next.config.mjs` `redirects()` holds all 301s: the six old protocol-doc URLs → docs.medialane.io, `/docs*` → `/guidelines*`, `/members` → `/token`, `/airdrop/fund` → `/creators-fund`.

### The Shell — `SiteShell`

`components/site-shell.tsx` wraps every `(site)` page (there is **no sidebar** — it was retired). It renders:
1. **`NavCommandMenu`** (from `@medialane/ui`) — the ⌘K command palette, the single navigation surface.
2. **`NavTrigger`** — fixed top-left logo + menu button, opens the command menu.
3. Full-width `<main>` + a site footer.

Navigation model: `lib/nav-commands.ts` exports `NAV_COMMANDS` — primary group (Start, Explore, DAO, Airdrop, Guidelines) and a "Navigate" group (Token, Build, Docs→external, Connect).

### Design Standard

The site was redesigned to one consistent standard (2026-05-21). Follow it for any new page or section:

- **Open layout — no bordered "panel" cards.** Sections sit directly on the page background, separated by whitespace and hairline rules (`border-t border-border/50`, `divide-y`). Do not wrap content blocks in bordered/`bento-cell` panels.
- **No placeholder/empty slots.** Every region holds real content (copy, live data, real imagery). Empty labelled boxes look like wireframes — never ship them.
- **Full brand palette**, used with intent — `brand-purple`, `brand-blue`, `brand-orange`, `brand-rose`. Not a purple/blue duotone.
- **Typography carries it** — big `font-black` headings (`text-3xl`/`4xl`+), small uppercase colored eyebrows, generous spacing.
- **Friendly, plain-language copy.** No crypto/tech jargon (no "IPFS", "ERC-721", "onchain", "Berne Convention", "multisig"). Lead with what the user gets.
- Per-page structure: a root `<div className="space-y-20 sm:space-y-24">`; each `<section>` carries `px-4 sm:px-6 lg:px-10 xl:px-14`; sections wrapped in `FadeIn` from `@medialane/ui`.

Shared components in `components/` (`page-hero`, `stat-card`, `section-header`, `feature-card`, `address-row`) predate the redesign — current pages mostly compose open sections inline. `components/elements/asset-mosaic.tsx` is the live-collection marquee used on the homepage.

### Server → Client Split

Data pages use `page.tsx` (server: fetches, exports `metadata`) → `page.client.tsx` (`'use client'`: renders props). The homepage fetches showcase collections; `/dao` fetches governance data; `/creators-fund` fetches the fund status.

### Data layers (`lib/`) — best-effort, never throw

- `lib/governance.ts` — Snapshot proposals + MDLN stats (Etherscan). `ETHERSCAN_API_KEY` (server-only).
- `lib/showcase.ts` — live collections from the Medialane backend for the homepage mosaic. **Server-only** `MEDIALANE_API_KEY` + `MEDIALANE_BACKEND_URL` — never `NEXT_PUBLIC_` (the fetch runs only in server components; the key must not reach the client bundle).
- `lib/creators-fund.ts` — Creator's Fund round status + CoinGecko price.

All three follow the same discipline: server-side `fetch` with `next.revalidate`, return safe defaults on failure, never throw — the UI shows `—` or omits the element.

### Content / Markdown

Markdown lives in `content/`:

| Directory | Purpose |
|-----------|---------|
| `content/dao/` | Founding documents (Constitution, Charter, Guidelines) + `Airdrop.md` |
| `content/` (root) | Legal docs (Terms-of-Use, Privacy-Policy) |
| `content/data/` | `fund-distributions.json` — Creator's Fund airdrop history |

There is no `content/protocol/` — protocol docs moved to docs.medialane.io. `/guidelines/[slug]` resolves slugs by trying `dao` then root. `lib/markdown.ts` exports `getAllPosts` / `getPostBySlug`. Frontmatter: `title`, `date`, optional `author`, `description`.

### Key Config (`lib/site-config.ts`)

- `siteConfig` — name, URL, Snapshot URL, ENS
- `mdln` — MDLN token/vesting/treasury addresses + Etherscan links
- `starknet` — Starknet contract addresses
- `creatorsFund` — the Creator's Fund multisig address, tokens, $1,000 round threshold
- `colors`, `navSections`

### Styling

- **Tailwind v4**; brand tokens in `globals.css` (`@theme inline`).
- **Inter is the only font** (display + body; `font-mono` also resolves to Inter). No Geist Mono.
- Light and dark are both first-class; theme follows the user's setting (`next-themes`, `enableSystem`, default `system`) — never force a theme.
- `next.config.mjs` — TS build errors suppressed; images unoptimized; `redirects()`.

## Environment Variables

| Variable | Purpose |
|---|---|
| `ETHERSCAN_API_KEY` | MDLN holder count / treasury balance (server-only) |
| `MEDIALANE_API_KEY` | Backend read key for the homepage collection mosaic — **server-only, never `NEXT_PUBLIC_`** |
| `MEDIALANE_BACKEND_URL` | Medialane API base (optional; defaults to `https://api.medialane.io`) |

## Content Principles

No fake data, no mockups, no placeholder stats — every number is real (derivable from on-chain addresses, the SDK, or the docs) or shown as `—`.

**Fee framing:** the marketplace and launchpad protocols are zero-fee. Medialane applies a single **1% fee on earnings** (sales, paid mints, launches — *not* free mints). Year one, the fee funds the **Creator's Fund** and is airdropped to the community; from year two MDLN holders vote on its use. Never say "1% fee on every transaction" (false — minting is free) or "fee funds the DAO treasury".
