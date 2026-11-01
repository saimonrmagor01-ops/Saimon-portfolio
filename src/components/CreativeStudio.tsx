"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Film, Play, Pause, Sparkles, Layers, Sliders, Maximize2, MonitorPlay } from "lucide-react";

interface CreativePiece {
  id: string;
  title: string;
  tagline: string;
  category: "AI Cinema" | "Short-Form" | "Commercial" | "Visual Lab";
  aspectRatio: "2.39:1" | "16:9" | "9:16";
  tools: string[];
  themeColor: string;
  gradient: string;
  description: string;
  duration: string;
}

export const CreativeStudio: React.FC = () => {
  const pieces: CreativePiece[] = [
    {
      id: "echoes",
      title: "Echoes of Tomorrow",
      tagline: "Generative Speculative Cinema",
      category: "AI Cinema",
      aspectRatio: "2.39:1",
      tools: ["Google Flow", "Adobe Premiere Pro"],
      themeColor: "#7dd3fc",
      gradient: "radial-gradient(ellipse at center, rgba(125, 211, 252, 0.3), rgba(6, 10, 18, 0.98))",
      description: "Explores human identity in an automated future. Built with prompt-architected shot continuity, unified anamorphic framing, and custom sound design in Premiere Pro.",
      duration: "02:14",
    },
    {
      id: "kinetic",
      title: "Kinetic Velocity Reel",
      tagline: "High-Retention Vertical Motion",
      category: "Short-Form",
      aspectRatio: "9:16",
      tools: ["Adobe Premiere Pro", "CapCut"],
      themeColor: "#c084fc",
      gradient: "radial-gradient(ellipse at center, rgba(192, 132, 252, 0.28), rgba(16, 7, 24, 0.98))",
      description: "Engineered for 9:16 social platforms. Features millisecond beat-syncing, dynamic motion typography, sound effects, and retention-maximizing visual pacing.",
      duration: "00:45",
    },
    {
      id: "aura",
      title: "Aura Lifestyle Ad",
      tagline: "Speculative Luxury Commercial",
      category: "Commercial",
      aspectRatio: "16:9",
      tools: ["Google Flow", "Adobe Premiere Pro", "CapCut"],
      themeColor: "#fb7185",
      gradient: "radial-gradient(ellipse at center, rgba(251, 113, 133, 0.25), rgba(20, 8, 12, 0.98))",
      description: "Exploring commercial viability of synthetic product cinematography. Features luxurious lighting transitions and crisp commercial audio foley.",
      duration: "00:30",
    },
    {
      id: "vistas",
      title: "Volumetric Atmosphere Lab",
      tagline: "Neural Environmental Experiment",
      category: "Visual Lab",
      aspectRatio: "16:9",
      tools: ["Google Flow", "AI Prompt Architecture"],
      themeColor: "#38bdf8",
      gradient: "radial-gradient(ellipse at center, rgba(56, 189, 248, 0.25), rgba(5, 12, 22, 0.98))",
      description: "Researching camera physics, anamorphic flares, and fog density in generative pipelines to achieve organic, analog-feeling cinematography.",
      duration: "01:10",
    },
  ];

  const [activePiece, setActivePiece] = useState<CreativePiece>(pieces[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section id="creative-studio" className="py-28 px-4 sm:px-8 border-t border-[#202A40] relative bg-[#050817]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-[#202A40]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#101525] border border-[#202A40] text-xs font-medium text-[#2563EB] mb-3">
              <Film size={12} />
              <span>02 / CREATIVE STUDIO</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tightest text-white leading-tight font-heading">
              AI Filmmaking &amp; <br />
              <span className="text-[#94A3B8] font-normal font-serif italic">Visual Production.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-[#94A3B8] font-normal leading-relaxed">
            A dedicated showcase for generative cinema, high-retention short-form video editing, and visual storytelling powered by Google Flow, Premiere Pro, and CapCut.
          </p>
        </div>

        {/* Master Cinema Interactive Player / Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Main Cinema Viewport */}
          <div className="lg:col-span-8 space-y-4">
            <div className="relative rounded-2xl border border-[#202A40] bg-[#101525] p-4 sm:p-6 shadow-2xl overflow-hidden group">
              {/* Aspect Ratio Framing */}
              <div
                className={`relative w-full rounded-xl overflow-hidden flex flex-col justify-between p-4 sm:p-6 transition-all duration-500 ${
                  activePiece.aspectRatio === "2.39:1"
                    ? "aspect-[21/9] sm:aspect-[2.39/1]"
                    : activePiece.aspectRatio === "9:16"
                    ? "aspect-[16/9] sm:aspect-[16/9]"
                    : "aspect-video"
                }`}
                style={{ background: activePiece.gradient }}
              >
                {/* Simulated Film Letterbox bars for 2.39:1 cinema */}
                <div className="absolute top-0 inset-x-0 h-4 bg-black/90 pointer-events-none z-10" />
                <div className="absolute bottom-0 inset-x-0 h-4 bg-black/90 pointer-events-none z-10" />

                {/* Viewport Top Meta */}
                <div className="relative z-20 flex items-center justify-between text-[11px] font-mono text-white/80">
                  <span className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10">
                    <Sparkles size={11} className="text-[#2563EB]" />
                    <span>{activePiece.category}</span>
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-0.5 rounded bg-black/50 text-[10px] text-[#CBD5E1] border border-white/10">
                      ASPECT {activePiece.aspectRatio}
                    </span>
                    <span className="text-[#93C5FD] font-semibold">{activePiece.duration}</span>
                  </div>
                </div>

                {/* Play / Pause Interactive Trigger */}
                <div className="relative z-20 my-auto text-center py-6">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    type="button"
                    className="inline-flex items-center justify-center h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-[#2563EB]/80 backdrop-blur-xl border border-[#2563EB] text-white hover:bg-[#1D4ED8] hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(37,99,235,0.5)] mx-auto"
                    aria-label={isPlaying ? "Pause cinematic preview" : "Play cinematic preview"}
                  >
                    {isPlaying ? <Pause size={24} /> : <Play size={24} className="translate-x-0.5" />}
                  </button>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mt-4 tracking-tight font-heading">
                    {activePiece.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/80 max-w-md mx-auto mt-1">
                    {activePiece.tagline}
                  </p>
                </div>

                {/* Timeline Progress Bar Simulation */}
                <div className="relative z-20 space-y-2">
                  <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                    <motion.div
                      className="bg-[#2563EB] h-full rounded-full"
                      animate={{ width: isPlaying ? "100%" : "35%" }}
                      transition={{ duration: isPlaying ? 25 : 0.5, ease: "linear" }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-[#94A3B8]">
                    <span>{isPlaying ? "PLAYING STREAM" : "00:08 / " + activePiece.duration}</span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[#2563EB]">CONFIRMED PIPELINE:</span>
                      <span>{activePiece.tools.join(" • ")}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description & Tools */}
              <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-[#202A40]">
                <p className="text-xs sm:text-sm text-[#94A3B8] max-w-xl">
                  {activePiece.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {activePiece.tools.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-full text-[10px] font-mono border border-[#202A40] bg-[#080C1E] text-[#CBD5E1]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Piece Selector List */}
          <div className="lg:col-span-4 space-y-3">
            <div className="text-xs font-mono uppercase tracking-widest text-[#64748B] mb-2 flex items-center justify-between">
              <span>Select Film Piece</span>
              <span>{pieces.length} Pieces</span>
            </div>

            {pieces.map((piece) => {
              const isSelected = activePiece.id === piece.id;
              return (
                <button
                  key={piece.id}
                  onClick={() => {
                    setActivePiece(piece);
                    setIsPlaying(false);
                  }}
                  type="button"
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex flex-col gap-2 ${
                    isSelected
                      ? "border-[#2563EB] bg-[#161D33] shadow-lg shadow-[rgba(37,99,235,0.15)]"
                      : "border-[#202A40] bg-[#101525] hover:border-[#2563EB]/60 hover:bg-[#161D33]/60"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded ${
                        isSelected
                          ? "bg-[#2563EB]/20 text-[#93C5FD]"
                          : "bg-[#080C1E] text-[#94A3B8]"
                      }`}
                    >
                      {piece.category}
                    </span>
                    <span className="text-[11px] font-mono text-[#64748B]">{piece.duration}</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">{piece.title}</h4>
                    <p className="text-xs text-[#94A3B8] line-clamp-1">{piece.tagline}</p>
                  </div>
                </button>
              );
            })}

            {/* Creative Process Box */}
            <div className="p-5 rounded-xl border border-[#202A40] bg-[#101525] space-y-3 mt-4">
              <div className="text-xs font-mono uppercase tracking-wider text-[#2563EB] flex items-center gap-1.5 font-bold">
                <Sliders size={12} />
                <span>Creative Pipeline</span>
              </div>
              <ul className="text-xs text-[#94A3B8] space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-white font-mono">01.</span>
                  <span>Concept &amp; Prompt Architecture in Google Flow</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white font-mono">02.</span>
                  <span>Timeline Editing &amp; Rhythm Sync in Premiere Pro</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white font-mono">03.</span>
                  <span>Short-form kinetic refinement &amp; captions in CapCut</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
