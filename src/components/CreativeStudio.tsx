"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Film, Play, Pause, Sparkles, Sliders, Maximize2, 
  Volume2, VolumeX, RotateCcw, Scissors 
} from "lucide-react";
import { ShowreelModal } from "./ShowreelModal";
import { duckBackgroundAudio, restoreBackgroundAudio } from "./MusicPlayer";

interface CreativePiece {
  id: string;
  title: string;
  tagline: string;
  category: "AI Cinema" | "Video Editing" | "Commercial" | "Visual Lab";
  videoSrc: string;
  aspectRatio: "2.39:1" | "16:9" | "9:16";
  tools: string[];
  themeColor: string;
  gradient: string;
  description: string;
  duration: string;
  highlightTag: string;
}

export const CreativeStudio: React.FC = () => {
  const pieces: CreativePiece[] = [
    {
      id: "echoes",
      title: "Echoes of Tomorrow",
      tagline: "Generative Speculative Cinema & Monologue",
      category: "AI Cinema",
      videoSrc: "/videos/intro.mp4",
      aspectRatio: "2.39:1",
      tools: ["Google Flow", "Adobe Premiere Pro", "Anamorphic Pipeline"],
      themeColor: "#38bdf8",
      gradient: "radial-gradient(ellipse at center, rgba(56, 189, 248, 0.28), rgba(6, 10, 18, 0.98))",
      description: "Generative AI filmmaking exploring synthetic human narrative in a dark atmospheric studio. Features prompt-architected shot continuity, cinematic key-to-fill ratios, and emotional vocal pacing.",
      duration: "00:10",
      highlightTag: "FEATURED AI CINEMA",
    },
    {
      id: "kinetic",
      title: "Kinetic Velocity Reel",
      tagline: "High-Retention Timeline & Multi-Track Editing",
      category: "Video Editing",
      videoSrc: "/videos/work.mp4",
      aspectRatio: "16:9",
      tools: ["Adobe Premiere Pro", "CapCut", "Audio Mastering"],
      themeColor: "#c084fc",
      gradient: "radial-gradient(ellipse at center, rgba(192, 132, 252, 0.28), rgba(16, 7, 24, 0.98))",
      description: "Hands-on video editing workflow displaying multi-track timeline trimming, color grading, speed ramps, and frame-accurate audio waveform synchronization.",
      duration: "00:10",
      highlightTag: "FEATURED VIDEO EDIT",
    },
    {
      id: "aura",
      title: "Digital Studio Workflow",
      tagline: "Creative Architecture & Visual Production",
      category: "Commercial",
      videoSrc: "/videos/vid 3.mp4",
      aspectRatio: "16:9",
      tools: ["Google Flow", "Adobe Premiere Pro", "Creative Direction"],
      themeColor: "#fb7185",
      gradient: "radial-gradient(ellipse at center, rgba(251, 113, 133, 0.25), rgba(20, 8, 12, 0.98))",
      description: "Professional digital studio execution: generative prompt structuring, model inference, and real-time visual curation for commercial media campaigns.",
      duration: "00:10",
      highlightTag: "STUDIO WORKFLOW",
    },
  ];

  const [activePiece, setActivePiece] = useState<CreativePiece>(pieces[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(10);
  const [isShowreelModalOpen, setIsShowreelModalOpen] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);

  // Switch video source when activePiece changes
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.src = activePiece.videoSrc;
    video.load();
    setIsPlaying(false);
    setCurrentTime(0);
    restoreBackgroundAudio();
  }, [activePiece]);

  // Video event listeners and audio ducking
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onLoadedMetadata = () => {
      setDuration(video.duration || 10);
    };

    const onTimeUpdate = () => {
      setCurrentTime(video.currentTime);
    };

    const onEnded = () => {
      setIsPlaying(false);
      restoreBackgroundAudio();
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
  }, []);

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

  const toggleMute = () => {
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

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `0${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <section id="creative-studio" className="py-24 sm:py-28 px-4 sm:px-8 border-t border-[#202A40] relative bg-[#050817]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 sm:mb-16 pb-8 border-b border-[#202A40]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#101525] border border-[#202A40] text-xs font-medium text-[#2563EB] mb-3">
              <Film size={12} />
              <span>02 / CREATIVE STUDIO</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tightest text-white leading-tight font-heading">
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
            <div className="relative rounded-2xl border border-[#202A40] bg-[#101525] p-3 sm:p-5 shadow-2xl overflow-hidden group">
              {/* Aspect Ratio Framing */}
              <div
                className={`relative w-full rounded-xl overflow-hidden flex flex-col justify-between bg-black transition-all duration-500 ${
                  activePiece.aspectRatio === "2.39:1"
                    ? "aspect-[21/9] sm:aspect-[2.39/1]"
                    : "aspect-video"
                }`}
              >
                {/* HTML5 Video Element */}
                <video
                  ref={videoRef}
                  playsInline
                  muted={isMuted}
                  className="absolute inset-0 w-full h-full object-cover cursor-pointer"
                  onClick={togglePlay}
                />

                {/* Simulated Film Letterbox bars for 2.39:1 cinema */}
                {activePiece.aspectRatio === "2.39:1" && (
                  <>
                    <div className="absolute top-0 inset-x-0 h-4 bg-black/90 pointer-events-none z-10" />
                    <div className="absolute bottom-0 inset-x-0 h-4 bg-black/90 pointer-events-none z-10" />
                  </>
                )}

                {/* Video Overlay Top Meta */}
                <div className="relative z-20 flex items-center justify-between p-4 text-[11px] font-mono text-white/90 bg-gradient-to-b from-black/80 via-black/20 to-transparent pointer-events-none">
                  <span className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 pointer-events-auto">
                    <Sparkles size={11} className="text-[#38BDF8]" />
                    <span className="font-bold">{activePiece.highlightTag}</span>
                  </span>
                  <div className="flex items-center gap-2 pointer-events-auto">
                    <span className="px-2 py-0.5 rounded bg-black/60 text-[10px] text-[#CBD5E1] border border-white/10 hidden sm:inline font-mono">
                      {activePiece.aspectRatio} CINEMA
                    </span>
                    <button
                      onClick={() => setIsShowreelModalOpen(true)}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#2563EB] text-white text-[10px] font-mono hover:bg-[#1D4ED8] transition-all hover:scale-105 shadow-md"
                      title="Launch Fullscreen Cinematic Showreel"
                    >
                      <Maximize2 size={10} />
                      <span>FULLSCREEN</span>
                    </button>
                  </div>
                </div>

                {/* Play / Pause Interactive Center Overlay (Visible when paused) */}
                {!isPlaying && (
                  <div className="relative z-20 my-auto text-center py-6 pointer-events-auto">
                    <button
                      onClick={togglePlay}
                      type="button"
                      className="inline-flex items-center justify-center h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-[#2563EB]/90 backdrop-blur-xl border border-[#2563EB] text-white hover:bg-[#1D4ED8] hover:scale-110 transition-all duration-300 shadow-[0_0_35px_rgba(37,99,235,0.6)] mx-auto"
                      aria-label="Play video"
                    >
                      <Play size={26} className="translate-x-0.5" />
                    </button>
                    <h3 className="text-lg sm:text-2xl font-bold text-white mt-3 tracking-tight font-heading drop-shadow-md">
                      {activePiece.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-white/80 max-w-md mx-auto mt-1 px-4 drop-shadow">
                      {activePiece.tagline}
                    </p>
                  </div>
                )}

                {/* Video Overlay Bottom Controls */}
                <div className="relative z-20 p-4 space-y-2 bg-gradient-to-t from-black/85 via-black/40 to-transparent">
                  {/* Timeline Scrub Bar */}
                  <div
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const clickX = e.clientX - rect.left;
                      const percent = clickX / rect.width;
                      if (videoRef.current) {
                        videoRef.current.currentTime = percent * duration;
                      }
                    }}
                    className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden cursor-pointer"
                  >
                    <div
                      className="bg-[#2563EB] h-full rounded-full transition-all"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[10px] font-mono text-[#CBD5E1]">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={togglePlay}
                        type="button"
                        className="text-white hover:text-[#38BDF8] transition-colors"
                        aria-label={isPlaying ? "Pause video" : "Play video"}
                      >
                        {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                      </button>

                      <button
                        onClick={toggleMute}
                        type="button"
                        className="text-white hover:text-[#38BDF8] transition-colors flex items-center gap-1"
                        aria-label={isMuted ? "Unmute video" : "Mute video"}
                      >
                        {isMuted ? <VolumeX size={14} className="text-red-400" /> : <Volume2 size={14} />}
                        <span className="hidden xs:inline text-[9px]">{isMuted ? "MUTED" : "SOUND ON"}</span>
                      </button>

                      <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="text-[#38BDF8] hidden sm:inline">PIPELINE:</span>
                      <span className="truncate max-w-[200px]">{activePiece.tools.join(" • ")}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description & Tools */}
              <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-[#202A40]">
                <p className="text-xs sm:text-sm text-[#94A3B8] max-w-xl leading-relaxed">
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
              <span>{pieces.length} Production Pieces</span>
            </div>

            {pieces.map((piece) => {
              const isSelected = activePiece.id === piece.id;
              const isVideoEditing = piece.category === "Video Editing";
              return (
                <button
                  key={piece.id}
                  onClick={() => {
                    setActivePiece(piece);
                  }}
                  type="button"
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex flex-col gap-2 ${
                    isSelected
                      ? "border-[#2563EB] bg-[#161D33] shadow-lg shadow-[rgba(37,99,235,0.2)]"
                      : "border-[#202A40] bg-[#101525] hover:border-[#2563EB]/60 hover:bg-[#161D33]/60"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded font-bold flex items-center gap-1 ${
                        isSelected
                          ? "bg-[#2563EB]/25 text-[#93C5FD]"
                          : isVideoEditing
                          ? "bg-[#c084fc]/15 text-[#c084fc]"
                          : "bg-[#080C1E] text-[#94A3B8]"
                      }`}
                    >
                      {isVideoEditing && <Scissors size={10} />}
                      <span>{piece.category}</span>
                    </span>
                    <span className="text-[11px] font-mono text-[#64748B] flex items-center gap-1">
                      <Play size={10} />
                      <span>{piece.duration}</span>
                    </span>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white font-heading">{piece.title}</h4>
                    <p className="text-xs text-[#94A3B8] line-clamp-1 mt-0.5">{piece.tagline}</p>
                  </div>
                </button>
              );
            })}

            {/* Creative Process Box */}
            <div className="p-5 rounded-xl border border-[#202A40] bg-[#101525] space-y-3 mt-4">
              <div className="text-xs font-mono uppercase tracking-wider text-[#2563EB] flex items-center gap-1.5 font-bold">
                <Sliders size={12} />
                <span>Production Pipeline</span>
              </div>
              <ul className="text-xs text-[#94A3B8] space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-white font-mono font-bold">01.</span>
                  <span>Concept &amp; Prompt Architecture in Google Flow</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white font-mono font-bold">02.</span>
                  <span>Timeline Editing &amp; Rhythm Sync in Premiere Pro</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white font-mono font-bold">03.</span>
                  <span>Short-form kinetic refinement &amp; captions in CapCut</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Full-Screen Cinematic AI Showreel Modal */}
      <ShowreelModal
        isOpen={isShowreelModalOpen}
        onClose={() => setIsShowreelModalOpen(false)}
        initialVideoId={activePiece.id === "kinetic" ? "video-editing" : activePiece.id === "echoes" ? "ai-cinema" : "creative-workflow"}
      />
    </section>
  );
};
