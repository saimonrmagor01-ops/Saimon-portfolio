"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export const FloatingBackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          key="back-to-top"
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.9 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          onClick={scrollToTop}
          type="button"
          aria-label="Back to top of page"
          className="fixed bottom-5 left-5 z-40 group flex items-center gap-2 p-2.5 sm:px-3.5 sm:py-2.5 rounded-full bg-[#0D1224]/90 backdrop-blur-xl border border-[#1C2438] text-[#94A3B8] hover:text-white hover:border-[#2563EB] hover:shadow-[0_0_20px_rgba(37,99,235,0.35)] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] min-h-[40px]"
        >
          <div className="w-7 h-7 rounded-full bg-[#070B18] border border-[#1C2438] group-hover:border-[#2563EB] group-hover:bg-[#2563EB] group-hover:text-white text-[#94A3B8] flex items-center justify-center transition-all duration-200">
            <ArrowUp size={14} className="group-hover:-translate-y-0.5 transition-transform" />
          </div>
          <span className="hidden sm:inline text-[11px] font-mono tracking-wider uppercase text-[#CBD5E1] group-hover:text-white">
            Top
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
};
