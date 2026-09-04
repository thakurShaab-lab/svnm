"use client";

export const BlogPostSchema = ({ post }) => {
  if (!post) return null;

  const postSchema = {
    "@context": "https://schema.org/",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt || "",
    image: post.featuredImage
      ? `https://www.svnanometrology.com/api/images/${post.featuredImage}`
      : null,
    datePublished: post.publishedAt || post.createdAt,
    dateModified: post.updatedAt || post.publishedAt || post.createdAt,
    author: {
      "@type": "Organization",
      name: post.author || "SV Nanometrology Pvt. Ltd.",
    },
    publisher: {
      "@type": "Organization",
      name: "SV Nanometrology Pvt. Ltd.",
    },
    mainEntityOfPage: `https://www.svnanometrology.com/blog/${post.slug}`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(postSchema) }}
    />
  );
};
