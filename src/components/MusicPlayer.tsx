"use client";

import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, SkipForward, Music } from "lucide-react";

interface Track {
  title: string;
  artist: string;
  src: string;
}

const PLAYLIST: Track[] = [
  {
    title: "Family Affair",
    artist: "Mary J. Blige",
    src: "/music/Family Affair - Mary J. Blige.mp3",
  },
  {
    title: "Girl Like Me",
    artist: "Black Eyed Peas",
    src: "/music/Girl Like Me - Hot Black Eyed Peas.mp3",
  },
];

export const MusicPlayer: React.FC = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [isExpanded, setIsExpanded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentTrack = PLAYLIST[currentTrackIndex];

  // Initialize Audio with Autoplay
  useEffect(() => {
    const savedMute = localStorage.getItem("saimon_portfolio_mute");
    const initialMute = savedMute === "true";
    if (savedMute !== null) {
      setIsMuted(initialMute);
    }

    const audio = new Audio();
    audio.src = currentTrack.src;
    audio.preload = "auto";
    audio.volume = initialMute ? 0 : volume;

    const onTimeUpdate = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    const onLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const onEnded = () => {
      // Auto-advance to next track
      setCurrentTrackIndex((prev) => (prev + 1) % PLAYLIST.length);
    };

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("ended", onEnded);

    audioRef.current = audio;

    // Autoplay attempt with seamless fallback to first user interaction
    const attemptAutoplay = () => {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            // Browser blocked un-interacted autoplay: start on first touch, click, scroll or key
            const startOnInteraction = () => {
              if (audioRef.current && audioRef.current.paused) {
                audioRef.current
                  .play()
                  .then(() => setIsPlaying(true))
                  .catch(() => {});
              }
              cleanupListeners();
            };

            const cleanupListeners = () => {
              window.removeEventListener("pointerdown", startOnInteraction);
              window.removeEventListener("click", startOnInteraction);
              window.removeEventListener("scroll", startOnInteraction);
              window.removeEventListener("keydown", startOnInteraction);
              window.removeEventListener("touchstart", startOnInteraction);
            };

            window.addEventListener("pointerdown", startOnInteraction, { once: true, passive: true });
            window.addEventListener("click", startOnInteraction, { once: true, passive: true });
            window.addEventListener("scroll", startOnInteraction, { once: true, passive: true });
            window.addEventListener("keydown", startOnInteraction, { once: true, passive: true });
            window.addEventListener("touchstart", startOnInteraction, { once: true, passive: true });
          });
      }
    };

    attemptAutoplay();

    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("ended", onEnded);
      audioRef.current = null;
    };
  }, []);

  // Handle Track Changes
  useEffect(() => {
    if (audioRef.current) {
      const wasPlaying = isPlaying;
      audioRef.current.src = currentTrack.src;
      audioRef.current.load();
      if (wasPlaying) {
        audioRef.current.play().catch(() => setIsPlaying(false));
      }
    }
  }, [currentTrackIndex]);

  // Handle Play/Pause
  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  // Handle Mute Toggle
  const toggleMute = () => {
    if (!audioRef.current) return;
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    audioRef.current.muted = nextMute;
    localStorage.setItem("saimon_portfolio_mute", String(nextMute));
  };

  // Handle Volume Change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (audioRef.current) {
      audioRef.current.volume = val;
      if (val > 0 && isMuted) {
        setIsMuted(false);
        audioRef.current.muted = false;
      }
    }
  };

  // Next Track
  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % PLAYLIST.length);
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds === 0) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <aside
      aria-label="Background music player"
      className="fixed bottom-5 right-5 z-40 transition-all duration-300"
    >
      <div
        className={`glass-panel rounded-full p-2 border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.7)] flex items-center gap-3 transition-all ${
          isExpanded ? "pr-4" : "pr-3"
        }`}
      >
        {/* Play / Pause Main Button */}
        <button
          onClick={togglePlay}
          type="button"
          className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center hover:bg-[#9fbdff] transition-all hover:scale-105 shrink-0"
          title={isPlaying ? "Pause soundtrack" : "Play soundtrack"}
          aria-label={isPlaying ? "Pause soundtrack" : "Play soundtrack"}
        >
          {isPlaying ? <Pause size={14} /> : <Play size={14} className="translate-x-0.5" />}
        </button>

        {/* Animated Sound Wave Bars */}
        <div
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1 cursor-pointer py-1"
          title="Click to view player details"
        >
          <span
            className={`w-0.5 rounded-full bg-[#9fbdff] transition-all duration-300 ${
              isPlaying ? "h-4 animate-pulse" : "h-1.5 opacity-40"
            }`}
          />
          <span
            className={`w-0.5 rounded-full bg-[#9fbdff] transition-all duration-300 ${
              isPlaying ? "h-6 animate-pulse delay-75" : "h-2.5 opacity-40"
            }`}
          />
          <span
            className={`w-0.5 rounded-full bg-[#9fbdff] transition-all duration-300 ${
              isPlaying ? "h-3 animate-pulse delay-150" : "h-1.5 opacity-40"
            }`}
          />
          <span
            className={`w-0.5 rounded-full bg-[#9fbdff] transition-all duration-300 ${
              isPlaying ? "h-5 animate-pulse delay-100" : "h-2 opacity-40"
            }`}
          />
        </div>

        {/* Track Details & Controls */}
        <div
          className="flex items-center gap-3 overflow-hidden cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="max-w-[120px] sm:max-w-[150px]">
            <div className="text-[11px] font-semibold text-white truncate tracking-tight">
              {currentTrack.title}
            </div>
            <div className="text-[10px] text-[#777777] truncate font-mono">
              {isPlaying ? currentTrack.artist : "Soundtrack"}
            </div>
          </div>
        </div>

        {/* Extended Controls (when expanded or on desktop) */}
        {isExpanded && (
          <div className="flex items-center gap-2 pl-2 border-l border-white/10">
            {/* Skip to Next Track */}
            <button
              onClick={nextTrack}
              type="button"
              className="p-1.5 rounded-full text-[#888888] hover:text-white hover:bg-white/10 transition-colors"
              title="Next Track"
              aria-label="Next track"
            >
              <SkipForward size={13} />
            </button>

            {/* Mute Button */}
            <button
              onClick={toggleMute}
              type="button"
              className="p-1.5 rounded-full text-[#888888] hover:text-white hover:bg-white/10 transition-colors"
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
              className="w-14 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#9fbdff]"
              title={`Volume: ${Math.round(volume * 100)}%`}
              aria-label="Volume slider"
            />
          </div>
        )}
      </div>
    </aside>
  );
};
