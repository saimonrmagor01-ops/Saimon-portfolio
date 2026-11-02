"use client";

import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin, CheckCircle2, GraduationCap, Building2 } from "lucide-react";

export const Experience: React.FC = () => {
  const toolsUsed = [
    "Digital Communications",
    "Adobe Premiere Pro",
    "CapCut",
    "Content Distribution",
    "Next.js",
    "Python",
  ];

  return (
    <section id="experience" className="py-24 sm:py-28 px-4 sm:px-8 border-t border-[#1C2438] relative bg-[#050817]">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16 pb-8 border-b border-[#1C2438]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D1224] border border-[#1C2438] text-xs font-medium text-[#2563EB] mb-3">
              <Briefcase size={12} />
              <span>06 / EXPERIENCE &amp; BACKGROUND</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tightest text-white leading-tight font-heading">
              Work History &amp; <br />
              <span className="text-[#94A3B8] font-normal font-serif italic">Background.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-[#94A3B8] font-normal leading-relaxed">
            A straightforward overview of my professional experience and continuous self-directed development.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative pl-6 sm:pl-10 space-y-8">
          {/* Vertical Line */}
          <div
            className="absolute left-2.5 sm:left-4 top-4 bottom-8 w-[2px] bg-gradient-to-b from-[#2563EB] via-[#38BDF8]/40 to-[#1C2438]"
            aria-hidden="true"
          />

          {/* Node 1: Digital Communications Assistant */}
          <div className="relative">
            <div
              className="absolute -left-[21px] sm:-left-[29px] top-6 w-4 h-4 rounded-full bg-[#0D1224] border-2 border-[#2563EB] flex items-center justify-center z-10"
              aria-hidden="true"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
            </div>

            <motion.div
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="p-6 sm:p-8 rounded-2xl border border-[#1C2438] bg-[#0D1224] hover:border-[#2563EB]/70 transition-all duration-300 space-y-5 shadow-lg group"
            >
              {/* Top Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1C2438]">
                <div className="flex items-start sm:items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#070B18] border border-[#1C2438] text-[#2563EB] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Building2 size={22} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white font-heading group-hover:text-[#2563EB] transition-colors">
                      Digital Communications Assistant
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-[#94A3B8] mt-1 font-mono">
                      <span>Digital Media &amp; Content Coordination</span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-[#38BDF8]">
                        <MapPin size={11} />
                        Nepal
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-start sm:self-center">
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-medium bg-[#2563EB]/15 text-[#93C5FD] border border-[#2563EB]/30">
                    Full-Time
                  </span>
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-[#94A3B8] bg-[#070B18] border border-[#1C2438]">
                    <Calendar size={12} className="text-[#2563EB]" />
                    <span>Jan 2025 – Present</span>
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-[#CBD5E1] leading-relaxed">
                Assisting with digital communications, content asset preparation, social outreach scheduling, and media presentation formatting across digital channels.
              </p>

              {/* Responsibilities */}
              <div className="space-y-2 pt-1">
                <div className="text-xs font-mono uppercase tracking-wider text-[#94A3B8]">
                  Key Responsibilities
                </div>
                <div className="space-y-1.5 text-xs text-[#94A3B8]">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 size={13} className="text-[#2563EB] mt-0.5 shrink-0" />
                    <span>Coordinating messaging schedules and digital outreach across active channels</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 size={13} className="text-[#2563EB] mt-0.5 shrink-0" />
                    <span>Preparing visual presentation materials, video thumbnails, and formatting assets</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 size={13} className="text-[#2563EB] mt-0.5 shrink-0" />
                    <span>Maintaining content calendars and ensuring visual consistency across releases</span>
                  </div>
                </div>
              </div>

              {/* Tools Tags */}
              <div className="pt-3 border-t border-[#1C2438] flex flex-wrap items-center gap-2">
                {toolsUsed.map((tool, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-lg bg-[#070B18] border border-[#1C2438] text-xs font-mono text-[#94A3B8]"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Node 2: Self-Directed Development & Practical Mastery */}
          <div className="relative">
            <div
              className="absolute -left-[21px] sm:-left-[29px] top-6 w-4 h-4 rounded-full bg-[#0D1224] border-2 border-[#38BDF8]/60 flex items-center justify-center z-10"
              aria-hidden="true"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]" />
            </div>

            <motion.div
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="p-6 sm:p-7 rounded-2xl border border-[#1C2438] bg-[#0D1224] hover:border-[#2563EB]/70 transition-all space-y-4 shadow-lg"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#1C2438]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#070B18] border border-[#1C2438] text-[#2563EB] flex items-center justify-center shrink-0">
                    <GraduationCap size={20} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white font-heading">
                      Project-Based Software Engineering &amp; Creative Media
                    </h3>
                    <span className="text-xs text-[#94A3B8] font-mono">
                      Continuous Self-Directed Mastery
                    </span>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-mono text-[#94A3B8] bg-[#070B18] border border-[#1C2438] self-start sm:self-center">
                  Ongoing
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                Dedicated independent engineering focused on real-world projects: architecting the BudgetMandu web platform with Next.js, building asynchronous community bots with Python, and directing generative AI filmmaking sequences.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
