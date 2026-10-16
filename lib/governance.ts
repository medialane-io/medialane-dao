import { mdln, siteConfig } from '@/lib/site-config'

export interface SnapshotProposal {
  id: string
  title: string
  state: 'active' | 'closed' | 'pending'
  start: number
  end: number
  votes: number
  scores_total: number
  author: string
  link: string
}

export interface MdlnStats {
  totalSupply: number
  holders: number | null
  vestingLocked: number
  treasuryBalance: number | null
}

const SNAPSHOT_GRAPHQL = 'https://hub.snapshot.org/graphql'
const ETHERSCAN_API = 'https://api.etherscan.io/api'

export async function getSnapshotProposals(limit = 5): Promise<SnapshotProposal[]> {
  try {
    const query = `
      query {
        proposals(
          first: ${limit}
          skip: 0
          where: { space_in: ["${siteConfig.ens}"] }
          orderBy: "created"
          orderDirection: desc
        ) {
          id
          title
          state
          start
          end
          votes
          scores_total
          author
        }
      }
    `
    const res = await fetch(SNAPSHOT_GRAPHQL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
      next: { revalidate: 3600 },
    })

    if (!res.ok) return []
    const { data } = await res.json()
    return (data?.proposals ?? []).map((p: SnapshotProposal) => ({
      ...p,
      link: `https://snapshot.org/#/${siteConfig.ens}/proposal/${p.id}`,
    }))
  } catch {
    return []
  }
}

export async function getMdlnStats(): Promise<MdlnStats> {
  const base: MdlnStats = {
    totalSupply: mdln.totalSupply,
    holders: null,
    vestingLocked: 18_900_000,
    treasuryBalance: null,
  }

  try {
    const apiKey = process.env.ETHERSCAN_API_KEY ?? ''
    if (!apiKey) return base

    const holderRes = await fetch(
      `${ETHERSCAN_API}?module=token&action=tokeninfo&contractaddress=${mdln.token}&apikey=${apiKey}`,
      { next: { revalidate: 3600 } }
    )
    const holderData = await holderRes.json()
    const holders = holderData?.result?.[0]?.holdersCount
      ? parseInt(holderData.result[0].holdersCount)
      : null

    const balRes = await fetch(
      `${ETHERSCAN_API}?module=account&action=tokenbalance&contractaddress=${mdln.token}&address=${mdln.treasury}&tag=latest&apikey=${apiKey}`,
      { next: { revalidate: 3600 } }
    )
    const balData = await balRes.json()
    const rawBalance = balData?.result ? BigInt(balData.result) : null
    const treasuryBalance = rawBalance !== null
      ? Number(rawBalance / BigInt(10 ** 18))
      : null

    return { ...base, holders, treasuryBalance }
  } catch {
    return base
  }
}
