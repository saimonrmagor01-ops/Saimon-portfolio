export interface Service {
  id: string;
  number: string;
  title: string;
  category: "Creative" | "Production" | "Engineering" | "Automation";
  description: string;
  deliverables: string[];
  tools: string[];
  inquiryCode: string;
  relatedProjectId?: string;
  keyOutcome?: string;
}

export const services: Service[] = [
  {
    id: "ai-video-production",
    number: "01",
    title: "AI Video Production",
    category: "Creative",
    description: "End-to-end generative video production from conceptual treatment to final rendered sequences, combining cutting-edge AI generation with deliberate creative art direction.",
    deliverables: [
      "Concept moodboards & visual prompt design",
      "Multimodal AI scene generation",
      "Resolution upscaling & artifact cleanup",
      "Narrative pacing and thematic alignment",
    ],
    tools: ["Google Flow", "Generative Pipelines", "Premiere Pro"],
    inquiryCode: "AI Video Production",
    relatedProjectId: "flow-motion-ads",
    keyOutcome: "Cinematic commercial and artistic video sequences built with multimodal generative pipelines.",
  },
  {
    id: "cinematic-ai-filmmaking",
    number: "02",
    title: "Cinematic AI Filmmaking",
    category: "Creative",
    description: "Story-driven, high-concept cinematic filmmaking. Producing narrative shorts, worldbuilding pieces, and speculative visuals with anamorphic framing and emotive soundscapes.",
    deliverables: [
      "Screenplay & visual treatment translation",
      "Cohesive character and lighting consistency",
      "Cinematic aspect ratios (2.39:1, 16:9)",
      "Atmospheric sound design & score matching",
    ],
    tools: ["Google Flow", "Premiere Pro", "Sound Curation"],
    inquiryCode: "Cinematic AI Filmmaking",
    relatedProjectId: "aether-chronicles",
    keyOutcome: "Long-form and short-form speculative cinema with shot continuity and custom sound architecture.",
  },
  {
    id: "short-form-video-editing",
    number: "03",
    title: "Short-form Video Editing",
    category: "Production",
    description: "High-retention editing crafted specifically for TikTok, Instagram Reels, and YouTube Shorts. Engineered with rapid visual hooks, kinetic captions, and tight rhythmic pacing.",
    deliverables: [
      "Frame-by-frame beat synchronization",
      "Dynamic animated typography and subtitles",
      "Sound design, risers, and impact foley",
      "Format optimization for 9:16 mobile feeds",
    ],
    tools: ["Adobe Premiere Pro", "CapCut"],
    inquiryCode: "Short-form Video Editing",
    relatedProjectId: "pulse-edits",
    keyOutcome: "High-retention 9:16 vertical motion content engineered for maximum social viewer hold rate.",
  },
  {
    id: "social-media-content",
    number: "04",
    title: "Social Media Content Production",
    category: "Production",
    description: "Structured content creation designed to build engagement and brand authority across digital channels, maintaining visual consistency across serial content releases.",
    deliverables: [
      "Multi-platform asset cutdowns and variations",
      "Visual hook optimization for retention",
      "Brand color adherence and thumbnail assets",
      "Batch production workflows",
    ],
    tools: ["Premiere Pro", "CapCut", "Digital Strategy"],
    inquiryCode: "Social Media Content Production",
    relatedProjectId: "pulse-edits",
    keyOutcome: "Multi-platform serialized video cutdowns preserving brand tone across Instagram, YouTube, and TikTok.",
  },
  {
    id: "website-development",
    number: "05",
    title: "Website Development",
    category: "Engineering",
    description: "Custom, responsive websites crafted with clean semantic code, modern frameworks, and refined typography. Designed for blazing speed, search visibility, and frictionless UX.",
    deliverables: [
      "Modern Next.js or clean HTML/CSS/JS implementation",
      "Mobile-first responsive architecture",
      "SEO, Open Graph, and performance optimization",
      "Clean UI component design and subtle animations",
    ],
    tools: ["Next.js", "TypeScript", "Tailwind CSS", "JavaScript"],
    inquiryCode: "Website Development",
    relatedProjectId: "budgetmandu",
    keyOutcome: "Fast, responsive web applications engineered with Next.js, accessible markup, and smooth UX.",
  },
  {
    id: "discord-bot-development",
    number: "06",
    title: "Discord Bot Development",
    category: "Engineering",
    description: "Bespoke Discord bots engineered in Python to automate community operations, streamline moderation, deliver real-time notices, and provide custom interactive tools.",
    deliverables: [
      "Asynchronous slash command integration",
      "Custom role management & verification flows",
      "Interactive button & modal menus",
      "Secure hosting preparation and API integrations",
    ],
    tools: ["Python", "discord.py", "REST APIs"],
    inquiryCode: "Discord Bot Development",
    relatedProjectId: "sentinel-bot",
    keyOutcome: "Asynchronous Python bot architecture with modular cogs, slash commands, and server moderation.",
  },
  {
    id: "digital-automation",
    number: "07",
    title: "Digital Automation",
    category: "Automation",
    description: "Custom scripting and digital workflow automation that connects repetitive tasks, automates communication channels, and frees up human creative bandwidth.",
    deliverables: [
      "Custom Python automation scripts",
      "Webhook & API communication pipelines",
      "Data formatting and scheduled triggers",
      "Documentation and handover guidelines",
    ],
    tools: ["Python", "Webhooks", "Workflow Logic"],
    inquiryCode: "Digital Automation",
    relatedProjectId: "sentinel-bot",
    keyOutcome: "Streamlined data flow and automated tasks linking APIs, webhooks, and Python scripts.",
  },
];
