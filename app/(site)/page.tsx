import type { Metadata } from 'next'
import { HeroSection } from '@/components/hero-section'

export const metadata: Metadata = {
  title: 'Medialane | Creators Capital Markets on the Integrity Web',
}

export default function StartPage() {
  return <HeroSection />
}
