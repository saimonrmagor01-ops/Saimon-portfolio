"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  Play,
  MapPin,
  Sparkles,
  Film,
  Sliders,
  Code,
  Compass,
} from "lucide-react";
import { SocialLinks } from "./SocialLinks";
import { Hero3DScene } from "./Hero3DScene";
import { ShowreelModal } from "./ShowreelModal";
import { Magnetic } from "./Magnetic";

export const Hero: React.FC = () => {
  const [isShowreelOpen, setIsShowreelOpen] = useState(false);

  const disciplines = [
    {
      number: "01",
      title: "AI Filmmaking & Direction",
      tagline: "Prompt-Guided Visual Cinema",
      description:
        "Directing speculative narrative sequences with natural lighting, camera choreography, and cinematic weight.",
      tools: "Google Flow • Generative Cinema",
      icon: Film,
      href: "#creative-studio",
    },
    {
      number: "02",
      title: "Video Editing & Post-Production",
      tagline: "Rhythm & Transient-Aligned Pacing",
      description:
        "Structuring edits around musical transients, audio-visual sync, narrative flow, and precise color grading.",
      tools: "Premiere Pro • CapCut Pro",
      icon: Sliders,
      href: "#creative-studio",
    },
    {
      number: "03",
      title: "Web Engineering & Automation",
      tagline: "Modern TypeScript Platforms",
      description:
        "Building accessible digital products like BudgetMandu with Next.js alongside asynchronous Python bots.",
      tools: "Next.js • React • Python",
      icon: Code,
      href: "#development-studio",
    },
  ];

  return (
    <section
      id="home"
      aria-label="Introduction"
      className="relative min-h-[96vh] lg:min-h-screen flex flex-col justify-between pt-28 sm:pt-36 pb-12 sm:pb-16 px-4 sm:px-8 overflow-hidden editorial-grid"
    >
      {/* 3D Interactive WebGL Scene */}
      <Hero3DScene />

      {/* Atmospheric Ambient Lighting Gradients */}
      <div
        className="absolute top-1/6 right-0 w-[500px] h-[500px] lg:w-[750px] lg:h-[750px] rounded-full pointer-events-none opacity-50 blur-[130px] -z-10"
        style={{
          background:
            "radial-gradient(circle, rgba(37, 99, 235, 0.28) 0%, rgba(56, 189, 248, 0.12) 40%, transparent 75%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-16 -left-16 w-[420px] h-[420px] rounded-full pointer-events-none opacity-40 blur-[120px] -z-10"
        style={{
          background:
            "radial-gradient(circle, rgba(99, 102, 241, 0.22) 0%, rgba(37, 99, 235, 0.08) 50%, transparent 75%)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-6xl w-full mx-auto my-auto relative z-10 pt-2 pb-6">
        {/* Availability & Location Bar */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-between gap-3.5 mb-7 sm:mb-9"
        >
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Live Availability Status */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-white/10 bg-[#080C18]/85 backdrop-blur-xl text-[11px] font-mono tracking-wide text-slate-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
              </span>
              <span className="font-medium text-white/90">Available for Select Projects</span>
            </div>

            {/* Location & Time Zone */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-[#080C18]/75 backdrop-blur-xl text-[11px] font-mono text-slate-400">
              <MapPin size={11} className="text-[#38BDF8]" />
              <span>Kathmandu, Nepal</span>
              <span className="text-slate-600">•</span>
              <span className="text-[10px] text-slate-500">GMT+5:45</span>
            </div>

            {/* Verified Social Proof Pill */}
            <div className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-[#080C18]/75 backdrop-blur-xl text-[11px] font-mono text-slate-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="text-white font-medium">100% Verified Delivery</span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-400">4 Shipped Works</span>
            </div>
          </div>

          {/* Social Links */}
          <div className="hidden sm:block">
            <SocialLinks size="sm" />
          </div>
        </motion.div>

        {/* Master Typographic Heading Area */}
        <div className="space-y-4 mb-8 sm:mb-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 text-xs sm:text-[13px] font-mono tracking-[0.2em] uppercase text-[#38BDF8] font-medium"
          >
            <Sparkles size={12} className="text-[#38BDF8] animate-pulse" />
            <span>SAIMON RANA MAGAR • DIGITAL DIRECTOR &amp; DEVELOPER</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-[84px] xl:text-[92px] font-extrabold tracking-tightest leading-[1.02] text-[#F8FAFC] font-heading"
          >
            AI Filmmaking, <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-300">
              Video Production &amp;
            </span>{" "}
            <br className="hidden lg:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] via-[#818CF8] to-[#C084FC] font-serif italic font-normal tracking-tight">
              Creative Web Development.
            </span>
          </motion.h1>
        </div>

        {/* Narrative Bio & Hero CTAs Grid with Showreel Presentation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-end">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6"
          >
            <p className="text-base sm:text-lg lg:text-[19px] text-[#94A3B8] max-w-xl font-normal leading-relaxed">
              I’m an independent creator crafting stories through{" "}
              <strong className="text-white font-medium">AI cinema</strong>,
              rhythm-driven{" "}
              <strong className="text-white font-medium">video editing</strong>,
              and accessible{" "}
              <strong className="text-[#38BDF8] font-medium">web platforms</strong>{" "}
              like BudgetMandu.
            </p>

            {/* Magnetic CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              <Magnetic strength={0.2}>
                <a
                  href="#projects"
                  className="group relative inline-flex items-center gap-2.5 px-6 sm:px-7 py-3.5 rounded-full bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] text-white font-semibold text-xs tracking-wider uppercase shadow-[0_4px_30px_rgba(37,99,235,0.45)] hover:shadow-[0_4px_40px_rgba(37,99,235,0.7)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 min-h-[46px]"
                >
                  <span>Explore Selected Work</span>
                  <ArrowDown
                    size={14}
                    className="group-hover:translate-y-1 transition-transform duration-300"
                  />
                </a>
              </Magnetic>

              <Magnetic strength={0.2}>
                <a
                  href="#contact"
                  className="group inline-flex items-center gap-2 px-6 sm:px-7 py-3.5 rounded-full border border-white/15 bg-[#0D1224]/80 backdrop-blur-xl text-[#F8FAFC] font-medium text-xs tracking-wider uppercase hover:border-[#38BDF8]/60 hover:bg-[#131930] hover:shadow-[0_0_25px_rgba(56,189,248,0.2)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 min-h-[46px]"
                >
                  <span>Get in Touch</span>
                  <ArrowUpRight
                    size={14}
                    className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300 text-[#38BDF8]"
                  />
                </a>
              </Magnetic>
            </div>
          </motion.div>

          {/* Cinematic Creative Showreel Presentation Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <div
              onClick={() => setIsShowreelOpen(true)}
              className="relative rounded-2xl border border-white/10 bg-[#0A0E1C]/85 backdrop-blur-2xl p-3 sm:p-4 hover:border-[#2563EB]/60 hover:shadow-[0_20px_60px_rgba(37,99,235,0.25)] transition-all duration-500 cursor-pointer group shadow-2xl"
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
              {/* Aspect Ratio Box with Cinematic Framing */}
              <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-[#050817] border border-white/10 flex flex-col justify-between p-3.5 select-none">
                {/* Looping ambient video preview */}
                <video
                  src="/videos/work.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-75 group-hover:scale-105 transition-all duration-700 pointer-events-none"
                />

                {/* Subtle vignette gradient & cinematic letterbox */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/50 pointer-events-none" />

                {/* Reel Header */}
                <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-white/90">
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 shadow-sm">
                    <Sparkles size={11} className="text-[#38BDF8]" />
                    <span className="tracking-wide">Creative Showreel</span>
                  </span>
                  <span className="text-slate-400 text-[10px] font-mono px-2 py-0.5 rounded-full bg-black/50 border border-white/10">
                    00:10 • 4K
                  </span>
                </div>

                {/* Reel Center Play Trigger */}
                <div className="relative z-10 my-auto text-center py-2">
                  <div className="relative inline-flex items-center justify-center">
                    {/* Pulsing Ripple Aura */}
                    <span className="absolute inset-0 rounded-full bg-[#2563EB] animate-ping opacity-35" />
                    <div className="relative inline-flex items-center justify-center h-13 w-13 rounded-full bg-gradient-to-tr from-[#2563EB] to-[#38BDF8] text-white shadow-[0_0_30px_rgba(37,99,235,0.7)] group-hover:scale-115 transition-transform duration-300">
                      <Play size={19} className="translate-x-0.5 fill-white" />
                    </div>
                  </div>
                  <div className="text-xs font-semibold text-white mt-2.5 group-hover:text-[#93C5FD] transition-colors font-heading tracking-wide">
                    Watch Full Creative Showreel
                  </div>
                </div>

                {/* Reel Footer */}
                <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-slate-300">
                  <span>AI Cinema • Video Editing</span>
                  <span className="text-[#38BDF8] font-medium">1080p ProRes</span>
                </div>
              </div>

              {/* Bottom Caption Bar */}
              <div className="mt-3 flex items-center justify-between text-xs text-slate-400 px-1">
                <span>Featured Film &amp; Editing Cuts</span>
                <span className="text-white group-hover:text-[#38BDF8] flex items-center gap-1 text-[11px] font-mono transition-colors">
                  <span>Open Cinematic Player</span>
                  <ArrowUpRight size={13} />
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Editorial Disciplines Presentation Strip */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="max-w-6xl w-full mx-auto pt-8 border-t border-white/10 relative z-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4">
          {disciplines.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.number}
                href={item.href}
                className="group relative flex flex-col justify-between p-4 sm:p-5 rounded-2xl border border-white/[0.08] bg-[#090D1C]/60 hover:bg-[#0E152E]/85 backdrop-blur-xl transition-all duration-300 hover:border-[#2563EB]/40 hover:shadow-[0_8px_30px_rgba(37,99,235,0.15)]"
              >
                <div className="flex items-start justify-between gap-3 mb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-[#2563EB]">
                      {item.number} —
                    </span>
                    <h3 className="text-sm font-semibold text-white font-heading group-hover:text-[#93C5FD] transition-colors leading-tight">
                      {item.title}
                    </h3>
                  </div>
                  <div className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-400 group-hover:text-[#38BDF8] group-hover:border-[#38BDF8]/40 transition-colors shrink-0">
                    <Icon size={14} />
                  </div>
                </div>

                <p className="text-xs text-slate-400 font-sans leading-relaxed mb-3">
                  {item.description}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[10px] font-mono text-slate-500 group-hover:text-slate-400">
                  <span>{item.tools}</span>
                  <ArrowUpRight
                    size={12}
                    className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#38BDF8] transition-all"
                  />
                </div>
              </a>
            );
          })}
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
