"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaLinkedinIn, FaInstagram } from "react-icons/fa";

const socials = [
  {
    href: process.env.NEXT_PUBLIC_LINKEDIN!,
    icon: FaLinkedinIn,
    label: "LinkedIn",
    color: "#0A66C2",
  },
  {
    href: process.env.NEXT_PUBLIC_INSTAGRAM!,
    icon: FaInstagram,
    label: "Instagram",
    color: "#E4405F",
  },
];

export default function NavbarSocials() {
  return (
    <div className="flex items-center gap-2 sm:gap-3 ml-3">
      {socials.map(({ href, icon: Icon, label, color }) => (
        <motion.div
          key={label}
          whileHover={{ y: -2, scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 18,
          }}
        >
          <Link
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="
              flex
              h-10 w-10
              items-center
              justify-center
              rounded-full
              bg-white/10
              backdrop-blur-md
              border border-white/20
              transition-all
              duration-300
              hover:bg-white
               hover:shadow-lg
            "
            style={{ color }}
          >
            <Icon
              size={16}
              className="sm:w-[17px] sm:h-[17px] lg:w-[18px] lg:h-[18px]"
            />
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
