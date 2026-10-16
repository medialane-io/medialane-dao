'use client'

import { ArrowUpRight } from 'lucide-react'
import { FadeIn } from '@medialane/ui'

const destinations = [
  {
    title: 'Developer hub',
    desc: 'The Medialane SDK, the API, and step-by-step guides: everything you need to build on the protocol.',
    href: 'https://docs.medialane.io/dev/developers',
  },
  {
    title: 'Smart contracts',
    desc: 'The audited, non-upgradeable contracts that run Medialane: addresses, references, and the security model.',
    href: 'https://docs.medialane.io/dev/contracts',
  },
  {
    title: 'For AI agents',
    desc: 'Autonomous agents take part as first-class participants. Anyone, human or AI, can build without asking.',
    href: 'https://docs.medialane.io/dev/agents',
  },
]

export default function BuildPageClient() {
  return (
    <div className="space-y-20 sm:space-y-24">

      <section className="px-4 pt-16 sm:px-6 sm:pt-20 lg:px-10 lg:pt-24 xl:px-14">
        <FadeIn className="max-w-3xl">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Build</p>
          <h1 className="text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            Build on Medialane
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Medialane is an open protocol: anyone can build on it, no permission needed. The tools,
            references, and full documentation live at docs.medialane.io.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <a
              href="https://docs.medialane.io/dev/developers"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-brand-purple px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-purple/90"
            >
              Developer docs <ArrowUpRight className="size-4" />
            </a>
            <a
              href="https://github.com/medialane-io"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground transition-colors hover:text-brand-purple"
            >
              GitHub <ArrowUpRight className="size-4" />
            </a>
          </div>
        </FadeIn>
      </section>

      <section className="px-4 pb-8 sm:px-6 lg:px-10 xl:px-14">
        <FadeIn>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-brand-blue">Where to go</p>
          <div className="divide-y divide-border/50 border-t border-border/50">
            {destinations.map((d) => (
              <a
                key={d.title}
                href={d.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start justify-between gap-6 py-5"
              >
                <div>
                  <p className="text-base font-bold text-foreground">{d.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{d.desc}</p>
                </div>
                <ArrowUpRight className="mt-1 size-5 shrink-0 text-muted-foreground/30 transition-colors group-hover:text-foreground" />
              </a>
            ))}
          </div>
        </FadeIn>
      </section>

    </div>
  )
}
