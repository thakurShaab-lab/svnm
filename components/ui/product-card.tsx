"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  id: string;
  name: string;
  summary: string;
  category: string;
  image: string;
  type: "product" | "service";
  className?: string;
}

export default function ProductCard({
  id,
  name,
  summary,
  category,
  image,
  type,
  className,
}: ProductCardProps) {
  const router = useRouter();
  const [imageError, setImageError] = useState(false);
  const basePath = type === "product" ? "/products" : "/services";

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log(`Navigating to: ${basePath}/${id}`);
    router.push(`${basePath}/${id}`);
  };

  const initials = name ? name.toUpperCase() : "NA";

  const hasImage = image && image !== "" && !imageError;

  // Create a proper URL for the image
  const imageUrl = image?.startsWith("http")
    ? image
    : image?.startsWith("/")
    ? image
    : `/images/${image || "placeholder.png"}`;

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
        {/* <Image
          src={imageUrl}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, 400px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          priority={false}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "/images/placeholder.png";
          }}
        /> */}
        {hasImage ? (
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority={false}
            onError={() => setImageError(true)}
          />
        ) : (
          /* Text-based fallback container */
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-muted/50 to-muted transition-colors duration-300 group-hover:from-primary/5 group-hover:to-primary/10">
            <span className="text-md font-extrabold tracking-wider text-muted-foreground/60 select-none group-hover:text-primary/40 transition-colors duration-300">
              {initials}
            </span>
          </div>
        )}
        <div className="absolute top-4 left-4">
          <Badge
            variant="secondary"
            className="bg-white/90 border-gray-200 border-[1px] text-foreground"
          >
            {category}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-5 flex flex-col justify-between">
        <div className="space-y-1 flex-1">
          <h3 className="font-semibold text-base md:text-lg text-center line-clamp-2 text-foreground group-hover:text-primary transition-colors duration-300">
            {name}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-3 text-center leading-relaxed">
            {summary}
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          className="w-full mt-3 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300"
          onClick={handleClick}
        >
          <span className="flex items-center justify-center gap-2 w-full h-full">
            View Details
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </Button>
      </div>
    </div>
  );
}
