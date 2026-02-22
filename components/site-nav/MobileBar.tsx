import Link from 'next/link'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { navSections } from '@/lib/site-config'

import { Zap, Compass, Shield, Users, Globe } from 'lucide-react'

const navIcons: Record<string, React.ComponentType<any>> = {
  Start: Zap,
  Explore: Compass,
  DAO: Shield,
  Members: Users,
  Connect: Globe,
}

interface MobileBarProps {
  pathname: string
}

export function MobileBar({ pathname }: MobileBarProps) {
  return (
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
      </div>
    </nav>
  )
}
