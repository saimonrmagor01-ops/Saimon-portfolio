"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowUpRight, Sparkles, Filter, Layers, Check, ExternalLink, 
  Play, Terminal, Eye, Globe, Compass, Film, Scissors, Cpu, Palette 
} from "lucide-react";
import { projects, projectCategories, ProjectCategory, Project } from "@/data/projects";
import { ProjectModal } from "./ProjectModal";
import { TiltCard } from "./TiltCard";

export const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>("All");
  const [activeProjectModal, setActiveProjectModal] = useState<Project | null>(null);

  const filteredProjects = selectedCategory === "All"
    ? projects
    : projects.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-28 px-4 sm:px-8 border-t border-[#202A40] relative bg-[#050817]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-8 border-b border-[#202A40]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#101525] border border-[#202A40] text-xs font-medium text-[#2563EB] mb-3">
              <Layers size={12} />
              <span>04 / SELECTED WORK</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tightest text-white leading-tight font-heading">
              Projects &amp; <br />
              <span className="text-[#94A3B8] font-normal font-serif italic">Experiments.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-[#94A3B8] font-normal leading-relaxed">
            A curated portfolio spanning live digital marketplaces, AI cinematic direction, rhythm-driven post-production, design systems, and Discord bot automation.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-12">
          {projectCategories.map((category) => {
            const isSelected = selectedCategory === category;
            const count = category === "All"
              ? projects.length
              : projects.filter((p) => p.category === category).length;

            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                type="button"
                className={`relative px-4 py-2 rounded-full text-xs font-mono transition-all duration-200 flex items-center gap-2 ${
                  isSelected
                    ? "text-white font-semibold bg-[#2563EB] shadow-[0_0_15px_rgba(37,99,235,0.4)]"
                    : "text-[#94A3B8] bg-[#101525] border border-[#202A40] hover:text-white hover:border-[#2563EB]/60"
                }`}
              >
                <span>{category}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isSelected ? "bg-white/20 text-white font-bold" : "bg-[#080C1E] text-[#64748B]"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map((project, idx) => {
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  key={project.id}
                  className="h-full"
                >
                  <TiltCard
                    maxTilt={7}
                    onClick={() => setActiveProjectModal(project)}
                    className="h-full"
                  >
                    <article
                      className={`group relative h-full rounded-2xl border transition-all duration-300 overflow-hidden cursor-pointer flex flex-col justify-between ${
                        project.isFeatured
                          ? "border-[#2563EB]/50 bg-[#101525] shadow-[0_12px_45px_rgba(37,99,235,0.15)] hover:border-[#38BDF8] hover:shadow-[0_18px_60px_rgba(37,99,235,0.28)]"
                          : "border-[#202A40] bg-[#101525] hover:border-[#2563EB] hover:shadow-[0_16px_50px_rgba(37,99,235,0.2)]"
                      }`}
                    >
                      {/* Visual Card Frame */}
                      {project.thumbnailUrl ? (
                        <div className="relative w-full aspect-[16/10] overflow-hidden border-b border-[#202A40] bg-[#080C1E]">
                          <img
                            src={project.thumbnailUrl}
                            alt={project.title}
                            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                            loading="lazy"
                          />
                          {/* Atmospheric Gradient Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-[#101525] via-transparent to-black/60 pointer-events-none" />

                          {/* Top Badges */}
                          <div className="absolute top-3.5 inset-x-3.5 flex items-center justify-between text-[11px] font-mono z-10">
                            <span className="px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/10 text-white/90 font-medium">
                              {project.category}
                            </span>
                            {project.badge && (
                              <span className="px-2.5 py-1 rounded-full bg-[#2563EB]/90 text-white border border-[#38BDF8]/40 text-[10px] font-mono font-bold shadow-[0_0_15px_rgba(37,99,235,0.5)]">
                                {project.badge}
                              </span>
                            )}
                          </div>

                          {/* Interactive Hover Badge */}
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none">
                            <div className="px-4 py-2 rounded-full bg-[#2563EB]/95 backdrop-blur-md border border-white/20 text-white text-xs font-mono font-medium flex items-center gap-2 shadow-[0_0_30px_rgba(37,99,235,0.7)]">
                              {project.videoSrc ? (
                                <Play size={13} className="fill-white" />
                              ) : project.demoUrl ? (
                                <Globe size={13} />
                              ) : (
                                <Eye size={13} />
                              )}
                              <span>{project.actionLabel}</span>
                            </div>
                          </div>

                          {/* Bottom metadata strip */}
                          <div className="absolute bottom-2.5 inset-x-3.5 flex items-center justify-between text-[10px] font-mono text-white/70 z-10">
                            <span className="flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] animate-pulse" />
                              <span>{project.isFeatured ? "VERIFIED PROJECT" : "EXPERIMENT"}</span>
                            </span>
                            <span>YEAR // {project.year}</span>
                          </div>
                        </div>
                      ) : project.visualPreview.type === "typography-card" ? (
                        /* Clean Typographic Specimen for Aura Brand Concepts */
                        <div
                          className="relative w-full aspect-[16/10] overflow-hidden p-6 flex flex-col justify-between border-b border-[#202A40]"
                          style={{ background: project.visualPreview.themeGradient }}
                        >
                          <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-white/70">
                            <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center gap-1.5">
                              <Palette size={11} className="text-[#f43f5e]" />
                              <span>{project.category}</span>
                            </span>
                            <span className="px-2.5 py-1 rounded-full bg-[#f43f5e]/20 text-[#fda4af] border border-[#f43f5e]/30 text-[10px] font-mono font-semibold">
                              {project.badge}
                            </span>
                          </div>

                          {/* Typographic Center Specimen */}
                          <div className="relative z-10 my-auto text-center space-y-2 py-2">
                            <div className="text-4xl sm:text-5xl font-black tracking-widest text-white font-serif italic drop-shadow-md">
                              AURA
                            </div>
                            <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#fda4af]">
                              Design Systems • Identity • Typography
                            </div>
                            <div className="flex items-center justify-center gap-3 pt-2">
                              <span className="w-3 h-3 rounded-full bg-[#f43f5e] border border-white/20" />
                              <span className="w-3 h-3 rounded-full bg-[#fb7185] border border-white/20" />
                              <span className="w-3 h-3 rounded-full bg-[#fda4af] border border-white/20" />
                              <span className="w-3 h-3 rounded-full bg-[#101525] border border-white/30" />
                              <span className="w-3 h-3 rounded-full bg-white border border-white/40" />
                            </div>
                          </div>

                          <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-white/60">
                            <span>GRID // 12-COL SYSTEM</span>
                            <span className="flex items-center gap-1 group-hover:text-white transition-colors">
                              <span>{project.actionLabel}</span>
                              <ArrowUpRight size={11} />
                            </span>
                          </div>
                        </div>
                      ) : project.visualPreview.type === "code-snippet" ? (
                        /* Clean Technical Console for Sentinel Discord Engine */
                        <div
                          className="relative w-full aspect-[16/10] overflow-hidden p-5 flex flex-col justify-between border-b border-[#202A40] bg-[#070d0a]"
                          style={{ background: project.visualPreview.themeGradient }}
                        >
                          <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-white/70">
                            <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center gap-1.5">
                              <Terminal size={11} className="text-[#4ade80]" />
                              <span>{project.category}</span>
                            </span>
                            <span className="px-2.5 py-1 rounded-full bg-[#4ade80]/20 text-[#86efac] border border-[#4ade80]/30 text-[10px] font-mono font-semibold">
                              {project.badge}
                            </span>
                          </div>

                          {/* Terminal Code Mockup */}
                          <div className="relative z-10 my-auto rounded-xl bg-black/80 border border-emerald-900/40 p-3.5 font-mono text-[11px] space-y-1.5 shadow-inner">
                            <div className="flex items-center gap-1.5 pb-2 border-b border-white/10 text-[9px] text-[#64748B]">
                              <span className="w-2 h-2 rounded-full bg-red-500/80" />
                              <span className="w-2 h-2 rounded-full bg-amber-500/80" />
                              <span className="w-2 h-2 rounded-full bg-emerald-500/80" />
                              <span className="ml-2 text-white/60">sentinel_bot.py • asyncio</span>
                            </div>
                            <div className="text-emerald-400">
                              <span className="text-[#94A3B8]">@bot.event</span>
                            </div>
                            <div className="text-white">
                              <span className="text-blue-400">async def</span> <span className="text-amber-300">on_ready</span>():
                            </div>
                            <div className="text-[#94A3B8] pl-3">
                              logger.info(<span className="text-emerald-300">&quot;Sentinel connected [28ms]&quot;</span>)
                            </div>
                          </div>

                          <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-white/60">
                            <span className="text-[#4ade80]">STATUS // ASYNC READY</span>
                            <span className="flex items-center gap-1 group-hover:text-white transition-colors">
                              <span>{project.actionLabel}</span>
                              <ArrowUpRight size={11} />
                            </span>
                          </div>
                        </div>
                      ) : (
                        /* Sophisticated Typographic Lab Card for Neural Vistas */
                        <div
                          className="relative w-full aspect-[16/10] overflow-hidden p-6 flex flex-col justify-between border-b border-[#202A40]"
                          style={{ background: project.visualPreview.themeGradient }}
                        >
                          <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-white/70">
                            <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center gap-1.5">
                              <Cpu size={11} className="text-[#fb923c]" />
                              <span>{project.category}</span>
                            </span>
                            <span className="px-2.5 py-1 rounded-full bg-[#fb923c]/20 text-[#fdba74] border border-[#fb923c]/30 text-[10px] font-mono font-semibold">
                              {project.badge}
                            </span>
                          </div>

                          {/* Lab Telemetry Visual */}
                          <div className="relative z-10 my-auto text-center space-y-2 py-2">
                            <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-mono">
                              NEURAL VISTAS // LAB
                            </div>
                            <div className="text-xs font-mono text-[#fdba74] max-w-xs mx-auto">
                              Multimodal AI • Generative Synthesis • Prompt Architecture
                            </div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/50 border border-[#fb923c]/30 text-[10px] font-mono text-white/80">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#fb923c] animate-ping" />
                              <span>EXPERIMENT ARCHIVE 01-08</span>
                            </div>
                          </div>

                          <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-white/60">
                            <span>PROTOTYPE // SANDBOX</span>
                            <span className="flex items-center gap-1 group-hover:text-white transition-colors">
                              <span>{project.actionLabel}</span>
                              <ArrowUpRight size={11} />
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Card Body */}
                      <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between text-[10px] font-mono text-[#64748B] uppercase tracking-wider mb-2">
                            <span>{project.category}</span>
                            <span>0{idx + 1}</span>
                          </div>
                          <h3 className="text-xl font-bold text-white group-hover:text-[#2563EB] transition-colors font-heading">
                            {project.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-[#94A3B8] mt-2 leading-relaxed line-clamp-2">
                            {project.summary}
                          </p>
                        </div>

                        {/* Tool Badges & CTA */}
                        <div className="pt-4 border-t border-[#202A40] flex items-center justify-between gap-2">
                          <div className="flex flex-wrap gap-1.5">
                            {project.tools.slice(0, 3).map((tool) => (
                              <span
                                key={tool}
                                className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#080C1E] text-[#94A3B8] border border-[#202A40]"
                              >
                                {tool}
                              </span>
                            ))}
                            {project.tools.length > 3 && (
                              <span className="text-[10px] font-mono px-1.5 py-0.5 text-[#64748B]">
                                +{project.tools.length - 3}
                              </span>
                            )}
                          </div>

                          <span className="text-xs font-semibold text-white group-hover:text-[#38BDF8] flex items-center gap-1 shrink-0 transition-colors">
                            <span>{project.actionLabel}</span>
                            <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          </span>
                        </div>
                      </div>
                    </article>
                  </TiltCard>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Interactive Project Detail Modal */}
      <ProjectModal
        project={activeProjectModal}
        onClose={() => setActiveProjectModal(null)}
      />
    </section>
  );
};
