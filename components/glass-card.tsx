'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

interface GlassCardProps extends React.ComponentProps<'div'> {
  intensity?: 'light' | 'medium' | 'heavy'
}

export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ intensity = 'medium', className, children, ...props }, ref) => {
    const blurMap = {
      light: 'backdrop-blur-sm',
      medium: 'backdrop-blur-md',
      heavy: 'backdrop-blur-xl',
    }

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-xl border border-ml-glass-border bg-ml-glass',
          blurMap[intensity],
          'shadow-lg transition-all duration-300',
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
GlassCard.displayName = 'GlassCard'
