"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, Play, Pause, Volume2, VolumeX, Maximize, Minimize, 
  Sparkles, Sliders, Film, RotateCcw 
} from "lucide-react";

interface ShowreelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShowreelModal: React.FC<ShowreelModalProps> = ({ isOpen, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(18);
  const [aspectRatio, setAspectRatio] = useState<"2.39:1" | "16:9" | "9:16">("2.39:1");
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Esc key listener & body scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.code === "Space") {
        e.preventDefault();
        setIsPlaying((prev) => !prev);
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Simulated progress timer when playing
  useEffect(() => {
    if (!isOpen || !isPlaying) return;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0;
        return prev + 0.5;
      });
    }, 250);
    return () => clearInterval(interval);
  }, [isOpen, isPlaying]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
      setIsFullscreen(false);
    }
  };

  const calculateTime = (percent: number) => {
    const totalSeconds = 134; // 02:14
    const currentSeconds = Math.floor((percent / 100) * totalSeconds);
    const mins = Math.floor(currentSeconds / 60);
    const secs = currentSeconds % 60;
    return `0${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Full-screen cinematic AI showreel"
        className="fixed inset-0 z-[120] bg-[#02040a]/98 backdrop-blur-2xl flex flex-col justify-between p-4 sm:p-8 select-none"
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between text-xs font-mono text-[#94A3B8] z-20 pb-4 border-b border-[#202A40]/80">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#101525] border border-[#202A40] text-[#2563EB] font-bold">
              <Film size={13} />
              <span>CINEMATIC SHOWREEL 2025</span>
            </span>
            <span className="hidden sm:inline text-[#64748B]">
              SAIMON RANA MAGAR • AI FILMMAKER &amp; DEVELOPER
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Aspect Ratio Switcher */}
            <div className="hidden sm:flex items-center gap-1 p-1 rounded-xl bg-[#101525] border border-[#202A40]">
              {(["2.39:1", "16:9", "9:16"] as const).map((ratio) => (
                <button
                  key={ratio}
                  onClick={() => setAspectRatio(ratio)}
                  type="button"
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-mono transition-all ${
                    aspectRatio === ratio
                      ? "bg-[#2563EB] text-white font-bold"
                      : "text-[#94A3B8] hover:text-white"
                  }`}
                >
                  {ratio}
                </button>
              ))}
            </div>

            <button
              onClick={onClose}
              type="button"
              className="w-9 h-9 rounded-full bg-[#101525] border border-[#202A40] text-white hover:border-[#2563EB] hover:bg-[#161D33] flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
              aria-label="Close showreel"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Central Cinematic Projection Canvas */}
        <div className="my-auto relative w-full max-w-6xl mx-auto flex items-center justify-center">
          <motion.div
            layout
            className={`relative rounded-2xl overflow-hidden border border-[#202A40] shadow-[0_25px_90px_rgba(5,8,23,0.98)] transition-all duration-500 w-full ${
              aspectRatio === "2.39:1"
                ? "aspect-[21/9] max-h-[70vh]"
                : aspectRatio === "16:9"
                ? "aspect-video max-h-[70vh]"
                : "aspect-[9/16] max-h-[75vh] max-w-sm"
            }`}
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(37,99,235,0.28) 0%, rgba(8,12,30,0.95) 75%, #050817 100%)",
            }}
          >
            {/* Anamorphic Letterbox Bars (Cinema 2.39:1 simulation) */}
            <div className="absolute top-0 inset-x-0 h-4 bg-black/95 z-10 pointer-events-none" />
            <div className="absolute bottom-0 inset-x-0 h-4 bg-black/95 z-10 pointer-events-none" />

            {/* Simulated Generative Visual Layer */}
            <div className="absolute inset-0 flex flex-col justify-between p-6">
              <div className="flex items-center justify-between text-[11px] font-mono text-[#93C5FD]">
                <span className="flex items-center gap-1.5">
                  <Sparkles size={12} className="text-[#2563EB]" />
                  <span>SYNTHETIC MEDIA ARCHIVE // MASTER</span>
                </span>
                <span className="text-white/60">4K • 24 FPS • ANAMORPHIC FLARE</span>
              </div>

              {/* Big Center Action Toggle */}
              <div className="my-auto text-center space-y-3">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  type="button"
                  className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#2563EB]/85 hover:bg-[#1D4ED8] text-white backdrop-blur-xl border border-[#2563EB] shadow-[0_0_40px_rgba(37,99,235,0.6)] transition-all duration-300 hover:scale-110"
                >
                  {isPlaying ? (
                    <Pause size={32} />
                  ) : (
                    <Play size={32} className="translate-x-1" />
                  )}
                </button>
                <div className="text-sm sm:text-base font-bold text-white tracking-wide font-heading">
                  {isPlaying ? "Playing Cinematic Speculative Montage" : "Showreel Paused"}
                </div>
                <div className="text-xs font-mono text-[#94A3B8]">
                  Created using Google Flow &amp; Premiere Pro • Directed by Saimon Rana Magar
                </div>
              </div>

              <div className="flex items-center justify-between text-[10px] font-mono text-[#64748B]">
                <span>TIMECODE // {calculateTime(progress)}:18</span>
                <span>NEPAL • GLOBAL PRODUCTION</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Playback Transport Control Strip */}
        <div className="w-full max-w-4xl mx-auto space-y-3 z-20 pt-4 border-t border-[#202A40]/80">
          {/* Timeline Scrub Bar */}
          <div
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickX = e.clientX - rect.left;
              const newPercent = (clickX / rect.width) * 100;
              setProgress(Math.max(0, Math.min(100, newPercent)));
            }}
            className="w-full h-2 bg-[#101525] rounded-full overflow-hidden cursor-pointer relative border border-[#202A40] group"
          >
            <motion.div
              className="h-full bg-gradient-to-r from-[#2563EB] to-[#38BDF8] relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-[0_0_10px_#2563EB] opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          </div>

          {/* Transport Controls Row */}
          <div className="flex items-center justify-between text-xs font-mono text-[#94A3B8]">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                type="button"
                className="text-white hover:text-[#2563EB] transition-colors"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <Pause size={16} /> : <Play size={16} />}
              </button>

              <button
                onClick={() => setProgress(0)}
                type="button"
                className="hover:text-white transition-colors"
                title="Restart"
              >
                <RotateCcw size={14} />
              </button>

              <div className="text-white font-medium">
                <span>{calculateTime(progress)}</span>
                <span className="text-[#64748B]"> / 02:14</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Sound Toggle */}
              <button
                onClick={() => setIsMuted(!isMuted)}
                type="button"
                className="hover:text-white transition-colors"
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <VolumeX size={16} className="text-red-400" /> : <Volume2 size={16} />}
              </button>

              {/* Fullscreen Toggle */}
              <button
                onClick={toggleFullscreen}
                type="button"
                className="hover:text-white transition-colors"
                aria-label="Toggle Fullscreen"
              >
                {isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </AnimatePresence>
  );
};
