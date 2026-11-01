"use client";

import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export const ScrollProgressBar: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#2563EB] via-[#38BDF8] to-[#2563EB] origin-left z-50 pointer-events-none shadow-[0_0_12px_rgba(37,99,235,0.8)]"
      aria-hidden="true"
    />
  );
};
