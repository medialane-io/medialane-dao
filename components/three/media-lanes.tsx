'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function createLaneCurve(seed: number): THREE.CatmullRomCurve3 {
  const points: THREE.Vector3[] = []
  const segments = 6
  for (let i = 0; i < segments; i++) {
    const t = i / (segments - 1)
    points.push(
      new THREE.Vector3(
        Math.sin(seed * 3 + t * Math.PI * 2) * 4 + Math.cos(seed * 7) * 2,
        Math.cos(seed * 5 + t * Math.PI) * 3 + Math.sin(t * Math.PI * 1.5) * 1.5,
        (t - 0.5) * 12 + Math.sin(seed * 2) * 2
      )
    )
  }
  return new THREE.CatmullRomCurve3(points, false, 'catmullrom', 0.5)
}

interface MediaLaneProps {
  seed: number
  color: string
  speed: number
  tubeRadius?: number
}

function MediaLane({ seed, color, speed, tubeRadius = 0.02 }: MediaLaneProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const flowRef = useRef(0)

  const { geometry, curve } = useMemo(() => {
    const c = createLaneCurve(seed)
    const g = new THREE.TubeGeometry(c, 100, tubeRadius, 8, false)
    return { geometry: g, curve: c }
  }, [seed, tubeRadius])

  const particlePositions = useMemo(() => {
    const count = 20
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const t = i / count
      const p = curve.getPointAt(t)
      arr[i * 3] = p.x
      arr[i * 3 + 1] = p.y
      arr[i * 3 + 2] = p.z
    }
    return arr
  }, [curve])

  const particlesRef = useRef<THREE.Points>(null)

  useFrame((_state, delta) => {
    flowRef.current += delta * speed
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position
      const count = positions.count
      for (let i = 0; i < count; i++) {
        const t = ((i / count + flowRef.current * 0.1) % 1 + 1) % 1
        const p = curve.getPointAt(t)
        positions.setXYZ(i, p.x, p.y, p.z)
      }
      positions.needsUpdate = true
    }
  })

  return (
    <group>
      <mesh ref={meshRef} geometry={geometry}>
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.35}
          side={THREE.DoubleSide}
        />
      </mesh>
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlePositions, 3]}
            count={particlePositions.length / 3}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          color={color}
          size={0.06}
          transparent
          opacity={0.9}
          sizeAttenuation
        />
      </points>
    </group>
  )
}

const LANES = [
  { seed: 0.3, color: '#0000FF', speed: 0.8, tubeRadius: 0.025 },
  { seed: 1.7, color: '#EC796B', speed: 0.6, tubeRadius: 0.02 },
  { seed: 2.9, color: '#E175B1', speed: 1.0, tubeRadius: 0.018 },
  { seed: 4.2, color: '#0000FF', speed: 0.5, tubeRadius: 0.022 },
  { seed: 5.5, color: '#EC796B', speed: 0.7, tubeRadius: 0.015 },
  { seed: 6.8, color: '#E175B1', speed: 0.9, tubeRadius: 0.02 },
  { seed: 8.1, color: '#0000FF', speed: 0.4, tubeRadius: 0.028 },
]

export function MediaLanes() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((_state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.02
    }
  })

  return (
    <group ref={groupRef}>
      {LANES.map((lane, i) => (
        <MediaLane key={i} {...lane} />
      ))}
    </group>
  )
}
