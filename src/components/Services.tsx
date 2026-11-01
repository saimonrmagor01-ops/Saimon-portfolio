"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles, CheckCircle2, Sliders } from "lucide-react";
import { services, Service } from "@/data/services";
import { ServiceDetailModal } from "./ServiceDetailModal";

interface ServicesProps {
  onSelectService?: (serviceTitle: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  const [selectedModalService, setSelectedModalService] = useState<Service | null>(null);
  const originCardRef = useRef<HTMLElement | null>(null);

  const handleInquiry = (serviceTitle: string) => {
    if (onSelectService) {
      onSelectService(serviceTitle);
    }
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const openServiceModal = (service: Service, e: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>) => {
    originCardRef.current = e.currentTarget;
    setSelectedModalService(service);
  };

  const handleCloseModal = () => {
    setSelectedModalService(null);
    // Return keyboard focus to the originating card trigger
    setTimeout(() => {
      originCardRef.current?.focus();
    }, 50);
  };

  return (
    <section id="services" className="py-24 sm:py-28 px-4 sm:px-8 border-t border-[#202A40] relative bg-[#050817]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16 pb-8 border-b border-[#202A40]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#101525] border border-[#202A40] text-xs font-medium text-[#2563EB] mb-3">
              <Sliders size={12} />
              <span>07 / SERVICES &amp; COLLABORATION</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tightest text-white leading-tight font-heading">
              From Concept <br />
              <span className="text-[#94A3B8] font-normal font-serif italic">to Production.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-[#94A3B8] font-normal leading-relaxed">
            Professional creative production and software development capabilities available for select freelance, contract, and collaborative commissions.
          </p>
        </div>

        {/* Services Grid (Reserved Layout Space) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.06 }}
              className="h-full"
            >
              <article
                onClick={(e) => openServiceModal(service, e)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openServiceModal(service, e);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-haspopup="dialog"
                aria-label={`Explore full specification for ${service.title}`}
                className="service-card group h-full p-6 sm:p-7 rounded-2xl border border-[#202A40] bg-[#101525] hover:bg-[#12192d] hover:border-[#2563EB]/80 hover:-translate-y-1 hover:shadow-[0_14px_40px_rgba(37,99,235,0.18)] focus:outline-none focus:border-[#2563EB] focus:-translate-y-1 focus:shadow-[0_14px_40px_rgba(37,99,235,0.18)] transition-all duration-200 ease-out flex flex-col justify-between cursor-pointer select-none"
              >
                <div>
                  {/* Top Meta Bar */}
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#202A40]">
                    <span className="text-xs font-mono text-[#2563EB] font-bold">
                      {service.number} — {service.category.toUpperCase()}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono text-[#38BDF8] group-hover:text-white transition-colors">
                      <span>Explore service</span>
                      <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-[#2563EB] transition-colors font-heading">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#94A3B8] mt-2.5 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Deliverables Snippet */}
                  <div className="mt-5 space-y-2">
                    <div className="text-[10px] font-mono uppercase tracking-widest text-[#64748B]">
                      Included Scope
                    </div>
                    <div className="space-y-1.5">
                      {service.deliverables.slice(0, 3).map((item, dIdx) => (
                        <div key={dIdx} className="flex items-start gap-2 text-xs text-[#CBD5E1]">
                          <CheckCircle2 size={12} className="text-[#2563EB] mt-0.5 shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                      {service.deliverables.length > 3 && (
                        <span className="text-[10px] font-mono text-[#64748B] block pt-0.5">
                          +{service.deliverables.length - 3} more deliverables
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Bottom: Tools & Direct Inquire Action */}
                <div className="pt-6 mt-6 border-t border-[#202A40] flex items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-1">
                    {service.tools.slice(0, 2).map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#080C1E] text-[#94A3B8] border border-[#202A40]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Independent Direct Inquire Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleInquiry(service.title);
                    }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium text-white border border-[#202A40] bg-[#080C1E] hover:border-[#2563EB] hover:text-[#38BDF8] hover:bg-white/[0.05] transition-all min-h-[36px] z-10"
                    title={`Directly contact regarding ${service.title}`}
                    aria-label={`Inquire directly about ${service.title}`}
                  >
                    <span>Inquire</span>
                    <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>
                </div>
              </article>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Accessible Service Detail Dialog */}
      <ServiceDetailModal
        service={selectedModalService}
        onClose={handleCloseModal}
        onSelectService={onSelectService}
      />
    </section>
  );
};
