"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, ExternalLink, Sparkles, CheckCircle2, Layers, Calendar, 
  Terminal, Play, Pause, Volume2, VolumeX, Globe, UserCheck, 
  Palette, Cpu, Lock, ArrowUpRight
} from "lucide-react";
import { Project } from "@/data/projects";
import { duckBackgroundAudio, restoreBackgroundAudio } from "./MusicPlayer";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };

    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
      restoreBackgroundAudio();
    };
  }, [project]);

  useEffect(() => {
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
    restoreBackgroundAudio();
  }, [project]);

  const handleClose = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    restoreBackgroundAudio();
    onClose();
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().then(() => {
        setIsPlaying(true);
        if (!video.muted) {
          duckBackgroundAudio(true);
        }
      }).catch(() => {});
    } else {
      video.pause();
      setIsPlaying(false);
      restoreBackgroundAudio();
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    video.muted = nextMuted;

    if (isPlaying) {
      if (nextMuted) {
        restoreBackgroundAudio();
      } else {
        duckBackgroundAudio(true);
      }
    }
  };

  if (!project) return null;

  return (
    <AnimatePresence>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
        className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 bg-[#050817]/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-3xl rounded-3xl border border-[#202A40] bg-[#101525] shadow-[0_25px_80px_rgba(5,8,23,0.95)] overflow-hidden z-10 max-h-[90vh] flex flex-col my-auto"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-5 sm:px-6 py-3.5 sm:py-4 border-b border-[#202A40] bg-[#080C1E] sticky top-0 z-20">
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-mono text-[#93C5FD] uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#2563EB]/15 border border-[#2563EB]/30 font-medium">
                {project.category}
              </span>
              <span className="text-xs font-mono text-[#94A3B8] flex items-center gap-1">
                <Calendar size={12} className="text-[#2563EB]" />
                <span>{project.year}</span>
              </span>
              {project.isFeatured && (
                <span className="hidden sm:inline text-[10px] font-mono text-[#38BDF8] px-2 py-0.5 rounded-full bg-[#38BDF8]/10 border border-[#38BDF8]/20">
                  FEATURED WORK
                </span>
              )}
            </div>

            <button
              onClick={handleClose}
              type="button"
              className="w-9 h-9 rounded-full flex items-center justify-center text-[#94A3B8] hover:text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
              aria-label="Close project modal"
            >
              <X size={18} />
            </button>
          </div>

          {/* Modal Content Scroll Area */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-7">
            {/* Project Hero Visual Frame */}
            {project.demoUrl && project.thumbnailUrl ? (
              /* Genuine Website Preview in Browser Mockup Window */
              <div className="rounded-2xl overflow-hidden border border-[#202A40] bg-[#080C1E] shadow-2xl">
                {/* Browser Top Bar */}
                <div className="px-4 py-2.5 bg-[#0f1424] border-b border-[#202A40] flex items-center justify-between gap-3 text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                  </div>

                  {/* Address Pill */}
                  <div className="flex-1 max-w-sm mx-auto flex items-center justify-center gap-1.5 px-3 py-1 rounded-full bg-[#080C1E] border border-[#202A40] text-[11px] text-[#94A3B8] truncate">
                    <Lock size={10} className="text-emerald-400 shrink-0" />
                    <span className="truncate">{project.demoUrl}</span>
                  </div>

                  {/* Visit External Link */}
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-[11px] text-[#38BDF8] hover:text-white transition-colors"
                  >
                    <span>Open Live</span>
                    <ArrowUpRight size={12} />
                  </a>
                </div>

                {/* Screenshot Frame */}
                <div className="relative aspect-video w-full overflow-hidden bg-black">
                  <img
                    src={project.thumbnailUrl}
                    alt={project.title}
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080C1E]/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] font-mono text-white/80">
                    <span className="px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md border border-white/10">
                      LIVE PRODUCTION PLATFORM
                    </span>
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-medium flex items-center gap-1.5 transition-all shadow-md"
                    >
                      <span>Visit Live Website</span>
                      <ExternalLink size={11} />
                    </a>
                  </div>
                </div>
              </div>
            ) : project.videoSrc ? (
              /* Genuine Video Preview with Audio Ducking & Controls */
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-[#202A40] bg-black shadow-inner group">
                <video
                  ref={videoRef}
                  src={project.videoSrc}
                  playsInline
                  muted={isMuted}
                  onEnded={() => {
                    setIsPlaying(false);
                    restoreBackgroundAudio();
                  }}
                  className="w-full h-full object-cover cursor-pointer"
                  onClick={togglePlay}
                />

                {/* Video Overlay */}
                <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4 bg-gradient-to-t from-black/85 via-transparent to-black/45">
                  <div className="flex items-center justify-between text-[11px] font-mono text-white/80">
                    <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
                      <Sparkles size={11} className="text-[#38BDF8]" />
                      <span>{project.badge || "VERIFIED MEDIA"}</span>
                    </span>
                    <button
                      onClick={toggleMute}
                      type="button"
                      className="pointer-events-auto flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/70 hover:bg-[#2563EB] text-white text-[10px] font-mono transition-colors border border-white/10"
                    >
                      {isMuted ? <VolumeX size={12} className="text-red-400" /> : <Volume2 size={12} />}
                      <span>{isMuted ? "MUTED" : "SOUND ON"}</span>
                    </button>
                  </div>

                  {/* Play Overlay when paused */}
                  {!isPlaying && (
                    <div className="my-auto text-center pointer-events-auto">
                      <button
                        onClick={togglePlay}
                        type="button"
                        className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#2563EB]/90 hover:bg-[#1D4ED8] text-white shadow-[0_0_30px_rgba(37,99,235,0.6)] transition-all hover:scale-110"
                        aria-label="Play video"
                      >
                        <Play size={22} className="translate-x-0.5" />
                      </button>
                      <div className="text-xs font-mono text-white/90 mt-2 font-medium">
                        Click to Play Project Video
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-[10px] font-mono text-white/60">
                    <span>FORMAT: {project.aspectRatio}</span>
                    <span>HD • SOUNDTRACK DUCKING ACTIVE</span>
                  </div>
                </div>
              </div>
            ) : project.visualPreview.type === "typography-card" ? (
              /* Typographic Brand Identity Specimen for Aura */
              <div
                className="relative w-full aspect-video rounded-2xl overflow-hidden border border-[#202A40] p-6 sm:p-8 flex flex-col justify-between shadow-inner"
                style={{ background: project.visualPreview.themeGradient }}
              >
                <div className="flex items-center justify-between text-[11px] font-mono text-white/70">
                  <span className="flex items-center gap-1.5">
                    <Palette size={12} className="text-[#f43f5e]" />
                    <span>BRAND SYSTEM SPECIFICATION</span>
                  </span>
                  <span>AURA // 2025</span>
                </div>

                <div className="my-auto text-center space-y-3 py-4">
                  <div className="text-4xl sm:text-6xl font-black tracking-widest text-white font-serif italic drop-shadow-lg">
                    AURA
                  </div>
                  <div className="text-xs sm:text-sm font-mono text-[#fda4af] uppercase tracking-widest">
                    Identity Systems • Typography Scales • Color Architectures
                  </div>
                  <div className="flex items-center justify-center gap-3 pt-1">
                    <span className="px-3 py-1 rounded bg-black/50 border border-white/10 font-mono text-[10px] text-white/80">
                      Primary Font: Editorial Serif
                    </span>
                    <span className="px-3 py-1 rounded bg-black/50 border border-white/10 font-mono text-[10px] text-white/80">
                      Secondary: Sans Grotesque
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[10px] font-mono text-white/60">
                  <span>FORMAT: DESIGN SYSTEM // FIGMA</span>
                  <span>CREATIVE EXPERIMENT ARCHIVE</span>
                </div>
              </div>
            ) : project.visualPreview.type === "code-snippet" ? (
              /* Terminal Architecture View for Sentinel Bot */
              <div
                className="relative w-full aspect-video rounded-2xl overflow-hidden border border-[#202A40] p-6 flex flex-col justify-between shadow-inner bg-[#070d0a]"
                style={{ background: project.visualPreview.themeGradient }}
              >
                <div className="flex items-center justify-between text-[11px] font-mono text-white/70">
                  <span className="flex items-center gap-1.5">
                    <Terminal size={12} className="text-[#4ade80]" />
                    <span>PYTHON BOT ARCHITECTURE</span>
                  </span>
                  <span>DISCORD.PY // ASYNCIO</span>
                </div>

                <div className="my-auto rounded-xl bg-black/85 border border-emerald-900/40 p-4 font-mono text-xs space-y-1.5 shadow-inner">
                  <div className="flex items-center justify-between pb-2 border-b border-white/10 text-[10px] text-[#64748B]">
                    <span>sentinel/cogs/moderation.py</span>
                    <span className="text-emerald-400">● SHARDS: 1/1 READY</span>
                  </div>
                  <div className="text-emerald-400">
                    <span className="text-[#94A3B8]">class</span> <span className="text-amber-300">SentinelCore</span>(commands.Cog):
                  </div>
                  <div className="text-white pl-4">
                    <span className="text-blue-400">@commands.hybrid_command</span>(name=<span className="text-emerald-300">&quot;status&quot;</span>)
                  </div>
                  <div className="text-white pl-4">
                    <span className="text-blue-400">async def</span> <span className="text-amber-300">status</span>(self, ctx):
                  </div>
                  <div className="text-[#94A3B8] pl-8">
                    await ctx.send(embed=create_telemetry_embed(latency=self.bot.latency))
                  </div>
                </div>

                <div className="flex items-center justify-between text-[10px] font-mono text-white/60">
                  <span>DEPLOYMENT: PYTHON 3.11</span>
                  <span>EVENT DISPATCH: NON-BLOCKING</span>
                </div>
              </div>
            ) : (
              /* Experimental Lab Visual for Neural Vistas */
              <div
                className="relative w-full aspect-video rounded-2xl overflow-hidden border border-[#202A40] p-6 flex flex-col justify-between shadow-inner"
                style={{ background: project.visualPreview.themeGradient }}
              >
                <div className="flex items-center justify-between text-[11px] font-mono text-white/70">
                  <span className="flex items-center gap-1.5">
                    <Cpu size={12} className="text-[#fb923c]" />
                    <span>EXPERIMENTAL TECHNOLOGY LAB</span>
                  </span>
                  <span>NEURAL VISTAS // 2025</span>
                </div>

                <div className="my-auto text-center space-y-2 py-4">
                  <div className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white font-mono">
                    NEURAL VISTAS // LAB
                  </div>
                  <div className="text-xs sm:text-sm font-mono text-[#fdba74] max-w-md mx-auto">
                    Multimodal Generative Models • Prompt Synthesis • Latent Depth Testing
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 border border-[#fb923c]/40 text-[10px] font-mono text-white">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#fb923c] animate-pulse" />
                    <span>ACTIVE CREATIVE EXPERIMENT ARCHIVE</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[10px] font-mono text-white/60">
                  <span>PIPELINE: PROMPT ARCHITECTURE</span>
                  <span>STATUS: RESEARCH &amp; EXPLORATION</span>
                </div>
              </div>
            )}

            {/* Title & Role Bar */}
            <div className="space-y-3">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-heading">
                {project.title}
              </h3>

              {/* My Role & Contribution */}
              <div className="p-3.5 rounded-xl border border-[#202A40] bg-[#080C1E] flex items-center gap-2.5">
                <UserCheck size={16} className="text-[#2563EB] shrink-0" />
                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#64748B]">
                    Role &amp; Contribution:
                  </span>
                  <span className="text-xs font-semibold text-white">
                    {project.role}
                  </span>
                </div>
              </div>

              {/* Project Overview */}
              <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed pt-1">
                {project.description}
              </p>
            </div>

            {/* Objective */}
            <div className="p-5 rounded-2xl border border-[#202A40] bg-[#080C1E] space-y-2">
              <div className="text-[11px] font-mono text-[#2563EB] uppercase tracking-wider flex items-center gap-1.5 font-bold">
                <Terminal size={12} />
                <span>Project Objective</span>
              </div>
              <p className="text-xs sm:text-sm text-[#CBD5E1] leading-relaxed">
                {project.objective}
              </p>
            </div>

            {/* Key Deliverables & Technical Features */}
            <div className="space-y-3">
              <div className="text-xs font-mono uppercase tracking-widest text-[#64748B]">
                Key Deliverables &amp; Technical Features
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl border border-[#202A40] bg-[#080C1E] flex items-start gap-2.5 text-xs text-[#CBD5E1] leading-snug"
                  >
                    <CheckCircle2 size={14} className="text-[#2563EB] mt-0.5 shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tools & Tech Stack */}
            <div className="space-y-3 pt-2">
              <div className="text-xs font-mono uppercase tracking-widest text-[#64748B]">
                Tools &amp; Technologies Used
              </div>
              <div className="flex flex-wrap gap-2">
                {project.tools.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1.5 rounded-lg text-xs font-mono border border-[#202A40] bg-[#080C1E] text-white"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="px-6 py-4 border-t border-[#202A40] bg-[#080C1E] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#94A3B8]">
            <span className="hidden sm:inline font-mono text-[11px]">
              Saimon Rana Magar • Digital Creator &amp; Dev
            </span>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-[#2563EB] text-white font-semibold hover:bg-[#1D4ED8] transition-all shadow-[0_0_15px_rgba(37,99,235,0.4)] hover:scale-105 text-xs"
                >
                  <Globe size={13} />
                  <span>Visit Live Website</span>
                  <ExternalLink size={12} />
                </a>
              )}

              <a
                href="#contact"
                onClick={handleClose}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full border border-[#202A40] bg-[#101525] text-[#CBD5E1] hover:text-white hover:border-[#2563EB] transition-colors text-xs"
              >
                <span>Discuss Project</span>
                <ArrowUpRight size={12} />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
