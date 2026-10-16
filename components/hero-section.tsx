'use client'

import Link from 'next/link'
import {
  ArrowUpRight,
  ArrowRight,
  Sparkles,
  Layers,
  Coins,
  Rocket,
  GitFork,
  BadgeCheck,
  Ticket,
  Users,
  Handshake,
} from 'lucide-react'
import { FadeIn } from '@medialane/ui'
import type { ShowcaseCollection } from '@/lib/showcase'
import { AssetMosaic } from '@/components/elements/asset-mosaic'

const pillars = [
  {
    eyebrow: 'Own',
    title: 'Own what you make',
    body: 'Publish anything and get a copyright record that is timestamped the moment you hit publish: provably yours, no paperwork and no waiting.',
    color: 'text-brand-blue',
  },
  {
    eyebrow: 'Earn',
    title: 'Earn however you want',
    body: 'Sell it, license it, release editions, run a drop, or launch your own coin. Royalties follow your work everywhere it travels, on every resale.',
    color: 'text-brand-purple',
  },
  {
    eyebrow: 'Open',
    title: 'Open to everyone',
    body: 'Free to join, with no application and no gatekeepers. People and AI creators take part the same way, as equals.',
    color: 'text-brand-orange',
  },
  {
    eyebrow: 'Together',
    title: 'Run by its community',
    body: 'No company sits above it. The people who use Medialane decide together how it grows, and every decision is made in the open.',
    color: 'text-brand-rose',
  },
]

const guarantees = [
  {
    title: 'Your work stays yours',
    body: 'Medialane never holds it. Take it to any other app or marketplace, anytime.',
    dot: 'bg-brand-blue',
  },
  {
    title: 'No gatekeepers',
    body: 'No application, no approval. Publish, sell, and get paid without asking permission.',
    dot: 'bg-brand-purple',
  },
  {
    title: 'Nothing gets taken down or rewritten',
    body: 'Your record lives on a public ledger no company controls, not even us.',
    dot: 'bg-brand-orange',
  },
  {
    title: 'Don’t trust us: check',
    body: 'Every fee, sale, and payment is public and provable on-chain.',
    dot: 'bg-brand-rose',
  },
  {
    title: 'For people and AI alike',
    body: 'Humans, studios, and AI agents take part on the same terms.',
    dot: 'bg-brand-blue',
  },
]

const services = [
  {
    icon: Sparkles,
    title: 'Single editions',
    desc: 'Publish a song, photo, film, or any file as a one-of-a-kind piece under your own name.',
    href: 'https://medialane.io/create/asset',
    soft: 'bg-brand-purple/10 text-brand-purple',
    text: 'text-brand-purple',
  },
  {
    icon: Layers,
    title: 'Limited editions',
    desc: 'Release your work in numbered copies your fans can collect and trade.',
    href: 'https://medialane.io/launchpad/nfteditions',
    soft: 'bg-brand-blue/10 text-brand-blue',
    text: 'text-brand-blue',
  },
  {
    icon: Coins,
    title: 'Creator coins',
    desc: 'Launch your own coin and let your community back you; you keep control of it.',
    href: 'https://medialane.io/launchpad/coin',
    soft: 'bg-brand-orange/10 text-brand-orange',
    text: 'text-brand-orange',
  },
  {
    icon: Rocket,
    title: 'Collection drop',
    desc: 'Schedule a release and let your audience mint while the window is open.',
    href: 'https://medialane.io/launchpad/drop',
    soft: 'bg-brand-rose/10 text-brand-rose',
    text: 'text-brand-rose',
  },
  {
    icon: GitFork,
    title: 'Licensing & remix',
    desc: 'Let others build on your work, with credit and royalties flowing back to you.',
    href: 'https://medialane.io/create/licensing',
    soft: 'bg-brand-purple/10 text-brand-purple',
    text: 'text-brand-purple',
  },
  {
    icon: BadgeCheck,
    title: 'Proof of participation',
    desc: 'Give your community a badge proving they were part of the moment.',
    href: 'https://medialane.io/launchpad/pop',
    soft: 'bg-brand-blue/10 text-brand-blue',
    text: 'text-brand-blue',
  },
  {
    icon: Ticket,
    title: 'Tickets',
    desc: 'Sell tickets to an event or an experience: real, resellable, and impossible to fake.',
    href: 'https://medialane.io/launchpad/tickets',
    soft: 'bg-brand-orange/10 text-brand-orange',
    text: 'text-brand-orange',
  },
  {
    icon: Users,
    title: 'Membership club',
    desc: 'Run a club for your biggest fans: open, invite-only, or paid, your call.',
    href: 'https://medialane.io/launchpad/club',
    soft: 'bg-brand-purple/10 text-brand-purple',
    text: 'text-brand-purple',
  },
  {
    icon: Handshake,
    title: 'Sponsorship',
    desc: 'Let sponsors bid on your work and get paid directly, no middleman holding the money.',
    href: 'https://medialane.io/launchpad/sponsorship',
    soft: 'bg-brand-rose/10 text-brand-rose',
    text: 'text-brand-rose',
  },
]

const explore = [
  { href: '/explore', title: 'Explore Medialane', desc: 'What you can do, and how it all works.' },
  { href: '/creators-fund', title: "Creator's Fund", desc: 'Watch every fee return to the community, live.' },
  { href: '/dao', title: 'Governance', desc: 'Proposals, voting, and how decisions get made.' },
  { href: '/airdrop', title: "Creator's Airdrop", desc: 'How the fees reach everyone taking part.' },
  { href: '/guidelines', title: 'Guidelines', desc: 'The documents the community runs on.' },
  { href: '/connect', title: 'Connect', desc: 'Get involved and meet the community.' },
]

export function HeroSection({ collections }: { collections: ShowcaseCollection[] }) {
  return (
    <div className="space-y-20 sm:space-y-28">

      <section className="px-4 pt-16 sm:px-6 sm:pt-20 lg:px-10 lg:pt-24 xl:px-14">
        <FadeIn className="max-w-3xl">
          <h1 className="text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            <span className="text-brand-purple">Create it.</span>{' '}
            <span className="text-brand-blue">Own it.</span>
            <br />
            <span className="text-brand-orange">Earn from it.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Medialane is the home for creative work, where anyone who creates, from artists and
            studios to AI agents, earns from what they make and keeps full ownership of it. Built
            and run by the people who use it.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <a
              href="https://medialane.io"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-brand-purple px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-purple/90"
            >
              Open the app <ArrowUpRight className="size-4" />
            </a>
            <Link
              href="/explore"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground transition-colors hover:text-brand-purple"
            >
              See how it works <ArrowRight className="size-4" />
            </Link>
          </div>
        </FadeIn>
      </section>

      {collections.length > 0 && (
        <section>
          <p className="mb-5 px-4 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/60 sm:px-6 lg:px-10 xl:px-14">
            Created on Medialane
          </p>
          <AssetMosaic items={collections} />
        </section>
      )}

      <section className="px-4 sm:px-6 lg:px-10 xl:px-14">
        <FadeIn>
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
            What you can do on Medialane
          </h2>
          <p className="mt-3 max-w-2xl text-base text-muted-foreground">
            Everything a creator needs to publish, own, and earn from their work, on a platform the
            creators run themselves.
          </p>
          <div className="mt-12 grid gap-x-12 gap-y-12 sm:grid-cols-2">
            {pillars.map((p) => (
              <div key={p.title} className="border-t border-border/50 pt-6">
                <p className={`text-xs font-bold uppercase tracking-[0.2em] ${p.color}`}>{p.eyebrow}</p>
                <h3 className="mt-3 text-2xl font-black tracking-tight sm:text-3xl">{p.title}</h3>
                <p className="mt-3 max-w-md text-base leading-relaxed text-muted-foreground">{p.body}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      <section className="px-4 sm:px-6 lg:px-10 xl:px-14">
        <FadeIn>
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl">What you can count on</h2>
          <p className="mt-3 max-w-2xl text-base text-muted-foreground">
            Not promises: properties of how Medialane is built. Each one is something you can
            check for yourself.
          </p>
          <div className="mt-10 divide-y divide-border/50 border-t border-border/50">
            {guarantees.map((g) => (
              <div
                key={g.title}
                className="grid gap-2 py-6 sm:grid-cols-[minmax(0,20rem)_1fr] sm:gap-10"
              >
                <div className="flex items-center gap-3">
                  <span className={`size-2 shrink-0 rounded-full ${g.dot}`} />
                  <h3 className="text-lg font-bold tracking-tight text-foreground">{g.title}</h3>
                </div>
                <p className="text-base leading-relaxed text-muted-foreground">{g.body}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      <section className="px-4 sm:px-6 lg:px-10 xl:px-14">
        <FadeIn>
          <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-brand-blue">Launchpad</p>
              <h2 className="text-3xl font-black tracking-tight sm:text-4xl">Ways to create and earn</h2>
            </div>
            <a
              href="https://medialane.io/launchpad"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue transition-opacity hover:opacity-80"
            >
              Open the launchpad <ArrowUpRight className="size-4" />
            </a>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map(({ icon: Icon, title, desc, href, text, soft }) => (
              <a
                key={title}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col rounded-2xl border border-border/60 p-6 transition-colors hover:border-foreground/20"
              >
                <span className={`flex size-11 items-center justify-center rounded-xl ${soft}`}>
                  <Icon className="size-5" />
                </span>
                <p className="mt-5 text-lg font-bold text-foreground">{title}</p>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{desc}</p>
                <span className={`mt-5 inline-flex items-center gap-1.5 text-sm font-semibold ${text}`}>
                  Open <ArrowUpRight className="size-4" />
                </span>
              </a>
            ))}
          </div>
        </FadeIn>
      </section>

      <section className="px-4 sm:px-6 lg:px-10 xl:px-14">
        <FadeIn>
          <div className="rounded-2xl bg-gradient-to-br from-brand-orange/12 via-brand-rose/6 to-brand-purple/12 p-8 sm:p-12">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-brand-orange" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-orange">
                Live · Creator&apos;s Airdrop
              </span>
            </div>
            <h2 className="mt-4 max-w-2xl text-3xl font-black tracking-tight sm:text-4xl">
              The fees come back to the community
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Every sale carries a 1% fee; minting is always free. It collects in one public wallet,
              and each time it reaches $1,000 it is shared with everyone taking part. Joining is free.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-5">
              <Link
                href="/airdrop"
                className="inline-flex items-center gap-2 rounded-xl bg-brand-orange px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-orange/90"
              >
                See the Creator&apos;s Airdrop <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/creators-fund"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground transition-colors hover:text-brand-orange"
              >
                Track the fund <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </FadeIn>
      </section>

      <section className="px-4 pb-8 sm:px-6 lg:px-10 xl:px-14">
        <FadeIn>
          <h2 className="mb-8 text-3xl font-black tracking-tight sm:text-4xl">Go further</h2>
          <div className="grid gap-px overflow-hidden rounded-2xl bg-border/60 sm:grid-cols-2 lg:grid-cols-3">
            {explore.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="group flex flex-col justify-between gap-6 bg-background p-6 transition-colors hover:bg-muted/40"
              >
                <span className="text-base font-bold text-foreground transition-colors group-hover:text-brand-purple">
                  {l.title}
                </span>
                <span className="flex items-end justify-between gap-4">
                  <span className="text-sm leading-relaxed text-muted-foreground">{l.desc}</span>
                  <ArrowRight className="size-5 shrink-0 text-muted-foreground/30 transition-colors group-hover:text-brand-purple" />
                </span>
              </Link>
            ))}
          </div>
        </FadeIn>
      </section>

    </div>
  )
}
