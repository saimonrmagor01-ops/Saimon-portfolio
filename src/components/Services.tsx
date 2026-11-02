"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2, Sliders } from "lucide-react";
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
    setTimeout(() => {
      originCardRef.current?.focus();
    }, 50);
  };

  return (
    <section id="services" className="py-24 sm:py-28 px-4 sm:px-8 border-t border-[#1C2438] relative bg-[#050817]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16 pb-8 border-b border-[#1C2438]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D1224] border border-[#1C2438] text-xs font-medium text-[#2563EB] mb-3">
              <Sliders size={12} />
              <span>07 / SERVICES &amp; COLLABORATION</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tightest text-white leading-tight font-heading">
              Capabilities &amp; <br />
              <span className="text-[#94A3B8] font-normal font-serif italic">Freelance Offerings.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-[#94A3B8] font-normal leading-relaxed">
            I work directly with founders, creators, and brands as an independent creative developer. Here is what I can genuinely deliver.
          </p>
        </div>

        {/* 4-Item Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {services.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.06 }}
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
                aria-label={`View details for ${service.title}`}
                className="group h-full p-6 sm:p-8 rounded-2xl border border-[#1C2438] bg-[#0D1224] hover:bg-[#11172e] hover:border-[#2563EB] transition-all duration-200 flex flex-col justify-between cursor-pointer shadow-lg select-none"
              >
                <div>
                  {/* Top Meta Bar */}
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#1C2438]">
                    <span className="text-xs font-mono text-[#2563EB] font-bold">
                      {service.number} • {service.category.toUpperCase()}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono text-[#38BDF8] group-hover:text-white transition-colors">
                      <span>View details</span>
                      <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#2563EB] transition-colors font-heading">
                    {service.title}
                  </h3>
                  <div className="text-xs font-semibold text-[#38BDF8] mt-1 font-heading">
                    {service.tagline}
                  </div>
                  <p className="text-xs sm:text-sm text-[#94A3B8] mt-3 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Deliverables */}
                  <div className="mt-5 space-y-2">
                    <div className="text-[10px] font-mono uppercase tracking-widest text-[#94A3B8]">
                      Included Scope
                    </div>
                    <div className="space-y-1.5">
                      {service.deliverables.slice(0, 3).map((item, dIdx) => (
                        <div key={dIdx} className="flex items-start gap-2 text-xs text-[#CBD5E1]">
                          <CheckCircle2 size={13} className="text-[#2563EB] mt-0.5 shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Bottom: Tools & Direct Inquire Action */}
                <div className="pt-6 mt-6 border-t border-[#1C2438] flex items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-1">
                    {service.tools.slice(0, 2).map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#070B18] text-[#94A3B8] border border-[#1C2438]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleInquiry(service.title);
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-white bg-[#070B18] border border-[#1C2438] hover:border-[#2563EB] hover:bg-[#2563EB] transition-all min-h-[36px] font-heading"
                    aria-label={`Inquire directly about ${service.title}`}
                  >
                    <span>Inquire</span>
                    <ArrowUpRight size={13} />
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
