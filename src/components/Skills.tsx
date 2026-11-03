"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { 
  Film, Scissors, Code2, Bot, Wrench, 
  ArrowUpRight, X, Terminal, ChevronRight 
} from "lucide-react";
import { skillCategories, SkillCategory, SkillItem } from "@/data/skills";

export const Skills: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [activeSkill, setActiveSkill] = useState<{
    skill: SkillItem;
    categoryTitle: string;
  } | null>(null);

  const detailPanelRef = useRef<HTMLDivElement>(null);

  const filterTabs = [
    { id: "all", label: "All Skills" },
    { id: "ai-filmmaking", label: "AI Filmmaking" },
    { id: "video-editing", label: "Video Editing" },
    { id: "web-dev", label: "Web Development" },
    { id: "python-automation", label: "Python & Automation" },
    { id: "creative-tools", label: "Creative Tools" },
  ];

  const filteredCategories =
    selectedFilter === "all"
      ? skillCategories
      : skillCategories.filter((c) => c.id === selectedFilter);

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case "ai-filmmaking":
        return Film;
      case "video-editing":
        return Scissors;
      case "web-dev":
        return Code2;
      case "python-automation":
        return Bot;
      case "creative-tools":
      default:
        return Wrench;
    }
  };

  const handleSelectSkill = (skill: SkillItem, categoryTitle: string) => {
    setActiveSkill({ skill, categoryTitle });
    setTimeout(() => {
      detailPanelRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 100);
  };

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && activeSkill) {
        setActiveSkill(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeSkill]);

  return (
    <section id="skills" className="py-24 sm:py-28 px-4 sm:px-8 border-t border-white/10 relative bg-[#050817]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-8 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#080C18] border border-white/10 text-xs font-medium text-[#38BDF8] mb-3">
              <Wrench size={12} />
              <span>05 / SKILLS &amp; EXPERTISE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tightest text-white leading-tight font-heading">
              Practical Skills &amp; <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-200 via-slate-400 to-sky-300 font-normal font-serif italic">Creative Tools.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-[#94A3B8] font-normal leading-relaxed">
            The creative tools, programming frameworks, and video production software I use across real projects.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          {filterTabs.map((tab) => {
            const isActive = selectedFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedFilter(tab.id)}
                type="button"
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all duration-200 min-h-[36px] ${
                  isActive
                    ? "bg-[#2563EB] text-white font-medium shadow-md border border-[#2563EB]"
                    : "bg-[#0D1224] text-[#94A3B8] border border-[#1C2438] hover:border-[#2563EB]/60 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Categories Grid */}
        <div
          className={`grid gap-6 items-stretch ${
            filteredCategories.length === 1
              ? "grid-cols-1 max-w-xl mx-auto"
              : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {filteredCategories.map((category, catIdx) => {
            const Icon = getCategoryIcon(category.id);
            return (
              <motion.div
                key={category.id}
                className="skills-reveal p-6 rounded-2xl border border-[#1C2438] bg-[#0D1224] hover:border-[#2563EB]/70 transition-all duration-300 flex flex-col justify-between shadow-lg"
                initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
                whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.5,
                  delay: catIdx * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-4 pb-4 border-b border-[#1C2438]">
                    <div className="w-10 h-10 rounded-xl bg-[#070B18] border border-[#1C2438] text-[#2563EB] flex items-center justify-center shrink-0">
                      <Icon size={18} />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white font-heading">
                        {category.title}
                      </h3>
                      <span className="text-[10px] font-mono text-[#94A3B8] uppercase tracking-wider block">
                        Category 0{catIdx + 1}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-[#94A3B8] mb-5 leading-relaxed">
                    {category.subtitle}
                  </p>

                  {/* Skills List */}
                  <ul className="space-y-2">
                    {category.skills.map((skill, sIdx) => {
                      const isSelected = activeSkill?.skill.name === skill.name;
                      return (
                        <li key={sIdx}>
                          <button
                            type="button"
                            onClick={() => handleSelectSkill(skill, category.title)}
                            className={`w-full text-left p-2.5 rounded-xl text-xs transition-all flex items-center justify-between gap-2 group ${
                              isSelected
                                ? "bg-[#2563EB]/20 text-white border border-[#2563EB]/50"
                                : "text-[#CBD5E1] bg-[#070B18] border border-[#1C2438] hover:border-[#2563EB]/50 hover:text-white"
                            }`}
                            aria-label={`View implementation details for ${skill.name}`}
                          >
                            <span className="font-medium truncate">{skill.name}</span>
                            <ChevronRight
                              size={13}
                              className={`shrink-0 transition-transform ${
                                isSelected ? "text-[#38BDF8] rotate-90" : "text-[#64748B] group-hover:text-white group-hover:translate-x-0.5"
                              }`}
                            />
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <div className="pt-4 mt-5 border-t border-[#1C2438] text-[10px] font-mono text-[#94A3B8] flex items-center justify-between">
                  <span>Production Ready</span>
                  <span className="text-[#38BDF8]">{category.skills.length} Capabilities</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Selected Skill Detail Callout */}
        <AnimatePresence>
          {activeSkill && (
            <motion.div
              ref={detailPanelRef}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.25 }}
              className="mt-8 p-6 sm:p-7 rounded-2xl border border-[#2563EB]/50 bg-[#0D1224] shadow-2xl relative overflow-hidden"
            >
              <div className="flex items-center justify-between pb-4 border-b border-[#1C2438]">
                <div className="flex items-center gap-2 text-xs font-mono">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#2563EB]/15 border border-[#2563EB]/30 text-[#38BDF8] font-bold">
                    {activeSkill.categoryTitle}
                  </span>
                  <span className="text-[#64748B]">•</span>
                  <span className="text-white font-bold">{activeSkill.skill.name}</span>
                </div>

                <button
                  onClick={() => setActiveSkill(null)}
                  type="button"
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[#94A3B8] hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Close skill details"
                >
                  <X size={15} />
                </button>
              </div>

              <div className="py-4 space-y-2">
                <div className="text-xs font-mono uppercase tracking-wider text-[#2563EB] flex items-center gap-1.5 font-bold">
                  <Terminal size={13} />
                  <span>Practical Implementation</span>
                </div>
                <p className="text-sm sm:text-base text-white leading-relaxed">
                  {activeSkill.skill.howIUseIt}
                </p>
                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  {activeSkill.skill.summary}
                </p>
              </div>

              {activeSkill.skill.relatedProjectId && (
                <div className="pt-3 border-t border-[#1C2438] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-[#94A3B8]">
                  <span>Applied in: <strong className="text-white">{activeSkill.skill.relatedProjectTitle}</strong></span>
                  <a
                    href="#projects"
                    onClick={() => setActiveSkill(null)}
                    className="inline-flex items-center gap-1 text-[#38BDF8] hover:text-white transition-colors"
                  >
                    <span>View Project</span>
                    <ArrowUpRight size={12} />
                  </a>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
