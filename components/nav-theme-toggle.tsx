'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'
import { cn } from '@/lib/utils'

export function NavThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const isDark = mounted ? resolvedTheme === 'dark' : true

  return (
    <div
      role="group"
      aria-label="Theme"
      className="flex items-center gap-0.5 rounded-lg bg-muted/40 p-0.5"
    >
      {[
        { key: 'light', label: 'Light theme', Icon: Sun, active: !isDark },
        { key: 'dark', label: 'Dark theme', Icon: Moon, active: isDark },
      ].map(({ key, label, Icon, active }) => (
        <button
          key={key}
          type="button"
          aria-label={label}
          aria-pressed={active}
          onClick={() => setTheme(key)}
          className={cn(
            'flex h-7 w-7 items-center justify-center rounded-md transition-colors',
            active
              ? 'bg-background text-foreground shadow-sm'
              : 'text-muted-foreground/60 hover:text-foreground',
          )}
        >
          <Icon className="h-3.5 w-3.5" />
        </button>
      ))}
    </div>
  )
}
