'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Mail,
  Video,
  Vote,
  Copy,
  Check,
  ArrowUpRight
} from 'lucide-react'
import { GlassCard } from '@/components/glass-card'
import { PageHeader } from '@/components/page-header'
import { createContainerVariants, createItemVariants } from '@/lib/motion'

const containerVariants = createContainerVariants()
const itemVariants = createItemVariants()

// Applied brand specific colors by default for mobile-first visibility
const socials = [
  {
    name: 'X / Twitter',
    href: 'https://x.com/medialane_xyz',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5 fill-current">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L5.09 21.75H1.78l7.509-8.58L1.141 2.25H7.96l4.74 6.255 5.544-6.255zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644z"></path>
      </svg>
    ),
    description: 'Follow our latest updates and announcements.',
    accentColor: 'text-[#1DA1F2] bg-[#1DA1F2]/10',
    shadowColor: 'shadow-[#1DA1F2]/10',
    iconColor: 'text-[#1DA1F2]'
  },
  {
    name: 'YouTube',
    href: 'https://www.youtube.com/@medialanexyz',
    icon: <Video className="size-5" />,
    description: 'Watch our tutorials, demos, and community calls.',
    accentColor: 'text-[#FF0000] bg-[#FF0000]/10',
    shadowColor: 'shadow-[#FF0000]/10',
    iconColor: 'text-[#FF0000]'
  },
  {
    name: 'Snapshot',
    href: '#',
    icon: <Vote className="size-5" />,
    description: 'Participate in governance proposals and DAO voting.',
    accentColor: 'text-[#F3B04E] bg-[#F3B04E]/10',
    shadowColor: 'shadow-[#F3B04E]/10',
    iconColor: 'text-[#F3B04E]'
  },
]

export default function ConnectPageClient() {
  const [hasCopied, setHasCopied] = useState(false)

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('dao@mediolano.org')
    setHasCopied(true)
    setTimeout(() => setHasCopied(false), 2000)
  }

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden px-4 py-16 lg:px-8">
      {/* Background ambient lighting */}
      <div className="absolute top-[20%] left-1/2 -ml-[300px] h-[400px] w-[600px] rounded-full bg-ml-orange/5 mix-blend-screen blur-[100px] pointer-events-none" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto w-full max-w-3xl relative z-10"
      >
        <PageHeader
          title="Connect"
          description="Join the network, reach out to the team, or find us on the platforms below."
          containerVariants={containerVariants}
          itemVariants={itemVariants}
          className="mb-8"
        />

        {/* Compact Email CTA Banner */}
        <motion.div variants={itemVariants} className="mb-10">
          <GlassCard intensity="heavy" className="relative p-5 sm:p-6 transition-transform active:scale-[0.98]">
            {/* Ambient inner glow */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-ml-orange/5 to-primary/5 pointer-events-none" />

            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-5 justify-between">
              <div className="flex items-center gap-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-ml-orange/10 text-ml-orange ring-1 ring-ml-orange/20">
                  <Mail className="size-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-foreground">
                    Email Us
                  </h2>
                  <p className="max-w-xs text-sm text-muted-foreground mt-0.5">
                    For inquiries, partnerships, or support.
                  </p>
                </div>
              </div>

              <button
                onClick={handleCopyEmail}
                className="w-full sm:w-auto inline-flex justify-center sm:justify-start items-center gap-3 rounded-full bg-primary/10 px-5 py-2.5 text-sm font-medium text-primary ring-1 ring-primary/20 transition-colors hover:bg-primary/20 hover:ring-primary/40 active:bg-primary/30"
              >
                dao@mediolano.org

                <div className="relative flex size-4 items-center justify-center overflow-hidden shrink-0">
                  <AnimatePresence mode="popLayout" initial={false}>
                    {hasCopied ? (
                      <motion.div
                        key="check"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                      >
                        <Check className="size-4 text-green-500" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="copy"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                      >
                        <Copy className="size-4 text-primary" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </button>
            </div>
          </GlassCard>
        </motion.div>

        {/* Social links */}
        <motion.div variants={itemVariants} className="space-y-6">
          <div className="flex items-center gap-4">
            <h2 className="text-sm font-semibold tracking-widest uppercase text-primary">
              Community Platforms
            </h2>
            <div className="h-px flex-1 bg-gradient-to-r from-primary/20 to-transparent" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.href}
                className="block h-full text-left outline-none transition-transform active:scale-95"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GlassCard
                  intensity="light"
                  className={`flex h-full flex-col p-5 shadow-lg bg-white/5 border-white/5 hover:border-white/10 transition-colors ${social.shadowColor}`}
                >
                  <div className="mb-4 flex items-center justify-between">
                    <div className={`flex size-10 items-center justify-center rounded-lg ${social.accentColor}`}>
                      {social.icon}
                    </div>
                    <div className="rounded-full bg-white/5 p-1.5 flex items-center justify-center">
                      <ArrowUpRight className={`size-3.5 ${social.iconColor}`} />
                    </div>
                  </div>
                  <h3 className={`mb-1 text-sm font-bold ${social.iconColor}`}>
                    {social.name}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {social.description}
                  </p>
                </GlassCard>
              </a>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
