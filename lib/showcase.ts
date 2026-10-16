import { ipfsToHttp } from '@medialane/ui/utils/ipfs'

export interface RawCollection {
  name: string | null
  contractAddress: string
  image: string | null
}

export interface ShowcaseCollection {
  name: string
  contractAddress: string
  image: string
}

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

const BACKEND_URL =
  process.env.MEDIALANE_BACKEND_URL ?? 'https://api.medialane.io'
const API_KEY = process.env.MEDIALANE_API_KEY ?? ''

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
