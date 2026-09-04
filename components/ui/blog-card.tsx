"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface BlogCardProps {
  slug: string;
  title: string;
  excerpt: string;
  category?: string;
  image: string;
  publishedAt?: string | null;
  className?: string;
}

export default function BlogCard({
  slug,
  title,
  excerpt,
  category,
  image,
  publishedAt,
  className,
}: BlogCardProps) {
  const router = useRouter();
  const [imageError, setImageError] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push(`/blog/${slug}`);
  };

  const initials = title ? title.toUpperCase() : "NA";
  const hasImage = image && image !== "" && !imageError;

  const formattedDate = publishedAt
    ? new Date(publishedAt).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null;

  return (
    <div
      className={cn(
        "group bg-card rounded-xl border border-border/50 overflow-hidden",
        "hover:shadow-hover hover:border-primary/20 hover:-translate-y-1",
        "transition-all duration-300 flex flex-col h-full",
        className
      )}
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >
      {/* Image */}
      <div className="relative w-full aspect-[4/3] bg-gradient-card overflow-hidden">
        {hasImage ? (
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority={false}
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-muted/50 to-muted transition-colors duration-300 group-hover:from-primary/5 group-hover:to-primary/10">
            <span className="text-md font-extrabold tracking-wider text-muted-foreground/60 select-none group-hover:text-primary/40 transition-colors duration-300">
              {initials}
            </span>
          </div>
        )}
        {category && (
          <div className="absolute top-4 left-4">
            <Badge
              variant="secondary"
              className="bg-white/90 border-gray-200 border-[1px] text-foreground"
            >
              {category}
            </Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 p-5 flex flex-col justify-between">
        <div className="space-y-1 flex-1">
          {formattedDate && (
            <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground mb-1">
              <CalendarDays className="h-3.5 w-3.5" />
              {formattedDate}
            </p>
          )}
          <h3 className="font-semibold text-base md:text-lg text-center line-clamp-2 text-foreground group-hover:text-primary transition-colors duration-300">
            {title}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-3 text-center leading-relaxed">
            {excerpt}
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          className="w-full mt-3 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300"
          onClick={handleClick}
        >
          <span className="flex items-center justify-center gap-2 w-full h-full">
            Read More
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </Button>
      </div>
    </div>
  );
}
