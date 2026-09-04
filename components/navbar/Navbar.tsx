"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation"; // 1. Import usePathname
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Microscope } from "lucide-react";
import { DropdownMenu } from "./DropdownMenu";
import { MobileMenu } from "./MobileMenu";
import Image from "next/image";
import { NavigationData } from "@/app/types/types";
import Link from "next/link";
import NavbarSocials from "@/components/common/NavbarSocials";

interface NavbarProps {
  navigationData: NavigationData;
}

export default function Navbar({ navigationData }: NavbarProps) {
  const pathname = usePathname(); // 2. Get current path

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // 3. Hide Navbar on all /admin routes (including /admin/login)
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-webBlue/90 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        }`}
      >
        <nav className="px-4 sm:px-6 lg:px-8 max-w-screen">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center space-x-3"
            >
              <Link href="/" className="flex items-center">
                <div className="flex items-center justify-center">
                  <Image
                    src="/images/white-logo.png"
                    alt="alt"
                    width={100}
                    height={100}
                  />
                </div>
                <div className="ml-2 flex flex-col items-start">
                  <div className="text-xl font-bold text-white leading-tight">
                    SV Nanometrology
                  </div>
                  <div className="text-xs text-white/70 leading-tight">
                    Pvt. Ltd.
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="hidden lg:flex items-center ml-auto"
            >
              <motion.div className="flex items-center gap-1">
                {navigationData.mainNav.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                    className="relative"
                  >
                    {item.children ? (
                      <DropdownMenu
                        key={item.title}
                        item={item}
                        className="px-4 py-2 text-[#f1f5f9] hover:text-[#60a5fa]"
                      />
                    ) : (
                      <a
                        href={item.href}
                        className="px-4 py-2 text-[#f1f5f9] hover:text-[#60a5fa] font-medium transition-colors duration-200 rounded-lg"
                      >
                        {item.title}
                      </a>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <div className="flex items-center">
              <div className="mr-2">
                <NavbarSocials />
              </div>
              {/* Mobile menu button */}
              <motion.button
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                onClick={toggleMobileMenu}
                className="lg:hidden p-2 rounded-lg text-white hover:text-blue-600 hover:bg-gray-50 transition-colors"
                aria-label="Toggle mobile menu"
              >
                <AnimatePresence mode="wait">
                  {isMobileMenuOpen ? (
                    <motion.span
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="inline-block"
                    >
                      <X className="w-6 h-6" />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="inline-block"
                    >
                      <Menu className="w-6 h-6" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <MobileMenu
        items={navigationData.mainNav}
        isOpen={isMobileMenuOpen}
        onClose={closeMobileMenu}
      />

      <div className="" />
    </>
  );
}