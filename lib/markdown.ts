import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const contentDirectory = path.join(process.cwd(), 'content');

export interface PostMetadata {
    title: string;
    date: string;
    author?: string;
    description?: string;
    slug: string;
}

export function getAllPosts(subdirectory: string = ''): PostMetadata[] {
    const targetDirectory = path.join(contentDirectory, subdirectory);

    // Ensure the directory exists
    if (!fs.existsSync(targetDirectory)) {
        return [];
    }

    const fileNames = fs.readdirSync(targetDirectory);
    const allPostsData = fileNames
        .filter((fileName) => fileName.endsWith('.md'))
        .map((fileName) => {
            const slug = fileName.replace(/\.md$/, '');
            const fullPath = path.join(targetDirectory, fileName);
            const fileContents = fs.readFileSync(fullPath, 'utf8');
            const { data } = matter(fileContents);

            return {
                slug,
                ...(data as { title: string; date: string; author?: string; description?: string }),
            };
        });

    // Sort posts by date (handling cases where date might be missing)
    return allPostsData.sort((a, b) => {
        if (!a.date || !b.date) return 0;
        return a.date < b.date ? 1 : -1;
    });
}

export async function getPostBySlug(slug: string, subdirectory: string = '') {
    const targetDirectory = path.join(contentDirectory, subdirectory);
    const fullPath = path.join(targetDirectory, `${slug}.md`);

    if (!fs.existsSync(fullPath)) {
        return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    const processedContent = await remark()
        .use(html)
        .process(content);

    const contentHtml = processedContent.toString();

    return {
        slug,
        contentHtml,
        metadata: data as PostMetadata,
    };
}
