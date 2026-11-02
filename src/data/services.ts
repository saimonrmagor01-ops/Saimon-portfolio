export interface Service {
  id: string;
  number: string;
  title: string;
  category: "Creative Direction" | "Video Production" | "Web Engineering" | "Automation";
  tagline: string;
  description: string;
  deliverables: string[];
  tools: string[];
  inquiryCode: string;
  relatedProjectId?: string;
  keyOutcome: string;
}

export const services: Service[] = [
  {
    id: "ai-filmmaking",
    number: "01",
    title: "AI Filmmaking & Cinematic Direction",
    category: "Creative Direction",
    tagline: "Generative video production with disciplined storytelling",
    description: "I direct and produce cinematic video sequences using generative AI tools like Google Flow combined with traditional post-production. From visual treatment to final render, I ensure shots have lighting continuity, atmospheric depth, and purposeful pacing.",
    deliverables: [
      "Concept treatment & visual prompt design",
      "Camera framing and lighting continuity direction",
      "Sequence assembly, color grading, and film grain finish",
      "Audio-visual pacing and sound design integration",
    ],
    tools: ["Google Flow", "Adobe Premiere Pro", "Generative AI"],
    inquiryCode: "AI Filmmaking & Cinematic Direction",
    relatedProjectId: "aether-chronicles",
    keyOutcome: "Cinematic promotional or narrative visual sequences combining AI generation with professional post-production.",
  },
  {
    id: "short-form-video-editing",
    number: "02",
    title: "Short-Form Video Editing",
    category: "Video Production",
    tagline: "Rhythm-driven edits crafted for high retention",
    description: "High-impact video editing tailored for YouTube Shorts, Instagram Reels, and TikTok. I focus on frame-accurate cut timing, visual momentum, kinetic captions, and sound effects that keep viewers engaged from the first second.",
    deliverables: [
      "Cut timing synchronized directly to beat and dialogue cadences",
      "Kinetic typography, animated captions, and graphic accents",
      "Sound design with risers, impacts, and ambient foley",
      "9:16 vertical and 16:9 widescreen display mastering",
    ],
    tools: ["Adobe Premiere Pro", "CapCut Pro", "Audio Design"],
    inquiryCode: "Short-Form Video Editing",
    relatedProjectId: "pulse-edits",
    keyOutcome: "Sharp, engaging video edits with strong visual retention and clear audio design.",
  },
  {
    id: "website-development",
    number: "03",
    title: "Modern Website Development",
    category: "Web Engineering",
    tagline: "Fast, responsive web applications built with Next.js",
    description: "Custom web development focused on clean design, performance, and accessibility. Whether you need a digital storefront like BudgetMandu, an editorial portfolio, or a product landing page, I build responsive interfaces that load instantly and work smoothly across all devices.",
    deliverables: [
      "Modern Next.js (App Router), React, and TypeScript build",
      "Mobile-first responsive layout tested across screens",
      "Custom dark-mode design system with Tailwind CSS",
      "Performance optimization, SEO metadata, and Vercel deployment",
    ],
    tools: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    inquiryCode: "Modern Website Development",
    relatedProjectId: "budgetmandu",
    keyOutcome: "Clean, performant, and responsive web platforms designed for real users and easy maintenance.",
  },
  {
    id: "discord-bot-automation",
    number: "04",
    title: "Discord Bots & Script Automation",
    category: "Automation",
    tagline: "Custom Python bots and lightweight automation pipelines",
    description: "Custom Discord bots engineered in Python to streamline community management, automate user onboarding, handle role assignments, and provide interactive slash commands. I also build automated webhook pipelines to connect web forms with your communication channels.",
    deliverables: [
      "Modular cog-based Python bot architecture with discord.py",
      "Custom slash commands, rich embed menus, and buttons",
      "Automated welcome messages and verification flows",
      "Webhook alerts connecting web forms directly to Discord",
    ],
    tools: ["Python 3.11", "discord.py", "AsyncIO", "Webhooks"],
    inquiryCode: "Discord Bots & Script Automation",
    relatedProjectId: "sentinel-bot",
    keyOutcome: "Reliable asynchronous Discord bots and notification scripts that eliminate repetitive manual tasks.",
  },
];
