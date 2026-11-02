export interface Project {
  id: string;
  title: string;
  subtitle?: string;
  category: "Web Development" | "AI Filmmaking" | "Video Editing" | "Discord Bots" | "Brand Design" | "Experimental Lab";
  categorySlug: "web-dev" | "ai-film" | "video-edit" | "discord-bot" | "branding" | "experiments";
  statusType: "Live Project" | "Creative Film" | "Video Reel" | "Python Engine" | "Design System" | "Research & Lab";
  year: string;
  role: string;
  summary: string;
  description: string;
  objective: string;
  contribution: string;
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
  "Web Development",
  "AI Filmmaking",
  "Video Editing",
  "Discord Bots",
  "Brand Design",
  "Experimental Lab",
] as const;

export type ProjectCategory = (typeof projectCategories)[number];

export const projects: Project[] = [
  {
    id: "budgetmandu",
    title: "BudgetMandu",
    subtitle: "Digital Marketplace Platform",
    category: "Web Development",
    categorySlug: "web-dev",
    statusType: "Live Project",
    year: "2025",
    role: "Full-Stack Web Developer & UI Designer",
    summary: "A Nepal-focused digital storefront designed to make legitimate digital tools and creative subscriptions accessible with local pricing and direct inquiry.",
    description: "BudgetMandu was built to solve a genuine problem in Nepal: making verified digital tools, educational resources, and creative software accessible through straightforward local transactions. I designed and engineered the entire web application, focusing on fast mobile load times, clear product categorization, local NPR pricing, and direct merchant inquiry channels via WhatsApp.",
    objective: "Build an accessible, mobile-first marketplace for digital consumers in Nepal, eliminating unnecessary checkout barriers and providing clear pricing in local currency.",
    contribution: "Designed the full UI from scratch in Figma, engineered the frontend with Next.js App Router and Tailwind CSS, implemented responsive catalog navigation with live filtering, and integrated instant order inquiries via WhatsApp.",
    tools: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel"],
    features: [
      "Fast, lightweight catalog navigation optimized for mobile data connections in Nepal",
      "Dynamic local currency pricing (NPR) across verified creative tools and digital services",
      "Direct WhatsApp and phone order routing eliminating complex international checkout friction",
      "Responsive dark-themed layout built with accessible semantic markup",
    ],
    accentColor: "#38bdf8",
    aspectRatio: "16/9",
    isFeatured: true,
    demoUrl: "https://www.budgetmandu.com",
    thumbnailUrl: "/projects/budgetmandu.png",
    badge: "Live Platform",
    actionLabel: "Visit Live Website",
    visualPreview: {
      type: "image-thumbnail",
      headline: "BudgetMandu",
      subline: "Nepal Digital Commerce Platform",
      themeGradient: "radial-gradient(ellipse at center, rgba(56, 189, 248, 0.25), rgba(6, 10, 20, 0.98))",
    },
  },
  {
    id: "aether-chronicles",
    title: "Echoes of Tomorrow",
    subtitle: "Speculative AI Cinema",
    category: "AI Filmmaking",
    categorySlug: "ai-film",
    statusType: "Creative Film",
    year: "2025",
    role: "Director & AI Cinematographer",
    summary: "A cinematic storytelling piece exploring human presence and atmosphere using generative visual prompts, color timing, and sound design.",
    description: "Echoes of Tomorrow is an exploration in generative visual storytelling. Rather than treating AI as a shortcut, I wanted to see how far prompt precision, lighting continuity, and deliberate camera framing could push synthetic cinema. I generated scene sequences with Google Flow, then shaped the narrative rhythm, pacing, and color grade in Premiere Pro.",
    objective: "Test the limits of AI-generated imagery by maintaining character presence, lighting consistency, and atmospheric mood across sequential shots.",
    contribution: "Authored detailed camera and lighting prompts in Google Flow, selected and sequenced generated takes, executed frame-by-frame color timing in Premiere Pro, and mixed ambient sound design.",
    tools: ["Google Flow", "Adobe Premiere Pro", "Generative AI", "Color Grading"],
    features: [
      "Carefully controlled cinematic framing in 2.39:1 widescreen anamorphic aspect ratio",
      "Iterative prompt engineering focused on natural key-to-fill lighting and texture continuity",
      "Timeline editing and color grading designed to give generated footage a cohesive film look",
      "Atmospheric pacing with voice and ambient sound design reinforcing the narrative mood",
    ],
    accentColor: "#7dd3fc",
    aspectRatio: "21/9",
    isFeatured: true,
    videoSrc: "/videos/intro.mp4",
    thumbnailUrl: "/projects/echoes-of-tomorrow.png",
    badge: "AI Short Film",
    actionLabel: "Watch Film",
    visualPreview: {
      type: "video-preview",
      headline: "Echoes of Tomorrow",
      subline: "Speculative Cinema // 2.39:1",
      themeGradient: "radial-gradient(ellipse at center, rgba(125, 211, 252, 0.22), rgba(8, 12, 20, 0.98))",
    },
  },
  {
    id: "pulse-edits",
    title: "Kinetic Video Reel",
    subtitle: "Rhythm & Pacing Showcase",
    category: "Video Editing",
    categorySlug: "video-edit",
    statusType: "Video Reel",
    year: "2025",
    role: "Video Editor & Sound Designer",
    summary: "A post-production showcase testing dynamic pacing, audio-visual synchronization, and visual momentum for modern digital video.",
    description: "An editing showcase exploring what keeps viewers engaged in short-form and promo video content. Built using Adobe Premiere Pro and CapCut, this piece focuses on beat-accurate cutting, speed ramping, J/L cuts for sound transitions, and clean typography that reinforces the visual energy without cluttering the screen.",
    objective: "Master the technical timing of fast-paced digital video, focusing on cut precision, audio transient alignment, and visual rhythm.",
    contribution: "Curated raw footage, edited the multi-track timeline, mapped cut points directly to audio transients, designed kinetic typography, and balanced foley sound effects.",
    tools: ["Adobe Premiere Pro", "CapCut", "Audio Design", "Kinetic Typography"],
    features: [
      "Precise cut timing synchronized to musical transients and dialogue cadence",
      "Dynamic speed ramps and whip transitions that maintain visual flow between scenes",
      "Layered sound design with risers, impacts, and ambient foley for tactile audio depth",
      "High-contrast color pass tuned for clarity across both mobile feeds and desktop screens",
    ],
    accentColor: "#c084fc",
    aspectRatio: "16/9",
    isFeatured: true,
    videoSrc: "/videos/work.mp4",
    thumbnailUrl: "/projects/kinetic-reel.png",
    badge: "Editing Reel",
    actionLabel: "Watch Reel",
    visualPreview: {
      type: "video-preview",
      headline: "Kinetic Video Reel",
      subline: "Rhythm-Driven Editing & Audio Sync",
      themeGradient: "radial-gradient(ellipse at center, rgba(192, 132, 252, 0.2), rgba(16, 8, 22, 0.98))",
    },
  },
  {
    id: "sentinel-bot",
    title: "Sentinel Discord Engine",
    subtitle: "Community Automation Bot",
    category: "Discord Bots",
    categorySlug: "discord-bot",
    statusType: "Python Engine",
    year: "2025",
    role: "Python Developer",
    summary: "A modular, asynchronous Discord bot built with Python and discord.py to automate server management, member onboarding, and utility tasks.",
    description: "Sentinel is an independent Python Discord bot created to manage and automate community servers. Using discord.py with an asynchronous architecture, it organizes commands into modular cogs for moderation, utility functions, and welcoming new members without blocking the event loop.",
    objective: "Engineer a reliable, maintainable Discord bot architecture that handles server administration, welcome onboarding, and automated utility commands without blocking the event loop.",
    contribution: "Architected the Python codebase using discord.py cogs, implemented asynchronous slash commands, designed interactive embed responses, and configured secure token management.",
    tools: ["Python 3.11", "discord.py", "AsyncIO", "REST APIs"],
    features: [
      "Modular cog structure keeping moderation, greeting, and utility logic cleanly separated",
      "Asynchronous event listeners that handle member joins, role assignments, and commands efficiently",
      "Clean embed responses formatted for clarity across desktop and mobile Discord clients",
      "Fault-tolerant error handling and rate-limit management for stable continuous runtime",
    ],
    accentColor: "#4ade80",
    aspectRatio: "16/9",
    badge: "Python Engine",
    actionLabel: "View Architecture",
    visualPreview: {
      type: "code-snippet",
      headline: "Sentinel Discord Bot",
      subline: "Async Python Automation Engine",
      themeGradient: "radial-gradient(ellipse at center, rgba(74, 222, 128, 0.18), rgba(8, 18, 12, 0.98))",
    },
  },
  {
    id: "flow-motion-ads",
    title: "Aura Design System",
    subtitle: "Brand & Typography Concept",
    category: "Brand Design",
    categorySlug: "branding",
    statusType: "Design System",
    year: "2025",
    role: "Brand & Visual Designer",
    summary: "A conceptual brand identity and typography system exploring high-contrast editorial layouts, restrained dark surfaces, and scalable UI grids.",
    description: "Aura is a personal design experiment in crafting a clean, modern brand identity. I explored the balance between editorial serif accents and stark geometric sans-serif typography, developing a consistent dark color palette, spacing tokens, and component guidelines for creative studios and digital creators.",
    objective: "Create a cohesive visual language that feels premium and editorial while remaining practical for responsive digital interfaces.",
    contribution: "Defined typographic scales, selected font pairings, built a 12-column grid system, and produced design documentation and component specs in Figma.",
    tools: ["Figma", "Typography Systems", "Design Systems", "Visual Hierarchy"],
    features: [
      "Careful typographic pairing balancing editorial serif titles with clean grotesque body copy",
      "Restrained dark color system with deep navy, subtle border tones, and silver accents",
      "Consistent 8pt spacing and layout grid tokens designed for responsive web design",
      "Editorial presentation templates emphasizing whitespace and visual hierarchy",
    ],
    accentColor: "#f43f5e",
    aspectRatio: "16/9",
    badge: "Concept System",
    actionLabel: "Explore Design System",
    visualPreview: {
      type: "typography-card",
      headline: "Aura Design System",
      subline: "Editorial Brand Identity & Grid Architecture",
      themeGradient: "radial-gradient(ellipse at center, rgba(244, 63, 94, 0.18), rgba(20, 8, 12, 0.98))",
    },
  },
  {
    id: "neural-vistas",
    title: "Neural Vistas Lab",
    subtitle: "AI Exploration Sandbox",
    category: "Experimental Lab",
    categorySlug: "experiments",
    statusType: "Research & Lab",
    year: "2025",
    role: "Creative Technologist",
    summary: "An ongoing creative sandbox for testing multimodal AI models, prompt formulation methods, and generative visual workflows.",
    description: "Neural Vistas is my hands-on testing ground for emerging AI tools and workflows. Here, I test prompt behaviors across Google Flow, Gemini, and other generative models, documenting how camera parameters, lighting descriptors, and reference images translate into usable creative assets for film and web work.",
    objective: "Systematically test and document prompt techniques, camera parameters, and multimodal workflows to inform real-world creative projects.",
    contribution: "Conducted iterative prompt tests, documented effective parameter sets for cinematic lighting, and built rapid prototypes combining generative media with modern web interfaces.",
    tools: ["Google Flow", "Google Gemini", "ChatGPT", "Prompt Engineering"],
    features: [
      "Systematic testing of text prompts for volumetric lighting, focal lengths, and camera angles",
      "Documentation of reliable workflows bridging generative visual synthesis and timeline video editing",
      "Explorations in texture consistency, character continuity, and lighting coherence",
      "Practical notes and findings directly applied to active film and web projects",
    ],
    accentColor: "#fb923c",
    aspectRatio: "16/9",
    badge: "Experimental Sandbox",
    actionLabel: "Explore Lab Notes",
    visualPreview: {
      type: "experimental-lab",
      headline: "Neural Vistas Lab",
      subline: "AI Generative Workflows & Creative Sandbox",
      themeGradient: "radial-gradient(ellipse at center, rgba(251, 146, 60, 0.18), rgba(20, 12, 8, 0.98))",
    },
  },
];
