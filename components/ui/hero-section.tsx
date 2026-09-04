"use client";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { HeroSectionProps } from "@/app/types/types";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export function HeroSection({
  title,
  subtitle,
  children,
  className,
  variant = "gradient",
}: HeroSectionProps) {
  const pathname = usePathname();

  // Show breadcrumbs only for these routes
  const showBreadcrumbs =
    pathname?.startsWith("/products") ||
    pathname?.startsWith("/services") ||
    pathname?.startsWith("/blog") ||
    pathname?.startsWith("/faqs");

  // Split path for dynamic breadcrumb items
  const pathSegments = pathname?.split("/").filter(Boolean) || [];
  return (
    <section
      className={cn(
        "relative overflow-hidden",
        variant === "gradient" && "bg-animated-gradienta",
        // variant === "default" && "bg-card",
        className
      )}
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {showBreadcrumbs && (
          <div className="absolute max-w-3xl px-4 sm:px-6 lg:px-8 -mt-6">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink className="text-white" href="/">
                    Home
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {pathSegments.map((segment, idx) => {
                  const href = "/" + pathSegments.slice(0, idx + 1).join("/");
                  const isLast = idx === pathSegments.length - 1;

                  return (
                    <div key={idx} className="flex items-center text-white">
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        {isLast ? (
                          <BreadcrumbPage>
                            {segment.charAt(0).toUpperCase() + segment.slice(1)}
                          </BreadcrumbPage>
                        ) : (
                          <BreadcrumbLink href={href}>
                            {segment.charAt(0).toUpperCase() + segment.slice(1)}
                          </BreadcrumbLink>
                        )}
                      </BreadcrumbItem>
                    </div>
                  );
                })}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        )}
        <div className="text-center">
          <h1
            className={cn(
              "text-4xl md:text-5xl lg:text-6xl font-semibold font-heading tracking-tight mb-6 text-white"
              // variant === "gradient" ? "text-white" : "text-white"
            )}
          >
            {title}
          </h1>
          {subtitle && (
            <p
              className={cn(
                "text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-white/90 font-accent"
                // variant === "gradient"
                //   ? "text-white/90"
                //   : "text-muted-foreground"
              )}
            >
              {subtitle}
            </p>
          )}
          {children}
        </div>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/20 to-transparent"></div>
    </section>
  );
}
