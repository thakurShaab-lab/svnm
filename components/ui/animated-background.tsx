"use client";

import { motion } from "framer-motion";

export function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Polygon mesh background */}
      <motion.div
        className="absolute inset-0 opacity-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 2 }}
      >
        <svg
          className="w-full h-full"
          viewBox="0 0 1000 1000"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              id="meshGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="currentColor" />
              <stop offset="50%" stopColor="rgb(0, 188, 212)" />
              <stop offset="100%" stopColor="currentColor" />
            </linearGradient>
          </defs>
          <motion.polygon
            points="100,100 300,50 500,150 400,300 200,250"
            fill="url(#meshGradient)"
            initial={{ scale: 0.8, rotate: 0 }}
            animate={{ scale: 1, rotate: 360 }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
          <motion.polygon
            points="600,200 800,100 900,300 700,400 500,350"
            fill="url(#meshGradient)"
            initial={{ scale: 1.2, rotate: 180 }}
            animate={{ scale: 0.8, rotate: -180 }}
            transition={{
              duration: 25,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
          <motion.polygon
            points="200,600 400,550 600,650 500,800 300,750"
            fill="url(#meshGradient)"
            initial={{ scale: 0.9, rotate: 90 }}
            animate={{ scale: 1.1, rotate: 270 }}
            transition={{
              duration: 30,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        </svg>
      </motion.div>

      {/* Gradient waves */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-accent/5 to-transparent"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      />
    </div>
  );
}
