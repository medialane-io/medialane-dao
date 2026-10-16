import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight, ArrowRight } from 'lucide-react'
import { getAllPosts } from '@/lib/markdown'
import { FadeIn } from '@medialane/ui'

export const metadata: Metadata = {
  title: 'Guidelines | Medialane DAO',
  description: 'Medialane DAO founding documents, community guidelines, and legal policies.',
}

const sections = [
  { label: 'Founding documents', accent: 'text-brand-purple', docs: getAllPosts('dao') },
  { label: 'Legal', accent: 'text-brand-blue', docs: getAllPosts('') },
]

export default function GuidelinesPage() {
  return (
    <div className="space-y-20 sm:space-y-24">

      <section className="px-4 pt-16 sm:px-6 sm:pt-20 lg:px-10 lg:pt-24 xl:px-14">
        <FadeIn className="max-w-3xl">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Guidelines</p>
          <h1 className="text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            How the DAO works
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            The documents that govern Medialane: its founding charter, community guidelines, and
            legal policies. Everything here is public and shapes how the community runs the
            platform.
          </p>
        </FadeIn>
      </section>

      {sections.map((section) => {
        if (section.docs.length === 0) return null
        return (
          <section key={section.label} className="px-4 sm:px-6 lg:px-10 xl:px-14">
            <FadeIn>
              <p className={`mb-3 text-xs font-bold uppercase tracking-[0.2em] ${section.accent}`}>
                {section.label}
              </p>
              <div className="divide-y divide-border/50 border-t border-border/50">
                {section.docs.map((doc) => (
                  <Link
                    key={doc.slug}
                    href={`/guidelines/${doc.slug}`}
                    className="group flex items-start justify-between gap-6 py-5"
                  >
                    <div>
                      <p className="text-base font-bold text-foreground">{doc.title}</p>
                      {doc.description && (
                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{doc.description}</p>
                      )}
                    </div>
                    <ArrowRight className="mt-1 size-5 shrink-0 text-muted-foreground/30 transition-colors group-hover:text-foreground" />
                  </Link>
                ))}
              </div>
            </FadeIn>
          </section>
        )
      })}

      <section className="px-4 pb-8 sm:px-6 lg:px-10 xl:px-14">
        <FadeIn>
          <div className="rounded-2xl bg-gradient-to-br from-brand-purple/10 via-brand-blue/5 to-brand-orange/10 p-8 sm:p-12">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-brand-blue">
              Product documentation
            </p>
            <h2 className="max-w-2xl text-3xl font-black tracking-tight sm:text-4xl">
              Learn how to use Medialane
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Step-by-step guides, the developer SDK, and everything about how the platform works
              live in one place, the Medialane documentation hub.
            </p>
            <a
              href="https://docs.medialane.io"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-brand-blue px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-blue/90"
            >
              Visit docs.medialane.io <ArrowUpRight className="size-4" />
            </a>
          </div>
        </FadeIn>
      </section>

    </div>
  )
}
