"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowUpRight, Layers, Play, Globe, ExternalLink, 
  Terminal, Palette, Cpu, Sparkles, CheckCircle2 
} from "lucide-react";
import { projects, projectCategories, ProjectCategory, Project } from "@/data/projects";
import { ProjectModal } from "./ProjectModal";

interface ProjectCardProps {
  project: Project;
  idx: number;
  isRevealed: boolean;
  onOpenModal: (project: Project) => void;
  setRef: (id: string, el: HTMLElement | null) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  idx,
  isRevealed,
  onOpenModal,
  setRef,
}) => {
  const cardRef = useCallback(
    (el: HTMLElement | null) => setRef(project.id, el),
    [project.id, setRef]
  );
  const cardStyle: React.CSSProperties & {
    "--project-stagger": string;
    "--project-tilt-x": string;
    "--project-tilt-y": string;
  } = {
    "--project-stagger": `${idx * 100}ms`,
    "--project-tilt-x": "0deg",
    "--project-tilt-y": "0deg",
  };
  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (
      event.pointerType === "touch" ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    if (!bounds.width || !bounds.height) return;
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    event.currentTarget.style.setProperty("--project-tilt-x", `${(0.5 - y) * 3}deg`);
    event.currentTarget.style.setProperty("--project-tilt-y", `${(x - 0.5) * 3}deg`);
  };
  const resetPointerTilt = (event: React.PointerEvent<HTMLElement>) => {
    event.currentTarget.style.setProperty("--project-tilt-x", "0deg");
    event.currentTarget.style.setProperty("--project-tilt-y", "0deg");
  };

  return (
    <article
      ref={cardRef}
      data-project-id={project.id}
      data-revealed={isRevealed}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointerTilt}
      onClick={() => onOpenModal(project)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onOpenModal(project);
        }
      }}
      tabIndex={0}
      role="button"
      aria-haspopup="dialog"
      aria-label={`View project details for ${project.title}`}
      style={cardStyle}
      className="project-scroll-card group relative h-full rounded-2xl border border-[#1C2438] bg-[#0D1224] hover:border-[#2563EB]/70 transition-colors duration-200 overflow-hidden cursor-pointer flex flex-col justify-between shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38BDF8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050817]"
    >
      {/* Visual Card Frame */}
      {project.thumbnailUrl ? (
        <div className="relative w-full aspect-[16/10] overflow-hidden border-b border-[#1C2438] bg-[#070B18]">
          <img
            src={project.thumbnailUrl}
            alt={project.title}
            className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D1224] via-transparent to-black/60 pointer-events-none" />

          {/* Top Meta */}
          <div className="absolute top-3.5 inset-x-3.5 flex items-center justify-between text-[11px] font-mono z-10">
            <span className="px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/10 text-white/90 font-medium shadow-sm">
              {project.category}
            </span>
            <span className="px-2.5 py-1 rounded-full bg-[#2563EB]/85 text-white border border-[#38BDF8]/30 text-[10px] font-mono font-bold shadow-sm">
              {project.statusType}
            </span>
          </div>

          {/* Center Hover Action Indicator */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none">
            <div className="px-4 py-2 rounded-full bg-[#2563EB] text-white text-xs font-mono font-medium flex items-center gap-2 shadow-xl transform scale-95 group-hover:scale-100 transition-transform duration-300">
              {project.videoSrc ? (
                <Play size={13} className="fill-white" />
              ) : (
                <Globe size={13} />
              )}
              <span>{project.actionLabel}</span>
            </div>
          </div>

          {/* Bottom Tag */}
          <div className="absolute bottom-2.5 inset-x-3.5 flex items-center justify-between text-[10px] font-mono text-white/70 z-10">
            <span>{project.subtitle}</span>
            <span>{project.year}</span>
          </div>
        </div>
      ) : project.visualPreview.type === "typography-card" ? (
        /* Editorial Typographic Specimen for Aura */
        <div
          className="relative w-full aspect-[16/10] overflow-hidden p-6 flex flex-col justify-between border-b border-[#1C2438]"
          style={{ background: project.visualPreview.themeGradient }}
        >
          <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-white/80">
            <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center gap-1.5 shadow-sm">
              <Palette size={11} className="text-[#f43f5e]" />
              <span>{project.category}</span>
            </span>
            <span className="px-2.5 py-1 rounded-full bg-[#f43f5e]/20 text-[#fda4af] border border-[#f43f5e]/30 text-[10px] font-mono font-semibold shadow-sm">
              {project.statusType}
            </span>
          </div>

          <div className="relative z-10 my-auto text-center space-y-2 py-2">
            <div className="text-4xl sm:text-5xl font-black tracking-widest text-white font-serif italic drop-shadow-md">
              AURA
            </div>
            <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#fda4af]">
              Design Systems • Typography Scales
            </div>
          </div>

          <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-white/60">
            <span>12-Col Responsive Grid</span>
            <span className="flex items-center gap-1 group-hover:text-white transition-colors">
              <span>{project.actionLabel}</span>
              <ArrowUpRight size={11} />
            </span>
          </div>
        </div>
      ) : project.visualPreview.type === "code-snippet" ? (
        /* Technical Console Card for Sentinel */
        <div
          className="relative w-full aspect-[16/10] overflow-hidden p-5 flex flex-col justify-between border-b border-[#1C2438] bg-[#070d0a]"
          style={{ background: project.visualPreview.themeGradient }}
        >
          <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-white/80">
            <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center gap-1.5 shadow-sm">
              <Terminal size={11} className="text-[#4ade80]" />
              <span>{project.category}</span>
            </span>
            <span className="px-2.5 py-1 rounded-full bg-[#4ade80]/20 text-[#86efac] border border-[#4ade80]/30 text-[10px] font-mono font-semibold shadow-sm">
              {project.statusType}
            </span>
          </div>

          <div className="relative z-10 my-auto rounded-xl bg-black/85 border border-emerald-900/40 p-3.5 font-mono text-[11px] space-y-1.5 shadow-inner">
            <div className="flex items-center gap-1.5 pb-2 border-b border-white/10 text-[9px] text-[#64748B]">
              <span className="w-2 h-2 rounded-full bg-emerald-500/80" />
              <span className="ml-1 text-white/70">sentinel_bot.py • discord.py</span>
            </div>
            <div className="text-emerald-400">
              <span className="text-[#94A3B8]">@bot.event</span>
            </div>
            <div className="text-white">
              <span className="text-blue-400">async def</span> <span className="text-amber-300">on_ready</span>():
            </div>
            <div className="text-[#94A3B8] pl-3">
              logger.info(<span className="text-emerald-300">&quot;Sentinel connected to Discord&quot;</span>)
            </div>
          </div>

          <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-white/60">
            <span className="text-[#4ade80]">Async Event Loop</span>
            <span className="flex items-center gap-1 group-hover:text-white transition-colors">
              <span>{project.actionLabel}</span>
              <ArrowUpRight size={11} />
            </span>
          </div>
        </div>
      ) : (
        /* Experimental Lab Card for Neural Vistas */
        <div
          className="relative w-full aspect-[16/10] overflow-hidden p-6 flex flex-col justify-between border-b border-[#1C2438]"
          style={{ background: project.visualPreview.themeGradient }}
        >
          <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-white/80">
            <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center gap-1.5 shadow-sm">
              <Cpu size={11} className="text-[#fb923c]" />
              <span>{project.category}</span>
            </span>
            <span className="px-2.5 py-1 rounded-full bg-[#fb923c]/20 text-[#fdba74] border border-[#fb923c]/30 text-[10px] font-mono font-semibold shadow-sm">
              {project.statusType}
            </span>
          </div>

          <div className="relative z-10 my-auto text-center space-y-2 py-2">
            <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-mono">
              NEURAL VISTAS LAB
            </div>
            <div className="text-xs font-mono text-[#fdba74] max-w-xs mx-auto">
              Multimodal Generative Models &amp; Camera Testing
            </div>
          </div>

          <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-white/60">
            <span>Creative Sandbox</span>
            <span className="flex items-center gap-1 group-hover:text-white transition-colors">
              <span>{project.actionLabel}</span>
              <ArrowUpRight size={11} />
            </span>
          </div>
        </div>
      )}

      {/* Card Content Body */}
      <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-[10px] font-mono text-[#94A3B8] uppercase tracking-wider mb-2">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="text-emerald-400 font-semibold lowercase first-letter:uppercase">Verified Project</span>
              <span className="text-slate-600">•</span>
              <span>{project.category}</span>
            </span>
            <span>{project.year}</span>
          </div>
          <h3 className="text-xl font-bold text-white group-hover:text-[#38BDF8] transition-colors font-heading">
            {project.title}
          </h3>
          <p className="text-xs sm:text-sm text-[#94A3B8] mt-2 leading-relaxed line-clamp-2">
            {project.summary}
          </p>
        </div>

        {/* Contribution summary snippet */}
        <div className="pt-3 border-t border-[#1C2438]">
          <div className="text-[10px] font-mono text-[#94A3B8] uppercase tracking-wider mb-1">
            Role &amp; Contribution
          </div>
          <p className="text-xs text-[#CBD5E1] line-clamp-2 leading-relaxed">
            {project.contribution}
          </p>
        </div>

        {/* Tool Badges & CTA */}
        <div className="pt-3 border-t border-[#1C2438] flex items-center justify-between gap-2">
          <div className="flex flex-wrap gap-1">
            {project.tools.slice(0, 3).map((tool) => (
              <span
                key={tool}
                className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#070B18] text-[#94A3B8] border border-[#1C2438]"
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

          <span className="text-xs font-semibold text-white group-hover:text-[#38BDF8] flex items-center gap-1 shrink-0 transition-colors font-heading">
            <span>{project.actionLabel}</span>
            <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </span>
        </div>
      </div>
    </article>
  );
};

export const Projects: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>("All");
  const [activeProjectModal, setActiveProjectModal] = useState<Project | null>(null);
  const [revealedProjects, setRevealedProjects] = useState<Record<string, boolean>>({});
  const cardElementsRef = useRef<Map<string, HTMLElement>>(new Map());

  const registerCard = React.useCallback((id: string, el: HTMLElement | null) => {
    if (el) cardElementsRef.current.set(id, el);
    else cardElementsRef.current.delete(id);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (
      !section ||
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) return;

    let observer: IntersectionObserver | null = null;
    try {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const id = (entry.target as HTMLElement).dataset.projectId;
            if (id) setRevealedProjects((previous) => ({ ...previous, [id]: true }));
            observer?.unobserve(entry.target);
          });
        },
        { threshold: 0.15 }
      );

      cardElementsRef.current.forEach((element) => observer?.observe(element));
    } catch (error) {
      observer?.disconnect();
      console.error("Project reveal observer could not start; cards remain visible.", error);
      return;
    }

    section.classList.add("projects-reveal-ready");

    return () => {
      observer?.disconnect();
      section.classList.remove("projects-reveal-ready");
    };
  }, [selectedCategory]);

  const filteredProjects = selectedCategory === "All"
    ? projects
    : projects.filter((p) => p.category === selectedCategory);

  // Check if BudgetMandu is in current filtered list and if we're showing "All"
  const isAllView = selectedCategory === "All";
  const featuredFlagship = isAllView ? projects.find((p) => p.id === "budgetmandu") : null;
  const remainingProjects = isAllView 
    ? filteredProjects.filter((p) => p.id !== "budgetmandu") 
    : filteredProjects;

  return (
    <section ref={sectionRef} id="projects" className="py-24 sm:py-28 px-4 sm:px-8 border-t border-white/10 relative bg-[#050817]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-8 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#080C18] border border-white/10 text-xs font-medium text-[#38BDF8] mb-3">
              <Layers size={12} />
              <span>04 / SELECTED WORK</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tightest text-white leading-tight font-heading">
              Case Studies &amp; <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-200 via-slate-400 to-sky-300 font-normal font-serif italic">Selected Projects.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-slate-400 font-normal leading-relaxed">
            A curated portfolio spanning an active digital marketplace, AI cinematic experiments, rhythm-driven editing, and Python automation.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
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
                    ? "text-white font-semibold bg-[#2563EB] shadow-md"
                    : "text-[#94A3B8] bg-[#0D1224] border border-[#1C2438] hover:text-white hover:border-[#2563EB]/60"
                }`}
              >
                <span>{category}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isSelected ? "bg-white/20 text-white font-bold" : "bg-[#070B18] text-[#94A3B8]"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Varied Editorial Layout */}
        <div className="space-y-8">
          {/* =========================================================================
              FLAGSHIP HERO CASE STUDY FOR BUDGETMANDU (100% OFF-LIMITS & PROTECTED)
             ========================================================================= */}
          {featuredFlagship && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="rounded-3xl border border-[#1C2438] bg-[#0D1224] p-6 sm:p-8 lg:p-10 hover:border-[#2563EB]/70 transition-all duration-300 shadow-2xl relative overflow-hidden group"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Visual Preview (Browser Frame) */}
                <div 
                  className="lg:col-span-7 order-2 lg:order-1 cursor-pointer"
                  onClick={() => setActiveProjectModal(featuredFlagship)}
                >
                  <div className="rounded-2xl overflow-hidden border border-[#1C2438] bg-[#070B18] shadow-2xl group/img">
                    {/* Browser Chrome Header */}
                    <div className="px-4 py-2.5 bg-[#0a0f20] border-b border-[#1C2438] flex items-center justify-between text-xs font-mono">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                        <span className="ml-2 text-[#94A3B8] text-[11px] hidden sm:inline">budgetmandu.com</span>
                      </div>
                      <span className="text-[10px] text-[#38BDF8] flex items-center gap-1">
                        <CheckCircle2 size={11} className="text-emerald-400" />
                        <span>Production Release</span>
                      </span>
                    </div>

                    {/* Screenshot Area */}
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img
                        src={featuredFlagship.thumbnailUrl}
                        alt="BudgetMandu Marketplace Platform"
                        className="w-full h-full object-cover object-top transition-transform duration-700 group-hover/img:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#070B18] via-transparent to-transparent opacity-60" />

                      {/* Floating pill highlight */}
                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono">
                        <span className="px-3 py-1 rounded-full bg-[#050817]/90 backdrop-blur-md border border-[#1C2438] text-white/90">
                          Live Full-Stack Marketplace
                        </span>
                        <span className="px-3 py-1 rounded-full bg-[#2563EB] text-white font-semibold">
                          Visit ↗
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Narrative Details */}
                <div className="lg:col-span-5 order-1 lg:order-2 space-y-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[#2563EB]/20 text-[#60A5FA] border border-[#2563EB]/40">
                        {featuredFlagship.badge}
                      </span>
                      <span className="text-xs font-mono text-[#94A3B8]">
                        {featuredFlagship.year}
                      </span>
                    </div>

                    <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-heading mt-2">
                      {featuredFlagship.title}
                    </h3>
                    <div className="text-sm font-mono text-[#38BDF8] mt-1 font-medium">
                      {featuredFlagship.subtitle}
                    </div>

                    <p className="text-sm sm:text-base text-[#94A3B8] mt-4 leading-relaxed font-normal">
                      {featuredFlagship.summary}
                    </p>
                  </div>

                  {/* Core Features Bullet Points */}
                  <div className="space-y-2 pt-2 border-t border-[#1C2438]">
                    <div className="text-xs font-mono text-white/80 uppercase tracking-wider mb-2 font-semibold">
                      Engineering Highlights
                    </div>
                    {featuredFlagship.features.map((feat) => (
                      <div key={feat} className="flex items-start gap-2 text-xs text-[#CBD5E1]">
                        <span className="text-[#2563EB] font-bold">↳</span>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Stack Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {featuredFlagship.tools.map((t) => (
                      <span
                        key={t}
                        className="text-xs font-mono px-2.5 py-1 rounded-lg bg-[#070B18] text-[#94A3B8] border border-[#1C2438]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 pt-2">
                    <a
                      href={featuredFlagship.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-md font-heading"
                    >
                      <Globe size={13} />
                      <span>Visit Live Website</span>
                      <ExternalLink size={12} />
                    </a>

                    <button
                      type="button"
                      onClick={() => setActiveProjectModal(featuredFlagship)}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-[#1C2438] bg-[#070B18] text-white hover:border-[#2563EB] text-xs font-mono transition-colors"
                    >
                      <span>Read Case Study</span>
                      <ArrowUpRight size={13} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Grid for Remaining Projects */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <AnimatePresence>
              {remainingProjects.map((project, idx) => {
                // If BudgetMandu is rendered in filtered mode, keep it protected
                if (project.id === "budgetmandu") {
                  return (
                    <motion.div
                      layout
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.35 }}
                      key={project.id}
                      className="h-full"
                    >
                      <article
                        onClick={() => setActiveProjectModal(project)}
                        className="group relative h-full rounded-2xl border border-[#1C2438] bg-[#0D1224] hover:border-[#2563EB] transition-all duration-300 overflow-hidden cursor-pointer flex flex-col justify-between shadow-lg"
                      >
                        <div className="relative w-full aspect-[16/10] overflow-hidden border-b border-[#1C2438] bg-[#070B18]">
                          <img
                            src={project.thumbnailUrl}
                            alt={project.title}
                            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0D1224] via-transparent to-black/60 pointer-events-none" />
                        </div>
                        <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between text-[10px] font-mono text-[#94A3B8] uppercase tracking-wider mb-2">
                              <span>{project.category}</span>
                              <span>{project.year}</span>
                            </div>
                            <h3 className="text-xl font-bold text-white group-hover:text-[#2563EB] transition-colors font-heading">
                              {project.title}
                            </h3>
                            <p className="text-xs sm:text-sm text-[#94A3B8] mt-2 leading-relaxed line-clamp-2">
                              {project.summary}
                            </p>
                          </div>
                        </div>
                      </article>
                    </motion.div>
                  );
                }

                // The five non-flagship cards use the shared scroll reveal.
                return (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    idx={idx}
                    isRevealed={Boolean(revealedProjects[project.id])}
                    onOpenModal={setActiveProjectModal}
                    setRef={registerCard}
                  />
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Case Study Modal */}
      <ProjectModal
        project={activeProjectModal}
        onClose={() => setActiveProjectModal(null)}
      />
    </section>
  );
};
