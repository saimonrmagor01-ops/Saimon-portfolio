"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Menu, X, Volume2, VolumeX } from "lucide-react";

interface NavbarProps {
  activeSection?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection: propActive }) => {
  const [activeSection, setActiveSection] = useState<string>("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [gainNode, setGainNode] = useState<GainNode | null>(null);

  // Nav items
  const navItems = [
    { label: "Home", href: "#home", id: "home" },
    { label: "About", href: "#about", id: "about" },
    { label: "Creative", href: "#creative-studio", id: "creative-studio" },
    { label: "Development", href: "#development-studio", id: "development-studio" },
    { label: "Projects", href: "#projects", id: "projects" },
    { label: "Skills", href: "#skills", id: "skills" },
    { label: "Experience", href: "#experience", id: "experience" },
    { label: "Services", href: "#services", id: "services" },
    { label: "Contact", href: "#contact", id: "contact" },
  ];

  // Scroll listener for sticky background & active section
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = navItems.map((item) => document.getElementById(item.id));
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        if (sec && sec.offsetTop <= scrollPos) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Web Audio subtle cinematic ambient drone generator (zero external assets needed)
  const toggleAmbientSound = () => {
    if (!isAudioPlaying) {
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = audioContext || new AudioCtx();
        if (ctx.state === "suspended") {
          ctx.resume();
        }

        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
        masterGain.gain.exponentialRampToValueAtTime(0.04, ctx.currentTime + 2);
        masterGain.connect(ctx.destination);

        // Low frequency cinematic drone oscillators
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();

        filter.type = "lowpass";
        filter.frequency.setValueAtTime(240, ctx.currentTime);

        osc1.type = "sine";
        osc1.frequency.setValueAtTime(55, ctx.currentTime); // A1 note

        osc2.type = "triangle";
        osc2.frequency.setValueAtTime(82.4, ctx.currentTime); // E2 note

        osc1.connect(filter);
        osc2.connect(filter);
        filter.connect(masterGain);

        osc1.start();
        osc2.start();

        setAudioContext(ctx);
        setGainNode(masterGain);
        setIsAudioPlaying(true);
      } catch {
        // AudioContext not supported or blocked
      }
    } else {
      if (gainNode && audioContext) {
        gainNode.gain.setValueAtTime(gainNode.gain.value, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.8);
        setTimeout(() => {
          setIsAudioPlaying(false);
        }, 850);
      } else {
        setIsAudioPlaying(false);
      }
    }
  };

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-3 sm:py-4 px-4 sm:px-8 flex justify-center`}
      >
        <div
          className={`w-full max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 py-2.5 sm:py-3 rounded-full border transition-all duration-300 ${
            isScrolled
              ? "bg-[#09090b]/85 backdrop-blur-xl border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
              : "bg-[#09090b]/60 backdrop-blur-md border-white/[0.06]"
          }`}
        >
          {/* Brand */}
          <a
            href="#home"
            className="flex items-center gap-2.5 group focus-visible:ring-1 focus-visible:ring-accent-blue rounded-full"
            aria-label="Saimon Rana Magar Home"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#9fbdff] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#9fbdff]"></span>
            </span>
            <div className="flex items-baseline gap-1.5 font-bold tracking-wider text-xs sm:text-sm text-white">
              <span>SAIMON</span>
              <span className="text-[#686868] font-normal tracking-normal text-[11px] hidden sm:inline">
                / PORTFOLIO
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 text-xs font-medium text-[#92928f]">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  className={`relative px-3 py-1.5 rounded-full transition-colors duration-200 hover:text-white ${
                    isActive ? "text-white font-semibold" : "text-[#8e8e93]"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-white/[0.08] rounded-full border border-white/[0.12] -z-10"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Actions: Ambient Audio & Contact CTA */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Ambient Sound Toggle */}
            <button
              onClick={toggleAmbientSound}
              type="button"
              className={`p-2 rounded-full border transition-all text-xs flex items-center justify-center ${
                isAudioPlaying
                  ? "border-[#9fbdff]/50 bg-[#9fbdff]/10 text-[#9fbdff]"
                  : "border-white/10 text-[#888888] hover:text-white hover:border-white/20"
              }`}
              title={isAudioPlaying ? "Mute ambient audio" : "Play subtle ambient soundscape"}
              aria-label={isAudioPlaying ? "Mute ambient audio" : "Play ambient audio"}
            >
              {isAudioPlaying ? <Volume2 size={14} className="animate-pulse" /> : <VolumeX size={14} />}
            </button>

            {/* Direct CTA */}
            <a
              href="#contact"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium bg-white text-black hover:bg-[#9fbdff] hover:text-black transition-all duration-200 font-semibold"
            >
              <span>Let&apos;s Talk</span>
              <ArrowUpRight size={13} />
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="lg:hidden p-2 text-white hover:text-[#9fbdff] transition-colors"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-4 top-20 z-40 bg-[#0e0e12]/95 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 shadow-2xl lg:hidden flex flex-col gap-4"
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-xs uppercase tracking-widest text-[#777777]">Navigation</span>
              <span className="text-[11px] text-[#9fbdff]">Saimon Rana Magar</span>
            </div>

            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={closeMenu}
                  className={`text-sm py-2 px-3 rounded-lg transition-colors flex items-center justify-between ${
                    activeSection === item.id
                      ? "bg-white/10 text-white font-medium"
                      : "text-[#a0a0a0] hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span>{item.label}</span>
                  <span className="text-[10px] text-[#555555]">↗</span>
                </a>
              ))}
            </div>

            <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
              <a
                href="#contact"
                onClick={closeMenu}
                className="w-full text-center py-2.5 rounded-full text-xs font-semibold bg-white text-black hover:bg-[#9fbdff] transition-colors"
              >
                Let&apos;s Collaborate ↗
              </a>
              <div className="text-center text-[11px] text-[#666666]">
                Based in Nepal • Available for Worldwide Collaborations
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
