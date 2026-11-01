"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Sparkles } from "lucide-react";
import { SOCIAL_LINKS } from "@/data/socials";

// Module-level lifecycle flag: ensures the popup only displays once per fresh visit/reload
// and NEVER re-triggers during internal navigation, re-renders, or section hopping.
let hasDismissedInCurrentVisit = false;

export const WelcomePopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [placeholderNotice, setPlaceholderNotice] = useState<string | null>(null);

  useEffect(() => {
    // 1. Clean up outdated permanent flags from previous builds
    try {
      localStorage.removeItem("saimon_welcome_shown");
      localStorage.removeItem("saimon_popup_closed");
      localStorage.removeItem("saimon_welcome_dismissed");
      sessionStorage.removeItem("saimon_welcome_shown");
    } catch {
      // Safe fallback if storage is restricted
    }

    // 2. Only show if not already dismissed in this visit
    if (hasDismissedInCurrentVisit) {
      return;
    }

    // Smooth entrance timer (allows initial DOM & font paint)
    const timer = setTimeout(() => {
      if (!hasDismissedInCurrentVisit) {
        setIsOpen(true);
      }
    }, 600);

    // ESC key listener for accessibility
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

  const handleClose = () => {
    hasDismissedInCurrentVisit = true;
    setIsOpen(false);
  };

  const handleExplore = () => {
    handleClose();
    // Smooth scroll to the hero or about section
    const target = document.getElementById("about") || document.getElementById("home");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSocialClick = (platform: string, url: string) => {
    if (url.startsWith("[ADD_")) {
      setPlaceholderNotice(`${platform} link is configured in src/data/socials.ts`);
      setTimeout(() => setPlaceholderNotice(null), 3500);
      return;
    }
    window.open(url, "_blank", "noopener,noreferrer");
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
            className="fixed inset-0 bg-[#050817]/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 15 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg rounded-3xl bg-[#101525] border border-[#202A40] p-6 sm:p-8 shadow-[0_25px_80px_rgba(5,8,23,0.95)] z-10 overflow-y-auto max-h-[90vh] text-center"
          >
            {/* Cinematic Radial Ambient Glow */}
            <div
              className="absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full radial-glow-blue opacity-80 blur-3xl pointer-events-none"
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-24 -right-24 w-60 h-60 rounded-full radial-glow-subtle opacity-50 blur-3xl pointer-events-none"
              aria-hidden="true"
            />

            {/* Close Button */}
            <button
              onClick={handleClose}
              type="button"
              className="absolute top-4 right-4 sm:top-5 sm:right-5 w-9 h-9 rounded-full bg-[#080C1E] border border-[#202A40] text-[#94A3B8] hover:text-white hover:border-[#2563EB] flex items-center justify-center transition-colors"
              aria-label="Close welcome popup"
            >
              <X size={16} />
            </button>

            {/* Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#080C1E] border border-[#202A40] text-[11px] font-mono text-[#2563EB] tracking-wider uppercase mb-5">
              <Sparkles size={12} className="text-[#2563EB]" />
              <span>WELCOME TO MY CREATIVE SPACE</span>
            </div>

            {/* Illustrated Portrait Frame */}
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 mx-auto rounded-2xl bg-[#080C1E] border border-[#202A40] p-2 shadow-2xl mb-4 group">
              <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#050817] flex items-center justify-center">
                <Image
                  src="/portrait.png"
                  alt="Saimon Rana Magar Portrait"
                  width={240}
                  height={240}
                  priority
                  className="w-full h-full object-contain sticker-outline select-none transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Viewfinder corner accents */}
              <div className="absolute top-1.5 left-1.5 w-2.5 h-2.5 border-t border-l border-[#2563EB]" />
              <div className="absolute top-1.5 right-1.5 w-2.5 h-2.5 border-t border-r border-[#2563EB]" />
              <div className="absolute bottom-1.5 left-1.5 w-2.5 h-2.5 border-b border-l border-[#2563EB]" />
              <div className="absolute bottom-1.5 right-1.5 w-2.5 h-2.5 border-b border-r border-[#2563EB]" />
            </div>

            {/* Personal Identity */}
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading tracking-tight">
              Saimon Rana Magar
            </h2>
            <div className="text-sm sm:text-base font-semibold text-[#2563EB] tracking-wide mt-1">
              Digital Creator &amp; Developer
            </div>
            <p className="text-xs sm:text-sm text-[#94A3B8] max-w-sm mx-auto mt-2 leading-relaxed">
              AI Filmmaking, Creative Content Production &amp; Web Technology. Based in Nepal.
            </p>

            {/* Social Link Notice if unconfigured */}
            {placeholderNotice && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="my-3 py-1.5 px-3 rounded-lg bg-[#2563EB]/10 border border-[#2563EB]/30 text-xs font-mono text-[#93C5FD]"
              >
                {placeholderNotice}
              </motion.div>
            )}

            {/* Three Direct Contact Buttons */}
            <div className="grid grid-cols-3 gap-2.5 my-6">
              {/* WhatsApp */}
              <button
                type="button"
                onClick={() => handleSocialClick("WhatsApp", SOCIAL_LINKS.WHATSAPP_URL)}
                className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl bg-[#080C1E] border border-[#202A40] text-[#94A3B8] hover:text-[#25D366] hover:border-[#25D366]/40 hover:bg-[#25D366]/10 transition-all group"
                title="Direct message on WhatsApp"
              >
                <div className="w-8 h-8 rounded-lg bg-[#25D366]/10 text-[#25D366] flex items-center justify-center transition-transform group-hover:scale-110">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.842-.981z" />
                  </svg>
                </div>
                <span className="text-xs font-semibold">WhatsApp</span>
              </button>

              {/* Instagram */}
              <button
                type="button"
                onClick={() => handleSocialClick("Instagram", SOCIAL_LINKS.INSTAGRAM_URL)}
                className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl bg-[#080C1E] border border-[#202A40] text-[#94A3B8] hover:text-[#E4405F] hover:border-[#E4405F]/40 hover:bg-[#E4405F]/10 transition-all group"
                title="Connect on Instagram"
              >
                <div className="w-8 h-8 rounded-lg bg-[#E4405F]/10 text-[#E4405F] flex items-center justify-center transition-transform group-hover:scale-110">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </div>
                <span className="text-xs font-semibold">Instagram</span>
              </button>

              {/* Discord */}
              <button
                type="button"
                onClick={() => handleSocialClick("Discord", SOCIAL_LINKS.DISCORD_URL)}
                className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl bg-[#080C1E] border border-[#202A40] text-[#94A3B8] hover:text-[#5865F2] hover:border-[#5865F2]/40 hover:bg-[#5865F2]/10 transition-all group"
                title="Join on Discord"
              >
                <div className="w-8 h-8 rounded-lg bg-[#5865F2]/10 text-[#5865F2] flex items-center justify-center transition-transform group-hover:scale-110">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.893.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                  </svg>
                </div>
                <span className="text-xs font-semibold">Discord</span>
              </button>
            </div>

            {/* Explore Portfolio Action Button */}
            <button
              onClick={handleExplore}
              type="button"
              className="w-full py-3.5 px-6 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-[0_4px_25px_rgba(37,99,235,0.4)] hover:shadow-[0_4px_30px_rgba(37,99,235,0.6)] group"
            >
              <span>Explore Portfolio</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
