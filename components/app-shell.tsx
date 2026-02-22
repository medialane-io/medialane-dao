'use client'

import { SceneCanvas } from '@/components/three/scene-canvas'
import { SiteNav } from '@/components/site-nav'

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SceneCanvas />
      <SiteNav />
      <main className="relative z-10 min-h-screen pb-20 lg:pb-0 lg:pr-20">
        {children}
      </main>
    </>
  )
}
