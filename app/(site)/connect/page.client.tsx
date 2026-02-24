'use client'

import { motion } from 'framer-motion'
import {
  Wallet,
  Mail,
  ExternalLink,
  MessageSquare,
  Video,
  Vote,
} from 'lucide-react'
import { GlassCard } from '@/components/glass-card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
import { PageHeader } from '@/components/page-header'
import { createContainerVariants, createItemVariants } from '@/lib/motion'

const containerVariants = createContainerVariants()
const itemVariants = createItemVariants()

const socials = [
  { name: 'X / Twitter', href: 'https://x.com/medialane_xyz', icon: ExternalLink },
  { name: 'YouTube', href: 'https://www.youtube.com/@medialanexyz', icon: Video },
  { name: 'Snapshot', href: '#', icon: Vote },
]

export default function ConnectPageClient() {
  return (
    <div className="flex min-h-screen flex-col px-4 py-20 lg:px-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto w-full max-w-4xl"
      >
        <PageHeader
          title="Connect"
          description="Join the network. Connect your wallet, reach out, or find us on the platforms below."
          containerVariants={containerVariants}
          itemVariants={itemVariants}
          className="mb-12"
        />

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Wallet Connect */}
          <motion.div variants={itemVariants}>
            <GlassCard intensity="medium" className="flex flex-col gap-6 p-6">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Wallet className="size-5" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground">
                    Wallet Connect
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    Sign in with your Starknet wallet
                  </p>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Connect your Ready or Braavos wallet to access the full Medialane DAO experience and content.
              </p>
              <Button
                size="lg"
                className="w-full gap-2 shadow-lg shadow-ml-glow"
                disabled
              >
                <Wallet className="size-4" />
                Connect Wallet (Coming Soon)
              </Button>
            </GlassCard>
          </motion.div>

          {/* Contact CTA */}
          <motion.div variants={itemVariants}>
            <GlassCard intensity="medium" className="flex flex-col gap-6 p-6 text-center">
              <div className="flex items-center justify-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-ml-orange/10 text-ml-orange">
                  <Mail className="size-5" />
                </div>
                <h2 className="text-lg font-semibold text-foreground">
                  Email Us
                </h2>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                For general inquiries or support, reach out at{' '}
                <a
                  href="mailto:dao@mediolano.org"
                  className="font-medium text-primary underline"
                >
                  dao@mediolano.org
                </a>
                . We look forward to connecting with you.
              </p>
            </GlassCard>
          </motion.div>
        </div>

        {/* Social links */}
        <motion.div variants={itemVariants} className="mt-12">
          <h2 className="mb-4 text-xs font-semibold tracking-widest uppercase text-primary">
            Follow us
          </h2>
          <div className="flex flex-wrap gap-6">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.href}
                className="flex flex-col items-center gap-2 text-sm text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="rounded-full bg-primary/10 p-3">
                  <social.icon className="size-6" />
                </div>
                <span className="mt-1">{social.name}</span>
              </a>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
