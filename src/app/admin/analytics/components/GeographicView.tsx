"use client";

import React from "react";
import { Globe, MapPin, ShieldAlert, Sparkles } from "lucide-react";
import { HorizontalBarChart } from "./Charts";
import { SEED_COUNTRIES } from "@/lib/analytics/mockSeed";

export const GeographicView: React.FC = () => {
  const topCities = [
    { city: "Kathmandu", country: "Nepal", visitors: 342, percentage: 27.4, flag: "🇳🇵" },
    { city: "Pokhara", country: "Nepal", visitors: 94, percentage: 7.5, flag: "🇳🇵" },
    { city: "San Francisco", country: "United States", visitors: 88, percentage: 7.0, flag: "🇺🇸" },
    { city: "New York", country: "United States", visitors: 74, percentage: 5.9, flag: "🇺🇸" },
    { city: "Delhi / NCR", country: "India", visitors: 68, percentage: 5.4, flag: "🇮🇳" },
    { city: "Bengaluru", country: "India", visitors: 58, percentage: 4.6, flag: "🇮🇳" },
    { city: "London", country: "United Kingdom", visitors: 54, percentage: 4.3, flag: "🇬🇧" },
    { city: "Singapore", country: "Singapore", visitors: 46, percentage: 3.7, flag: "🇸🇬" },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#27272F]">
        <div>
          <h2 className="text-xl font-bold text-[#F4F4F5] font-sans">Geographic Reach</h2>
          <p className="text-xs text-[#92929C]">
            Worldwide audience distribution and regional visitor volume
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-[#92929C] bg-[#131317] border border-[#27272F] px-3 py-1.5 rounded-lg">
          <MapPin size={13} className="text-[#30B981]" />
          <span>Approximate Geo via Anonymous IP Resolution</span>
        </div>
      </div>

      {/* Styled Dark World Map Visual Container */}
      <div className="p-6 rounded-2xl bg-[#131317] border border-[#27272F] space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h3 className="text-sm font-bold text-[#F4F4F5]">Global Audience Hotspots</h3>
            <p className="text-xs text-[#92929C]">
              Density of viewers exploring your portfolio across international territories
            </p>
          </div>
          <span className="text-xs font-mono text-[#30B981] bg-[#30B981]/10 px-2.5 py-1 rounded-md border border-[#30B981]/30">
            8 Countries Active
          </span>
        </div>

        <div className="relative w-full h-64 rounded-xl bg-[#09090B] border border-[#27272F] overflow-hidden flex items-center justify-center p-6">
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#27272F15_1px,transparent_1px),linear-gradient(to_bottom,#27272F15_1px,transparent_1px)] bg-[size:28px_28px]" />

          {/* Regional Hub Cards */}
          <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
            <div className="p-3.5 rounded-xl bg-[#19191F]/90 border border-[#27272F] shadow-lg text-center space-y-1">
              <span className="text-2xl">🇳🇵</span>
              <div className="text-xs font-bold text-[#F4F4F5]">Nepal (Primary)</div>
              <div className="text-[11px] font-mono text-[#30B981]">482 visits (38.6%)</div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#19191F]/90 border border-[#27272F] shadow-lg text-center space-y-1">
              <span className="text-2xl">🇺🇸</span>
              <div className="text-xs font-bold text-[#F4F4F5]">North America</div>
              <div className="text-[11px] font-mono text-[#E5484D]">342 visits (27.3%)</div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#19191F]/90 border border-[#27272F] shadow-lg text-center space-y-1">
              <span className="text-2xl">🇮🇳</span>
              <div className="text-xs font-bold text-[#F4F4F5]">South Asia</div>
              <div className="text-[11px] font-mono text-[#E5A13A]">168 visits (13.4%)</div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#19191F]/90 border border-[#27272F] shadow-lg text-center space-y-1">
              <span className="text-2xl">🇪🇺</span>
              <div className="text-xs font-bold text-[#F4F4F5]">Europe</div>
              <div className="text-[11px] font-mono text-[#38BDF8]">160 visits (12.8%)</div>
            </div>
          </div>
        </div>
      </div>

      {/* Two Column Section: Countries & Cities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Country Breakdown */}
        <div className="p-6 rounded-2xl bg-[#131317] border border-[#27272F] space-y-4">
          <div className="space-y-0.5">
            <h3 className="text-sm font-bold text-[#F4F4F5]">Country Distribution</h3>
            <p className="text-xs text-[#92929C]">Aggregated by verified territorial IP blocks</p>
          </div>

          <HorizontalBarChart
            items={SEED_COUNTRIES.map((c) => ({
              label: `${c.flag} ${c.name}`,
              value: c.visitors,
              percentage: c.percentage,
              color: c.code === "NP" ? "#30B981" : "#E5484D",
            }))}
          />
        </div>

        {/* Top Cities */}
        <div className="p-6 rounded-2xl bg-[#131317] border border-[#27272F] space-y-4">
          <div className="space-y-0.5">
            <h3 className="text-sm font-bold text-[#F4F4F5]">Top Metropolitan Areas</h3>
            <p className="text-xs text-[#92929C]">Urban centers where visitors are located</p>
          </div>

          <div className="divide-y divide-[#27272F]/50">
            {topCities.map((c, idx) => (
              <div
                key={idx}
                className="py-2.5 flex items-center justify-between text-xs hover:bg-[#19191F]/50 px-2 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-sm">{c.flag}</span>
                  <div>
                    <span className="font-semibold text-[#F4F4F5]">{c.city}</span>
                    <span className="text-[#62626C] text-[10px] ml-1.5 font-mono">
                      {c.country}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 font-mono text-xs">
                  <span className="text-[#F4F4F5]">{c.visitors} visits</span>
                  <span className="text-[#92929C] w-12 text-right">{c.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
