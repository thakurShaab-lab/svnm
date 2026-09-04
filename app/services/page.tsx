"use client";
import { useState, useEffect } from "react";
import { HeroSection } from "@/components/ui/hero-section";
import ProductCard from "@/components/ui/product-card";
import { Button } from "@/components/ui/button";
import { Package, ArrowRight } from "lucide-react";
import Link from "next/link";

interface ServiceData {
  _id: string;
  slug: string;
  category: string;
  name: string;
  summary: string;
  image?: string;
  description?: string;
}

export default function Services() {
  const [services, setServices] = useState<ServiceData[]>([]);
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch("/api/services");
        if (!res.ok) {
          throw new Error(`Failed to fetch services: ${res.statusText}`);
        }

        const data = await res.json();

        if (!data.success) {
          throw new Error(data.error || "Failed to load services");
        }

        // Transform and validate services data
        const servicesArr: ServiceData[] = data.services
          .filter((service: any) => service && service.name) // Filter out invalid entries
          .map((service: any) => ({
            _id: service._id?.toString() || "",
            slug: service.slug || service._id?.toString() || "",
            category: service.category || "Uncategorized",
            name: service.name,
            summary: service.summary || "",
            image: service.image || "",
            description: service.description,
          }));

        setServices(servicesArr);

        // Extract and set unique categories
        const uniqueCategories = Array.from(
          new Set(servicesArr.map((s) => s.category).filter(Boolean))
        ).filter((c): c is string => Boolean(c));

        setCategories(["All", ...uniqueCategories]);
        setError(null);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "An unknown error occurred";
        console.error("Error fetching services:", errorMessage);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const filteredProducts = services.filter(
    (service) =>
      selectedCategory === "All" || service.category === selectedCategory
  );

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8 max-w-2xl">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Error Loading Services
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
        title="Our Services"
        subtitle="Cutting-edge manufacturing equipment and systems designed for precision, efficiency, and reliability"
      >
      </HeroSection>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Navigation */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {selectedCategory !== "All" && (
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              {selectedCategory}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover our comprehensive range of{" "}
              {selectedCategory.toLowerCase()} designed for modern manufacturing
              excellence.
            </p>
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((service) => (
                <ProductCard
                  key={service.slug || service._id}
                  id={service.slug || service._id}
                  name={service.name}
                  summary={service.summary}
                  category={service.category}
                  image={service.image ? `/api/images/${service.image}` : ""}
                  type="service"
                />
              ))
            ) : (
              <div className="col-span-full text-center py-16">
                <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  No services found
                </h3>
                <p className="text-muted-foreground mb-4">
                  {selectedCategory === "All"
                    ? "No services are currently available."
                    : `No services found in the ${selectedCategory} category.`}
                </p>
                <Button
                  variant="outline"
                  onClick={() => setSelectedCategory("All")}
                >
                  View All Services
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
