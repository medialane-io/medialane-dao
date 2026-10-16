import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

const ConnectPageClient = dynamic(() => import('./page.client'))

export const metadata: Metadata = {
  title: 'Connect | Medialane DAO',
}

export default function ConnectPage() {
  return <ConnectPageClient />
}
