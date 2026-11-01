"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Send, CheckCircle2, AlertCircle, Sparkles, MapPin, Clock, ArrowUpRight, RefreshCw } from "lucide-react";
import { services } from "@/data/services";
import { SocialLinks } from "./SocialLinks";

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
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [currentTimeNPT, setCurrentTimeNPT] = useState("");

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");

    // Simulate realistic asynchronous submission
    setTimeout(() => {
      setStatus("success");
    }, 800);
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
  };

  return (
    <section id="contact" className="py-28 px-4 sm:px-8 border-t border-[#202A40] relative bg-[#050817]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-[#202A40]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#101525] border border-[#202A40] text-xs font-medium text-[#2563EB] mb-3">
              <Mail size={12} />
              <span>08 / GET IN TOUCH</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tightest text-white leading-tight font-heading">
              Have an idea? <br />
              <span className="text-[#94A3B8] font-normal font-serif italic">Let&apos;s make it real.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-[#94A3B8] font-normal leading-relaxed">
            Open for creative collaborations, AI video production, web engineering, and custom automation projects.
          </p>
        </div>

        {/* Contact Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
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
                  <span className="text-white font-mono font-medium">Kathmandu, Nepal</span>
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
                  <span className="text-white font-mono font-medium">Within 24 Hours</span>
                </div>
              </div>

              {/* Social Channels Callout */}
              <div className="pt-2 border-t border-[#202A40]">
                <div className="text-[10px] font-mono uppercase tracking-wider text-[#64748B] mb-2.5">
                  Direct Channels
                </div>
                <div className="flex items-center justify-between">
                  <SocialLinks size="md" />
                  <span className="text-[11px] font-mono text-[#94A3B8]">Instant Chat</span>
                </div>
              </div>

              {/* Email direct action */}
              <div className="pt-2">
                <a
                  href={`mailto:saimonranamagar@example.com?subject=Project%20Inquiry%20via%20Portfolio&body=Hi%20Saimon,%0A%0AI%20would%20like%20to%20discuss%20a%20project...`}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-[#202A40] bg-[#080C1E] text-white text-xs font-semibold uppercase tracking-wider hover:border-[#2563EB] hover:bg-[#161D33] transition-all duration-200 font-heading"
                >
                  <Mail size={14} className="text-[#2563EB]" />
                  <span>Open Direct Mail Client</span>
                  <ArrowUpRight size={13} />
                </a>
              </div>
            </div>
          </div>

          {/* Right Interactive Form Panel */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-10 rounded-3xl border border-[#202A40] bg-[#101525] shadow-2xl">
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="py-12 text-center space-y-5"
                  >
                    <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mx-auto">
                      <CheckCircle2 size={32} />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold text-white tracking-tight font-heading">
                        Inquiry Received
                      </h3>
                      <p className="text-xs sm:text-sm text-[#94A3B8] max-w-md mx-auto leading-relaxed">
                        Thank you for reaching out, <span className="text-white font-medium">{formData.name}</span>. I have received your request regarding <span className="text-[#93C5FD]">{formData.service}</span> and will respond promptly.
                      </p>
                    </div>

                    <div className="pt-4 flex items-center justify-center gap-3">
                      <button
                        onClick={handleReset}
                        type="button"
                        className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-medium border border-[#202A40] bg-[#080C1E] text-white hover:border-[#2563EB] transition-colors font-heading"
                      >
                        <RefreshCw size={12} />
                        <span>Send Another Message</span>
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                    <div className="flex items-center justify-between pb-3 border-b border-[#202A40]">
                      <span className="text-xs font-mono uppercase tracking-widest text-[#64748B]">
                        Project Inquiry Form
                      </span>
                      <span className="text-[11px] font-mono text-[#2563EB] font-bold">CONFIDENTIAL</span>
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
                          placeholder="e.g. Maya Shrestha"
                          className={`w-full px-4 py-3 rounded-xl border bg-[#080C1E] text-sm text-white placeholder-[#64748B] transition-colors focus:outline-none ${
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
                          Your Email <span className="text-[#2563EB]">*</span>
                        </label>
                        <input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => {
                            setFormData({ ...formData, email: e.target.value });
                            if (errors.email) setErrors({ ...errors, email: "" });
                          }}
                          placeholder="e.g. maya@example.com"
                          className={`w-full px-4 py-3 rounded-xl border bg-[#080C1E] text-sm text-white placeholder-[#64748B] transition-colors focus:outline-none ${
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

                    {/* Service Selection */}
                    <div className="space-y-1.5">
                      <label
                        htmlFor="service"
                        className="block text-xs font-mono uppercase tracking-wider text-[#CBD5E1]"
                      >
                        Target Service
                      </label>
                      <select
                        id="service"
                        value={formData.service}
                        onChange={(e) => {
                          setFormData({ ...formData, service: e.target.value });
                          if (onServiceChange) onServiceChange(e.target.value);
                        }}
                        className="w-full px-4 py-3 rounded-xl border border-[#202A40] bg-[#080C1E] text-sm text-white focus:outline-none focus:border-[#2563EB] transition-colors"
                      >
                        {services.map((s) => (
                          <option key={s.id} value={s.title} className="bg-[#101525] text-white">
                            {s.title} ({s.category})
                          </option>
                        ))}
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
                        className="w-full px-4 py-3 rounded-xl border border-[#202A40] bg-[#080C1E] text-sm text-white focus:outline-none focus:border-[#2563EB] transition-colors"
                      >
                        <option value="Urgent (Within 1 week)" className="bg-[#101525] text-white">
                          Urgent (Within 1 week)
                        </option>
                        <option value="Standard (1-3 weeks)" className="bg-[#101525] text-white">
                          Standard (1-3 weeks)
                        </option>
                        <option value="Long-term partnership" className="bg-[#101525] text-white">
                          Long-term partnership
                        </option>
                      </select>
                    </div>

                    {/* Message Field */}
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
                      className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#2563EB] text-white font-semibold text-xs uppercase tracking-wider hover:bg-[#1D4ED8] disabled:opacity-50 transition-all duration-200 font-heading shadow-[0_4px_20px_rgba(37,99,235,0.4)]"
                    >
                      {status === "submitting" ? (
                        <>
                          <RefreshCw size={14} className="animate-spin" />
                          <span>Transmitting Inquiry...</span>
                        </>
                      ) : (
                        <>
                          <Send size={14} />
                          <span>Submit Project Inquiry</span>
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
