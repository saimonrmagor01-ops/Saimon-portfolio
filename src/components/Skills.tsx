"use client";

import React from "react";
import { motion } from "framer-motion";
import { Film, Scissors, Sparkles, Code2, Bot, Layers, Wrench } from "lucide-react";
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

  return (
    <section id="skills" className="py-24 px-4 sm:px-8 border-t border-[#202A40] relative bg-[#050817]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header (Reference Screenshot Style) */}
        <div className="text-center max-w-2xl mx-auto mb-16">
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

        {/* 5-Column Grid (Exact Reference Screenshot Layout) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-5 items-stretch">
          {skillCategories.map((category, catIdx) => {
            const Icon = getCategoryIcon(category.id);
            const shortTitle = getCategoryShortTitle(category.id, category.title);

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: catIdx * 0.08 }}
                className="p-5 rounded-2xl border border-[#202A40] bg-[#101525] hover:border-[#2563EB] hover:shadow-[0_8px_30px_rgba(37,99,235,0.18)] transition-all duration-300 flex flex-col justify-between group"
              >
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
                    {category.skills.map((skill, sIdx) => (
                      <li key={sIdx} className="flex items-start gap-2 text-xs text-[#94A3B8] leading-snug">
                        <span className="text-[#2563EB] font-bold select-none text-sm leading-none mt-0.5">•</span>
                        <div className="flex-1">
                          <span className="font-medium text-[#E2E8F0] group-hover:text-white transition-colors">
                            {skill.name}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Subtitle / Scope Footnote */}
                <div className="pt-4 mt-5 border-t border-[#202A40] text-[10px] font-mono text-[#64748B] flex items-center justify-between">
                  <span>PRODUCTION READY</span>
                  <span className="text-[#2563EB]">100%</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
