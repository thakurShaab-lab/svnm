"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

export interface TimelineItem {
  title: string;
  content: React.ReactNode;
}

interface TimelineProps {
  data: TimelineItem[];
}

const TimelineCard: React.FC<{
  item: TimelineItem;
  index: number;
  isLeft: boolean;
}> = ({ item, index, isLeft }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, x: isLeft ? -50 : 50 }}
      animate={
        isInView
          ? { opacity: 1, y: 0, x: 0 }
          : { opacity: 0, y: 50, x: isLeft ? -50 : 50 }
      }
      transition={{
        duration: 0.8,
        delay: index * 0.2,
        type: "spring",
        stiffness: 100,
        damping: 15,
      }}
      className={`relative flex ${
        isLeft ? "md:justify-start" : "md:justify-end"
      } justify-center mb-16 md:mb-24`}
    >
      {/* Desktop Layout */}
      <div className="hidden md:block w-full">
        <div
          className={`flex ${
            isLeft ? "flex-row" : "flex-row-reverse"
          } items-center w-full`}
        >
          {/* Card */}
          <motion.div
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full mx-8 relative border border-gray-100 hover:shadow-2xl transition-shadow duration-300"
          >
            {/* Connector dot */}
            <div
              className={`absolute top-6 ${
                isLeft ? "-right-3.5" : "-left-3.5"
              } w-7 h-7 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full border-3 border-white shadow-lg`}
            />

            {/* Arrow */}
            <div
              className={`absolute top-8 ${
                isLeft ? "-right-1" : "-left-2"
              } w-3 h-3 border-r border-b border-gray-200 transform ${
                isLeft ? "-rotate-90" : "-rotate-45"
              }`}
            />

            <motion.h3
              className="text-2xl font-bold text-gray-800 mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.3 }}
            >
              {item.title}
            </motion.h3>

            <motion.div
              className="text-gray-600 leading-relaxed timeline-content"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.5 }}
            >
              {item.content}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden w-full max-w-sm">
        <motion.div
          whileHover={{ scale: 1.02, y: -5 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="bg-white rounded-2xl shadow-xl p-6 relative border border-gray-100 hover:shadow-2xl transition-shadow duration-300 ml-8"
        >
          {/* Connector dot for mobile */}
          <div className="absolute top-6 -left-3.5 w-7 h-7 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full border-3 border-white shadow-lg" />

          {/* Arrow for mobile */}
          <div className="absolute top-6 -left-1.5 w-3 h-3 bg-white border-r border-b border-gray-200 transform rotate-135" />

          <motion.h3
            className="text-xl font-bold text-gray-800 mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.3 }}
          >
            {item.title}
          </motion.h3>

          <motion.div
            className="text-gray-600 leading-relaxed text-sm timeline-content"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.5 }}
          >
            {item.content}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const Timeline: React.FC<TimelineProps> = ({ data }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const beamHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const glowOpacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.3, 1, 1, 1]
  );

  return (
    <div ref={containerRef} className="relative py-20 max-w-7xl mx-auto">
      <div className="container mx-auto px-4">
        {/* Header */}
        {/* <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-[#0a3975] via-[#3399ff] to-[#23d5ab] bg-clip-text text-transparent mb-4">
            Our Journey
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover the milestones that shaped our story
          </p>
        </motion.div> */}

        {/* Timeline Container */}
        <div className="relative">
          {/* Animated Beam */}
          <div className="absolute left-4 md:left-1/2 md:transform md:-translate-x-1/2 w-0.5 bg-gradient-to-b from-transparent via-gray-300 to-transparent h-full">
            <motion.div
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-transparent via-[#266699] to-[#23a6d5] shadow-lg"
              style={{
                height: beamHeight,
                opacity: glowOpacity,
                filter: "drop-shadow(0 0 8px rgba(59, 130, 246, 0.5))",
              }}
            />

            {/* Animated glow effect */}
            <motion.div
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-transparent via-purple-500 to-transparent blur-sm"
              style={{
                height: beamHeight,
                opacity: useTransform(scrollYProgress, [0, 1], [0.2, 0.8]),
              }}
            />
          </div>

          {/* Timeline Items */}
          <div className="relative">
            {data.map((item, index) => (
              <TimelineCard
                key={index}
                item={item}
                index={index}
                isLeft={index % 2 === 0}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
