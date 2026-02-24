'use client'

import { motion, Variants } from 'framer-motion'
import { createContainerVariants, createItemVariants } from '@/lib/motion'
import { cn } from '@/lib/utils'

interface PageHeaderProps {
  title: string
  description?: string
  className?: string
  maxWidth?: string
  containerVariants?: Variants
  itemVariants?: Variants
}

const defaultContainerVariants = createContainerVariants()
const defaultItemVariants = createItemVariants()

export function PageHeader({
  title,
  description,
  className,
  maxWidth = 'max-w-4xl',
  containerVariants = defaultContainerVariants,
  itemVariants = defaultItemVariants,
}: PageHeaderProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={cn('mx-auto w-full mb-8', maxWidth, className)}
    >
      <motion.div variants={itemVariants}>
        <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-3 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
            {description}
          </p>
        )}
      </motion.div>
    </motion.div>
  )
}
