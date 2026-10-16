import type { NavCommandGroup } from '@medialane/ui'
import { Home, Compass, Landmark, Gift, ShieldCheck, Coins, Wrench, BookOpen, Mail, Zap } from 'lucide-react'

export const NAV_COMMANDS: NavCommandGroup[] = [
  {
    items: [
      { id: 'home',       label: 'Start',      icon: Home,       href: '/',           keywords: ['home', 'start', 'medialane'] },
      { id: 'explore',    label: 'Explore',    icon: Compass,    href: '/explore',    keywords: ['features', 'protocol', 'what is medialane', 'wallet', 'self-custody', 'passkey', 'media wallet'] },
      { id: 'dao',        label: 'DAO',        icon: Landmark,   href: '/dao',        keywords: ['governance', 'foundation', 'snapshot', 'vote', 'proposals'] },
      { id: 'airdrop',    label: 'Airdrop',    icon: Gift,       href: '/airdrop',    keywords: ['creators fund', 'rewards', 'claim', 'distribution'] },
      { id: 'guidelines', label: 'Guidelines', icon: ShieldCheck, href: '/guidelines', keywords: ['community', 'compliance', 'rules', 'conduct', 'constitution', 'legal'] },
    ],
  },
  {
    heading: 'Navigate',
    items: [
      { id: 'token',   label: 'Token',   icon: Coins,    href: '/token',   keywords: ['mdln', 'tokenomics', 'governance token'] },
      {
        id: 'dapp',
        label: 'Starknet dApp',
        icon: Zap,
        action: () => window.open('https://starknet.medialane.io', '_blank', 'noopener,noreferrer'),
        keywords: ['dapp', 'starknet', 'wallet-sovereign', 'ready', 'braavos', 'self-custody'],
      },
      { id: 'build',   label: 'Build',   icon: Wrench,   href: '/build',   keywords: ['sdk', 'developers', 'ai agents'] },
      {
        id: 'docs',
        label: 'Docs',
        icon: BookOpen,
        action: () => window.open('https://docs.medialane.io', '_blank', 'noopener,noreferrer'),
        keywords: ['documentation', 'guides', 'how to', 'learn'],
      },
      { id: 'connect', label: 'Connect', icon: Mail,     href: '/connect', keywords: ['get involved', 'contact', 'community'] },
    ],
  },
]
