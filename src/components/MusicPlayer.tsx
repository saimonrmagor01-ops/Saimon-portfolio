"use client";

import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  Volume2,
  Volume1,
  VolumeX,
  SkipForward,
  SkipBack,
  ChevronUp,
  ChevronDown,
  Sparkles,
  Disc3,
  Loader2,
  AlertCircle,
  RotateCcw,
} from "lucide-react";

export interface Track {
  title: string;
  artist: string;
  src: string;
  album: string;
  year: string;
  coverArt: string;
  accentColor: string;
  secondaryColor: string;
  glowColor: string;
  bgTint: string;
}

// 6 Verified Tracks:
// Family Affair and Girl Like Me are prioritized as primary tracks to guarantee
// immediate verified playback across both production CDN (Vercel) and local dev environments.
export const PLAYLIST: Track[] = [
  {
    title: "CHIHIRO",
    artist: "Billie Eilish",
    src: "/music/CHIHIRO%20-%20Billie%20Eilish.mp3",
    album: "HIT ME HARD AND SOFT",
    year: "2024",
    coverArt: "/music/chihiro-cover.jpg",
    accentColor: "#38BDF8", // deep ocean cyan
    secondaryColor: "#1D4ED8", // abyssal blue
    glowColor: "rgba(56, 189, 248, 0.45)",
    bgTint: "rgba(56, 189, 248, 0.08)",
  },
  {
    title: "Timeless",
    artist: "The Weeknd & Playboi Carti",
    src: "/music/Timeless%20-%20The%20Weeknd.mp3",
    album: "Hurry Up Tomorrow",
    year: "2024",
    coverArt: "/music/timeless-cover.jpg",
    accentColor: "#E11D48", // cinematic crimson rose
    secondaryColor: "#7C3AED", // twilight purple
    glowColor: "rgba(225, 29, 72, 0.45)",
    bgTint: "rgba(225, 29, 72, 0.08)",
  },
  {
    title: "MUTT",
    artist: "Leon Thomas",
    src: "/music/MUTT%20-%20Leon%20Thomas.mp3",
    album: "MUTT",
    year: "2024",
    coverArt: "/music/mutt-cover.jpg",
    accentColor: "#D97706", // vintage tobacco bronze
    secondaryColor: "#6366F1", // midnight indigo
    glowColor: "rgba(217, 119, 6, 0.45)",
    bgTint: "rgba(217, 119, 6, 0.08)",
  },
  {
    title: "Family Affair",
    artist: "Mary J. Blige",
    src: "/music/Family%20Affair%20-%20Mary%20J.%20Blige.mp3",
    album: "No More Drama",
    year: "2001",
    coverArt: "/music/family-affair-cover.jpg",
    accentColor: "#F59E0B", // warm golden amber
    secondaryColor: "#8B5CF6", // royal violet
    glowColor: "rgba(245, 158, 11, 0.45)",
    bgTint: "rgba(245, 158, 11, 0.08)",
  },
  {
    title: "Black and Yellow",
    artist: "Wiz Khalifa",
    src: "/music/Black%20and%20Yellow%20-%20Wiz%20Khalifa.mp3",
    album: "Rolling Papers",
    year: "2010",
    coverArt: "/music/black-and-yellow-cover.jpg",
    accentColor: "#EAB308", // electric gold
    secondaryColor: "#F97316", // amber orange
    glowColor: "rgba(234, 179, 8, 0.45)",
    bgTint: "rgba(234, 179, 8, 0.08)",
  },
  {
    title: "Girl Like Me",
    artist: "Black Eyed Peas & Shakira",
    src: "/music/Girl%20Like%20Me%20-%20Hot%20Black%20Eyed%20Peas.mp3",
    album: "Translation",
    year: "2020",
    coverArt: "/music/girl-like-me-cover.jpg",
    accentColor: "#EC4899", // neon magenta
    secondaryColor: "#06B6D4", // cyber cyan
    glowColor: "rgba(236, 72, 153, 0.45)",
    bgTint: "rgba(236, 72, 153, 0.08)",
  },
];

// Module-level singletons: Guarantee single authoritative audio instance
let globalAudio: HTMLAudioElement | null = null;
let globalAudioContext: AudioContext | null = null;
let globalMediaSource: MediaElementAudioSourceNode | null = null;
let globalAnalyser: AnalyserNode | null = null;
let hasUserExplicitlyPaused = false;
let globalCurrentTrackIndex = 0;
let wasPlayingBeforeVideo = false;
let isDucked = false;

/**
 * Pause background music when portfolio video starts playing,
 * and resume it at previous position only if it was playing before.
 */
export const pauseBackgroundAudioForVideo = () => {
  if (!globalAudio || isDucked) return;
  isDucked = true;
  if (!globalAudio.paused) {
    wasPlayingBeforeVideo = true;
    globalAudio.pause();
  } else {
    wasPlayingBeforeVideo = false;
  }
};

export const resumeBackgroundAudioAfterVideo = () => {
  if (!globalAudio || !isDucked) return;
  isDucked = false;
  if (wasPlayingBeforeVideo && !hasUserExplicitlyPaused) {
    globalAudio.play().catch(() => {});
    wasPlayingBeforeVideo = false;
  }
};

// Backwards-compatible aliases
export const duckBackgroundAudio = (shouldDuck: boolean) => {
  if (shouldDuck) {
    pauseBackgroundAudioForVideo();
  } else {
    resumeBackgroundAudioAfterVideo();
  }
};

export const restoreBackgroundAudio = () => {
  resumeBackgroundAudioAfterVideo();
};

/**
 * Format raw seconds to MM:SS
 */
const formatTime = (seconds: number): string => {
  if (isNaN(seconds) || !isFinite(seconds) || seconds < 0) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
};

/**
 * Safe initializer for Web Audio API AudioContext and AnalyserNode.
 * Wrapped in try/catch to ensure standard audio playback is never blocked.
 */
const getOrCreateAudioNodes = (audioEl: HTMLAudioElement) => {
  if (globalAnalyser) return globalAnalyser;
  if (typeof window === "undefined") return null;

  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    if (!AudioCtx) return null;

    if (!globalAudioContext) {
      globalAudioContext = new AudioCtx();
    }

    if (!globalMediaSource && globalAudioContext) {
      globalMediaSource = globalAudioContext.createMediaElementSource(audioEl);
      globalAnalyser = globalAudioContext.createAnalyser();
      globalAnalyser.fftSize = 128; // 64 frequency bins
      globalAnalyser.smoothingTimeConstant = 0.82;

      globalMediaSource.connect(globalAnalyser);
      globalAnalyser.connect(globalAudioContext.destination);
    }

    return globalAnalyser;
  } catch {
    // If Web Audio API is restricted by CORS or browser policy, fallback gracefully
    return globalAnalyser;
  }
};

export const MusicPlayer: React.FC = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(
    globalCurrentTrackIndex
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [isExpanded, setIsExpanded] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const [hasAudioError, setHasAudioError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const [seekTime, setSeekTime] = useState(0);
  const [failedCoverArts, setFailedCoverArts] = useState<Record<string, boolean>>({});

  // Direct DOM Refs for 60 FPS performance without React state overhead
  const playerContainerRef = useRef<HTMLElement | null>(null);
  const card3DRef = useRef<HTMLDivElement | null>(null);
  const ambientGlowRef = useRef<HTMLDivElement | null>(null);
  const artworkRef = useRef<HTMLDivElement | null>(null);
  const specularSheenRef = useRef<HTMLDivElement | null>(null);
  const expandedVisualizerCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const miniVisualizerCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);

  // Synchronization refs to eliminate re-render listener churn
  const isSeekingRef = useRef(false);
  const playPromiseRef = useRef<Promise<void> | null>(null);
  const currentTrackIndexRef = useRef(currentTrackIndex);
  currentTrackIndexRef.current = currentTrackIndex;

  const currentTrack = PLAYLIST[currentTrackIndex];

  // Resume Web Audio context if suspended
  const ensureAudioContextRunning = useCallback(() => {
    if (globalAudioContext && globalAudioContext.state === "suspended") {
      globalAudioContext.resume().catch(() => {});
    }
  }, []);

  // Safe playback start with promise resolution tracking
  const safePlay = useCallback(
    async (audioEl: HTMLAudioElement) => {
      try {
        setHasAudioError(false);
        setErrorMessage(null);
        setIsLoading(true);
        ensureAudioContextRunning();

        // Wait for any previous pending play promise to settle
        if (playPromiseRef.current) {
          try {
            await playPromiseRef.current;
          } catch {
            // previous play request settled/aborted
          }
        }

        const promise = audioEl.play();
        if (promise !== undefined) {
          playPromiseRef.current = promise;
          await promise;
          playPromiseRef.current = null;
          setIsPlaying(true);
          setIsLoading(false);
          setAutoplayBlocked(false);
          setHasAudioError(false);
          setErrorMessage(null);
          hasUserExplicitlyPaused = false;

          // Connect Web Audio graph once playing
          getOrCreateAudioNodes(audioEl);
          ensureAudioContextRunning();
        }
      } catch (err: unknown) {
        playPromiseRef.current = null;
        const error = err as Error;
        setIsLoading(false);

        if (error.name === "NotAllowedError") {
          // Standard browser autoplay policy: not an audio error, wait for user gesture
          setIsPlaying(false);
          setAutoplayBlocked(true);
        } else if (error.name === "AbortError") {
          // Playback interrupted cleanly by pause or track change
        } else {
          console.warn("[MusicPlayer] SafePlay failed:", error.name, error.message);
          setIsPlaying(false);
        }
      }
    },
    [ensureAudioContextRunning]
  );

  // Safe atomic pause
  const safePause = useCallback(async (audioEl: HTMLAudioElement) => {
    hasUserExplicitlyPaused = true;
    setAutoplayBlocked(false);
    try {
      if (playPromiseRef.current) {
        await playPromiseRef.current;
      }
    } catch {
      // ignore
    }
    audioEl.pause();
    setIsPlaying(false);
    setIsLoading(false);
  }, []);

  // Change Track atomically
  const changeTrack = useCallback(
    async (targetIndex: number, shouldAutoPlay: boolean = true) => {
      const nextIdx =
        ((targetIndex % PLAYLIST.length) + PLAYLIST.length) % PLAYLIST.length;
      globalCurrentTrackIndex = nextIdx;
      setCurrentTrackIndex(nextIdx);

      if (!globalAudio) return;
      const audio = globalAudio;

      try {
        if (playPromiseRef.current) {
          await playPromiseRef.current;
        }
      } catch {
        // ignore
      }

      audio.pause();
      setIsPlaying(false);
      setIsLoading(true);
      setHasAudioError(false);
      setErrorMessage(null);
      setCurrentTime(0);

      const targetTrack = PLAYLIST[nextIdx];
      audio.src = targetTrack.src;
      audio.load();

      if (shouldAutoPlay && !hasUserExplicitlyPaused) {
        await safePlay(audio);
      } else {
        setIsLoading(false);
      }
    },
    [safePlay]
  );

  // Initialize Audio & Bind Listeners once
  useEffect(() => {
    let initialVolume = 0.7;
    let initialMute = false;
    try {
      const savedVol = localStorage.getItem("saimon_portfolio_volume");
      if (savedVol !== null) {
        const parsed = parseFloat(savedVol);
        if (!isNaN(parsed) && parsed >= 0 && parsed <= 1) {
          initialVolume = parsed;
          setVolume(parsed);
        }
      }
      const savedMute = localStorage.getItem("saimon_portfolio_mute");
      if (savedMute !== null) {
        initialMute = savedMute === "true";
        setIsMuted(initialMute);
      }
    } catch {
      // Storage access safety
    }

    if (!globalAudio) {
      const audio = new Audio();
      audio.preload = "auto";
      audio.volume = initialMute ? 0 : initialVolume;
      audio.muted = initialMute;
      audio.src = PLAYLIST[globalCurrentTrackIndex].src;
      globalAudio = audio;
    } else {
      if (!globalAudio.paused) {
        setIsPlaying(true);
      }
      if (globalAudio.duration) {
        setDuration(globalAudio.duration);
        setCurrentTime(globalAudio.currentTime);
      }
    }

    const audio = globalAudio;

    const onTimeUpdate = () => {
      if (!isSeekingRef.current) {
        setCurrentTime(audio.currentTime);
      }
    };

    const onDurationChange = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    const onLoadedMetadata = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    const onCanPlay = () => {
      setIsLoading(false);
    };

    const onWaiting = () => {
      setIsLoading(true);
    };

    const onPlaying = () => {
      setIsPlaying(true);
      setIsLoading(false);
      setHasAudioError(false);
      setErrorMessage(null);
      getOrCreateAudioNodes(audio);
      ensureAudioContextRunning();
    };

    const onPause = () => {
      setIsPlaying(false);
      setIsLoading(false);
    };

    const onEnded = () => {
      // Automatically advance to the next track on track end
      const nextIndex =
        (currentTrackIndexRef.current + 1) % PLAYLIST.length;
      changeTrack(nextIndex, true);
    };

    const onError = () => {
      const err = audio.error;
      const track = PLAYLIST[currentTrackIndexRef.current];
      console.warn(
        `[MusicPlayer] Audio element error for "${track.title}" (${track.src}):`,
        err?.code,
        err?.message
      );

      setIsPlaying(false);
      setIsLoading(false);
      setHasAudioError(true);

      let msg = "Track unavailable";
      if (err?.code === MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED) {
        msg = "Track file not found on server";
      } else if (err?.code === MediaError.MEDIA_ERR_NETWORK) {
        msg = "Network connection interrupted";
      } else if (err?.code === MediaError.MEDIA_ERR_DECODE) {
        msg = "Audio format decoding error";
      }
      setErrorMessage(msg);
    };

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("durationchange", onDurationChange);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("canplay", onCanPlay);
    audio.addEventListener("waiting", onWaiting);
    audio.addEventListener("playing", onPlaying);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("error", onError);

    // Initial autoplay attempt
    if (!hasUserExplicitlyPaused && audio.paused) {
      safePlay(audio);
    }

    // Unlock audio on first user gesture anywhere on page
    const handleFirstGesture = () => {
      ensureAudioContextRunning();
      if (globalAudio && !hasUserExplicitlyPaused && globalAudio.paused) {
        safePlay(globalAudio);
      }
    };

    window.addEventListener("pointerdown", handleFirstGesture, { once: true });
    window.addEventListener("keydown", handleFirstGesture, { once: true });

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("durationchange", onDurationChange);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("canplay", onCanPlay);
      audio.removeEventListener("waiting", onWaiting);
      audio.removeEventListener("playing", onPlaying);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("error", onError);
      window.removeEventListener("pointerdown", handleFirstGesture);
      window.removeEventListener("keydown", handleFirstGesture);
    };
  }, [changeTrack, safePlay, ensureAudioContextRunning]);

  // Click outside to collapse expanded player
  useEffect(() => {
    if (!isExpanded) return;

    const handlePointerDownOutside = (event: PointerEvent) => {
      if (isSeekingRef.current) return;
      if (
        playerContainerRef.current &&
        !playerContainerRef.current.contains(event.target as Node)
      ) {
        setIsExpanded(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDownOutside);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDownOutside);
    };
  }, [isExpanded]);

  // =========================================================================
  // HIGH-PERFORMANCE AUDIO-REACTIVE 60 FPS ANIMATION LOOP (Zero React Re-renders)
  // =========================================================================
  useEffect(() => {
    let animationFrameId: number;
    const freqData = new Uint8Array(64);
    let simulatedPhase = 0;
    let idleDecayFrames = 0;

    const renderAudioFrame = () => {
      const active = isPlaying;

      if (!active) {
        idleDecayFrames++;
        if (idleDecayFrames > 30) {
          // Resting state reached; pause RAF loop to conserve CPU/GPU
          return;
        }
      } else {
        idleDecayFrames = 0;
      }

      // 1. Fetch real frequency data or generate smooth harmonic waveform
      let hasRealData = false;
      if (globalAnalyser && active) {
        try {
          globalAnalyser.getByteFrequencyData(freqData);
          hasRealData = freqData.some((v) => v > 0);
        } catch {
          hasRealData = false;
        }
      }

      simulatedPhase += 0.08;

      // 2. Compute Bass Energy for Tactile 3D Beat Pulse
      let bassEnergy = 0;
      if (hasRealData) {
        const bassSum =
          freqData[1] +
          freqData[2] +
          freqData[3] +
          freqData[4] +
          freqData[5] +
          freqData[6];
        bassEnergy = bassSum / (6 * 255);
      } else if (active) {
        bassEnergy =
          0.3 + 0.25 * Math.sin(simulatedPhase * 1.5) * Math.sin(simulatedPhase);
      } else {
        bassEnergy = Math.max(0, 0.2 - idleDecayFrames * 0.01);
      }

      // 3. Update Ambient Back-Glow (Direct DOM transform for 60 FPS)
      if (ambientGlowRef.current) {
        const glowScale = 1 + bassEnergy * 0.22;
        const glowOpacity = active ? 0.35 + bassEnergy * 0.55 : 0.15;
        ambientGlowRef.current.style.transform = `scale(${glowScale.toFixed(3)}) translateZ(0px)`;
        ambientGlowRef.current.style.opacity = glowOpacity.toFixed(2);
      }

      // 4. Update Large Floating Artwork Beat Pulse (Apple Music tactile response)
      if (artworkRef.current) {
        const artScale = 1 + bassEnergy * 0.038;
        artworkRef.current.style.transform = `scale(${artScale.toFixed(3)}) translateZ(28px)`;
      }

      // 5. Render Expanded Visualizer Canvas (Frequency Bars + Waveform Reflection)
      const expCanvas = expandedVisualizerCanvasRef.current;
      if (expCanvas) {
        const ctx = expCanvas.getContext("2d");
        if (ctx) {
          const width = expCanvas.width;
          const height = expCanvas.height;
          ctx.clearRect(0, 0, width, height);

          const barCount = 28;
          const barWidth = 6;
          const gap = (width - barCount * barWidth) / (barCount - 1);

          for (let i = 0; i < barCount; i++) {
            let magnitude = 0;
            if (hasRealData) {
              const binIndex = Math.min(
                freqData.length - 1,
                Math.floor((i / barCount) * 44) + 1
              );
              magnitude = freqData[binIndex] / 255;
            } else if (active) {
              magnitude =
                0.25 +
                0.55 *
                  Math.sin(simulatedPhase + i * 0.35) *
                  Math.cos(simulatedPhase * 0.7 + i * 0.2);
            } else {
              magnitude = Math.max(0, 0.15 - idleDecayFrames * 0.008);
            }

            magnitude = Math.max(0.08, Math.min(1, magnitude));
            const barHeight = Math.max(4, magnitude * (height * 0.75));
            const x = i * (barWidth + gap);
            const y = height * 0.78 - barHeight;

            // Bar Gradient: Secondary Color -> Primary Accent -> Specular White
            const grad = ctx.createLinearGradient(x, y, x, y + barHeight);
            grad.addColorStop(0, "#FFFFFF");
            grad.addColorStop(0.35, currentTrack.accentColor);
            grad.addColorStop(1, currentTrack.secondaryColor);

            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.roundRect(x, y, barWidth, barHeight, [3, 3, 1, 1]);
            ctx.fill();

            // Subtle mirror reflection underneath baseline
            const reflHeight = barHeight * 0.28;
            const reflGrad = ctx.createLinearGradient(
              x,
              height * 0.8,
              x,
              height * 0.8 + reflHeight
            );
            reflGrad.addColorStop(0, `${currentTrack.accentColor}44`);
            reflGrad.addColorStop(1, "transparent");

            ctx.fillStyle = reflGrad;
            ctx.beginPath();
            ctx.roundRect(x, height * 0.82, barWidth, reflHeight, [1, 1, 3, 3]);
            ctx.fill();
          }
        }
      }

      // 6. Render Minimized Mini Visualizer Canvas (5 Sleek Harmonic Bars)
      const miniCanvas = miniVisualizerCanvasRef.current;
      if (miniCanvas) {
        const mCtx = miniCanvas.getContext("2d");
        if (mCtx) {
          const mWidth = miniCanvas.width;
          const mHeight = miniCanvas.height;
          mCtx.clearRect(0, 0, mWidth, mHeight);

          const mBars = 5;
          const mBarW = 3;
          const mGap = 3;
          const startX = (mWidth - (mBars * mBarW + (mBars - 1) * mGap)) / 2;

          for (let b = 0; b < mBars; b++) {
            let mMag = 0;
            if (hasRealData) {
              const bin = b * 6 + 2;
              mMag = freqData[bin] / 255;
            } else if (active) {
              mMag =
                0.2 +
                0.65 *
                  Math.abs(Math.sin(simulatedPhase * 1.2 + b * 0.85));
            } else {
              mMag = Math.max(0.1, 0.2 - idleDecayFrames * 0.01);
            }

            mMag = Math.max(0.15, Math.min(1, mMag));
            const bH = Math.max(3, mMag * mHeight);
            const bX = startX + b * (mBarW + mGap);
            const bY = mHeight - bH;

            const bGrad = mCtx.createLinearGradient(bX, bY, bX, bY + bH);
            bGrad.addColorStop(0, "#FFFFFF");
            bGrad.addColorStop(0.5, currentTrack.accentColor);
            bGrad.addColorStop(1, currentTrack.secondaryColor);

            mCtx.fillStyle = bGrad;
            mCtx.beginPath();
            mCtx.roundRect(bX, bY, mBarW, bH, 2);
            mCtx.fill();
          }
        }
      }

      animationFrameId = requestAnimationFrame(renderAudioFrame);
    };

    animationFrameId = requestAnimationFrame(renderAudioFrame);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPlaying, currentTrack]);

  // =========================================================================
  // 3D SPATIAL TILT & SPECULAR GLASS INTERACTION (VisionOS Aesthetics)
  // =========================================================================
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!card3DRef.current || window.innerWidth < 768) return;
    const rect = card3DRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -6.5; // max ±6.5 degrees
    const rotY = ((x - centerX) / centerX) * 6.5;

    card3DRef.current.style.transform = `perspective(1200px) rotateX(${rotX.toFixed(
      2
    )}deg) rotateY(${rotY.toFixed(2)}deg) translateZ(0px)`;

    if (specularSheenRef.current) {
      specularSheenRef.current.style.background = `radial-gradient(circle 260px at ${x}px ${y}px, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0.03) 45%, transparent 75%)`;
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!card3DRef.current) return;
    card3DRef.current.style.transform = `perspective(1200px) rotateX(0deg) rotateY(0deg) translateZ(0px)`;
    if (specularSheenRef.current) {
      specularSheenRef.current.style.background = `transparent`;
    }
  }, []);

  // Toggle Play / Pause
  const togglePlay = () => {
    if (!globalAudio) return;

    if (isPlaying) {
      safePause(globalAudio);
    } else {
      if (hasAudioError) {
        // Clear error and retry loading track
        setHasAudioError(false);
        setErrorMessage(null);
        changeTrack(currentTrackIndex, true);
      } else {
        hasUserExplicitlyPaused = false;
        safePlay(globalAudio);
      }
    }
  };

  const handlePlayPrompt = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!globalAudio) return;
    hasUserExplicitlyPaused = false;
    safePlay(globalAudio);
  };

  const nextTrack = () => {
    changeTrack(currentTrackIndex + 1, true);
  };

  const prevTrack = () => {
    if (globalAudio && globalAudio.currentTime > 3) {
      globalAudio.currentTime = 0;
      setCurrentTime(0);
      return;
    }
    changeTrack(currentTrackIndex - 1, true);
  };

  const retryPlayback = () => {
    setHasAudioError(false);
    setErrorMessage(null);
    changeTrack(currentTrackIndex, true);
  };

  const toggleMute = () => {
    if (!globalAudio) return;
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    globalAudio.muted = nextMute;
    try {
      localStorage.setItem("saimon_portfolio_mute", String(nextMute));
    } catch {}
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (globalAudio) {
      globalAudio.volume = val;
      if (val > 0 && isMuted) {
        setIsMuted(false);
        globalAudio.muted = false;
      }
    }
    try {
      localStorage.setItem("saimon_portfolio_volume", val.toString());
    } catch {}
  };

  // Progress Scrubber Calculation
  const calculateSeekTime = useCallback(
    (clientX: number): number => {
      if (!progressBarRef.current || !duration) return 0;
      const rect = progressBarRef.current.getBoundingClientRect();
      const clickX = clientX - rect.left;
      const percentage = Math.max(0, Math.min(1, clickX / rect.width));
      return percentage * duration;
    },
    [duration]
  );

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!duration) return;
    isSeekingRef.current = true;
    setIsSeeking(true);
    const newTime = calculateSeekTime(e.clientX);
    setSeekTime(newTime);

    const handlePointerMove = (moveEvent: PointerEvent) => {
      const movedTime = calculateSeekTime(moveEvent.clientX);
      setSeekTime(movedTime);
    };

    const handlePointerUp = (upEvent: PointerEvent) => {
      const finalTime = calculateSeekTime(upEvent.clientX);
      if (globalAudio) {
        globalAudio.currentTime = finalTime;
        setCurrentTime(finalTime);
      }
      isSeekingRef.current = false;
      setIsSeeking(false);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
  };

  const handleProgressKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!globalAudio || !duration) return;
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      const newTime = Math.max(0, currentTime - 5);
      globalAudio.currentTime = newTime;
      setCurrentTime(newTime);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      const newTime = Math.min(duration, currentTime + 5);
      globalAudio.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const displayTime = isSeeking ? seekTime : currentTime;
  const progressPercent =
    duration > 0
      ? Math.min(100, Math.max(0, (displayTime / duration) * 100))
      : 0;

  return (
    <aside
      ref={playerContainerRef}
      aria-label="Apple-inspired 3D soundtrack player"
      className="fixed z-40 flex flex-col items-end gap-2.5 transition-all duration-300"
      style={{
        bottom: "max(1.25rem, env(safe-area-inset-bottom, 1.25rem))",
        right: "max(1.25rem, env(safe-area-inset-right, 1.25rem))",
        maxWidth: "calc(100vw - 2rem)",
      }}
    >
      {/* Autoplay Blocked Floating Glass Prompt */}
      <AnimatePresence>
        {autoplayBlocked && !isPlaying && (
          <motion.button
            key="autoplay-prompt"
            initial={{ opacity: 0, y: 12, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.94 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            onClick={handlePlayPrompt}
            type="button"
            aria-label="Enable spatial soundtrack"
            className="group flex items-center gap-3 px-4 py-2.5 rounded-full bg-[#080C18]/90 backdrop-blur-2xl border border-white/20 text-white shadow-[0_16px_40px_rgba(0,0,0,0.6)] hover:border-white/40 transition-all duration-300"
            style={{
              boxShadow: `0 16px 40px rgba(0,0,0,0.6), 0 0 30px ${currentTrack.glowColor}`,
            }}
          >
            <div
              className="w-6 h-6 rounded-full text-slate-950 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform"
              style={{
                background: `linear-gradient(135deg, #FFFFFF 0%, ${currentTrack.accentColor} 100%)`,
              }}
            >
              <Play size={11} className="translate-x-0.5 fill-current" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-semibold tracking-wide text-white font-heading">
                Experience Soundtrack
              </span>
              <span className="text-[10px] text-slate-300 font-mono">
                {currentTrack.artist} • {currentTrack.title}
              </span>
            </div>
            <Sparkles
              size={14}
              className="animate-pulse ml-1"
              style={{ color: currentTrack.accentColor }}
            />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Main 3D Spatial Glass Chassis */}
      <div
        ref={card3DRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative transition-transform duration-200 ease-out"
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* Dynamic Bass-Responsive Ambient Glow Layer */}
        <div
          ref={ambientGlowRef}
          className="absolute -inset-4 sm:-inset-6 rounded-[2.5rem] pointer-events-none blur-3xl transition-opacity duration-300 -z-10"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${currentTrack.glowColor} 0%, ${currentTrack.secondaryColor}33 50%, transparent 80%)`,
          }}
        />

        <motion.div
          layout
          initial={{ opacity: 0, scale: 0.92, y: 18 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 320, damping: 28 }}
          className={`relative overflow-hidden rounded-[1.75rem] border border-white/15 bg-[#080C18]/85 backdrop-blur-3xl shadow-[0_24px_60px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(255,255,255,0.22),inset_0_-1px_1px_rgba(0,0,0,0.4)] ${
            isExpanded
              ? "w-[330px] sm:w-[360px] p-5"
              : "p-2 pl-2.5 pr-3.5"
          }`}
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {/* Optical Specular Sheen (Moves with cursor in 3D) */}
          <div
            ref={specularSheenRef}
            className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-30"
          />

          {/* =============================================================
              EXPANDED SPATIAL GLASS DECK (Apple Music / VisionOS Aesthetic)
             ============================================================= */}
          {isExpanded ? (
            <div
              className="relative z-10 flex flex-col gap-4"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Header Bar: Status Badge & Minimize Toggle */}
              <div
                className="flex items-center justify-between"
                style={{ transform: "translateZ(36px)" }}
              >
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 border border-white/15 text-[9px] font-mono font-semibold tracking-widest uppercase text-white shadow-sm">
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        isPlaying ? "bg-amber-400 animate-pulse" : "bg-slate-400"
                      }`}
                      style={{
                        backgroundColor: isPlaying
                          ? currentTrack.accentColor
                          : undefined,
                      }}
                    />
                    Soundtrack
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    {currentTrack.year}
                  </span>
                </div>

                <button
                  onClick={() => setIsExpanded(false)}
                  type="button"
                  aria-label="Collapse music player"
                  title="Collapse player"
                  className="p-1.5 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400"
                >
                  <ChevronDown size={17} />
                </button>
              </div>

              {/* Large Dynamic Album Artwork (Apple Music Presentation) */}
              <div
                className="relative mx-auto w-full aspect-square max-w-[270px] sm:max-w-[290px] select-none"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Artwork Ambient Mirror Glow */}
                <div
                  className="absolute inset-x-4 -bottom-3 h-2/3 rounded-2xl blur-xl opacity-60 pointer-events-none transition-colors duration-500"
                  style={{
                    backgroundColor: currentTrack.accentColor,
                  }}
                />

                {/* Tactile Floating Album Artwork Container */}
                <div
                  ref={artworkRef}
                  className="relative w-full h-full rounded-2xl overflow-hidden border border-white/20 shadow-[0_16px_40px_rgba(0,0,0,0.65),inset_0_1px_1px_rgba(255,255,255,0.3)] transition-transform duration-100 ease-out group"
                  style={{ transform: "translateZ(28px)" }}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentTrack.coverArt}
                      initial={{ opacity: 0, scale: 0.94 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.04 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="w-full h-full relative"
                    >
                      {failedCoverArts[currentTrack.coverArt] ? (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#12192B] to-[#080C18] p-5 text-center relative overflow-hidden">
                          <div
                            className="absolute inset-0 opacity-20 pointer-events-none"
                            style={{
                              background: `radial-gradient(circle at center, ${currentTrack.accentColor} 0%, transparent 70%)`,
                            }}
                          />
                          <Disc3
                            className={`w-16 h-16 text-white/80 ${
                              isPlaying ? "animate-spin" : ""
                            }`}
                            style={{ animationDuration: "8s" }}
                          />
                          <span className="text-sm font-bold text-white mt-3 font-heading truncate max-w-full">
                            {currentTrack.title}
                          </span>
                          <span className="text-xs text-slate-400 font-sans truncate max-w-full">
                            {currentTrack.artist}
                          </span>
                        </div>
                      ) : (
                        <Image
                          src={currentTrack.coverArt}
                          alt={`${currentTrack.title} official album artwork`}
                          fill
                          priority
                          sizes="(max-width: 640px) 270px, 290px"
                          className="object-cover"
                          onError={() =>
                            setFailedCoverArts((prev) => ({
                              ...prev,
                              [currentTrack.coverArt]: true,
                            }))
                          }
                        />
                      )}
                    </motion.div>
                  </AnimatePresence>

                  {/* Glass Specular Edge Highlight */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
                </div>
              </div>

              {/* Track Metadata Typography */}
              <div
                className="flex flex-col text-left px-1 gap-0.5"
                style={{ transform: "translateZ(34px)" }}
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight font-heading leading-tight truncate">
                    {currentTrack.title}
                  </h3>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 shrink-0">
                    {currentTrack.album}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs text-slate-300 font-sans truncate">
                    {currentTrack.artist}
                  </p>
                  {hasAudioError && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20">
                      <AlertCircle size={10} />
                      {errorMessage || "Unavailable"}
                    </span>
                  )}
                </div>
              </div>

              {/* Real-time Audio-Reactive Frequency Waveform Canvas */}
              <div
                className="relative w-full h-10 px-1"
                style={{ transform: "translateZ(32px)" }}
              >
                <canvas
                  ref={expandedVisualizerCanvasRef}
                  width={310}
                  height={40}
                  className="w-full h-full"
                  title="Real-time Web Audio API frequency analysis"
                  aria-hidden="true"
                />
              </div>

              {/* Progress Scrubber Bar & Timestamps */}
              <div
                className="flex flex-col gap-1.5 px-1"
                style={{ transform: "translateZ(34px)" }}
              >
                <div
                  ref={progressBarRef}
                  onPointerDown={handlePointerDown}
                  onKeyDown={handleProgressKeyDown}
                  role="slider"
                  tabIndex={0}
                  aria-label="Soundtrack timeline"
                  aria-valuemin={0}
                  aria-valuemax={Math.floor(duration || 100)}
                  aria-valuenow={Math.floor(displayTime)}
                  aria-valuetext={`${formatTime(displayTime)} of ${formatTime(
                    duration
                  )}`}
                  className="group/scrub relative h-2 bg-white/10 hover:bg-white/20 rounded-full cursor-pointer flex items-center transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                >
                  {/* Progress Fill */}
                  <div
                    className="h-full rounded-full relative"
                    style={{
                      width: `${progressPercent}%`,
                      background: `linear-gradient(90deg, ${currentTrack.secondaryColor}, ${currentTrack.accentColor})`,
                    }}
                  >
                    {/* Glowing Scrubber Thumb */}
                    <span
                      className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3.5 h-3.5 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.9)] opacity-95 group-hover/scrub:scale-125 transition-transform"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 select-none">
                  <span>{formatTime(displayTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Tactile Playback Controls & Volume Row */}
              <div
                className="flex items-center justify-between pt-1 border-t border-white/10"
                style={{ transform: "translateZ(36px)" }}
              >
                {/* Skip Back / Replay */}
                <button
                  onClick={prevTrack}
                  type="button"
                  aria-label="Previous soundtrack"
                  title="Previous track"
                  className="p-2.5 rounded-full text-slate-300 hover:text-white hover:bg-white/10 active:scale-90 transition-all"
                >
                  <SkipBack size={17} />
                </button>

                {/* Primary Animated Play / Pause / Retry Centerpiece */}
                {hasAudioError ? (
                  <button
                    onClick={retryPlayback}
                    type="button"
                    aria-label="Retry audio playback"
                    title="Retry audio source"
                    className="w-12 h-12 rounded-full text-slate-950 flex items-center justify-center font-bold shadow-lg hover:scale-105 active:scale-95 transition-all bg-amber-400 hover:bg-amber-300"
                  >
                    <RotateCcw size={19} className="text-slate-950" />
                  </button>
                ) : (
                  <button
                    onClick={togglePlay}
                    type="button"
                    aria-label={
                      isPlaying
                        ? `Pause ${currentTrack.title}`
                        : `Play ${currentTrack.title}`
                    }
                    title={isPlaying ? "Pause soundtrack" : "Play soundtrack"}
                    className="w-12 h-12 rounded-full text-slate-950 flex items-center justify-center font-bold shadow-lg hover:scale-105 active:scale-95 transition-all"
                    style={{
                      background: `linear-gradient(135deg, #FFFFFF 0%, ${currentTrack.accentColor} 100%)`,
                      boxShadow: isPlaying
                        ? `0 0 28px ${currentTrack.glowColor}`
                        : "0 8px 24px rgba(0,0,0,0.4)",
                    }}
                  >
                    {isLoading ? (
                      <Loader2 size={19} className="animate-spin text-slate-950" />
                    ) : isPlaying ? (
                      <Pause size={19} className="fill-current" />
                    ) : (
                      <Play size={19} className="translate-x-0.5 fill-current" />
                    )}
                  </button>
                )}

                {/* Skip Forward */}
                <button
                  onClick={nextTrack}
                  type="button"
                  aria-label="Next soundtrack"
                  title="Next track"
                  className="p-2.5 rounded-full text-slate-300 hover:text-white hover:bg-white/10 active:scale-90 transition-all"
                >
                  <SkipForward size={17} />
                </button>

                {/* Volume Slider with Mute Toggle */}
                <div className="flex items-center gap-1.5 pl-2 border-l border-white/10">
                  <button
                    onClick={toggleMute}
                    type="button"
                    aria-label={isMuted ? "Unmute" : "Mute"}
                    title={isMuted ? "Unmute" : "Mute"}
                    className="p-1.5 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    {isMuted || volume === 0 ? (
                      <VolumeX size={15} className="text-red-400" />
                    ) : volume < 0.5 ? (
                      <Volume1 size={15} />
                    ) : (
                      <Volume2 size={15} />
                    )}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    aria-label="Soundtrack volume"
                    title={`Volume: ${Math.round(
                      (isMuted ? 0 : volume) * 100
                    )}%`}
                    className="w-16 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-amber-400"
                  />
                </div>
              </div>
            </div>
          ) : (
            /* =============================================================
                MINIMIZED SPATIAL GLASS PILL (Floating Compact Widget)
               ============================================================= */
            <div className="relative z-10 flex items-center gap-3">
              {/* Mini Album Artwork Thumbnail */}
              <div
                onClick={() => setIsExpanded(true)}
                className="relative w-10 h-10 rounded-xl overflow-hidden shrink-0 cursor-pointer shadow-md border border-white/15 hover:scale-105 transition-transform"
                title="Click to expand player"
              >
                {failedCoverArts[currentTrack.coverArt] ? (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-950">
                    <Disc3
                      className={`w-5 h-5 text-white/80 ${
                        isPlaying ? "animate-spin" : ""
                      }`}
                      style={{ animationDuration: "5s" }}
                    />
                  </div>
                ) : (
                  <Image
                    src={currentTrack.coverArt}
                    alt={`${currentTrack.title} cover`}
                    fill
                    sizes="40px"
                    className="object-cover"
                    onError={() =>
                      setFailedCoverArts((prev) => ({
                        ...prev,
                        [currentTrack.coverArt]: true,
                      }))
                    }
                  />
                )}
              </div>

              {/* Play / Pause Circular Center Button */}
              {hasAudioError ? (
                <button
                  onClick={retryPlayback}
                  type="button"
                  aria-label="Retry audio"
                  title="Retry audio source"
                  className="w-8 h-8 rounded-full text-slate-950 flex items-center justify-center shrink-0 shadow-md hover:scale-105 active:scale-95 transition-transform bg-amber-400"
                >
                  <RotateCcw size={13} className="text-slate-950" />
                </button>
              ) : (
                <button
                  onClick={togglePlay}
                  type="button"
                  aria-label={
                    isPlaying
                      ? `Pause ${currentTrack.title}`
                      : `Play ${currentTrack.title}`
                  }
                  title={isPlaying ? "Pause soundtrack" : "Play soundtrack"}
                  className="w-8 h-8 rounded-full text-slate-950 flex items-center justify-center shrink-0 shadow-md hover:scale-105 active:scale-95 transition-transform"
                  style={{
                    background: `linear-gradient(135deg, #FFFFFF 0%, ${currentTrack.accentColor} 100%)`,
                    boxShadow: isPlaying
                      ? `0 0 16px ${currentTrack.glowColor}`
                      : undefined,
                  }}
                >
                  {isLoading ? (
                    <Loader2 size={13} className="animate-spin text-slate-950" />
                  ) : isPlaying ? (
                    <Pause size={13} className="fill-current" />
                  ) : (
                    <Play size={13} className="translate-x-0.5 fill-current" />
                  )}
                </button>
              )}

              {/* Mini Real-Time Audio-Reactive Visualizer Canvas */}
              <div
                onClick={() => setIsExpanded(true)}
                className="cursor-pointer shrink-0"
                title="Click to expand controls"
              >
                <canvas
                  ref={miniVisualizerCanvasRef}
                  width={34}
                  height={18}
                  className="w-[34px] h-[18px]"
                  aria-hidden="true"
                />
              </div>

              {/* Track Title & Artist */}
              <div
                onClick={() => setIsExpanded(true)}
                className="flex flex-col cursor-pointer max-w-[110px] sm:max-w-[130px] overflow-hidden select-none"
                title="Click to expand player"
              >
                <span className="text-xs font-semibold text-white truncate tracking-tight font-heading leading-tight">
                  {currentTrack.title}
                </span>
                <span className="text-[10px] text-slate-400 truncate font-sans leading-tight">
                  {hasAudioError
                    ? errorMessage || "Unavailable"
                    : isPlaying
                    ? currentTrack.artist
                    : "Soundtrack"}
                </span>
              </div>

              {/* Expand Chevron Toggle */}
              <button
                onClick={() => setIsExpanded(true)}
                type="button"
                aria-label="Expand player"
                title="Expand 3D player"
                className="p-1.5 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors shrink-0"
              >
                <ChevronUp size={16} />
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </aside>
  );
};