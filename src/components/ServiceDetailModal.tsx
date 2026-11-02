"use client";

import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, ArrowRight, Sparkles } from "lucide-react";
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
  const savedScrollY = useRef(0);
  const historyPushed = useRef(false);

  const relatedProject: Project | undefined = service?.relatedProjectId
    ? projects.find((p) => p.id === service.relatedProjectId)
    : undefined;

  // Browser history integration
  useEffect(() => {
    if (service) {
      savedScrollY.current = window.scrollY;
      if (!historyPushed.current) {
        window.history.pushState({ serviceModalOpen: true }, "");
        historyPushed.current = true;
      }
    }
  }, [service]);

  useEffect(() => {
    if (!service) return;

    const handlePopState = () => {
      historyPushed.current = false;
      onClose();
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [service, onClose]);

  const handleClose = () => {
    if (historyPushed.current) {
      historyPushed.current = false;
      window.history.go(-1);
    }
    window.scrollTo({ top: savedScrollY.current, behavior: "instant" });
    onClose();
  };

  useEffect(() => {
    if (!service) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [service]);

  if (!service) return null;

  const handleDiscuss = () => {
    if (onSelectService) {
      onSelectService(service.title);
    }
    handleClose();
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
        className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={handleClose}
          className="fixed inset-0 bg-[#050817]/85 backdrop-blur-md"
          aria-hidden="true"
        />

        {/* Modal Container */}
        <motion.div
          ref={dialogRef}
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-2xl rounded-2xl sm:rounded-3xl border border-[#1C2438] bg-[#0D1224] shadow-[0_25px_80px_rgba(5,8,23,0.95)] overflow-hidden z-10 max-h-[92vh] sm:max-h-[85vh] flex flex-col my-auto"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-[#1C2438] bg-[#070B18] sticky top-0 z-20 shrink-0">
            <div className="flex items-center gap-2.5">
              <span className="text-[11px] font-mono font-bold text-[#2563EB] px-2.5 py-0.5 rounded-full bg-[#2563EB]/15 border border-[#2563EB]/30 uppercase tracking-wider">
                {service.number} • {service.category}
              </span>
              <span className="text-xs font-mono text-[#94A3B8] hidden xs:inline">
                Service Specification
              </span>
            </div>

            <button
              ref={closeButtonRef}
              onClick={handleClose}
              type="button"
              className="w-9 h-9 rounded-full flex items-center justify-center text-[#94A3B8] hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close service details"
            >
              <X size={18} />
            </button>
          </div>

          {/* Scrollable Content Body */}
          <div className="p-5 sm:p-7 overflow-y-auto space-y-6">
            <div className="space-y-1.5">
              <h3
                id="service-dialog-title"
                className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-heading"
              >
                {service.title}
              </h3>
              <div className="text-sm font-semibold text-[#38BDF8] font-heading">
                {service.tagline}
              </div>
              <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed pt-1">
                {service.description}
              </p>
            </div>

            {/* Strategic Outcome */}
            {service.keyOutcome && (
              <div className="p-4 rounded-xl border border-[#1C2438] bg-[#070B18] flex items-start gap-3">
                <Sparkles size={16} className="text-[#38BDF8] shrink-0 mt-0.5" />
                <div className="text-xs text-[#CBD5E1] leading-relaxed">
                  <span className="font-mono text-[#38BDF8] uppercase tracking-wider block font-bold text-[10px] mb-0.5">
                    What You Get
                  </span>
                  {service.keyOutcome}
                </div>
              </div>
            )}

            {/* Deliverables List */}
            <div className="space-y-3">
              <div className="text-xs font-mono uppercase tracking-widest text-[#94A3B8]">
                Included Scope &amp; Deliverables
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {service.deliverables.map((item, dIdx) => (
                  <div
                    key={dIdx}
                    className="p-3 rounded-xl border border-[#1C2438] bg-[#070B18] flex items-start gap-2.5 text-xs text-[#CBD5E1] leading-snug"
                  >
                    <CheckCircle2 size={13} className="text-[#2563EB] mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Related Case Study */}
            {relatedProject && (
              <div className="space-y-2.5 pt-1">
                <div className="text-xs font-mono uppercase tracking-wider text-[#94A3B8]">
                  Related Project Reference
                </div>
                <div className="p-4 rounded-xl border border-[#1C2438] bg-[#070B18] space-y-1">
                  <div className="text-sm font-bold text-white font-heading">
                    {relatedProject.title}
                  </div>
                  <p className="text-xs text-[#94A3B8] leading-relaxed">
                    {relatedProject.summary}
                  </p>
                </div>
              </div>
            )}

            {/* Tools Stack */}
            <div className="space-y-2 pt-1">
              <div className="text-xs font-mono uppercase tracking-widest text-[#94A3B8]">
                Tools &amp; Tech Stack
              </div>
              <div className="flex flex-wrap gap-1.5">
                {service.tools.map((tool) => (
                  <span
                    key={tool}
                    className="px-3 py-1 rounded-lg text-xs font-mono border border-[#1C2438] bg-[#070B18] text-white"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="px-5 sm:px-6 py-4 border-t border-[#1C2438] bg-[#070B18] flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
            <span className="text-[11px] font-mono text-[#94A3B8] hidden sm:inline">
              Available for select freelance &amp; commissions
            </span>

            <button
              onClick={handleDiscuss}
              type="button"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-xs tracking-wider uppercase transition-all shadow-md min-h-[44px] font-heading"
            >
              <span>Inquire About This Service</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
