import { notFound } from 'next/navigation';
import { getAllPosts, getPostBySlug } from '@/lib/markdown';
import { PageHeader } from '@/components/page-header';
import { GlassCard } from '@/components/glass-card';

interface PostPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateStaticParams() {
    const posts = getAllPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export default async function PostPage({ params }: PostPageProps) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    const { metadata, contentHtml } = post;

    return (
        <div className="container py-8 md:py-12">
            <PageHeader
                title={metadata.title}
                description={metadata.description}
            />

            <div className="mx-auto max-w-4xl">
                <GlassCard className="p-8 md:p-12 overflow-hidden">
                    <div className="mb-8 flex flex-wrap items-center gap-4 text-sm text-muted-foreground border-b border-ml-glass-border pb-6">
                        {metadata.date && (
                            <time dateTime={metadata.date}>
                                {new Date(metadata.date).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })}
                            </time>
                        )}
                        {metadata.author && (
                            <>
                                <span className="w-1 h-1 rounded-full bg-border" />
                                <span>{metadata.author}</span>
                            </>
                        )}
                    </div>

                    <article
                        className="prose max-w-none"
                        dangerouslySetInnerHTML={{ __html: contentHtml }}
                    />
                </GlassCard>
            </div>
        </div>
    );
}
