export interface Project {
  id: string;
  title: string;
  category: "AI Filmmaking" | "Video Editing" | "Website Development" | "Discord Bot Development" | "Creative Experiments";
  categorySlug: "ai-film" | "video-edit" | "web-dev" | "discord-bot" | "experiments";
  year: string;
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
  badge?: string;
  visualPreview: {
    type: "cinematic-still" | "interactive-mockup" | "video-preview" | "code-snippet";
    headline: string;
    subline: string;
    themeGradient: string;
  };
}

export const projectCategories = [
  "All",
  "AI Filmmaking",
  "Video Editing",
  "Website Development",
  "Discord Bot Development",
  "Creative Experiments",
] as const;

export type ProjectCategory = (typeof projectCategories)[number];

export const projects: Project[] = [
  {
    id: "budgetmandu",
    title: "BudgetMandu",
    category: "Website Development",
    categorySlug: "web-dev",
    year: "2025",
    summary: "A Nepal-focused digital marketplace exploring curated product discovery, transparent pricing, and streamlined online shopping.",
    description: "BudgetMandu addresses the unique localized eCommerce challenges in Nepal by prioritizing clean category navigation, rapid load speeds across varying cellular connections, and an intuitive product comparison interface tailored for price-conscious urban shoppers.",
    objective: "Design and engineer a high-performance web platform that makes discovering quality, budget-conscious tech and lifestyle goods straightforward and frictionless in Nepal.",
    tools: ["Next.js", "TypeScript", "Tailwind CSS", "JavaScript", "HTML5/CSS3"],
    features: [
      "Dynamic catalog filtering by price tier, brand, and verified local availability",
      "Optimized mobile-first interface designed for high performance on 3G/4G networks",
      "Direct WhatsApp & phone order inquiry integration for seamless local checkout",
      "Clean dark/light visual contrast with zero bloatware dependencies",
    ],
    accentColor: "#9fbdff",
    aspectRatio: "16/9",
    isFeatured: true,
    badge: "Featured Build",
    visualPreview: {
      type: "interactive-mockup",
      headline: "BUDGETMANDU // COMMERCE",
      subline: "Nepal Digital Marketplace Platform",
      themeGradient: "radial-gradient(ellipse at center, rgba(159, 189, 255, 0.28), rgba(11, 11, 15, 0.95))",
    },
  },
  {
    id: "aether-chronicles",
    title: "Echoes of Tomorrow",
    category: "AI Filmmaking",
    categorySlug: "ai-film",
    year: "2025",
    summary: "A speculative cinematic narrative exploring human emotion and memory in an automated future, synthesized via generative AI pipelines.",
    description: "Built using Google Flow and multimodal generative models, this cinematic short establishes a dystopian yet intimate world. Each shot was prompt-architected for photographic continuity, depth-of-field realism, and emotional weight, followed by careful timeline editing in Premiere Pro.",
    objective: "Push the boundaries of AI-assisted visual worldbuilding by maintaining lighting continuity, character facial coherence, and cinematic pacing across complex conceptual scenes.",
    tools: ["Google Flow", "Adobe Premiere Pro", "AI Video Pipelines", "Visual Storytelling"],
    features: [
      "Cohesive 2.39:1 anamorphic cinematic composition across 24 generated shots",
      "Custom sound design and ambient foley engineered to match synthetic camera movements",
      "Iterative prompt refinement ensuring consistent architectural aesthetics",
      "Color grading in Premiere Pro to unify lighting temperatures and grain",
    ],
    accentColor: "#7dd3fc",
    aspectRatio: "21/9",
    isFeatured: true,
    videoSrc: "/videos/Man_speaking_in_dark_studio_8a8b1698.mp4",
    badge: "AI Cinema",
    visualPreview: {
      type: "cinematic-still",
      headline: "ECHOES OF TOMORROW",
      subline: "Generative Speculative Cinema // 2.39:1",
      themeGradient: "radial-gradient(ellipse at center, rgba(125, 211, 252, 0.25), rgba(8, 12, 20, 0.98))",
    },
  },
  {
    id: "pulse-edits",
    title: "Kinetic Velocity Reel",
    category: "Video Editing",
    categorySlug: "video-edit",
    year: "2025",
    summary: "High-retention, rhythm-synchronized short-form video content crafted for viral digital reach and audience engagement.",
    description: "A showcase of fast-paced, high-conversion short-form video editing. By combining micro-sound cues, match cuts, dynamic animated typography, and speed ramps, the reel maintains maximum viewer retention and visual clarity.",
    objective: "Master the rhythm of modern social video editing by translating long-form spoken thoughts into captivating 30-to-60 second high-impact narratives.",
    tools: ["Adobe Premiere Pro", "CapCut", "Audio Mastering", "Motion Typography"],
    features: [
      "Frame-accurate sound synchronization on beat transitions and impact moments",
      "Custom kinetic subtitle layouts styled for rapid readability on mobile screens",
      "L-cut and J-cut audio transitions keeping narrative pacing seamless",
      "Optimized 9:16 vertical delivery engineered for TikTok, Reels, and Shorts",
    ],
    accentColor: "#c084fc",
    aspectRatio: "9/16",
    isFeatured: true,
    videoSrc: "/videos/Person_editing_video_on_computer_393b5e4c.mp4",
    badge: "High-Retention Edit",
    visualPreview: {
      type: "video-preview",
      headline: "KINETIC // 9:16",
      subline: "Short-Form Rhythm & Audio Sync",
      themeGradient: "radial-gradient(ellipse at center, rgba(192, 132, 252, 0.22), rgba(16, 8, 22, 0.98))",
    },
  },
  {
    id: "sentinel-bot",
    title: "Sentinel Discord Engine",
    category: "Discord Bot Development",
    categorySlug: "discord-bot",
    year: "2025",
    summary: "An automated community management and utility Discord bot programmed in Python with interactive slash commands.",
    description: "Developed to handle community moderation, automated user onboarding, scheduled notifications, and server activity metrics. Features modular cogs in Python, asynchronous command processing, and fault-tolerant error recovery.",
    objective: "Engineer a stable, lightweight Discord bot architecture that simplifies server administration and provides engaging community commands.",
    tools: ["Python", "discord.py", "Asynchronous Programming", "REST APIs"],
    features: [
      "Modular cog architecture separating moderation, utility, and entertainment commands",
      "Real-time event listeners with anti-spam triggers and automated timeout logic",
      "Interactive Discord embed responses with buttons and dropdown select menus",
      "Environment variable security and resilient API rate-limit handling",
    ],
    accentColor: "#4ade80",
    aspectRatio: "16/9",
    isFeatured: true,
    badge: "Python Engine",
    visualPreview: {
      type: "code-snippet",
      headline: "SENTINEL // BOT.PY",
      subline: "Async Discord Community Automation",
      themeGradient: "radial-gradient(ellipse at center, rgba(74, 222, 128, 0.2), rgba(8, 18, 12, 0.98))",
    },
  },
  {
    id: "neural-vistas",
    title: "Neural Vistas Lab",
    category: "Creative Experiments",
    categorySlug: "experiments",
    year: "2025",
    summary: "An exploratory study into procedural lighting, hyper-detailed environmental concepts, and AI prompt engineering.",
    description: "A continuous series of visual experiments interrogating the boundary between digital rendering and analog photography. Explores how specific lighting terminology, focal length metaphors, and prompt sequencing yield cinematic architectural and natural landscapes.",
    objective: "Document and refine prompt engineering patterns that reliably yield photorealistic atmospheric depth without visual artifacts.",
    tools: ["Google Flow", "Generative AI", "Prompt Architecture", "Curatorial Design"],
    features: [
      "Cataloged database of cinematic lighting descriptors and their visual impact",
      "Explorations in volumetric fog, anamorphic lens flares, and architectural geometry",
      "Comparative analysis of scene consistency across varying seed iterations",
    ],
    accentColor: "#fb923c",
    aspectRatio: "16/9",
    visualPreview: {
      type: "cinematic-still",
      headline: "NEURAL VISTAS // LAB",
      subline: "Atmospheric & Volumetric Studies",
      themeGradient: "radial-gradient(ellipse at center, rgba(251, 146, 60, 0.22), rgba(20, 12, 8, 0.98))",
    },
  },
  {
    id: "flow-motion-ads",
    title: "Aura Brand Concepts",
    category: "AI Filmmaking",
    categorySlug: "ai-film",
    year: "2025",
    summary: "Commercial video advertisement concepts generated through hybrid AI workflows for contemporary lifestyle aesthetics.",
    description: "Speculative 15-second product commercial spots developed to demonstrate how synthetic media can produce luxury commercial aesthetics with rapid turnaround times. Includes product hero shots, atmospheric transitions, and brand typography.",
    objective: "Demonstrate commercial viability of AI-generated video assets for modern digital advertising campaigns.",
    tools: ["Google Flow", "Adobe Premiere Pro", "CapCut", "Sound Design"],
    features: [
      "Luxury commercial color grading with cool silver and warm gold palettes",
      "Match-moving transitions between synthetic environments",
      "Precision audio sound effects amplifying perceived tactile quality",
    ],
    accentColor: "#f43f5e",
    aspectRatio: "16/9",
    visualPreview: {
      type: "video-preview",
      headline: "AURA // COMMERCIAL",
      subline: "Speculative Luxury Brand Film",
      themeGradient: "radial-gradient(ellipse at center, rgba(244, 63, 94, 0.22), rgba(20, 8, 12, 0.98))",
    },
  },
];
