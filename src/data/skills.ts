export interface SkillItem {
  name: string;
  summary: string;
  howIUseIt: string;
  highlight?: boolean;
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
    id: "ai-filmmaking",
    title: "AI Filmmaking",
    subtitle: "Generative scene creation, cinematic prompts, and visual continuity",
    skills: [
      {
        name: "Google Flow",
        summary: "Prompt-driven scene synthesis, lighting control, and camera framing.",
        howIUseIt: "I direct generative scenes by crafting precise camera parameters (focal length, depth of field, anamorphic framing) and lighting continuity prompts to achieve natural cinematic imagery.",
        highlight: true,
        relatedProjectId: "aether-chronicles",
        relatedProjectTitle: "Echoes of Tomorrow",
      },
      {
        name: "Prompt Architecture",
        summary: "Structured, repeatable prompting for character and lighting consistency.",
        howIUseIt: "I build structured prompt templates that maintain character features, mood continuity, and atmospheric depth across sequential video shots.",
        highlight: true,
        relatedProjectId: "neural-vistas",
        relatedProjectTitle: "Neural Vistas Lab",
      },
      {
        name: "Cinematic Visual Storytelling",
        summary: "Shot composition, mood development, visual pacing, and narrative tone.",
        howIUseIt: "I plan visual sequences with careful attention to lighting, shot transitions, and emotional weight, ensuring AI-generated clips serve a cohesive story.",
        relatedProjectId: "aether-chronicles",
        relatedProjectTitle: "Echoes of Tomorrow",
      },
      {
        name: "Generative Video Synthesis",
        summary: "Iterative testing of model parameters, motion consistency, and upscaling.",
        howIUseIt: "I evaluate emerging video generation models, selecting the strongest takes and refining them with motion stabilization and color timing.",
        relatedProjectId: "neural-vistas",
        relatedProjectTitle: "Neural Vistas Lab",
      },
    ],
  },
  {
    id: "video-editing",
    title: "Video Editing & Production",
    subtitle: "Rhythmic timeline cutting, audio synchronization, and post-production",
    skills: [
      {
        name: "Adobe Premiere Pro",
        summary: "Multi-track timeline editing, J/L cuts, speed ramping, and color grading.",
        howIUseIt: "My primary NLE for assembling multi-track edits, balancing audio transients, applying film-look color grades, and finessing sequence pacing.",
        highlight: true,
        relatedProjectId: "pulse-edits",
        relatedProjectTitle: "Kinetic Video Reel",
      },
      {
        name: "CapCut Pro",
        summary: "High-retention mobile formats, kinetic subtitles, and rapid turnaround.",
        howIUseIt: "I use CapCut to craft 9:16 vertical edits with tightly synchronized sound effects, visual hooks, and kinetic typography tuned for social retention.",
        highlight: true,
        relatedProjectId: "pulse-edits",
        relatedProjectTitle: "Kinetic Video Reel",
      },
      {
        name: "Audio-Visual Synchronization",
        summary: "Aligning visual cuts to audio transients, risers, and vocal cadences.",
        howIUseIt: "I map cut points directly to kick drums, risers, and natural speech pauses to give videos a satisfying, rhythmic momentum that holds attention.",
        relatedProjectId: "pulse-edits",
        relatedProjectTitle: "Kinetic Video Reel",
      },
      {
        name: "Color Timing & Look Development",
        summary: "Unifying varied footage with consistent contrast, tone, and film emulation.",
        howIUseIt: "I grade clips to harmonize different source materials into a single visual universe, using muted shadow tones and clean highlights.",
        relatedProjectId: "aether-chronicles",
        relatedProjectTitle: "Echoes of Tomorrow",
      },
    ],
  },
  {
    id: "web-dev",
    title: "Web Development",
    subtitle: "Modern responsive web applications with clean architecture and performance",
    skills: [
      {
        name: "Next.js & React",
        summary: "Server and client component architecture with App Router.",
        howIUseIt: "I build responsive, fast-loading web applications with Next.js App Router, using modular components, optimized images, and clean state management.",
        highlight: true,
        relatedProjectId: "budgetmandu",
        relatedProjectTitle: "BudgetMandu",
      },
      {
        name: "TypeScript & JavaScript",
        summary: "Type-safe application logic, interfaces, and asynchronous data flows.",
        howIUseIt: "I write clean TypeScript with strict typing for project data structures, API payloads, and UI component contracts to avoid runtime errors.",
        highlight: true,
        relatedProjectId: "budgetmandu",
        relatedProjectTitle: "BudgetMandu",
      },
      {
        name: "Tailwind CSS & Modern CSS",
        summary: "Responsive design systems, custom properties, and dark mode palettes.",
        howIUseIt: "I craft refined, accessible interfaces with Tailwind utility classes, custom design tokens, responsive breakpoints, and smooth micro-interactions.",
        relatedProjectId: "budgetmandu",
        relatedProjectTitle: "BudgetMandu",
      },
      {
        name: "Semantic HTML & Accessibility",
        summary: "Accessible document structure, ARIA landmarks, and keyboard navigation.",
        howIUseIt: "I prioritize clean semantic markup with proper heading hierarchies, focus rings, and screen-reader accessible attributes across all layouts.",
        relatedProjectId: "budgetmandu",
        relatedProjectTitle: "BudgetMandu",
      },
    ],
  },
  {
    id: "python-automation",
    title: "Python & Automation",
    subtitle: "Discord community bots, event-driven scripts, and workflow automation",
    skills: [
      {
        name: "Python 3",
        summary: "Asynchronous programming, data processing, and scripting.",
        howIUseIt: "I write clean, modular Python scripts to automate repetitive tasks, parse data formats, and power interactive bot services.",
        highlight: true,
        relatedProjectId: "sentinel-bot",
        relatedProjectTitle: "Sentinel Discord Engine",
      },
      {
        name: "discord.py",
        summary: "Modular cogs, slash commands, event listeners, and interactive UI embeds.",
        howIUseIt: "I build custom Discord bots with modular cogs, asynchronous command handling, member verification, and automated welcome flows.",
        highlight: true,
        relatedProjectId: "sentinel-bot",
        relatedProjectTitle: "Sentinel Discord Engine",
      },
      {
        name: "Webhooks & Script Automation",
        summary: "Connecting web services, instant notification alerts, and scheduled scripts.",
        howIUseIt: "I connect forms and external triggers to Discord channels via webhook dispatches, creating lightweight notification pipelines without heavy infrastructure.",
        relatedProjectId: "sentinel-bot",
        relatedProjectTitle: "Sentinel Discord Engine",
      },
      {
        name: "REST APIs & JSON Handling",
        summary: "Consuming third-party web services and structuring clean payloads.",
        howIUseIt: "I integrate external web APIs using requests and httpx, managing authentication tokens, request retries, and data parsing.",
        relatedProjectId: "sentinel-bot",
        relatedProjectTitle: "Sentinel Discord Engine",
      },
    ],
  },
  {
    id: "creative-tools",
    title: "Creative Tools",
    subtitle: "Design systems, multimodal AI assistants, and visual prototyping",
    skills: [
      {
        name: "Figma",
        summary: "UI wireframing, layout systems, typography scales, and moodboarding.",
        howIUseIt: "I use Figma to map site architecture, design responsive components, test typography pairings, and create visual prototypes before coding.",
        highlight: true,
        relatedProjectId: "flow-motion-ads",
        relatedProjectTitle: "Aura Design System",
      },
      {
        name: "Google Gemini",
        summary: "Multimodal ideation, code debugging, and concept outlining.",
        howIUseIt: "I use Google Gemini as a thinking partner for drafting shot lists, brainstorming visual concepts, and troubleshooting technical code logic.",
        highlight: true,
        relatedProjectId: "neural-vistas",
        relatedProjectTitle: "Neural Vistas Lab",
      },
      {
        name: "ChatGPT",
        summary: "Editorial review, script refinement, and technical documentation.",
        howIUseIt: "I use ChatGPT to refine voiceover drafts, review narrative treatments, and organize technical documentation clearly.",
        relatedProjectId: "neural-vistas",
        relatedProjectTitle: "Neural Vistas Lab",
      },
      {
        name: "Visual Direction & Typography",
        summary: "Establishing brand aesthetics, font pairings, and editorial hierarchy.",
        howIUseIt: "I curate color palettes, font weights, and layout negative space to give digital projects a distinct, mature aesthetic.",
        relatedProjectId: "flow-motion-ads",
        relatedProjectTitle: "Aura Design System",
      },
    ],
  },
];
