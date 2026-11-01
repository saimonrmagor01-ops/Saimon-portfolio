"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Play, Pause, Sparkles, MapPin, Globe } from "lucide-react";
import { SocialLinks } from "./SocialLinks";
import { Hero3DScene } from "./Hero3DScene";
import { AnimatedHeading } from "./AnimatedHeading";
import { Magnetic } from "./Magnetic";
import { TiltCard } from "./TiltCard";

export const Hero: React.FC = () => {
  const [isPlayingReel, setIsPlayingReel] = useState(false);

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-between pt-32 pb-16 px-4 sm:px-8 overflow-hidden editorial-grid"
    >
      {/* 3D Interactive WebGL Scene */}
      <Hero3DScene />

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
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#202A40] bg-[#101525]/90 backdrop-blur-md text-[11px] font-mono tracking-wider text-[#94A3B8]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2563EB] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2563EB]"></span>
              </span>
              <span>AVAILABLE FOR SELECT COLLABORATIONS</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#202A40] bg-[#101525]/90 text-[11px] font-mono text-[#94A3B8]">
              <MapPin size={11} className="text-[#2563EB]" />
              <span>NEPAL</span>
            </div>
          </div>

          {/* Social Icons Bar */}
          <SocialLinks size="sm" />
        </motion.div>

        {/* Master Editorial Typography with Character/Word Mask Reveal */}
        <div className="space-y-2 mb-8">
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[100px] font-extrabold tracking-tightest leading-[0.94] text-white font-heading">
            <AnimatedHeading
              text="Creative mind."
              tag="span"
              className="text-white"
            />
            <br />
            <AnimatedHeading
              text="Digital execution."
              tag="span"
              delay={0.15}
              className="text-[#94A3B8] font-normal italic font-serif"
            />
          </h1>
        </div>

        {/* Narrative Bio & Hero CTAs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mt-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6"
          >
            <p className="text-base sm:text-lg text-[#94A3B8] max-w-2xl font-normal leading-relaxed">
              I&apos;m <span className="text-white font-medium">Saimon Rana Magar</span> — an <span className="text-[#3B82F6] font-medium">AI filmmaker</span>, content creator and developer building cinematic experiences and <span className="text-white font-medium">digital products</span>.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Magnetic strength={0.25}>
                <a
                  href="#projects"
                  className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#2563EB] text-white font-semibold text-xs tracking-wider uppercase hover:bg-[#1D4ED8] transition-all duration-200 shadow-[0_4px_25px_rgba(37,99,235,0.4)] hover:shadow-[0_4px_35px_rgba(37,99,235,0.6)]"
                >
                  <span>Explore My Work</span>
                  <ArrowDown size={14} className="group-hover:translate-y-0.5 transition-transform" />
                </a>
              </Magnetic>

              <Magnetic strength={0.25}>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-[#202A40] bg-[#101525] text-white font-medium text-xs tracking-wider uppercase hover:border-[#2563EB] hover:bg-[#161D33] transition-all duration-200"
                >
                  <span>Let&apos;s Collaborate</span>
                  <ArrowUpRight size={14} />
                </a>
              </Magnetic>
            </div>
          </motion.div>

          {/* Cinematic Showreel Showcase Card with 3D Tilt */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <TiltCard maxTilt={10}>
              <div className="relative rounded-2xl border border-[#202A40] bg-[#101525]/95 backdrop-blur-md p-4 shadow-2xl overflow-hidden group">
                {/* Aspect Ratio Box (16:9) */}
                <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-[#080C1E] border border-[#202A40] flex flex-col justify-between p-3">
                  {/* Simulated Visual Reel Art */}
                  <div
                    className="absolute inset-0 opacity-80 transition-transform duration-700 group-hover:scale-105"
                    style={{
                      background:
                        "radial-gradient(ellipse at 40% 40%, rgba(37, 99, 235, 0.35), transparent 70%), linear-gradient(135deg, #080C1E 0%, #161D33 50%, #050817 100%)",
                    }}
                  />

                  {/* Film Letterbox Bars */}
                  <div className="absolute top-0 inset-x-0 h-3 bg-black z-10 opacity-90" />
                  <div className="absolute bottom-0 inset-x-0 h-3 bg-black z-10 opacity-90" />

                  {/* Reel Header */}
                  <div className="relative z-20 flex items-center justify-between text-[10px] font-mono tracking-wider text-[#93C5FD]">
                    <span className="flex items-center gap-1.5">
                      <Sparkles size={10} />
                      <span>SHOWREEL_2025.REC</span>
                    </span>
                    <span className="text-[#64748B]">2.39:1 CINEMATIC</span>
                  </div>

                  {/* Reel Center Action */}
                  <div className="relative z-20 my-auto text-center">
                    <button
                      onClick={() => setIsPlayingReel(!isPlayingReel)}
                      className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-[#2563EB]/80 backdrop-blur-md border border-[#2563EB] text-white hover:bg-[#1D4ED8] transition-all duration-300 shadow-[0_0_20px_rgba(37,99,235,0.5)] mx-auto hover:scale-105"
                      aria-label={isPlayingReel ? "Pause showreel preview" : "Play showreel preview"}
                    >
                      {isPlayingReel ? <Pause size={18} /> : <Play size={18} className="translate-x-0.5" />}
                    </button>
                    <p className="text-[11px] font-medium tracking-wide text-white/90 mt-2 font-heading">
                      {isPlayingReel ? "Playing Generative Reel..." : "Preview Creative Showreel"}
                    </p>
                  </div>

                  {/* Reel Footer Audio / Timecode */}
                  <div className="relative z-20 flex items-center justify-between text-[10px] font-mono text-[#94A3B8]">
                    <div className="flex items-center gap-1">
                      <span className={`inline-block w-1.5 h-1.5 rounded-full ${isPlayingReel ? "bg-red-500 animate-ping" : "bg-white/40"}`} />
                      <span>00:24:18</span>
                    </div>
                    <div className="flex items-center gap-0.5">
                      <span className="w-1 h-2 bg-[#2563EB]/60 rounded-full animate-pulse" />
                      <span className="w-1 h-3.5 bg-[#2563EB]/80 rounded-full animate-pulse delay-75" />
                      <span className="w-1 h-1.5 bg-[#2563EB]/40 rounded-full animate-pulse delay-150" />
                      <span className="w-1 h-4 bg-[#2563EB] rounded-full animate-pulse delay-100" />
                    </div>
                  </div>
                </div>

                {/* Caption */}
                <div className="mt-3 flex items-center justify-between text-xs text-[#94A3B8]">
                  <span>AI Cinema • Short-Form • Web Apps</span>
                  <span className="text-[#3B82F6] text-[11px] font-mono font-medium">FLOW &amp; NEXT.JS</span>
                </div>
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </div>

      {/* Meta Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="max-w-6xl w-full mx-auto pt-8 border-t border-[#202A40] relative z-10"
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono uppercase tracking-widest text-[#94A3B8]">
          <div className="flex items-center gap-2">
            <span className="text-[#2563EB] font-bold">01 /</span>
            <span>AI Filmmaking &amp; Content Creation</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#2563EB] font-bold">02 /</span>
            <span>Web Development &amp; Automation</span>
          </div>
          <div className="flex items-center gap-2 sm:justify-end">
            <Globe size={12} className="text-[#2563EB]" />
            <span>Kathmandu, Nepal (GMT+5:45)</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
