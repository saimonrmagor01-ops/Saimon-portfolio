"use client";

import React from "react";
import { ShieldCheck, ShieldAlert, Cpu, EyeOff, CheckCircle2, AlertTriangle } from "lucide-react";
import { DonutChart, HorizontalBarChart } from "./Charts";

export const TrafficQualityView: React.FC = () => {
  const qualitySlices = [
    { label: "Verified Human", value: 91, color: "#30B981" },
    { label: "Automated Crawlers", value: 6, color: "#E5A13A" },
    { label: "Filtered Scrapers", value: 3, color: "#E5484D" },
  ];

  const crawlers = [
    { label: "Googlebot (Search Indexer)", value: 48, percentage: 60, sublabel: "Verified Crawler" },
    { label: "Bingbot / BingPreview", value: 18, percentage: 22, sublabel: "Verified Crawler" },
    { label: "Discordbot Preview", value: 10, percentage: 12, sublabel: "Social Embed" },
    { label: "Headless / Unknown Scraper", value: 5, percentage: 6, sublabel: "Filtered Out" },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="pb-4 border-b border-[#27272F]">
        <h2 className="text-xl font-bold text-[#F4F4F5] font-sans">Traffic Quality &amp; Bot Filtering</h2>
        <p className="text-xs text-[#92929C]">
          Automated scraper protection, search engine spider classification, and human verification
        </p>
      </div>

      {/* Quality Overview Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-[#131317] border border-[#27272F] space-y-4 col-span-1 md:col-span-2">
          <div className="space-y-0.5">
            <h3 className="text-sm font-bold text-[#F4F4F5]">Traffic Authenticity Distribution</h3>
            <p className="text-xs text-[#92929C]">
              Analytics filtering ensures your reports only reflect genuine prospective clients
            </p>
          </div>

          <div className="pt-2">
            <DonutChart slices={qualitySlices} size={150} />
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-[#131317] border border-[#27272F] flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#30B981]/15 text-[#30B981] border border-[#30B981]/30 flex items-center justify-center">
              <ShieldCheck size={20} />
            </div>
            <h3 className="text-base font-bold text-[#F4F4F5]">Human Authenticity Score</h3>
            <p className="text-xs text-[#92929C]">
              91.4% of recorded visits exhibit human scroll mechanics, pointer coordinates, and genuine session lifecycles.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-[#09090B] border border-[#27272F] text-[11px] font-mono text-[#30B981] flex items-center gap-2">
            <CheckCircle2 size={14} />
            <span>Spam &amp; Crawler Filter: Active</span>
          </div>
        </div>
      </div>

      {/* Detected Spiders Table */}
      <div className="p-6 rounded-2xl bg-[#131317] border border-[#27272F] space-y-4">
        <div className="space-y-0.5">
          <h3 className="text-sm font-bold text-[#F4F4F5]">Detected Automated User-Agents</h3>
          <p className="text-xs text-[#92929C]">
            Search engine indexers and web bots safely segregated from human conversion funnels
          </p>
        </div>

        <HorizontalBarChart items={crawlers} />
      </div>
    </div>
  );
};
