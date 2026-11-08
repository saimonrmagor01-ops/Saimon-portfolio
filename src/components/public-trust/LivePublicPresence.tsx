"use client";

import React, { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown, Radio, Users } from "lucide-react";
import type { PublicTrustStats } from "@/lib/publicTrustData";

interface LivePublicPresenceProps {
  stats: PublicTrustStats;
}

export const LivePublicPresence: React.FC<LivePublicPresenceProps> = ({ stats }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const motionOff = prefersReducedMotion ?? false;

  return (
    <div className="mx-auto mt-4 w-full max-w-6xl">
      <button
        type="button"
        aria-expanded={isExpanded}
        aria-controls="public-presence-details"
        onClick={() => setIsExpanded((current) => !current)}
        className="group inline-flex min-h-11 max-w-full items-center gap-2.5 rounded-full border border-sky-200/10 bg-[#080d19]/85 px-4 py-2.5 text-left shadow-[0_8px_24px_rgba(0,0,0,0.22),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl transition-[border-color,background-color,box-shadow] duration-200 hover:border-sky-200/20 hover:bg-[#0b1321] hover:shadow-[0_10px_28px_rgba(0,0,0,0.3),0_0_18px_rgba(56,189,248,0.05)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-sky-300"
      >
        <span className="relative grid h-7 w-7 shrink-0 place-items-center rounded-full border border-white/[0.08] bg-white/[0.03] text-sky-200/80">
          <Radio size={13} strokeWidth={1.7} />
          {stats.activeViewers > 0 && (
            <span className="absolute right-0.5 top-0.5 h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_8px_rgba(110,231,183,0.45)]" />
          )}
        </span>
        <span className="font-mono text-[11px] text-slate-300">
          <strong className="font-semibold text-slate-100">{stats.activeViewers}</strong>
          <span className="text-slate-400"> active here</span>
        </span>
        <span className="hidden h-4 w-px bg-white/10 sm:block" />
        <span className="hidden items-center gap-1.5 font-mono text-[10px] text-slate-400 sm:inline-flex">
          <Users size={12} className="text-sky-200/70" />
          {stats.uniqueVisitors.toLocaleString()} local visitors
        </span>
        <ChevronDown
          size={14}
          className={`ml-1 shrink-0 text-slate-500 transition-transform duration-200 group-hover:text-slate-300 ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            id="public-presence-details"
            initial={motionOff ? false : { opacity: 0, height: 0, y: -4 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={motionOff ? undefined : { opacity: 0, height: 0, y: -4 }}
            transition={{ duration: motionOff ? 0 : 0.22, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="mt-3 grid grid-cols-1 gap-2 rounded-2xl border border-white/[0.07] bg-[#080d19]/75 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] sm:grid-cols-3">
              <div className="rounded-xl border border-white/[0.05] bg-white/[0.02] px-3 py-2.5">
                <p className="font-mono text-[9px] uppercase tracking-[0.13em] text-slate-500">
                  Recorded sessions
                </p>
                <p className="mt-1 font-mono text-sm font-medium text-slate-200">
                  {stats.totalSessions.toLocaleString()}
                </p>
              </div>
              <div className="rounded-xl border border-white/[0.05] bg-white/[0.02] px-3 py-2.5">
                <p className="font-mono text-[9px] uppercase tracking-[0.13em] text-slate-500">
                  Estimated regions
                </p>
                <p className="mt-1 font-mono text-sm font-medium text-slate-200">
                  {stats.countriesCount || "—"}
                </p>
              </div>
              <div className="rounded-xl border border-white/[0.05] bg-white/[0.02] px-3 py-2.5">
                <p className="font-mono text-[9px] uppercase tracking-[0.13em] text-slate-500">
                  Collection
                </p>
                <p className="mt-1 font-mono text-sm font-medium text-slate-200">
                  First-party only
                </p>
              </div>
              <p className="px-1 pt-1 text-[10px] leading-relaxed text-slate-500 sm:col-span-3">
                Activity shown here is stored in this browser. It is not a site-wide visitor count.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
