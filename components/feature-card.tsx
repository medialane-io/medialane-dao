'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { MotionCard } from '@medialane/ui'
import { cn } from '@/lib/utils'

function StatusBadge({ status }: { status: string }) {
  const isLive = ['Live', 'Audited', 'Core'].includes(status)
  const isSoon = status === 'Soon'
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-bold tracking-widest uppercase shrink-0',
        isLive
          ? 'bg-emerald-500/10 text-emerald-500 dark:text-emerald-400'
          : isSoon
          ? 'bg-muted text-muted-foreground/40'
          : 'bg-primary/10 text-primary'
      )}
    >
      {isLive && <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />}
      {status}
    </span>
  )
}

interface FeatureCardProps {
  title: string
  description: string
  tags?: string[]
  href?: string | null
  external?: boolean
  status?: string
  icon?: React.ElementType
  iconColor?: string
  gradient?: string
  buttonColor?: string
  featured?: boolean
}

function CardContent({
  title,
  description,
  tags,
  href,
  external,
  status,
  icon: Icon,
  iconColor,
  gradient,
}: Omit<FeatureCardProps, 'featured' | 'buttonColor'>) {
  const hasLink = !!href

  const inner = (
    <MotionCard
      className={cn(
        'bento-cell flex flex-col gap-3 p-5 h-full relative overflow-hidden group',
        'transition-colors duration-200',
        hasLink && 'cursor-pointer hover:border-primary/30',
        gradient && `bg-gradient-to-br ${gradient}`
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-3">
          {Icon && (
            <div className={cn(
              'flex size-9 items-center justify-center rounded-xl shrink-0',
              iconColor ?? 'bg-primary/10 text-primary'
            )}>
              <Icon className="size-4" />
            </div>
          )}
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          {status && <StatusBadge status={status} />}
          {hasLink && (
            <ArrowUpRight className="size-3.5 text-muted-foreground/25 group-hover:text-primary/60 transition-colors" />
          )}
        </div>
      </div>

      <p className={cn(
        'text-sm font-bold text-foreground leading-snug',
        hasLink && 'group-hover:text-primary transition-colors'
      )}>
        {title}
      </p>

      <p className="text-sm text-foreground leading-relaxed flex-1">
        {description}
      </p>

      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-1">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded-full bg-muted/60 border border-border/40 text-muted-foreground/70 font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </MotionCard>
  )

  if (!hasLink) return inner

  if (external) {
    return (
      <a href={href!} target="_blank" rel="noopener noreferrer" className="h-full block">
        {inner}
      </a>
    )
  }

  return (
    <Link href={href!} className="h-full block">
      {inner}
    </Link>
  )
}

export function FeatureCard({ featured, buttonColor: _b, ...props }: FeatureCardProps) {
  if (featured) {
    return (
      <div className="p-[1px] rounded-2xl btn-border-animated h-full">
        <div className="rounded-[calc(1rem-1px)] bg-card h-full">
          <CardContent {...props} />
        </div>
      </div>
    )
  }
  return <CardContent {...props} />
}
