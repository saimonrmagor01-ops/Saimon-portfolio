"use client";

import React, { useState } from "react";
import {
  FolderGit2,
  ExternalLink,
  Github,
  Clock,
  Eye,
  UserCheck,
  TrendingUp,
  ArrowUpDown,
  Filter,
  Sparkles,
} from "lucide-react";
import { SEED_PROJECTS } from "@/lib/analytics/mockSeed";

export const ProjectPerformanceView: React.FC = () => {
  const [sortBy, setSortBy] = useState<"views" | "conversions" | "engagement">("views");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Web Development", "AI Filmmaking", "Video Editing", "Discord Bots"];

  const filteredProjects = SEED_PROJECTS.filter(
    (p) => selectedCategory === "All" || p.category === selectedCategory
  ).sort((a, b) => {
    if (sortBy === "views") return b.views - a.views;
    if (sortBy === "conversions") return b.contactConversions - a.contactConversions;
    if (sortBy === "engagement") return b.avgEngagementSeconds - a.avgEngagementSeconds;
    return 0;
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#27272F]">
        <div>
          <h2 className="text-xl font-bold text-[#F4F4F5] font-sans">Project Intelligence</h2>
          <p className="text-xs text-[#92929C]">
            Detailed audience engagement and conversion metrics across your portfolio works
          </p>
        </div>

        {/* Filters & Sorting */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Category Filter */}
          <div className="flex items-center gap-1 bg-[#131317] border border-[#27272F] rounded-lg p-1 text-xs">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCategory(c)}
                className={`px-2.5 py-1 rounded-md transition-all ${
                  selectedCategory === c
                    ? "bg-[#19191F] text-[#F4F4F5] font-semibold border border-[#27272F]"
                    : "text-[#92929C] hover:text-[#F4F4F5]"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-1.5 bg-[#131317] border border-[#27272F] rounded-lg px-2.5 py-1.5 text-xs font-mono text-[#92929C]">
            <ArrowUpDown size={12} />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent text-[#F4F4F5] focus:outline-none cursor-pointer"
            >
              <option value="views" className="bg-[#131317]">Sort by Views</option>
              <option value="conversions" className="bg-[#131317]">Sort by Inquiries</option>
              <option value="engagement" className="bg-[#131317]">Sort by Dwell Time</option>
            </select>
          </div>
        </div>
      </div>

      {/* Project Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProjects.map((project, idx) => {
          const isTop = idx === 0;

          return (
            <div
              key={project.projectId}
              className="p-6 rounded-2xl bg-[#131317] border border-[#27272F] hover:border-[#E5484D]/40 transition-all duration-300 space-y-5 relative group shadow-sm hover:shadow-lg"
            >
              {isTop && (
                <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-[#E5484D]/20 text-[#E5484D] border border-[#E5484D]/40">
                  <Sparkles size={11} />
                  <span>Top Performer</span>
                </div>
              )}

              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#92929C]">
                  {project.category}
                </span>
                <h3 className="text-base font-bold text-[#F4F4F5] group-hover:text-white transition-colors">
                  {project.title}
                </h3>
              </div>

              {/* Metric Pillars */}
              <div className="grid grid-cols-3 gap-3 p-3.5 rounded-xl bg-[#09090B] border border-[#27272F] text-center font-mono">
                <div className="space-y-0.5">
                  <span className="text-[10px] text-[#62626C] uppercase">Views</span>
                  <div className="text-lg font-bold text-[#F4F4F5]">{project.views}</div>
                </div>

                <div className="space-y-0.5 border-x border-[#27272F]">
                  <span className="text-[10px] text-[#62626C] uppercase">Unique</span>
                  <div className="text-lg font-bold text-[#30B981]">{project.uniqueVisitors}</div>
                </div>

                <div className="space-y-0.5">
                  <span className="text-[10px] text-[#62626C] uppercase">Avg Dwell</span>
                  <div className="text-lg font-bold text-[#E5A13A]">
                    {project.avgEngagementSeconds}s
                  </div>
                </div>
              </div>

              {/* Conversion & Action Stats */}
              <div className="pt-2 border-t border-[#27272F] flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-4 text-[#92929C]">
                  <span className="flex items-center gap-1">
                    <ExternalLink size={12} className="text-[#62626C]" />
                    <span>{project.externalClicks} clicks</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Github size={12} className="text-[#62626C]" />
                    <span>{project.githubClicks} repos</span>
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-[#30B981] font-semibold">
                  <span>{project.contactConversions} inquiries</span>
                  <span className="text-[10px] text-[#62626C]">({project.conversionRate}%)</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
