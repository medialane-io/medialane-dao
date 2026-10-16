'use client'

import { ArrowUpRight } from 'lucide-react'
import { mdln, starknet, siteConfig } from '@/lib/site-config'
import { FadeIn } from '@medialane/ui'
import { AddressRow } from '@/components/address-row'

const distribution = [
  { label: 'Held by the community, released over 9 years', value: '18,900,000', pct: 90, bar: 'bg-brand-purple' },
  { label: 'Set aside to run and grow the platform', value: '2,100,000', pct: 10, bar: 'bg-brand-blue' },
  { label: 'Investors', value: 'None', pct: 0, bar: 'bg-brand-orange' },
  { label: 'Team & insiders', value: 'None', pct: 0, bar: 'bg-brand-rose' },
]

const steps = [
  {
    title: 'Get MDLN',
    desc: 'MDLN trades on Ethereum and on Starknet. Pick whichever network you already use; the token is the same on both.',
  },
  {
    title: 'Connect to Snapshot',
    desc: 'Open Snapshot with the wallet holding your MDLN to see every proposal up for a vote.',
  },
  {
    title: 'Vote and propose',
    desc: 'Vote on any open proposal, or put forward your own. One MDLN is one vote, and voting is always free.',
  },
]

const getLinks = [
  { label: 'Trade on Ethereum (Uniswap)', href: `https://app.uniswap.org/explore/tokens/ethereum/${mdln.token}` },
  { label: 'Trade on Starknet (Ekubo)', href: 'https://app.ekubo.org' },
  { label: 'Bridge between networks (StarkGate)', href: `https://starkgate.starknet.io/token/${starknet.mdlnL2}` },
]

export default function TokenPageClient() {
  return (
    <div className="space-y-20 sm:space-y-24">

      <section className="px-4 pt-16 sm:px-6 sm:pt-20 lg:px-10 lg:pt-24 xl:px-14">
        <FadeIn className="max-w-3xl">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Token</p>
          <h1 className="text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            The MDLN token
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            MDLN is what makes Medialane community-owned. The supply is fixed, it is shared openly
            with no investors or insiders, and every token is one vote in how the platform is run.
          </p>
        </FadeIn>
      </section>

      <section className="px-4 sm:px-6 lg:px-10 xl:px-14">
        <FadeIn className="max-w-3xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-brand-purple">Distribution</p>
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl">How MDLN is shared</h2>
          <p className="mt-3 text-base text-muted-foreground">
            Every token belongs to the community. Nothing was sold to investors and nothing was
            set aside for a team.
          </p>
          <div className="mt-6 divide-y divide-border/50 border-t border-border/50">
            {distribution.map((row) => (
              <div key={row.label} className="py-5">
                <div className="mb-2 flex items-baseline justify-between gap-4">
                  <span className="text-base font-medium text-foreground">{row.label}</span>
                  <span className="font-mono text-sm text-muted-foreground">{row.value}</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                  <div className={`h-full rounded-full ${row.bar}`} style={{ width: `${row.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      <section className="px-4 sm:px-6 lg:px-10 xl:px-14">
        <FadeIn className="max-w-3xl">
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl">Take part</h2>
          <ol className="mt-6 space-y-5">
            {steps.map((s, i) => (
              <li key={s.title} className="flex gap-4">
                <span className="font-mono text-2xl font-black leading-none text-brand-purple/40">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="pt-0.5">
                  <p className="text-base font-bold text-foreground">{s.title}</p>
                  <p className="mt-1 text-base leading-relaxed text-muted-foreground">{s.desc}</p>
                </div>
              </li>
            ))}
          </ol>
          <a
            href={siteConfig.snapshot}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-brand-purple px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-purple/90"
          >
            Open Snapshot <ArrowUpRight className="size-4" />
          </a>
        </FadeIn>
      </section>

      <section className="px-4 sm:px-6 lg:px-10 xl:px-14">
        <FadeIn className="max-w-3xl">
          <h2 className="mb-6 text-3xl font-black tracking-tight sm:text-4xl">Where to get MDLN</h2>
          <div className="divide-y divide-border/50 border-t border-border/50">
            {getLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-4 py-4 text-base font-medium text-foreground transition-colors hover:text-brand-purple"
              >
                {l.label}
                <ArrowUpRight className="size-5 shrink-0 text-muted-foreground/30 transition-colors group-hover:text-brand-purple" />
              </a>
            ))}
          </div>
        </FadeIn>
      </section>

      <section className="px-4 pb-8 sm:px-6 lg:px-10 xl:px-14">
        <FadeIn className="max-w-3xl">
          <h2 className="mb-4 text-3xl font-black tracking-tight sm:text-4xl">Contracts</h2>
          <AddressRow label="MDLN on Ethereum" value={`${mdln.token.slice(0, 12)}…${mdln.token.slice(-6)}`} href={mdln.etherscanToken} />
          <AddressRow label="Vesting contract" value={`${mdln.vesting.slice(0, 12)}…${mdln.vesting.slice(-6)}`} href={mdln.etherscanVesting} />
          <AddressRow label="DAO treasury" value={`${mdln.treasury.slice(0, 12)}…${mdln.treasury.slice(-6)}`} href={mdln.etherscanTreasury} />
          <AddressRow label="MDLN on Starknet" value={`${starknet.mdlnL2.slice(0, 12)}…${starknet.mdlnL2.slice(-6)}`} href={starknet.voyagerMdln} />
          <AddressRow label="Governance" value="medialane.eth" href={siteConfig.snapshot} />
        </FadeIn>
      </section>

    </div>
  )
}
