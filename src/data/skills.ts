export interface SkillItem {
  name: string;
  description: string;
  highlight?: boolean;
  howIUseIt: string;
  relatedProjectId?: string;
  relatedProjectTitle?: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  subtitle: string;
  skills: SkillItem[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "creative",
    title: "Creative & Direction",
    subtitle: "Visual concept generation and cinematic direction",
    skills: [
      {
        name: "AI Filmmaking",
        description: "Narrative synthesis, cinematic world-building, and generative scene staging.",
        highlight: true,
        howIUseIt: "I direct speculative cinematic narratives, using prompt continuity and shot staging to achieve photographic realism and emotive lighting.",
        relatedProjectId: "aether-chronicles",
        relatedProjectTitle: "Echoes of Tomorrow",
      },
      {
        name: "Video Production",
        description: "End-to-end video planning, framing, pacing, and visual storytelling.",
        howIUseIt: "I plan visual treatments, camera blocking, and narrative arcs to ensure stories resonate across both long-form and short-form cuts.",
        relatedProjectId: "flow-motion-ads",
        relatedProjectTitle: "Aura Brand Concepts",
      },
      {
        name: "Video Editing",
        description: "Pacing, audio sync, narrative cutdowns, and rhythm-driven montage.",
        howIUseIt: "I structure narrative pacing, cut rhythm, and seamless audio transitions to retain audience interest from the first frame.",
        relatedProjectId: "pulse-edits",
        relatedProjectTitle: "Kinetic Video Reel",
      },
      {
        name: "Visual Storytelling",
        description: "Emotional resonance, lighting composition, and thematic coherence.",
        howIUseIt: "I craft visual metaphors and color palettes that reinforce emotional weight across cinematic sequences.",
        relatedProjectId: "aether-chronicles",
        relatedProjectTitle: "Echoes of Tomorrow",
      },
    ],
  },
  {
    id: "editing",
    title: "Post-Production & Editing",
    subtitle: "Precision timeline editing and format mastering",
    skills: [
      {
        name: "Adobe Premiere Pro",
        description: "Long-form assembly, multi-track audio mastering, and color grading.",
        highlight: true,
        howIUseIt: "I assemble multi-track timelines, balance ambient foley and dialog, and apply color grades that unify diverse generated shots.",
        relatedProjectId: "pulse-edits",
        relatedProjectTitle: "Kinetic Video Reel",
      },
      {
        name: "CapCut",
        description: "High-impact short-form edits, viral format pacing, transitions, and dynamic typography.",
        howIUseIt: "I engineer viral-format visual hooks, synchronized sound effects, and kinetic subtitles designed for 9:16 mobile retention.",
        relatedProjectId: "pulse-edits",
        relatedProjectTitle: "Kinetic Video Reel",
      },
    ],
  },
  {
    id: "ai",
    title: "Generative AI Systems",
    subtitle: "Prompt engineering and emerging creative tools",
    skills: [
      {
        name: "Google Flow",
        description: "Generative visual pipeline creation and multimodal workflow orchestration.",
        highlight: true,
        howIUseIt: "I orchestrate generative visual experiments, testing volumetric lighting, camera focal lengths, and anamorphic lens flares.",
        relatedProjectId: "neural-vistas",
        relatedProjectTitle: "Neural Vistas // Lab",
      },
      {
        name: "AI-Assisted Creative Workflows",
        description: "Integrating neural models for concept ideation, moodboarding, and storyboard generation.",
        howIUseIt: "I connect generative tools to rapidly explore architectural environments, character concepts, and cinematic storyboards.",
        relatedProjectId: "flow-motion-ads",
        relatedProjectTitle: "Aura Brand Concepts",
      },
    ],
  },
  {
    id: "development",
    title: "Web & Software Engineering",
    subtitle: "Modern frontend and scripting technologies",
    skills: [
      {
        name: "Next.js",
        description: "App Router, server/client component architectures, and performant web apps.",
        highlight: true,
        howIUseIt: "I build responsive web applications with the App Router, prioritizing clean component design and high performance on mobile devices.",
        relatedProjectId: "budgetmandu",
        relatedProjectTitle: "BudgetMandu",
      },
      {
        name: "JavaScript",
        description: "Modern ES6+ syntax, asynchronous programming, and DOM manipulation.",
        howIUseIt: "I implement interactive client logic, event handling, and performant UI state without unnecessary bloat.",
        relatedProjectId: "budgetmandu",
        relatedProjectTitle: "BudgetMandu",
      },
      {
        name: "HTML & CSS",
        description: "Semantic markup, modern layout models (Flexbox/Grid), and responsive design.",
        howIUseIt: "I write accessible semantic markup with modern CSS grid layouts and dark-mode color tokens.",
        relatedProjectId: "budgetmandu",
        relatedProjectTitle: "BudgetMandu",
      },
      {
        name: "Python",
        description: "Scripting, bot automation, data parsing, and backend logic.",
        howIUseIt: "I program asynchronous automation scripts, data parsers, and custom tools with clean, modular architecture.",
        relatedProjectId: "sentinel-bot",
        relatedProjectTitle: "Sentinel Discord Engine",
      },
    ],
  },
  {
    id: "other",
    title: "Bots & Digital Operations",
    subtitle: "Community architecture and digital strategy",
    skills: [
      {
        name: "Discord Bot Development",
        description: "Custom slash commands, event handlers, and server engagement systems.",
        highlight: true,
        howIUseIt: "I engineer custom Python Discord bots featuring asynchronous slash commands, automated moderation, and interactive menus.",
        relatedProjectId: "sentinel-bot",
        relatedProjectTitle: "Sentinel Discord Engine",
      },
      {
        name: "Automation",
        description: "Workflow streamlining, webhook pipelines, and repeatable digital tasks.",
        howIUseIt: "I connect digital services using webhooks, APIs, and scheduled scripts to eliminate repetitive operations.",
        relatedProjectId: "sentinel-bot",
        relatedProjectTitle: "Sentinel Discord Engine",
      },
      {
        name: "Digital Communication",
        description: "Cross-platform audience engagement, clarity in technical/creative messaging.",
        howIUseIt: "I coordinate cross-platform digital messaging, ensuring clear tone and brand consistency across diverse channels.",
      },
      {
        name: "Content Strategy",
        description: "Platform-native content planning, visual hooks, and distribution curation.",
        howIUseIt: "I structure content distribution cadences and format specifications tailored to platform-native viewer retention.",
      },
    ],
  },
];
