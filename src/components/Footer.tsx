"use client";

import React from "react";
import { ArrowUp, Sparkles, MapPin, Globe } from "lucide-react";

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-16 px-4 sm:px-8 border-t border-white/[0.08] bg-[#030304] relative">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Top Footer Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-white/[0.06]">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-white font-bold tracking-widest text-sm">
              <span className="w-2 h-2 rounded-full bg-[#9fbdff]" />
              <span>SAIMON RANA MAGAR</span>
            </div>
            <p className="text-xs text-[#777777]">
              Digital Creator &amp; Developer • AI Filmmaker &amp; Web Engineer
            </p>
          </div>

          <button
            onClick={scrollToTop}
            type="button"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.02] text-xs font-mono text-[#888888] hover:text-white hover:border-white/20 transition-all self-start sm:self-auto"
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <ArrowUp size={12} />
          </button>
        </div>

        {/* Links & Information Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-xs">
          <div className="space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#555555]">
              Navigation
            </span>
            <ul className="space-y-2 text-[#8e8e93]">
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
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#555555]">
              Work &amp; Skills
            </span>
            <ul className="space-y-2 text-[#8e8e93]">
              <li>
                <a href="#projects" className="hover:text-white transition-colors">
                  Featured Projects
                </a>
              </li>
              <li>
                <a href="#skills" className="hover:text-white transition-colors">
                  Creative Toolkit
                </a>
              </li>
              <li>
                <a href="#experience" className="hover:text-white transition-colors">
                  Journey &amp; Education
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Professional Services
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#555555]">
              Core Tools
            </span>
            <ul className="space-y-2 text-[#8e8e93]">
              <li>Google Flow</li>
              <li>Adobe Premiere Pro</li>
              <li>CapCut</li>
              <li>Next.js &amp; TypeScript</li>
              <li>Python Bot Architecture</li>
            </ul>
          </div>

          <div className="space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#555555]">
              Location &amp; Identity
            </span>
            <p className="text-[#8e8e93] leading-relaxed">
              Based in Kathmandu, Nepal. Collaborating with creative minds and tech innovators globally.
            </p>
            <div className="pt-1 text-[#9fbdff] font-mono flex items-center gap-1.5">
              <Globe size={11} />
              <span>NPT (GMT+5:45)</span>
            </div>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#666666]">
          <div>
            &copy; {new Date().getFullYear()} Saimon Rana Magar. All rights reserved.
          </div>
          <div className="text-center sm:text-right text-[#555555]">
            Designed with intention. Built for what&apos;s next.
          </div>
        </div>
      </div>
    </footer>
  );
};
