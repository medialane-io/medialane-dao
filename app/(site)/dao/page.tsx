import type { Metadata } from 'next'
import { getAllPosts, getPostBySlug } from '@/lib/markdown'
import { getSnapshotProposals, getMdlnStats } from '@/lib/governance'
import DAOPageClient from './page.client'

export const metadata: Metadata = {
  title: 'DAO | Medialane',
  description: 'Medialane DAO governance: proposals, token stats, and founding documents.',
}

export default async function DAOPage() {
  const [postsMetadata, proposals, stats] = await Promise.all([
    getAllPosts('dao'),
    getSnapshotProposals(5),
    getMdlnStats(),
  ])

  const posts = await Promise.all(
    postsMetadata.map(async (meta) => {
      const post = await getPostBySlug(meta.slug, 'dao')
      return post
    })
  )

  const documents = posts
    .filter((post): post is NonNullable<typeof post> => post !== null)
    .reduce((acc, post) => {
      acc[post.slug] = {
        title: post.metadata.title,
        contentHtml: post.contentHtml,
      }
      return acc
    }, {} as Record<string, { title: string; contentHtml: string }>)

  return <DAOPageClient documents={documents} proposals={proposals} stats={stats} />
}
