'use client'

import { useState } from 'react'
import { Check, Copy, ExternalLink } from 'lucide-react'
import { PageHero } from '@/components/page-hero'
import { StatCard } from '@/components/stat-card'
import { SectionHeader } from '@/components/section-header'
import { creatorsFund } from '@/lib/site-config'
import type { CreatorsFundStatus } from '@/lib/creators-fund'

function usd(value: number | null): string {
  if (value === null) return '—'
  return value.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  })
}

function fmtAmount(n: number): string {
  if (n === 0) return '0'
  return n.toLocaleString('en-US', { maximumFractionDigits: n < 1 ? 8 : 4 })
}

function fmtPrice(n: number | null): string {
  if (n === null) return '—'
  return n.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: n < 1 ? 6 : 2,
  })
}

const ACCEPTED = creatorsFund.tokens.map((t) => t.symbol).join(' · ')

const STEPS = [
  {
    title: 'You buy or sell',
    body: 'Every sale and paid mint on Medialane carries a 1% fee; free mints stay free. That fee goes straight to the Creator’s Fund.',
  },
  {
    title: 'The fund fills up',
    body: 'Each time the fund reaches its threshold, that money is ready to go back out to the community.',
  },
  {
    title: 'Everyone gets a share',
    body: 'It’s airdropped to everyone taking part. Your share is set by your XP, earned by creating, collecting, and trading on Medialane.',
  },
]

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value)
          setCopied(true)
          setTimeout(() => setCopied(false), 1500)
        } catch {}
      }}
      className="inline-flex items-center gap-1.5 rounded-lg border border-border/60 px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:border-border transition-colors"
      aria-label="Copy address"
    >
      {copied ? <Check className="size-3.5 text-brand-blue" /> : <Copy className="size-3.5" />}
      {copied ? 'Copied' : 'Copy'}
    </button>
  )
}

export function CreatorsFundClient({ status }: { status: CreatorsFundStatus }) {
  const { totalUsd, progressUsd, nextRoundUsd, readyToDistribute, tokens } = status
  const progressPct =
    progressUsd === null ? 0 : Math.min((progressUsd / nextRoundUsd) * 100, 100)

  return (
    <div className="space-y-16 px-4 pt-16 sm:px-6 sm:pt-20 lg:px-10 lg:pt-24 xl:px-14">
      <PageHero
        eyebrow="Creator's Fund"
        title="Every dollar comes back to you"
        description="Medialane charges a small 1% fee on earnings; minting is always free. All of it goes into one public wallet and is airdropped back to the creators and collectors who use the platform."
      />

      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <StatCard label="In the fund now" value={usd(totalUsd)} aurora="aurora-blue" />
          <StatCard
            label={readyToDistribute ? 'Status' : 'Next airdrop at'}
            value={readyToDistribute ? 'Ready' : usd(nextRoundUsd)}
            sub={
              readyToDistribute
                ? 'The fund has reached the threshold'
                : `${usd(progressUsd)} of ${usd(nextRoundUsd)}`
            }
            aurora="aurora-purple"
          />
        </div>

        {!readyToDistribute && (
          <div className="mt-4 bento-cell p-5">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-muted-foreground font-medium">
                Progress to the next airdrop
              </p>
              <p className="text-xs font-mono text-muted-foreground">
                {usd(progressUsd)} / {usd(nextRoundUsd)}
              </p>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
        )}

        <div className="mt-4 rounded-xl border border-brand-blue/20 bg-brand-blue/5 p-5">
          <p className="text-sm text-foreground leading-relaxed">
            <span className="font-semibold">A note on year one.</span> Platform revenue normally
            accrues to the Medialane DAO treasury. While the Creator’s Airdrop campaign is running,
            it flows directly into the Creator’s Fund instead, keeping it in one wallet so every
            dollar goes straight back to the community without an extra transfer. From year two,
            MDLN holders vote each year on what the fee supports.
          </p>
        </div>
      </section>

      <section>
        <SectionHeader label="See it yourself" size="lg" />
        <p className="text-sm text-foreground max-w-2xl mb-5">
          The Creator&apos;s Fund is a public wallet on Starknet. Anyone can watch every dollar move
          in and out; nothing is hidden, nothing is promised that the chain can&apos;t prove.
        </p>

        <div className="bento-cell overflow-hidden max-w-3xl">
          <div className="flex items-center justify-between gap-4 p-5 border-b border-border/60">
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground/60 mb-1">Creator&apos;s Fund wallet</p>
              <p className="font-mono text-xs text-foreground/70 truncate">{status.address}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <CopyButton value={status.address} />
              <a
                href={status.voyager}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-border/60 px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:border-border transition-colors"
              >
                Voyager <ExternalLink className="size-3.5 opacity-60" />
              </a>
            </div>
          </div>

          {tokens.length > 0 ? (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-muted-foreground/60">
                  <th className="px-5 py-3 font-medium">Asset</th>
                  <th className="px-5 py-3 font-medium text-right">Balance</th>
                  <th className="px-5 py-3 font-medium text-right hidden sm:table-cell">Price</th>
                  <th className="px-5 py-3 font-medium text-right">Value</th>
                </tr>
              </thead>
              <tbody>
                {tokens.map((t) => (
                  <tr key={t.symbol} className="border-t border-border/40">
                    <td className="px-5 py-3.5">
                      <span className="font-medium text-foreground">{t.name}</span>
                      <span className="ml-2 text-xs text-muted-foreground/60 font-mono">{t.symbol}</span>
                    </td>
                    <td className="px-5 py-3.5 text-right font-mono tabular-nums">{fmtAmount(t.balance)}</td>
                    <td className="px-5 py-3.5 text-right font-mono tabular-nums text-muted-foreground hidden sm:table-cell">
                      {fmtPrice(t.priceUsd)}
                    </td>
                    <td className="px-5 py-3.5 text-right font-mono tabular-nums">{usd(t.usd)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t border-border/60">
                  <td className="px-5 py-3.5 font-semibold text-foreground" colSpan={3}>Total</td>
                  <td className="px-5 py-3.5 text-right font-mono tabular-nums font-semibold text-foreground">
                    {usd(totalUsd)}
                  </td>
                </tr>
              </tfoot>
            </table>
          ) : (
            <p className="p-5 text-sm text-muted-foreground">
              Live balances are temporarily unavailable; view them directly on{' '}
              <a href={status.voyager} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                Voyager
              </a>
              .
            </p>
          )}
        </div>
      </section>

      <section>
        <SectionHeader label="Add to the fund" size="lg" />
        <div className="bento-cell p-6 sm:p-8 max-w-3xl">
          <p className="text-sm text-foreground leading-relaxed max-w-2xl">
            The fund grows on its own from the 1% platform fee, but anyone can top it up. Send any
            token on Starknet to the address below and it joins the next airdrop straight back
            to the community. Every contribution is public and on-chain.
          </p>

          <div className="mt-5 flex flex-col sm:flex-row sm:items-center gap-3">
            <code className="flex-1 min-w-0 truncate rounded-lg bg-muted/50 px-4 py-3 font-mono text-xs text-foreground/80">
              {status.address}
            </code>
            <div className="flex items-center gap-2 shrink-0">
              <CopyButton value={status.address} />
              <a
                href={status.voyager}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-border/60 px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:border-border transition-colors"
              >
                Voyager <ExternalLink className="size-3.5 opacity-60" />
              </a>
            </div>
          </div>

          <p className="mt-4 text-xs text-muted-foreground/60">
            Accepted on Starknet: <span className="font-mono text-muted-foreground">{ACCEPTED}</span>
          </p>
        </div>
      </section>

      <section>
        <SectionHeader label="How it works" size="lg" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {STEPS.map((step, i) => (
            <div key={step.title} className="bento-cell p-6">
              <p className="text-3xl font-black font-mono text-primary mb-3">{i + 1}</p>
              <p className="font-bold text-foreground mb-2">{step.title}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.body}</p>
            </div>
          ))}
        </div>
        <p className="text-sm text-muted-foreground mt-5 max-w-2xl">
          This runs until July 1, 2027. After that, MDLN holders vote each year
          on what happens with the fee.
        </p>
      </section>
    </div>
  )
}
