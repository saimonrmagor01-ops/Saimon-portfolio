"use client";

import React from "react";
import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Calendar, MapPin, CheckCircle2 } from "lucide-react";

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-28 px-4 sm:px-8 border-t border-white/[0.08] relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-white/[0.06]">
          <div>
            <div className="text-[11px] font-mono tracking-widest text-[#9fbdff] uppercase flex items-center gap-2 mb-3">
              <Briefcase size={12} />
              <span>06 / PROFESSIONAL JOURNEY</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tightest text-white leading-tight">
              Experience &amp; <br />
              <span className="text-[#888888] font-normal font-serif italic">Background.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-[#92928f] font-normal leading-relaxed">
            A transparent overview of confirmed professional experience and foundational academic focus.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Work Experience */}
          <div className="lg:col-span-7 space-y-6">
            <div className="text-xs font-mono uppercase tracking-widest text-[#777777] mb-2 flex items-center gap-2">
              <Briefcase size={13} className="text-[#9fbdff]" />
              <span>Work Experience</span>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="p-6 sm:p-8 rounded-2xl border border-white/[0.08] bg-[#0c0c0f] hover:border-white/20 transition-all space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-white/[0.06]">
                <div>
                  <span className="text-[10px] font-mono text-[#9fbdff] uppercase tracking-wider px-2 py-0.5 rounded bg-white/[0.03] border border-white/5">
                    COMMUNICATIONS
                  </span>
                  <h3 className="text-xl font-bold text-white mt-1">
                    Digital Communications Assistant
                  </h3>
                </div>
                <div className="text-xs font-mono text-[#888888] flex items-center gap-1.5 shrink-0">
                  <Calendar size={13} />
                  <span>JAN 2025 — JUN 2026</span>
                </div>
              </div>

              <p className="text-sm text-[#a3a3a3] leading-relaxed">
                Supported digital communication, content coordination, and organizational media presentation. Contributed to clear audience engagement, digital material curation, and practical communication workflows.
              </p>

              <div className="space-y-2 pt-2">
                <div className="text-[11px] font-mono uppercase tracking-wider text-[#777777]">
                  Key Responsibilities
                </div>
                <div className="space-y-1.5 text-xs text-[#8e8e93]">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 size={13} className="text-[#9fbdff] mt-0.5 shrink-0" />
                    <span>Digital communication channels coordination and audience messaging</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 size={13} className="text-[#9fbdff] mt-0.5 shrink-0" />
                    <span>Media presentation, content formatting, and digital asset organization</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 size={13} className="text-[#9fbdff] mt-0.5 shrink-0" />
                    <span>Assisting with cross-platform digital material scheduling and consistency</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Education & Continuous Learning */}
          <div className="lg:col-span-5 space-y-6">
            <div className="text-xs font-mono uppercase tracking-widest text-[#777777] mb-2 flex items-center gap-2">
              <GraduationCap size={13} className="text-[#9fbdff]" />
              <span>Academic Foundation</span>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="p-6 sm:p-8 rounded-2xl border border-white/[0.08] bg-[#0c0c0f] space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                <span className="text-[10px] font-mono text-[#9fbdff] uppercase tracking-wider">
                  STUDIES &amp; PURSUIT
                </span>
                <span className="text-xs font-mono text-[#777777] flex items-center gap-1">
                  <MapPin size={11} />
                  <span>Nepal</span>
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">
                  Computer Science &amp; Digital Media
                </h3>
                <p className="text-xs text-[#888888] mt-1">
                  Foundational Studies &amp; Self-Directed Engineering
                </p>
              </div>

              <p className="text-xs sm:text-sm text-[#8e8e93] leading-relaxed">
                Focused on modern software engineering paradigms, algorithm logic in Python and JavaScript, alongside independent mastery of generative AI media pipelines and digital cinematography.
              </p>

              <div className="p-3.5 rounded-xl border border-white/[0.06] bg-white/[0.02] text-[11px] font-mono text-[#777777]">
                Verified academic records and references available upon confirmed request.
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
