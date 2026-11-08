"use client";

import React from "react";
import { motion } from "framer-motion";
import { Award, CheckCircle2, MessageSquare, Quote, Star, Sparkles, Building2, ExternalLink } from "lucide-react";
import { VERIFIED_TESTIMONIALS } from "@/lib/publicTrustData";

export const VerifiedClientReviews: React.FC = () => {
  return (
    <section
      id="client-proof"
      aria-label="Verified Client Experience & Testimonials"
      className="py-20 sm:py-24 px-4 sm:px-8 border-t border-white/10 relative bg-[#050817]"
    >
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#080C18] border border-white/10 text-xs font-medium text-[#38BDF8] shadow-sm">
              <Award size={13} className="text-[#38BDF8]" />
              <span>07 / VERIFIED CLIENT EXPERIENCE</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tightest text-white leading-tight font-heading">
              Client Feedback &amp; <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-200 via-slate-400 to-sky-300 font-normal font-serif italic">
                Verified Deliverables.
              </span>
            </h2>
          </div>

          <p className="max-w-md text-sm sm:text-base text-slate-400 leading-relaxed font-normal">
            Direct feedback from verified collaborations across generative AI direction, video post-production, and full-stack web builds.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {VERIFIED_TESTIMONIALS.map((t, idx) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-6 sm:p-7 rounded-2xl bg-[#080C18]/90 border border-white/10 hover:border-white/20 transition-all duration-300 flex flex-col justify-between space-y-6 shadow-lg group relative overflow-hidden"
            >
              {/* Subtle accent line on top */}
              <div
                className="absolute top-0 left-6 right-6 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ backgroundColor: t.accentColor }}
              />

              <div className="space-y-4">
                {/* Top Badge & Verified Tag */}
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-semibold">
                    <CheckCircle2 size={11} />
                    <span>Verified Client</span>
                  </span>

                  <span className="text-[10px] font-mono text-slate-500">{t.verifiedDate}</span>
                </div>

                {/* Quote */}
                <p className="text-xs sm:text-[13px] text-slate-300 leading-relaxed font-normal italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              {/* Author & Deliverable */}
              <div className="pt-4 border-t border-white/10 space-y-3">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center font-mono font-bold text-xs text-white shadow-inner shrink-0"
                    style={{ backgroundColor: `${t.accentColor}25`, border: `1px solid ${t.accentColor}50` }}
                  >
                    {t.avatarInitial}
                  </div>
                  <div className="truncate">
                    <div className="text-sm font-bold text-white font-heading truncate">
                      {t.clientName}
                    </div>
                    <div className="text-[11px] text-slate-400 truncate">
                      {t.roleOrCompany} • {t.location}
                    </div>
                  </div>
                </div>

                {/* Deliverable Badge */}
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1">
                  <span className="text-slate-500">Deliverable:</span>
                  <span className="text-white font-medium">{t.deliverableBadge}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
