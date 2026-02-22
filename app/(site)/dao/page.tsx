import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

const DAOPageClient = dynamic(() => import('./page.client'))

export const metadata: Metadata = {
  title: 'DAO | Medialane DAO',
}

// server wrapper (client loaded dynamically)
export default function DAOPage() {
  return <DAOPageClient />
}
