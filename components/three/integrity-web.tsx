'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface Node {
  position: THREE.Vector3
  originalPosition: THREE.Vector3
  connections: number[]
}

function generateNetwork(count: number, radius: number, connectionDist: number): Node[] {
  const nodes: Node[] = []
  for (let i = 0; i < count; i++) {
    const phi = Math.acos(2 * Math.random() - 1)
    const theta = Math.random() * Math.PI * 2
    const r = radius * (0.5 + Math.random() * 0.5)
    const pos = new THREE.Vector3(
      r * Math.sin(phi) * Math.cos(theta),
      r * Math.sin(phi) * Math.sin(theta),
      r * Math.cos(phi)
    )
    nodes.push({
      position: pos.clone(),
      originalPosition: pos.clone(),
      connections: [],
    })
  }
  // Build connections
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      if (nodes[i].position.distanceTo(nodes[j].position) < connectionDist) {
        nodes[i].connections.push(j)
        nodes[j].connections.push(i)
      }
    }
  }
  return nodes
}

export function IntegrityWeb() {
  const groupRef = useRef<THREE.Group>(null)
  const pointsRef = useRef<THREE.Points>(null)
  const linesRef = useRef<THREE.LineSegments>(null)

  const { nodes, nodePositions, linePositions, lineCount } = useMemo(() => {
    const n = generateNetwork(80, 5, 2.5)
    const nPos = new Float32Array(n.length * 3)
    n.forEach((node, i) => {
      nPos[i * 3] = node.position.x
      nPos[i * 3 + 1] = node.position.y
      nPos[i * 3 + 2] = node.position.z
    })

    // Build line segments
    const segments: number[] = []
    const visited = new Set<string>()
    n.forEach((node, i) => {
      node.connections.forEach((j) => {
        const key = `${Math.min(i, j)}-${Math.max(i, j)}`
        if (!visited.has(key)) {
          visited.add(key)
          segments.push(
            node.position.x, node.position.y, node.position.z,
            n[j].position.x, n[j].position.y, n[j].position.z
          )
        }
      })
    })
    const lPos = new Float32Array(segments)
    return { nodes: n, nodePositions: nPos, linePositions: lPos, lineCount: segments.length / 6 }
  }, [])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (pointsRef.current) {
      const positions = pointsRef.current.geometry.attributes.position
      for (let i = 0; i < nodes.length; i++) {
        const orig = nodes[i].originalPosition
        positions.setXYZ(
          i,
          orig.x + Math.sin(t * 0.5 + i * 0.3) * 0.08,
          orig.y + Math.cos(t * 0.4 + i * 0.5) * 0.08,
          orig.z + Math.sin(t * 0.3 + i * 0.7) * 0.08
        )
      }
      positions.needsUpdate = true
    }

    if (linesRef.current) {
      const positions = linesRef.current.geometry.attributes.position
      let idx = 0
      const visited = new Set<string>()
      nodes.forEach((node, i) => {
        node.connections.forEach((j) => {
          const key = `${Math.min(i, j)}-${Math.max(i, j)}`
          if (!visited.has(key)) {
            visited.add(key)
            const pA = pointsRef.current!.geometry.attributes.position
            positions.setXYZ(idx * 2, pA.getX(i), pA.getY(i), pA.getZ(i))
            positions.setXYZ(idx * 2 + 1, pA.getX(j), pA.getY(j), pA.getZ(j))
            idx++
          }
        })
      })
      positions.needsUpdate = true
    }

    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.03
      groupRef.current.rotation.x = Math.sin(t * 0.02) * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[nodePositions, 3]}
            count={nodes.length}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#0000FF"
          size={0.1}
          transparent
          opacity={0.8}
          sizeAttenuation
        />
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
            count={lineCount * 2}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#0000FF"
          transparent
          opacity={0.15}
        />
      </lineSegments>
    </group>
  )
}
