'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Layers, Shield, Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { GlassCard } from '@/components/glass-card'

const pillars = [
  {
    icon: Layers,
    title: 'Media Lanes',
    description: 'Decentralized content pathways verified on-chain.',
  },
  {
    icon: Shield,
    title: 'Integrity Web',
    description: 'A trust layer for media authenticity and provenance.',
  },
  {
    icon: Globe,
    title: 'Starknet Native',
    description: 'Built on Starknet for scalable, transparent governance.',
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

export function HeroSection() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-4 py-20 lg:px-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex max-w-3xl flex-col items-center gap-8 text-center"
      >
        {/* Overline */}
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 rounded-full border border-ml-glass-border bg-ml-glass px-4 py-1.5 text-xs font-medium tracking-widest uppercase text-muted-foreground backdrop-blur-md"
        >
          <span className="inline-block size-1.5 rounded-full bg-ml-orange" />
          Decentralized Autonomous Organization
        </motion.div>

        {/* Title */}
        <motion.h1
          variants={itemVariants}
          className="text-balance text-5xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl"
        >
          Media<span className="text-primary">lane</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl"
        >
          Digital media lanes in the integrity web. Decentralized governance for
          a transparent media ecosystem on Starknet.
        </motion.p>

        {/* CTA */}
        <motion.div variants={itemVariants} className="flex gap-3">
          <Button asChild size="lg" className="gap-2 shadow-lg shadow-ml-glow">
            <Link href="/explore">
              Explore
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="border-ml-glass-border bg-ml-glass backdrop-blur-md">
            <Link href="/connect">Connect</Link>
          </Button>
        </motion.div>

        {/* Pillar cards */}
        <motion.div
          variants={itemVariants}
          className="mt-8 grid w-full gap-4 sm:grid-cols-3"
        >
          {pillars.map((pillar) => (
            <GlassCard
              key={pillar.title}
              intensity="light"
              className="flex flex-col items-center gap-3 p-6 text-center transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-ml-glow/20"
            >
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <pillar.icon className="size-5" />
              </div>
              <h3 className="text-sm font-semibold text-foreground">
                {pillar.title}
              </h3>
              <p className="text-xs leading-relaxed text-muted-foreground">
                {pillar.description}
              </p>
            </GlassCard>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
