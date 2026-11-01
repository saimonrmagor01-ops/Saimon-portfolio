"use client";

import React from "react";
import { motion } from "framer-motion";
import { Film, Code, Bot, Compass, Sparkles, Terminal, MapPin } from "lucide-react";
import { SocialLinks } from "./SocialLinks";
import { Avatar3DScene } from "./Avatar3DScene";

export const About: React.FC = () => {
  const pillars = [
    {
      icon: Film,
      title: "Cinematic Narrative & AI",
      description:
        "Harnessing generative AI tools like Google Flow, Premiere Pro, and CapCut to architect visual stories, cinematic scenes, and short-form video that resonate with emotional clarity.",
    },
    {
      icon: Code,
      title: "Modern Web Engineering",
      description:
        "Building responsive, high-performance web experiences using Next.js, TypeScript, and modern CSS. Creating digital products like BudgetMandu that prioritize utility and seamless UX.",
    },
    {
      icon: Bot,
      title: "Bots & Digital Automation",
      description:
        "Developing Python-driven Discord bots and automated digital workflows that eliminate repetitive operations, streamline community moderation, and empower creators.",
    },
  ];

  return (
    <section id="about" className="py-24 sm:py-28 px-4 sm:px-8 border-t border-[#202A40] relative bg-[#050817] overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 sm:mb-16 pb-8 border-b border-[#202A40]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#101525] border border-[#202A40] text-xs font-medium text-[#2563EB] mb-3">
              <Sparkles size={12} />
              <span>01 / ABOUT ME</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tightest text-white leading-tight font-heading">
              Creative thinking. <br />
              <span className="text-[#94A3B8] font-normal font-serif italic">Technical execution.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-[#94A3B8] font-normal leading-relaxed">
            A multidisciplinary approach to making ideas tangible — bridging the gap between imaginative visual storytelling and dependable digital software.
          </p>
        </div>

        {/* Master Narrative & 3D Avatar Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-14 items-center mb-16">
          {/* Mobile Step 1 / Desktop Left Top: Lead Narrative Statement */}
          <div className="lg:col-span-7 lg:row-start-1 space-y-4">
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-snug font-heading">
              I work across creative media and technology, using the right tools to tell stories, build useful products, and shape engaging digital experiences.
            </h3>
            <p className="text-[#94A3B8] text-sm sm:text-base leading-relaxed">
              Based in <span className="text-white font-medium">Nepal</span>, my journey is driven by an insatiable curiosity for how cutting-edge tools transform human creativity. Rather than seeing a divide between art and engineering, I view code and cinema as two languages describing the same impulse: bringing an idea into reality.
            </p>
          </div>

          {/* Mobile Step 2 / Desktop Right: Cinematic 3D Interactive Avatar */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 lg:col-start-8 lg:row-start-1 lg:row-span-2 flex flex-col items-center justify-center my-2 lg:my-0"
          >
            <div className="relative w-full max-w-[340px] xs:max-w-[380px] sm:max-w-[420px] lg:max-w-[460px] flex flex-col items-center justify-center">
              {/* 3D WebGL Avatar Scene with Depth Parallax, Rim Light & 3D Particles */}
              <Avatar3DScene />

              {/* Subtle caption pill */}
              <div className="mt-1 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#101525]/80 border border-[#202A40] text-[11px] font-mono text-[#94A3B8]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
                <span>Saimon Rana Magar • Digital Creator &amp; Dev</span>
              </div>
            </div>
          </motion.div>

          {/* Mobile Step 3 / Desktop Left Bottom: Deep Narrative & Philosophy */}
          <div className="lg:col-span-7 lg:row-start-2 space-y-6 pt-2">
            <div className="space-y-4 text-[#94A3B8] text-sm sm:text-base leading-relaxed">
              <p>
                In the creative realm, I explore <span className="text-white font-medium">AI filmmaking</span>, video editing, and short-form pacing. In development, I architect clean web interfaces with <span className="text-white font-medium">Next.js and modern JavaScript</span>, alongside <span className="text-white font-medium">Python automation</span> and Discord community bots.
              </p>
              <p>
                My ambition is to continuously craft high-caliber digital experiences, collaborate with forward-thinking creators and teams globally, and explore the frontier of synthetic media and web technology.
              </p>
            </div>

            {/* Core Philosophy Callout */}
            <div className="p-5 sm:p-6 rounded-2xl border border-[#202A40] bg-[#101525] relative overflow-hidden">
              <div className="absolute top-0 right-0 p-3 text-[#202A40]" aria-hidden="true">
                <Terminal size={42} />
              </div>
              <div className="text-[11px] font-mono text-[#2563EB] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Compass size={12} />
                <span>Creative Philosophy</span>
              </div>
              <blockquote className="text-sm sm:text-base text-white font-medium italic font-serif leading-relaxed">
                &ldquo;Master the tool, respect the story, and write the code that makes it all function effortlessly.&rdquo;
              </blockquote>
            </div>

            {/* Identity & Social links row */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#94A3B8] border-t border-[#202A40]/70">
              <div className="flex items-center gap-2">
                <MapPin size={12} className="text-[#2563EB]" />
                <span className="text-white font-medium">Kathmandu, Nepal</span>
                <span className="text-[#202A40]">•</span>
                <span>Available Worldwide</span>
              </div>
              <SocialLinks size="sm" />
            </div>
          </div>
        </div>

        {/* Focus Pillars Row */}
        <div className="space-y-4 pt-6">
          <div className="text-xs font-mono uppercase tracking-widest text-[#94A3B8] mb-2">
            Core Disciplines
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="p-6 rounded-2xl border border-[#202A40] bg-[#101525] hover:border-[#2563EB] transition-all duration-300 group"
                >
                  <div className="p-3 rounded-xl bg-[#080C1E] border border-[#202A40] text-[#2563EB] group-hover:scale-105 group-hover:bg-[#2563EB]/10 transition-all w-fit mb-4">
                    <Icon size={20} />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2 font-heading group-hover:text-[#2563EB] transition-colors">
                    {pillar.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                    {pillar.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
