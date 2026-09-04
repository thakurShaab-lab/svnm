import type { Metadata } from "next";
import { HeroSection } from "@/components/ui/hero-section";
import { FaqAccordion } from "@/components/faq-accordion";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about SV Nanometrology Pvt. Ltd.'s products, services, and precision measurement equipment.",
  keywords: [
    "SV Nanometrology FAQ",
    "Metrology Questions",
    "Precision Equipment FAQ",
  ],
  openGraph: {
    title: "FAQ | SV Nanometrology Pvt. Ltd.",
    description:
      "Frequently asked questions about SV Nanometrology Pvt. Ltd.'s products, services, and precision measurement equipment.",
    url: "https://www.svnanometrology.com/faqs",
    siteName: "SV Nanometrology Pvt. Ltd.",
    locale: "en_IN",
    type: "website",
  },
  alternates: {
    canonical: "https://www.svnanometrology.com/faqs",
  },
};

export default function FaqPage() {
  return (
    <main className="min-h-screen">
      <HeroSection
        className="pt-8"
        title="Frequently Asked Questions"
        subtitle="Answers to common questions about our products, services, and support"
      ></HeroSection>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <FaqAccordion />

        <div className="max-w-3xl mx-auto mt-16 text-center border-t pt-10">
          <h3 className="text-xl sm:text-2xl font-semibold font-heading text-foreground mb-3">
            Still have questions?
          </h3>
          <p className="text-muted-foreground mb-6">
            Can&apos;t find the answer you&apos;re looking for? Get in touch with our team.
          </p>
          <Button asChild size="lg" className="gap-2">
            <Link href="/contact-us">
              <Mail className="h-4 w-4" />
              Enquire Now
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
