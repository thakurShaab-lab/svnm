"use client";

import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";

interface FaqData {
  _id: string;
  question: string;
  answer: string;
  order: number;
}

interface FaqAccordionProps {
  productSlug?: string;
  serviceSlug?: string;
}

export function FaqAccordion({ productSlug, serviceSlug }: FaqAccordionProps = {}) {
  const [faqs, setFaqs] = useState<FaqData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const params = new URLSearchParams();
        if (productSlug) params.set("productSlug", productSlug);
        if (serviceSlug) params.set("serviceSlug", serviceSlug);
        const query = params.toString();

        const res = await fetch(query ? `/api/faq?${query}` : "/api/faq");
        if (!res.ok) {
          throw new Error(`Failed to fetch FAQs: ${res.statusText}`);
        }

        const data = await res.json();

        if (!data.success) {
          throw new Error(data.error || "Failed to load FAQs");
        }

        setFaqs(data.faqs || []);
        setError(null);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "An unknown error occurred";
        console.error("Error fetching FAQs:", errorMessage);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchFaqs();
  }, [productSlug, serviceSlug]);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto space-y-4">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="h-14 rounded-lg border bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto text-center py-8">
        <p className="text-muted-foreground mb-4">{error}</p>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    );
  }

  if (faqs.length === 0) {
    return (
      <div className="max-w-2xl mx-auto text-center py-16">
        <HelpCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-foreground mb-2">
          No FAQs available yet
        </h3>
        <p className="text-muted-foreground">
          Check back soon, or reach out to us directly with your questions.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Accordion type="single" collapsible className="w-full border-t">
        {faqs.map((faq) => (
          <AccordionItem key={faq._id} value={faq._id}>
            <AccordionTrigger className="text-base md:text-lg">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-sm md:text-base">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
