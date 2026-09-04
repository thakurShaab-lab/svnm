"use client";
import Head from "next/head";
import { Award, Users, Target, Zap, Calendar } from "lucide-react";
import Timeline, { TimelineItem } from "@/components/ui/timeline";
import Image from "next/image";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import React, { useRef } from "react";
import { HeroSection } from "@/components/ui/hero-section";

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const isHeroInView = useInView(heroRef, { once: true });
  const certificates = [
    {
      icon: Award,
      title: "ISO 17025",
      subtitle: "Accredited Calibration Laboratory",
      description:
        "International standard for testing and calibration laboratories",
      gradient: "from-blue-500 to-indigo-600",
    },
    {
      icon: Users,
      title: "500+",
      subtitle: "Satisfied Clients",
      description:
        "Trusted by a growing base of satisfied clients across industries.",
      gradient: "from-purple-500 to-pink-600",
    },
    {
      icon: Zap,
      title: "25+ Years",
      subtitle: "of Excellence",
      description: "Proven track record of delivering precision solutions",
      gradient: "from-orange-500 to-yellow-500",
    },
    {
      icon: Target,
      title: "99.7%",
      subtitle: "Accuracy Rate",
      description: "Industry-leading precision in all our calibrations",
      gradient: "from-orange-600 to-orange-400",
    },
  ];
  // Team data
  const teamMembers = [
    {
      name: "Mr. M.L. Mangal",
      role: "Founder",
      description:
        "Mr. M.L. Mangal is the original founder and technical visionary behind SV Nanometrology Pvt Ltd. He started the company in 1999 under the name SV Engineering Centre, with a mission to bring precision engineering and quality measurement to Indian manufacturing. A pioneer in the field, he collaborated with NPL India to establish one of the first private calibration laboratories in the country — a milestone that laid the foundation for the company’s credibility and technical legacy.",
      image: "/images/ml-mangal.png",
    },
    {
      name: "Mr. Nilesh Mangal",
      role: "Co-founder and Director - Sales",
      description:
        "Mr. Nilesh Mangal is the commercial brain behind SV Nanometrology. As a co-founder of SV Engineering Centre in 1999, he has been instrumental in steering the business development, client relations, and operational management of the company from its inception. When the organization transitioned to SV Nanometrology Pvt Ltd, Nilesh took on the role of Director, continuing to lead its commercial growth and strategic partnerships.",
      image: "/images/nilesh-mangal.png",
    },
    {
      name: "Mr. Phalaksh Mangal",
      role: "Director - Technical and Quality",
      description:
        "Mr. Phalaksh Mangal joined SV Nanometrology in 2023 as a trainee, bringing with him fresh energy and a strong technical mindset. With dedication and an eye for innovation, he quickly grew into the role of Technical Director after the company transitioned into a private limited entity. Today, he oversees the entire technical and calibration operations, ensuring compliance with ISO/IEC 17025:2017, and is leading the company’s foray into Proficiency Testing (PT) under ISO 17043 and ISO 13528.",
      image: "/images/phalaksh-mangal.png",
    },
  ];
  const timelineData: TimelineItem[] = [
    {
      title: "Early 1999",
      content: (
        <div className="space-y-4">
          <p className="text-gray-600 leading-relaxed">
            Collaborated with NPL - National Physical Laboratory, Delhi to
            establish a NABL-Accredited Calibration Lab, setting the foundation
            for precision and quality excellence.
          </p>
          {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-3"> */}
          <div className="relative overflow-hidden rounded-lg group">
            <img
              src="/images/accreditation-certificate.jpg"
              alt="Calibration Certificate"
              className="w-full h-96 object-contain transition-transform duration-500 group-hover:scale-110"
            />
          </div>
          {/* <div className="relative overflow-hidden rounded-lg group">
              <img
                src="/images/cert2.jpg"
                alt="NABL Accreditation"
                className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div> */}
          {/* </div> */}
        </div>
      ),
    },
    {
      title: "2000",
      content: (
        <div className="space-y-4">
          <p className="text-gray-600 leading-relaxed">
            Began manufacturing Plug and Ring Gauges with a small setup, marking
            the beginning of our precision manufacturing journey.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="relative overflow-hidden rounded-lg group">
              <img
                src="/images/plain-gauge.png"
                alt="Plain Gauge"
                className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="relative overflow-hidden rounded-lg group">
              <img
                src="/images/ring-gauge.png"
                alt="Ring Gauge"
                className="w-full h-52 object-contain transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "2016",
      content: (
        <div className="space-y-4">
          <p className="text-gray-600 leading-relaxed">
            Began manufacturing Air Gauges and procured Hexagon Browne and
            Sharpe CMM
          </p>
          <div className="relative overflow-hidden rounded-lg group">
            <img
              src="/images/brown-and-sharpe-cmm.jpg"
              alt="Calibration Certificate"
              className="w-full h-54 object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
        </div>
      ),
    },
    {
      title: "2019",
      content: (
        <div className="space-y-4">
          <p className="text-gray-600 leading-relaxed">
            Procured Renishaw Laser Interferometer — one of the best calibration
            equipment in the world.
          </p>
          {/* <div className="grid grid-cols-1 gap-3"> */}
          <div className="relative overflow-hidden rounded-lg group">
            <img
              src="/images/laer1.png"
              alt="ISO Metric Thread Gauge"
              className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
          {/* <div className="relative overflow-hidden rounded-lg group">
              <img 
                src="/images/laser2.jpg" 
                alt="Air Plug Gauge" 
                className="w-full h-24 object-cover transition-transform duration-500 group-hover:scale-110" 
              />
            </div> */}
          {/* </div> */}
        </div>
      ),
    },
    {
      title: "2024 - Present",
      content: (
        <div className="space-y-4">
          <p className="text-gray-600 leading-relaxed">
            Major milestones achieved in strengthening our company’s foundation
            and enhancing operational excellence.
          </p>
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h4 className="font-semibold text-green-800 mb-3 text-sm">
              Key Achievements
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="text-green-700">
                <div className="font-medium">Company Restructuring</div>
                <div className="opacity-75">
                  Converted ownership from Proprietorship to Pvt. Ltd.
                </div>
              </div>
              <div className="text-green-700">
                <div className="font-medium">Quality Management</div>
                <div className="opacity-75">
                  Implemented a World-Class QMS framework
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Expansion Plans",
      content: (
        <div className="space-y-4">
          <p className="text-gray-600 leading-relaxed">
            Upcoming project planned in S-21, Adore Business City, Sector 72-73,
            Greater Faridabad
          </p>
          <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
            {/* <h4 className="font-semibold text-blue-800 mb-2 text-sm">Key Achievements</h4> */}
            <ul className="text-blue-700 space-y-1 text-xs">
              <li>• Automation with Industry 4.0</li>
              <li>• In-house Sub Zero Treatment</li>
              <li>• Increased Production Efficiency</li>
              <li>• Initiating gauge exports</li>
              <li>• ISO 9001 accreditation</li>
            </ul>
          </div>
        </div>
      ),
    },
  ];
  return (
    <>
      {/* <Head>
        <title>About SV Nanometrology | ISO 17025 Calibration Experts</title>
        <meta
          name="description"
          content="Learn about SV Nanometrology Pvt Ltd, a leader in precision measurement and ISO 17025-accredited calibration services since 1999."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://svnanometrology.com/about-us" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "SV Nanometrology Pvt Ltd",
              url: "https://svnanometrology.com",
              logo: "https://svnanometrology.com/images/logo.png",
              founders: [
                { "@type": "Person", name: "Mr. M.L. Mangal" },
                { "@type": "Person", name: "Mr. Nilesh Mangal" },
              ],
              foundingDate: "1999",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Faridabad",
                addressCountry: "IN",
              },
            }),
          }}
        />
      </Head> */}
    <div className=" min-h-screen">
      {/* Hero Section */}
      <HeroSection
        className="pt-8"
        title="About SV Nanometrology"
        subtitle="Leading the precision measurement industry with cutting-edge
          technology and unmatched expertise since our founding."
      >
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {/* <Button size="lg">
            <Package className="h-5 w-5" />
            Contact Us
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="bg-white/10 border-white/30 text-white hover:bg-white/20"
          >
            Request Quote
            <ArrowRight className="h-5 w-5" />
          </Button> */}
        </div>
      </HeroSection>
      
      {/* Company Story */}
      <section ref={heroRef} className="py-20 max-w-7xl mx-auto lg:py-32">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={
                isHeroInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }
              }
              transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            >
              <div className="space-y-4">
                <h2 className="text-4xl lg:text-6xl font-semibold text-gray-900 mb-6 leading-tight font-heading">
                  Our{" "}
                  <span className="bg-gradient-to-r from-lapis to-rosequartz bg-clip-text text-transparent">
                    Story
                  </span>
                </h2>
                {/* <h2 className="text-4xl font-heading font-medium leading-tight text-primary">Our Story</h2> */}
                <p className="text-xl text-foreground font-accent leading-relaxed">
                  SV Nanometrology Pvt. Ltd. was founded with a vision to
                  revolutionize precision measurement in industrial
                  applications. Our journey began with a commitment to
                  delivering nanometer-level accuracy and has evolved into a
                  comprehensive solution provider for measurement challenges
                  across industries.
                </p>
                <p className="text-xl text-foreground font-accent leading-relaxed">
                  Today, we serve clients across Aerospace, Defence,
                  Electronics, providing Mechanical Gauges with micron-level
                  accuracy and precise dimension ISO 17025 - accredited
                  calibration services that ensure best quality in manufacturing
                  and compliance with international standards.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={
                isHeroInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }
              }
              transition={{
                duration: 0.8,
                delay: 0.2,
                type: "spring",
                stiffness: 100,
              }}
              className="relative"
            >
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <img
                  src="/images/future-plan.png"
                  alt="Our Facility"
                  className="w-full h-96 lg:h-[500px] object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>

              {/* Floating stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.8, delay: 0.6 }}
                className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-6 border border-gray-100"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900 font-poppins">
                      25+
                    </div>
                    <div className="text-sm text-gray-500 font-inter">
                      Years Experience
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Journey */}
      <section className="pt-10 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4 font-poppins">
              Our{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Journey
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto font-inter">
              Discover the key milestones that shaped our evolution into a
              leading precision measurement company
            </p>
          </motion.div>
          <Timeline data={timelineData} />
        </div>
      </section>

      {/* Certifications & Achievements */}
      <div className="pb-16 px-6 lg:px-12 bg-blue-50 py-12">
        <h2 className="text-3xl lg:text-4xl font-bold text-center text-gray-900 mb-14 font-heading">
          Certifications &{" "}
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Achievements
          </span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {certificates.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
            >
              <div
                className={`w-20 h-20 bg-gradient-to-r ${cert.gradient} rounded-full flex items-center justify-center mb-6 mx-auto`}
              >
                <cert.icon className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center font-poppins">
                {cert.title}
              </h3>
              <h4 className="text-lg font-semibold text-gray-600 mb-3 text-center font-poppins">
                {cert.subtitle}
              </h4>
              <p className="text-gray-500 text-center leading-relaxed font-inter">
                {cert.description}
              </p>
            </motion.div>
          ))}
          {/* Card 1 */}
          {/* <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-8 text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-5 shadow-md">
              <Award className="h-10 w-10 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              ISO 17025
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Accredited Calibration Laboratory recognized for precision and
              quality.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-8 text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-5 shadow-md">
              <Users className="h-10 w-10 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              500+ Clients
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Trusted by a growing base of satisfied clients across industries.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-8 text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-5 shadow-md">
              <Zap className="h-10 w-10 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              25+ Years
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Years of excellence delivering innovation, accuracy, and
              reliability.
            </p>
          </div> */}
        </div>
      </div>

      {/* Team Section */}
      <div className="text-center pt-10">
        <h2 className="text-4xl lg:text-6xl font-semibold text-gray-900 mb-12 leading-tight font-heading">
          Our Director's{" "}
          <span className="bg-gradient-to-r from-lapis to-rosequartz bg-clip-text text-transparent">
            Vision
          </span>
        </h2>
        {/* <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12">
          Our team of certified engineers and technicians brings decades of
          combined experience in precision measurement, calibration, and quality
          assurance to every project.
        </p> */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 md:px-8 mb-10">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.2 }}
              viewport={{ once: true }}
              // whileHover={{ y: -10, scale: 1.02 }}
              className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 text-center group"
            >
              <div className="relative mb-6">
                <div className="w-48 h-48 mx-auto rounded-full overflow-hidden shadow-lg group-hover:shadow-xl bg-webBlue/20 transition-shadow duration-300">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-2 font-heading">
                {member.name}
              </h3>
              <h4 className="text-lg font-semibold text-webBlue mb-4 font-heading">
                {member.role}
              </h4>
              <p className="text-gray-600 leading-relaxed font-accent">
                {member.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
}
