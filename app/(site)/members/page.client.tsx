'use client'

import { motion } from 'framer-motion'
import { Lock, Wallet, Users, Crown, Star } from 'lucide-react'
import { GlassCard } from '@/components/glass-card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { PageHeader } from '@/components/page-header'
import { createContainerVariants, createItemVariants } from '@/lib/motion'

const containerVariants = createContainerVariants()
const itemVariants = createItemVariants()

const tiers = [
  {
    title: 'Observer',
    requirement: '1+ LANE',
    icon: Users,
    perks: ['Access community forums', 'View governance proposals', 'Basic analytics'],
    accentColor: 'text-[#1DA1F2] bg-[#1DA1F2]/10',
  },
  {
    title: 'Contributor',
    requirement: '100+ LANE',
    icon: Star,
    perks: ['Submit proposals', 'Vote on governance', 'Access contributor channels', 'Early feature access'],
    accentColor: 'text-primary bg-primary/10',
  },
  {
    title: 'Guardian',
    requirement: '1,000+ LANE',
    icon: Crown,
    perks: ['Run verification nodes', 'Council nomination rights', 'Priority API access', 'Revenue sharing', 'Exclusive events'],
    accentColor: 'text-[#F3B04E] bg-[#F3B04E]/10',
  },
]

export default function MembersPageClient() {
  return (
    <div className="flex min-h-screen flex-col px-4 py-16 lg:px-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto w-full max-w-4xl"
      >
        <PageHeader
          title="Members"
          description="Token-gated access to the Medialane community and governance."
          containerVariants={containerVariants}
          itemVariants={itemVariants}
          className="mb-8"
        />

        {/* Gate notice */}
        <motion.div variants={itemVariants} className="mb-10">
          <GlassCard intensity="heavy" className="flex flex-col items-start gap-5 p-5 sm:p-6 sm:flex-row sm:items-center">
            {/* Ambient inner glow */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/5 to-transparent pointer-events-none" />

            <div className="relative z-10 flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
              <Lock className="size-5" />
            </div>
            <div className="relative z-10 flex-1">
              <h2 className="text-lg font-bold text-foreground">
                Connect your wallet to access member content
              </h2>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                Membership is verified on-chain through LANE token holdings on
                Starknet. Connect your wallet to unlock your tier.
              </p>
            </div>
            <Button size="default" className="w-full sm:w-auto mt-2 sm:mt-0 relative z-10 rounded-full" disabled>
              <Wallet className="size-4 mr-2" />
              Connect Wallet
            </Button>
          </GlassCard>
        </motion.div>

        {/* Membership tiers */}
        <motion.div variants={itemVariants}>
          <h2 className="mb-4 text-sm font-semibold tracking-widest uppercase text-primary border-b border-primary/20 pb-2">
            Membership Tiers
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {tiers.map((tier, i) => (
              <GlassCard
                key={tier.title}
                intensity="light"
                className="flex flex-col gap-4 p-5 sm:p-6 transition-transform active:scale-[0.98] bg-white/5 border-white/5 shadow-lg"
              >
                <div className="flex items-center gap-4">
                  <div className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${tier.accentColor}`}>
                    <tier.icon className="size-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground">
                      {tier.title}
                    </h3>
                    <Badge variant={i === 2 ? 'default' : 'secondary'} className="mt-1 font-semibold">
                      {tier.requirement}
                    </Badge>
                  </div>
                </div>
                <div className="h-px w-full bg-border/50" />
                <ul className="flex flex-col gap-2.5">
                  {tier.perks.map((perk) => (
                    <li
                      key={perk}
                      className="flex items-start gap-2 text-xs leading-relaxed text-muted-foreground"
                    >
                      <span className="mt-1 inline-block size-[5px] shrink-0 rounded-full bg-primary" />
                      {perk}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
