import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

const ExplorePageClient = dynamic(() => import('./page.client'))

export const metadata: Metadata = {
  title: 'Explore | Medialane DAO',
}

// server wrapper just renders client component
export default function ExplorePage() {
  return <ExplorePageClient />
}