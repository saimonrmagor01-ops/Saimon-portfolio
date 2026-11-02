"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Play, MapPin, Globe, Sparkles } from "lucide-react";
import { SocialLinks } from "./SocialLinks";
import { Hero3DScene } from "./Hero3DScene";
import { ShowreelModal } from "./ShowreelModal";

export const Hero: React.FC = () => {
  const [isShowreelOpen, setIsShowreelOpen] = useState(false);

  return (
    <section
      id="home"
      className="relative min-h-[92vh] lg:min-h-screen flex flex-col justify-between pt-28 sm:pt-36 pb-12 sm:pb-16 px-4 sm:px-8 overflow-hidden editorial-grid"
    >
      {/* 3D Interactive WebGL Scene */}
      <Hero3DScene />

      {/* Background Subtle Ambient Lighting */}
      <div
        className="absolute top-1/4 right-0 w-[450px] h-[450px] lg:w-[650px] lg:h-[650px] rounded-full pointer-events-none radial-glow-blue opacity-60 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-20 -left-20 w-[350px] h-[350px] rounded-full pointer-events-none radial-glow-subtle opacity-40 blur-3xl"
        aria-hidden="true"
      />

      <div className="max-w-6xl w-full mx-auto my-auto relative z-10 pt-4 pb-8">
        {/* Availability & Location Bar */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-between gap-4 mb-6 sm:mb-8"
        >
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#1C2438] bg-[#0D1224]/90 backdrop-blur-md text-[11px] font-mono tracking-wide text-[#94A3B8]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2563EB] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2563EB]"></span>
              </span>
              <span>Available for Select Projects</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#1C2438] bg-[#0D1224]/90 text-[11px] font-mono text-[#94A3B8]">
              <MapPin size={11} className="text-[#2563EB]" />
              <span>Kathmandu, Nepal</span>
            </div>
          </div>

          {/* Social Links */}
          <SocialLinks size="sm" />
        </motion.div>

        {/* Master Editorial Typography */}
        <div className="space-y-3 mb-8 sm:mb-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xs sm:text-sm font-mono tracking-widest uppercase text-[#38BDF8] font-medium"
          >
            Saimon Rana Magar • Digital Creator &amp; Developer
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-[84px] font-extrabold tracking-tightest leading-[1.02] text-[#F5F7FF] font-heading"
          >
            AI Filmmaking, <br className="hidden sm:inline" />
            <span className="text-[#F5F7FF]">Video Production &amp;</span> <br />
            <span className="text-[#94A3B8] font-normal italic font-serif">
              Creative Web Development.
            </span>
          </motion.h1>
        </div>

        {/* Narrative Bio & Hero CTAs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-end">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6"
          >
            <p className="text-base sm:text-lg text-[#94A3B8] max-w-xl font-normal leading-relaxed">
              I’m an independent creator crafting stories through <span className="text-white font-medium">AI cinema</span>, rhythm-driven <span className="text-white font-medium">video editing</span>, and accessible <span className="text-[#38BDF8] font-medium">web platforms</span> like BudgetMandu.
            </p>

            {/* CTAs with clear visual priority */}
            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              <a
                href="#projects"
                className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#2563EB] text-white font-semibold text-xs tracking-wider uppercase hover:bg-[#1D4ED8] transition-all duration-200 shadow-[0_4px_25px_rgba(37,99,235,0.4)] hover:shadow-[0_4px_35px_rgba(37,99,235,0.6)]"
              >
                <span>Explore Selected Work</span>
                <ArrowDown size={14} className="group-hover:translate-y-0.5 transition-transform" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-[#1C2438] bg-[#0D1224] text-[#F5F7FF] font-medium text-xs tracking-wider uppercase hover:border-[#2563EB] hover:bg-[#131930] transition-all duration-200"
              >
                <span>Get in Touch</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </motion.div>

          {/* Genuine Creative Showreel Presentation Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <div
              onClick={() => setIsShowreelOpen(true)}
              className="relative rounded-2xl border border-[#1C2438] bg-[#0D1224] p-3.5 sm:p-4 hover:border-[#2563EB]/70 transition-all duration-300 cursor-pointer group shadow-2xl"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setIsShowreelOpen(true);
                }
              }}
              aria-label="Play 2025 Creative Showreel"
            >
              {/* Aspect Ratio Box */}
              <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-[#070B18] border border-[#1C2438] flex flex-col justify-between p-3.5">
                {/* Looping video preview */}
                <video
                  src="/videos/work.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover opacity-45 group-hover:opacity-65 group-hover:scale-105 transition-all duration-700 pointer-events-none"
                />

                {/* Subtle vignette gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none" />

                {/* Reel Header */}
                <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-white/80">
                  <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
                    <Sparkles size={11} className="text-[#38BDF8]" />
                    <span>Creative Showreel</span>
                  </span>
                  <span className="text-[#94A3B8] text-[10px]">00:10 Preview</span>
                </div>

                {/* Reel Center Play Trigger */}
                <div className="relative z-10 my-auto text-center py-2">
                  <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-[#2563EB] text-white shadow-[0_0_25px_rgba(37,99,235,0.6)] group-hover:scale-110 group-hover:bg-[#1D4ED8] transition-all duration-300 mx-auto">
                    <Play size={18} className="translate-x-0.5 fill-white" />
                  </div>
                  <div className="text-xs font-semibold text-white mt-2 group-hover:text-[#93C5FD] transition-colors font-heading">
                    Watch Full Creative Showreel
                  </div>
                </div>

                {/* Reel Footer */}
                <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-[#94A3B8]">
                  <span>AI Cinema • Video Editing</span>
                  <span className="text-[#38BDF8]">Watch in 1080p</span>
                </div>
              </div>

              {/* Bottom Caption */}
              <div className="mt-3 flex items-center justify-between text-xs text-[#94A3B8] px-0.5">
                <span>Featured Film &amp; Editing Cuts</span>
                <span className="text-white group-hover:text-[#38BDF8] flex items-center gap-1 text-[11px] font-mono transition-colors">
                  <span>Open Player</span>
                  <ArrowUpRight size={12} />
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Editorial Meta Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="max-w-6xl w-full mx-auto pt-6 sm:pt-8 border-t border-[#1C2438] relative z-10"
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-xs font-mono uppercase tracking-wider text-[#94A3B8]">
          <div className="flex items-center gap-2">
            <span className="text-[#2563EB] font-bold">01 /</span>
            <span>AI Filmmaking &amp; Direction</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#2563EB] font-bold">02 /</span>
            <span>Video Editing &amp; Post-Production</span>
          </div>
          <div className="flex items-center gap-2 sm:justify-end">
            <span className="text-[#2563EB] font-bold">03 /</span>
            <span>Web Development &amp; Automation</span>
          </div>
        </div>
      </motion.div>

      {/* Full-Screen Showreel Modal */}
      <ShowreelModal
        isOpen={isShowreelOpen}
        onClose={() => setIsShowreelOpen(false)}
      />
    </section>
  );
};
