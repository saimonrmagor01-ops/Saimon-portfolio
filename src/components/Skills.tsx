"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Film, Scissors, Sparkles, Code2, Bot, Wrench, CheckCircle2, ChevronRight, Layers } from "lucide-react";
import { skillCategories, SkillCategory } from "@/data/skills";
import { TiltCard } from "./TiltCard";

export const Skills: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [activeSkillDetail, setActiveSkillDetail] = useState<{
    name: string;
    description: string;
    category: string;
  } | null>(null);

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case "creative":
        return Film;
      case "editing":
        return Scissors;
      case "ai":
        return Sparkles;
      case "development":
        return Code2;
      case "other":
      default:
        return Bot;
    }
  };

  const getCategoryShortTitle = (id: string, fallback: string) => {
    switch (id) {
      case "development":
        return "Frontend & Web";
      case "ai":
        return "Generative AI";
      case "creative":
        return "AI Filmmaking";
      case "editing":
        return "Video & Post";
      case "other":
        return "Bots & Automation";
      default:
        return fallback;
    }
  };

  const filterTabs = [
    { id: "all", label: "All Disciplines" },
    { id: "creative", label: "AI Cinema" },
    { id: "editing", label: "Post-Production" },
    { id: "ai", label: "Generative AI" },
    { id: "development", label: "Web Engineering" },
    { id: "other", label: "Automation" },
  ];

  const filteredCategories =
    selectedFilter === "all"
      ? skillCategories
      : skillCategories.filter((c) => c.id === selectedFilter);

  return (
    <section id="skills" className="py-24 px-4 sm:px-8 border-t border-[#202A40] relative bg-[#050817]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header (Reference Screenshot Style) */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#101525] border border-[#202A40] text-xs font-medium text-[#2563EB] mb-4 shadow-sm">
            <Wrench size={12} className="text-[#2563EB]" />
            <span>SKILLS &amp; EXPERTISE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white font-heading">
            Skills &amp; Expertise
          </h2>

          <p className="text-sm sm:text-base text-[#94A3B8] mt-3 leading-relaxed">
            Technologies and tools I use to build scalable web applications, automation bots and cinematic workflows.
          </p>
        </div>

        {/* Interactive Capability Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {filterTabs.map((tab) => {
            const isActive = selectedFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedFilter(tab.id)}
                type="button"
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all duration-200 ${
                  isActive
                    ? "bg-[#2563EB] text-white shadow-[0_0_15px_rgba(37,99,235,0.4)] border border-[#2563EB]"
                    : "bg-[#101525] text-[#94A3B8] border border-[#202A40] hover:border-[#2563EB]/60 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* 5-Column Grid (Exact Reference Screenshot Layout) */}
        <div
          className={`grid gap-4 lg:gap-5 items-stretch transition-all ${
            filteredCategories.length === 1
              ? "grid-cols-1 max-w-xl mx-auto"
              : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-5"
          }`}
        >
          {filteredCategories.map((category, catIdx) => {
            const Icon = getCategoryIcon(category.id);
            const shortTitle = getCategoryShortTitle(category.id, category.title);

            return (
              <motion.div
                key={category.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: catIdx * 0.05 }}
              >
                <TiltCard maxTilt={5} className="h-full">
                  <div className="h-full p-5 rounded-2xl border border-[#202A40] bg-[#101525] hover:border-[#2563EB] hover:shadow-[0_8px_30px_rgba(37,99,235,0.18)] transition-all duration-300 flex flex-col justify-between group">
                    <div>
                      {/* Card Header with Icon Box */}
                      <div className="flex items-center gap-3 mb-5 pb-4 border-b border-[#202A40]">
                        <div className="w-10 h-10 rounded-xl bg-[#080C1E] border border-[#202A40] text-[#2563EB] flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 group-hover:border-[#2563EB]">
                          <Icon size={18} />
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-white font-heading group-hover:text-[#2563EB] transition-colors">
                            {shortTitle}
                          </h3>
                          <span className="text-[10px] font-mono text-[#64748B] uppercase tracking-wider block">
                            CAT / 0{catIdx + 1}
                          </span>
                        </div>
                      </div>

                      {/* Bullet Points List (Matching Screenshot) */}
                      <ul className="space-y-2.5">
                        {category.skills.map((skill, sIdx) => {
                          const isHighlighted = activeSkillDetail?.name === skill.name;
                          return (
                            <li
                              key={sIdx}
                              onClick={() =>
                                setActiveSkillDetail(
                                  isHighlighted
                                    ? null
                                    : {
                                        name: skill.name,
                                        description: skill.description,
                                        category: shortTitle,
                                      }
                                )
                              }
                              className={`flex items-start gap-2 text-xs text-[#94A3B8] leading-snug cursor-pointer p-1 rounded-lg transition-colors ${
                                isHighlighted
                                  ? "bg-[#2563EB]/15 text-white"
                                  : "hover:bg-white/[0.03]"
                              }`}
                              title="Click for skill info"
                            >
                              <span className="text-[#2563EB] font-bold select-none text-sm leading-none mt-0.5">•</span>
                              <div className="flex-1">
                                <span className="font-medium text-[#E2E8F0] group-hover:text-white transition-colors">
                                  {skill.name}
                                </span>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </div>

                    {/* Card Subtitle / Scope Footnote */}
                    <div className="pt-4 mt-5 border-t border-[#202A40] text-[10px] font-mono text-[#64748B] flex items-center justify-between">
                      <span>VERIFIED STACK</span>
                      <span className="text-[#2563EB] font-medium">{category.skills.length} TOOLS</span>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>

        {/* Selected Skill Detail Modal / Toast Callout */}
        <AnimatePresence>
          {activeSkillDetail && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="mt-8 max-w-xl mx-auto p-4 rounded-xl border border-[#2563EB]/40 bg-[#080C1E]/95 backdrop-blur-md shadow-2xl flex items-start justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-mono text-[#2563EB]">
                  <CheckCircle2 size={13} />
                  <span>{activeSkillDetail.category}</span>
                  <span className="text-[#64748B]">•</span>
                  <span className="text-white font-semibold">{activeSkillDetail.name}</span>
                </div>
                <p className="text-xs text-[#CBD5E1] leading-relaxed">
                  {activeSkillDetail.description}
                </p>
              </div>
              <button
                onClick={() => setActiveSkillDetail(null)}
                className="text-[10px] font-mono text-[#64748B] hover:text-white px-2 py-1 rounded bg-[#101525] border border-[#202A40]"
              >
                CLOSE
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
