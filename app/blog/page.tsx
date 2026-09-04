"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { HeroSection } from "@/components/ui/hero-section";
import { Button } from "@/components/ui/button";
import { Newspaper } from "lucide-react";

interface BlogPostData {
  _id: string;
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  image?: string;
  publishedAt?: string | null;
}

function BlogListItem({
  slug,
  title,
  excerpt,
  image,
  publishedAt,
}: BlogPostData) {
  const router = useRouter();
  const [imageError, setImageError] = useState(false);
  const hasImage = image && image !== "" && !imageError;

  const formattedDate = publishedAt
    ? new Date(publishedAt)
        .toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
        .toUpperCase()
    : null;

  return (
    <a
      href={`/blog/${slug}`}
      onClick={(e) => {
        e.preventDefault();
        router.push(`/blog/${slug}`);
      }}
      className="group flex items-start gap-5 py-6 first:pt-0"
    >
      <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
        {hasImage ? (
          <Image
            src={image as string}
            alt={title}
            fill
            sizes="112px"
            className="object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-muted/50 to-muted">
            <Newspaper className="h-7 w-7 text-muted-foreground/50" />
          </div>
        )}
      </div>

      <div className="min-w-0 flex-1">
        {formattedDate && (
          <p className="text-xs font-medium tracking-wide text-muted-foreground mb-1.5">
            {formattedDate}
          </p>
        )}
        <h3 className="text-lg font-bold text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors duration-200">
          {title}
        </h3>
        {excerpt && (
          <p className="text-sm text-muted-foreground mt-1.5 line-clamp-2 leading-relaxed">
            {excerpt}
          </p>
        )}
      </div>
    </a>
  );
}

function BlogListItemSkeleton() {
  return (
    <div className="flex items-start gap-5 py-6 first:pt-0 animate-pulse">
      <div className="w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 rounded-lg bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer" />
      <div className="min-w-0 flex-1 space-y-2.5 py-1">
        <div className="h-3 w-24 rounded bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer" />
        <div className="h-5 w-3/4 rounded bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer" />
        <div className="h-4 w-full rounded bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer" />
      </div>
    </div>
  );
}

export default function Blog() {
  const [posts, setPosts] = useState<BlogPostData[]>([]);
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/blog");
        if (!res.ok) {
          throw new Error(`Failed to fetch blog posts: ${res.statusText}`);
        }

        const data = await res.json();

        if (!data.success) {
          throw new Error(data.error || "Failed to load blog posts");
        }

        const postsArr: BlogPostData[] = data.posts
          .filter((post: any) => post && post.title)
          .map((post: any) => ({
            _id: post._id?.toString() || "",
            slug: post.slug || post._id?.toString() || "",
            category: post.category || "Uncategorized",
            title: post.title,
            excerpt: post.excerpt || "",
            image: post.featuredImage || "",
            publishedAt: post.publishedAt || null,
          }));

        setPosts(postsArr);

        const uniqueCategories = Array.from(
          new Set(postsArr.map((p) => p.category).filter(Boolean))
        ).filter((c): c is string => Boolean(c));

        setCategories(["All", ...uniqueCategories]);
        setError(null);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "An unknown error occurred";
        console.error("Error fetching blog posts:", errorMessage);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const filteredPosts = posts.filter(
    (post) => selectedCategory === "All" || post.category === selectedCategory
  );

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8 max-w-2xl">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Error Loading Blog Posts
          </h2>
          <p className="text-muted-foreground mb-6">{error}</p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <HeroSection
        className="pt-8"
        title="Our Blog"
        subtitle="Insights, updates, and technical articles from SV Nanometrology"
      ></HeroSection>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {selectedCategory !== "All" && (
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              {selectedCategory}
            </h2>
          </div>
        )}

        {loading ? (
          <div className="divide-y divide-border">
            {[...Array(6)].map((_, index) => (
              <BlogListItemSkeleton key={index} />
            ))}
          </div>
        ) : filteredPosts.length > 0 ? (
          <div className="divide-y divide-border">
            {filteredPosts.map((post) => (
              <BlogListItem
                key={post.slug || post._id}
                _id={post._id}
                slug={post.slug || post._id}
                title={post.title}
                excerpt={post.excerpt}
                category={post.category}
                image={post.image ? `/api/images/${post.image}` : ""}
                publishedAt={post.publishedAt}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Newspaper className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No blog posts found
            </h3>
            <p className="text-muted-foreground mb-4">
              {selectedCategory === "All"
                ? "No blog posts are currently available."
                : `No blog posts found in the ${selectedCategory} category.`}
            </p>
            <Button variant="outline" onClick={() => setSelectedCategory("All")}>
              View All Posts
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
