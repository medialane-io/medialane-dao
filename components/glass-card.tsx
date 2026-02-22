import { cn } from '@/lib/utils'

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  intensity?: 'light' | 'medium' | 'heavy'
}

export function GlassCard({
  children,
  className,
  intensity = 'medium',
  ...props
}: GlassCardProps) {
  const blurMap = {
    light: 'backdrop-blur-sm',
    medium: 'backdrop-blur-md',
    heavy: 'backdrop-blur-xl',
  }

  return (
    <div
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
