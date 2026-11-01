export interface Project {
  id: string;
  title: string;
  category: "Website Development" | "AI Filmmaking" | "Video Editing" | "Discord Bot Development" | "Branding & Creative Direction" | "Research & Creative Experiments";
  categorySlug: "web-dev" | "ai-film" | "video-edit" | "discord-bot" | "branding" | "experiments";
  year: string;
  role: string;
  summary: string;
  description: string;
  objective: string;
  tools: string[];
  features: string[];
  accentColor: string;
  aspectRatio: "16/9" | "9/16" | "21/9" | "4/3";
  isFeatured?: boolean;
  demoUrl?: string;
  githubUrl?: string;
  videoSrc?: string;
  thumbnailUrl?: string;
  badge?: string;
  actionLabel: string;
  visualPreview: {
    type: "image-thumbnail" | "video-preview" | "typography-card" | "code-snippet" | "experimental-lab";
    headline: string;
    subline: string;
    themeGradient: string;
  };
}

export const projectCategories = [
  "All",
  "Website Development",
  "AI Filmmaking",
  "Video Editing",
  "Discord Bot Development",
  "Branding & Creative Direction",
  "Research & Creative Experiments",
] as const;

export type ProjectCategory = (typeof projectCategories)[number];

export const projects: Project[] = [
  {
    id: "budgetmandu",
    title: "BudgetMandu — Digital Marketplace",
    category: "Website Development",
    categorySlug: "web-dev",
    year: "2025",
    role: "Lead Full-Stack Web Developer & UI Designer",
    summary: "A Nepal-focused digital marketplace designed to make genuine digital subscriptions and digital products more affordable and accessible.",
    description: "BudgetMandu is an active Nepal-focused digital storefront engineered to eliminate friction in discovering and purchasing authentic digital subscriptions, creative software access, and digital utility services. Developed with a high-performance modern web stack, it features intuitive catalog navigation, dynamic local currency pricing (NPR), instant order notification pipelines, and streamlined WhatsApp and phone-based checkout tailored specifically for users in Nepal.",
    objective: "Engineer a fast, accessible, and responsive marketplace interface optimized for Nepal's digital consumers, featuring frictionless product discovery, real-time local currency pricing, and direct merchant inquiry channels.",
    tools: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vercel", "REST APIs"],
    features: [
      "High-performance responsive marketplace interface optimized for desktop and mobile networks",
      "Real-time NPR pricing for verified digital products, OTT subscriptions, and creative tools",
      "Frictionless inquiry and checkout pipelines integrated with local payment and direct WhatsApp ordering",
      "Clean dark-themed user experience with optimized client-side routing and instant search",
    ],
    accentColor: "#38bdf8",
    aspectRatio: "16/9",
    isFeatured: true,
    demoUrl: "https://www.budgetmandu.com",
    thumbnailUrl: "/projects/budgetmandu.png",
    badge: "Featured Web Platform",
    actionLabel: "Visit Live Website",
    visualPreview: {
      type: "image-thumbnail",
      headline: "BUDGETMANDU // COMMERCE",
      subline: "Nepal Digital Marketplace Platform",
      themeGradient: "radial-gradient(ellipse at center, rgba(56, 189, 248, 0.32), rgba(6, 10, 20, 0.98))",
    },
  },
  {
    id: "aether-chronicles",
    title: "Echoes of Tomorrow — AI Cinema",
    category: "AI Filmmaking",
    categorySlug: "ai-film",
    year: "2025",
    role: "AI Cinematographer & Creative Director",
    summary: "A speculative cinematic storytelling experiment exploring synthetic human narratives, atmospheric visuals, and AI-generated filmmaking.",
    description: "An exploratory generative cinema project probing synthetic human emotion and character presence in an intimate studio atmosphere. Built using Google Flow for prompt-guided scene visual generation and Adobe Premiere Pro for timeline pacing, color timing, and sound design, the project demonstrates how generative tools can craft convincing cinematic visual language without traditional camera gear.",
    objective: "Explore the artistic boundaries of AI-generated filmmaking by maintaining lighting continuity, character presence, and atmospheric pacing without relying on traditional camera production.",
    tools: ["Google Flow", "Generative AI", "Adobe Premiere Pro", "Visual Storytelling"],
    features: [
      "Cinematic atmospheric framing with disciplined key-to-fill lighting and moody studio aesthetic",
      "Iterative prompt architecture developed in Google Flow to achieve expressive character consistency",
      "Frame-by-frame color timing and vocal pacing edited in Adobe Premiere Pro",
      "Speculative narrative monologue designed for immersive 2.39:1 widescreen cinema",
    ],
    accentColor: "#7dd3fc",
    aspectRatio: "21/9",
    isFeatured: true,
    videoSrc: "/videos/intro.mp4",
    thumbnailUrl: "/projects/echoes-of-tomorrow.png",
    badge: "AI Cinema",
    actionLabel: "Watch Film",
    visualPreview: {
      type: "video-preview",
      headline: "ECHOES OF TOMORROW",
      subline: "Generative Speculative Cinema // 2.39:1",
      themeGradient: "radial-gradient(ellipse at center, rgba(125, 211, 252, 0.25), rgba(8, 12, 20, 0.98))",
    },
  },
  {
    id: "flow-motion-ads",
    title: "Aura — Brand Concepts",
    category: "Branding & Creative Direction",
    categorySlug: "branding",
    year: "2025",
    role: "Brand Designer & Creative Director",
    summary: "A creative branding experiment exploring visual identity, brand aesthetics, design systems, and modern digital presentation.",
    description: "Aura is an exploratory design exercise focused on crafting a contemporary brand identity from the ground up. The experiment explores high-contrast typographic pairings, minimal geometric grid systems, restrained dark luxury color palettes, and digital layout specifications designed for modern creative agencies and digital products.",
    objective: "Develop a unified design system that balances minimal modernist restraint with modern digital presence, establishing guidelines for color theory, typography scales, and UI component hierarchies.",
    tools: ["Creative Direction", "Typography Systems", "Figma", "Design Systems", "Brand Identity"],
    features: [
      "Comprehensive typography hierarchy balancing editorial serif accents with stark geometric grotesques",
      "Monochrome-focused luxury color system with restrained electric blue and silver highlights",
      "Structured grid system and spacing tokens designed for scalable web and mobile interfaces",
      "Speculative digital presentation guidelines emphasizing negative space and visual hierarchy",
    ],
    accentColor: "#f43f5e",
    aspectRatio: "16/9",
    badge: "Brand System",
    actionLabel: "Explore Brand System",
    visualPreview: {
      type: "typography-card",
      headline: "AURA // IDENTITY SYSTEM",
      subline: "Modernist Brand Identity & Grid Architecture",
      themeGradient: "radial-gradient(ellipse at center, rgba(244, 63, 94, 0.22), rgba(20, 8, 12, 0.98))",
    },
  },
  {
    id: "pulse-edits",
    title: "Kinetic Video Reel — Video Editing",
    category: "Video Editing",
    categorySlug: "video-edit",
    year: "2025",
    role: "Video Editor & Motion Designer",
    summary: "A video editing experiment focused on dynamic pacing, visual transitions, rhythmic editing, and engaging short-form storytelling.",
    description: "A dedicated editing showcase exploring high-retention post-production techniques. Using Adobe Premiere Pro and CapCut, the project investigates how millisecond-level match cuts, speed ramps, visual sound synchronization, and dynamic framing keep digital audiences engaged throughout concise visual sequences.",
    objective: "Master the technical pacing and audio-visual rhythm of modern video editing, testing how cut velocity and waveform synchronization influence viewer retention.",
    tools: ["Adobe Premiere Pro", "CapCut", "Audio Waveform Sync", "Timeline Trimming"],
    features: [
      "Frame-accurate audio synchronization linking cut transitions directly to transient peaks",
      "Multi-track timeline trimming with disciplined J-cut and L-cut dialogue layering",
      "Dynamic speed ramping and camera motion match-cuts creating seamless sequence momentum",
      "Color grading and contrast tuning optimized for vibrant playback across mobile and desktop displays",
    ],
    accentColor: "#c084fc",
    aspectRatio: "16/9",
    isFeatured: true,
    videoSrc: "/videos/work.mp4",
    thumbnailUrl: "/projects/kinetic-reel.png",
    badge: "High-Retention Edit",
    actionLabel: "Watch Reel",
    visualPreview: {
      type: "video-preview",
      headline: "KINETIC // EDITING TIMELINE",
      subline: "Rhythm-Driven Motion & Waveform Pacing",
      themeGradient: "radial-gradient(ellipse at center, rgba(192, 132, 252, 0.22), rgba(16, 8, 22, 0.98))",
    },
  },
  {
    id: "sentinel-bot",
    title: "Sentinel Discord Engine — Discord Bot Development",
    category: "Discord Bot Development",
    categorySlug: "discord-bot",
    year: "2025",
    role: "Python Backend Developer",
    summary: "A Discord automation project exploring server management, automated workflows, bot interactions, and community management tools.",
    description: "Sentinel is a custom Discord automation bot built with Python and discord.py. Designed to streamline server operations, it features asynchronous event dispatching, modular command cogs, automated onboarding messages, role synchronization, and robust error-handling pipelines configured for high-traffic Discord communities.",
    objective: "Engineer a clean, maintainable Discord bot architecture that handles server administration, welcome onboarding, and automated utility commands without blocking the event loop.",
    tools: ["Python", "discord.py", "Asynchronous AsyncIO", "REST APIs", "Bot Architecture"],
    features: [
      "Modular cog-based command organization separating moderation, utility, and automated event logic",
      "Asynchronous event listeners handling member joins, message filtering, and reaction roles",
      "Custom rich embed formatting providing clean, readable command feedback to server members",
      "Secure environment variable configuration and fault-tolerant rate-limit retry mechanisms",
    ],
    accentColor: "#4ade80",
    aspectRatio: "16/9",
    badge: "Python Engine",
    actionLabel: "Explore Architecture",
    visualPreview: {
      type: "code-snippet",
      headline: "SENTINEL // BOT.PY",
      subline: "Async Discord Community Automation Engine",
      themeGradient: "radial-gradient(ellipse at center, rgba(74, 222, 128, 0.2), rgba(8, 18, 12, 0.98))",
    },
  },
  {
    id: "neural-vistas",
    title: "Neural Vistas // Lab — Experimental AI & Technology",
    category: "Research & Creative Experiments",
    categorySlug: "experiments",
    year: "2025",
    role: "Creative Technologist & AI Researcher",
    summary: "An experimental creative lab exploring artificial intelligence, emerging technologies, generative visuals, and digital concepts.",
    description: "An ongoing creative laboratory and sandbox investigating the intersection of artificial intelligence, creative prompt synthesis, generative visual models, and interactive web technologies. The lab acts as a proving ground for rapid prototyping, assessing emerging AI tools, and documenting novel workflows before integrating them into production pipelines.",
    objective: "Maintain a dedicated testing environment to experiment with multimodal generative models, evaluate prompt engineering techniques, and prototype experimental web interfaces.",
    tools: ["Multimodal AI", "Creative Prototyping", "Prompt Architecture", "Google Flow", "Gemini API"],
    features: [
      "Systematic experimentation with text-to-visual prompts and cinematic camera parameter tuning",
      "Prototyping hybrid human-AI workflows combining LLM reasoning with generative visual pipelines",
      "Explorations in volumetric lighting, procedural depth cues, and synthetic texture consistency",
      "Documented insights informing real-world production choices across film and web projects",
    ],
    accentColor: "#fb923c",
    aspectRatio: "16/9",
    badge: "Experimental Lab",
    actionLabel: "Explore Lab",
    visualPreview: {
      type: "experimental-lab",
      headline: "NEURAL VISTAS // LAB",
      subline: "Multimodal AI & Creative Technology Sandbox",
      themeGradient: "radial-gradient(ellipse at center, rgba(251, 146, 60, 0.22), rgba(20, 12, 8, 0.98))",
    },
  },
];
