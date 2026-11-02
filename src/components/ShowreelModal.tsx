"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, Play, Pause, Volume2, VolumeX, Maximize, Minimize, 
  Sparkles, Film, RotateCcw, ChevronLeft
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
    title: "Cinematic Identity",
    category: "AI Filmmaking",
    src: "/videos/intro.mp4",
    description: "A cinematic piece exploring character presence, natural key-to-fill lighting, and atmospheric depth in 2.39:1 widescreen, created using prompt-directed generation.",
    durationLabel: "00:10",
    tagline: "Anamorphic Generative Introduction",
    pipeline: ["Google Flow", "Adobe Premiere Pro"],
  },
  {
    id: "work",
    title: "Creative Visual Reel",
    category: "Visual Synthesis",
    src: "/videos/work.mp4",
    description: "A showcase of visual experiments testing scene transitions, camera moves, and lighting mood across speculative narrative environments.",
    durationLabel: "00:10",
    tagline: "Scene Continuity & Motion Experiments",
    pipeline: ["Google Flow", "Generative Cinema"],
  },
  {
    id: "overview",
    title: "Rhythm & Narrative Flow",
    category: "Video Editing",
    src: "/videos/vid 3.mp4",
    description: "A structured montage focusing on rhythmic audio-visual synchronization, transient-aligned cuts, and cohesive post-production color timing.",
    durationLabel: "00:10",
    tagline: "Timeline Pacing & Audio Design",
    pipeline: ["Adobe Premiere Pro", "CapCut Pro"],
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
  // Save scroll position when modal opens so we can restore it on close
  const savedScrollY = useRef(0);
  // Track whether history entry was pushed so we pop it exactly once
  const historyPushed = useRef(false);

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

  // ── Browser history integration ────────────────────────────────────────────
  // Push a history state when the modal opens so that pressing Back closes
  // the modal instead of navigating away from the page.
  useEffect(() => {
    if (isOpen) {
      savedScrollY.current = window.scrollY;
      // Only push if we don't already have an entry (prevents duplicates)
      if (!historyPushed.current) {
        window.history.pushState({ showreelOpen: true }, "");
        historyPushed.current = true;
      }
    }
  }, [isOpen]);

  // Listen for the browser Back button while the modal is open
  useEffect(() => {
    if (!isOpen) return;

    const handlePopState = (e: PopStateEvent) => {
      // The user pressed Back — close the modal without pushing another entry
      historyPushed.current = false;
      onClose();
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [isOpen, onClose]);

  // ── Fullscreen state sync ──────────────────────────────────────────────────
  // Keep isFullscreen in sync with the actual browser fullscreen state so that
  // the button icon is always correct, even when the user presses ESC natively.
  useEffect(() => {
    const onFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  // ── ESC key & body scroll lock ─────────────────────────────────────────────
  // ESC behaviour: if the browser is in native fullscreen, let the browser
  // exit fullscreen first (it does so automatically). The fullscreenchange
  // listener above updates the icon. A *second* ESC (or ESC when not
  // fullscreen) closes the modal.
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (document.fullscreenElement) {
          // Let the browser handle exiting fullscreen; don't close the modal yet
          return;
        }
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // Exit native fullscreen if active before closing the modal
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    restoreBackgroundAudio();

    // If we pushed a history state, pop it so the URL stays clean.
    // Calling history.back() would fire popstate which calls onClose again,
    // so we use replaceState to just clean up without another navigation.
    if (historyPushed.current) {
      historyPushed.current = false;
      // Use go(-1) to properly pop the state we pushed; guard against the
      // popstate handler calling onClose a second time by unsetting the flag
      // first (already done above).
      window.history.go(-1);
    }

    // Restore scroll position
    window.scrollTo({ top: savedScrollY.current, behavior: "instant" });
    onClose();
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      modalContainerRef.current?.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
    // isFullscreen is kept in sync by the fullscreenchange event listener above
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
      <React.Fragment key="showreel-modal">
      {/* ── Backdrop: clicking outside the inner panel closes the modal ── */}
      <div
        className="fixed inset-0 z-[120] bg-[#02040a]/98 backdrop-blur-2xl"
        onClick={handleClose}
        aria-hidden="true"
      />

      <div
        ref={modalContainerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Full-screen cinematic AI showreel"
        className="fixed inset-0 z-[121] flex flex-col justify-between p-3 sm:p-6 md:p-8 select-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between text-xs font-mono text-[#94A3B8] z-20 pb-4 border-b border-[#1C2438]">
          <div className="flex items-center gap-3">
            {/* Prominent Back / Close button — always visible */}
            <button
              onClick={handleClose}
              type="button"
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0D1224] border border-[#2563EB] text-white hover:bg-[#2563EB] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] font-semibold text-[11px]"
              aria-label="Go back and close showreel"
            >
              <ChevronLeft size={14} />
              <span className="hidden xs:inline">Back</span>
            </button>

            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0D1224] border border-[#1C2438] text-[#2563EB] font-bold">
              <Film size={13} />
              <span>CINEMATIC SHOWREEL</span>
            </span>
            <span className="hidden sm:inline text-[#94A3B8]">
              SAIMON RANA MAGAR • AI FILMMAKER &amp; DEVELOPER
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Aspect Ratio Switcher */}
            <div className="hidden sm:flex items-center gap-1 p-1 rounded-xl bg-[#0D1224] border border-[#1C2438]">
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

            {/* Secondary X close button (top-right corner) */}
            <button
              onClick={handleClose}
              type="button"
              className="w-9 h-9 rounded-full bg-[#0D1224] border border-[#1C2438] text-white hover:border-[#2563EB] hover:bg-[#131930] flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
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
            className={`relative rounded-2xl overflow-hidden border border-[#1C2438] shadow-[0_25px_90px_rgba(5,8,23,0.98)] transition-all duration-500 w-full bg-black ${
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
                <div className="my-auto text-center pointer-events-auto px-4">
                  <button
                    onClick={togglePlay}
                    type="button"
                    className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#2563EB]/90 hover:bg-[#1D4ED8] text-white backdrop-blur-xl border border-[#2563EB] shadow-[0_0_40px_rgba(37,99,235,0.6)] transition-all duration-300 hover:scale-110"
                    aria-label="Play video"
                  >
                    <Play size={28} className="translate-x-1" />
                  </button>
                  <div className="text-base sm:text-xl font-bold text-white tracking-wide font-heading mt-3">
                    {activeVideo.title}
                  </div>
                  <div className="text-xs sm:text-sm font-medium text-[#93C5FD] mt-0.5">
                    {activeVideo.tagline}
                  </div>
                  <p className="text-xs text-[#CBD5E1]/90 max-w-lg mx-auto mt-2 leading-relaxed drop-shadow">
                    {activeVideo.description}
                  </p>
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
        <div className="w-full max-w-5xl mx-auto space-y-4 z-20 pt-2 border-t border-[#1C2438]">
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
                      ? "border-[#2563EB] bg-[#0D1224] shadow-[0_0_20px_rgba(37,99,235,0.25)]"
                      : "border-[#1C2438] bg-[#070B18] hover:border-[#2563EB]/60 hover:bg-[#0D1224]"
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
                  <div className="shrink-0 flex items-center gap-1.5 text-[10px] font-mono text-[#94A3B8]">
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
            className="w-full h-1.5 bg-[#0D1224] rounded-full overflow-hidden cursor-pointer relative border border-[#1C2438] group"
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
      </React.Fragment>
    </AnimatePresence>
  );
};
