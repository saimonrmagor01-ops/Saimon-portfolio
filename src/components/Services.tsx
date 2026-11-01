"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles, CheckCircle2, Sliders } from "lucide-react";
import { services, Service } from "@/data/services";

interface ServicesProps {
  onSelectService?: (serviceTitle: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  const handleInquiry = (serviceTitle: string) => {
    if (onSelectService) {
      onSelectService(serviceTitle);
    }
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="services" className="py-28 px-4 sm:px-8 border-t border-[#202A40] relative bg-[#050817]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-[#202A40]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#101525] border border-[#202A40] text-xs font-medium text-[#2563EB] mb-3">
              <Sliders size={12} />
              <span>07 / SERVICES &amp; COLLABORATION</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tightest text-white leading-tight font-heading">
              From Concept <br />
              <span className="text-[#94A3B8] font-normal font-serif italic">to Production.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-[#94A3B8] font-normal leading-relaxed">
            Professional creative production and software development capabilities available for select freelance, contract, and collaborative commissions.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, idx) => (
            <motion.article
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.07 }}
              className="group p-6 sm:p-7 rounded-2xl border border-[#202A40] bg-[#101525] hover:border-[#2563EB] hover:shadow-[0_10px_35px_rgba(37,99,235,0.18)] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#202A40]">
                  <span className="text-xs font-mono text-[#2563EB] font-bold">
                    {service.number} — {service.category.toUpperCase()}
                  </span>
                  <span className="text-[10px] font-mono text-[#64748B]">ACTIVE</span>
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-[#2563EB] transition-colors font-heading">
                  {service.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#94A3B8] mt-2.5 leading-relaxed">
                  {service.description}
                </p>

                {/* Deliverables */}
                <div className="mt-5 space-y-2">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-[#64748B]">
                    Included Deliverables
                  </div>
                  <div className="space-y-1.5">
                    {service.deliverables.map((item, dIdx) => (
                      <div key={dIdx} className="flex items-start gap-2 text-xs text-[#CBD5E1]">
                        <CheckCircle2 size={12} className="text-[#2563EB] mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Bottom: Tools & Inquiry Action */}
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

                <button
                  type="button"
                  onClick={() => handleInquiry(service.title)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-white group-hover:text-[#9fbdff] group-hover:bg-white/[0.05] transition-all"
                >
                  <span>Inquire</span>
                  <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
