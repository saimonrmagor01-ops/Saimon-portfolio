"use client";

import React from "react";
import { AreaLineChart, HorizontalBarChart, DonutChart } from "./Charts";
import { SEED_SOURCES } from "@/lib/analytics/mockSeed";
import { TrendingUp, Smartphone, Monitor, Globe, Compass, RefreshCw } from "lucide-react";

interface TrafficAnalyticsViewProps {
  dailyTrend: {
    date: string;
    totalVisits: number;
    uniqueVisits: number;
    inquiries: number;
  }[];
}

export const TrafficAnalyticsView: React.FC<TrafficAnalyticsViewProps> = ({ dailyTrend }) => {
  const deviceSlices = [
    { label: "Desktop", value: 64, color: "#E5484D" },
    { label: "Mobile", value: 31, color: "#30B981" },
    { label: "Tablet", value: 5, color: "#E5A13A" },
  ];

  const visitorTypeSlices = [
    { label: "New Visitors", value: 74, color: "#E5484D" },
    { label: "Returning Visitors", value: 26, color: "#30B981" },
  ];

  const browsers = [
    { label: "Google Chrome", value: 684, percentage: 54.8, sublabel: "Blink" },
    { label: "Apple Safari", value: 312, percentage: 25.0, sublabel: "WebKit" },
    { label: "Mozilla Firefox", value: 142, percentage: 11.4, sublabel: "Gecko" },
    { label: "Microsoft Edge", value: 78, percentage: 6.2, sublabel: "Chromium" },
    { label: "Others", value: 32, percentage: 2.6, sublabel: "Various" },
  ];

  const operatingSystems = [
    { label: "macOS", value: 520, percentage: 41.6, sublabel: "Apple" },
    { label: "Windows 11 / 10", value: 430, percentage: 34.5, sublabel: "Microsoft" },
    { label: "iOS (iPhone/iPad)", value: 185, percentage: 14.8, sublabel: "Apple Mobile" },
    { label: "Android", value: 92, percentage: 7.4, sublabel: "Google" },
    { label: "Linux", value: 21, percentage: 1.7, sublabel: "Open Source" },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#27272F]">
        <div>
          <h2 className="text-xl font-bold text-[#F4F4F5] font-sans">Traffic &amp; Acquisition</h2>
          <p className="text-xs text-[#92929C]">
            Detailed visitor telemetry, traffic channels, and platform distribution
          </p>
        </div>
      </div>

      {/* Main Traffic Growth Chart */}
      <div className="p-6 rounded-2xl bg-[#131317] border border-[#27272F] space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-[#F4F4F5]">Daily Traffic Volume</h3>
            <p className="text-xs text-[#92929C]">Total sessions vs individual unique visitors</p>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="flex items-center gap-1.5 text-[#F4F4F5]">
              <span className="w-2 h-2 rounded-full bg-[#E5484D]" />
              Total Traffic
            </span>
            <span className="flex items-center gap-1.5 text-[#92929C]">
              <span className="w-2 h-2 rounded-full bg-[#30B981]" />
              Unique Reach
            </span>
          </div>
        </div>

        <AreaLineChart data={dailyTrend} height={280} />
      </div>

      {/* Grid: Traffic Sources & Device Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Acquisition Sources */}
        <div className="p-6 rounded-2xl bg-[#131317] border border-[#27272F] space-y-4">
          <div className="space-y-0.5">
            <h3 className="text-sm font-bold text-[#F4F4F5]">Acquisition Channels</h3>
            <p className="text-xs text-[#92929C]">Referrers, search engines, and direct navigations</p>
          </div>

          <HorizontalBarChart
            items={SEED_SOURCES.map((s) => ({
              label: s.name,
              value: s.count,
              percentage: s.percentage,
              color: "#E5484D",
            }))}
          />
        </div>

        {/* Device Breakdown Donut */}
        <div className="p-6 rounded-2xl bg-[#131317] border border-[#27272F] space-y-6">
          <div className="space-y-0.5">
            <h3 className="text-sm font-bold text-[#F4F4F5]">Device Categories</h3>
            <p className="text-xs text-[#92929C]">Client hardware and form factor breakdown</p>
          </div>

          <div className="pt-2">
            <DonutChart slices={deviceSlices} size={150} />
          </div>

          <div className="pt-4 border-t border-[#27272F]">
            <div className="text-xs font-semibold text-[#F4F4F5] mb-2">Visitor Retention</div>
            <DonutChart slices={visitorTypeSlices} size={120} />
          </div>
        </div>
      </div>

      {/* Browsers and Operating Systems */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-[#131317] border border-[#27272F] space-y-4">
          <div className="space-y-0.5">
            <h3 className="text-sm font-bold text-[#F4F4F5]">Top Browsers</h3>
            <p className="text-xs text-[#92929C]">Rendering engines used by your audience</p>
          </div>
          <HorizontalBarChart items={browsers} />
        </div>

        <div className="p-6 rounded-2xl bg-[#131317] border border-[#27272F] space-y-4">
          <div className="space-y-0.5">
            <h3 className="text-sm font-bold text-[#F4F4F5]">Operating Systems</h3>
            <p className="text-xs text-[#92929C]">Client platforms and desktop/mobile environments</p>
          </div>
          <HorizontalBarChart items={operatingSystems} />
        </div>
      </div>
    </div>
  );
};
