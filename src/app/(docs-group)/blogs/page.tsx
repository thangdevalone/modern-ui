import { Badge } from "@/components/modern-ui/badge";
import { Button } from "@/components/modern-ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/modern-ui/card";
import { getAllBlogPosts } from "@/lib/blog";
import { formatDate } from "date-fns";
import { ArrowRight, Calendar } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog",
  description: "Read our latest blog posts",
};

export default async function BlogPage() {
  const posts = await getAllBlogPosts();

  return (
    <div>
      <h1 className="text-3xl md:text-4xl font-bold md:mb-8 mb-4">Blog</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link href={`/blogs/${post.slug}`} key={post.slug} className="group">
            <Card childClassname="h-full flex flex-col" className="h-full p-0 overflow-hidden border-0 bg-background shadow-md hover:shadow-xl transition-all duration-300">
              <div className="aspect-video w-full overflow-hidden">
                <img
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <CardHeader className="p-4 pb-2">
                <div className="flex flex-row gap-2 flex-wrap">
                  {post.tags?.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="bg-purple-50 text-purple-700 border-purple-200"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
                <h2 className="text-xl font-bold tracking-tight transition-colors group-hover:text-purple-600">
                  {post.title}
                </h2>
              </CardHeader>
              <CardContent className="p-4 pt-0 flex-1">
                <p className="text-muted-foreground line-clamp-2">
                  {post.description}
                </p>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex justify-between items-center">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="mr-1 h-3 w-3" />
                  {formatDate(post.date, "PPP")}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="group-hover:text-purple-600 hover:text-purple-600 group-hover:bg-purple-50 transition-colors hidden sm:flex"
                >
                  Read more <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
