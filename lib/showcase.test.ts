import { test, expect } from 'bun:test'
import { resolveImage, pickShowcase } from '@/lib/showcase'
import type { RawCollection } from '@/lib/showcase'

test('resolveImage converts ipfs:// to a Pinata gateway URL', () => {
  expect(resolveImage('ipfs://QmAbc/cover.png')).toBe('https://gateway.pinata.cloud/ipfs/QmAbc/cover.png')
})

test('resolveImage passes through http(s) URLs unchanged', () => {
  expect(resolveImage('https://x.io/a.png')).toBe('https://x.io/a.png')
})

test('resolveImage returns null for null/empty', () => {
  expect(resolveImage(null)).toBeNull()
  expect(resolveImage('')).toBeNull()
})

test('pickShowcase keeps only collections with a name and image, dedupes, caps at 24', () => {
  const raw: RawCollection[] = [
    { name: 'A', contractAddress: '0x1', image: 'ipfs://q/a.png' },
    { name: null, contractAddress: '0x2', image: 'ipfs://q/b.png' }, // no name — drop
    { name: 'C', contractAddress: '0x3', image: null },              // no image — drop
    { name: 'A2', contractAddress: '0x1', image: 'https://x/a.png' },// dup address — drop
  ]
  const out = pickShowcase(raw)
  expect(out.map((c) => c.contractAddress)).toEqual(['0x1'])
  expect(out[0].image!.startsWith('http')).toBe(true)
})
