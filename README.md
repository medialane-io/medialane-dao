# Medialane DAO

**medialane.org** — Governance app for Medialane, the creator capital markets platform built on the Integrity Web.


---

## What is Medialane?

Medialane builds better rails for creators, collectors, businesses and builders: an open foundation for **creator capital markets** onchain. Creators publish their work as programmable IP, with authorship, date, license and AI policy recorded permanently with every asset, and release it as editions, drops, coins, memberships and sponsorships. Collectors and communities back the work they believe in, directly.

Medialane is governed by the Medialane DAO, and every decision is public.

- **App**: [medialane.io](https://medialane.io), live on Starknet mainnet since March 2026
- **Protocols**: open, immutable Cairo smart contracts on Starknet, secured by zero-knowledge proofs
- **Governance**: [medialane.eth](https://snapshot.org/#/s:medialane.eth)

---

## MDLN Token

| | |
|---|---|
| **Symbol** | MDLN |
| **Supply** | 21,000,000 (fixed forever) |
| **Treasury** | 100% DAO-controlled (no VC, no team allocation) |
| **Vesting** | 9-year linear unlock (2.1M/year) |
| **Voting** | 1 MDLN = 1 vote (gasless via Snapshot) |
| **L1 (Ethereum)** | `0x0DC90d57F3Aa3E836Ffd6E777E543a43A487dB15` |
| **L2 (Starknet)** | `0x06730d6a357690cebffad800219e9630e15b6f44d35526e0fc9ee52bdf7418e8` |
| **DAO Treasury** | `0xA7603783edD8ee6FF4B085f90Af53341282d244C` (Gnosis Safe) |
| **Vesting Contract** | `0x912f61d5e6db656ec1a7be8db8957c5f1e345d58` |
| **Bridge** | [StarkGate](https://starkgate.starknet.io) |

---

## Protocol Contracts

The live Starknet protocol contracts (marketplace venues, collection and launchpad
factories, POP credentials) are published, with current addresses, at
[docs.medialane.io/dev/contracts](https://docs.medialane.io/dev/contracts). They are not
duplicated here — they redeploy, and a stale address is a real hazard. The MDLN governance
token addresses are in the table above.

---

## Why Starknet

- **ZK-STARK proofs** — every transaction batch verified on Ethereum. Trustless.
- **STWO prover** — next-gen Cairo prover for faster finality and lower cost.
- **Recursive proofs** — unlimited scale while maintaining cryptographic integrity.
- **Native account abstraction** — session keys (SNIP-9) enable gasless multi-step flows.
- **Fraction-of-cent fees** — Starknet L2 costs orders of magnitude less than Ethereum mainnet.

---

## Site Stack

| Framework | Next.js 16 (App Router) |
| Styling | Tailwind CSS v4 |
| UI Components | `@medialane/ui` (shared component library) + shadcn/ui primitives |
| Content | Markdown via gray-matter + remark |
| Package manager | bun |
| Deploy | medialane.org |

---

## Development

```bash
bun install
bun dev         # localhost:3000
bun run build   # production build
bun lint
```

### Adding content

**Governance / founding documents** — drop a `.md` file in `content/dao/`:

```yaml
---
title: Document Title
date: YYYY-MM-DD
author: Medialane DAO
description: One-line summary
---
```

Founding documents in `content/dao/` are indexed by AI agents via `llms.txt`. (Protocol/developer documentation lives on [docs.medialane.io](https://docs.medialane.io), not here.)

---

## Pages

| Route | Description |
|---|---|
| `/` | Home — what Medialane is, the four pillars, "What you can count on" (the foundational guarantees), current launchpad services, Creator's Airdrop callout |
| `/explore` | What you can do — create, trade, launch, protect your rights, build (open to people and AI agents) |
| `/dao` | Governance — live Snapshot proposals, how to vote, founding documents |
| `/token` | The MDLN token — distribution, how to take part, where to get it (was `/members`) |
| `/airdrop` | The Creator's Airdrop — how revenue flows back to the community |
| `/creators-fund` | Creator's Fund dashboard — live multi-token balance, tip the fund (was `/airdrop/fund`) |
| `/build` | Developer signpost into docs.medialane.io |
| `/connect` | Contact — email, socials, quick links |
| `/guidelines`, `/guidelines/[slug]` | The DAO library — founding + legal documents (was `/docs`) |

---

## AI Agent Files

- **`AGENTS.md`** — authoritative guidance for agentic workers (file map, conventions, common tasks)
- **`llms.txt`** — machine-readable protocol summary for LLM consumption

---

## Links

- Site: [medialane.org](https://medialane.org)
- App: [medialane.io](https://medialane.io)
- Docs: [docs.medialane.io](https://docs.medialane.io)
- Snapshot: [snapshot.org/#/s:medialane.eth](https://snapshot.org/#/s:medialane.eth)
- GitHub: [github.com/medialane-io](https://github.com/medialane-io)
- X: [@medialane_io](https://x.com/medialane_io)
- YouTube: [@medialaneio](https://www.youtube.com/@medialaneio)

---

© 2026 Medialane DAO
