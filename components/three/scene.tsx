'use client'

import { Canvas } from '@react-three/fiber'
import { Preload } from '@react-three/drei'
import { useTheme } from 'next-themes'
import { Suspense, useEffect, useState } from 'react'
import { SceneController } from './scene-controller'
import { MediaLanes } from './media-lanes'
import { IntegrityWeb } from './integrity-web'

function SceneContent() {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

  return (
    <>
      <SceneController />
      <ambientLight intensity={isDark ? 0.15 : 0.3} />
      <pointLight
        position={[5, 5, 5]}
        intensity={isDark ? 0.8 : 0.5}
        color={isDark ? '#4444ff' : '#0000FF'}
      />
      <pointLight
        position={[-5, -3, 3]}
        intensity={0.4}
        color="#EC796B"
      />
      <MediaLanes />
      <IntegrityWeb />
      <Preload all />
    </>
  )
}

export function Scene() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const isDark = resolvedTheme === 'dark'

  return (
    <div
      className="fixed inset-0 -z-10"
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60, near: 0.1, far: 100 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{
          background: isDark
            ? 'radial-gradient(ellipse at center, #0C0C4F 0%, #050515 100%)'
            : 'radial-gradient(ellipse at center, #e8e8ff 0%, #f0f0ff 100%)',
        }}
      >
        <Suspense fallback={null}>
          <SceneContent />
        </Suspense>
      </Canvas>
    </div>
  )
}
