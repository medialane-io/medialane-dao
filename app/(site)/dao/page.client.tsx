'use client'

import { motion } from 'framer-motion'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { GlassCard } from '@/components/glass-card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { PageHeader } from '@/components/page-header'
import { createContainerVariants, createItemVariants } from '@/lib/motion'

const containerVariants = createContainerVariants()
const itemVariants = createItemVariants()

interface DAOPageClientProps {
  documents: Record<string, { title: string; contentHtml: string }>
}

export default function DAOPageClient({ documents }: DAOPageClientProps) {
  const documentKeys = Object.keys(documents)
  const defaultTab = documentKeys.includes('foundation') ? 'foundation' : documentKeys[0]

  if (documentKeys.length === 0) {
    return (
      <div className="flex min-h-screen flex-col px-4 py-16 lg:px-8">
        <PageHeader title="DAO" description="No documentation found." />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col px-4 py-16 lg:px-8 bg-background">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto w-full max-w-4xl"
      >
        <PageHeader
          title="DAO"
          description="Foundation, governance, and the principles that guide us."
          containerVariants={containerVariants}
          itemVariants={itemVariants}
          className="mb-8"
        />

        <motion.div variants={itemVariants}>
          <Tabs defaultValue={defaultTab} className="w-full">
            <TabsList className="mb-6 flex w-full flex-wrap bg-white/5 backdrop-blur-md border border-white/10 p-1 rounded-xl">
              {Object.entries(documents).map(([key, doc]) => (
                <TabsTrigger
                  key={key}
                  value={key}
                  className="flex-1 text-xs sm:text-sm py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg transition-colors"
                >
                  {doc.title}
                </TabsTrigger>
              ))}
            </TabsList>

            {Object.entries(documents).map(([key, doc]) => (
              <TabsContent key={key} value={key} className="mt-0 outline-none">
                <GlassCard intensity="medium" className="p-5 sm:p-8 shadow-lg border-white/5 bg-white/5">
                  <h2 className="mb-5 text-xl sm:text-2xl font-bold text-foreground border-b border-primary/20 pb-3">
                    {doc.title}
                  </h2>
                  <ScrollArea className="h-[65vh] pr-4 sm:pr-6">
                    <article
                      className="prose prose-sm sm:prose-base prose-invert max-w-none prose-a:text-primary hover:prose-a:text-primary/80 prose-headings:text-foreground prose-strong:text-foreground"
                      dangerouslySetInnerHTML={{ __html: doc.contentHtml }}
                    />
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
