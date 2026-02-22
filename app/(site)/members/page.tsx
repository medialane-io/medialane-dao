import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

const MembersPageClient = dynamic(() => import('./page.client'))

export const metadata: Metadata = {
  title: 'Members | Medialane DAO',
}

// server wrapper (client loaded dynamically)
export default function MembersPage() {
  return <MembersPageClient />
}
