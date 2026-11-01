"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Code, Terminal, Bot, Cpu, Check, Copy, ExternalLink, Sparkles } from "lucide-react";

interface TechTab {
  id: string;
  label: string;
  icon: React.ElementType;
  title: string;
  subtitle: string;
  techs: string[];
  codeSnippet: string;
  language: string;
  highlights: string[];
}

export const DevelopmentStudio: React.FC = () => {
  const tabs: TechTab[] = [
    {
      id: "web-dev",
      label: "Next.js & Frontend",
      icon: Code,
      title: "Responsive Web Engineering",
      subtitle: "Component-driven architectures with Next.js, TypeScript, and Tailwind CSS",
      techs: ["Next.js (App Router)", "TypeScript", "Tailwind CSS", "JavaScript ES6+", "HTML5/CSS3"],
      highlights: [
        "Semantic HTML structure for search engine visibility and accessibility",
        "Mobile-first responsive layouts tested across iOS, Android, tablet, and desktop",
        "Optimized client/server rendering ensuring instant load times with zero layout shift",
        "Clean component separation allowing frictionless maintenance and scalability",
      ],
      language: "typescript",
      codeSnippet: `// Example: Clean Modular UI Component Pattern
import React from 'react';

interface MetricProps {
  label: string;
  value: string;
  detail: string;
}

export const MetricCard: React.FC<MetricProps> = ({ label, value, detail }) => {
  return (
    <div className="p-5 rounded-2xl border border-white/10 bg-[#09090b] hover:border-white/20 transition-all">
      <span className="text-[10px] font-mono uppercase tracking-widest text-[#9fbdff]">
        {label}
      </span>
      <div className="text-2xl font-bold text-white mt-1">{value}</div>
      <p className="text-xs text-[#8e8e93] mt-0.5">{detail}</p>
    </div>
  );
};`,
    },
    {
      id: "discord-bots",
      label: "Python Discord Engine",
      icon: Bot,
      title: "Asynchronous Discord Bot Architecture",
      subtitle: "Custom community moderation, slash commands, and automated server utilities",
      techs: ["Python 3.11+", "discord.py", "Asyncio", "REST APIs"],
      highlights: [
        "Modular Cogs architecture organizing moderation, utility, and analytics commands",
        "Asynchronous event listeners handling member joins, message filtering, and logging",
        "Interactive Discord UI components including buttons, modal popups, and select menus",
        "Environment variable secret protection and resilient API rate-limit management",
      ],
      language: "python",
      codeSnippet: `# Example: Async Discord Cog with Modern Slash Commands
import discord
from discord import app_commands
from discord.ext import commands

class CommunityEngine(commands.Cog):
    def __init__(self, bot: commands.Bot):
        self.bot = bot

    @app_commands.command(name="status", description="Query live server health and metrics")
    async def status_check(self, interaction: discord.Interaction):
        embed = discord.Embed(
            title="Sentinel Community Status",
            description="All operational nodes running at optimal latency.",
            color=0x9FBDFF
        )
        embed.add_field(name="Latency", value=f"{round(self.bot.latency * 1000)}ms", inline=True)
        embed.set_footer(text="Engineered for Nepal & Global Communities")
        await interaction.response.send_message(embed=embed, ephemeral=True)

async def setup(bot: commands.Bot):
    await bot.add_cog(CommunityEngine(bot))`,
    },
    {
      id: "automation",
      label: "Digital Automation",
      icon: Cpu,
      title: "Workflow & Data Automation",
      subtitle: "Connecting services and automating repetitive digital processes",
      techs: ["Python Scripting", "Webhooks", "JSON/REST APIs", "Automation Pipelines"],
      highlights: [
        "Automated data parsing and daily summary dispatches to Discord/Telegram",
        "Webhook triggers linking web form submissions directly to notification channels",
        "File organization and batch asset renaming scripts saving creative hours",
        "Zero-dependency lightweight Python utility scripts for maximum reliability",
      ],
      language: "python",
      codeSnippet: `# Example: Automated Webhook Dispatch Pipeline
import os
import requests
from datetime import datetime

def dispatch_project_alert(client_name: str, service_inquiry: str) -> bool:
    webhook_url = os.getenv("DISCORD_WEBHOOK_URL")
    payload = {
        "content": "⚡ **New Portfolio Inquiry Received**",
        "embeds": [{
            "title": f"Inquiry from {client_name}",
            "description": f"Target Service: [{service_inquiry}]",
            "color": 0x9FBDFF,
            "timestamp": datetime.utcnow().isoformat()
        }]
    }
    response = requests.post(webhook_url, json=payload, timeout=8)
    return response.status_code == 204`,
    },
  ];

  const [activeTab, setActiveTab] = useState<TechTab>(tabs[0]);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(activeTab.codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="development-studio" className="py-28 px-4 sm:px-8 border-t border-white/[0.08] relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-white/[0.06]">
          <div>
            <div className="text-[11px] font-mono tracking-widest text-[#9fbdff] uppercase flex items-center gap-2 mb-3">
              <Terminal size={12} />
              <span>03 / DEVELOPMENT STUDIO</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tightest text-white leading-tight">
              Engineering &amp; <br />
              <span className="text-[#888888] font-normal font-serif italic">Digital Products.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-[#92928f] font-normal leading-relaxed">
            Crafting responsive web applications, Python community bot engines, and digital automations built on clean architectures and practical performance.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex flex-wrap items-center gap-2 mb-8 p-1.5 rounded-2xl bg-[#09090b] border border-white/10 w-fit">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab.id === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab)}
                type="button"
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                  isSelected
                    ? "bg-white text-black font-semibold shadow-sm"
                    : "text-[#888888] hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon size={14} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Overview & Highlights */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="text-[11px] font-mono text-[#9fbdff] uppercase tracking-wider mb-1">
                Capability Overview
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tight">{activeTab.title}</h3>
              <p className="text-xs sm:text-sm text-[#92928f] mt-2 leading-relaxed">
                {activeTab.subtitle}
              </p>
            </div>

            {/* Verified Tech Badges */}
            <div className="space-y-2">
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#666666]">
                Verified Technologies
              </div>
              <div className="flex flex-wrap gap-1.5">
                {activeTab.techs.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-full text-xs font-mono border border-white/10 bg-white/[0.03] text-white"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Architecture Highlights */}
            <div className="space-y-3 pt-2">
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#666666]">
                Key Engineering Tenets
              </div>
              <div className="space-y-2.5">
                {activeTab.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-[#a0a0a0]">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#9fbdff] mt-1.5 shrink-0" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Code Viewer */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-white/10 bg-[#09090d] shadow-2xl overflow-hidden">
              {/* Code Header Bar */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.08] bg-[#070709]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#333333]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#333333]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#333333]" />
                  <span className="text-[11px] font-mono text-[#888888] ml-2">
                    {activeTab.id}.{activeTab.language === "python" ? "py" : "tsx"}
                  </span>
                </div>

                <button
                  onClick={handleCopy}
                  type="button"
                  className="flex items-center gap-1.5 text-[11px] font-mono text-[#aaaaaa] hover:text-white px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10 transition-colors"
                  aria-label="Copy code snippet"
                >
                  {copied ? <Check size={12} className="text-green-400" /> : <Copy size={12} />}
                  <span>{copied ? "Copied" : "Copy"}</span>
                </button>
              </div>

              {/* Code Pre Block */}
              <div className="p-4 sm:p-5 overflow-x-auto text-[11px] sm:text-xs font-mono text-[#d4d4d4] leading-relaxed max-h-[380px]">
                <pre className="selection:bg-white/20">
                  <code>{activeTab.codeSnippet}</code>
                </pre>
              </div>

              {/* Terminal Footer */}
              <div className="px-4 py-2.5 border-t border-white/[0.08] bg-[#060608] flex items-center justify-between text-[10px] font-mono text-[#666666]">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  <span>SYNTAX VERIFIED • ZERO RUNTIME BLOAT</span>
                </span>
                <span>UTF-8</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
