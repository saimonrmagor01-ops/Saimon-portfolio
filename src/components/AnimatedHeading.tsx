"use client";

import React from "react";
import { motion } from "framer-motion";

interface AnimatedHeadingProps {
  text: string;
  className?: string;
  tag?: "h1" | "h2" | "h3" | "h4" | "span" | "div";
  delay?: number;
  highlightWords?: string[];
  highlightClassName?: string;
}

export const AnimatedHeading: React.FC<AnimatedHeadingProps> = ({
  text,
  className = "",
  tag = "h1",
  delay = 0,
  highlightWords = [],
  highlightClassName = "text-[#2563EB]",
}) => {
  const words = text.split(" ");
  const Tag = motion[tag] as any;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: delay,
      },
    },
  };

  const wordVariants = {
    hidden: {
      y: "105%",
      opacity: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <Tag
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className={`inline-flex flex-wrap gap-x-[0.28em] gap-y-[0.05em] overflow-hidden leading-[1.05] ${className}`}
      aria-label={text}
    >
      {words.map((word, idx) => {
        const isHighlighted = highlightWords.some(
          (hw) => word.toLowerCase().includes(hw.toLowerCase())
        );

        return (
          <span key={idx} className="inline-block overflow-hidden py-1">
            <motion.span
              variants={wordVariants}
              className={`inline-block ${
                isHighlighted ? highlightClassName : ""
              }`}
            >
              {word}
            </motion.span>
          </span>
        );
      })}
    </Tag>
  );
};
