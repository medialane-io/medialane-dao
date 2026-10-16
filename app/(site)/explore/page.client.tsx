'use client'

import Link from 'next/link'
import { ArrowUpRight, ArrowRight } from 'lucide-react'
import { FadeIn } from '@medialane/ui'

type Item = { title: string; desc: string; href?: string; external?: boolean }
type Section = {
  eyebrow: string
  accent: string
  border: string
  heading: string
  intro: string
  items: Item[]
}

const sections: Section[] = [
  {
    eyebrow: 'Create',
    accent: 'text-brand-purple',
    border: 'border-brand-purple/50',
    heading: 'Publish and shape your work',
    intro: 'Turn what you make into something you fully own, in seconds, with no fees and no paperwork.',
    items: [
      {
        title: 'Publish your work',
        desc: 'Register art, music, writing, or video as work you own and can sell. It takes seconds and costs nothing.',
        href: 'https://medialane.io/create/asset',
        external: true,
      },
      {
        title: 'Create a collection',
        desc: 'Group related work into a branded collection: an album, a series, a gallery.',
        href: 'https://medialane.io/create/collection',
        external: true,
      },
      {
        title: 'License and remix',
        desc: 'Let others build on your work under terms you choose. Every remix credits the original automatically.',
        href: 'https://medialane.io/create/licensing',
        external: true,
      },
    ],
  },
  {
    eyebrow: 'Trade',
    accent: 'text-brand-blue',
    border: 'border-brand-blue/50',
    heading: 'Sell, collect, and earn',
    intro: 'A full marketplace for creative work: sell yours, collect others, and earn every time your work changes hands.',
    items: [
      {
        title: 'Sell and make offers',
        desc: 'List your work at a fixed price or take offers from buyers. You stay in control until the moment of sale.',
        href: 'https://medialane.io/marketplace',
        external: true,
      },
      {
        title: 'Earn royalties forever',
        desc: 'Set a royalty once and receive it automatically every time your work is resold, no chasing payments.',
        href: 'https://medialane.io/marketplace',
        external: true,
      },
      {
        title: 'Build your profile',
        desc: 'A dedicated page for your work, your collections, and your story, with content only your collectors can see.',
        href: 'https://medialane.io/creators',
        external: true,
      },
      {
        title: 'Trade creator coins',
        desc: 'Browse and trade creator and community coins, backing the people whose work you believe in.',
        href: 'https://medialane.io/coins',
        external: true,
      },
      {
        title: 'Swap coins and currencies',
        desc: 'Move between coins and currencies in a single step, right inside Medialane.',
        href: 'https://starknet.medialane.io/swap',
        external: true,
      },
    ],
  },
  {
    eyebrow: 'Launch',
    accent: 'text-brand-orange',
    border: 'border-brand-orange/50',
    heading: 'Release work to the world',
    intro: 'Bring an audience to a launch, on your terms, on a schedule you set.',
    items: [
      {
        title: 'Run a drop',
        desc: 'Release a collection to the public with a set size, price, and timing. The rules run themselves.',
        href: 'https://medialane.io/launchpad/drop',
        external: true,
      },
      {
        title: 'Release limited editions',
        desc: 'Offer your work in numbered copies your fans can collect and trade, ideal for music, writing, and prints.',
        href: 'https://medialane.io/launchpad/nfteditions',
        external: true,
      },
      {
        title: 'Launch a creator coin',
        desc: 'Start your own coin and let your community back you. You keep control of the liquidity.',
        href: 'https://medialane.io/launchpad/coin',
        external: true,
      },
      {
        title: 'Launch a memecoin',
        desc: 'Spin up a community coin in a couple of steps, fair-launched and open to everyone from the start.',
        href: 'https://medialane.io/launchpad/memecoin',
        external: true,
      },
      {
        title: 'Give participation badges',
        desc: 'Hand out collectible badges for events, courses, and communities. They belong to the holder for good.',
        href: 'https://medialane.io/launchpad/pop',
        external: true,
      },
      {
        title: 'Sell tickets',
        desc: 'Sell tickets to an event or an experience. They can be resold like any collectible, and you can tell a used one from a valid one at a glance.',
        href: 'https://medialane.io/launchpad/tickets',
        external: true,
      },
      {
        title: 'Run a membership club',
        desc: 'Give your biggest fans a membership card that proves they belong: open to everyone, invite-only, or paid.',
        href: 'https://medialane.io/launchpad/club',
        external: true,
      },
      {
        title: 'Get sponsored',
        desc: 'Offer a sponsorship on a piece you own. Sponsors bid, you pick the one you want, and you get paid directly, no middleman holding the money.',
        href: 'https://medialane.io/launchpad/sponsorship',
        external: true,
      },
    ],
  },
  {
    eyebrow: 'Protect',
    accent: 'text-brand-rose',
    border: 'border-brand-rose/50',
    heading: 'Your rights, built in',
    intro: 'Ownership and protection are not extra steps; they come the moment you publish.',
    items: [
      {
        title: 'Copyright almost everywhere',
        desc: 'Publishing timestamps your work as yours under the same international treaty that protects books and music in nearly every country, instantly, with no registration or lawyers.',
      },
      {
        title: 'You set the terms',
        desc: 'Decide how your work can be used: commercial use, remixes, AI training. The terms are written into your work on-chain and travel with it everywhere, public for anyone to read and honor.',
      },
      {
        title: 'Credit that lasts',
        desc: 'Every use and remix traces back to you. The record cannot be altered, hidden, or taken down.',
      },
    ],
  },
  {
    eyebrow: 'Build',
    accent: 'text-brand-purple',
    border: 'border-brand-purple/50',
    heading: 'Open for developers and AI',
    intro: 'Medialane is an open protocol, open to anyone, human or AI agent, to build on.',
    items: [
      {
        title: 'Developer tools and docs',
        desc: 'The SDK, contracts, and guides for building on Medialane.',
        href: 'https://docs.medialane.io/dev/developers',
        external: true,
      },
      {
        title: 'For AI agents',
        desc: 'Autonomous agents take part as first-class participants, no special access needed.',
        href: '/build',
        external: false,
      },
    ],
  },
]

function ItemCell({ item, index, section }: { item: Item; index: number; section: Section }) {
  const inner = (
    <>
      <div className="flex items-center gap-2.5">
        <span className={`font-mono text-xs font-bold ${section.accent}`}>
          {String(index + 1).padStart(2, '0')}
        </span>
        <p className="text-base font-bold text-foreground">{item.title}</p>
        {item.href &&
          (item.external ? (
            <ArrowUpRight className="size-4 shrink-0 text-muted-foreground/30 transition-colors group-hover:text-foreground" />
          ) : (
            <ArrowRight className="size-4 shrink-0 text-muted-foreground/30 transition-colors group-hover:text-foreground" />
          ))}
      </div>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
    </>
  )
  const cellClass = `block border-t-2 ${section.border} pt-4`
  if (!item.href) return <div className={cellClass}>{inner}</div>
  return item.external ? (
    <a href={item.href} target="_blank" rel="noopener noreferrer" className={`group ${cellClass}`}>
      {inner}
    </a>
  ) : (
    <Link href={item.href} className={`group ${cellClass}`}>
      {inner}
    </Link>
  )
}

export default function ExplorePageClient() {
  return (
    <div className="space-y-20 sm:space-y-28">

      <section className="px-4 pt-16 sm:px-6 sm:pt-20 lg:px-10 lg:pt-24 xl:px-14">
        <FadeIn className="max-w-3xl">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
            Explore
          </p>
          <h1 className="text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            Everything you can do on Medialane
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            One place to create, protect, sell, and grow your creative work, and a community that
            owns the platform together.
          </p>
        </FadeIn>
      </section>

      {sections.map((s) => (
        <section key={s.eyebrow} className="px-4 sm:px-6 lg:px-10 xl:px-14">
          <FadeIn>
            <div className="grid gap-x-12 gap-y-8 lg:grid-cols-[minmax(0,22rem)_1fr]">
              <div>
                <p className={`mb-3 text-xs font-bold uppercase tracking-[0.2em] ${s.accent}`}>{s.eyebrow}</p>
                <h2 className="text-3xl font-black tracking-tight sm:text-4xl">{s.heading}</h2>
                <p className="mt-3 max-w-md text-base leading-relaxed text-muted-foreground">{s.intro}</p>
              </div>
              <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2">
                {s.items.map((item, i) => (
                  <ItemCell key={item.title} item={item} index={i} section={s} />
                ))}
              </div>
            </div>
          </FadeIn>
        </section>
      ))}

      <section className="px-4 pb-8 sm:px-6 lg:px-10 xl:px-14">
        <FadeIn>
          <div className="rounded-2xl bg-gradient-to-br from-brand-blue/10 via-brand-purple/5 to-transparent p-8 sm:p-12">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-brand-blue">Simple by design</p>
            <h2 className="max-w-2xl text-3xl font-black tracking-tight sm:text-4xl">No crypto experience needed</h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Sign in with an email and start in minutes. You never pay a network fee, and there are
              no wallets to manage or jargon to learn; Medialane handles the hard parts so you can
              focus on your work.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <a
                href="https://medialane.io"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-brand-purple px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-purple/90"
              >
                Open the app <ArrowUpRight className="size-4" />
              </a>
              <a
                href="https://docs.medialane.io/learn/media-wallet"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-brand-purple hover:underline"
              >
                How the account technology works <ArrowUpRight className="size-4" />
              </a>
            </div>
          </div>
        </FadeIn>
      </section>

    </div>
  )
}
