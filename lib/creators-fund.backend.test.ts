import { afterEach, expect, test } from 'bun:test'
import { getCreatorsFundStatus } from '@/lib/creators-fund'
import { creatorsFund } from '@/lib/site-config'

const realFetch = globalThis.fetch
const envBefore = { key: process.env.MEDIALANE_API_KEY, url: process.env.MEDIALANE_BACKEND_URL }

type Sent = { url: string; headers: Record<string, string>; body: { method: string; params: [{ contract_address: string; calldata: string[] }, string] } }
const sent: Sent[] = []

function serve(rpcAnswer: () => Response) {
  globalThis.fetch = (async (input: string | URL | Request, init?: RequestInit) => {
    const url = String(input)
    if (url.includes('coingecko')) return Response.json({ starknet: { usd: 0.1 }, ethereum: { usd: 2000 }, bitcoin: { usd: 60000 } })
    sent.push({ url, headers: init?.headers as Record<string, string>, body: JSON.parse(String(init?.body)) })
    return rpcAnswer()
  }) as typeof fetch
}

afterEach(() => {
  globalThis.fetch = realFetch
  sent.length = 0
  if (envBefore.key === undefined) delete process.env.MEDIALANE_API_KEY
  else process.env.MEDIALANE_API_KEY = envBefore.key
  if (envBefore.url === undefined) delete process.env.MEDIALANE_BACKEND_URL
  else process.env.MEDIALANE_BACKEND_URL = envBefore.url
})

test('balances are read through the backend rpc with the api key', async () => {
  process.env.MEDIALANE_API_KEY = 'test-key'
  process.env.MEDIALANE_BACKEND_URL = 'https://backend.test'
  serve(() => Response.json({ jsonrpc: '2.0', id: 1, result: ['0x0', '0x0'] }))

  const status = await getCreatorsFundStatus()

  expect(sent).toHaveLength(creatorsFund.tokens.length)
  for (const [i, req] of sent.entries()) {
    expect(req.url).toBe('https://backend.test/v1/rpc')
    expect(req.headers['x-api-key']).toBe('test-key')
    expect(req.body.method).toBe('starknet_call')
    expect(req.body.params[0].contract_address).toBe(creatorsFund.tokens[i].address)
    expect(req.body.params[0].calldata).toEqual([creatorsFund.address])
  }
  expect(status.totalUsd).toBe(0)
})

test('without an api key nothing is requested and the balance is unknown', async () => {
  delete process.env.MEDIALANE_API_KEY
  serve(() => Response.json({ jsonrpc: '2.0', id: 1, result: ['0x0', '0x0'] }))

  const status = await getCreatorsFundStatus()

  expect(sent).toHaveLength(0)
  expect(status.totalUsd).toBeNull()
})

test('a refused rpc call leaves the balance unknown', async () => {
  process.env.MEDIALANE_API_KEY = 'test-key'
  serve(() => Response.json({ error: 'Payment required' }, { status: 402 }))

  const status = await getCreatorsFundStatus()

  expect(status.totalUsd).toBeNull()
})
