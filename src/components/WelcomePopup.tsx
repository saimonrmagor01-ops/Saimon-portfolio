"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Sparkles, Volume2, VolumeX } from "lucide-react";
import { SOCIAL_LINKS } from "@/data/socials";

let hasDismissedInCurrentVisit = false;

type DragonSound = "launch" | "blast";

type DragonSoundBuffers = Record<DragonSound, AudioBuffer>;

type DragonAudioEngine = {
  context: AudioContext;
  masterGain: GainNode;
  buffers: DragonSoundBuffers | null;
  loadPromise: Promise<DragonSoundBuffers> | null;
  sources: Set<AudioBufferSourceNode>;
  stateChangeHandler?: () => void;
};

const SOUND_PREFERENCE_KEY = "saimon_dragon_sfx_enabled";

const playDragonSound = (
  engine: DragonAudioEngine,
  sound: DragonSound
): boolean => {
  const { context, buffers, masterGain, sources } = engine;
  if (!buffers || context.state !== "running") {
    return false;
  }

  const now = context.currentTime;
  const source = context.createBufferSource();
  const envelope = context.createGain();
  const compressor = context.createDynamicsCompressor();

  source.buffer = buffers[sound];
  envelope.gain.setValueAtTime(0.0001, now);
  envelope.gain.exponentialRampToValueAtTime(sound === "launch" ? 0.9 : 1.15, now + (sound === "launch" ? 0.04 : 0.018));
  envelope.gain.setTargetAtTime(sound === "launch" ? 0.68 : 0.95, now + (sound === "launch" ? 0.4 : 0.12), sound === "launch" ? 0.12 : 0.24);
  compressor.threshold.setValueAtTime(sound === "launch" ? -18 : -6, now);
  compressor.knee.setValueAtTime(sound === "launch" ? 18 : 6, now);
  compressor.ratio.setValueAtTime(sound === "launch" ? 8 : 2.5, now);
  compressor.attack.setValueAtTime(0.003, now);
  compressor.release.setValueAtTime(0.24, now);
  source.connect(envelope);
  envelope.connect(compressor);
  compressor.connect(masterGain);
  sources.add(source);
  source.addEventListener("ended", () => {
    sources.delete(source);
    source.disconnect();
    envelope.disconnect();
    compressor.disconnect();
  }, { once: true });
  source.start(now);
  return true;
};

export const WelcomePopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [soundPreferenceLoaded, setSoundPreferenceLoaded] = useState(false);
  const [soundUnlocked, setSoundUnlocked] = useState(false);
  const [soundInitializing, setSoundInitializing] = useState(false);
  const [soundError, setSoundError] = useState("");
  const [dragonRun, setDragonRun] = useState(0);
  const engineRef = useRef<DragonAudioEngine | null>(null);
  const soundEnabledRef = useRef(true);
  const soundUnlockedRef = useRef(false);
  const isOpenRef = useRef(false);
  const soundUnlockingRef = useRef(false);
  const audioWarningRef = useRef("");
  const playedDragonSoundsRef = useRef<{ run: number; sounds: Set<DragonSound> }>({
    run: 0,
    sounds: new Set(),
  });

  useEffect(() => {
    try {
      localStorage.removeItem("saimon_welcome_shown");
      localStorage.removeItem("saimon_popup_closed");
      sessionStorage.removeItem("saimon_welcome_shown");
    } catch {}

    try {
      const savedPreference = localStorage.getItem(SOUND_PREFERENCE_KEY);
      soundEnabledRef.current = savedPreference !== "false";
      setSoundEnabled(soundEnabledRef.current);
      if (savedPreference !== "true" && savedPreference !== "false") {
        localStorage.setItem(SOUND_PREFERENCE_KEY, String(soundEnabledRef.current));
      }
    } catch (error) {
      if (process.env.NODE_ENV !== "production") {
        console.warn("[WelcomePopup] Could not restore the SFX preference.", error);
      }
    }
    setSoundPreferenceLoaded(true);

    if (hasDismissedInCurrentVisit) {
      return;
    }

    const timer = setTimeout(() => {
      if (!hasDismissedInCurrentVisit) {
        setIsOpen(true);
      }
    }, 700);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    isOpenRef.current = isOpen;
  }, [isOpen]);

  const restartDragonIntro = () => {
    const engine = engineRef.current;
    if (
      soundEnabledRef.current &&
      soundUnlockedRef.current &&
      engine?.context.state === "running"
    ) {
      setDragonRun((run) => run + 1);
    }
  };

  const updateSoundPreference = (enabled: boolean) => {
    soundEnabledRef.current = enabled;
    setSoundEnabled(enabled);
    setSoundError("");

    try {
      localStorage.setItem(SOUND_PREFERENCE_KEY, String(enabled));
    } catch (error) {
      if (process.env.NODE_ENV !== "production") {
        console.warn("[WelcomePopup] Could not save the SFX preference.", error);
      }
      setSoundError("This browser could not save your sound preference.");
    }

    const engine = engineRef.current;
    if (!engine || engine.context.state === "closed") {
      return;
    }

    const now = engine.context.currentTime;
    engine.masterGain.gain.cancelScheduledValues(now);
    engine.masterGain.gain.setValueAtTime(enabled ? 1 : 0, now);
    if (!enabled) {
      engine.sources.forEach((source) => source.stop());
    }
  };

  const activateDragonSound = async (): Promise<boolean> => {
    if (!soundEnabledRef.current || soundUnlockingRef.current) {
      return false;
    }

    soundUnlockingRef.current = true;
    setSoundInitializing(true);
    let newlyReady = false;
    try {
      const AudioContextConstructor =
        window.AudioContext ||
        (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextConstructor) {
        throw new Error("Web Audio is not supported in this browser.");
      }

      let engine = engineRef.current;
      if (!engine || engine.context.state === "closed") {
        const context = new AudioContextConstructor();
        const masterGain = context.createGain();
        masterGain.gain.value = soundEnabledRef.current ? 1 : 0;
        masterGain.connect(context.destination);
        const newEngine: DragonAudioEngine = {
          context,
          masterGain,
          buffers: null,
          loadPromise: null,
          sources: new Set(),
        };
        engine = newEngine;
        engineRef.current = newEngine;
        newEngine.stateChangeHandler = () => {
          if (engineRef.current !== newEngine) {
            return;
          }
          const running = newEngine.context.state === "running" && newEngine.buffers !== null;
          soundUnlockedRef.current = running;
          setSoundUnlocked(running);
        };
        context.addEventListener("statechange", newEngine.stateChangeHandler);
      }

      const activeEngine = engine;
      if (!activeEngine) {
        throw new Error("The audio engine could not be initialized.");
      }

      if (activeEngine.context.state === "closed") {
        throw new Error("The browser closed the audio context.");
      }

      if (activeEngine.context.state !== "running") {
        await activeEngine.context.resume();
      }
      if (activeEngine.context.state !== "running") {
        throw new Error("The browser kept the audio context suspended.");
      }

      if (!activeEngine.buffers) {
        if (!activeEngine.loadPromise) {
          const context = activeEngine.context;
          activeEngine.loadPromise = (async () => {
            const paths = [
              "/sounds/dragon-fire-launch.wav",
              "/sounds/dragon-fire-blast.wav",
            ] as const;
            const responses = await Promise.all(paths.map((path) => fetch(path)));
            const failedResponse = responses.find((response) => !response.ok);
            if (failedResponse) {
              throw new Error(`Could not load ${failedResponse.url} (${failedResponse.status}).`);
            }
            const data = await Promise.all(responses.map((response) => response.arrayBuffer()));
            const [launch, blast] = await Promise.all(
              data.map((audioData) => context.decodeAudioData(audioData))
            );
            return { launch, blast };
          })();
        }

        try {
          activeEngine.buffers = await activeEngine.loadPromise;
        } catch (error) {
          activeEngine.loadPromise = null;
          throw error;
        }
      }

      if (!soundEnabledRef.current) {
        return false;
      }
      newlyReady = !soundUnlockedRef.current;
      soundUnlockedRef.current = true;
      setSoundUnlocked(true);
      setSoundError("");
      audioWarningRef.current = "";
      if (newlyReady && isOpenRef.current) {
        setDragonRun((run) => run + 1);
      }
      return true;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown audio initialization error.";
      if (audioWarningRef.current !== message) {
        if (process.env.NODE_ENV !== "production") {
          console.warn("[WelcomePopup] Dragon SFX could not be enabled:", error);
        }
        audioWarningRef.current = message;
      }
      setSoundUnlocked(false);
      soundUnlockedRef.current = false;
      setSoundError("Could not start sound effects. Tap the SFX button to retry.");
      return false;
    } finally {
      soundUnlockingRef.current = false;
      setSoundInitializing(false);
    }
  };

  const handleDragonAnimationStart = (event: React.AnimationEvent<HTMLElement>) => {
    if (event.target !== event.currentTarget) {
      return;
    }

    const animationName = event.animationName;
    const sound: DragonSound | null =
      animationName === "welcome-fireball-launch"
        ? "launch"
        : animationName === "welcome-dragon-boom"
          ? "blast"
          : null;
    const engine = engineRef.current;
    if (!sound || !soundEnabledRef.current || !soundUnlockedRef.current || !engine) {
      return;
    }

    if (playedDragonSoundsRef.current.run !== dragonRun) {
      playedDragonSoundsRef.current = { run: dragonRun, sounds: new Set() };
    }
    if (playedDragonSoundsRef.current.sounds.has(sound)) {
      return;
    }
    try {
      if (!playDragonSound(engine, sound)) {
        return;
      }
      playedDragonSoundsRef.current.sounds.add(sound);
    } catch (error) {
      playedDragonSoundsRef.current.sounds.delete(sound);
      const message = error instanceof Error ? error.message : "Unknown audio playback error.";
      if (audioWarningRef.current !== message) {
        if (process.env.NODE_ENV !== "production") {
          console.warn(`[WelcomePopup] Dragon ${sound} sound could not play:`, error);
        }
        audioWarningRef.current = message;
      }
      setSoundError("A dragon sound could not play. Tap the SFX button to retry.");
    }
  };

  useEffect(() => () => {
    const engine = engineRef.current;
    if (engine) {
      if (engine.stateChangeHandler) {
        engine.context.removeEventListener("statechange", engine.stateChangeHandler);
      }
      if (engine.context.state !== "closed") {
        engine.sources.forEach((source) => source.stop());
        void engine.context.close();
      }
    }
  }, []);

  const handleSoundToggle = async () => {
    if (!soundPreferenceLoaded || soundUnlockingRef.current) {
      return;
    }

    if (soundEnabledRef.current) {
      const engine = engineRef.current;
      if (!soundUnlockedRef.current || engine?.context.state !== "running") {
        await activateDragonSound();
        return;
      }

      updateSoundPreference(false);
      return;
    }

    updateSoundPreference(true);
    if (await activateDragonSound()) {
      restartDragonIntro();
    }
  };

  const replayDragonIntro = async () => {
    if (!soundEnabledRef.current) {
      return;
    }
    if (await activateDragonSound()) {
      restartDragonIntro();
    }
  };

  const handleClose = () => {
    hasDismissedInCurrentVisit = true;
    setIsOpen(false);
  };

  const handleExplore = () => {
    handleClose();
    const target = document.getElementById("about") || document.getElementById("home");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Welcome to Saimon Rana Magar's Portfolio"
          className="fixed inset-0 z-[10001] flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleClose}
            className="fixed inset-0 z-0 bg-[#050817]/85 backdrop-blur-md"
          />

          <div
            key={dragonRun}
            className="welcome-dragon-flight"
            aria-hidden="true"
          >
            <div className="welcome-dragon-pass">
              <svg
                className="welcome-dragon"
                viewBox="0 0 460 230"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                focusable="false"
              >
                <defs>
                  <linearGradient id="dragon-scale" x1="140" y1="68" x2="390" y2="190" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#5279AD" />
                    <stop offset="0.3" stopColor="#263F6B" />
                    <stop offset="0.72" stopColor="#101D39" />
                    <stop offset="1" stopColor="#241A3E" />
                  </linearGradient>
                  <linearGradient id="dragon-edge" x1="200" y1="38" x2="373" y2="183" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#BAE6FD" stopOpacity="0.95" />
                    <stop offset="0.58" stopColor="#60A5FA" stopOpacity="0.82" />
                    <stop offset="1" stopColor="#C4B5FD" stopOpacity="0.78" />
                  </linearGradient>
                  <linearGradient id="dragon-wing" x1="181" y1="66" x2="267" y2="151" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#526F9E" />
                    <stop offset="0.58" stopColor="#1B2B4B" />
                    <stop offset="1" stopColor="#111629" />
                  </linearGradient>
                  <linearGradient id="dragon-belly" x1="239" y1="151" x2="345" y2="175" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#647DA5" stopOpacity="0.88" />
                    <stop offset="1" stopColor="#34305A" stopOpacity="0.72" />
                  </linearGradient>
                </defs>
                <path
                  d="M58 171C105 150 139 137 185 145C150 161 126 178 94 189C140 184 169 169 202 153"
                  stroke="url(#dragon-edge)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  opacity="0.52"
                />
                <path d="M225 145C207 112 186 88 155 67C164 103 179 134 207 155Z" fill="url(#dragon-wing)" stroke="url(#dragon-edge)" strokeWidth="2" strokeLinejoin="round" opacity="0.88" />
                <path d="M159 72C183 99 199 122 211 148M177 91L207 127" stroke="#BAE6FD" strokeOpacity="0.34" strokeWidth="1.5" />
                <g className="welcome-dragon-wing">
                  <path
                    d="M218 143C225 105 235 59 223 18C259 35 311 56 346 103C315 91 284 105 264 133C247 134 231 141 218 151Z"
                    fill="url(#dragon-wing)"
                    stroke="url(#dragon-edge)"
                    strokeWidth="2.6"
                    strokeLinejoin="round"
                  />
                  <path d="M226 24C242 67 250 101 251 135M239 47C269 68 291 86 320 97M247 73C269 89 280 108 284 124M273 87C293 91 310 96 329 104" stroke="#BAE6FD" strokeOpacity="0.62" strokeWidth="1.8" />
                </g>
                <path d="M230 153C245 174 255 194 255 214C277 193 287 180 289 167L278 153Z" fill="url(#dragon-scale)" stroke="url(#dragon-edge)" strokeWidth="2" strokeLinejoin="round" opacity="0.78" />
                <path d="M250 161L255 207M264 167L276 188" stroke="#7DD3FC" strokeOpacity="0.48" strokeWidth="1.5" />
                <path
                  d="M183 137C205 120 231 116 255 125C273 131 289 144 313 145L347 133L368 139L390 131L380 145L405 153L384 163L353 158C337 177 309 184 280 174C245 162 215 160 188 153L166 159L151 151L170 143L158 135L183 137Z"
                  transform="translate(0 6)"
                  fill="#030817"
                  opacity="0.58"
                />
                <path
                  d="M183 137C205 120 231 116 255 125C273 131 289 144 313 145L347 133L368 139L390 131L380 145L405 153L384 163L353 158C337 177 309 184 280 174C245 162 215 160 188 153L166 159L151 151L170 143L158 135L183 137Z"
                  fill="url(#dragon-scale)"
                  stroke="url(#dragon-edge)"
                  strokeWidth="2.6"
                  strokeLinejoin="round"
                />
                <path d="M244 125L249 108L260 125L268 111L279 131L289 120L300 140M350 136L356 120L363 134M367 139L379 126L380 141M194 153L184 172L198 164L207 158M270 171L262 190L278 178L289 174" fill="url(#dragon-scale)" stroke="url(#dragon-edge)" strokeWidth="2.2" strokeLinejoin="round" />
                <path d="M244 158C263 166 278 170 295 171C310 173 326 170 339 164C321 180 298 181 280 175C266 171 254 166 244 158Z" fill="url(#dragon-belly)" opacity="0.74" />
                <path d="M230 143C250 140 270 143 289 151M238 149C251 148 263 151 275 156M299 149C315 154 330 154 345 150M304 156C318 160 330 159 340 157" stroke="#BAE6FD" strokeOpacity="0.34" strokeWidth="1.3" strokeLinecap="round" />
                <path d="M286 152C306 162 327 164 349 157M298 162C313 170 329 171 340 166" stroke="#7DD3FC" strokeOpacity="0.55" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M374 151L385 151" stroke="#FED7AA" strokeWidth="2.4" strokeLinecap="round" />
                <circle cx="370" cy="143" r="5" fill="#F97316" opacity="0.32" />
                <circle cx="370" cy="143" r="2.4" fill="#FFF7D6" />
              </svg>
              <span
                className="welcome-dragon-fireball"
                onAnimationStart={handleDragonAnimationStart}
              />
            </div>
            <div
              className="welcome-dragon-impact"
              onAnimationStart={handleDragonAnimationStart}
            >
              <span className="welcome-dragon-shockwave" />
              <span className="welcome-dragon-shockwave welcome-dragon-shockwave-inner" />
              <span className="welcome-dragon-sparks" aria-hidden="true">
                {Array.from({ length: 8 }, (_, index) => (
                  <span key={index} />
                ))}
              </span>
            </div>
            <div className="welcome-impact-copy">
              <span>WELCOME</span>
              <small>TO MY CREATIVE WORLD</small>
            </div>
          </div>

          <div className="welcome-snowfall" aria-hidden="true">
            {Array.from({ length: 10 }, (_, index) => (
              <span key={index} />
            ))}
            <div className="welcome-snowflakes">
              {Array.from({ length: 5 }, (_, index) => (
                <span key={index}>❄</span>
              ))}
            </div>
          </div>
          <div className="welcome-lightfall" aria-hidden="true">
            {Array.from({ length: 3 }, (_, index) => (
              <span key={index} />
            ))}
          </div>

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg rounded-3xl bg-[#0D1224] border border-[#1C2438] p-6 sm:p-8 shadow-2xl z-10 overflow-y-auto max-h-[90vh] text-center"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              type="button"
              className="absolute top-4 right-4 sm:top-5 sm:right-5 w-9 h-9 rounded-full bg-[#070B18] border border-[#1C2438] text-[#94A3B8] hover:text-white hover:border-[#2563EB] flex items-center justify-center transition-colors"
              aria-label="Close welcome popup"
            >
              <X size={16} />
            </button>
            <button
              onClick={() => void handleSoundToggle()}
              type="button"
              data-dragon-sound-toggle
              disabled={!soundPreferenceLoaded || soundInitializing}
              className={`absolute top-4 left-4 sm:top-5 sm:left-5 h-9 px-2.5 rounded-full border flex items-center justify-center gap-1.5 transition-colors ${
                soundEnabled
                  ? "bg-[#10243A] border-[#38BDF8] text-[#7DD3FC]"
                  : "bg-[#070B18] border-[#1C2438] text-[#94A3B8] hover:text-white hover:border-[#2563EB]"
              }`}
              aria-label={
                soundInitializing
                  ? "Activating sound effects"
                  : soundEnabled
                    ? soundUnlocked ? "Mute sound effects" : "Tap to enable sound effects"
                    : "Unmute sound effects"
              }
              aria-pressed={soundEnabled && soundUnlocked}
              aria-busy={soundInitializing}
              title={
                soundInitializing
                  ? "Activating sound effects"
                  : soundEnabled
                    ? soundUnlocked ? "Mute sound effects" : "Tap to enable sound effects"
                    : "Unmute sound effects"
              }
            >
              {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
              <span className="text-[9px] font-mono font-semibold tracking-wider">
                {soundInitializing
                  ? "LOADING SOUND"
                  : soundEnabled
                    ? soundUnlocked ? "SOUND ON" : "TAP TO ENABLE SOUND"
                    : "SOUND OFF"}
              </span>
            </button>
            {soundEnabled && soundUnlocked && (
              <button
                onClick={replayDragonIntro}
                type="button"
                className="absolute top-[4.25rem] left-4 sm:left-5 rounded-full border border-[#1C2438] bg-[#070B18]/90 px-2.5 py-1 text-[9px] font-mono font-semibold tracking-wider text-[#BAE6FD] transition-colors hover:border-[#38BDF8] hover:text-white"
                aria-label="Replay dragon fire and blast sound effects"
                title="Replay dragon intro with sound"
              >
                REPLAY SFX
              </button>
            )}
            {soundError && (
              <span
                className="absolute top-14 left-4 z-20 max-w-48 rounded-lg border border-amber-400/30 bg-[#0D1224] px-2 py-1 text-left text-[10px] text-amber-200 sm:left-5"
                role="status"
                aria-live="polite"
              >
                {soundError}
              </span>
            )}

            {/* Top Eyebrow */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#070B18] border border-[#1C2438] text-[11px] font-mono text-[#38BDF8] tracking-wider uppercase mb-5">
              <Sparkles size={12} className="text-[#38BDF8]" />
              <span>Personal Creative Portfolio</span>
            </div>

            {/* Portrait Frame */}
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 mx-auto rounded-2xl bg-[#070B18] border border-[#1C2438] p-1.5 shadow-xl mb-4 group">
              <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#050817] flex items-center justify-center">
                <Image
                  src="/saimon-avatar.png"
                  alt="Saimon Rana Magar Portrait"
                  width={240}
                  height={240}
                  priority
                  className="w-full h-full object-cover select-none transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>

            {/* Personal Greeting */}
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading tracking-tight">
              Saimon Rana Magar
            </h2>
            <div className="text-sm font-semibold text-[#38BDF8] mt-0.5">
              Digital Creator, AI Filmmaker &amp; Web Developer
            </div>
            <p className="text-xs sm:text-sm text-[#94A3B8] max-w-sm mx-auto mt-2 leading-relaxed">
              Based in Kathmandu, Nepal. Welcome to my creative portfolio exploring AI cinema, video editing, and modern web applications.
            </p>

            {/* Direct Channels */}
            <div className="grid grid-cols-3 gap-2.5 my-6">
              <a
                href={SOCIAL_LINKS.WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl bg-[#070B18] border border-[#1C2438] text-[#94A3B8] hover:text-[#25D366] hover:border-[#25D366]/40 transition-all group"
                title="Message on WhatsApp"
              >
                <div className="w-8 h-8 rounded-lg bg-[#25D366]/10 text-[#25D366] flex items-center justify-center transition-transform group-hover:scale-110">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.842-.981z" />
                  </svg>
                </div>
                <span className="text-xs font-semibold">WhatsApp</span>
              </a>

              <a
                href={SOCIAL_LINKS.INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl bg-[#070B18] border border-[#1C2438] text-[#94A3B8] hover:text-[#E4405F] hover:border-[#E4405F]/40 transition-all group"
                title="Message on Instagram"
              >
                <div className="w-8 h-8 rounded-lg bg-[#E4405F]/10 text-[#E4405F] flex items-center justify-center transition-transform group-hover:scale-110">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </div>
                <span className="text-xs font-semibold">Instagram</span>
              </a>

              <a
                href={SOCIAL_LINKS.DISCORD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl bg-[#070B18] border border-[#1C2438] text-[#94A3B8] hover:text-[#5865F2] hover:border-[#5865F2]/40 transition-all group"
                title="Connect on Discord"
              >
                <div className="w-8 h-8 rounded-lg bg-[#5865F2]/10 text-[#5865F2] flex items-center justify-center transition-transform group-hover:scale-110">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.893.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                  </svg>
                </div>
                <span className="text-xs font-semibold">Discord</span>
              </a>
            </div>

            {/* Explore Button */}
            <button
              onClick={handleExplore}
              type="button"
              className="w-full py-3.5 px-6 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-md font-heading"
            >
              <span>Explore Selected Work</span>
              <ArrowRight size={16} />
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
