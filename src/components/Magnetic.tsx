"use client";

import React from "react";

interface MagneticProps {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}

export const Magnetic: React.FC<MagneticProps> = ({
  children,
  className = "",
}) => {
  return <div className={`inline-block ${className}`}>{children}</div>;
};
