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
import { createContainerVariants, createItemVariants } from '@/lib/motion'

const containerVariants = createContainerVariants()
const itemVariants = createItemVariants()

const socials = [
  { name: 'Discord', href: '#', icon: MessageSquare },
  { name: 'X / Twitter', href: '#', icon: ExternalLink },
  { name: 'YouTube', href: '#', icon: Video },
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
                    className="w-full"
                    placeholder="Your name"
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
                    className="w-full"
                    placeholder="you@example.com"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="message"
                    className="text-xs font-medium text-foreground"
                  >
                    Message
                  </label>
                  <Textarea
                    id="message"
                    className="w-full"
                    placeholder="What's on your mind?"
                  />
                </div>
                <Button type="submit" className="self-end">
                  Send
                </Button>
              </form>
            </GlassCard>
          </motion.div>
        </div>

        {/* Social links */}
        <motion.div variants={itemVariants} className="mt-12">
          <h2 className="mb-4 text-xs font-semibold tracking-widest uppercase text-primary">
            Find us on
          </h2>
          <div className="flex flex-wrap gap-4">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.href}
                className="flex items-center gap-2 text-sm text-primary hover:underline"
              >
                <social.icon className="size-4" />
                {social.name}
              </a>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
