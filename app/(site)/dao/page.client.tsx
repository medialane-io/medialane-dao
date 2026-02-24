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
      <div className="flex min-h-screen flex-col px-4 py-20 lg:px-8">
        <PageHeader title="DAO" description="No documentation found." />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col px-4 py-20 lg:px-8">
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
        />

        <motion.div variants={itemVariants}>
          <Tabs defaultValue={defaultTab} className="w-full">
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
                  <h2 className="mb-6 text-2xl font-bold text-foreground border-b border-ml-glass-border pb-4">
                    {doc.title}
                  </h2>
                  <ScrollArea className="h-[60vh] pr-4">
                    <article
                      className="prose max-w-none"
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
