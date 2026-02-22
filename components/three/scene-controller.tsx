'use client'

import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { usePathname } from 'next/navigation'
import { easing } from 'maath'
import * as THREE from 'three'
import { cameraTargets } from '@/lib/site-config'

export function SceneController() {
  const pathname = usePathname()
  const { camera } = useThree()
  const target = useRef(new THREE.Vector3(0, 0, 8))

  useFrame((_state, delta) => {
    const pos = cameraTargets[pathname] ?? cameraTargets['/']
    target.current.set(pos[0], pos[1], pos[2])
    easing.damp3(camera.position, target.current, 0.6, delta)
    camera.lookAt(0, 0, 0)
  })

  return null
}
