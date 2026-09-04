"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronRight } from "lucide-react";
import { NavItem } from "@/app/types/types";
import clsx from "clsx";

interface DropdownMenuProps {
  item: NavItem;
  className?: string;
}

interface NestedDropdownProps {
  item: NavItem;
  isParentHovered: boolean;
  className?: string;
}

function NestedDropdown({
  item,
  isParentHovered,
  className,
}: NestedDropdownProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [position, setPosition] = useState<"left" | "right">("right");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isHovered && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const dropdownWidth = 256; // w-64 = 256px

      if (rect.right + dropdownWidth > viewportWidth - 20) {
        setPosition("left");
      } else {
        setPosition("right");
      }
    }
  }, [isHovered]);

  const dropdownVariants = {
    hidden: { opacity: 0, x: -10, scale: 0.95 },
    visible: { opacity: 1, x: 0, scale: 1 },
    exit: { opacity: 0, x: -10, scale: 0.95 },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div
      ref={containerRef}
      className="relative group/nested"
      // className={clsx(
      //     className // ✅ merge prop classes here
      //   )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-between px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors rounded-md cursor-pointer">
        <span className="font-medium">{item.title}</span>
        <ChevronRight className="w-4 h-4" />
      </div>

      <AnimatePresence>
        {isHovered && isParentHovered && (
          <motion.div
            ref={dropdownRef}
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{
              duration: 0.2,
              ease: "easeOut",
              staggerChildren: 0.03,
            }}
            className={`absolute top-0 w-64 bg-white border border-gray-200 rounded-lg shadow-xl z-50 ${
              position === "right" ? "left-full ml-2" : "right-full mr-2"
            }`}
          >
            <div className="p-2">
              {item.children?.map((child) => (
                <motion.div
                  key={child.title}
                  variants={itemVariants}
                  transition={{ duration: 0.15 }}
                >
                  <a
                    href={child.href}
                    className="block px-4 py-3 text-sm text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors rounded-md"
                  >
                    {child.title}
                  </a>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function DropdownMenu({ item, className }: DropdownMenuProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [position, setPosition] = useState<"left" | "right">("left");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isHovered && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const dropdownWidth = 320; // w-80 = 320px

      if (rect.left + dropdownWidth > viewportWidth - 20) {
        setPosition("right");
      } else {
        setPosition("left");
      }
    }
  }, [isHovered]);

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -10, scale: 0.95 },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };
  const router = useRouter();

  return (
    <div
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        ref={buttonRef}
        onClick={() => {
          // if you have a dedicated `href` field in item, use that:
          if (item.href) {
            router.push(item.href);
          } else {
            // fallback based on title
            if (item.title.toLowerCase() === "products") {
              router.push("/products");
            } else if (item.title.toLowerCase() === "services") {
              router.push("/services");
            }
          }
        }}
        className={clsx(
          "flex items-center space-x-1 font-medium transition-colors duration-200 rounded-lg",
          className // ✅ merge in external styles
        )}
      >
        <span>{item.title}</span>
        <motion.span
          animate={{ rotate: isHovered ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="inline-block"
        >
          <ChevronDown className="w-4 h-4" />
        </motion.span>
      </button>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            ref={dropdownRef}
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{
              duration: 0.25,
              ease: "easeOut",
              staggerChildren: 0.05,
            }}
            className={`absolute top-full mt-2 w-80 bg-white border border-gray-200 rounded-xl shadow-xl z-50 ${
              position === "left" ? "left-0 " : "right-0"
            }`}
          >
            <div className="p-3 ">
              {item.children?.map((child) => (
                <motion.div
                  key={child.title}
                  variants={itemVariants}
                  transition={{ duration: 0.2 }}
                >
                  {child.children ? (
                    <NestedDropdown item={child} isParentHovered={isHovered} />
                  ) : (
                    <a
                      href={child.href}
                      className="px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors rounded-md overflow-y-scroll"
                    >
                      {child.title}
                    </a>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
