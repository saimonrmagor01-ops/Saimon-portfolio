"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { 
  Film, Play, Pause, Maximize2, 
  Volume2, VolumeX, Sparkles, SlidersHorizontal 
} from "lucide-react";
import { ShowreelModal } from "./ShowreelModal";
import { duckBackgroundAudio, restoreBackgroundAudio } from "./MusicPlayer";

interface CreativePiece {
  id: string;
  title: string;
  category: string;
  tagline: string;
  videoSrc: string;
  aspectRatio: "2.39:1" | "16:9";
  tools: string[];
  description: string;
  duration: string;
  stageNumber: string;
}

export const CreativeStudio: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const pieces: CreativePiece[] = [
    {
      id: "intro",
      title: "Cinematic Identity",
      category: "AI Filmmaking",
      tagline: "Anamorphic Generative Introduction",
      videoSrc: "/videos/intro.mp4",
      aspectRatio: "2.39:1",
      tools: ["Google Flow", "Adobe Premiere Pro"],
      description: "A cinematic piece exploring character presence, natural key-to-fill lighting, and atmospheric depth in 2.39:1 widescreen, created using prompt-directed generation.",
      duration: "00:10",
      stageNumber: "01",
    },
    {
      id: "work",
      title: "Creative Visual Reel",
      category: "Visual Synthesis",
      tagline: "Scene Continuity & Motion Experiments",
      videoSrc: "/videos/work.mp4",
      aspectRatio: "16:9",
      tools: ["Google Gemini AI", "Generative Cinema"],
      description: "A showcase of visual experiments testing scene transitions, camera moves, and lighting mood across speculative narrative environments.",
      duration: "00:10",
      stageNumber: "02",
    },
    {
      id: "overview",
      title: "Rhythm & Narrative Flow",
      category: "Video Editing",
      tagline: "Timeline Pacing & Audio Design",
      videoSrc: "/videos/vid 3.mp4",
      aspectRatio: "16:9",
      tools: ["Adobe Premiere Pro", "CapCut Pro"],
      description: "A structured montage focusing on rhythmic audio-visual synchronization, transient-aligned cuts, and cohesive post-production color timing.",
      duration: "00:10",
      stageNumber: "03",
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

  // Video event listeners and background audio coordination
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
    <section id="creative-studio" className="py-24 sm:py-28 px-4 sm:px-8 border-t border-white/10 relative bg-[#050817]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16 pb-8 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#080C18] border border-white/10 text-xs font-medium text-[#38BDF8] mb-3">
              <Film size={12} />
              <span>02 / CREATIVE STUDIO</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tightest text-white leading-tight font-heading">
              AI Filmmaking &amp; <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-200 via-slate-400 to-sky-300 font-normal font-serif italic">Video Production.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-slate-400 font-normal leading-relaxed">
            A showcase of generative scene creation, visual pacing, and frame-accurate video editing produced with Google Flow, Premiere Pro, and CapCut.
          </p>
        </div>

        {/* Master Cinema Viewport & Piece Selector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Main Cinema Viewport */}
          <motion.div
            className="studio-reveal lg:col-span-8 space-y-4"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative rounded-2xl border border-white/10 bg-[#080C18]/85 backdrop-blur-2xl p-3 sm:p-4 shadow-2xl overflow-hidden group">
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

                {/* Letterbox styling for 2.39:1 */}
                {activePiece.aspectRatio === "2.39:1" && (
                  <>
                    <div className="absolute top-0 inset-x-0 h-3 bg-black/95 pointer-events-none z-10" />
                    <div className="absolute bottom-0 inset-x-0 h-3 bg-black/95 pointer-events-none z-10" />
                  </>
                )}

                {/* Video Overlay Top Meta */}
                <div className="relative z-20 flex items-center justify-between p-3.5 sm:p-4 text-[11px] font-mono text-white/90 bg-gradient-to-b from-black/80 via-black/20 to-transparent pointer-events-none">
                  <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 pointer-events-auto">
                    <span className="text-[#38BDF8] font-bold">{activePiece.stageNumber}</span>
                    <span className="text-[#94A3B8]">•</span>
                    <span>{activePiece.category}</span>
                  </span>

                  <div className="flex items-center gap-2 pointer-events-auto">
                    <span className="px-2 py-0.5 rounded bg-black/60 text-[10px] text-[#CBD5E1] border border-white/10 hidden sm:inline font-mono">
                      {activePiece.aspectRatio} Cinema
                    </span>
                    <button
                      onClick={() => setIsShowreelModalOpen(true)}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#2563EB] text-white text-[10px] font-mono hover:bg-[#1D4ED8] transition-all hover:scale-105 shadow-md"
                      title="Launch Fullscreen Showreel"
                    >
                      <Maximize2 size={10} />
                      <span>Fullscreen</span>
                    </button>
                  </div>
                </div>

                {/* Center Play Overlay when paused */}
                {!isPlaying && (
                  <div className="relative z-20 my-auto text-center py-6 pointer-events-auto px-4">
                    <button
                      onClick={togglePlay}
                      type="button"
                      className="inline-flex items-center justify-center h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-[#2563EB] text-white hover:bg-[#1D4ED8] hover:scale-110 transition-all duration-300 shadow-[0_0_30px_rgba(37,99,235,0.6)] mx-auto"
                      aria-label="Play video"
                    >
                      <Play size={22} className="translate-x-0.5 fill-white" />
                    </button>
                    <h3 className="text-lg sm:text-xl font-bold text-white mt-3 tracking-tight font-heading drop-shadow">
                      {activePiece.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-white/80 max-w-md mx-auto mt-0.5 drop-shadow">
                      {activePiece.tagline}
                    </p>
                  </div>
                )}

                {/* Bottom Transport Controls */}
                <div className="relative z-20 p-3 sm:p-4 space-y-2 bg-gradient-to-t from-black/85 via-black/40 to-transparent">
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
                        {isPlaying ? <Pause size={13} /> : <Play size={13} />}
                      </button>

                      <button
                        onClick={toggleMute}
                        type="button"
                        className="text-white hover:text-[#38BDF8] transition-colors flex items-center gap-1"
                        aria-label={isMuted ? "Unmute video" : "Mute video"}
                      >
                        {isMuted ? <VolumeX size={13} className="text-red-400" /> : <Volume2 size={13} />}
                        <span className="hidden xs:inline text-[9px]">{isMuted ? "MUTED" : "SOUND ON"}</span>
                      </button>

                      <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="text-[#94A3B8] hidden sm:inline">Tools:</span>
                      <span className="truncate max-w-[200px] text-white">{activePiece.tools.join(" • ")}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description & Tools */}
              <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-[#1C2438]">
                <p className="text-xs sm:text-sm text-[#94A3B8] max-w-xl leading-relaxed">
                  {activePiece.description}
                </p>
                <div className="flex flex-wrap gap-1.5 shrink-0">
                  {activePiece.tools.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-full text-[10px] font-mono border border-[#1C2438] bg-[#070B18] text-[#CBD5E1]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Piece Selector Column */}
          <motion.div
            className="studio-reveal lg:col-span-4 space-y-3"
            initial={prefersReducedMotion ? false : { opacity: 0, x: 14 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="text-xs font-mono uppercase tracking-widest text-[#94A3B8] mb-2 flex items-center justify-between">
              <span>Production Reel</span>
              <span>3 Pieces</span>
            </div>

            {pieces.map((piece, idx) => {
              const isSelected = activePiece.id === piece.id;
              return (
                <button
                  key={piece.id}
                  onClick={() => setActivePiece(piece)}
                  type="button"
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex flex-col gap-1.5 ${
                    isSelected
                      ? "border-[#2563EB] bg-[#131930] shadow-md"
                      : "border-[#1C2438] bg-[#0D1224] hover:border-[#2563EB]/60 hover:bg-[#131930]/60"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded font-medium flex items-center gap-1.5 ${
                        isSelected
                          ? "bg-[#2563EB]/20 text-[#93C5FD]"
                          : "bg-[#070B18] text-[#94A3B8]"
                      }`}
                    >
                      <span>0{idx + 1}</span>
                      <span>•</span>
                      <span>{piece.category}</span>
                    </span>
                    <span className="text-[11px] font-mono text-[#94A3B8] flex items-center gap-1">
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

            {/* How I Work: Production Process */}
            <div className="p-5 rounded-xl border border-[#1C2438] bg-[#0D1224] space-y-3 mt-4">
              <div className="text-xs font-mono uppercase tracking-wider text-[#2563EB] flex items-center gap-1.5 font-bold">
                <SlidersHorizontal size={12} />
                <span>Production Process</span>
              </div>
              <ul className="text-xs text-[#94A3B8] space-y-3">
                <li className="flex items-start gap-2.5">
                  <span className="text-white font-mono font-bold text-xs mt-0.5">01.</span>
                  <div>
                    <span className="text-white font-medium">Prompt &amp; Camera Direction</span>
                    <p className="text-[#94A3B8] text-[11px] mt-0.5 leading-snug">
                      Defining focal lengths, lighting continuity, and mood before generating scene takes.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-white font-mono font-bold text-xs mt-0.5">02.</span>
                  <div>
                    <span className="text-white font-medium">Generative Synthesis</span>
                    <p className="text-[#94A3B8] text-[11px] mt-0.5 leading-snug">
                      Testing multiple generations with Google Flow and selecting takes with coherent motion.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-white font-mono font-bold text-xs mt-0.5">03.</span>
                  <div>
                    <span className="text-white font-medium">Timeline, Color &amp; Audio</span>
                    <p className="text-[#94A3B8] text-[11px] mt-0.5 leading-snug">
                      Cutting in Premiere Pro, locking in audio transient sync, and unifying the color grade.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Full-Screen Showreel Modal */}
      <ShowreelModal
        isOpen={isShowreelModalOpen}
        onClose={() => setIsShowreelModalOpen(false)}
        initialVideoId={activePiece.id}
      />
    </section>
  );
};
