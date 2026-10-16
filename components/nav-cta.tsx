import { ArrowUpRight } from 'lucide-react'

export function NavCta() {
  return (
    <a
      href="https://medialane.io"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-between gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
    >
      Open the Medialane app
      <ArrowUpRight className="h-4 w-4" />
    </a>
  )
}
