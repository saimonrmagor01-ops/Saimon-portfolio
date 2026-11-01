"use client";

import React from "react";
import { motion } from "framer-motion";
import { Film, Code, Bot, Compass, Sparkles, Terminal } from "lucide-react";

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
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tightest text-white leading-tight">
              Creative thinking. <br />
              <span className="text-[#888888] font-normal font-serif italic">Technical execution.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-[#92928f] font-normal leading-relaxed">
            A multidisciplinary approach to making ideas tangible — bridging the gap between imaginative visual storytelling and dependable digital software.
          </p>
        </div>

        {/* Narrative & Philosophy Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Editorial Statement */}
          <div className="lg:col-span-6 space-y-6">
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-snug">
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
                <Terminal size={48} />
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

          {/* Right Column: Three Pillars */}
          <div className="lg:col-span-6 space-y-4">
            <div className="text-xs font-mono uppercase tracking-widest text-[#777777] mb-2">
              Core Focus Areas
            </div>

            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="p-6 sm:p-7 rounded-2xl border border-white/[0.08] bg-[#0c0c0f] hover:border-white/20 transition-all duration-300 group"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 text-[#9fbdff] group-hover:scale-105 group-hover:bg-[#9fbdff]/10 transition-all">
                      <Icon size={22} />
                    </div>
                    <div className="space-y-1.5">
                      <div className="text-xs font-mono text-[#666666] tracking-wider">
                        FOCUS / 0{idx + 1}
                      </div>
                      <h4 className="text-lg font-bold text-white group-hover:text-[#9fbdff] transition-colors">
                        {pillar.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-[#8e8e93] leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
