"use client";

import type React from "react";
import { useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AnimatedBackground } from "./ui/animated-background";
import { Download, Mail, CheckCircle, Info } from "lucide-react";
import clsx from "clsx";
import Link from "next/link";
import { FaqAccordion } from "./faq-accordion";

interface ItemData {
  slug?: string;
  image: string;
  name: string;
  summary: string;
  category: string;
  categoryInfo: string;
  applications: string[];
  description: string;
  features: string[];
}

interface ItemDetailsProps {
  item: ItemData;
  type: "product" | "service";
  className?: string;
}
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};
const cardHoverVariants = {
  hover: { y: -5, scale: 1.02, transition: { duration: 0.2 } },
};

export function ItemDetails({ item, type, className }: ItemDetailsProps) {
  // ✅ Inject JSON-LD structured data for SEO
  useEffect(() => {
    const jsonLd = {
      "@context": "https://schema.org/",
      "@type": "Product",
      name: item.name,
      description: item.summary || item.description,
      category: item.category,
      image: item.image,
      application: item.applications,
      brand: { "@type": "Brand", name: "SV Nanometrology" },
      offers: {
        "@type": "Offer",
        url: typeof window !== "undefined" ? window.location.href : "",
        priceCurrency: "INR",
        availability: "https://schema.org/InStock",
      },
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.innerHTML = JSON.stringify(jsonLd);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [item]);

  return (
    <div className={clsx("min-h-screen bg-background w-screen relative", className)}>
      <AnimatedBackground />
      <motion.div
        className="relative z-10 mx-auto px-4 py-12 "
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Hero Section */}
        <motion.div className="mb-16" variants={itemVariants}>
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              className="relative bg-white/50"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {/* ✅ Use next/image for SEO + optimization */}
              <Image
                src={`/api/images/${item.image}`}
                alt={item.name}
                width={120}
                height={120}
                className="w-full h-96 object-contain rounded-lg shadow-2xl"
              />
              {/* <div className="absolute inset-0 bg-gradient-to-t from-[#57cc99]/20 to-transparent rounded-lg" /> */}
            </motion.div>

            <div className="space-y-6">
              <motion.h2
                className="text-4xl lg:text-5xl font-bold text-foreground"
                variants={itemVariants}
              >
                Description
              </motion.h2>
              <motion.p
                className="text-xl text-muted-foreground"
                variants={itemVariants}
              >
                {item.description}
              </motion.p>
              <motion.div variants={itemVariants}>
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                  <Link href="/contact-us">
                    <Mail className="mr-2 h-5 w-5" />
                    Enquire Now
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Category Section */}
        {item.category && (
          <motion.div className="mb-16" variants={itemVariants}>
            <Card className="bg-card/60 backdrop-blur-sm border-border/50">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Badge
                    variant="secondary"
                    className="bg-secondary text-secondary-foreground"
                  >
                    {item.category}
                  </Badge>
                  <Info className="h-5 w-5 text-muted-foreground" />
                </div>
              </CardHeader>
              {item.categoryInfo && (
                <CardContent>
                  <p className="text-muted-foreground">{item.categoryInfo}</p>
                </CardContent>
              )}
            </Card>
          </motion.div>
        )}

        {/* Applications Section */}
        {item.applications?.length > 0 && (
          <motion.section className="mb-16" variants={itemVariants}>
            <h2 className="text-3xl font-bold mb-8 text-foreground">
              Applications
            </h2>
            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
              variants={containerVariants}
            >
              {item.applications.map((application: string, index: number) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={cardHoverVariants.hover}
                >
                  <Card className="bg-card/60 backdrop-blur-sm border-border/50 h-full hover:shadow-lg transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                        <p className="text-sm text-card-foreground">
                          {application}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>
        )}

        {/* Description Section */}
        {/* {item.description && (
          <motion.section className="mb-16" variants={itemVariants}>
            <Card className="bg-card/60 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="text-2xl">Product Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          </motion.section>
        )} */}

        {/* Key Features Section */}
        {item.features?.length > 0 && (
          <motion.section className="mb-16" variants={itemVariants}>
            <h2 className="text-3xl font-bold mb-8 text-foreground">
              Key Features
            </h2>
            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
            >
              {/* {item.features.map(
                (
                  feature,
                  index: number
                ) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={cardHoverVariants.hover}
                  >
                    <Card className="bg-card/60 backdrop-blur-sm border-border/50 h-full hover:shadow-xl transition-all duration-300">
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-primary/10 text-primary">
                            {feature.icon ?? (
                              <CheckCircle className="h-5 w-5" />
                            )}
                          </div>
                          <CardTitle className="text-lg">
                            {feature.title}
                          </CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-muted-foreground">
                          {feature.description}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              )} */}
              {item.features?.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={cardHoverVariants.hover}
                >
                  <Card className="bg-card/60 backdrop-blur-sm border-border/50 h-full hover:shadow-xl transition-all duration-300">
                    <CardContent className="flex items-center gap-3 p-5">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      <p className="text-card-foreground">{feature}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>
        )}

        {/* FAQ Section */}
        <motion.section className="mb-16" variants={itemVariants}>
          <h2 className="text-3xl font-bold mb-8 text-foreground text-center">
            Frequently Asked Questions
          </h2>
          <FaqAccordion
            productSlug={type === "product" ? item.slug : undefined}
            serviceSlug={type === "service" ? item.slug : undefined}
          />
        </motion.section>

        {/* Footer CTA Section */}
        <motion.div variants={itemVariants}>
          <Card className="bg-gradient-to-r from-primary to-accent text-primary-foreground">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">
                Interested in this product?
              </h3>
              <p className="text-primary-foreground/90 mb-6 text-lg">
                Get in touch with our team to learn more or request a
                demonstration.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  variant="secondary"
                  className="bg-white text-primary hover:bg-white/90"
                >
                  <Link href="/contact-us">
                    <Mail className="mr-2 h-5 w-5" />
                    Enquire Now
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-primary bg-transparent"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Download Datasheet
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}
