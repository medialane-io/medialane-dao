export const siteConfig = {
  name: 'Medialane',
  title: 'Medialane DAO',
  description:
    'Monetization hub for the integrity web.',
  tagline: 'Medialane DAO dapp, powered on Starknet',
  url: 'https://medialane.org',
} as const

// brand colors used throughout the app; pulling from a single source makes
// it trivial to adjust the palette without hunting through JSX files.
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
    label: 'Connect',
    href: '/connect',
    description: 'Get involved',
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
