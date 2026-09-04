"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// const Swiper = dynamic(() => import("swiper/react").then((mod) => mod.Swiper), {
//   ssr: false,
// });
// const SwiperSlide = dynamic(
//   () => import("swiper/react").then((mod) => mod.SwiperSlide),
//   { ssr: false }
// );

const heroSlides = [
  {
    id: 1,
    image: "/images/bg4.jpg",
    title: (
      <>
        SV Nanometrology <span className="text-blue-800 block">Pvt. Ltd.</span>
      </>
    ),
    subtitle:
      "We offer Highly precise gauging solutions like Thread Gauges, Air Gauging Systems - Air gauge Unit, Air Gauges, Standard and Special gauges, along with NABL-Accredited Calibration Services",
    position: "center",
    animationDirection: "up",
    buttons: [
      { label: "Explore Products", href: "/products", style: "primary" },
      { label: "Contact Us", href: "/contact-us", style: "secondary" },
    ],
  },
  {
    id: 2,
    image: "/images/bg7.jpg",
    title: (
      <>
        <span className="text-webYellow">NABL Accredited Calibration </span> LAB
        (CC-2472)
      </>
    ),
    subtitle:
      "Leading provider of Precision Dimension Calibration Services (Biggest Scope in India with best CMC) for industrial precision measurement applications",
    position: "left",
    animationDirection: "right",
    buttons: [{ label: "Our Services", href: "/services", style: "tertiary" }],
  },
  {
    id: 3,
    image: "/images/bg2.jpg",
    title: (
      <>
        <span className="text-blue-800">Quality</span> & Reliability
      </>
    ),
    subtitle:
      "Our calibration lab is ISO and NABL certified, ensuring accurate and reliable calibration services for your critical measurements.",
    position: "right",
    animationDirection: "left",
    buttons: [
      { label: "See Certificates", href: "/downloads", style: "primary" },
      { label: "About Us", href: "/about-us", style: "secondary" },
    ],
  },
];

export default function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <motion.div
      className="relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: "easeOut" }}
    >
      <Swiper
        className="relative w-full h-[480px] sm:h-[560px] md:h-[680px] lg:h-[760px] bg-black"
        style={
          {
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#fff",
            "--swiper-pagination-bullet-inactive-color": "#fff",
            "--swiper-pagination-bullet-inactive-opacity": "0.5",
          } as React.CSSProperties
        }
        spaceBetween={0}
        centeredSlides
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        pagination={{ clickable: true, dynamicBullets: true }}
        navigation
        loop
        speed={900}
        effect="slide"
        grabCursor
        modules={[Autoplay, Pagination, Navigation]}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
      >
        {heroSlides.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-[560px] md:h-[680px] lg:h-[760px]">
              {/* Background */}
              <div className="absolute inset-0 w-full h-full">
                <Image
                  src={slide.image}
                  alt={`Hero Background ${slide.id}`}
                  fill
                  priority // only first slide gets priority
                />
                <div className="absolute inset-0 bg-black/70" />
              </div>

              {/* Content */}
              <div
                className={[
                  "absolute inset-0 z-20 px-4 sm:px-6 lg:px-16 flex flex-col justify-center text-white",
                  // Mobile defaults to centered; side alignments kick in at sm+
                  slide.position === "left"
                    ? "items-center text-center sm:items-start sm:text-left"
                    : slide.position === "center"
                    ? "items-center text-center"
                    : "items-center text-center sm:items-end sm:text-right",
                ].join(" ")}
              >
                <motion.div
                  key={
                    activeIndex === index
                      ? `active-${slide.id}`
                      : `inactive-${slide.id}`
                  }
                  initial={
                    slide.animationDirection === "up"
                      ? { opacity: 0, y: 24 }
                      : slide.animationDirection === "right"
                      ? { opacity: 0, x: "40vw" }
                      : { opacity: 0, x: "-40vw" }
                  }
                  animate={
                    activeIndex === index ? { opacity: 1, x: 0, y: 0 } : {}
                  }
                  transition={{ duration: 0.9, ease: "easeOut" }}
                  className={[
                    "w-full space-y-4 sm:space-y-6",
                    slide.position === "center"
                      ? "max-w-2xl sm:max-w-3xl lg:max-w-4xl"
                      : "max-w-xl sm:max-w-2xl lg:max-w-3xl",
                  ].join(" ")}
                >
                  <motion.h1
                    className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.1, delay: 0.15, ease: "easeOut" }}
                  >
                    {slide.title}
                  </motion.h1>

                  <motion.p
                    className={[
                      "font-sans text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed text-white/80",
                      slide.position === "center"
                        ? "text-center max-w-xl sm:max-w-2xl mx-auto"
                        : slide.position === "left"
                        ? "text-left max-w-xl sm:max-w-2xl ml-0"
                        : "text-right w-full mr-0", // 👈 full width for right alignment
                    ].join(" ")}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.1, delay: 0.3, ease: "easeOut" }}
                  >
                    {slide.subtitle}
                  </motion.p>

                  <motion.div
                    className={[
                      "mt-6 sm:mt-8 flex w-full gap-3 sm:gap-4 flex-col sm:flex-row",
                      slide.position === "left"
                        ? "justify-center sm:justify-start"
                        : slide.position === "center"
                        ? "justify-center"
                        : "justify-center sm:justify-end",
                    ].join(" ")}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.1, delay: 0.45, ease: "easeOut" }}
                  >
                    {slide.buttons?.map((btn) => (
                      <Link
                        key={btn.label}
                        href={btn.href}
                        className={[
                          "font-accent px-5 sm:px-7 md:px-8 py-2.5 sm:py-3 md:py-3.5 rounded-lg font-semibold text-sm sm:text-base md:text-lg border-2 transition-colors duration-300 btn-animated-fill w-full sm:w-auto text-center",
                          btn.style === "primary"
                            ? "btn-animated-fill-primary"
                            : btn.style === "secondary"
                            ? "btn-animated-fill-secondary"
                            : btn.style === "tertiary"
                            ? "btn-animated-fill-tertiary"
                            : "",
                        ].join(" ")}
                      >
                        {btn.label}
                      </Link>
                    ))}
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Responsive tweaks for Swiper arrows/bullets */}
      <style jsx global>{`
        .swiper-button-next,
        .swiper-button-prev {
          width: 36px;
          height: 36px;
        }
        .swiper-button-next:after,
        .swiper-button-prev:after {
          font-size: 18px;
        }
        .swiper-pagination-bullet {
          width: 6px;
          height: 6px;
          opacity: 0.6;
        }
        .swiper-pagination-bullet-active {
          opacity: 1;
        }
        @media (min-width: 640px) {
          .swiper-button-next,
          .swiper-button-prev {
            width: 44px;
            height: 44px;
          }
          .swiper-button-next:after,
          .swiper-button-prev:after {
            font-size: 20px;
          }
          .swiper-pagination-bullet {
            width: 8px;
            height: 8px;
          }
        }
      `}</style>
    </motion.div>
  );
}
