'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import type { ShowcaseCollection } from '@/lib/showcase'

export function AssetMosaic({ items }: { items: ShowcaseCollection[] }) {
  if (items.length === 0) return null
  const strip = [...items, ...items]
  return (
    <section aria-label="Collections on Medialane" className="overflow-hidden">
      <motion.div
        className="flex w-max"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
      >
        {strip.map((c, i) => (
          <div
            key={`${c.contractAddress}-${i}`}
            className="group relative h-80 w-80 shrink-0 overflow-hidden bg-muted sm:h-96 sm:w-96"
          >
            <Image
              src={c.image}
              alt={c.name}
              fill
              sizes="384px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-4">
              <p className="truncate text-sm font-semibold text-white">{c.name}</p>
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  )
}
