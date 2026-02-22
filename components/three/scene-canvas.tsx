'use client'

import dynamic from 'next/dynamic'

const Scene = dynamic(
  () => import('./scene').then((mod) => mod.Scene),
  {
    ssr: false,
    loading: () => (
      <div
        className="fixed inset-0 -z-10 bg-ml-deep"
        aria-hidden="true"
      />
    ),
  }
)

export function SceneCanvas() {
  return <Scene />
}
