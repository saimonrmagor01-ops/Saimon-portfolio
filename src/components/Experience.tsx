"use client";

import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin, CheckCircle2, GraduationCap, Building2 } from "lucide-react";

export const Experience: React.FC = () => {
  const techPills = [
    "Content Strategy",
    "Digital Media",
    "Premiere Pro",
    "CapCut",
    "Python Automation",
    "Discord Bots",
    "Next.js",
  ];

  return (
    <section id="experience" className="py-24 px-4 sm:px-8 border-t border-[#202A40] relative bg-[#050817]">
      <div className="max-w-5xl mx-auto">
        {/* Section Header (Reference Screenshot Style) */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#101525] border border-[#202A40] text-xs font-medium text-[#2563EB] mb-4 shadow-sm">
            <Briefcase size={12} className="text-[#2563EB]" />
            <span>WORK HISTORY</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white font-heading">
            Professional Experience
          </h2>

          <p className="text-sm sm:text-base text-[#94A3B8] mt-3 leading-relaxed">
            A showcase of my professional journey and the skills I&apos;ve developed along the way.
          </p>
        </div>

        {/* Experience Cards Stack (Exact Reference Screenshot Layout) */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-6 sm:p-8 rounded-2xl border border-[#202A40] bg-[#101525] hover:border-[#2563EB] hover:shadow-[0_10px_35px_rgba(37,99,235,0.15)] transition-all duration-300 space-y-5 group"
          >
            {/* Top Row: Icon + Title + Meta Badges */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#202A40]">
              <div className="flex items-start sm:items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#080C1E] border border-[#202A40] text-[#2563EB] flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:border-[#2563EB] transition-all">
                  <Building2 size={22} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white font-heading group-hover:text-[#2563EB] transition-colors">
                    Digital Communications Assistant
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-[#94A3B8] mt-1 font-mono">
                    <span>Digital Media &amp; Communications</span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-[#2563EB]">
                      <MapPin size={11} />
                      Nepal
                    </span>
                  </div>
                </div>
              </div>

              {/* Status & Date Badges */}
              <div className="flex items-center gap-2 shrink-0 self-start sm:self-center">
                <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-medium bg-[#2563EB]/15 text-[#93C5FD] border border-[#2563EB]/30">
                  Full-Time
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-[#94A3B8] bg-[#080C1E] border border-[#202A40]">
                  <Calendar size={12} className="text-[#2563EB]" />
                  <span>Jan 2025 – Jun 2026</span>
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-[#CBD5E1] leading-relaxed">
              Leading digital communications and multimedia asset curation, coordinating outreach campaigns, and streamlining cross-platform digital material scheduling and consistency.
            </p>

            {/* Key Responsibilities */}
            <div className="space-y-2 pt-1">
              <div className="text-xs font-mono uppercase tracking-wider text-[#64748B]">
                Key Responsibilities &amp; Impact
              </div>
              <div className="space-y-1.5 text-xs text-[#94A3B8]">
                <div className="flex items-start gap-2">
                  <CheckCircle2 size={13} className="text-[#2563EB] mt-0.5 shrink-0" />
                  <span>Coordinated digital communication channels and multi-platform messaging strategies</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 size={13} className="text-[#2563EB] mt-0.5 shrink-0" />
                  <span>Curated media presentation materials, visual storytelling assets, and campaign formatting</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 size={13} className="text-[#2563EB] mt-0.5 shrink-0" />
                  <span>Streamlined digital distribution calendars and ensured cross-format brand alignment</span>
                </div>
              </div>
            </div>

            {/* Tech Tags Row (Exact Reference Screenshot Style) */}
            <div className="pt-3 border-t border-[#202A40] flex flex-wrap items-center gap-2">
              {techPills.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg bg-[#080C1E] border border-[#202A40] text-xs font-mono text-[#94A3B8] hover:border-[#2563EB] hover:text-white transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Academic Foundation Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="p-6 sm:p-7 rounded-2xl border border-[#202A40] bg-[#101525] hover:border-[#2563EB] transition-all space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#202A40]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#080C1E] border border-[#202A40] text-[#2563EB] flex items-center justify-center shrink-0">
                  <GraduationCap size={20} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white font-heading">
                    Academic Foundation &amp; Self-Directed Engineering
                  </h3>
                  <span className="text-xs text-[#94A3B8] font-mono">
                    Continuous Learning in Computer Science &amp; AI Media
                  </span>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-mono text-[#94A3B8] bg-[#080C1E] border border-[#202A40] self-start sm:self-center">
                Ongoing
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
              Committed to independent, project-based mastery across modern full-stack web architectures, Python automation scripts, and generative AI filmmaking pipelines.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
