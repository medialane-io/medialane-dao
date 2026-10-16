import { test, expect } from 'bun:test'
import { deriveFundStatus } from '@/lib/creators-fund'
import type { FundToken, Distribution } from '@/lib/creators-fund'

test('deriveFundStatus: normal case sums USD and computes progress', () => {
  const tokens: FundToken[] = [{ symbol: 'STRK', balance: 0.45, usd: 0.054 }]
  const r = deriveFundStatus(tokens, [])
  expect(r.tokens).toEqual(tokens)
  expect(r.totalUsd).toBeCloseTo(0.054)
  expect(r.progressUsd).toBeCloseTo(0.054)
  expect(r.readyToDistribute).toBe(false)
  expect(r.roundsPaid).toBe(0)
  expect(r.totalReturnedUsd).toBe(0)
})

test('deriveFundStatus: at/above $1,000 is ready, progress caps at 1000', () => {
  const r = deriveFundStatus([{ symbol: 'STRK', balance: 9999, usd: 1500 }], [])
  expect(r.readyToDistribute).toBe(true)
  expect(r.progressUsd).toBe(1000)
})

test('deriveFundStatus: a null usd (failed fetch / missing price) nulls the total', () => {
  const r = deriveFundStatus([{ symbol: 'STRK', balance: 0.45, usd: null }], [])
  expect(r.totalUsd).toBeNull()
  expect(r.progressUsd).toBeNull()
  expect(r.readyToDistribute).toBe(false)
})

test('deriveFundStatus: zero-balance tokens are excluded from the displayed list', () => {
  const r = deriveFundStatus(
    [
      { symbol: 'STRK', balance: 0.45, usd: 0.05 },
      { symbol: 'ETH', balance: 0, usd: 0 },
    ],
    [],
  )
  expect(r.tokens.map((t) => t.symbol)).toEqual(['STRK'])
})

test('deriveFundStatus: distributions drive roundsPaid and totalReturnedUsd', () => {
  const dist: Distribution[] = [
    { round: 1, date: '2026-08-01', amountUsd: 1000, participants: 200, txHash: '0xa' },
    { round: 2, date: '2026-09-01', amountUsd: 1000, participants: 260, txHash: '0xb' },
  ]
  const r = deriveFundStatus([{ symbol: 'STRK', balance: 0, usd: 0 }], dist)
  expect(r.roundsPaid).toBe(2)
  expect(r.totalReturnedUsd).toBe(2000)
  expect(r.distributions).toBe(dist)
})
