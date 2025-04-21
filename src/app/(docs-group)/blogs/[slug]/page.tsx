import { getAllBlogPosts, getBlogPost } from "@/lib/blog";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return {
      title: "Blog Post Not Found",
    };
  }

  return {
    title: post.title,
    description: post.description,
  };
}

export async function generateStaticParams() {
  const posts = await getAllBlogPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) {
    notFound();
  }

  return (
    <article className="mx-auto w-full max-w-5xl">
      {post.image && (
        <div className="aspect-video relative w-full overflow-hidden rounded-lg mb-10 bg-muted">
          <img
            src={post.image}
            alt={post.title}
            className="object-cover w-full h-full"
          />
        </div>
      )}

      <div className="prose prose-slate dark:prose-invert max-w-none">
        {post.content.content}
      </div>
    </article>
  );
}
