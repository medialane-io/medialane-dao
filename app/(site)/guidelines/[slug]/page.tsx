import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { getAllPosts, getPostBySlug } from '@/lib/markdown'

interface PostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const root = getAllPosts('')
  const dao  = getAllPosts('dao')
  return [...root, ...dao].map((post) => ({ slug: post.slug }))
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params

  const post =
    (await getPostBySlug(slug, 'dao')) ??
    (await getPostBySlug(slug, ''))

  if (!post) notFound()

  const { metadata, contentHtml } = post

  return (
    <div className="px-4 sm:px-6 lg:px-10 xl:px-14 pt-16 pb-10 sm:pt-20 sm:pb-12 lg:pt-24 lg:pb-16 max-w-3xl">

      <Link
        href="/guidelines"
        className="inline-flex items-center gap-1.5 text-xs text-muted-foreground/60 hover:text-foreground transition-colors mb-6"
      >
        <ChevronLeft className="size-3.5" />
        All Docs
      </Link>

      <div className="mb-6 pb-5 border-b border-border">
        <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground/40 mb-2">
          Medialane · Documentation
        </p>
        <h1 className="text-2xl font-bold text-foreground mb-2">{metadata.title}</h1>
        {(metadata.date || metadata.author) && (
          <div className="flex items-center gap-3 text-xs text-muted-foreground/50 font-mono">
            {metadata.date && (
              <time dateTime={metadata.date}>
                {new Date(metadata.date).toLocaleDateString('en-US', {
                  year: 'numeric', month: 'long', day: 'numeric',
                })}
              </time>
            )}
            {metadata.author && (
              <>
                <span>·</span>
                <span>{metadata.author}</span>
              </>
            )}
          </div>
        )}
      </div>

      <article
        className="prose prose-sm dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-primary"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
    </div>
  )
}
