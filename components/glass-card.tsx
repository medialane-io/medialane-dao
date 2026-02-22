import * as React from 'react'
import { Card, CardProps } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface GlassCardProps extends CardProps {
  intensity?: 'light' | 'medium' | 'heavy'
}

export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ intensity = 'medium', className, ...props }, ref) => {
    const blurMap = {
      light: 'backdrop-blur-sm',
      medium: 'backdrop-blur-md',
      heavy: 'backdrop-blur-xl',
    }

    return (
      <Card
        ref={ref}
        className={cn(
          'rounded-xl border border-ml-glass-border bg-ml-glass',
          blurMap[intensity],
          'shadow-lg transition-all duration-300',
          className
        )}
        {...props}
      />
    )
  }
)
GlassCard.displayName = 'GlassCard'
