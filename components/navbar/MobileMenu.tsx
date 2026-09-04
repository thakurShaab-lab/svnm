"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronRight } from "lucide-react";
import { NavItem } from "@/app/types/types";

interface MobileMenuProps {
  items: NavItem[];
  isOpen: boolean;
  onClose: () => void;
}

interface MobileDropdownProps {
  item: NavItem;
  level?: number;
}

function MobileDropdown({ item, level = 0 }: MobileDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;

  const toggleOpen = () => setIsOpen(!isOpen);

  if (!hasChildren) {
    return (
      <a
        href={item.href}
        className={`block py-3 px-4 text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors rounded-md ${
          level > 0 ? "ml-4" : ""
        }`}
      >
        {item.title}
      </a>
    );
  }

  return (
    <div className={level > 0 ? "ml-4" : ""}>
      <button
        onClick={toggleOpen}
        className="flex items-center justify-between w-full py-3 px-4 text-left text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors rounded-md"
      >
        <span>{item.title}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="inline-block"
        >
          <ChevronDown className="w-4 h-4" />
        </motion.span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="py-2 space-y-1">
              {item.children?.map((child) => (
                <MobileDropdown
                  key={child.title}
                  item={child}
                  level={level + 1}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function MobileMenu({ items, isOpen, onClose }: MobileMenuProps) {
  const menuVariants = {
    hidden: { opacity: 0, y: -20, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -20, scale: 0.95 },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          />

          {/* Mobile menu */}
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{
              duration: 0.3,
              ease: "easeOut",
              staggerChildren: 0.1,
            }}
            className="fixed top-20 left-4 right-4 bg-white border border-gray-200 rounded-xl shadow-xl z-50 lg:hidden max-h-[calc(100vh-6rem)] overflow-y-auto"
          >
            <div className="p-4 space-y-2">
              {items.map((item) => (
                <motion.div
                  key={item.title}
                  variants={itemVariants}
                  transition={{ duration: 0.25 }}
                >
                  <MobileDropdown item={item} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
