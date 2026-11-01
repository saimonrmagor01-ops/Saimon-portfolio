"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Film, Code, Bot, Compass, Sparkles, Terminal, MapPin } from "lucide-react";
import { SocialLinks } from "./SocialLinks";

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
    <section id="about" className="py-28 px-4 sm:px-8 border-t border-white/[0.08] relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-white/[0.06]">
          <div>
            <div className="text-[11px] font-mono tracking-widest text-[#9fbdff] uppercase flex items-center gap-2 mb-3">
              <Sparkles size={12} />
              <span>01 / ABOUT ME</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tightest text-white leading-tight font-heading">
              Creative thinking. <br />
              <span className="text-[#888888] font-normal font-serif italic">Technical execution.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-[#92928f] font-normal leading-relaxed">
            A multidisciplinary approach to making ideas tangible — bridging the gap between imaginative visual storytelling and dependable digital software.
          </p>
        </div>

        {/* Master Portrait & Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-16">
          {/* Left: Custom Illustrated Profile Portrait Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col items-center"
          >
            <div className="relative w-full max-w-md rounded-3xl border border-white/10 bg-[#07070a] p-4 sm:p-5 shadow-2xl overflow-hidden group">
              {/* Subtle ambient lighting behind portrait */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full pointer-events-none radial-glow-blue opacity-50 blur-3xl"
                aria-hidden="true"
              />

              {/* Portrait Container with Gentle Floating Effect */}
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-[#030305] border border-white/5 flex items-center justify-center p-3 animate-float-slow">
                <Image
                  src="/portrait.png"
                  alt="Saimon Rana Magar — Custom Illustrated Portrait"
                  width={520}
                  height={520}
                  priority
                  className="w-full h-full object-contain sticker-outline select-none transition-transform duration-700 group-hover:scale-105"
                />

                {/* Subtle corner frame accents */}
                <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-white/40" />
                <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-white/40" />
                <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-white/40" />
                <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-white/40" />
              </div>

              {/* Portrait Bottom Caption & Metadata */}
              <div className="mt-4 pt-3 border-t border-white/[0.08] flex items-center justify-between text-xs">
                <div>
                  <div className="text-white font-bold tracking-wider font-heading text-sm">
                    SAIMON RANA MAGAR
                  </div>
                  <div className="text-[#888888] text-[11px] font-mono flex items-center gap-1.5 mt-0.5">
                    <MapPin size={11} className="text-[#9fbdff]" />
                    <span>Nepal • Digital Creator &amp; Dev</span>
                  </div>
                </div>

                {/* Integrated Social Links */}
                <SocialLinks size="sm" />
              </div>
            </div>
          </motion.div>

          {/* Right: Editorial Narrative & Statement */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-snug font-heading">
              I work across creative media and technology, using the right tools to tell stories, build useful products, and shape engaging digital experiences.
            </h3>

            <div className="space-y-4 text-[#a3a3a3] text-sm sm:text-base leading-relaxed">
              <p>
                Based in <span className="text-white font-medium">Nepal</span>, my journey is driven by an insatiable curiosity for how cutting-edge tools transform human creativity. Rather than seeing a divide between art and engineering, I view code and cinema as two languages describing the same impulse: bringing an idea into reality.
              </p>
              <p>
                In the creative realm, I explore <span className="text-white">AI filmmaking</span>, video editing, and short-form pacing. In development, I architect clean web interfaces with <span className="text-white">Next.js and modern JavaScript</span>, alongside <span className="text-white">Python automation</span> and Discord community bots.
              </p>
              <p>
                My ambition is to continuously craft high-caliber digital experiences, collaborate with forward-thinking creators and teams globally, and explore the frontier of synthetic media and web technology.
              </p>
            </div>

            {/* Core Philosophy Callout */}
            <div className="p-6 rounded-2xl border border-white/10 bg-[#09090b] relative overflow-hidden">
              <div className="absolute top-0 right-0 p-3 text-[#222222]">
                <Terminal size={42} />
              </div>
              <div className="text-[11px] font-mono text-[#9fbdff] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Compass size={12} />
                <span>Creative Philosophy</span>
              </div>
              <blockquote className="text-base text-white font-medium italic font-serif">
                &ldquo;Master the tool, respect the story, and write the code that makes it all function effortlessly.&rdquo;
              </blockquote>
            </div>
          </div>
        </div>

        {/* Focus Pillars Row */}
        <div className="space-y-4 pt-6">
          <div className="text-xs font-mono uppercase tracking-widest text-[#777777] mb-2">
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
                  className="p-6 rounded-2xl border border-white/[0.08] bg-[#0c0c0f] hover:border-white/20 transition-all duration-300 group"
                >
                  <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 text-[#9fbdff] group-hover:scale-105 group-hover:bg-[#9fbdff]/10 transition-all w-fit mb-4">
                    <Icon size={20} />
                  </div>
                  <div className="text-xs font-mono text-[#666666] tracking-wider mb-1">
                    DISCIPLINE / 0{idx + 1}
                  </div>
                  <h4 className="text-base font-bold text-white group-hover:text-[#9fbdff] transition-colors font-heading mb-2">
                    {pillar.title}
                  </h4>
                  <p className="text-xs text-[#8e8e93] leading-relaxed">
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
