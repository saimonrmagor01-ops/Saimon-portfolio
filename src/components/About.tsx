"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useSpring } from "framer-motion";
import { Film, Code, Bot, Compass, Sparkles, Terminal, MapPin } from "lucide-react";
import { SocialLinks } from "./SocialLinks";

export const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Subtle pointer-driven movement for depth (few pixels max, upright and steady)
  const portraitX = useSpring(0, { damping: 30, stiffness: 200, mass: 0.5 });
  const portraitY = useSpring(0, { damping: 30, stiffness: 200, mass: 0.5 });
  const glowX = useSpring(0, { damping: 25, stiffness: 140, mass: 0.6 });
  const glowY = useSpring(0, { damping: 25, stiffness: 140, mass: 0.6 });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    // Disable on touch devices and reduced-motion preferences
    if (e.pointerType === "touch") return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const relX = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2); // -1 to 1
    const relY = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2); // -1 to 1

    // Subtly shift portrait (max ±5px) and glow (max ±12px) at different speeds for depth
    portraitX.set(relX * 5);
    portraitY.set(relY * 5);
    glowX.set(relX * 12);
    glowY.set(relY * 12);
  };

  const handlePointerLeave = () => {
    portraitX.set(0);
    portraitY.set(0);
    glowX.set(0);
    glowY.set(0);
  };

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

        {/* Master Narrative & Portrait Layout */}
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

          {/* Mobile Step 2 / Desktop Right: Prominent Transparent Portrait */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 lg:col-start-8 lg:row-start-1 lg:row-span-2 flex flex-col items-center justify-center my-4 lg:my-0"
          >
            <div
              ref={containerRef}
              onPointerMove={handlePointerMove}
              onPointerLeave={handlePointerLeave}
              className="relative w-full max-w-[320px] xs:max-w-[360px] sm:max-w-[400px] lg:max-w-[440px] flex items-center justify-center pt-4 pb-2"
            >
              {/* Subtle broad blue radial glow behind upper body */}
              <motion.div
                style={{ x: glowX, y: glowY }}
                aria-hidden="true"
                className="absolute top-[8%] sm:top-[12%] left-1/2 -translate-x-1/2 w-[280px] sm:w-[380px] lg:w-[420px] h-[280px] sm:h-[380px] lg:h-[420px] rounded-full pointer-events-none select-none"
              >
                <div
                  className="w-full h-full rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 45%, rgba(37, 99, 235, 0.28) 0%, rgba(56, 189, 248, 0.12) 42%, transparent 72%)",
                    filter: "blur(32px)",
                  }}
                />
              </motion.div>

              {/* Portrait Image with Gentle Lower Edge Gradient Mask */}
              <motion.div
                style={{ x: portraitX, y: portraitY }}
                className="relative z-10 w-full flex justify-center"
              >
                <div
                  className="relative w-full overflow-visible"
                  style={{
                    WebkitMaskImage:
                      "linear-gradient(to bottom, black 0%, black 72%, rgba(0, 0, 0, 0.85) 82%, rgba(0, 0, 0, 0.3) 93%, transparent 100%)",
                    maskImage:
                      "linear-gradient(to bottom, black 0%, black 72%, rgba(0, 0, 0, 0.85) 82%, rgba(0, 0, 0, 0.3) 93%, transparent 100%)",
                  }}
                >
                  <Image
                    src="/saimon-portrait.png"
                    alt="Saimon Rana Magar — Digital Creator & Developer"
                    width={876}
                    height={1024}
                    priority
                    sizes="(max-width: 640px) 320px, (max-width: 1024px) 400px, 440px"
                    className="w-full h-auto object-contain select-none pointer-events-none drop-shadow-[0_15px_35px_rgba(5,8,23,0.7)]"
                  />
                </div>
              </motion.div>
            </div>

            {/* Subtle caption pill */}
            <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#101525]/80 border border-[#202A40] text-[11px] font-mono text-[#94A3B8]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
              <span>Saimon Rana Magar • Digital Creator &amp; Dev</span>
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
