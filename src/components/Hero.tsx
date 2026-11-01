"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Play, Pause, Sparkles, MapPin, Globe } from "lucide-react";
import { SocialLinks } from "./SocialLinks";

export const Hero: React.FC = () => {
  const [isPlayingReel, setIsPlayingReel] = useState(false);

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-between pt-32 pb-16 px-4 sm:px-8 overflow-hidden editorial-grid"
    >
      {/* Background Cinematic Radial Glow */}
      <div
        className="absolute top-1/4 right-0 w-[500px] h-[500px] lg:w-[750px] lg:h-[750px] rounded-full pointer-events-none radial-glow-blue opacity-70 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full pointer-events-none radial-glow-subtle opacity-50 blur-3xl"
        aria-hidden="true"
      />

      <div className="max-w-6xl w-full mx-auto my-auto relative z-10 pt-4 pb-8">
        {/* Availability, Location & Social Links Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-between gap-4 mb-8"
        >
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md text-[11px] font-mono tracking-wider text-[#a0a0a0]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#9fbdff] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#9fbdff]"></span>
              </span>
              <span>AVAILABLE FOR SELECT COLLABORATIONS</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/5 bg-white/[0.02] text-[11px] font-mono text-[#777777]">
              <MapPin size={11} className="text-[#9fbdff]" />
              <span>NEPAL</span>
            </div>
          </div>

          {/* Social Icons Bar */}
          <SocialLinks size="sm" />
        </motion.div>

        {/* Master Editorial Typography */}
        <div className="space-y-2 mb-8">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-[100px] font-extrabold tracking-tightest leading-[0.94] text-white font-heading"
          >
            Creative mind. <br />
            <span className="text-[#6d7178] font-normal italic font-serif">Digital execution.</span>
          </motion.h1>
        </div>

        {/* Narrative Bio & Hero CTAs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mt-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6"
          >
            <p className="text-base sm:text-lg text-[#a3a3a3] max-w-2xl font-normal leading-relaxed">
              I&apos;m <span className="text-white font-medium">Saimon Rana Magar</span> — an <span className="text-[#9fbdff]">AI filmmaker</span>, content creator and developer building cinematic experiences and <span className="text-[#e2e8f0]">digital products</span>.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#projects"
                className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#f4f4f1] text-[#050505] font-semibold text-xs tracking-wider uppercase hover:bg-[#9fbdff] transition-all duration-200 shadow-[0_0_20px_rgba(255,255,255,0.15)]"
              >
                <span>Explore My Work</span>
                <ArrowDown size={14} className="group-hover:translate-y-0.5 transition-transform" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-white/20 bg-white/[0.02] text-white font-medium text-xs tracking-wider uppercase hover:bg-white/10 hover:border-white/40 transition-all duration-200"
              >
                <span>Let&apos;s Collaborate</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </motion.div>

          {/* Cinematic Showreel Showcase Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <div className="relative rounded-2xl border border-white/10 bg-[#0d0d10] p-4 shadow-2xl overflow-hidden group">
              {/* Aspect Ratio Box (16:9) */}
              <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-[#060608] border border-white/5 flex flex-col justify-between p-3">
                {/* Simulated Visual Reel Art */}
                <div
                  className="absolute inset-0 opacity-80 transition-transform duration-700 group-hover:scale-105"
                  style={{
                    background:
                      "radial-gradient(ellipse at 40% 40%, rgba(159, 189, 255, 0.32), transparent 70%), linear-gradient(135deg, #090a0f 0%, #151825 50%, #050608 100%)",
                  }}
                />

                {/* Film Letterbox Bars */}
                <div className="absolute top-0 inset-x-0 h-3 bg-black z-10 opacity-90" />
                <div className="absolute bottom-0 inset-x-0 h-3 bg-black z-10 opacity-90" />

                {/* Reel Header */}
                <div className="relative z-20 flex items-center justify-between text-[10px] font-mono tracking-wider text-[#9fbdff]">
                  <span className="flex items-center gap-1.5">
                    <Sparkles size={10} />
                    <span>SHOWREEL_2025.REC</span>
                  </span>
                  <span className="text-[#777777]">2.39:1 CINEMATIC</span>
                </div>

                {/* Reel Center Action */}
                <div className="relative z-20 my-auto text-center">
                  <button
                    onClick={() => setIsPlayingReel(!isPlayingReel)}
                    className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-300 shadow-xl mx-auto"
                    aria-label={isPlayingReel ? "Pause showreel preview" : "Play showreel preview"}
                  >
                    {isPlayingReel ? <Pause size={18} /> : <Play size={18} className="translate-x-0.5" />}
                  </button>
                  <p className="text-[11px] font-medium tracking-wide text-white/90 mt-2 font-heading">
                    {isPlayingReel ? "Playing Generative Reel..." : "Preview Creative Showreel"}
                  </p>
                </div>

                {/* Reel Footer Audio / Timecode */}
                <div className="relative z-20 flex items-center justify-between text-[10px] font-mono text-[#888888]">
                  <div className="flex items-center gap-1">
                    <span className={`inline-block w-1.5 h-1.5 rounded-full ${isPlayingReel ? "bg-red-500 animate-ping" : "bg-white/40"}`} />
                    <span>00:24:18</span>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <span className="w-1 h-2 bg-[#9fbdff]/60 rounded-full animate-pulse" />
                    <span className="w-1 h-3.5 bg-[#9fbdff]/80 rounded-full animate-pulse delay-75" />
                    <span className="w-1 h-1.5 bg-[#9fbdff]/40 rounded-full animate-pulse delay-150" />
                    <span className="w-1 h-4 bg-[#9fbdff] rounded-full animate-pulse delay-100" />
                  </div>
                </div>
              </div>

              {/* Caption */}
              <div className="mt-3 flex items-center justify-between text-xs text-[#777777]">
                <span>AI Cinema • Short-Form • Web Apps</span>
                <span className="text-[#9fbdff] text-[11px] font-mono">FLOW &amp; NEXT.JS</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Meta Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="max-w-6xl w-full mx-auto pt-8 border-t border-white/[0.08] relative z-10"
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono uppercase tracking-widest text-[#666666]">
          <div className="flex items-center gap-2">
            <span className="text-[#9fbdff]">01 /</span>
            <span>AI Filmmaking &amp; Content Creation</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#9fbdff]">02 /</span>
            <span>Web Development &amp; Automation</span>
          </div>
          <div className="flex items-center gap-2 sm:justify-end">
            <Globe size={12} className="text-[#9fbdff]" />
            <span>Kathmandu, Nepal (GMT+5:45)</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
