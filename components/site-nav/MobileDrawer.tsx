import Link from 'next/link'
import { cn } from '@/lib/utils'
import { navSections } from '@/lib/site-config'
import { ThemeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Zap, Compass, Shield, Users, Globe, Menu } from 'lucide-react'

const navIcons: Record<string, React.ComponentType<any>> = {
  Start: Zap,
  Explore: Compass,
  DAO: Shield,
  Members: Users,
  Connect: Globe,
}

interface MobileDrawerProps {
  pathname: string
  open: boolean
  setOpen: (open: boolean) => void
}

export function MobileDrawer({ pathname, open, setOpen }: MobileDrawerProps) {
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label="Open menu"
          className="text-muted-foreground"
        >
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="bottom"
        className="rounded-t-2xl border-t border-ml-glass-border bg-ml-glass backdrop-blur-xl"
      >
        <SheetHeader>
          <SheetTitle className="text-foreground">Medialane DAO</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-2 p-4">
          {navSections.map((section) => {
            const Icon = navIcons[section.label]
            const isActive = pathname === section.href
            return (
              <Link
                key={section.href}
                href={section.href}
                onClick={() => setOpen(false)}
                className={cn(
                  'flex items-center gap-3 rounded-xl px-4 py-3 transition-colors',
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-foreground hover:bg-secondary'
                )}
              >
                <Icon className="size-5" />
                <div>
                  <div className="font-medium">{section.label}</div>
                  <div className="text-xs text-muted-foreground">
                    {section.description}
                  </div>
                </div>
              </Link>
            )
          })}
          <div className="mt-2 flex items-center justify-between px-4">
            <span className="text-sm text-muted-foreground">Theme</span>
            <ThemeToggle />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
