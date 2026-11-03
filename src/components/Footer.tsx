"use client";

import React from "react";
import { ArrowUp, Globe } from "lucide-react";
import { SocialLinks } from "./SocialLinks";

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-16 px-4 sm:px-8 border-t border-white/10 bg-[#050817] relative">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Top Footer Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-white/10">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-white font-bold tracking-wider text-sm font-heading">
              <span className="w-2 h-2 rounded-full bg-[#2563EB]" />
              <span>SAIMON RANA MAGAR</span>
            </div>
            <p className="text-xs text-[#94A3B8]">
              Digital Creator, AI Filmmaker &amp; Web Developer • Kathmandu, Nepal
            </p>
          </div>

          <div className="flex items-center gap-4">
            <SocialLinks size="sm" />
            <button
              onClick={scrollToTop}
              type="button"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#1C2438] bg-[#0D1224] text-xs font-mono text-[#94A3B8] hover:text-white hover:border-[#2563EB] transition-all font-heading"
              aria-label="Back to top"
            >
              <span>Back to top</span>
              <ArrowUp size={12} className="text-[#2563EB]" />
            </button>
          </div>
        </div>

        {/* Links & Information Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-xs">
          <div className="space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#94A3B8]">
              Navigation
            </span>
            <ul className="space-y-2 text-[#CBD5E1]">
              <li>
                <a href="#home" className="hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#creative-studio" className="hover:text-white transition-colors">
                  Creative Studio
                </a>
              </li>
              <li>
                <a href="#development-studio" className="hover:text-white transition-colors">
                  Development Studio
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#94A3B8]">
              Portfolio
            </span>
            <ul className="space-y-2 text-[#CBD5E1]">
              <li>
                <a href="#projects" className="hover:text-white transition-colors">
                  Case Studies &amp; Projects
                </a>
              </li>
              <li>
                <a href="#skills" className="hover:text-white transition-colors">
                  Skills &amp; Capabilities
                </a>
              </li>
              <li>
                <a href="#experience" className="hover:text-white transition-colors">
                  Experience &amp; Background
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Freelance Offerings
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#94A3B8]">
              Primary Tools
            </span>
            <ul className="space-y-2 text-[#CBD5E1]">
              <li>Google Flow</li>
              <li>Adobe Premiere Pro</li>
              <li>CapCut Pro</li>
              <li>Next.js &amp; TypeScript</li>
              <li>Python 3 &amp; discord.py</li>
            </ul>
          </div>

          <div className="space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#94A3B8]">
              Location &amp; Time
            </span>
            <p className="text-[#94A3B8] leading-relaxed">
              Based in Kathmandu, Nepal. Working remotely with clients worldwide.
            </p>
            <div className="pt-1 text-[#38BDF8] font-mono flex items-center gap-1.5 font-medium">
              <Globe size={11} />
              <span>NPT (GMT+5:45)</span>
            </div>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 border-t border-[#1C2438] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#94A3B8]">
          <div>
            &copy; {new Date().getFullYear()} Saimon Rana Magar. All rights reserved.
          </div>
          <div className="text-center sm:text-right text-[#64748B]">
            Crafted with Next.js, TypeScript &amp; Tailwind CSS.
          </div>
        </div>
      </div>
    </footer>
  );
};
