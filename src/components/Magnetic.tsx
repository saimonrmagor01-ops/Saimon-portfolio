"use client";

import React, { useRef, MouseEvent } from "react";
import { motion, useSpring } from "framer-motion";

interface MagneticProps {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}

export const Magnetic: React.FC<MagneticProps> = ({
  children,
  strength = 0.28,
  className = "",
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(0, { damping: 15, stiffness: 180, mass: 0.2 });
  const y = useSpring(0, { damping: 15, stiffness: 180, mass: 0.2 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    if (
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const distanceX = Math.max(-8, Math.min(8, (clientX - centerX) * strength));
    const distanceY = Math.max(-8, Math.min(8, (clientY - centerY) * strength));

    x.set(distanceX);
    y.set(distanceY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
};
