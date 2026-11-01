"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Send, CheckCircle2, AlertCircle, Sparkles, MapPin, Clock, ArrowUpRight, RefreshCw, Copy, Check } from "lucide-react";
import { services } from "@/data/services";
import { SocialLinks } from "./SocialLinks";
import { CONTACT_CONFIG } from "@/data/socials";

interface ContactProps {
  selectedService?: string;
  onServiceChange?: (service: string) => void;
}

export const Contact: React.FC<ContactProps> = ({
  selectedService = "",
  onServiceChange,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: selectedService || services[0].title,
    timeline: "Standard (1-3 weeks)",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "prepared">("idle");
  const [currentTimeNPT, setCurrentTimeNPT] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const isEmailConfigured = Boolean(
    CONTACT_CONFIG.EMAIL &&
    !CONTACT_CONFIG.EMAIL.startsWith("[ADD_") &&
    CONTACT_CONFIG.EMAIL.includes("@")
  );

  // Keep selectedService in sync if passed from props
  useEffect(() => {
    if (selectedService) {
      setFormData((prev) => ({ ...prev, service: selectedService }));
    }
  }, [selectedService]);

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

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Please provide your name";
    if (!formData.email.trim()) {
      newErrors.email = "Please provide your email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.message.trim()) {
      newErrors.message = "Please describe your project or inquiry";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message should be at least 10 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getFormattedBrief = () => {
    return `Hello Saimon,

I would like to discuss a project with you:

• Name: ${formData.name}
• Client Email: ${formData.email}
• Service Focus: ${formData.service}
• Desired Timeline: ${formData.timeline}

Project Brief:
${formData.message}

---
Dispatched via saimon-portfolio contact channel`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");

    // Construct genuine mailto link with structured inquiry data
    const subject = encodeURIComponent(`Project Inquiry: ${formData.service} — ${formData.name}`);
    const body = encodeURIComponent(getFormattedBrief());
    const recipient = isEmailConfigured ? CONTACT_CONFIG.EMAIL : "";
    const mailtoUrl = `mailto:${recipient}?subject=${subject}&body=${body}`;

    // Open user's default email client
    try {
      window.location.href = mailtoUrl;
    } catch {
      // safe fallback
    }

    setTimeout(() => {
      setStatus("prepared");
    }, 400);
  };

  const handleCopyBrief = () => {
    try {
      navigator.clipboard.writeText(getFormattedBrief());
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    } catch {
      // fallback
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      service: services[0].title,
      timeline: "Standard (1-3 weeks)",
      message: "",
    });
    setErrors({});
    setStatus("idle");
    setIsCopied(false);
  };

  return (
    <section id="contact" className="py-24 sm:py-28 px-4 sm:px-8 border-t border-[#202A40] relative bg-[#050817]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16 pb-8 border-b border-[#202A40]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#101525] border border-[#202A40] text-xs font-medium text-[#2563EB] mb-3">
              <Mail size={12} />
              <span>08 / GET IN TOUCH</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tightest text-white leading-tight font-heading">
              Have an idea? <br />
              <span className="text-[#94A3B8] font-normal font-serif italic">Let&apos;s make it real.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-[#94A3B8] font-normal leading-relaxed">
            Open for creative collaborations, AI video production, web engineering, and custom automation projects.
          </p>
        </div>

        {/* Contact Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Details Panel */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl border border-[#202A40] bg-[#101525] space-y-6 shadow-xl relative overflow-hidden">
              <div
                className="absolute -top-16 -right-16 w-48 h-48 rounded-full pointer-events-none radial-glow-blue opacity-50 blur-2xl"
                aria-hidden="true"
              />

              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#2563EB] font-bold">
                  DIRECT INQUIRY
                </span>
                <h3 className="text-2xl font-bold text-white tracking-tight font-heading">
                  Start a Conversation
                </h3>
                <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                  Whether you need a full cinematic video pipeline, a high-converting short-form edit, or a responsive web product like BudgetMandu — I&apos;m ready to collaborate.
                </p>
              </div>

              {/* Status Pills */}
              <div className="space-y-3 pt-2">
                {/* Location */}
                <div className="p-3.5 rounded-xl border border-[#202A40] bg-[#080C1E] flex items-center justify-between text-xs">
                  <span className="text-[#94A3B8] flex items-center gap-2">
                    <MapPin size={13} className="text-[#2563EB]" />
                    <span>Location</span>
                  </span>
                  <span className="text-white font-mono font-medium">{CONTACT_CONFIG.LOCATION}</span>
                </div>

                {/* Local Time */}
                <div className="p-3.5 rounded-xl border border-[#202A40] bg-[#080C1E] flex items-center justify-between text-xs">
                  <span className="text-[#94A3B8] flex items-center gap-2">
                    <Clock size={13} className="text-[#2563EB]" />
                    <span>Nepal Time (NPT)</span>
                  </span>
                  <span className="text-[#93C5FD] font-mono font-medium">{currentTimeNPT || "GMT+5:45"}</span>
                </div>

                {/* Response Rate */}
                <div className="p-3.5 rounded-xl border border-[#202A40] bg-[#080C1E] flex items-center justify-between text-xs">
                  <span className="text-[#94A3B8] flex items-center gap-2">
                    <Sparkles size={13} className="text-[#2563EB]" />
                    <span>Response Time</span>
                  </span>
                  <span className="text-white font-mono font-medium">{CONTACT_CONFIG.RESPONSE_TIME}</span>
                </div>
              </div>

              {/* Social Channels Callout */}
              <div className="pt-2 border-t border-[#202A40]">
                <div className="text-[10px] font-mono uppercase tracking-wider text-[#64748B] mb-2.5">
                  Direct Channels
                </div>
                <div className="flex items-center justify-between">
                  <SocialLinks size="md" />
                  <span className="text-[11px] font-mono text-[#94A3B8]">Instant Connect</span>
                </div>
              </div>

              {/* Email direct action */}
              <div className="pt-2">
                <a
                  href={isEmailConfigured ? `mailto:${CONTACT_CONFIG.EMAIL}?subject=Project%20Inquiry%20via%20Portfolio` : "#contact"}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-[#202A40] bg-[#080C1E] text-white text-xs font-semibold uppercase tracking-wider hover:border-[#2563EB] hover:bg-[#161D33] transition-all duration-200 font-heading min-h-[44px]"
                >
                  <Mail size={14} className="text-[#2563EB]" />
                  <span>{isEmailConfigured ? "Open Direct Mail Client" : "Email Inquiries"}</span>
                  <ArrowUpRight size={13} />
                </a>
                {!isEmailConfigured && (
                  <p className="text-[10px] font-mono text-[#64748B] text-center mt-1.5">
                    Direct email placeholder configured in src/data/socials.ts
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Right Interactive Form Panel */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-10 rounded-3xl border border-[#202A40] bg-[#101525] shadow-2xl">
              <AnimatePresence mode="wait">
                {status === "prepared" ? (
                  <motion.div
                    key="prepared"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    className="py-8 text-center space-y-6"
                  >
                    <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-[#2563EB]/15 border border-[#2563EB]/40 text-[#38BDF8] mx-auto">
                      <CheckCircle2 size={32} />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold text-white tracking-tight font-heading">
                        Inquiry Prepared
                      </h3>
                      <p className="text-xs sm:text-sm text-[#94A3B8] max-w-md mx-auto leading-relaxed">
                        Your project brief has been formatted and opened in your email application. If your mail client didn&apos;t launch automatically, you can copy the inquiry brief below.
                      </p>
                    </div>

                    {/* Formatted Preview Box */}
                    <div className="text-left p-4 rounded-xl border border-[#202A40] bg-[#080C1E] text-xs font-mono text-[#CBD5E1] space-y-1 max-h-40 overflow-y-auto">
                      <div className="text-[#2563EB] font-bold">PROJECT BRIEF SUMMARY:</div>
                      <div>From: {formData.name} ({formData.email})</div>
                      <div>Discipline: {formData.service} • Timeline: {formData.timeline}</div>
                      <div className="text-[#94A3B8] pt-1 truncate">&quot;{formData.message}&quot;</div>
                    </div>

                    <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                      <button
                        onClick={handleCopyBrief}
                        type="button"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-medium border border-[#2563EB] bg-[#2563EB] text-white hover:bg-[#1D4ED8] transition-all font-heading min-h-[40px]"
                      >
                        {isCopied ? <Check size={14} /> : <Copy size={14} />}
                        <span>{isCopied ? "Copied to Clipboard!" : "Copy Inquiry Brief"}</span>
                      </button>

                      <button
                        onClick={handleReset}
                        type="button"
                        className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-medium border border-[#202A40] bg-[#080C1E] text-[#94A3B8] hover:text-white hover:border-[#2563EB] transition-colors font-heading min-h-[40px]"
                      >
                        <RefreshCw size={12} />
                        <span>Edit / Start Over</span>
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                    <div className="flex items-center justify-between pb-3 border-b border-[#202A40]">
                      <span className="text-xs font-mono uppercase tracking-widest text-[#64748B]">
                        Project Inquiry Form
                      </span>
                      <span className="text-[11px] font-mono text-[#2563EB] font-bold">DIRECT DISPATCH</span>
                    </div>

                    {/* Name & Email Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Name */}
                      <div className="space-y-1.5">
                        <label
                          htmlFor="name"
                          className="block text-xs font-mono uppercase tracking-wider text-[#CBD5E1]"
                        >
                          Your Name <span className="text-[#2563EB]">*</span>
                        </label>
                        <input
                          id="name"
                          type="text"
                          value={formData.name}
                          onChange={(e) => {
                            setFormData({ ...formData, name: e.target.value });
                            if (errors.name) setErrors({ ...errors, name: "" });
                          }}
                          placeholder="e.g. Alex Chen"
                          className={`w-full px-4 py-3 rounded-xl border bg-[#080C1E] text-sm text-white placeholder-[#64748B] transition-colors focus:outline-none min-h-[44px] ${
                            errors.name
                              ? "border-red-500/60 focus:border-red-500"
                              : "border-[#202A40] focus:border-[#2563EB]"
                          }`}
                        />
                        {errors.name && (
                          <p className="text-[11px] text-red-400 flex items-center gap-1 mt-1">
                            <AlertCircle size={11} />
                            <span>{errors.name}</span>
                          </p>
                        )}
                      </div>

                      {/* Email */}
                      <div className="space-y-1.5">
                        <label
                          htmlFor="email"
                          className="block text-xs font-mono uppercase tracking-wider text-[#CBD5E1]"
                        >
                          Email Address <span className="text-[#2563EB]">*</span>
                        </label>
                        <input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => {
                            setFormData({ ...formData, email: e.target.value });
                            if (errors.email) setErrors({ ...errors, email: "" });
                          }}
                          placeholder="alex@company.com"
                          className={`w-full px-4 py-3 rounded-xl border bg-[#080C1E] text-sm text-white placeholder-[#64748B] transition-colors focus:outline-none min-h-[44px] ${
                            errors.email
                              ? "border-red-500/60 focus:border-red-500"
                              : "border-[#202A40] focus:border-[#2563EB]"
                          }`}
                        />
                        {errors.email && (
                          <p className="text-[11px] text-red-400 flex items-center gap-1 mt-1">
                            <AlertCircle size={11} />
                            <span>{errors.email}</span>
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Service & Timeline Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Service Selection */}
                      <div className="space-y-1.5">
                        <label
                          htmlFor="service"
                          className="block text-xs font-mono uppercase tracking-wider text-[#CBD5E1]"
                        >
                          Area of Focus
                        </label>
                        <select
                          id="service"
                          value={formData.service}
                          onChange={(e) => {
                            setFormData({ ...formData, service: e.target.value });
                            if (onServiceChange) onServiceChange(e.target.value);
                          }}
                          className="w-full px-4 py-3 rounded-xl border border-[#202A40] bg-[#080C1E] text-sm text-white focus:outline-none focus:border-[#2563EB] min-h-[44px]"
                        >
                          {services.map((s) => (
                            <option key={s.id} value={s.title} className="bg-[#101525] text-white">
                              {s.title}
                            </option>
                          ))}
                          <option value="General Collaboration" className="bg-[#101525] text-white">
                            General Creative / Tech Collaboration
                          </option>
                        </select>
                      </div>

                      {/* Timeline */}
                      <div className="space-y-1.5">
                        <label
                          htmlFor="timeline"
                          className="block text-xs font-mono uppercase tracking-wider text-[#CBD5E1]"
                        >
                          Desired Timeline
                        </label>
                        <select
                          id="timeline"
                          value={formData.timeline}
                          onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-[#202A40] bg-[#080C1E] text-sm text-white focus:outline-none focus:border-[#2563EB] min-h-[44px]"
                        >
                          <option value="Urgent (Under 1 week)" className="bg-[#101525] text-white">
                            Urgent (Under 1 week)
                          </option>
                          <option value="Standard (1-3 weeks)" className="bg-[#101525] text-white">
                            Standard (1-3 weeks)
                          </option>
                          <option value="Flexible (1+ month)" className="bg-[#101525] text-white">
                            Flexible (1+ month)
                          </option>
                        </select>
                      </div>
                    </div>

                    {/* Message Area */}
                    <div className="space-y-1.5">
                      <label
                        htmlFor="message"
                        className="block text-xs font-mono uppercase tracking-wider text-[#CBD5E1]"
                      >
                        Project Details <span className="text-[#2563EB]">*</span>
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        value={formData.message}
                        onChange={(e) => {
                          setFormData({ ...formData, message: e.target.value });
                          if (errors.message) setErrors({ ...errors, message: "" });
                        }}
                        placeholder="Tell me about your project, goals, and any reference styles or technical parameters..."
                        className={`w-full px-4 py-3 rounded-xl border bg-[#080C1E] text-sm text-white placeholder-[#64748B] transition-colors focus:outline-none resize-none ${
                          errors.message
                            ? "border-red-500/60 focus:border-red-500"
                            : "border-[#202A40] focus:border-[#2563EB]"
                        }`}
                      />
                      {errors.message && (
                        <p className="text-[11px] text-red-400 flex items-center gap-1 mt-1">
                          <AlertCircle size={11} />
                          <span>{errors.message}</span>
                        </p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#2563EB] text-white font-semibold text-xs uppercase tracking-wider hover:bg-[#1D4ED8] disabled:opacity-50 transition-all duration-200 font-heading shadow-[0_4px_20px_rgba(37,99,235,0.4)] min-h-[44px]"
                    >
                      {status === "submitting" ? (
                        <>
                          <RefreshCw size={14} className="animate-spin" />
                          <span>Opening Mail Client...</span>
                        </>
                      ) : (
                        <>
                          <Send size={14} />
                          <span>Dispatch Project Inquiry</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
