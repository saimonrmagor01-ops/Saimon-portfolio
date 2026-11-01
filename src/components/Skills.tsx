"use client";

import React from "react";
import { motion } from "framer-motion";
import { Cpu, Film, Scissors, Sparkles, Code2, Layers, Check } from "lucide-react";
import { skillCategories } from "@/data/skills";

export const Skills: React.FC = () => {
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
        return Cpu;
    }
  };

  return (
    <section id="skills" className="py-28 px-4 sm:px-8 border-t border-white/[0.08] relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-white/[0.06]">
          <div>
            <div className="text-[11px] font-mono tracking-widest text-[#9fbdff] uppercase flex items-center gap-2 mb-3">
              <Layers size={12} />
              <span>05 / TOOLS &amp; EXPERTISE</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tightest text-white leading-tight">
              My Creative &amp; <br />
              <span className="text-[#888888] font-normal font-serif italic">Technical Toolkit.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-[#92928f] font-normal leading-relaxed">
            A verified taxonomy of creative tools and software engineering capabilities. Zero arbitrary percentages — only practical application and production readiness.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, catIdx) => {
            const Icon = getCategoryIcon(category.id);
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: catIdx * 0.08 }}
                className="p-6 rounded-2xl border border-white/[0.08] bg-[#0c0c0f] hover:border-white/20 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-[#9fbdff]">
                      <Icon size={18} />
                    </div>
                    <span className="text-[10px] font-mono text-[#555555] uppercase tracking-wider">
                      CAT / 0{catIdx + 1}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white tracking-tight">
                    {category.title}
                  </h3>
                  <p className="text-xs text-[#8e8e93] mt-1 mb-6">
                    {category.subtitle}
                  </p>

                  <div className="space-y-3">
                    {category.skills.map((skill, sIdx) => (
                      <div
                        key={sIdx}
                        className="p-3 rounded-xl border border-white/[0.05] bg-white/[0.02] group hover:border-white/15 transition-all"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-white group-hover:text-[#9fbdff] transition-colors">
                            {skill.name}
                          </span>
                          {skill.highlight && (
                            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#9fbdff]/10 text-[#9fbdff] border border-[#9fbdff]/20">
                              CORE
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-[#777777] mt-1 leading-snug">
                          {skill.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-white/[0.05] text-[10px] font-mono text-[#555555] flex items-center justify-between">
                  <span>PRODUCTION VERIFIED</span>
                  <Check size={12} className="text-[#9fbdff]" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
