"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Sparkles, CheckCircle2, Layers, Calendar, Terminal } from "lucide-react";
import { Project } from "@/data/projects";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#050817]/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-3xl rounded-3xl border border-[#202A40] bg-[#101525] shadow-[0_25px_80px_rgba(5,8,23,0.95)] overflow-hidden z-10 max-h-[90vh] flex flex-col my-auto"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-5 sm:px-6 py-3.5 sm:py-4 border-b border-[#202A40] bg-[#080C1E] sticky top-0 z-20">
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-mono text-[#93C5FD] uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#2563EB]/15 border border-[#2563EB]/30">
                {project.category}
              </span>
              <span className="text-xs font-mono text-[#94A3B8] flex items-center gap-1">
                <Calendar size={12} className="text-[#2563EB]" />
                <span>{project.year}</span>
              </span>
            </div>

            <button
              onClick={onClose}
              type="button"
              className="w-9 h-9 rounded-full flex items-center justify-center text-[#94A3B8] hover:text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
              aria-label="Close project modal"
            >
              <X size={18} />
            </button>
          </div>

          {/* Modal Content Scroll Area */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-8">
            {/* Project Hero Visual Frame */}
            <div
              className="relative w-full aspect-video rounded-2xl overflow-hidden border border-[#202A40] p-6 flex flex-col justify-between shadow-inner"
              style={{ background: project.visualPreview.themeGradient }}
            >
              <div className="flex items-center justify-between text-[11px] font-mono text-white/70">
                <span className="flex items-center gap-1.5">
                  <Sparkles size={12} className="text-[#2563EB]" />
                  <span>PROJECT SPECIFICATION</span>
                </span>
                <span>{project.id.toUpperCase()}</span>
              </div>

              <div className="my-auto text-center space-y-2">
                <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-heading">
                  {project.visualPreview.headline}
                </div>
                <div className="text-xs sm:text-sm font-mono text-white/80">
                  {project.visualPreview.subline}
                </div>
              </div>

              <div className="flex items-center justify-between text-[10px] font-mono text-white/60">
                <span>FORMAT: {project.aspectRatio}</span>
                <span>ACTIVE MEDIA ARCHIVE</span>
              </div>
            </div>

            {/* Title & Summary */}
            <div className="space-y-3">
              <h3 className="text-3xl font-extrabold text-white tracking-tight font-heading">
                {project.title}
              </h3>
              <p className="text-base text-[#94A3B8] leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Objective */}
            <div className="p-5 rounded-2xl border border-[#202A40] bg-[#080C1E] space-y-2">
              <div className="text-[11px] font-mono text-[#2563EB] uppercase tracking-wider flex items-center gap-1.5 font-bold">
                <Terminal size={12} />
                <span>Project Objective</span>
              </div>
              <p className="text-sm text-[#CBD5E1] leading-relaxed">
                {project.objective}
              </p>
            </div>

            {/* Key Features */}
            <div className="space-y-3">
              <div className="text-xs font-mono uppercase tracking-widest text-[#64748B]">
                Key Deliverables &amp; Technical Features
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl border border-[#202A40] bg-[#080C1E] flex items-start gap-2.5 text-xs text-[#CBD5E1] leading-snug"
                  >
                    <CheckCircle2 size={14} className="text-[#2563EB] mt-0.5 shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tools & Tech Stack */}
            <div className="space-y-3 pt-2">
              <div className="text-xs font-mono uppercase tracking-widest text-[#64748B]">
                Tools &amp; Technologies
              </div>
              <div className="flex flex-wrap gap-2">
                {project.tools.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1.5 rounded-lg text-xs font-mono border border-[#202A40] bg-[#080C1E] text-white"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="px-6 py-4 border-t border-[#202A40] bg-[#080C1E] flex items-center justify-between text-xs text-[#94A3B8]">
            <span>Saimon Rana Magar Portfolio</span>
            <a
              href="#contact"
              onClick={onClose}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#2563EB] text-white font-semibold hover:bg-[#1D4ED8] transition-colors shadow-[0_0_15px_rgba(37,99,235,0.4)]"
            >
              <span>Inquire About Similar Project</span>
              <ExternalLink size={12} />
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
