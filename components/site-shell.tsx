'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Menu } from 'lucide-react'
import { NavCommandMenu, useNavCommandMenu } from '@medialane/ui'
import { NAV_COMMANDS } from '@/lib/nav-commands'
import { NavThemeToggle } from '@/components/nav-theme-toggle'
import { NavCta } from '@/components/nav-cta'

function NavTrigger() {
  const { open } = useNavCommandMenu()
  return (
    <button
      onClick={open}
      className="flex items-center gap-1.5 focus-visible:outline-none group"
      aria-label="Open navigation"
    >
      <Image
        src="/medialane-icon.png"
        alt="Medialane"
        width={32}
        height={32}
        className="h-8 w-8 opacity-90 group-hover:opacity-100 transition-opacity"
      />
      <Menu className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
    </button>
  )
}

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavCommandMenu
        commands={NAV_COMMANDS}
        accountSlot={<NavCta />}
        footerSlot={<NavThemeToggle />}
      />
      <div className="relative min-h-screen flex flex-col bg-background">
        <div className="fixed top-4 left-4 sm:left-6 lg:left-8 z-50 flex items-center gap-1.5">
          <NavTrigger />
        </div>
        <main className="min-w-0 flex-1 overflow-x-hidden">{children}</main>
        <footer className="px-4 sm:px-6 lg:px-8 py-8 mt-auto border-t border-border/60">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p className="text-xs">© {new Date().getFullYear()} Medialane DAO</p>
            <nav className="flex items-center gap-4 flex-wrap justify-center text-xs">
              <Link href="/dao" className="hover:text-foreground transition-colors">Governance</Link>
              <Link href="/explore" className="hover:text-foreground transition-colors">Protocol</Link>
              <Link href="/token" className="hover:text-foreground transition-colors">Token</Link>
              <Link href="/build" className="hover:text-foreground transition-colors">Build</Link>
              <Link href="/airdrop" className="hover:text-foreground transition-colors">Airdrop</Link>
              <Link href="/creators-fund" className="hover:text-foreground transition-colors">Creator's Fund</Link>
              <Link href="/guidelines" className="hover:text-foreground transition-colors">Guidelines</Link>
              <Link href="/connect" className="hover:text-foreground transition-colors">Connect</Link>
              <a href="https://medialane.io" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">App ↗</a>
            </nav>
          </div>
        </footer>
      </div>
    </>
  )
}
