"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Compass, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050817] text-[#F5F7FF] px-6 relative overflow-hidden editorial-grid selection:bg-[#2563EB] selection:text-white">
      {/* Background radial blue glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none radial-glow-blue opacity-50 blur-3xl"
        aria-hidden="true"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-md w-full text-center space-y-6 p-8 sm:p-10 rounded-3xl border border-[#202A40] bg-[#101525]/95 backdrop-blur-xl shadow-[0_20px_50px_rgba(5,8,23,0.9)]"
      >
        {/* Brand identity mark */}
        <div className="flex items-center justify-center gap-1.5 text-xs font-mono text-[#94A3B8] uppercase tracking-widest pb-2 border-b border-[#202A40]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] animate-pulse" />
          <span>SAIMON® ARCHIVE SYSTEM</span>
        </div>

        {/* 404 Visual Icon */}
        <div className="inline-flex p-4 rounded-2xl bg-[#080C1E] border border-[#202A40] text-[#2563EB] shadow-inner">
          <Compass size={32} className="animate-[spin_12s_linear_infinite]" />
        </div>

        {/* Error Details */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2563EB]/10 border border-[#2563EB]/30 text-xs font-mono text-[#93C5FD]">
            <Sparkles size={11} />
            <span>ERROR CODE 404</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-heading">
            Scene Not Found
          </h1>
          <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed max-w-sm mx-auto">
            The requested sequence, asset or route does not exist or has been relocated in Saimon&apos;s digital portfolio archive.
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#2563EB] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#1D4ED8] transition-all shadow-[0_4px_25px_rgba(37,99,235,0.4)] hover:shadow-[0_4px_35px_rgba(37,99,235,0.6)]"
          >
            <ArrowLeft size={14} />
            <span>Return to Portfolio</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
