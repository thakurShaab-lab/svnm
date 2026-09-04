"use client";

import { cn } from "@/lib/utils";

export default function ProductCardSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-pulse bg-card rounded-xl border border-border/50 overflow-hidden flex flex-col",
        className
      )}
    >
      {/* Image placeholder */}
      <div className="relative w-full aspect-[4/3] bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer" />

      {/* Content */}
      <div className="flex-1 p-5 flex flex-col justify-between">
        <div className="space-y-3 flex-1">
          <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-3/4 mx-auto bg-[length:200%_100%] animate-shimmer" />
          <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-full bg-[length:200%_100%] animate-shimmer" />
          <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-5/6 mx-auto bg-[length:200%_100%] animate-shimmer" />
        </div>
        <div className="h-9 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded mt-3 w-full bg-[length:200%_100%] animate-shimmer" />
      </div>
    </div>
  );
}
