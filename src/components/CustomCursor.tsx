"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export const CustomCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoverState, setHoverState] = useState<"none" | "link" | "button" | "card">("none");
  const [isTouch, setIsTouch] = useState(true);

  // Smooth springs for trailing ring
  const springX = useSpring(0, { damping: 26, stiffness: 240, mass: 0.45 });
  const springY = useSpring(0, { damping: 26, stiffness: 240, mass: 0.45 });

  useEffect(() => {
    // Only enable on desktop pointer devices
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!isFinePointer || prefersReducedMotion) {
      setIsTouch(true);
      return;
    }
    setIsTouch(false);

    const onMouseMove = (e: MouseEvent) => {
      springX.set(e.clientX);
      springY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const onMouseEnter = () => setIsVisible(true);
    const onMouseLeave = () => setIsVisible(false);

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isServiceCard = Boolean(target.closest(".service-card"));
      const projectCard = !isServiceCard && (target.closest(".project-card") || target.closest(".cinema-viewport-card") || target.closest("article"));
      const button = target.closest("button") || target.closest(".btn-main") || target.closest(".btn-secondary");
      const link = target.closest("a") || target.closest("select") || target.closest("input");

      if (isServiceCard) {
        if (button || link) {
          setHoverState("button");
        } else {
          setHoverState("link");
        }
      } else if (projectCard) {
        setHoverState("card");
      } else if (button) {
        setHoverState("button");
      } else if (link) {
        setHoverState("link");
      } else {
        setHoverState("none");
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseover", onMouseOver);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseover", onMouseOver);
    };
  }, [springX, springY, isVisible]);

  if (isTouch || !isVisible) return null;

  const isHovered = hoverState !== "none";

  return (
    <>
      {/* Outer trailing ring with dynamic states */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[100] rounded-full border mix-blend-difference"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: hoverState === "card" ? 58 : hoverState === "button" ? 44 : isHovered ? 38 : 24,
          height: hoverState === "card" ? 58 : hoverState === "button" ? 44 : isHovered ? 38 : 24,
          borderColor:
            hoverState === "card"
              ? "rgba(37, 99, 235, 0.9)"
              : isHovered
              ? "rgba(59, 130, 246, 0.85)"
              : "rgba(255, 255, 255, 0.35)",
          backgroundColor:
            hoverState === "card"
              ? "rgba(37, 99, 235, 0.16)"
              : isHovered
              ? "rgba(37, 99, 235, 0.08)"
              : "transparent",
        }}
        transition={{ type: "spring", damping: 24, stiffness: 320, mass: 0.2 }}
      >
        {hoverState === "card" && (
          <span className="text-[9px] font-mono tracking-widest text-[#93C5FD] uppercase flex items-center justify-center h-full font-bold">
            VIEW
          </span>
        )}
      </motion.div>

      {/* Center pinpoint dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[100] rounded-full bg-white mix-blend-difference"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isHovered ? (hoverState === "card" ? 0 : 4) : 4,
          height: isHovered ? (hoverState === "card" ? 0 : 4) : 4,
          opacity: hoverState === "card" ? 0 : 1,
          backgroundColor: isHovered ? "#3B82F6" : "#ffffff",
        }}
        transition={{ type: "spring", damping: 30, stiffness: 450 }}
      />
    </>
  );
};
