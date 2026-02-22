import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

const ConnectPageClient = dynamic(() => import('./page.client'))

export const metadata: Metadata = {
  title: 'Connect | Medialane DAO',
}

// server wrapper (client loaded dynamically)
export default function ConnectPage() {
  return <ConnectPageClient />
}
