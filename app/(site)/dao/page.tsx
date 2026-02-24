import type { Metadata } from 'next'
import { getAllPosts, getPostBySlug } from '@/lib/markdown'
import DAOPageClient from './page.client'

export const metadata: Metadata = {
  title: 'DAO | Medialane DAO',
}

export default async function DAOPage() {
  const postsMetadata = getAllPosts('dao')

  // Fetch and process each post to get HTML content
  const posts = await Promise.all(
    postsMetadata.map(async (meta) => {
      const post = await getPostBySlug(meta.slug, 'dao')
      return post
    })
  )

  // Filter out any nulls and format for the client component
  const documents = posts
    .filter((post): post is NonNullable<typeof post> => post !== null)
    .reduce((acc, post) => {
      acc[post.slug] = {
        title: post.metadata.title,
        contentHtml: post.contentHtml,
      }
      return acc
    }, {} as Record<string, { title: string; contentHtml: string }>)

  return <DAOPageClient documents={documents} />
}
