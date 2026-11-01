"use client";

import React, { useState, useRef, useEffect, MouseEvent } from "react";
import { motion, AnimatePresence, useSpring } from "framer-motion";
import { 
  Film, Scissors, Sparkles, Code2, Bot, Wrench, CheckCircle2, 
  ArrowUpRight, X, ExternalLink, Layers, Terminal 
} from "lucide-react";
import { skillCategories, SkillCategory, SkillItem } from "@/data/skills";

// 3D Layered Perspective Skill Card Component
interface LayeredSkillCardProps {
  category: SkillCategory;
  catIndex: number;
  activeSkillName: string | null;
  onSelectSkill: (skill: SkillItem, categoryTitle: string, triggerEl: HTMLElement) => void;
}

const LayeredSkillCard: React.FC<LayeredSkillCardProps> = ({
  category,
  catIndex,
  activeSkillName,
  onSelectSkill,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Controlled springs limited to ~5-6 degrees max tilt for refined studio feel
  const rotateX = useSpring(0, { damping: 24, stiffness: 260, mass: 0.3 });
  const rotateY = useSpring(0, { damping: 24, stiffness: 260, mass: 0.3 });
  const translateY = useSpring(0, { damping: 24, stiffness: 260, mass: 0.3 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    // Check for touch / reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    // Max tilt ~5.5 degrees
    const maxTilt = 5.5;
    const rX = (0.5 - y) * (maxTilt * 2);
    const rY = (x - 0.5) * (maxTilt * 2);

    rotateX.set(rX);
    rotateY.set(rY);
    translateY.set(-4); // subtle 4px lift

    setGlare({
      x: x * 100,
      y: y * 100,
      opacity: 0.28,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    rotateX.set(0);
    rotateY.set(0);
    translateY.set(0);
    setGlare((prev) => ({ ...prev, opacity: 0 }));
  };

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

  const Icon = getCategoryIcon(category.id);
  const shortTitle = getCategoryShortTitle(category.id, category.title);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1000 }}
      className="h-full relative rounded-2xl"
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          y: translateY,
          transformStyle: "preserve-3d",
        }}
        className={`h-full p-5 rounded-2xl border transition-colors duration-200 bg-[#101525] flex flex-col justify-between relative overflow-hidden group select-none ${
          isHovered
            ? "border-[#2563EB]/80 bg-[#12192d] shadow-[0_20px_50px_rgba(37,99,235,0.22)]"
            : "border-[#202A40] shadow-md"
        }`}
      >
        {/* Soft Blue Pointer-Following Highlight Layer */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-10 rounded-2xl"
          style={{
            opacity: glare.opacity,
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(37, 99, 235, 0.32) 0%, rgba(56, 189, 248, 0.12) 35%, transparent 70%)`,
          }}
        />

        {/* Card Content with 3D Depth Layering */}
        <div style={{ transformStyle: "preserve-3d" }}>
          {/* Header Row with Elevated Icon and Title (translateZ) */}
          <div
            className="flex items-center gap-3 mb-5 pb-4 border-b border-[#202A40]"
            style={{ transform: "translateZ(18px)" }}
          >
            {/* Elevated Icon Box */}
            <div
              style={{ transform: "translateZ(14px)" }}
              className="w-10 h-10 rounded-xl bg-[#080C1E] border border-[#202A40] text-[#2563EB] flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105 group-hover:border-[#2563EB] shadow-sm"
            >
              <Icon size={18} />
            </div>

            {/* Elevated Heading Layer */}
            <div style={{ transform: "translateZ(10px)" }}>
              <h3 className="text-sm font-bold text-white font-heading group-hover:text-[#2563EB] transition-colors">
                {shortTitle}
              </h3>
              <span className="text-[10px] font-mono text-[#64748B] uppercase tracking-wider block">
                CAT / 0{catIndex + 1}
              </span>
            </div>
          </div>

          {/* Bullet Points List with Tap/Click Interaction */}
          <ul className="space-y-2.5 relative z-20">
            {category.skills.map((skill, sIdx) => {
              const isSelected = activeSkillName === skill.name;
              return (
                <li key={sIdx}>
                  <button
                    type="button"
                    onClick={(e) => onSelectSkill(skill, shortTitle, e.currentTarget)}
                    className={`w-full text-left flex items-start gap-2 text-xs leading-snug p-1.5 rounded-lg transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#2563EB] ${
                      isSelected
                        ? "bg-[#2563EB]/20 text-white border border-[#2563EB]/50"
                        : "text-[#94A3B8] hover:bg-white/[0.04] hover:text-white"
                    }`}
                    title={`Click to view how I apply ${skill.name}`}
                    aria-label={`Explore details for skill: ${skill.name}`}
                  >
                    <span className="text-[#2563EB] font-bold select-none text-sm leading-none mt-0.5">•</span>
                    <div className="flex-1 flex items-center justify-between gap-1">
                      <span className="font-medium">{skill.name}</span>
                      <ArrowUpRight size={11} className="opacity-0 group-hover:opacity-60 transition-opacity shrink-0" />
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Footer Meta Row */}
        <div
          style={{ transform: "translateZ(12px)" }}
          className="pt-4 mt-5 border-t border-[#202A40] text-[10px] font-mono text-[#64748B] flex items-center justify-between relative z-20"
        >
          <span>VERIFIED TOOLKIT</span>
          <span className="text-[#38BDF8] font-medium">{category.skills.length} TOOLS</span>
        </div>
      </motion.div>
    </div>
  );
};

export const Skills: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [activeSkill, setActiveSkill] = useState<{
    skill: SkillItem;
    categoryTitle: string;
  } | null>(null);

  const originatingTriggerRef = useRef<HTMLElement | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

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

  const handleSelectSkill = (skill: SkillItem, categoryTitle: string, triggerEl: HTMLElement) => {
    originatingTriggerRef.current = triggerEl;
    setActiveSkill({ skill, categoryTitle });
  };

  const handleClosePanel = () => {
    setActiveSkill(null);
    // Restore keyboard focus to the originating skill button
    setTimeout(() => {
      originatingTriggerRef.current?.focus();
    }, 50);
  };

  // Keyboard Escape listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && activeSkill) {
        handleClosePanel();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeSkill]);

  return (
    <section id="skills" className="py-24 px-4 sm:px-8 border-t border-[#202A40] relative bg-[#050817]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
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
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all duration-200 min-h-[36px] ${
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

        {/* 5-Column Grid with AnimatePresence & Layout Transitions */}
        <motion.div
          layout
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className={`grid gap-4 lg:gap-5 items-stretch transition-all ${
            filteredCategories.length === 1
              ? "grid-cols-1 max-w-xl mx-auto"
              : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-5"
          }`}
        >
          <AnimatePresence mode="popLayout">
            {filteredCategories.map((category, catIdx) => (
              <motion.div
                key={category.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3, delay: catIdx * 0.04 }}
                className="h-full"
              >
                <LayeredSkillCard
                  category={category}
                  catIndex={catIdx}
                  activeSkillName={activeSkill?.skill.name ?? null}
                  onSelectSkill={handleSelectSkill}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Expanded Skill Detail Panel (Appears smoothly below grid while keeping layout stable) */}
        <AnimatePresence>
          {activeSkill && (
            <motion.div
              ref={panelRef}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 max-w-3xl mx-auto p-5 sm:p-7 rounded-2xl border border-[#2563EB]/50 bg-[#101525] shadow-[0_18px_50px_rgba(37,99,235,0.22)] relative overflow-hidden"
            >
              {/* Radial subtle ambient lighting */}
              <div
                className="absolute -top-20 -right-20 w-52 h-52 rounded-full pointer-events-none radial-glow-blue opacity-50 blur-3xl"
                aria-hidden="true"
              />

              {/* Panel Top Meta & Close Button */}
              <div className="flex items-center justify-between pb-4 border-b border-[#202A40]">
                <div className="flex items-center gap-2 text-xs font-mono">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#2563EB]/15 border border-[#2563EB]/30 text-[#38BDF8] font-bold">
                    {activeSkill.categoryTitle}
                  </span>
                  <span className="text-[#64748B]">•</span>
                  <span className="text-white font-bold">{activeSkill.skill.name}</span>
                </div>

                <button
                  onClick={handleClosePanel}
                  type="button"
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[#94A3B8] hover:text-white hover:bg-white/10 border border-[#202A40] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#2563EB]"
                  aria-label="Close skill details"
                >
                  <X size={15} />
                </button>
              </div>

              {/* Panel Body: Genuine Application Explanation */}
              <div className="py-4 space-y-3">
                <div className="text-xs font-mono uppercase tracking-wider text-[#2563EB] flex items-center gap-1.5 font-bold">
                  <Terminal size={13} />
                  <span>Practical Implementation</span>
                </div>
                <p className="text-sm sm:text-base text-white leading-relaxed">
                  {activeSkill.skill.howIUseIt}
                </p>
                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  {activeSkill.skill.description}
                </p>
              </div>

              {/* Related Existing Project Link (If applicable) */}
              {activeSkill.skill.relatedProjectId && (
                <div className="pt-3 border-t border-[#202A40] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="text-xs text-[#94A3B8] flex items-center gap-1.5 font-mono">
                    <span>Applied in build:</span>
                    <span className="text-white font-bold">{activeSkill.skill.relatedProjectTitle}</span>
                  </div>

                  <a
                    href="#projects"
                    onClick={handleClosePanel}
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold bg-[#2563EB] hover:bg-[#1D4ED8] text-white transition-colors self-start sm:self-center font-heading shadow-sm"
                  >
                    <span>View Project in Archive</span>
                    <ArrowUpRight size={13} />
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
