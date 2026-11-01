"use client";

import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, ArrowRight, Sparkles, Terminal, Layers, ArrowUpRight } from "lucide-react";
import { Service } from "@/data/services";
import { projects, Project } from "@/data/projects";

interface ServiceDetailModalProps {
  service: Service | null;
  onClose: () => void;
  onSelectService?: (serviceTitle: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onSelectService,
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Find genuine related project if one exists
  const relatedProject: Project | undefined = service?.relatedProjectId
    ? projects.find((p) => p.id === service.relatedProjectId)
    : undefined;

  // Reduced motion preference
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (!service) return;

    // 1. Lock background body scrolling
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // 2. Focus close button on mount
    const timer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    // 3. Escape key & Focus Trap
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === "Tab" && dialogRef.current) {
        const focusableElements = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [service, onClose]);

  if (!service) return null;

  const handleDiscuss = () => {
    if (onSelectService) {
      onSelectService(service.title);
    }
    onClose();
    setTimeout(() => {
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 150);
  };

  return (
    <AnimatePresence>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="service-dialog-title"
        aria-describedby="service-dialog-desc"
        className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#050817]/85 backdrop-blur-md"
          aria-hidden="true"
        />

        {/* Modal Window Container */}
        <motion.div
          ref={dialogRef}
          initial={
            prefersReducedMotion
              ? { opacity: 0 }
              : { opacity: 0, scale: 0.94, y: 16 }
          }
          animate={
            prefersReducedMotion
              ? { opacity: 1 }
              : { opacity: 1, scale: 1, y: 0 }
          }
          exit={
            prefersReducedMotion
              ? { opacity: 0 }
              : { opacity: 0, scale: 0.96, y: 12 }
          }
          transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-2xl rounded-2xl sm:rounded-3xl border border-[#202A40] bg-[#101525] shadow-[0_25px_80px_rgba(5,8,23,0.95)] overflow-hidden z-10 max-h-[92vh] sm:max-h-[85vh] flex flex-col my-auto"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-[#202A40] bg-[#080C1E] sticky top-0 z-20 shrink-0">
            <div className="flex items-center gap-2.5">
              <span className="text-[11px] font-mono font-bold text-[#2563EB] px-2.5 py-0.5 rounded-full bg-[#2563EB]/15 border border-[#2563EB]/30 uppercase tracking-wider">
                {service.number} • {service.category}
              </span>
              <span className="text-xs font-mono text-[#64748B] hidden xs:inline">
                SERVICE SPECIFICATION
              </span>
            </div>

            <button
              ref={closeButtonRef}
              onClick={onClose}
              type="button"
              className="w-10 h-10 min-w-[44px] min-h-[44px] rounded-full flex items-center justify-center text-[#94A3B8] hover:text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
              aria-label="Close service details"
            >
              <X size={18} />
            </button>
          </div>

          {/* Scrollable Content Body */}
          <div className="p-5 sm:p-7 overflow-y-auto space-y-6">
            {/* Title & Core Overview */}
            <div className="space-y-2">
              <h3
                id="service-dialog-title"
                className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-heading"
              >
                {service.title}
              </h3>
              <p
                id="service-dialog-desc"
                className="text-sm sm:text-base text-[#94A3B8] leading-relaxed"
              >
                {service.description}
              </p>
            </div>

            {/* Strategic Outcome Banner */}
            {service.keyOutcome && (
              <div className="p-4 rounded-xl border border-[#202A40] bg-[#080C1E] flex items-start gap-3">
                <Sparkles size={16} className="text-[#38BDF8] shrink-0 mt-0.5" />
                <div className="text-xs text-[#CBD5E1] leading-relaxed">
                  <span className="font-mono text-[#38BDF8] uppercase tracking-wider block font-bold text-[10px] mb-0.5">
                    Strategic Execution
                  </span>
                  {service.keyOutcome}
                </div>
              </div>
            )}

            {/* Deliverables List */}
            <div className="space-y-3">
              <div className="text-xs font-mono uppercase tracking-widest text-[#64748B]">
                Included Scope &amp; Deliverables
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {service.deliverables.map((item, dIdx) => (
                  <div
                    key={dIdx}
                    className="p-3 rounded-xl border border-[#202A40] bg-[#080C1E] flex items-start gap-2.5 text-xs text-[#CBD5E1] leading-snug"
                  >
                    <CheckCircle2 size={13} className="text-[#2563EB] mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Genuine Related Portfolio Project Preview (Only if exists) */}
            {relatedProject && (
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between text-xs font-mono text-[#64748B] uppercase tracking-wider">
                  <span>Related Case Study</span>
                  <span className="text-[#2563EB]">CONFIRMED BUILD</span>
                </div>

                <div
                  className="rounded-xl border border-[#202A40] p-4 sm:p-5 relative overflow-hidden"
                  style={{ background: relatedProject.visualPreview.themeGradient }}
                >
                  <div className="relative z-10 flex flex-col justify-between space-y-2">
                    <div className="flex items-center justify-between text-[10px] font-mono text-white/70">
                      <span>{relatedProject.category}</span>
                      <span>YEAR // {relatedProject.year}</span>
                    </div>

                    <div>
                      <div className="text-base sm:text-lg font-bold text-white font-heading tracking-tight">
                        {relatedProject.title}
                      </div>
                      <p className="text-xs text-[#CBD5E1] line-clamp-2 mt-1">
                        {relatedProject.summary}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {relatedProject.tools.slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded text-[10px] font-mono bg-black/40 text-[#93C5FD] border border-white/10"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Production Tools Row */}
            <div className="space-y-2 pt-1">
              <div className="text-xs font-mono uppercase tracking-widest text-[#64748B]">
                Primary Production Stack
              </div>
              <div className="flex flex-wrap gap-1.5">
                {service.tools.map((tool) => (
                  <span
                    key={tool}
                    className="px-3 py-1 rounded-lg text-xs font-mono border border-[#202A40] bg-[#080C1E] text-white"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Modal Footer Bar with Prominent Action */}
          <div className="px-5 sm:px-6 py-4 border-t border-[#202A40] bg-[#080C1E] flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
            <span className="text-[11px] font-mono text-[#64748B] hidden sm:inline">
              Available for select freelance &amp; commissions
            </span>

            <button
              onClick={handleDiscuss}
              type="button"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-xs tracking-wider uppercase transition-all shadow-[0_4px_20px_rgba(37,99,235,0.4)] min-h-[44px] font-heading"
            >
              <span>Discuss This Service</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
