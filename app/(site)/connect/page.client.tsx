'use client'

import { useState } from 'react'
import { Video, Vote, Copy, Check, ArrowUpRight } from 'lucide-react'
import { FadeIn } from '@medialane/ui'

const socials = [
  {
    name: 'X / Twitter',
    handle: '@medialane_io',
    href: 'https://x.com/medialane_io',
    color: 'bg-violet-500/10 text-violet-500',
    icon: (
      <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L5.09 21.75H1.78l7.509-8.58L1.141 2.25H7.96l4.74 6.255 5.544-6.255zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644z" />
      </svg>
    ),
  },
  {
    name: 'YouTube',
    handle: '@medialaneio',
    href: 'https://www.youtube.com/@medialaneio',
    color: 'bg-rose-500/10 text-rose-500',
    icon: <Video className="size-4" />,
  },
  {
    name: 'Snapshot',
    handle: 'medialane.eth',
    href: 'https://snapshot.org/#/s:medialane.eth',
    color: 'bg-blue-500/10 text-blue-500',
    icon: <Vote className="size-4" />,
  },
]

const quickLinks = [
  { label: 'Open the Medialane app', href: 'https://medialane.io' },
  { label: 'Documentation', href: 'https://docs.medialane.io' },
  { label: 'GitHub', href: 'https://github.com/medialane-io' },
  { label: 'Vote on Snapshot', href: 'https://snapshot.org/#/s:medialane.eth' },
  { label: 'MDLN on Etherscan', href: 'https://etherscan.io/token/0x0DC90d57F3Aa3E836Ffd6E777E543a43A487dB15' },
]

export default function ConnectPageClient() {
  const [copied, setCopied] = useState(false)

  const copyEmail = () => {
    navigator.clipboard.writeText('dao@medialane.org')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-20 sm:space-y-24">

      <section className="px-4 pt-16 sm:px-6 sm:pt-20 lg:px-10 lg:pt-24 xl:px-14">
        <FadeIn className="max-w-3xl">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Connect</p>
          <h1 className="text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            Get involved
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Use the apps, vote on Snapshot, build on the protocol, or just say hello. Medialane is
            open to everyone, with no gate to take part.
          </p>
        </FadeIn>
      </section>

      <section className="px-4 sm:px-6 lg:px-10 xl:px-14">
        <FadeIn className="max-w-2xl">
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl">Email the DAO</h2>
          <p className="mt-3 text-base text-muted-foreground">For inquiries, partnerships, and support.</p>
          <button
            onClick={copyEmail}
            className="mt-5 flex w-full items-center justify-between gap-4 rounded-xl border border-border bg-muted/30 px-5 py-4 text-base font-medium text-foreground transition-colors hover:bg-muted/60"
          >
            dao@medialane.org
            <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
              {copied ? (
                <>
                  <Check className="size-4 text-emerald-500" />
                  <span className="text-emerald-500">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="size-4" />
                  <span>Copy</span>
                </>
              )}
            </span>
          </button>
        </FadeIn>
      </section>

      <section className="px-4 sm:px-6 lg:px-10 xl:px-14">
        <FadeIn>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-brand-purple">Community</p>
          <div className="divide-y divide-border/50 border-t border-border/50">
            {socials.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 py-5"
              >
                <span className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${s.color}`}>
                  {s.icon}
                </span>
                <span className="flex-1">
                  <span className="block text-base font-bold text-foreground">{s.name}</span>
                  <span className="block text-sm text-muted-foreground">{s.handle}</span>
                </span>
                <ArrowUpRight className="size-5 shrink-0 text-muted-foreground/30 transition-colors group-hover:text-foreground" />
              </a>
            ))}
          </div>
        </FadeIn>
      </section>

      <section className="px-4 pb-8 sm:px-6 lg:px-10 xl:px-14">
        <FadeIn>
          <h2 className="mb-6 text-3xl font-black tracking-tight sm:text-4xl">Quick links</h2>
          <div className="divide-y divide-border/50 border-t border-border/50">
            {quickLinks.map((l) => (
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

    </div>
  )
}
