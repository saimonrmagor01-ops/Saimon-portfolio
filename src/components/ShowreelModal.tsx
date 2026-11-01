"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, Play, Pause, Volume2, VolumeX, Maximize, Minimize, 
  Sparkles, Film, RotateCcw, MonitorPlay, CheckCircle2 
} from "lucide-react";
import { duckBackgroundAudio, restoreBackgroundAudio } from "./MusicPlayer";

export interface ShowreelVideo {
  id: string;
  title: string;
  category: string;
  src: string;
  description: string;
  durationLabel: string;
  tagline: string;
  pipeline: string[];
}

export const SHOWREEL_PLAYLIST: ShowreelVideo[] = [
  {
    id: "intro",
    title: "01 — INTRODUCTION",
    category: "Introduction",
    src: "/videos/intro.mp4",
    description: "Introduces Saimon Rana Magar, creative direction, and digital artistry.",
    durationLabel: "00:10",
    tagline: "Saimon Rana Magar — Introduction",
    pipeline: ["AI Persona", "Creative Direction", "Visual Storytelling"],
  },
  {
    id: "work",
    title: "02 — SELECTED WORK",
    category: "Selected Work",
    src: "/videos/work.mp4",
    description: "Curated showcase of creative work, video editing, and dynamic pacing.",
    durationLabel: "00:10",
    tagline: "Creative Work & Project Showcase",
    pipeline: ["Video Editing", "Cinematography", "Motion Design"],
  },
  {
    id: "overview",
    title: "03 — WHAT I DO",
    category: "Capabilities & Skills",
    src: "/videos/vid 3.mp4",
    description: "Complete overview of skills, services, workflow, and capabilities.",
    durationLabel: "00:10",
    tagline: "Skills, Services & Capabilities",
    pipeline: ["AI Filmmaking", "Full-Stack Dev", "Production Pipeline"],
  },
];

interface ShowreelModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialVideoId?: string;
}

export const ShowreelModal: React.FC<ShowreelModalProps> = ({
  isOpen,
  onClose,
  initialVideoId,
}) => {
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(10);
  const [aspectRatio, setAspectRatio] = useState<"2.39:1" | "16:9" | "9:16">("2.39:1");
  const [isFullscreen, setIsFullscreen] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const modalContainerRef = useRef<HTMLDivElement>(null);

  // Set initial video if specified
  useEffect(() => {
    if (initialVideoId) {
      const idx = SHOWREEL_PLAYLIST.findIndex((v) => v.id === initialVideoId);
      if (idx !== -1) {
        setActiveVideoIndex(idx);
      }
    }
  }, [initialVideoId, isOpen]);

  const activeVideo = SHOWREEL_PLAYLIST[activeVideoIndex];

  // Esc key listener & body scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
      if (e.code === "Space") {
        e.preventDefault();
        togglePlay();
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
  }, [isOpen]);

  // Video element event synchronization & background audio ducking
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isOpen) return;

    video.src = activeVideo.src;
    video.load();

    const onLoadedMetadata = () => {
      setDuration(video.duration || 10);
      if (isPlaying) {
        video.play().catch(() => setIsPlaying(false));
      }
    };

    const onTimeUpdate = () => {
      setCurrentTime(video.currentTime);
    };

    const onEnded = () => {
      // Auto-advance to next video in showreel playlist
      setActiveVideoIndex((prev) => (prev + 1) % SHOWREEL_PLAYLIST.length);
    };

    const onPlay = () => {
      setIsPlaying(true);
      if (!video.muted) {
        duckBackgroundAudio(true);
      }
    };

    const onPause = () => {
      setIsPlaying(false);
      restoreBackgroundAudio();
    };

    video.addEventListener("loadedmetadata", onLoadedMetadata);
    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("ended", onEnded);
    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);

    return () => {
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("ended", onEnded);
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
      restoreBackgroundAudio();
    };
  }, [activeVideoIndex, isOpen]);

  // Handle Mute & Audio Ducking Sync
  const toggleMute = () => {
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    videoRef.current.muted = nextMuted;

    if (isPlaying) {
      if (nextMuted) {
        restoreBackgroundAudio();
      } else {
        duckBackgroundAudio(true);
      }
    }
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

  const handleClose = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    restoreBackgroundAudio();
    onClose();
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      modalContainerRef.current?.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
      setIsFullscreen(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `0${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        ref={modalContainerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Full-screen cinematic AI showreel"
        className="fixed inset-0 z-[120] bg-[#02040a]/98 backdrop-blur-2xl flex flex-col justify-between p-3 sm:p-6 md:p-8 select-none"
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between text-xs font-mono text-[#94A3B8] z-20 pb-4 border-b border-[#202A40]/80">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#101525] border border-[#202A40] text-[#2563EB] font-bold">
              <Film size={13} />
              <span>CINEMATIC SHOWREEL</span>
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
              onClick={handleClose}
              type="button"
              className="w-9 h-9 rounded-full bg-[#101525] border border-[#202A40] text-white hover:border-[#2563EB] hover:bg-[#161D33] flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
              aria-label="Close showreel"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Central Cinematic Projection Canvas */}
        <div className="my-auto relative w-full max-w-5xl mx-auto flex items-center justify-center py-4">
          <motion.div
            layout
            className={`relative rounded-2xl overflow-hidden border border-[#202A40] shadow-[0_25px_90px_rgba(5,8,23,0.98)] transition-all duration-500 w-full bg-black ${
              aspectRatio === "2.39:1"
                ? "aspect-[21/9] max-h-[62vh]"
                : aspectRatio === "16:9"
                ? "aspect-video max-h-[62vh]"
                : "aspect-[9/16] max-h-[70vh] max-w-sm"
            }`}
          >
            {/* HTML5 Video Element */}
            <video
              ref={videoRef}
              playsInline
              muted={isMuted}
              className="w-full h-full object-cover"
              onClick={togglePlay}
            />

            {/* Anamorphic Letterbox Bars for 2.39:1 cinema */}
            {aspectRatio === "2.39:1" && (
              <>
                <div className="absolute top-0 inset-x-0 h-4 bg-black/95 z-10 pointer-events-none" />
                <div className="absolute bottom-0 inset-x-0 h-4 bg-black/95 z-10 pointer-events-none" />
              </>
            )}

            {/* Video Overlay Details */}
            <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4 sm:p-6 bg-gradient-to-t from-black/80 via-transparent to-black/40">
              <div className="flex items-center justify-between text-[11px] font-mono text-[#93C5FD]">
                <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
                  <Sparkles size={11} className="text-[#38BDF8]" />
                  <span>{activeVideo.category.toUpperCase()}</span>
                </span>
                <span className="text-white/70 font-mono text-[10px]">
                  REEL 0{activeVideoIndex + 1} OF 0{SHOWREEL_PLAYLIST.length}
                </span>
              </div>

              {/* Big Center Play Trigger (Visible when paused) */}
              {!isPlaying && (
                <div className="my-auto text-center pointer-events-auto">
                  <button
                    onClick={togglePlay}
                    type="button"
                    className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#2563EB]/90 hover:bg-[#1D4ED8] text-white backdrop-blur-xl border border-[#2563EB] shadow-[0_0_40px_rgba(37,99,235,0.6)] transition-all duration-300 hover:scale-110"
                    aria-label="Play video"
                  >
                    <Play size={28} className="translate-x-1" />
                  </button>
                  <div className="text-sm sm:text-base font-bold text-white tracking-wide font-heading mt-3">
                    {activeVideo.title}
                  </div>
                  <div className="text-xs font-mono text-[#94A3B8] mt-1">
                    {activeVideo.tagline}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between text-[10px] font-mono text-[#CBD5E1]">
                <span>TIMECODE // {formatTime(currentTime)} / {formatTime(duration)}</span>
                <span>NEPAL • GLOBAL PRODUCTION</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Playlist Strip & Bottom Transport Controls */}
        <div className="w-full max-w-5xl mx-auto space-y-4 z-20 pt-2 border-t border-[#202A40]/80">
          {/* Playlist Thumbnail Selector */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {SHOWREEL_PLAYLIST.map((video, idx) => {
              const isCurrent = activeVideoIndex === idx;
              return (
                <button
                  key={video.id}
                  onClick={() => {
                    setActiveVideoIndex(idx);
                    setIsPlaying(true);
                  }}
                  type="button"
                  className={`p-2.5 sm:p-3 rounded-xl border text-left transition-all flex items-center justify-between gap-3 ${
                    isCurrent
                      ? "border-[#2563EB] bg-[#101525] shadow-[0_0_20px_rgba(37,99,235,0.25)]"
                      : "border-[#202A40] bg-[#080C1E] hover:border-[#2563EB]/60 hover:bg-[#101525]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <span className="text-[9px] font-mono uppercase text-[#2563EB] font-bold block">
                      0{idx + 1} • {video.category}
                    </span>
                    <div className="text-xs font-semibold text-white truncate font-heading mt-0.5">
                      {video.title}
                    </div>
                  </div>
                  <div className="shrink-0 flex items-center gap-1.5 text-[10px] font-mono text-[#64748B]">
                    {isCurrent && isPlaying ? (
                      <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    ) : (
                      <Play size={11} className="text-[#94A3B8]" />
                    )}
                    <span>{video.durationLabel}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Timeline Scrub Bar */}
          <div
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickX = e.clientX - rect.left;
              const newPercent = clickX / rect.width;
              if (videoRef.current) {
                videoRef.current.currentTime = newPercent * duration;
              }
            }}
            className="w-full h-1.5 bg-[#101525] rounded-full overflow-hidden cursor-pointer relative border border-[#202A40] group"
          >
            <motion.div
              className="h-full bg-gradient-to-r from-[#2563EB] to-[#38BDF8] relative"
              style={{ width: `${progressPercent}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-[0_0_10px_#2563EB] opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          </div>

          {/* Transport Controls Row */}
          <div className="flex items-center justify-between text-xs font-mono text-[#94A3B8]">
            <div className="flex items-center gap-4">
              <button
                onClick={togglePlay}
                type="button"
                className="text-white hover:text-[#2563EB] transition-colors"
                aria-label={isPlaying ? "Pause video" : "Play video"}
              >
                {isPlaying ? <Pause size={16} /> : <Play size={16} />}
              </button>

              <button
                onClick={() => {
                  if (videoRef.current) videoRef.current.currentTime = 0;
                }}
                type="button"
                className="hover:text-white transition-colors"
                title="Restart"
              >
                <RotateCcw size={14} />
              </button>

              <div className="text-white font-medium">
                <span>{formatTime(currentTime)}</span>
                <span className="text-[#64748B]"> / {formatTime(duration)}</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Sound Toggle */}
              <button
                onClick={toggleMute}
                type="button"
                className="hover:text-white transition-colors flex items-center gap-1.5"
                aria-label={isMuted ? "Unmute video" : "Mute video"}
              >
                {isMuted ? <VolumeX size={16} className="text-red-400" /> : <Volume2 size={16} className="text-[#38BDF8]" />}
                <span className="text-[10px] hidden xs:inline">{isMuted ? "MUTED" : "SOUND ON"}</span>
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
