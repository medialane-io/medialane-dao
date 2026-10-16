'use client'

import { FadeIn, KineticWords } from '@medialane/ui'

interface PageHeroProps {
  eyebrow: string
  title: string
  titlePlain?: string
  gradient?: boolean
  description: string
  children?: React.ReactNode
}

export function PageHero({
  eyebrow,
  title,
  titlePlain,
  gradient = true,
  description,
  children,
}: PageHeroProps) {
  return (
    <div className="relative overflow-hidden pb-2">
      <div className="aurora-blob aurora-purple w-80 h-80 -top-16 -left-16 animate-blob pointer-events-none opacity-60" />
      <div className="aurora-blob aurora-blue w-64 h-64 -bottom-8 right-0 animate-blob-slow pointer-events-none opacity-40" />

      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />

      <FadeIn className="relative z-10">
        <div className="pill-badge inline-flex mb-5">{eyebrow}</div>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.02] mb-5">
          {gradient ? (
            <KineticWords text={title} className="gradient-text block" />
          ) : (
            <span className="text-foreground">{title}</span>
          )}
          {titlePlain && (
            <span className="text-foreground block">{titlePlain}</span>
          )}
        </h1>

        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mb-6">
          {description}
        </p>

        {children}
      </FadeIn>
    </div>
  )
}
