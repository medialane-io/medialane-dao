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
  name: string
  balance: number
  priceUsd: number | null
  usd: number | null
}

export interface CreatorsFundStatus {
  address: string
  voyager: string
  tokens: FundToken[]
  totalUsd: number | null
  nextRoundUsd: number
  progressUsd: number | null
  readyToDistribute: boolean
  roundsPaid: number
  totalReturnedUsd: number
  distributions: Distribution[]
}

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

const BALANCE_OF_SELECTOR =
  '0x2e4263afad30923c891518314c3c95dbe830a16874e8abc5777a9a20b54c76e'

const BACKEND_URL =
  process.env.MEDIALANE_BACKEND_URL ?? 'https://api.medialane.io'
const API_KEY = process.env.MEDIALANE_API_KEY ?? ''

async function fetchBalance(tokenAddress: string): Promise<bigint | null> {
  if (!API_KEY) return null
  try {
    const res = await fetch(`${BACKEND_URL}/v1/rpc`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': API_KEY },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: 'starknet_call',
        params: [
          {
            contract_address: tokenAddress,
            entry_point_selector: BALANCE_OF_SELECTOR,
            calldata: [creatorsFund.address],
          },
          'latest',
        ],
      }),
      next: { revalidate: 300 },
    })
    if (!res.ok) return null
    const json = await res.json()
    if (!Array.isArray(json?.result)) return null
    return BigInt(json.result[0] ?? '0x0') + (BigInt(json.result[1] ?? '0x0') << 128n)
  } catch {
    return null
  }
}

const COINGECKO_PRICE =
  'https://api.coingecko.com/api/v3/simple/price?ids=starknet,ethereum,bitcoin&vs_currencies=usd'

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

export async function getCreatorsFundStatus(): Promise<CreatorsFundStatus> {
  const distributions = distributionsData as Distribution[]
  const prices = await fetchPrices()

  const rawTokens: FundToken[] = await Promise.all(
    creatorsFund.tokens.map(async (token) => {
      const raw = await fetchBalance(token.address)
      const balance = raw === null ? 0 : Number(raw) / 10 ** token.decimals
      const priceUsd =
        token.coingeckoId === null
          ? 1
          : typeof prices[token.coingeckoId] === 'number'
            ? prices[token.coingeckoId]
            : null
      const usd = raw === null || priceUsd === null ? null : balance * priceUsd
      return { symbol: token.symbol, name: token.name, balance, priceUsd, usd }
    }),
  )

  return {
    address: creatorsFund.address,
    voyager: creatorsFund.voyager,
    nextRoundUsd: creatorsFund.nextRoundUsd,
    ...deriveFundStatus(rawTokens, distributions),
  }
}
