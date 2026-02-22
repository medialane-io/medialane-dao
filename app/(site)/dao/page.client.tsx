'use client'

import { motion } from 'framer-motion'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { GlassCard } from '@/components/glass-card'
import { ScrollArea } from '@/components/ui/scroll-area'
import documents from '@/lib/dao-content'
import { createContainerVariants, createItemVariants } from '@/lib/motion'

const containerVariants = createContainerVariants()
const itemVariants = createItemVariants()

export default function DAOPageClient() {
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
