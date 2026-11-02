"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const Preloader: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // Only run on initial load per session or full refresh
    try {
      const hasLoaded = sessionStorage.getItem("saimon_preloaded");
      if (hasLoaded) {
        setShouldRender(false);
        return;
      }
    } catch {
      // ignore
    }

    // Disable body scroll while preloading
    document.body.style.overflow = "hidden";

    // Smooth counter animation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsComplete(true);
            document.body.style.overflow = "unset";
            try {
              sessionStorage.setItem("saimon_preloaded", "true");
            } catch {}
          }, 350);
          return 100;
        }
        // Organic step increments
        const increment = Math.floor(Math.random() * 14) + 6;
        return Math.min(prev + increment, 100);
      });
    }, 45);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = "unset";
    };
  }, []);

  if (!shouldRender) return null;

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] bg-[#050817] flex flex-col items-center justify-between p-8 sm:p-12 pointer-events-auto select-none"
        >
          {/* Top Label */}
          <div className="w-full max-w-5xl flex items-center justify-between text-xs font-mono text-[#94A3B8] uppercase tracking-widest">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] animate-pulse" />
              <span>PORTFOLIO • 2025</span>
            </span>
            <span>KATHMANDU, NEPAL</span>
          </div>

          {/* Central Brand Identity Reveal */}
          <div className="text-center space-y-3 my-auto">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white font-heading"
            >
              <span>SAIMON RANA MAGAR</span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="text-xs sm:text-sm font-mono tracking-widest text-[#38BDF8] uppercase"
            >
              AI FILMMAKER • VIDEO EDITOR • WEB DEVELOPER
            </motion.p>
          </div>

          {/* Bottom Progress Counter & Indicator Line */}
          <div className="w-full max-w-md space-y-3">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-[#94A3B8]">LOADING PORTFOLIO</span>
              <span className="text-white font-bold tracking-wider">{progress}%</span>
            </div>

            <div className="w-full h-1 bg-[#0D1224] rounded-full overflow-hidden border border-[#1C2438]">
              <motion.div
                className="h-full bg-gradient-to-r from-[#2563EB] to-[#38BDF8]"
                style={{ width: `${progress}%` }}
                transition={{ ease: "easeOut" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
