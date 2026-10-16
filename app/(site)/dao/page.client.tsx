'use client'

import Link from 'next/link'
import { siteConfig, mdln } from '@/lib/site-config'
import type { SnapshotProposal, MdlnStats } from '@/lib/governance'
import { ArrowUpRight, ArrowRight } from 'lucide-react'
import { FadeIn } from '@medialane/ui'

function timeLeft(end: number): string | null {
  const diff = end * 1000 - Date.now()
  if (diff <= 0) return null
  const days = Math.floor(diff / 86_400_000)
  const hours = Math.floor((diff % 86_400_000) / 3_600_000)
  return days > 0 ? `${days}d left` : `${hours}h left`
}

const stateConfig = {
  active: { label: 'Active', dot: 'bg-emerald-500', text: 'text-emerald-600 dark:text-emerald-400', pulse: true },
  pending: { label: 'Pending', dot: 'bg-amber-500', text: 'text-amber-600 dark:text-amber-400', pulse: false },
  closed: { label: 'Closed', dot: 'bg-muted-foreground/30', text: 'text-muted-foreground/50', pulse: false },
}

function ProposalRow({ p }: { p: SnapshotProposal }) {
  const cfg = stateConfig[p.state] ?? stateConfig.closed
  const remaining = p.state === 'active' ? timeLeft(p.end) : null
  return (
    <a
      href={p.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-start justify-between gap-4 py-5"
    >
      <div className="min-w-0">
        <div className="mb-1.5 flex items-center gap-2">
          <span className="relative flex size-2 shrink-0">
            {cfg.pulse && (
              <span className={`absolute inline-flex size-full animate-ping rounded-full opacity-75 ${cfg.dot}`} />
            )}
            <span className={`relative inline-flex size-2 rounded-full ${cfg.dot}`} />
          </span>
          <span className={`text-[10px] font-bold uppercase tracking-widest ${cfg.text}`}>{cfg.label}</span>
          {remaining && <span className="text-[10px] text-muted-foreground/40">· {remaining}</span>}
        </div>
        <p className="line-clamp-2 text-base font-bold leading-snug text-foreground">{p.title}</p>
        {p.votes > 0 && (
          <p className="mt-1 text-xs text-muted-foreground/60">
            {p.votes.toLocaleString()} vote{p.votes !== 1 ? 's' : ''}
            {p.scores_total > 0 && ` · ${(p.scores_total / 1_000_000).toFixed(2)}M MDLN`}
          </p>
        )}
      </div>
      <ArrowUpRight className="mt-1 size-5 shrink-0 text-muted-foreground/30 transition-colors group-hover:text-foreground" />
    </a>
  )
}

interface DAOPageClientProps {
  documents: Record<string, { title: string; contentHtml: string }>
  proposals: SnapshotProposal[]
  stats: MdlnStats
}

export default function DAOPageClient({ documents, proposals, stats }: DAOPageClientProps) {
  const steps = [
    'Get MDLN on Ethereum, or on Starknet: both work the same for voting.',
    'Connect your wallet to Snapshot at medialane.eth.',
    'Vote on any open proposal. One MDLN is one vote, and voting is free.',
  ]

  const links = [
    { label: 'MDLN token', href: mdln.etherscanToken },
    { label: 'Vesting contract', href: mdln.etherscanVesting },
    { label: 'DAO treasury', href: mdln.etherscanTreasury },
    { label: 'Snapshot · medialane.eth', href: siteConfig.snapshot },
  ]

  return (
    <div className="space-y-20 sm:space-y-24">

      <section className="px-4 pt-16 sm:px-6 sm:pt-20 lg:px-10 lg:pt-24 xl:px-14">
        <FadeIn className="max-w-3xl">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Governance</p>
          <h1 className="text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            Medialane belongs to its community
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            The people who use Medialane decide how it grows. Anyone holding the MDLN token can
            propose changes and vote on them, and every decision is made in the open.
          </p>
          {stats.holders != null && stats.holders > 0 && (
            <p className="mt-5 text-sm text-muted-foreground/60">
              {stats.holders.toLocaleString()} people already hold MDLN and can vote.
            </p>
          )}
        </FadeIn>
      </section>

      <section className="px-4 sm:px-6 lg:px-10 xl:px-14">
        <FadeIn className="max-w-3xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-brand-orange">Revenue</p>
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl">A small fee, returned to creators</h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Medialane charges a small 1% fee on earnings, and all of it goes back. For the first year it
            funds the Creator&apos;s Airdrop, sharing platform revenue with everyone who takes part.
            Each year after, MDLN holders vote together on what the fee should support.
          </p>
          <Link
            href="/airdrop"
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-orange transition-opacity hover:opacity-80"
          >
            See the Creator&apos;s Airdrop <ArrowRight className="size-4" />
          </Link>
        </FadeIn>
      </section>

      <section className="px-4 sm:px-6 lg:px-10 xl:px-14">
        <FadeIn>
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h2 className="text-3xl font-black tracking-tight sm:text-4xl">Proposals</h2>
            <a
              href={siteConfig.snapshot}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-purple transition-opacity hover:opacity-80"
            >
              Vote on Snapshot <ArrowUpRight className="size-4" />
            </a>
          </div>
          {proposals.length === 0 ? (
            <p className="mt-6 border-t border-border/50 pt-8 text-base text-muted-foreground">
              No proposals yet;{' '}
              <a
                href={siteConfig.snapshot}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-brand-purple hover:underline"
              >
                be the first to propose one
              </a>
              .
            </p>
          ) : (
            <div className="mt-4 divide-y divide-border/50 border-t border-border/50">
              {proposals.map((p) => (
                <ProposalRow key={p.id} p={p} />
              ))}
            </div>
          )}
        </FadeIn>
      </section>

      <section className="px-4 sm:px-6 lg:px-10 xl:px-14">
        <FadeIn className="max-w-3xl">
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl">How to vote</h2>
          <ol className="mt-6 space-y-5">
            {steps.map((s, i) => (
              <li key={s} className="flex gap-4">
                <span className="font-mono text-2xl font-black leading-none text-brand-purple/40">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="pt-0.5 text-base leading-relaxed text-foreground">{s}</p>
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

      {Object.keys(documents).length > 0 && (
        <section className="px-4 sm:px-6 lg:px-10 xl:px-14">
          <FadeIn>
            <h2 className="mb-8 text-3xl font-black tracking-tight sm:text-4xl">Founding documents</h2>
            <div className="grid gap-px overflow-hidden rounded-2xl bg-border/60 sm:grid-cols-2">
              {Object.entries(documents).map(([slug, doc]) => (
                <Link
                  key={slug}
                  href={`/guidelines/${slug}`}
                  className="group flex items-center justify-between gap-4 bg-background p-6 transition-colors hover:bg-muted/40"
                >
                  <span className="text-base font-bold text-foreground transition-colors group-hover:text-brand-purple">
                    {doc.title}
                  </span>
                  <ArrowRight className="size-5 shrink-0 text-muted-foreground/30 transition-colors group-hover:text-brand-purple" />
                </Link>
              ))}
            </div>
          </FadeIn>
        </section>
      )}

      <section className="px-4 pb-8 sm:px-6 lg:px-10 xl:px-14">
        <FadeIn className="max-w-3xl">
          <h2 className="mb-6 text-3xl font-black tracking-tight sm:text-4xl">Contracts</h2>
          <div className="divide-y divide-border/50 border-t border-border/50">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-4 py-4 text-base font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {l.label}
                <ArrowUpRight className="size-5 shrink-0 text-muted-foreground/30 transition-colors group-hover:text-foreground" />
              </a>
            ))}
          </div>
        </FadeIn>
      </section>

    </div>
  )
}
