"use client";

import React, { useRef, useState, MouseEvent } from "react";
import { motion, useSpring } from "framer-motion";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  maxTilt?: number;
}

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = "",
  onClick,
  maxTilt = 12,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  // Spring animation for smooth 3D rotation
  const rotateX = useSpring(0, { damping: 20, stiffness: 220, mass: 0.3 });
  const rotateY = useSpring(0, { damping: 20, stiffness: 220, mass: 0.3 });
  const scale = useSpring(1, { damping: 20, stiffness: 220, mass: 0.3 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    const rotX = (0.5 - y) * (maxTilt * 2);
    const rotY = (x - 0.5) * (maxTilt * 2);

    rotateX.set(rotX);
    rotateY.set(rotY);
    scale.set(1.02);

    setGlarePos({
      x: x * 100,
      y: y * 100,
      opacity: 0.25,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    rotateX.set(0);
    rotateY.set(0);
    scale.set(1);
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1000 }}
      className={`relative rounded-2xl cursor-pointer ${className}`}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          scale,
          transformStyle: "preserve-3d",
        }}
        className="w-full h-full relative rounded-2xl overflow-hidden transition-shadow duration-300"
      >
        {children}

        {/* Dynamic Specular 3D Glare Sheen Layer */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-30 rounded-2xl"
          style={{
            opacity: glarePos.opacity,
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(37, 99, 235, 0.35) 0%, rgba(56, 189, 248, 0.15) 30%, transparent 70%)`,
          }}
        />
      </motion.div>
    </div>
  );
};
