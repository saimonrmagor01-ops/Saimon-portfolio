"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Sparkles, Filter, Layers, Check } from "lucide-react";
import { projects, projectCategories, ProjectCategory, Project } from "@/data/projects";
import { ProjectModal } from "./ProjectModal";

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
            A curated portfolio spanning AI-assisted cinematic direction, high-retention post-production, web engineering, and Python bot architectures.
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
            {filteredProjects.map((project) => {
              return (
                <motion.article
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  key={project.id}
                  onClick={() => setActiveProjectModal(project)}
                  className="group relative rounded-2xl border border-[#202A40] bg-[#101525] hover:border-[#2563EB] hover:shadow-[0_12px_40px_rgba(37,99,235,0.18)] transition-all duration-300 overflow-hidden cursor-pointer flex flex-col justify-between"
                >
                  {/* Visual Card Frame */}
                  <div
                    className="relative w-full aspect-[16/10] overflow-hidden p-6 flex flex-col justify-between border-b border-[#202A40] transition-transform duration-500 group-hover:scale-[1.01]"
                    style={{ background: project.visualPreview.themeGradient }}
                  >
                    {/* Top Meta within art */}
                    <div className="flex items-center justify-between text-[11px] font-mono text-white/70">
                      <span className="px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10">
                        {project.category}
                      </span>
                      {project.badge && (
                        <span className="px-2.5 py-1 rounded-full bg-[#2563EB]/25 text-[#93C5FD] border border-[#2563EB]/40 text-[10px] font-mono font-semibold">
                          {project.badge}
                        </span>
                      )}
                    </div>

                    {/* Center Typography Label */}
                    <div className="my-auto text-center space-y-1">
                      <div className="text-xl sm:text-2xl font-extrabold tracking-tight text-white font-heading group-hover:text-[#93C5FD] transition-colors">
                        {project.visualPreview.headline}
                      </div>
                      <div className="text-xs font-mono text-white/70">
                        {project.visualPreview.subline}
                      </div>
                    </div>

                    {/* Bottom Specs within art */}
                    <div className="flex items-center justify-between text-[10px] font-mono text-white/60">
                      <span>YEAR // {project.year}</span>
                      <span className="flex items-center gap-1 group-hover:text-white transition-colors">
                        <span>INSPECT DETAILS</span>
                        <ArrowUpRight size={11} />
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-[10px] font-mono text-[#64748B] uppercase tracking-wider mb-2">
                        <span>{project.category}</span>
                        <span>0{projects.indexOf(project) + 1}</span>
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

                      <span className="text-xs font-medium text-white group-hover:text-[#2563EB] flex items-center gap-1 shrink-0">
                        <span>View</span>
                        <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </span>
                    </div>
                  </div>
                </motion.article>
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
