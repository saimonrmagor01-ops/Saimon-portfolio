"use client";

import React from "react";
import { motion } from "framer-motion";
import { Film, Code, Bot, MapPin, Sparkles, Quote } from "lucide-react";
import { SocialLinks } from "./SocialLinks";
import { Avatar3DScene } from "./Avatar3DScene";

export const About: React.FC = () => {
  const disciplines = [
    {
      icon: Film,
      title: "AI Filmmaking & Direction",
      description:
        "Directing speculative visual stories using Google Flow for prompt-guided generation, followed by color grading and timeline pacing in Adobe Premiere Pro to give synthetic footage a genuine cinematic weight.",
    },
    {
      icon: Code,
      title: "Video Editing & Post-Production",
      description:
        "Structuring video edits around rhythm, beat transients, and kinetic pacing in Premiere Pro and CapCut. I focus on narrative flow and audio design that hold viewer attention across horizontal and vertical formats.",
    },
    {
      icon: Bot,
      title: "Web Engineering & Automation",
      description:
        "Building responsive, lightweight web applications with Next.js, React, and Tailwind CSS — like BudgetMandu — alongside asynchronous Python Discord bots and lightweight webhook notification scripts.",
    },
  ];

  return (
    <section id="about" className="py-24 sm:py-28 px-4 sm:px-8 border-t border-[#1C2438] relative bg-[#050817] overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16 pb-8 border-b border-[#1C2438]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D1224] border border-[#1C2438] text-xs font-medium text-[#2563EB] mb-3">
              <Sparkles size={12} />
              <span>01 / ABOUT ME</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tightest text-white leading-tight font-heading">
              Building at the intersection of <br />
              <span className="text-[#94A3B8] font-normal font-serif italic">storytelling and code.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-[#94A3B8] font-normal leading-relaxed">
            I’m an independent creator from Nepal combining visual cinema, rhythmic video editing, and modern software development.
          </p>
        </div>

        {/* Narrative & 3D Interactive Portrait Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16">
          {/* Left Column: First-Person Story */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-4 text-[#CBD5E1] text-base sm:text-lg leading-relaxed font-normal">
              <p>
                Hello, I’m <span className="text-white font-semibold">Saimon Rana Magar</span>. I’m fascinated by what happens when you treat visual creativity and software engineering not as separate worlds, but as complementary tools to bring ideas to life.
              </p>
              <p className="text-sm sm:text-base text-[#94A3B8]">
                In video production, I explore <span className="text-white font-medium">AI filmmaking with Google Flow</span>, frame-by-frame timeline editing in <span className="text-white font-medium">Adobe Premiere Pro &amp; CapCut</span>, and sound synchronization. On the web side, I design and build responsive digital platforms using <span className="text-white font-medium">Next.js and modern TypeScript</span> — including <span className="text-[#38BDF8] font-medium">BudgetMandu</span>, an active digital marketplace built specifically for consumers in Nepal.
              </p>
              <p className="text-sm sm:text-base text-[#94A3B8]">
                My approach to building is self-directed and project-led: I learn by creating real things. Whether I’m engineering a modular Python Discord bot or dialing in the color grade of an AI-generated sci-fi sequence, I care about craft, intentional pacing, and work that feels authentic.
              </p>
            </div>

            {/* Natural Human Perspective Callout */}
            <div className="p-5 sm:p-6 rounded-2xl border border-[#1C2438] bg-[#0D1224] relative overflow-hidden">
              <div className="text-[11px] font-mono text-[#2563EB] uppercase tracking-wider mb-2 flex items-center gap-1.5 font-bold">
                <Quote size={12} />
                <span>My Approach</span>
              </div>
              <blockquote className="text-sm sm:text-base text-white font-medium italic font-serif leading-relaxed">
                &ldquo;I care about making things that feel intentional — whether that&apos;s a five-second video cut that lands cleanly on the beat or a web interface that loads effortlessly.&rdquo;
              </blockquote>
            </div>

            {/* Location & Social Row */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#94A3B8] border-t border-[#1C2438]/80">
              <div className="flex items-center gap-2">
                <MapPin size={12} className="text-[#2563EB]" />
                <span className="text-white font-medium">Kathmandu, Nepal</span>
                <span className="text-[#1C2438]">•</span>
                <span>Available for Select Remote Collaborations</span>
              </div>
              <SocialLinks size="sm" />
            </div>
          </div>

          {/* Right Column: 3D Interactive Avatar */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col items-center justify-center"
          >
            <div className="relative w-full max-w-[340px] xs:max-w-[380px] sm:max-w-[420px] flex flex-col items-center justify-center">
              {/* 3D WebGL Avatar Scene */}
              <Avatar3DScene />

              {/* Caption pill */}
              <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D1224] border border-[#1C2438] text-[11px] font-mono text-[#94A3B8]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
                <span>Saimon Rana Magar • Digital Creator &amp; Dev</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Core Disciplines Grid */}
        <div className="space-y-4 pt-4">
          <div className="text-xs font-mono uppercase tracking-widest text-[#94A3B8] mb-2">
            What I Focus On
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {disciplines.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: idx * 0.08 }}
                  className="p-6 rounded-2xl border border-[#1C2438] bg-[#0D1224] hover:border-[#2563EB] transition-all duration-300 group"
                >
                  <div className="p-3 rounded-xl bg-[#070B18] border border-[#1C2438] text-[#2563EB] group-hover:scale-105 group-hover:bg-[#2563EB]/10 transition-all w-fit mb-4">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 font-heading group-hover:text-[#2563EB] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                    {item.description}
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
