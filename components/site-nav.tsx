'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  Compass,
  Globe,
  Shield,
  Users,
  Zap,
  Menu,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { navSections } from '@/lib/site-config'
import { ThemeToggle } from '@/components/theme-toggle'
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

const navIcons: Record<string, React.ElementType> = {
  Start: Zap,
  Explore: Compass,
  DAO: Shield,
  Members: Users,
  Connect: Globe,
}

/**
 * Desktop: Fixed right-edge vertical nav with glowing dot indicators
 * Mobile: Fixed bottom bar with icons + drawer for full menu
 */
export function SiteNav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* -------- DESKTOP: Right-edge vertical nav -------- */}
      <nav
        className="fixed right-4 top-1/2 z-50 hidden -translate-y-1/2 flex-col items-center gap-1 lg:flex"
        aria-label="Main navigation"
      >
        <div className="flex flex-col items-center gap-1 rounded-2xl border border-ml-glass-border bg-ml-glass p-2 backdrop-blur-lg">
          {navSections.map((section) => {
            const Icon = navIcons[section.label]
            const isActive = pathname === section.href
            return (
              <Link
                key={section.href}
                href={section.href}
                aria-label={section.label}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'group relative flex size-10 items-center justify-center rounded-xl transition-all duration-300',
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-ml-glow'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                )}
              >
                <Icon className="size-4" />
                {isActive && (
                  <motion.div
                    layoutId="nav-glow"
                    className="absolute inset-0 rounded-xl border border-primary/50"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                {/* Tooltip */}
                <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-lg border border-ml-glass-border bg-ml-glass px-2.5 py-1 text-xs text-foreground opacity-0 backdrop-blur-md transition-opacity group-hover:opacity-100">
                  {section.label}
                  <span className="block text-[10px] text-muted-foreground">
                    {section.description}
                  </span>
                </span>
              </Link>
            )
          })}
          <div className="my-1 h-px w-6 bg-border" />
          <ThemeToggle />
        </div>
      </nav>

      {/* -------- MOBILE: Bottom bar + Drawer -------- */}
      <nav
        className="fixed inset-x-0 bottom-0 z-50 lg:hidden"
        aria-label="Mobile navigation"
      >
        <div className="flex items-center justify-around border-t border-ml-glass-border bg-ml-glass px-2 py-2 backdrop-blur-xl">
          {navSections.map((section) => {
            const Icon = navIcons[section.label]
            const isActive = pathname === section.href
            return (
              <Link
                key={section.href}
                href={section.href}
                aria-label={section.label}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'relative flex flex-col items-center gap-0.5 rounded-lg px-2 py-1.5 text-[10px] transition-colors',
                  isActive
                    ? 'text-primary'
                    : 'text-muted-foreground'
                )}
              >
                <Icon className="size-5" />
                <span className="font-medium">{section.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="mobile-nav-indicator"
                    className="absolute -top-0.5 h-0.5 w-6 rounded-full bg-primary"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </Link>
            )
          })}

          {/* Menu drawer trigger */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label="Open menu"
                className="text-muted-foreground"
              >
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="bottom"
              className="rounded-t-2xl border-t border-ml-glass-border bg-ml-glass backdrop-blur-xl"
            >
              <SheetHeader>
                <SheetTitle className="text-foreground">Medialane DAO</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-2 p-4">
                {navSections.map((section) => {
                  const Icon = navIcons[section.label]
                  const isActive = pathname === section.href
                  return (
                    <Link
                      key={section.href}
                      href={section.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        'flex items-center gap-3 rounded-xl px-4 py-3 transition-colors',
                        isActive
                          ? 'bg-primary/10 text-primary'
                          : 'text-foreground hover:bg-secondary'
                      )}
                    >
                      <Icon className="size-5" />
                      <div>
                        <div className="font-medium">{section.label}</div>
                        <div className="text-xs text-muted-foreground">
                          {section.description}
                        </div>
                      </div>
                    </Link>
                  )
                })}
                <div className="mt-2 flex items-center justify-between px-4">
                  <span className="text-sm text-muted-foreground">Theme</span>
                  <ThemeToggle />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </>
  )
}
