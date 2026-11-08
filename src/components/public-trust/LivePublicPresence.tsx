"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Radio, Users, Globe, ShieldCheck, ChevronUp, ChevronDown, CheckCircle2 } from "lucide-react";
import { getPublicTrustStats, PublicTrustStats } from "@/lib/publicTrustData";

export const LivePublicPresence: React.FC = () => {
  const [stats, setStats] = useState<PublicTrustStats>(getPublicTrustStats());
  const [isExpanded, setIsExpanded] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setStats(getPublicTrustStats());

    // Update whenever an analytics broadcast or storage event occurs
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

    const interval = setInterval(updateStats, 10000);
    window.addEventListener("storage", updateStats);

    return () => {
      clearInterval(interval);
      if (channel) channel.close();
      window.removeEventListener("storage", updateStats);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed bottom-5 left-4 sm:left-6 z-40 select-none font-sans">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative"
      >
        {/* Expanded Telemetry Card */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className="mb-2.5 w-72 sm:w-80 p-4 rounded-2xl bg-[#080C18]/95 backdrop-blur-2xl border border-white/15 shadow-[0_20px_45px_rgba(2,4,12,0.9),inset_0_1px_1px_rgba(255,255,255,0.12)] space-y-3"
            >
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <div className="flex items-center gap-1.5 text-xs font-bold text-white font-heading">
                  <ShieldCheck size={14} className="text-[#38BDF8]" />
                  <span>Public Proof Telemetry</span>
                </div>
                <span className="text-[10px] font-mono text-slate-400">
                  {stats.lastUpdated}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="p-2.5 rounded-xl bg-[#0D1224] border border-white/5 space-y-0.5">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                    Unique Viewers
                  </span>
                  <div className="text-sm font-bold text-white">
                    {stats.uniqueVisitors.toLocaleString()}+
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-[#0D1224] border border-white/5 space-y-0.5">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                    Global Reach
                  </span>
                  <div className="text-sm font-bold text-[#38BDF8]">
                    {stats.countriesCount}+ Countries
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-[#0D1224] border border-white/5 space-y-0.5">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                    Verified Works
                  </span>
                  <div className="text-sm font-bold text-emerald-400">
                    {stats.completedProjectsCount} Completed
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-[#0D1224] border border-white/5 space-y-0.5">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                    Client Success
                  </span>
                  <div className="text-sm font-bold text-emerald-400">
                    {stats.deliverySuccessRate} Delivery
                  </div>
                </div>
              </div>

              <div className="pt-1 flex items-center justify-between text-[10px] font-mono text-slate-400">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Aggregated first-party metrics</span>
                </div>
                <span className="text-slate-500">Zero fake counts</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Compact Pill Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          type="button"
          aria-expanded={isExpanded}
          className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-[#080C18]/90 hover:bg-[#0D1224] backdrop-blur-xl border border-white/15 hover:border-white/30 text-xs text-white shadow-[0_8px_25px_rgba(2,4,12,0.8),inset_0_1px_1px_rgba(255,255,255,0.15)] transition-all group"
        >
          {/* Pulsing Live Dot */}
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-80" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.9)]" />
          </span>

          <span className="font-mono text-[11px] font-medium text-slate-200">
            <strong className="text-white font-bold">{stats.activeViewers}</strong>{" "}
            {stats.activeViewers === 1 ? "visitor online" : "visitors online"}
          </span>

          <span className="text-slate-600 hidden sm:inline">•</span>

          <span className="font-mono text-[11px] text-[#38BDF8] hidden sm:inline">
            {stats.uniqueVisitors.toLocaleString()}+ reach
          </span>

          <span className="text-slate-400 group-hover:text-white transition-colors ml-0.5">
            {isExpanded ? <ChevronDown size={13} /> : <ChevronUp size={13} />}
          </span>
        </button>
      </motion.div>
    </div>
  );
};
