"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Award, Globe, Users, CheckCircle2, Sparkles, Layers } from "lucide-react";
import { getPublicTrustStats, PublicTrustStats } from "@/lib/publicTrustData";

export const PublicTrustStrip: React.FC = () => {
  const [stats, setStats] = useState<PublicTrustStats>(getPublicTrustStats());

  useEffect(() => {
    setStats(getPublicTrustStats());

    const updateStats = () => {
      setStats(getPublicTrustStats());
    };

    let channel: BroadcastChannel | null = null;
    try {
      if (typeof window !== "undefined" && "BroadcastChannel" in window) {
        channel = new BroadcastChannel("saimon_portfolio_analytics_channel");
        channel.onmessage = () => updateStats();
      }
    } catch {
      // Graceful fallback
    }

    const interval = setInterval(updateStats, 15000);
    window.addEventListener("storage", updateStats);

    return () => {
      clearInterval(interval);
      if (channel) channel.close();
      window.removeEventListener("storage", updateStats);
    };
  }, []);

  const trustMetrics = [
    {
      label: "Unique Visitors",
      value: `${stats.uniqueVisitors.toLocaleString()}+`,
      subline: "Authentic audience reach",
      icon: Users,
      accent: "#38BDF8",
    },
    {
      label: "Completed Works",
      value: `${stats.completedProjectsCount}`,
      subline: "Shipped & live platforms",
      icon: Layers,
      accent: "#E5484D",
    },
    {
      label: "Verified Clients",
      value: `${stats.verifiedClientsCount}`,
      subline: "Confirmed freelance commissions",
      icon: Award,
      accent: "#34D399",
    },
    {
      label: "Territories Reached",
      value: `${stats.countriesCount}+`,
      subline: "Global viewer distribution",
      icon: Globe,
      accent: "#A78BFA",
    },
    {
      label: "Fulfillment Rate",
      value: stats.deliverySuccessRate,
      subline: "On-time project deliveries",
      icon: CheckCircle2,
      accent: "#38BDF8",
    },
  ];

  return (
    <section aria-label="Credibility and Proof Metrics" className="py-8 px-4 sm:px-8 relative z-20">
      <div className="max-w-6xl mx-auto">
        {/* Subtle Container */}
        <div className="relative rounded-2xl bg-[#080C18]/80 backdrop-blur-xl border border-white/10 p-5 sm:p-7 shadow-[0_12px_36px_rgba(2,4,12,0.6),inset_0_1px_1px_rgba(255,255,255,0.08)]">
          {/* Subtle Top Accent */}
          <div className="absolute top-0 left-12 right-12 h-[1px] bg-gradient-to-r from-transparent via-[#38BDF8]/40 to-transparent" />

          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 mb-6 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#0D1224] border border-white/10 flex items-center justify-center text-[#38BDF8] shadow-inner">
                <ShieldCheck size={16} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs sm:text-sm font-bold text-white font-heading tracking-tight">
                    Verified Portfolio Activity &amp; Social Proof
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Live Verified
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Real client outcomes, transparent project records, and first-party visitor metrics.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
              <span className="text-slate-500">Live Active:</span>
              <span className="text-emerald-400 font-bold">{stats.activeViewers} online</span>
            </div>
          </div>

          {/* Metric Columns */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 sm:gap-6">
            {trustMetrics.map((m, idx) => {
              const Icon = m.icon;

              return (
                <div
                  key={idx}
                  className="p-3.5 sm:p-4 rounded-xl bg-[#0D1224]/70 border border-white/5 hover:border-white/15 transition-all group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 group-hover:text-slate-300 transition-colors">
                      {m.label}
                    </span>
                    <Icon size={13} style={{ color: m.accent }} className="opacity-80" />
                  </div>

                  <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight">
                    {m.value}
                  </div>

                  <p className="text-[11px] text-slate-500 mt-1 truncate">
                    {m.subline}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
