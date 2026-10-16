import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

const _inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

import { colors } from '@/lib/site-config'

export const metadata: Metadata = {
  title: 'Medialane | Creator Capital Markets on the Integrity Web',
  description:
    'Medialane is the monetization hub of the new creative economy, bridging creators, businesses, and AI agents through a unified infrastructure.',
  icons: {
    icon: '/icon.png',
    apple: '/icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: colors.primary },
    { media: '(prefers-color-scheme: dark)', color: '#0C0C4F' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${_inter.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
