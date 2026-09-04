import { getProductBySlug, getProducts } from "@/lib/mongoServices";
import { notFound } from "next/navigation";
// import { cache } from "react";
import type { Metadata } from "next";
import { ItemDetails } from "@/components/item-details";
import { HeroSection } from "@/components/ui/hero-section";
import { Button } from "@/components/ui/button";
import { Package, ArrowRight } from "lucide-react";
import { ProductSchema } from "@/components/ProductSchema"; // Add this import
import Link from "next/link";

export const revalidate = 3600; // ISR: revalidate every hour

// ✅ Cache product fetch
// const getProductBySlugCached = cache(getProductBySlug);

interface ProductDetailPageProps {
  params: Promise<{
    productId: string;
  }>;
}

export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const { productId } = await params;
  const product = await getProductBySlug(productId);
  if (!product) return {};

  const url = `https://www.svnanometrology.com/products/${productId}`;

  return {
    title: `${product.name} | SV Nanometrology`,
    description:
      product.description ||
      product.summary ||
      "High-precision measurement tools and gauges",
    alternates: {
      canonical: url, // ✅ Added Canonical URL for advanced SEO
    },
    openGraph: {
      title: `${product.name} | SV Nanometrology`,
      description:
        product.description ||
        product.summary ||
        "High-precision measurement tools and gauges",
      images: product.image
        ? [`https://www.svnanometrology.com/api/images/${product.image}`]
        : [],
      type: "website", // Changed from "product" to "website"
      url: url,
      siteName: "SV Nanometrology Pvt. Ltd.",
    },
    twitter: { // ✅ Added Twitter Card for social sharing
      card: "summary_large_image",
      title: `${product.name} | SV Nanometrology`,
      description:
        product.description ||
        product.summary ||
        "High-precision measurement tools and gauges",
      images: product.image
        ? [`https://www.svnanometrology.com/api/images/${product.image}`]
        : [],
    }
  };
}

export async function generateStaticParams() {
  const products = await getProducts();
  // console.log(products);

  return products.map((product) => ({
    productId: product.slug || product._id?.toString(),
  }));
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { productId } = await params;
  const product = await getProductBySlug(productId);

  if (!product) {
    notFound();
  }

  return (
    <>
      <ProductSchema product={product} />
      <div className="min-h-screen bg-white">
        <HeroSection
          title={product.name}
          subtitle={product.summary || ""} // Changed from description to subtitle
          className="bg-gradient-to-r from-blue-50 pt-8 to-gray-50"
        >
          <div className="relative z-10 pointer-events-auto flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg" className="gap-2">
              <Link href="/contact-us">
                Request Quote <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild size="lg" className="gap-2">
              <Link href="/products">
                <Package className="h-4 w-4" /> View Catalog
              </Link>
            </Button>
          </div>
        </HeroSection>

        <div className="container py-12">
          <ItemDetails item={product} type="product" />
        </div>
      </div>
    </>
  );
}
