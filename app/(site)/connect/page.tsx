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
import { Separator } from '@/components/ui/separator'

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
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

const socials = [
  { name: 'Discord', href: '#', icon: MessageSquare },
  { name: 'X / Twitter', href: '#', icon: ExternalLink },
  { name: 'YouTube', href: '#', icon: Video },
  { name: 'Snapshot', href: '#', icon: Vote },
]

export default function ConnectPage() {
  return (
    <div className="flex min-h-screen flex-col px-4 py-20 lg:px-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto w-full max-w-4xl"
      >
        <motion.div variants={itemVariants} className="mb-12">
          <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Connect
          </h1>
          <p className="mt-3 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Join the network. Connect your wallet, reach out, or find us on the
            platforms below.
          </p>
        </motion.div>

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
                Connect your ArgentX or Braavos wallet to access governance,
                member content, and the full Medialane experience. Wallet
                integration powered by Starknet.
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

          {/* Contact Form */}
          <motion.div variants={itemVariants}>
            <GlassCard intensity="medium" className="flex flex-col gap-6 p-6">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-ml-orange/10 text-ml-orange">
                  <Mail className="size-5" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground">
                    Get in Touch
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    We would love to hear from you
                  </p>
                </div>
              </div>
              <form
                className="flex flex-col gap-4"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="name"
                    className="text-xs font-medium text-foreground"
                  >
                    Name
                  </label>
                  <Input
                    id="name"
                    placeholder="Your name"
                    className="border-ml-glass-border bg-ml-glass backdrop-blur-sm"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="email"
                    className="text-xs font-medium text-foreground"
                  >
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className="border-ml-glass-border bg-ml-glass backdrop-blur-sm"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="message"
                    className="text-xs font-medium text-foreground"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={3}
                    placeholder="Your message..."
                    className="w-full rounded-md border border-ml-glass-border bg-ml-glass px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground backdrop-blur-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:outline-none"
                  />
                </div>
                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </form>
            </GlassCard>
          </motion.div>

          {/* Socials */}
          <motion.div variants={itemVariants}>
            <GlassCard intensity="light" className="flex flex-col gap-4 p-6">
              <h2 className="text-xs font-semibold tracking-widest uppercase text-primary">
                Social Channels
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-xl border border-ml-glass-border bg-ml-glass p-4 backdrop-blur-sm transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-ml-glow/10"
                  >
                    <social.icon className="size-5 text-primary" />
                    <span className="text-sm font-medium text-foreground">
                      {social.name}
                    </span>
                  </a>
                ))}
              </div>
            </GlassCard>
          </motion.div>

          {/* Snapshot DAO */}
          <motion.div variants={itemVariants}>
            <GlassCard intensity="light" className="flex flex-col gap-4 p-6">
              <h2 className="text-xs font-semibold tracking-widest uppercase text-primary">
                Snapshot Governance
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Medialane DAO uses Snapshot for off-chain signaling votes. View
                active proposals, past decisions, and the governance history of
                the integrity web.
              </p>
              <Separator className="bg-ml-glass-border" />
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between rounded-lg border border-ml-glass-border p-3">
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      MLP-042: Treasury Diversification
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Voting ends in 3 days
                    </p>
                  </div>
                  <span className="inline-flex items-center rounded-full bg-ml-orange/10 px-2 py-0.5 text-xs font-medium text-ml-orange">
                    Active
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-lg border border-ml-glass-border p-3">
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      MLP-041: Node Operator Rewards v2
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Passed with 89% approval
                    </p>
                  </div>
                  <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                    Passed
                  </span>
                </div>
              </div>
              <Button variant="outline" className="w-full gap-2 border-ml-glass-border" asChild>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  View on Snapshot
                  <ExternalLink className="size-3" />
                </a>
              </Button>
            </GlassCard>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
