export interface SkillCategory {
  id: string;
  title: string;
  subtitle: string;
  skills: {
    name: string;
    description: string;
    highlight?: boolean;
  }[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "creative",
    title: "Creative & Direction",
    subtitle: "Visual concept generation and cinematic direction",
    skills: [
      { name: "AI Filmmaking", description: "Narrative synthesis, cinematic world-building, and generative scene staging.", highlight: true },
      { name: "Video Production", description: "End-to-end video planning, framing, pacing, and visual storytelling." },
      { name: "Video Editing", description: "Pacing, audio sync, narrative cutdowns, and rhythm-driven montage." },
      { name: "Visual Storytelling", description: "Emotional resonance, lighting composition, and thematic coherence." },
    ],
  },
  {
    id: "editing",
    title: "Post-Production & Editing",
    subtitle: "Precision timeline editing and format mastering",
    skills: [
      { name: "Adobe Premiere Pro", description: "Long-form assembly, multi-track audio mastering, and color grading.", highlight: true },
      { name: "CapCut", description: "High-impact short-form edits, viral format pacing, transitions, and dynamic typography." },
    ],
  },
  {
    id: "ai",
    title: "Generative AI Systems",
    subtitle: "Prompt engineering and emerging creative tools",
    skills: [
      { name: "Google Flow", description: "Generative visual pipeline creation and multimodal workflow orchestration.", highlight: true },
      { name: "AI-Assisted Creative Workflows", description: "Integrating neural models for concept ideation, moodboarding, and storyboard generation." },
    ],
  },
  {
    id: "development",
    title: "Web & Software Engineering",
    subtitle: "Modern frontend and scripting technologies",
    skills: [
      { name: "Next.js", description: "App Router, server/client component architectures, and performant web apps.", highlight: true },
      { name: "JavaScript", description: "Modern ES6+ syntax, asynchronous programming, and DOM manipulation." },
      { name: "HTML & CSS", description: "Semantic markup, modern layout models (Flexbox/Grid), and responsive design." },
      { name: "Python", description: "Scripting, bot automation, data parsing, and backend logic." },
    ],
  },
  {
    id: "other",
    title: "Bots & Digital Operations",
    subtitle: "Community architecture and digital strategy",
    skills: [
      { name: "Discord Bot Development", description: "Custom slash commands, event handlers, and server engagement systems.", highlight: true },
      { name: "Automation", description: "Workflow streamlining, webhook pipelines, and repeatable digital tasks." },
      { name: "Digital Communication", description: "Cross-platform audience engagement, clarity in technical/creative messaging." },
      { name: "Content Strategy", description: "Platform-native content planning, visual hooks, and distribution curation." },
    ],
  },
];
