export const siteConfig = {
  name: 'Medialane',
  title: 'Medialane DAO',
  description:
    'Building the integrity web for media on Starknet.',
  tagline: 'Digital Media Lanes in the Integrity Web',
  url: 'https://medialane.org',
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
    description: 'Enter the Integrity Web',
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
    label: 'Members',
    href: '/members',
    description: 'Token-gated Community',
  },
  {
    label: 'Connect',
    href: '/connect',
    description: 'Join the Network',
  },
]

/** Camera positions per route for the 3D scene */
export const cameraTargets: Record<string, [number, number, number]> = {
  '/': [0, 0, 8],
  '/explore': [5, 2, 6],
  '/dao': [-4, 3, 7],
  '/members': [0, -2, 5],
  '/connect': [3, -1, 9],
}
