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
import { PageHeader } from '@/components/page-header'
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
        accentColor: 'text-primary bg-primary/10',
      },
      {
        title: 'NFT Marketplace',
        description: 'Buy, sell, and trade onchain digital assets',
        icon: AppWindow,
        status: 'Testnet',
        accentColor: 'text-primary bg-primary/10',
      },
      {
        title: 'Mint Drop',
        description: 'Limited edition mints and exclusive content drops',
        icon: AppWindow,
        status: 'Coming Soon',
        accentColor: 'text-muted-foreground bg-muted',
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
        accentColor: 'text-[#1DA1F2] bg-[#1DA1F2]/10',
      },
      {
        title: 'Permissionless Protocol',
        description: 'Open-source, ZK-Proof protocol for secure and transparent digital asset trading.',
        icon: Sparkles,
        status: 'Core',
        accentColor: 'text-[#1DA1F2] bg-[#1DA1F2]/10',
      },
      {
        title: 'Zero-Fees Tokenization',
        description: 'Create and manage on-chain assets with zero minting fees',
        icon: Sparkles,
        status: 'In Development',
        accentColor: 'text-muted-foreground bg-muted',
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
        accentColor: 'text-[#F3B04E] bg-[#F3B04E]/10',
      },
      {
        title: 'IP Collections',
        description: 'Create and manage onchain IP collections with rich metadata and provenance tracking.',
        icon: Server,
        status: 'Onchain',
        accentColor: 'text-[#F3B04E] bg-[#F3B04E]/10',
      },
      {
        title: 'Programmable IP',
        description: 'Create dynamic, interactive media assets with programmable logic and on-chain interactivity.',
        icon: Server,
        status: 'Onchain',
        accentColor: 'text-[#F3B04E] bg-[#F3B04E]/10',
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
    case 'Onchain':
      return 'default'
    case 'Beta':
    case 'In Development':
    case 'Testnet':
      return 'secondary'
    default:
      return 'outline'
  }
}

export default function ExplorePageClient() {
  return (
    <div className="flex min-h-screen flex-col px-4 py-16 lg:px-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto w-full max-w-5xl"
      >
        <PageHeader
          title="Explore"
          description="Apps, features, and services powering the integrity web."
          maxWidth="max-w-5xl"
          containerVariants={containerVariants}
          itemVariants={itemVariants}
          className="mb-8"
        />

        {features.map((section) => (
          <motion.div key={section.category} variants={itemVariants} className="mb-10">
            <h2 className="mb-4 text-sm font-semibold tracking-widest uppercase text-primary border-b border-primary/20 pb-2">
              {section.category}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {section.items.map((item) => (
                <GlassCard
                  key={item.title}
                  intensity="light"
                  className="flex flex-col gap-4 p-5 sm:p-6 transition-transform active:scale-[0.98] bg-white/5 border-white/5 shadow-lg"
                >
                  <div className="flex items-start justify-between">
                    <div className={`flex size-10 items-center justify-center rounded-lg ${item.accentColor}`}>
                      <item.icon className="size-5" />
                    </div>
                    <Badge variant={statusColor(item.status)}>{item.status}</Badge>
                  </div>
                  <div>
                    <h3 className="flex items-center gap-2 text-sm font-bold text-foreground">
                      {item.title}
                      <div className="rounded-full bg-white/5 p-1 ml-auto flex items-center justify-center">
                        <ArrowUpRight className="size-3 text-muted-foreground" />
                      </div>
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
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
