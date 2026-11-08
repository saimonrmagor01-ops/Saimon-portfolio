"use client";

import React from "react";
import { Clock, Eye, MousePointerClick, ArrowRightLeft, Layers, Compass } from "lucide-react";
import { HorizontalBarChart } from "./Charts";

export const EngagementView: React.FC = () => {
  const kpis = [
    { title: "Avg Session Duration", value: "2m 44s", change: "+16.2%", desc: "Time spent actively exploring pages" },
    { title: "Pages per Session", value: "2.8", change: "+8.4%", desc: "Cross-section scrolls & modal views" },
    { title: "Interaction Rate", value: "68.4%", change: "+5.1%", desc: "Visitors triggering clicks or scrolls" },
    { title: "Bounce Rate", value: "31.6%", change: "-4.2%", desc: "Single-view exits without interaction" },
  ];

  const sectionDwell = [
    { label: "Featured Projects (#projects)", value: 840, percentage: 38.0, color: "#E5484D", sublabel: "1m 18s avg" },
    { label: "Creative Studio (#creative-studio)", value: 520, percentage: 23.5, color: "#30B981", sublabel: "54s avg" },
    { label: "Development Studio (#development-studio)", value: 410, percentage: 18.5, color: "#E5A13A", sublabel: "46s avg" },
    { label: "Services & Offerings (#services)", value: 240, percentage: 10.8, color: "#38BDF8", sublabel: "38s avg" },
    { label: "About & Portrait (#about)", value: 205, percentage: 9.2, color: "#A855F7", sublabel: "32s avg" },
  ];

  const entryExitPages = [
    { page: "/#home (Hero Introduction)", entries: 980, exits: 140, bounce: "14.2%" },
    { page: "/#projects (Projects Showcase)", entries: 160, exits: 320, bounce: "28.5%" },
    { page: "/#contact (Direct Contact Channels)", entries: 45, exits: 490, bounce: "8.1%" },
    { page: "/#creative-studio (AI Film & Video)", entries: 35, exits: 180, bounce: "22.0%" },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="pb-4 border-b border-[#27272F]">
        <h2 className="text-xl font-bold text-[#F4F4F5] font-sans">Visitor Engagement</h2>
        <p className="text-xs text-[#92929C]">
          Attention span, dwell times, and how visitors navigate through your portfolio
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((k, idx) => (
          <div key={idx} className="p-5 rounded-2xl bg-[#131317] border border-[#27272F] space-y-2">
            <span className="text-xs text-[#92929C]">{k.title}</span>
            <div className="text-2xl font-extrabold text-[#F4F4F5] font-mono">{k.value}</div>
            <div className="flex items-center justify-between text-[11px] pt-1 text-[#62626C]">
              <span>{k.desc}</span>
              <span className="text-[#30B981] font-mono font-semibold">{k.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Dwell Times by Portfolio Section */}
      <div className="p-6 rounded-2xl bg-[#131317] border border-[#27272F] space-y-4">
        <div className="space-y-0.5">
          <h3 className="text-sm font-bold text-[#F4F4F5]">Attention by Portfolio Section</h3>
          <p className="text-xs text-[#92929C]">
            Time and attention distribution captured by non-blocking viewport intersection
          </p>
        </div>

        <HorizontalBarChart items={sectionDwell} />
      </div>

      {/* Entry and Exit Points */}
      <div className="p-6 rounded-2xl bg-[#131317] border border-[#27272F] space-y-4">
        <div className="space-y-0.5">
          <h3 className="text-sm font-bold text-[#F4F4F5]">Entry &amp; Exit Flow</h3>
          <p className="text-xs text-[#92929C]">Where visitors start and conclude their sessions</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#27272F] text-[10px] font-mono uppercase tracking-wider text-[#62626C]">
                <th className="py-2.5 px-3">Section URL</th>
                <th className="py-2.5 px-3">Session Entries</th>
                <th className="py-2.5 px-3">Session Exits</th>
                <th className="py-2.5 px-3">Drop-off Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#27272F]/50 font-mono">
              {entryExitPages.map((row, idx) => (
                <tr key={idx} className="hover:bg-[#19191F]/50 transition-colors">
                  <td className="py-3 px-3 text-[#F4F4F5]">{row.page}</td>
                  <td className="py-3 px-3 text-[#30B981]">{row.entries}</td>
                  <td className="py-3 px-3 text-[#E5484D]">{row.exits}</td>
                  <td className="py-3 px-3 text-[#92929C]">{row.bounce}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
