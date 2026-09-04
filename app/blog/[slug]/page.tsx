import { getPublishedBlogPostBySlug, getPublishedBlogPosts } from "@/lib/mongoServices";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { HeroSection } from "@/components/ui/hero-section";
import { Button } from "@/components/ui/button";
import { Newspaper, ArrowRight, CalendarDays, UserRound } from "lucide-react";
import { BlogPostSchema } from "@/components/BlogPostSchema";
import { BlogContent } from "@/components/blog-content";
import Link from "next/link";

export const revalidate = 3600; // ISR: revalidate every hour

interface BlogDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedBlogPostBySlug(slug);
  if (!post) return {};

  const url = `https://www.svnanometrology.com/blog/${slug}`;

  return {
    title: `${post.title} | SV Nanometrology`,
    description: post.excerpt || "Insights from SV Nanometrology Pvt. Ltd.",
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${post.title} | SV Nanometrology`,
      description: post.excerpt || "Insights from SV Nanometrology Pvt. Ltd.",
      images: post.featuredImage
        ? [`https://www.svnanometrology.com/api/images/${post.featuredImage}`]
        : [],
      type: "article",
      url: url,
      siteName: "SV Nanometrology Pvt. Ltd.",
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | SV Nanometrology`,
      description: post.excerpt || "Insights from SV Nanometrology Pvt. Ltd.",
      images: post.featuredImage
        ? [`https://www.svnanometrology.com/api/images/${post.featuredImage}`]
        : [],
    },
  };
}

export async function generateStaticParams() {
  const posts = await getPublishedBlogPosts();

  return posts.map((post) => ({
    slug: post.slug || post._id?.toString(),
  }));
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const post = await getPublishedBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <>
      <BlogPostSchema post={post} />
      <div className="min-h-screen bg-white">
        <HeroSection
          title={post.title}
          subtitle={post.excerpt || ""}
          className="bg-gradient-to-r from-blue-50 pt-8 to-gray-50"
        >
          <div className="relative z-10 pointer-events-auto flex flex-wrap gap-4 justify-center items-center text-white/90 text-sm">
            {formattedDate && (
              <span className="flex items-center gap-1.5">
                <CalendarDays className="h-4 w-4" /> {formattedDate}
              </span>
            )}
            {post.author && (
              <span className="flex items-center gap-1.5">
                <UserRound className="h-4 w-4" /> {post.author}
              </span>
            )}
          </div>
          <div className="relative z-10 pointer-events-auto flex flex-wrap gap-4 justify-center mt-6">
            <Button variant="outline" asChild size="lg" className="gap-2">
              <Link href="/blog">
                <Newspaper className="h-4 w-4" /> View All Posts
              </Link>
            </Button>
          </div>
        </HeroSection>

        <div className="container py-12">
          {post.imageUrl && (
            <div className="max-w-3xl mx-auto mb-10 rounded-xl overflow-hidden border">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-auto object-cover"
              />
            </div>
          )}
          <BlogContent content={post.content} />
          <div className="max-w-3xl mx-auto mt-12 pt-8 border-t flex justify-center">
            <Button asChild size="lg" className="gap-2">
              <Link href="/blog">
                Back to Blog <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
