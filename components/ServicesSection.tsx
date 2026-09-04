"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { RippleCircle } from "@/components/ui/ripple-circle";
import ItemsCardSkeleton from "@/components/ui/product-cards-skeleton";
import ItemsCard from "@/components/ui/product-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Service } from "@/app/types/types";

export default function ServicesSection() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  const [api, setApi] = useState<CarouselApi>();
  const [index, setIndex] = useState(0);
  const [snaps, setSnaps] = useState<number[]>([]);

  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.2 });

  // Bind Carousel API & State Listeners
  useEffect(() => {
    if (!api) return;

    const onReInit = () => {
      setSnaps(api.scrollSnapList());
      setIndex(api.selectedScrollSnap());
    };

    const onSelect = () => {
      setIndex(api.selectedScrollSnap());
    };

    onReInit();

    api.on("reInit", onReInit);
    api.on("select", onSelect);

    return () => {
      api.off("reInit", onReInit);
      api.off("select", onSelect);
    };
  }, [api]);

  // Fetch services when scrolled into view
  useEffect(() => {
    if (inView) {
      setLoading(true);
      const timer = setTimeout(() => {
        fetch("/api/services")
          .then((res) => res.json())
          .then((data) => {
            if (data.success) setServices(data.services || []);
          })
          .catch(console.error)
          .finally(() => setLoading(false));
      }, 200);

      return () => clearTimeout(timer);
    }
  }, [inView]);

  // Progress Bar percentage calculation
  const totalSnaps = snaps.length;
  const progressPercent = totalSnaps > 1 ? ((index + 1) / totalSnaps) * 100 : 0;

  return (
    <section ref={sectionRef} className="relative pt-16 pb-8">
      {inView && (
        <RippleCircle
          rippleCircles={[200, 400, 600, 800]}
          className="absolute top-0 md:-left-10 opacity-60 pointer-events-none select-none z-0 block"
        />
      )}

      <div className="w-full mx-auto px-4 sm:px-8">
        <h2 className="text-4xl lg:text-6xl font-semibold text-gray-900 leading-tight font-heading text-center mb-8">
          Our{" "}
          <span className="bg-gradient-to-r from-lapis via-rosequartz to-emerald bg-clip-text text-transparent">
            Services
          </span>
        </h2>

        {/* Carousel Container */}
        <div className="relative max-w-7xl mx-auto px-12">
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: false,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {loading
                ? Array.from({ length: 6 }).map((_, idx) => (
                    <CarouselItem
                      key={idx}
                      className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
                    >
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <ItemsCardSkeleton />
                      </motion.div>
                    </CarouselItem>
                  ))
                : services.map((item) => (
                    <CarouselItem
                      key={item.slug}
                      className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                      >
                        <ItemsCard
                          id={item.slug}
                          name={item.name}
                          summary={item.summary}
                          category={item.category || "Service"}
                          image={item.imageUrl ?? "/images/placeholder.png"}
                          type="service"
                        />
                      </motion.div>
                    </CarouselItem>
                  ))}
            </CarouselContent>

            {/* Navigation Arrows */}
            <CarouselPrevious className="left-0 md:-left-6 bg-white border shadow-md hover:bg-muted" />
            <CarouselNext className="right-0 md:-right-6 bg-white border shadow-md hover:bg-muted" />
          </Carousel>
        </div>

        {/* Progress Bar & Slide Counter */}
        {totalSnaps > 1 && (
          <div className="max-w-xs mx-auto mt-8 px-4 flex flex-col items-center gap-2">
            {/* Progress Track */}
            <div className="w-full bg-primary/15 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-primary h-full transition-all duration-300 ease-out rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            
            {/* Counter Text */}
            <span className="text-xs font-mono text-muted-foreground font-medium">
              {index + 1} / {totalSnaps}
            </span>
          </div>
        )}
      </div>
    </section>
  );
}