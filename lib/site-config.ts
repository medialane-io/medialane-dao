export const siteConfig = {
  name: 'Medialane',
  title: 'Medialane DAO',
  description: 'Monetization hub for the integrity web.',
  tagline: 'Creator Capital Markets on the Integrity Web',
  url: 'https://medialane.org',
  email: 'dao@medialane.org',
  snapshot: 'https://snapshot.org/#/s:medialane.eth',
  ens: 'medialane.eth',
} as const

export const mdln = {
  symbol: 'MDLN',
  name: 'Medialane',
  totalSupply: 21_000_000,
  decimals: 18,
  network: 'Ethereum Mainnet',
  chainId: 1,
  token: '0x0DC90d57F3Aa3E836Ffd6E777E543a43A487dB15',
  vesting: '0x912f61d5e6db656ec1a7be8db8957c5f1e345d58',
  treasury: '0xA7603783edD8ee6FF4B085f90Af53341282d244C',
  etherscanToken: 'https://etherscan.io/token/0x0DC90d57F3Aa3E836Ffd6E777E543a43A487dB15',
  etherscanVesting: 'https://etherscan.io/address/0x912f61d5e6db656ec1a7be8db8957c5f1e345d58',
  etherscanTreasury: 'https://etherscan.io/address/0xA7603783edD8ee6FF4B085f90Af53341282d244C',
} as const

export const starknet = {
  network: 'Starknet Mainnet',
  mdlnL2: '0x6730d6a357690cebffad800219e9630e15b6f44d35526e0fc9ee52bdf7418e8',
  voyagerMdln: 'https://voyager.online/contract/0x6730d6a357690cebffad800219e9630e15b6f44d35526e0fc9ee52bdf7418e8',
} as const

export const creatorsFund = {
  address: '0x064c51746dbcb7498cc6e4b8abfcacd60805c0762b0411bb0515c611b5ae8223',
  voyager:
    'https://voyager.online/contract/0x064c51746dbcb7498cc6e4b8abfcacd60805c0762b0411bb0515c611b5ae8223',
  nextRoundUsd: 1000,
  tokens: [
    {
      symbol: 'STRK',
      name: 'Starknet Token',
      address: '0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d',
      decimals: 18,
      coingeckoId: 'starknet' as string | null,
    },
    {
      symbol: 'WBTC',
      name: 'Wrapped Bitcoin',
      address: '0x03fe2b97c1fd336e750087d68b9b867997fd64a2661ff3ca5a7c771641e8e7ac',
      decimals: 8,
      coingeckoId: 'bitcoin' as string | null,
    },
    {
      symbol: 'ETH',
      name: 'Ether',
      address: '0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7',
      decimals: 18,
      coingeckoId: 'ethereum' as string | null,
    },
    {
      symbol: 'USDC',
      name: 'USD Coin',
      address: '0x033068f6539f8e6e6b131e6b2b814e6c34a5224bc66947c47dab9dfee93b35fb',
      decimals: 6,
      coingeckoId: null as string | null,
    },
    {
      symbol: 'USDC.e',
      name: 'USD Coin (bridged)',
      address: '0x053c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8',
      decimals: 6,
      coingeckoId: null as string | null,
    },
    {
      symbol: 'USDT',
      name: 'Tether USD',
      address: '0x068f5c6a61780768455de69077e07e89787839bf8166decfbf92b645209c0fb8',
      decimals: 6,
      coingeckoId: null as string | null,
    },
  ],
} as const

export const colors = {
  primary: '#0000FF',
  secondary: '#EC796B',
  accent: '#E175B1',
} as const

export type NavSection = {
  label: string
  href: string
  description: string
}

export const navSections: NavSection[] = [
  {
    label: 'Start',
    href: '/',
    description: 'Enter Medialane',
  },
  {
    label: 'Explore',
    href: '/explore',
    description: 'Apps, Features & Services',
  },
  {
    label: 'DAO',
    href: '/dao',
    description: 'Foundation & Governance',
  },
  {
    label: 'Token',
    href: '/token',
    description: 'MDLN governance token',
  },
  {
    label: 'Build',
    href: '/build',
    description: 'SDK, contracts & AI agents',
  },
  {
    label: 'Airdrop',
    href: '/airdrop',
    description: "Creator's Airdrop",
  },
  {
    label: 'Connect',
    href: '/connect',
    description: 'Get involved',
  },
]
