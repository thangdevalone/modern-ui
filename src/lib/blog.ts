import fs from 'fs';
import path from 'path';
import { compileMDX } from 'next-mdx-remote/rsc';
import { useMDXComponents } from '@/mdx-components';
import matter from 'gray-matter';
import { CompileMDXResult } from 'next-mdx-remote/rsc';

export interface BlogPost {
  title: string;
  description: string;
  date: string;
  slug: string;
  image?: string;
  tags?: string[];
  content: CompileMDXResult<Record<string, unknown>>;
}

const blogDir = path.join(process.cwd(), 'src/mdx/blogs');

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    if (!fs.existsSync(blogDir)) {
      return null;
    }

    const filePath = path.join(blogDir, `${slug}.mdx`);
    if (!fs.existsSync(filePath)) {
      return null;
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { frontmatter, content } = await parseMDX(fileContent);

    return {
      title: frontmatter.title,
      description: frontmatter.description || '',
      date: frontmatter.date,
      slug: slug,
      image: frontmatter.image,
      tags: frontmatter.tags || [],
      content,
    };
  } catch (error) {
    console.error('Error getting blog post:', error);
    return null;
  }
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  // Create blog directory if it doesn't exist
  if (!fs.existsSync(blogDir)) {
    fs.mkdirSync(blogDir, { recursive: true });
    return [];
  }

  try {
    const files = fs.readdirSync(blogDir);
    const mdxFiles = files.filter((file) => file.endsWith('.mdx'));

    const posts = await Promise.all(
      mdxFiles.map(async (file) => {
        const slug = file.replace('.mdx', '');
        const post = await getBlogPost(slug);
        return post;
      })
    );

    return posts
      .filter((post): post is BlogPost => post !== null)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error('Error getting all blog posts:', error);
    return [];
  }
}

async function parseMDX(source: string) {
  const { content, data } = matter(source);
  const components = useMDXComponents();
  const mdxSource = await compileMDX({
    source: content,
    components,
    options: {
      parseFrontmatter: true,
    },
  });

  return {
    frontmatter: {
      title: data.title || 'Untitled',
      description: data.description || '',
      date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
      image: data.image || null,
      tags: data.tags || [],
    },
    content: mdxSource,
  };
} 