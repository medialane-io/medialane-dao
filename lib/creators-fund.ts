/**
 * Creator's Fund data layer.
 *
 * Reads token prices from CoinGecko and derives the airdrop-round status.
 *
 * Discipline (mirrors lib/governance.ts): best-effort, never throws. Anything
 * that cannot be fetched becomes `null` so the UI can render `—`.
 */

import distributionsData from '@/content/data/fund-distributions.json'
import { creatorsFund } from '@/lib/site-config'

export interface Distribution {
  round: number
  date: string
  amountUsd: number
  participants: number
  txHash: string
}

export interface FundToken {
  symbol: string
  /** Full token name, e.g. "Starknet Token". */
  name: string
  balance: number
  /** Unit price in USD. `null` when the price is unknown. */
  priceUsd: number | null
  /** USD value of the held balance. `null` when the price or balance is unknown. */
  usd: number | null
}

export interface CreatorsFundStatus {
  address: string
  voyager: string
  /** Tokens with a non-zero balance. */
  tokens: FundToken[]
  /** Total USD across all tokens. `null` if any balance/price could not be read. */
  totalUsd: number | null
  /** USD threshold that triggers the next airdrop. */
  nextRoundUsd: number
  /** Progress toward the next round, capped at `nextRoundUsd`. `null` if unknown. */
  progressUsd: number | null
  /** True when the fund has reached the next-round threshold. */
  readyToDistribute: boolean
  /** Number of airdrop rounds already paid out. */
  roundsPaid: number
  /** Total USD returned to the community across all past rounds. */
  totalReturnedUsd: number
  distributions: Distribution[]
}

/**
 * Derive the round-status fields from fetched token data and distributions.
 *
 * `rawTokens` may include zero-balance tokens; they are dropped from the
 * displayed `tokens` list. A token with `usd === null` (failed balance fetch
 * or missing price) forces `totalUsd` to `null` — the page shows `—` rather
 * than an inaccurate number.
 */
export function deriveFundStatus(
  rawTokens: FundToken[],
  distributions: Distribution[],
): Omit<CreatorsFundStatus, 'address' | 'voyager' | 'nextRoundUsd'> {
  const tokens = rawTokens.filter((t) => t.balance > 0)
  const anyValueMissing = rawTokens.some((t) => t.usd === null)
  const totalUsd = anyValueMissing
    ? null
    : tokens.reduce((sum, t) => sum + (t.usd as number), 0)
  const progressUsd = totalUsd === null ? null : Math.min(totalUsd, 1000)
  const readyToDistribute = totalUsd !== null && totalUsd >= 1000
  return {
    tokens,
    totalUsd,
    progressUsd,
    readyToDistribute,
    roundsPaid: distributions.length,
    totalReturnedUsd: distributions.reduce((s, d) => s + d.amountUsd, 0),
    distributions,
  }
}

const COINGECKO_PRICE =
  'https://api.coingecko.com/api/v3/simple/price?ids=starknet,ethereum,bitcoin&vs_currencies=usd'

/** Fetch STRK + ETH + BTC USD prices keyed by CoinGecko id. Returns `{}` on failure. */
async function fetchPrices(): Promise<Record<string, number>> {
  try {
    const res = await fetch(COINGECKO_PRICE, { next: { revalidate: 300 } })
    if (!res.ok) return {}
    const json = await res.json()
    const out: Record<string, number> = {}
    if (typeof json?.starknet?.usd === 'number') out.starknet = json.starknet.usd
    if (typeof json?.ethereum?.usd === 'number') out.ethereum = json.ethereum.usd
    if (typeof json?.bitcoin?.usd === 'number') out.bitcoin = json.bitcoin.usd
    return out
  } catch {
    return {}
  }
}

/**
 * Fetch the full Creator's Fund status. Best-effort: always resolves, never
 * throws. Failed reads surface as `null` values.
 */
export async function getCreatorsFundStatus(): Promise<CreatorsFundStatus> {
  const distributions = distributionsData as Distribution[]
  const prices = await fetchPrices()

  const rawTokens: FundToken[] = await Promise.all(
    creatorsFund.tokens.map(async (token) => {
      // Unit price: stablecoins ($1) vs market-priced tokens (CoinGecko).
      const priceUsd =
        token.coingeckoId === null
          ? 1
          : typeof prices[token.coingeckoId] === 'number'
            ? prices[token.coingeckoId]
            : null
      // The balance is not read, so its value is unknown.
      return { symbol: token.symbol, name: token.name, balance: 0, priceUsd, usd: null }
    }),
  )

  return {
    address: creatorsFund.address,
    voyager: creatorsFund.voyager,
    nextRoundUsd: creatorsFund.nextRoundUsd,
    ...deriveFundStatus(rawTokens, distributions),
  }
}
