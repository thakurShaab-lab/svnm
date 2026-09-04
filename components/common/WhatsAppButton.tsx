"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {
  const pathname = usePathname();

  // Hide WhatsApp button on all /admin routes
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: [0, -4, 0],
      }}
      transition={{
        opacity: { duration: 0.4 },
        scale: { duration: 0.4 },
        y: {
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
      whileHover={{
        scale: 1.08,
      }}
      whileTap={{
        scale: 0.92,
      }}
      className="fixed bottom-5 right-5 md:bottom-7 md:right-7 z-[999]"
    >
      <Link
        href={process.env.NEXT_PUBLIC_WHATSAPP as string}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className="
          flex
          h-16
          w-16
          items-center
          justify-center
          rounded-full
          bg-[#25D366]
          shadow-2xl
        "
      >
        <FaWhatsapp
          className="text-white"
          size={34}
        />
      </Link>
    </motion.div>
  );
}