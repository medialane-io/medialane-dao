'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Layers, Shield, Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { GlassCard } from '@/components/glass-card'
import { createContainerVariants, createItemVariants } from '@/lib/motion'

const pillars = [
  {
    icon: Layers,
    title: 'Creator Launchpad',
    description: 'A platform for creators to launch and monetize their content.',
  },
  {
    icon: Shield,
    title: 'NFT Marketplace',
    description: 'A marketplace for creators to sell their digital assets.',
  },
  {
    icon: Globe,
    title: 'Programmable IP',
    description: 'Monetize and licensing intellectual property on-chain.',
  },
]

const containerVariants = createContainerVariants(0.15, 0.3)
const itemVariants = createItemVariants({ y: 30, blur: 8, duration: 0.7 })

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
          ORG | DAO
        </motion.div>

        {/* Title */}
        <motion.h1
          variants={itemVariants}
          className="text-balance text-5xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl"
        >
          <Image src="/medialane.png" alt="Medialane" width={300} height={62} className="inline-block" />
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl"
        >
          Monetization hub for the Integrity Web
        </motion.p>

        {/* CTA 
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
        </motion.div>*/}

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
