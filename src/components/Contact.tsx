"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MapPin, Clock, ArrowUpRight, Copy, Check, MessageSquare, 
  Layers, X, Sparkles, ShieldAlert 
} from "lucide-react";
import { DIRECT_CONTACT_CONFIG, isValueConfigured } from "@/data/socials";

interface ContactProps {
  selectedService?: string;
  onServiceChange?: (service: string) => void;
}

export const Contact: React.FC<ContactProps> = ({
  selectedService = "",
  onServiceChange,
}) => {
  const [currentTimeNPT, setCurrentTimeNPT] = useState("");
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [copyError, setCopyError] = useState<string | null>(null);

  const { instagram, whatsapp, discord, meta } = DIRECT_CONTACT_CONFIG;

  const isInstagramConfigured = isValueConfigured(instagram.url);
  const isWhatsappConfigured = isValueConfigured(whatsapp.url);
  const isDiscordUrlConfigured = isValueConfigured(discord.url);
  const isDiscordUsernameConfigured = isValueConfigured(discord.username);

  // Real live Nepal time (GMT+5:45)
  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const timeString = new Intl.DateTimeFormat("en-US", {
          timeZone: "Asia/Kathmandu",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        }).format(now);
        setCurrentTimeNPT(timeString);
      } catch {
        setCurrentTimeNPT("12:00 PM NPT");
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const getServiceIntroMessage = () => {
    if (!selectedService) {
      return "Hi Saimon, I saw your portfolio and would like to discuss a project with you.";
    }
    return `Hi Saimon, I saw your work on ${selectedService} and would like to discuss a project with you.`;
  };

  const getWhatsappTargetUrl = () => {
    if (!isWhatsappConfigured) return "#";
    const base = whatsapp.url.trim();
    if (!selectedService) return base;
    const textParam = encodeURIComponent(getServiceIntroMessage());
    return base.includes("?") ? `${base}&text=${textParam}` : `${base}?text=${textParam}`;
  };

  const handleCopy = async (textToCopy: string, fieldId: string) => {
    setCopyError(null);
    try {
      if (!navigator?.clipboard?.writeText) {
        throw new Error("Clipboard API not available");
      }
      await navigator.clipboard.writeText(textToCopy);
      setCopiedField(fieldId);
      setTimeout(() => setCopiedField(null), 2500);
    } catch {
      setCopyError("Could not copy to clipboard. Please copy manually.");
      setTimeout(() => setCopyError(null), 3500);
    }
  };

  const handleClearService = () => {
    if (onServiceChange) {
      onServiceChange("");
    }
  };

  return (
    <section id="contact" className="py-24 sm:py-28 px-4 sm:px-8 border-t border-[#1C2438] relative bg-[#050817]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0D1224] border border-[#1C2438] text-xs font-medium text-[#2563EB] shadow-sm">
            <MessageSquare size={12} className="text-[#2563EB]" />
            <span>08 / DIRECT CONTACT</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tightest text-white leading-tight font-heading">
            Have an idea? <br />
            <span className="text-[#94A3B8] font-normal font-serif italic">Let&apos;s talk.</span>
          </h2>

          <p className="text-sm sm:text-base text-[#94A3B8] max-w-xl mx-auto leading-relaxed">
            Reach out on your preferred platform below. Whether you want to discuss a video project, build a website, or ask a question, I&apos;d love to hear from you.
          </p>
        </div>

        {/* Selected Service Context Pill */}
        <AnimatePresence>
          {selectedService && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="mb-10 p-4 sm:p-5 rounded-2xl border border-[#2563EB]/40 bg-[#0D1224] shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex items-start sm:items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#070B18] border border-[#2563EB]/30 text-[#38BDF8] flex items-center justify-center shrink-0">
                  <Layers size={18} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-[#2563EB] uppercase tracking-wider font-bold">
                      Inquiry Topic
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8] animate-pulse" />
                  </div>
                  <div className="text-sm sm:text-base font-bold text-white font-heading">
                    {selectedService}
                  </div>
                  <p className="text-xs text-[#94A3B8] mt-0.5">
                    WhatsApp will prefill this inquiry automatically.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto self-end sm:self-center">
                <button
                  type="button"
                  onClick={() => handleCopy(getServiceIntroMessage(), "service-intro")}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full border border-[#1C2438] bg-[#070B18] text-xs font-mono text-[#CBD5E1] hover:text-white hover:border-[#2563EB] transition-all min-h-[36px]"
                >
                  {copiedField === "service-intro" ? (
                    <>
                      <Check size={13} className="text-emerald-400" />
                      <span className="text-emerald-400 font-bold">Copied Intro!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={13} className="text-[#38BDF8]" />
                      <span>Copy Intro Message</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleClearService}
                  className="p-2 rounded-full border border-[#1C2438] bg-[#070B18] text-[#94A3B8] hover:text-white transition-colors"
                  aria-label="Clear service selection"
                >
                  <X size={14} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {copyError && (
          <div className="mb-6 p-3 rounded-xl border border-red-500/30 bg-red-950/20 text-xs text-red-300 flex items-center gap-2 max-w-md mx-auto justify-center font-mono">
            <ShieldAlert size={14} className="text-red-400" />
            <span>{copyError}</span>
          </div>
        )}

        {/* 3 Direct Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch mb-12">
          {/* Card 1: WhatsApp */}
          <div className="group relative p-6 sm:p-7 rounded-2xl border border-[#1C2438] bg-[#0D1224] hover:border-[#25D366]/60 transition-all duration-200 flex flex-col justify-between shadow-lg">
            <div>
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#1C2438]">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105"
                  style={{ backgroundColor: whatsapp.accentBg, color: whatsapp.color }}
                >
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.842-.981z" />
                  </svg>
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#25D366] px-2.5 py-1 rounded-full bg-[#25D366]/10 border border-[#25D366]/30 font-bold">
                  Fastest
                </span>
              </div>

              <h3 className="text-xl font-bold text-white font-heading">
                WhatsApp
              </h3>
              <div className="text-xs font-semibold text-[#25D366] mt-0.5">
                {whatsapp.cta}
              </div>

              <div className="mt-3 p-2.5 rounded-xl bg-[#070B18] border border-[#1C2438] text-xs font-mono text-white">
                <span className="text-[#94A3B8] block text-[10px] uppercase">Phone / Chat</span>
                <span>{whatsapp.handle}</span>
              </div>

              <p className="text-xs text-[#94A3B8] mt-4 leading-relaxed">
                {whatsapp.description}
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-[#1C2438]">
              <a
                href={getWhatsappTargetUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#25D366] hover:bg-[#1ebd59] text-[#050817] text-xs font-bold uppercase tracking-wider transition-all min-h-[44px] font-heading shadow-md"
              >
                <span>Chat on WhatsApp</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>

          {/* Card 2: Instagram */}
          <div className="group relative p-6 sm:p-7 rounded-2xl border border-[#1C2438] bg-[#0D1224] hover:border-[#E4405F]/60 transition-all duration-200 flex flex-col justify-between shadow-lg">
            <div>
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#1C2438]">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105"
                  style={{ backgroundColor: instagram.accentBg, color: instagram.color }}
                >
                  <svg className="w-6 h-6 fill-none stroke-current" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#94A3B8] px-2.5 py-1 rounded-full bg-[#070B18] border border-[#1C2438]">
                  DM
                </span>
              </div>

              <h3 className="text-xl font-bold text-white font-heading">
                Instagram
              </h3>
              <div className="text-xs font-semibold text-[#E4405F] mt-0.5">
                {instagram.cta}
              </div>

              <div className="mt-3 p-2.5 rounded-xl bg-[#070B18] border border-[#1C2438] text-xs font-mono text-white">
                <span className="text-[#94A3B8] block text-[10px] uppercase">Handle</span>
                <span>{instagram.handle}</span>
              </div>

              <p className="text-xs text-[#94A3B8] mt-4 leading-relaxed">
                {instagram.description}
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-[#1C2438]">
              <a
                href={instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#070B18] hover:bg-[#E4405F] text-white text-xs font-semibold uppercase tracking-wider border border-[#1C2438] hover:border-[#E4405F] transition-all min-h-[44px] font-heading"
              >
                <span>Send Instagram DM</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>

          {/* Card 3: Discord */}
          <div className="group relative p-6 sm:p-7 rounded-2xl border border-[#1C2438] bg-[#0D1224] hover:border-[#5865F2]/60 transition-all duration-200 flex flex-col justify-between shadow-lg">
            <div>
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#1C2438]">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105"
                  style={{ backgroundColor: discord.accentBg, color: discord.color }}
                >
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.893.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                  </svg>
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#94A3B8] px-2.5 py-1 rounded-full bg-[#070B18] border border-[#1C2438]">
                  Dev Chat
                </span>
              </div>

              <h3 className="text-xl font-bold text-white font-heading">
                Discord
              </h3>
              <div className="text-xs font-semibold text-[#5865F2] mt-0.5">
                {discord.cta}
              </div>

              <div className="mt-3 p-2.5 rounded-xl bg-[#070B18] border border-[#1C2438] flex items-center justify-between text-xs font-mono">
                <div>
                  <span className="text-[#94A3B8] block text-[10px] uppercase">User ID</span>
                  <span className="text-white font-medium">{discord.username}</span>
                </div>
                {isDiscordUsernameConfigured && (
                  <button
                    type="button"
                    onClick={() => handleCopy(discord.username, "discord-user")}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#0D1224] hover:bg-[#131930] text-[10px] text-[#CBD5E1] border border-[#1C2438] transition-colors"
                  >
                    {copiedField === "discord-user" ? (
                      <>
                        <Check size={11} className="text-emerald-400" />
                        <span className="text-emerald-400 font-bold">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy size={11} />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                )}
              </div>

              <p className="text-xs text-[#94A3B8] mt-4 leading-relaxed">
                {discord.description}
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-[#1C2438]">
              <a
                href={discord.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#070B18] hover:bg-[#5865F2] text-white text-xs font-semibold uppercase tracking-wider border border-[#1C2438] hover:border-[#5865F2] transition-all min-h-[44px] font-heading"
              >
                <span>Connect on Discord</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </div>

        {/* Location & Status Bar */}
        <div className="p-5 sm:p-6 rounded-2xl border border-[#1C2438] bg-[#0D1224] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#94A3B8]">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4">
            <span className="flex items-center gap-1.5 text-white">
              <MapPin size={13} className="text-[#2563EB]" />
              <span>{meta.location}</span>
            </span>
            <span className="hidden sm:inline text-[#1C2438]">•</span>
            <span className="flex items-center gap-1.5 text-[#38BDF8]">
              <Clock size={13} className="text-[#2563EB]" />
              <span>{currentTimeNPT || "GMT+5:45"}</span>
            </span>
            <span className="hidden sm:inline text-[#1C2438]">•</span>
            <span>Response: {meta.responseTime}</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#070B18] border border-[#1C2438] text-[11px] text-[#CBD5E1]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>{meta.availability}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
