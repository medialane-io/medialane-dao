'use client'

import { motion } from 'framer-motion'
import {
  AppWindow,
  Sparkles,
  Server,
  ArrowUpRight,
} from 'lucide-react'
import { GlassCard } from '@/components/glass-card'
import { Badge } from '@/components/ui/badge'

const features = [
  {
    category: 'Apps',
    items: [
      {
        title: 'Media Verifier',
        description: 'On-chain content authentication and provenance tracking for digital media assets.',
        icon: AppWindow,
        status: 'Live',
      },
      {
        title: 'Lane Explorer',
        description: 'Navigate the integrity web and discover verified media lanes across the network.',
        icon: AppWindow,
        status: 'Beta',
      },
      {
        title: 'DAO Dashboard',
        description: 'Real-time governance analytics, proposal tracking, and treasury insights.',
        icon: AppWindow,
        status: 'Coming Soon',
      },
    ],
  },
  {
    category: 'Features',
    items: [
      {
        title: 'Zero-Knowledge Proofs',
        description: 'Privacy-preserving verification using Starknet STARK proofs for media authenticity.',
        icon: Sparkles,
        status: 'Core',
      },
      {
        title: 'Content Fingerprinting',
        description: 'Unique on-chain fingerprints for every piece of media entering the integrity web.',
        icon: Sparkles,
        status: 'Core',
      },
      {
        title: 'Cross-Lane Bridging',
        description: 'Seamless interoperability between media lanes for unified content verification.',
        icon: Sparkles,
        status: 'In Development',
      },
    ],
  },
  {
    category: 'Services',
    items: [
      {
        title: 'Verification API',
        description: 'RESTful API for third-party integration with the Medialane verification network.',
        icon: Server,
        status: 'Active',
      },
      {
        title: 'Enterprise Gateway',
        description: 'Dedicated infrastructure for organizations requiring high-throughput verification.',
        icon: Server,
        status: 'Active',
      },
      {
        title: 'Node Operations',
        description: 'Run a Medialane node to support the integrity web and earn governance tokens.',
        icon: Server,
        status: 'Open',
      },
    ],
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

function statusColor(status: string) {
  switch (status) {
    case 'Live':
    case 'Active':
    case 'Open':
    case 'Core':
      return 'default'
    case 'Beta':
    case 'In Development':
      return 'secondary'
    default:
      return 'outline'
  }
}

export default function ExplorePage() {
  return (
    <div className="flex min-h-screen flex-col px-4 py-20 lg:px-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto w-full max-w-5xl"
      >
        <motion.div variants={itemVariants} className="mb-12">
          <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Explore
          </h1>
          <p className="mt-3 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Apps, features, and services powering the integrity web.
          </p>
        </motion.div>

        {features.map((section) => (
          <motion.div key={section.category} variants={itemVariants} className="mb-12">
            <h2 className="mb-4 text-xs font-semibold tracking-widest uppercase text-primary">
              {section.category}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {section.items.map((item) => (
                <GlassCard
                  key={item.title}
                  intensity="light"
                  className="group flex flex-col gap-4 p-6 transition-all hover:scale-[1.01] hover:shadow-xl hover:shadow-ml-glow/10"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <item.icon className="size-5" />
                    </div>
                    <Badge variant={statusColor(item.status)}>{item.status}</Badge>
                  </div>
                  <div>
                    <h3 className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
                      {item.title}
                      <ArrowUpRight className="size-3 opacity-0 transition-opacity group-hover:opacity-100 text-primary" />
                    </h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </GlassCard>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
