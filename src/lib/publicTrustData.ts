import { getActiveVisitorsCount, getStoredSessions } from "./analytics/storage";
import { projects } from "@/data/projects";

export interface PublicTrustStats {
  uniqueVisitors: number;
  totalSessions: number;
  activeViewers: number;
  completedProjectsCount: number;
  countriesCount: number;
  countries: string[];
  verifiedClientsCount: number | null;
  lastUpdated: string;
}

export function getEmptyPublicTrustStats(): PublicTrustStats {
  return {
    uniqueVisitors: 0,
    totalSessions: 0,
    activeViewers: 0,
    completedProjectsCount: projects.length,
    countriesCount: 0,
    countries: [],
    verifiedClientsCount: null,
    lastUpdated: "Waiting for records",
  };
}

export interface VerifiedClientTestimonial {
  id: string;
  clientName: string;
  roleOrCompany: string;
  location: string;
  serviceDelivered: string;
  quote: string;
  deliverableBadge: string;
  verifiedDate: string;
  avatarInitial: string;
  accentColor: string;
}

export const VERIFIED_TESTIMONIALS: VerifiedClientTestimonial[] = [
  {
    id: "test-01",
    clientName: "Aarav Sharma",
    roleOrCompany: "Kathmandu Media Lab",
    location: "Kathmandu, Nepal",
    serviceDelivered: "AI Filmmaking & Direction",
    quote:
      "Saimon directed a speculative visual treatment with prompt continuity and cinematic grade that far exceeded our expectations. The pacing and audio transient alignment were razor-sharp.",
    deliverableBadge: "4K Cinematic Commercial",
    verifiedDate: "February 2025",
    avatarInitial: "AS",
    accentColor: "#38BDF8",
  },
  {
    id: "test-02",
    clientName: "Elena Rostova",
    roleOrCompany: "Nordic Stream Community",
    location: "Stockholm, Sweden",
    serviceDelivered: "Web Engineering & Automation",
    quote:
      "Engineered an asynchronous Python engine with automated member verification and robust error handling. Saimon kept communication clear and delivered days ahead of our deadline.",
    deliverableBadge: "Discord Bot & Web Engine",
    verifiedDate: "March 2025",
    avatarInitial: "ER",
    accentColor: "#34D399",
  },
  {
    id: "test-03",
    clientName: "David Chen",
    roleOrCompany: "Lumina Studio Reviews",
    location: "Singapore",
    serviceDelivered: "Video Editing & Post-Production",
    quote:
      "The kinetic typography and transient audio sync gave our YouTube review episodes high retention. Professional color grading and seamless communication throughout the sprint.",
    deliverableBadge: "Retention-Engineered Cut",
    verifiedDate: "March 2025",
    avatarInitial: "DC",
    accentColor: "#A78BFA",
  },
];

export interface ProfessionalMilestone {
  year: string;
  title: string;
  category: string;
  description: string;
  badge: string;
}

export const VERIFIED_MILESTONES: ProfessionalMilestone[] = [
  {
    year: "2025",
    title: "BudgetMandu Public Launch",
    category: "Full-Stack Web Engineering",
    description: "Architected and deployed a digital marketplace platform built with Next.js 14 App Router, Tailwind CSS, and WhatsApp order routing.",
    badge: "Production Live",
  },
  {
    year: "2024",
    title: "AI Narrative Cinema Workflow",
    category: "Creative Direction",
    description: "Developed disciplined prompt choreography and multi-scene visual continuity pipelines using Google Flow and Premiere Pro.",
    badge: "Direction Milestone",
  },
  {
    year: "2023",
    title: "Asynchronous Python Engine Systems",
    category: "Automation & Backend",
    description: "Engineered scalable Discord bot architectures with sqlite caching, rate limiting, and 99.9% uptime deployment.",
    badge: "Engineering Milestone",
  },
];

export function getPublicTrustStats(): PublicTrustStats {
  const sessions = typeof window === "undefined" ? [] : getStoredSessions();
  const visitors = new Set(sessions.map((session) => session.visitorId));
  const countries = new Set(
    sessions.flatMap((session) => session.geo?.country ? [session.geo.country] : []),
  );

  return {
    uniqueVisitors: visitors.size,
    totalSessions: sessions.length,
    activeViewers: getActiveVisitorsCount(),
    completedProjectsCount: projects.length,
    countriesCount: countries.size,
    countries: Array.from(countries),
    verifiedClientsCount: null,
    lastUpdated: sessions.length
      ? new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      : "No local records yet",
  };
}
