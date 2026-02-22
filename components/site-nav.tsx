'use client'

import { usePathname } from 'next/navigation'
import { useState } from 'react'

import { DesktopNav } from '@/components/site-nav/DesktopNav'
import { MobileBar } from '@/components/site-nav/MobileBar'
import { MobileDrawer } from '@/components/site-nav/MobileDrawer'

/**
 * Desktop: Fixed right-edge vertical nav with glowing dot indicators
 * Mobile: Fixed bottom bar with icons + drawer for full menu
 */
export function SiteNav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <>
      <DesktopNav pathname={pathname} />
      <MobileBar pathname={pathname} />
      
    </>
  )
}
