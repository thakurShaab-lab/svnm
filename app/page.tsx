"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import Marquee from "react-fast-marquee";
import { Button } from "@/components/ui/button";
import { Typewriter } from "react-simple-typewriter";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowRight,
  Award,
  Users,
  Zap,
  CheckCircle,
  Headphones,
  Target,
  Globe,
  Star,
  FileCheck,
  Shield,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import {
  delay,
  motion,
  useScroll,
  useTransform,
  useInView,
  useMotionValueEvent,
} from "framer-motion";
import HeroSection from "@/components/HeroSection";
// import { getProducts, getServices } from "@/lib/mongoServices";
import { useEffect, useState } from "react";
// import { Autoplay, Pagination, Navigation } from "swiper/modules"
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const cardsData = [
  // { logo: "/images/bhel-logo.png", alt: "BHEL" },
  { logo: "/images/maruti-suzuki-logo.svg", alt: "Maruti Suzuki" },
  { logo: "/images/hero-motocorp-logo.svg", alt: "Hero Motocorp" },
  { logo: "/images/godrej-logo.png", alt: "Godrej" },
  // { logo: "/images/tata-logo.png", alt: "Tata Groups Pvt. Ltd." },
  { logo: "/images/jk-tyre-logo.png", alt: "JK Tyres" },
  // ...add more
];

const qualityPrinciples = [
  "Adherence to international calibration standards",
  "Use of state-of-the-art equipment for precise results",
  "Highly trained professionals ensuring quality assurance",
  "Continuous improvement through customer feedback & innovation",
];

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: -60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1.7 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const fadeInLeft = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1.7 },
};

const fadeInRight = {
  initial: { opacity: 0, x: 60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 1.7 },
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5 },
};

// Dynamically import the Services section with suspense
const ServicesSection = dynamic(
  () => import("@/components/ServicesSection"),
  { ssr: false } // client-side only
);

console.log("MONGODB_URI:",
  process.env.MONGODB_URI?.replace(/\/\/.*?:.*?@/, '//***:***@')
);


const ProductsSection = dynamic(
  () => import("@/components/ProductsSection"),
  { ssr: false } // client-side only
);

export default function HomePage() {
  const sectionRef = useRef(null);
  const chooseUsRef = useRef(null);
  const [startTyping, setStartTyping] = useState(false);

  const isoTextRef = useRef(null);
  const isoImageRef = useRef(null);
  const nablTextRef = useRef(null);
  const nablImageRef = useRef(null);

  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));

  const isIsoTextInView = useInView(isoTextRef, { once: true });
  const isIsoImageInView = useInView(isoImageRef, { once: true });
  const isNablTextInView = useInView(nablTextRef, { once: true });
  const isNablImageInView = useInView(nablImageRef, { once: true });

  const chooseUsInView = useInView(chooseUsRef, { once: true });

  // Track scroll within the section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"], // start when top hits top, end when bottom hits top
  });

  // Transform scroll progress to opacity or y position if needed
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "0%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.8]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartTyping(true);
          observer.disconnect(); // Run only once
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // useEffect(() => {
  //   console.log("Services in view:", servicesInView);
  // }, [servicesInView]);
  // console.log("Products:", products);
  // console.log("Services:", services);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <HeroSection />

      {/* About Us Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-24 bg-animated-gradienta overflow-x-hidden relative"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 text-white/90 items-center">
            
            {/* Left Content Column */}
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="space-y-3">
                <motion.h2
                  variants={fadeInLeft}
                  className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-white font-heading tracking-tight"
                >
                  About Us
                </motion.h2>
                <motion.div
                  variants={fadeInRight}
                  className="w-28 h-1.5 bg-amber-400 rounded-full"
                ></motion.div>
              </div>

              <motion.p
                variants={fadeInLeft}
                className="text-base sm:text-lg font-accent leading-relaxed text-white/90"
              >
                S.V. Nanometrology Private Limited is a trusted provider and
                trader of precision measurement instruments and services. We
                specialize in Taper Plug Gauges, Ring Gauges, and Calibration
                Services, ensuring accuracy and quality for industrial
                applications.
              </motion.p>

              <motion.div variants={fadeInLeft} className="space-y-4 pt-2">
                <h3 className="text-lg sm:text-xl font-semibold font-heading text-amber-300">
                  Key Principles of Our Quality Policy:
                </h3>
                <motion.ul variants={staggerContainer} className="space-y-3">
                  {qualityPrinciples.map((principle, index) => (
                    <motion.li
                      key={index}
                      variants={fadeInLeft}
                      className="flex items-start space-x-3"
                    >
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        transition={{ duration: 0.3 }}
                        className="mt-0.5"
                      >
                        <CheckCircle className="h-5 w-5 text-amber-400 flex-shrink-0" />
                      </motion.div>
                      <span className="font-accent text-sm sm:text-base text-white/90 leading-snug">
                        {principle}
                      </span>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>

              <motion.div
                whileTap={{ scale: 0.95 }}
                className="pt-4"
              >
                <Button
                  asChild
                  size="lg"
                  className="btn-animated-fill border-[2px] btn-animated-fill-secondary"
                >
                  <Link href="/about-us">Know More</Link>
                </Button>
              </motion.div>
            </motion.div>

            {/* Right Image/Logo Showcase Column */}
            <motion.div
              variants={fadeInLeft}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="relative"
            >
              {/* Decorative Card Background Container */}
              <div className="relative bg-white/95 backdrop-blur-md rounded-2xl p-8 sm:p-12 shadow-2xl border border-white/20 overflow-hidden group">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center justify-center"
                >
                  <Image
                    src="/images/logo.png"
                    alt="SV Nanometrology Pvt Ltd"
                    width={500}
                    height={350}
                    className="object-contain max-h-72 w-auto"
                  />
                </motion.div>

                {/* Subtle Brand Watermark Badge */}
                <div className="mt-6 pt-6 border-t border-gray-100 flex items-center justify-between text-gray-500 text-xs sm:text-sm font-medium font-accent">
                  <span>Precision & Quality Guaranteed</span>
                  <span className="text-amber-600 font-semibold">ISO & NABL Accredited</span>
                </div>
              </div>

              {/* Decorative Corner Accent */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-amber-400/20 rounded-full blur-xl pointer-events-none -z-10" />
            </motion.div>

          </div>
        </div>
      </motion.section>

      {/* Guiding Principles Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative py-24 bg-slate-50/60 flex items-center justify-center overflow-hidden border-y border-gray-200/60"
        ref={chooseUsRef}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto space-y-3"
          >
            <h2 className="text-4xl lg:text-6xl font-semibold text-gray-900 leading-tight font-heading">
              Guiding{" "}
              <span className="bg-gradient-to-r from-lapis via-rosequartz to-emerald bg-clip-text text-transparent">
                Principles
              </span>
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground font-accent">
              Trusted by industry leaders for cutting-edge manufacturing solutions that drive efficiency, quality, and innovation.
            </p>
          </motion.div>

          {/* Mission, Vision, Values Grid */}
          <div className="grid md:grid-cols-3 max-w-7xl mx-auto mt-16 gap-8">
            
            {/* Our Mission */}
            <motion.div
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Card className="h-full border border-gray-200/80 shadow-sm hover:shadow-xl hover:border-lapis/40 bg-white/80 backdrop-blur-sm transition-all duration-300 flex flex-col justify-between">
                <CardHeader className="text-center pt-8">
                  <div className="mx-auto w-16 h-16 bg-lapis/10 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Target className="h-8 w-8 text-lapis" />
                  </div>
                  <CardTitle className="text-2xl font-bold font-heading text-lapis">
                    Our Mission
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center pb-8">
                  <CardDescription className="text-sm sm:text-base text-gray-600 font-accent leading-relaxed">
                    To provide precision measurement solutions that enable our clients to achieve the highest levels of quality and accuracy in their manufacturing processes.
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>

            {/* Our Vision */}
            <motion.div
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Card className="h-full border border-gray-200/80 shadow-sm hover:shadow-xl hover:border-emerald/40 bg-white/80 backdrop-blur-sm transition-all duration-300 flex flex-col justify-between">
                <CardHeader className="text-center pt-8">
                  <div className="mx-auto w-16 h-16 bg-emerald/10 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Zap className="h-8 w-8 text-emerald" />
                  </div>
                  <CardTitle className="text-2xl font-bold font-heading text-emerald">
                    Our Vision
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center pb-8">
                  <CardDescription className="text-sm sm:text-base text-gray-600 font-accent leading-relaxed">
                    To be the global leader in nanometrology solutions, setting new standards for precision measurement technology and service excellence.
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>

            {/* Our Values */}
            <motion.div
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Card className="h-full border border-gray-200/80 shadow-sm hover:shadow-xl hover:border-rosequartz/40 bg-white/80 backdrop-blur-sm transition-all duration-300 flex flex-col justify-between">
                <CardHeader className="text-center pt-8">
                  <div className="mx-auto w-16 h-16 bg-rosequartz/10 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Award className="h-8 w-8 text-rosequartz" />
                  </div>
                  <CardTitle className="text-2xl font-bold font-heading text-rosequartz">
                    Our Values
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center pb-8">
                  <CardDescription className="text-base text-gray-600 font-accent leading-relaxed">
                    Precision, integrity, innovation, and customer satisfaction drive everything we do. We are committed to delivering excellence in every interaction.
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>

          </div>
        </div>

        {/* Ambient Gradient Background Glow */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100/40 via-transparent to-transparent pointer-events-none" />
      </motion.section>

      {/* certificates */}
      <section ref={sectionRef} className="relative flex flex-col bg-lapis">
        {/* Heading */}
        <motion.div
          className="sticky top-20 z-30 bg-webBlue/90 backdrop-blur-sm" // offset under navbar
        >
          <div className="text-center max-w-3xl mx-auto px-4 py-4">
            <h2 className="text-4xl lg:text-5xl font-semibold py-4 tracking-tight text-webWhite font-heading">
              {startTyping ? (
                <Typewriter
                  words={["Why Choose Us?"]}
                  loop={100}
                  cursor
                  typeSpeed={120}
                  deleteSpeed={70}
                />
              ) : (
                <span className="invisible">Why Choose Us?</span>
              )}
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-white/80 font-sans">
              Our commitment to quality is validated by industry-leading
              certifications and standards.
            </p>
          </div>
        </motion.div>
        {/* Certificates */}
        <div className="py-10 px-4 sm:px-6 lg:px-20 space-y-16 sm:space-y-20">
          {/* ISO Certificate Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 md:gap-12">
            {/* Text */}
            <motion.div
              ref={isoTextRef}
              initial={{ opacity: 0, x: -100 }}
              animate={isIsoTextInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="order-1 flex items-start space-x-4 sm:space-x-6"
            >
              <span className="text-5xl sm:text-6xl lg:text-[120px] font-light font-sans text-webYellow leading-none">
                1
              </span>
              <div className="space-y-3 sm:space-y-4">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold font-heading text-white">
                  ISO/IEC 17025:2017
                </h2>
                <p className="text-white/80 text-sm sm:text-base md:text-lg lg:text-xl font-light font-accent leading-relaxed">
                  Environmental Management Systems certification demonstrating
                  our commitment to sustainable manufacturing practices.
                </p>
              </div>
            </motion.div>

            {/* Image */}
            <motion.div
              ref={isoImageRef}
              initial={{ opacity: 0, x: 100 }}
              animate={isIsoImageInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
              className="order-2 w-full max-w-sm sm:max-w-md mx-auto bg-white rounded-xl overflow-hidden shadow-lg"
            >
              <Image
                src="/images/accreditation-certificate.jpg"
                alt="ISO Certificate"
                width={400}
                height={500}
                loading="lazy"
                className="object-contain w-full h-64 sm:h-80 md:h-[28rem] lg:h-[32rem]"
              />
            </motion.div>
          </div>

          {/* NABL Certificate Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 md:gap-12">
            {/* Text (mobile first, desktop second) */}
            <motion.div
              ref={nablTextRef}
              initial={{ opacity: 0, x: 100 }}
              animate={isNablTextInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
              className="order-1 md:order-2 flex items-start space-x-4 sm:space-x-6"
            >
              <span className="text-5xl sm:text-6xl lg:text-[120px] font-light font-sans text-webYellow leading-none">
                2
              </span>
              <div className="space-y-3 sm:space-y-4">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold font-heading text-white">
                  Trusted for 25 Years
                </h2>
                <p className="text-white/80 text-sm sm:text-base md:text-lg lg:text-xl font-light font-accent leading-relaxed">
                  Recognized for 25 years of accredited excellence, upholding
                  the highest safety and quality standards across all
                  operations.
                </p>
              </div>
            </motion.div>

            {/* Image (mobile second, desktop first) */}
            <motion.div
              ref={nablImageRef}
              initial={{ opacity: 0, x: -100 }}
              animate={isNablImageInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="order-2 md:order-1 w-full max-w-sm sm:max-w-md mx-auto bg-white rounded-xl overflow-hidden shadow-lg"
            >
              <Image
                src="/images/nabl-certificate.jpg"
                alt="NABL Certificate"
                width={400}
                height={500}
                loading="lazy"
                className="object-contain w-full h-64 sm:h-80 md:h-[28rem] lg:h-[32rem]"
              />
            </motion.div>
          </div>
        </div>
      </section>
      {/* Products Carousel Section */}

      <ProductsSection />
      <div
        className="my-6 border-b-2"
        style={{
          borderImage:
            "repeating-linear-gradient(to right, #d1d5db 0 8px, transparent 8px 16px) 100% 1",
        }}
      ></div>

      {/* Services */}
      <ServicesSection />
      <div
        className="my-6 border-b-2"
        style={{
          borderImage:
            "repeating-linear-gradient(to right, #d1d5db 0 8px, transparent 8px 16px) 100% 1",
        }}
      ></div>
      {/* <RippleCircle
          rippleCircles={[200, 400, 600, 800]}
          className="absolute top-0 md:-right-10 opacity-40 pointer-events-none select-none z-0 block"
        /> */}

      {/* Clients Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative py-12 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-4xl lg:text-6xl font-semibold text-gray-900 leading-tight font-heading"
            >
              Our Valued{" "}
              <span className="bg-gradient-to-r from-lapis via-rosequartz to-emerald bg-clip-text text-transparent">
                Clients
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-muted-foreground text-sm sm:text-base font-accent"
            >
              Trusted by industry leaders across India for precision dimensional calibration and gauging solutions.
            </motion.p>
          </div>

          <div className="carousel-fade">
            <Marquee 
              gradient={false} 
              speed={35} 
              pauseOnHover={true} 
              pauseOnClick={true}
              className="py-4"
            >
              {cardsData.map((item, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mx-6 flex-shrink-0 border rounded-md p-4 flex items-center justify-center bg-white shadow-sm"
                >
                  <Image
                    src={item.logo}
                    alt={item.alt}
                    width={120}
                    height={70}
                    className="object-contain h-16 sm:h-20 w-auto transition-transform duration-300"
                  />
                </motion.div>
              ))}
            </Marquee>
          </div>
        </div>

        {/* optional subtle background beams */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-50 via-transparent to-purple-50 opacity-40"></div>
      </motion.section>

      {/* CTA Section */}
      {/* <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-20 bg-blue-600"
      >
        <div className="container mx-auto px-4 text-center">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl lg:text-4xl font-bold text-white mb-6"
            >
              Ready to Enhance Your Measurement Precision?
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto"
            >
              Contact our experts today to discuss your specific measurement
              requirements and find the perfect solution.
            </motion.p>
            <motion.div
              variants={fadeInUp}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="text-lg px-8"
              >
                <Link href="/contact">Get In Touch</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section> */}
    </div>
  );
}
