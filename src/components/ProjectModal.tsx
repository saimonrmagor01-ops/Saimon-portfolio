"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, ExternalLink, Calendar, Terminal, Play, Pause, 
  Volume2, VolumeX, Globe, UserCheck, ArrowUpRight, 
  CheckCircle2, Lock, Palette, Cpu
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
  const savedScrollY = useRef(0);
  const historyPushed = useRef(false);

  // Browser history integration: Back button closes modal
  useEffect(() => {
    if (project) {
      savedScrollY.current = window.scrollY;
      if (!historyPushed.current) {
        window.history.pushState({ projectModalOpen: true }, "");
        historyPushed.current = true;
      }
    }
  }, [project]);

  useEffect(() => {
    if (!project) return;

    const handlePopState = () => {
      historyPushed.current = false;
      onClose();
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [project, onClose]);

  // ESC key and scroll lock
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
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

    if (historyPushed.current) {
      historyPushed.current = false;
      window.history.go(-1);
    }

    window.scrollTo({ top: savedScrollY.current, behavior: "instant" });
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
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-3xl rounded-3xl border border-[#1C2438] bg-[#0D1224] shadow-[0_25px_80px_rgba(5,8,23,0.95)] overflow-hidden z-10 max-h-[90vh] flex flex-col my-auto"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-5 sm:px-6 py-3.5 sm:py-4 border-b border-[#1C2438] bg-[#070B18] sticky top-0 z-20">
            <div className="flex items-center gap-2.5">
              <button
                onClick={handleClose}
                type="button"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0D1224] border border-[#2563EB] text-white hover:bg-[#2563EB] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] font-mono text-[11px] font-semibold"
                aria-label="Back to projects"
              >
                <span>← Back</span>
              </button>
              <span className="text-[11px] font-mono text-[#38BDF8] uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#2563EB]/15 border border-[#2563EB]/30 font-medium">
                {project.category}
              </span>
              <span className="text-xs font-mono text-[#94A3B8] flex items-center gap-1">
                <Calendar size={12} className="text-[#2563EB]" />
                <span>{project.year}</span>
              </span>
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
            {/* Visual Frame */}
            {project.demoUrl && project.thumbnailUrl ? (
              /* Genuine Website Preview in Browser Mockup Window */
              <div className="rounded-2xl overflow-hidden border border-[#1C2438] bg-[#070B18] shadow-2xl">
                <div className="px-4 py-2.5 bg-[#0a0f20] border-b border-[#1C2438] flex items-center justify-between gap-3 text-xs font-mono">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/70 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70 inline-block" />
                  </div>

                  <div className="flex-1 max-w-sm mx-auto flex items-center justify-center gap-1.5 px-3 py-1 rounded-full bg-[#070B18] border border-[#1C2438] text-[11px] text-[#94A3B8] truncate">
                    <Lock size={10} className="text-emerald-400 shrink-0" />
                    <span className="truncate">{project.demoUrl}</span>
                  </div>

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

                <div className="relative aspect-video w-full overflow-hidden bg-black">
                  <img
                    src={project.thumbnailUrl}
                    alt={project.title}
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070B18]/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] font-mono text-white/90">
                    <span className="px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md border border-white/10">
                      Live Production Storefront
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
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-[#1C2438] bg-black shadow-inner group">
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

                <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4 bg-gradient-to-t from-black/85 via-transparent to-black/45">
                  <div className="flex items-center justify-between text-[11px] font-mono text-white/80">
                    <span className="px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md border border-white/10">
                      {project.statusType}
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

                  {!isPlaying && (
                    <div className="my-auto text-center pointer-events-auto">
                      <button
                        onClick={togglePlay}
                        type="button"
                        className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#2563EB] text-white hover:bg-[#1D4ED8] shadow-[0_0_30px_rgba(37,99,235,0.6)] transition-all hover:scale-110"
                        aria-label="Play video"
                      >
                        <Play size={22} className="translate-x-0.5 fill-white" />
                      </button>
                      <div className="text-xs font-mono text-white/90 mt-2 font-medium">
                        Click to Play Project Video
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-[10px] font-mono text-white/60">
                    <span>Format: {project.aspectRatio}</span>
                    <span>1080p HD</span>
                  </div>
                </div>
              </div>
            ) : project.visualPreview.type === "typography-card" ? (
              /* Typographic Design System Specimen */
              <div
                className="relative w-full aspect-video rounded-2xl overflow-hidden border border-[#1C2438] p-6 sm:p-8 flex flex-col justify-between shadow-inner"
                style={{ background: project.visualPreview.themeGradient }}
              >
                <div className="flex items-center justify-between text-[11px] font-mono text-white/70">
                  <span className="flex items-center gap-1.5">
                    <Palette size={12} className="text-[#f43f5e]" />
                    <span>Brand System Specification</span>
                  </span>
                  <span>{project.year}</span>
                </div>

                <div className="my-auto text-center space-y-2 py-4">
                  <div className="text-4xl sm:text-6xl font-black tracking-widest text-white font-serif italic drop-shadow-lg">
                    AURA
                  </div>
                  <div className="text-xs sm:text-sm font-mono text-[#fda4af] uppercase tracking-widest">
                    Identity Systems • Typography Scales • Grid Architecture
                  </div>
                </div>

                <div className="flex items-center justify-between text-[10px] font-mono text-white/60">
                  <span>Format: Design System // Figma</span>
                  <span>Conceptual Brand System</span>
                </div>
              </div>
            ) : project.visualPreview.type === "code-snippet" ? (
              /* Code Specimen for Sentinel */
              <div
                className="relative w-full aspect-video rounded-2xl overflow-hidden border border-[#1C2438] p-6 flex flex-col justify-between shadow-inner bg-[#070d0a]"
                style={{ background: project.visualPreview.themeGradient }}
              >
                <div className="flex items-center justify-between text-[11px] font-mono text-white/70">
                  <span className="flex items-center gap-1.5">
                    <Terminal size={12} className="text-[#4ade80]" />
                    <span>Python Bot Architecture</span>
                  </span>
                  <span>discord.py // AsyncIO</span>
                </div>

                <div className="my-auto rounded-xl bg-black/85 border border-emerald-900/40 p-4 font-mono text-xs space-y-1.5 shadow-inner">
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
                    await ctx.send(embed=create_status_embed(latency=self.bot.latency))
                  </div>
                </div>

                <div className="flex items-center justify-between text-[10px] font-mono text-white/60">
                  <span>Runtime: Python 3.11</span>
                  <span>Non-Blocking Event Loop</span>
                </div>
              </div>
            ) : (
              /* Experimental Lab Visual */
              <div
                className="relative w-full aspect-video rounded-2xl overflow-hidden border border-[#1C2438] p-6 flex flex-col justify-between shadow-inner"
                style={{ background: project.visualPreview.themeGradient }}
              >
                <div className="flex items-center justify-between text-[11px] font-mono text-white/70">
                  <span className="flex items-center gap-1.5">
                    <Cpu size={12} className="text-[#fb923c]" />
                    <span>Experimental Technology Lab</span>
                  </span>
                  <span>{project.year}</span>
                </div>

                <div className="my-auto text-center space-y-2 py-4">
                  <div className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white font-mono">
                    NEURAL VISTAS LAB
                  </div>
                  <div className="text-xs sm:text-sm font-mono text-[#fdba74] max-w-md mx-auto">
                    Multimodal Generative Models &amp; Camera Parameter Testing
                  </div>
                </div>

                <div className="flex items-center justify-between text-[10px] font-mono text-white/60">
                  <span>Status: Active Exploration Sandbox</span>
                  <span>Creative Testing</span>
                </div>
              </div>
            )}

            {/* Title & Role */}
            <div className="space-y-3">
              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-heading">
                  {project.title}
                </h3>
                {project.subtitle && (
                  <div className="text-sm font-semibold text-[#38BDF8] mt-0.5 font-heading">
                    {project.subtitle}
                  </div>
                )}
              </div>

              {/* My Role & Specific Contribution */}
              <div className="p-4 rounded-xl border border-[#1C2438] bg-[#070B18] space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono text-[#2563EB] font-bold uppercase tracking-wider">
                  <UserCheck size={14} />
                  <span>My Role &amp; Contribution</span>
                </div>
                <div className="text-xs font-semibold text-white">
                  {project.role}
                </div>
                <p className="text-xs sm:text-sm text-[#CBD5E1] leading-relaxed">
                  {project.contribution}
                </p>
              </div>

              {/* Project Description */}
              <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed pt-1">
                {project.description}
              </p>
            </div>

            {/* Objective */}
            <div className="p-5 rounded-2xl border border-[#1C2438] bg-[#070B18] space-y-2">
              <div className="text-[11px] font-mono text-[#2563EB] uppercase tracking-wider flex items-center gap-1.5 font-bold">
                <Terminal size={12} />
                <span>Project Objective</span>
              </div>
              <p className="text-xs sm:text-sm text-[#CBD5E1] leading-relaxed">
                {project.objective}
              </p>
            </div>

            {/* Key Features & Deliverables */}
            <div className="space-y-3">
              <div className="text-xs font-mono uppercase tracking-widest text-[#94A3B8]">
                Key Deliverables &amp; Features
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {project.features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl border border-[#1C2438] bg-[#070B18] flex items-start gap-2.5 text-xs text-[#CBD5E1] leading-snug"
                  >
                    <CheckCircle2 size={13} className="text-[#2563EB] mt-0.5 shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tools Used */}
            <div className="space-y-2.5 pt-1">
              <div className="text-xs font-mono uppercase tracking-widest text-[#94A3B8]">
                Tools &amp; Technologies Used
              </div>
              <div className="flex flex-wrap gap-2">
                {project.tools.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1.5 rounded-lg text-xs font-mono border border-[#1C2438] bg-[#070B18] text-white"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="px-6 py-4 border-t border-[#1C2438] bg-[#070B18] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#94A3B8]">
            <span className="hidden sm:inline font-mono text-[11px]">
              Saimon Rana Magar • Digital Creator &amp; Dev
            </span>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-[#2563EB] text-white font-semibold hover:bg-[#1D4ED8] transition-all shadow-md text-xs font-heading"
                >
                  <Globe size={13} />
                  <span>Visit Live Website</span>
                  <ExternalLink size={12} />
                </a>
              )}

              <a
                href="#contact"
                onClick={handleClose}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full border border-[#1C2438] bg-[#0D1224] text-[#CBD5E1] hover:text-white hover:border-[#2563EB] transition-colors text-xs"
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
