"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MapPin, Phone, Mail } from "lucide-react";
import Image from "next/image";
import { FaLinkedinIn, FaInstagram } from "react-icons/fa";

export function Footer() {
  const pathname = usePathname();

  // Hide Footer on all /admin routes
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="relative bg-gradient-to-br from-webBlue via-webBlue to-lapis text-white">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-webYellow via-emerald to-webYellow"></div>

      <div className="container mx-auto pt-12 pb-6 px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-10 lg:gap-12 pb-10 border-b border-white/20">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex flex-col items-center md:items-start space-y-3">
              <div className="bg-white rounded-xl p-3 shadow-lg">
                <Image
                  src="/images/logo.png"
                  alt="SV Nanometrology Logo"
                  width={120}
                  height={120}
                  className="object-contain"
                />
              </div>
              <h3 className="font-heading font-bold text-xl sm:text-2xl text-white leading-tight">
                SV Nanometrology Pvt. Ltd.
              </h3>
            </div>
            <p className="text-webWhite/80 text-sm sm:text-base leading-relaxed text-center md:text-left">
              Leading provider of Precision Dimension Calibration Services and
              offering highly precise Gauging Solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div className="px-4 md:text-center">
            <h3 className="font-heading font-bold text-lg sm:text-xl lg:text-2xl mb-5 bg-gradient-to-r from-webYellow to-emerald bg-clip-text text-transparent">
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm sm:text-base">
              <li>
                <Link
                  href="/"
                  className="text-webWhite/80 hover:text-webYellow transition-all duration-300 hover:translate-x-1 inline-block font-medium"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-webWhite/80 hover:text-webYellow transition-all duration-300 hover:translate-x-1 inline-block font-medium"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-webWhite/80 hover:text-webYellow transition-all duration-300 hover:translate-x-1 inline-block font-medium"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/about-us"
                  className="text-webWhite/80 hover:text-webYellow transition-all duration-300 hover:translate-x-1 inline-block font-medium"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-webWhite/80 hover:text-webYellow transition-all duration-300 hover:translate-x-1 inline-block font-medium"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/faqs"
                  className="text-webWhite/80 hover:text-webYellow transition-all duration-300 hover:translate-x-1 inline-block font-medium"
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  href="/contact-us"
                  className="text-webWhite/80 hover:text-webYellow transition-all duration-300 hover:translate-x-1 inline-block font-medium"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="px-4">
            <h3 className="font-heading font-bold text-lg sm:text-xl lg:text-2xl mb-5 bg-gradient-to-r from-emerald to-rosequartz bg-clip-text text-transparent">
              Contact Info
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 group">
                <div className="w-10 h-10 bg-webYellow/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-webYellow/30 transition-colors">
                  <MapPin className="h-5 w-5 text-webYellow" />
                </div>
                <div>
                  <p className="text-webWhite/90 text-xs sm:text-sm leading-relaxed">
                    Plot No. E-3, Friends Industrial Complex,
                    <br />
                    Sanjay Colony, Sector 23, Faridabad,
                    <br />
                    Haryana, India (121005)
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 group">
                <div className="w-10 h-10 bg-emerald/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-emerald/30 transition-colors">
                  <Phone className="h-5 w-5 text-emerald" />
                </div>
                <div>
                  <a
                    href="tel:+919873267048"
                    className="text-webWhite/90 hover:text-emerald transition-colors text-xs sm:text-sm block font-medium"
                  >
                    +91 98732 67048
                  </a>
                  <p className="text-webWhite/60 text-xs mt-1">
                    Mr. Nilesh Mangal (Director)
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 group">
                <div className="w-10 h-10 bg-rosequartz/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-rosequartz/30 transition-colors">
                  <Mail className="h-5 w-5 text-rosequartz" />
                </div>
                <div>
                  <a
                    href="mailto:info@svnanometrology.com"
                    className="text-webWhite/90 hover:text-rosequartz transition-colors text-xs sm:text-sm font-medium"
                  >
                    info@svnanometrology.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Social Links & Make in India Badge */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-heading font-bold text-lg mb-3 text-center sm:text-left">
              Follow Us
            </h3>
            <div className="flex gap-4">
              <Link
                href={process.env.NEXT_PUBLIC_LINKEDIN!}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full bg-white/10 hover:bg-white transition-all duration-300 flex items-center justify-center group"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn size={20} className="text-[#0A66C2] group-hover:scale-110 transition-transform" />
              </Link>

              <Link
                href={process.env.NEXT_PUBLIC_INSTAGRAM!}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full bg-white/10 hover:bg-white transition-all duration-300 flex items-center justify-center group"
                aria-label="Instagram"
              >
                <FaInstagram size={20} className="text-[#E4405F] group-hover:scale-110 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Make In India Badge */}
          <div className="bg-white/10 backdrop-blur-sm px-5 py-2.5 rounded-xl border border-white/15 flex items-center gap-3 shadow-md">
            <div className="bg-white p-1 rounded-md">
              <Image
                src="/images/make-in-india.png"
                alt="Make in India"
                width={110}
                height={50}
                className="object-contain"
              />
            </div>
            <div className="text-left border-l border-white/20 pl-3">
              <p className="text-xs font-semibold text-webYellow uppercase tracking-wider">
                Proudly Made In
              </p>
              <p className="text-sm font-bold text-white tracking-wide">
                INDIA
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-6 mt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
            <p className="text-webWhite/70 text-xs sm:text-sm font-medium">
              © {new Date().getFullYear()} SV Nanometrology Pvt. Ltd. All rights
              reserved.
            </p>
            <div className="flex items-center space-x-4 text-xs sm:text-sm">
              <Link
                href="/privacy"
                className="text-webWhite/70 hover:text-webYellow transition-colors"
              >
                Privacy Policy
              </Link>
              <span className="text-webWhite/30">|</span>
              <Link
                href="/terms"
                className="text-webWhite/70 hover:text-webYellow transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}