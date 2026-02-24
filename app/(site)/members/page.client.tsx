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
  },
  {
    title: 'Contributor',
    requirement: '100+ LANE',
    icon: Star,
    perks: ['Submit proposals', 'Vote on governance', 'Access contributor channels', 'Early feature access'],
  },
  {
    title: 'Guardian',
    requirement: '1,000+ LANE',
    icon: Crown,
    perks: ['Run verification nodes', 'Council nomination rights', 'Priority API access', 'Revenue sharing', 'Exclusive events'],
  },
]

export default function MembersPageClient() {
  return (
    <div className="flex min-h-screen flex-col px-4 py-20 lg:px-8">
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
          className="mb-12"
        />

        {/* Gate notice */}
        <motion.div variants={itemVariants} className="mb-10">
          <GlassCard intensity="medium" className="flex flex-col items-center gap-6 p-8 text-center sm:flex-row sm:text-left">
            <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Lock className="size-7" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-foreground">
                Connect your wallet to access member content
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Membership is verified on-chain through LANE token holdings on
                Starknet. Connect your wallet to unlock your tier.
              </p>
            </div>
            <Button size="lg" className="gap-2 shadow-lg shadow-ml-glow" disabled>
              <Wallet className="size-4" />
              Connect Wallet
            </Button>
          </GlassCard>
        </motion.div>

        {/* Membership tiers */}
        <motion.div variants={itemVariants}>
          <h2 className="mb-4 text-xs font-semibold tracking-widest uppercase text-primary">
            Membership Tiers
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {tiers.map((tier, i) => (
              <GlassCard
                key={tier.title}
                intensity="light"
                className="flex flex-col gap-4 p-6 transition-all hover:shadow-xl hover:shadow-ml-glow/10"
              >
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <tier.icon className="size-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">
                      {tier.title}
                    </h3>
                    <Badge variant={i === 2 ? 'default' : 'secondary'} className="mt-0.5">
                      {tier.requirement}
                    </Badge>
                  </div>
                </div>
                <ul className="flex flex-col gap-2">
                  {tier.perks.map((perk) => (
                    <li
                      key={perk}
                      className="flex items-start gap-2 text-xs text-muted-foreground"
                    >
                      <span className="mt-1 inline-block size-1 shrink-0 rounded-full bg-ml-orange" />
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
