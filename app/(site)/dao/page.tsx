'use client'

import { motion } from 'framer-motion'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { GlassCard } from '@/components/glass-card'
import { ScrollArea } from '@/components/ui/scroll-area'

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

const documents = {
  foundation: {
    title: 'Foundation',
    content: `Medialane DAO is established as a decentralized autonomous organization committed to building the integrity web for digital media. Our foundation rests on three core principles:

1. Decentralization of Truth
Media verification should not be controlled by any single entity. The integrity web distributes this responsibility across a network of participants, each contributing to the collective verification of content authenticity.

2. Transparency by Design
Every verification, every governance decision, and every treasury movement is recorded on Starknet. This immutable record ensures that the organization operates with full transparency.

3. Community Sovereignty
The DAO is governed entirely by its members. Token holders have direct influence over protocol upgrades, treasury allocation, and the strategic direction of the integrity web.

The Medialane Foundation serves as the legal wrapper for the DAO, established to interface with traditional institutions while preserving the decentralized nature of governance.`,
  },
  constitution: {
    title: 'Constitution',
    content: `Article I - Purpose
Medialane DAO exists to create, maintain, and expand a decentralized integrity web for digital media, ensuring content authenticity and provenance across the internet.

Article II - Membership
Membership is open to any entity or individual who holds LANE governance tokens. Membership rights scale with token holdings, subject to quadratic voting mechanisms that prevent plutocratic capture.

Article III - Governance
All protocol changes, treasury expenditures above the defined threshold, and strategic initiatives require approval through the governance process. Proposals follow a structured lifecycle: Draft > Discussion > Voting > Execution.

Article IV - Treasury
The DAO treasury is managed through a multi-signature wallet controlled by elected council members. Expenditures below the threshold may be approved by the council; larger expenditures require a full governance vote.

Article V - Amendments
This constitution may be amended through a supermajority governance vote (67% approval with 20% quorum). Amendment proposals require a 14-day discussion period before voting begins.`,
  },
  governance: {
    title: 'Governance Charter',
    content: `Medialane Governance Charter v1.0

Voting Mechanism
The DAO employs quadratic voting for all governance decisions. This mechanism ensures that influence is distributed more equitably, preventing large token holders from dominating outcomes.

Proposal Lifecycle
- Draft Phase (7 days): Authors submit proposals for community feedback
- Discussion Phase (7 days): Formal debate and amendment period
- Voting Phase (5 days): Token holders cast their votes
- Timelock (48 hours): Successful proposals enter a security timelock
- Execution: Approved proposals are executed on-chain

Council Elections
The DAO elects a 7-member council every 6 months. Council members serve as operational stewards, managing day-to-day decisions within their defined authority. Council seats are filled through ranked-choice voting.

Emergency Procedures
In the event of a critical security issue, the council may invoke emergency powers to pause protocol operations. Emergency actions must be ratified by governance within 72 hours or they are automatically reversed.`,
  },
  terms: {
    title: 'Terms of Use',
    content: `Terms of Use - Medialane DAO

Last Updated: February 2026

1. Acceptance
By accessing or using any Medialane DAO services, applications, or protocols, you agree to be bound by these Terms of Use.

2. Services
Medialane DAO provides decentralized media verification services through the integrity web. Services are provided on an "as-is" basis through smart contracts deployed on Starknet.

3. User Responsibilities
Users are responsible for maintaining the security of their wallet credentials, ensuring compliance with applicable laws in their jurisdiction, and using services in good faith.

4. Intellectual Property
The Medialane protocol is open-source under the MIT License. The Medialane brand, logo, and associated trademarks are owned by the Medialane Foundation.

5. Limitation of Liability
Medialane DAO and its contributors shall not be liable for any indirect, incidental, or consequential damages arising from the use of the protocol.

6. Governing Law
These terms are governed by the principles of decentralized governance as outlined in the Medialane Constitution.`,
  },
  privacy: {
    title: 'Privacy Policy',
    content: `Privacy Policy - Medialane DAO

Last Updated: February 2026

1. Data Collection
Medialane DAO operates on public blockchain infrastructure. On-chain interactions are inherently public. The DAO does not collect personal information beyond what is publicly available on the Starknet blockchain.

2. Off-Chain Data
The DAO website may collect minimal analytics data (page views, session duration) to improve user experience. No personally identifiable information is collected or stored.

3. Wallet Connections
When you connect your wallet, we do not store your private keys. Wallet addresses are used solely for authentication and interaction with smart contracts.

4. Third-Party Services
The DAO may integrate with third-party services (Snapshot for voting, IPFS for storage). Users should review the privacy policies of these services independently.

5. Data Rights
As a decentralized protocol, on-chain data cannot be deleted or modified. Off-chain data may be removed upon request by contacting the DAO through governance channels.

6. Contact
For privacy inquiries, submit a proposal through the governance forum or contact the council through official channels.`,
  },
}

export default function DAOPage() {
  return (
    <div className="flex min-h-screen flex-col px-4 py-20 lg:px-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto w-full max-w-4xl"
      >
        <motion.div variants={itemVariants} className="mb-8">
          <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            DAO
          </h1>
          <p className="mt-3 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Foundation, governance, and the principles that guide us.
          </p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Tabs defaultValue="foundation" className="w-full">
            <TabsList className="mb-6 flex w-full flex-wrap bg-ml-glass backdrop-blur-md border border-ml-glass-border">
              {Object.entries(documents).map(([key, doc]) => (
                <TabsTrigger
                  key={key}
                  value={key}
                  className="flex-1 text-xs sm:text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  {doc.title}
                </TabsTrigger>
              ))}
            </TabsList>

            {Object.entries(documents).map(([key, doc]) => (
              <TabsContent key={key} value={key}>
                <GlassCard intensity="medium" className="p-6 sm:p-8">
                  <h2 className="mb-4 text-2xl font-bold text-foreground">
                    {doc.title}
                  </h2>
                  <ScrollArea className="h-[60vh]">
                    <div className="prose prose-sm max-w-none dark:prose-invert">
                      {doc.content.split('\n\n').map((paragraph, i) => (
                        <p
                          key={i}
                          className="mb-4 text-sm leading-relaxed text-muted-foreground"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </ScrollArea>
                </GlassCard>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>
      </motion.div>
    </div>
  )
}
