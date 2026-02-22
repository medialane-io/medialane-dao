import type { Metadata } from 'next'
import { HeroSection } from '@/components/hero-section'

export const metadata: Metadata = {
  title: 'Medialane DAO | Integrity Web on Starknet',
}

export default function StartPage() {
  return <HeroSection />
}
