import { getServiceBySlug, getServices } from "@/lib/mongoServices";
import { notFound } from "next/navigation";
// import { cache } from "react";
import type { Metadata } from "next";
import { ItemDetails } from "@/components/item-details";
import { HeroSection } from "@/components/ui/hero-section";
import { Button } from "@/components/ui/button";
import { Package, ArrowRight } from "lucide-react";
import { ServiceSchema } from "@/components/ServiceSchema"; // Add this import
import Link from "next/link";

export const revalidate = 3600; // ISR: revalidate every hour

// ✅ Cache product fetch
// const getServiceBySlugCached = cache(getServiceBySlug);

interface ServiceDetailPageProps {
  params: Promise<{
    serviceId: string;
  }>;
}

export async function generateMetadata({
  params,
}: ServiceDetailPageProps): Promise<Metadata> {
  const { serviceId } = await params;
  const service = await getServiceBySlug(serviceId);
  if (!service) return {};

  const url = `https://www.svnanometrology.com/services/${serviceId}`;

  return {
    title: `${service.name} | SV Nanometrology`,
    description:
      service.description ||
      service.summary ||
      "High-precision calibration Services",
    alternates: {
      canonical: url, // ✅ Added Canonical URL for advanced SEO
    },
    openGraph: {
      title: `${service.name} | SV Nanometrology`,
      description:
        service.description ||
        service.summary ||
        "High-precision calibration Services",
      images: service.image
        ? [`https://www.svnanometrology.com/api/images/${service.image}`]
        : [],
      type: "website", // Changed from "product" to "website"
      url: url,
      siteName: "SV Nanometrology Pvt. Ltd.",
    },
    twitter: { // ✅ Added Twitter Card for social sharing
      card: "summary_large_image",
      title: `${service.name} | SV Nanometrology`,
      description:
        service.description ||
        service.summary ||
        "High-precision calibration Services",
      images: service.image
        ? [`https://www.svnanometrology.com/api/images/${service.image}`]
        : [],
    }
  };
}

export async function generateStaticParams() {
  const services = await getServices();
  // console.log(services);

  return services.map((service) => ({
    serviceId: service.slug || service._id?.toString(),
  }));
}

export default async function ServiceDetailPage({
  params,
}: ServiceDetailPageProps) {
  const { serviceId } = await params;
  const service = await getServiceBySlug(serviceId);

  if (!service) {
    notFound();
  }

  return (
    <>
      <ServiceSchema service={service} />
      <div className="min-h-screen bg-white">
        <HeroSection
          title={service.name}
          subtitle={service.summary || ""} // Changed from description to subtitle
          className="bg-gradient-to-r from-blue-50 pt-8 to-gray-50"
        >
          <div className="relative z-10 pointer-events-auto flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg" className="gap-2">
              <Link href="/contact-us">
                Request Quote <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild size="lg" className="gap-2">
              <Link href="/services">
                <Package className="h-4 w-4" /> View Catalog
              </Link>
            </Button>
          </div>
        </HeroSection>

        <div className="container">
          <ItemDetails item={service} type="service" />
        </div>
      </div>
    </>
  );
}
