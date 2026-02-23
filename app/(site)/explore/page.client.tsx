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
import { createContainerVariants, createItemVariants } from '@/lib/motion'

const features = [
  {
    category: 'Apps',
    items: [
      {
        title: 'Creator Launchpad',
        description: 'Monetize collections, nfts, programmable IP, RWA',
        icon: AppWindow,
        status: 'Testnet',
      },
      {
        title: 'NFT Marketplace',
        description: 'Buy, sell, and trade onchain digital assets',
        icon: AppWindow,
        status: 'Testnet',
      },
      {
        title: 'Mint Drop',
        description: 'Limited edition mints and exclusive content drops',
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
        description: 'Unique on-chain fingerprints and immutable metadata with industry standard compatibility.',
        icon: Sparkles,
        status: 'Core',
      },
      {
        title: 'Zero-Fees Tokenization',
        description: 'Create and manage on-chain assets with zero minting fees',
        icon: Sparkles,
        status: 'In Development',
      },
    ],
  },
  {
    category: 'Services',
    items: [
      {
        title: 'Medialane API',
        description: 'RESTful API for third-party integration with the Medialane services.',
        icon: Server,
        status: 'Active',
      },
      {
        title: 'IP Collections',
        description: 'Create and manage onchain IP collections with rich metadata and provenance tracking.',
        icon: Server,
        status: 'Active',
      },
      {
        title: 'Programmable IP',
        description: 'Create dynamic, interactive media assets with programmable logic and on-chain interactivity.',
        icon: Server,
        status: 'Open',
      },
    ],
  },
]

const containerVariants = createContainerVariants(0.08, 0.2)
const itemVariants = createItemVariants()

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

export default function ExplorePageClient() {
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
