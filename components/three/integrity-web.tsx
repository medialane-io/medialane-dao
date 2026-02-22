'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { colors } from '@/lib/site-config'

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

  const { nodes, nodePositions, linePositions, lineCount, edgeIndices } = useMemo(() => {
    const n = generateNetwork(80, 5, 2.5)

    // flatten node positions once
    const nPos = new Float32Array(n.length * 3)
    n.forEach((node, i) => {
      nPos[i * 3] = node.position.x
      nPos[i * 3 + 1] = node.position.y
      nPos[i * 3 + 2] = node.position.z
    })

    // Build a list of unique edges (pairs of indices) and initial line buffer
    const edges: [number, number][] = []
    n.forEach((node, i) => {
      node.connections.forEach((j) => {
        if (i < j) {
          edges.push([i, j])
        }
      })
    })

    const segments = new Float32Array(edges.length * 6)
    edges.forEach(([i, j], k) => {
      const a = n[i].position
      const b = n[j].position
      const offset = k * 6
      segments[offset] = a.x
      segments[offset + 1] = a.y
      segments[offset + 2] = a.z
      segments[offset + 3] = b.x
      segments[offset + 4] = b.y
      segments[offset + 5] = b.z
    })

    const idxArray = new Uint16Array(edges.length * 2)
    edges.forEach(([i, j], k) => {
      idxArray[k * 2] = i
      idxArray[k * 2 + 1] = j
    })

    return {
      nodes: n,
      nodePositions: nPos,
      linePositions: segments,
      lineCount: edges.length,
      edgeIndices: idxArray,
    }
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
      const pA = pointsRef.current!.geometry.attributes.position
      const edges = edgeIndices
      // edges stored as [i0,j0,i1,j1,...]
      for (let k = 0; k < edges.length; k += 2) {
        const i = edges[k]
        const j = edges[k + 1]
        positions.setXYZ(k, pA.getX(i), pA.getY(i), pA.getZ(i))
        positions.setXYZ(k + 1, pA.getX(j), pA.getY(j), pA.getZ(j))
      }
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
          color={colors.primary}
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
          color={colors.primary}
          transparent
          opacity={0.15}
        />
      </lineSegments>
    </group>
  )
}
