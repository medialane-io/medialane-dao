/**
 * Showcase data layer — pulls live Medialane collections from the backend so
 * the DAO site can display real creative imagery.
 *
 * Best-effort, same discipline as lib/governance.ts: server-side, never throws,
 * returns [] on any failure so the UI degrades to no-carousel, never broken.
 */

import { ipfsToHttp } from '@medialane/ui/utils/ipfs'

/** Raw collection shape consumed from the backend (subset of ApiCollection). */
export interface RawCollection {
  name: string | null
  contractAddress: string
  image: string | null
}

/** A collection ready to render in the mosaic. */
export interface ShowcaseCollection {
  name: string
  contractAddress: string
  image: string
}

/** Keep named + imaged collections, dedupe by address, cap at 24. */
export function pickShowcase(raw: RawCollection[]): ShowcaseCollection[] {
  const seen = new Set<string>()
  const out: ShowcaseCollection[] = []
  for (const c of raw) {
    if (!c.name) continue
    if (seen.has(c.contractAddress)) continue
    const image = ipfsToHttp(c.image)
    if (!image) continue
    seen.add(c.contractAddress)
    out.push({ name: c.name, contractAddress: c.contractAddress, image })
    if (out.length >= 24) break
  }
  return out
}

// Server-only env — this module runs exclusively in server components
// (getShowcaseCollections is awaited in an async server component). The key is
// never bundled into client JS. Do NOT add a NEXT_PUBLIC_ prefix here.
const BACKEND_URL =
  process.env.MEDIALANE_BACKEND_URL ?? 'https://api.medialane.io'
const API_KEY = process.env.MEDIALANE_API_KEY ?? ''

/**
 * Fetch collections to showcase. Best-effort: returns [] if the backend is
 * unreachable or no API key is configured — the carousel is then omitted.
 */
export async function getShowcaseCollections(): Promise<ShowcaseCollection[]> {
  if (!API_KEY) return []
  try {
    const res = await fetch(`${BACKEND_URL}/v1/collections?limit=48&isKnown=true`, {
      headers: { 'x-api-key': API_KEY },
      next: { revalidate: 600 },
    })
    if (!res.ok) return []
    const json = await res.json()
    const list: RawCollection[] = Array.isArray(json) ? json : (json?.data ?? [])
    return pickShowcase(list)
  } catch {
    return []
  }
}
