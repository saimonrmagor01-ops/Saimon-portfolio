"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import {
  Activity,
  BriefcaseBusiness,
  Globe2,
  ShieldCheck,
  Users,
} from "lucide-react";
import {
  getEmptyPublicTrustStats,
  getPublicTrustStats,
  PublicTrustStats,
} from "@/lib/publicTrustData";
import { LivePublicPresence } from "./LivePublicPresence";

const sameStats = (left: PublicTrustStats, right: PublicTrustStats) =>
  left.uniqueVisitors === right.uniqueVisitors &&
  left.totalSessions === right.totalSessions &&
  left.activeViewers === right.activeViewers &&
  left.completedProjectsCount === right.completedProjectsCount &&
  left.countriesCount === right.countriesCount &&
  left.verifiedClientsCount === right.verifiedClientsCount &&
  left.lastUpdated === right.lastUpdated;

export const PublicTrustStrip: React.FC = () => {
  const [stats, setStats] = useState<PublicTrustStats>(getEmptyPublicTrustStats);
  const prefersReducedMotion = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateY = useSpring(pointerX, { stiffness: 120, damping: 24, mass: 0.6 });
  const rotateX = useSpring(pointerY, { stiffness: 120, damping: 24, mass: 0.6 });

  useEffect(() => {
    const updateStats = () => {
      const next = getPublicTrustStats();
      setStats((current) => sameStats(current, next) ? current : next);
    };

    const frame = window.requestAnimationFrame(updateStats);
    const interval = window.setInterval(updateStats, 15000);
    const channel = "BroadcastChannel" in window
      ? new BroadcastChannel("saimon_portfolio_analytics_channel")
      : null;

    if (channel) channel.addEventListener("message", updateStats);
    window.addEventListener("storage", updateStats);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearInterval(interval);
      channel?.removeEventListener("message", updateStats);
      channel?.close();
      window.removeEventListener("storage", updateStats);
    };
  }, []);

  const resetTilt = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (
      prefersReducedMotion ||
      event.pointerType !== "mouse" ||
      event.target instanceof Element && event.target.closest("button, a")
    ) {
      resetTilt();
      return;
    }

    const bounds = panelRef.current?.getBoundingClientRect();
    if (!bounds) return;

    const normalizedX = (event.clientX - bounds.left) / bounds.width - 0.5;
    const normalizedY = (event.clientY - bounds.top) / bounds.height - 0.5;
    pointerX.set(normalizedX * 2.4);
    pointerY.set(normalizedY * -2.4);
  };

  const metrics = [
    {
      label: "Unique Visitors",
      value: stats.uniqueVisitors.toLocaleString(),
      detail: "Recorded in this browser",
      icon: Users,
      accent: "text-sky-300",
    },
    {
      label: "Global Reach",
      value: stats.countriesCount ? stats.countriesCount.toLocaleString() : "—",
      detail: "Estimated regions in local records",
      icon: Globe2,
      accent: "text-cyan-300",
    },
    {
      label: "Verified Works",
      value: stats.completedProjectsCount.toLocaleString(),
      detail: "Projects listed in this portfolio",
      icon: BriefcaseBusiness,
      accent: "text-emerald-300",
    },
    {
      label: "Client Success",
      value: stats.verifiedClientsCount === null
        ? "—"
        : stats.verifiedClientsCount.toLocaleString(),
      detail: "No verified aggregate data yet",
      icon: Activity,
      accent: "text-blue-300",
    },
  ];

  const motionOff = prefersReducedMotion ?? false;

  return (
    <section
      aria-label="Portfolio activity and public proof"
      className="relative z-20 px-4 py-10 sm:px-8 sm:py-14"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          ref={panelRef}
          className="proof-telemetry-panel"
          style={{
            rotateX: motionOff ? 0 : rotateX,
            rotateY: motionOff ? 0 : rotateY,
            transformPerspective: 1100,
            transformStyle: "preserve-3d",
          }}
          initial={motionOff ? false : { opacity: 0, y: 18, scale: 0.985 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          onPointerMove={handlePointerMove}
          onPointerLeave={resetTilt}
        >
          <div className="proof-telemetry-reflection" aria-hidden="true" />
          <div className="relative z-10 p-5 sm:p-7 lg:p-8">
            <div className="mb-6 flex flex-col gap-4 border-b border-white/[0.08] pb-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-sky-200/15 bg-sky-300/[0.07] text-sky-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]">
                  <ShieldCheck size={18} strokeWidth={1.7} />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-heading text-sm font-semibold tracking-tight text-slate-50 sm:text-base">
                      Public Proof Telemetry
                    </h2>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-200/10 bg-sky-300/[0.06] px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.12em] text-sky-100/70">
                      <span className="h-1.5 w-1.5 rounded-full bg-sky-300/80" />
                      First-party
                    </span>
                  </div>
                  <p className="mt-1 max-w-2xl text-xs leading-relaxed text-slate-400">
                    Real portfolio records and browser-local activity. Site-wide visitor totals are not available yet.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 self-start rounded-full border border-white/[0.07] bg-black/20 px-3 py-1.5 font-mono text-[10px] text-slate-400 sm:self-auto">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-300/80" />
                <span>Updated {stats.lastUpdated}</span>
              </div>
            </div>

            <motion.div
              className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: motionOff ? 0 : 0.075 },
                },
              }}
            >
              {metrics.map((metric) => {
                const Icon = metric.icon;
                return (
                  <motion.div
                    key={metric.label}
                    className="proof-metric-tile"
                    variants={{
                      hidden: motionOff ? {} : { opacity: 0, y: 12 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-slate-400">
                        {metric.label}
                      </span>
                      <Icon className={`${metric.accent} opacity-80`} size={15} strokeWidth={1.7} />
                    </div>
                    <motion.div
                      key={metric.value}
                      className="font-mono text-3xl font-semibold tracking-[-0.06em] text-slate-50 sm:text-[2rem]"
                      initial={motionOff ? false : { opacity: 0.55, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.32, ease: "easeOut" }}
                      aria-live="polite"
                    >
                      {metric.value}
                    </motion.div>
                    <p className="mt-1.5 text-[11px] leading-relaxed text-slate-500">
                      {metric.detail}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </motion.div>

        <LivePublicPresence stats={stats} />
      </div>
    </section>
  );
};
