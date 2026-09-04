"use client";

import { FileText, FileBadge2, Download, ExternalLink } from "lucide-react";
import { HeroSection } from "@/components/ui/hero-section";
import Image from "next/image";
import { motion } from "framer-motion";

const certificateImages = [
  {
    img: "/images/nabl-certificate.jpg",
    file: "/images/nabl-certificate.jpg",
    alt: "NABL Certificate: 2000",
  },
  {
    img: "/images/accreditation-certificate.jpg",
    file: "/images/accreditation-certificate.jpg",
    alt: "NABL Certificate: 2025-29",
  },
];

const sections = [
  {
    title: "Corporate Documents",
    documents: [
      {
        name: "Company Profile",
        file: "/downloads/SVNM-Company-Profile-v2.2.pdf",
        description: "Overview of our company, services, and expertise.",
        type: "pdf",
        image: "/images/svnm-company-profile.png",
      },
      {
        name: "Brochure",
        file: "/downloads/svnm-brochure.pdf",
        description: "Download our latest company brochure.",
        type: "pdf",
        image: "/images/brochure.png",
      },
      {
        name: "Scope",
        file: "/downloads/svnm-scope-2025-2029.pdf",
        description: "Presentation deck for our sales and solutions.",
        type: "pdf",
        image: "/images/svnm-scope.png",
      },
    ],
  },
  {
    title: "Quality & Mission",
    documents: [
      {
        name: "Quality Policy & Objectives",
        file: "/downloads/svnm-quality-policy-and-objectives.pdf",
        description: "Our quality policy and objectives document.",
        type: "pdf",
        image: "/images/quality-policy.png",
      },
      {
        name: "Mission & Vision Statement",
        file: "/downloads/mission-and-vision-after-ia.pdf",
        description: "Our mission and vision statement.",
        type: "pdf",
        image: "/images/mission-vision.png",
      },
    ],
  },
];

function getFileIcon(type: string) {
  switch (type) {
    case "pdf":
      return <FileBadge2 className="w-6 h-6 text-red-500 shrink-0" />;
    case "doc":
      return <FileText className="w-6 h-6 text-blue-500 shrink-0" />;
    default:
      return <FileText className="w-6 h-6 text-gray-400 shrink-0" />;
  }
}

export default function DownloadsPage() {
  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* Hero Section */}
      <HeroSection
        className="pt-8"
        title="Downloads"
        subtitle="Access our official documents, certificates, and company literature."
      />

      {/* Certifications Glassmorphic Section */}
      <section className="relative max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <h2 className="text-4xl lg:text-5xl font-semibold text-gray-900 font-heading">
            Official{" "}
            <span className="bg-gradient-to-r from-lapis via-rosequartz to-emerald bg-clip-text text-transparent">
              Certifications
            </span>
          </h2>
          <div className="w-24 h-1 bg-amber-400 mx-auto rounded-full" />
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          {certificateImages.map((cert, index) => (
            <motion.a
              key={cert.img}
              href={cert.file}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group block"
            >
              <div className="bg-white/80 backdrop-blur-md border border-gray-200/80 rounded-2xl p-4 shadow-sm hover:shadow-2xl hover:border-lapis/40 transition-all duration-300 w-80 sm:w-96 flex flex-col items-center">
                <div className="relative w-full h-80 bg-slate-100 rounded-xl overflow-hidden p-2">
                  <Image
                    src={cert.img}
                    alt={cert.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 384px"
                    className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="pt-4 pb-1 text-center flex items-center justify-center gap-2">
                  <span className="font-heading font-semibold text-lg text-lapis group-hover:text-amber-600 transition-colors">
                    {cert.alt}
                  </span>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-amber-600 transition-colors" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </section>

      {/* Document Sections */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {sections.map((section) => (
          <div key={section.title} className="space-y-8">
            <div className="flex items-center gap-3 border-l-4 border-amber-400 pl-4">
              <h2 className="text-2xl sm:text-3xl font-bold font-heading text-lapis">
                {section.title}
              </h2>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {section.documents.map((doc) => (
                <motion.div
                  key={doc.name}
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="group bg-white/80 backdrop-blur-md rounded-2xl p-5 shadow-sm hover:shadow-xl border border-gray-200/80 hover:border-lapis/30 flex flex-col justify-between transition-all duration-300"
                >
                  <div>
                    {doc.image && (
                      <div className="relative w-full h-48 bg-slate-100 rounded-xl overflow-hidden mb-4 border border-gray-100">
                        <Image
                          src={doc.image}
                          alt={doc.name + " preview"}
                          fill
                          sizes="(max-width: 768px) 100vw, 350px"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}
                    
                    <div className="flex items-center gap-2.5 mb-2">
                      {getFileIcon(doc.type)}
                      <h3 className="font-heading font-bold text-lg text-gray-900 group-hover:text-lapis transition-colors leading-snug">
                        {doc.name}
                      </h3>
                    </div>

                    <p className="text-gray-600 text-sm font-accent leading-relaxed mb-6">
                      {doc.description}
                    </p>
                  </div>

                  <a
                    href={doc.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-lapis text-white font-medium hover:bg-webBlue transition-colors w-full shadow-md group-hover:shadow-lg"
                  >
                    <Download className="w-4 h-4 text-amber-400" />
                    <span>Download File</span>
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}