"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { Play, Pause, Volume2, VolumeX, SkipForward, Music, Sparkles } from "lucide-react";

interface Track {
  title: string;
  artist: string;
  src: string;
}

// Safely URI-encoded tracks in public/music/
const PLAYLIST: Track[] = [
  {
    title: "Family Affair",
    artist: "Mary J. Blige",
    src: "/music/Family%20Affair%20-%20Mary%20J.%20Blige.mp3",
  },
  {
    title: "Girl Like Me",
    artist: "Black Eyed Peas",
    src: "/music/Girl%20Like%20Me%20-%20Hot%20Black%20Eyed%20Peas.mp3",
  },
];

// Module-level singletons: Guarantee a single audio instance across renders,
// route changes, and section navigation.
let globalAudio: HTMLAudioElement | null = null;
let hasUserExplicitlyPaused = false;
let globalCurrentTrackIndex = 0;

export const MusicPlayer: React.FC = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(globalCurrentTrackIndex);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [isExpanded, setIsExpanded] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const [hasAudioError, setHasAudioError] = useState(false);
  const [progress, setProgress] = useState(0);

  const currentTrack = PLAYLIST[currentTrackIndex];

  // Helper to safely play audio and handle browser autoplay restrictions
  const startPlayback = useCallback(async (audioEl: HTMLAudioElement) => {
    try {
      setHasAudioError(false);
      const playPromise = audioEl.play();
      if (playPromise !== undefined) {
        await playPromise;
        setIsPlaying(true);
        setAutoplayBlocked(false);
        hasUserExplicitlyPaused = false;
      }
    } catch (err: unknown) {
      // Browser blocked unmuted autoplay (NotAllowedError)
      setIsPlaying(false);
      setAutoplayBlocked(true);
    }
  }, []);

  // Initialize Audio & Attempt Autoplay
  useEffect(() => {
    // 1. Restore saved volume & mute preferences
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

    // 2. Initialize or reuse existing Audio singleton
    if (!globalAudio) {
      const audio = new Audio();
      audio.preload = "auto";
      audio.volume = initialMute ? 0 : initialVolume;
      audio.muted = initialMute;
      audio.src = PLAYLIST[globalCurrentTrackIndex].src;
      globalAudio = audio;
    } else {
      // If already playing in singleton, sync state
      if (!globalAudio.paused) {
        setIsPlaying(true);
      }
    }

    const audio = globalAudio;

    // Time update listener
    const onTimeUpdate = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    // Auto-advance track on end
    const onEnded = () => {
      globalCurrentTrackIndex = (globalCurrentTrackIndex + 1) % PLAYLIST.length;
      setCurrentTrackIndex(globalCurrentTrackIndex);
      audio.src = PLAYLIST[globalCurrentTrackIndex].src;
      startPlayback(audio);
    };

    // Error handler
    const onError = () => {
      setHasAudioError(true);
      setIsPlaying(false);
    };

    // Play/pause sync handlers
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("error", onError);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);

    // 3. Attempt Autoplay on initial mount if not user-paused
    if (!hasUserExplicitlyPaused && audio.paused) {
      startPlayback(audio);
    }

    // 4. Fallback listener: if autoplay was blocked by browser policy,
    // unlock audio automatically on the first user interaction anywhere on the page
    const handleFirstGesture = () => {
      if (globalAudio && !hasUserExplicitlyPaused && globalAudio.paused) {
        startPlayback(globalAudio);
      }
    };

    window.addEventListener("pointerdown", handleFirstGesture, { once: true });
    window.addEventListener("keydown", handleFirstGesture, { once: true });

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("error", onError);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      window.removeEventListener("pointerdown", handleFirstGesture);
      window.removeEventListener("keydown", handleFirstGesture);
    };
  }, [startPlayback]);

  // Handle Track Changes
  useEffect(() => {
    if (!globalAudio) return;
    const isDifferentTrack = globalAudio.src !== window.location.origin + currentTrack.src;
    if (isDifferentTrack) {
      const wasPlaying = !globalAudio.paused;
      globalAudio.src = currentTrack.src;
      globalAudio.load();
      if (wasPlaying || !hasUserExplicitlyPaused) {
        startPlayback(globalAudio);
      }
    }
  }, [currentTrack, startPlayback]);

  // Toggle Play / Pause
  const togglePlay = () => {
    if (!globalAudio) return;

    if (isPlaying) {
      globalAudio.pause();
      setIsPlaying(false);
      hasUserExplicitlyPaused = true;
      setAutoplayBlocked(false);
    } else {
      hasUserExplicitlyPaused = false;
      startPlayback(globalAudio);
    }
  };

  // Explicit user click on "Play Music" prompt
  const handlePlayPrompt = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!globalAudio) return;
    hasUserExplicitlyPaused = false;
    startPlayback(globalAudio);
  };

  // Toggle Mute
  const toggleMute = () => {
    if (!globalAudio) return;
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    globalAudio.muted = nextMute;
    try {
      localStorage.setItem("saimon_portfolio_mute", String(nextMute));
    } catch {}
  };

  // Volume Slider
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

  // Next Track
  const nextTrack = () => {
    globalCurrentTrackIndex = (globalCurrentTrackIndex + 1) % PLAYLIST.length;
    setCurrentTrackIndex(globalCurrentTrackIndex);
    if (globalAudio) {
      globalAudio.src = PLAYLIST[globalCurrentTrackIndex].src;
      startPlayback(globalAudio);
    }
  };

  return (
    <aside
      aria-label="Background music player"
      className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2 transition-all duration-300"
    >
      {/* Autoplay Blocked: Elegant Prompt Pill */}
      {autoplayBlocked && !isPlaying && (
        <button
          onClick={handlePlayPrompt}
          type="button"
          aria-label="Enable and play background soundtrack"
          className="group flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#101525]/95 backdrop-blur-xl border border-[#2563EB] text-white shadow-[0_4px_25px_rgba(37,99,235,0.5)] hover:bg-[#2563EB] transition-all duration-200 animate-bounce"
        >
          <div className="w-5 h-5 rounded-full bg-[#2563EB] group-hover:bg-white text-white group-hover:text-[#2563EB] flex items-center justify-center transition-colors">
            <Play size={10} className="translate-x-0.5" />
          </div>
          <span className="text-xs font-mono font-medium tracking-wide">
            Play Soundtrack
          </span>
          <Sparkles size={11} className="text-[#38BDF8]" />
        </button>
      )}

      {/* Main Floating Music Controller Bar */}
      <div
        className={`bg-[#101525]/95 backdrop-blur-xl rounded-full p-2 border border-[#202A40] shadow-[0_12px_40px_rgba(5,8,23,0.95)] flex items-center gap-3 transition-all ${
          isExpanded ? "pr-4" : "pr-3"
        } ${autoplayBlocked && !isPlaying ? "ring-1 ring-[#2563EB]/40" : ""}`}
      >
        {/* Play / Pause Main Button */}
        <button
          onClick={togglePlay}
          type="button"
          className="w-9 h-9 rounded-full bg-[#2563EB] text-white flex items-center justify-center hover:bg-[#1D4ED8] transition-all hover:scale-105 shrink-0 shadow-[0_0_15px_rgba(37,99,235,0.4)]"
          title={isPlaying ? "Pause soundtrack" : "Play soundtrack"}
          aria-label={isPlaying ? "Pause soundtrack" : "Play soundtrack"}
        >
          {isPlaying ? <Pause size={14} /> : <Play size={14} className="translate-x-0.5" />}
        </button>

        {/* Animated Sound Wave Bars */}
        <div
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1 cursor-pointer py-1"
          title="Click to toggle soundtrack controls"
        >
          <span
            className={`w-0.5 rounded-full bg-[#2563EB] transition-all duration-300 ${
              isPlaying ? "h-4 animate-pulse" : "h-1.5 opacity-40"
            }`}
          />
          <span
            className={`w-0.5 rounded-full bg-[#2563EB] transition-all duration-300 ${
              isPlaying ? "h-6 animate-pulse delay-75" : "h-2.5 opacity-40"
            }`}
          />
          <span
            className={`w-0.5 rounded-full bg-[#2563EB] transition-all duration-300 ${
              isPlaying ? "h-3 animate-pulse delay-150" : "h-1.5 opacity-40"
            }`}
          />
          <span
            className={`w-0.5 rounded-full bg-[#2563EB] transition-all duration-300 ${
              isPlaying ? "h-5 animate-pulse delay-100" : "h-2 opacity-40"
            }`}
          />
        </div>

        {/* Track Details */}
        <div
          className="flex items-center gap-3 overflow-hidden cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="max-w-[120px] sm:max-w-[150px]">
            <div className="text-[11px] font-semibold text-white truncate tracking-tight">
              {hasAudioError ? "Audio Unavailable" : currentTrack.title}
            </div>
            <div className="text-[10px] text-[#94A3B8] truncate font-mono">
              {isPlaying ? currentTrack.artist : autoplayBlocked ? "Click to Play" : "Soundtrack"}
            </div>
          </div>
        </div>

        {/* Extended Controls (when expanded) */}
        {isExpanded && (
          <div className="flex items-center gap-2 pl-2 border-l border-[#202A40]">
            {/* Skip to Next Track */}
            <button
              onClick={nextTrack}
              type="button"
              className="p-1.5 rounded-full text-[#94A3B8] hover:text-white hover:bg-white/5 transition-colors"
              title="Next Track"
              aria-label="Next track"
            >
              <SkipForward size={13} />
            </button>

            {/* Mute Button */}
            <button
              onClick={toggleMute}
              type="button"
              className="p-1.5 rounded-full text-[#94A3B8] hover:text-white hover:bg-white/5 transition-colors"
              title={isMuted ? "Unmute" : "Mute"}
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX size={13} className="text-red-400" /> : <Volume2 size={13} />}
            </button>

            {/* Volume Slider */}
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-14 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#2563EB]"
              title={`Volume: ${Math.round(volume * 100)}%`}
              aria-label="Volume slider"
            />
          </div>
        )}
      </div>
    </aside>
  );
};
