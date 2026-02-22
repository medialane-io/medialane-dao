import Link from 'next/link'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { navSections } from '@/lib/site-config'
import { ThemeToggle } from '@/components/theme-toggle'
import { Zap, Compass, Shield, Users, Globe } from 'lucide-react'

const navIcons: Record<string, React.ComponentType<any>> = {
  Start: Zap,
  Explore: Compass,
  DAO: Shield,
  Members: Users,
  Connect: Globe,
}

interface DesktopNavProps {
  pathname: string
}

export function DesktopNav({ pathname }: DesktopNavProps) {
  return (
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
  )
}
