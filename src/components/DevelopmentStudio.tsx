"use client";

import React, { useState } from "react";
import { Code, Terminal, Bot, Cpu, Check, Copy, ExternalLink } from "lucide-react";

interface TechTab {
  id: string;
  label: string;
  icon: React.ElementType;
  title: string;
  summary: string;
  realProject: string;
  realProjectLink: string;
  techs: string[];
  capabilities: string[];
  codeSnippet: string;
  language: string;
  filename: string;
}

export const DevelopmentStudio: React.FC = () => {
  const tabs: TechTab[] = [
    {
      id: "web-dev",
      label: "Next.js & Frontend",
      icon: Code,
      title: "Responsive Web Engineering",
      summary: "Building fast, mobile-friendly web storefronts and modern web applications with Next.js App Router, TypeScript, and Tailwind CSS.",
      realProject: "Applied in BudgetMandu — Nepal Digital Marketplace",
      realProjectLink: "https://www.budgetmandu.com",
      techs: ["Next.js (App Router)", "TypeScript", "React", "Tailwind CSS", "Vercel"],
      capabilities: [
        "Component-driven architecture with clean separation of client and server concerns",
        "Mobile-first responsive design tested for fast loading on 3G/4G connections",
        "Dynamic local pricing calculation and live search filtering without page reloads",
        "Semantic HTML with proper heading hierarchies, focus styles, and accessibility attributes",
      ],
      language: "typescript",
      filename: "catalog-filter.ts",
      codeSnippet: `// Practical catalog filtering & local NPR formatting utility
export interface Product {
  id: string;
  title: string;
  category: string;
  priceNPR: number;
  inStock: boolean;
}

export function filterCatalog(
  items: Product[],
  category: string,
  searchQuery: string
): Product[] {
  const query = searchQuery.trim().toLowerCase();
  
  return items.filter((item) => {
    const matchesCategory = category === "All" || item.category === category;
    const matchesQuery = !query || item.title.toLowerCase().includes(query);
    return matchesCategory && matchesQuery && item.inStock;
  });
}

export function formatNPR(amount: number): string {
  return new Intl.NumberFormat("ne-NP", {
    style: "currency",
    currency: "NPR",
    maximumFractionDigits: 0,
  }).format(amount);
}`,
    },
    {
      id: "discord-bots",
      label: "Python Discord Engine",
      icon: Bot,
      title: "Asynchronous Discord Bot Architecture",
      summary: "Custom community moderation, slash commands, and automated server utilities built on discord.py with non-blocking event loops.",
      realProject: "Applied in Sentinel Discord Engine",
      realProjectLink: "#projects",
      techs: ["Python 3.11", "discord.py", "AsyncIO", "REST APIs"],
      capabilities: [
        "Modular Cogs architecture organizing moderation, utility, and analytics commands",
        "Asynchronous event listeners handling member joins, message filtering, and logging",
        "Interactive Discord UI components including buttons, modal popups, and select menus",
        "Environment variable secret protection and resilient API rate-limit management",
      ],
      language: "python",
      filename: "moderation_cog.py",
      codeSnippet: `# Async Discord Cog with slash command integration
import discord
from discord import app_commands
from discord.ext import commands

class Moderation(commands.Cog):
    def __init__(self, bot: commands.Bot):
        self.bot = bot

    @app_commands.command(
        name="serverinfo", 
        description="Display community server statistics and health"
    )
    async def server_info(self, interaction: discord.Interaction):
        guild = interaction.guild
        if not guild:
            await interaction.response.send_message("Must be run inside a server.", ephemeral=True)
            return

        embed = discord.Embed(
            title=guild.name,
            description=f"Members: {guild.member_count} | Roles: {len(guild.roles)}",
            color=0x2563EB
        )
        embed.set_footer(text=f"Latency: {round(self.bot.latency * 1000)}ms")
        await interaction.response.send_message(embed=embed)

async def setup(bot: commands.Bot):
    await bot.add_cog(Moderation(bot))`,
    },
    {
      id: "automation",
      label: "Scripting & Automations",
      icon: Cpu,
      title: "Workflow & Notification Scripts",
      summary: "Lightweight automation scripts connecting web forms to notification channels, parsing files, and eliminating repetitive operations.",
      realProject: "Applied in Portfolio and Client Inquiry Pipelines",
      realProjectLink: "#contact",
      techs: ["Python Scripting", "Webhooks", "JSON/REST APIs", "Automation Pipelines"],
      capabilities: [
        "Webhook notification pipelines dispatching inquiry alerts to Discord and Telegram",
        "Automated JSON and data parsing scripts for local catalog updates",
        "Zero-dependency lightweight Python scripts designed for reliable execution",
        "Form submission validation and rate-limit guard rails",
      ],
      language: "python",
      filename: "webhook_alert.py",
      codeSnippet: `# Lightweight webhook alert dispatch for form submissions
import os
import requests
from datetime import datetime

def send_inquiry_notification(client_name: str, inquiry_topic: str) -> bool:
    webhook_url = os.getenv("DISCORD_INQUIRY_WEBHOOK")
    if not webhook_url:
        return False

    payload = {
        "content": f"**New Project Inquiry** from **{client_name}**",
        "embeds": [{
            "title": "Topic: " + inquiry_topic,
            "color": 0x2563EB,
            "timestamp": datetime.utcnow().isoformat(),
            "footer": {"text": "Portfolio Dispatch Service"}
        }]
    }

    try:
        res = requests.post(webhook_url, json=payload, timeout=6)
        return res.status_code == 204
    except requests.RequestException:
        return False`,
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
    <section id="development-studio" className="py-24 sm:py-28 px-4 sm:px-8 border-t border-[#1C2438] relative bg-[#050817]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16 pb-8 border-b border-[#1C2438]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D1224] border border-[#1C2438] text-xs font-medium text-[#2563EB] mb-3">
              <Terminal size={12} />
              <span>03 / DEVELOPMENT STUDIO</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tightest text-white leading-tight font-heading">
              Engineering &amp; <br />
              <span className="text-[#94A3B8] font-normal font-serif italic">Practical Software.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-[#94A3B8] font-normal leading-relaxed">
            I write clean, maintainable code for responsive web applications, community automation bots, and lightweight script pipelines.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex flex-wrap items-center gap-2 mb-8 p-1 rounded-2xl bg-[#0D1224] border border-[#1C2438] w-fit">
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
                    ? "bg-[#2563EB] text-white font-semibold shadow-md"
                    : "text-[#94A3B8] hover:text-white hover:bg-[#131930]"
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
          {/* Left: Overview & Architecture Highlights */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="text-[11px] font-mono text-[#2563EB] uppercase tracking-wider mb-1 font-bold">
                Technical Focus
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tight font-heading">
                {activeTab.title}
              </h3>
              <p className="text-sm text-[#94A3B8] mt-2 leading-relaxed">
                {activeTab.summary}
              </p>
            </div>

            {/* Real Project Context Pill */}
            <div className="p-3.5 rounded-xl border border-[#1C2438] bg-[#070B18] text-xs font-mono text-[#CBD5E1] flex items-center justify-between">
              <span className="truncate pr-2">{activeTab.realProject}</span>
              {activeTab.realProjectLink.startsWith("http") ? (
                <a
                  href={activeTab.realProjectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#38BDF8] hover:text-white flex items-center gap-1 shrink-0 transition-colors"
                >
                  <span>Visit</span>
                  <ExternalLink size={12} />
                </a>
              ) : (
                <a
                  href={activeTab.realProjectLink}
                  className="text-[#38BDF8] hover:text-white flex items-center gap-1 shrink-0 transition-colors"
                >
                  <span>View</span>
                  <ExternalLink size={12} />
                </a>
              )}
            </div>

            {/* Technologies */}
            <div className="space-y-2">
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#94A3B8]">
                Technologies &amp; Frameworks
              </div>
              <div className="flex flex-wrap gap-1.5">
                {activeTab.techs.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-full text-xs font-mono border border-[#1C2438] bg-[#070B18] text-white"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Practical Capabilities */}
            <div className="space-y-2.5 pt-2">
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#94A3B8]">
                Practical Capabilities
              </div>
              <div className="space-y-2">
                {activeTab.capabilities.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-[#CBD5E1] leading-relaxed">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#2563EB] mt-1.5 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Code Viewer */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-[#1C2438] bg-[#0D1224] shadow-2xl overflow-hidden">
              {/* Header Bar */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-[#1C2438] bg-[#070B18]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#1C2438]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#1C2438]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#1C2438]" />
                  <span className="text-[11px] font-mono text-[#94A3B8] ml-2">
                    {activeTab.filename}
                  </span>
                </div>

                <button
                  onClick={handleCopy}
                  type="button"
                  className="flex items-center gap-1.5 text-[11px] font-mono text-[#94A3B8] hover:text-white px-2.5 py-1 rounded-md bg-[#131930] border border-[#1C2438] transition-colors"
                  aria-label="Copy code snippet"
                >
                  {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                  <span>{copied ? "Copied" : "Copy"}</span>
                </button>
              </div>

              {/* Code Snippet Pre Block */}
              <div className="p-4 sm:p-5 overflow-x-auto text-[11px] sm:text-xs font-mono text-[#CBD5E1] leading-relaxed max-h-[380px] bg-[#070B18]/60">
                <pre className="selection:bg-[#2563EB]/40">
                  <code>{activeTab.codeSnippet}</code>
                </pre>
              </div>

              {/* Footer */}
              <div className="px-4 py-2 border-t border-[#1C2438] bg-[#070B18] flex items-center justify-between text-[10px] font-mono text-[#94A3B8]">
                <span>Language: {activeTab.language.toUpperCase()}</span>
                <span>Production Implementation</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
