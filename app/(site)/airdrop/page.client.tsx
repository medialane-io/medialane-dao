'use client'

import Link from 'next/link'
import { ArrowUpRight, ArrowRight } from 'lucide-react'
import { FadeIn } from '@medialane/ui'
import { creatorsFund } from '@/lib/site-config'

const rounds = [
  {
    title: 'Each distribution',
    desc: 'Every time the Creator’s Fund reaches its threshold, that amount is airdropped to everyone taking part.',
  },
  {
    title: 'Year one',
    desc: 'All platform revenue is returned to the community this way; the campaign runs until July 1, 2027.',
  },
  {
    title: 'After year one',
    desc: 'MDLN holders vote each year on what the fee should support next.',
  },
]

const fair = [
  'Everything is public: every distribution and every payment can be checked by anyone.',
  'Real activity only: bot and duplicate accounts are excluded automatically.',
  'Full-cycle scoring: your share reflects the whole campaign.',
  'Community rules: MDLN holders can adjust how shares are decided.',
]

const steps = [
  {
    title: 'Create your account',
    desc: 'Sign up at medialane.io with an email. That alone includes you in the airdrop.',
  },
  {
    title: 'Create and collect',
    desc: 'Publish work, build collections, collect and trade. Every action earns XP.',
  },
  {
    title: 'Receive your share',
    desc: 'When a distribution goes out, your XP decides your share; there is nothing to claim by hand.',
  },
]

export default function AirdropPageClient() {
  return (
    <div className="space-y-20 sm:space-y-24">

      <section className="px-4 pt-16 sm:px-6 sm:pt-20 lg:px-10 lg:pt-24 xl:px-14">
        <FadeIn className="max-w-3xl">
          <div className="mb-5 flex items-center gap-2">
            <span className="size-2 rounded-full bg-brand-orange" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-orange">Live</span>
          </div>
          <h1 className="text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            The Creator&apos;s Airdrop
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            All of Medialane&apos;s revenue flows back to the people who use it. As the platform
            earns, the money is shared with the community, and taking part is free.
          </p>
        </FadeIn>
      </section>

      <section className="px-4 sm:px-6 lg:px-10 xl:px-14">
        <FadeIn className="max-w-3xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-brand-orange">How it works</p>
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl">A simple, repeating cycle</h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Medialane charges a small 1% fee on earnings, and all of it goes back. The fee collects
            in the Creator&apos;s Fund. Each time the Fund reaches its threshold, that amount is shared
            with everyone taking part, weighted by how active they have been.
          </p>
        </FadeIn>
      </section>

      <section className="px-4 sm:px-6 lg:px-10 xl:px-14">
        <FadeIn>
          <h2 className="mb-6 text-3xl font-black tracking-tight sm:text-4xl">Distributions</h2>
          <div className="divide-y divide-border/50 border-t border-border/50">
            {rounds.map((r) => (
              <div key={r.title} className="py-5">
                <p className="text-base font-bold text-foreground">{r.title}</p>
                <p className="mt-1 max-w-2xl text-sm leading-relaxed text-muted-foreground">{r.desc}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      <section className="px-4 sm:px-6 lg:px-10 xl:px-14">
        <FadeIn className="max-w-3xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-brand-purple">Your share</p>
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl">The more you take part, the more you receive</h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Your share of each distribution is decided by your XP, earned by creating,
            collecting, and trading on Medialane. Every active participant is included, people
            and AI agents alike, judged purely by what they do. Doing more simply earns a
            larger share.
          </p>
        </FadeIn>
      </section>

      <section className="px-4 sm:px-6 lg:px-10 xl:px-14">
        <FadeIn className="max-w-3xl">
          <h2 className="mb-6 text-3xl font-black tracking-tight sm:text-4xl">Fair by design</h2>
          <ul className="divide-y divide-border/50 border-t border-border/50">
            {fair.map((item) => (
              <li key={item} className="py-4 text-base leading-relaxed text-foreground">
                {item}
              </li>
            ))}
          </ul>
        </FadeIn>
      </section>

      <section className="px-4 sm:px-6 lg:px-10 xl:px-14">
        <FadeIn className="max-w-3xl">
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl">How to take part</h2>
          <ol className="mt-6 space-y-5">
            {steps.map((s, i) => (
              <li key={s.title} className="flex gap-4">
                <span className="font-mono text-2xl font-black leading-none text-brand-orange/50">
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
            href="https://medialane.io"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-brand-orange px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-orange/90"
          >
            Get started <ArrowUpRight className="size-4" />
          </a>
        </FadeIn>
      </section>

      <section className="px-4 sm:px-6 lg:px-10 xl:px-14">
        <FadeIn>
          <div className="rounded-2xl bg-gradient-to-br from-brand-blue/10 via-brand-purple/5 to-brand-orange/10 p-8 sm:p-12">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-brand-blue">Fully transparent</p>
            <h2 className="max-w-2xl text-3xl font-black tracking-tight sm:text-4xl">
              Watch the Creator&apos;s Fund in real time
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              The Creator&apos;s Fund is a public wallet. Anyone can see its balance, every
              distribution, and every payment, with nothing hidden.
            </p>
            <Link
              href="/creators-fund"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-brand-blue px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-blue/90"
            >
              View the Creator&apos;s Fund <ArrowRight className="size-4" />
            </Link>
            <p className="mt-5 break-all font-mono text-xs text-muted-foreground/60">{creatorsFund.address}</p>
          </div>
        </FadeIn>
      </section>

      <section className="px-4 pb-8 sm:px-6 lg:px-10 xl:px-14">
        <p className="max-w-2xl text-xs leading-relaxed text-muted-foreground/50">
          Airdrop rules are governed by MDLN holders and may change between cycles. The Creator&apos;s
          Airdrop is one of several ways the community can choose to use platform revenue, not a
          guaranteed allocation. All qualifying activity is verified publicly.
        </p>
      </section>

    </div>
  )
}
