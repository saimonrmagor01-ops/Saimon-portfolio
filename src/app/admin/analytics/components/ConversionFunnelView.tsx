"use client";

import React from "react";
import { GitFork, ArrowDown, Sparkles, TrendingUp, ArrowRight } from "lucide-react";
import { FunnelStage } from "@/lib/analytics/types";

interface ConversionFunnelViewProps {
  stages: FunnelStage[];
}

export const ConversionFunnelView: React.FC<ConversionFunnelViewProps> = ({ stages }) => {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="pb-4 border-b border-[#27272F]">
        <h2 className="text-xl font-bold text-[#F4F4F5] font-sans">Client Conversion Funnel</h2>
        <p className="text-xs text-[#92929C]">
          Step-by-step pipeline from cold portfolio visitor to paid &amp; completed creative project
        </p>
      </div>

      {/* Visual Connected Funnel */}
      <div className="p-6 rounded-2xl bg-[#131317] border border-[#27272F] space-y-6">
        <div className="space-y-4">
          {stages.map((stage, idx) => {
            const isFirst = idx === 0;
            const isLast = idx === stages.length - 1;

            return (
              <div key={stage.id} className="space-y-2">
                <div className="p-4 rounded-xl bg-[#19191F] border border-[#27272F] hover:border-[#E5484D]/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-[#09090B] border border-[#27272F] text-[11px] font-mono text-[#92929C] flex items-center justify-center font-bold">
                      0{idx + 1}
                    </span>
                    <div>
                      <div className="text-sm font-bold text-[#F4F4F5]">{stage.name}</div>
                      <div className="text-[11px] text-[#92929C] font-mono">
                        {isFirst ? "Baseline Audience" : `${stage.stepConversionRate}% retained from previous step`}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 font-mono text-xs">
                    <div className="text-right">
                      <div className="text-base font-extrabold text-[#F4F4F5]">
                        {stage.count.toLocaleString()}
                      </div>
                      <div className="text-[10px] text-[#62626C] uppercase">
                        {stage.conversionRate}% overall
                      </div>
                    </div>

                    {!isFirst && (
                      <div className="text-right border-l border-[#27272F] pl-4">
                        <div className="text-xs font-semibold text-[#E5484D]">
                          -{stage.dropOffRate}%
                        </div>
                        <div className="text-[10px] text-[#62626C] uppercase">Drop-off</div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Connecting arrow if not last */}
                {!isLast && (
                  <div className="flex justify-center py-0.5">
                    <ArrowDown size={14} className="text-[#62626C]" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
