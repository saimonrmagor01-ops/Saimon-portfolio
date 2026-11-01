"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, ExternalLink, Sparkles, CheckCircle2, Layers, Calendar, 
  Terminal, Play, Pause, Volume2, VolumeX 
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
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
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
              <span className="text-[11px] font-mono text-[#93C5FD] uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#2563EB]/15 border border-[#2563EB]/30">
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
          <div className="p-6 sm:p-8 overflow-y-auto space-y-8">
            {/* Project Hero Visual Frame (Video or Graphic) */}
            {project.videoSrc ? (
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
                <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4 bg-gradient-to-t from-black/80 via-transparent to-black/40">
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
                        Click to Watch Project Reel
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-[10px] font-mono text-white/60">
                    <span>FORMAT: {project.aspectRatio}</span>
                    <span>HD 720P • SOUNDTRACK ACTIVE</span>
                  </div>
                </div>
              </div>
            ) : (
              <div
                className="relative w-full aspect-video rounded-2xl overflow-hidden border border-[#202A40] p-6 flex flex-col justify-between shadow-inner"
                style={{ background: project.visualPreview.themeGradient }}
              >
                <div className="flex items-center justify-between text-[11px] font-mono text-white/70">
                  <span className="flex items-center gap-1.5">
                    <Sparkles size={12} className="text-[#2563EB]" />
                    <span>PROJECT SPECIFICATION</span>
                  </span>
                  <span>{project.id.toUpperCase()}</span>
                </div>

                <div className="my-auto text-center space-y-2">
                  <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-heading">
                    {project.visualPreview.headline}
                  </div>
                  <div className="text-xs sm:text-sm font-mono text-white/80">
                    {project.visualPreview.subline}
                  </div>
                </div>

                <div className="flex items-center justify-between text-[10px] font-mono text-white/60">
                  <span>FORMAT: {project.aspectRatio}</span>
                  <span>ACTIVE MEDIA ARCHIVE</span>
                </div>
              </div>
            )}

            {/* Title & Summary */}
            <div className="space-y-3">
              <h3 className="text-3xl font-extrabold text-white tracking-tight font-heading">
                {project.title}
              </h3>
              <p className="text-base text-[#94A3B8] leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Objective */}
            <div className="p-5 rounded-2xl border border-[#202A40] bg-[#080C1E] space-y-2">
              <div className="text-[11px] font-mono text-[#2563EB] uppercase tracking-wider flex items-center gap-1.5 font-bold">
                <Terminal size={12} />
                <span>Project Objective</span>
              </div>
              <p className="text-sm text-[#CBD5E1] leading-relaxed">
                {project.objective}
              </p>
            </div>

            {/* Key Features */}
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
                Tools &amp; Technologies
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
          <div className="px-6 py-4 border-t border-[#202A40] bg-[#080C1E] flex items-center justify-between text-xs text-[#94A3B8]">
            <span>Saimon Rana Magar Portfolio</span>
            <a
              href="#contact"
              onClick={handleClose}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#2563EB] text-white font-semibold hover:bg-[#1D4ED8] transition-colors shadow-[0_0_15px_rgba(37,99,235,0.4)]"
            >
              <span>Inquire About Similar Project</span>
              <ExternalLink size={12} />
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
