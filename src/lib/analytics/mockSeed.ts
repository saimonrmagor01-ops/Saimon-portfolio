import { ClientLead, VisitorSession, AnalyticsEvent, DashboardSettings, NotificationItem } from "./types";

// SHA-256 for PIN '2025' or '1234'
// default admin PIN is: 1234 (hash below is for "1234")
export const DEFAULT_ADMIN_PIN_HASH = "03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4";

export const DEFAULT_SETTINGS: DashboardSettings = {
  adminPinHash: DEFAULT_ADMIN_PIN_HASH,
  discordWebhookUrl: "",
  enableDiscordNotifications: false,
  enableEmailAlerts: false,
  privacyMode: "strict",
  retentionDays: 90,
  filterKnownBots: true,
  activeSessionTimeoutMinutes: 3,
};

const NOW = Date.now();
const ONE_HOUR = 60 * 60 * 1000;
const ONE_DAY = 24 * ONE_HOUR;

// Seed realistic CRM leads for Saimon
export const SEED_LEADS: ClientLead[] = [
  {
    id: "lead-01",
    clientName: "Aarav Sharma",
    email: "aarav@kathmandumedia.np",
    contactMethod: "WhatsApp",
    handleOrPhone: "+977 9801234567",
    service: "AI Filmmaking & Direction",
    projectDescription: "Speculative sci-fi commercial brand film for launch campaign. Needed prompt choreography and cinematic color grade.",
    estimatedBudget: 1200,
    currency: "USD",
    source: "Direct / Portfolio",
    status: "Completed",
    notes: "Delivered 4K cinematic cut with Google Flow and Premiere Pro. Client was extremely satisfied with the transient audio alignment.",
    followUpDate: "2025-04-10",
    proposalStatus: "Approved",
    isConfirmedClient: true,
    projectStartedAt: "2025-02-10",
    projectCompletedAt: "2025-02-28",
    paymentStatus: "Paid in Full",
    finalProjectValue: 1200,
    createdAt: NOW - 28 * ONE_DAY,
    updatedAt: NOW - 20 * ONE_DAY,
    timeline: [
      { timestamp: NOW - 28 * ONE_DAY, title: "Inquiry Received", description: "WhatsApp inquiry initiated via portfolio service button" },
      { timestamp: NOW - 27 * ONE_DAY, title: "Proposal Sent", description: "Scope of work and video preview deliverables defined" },
      { timestamp: NOW - 26 * ONE_DAY, title: "Hired & Confirmed", description: "Contract signed, 50% deposit cleared" },
      { timestamp: NOW - 20 * ONE_DAY, title: "Project Delivered", description: "Final export delivered, remaining payment received" },
    ],
  },
  {
    id: "lead-02",
    clientName: "Elena Rostova",
    email: "elena@nordicstream.io",
    contactMethod: "Discord",
    handleOrPhone: "elena_nordic#4421",
    service: "Web Engineering & Automation",
    projectDescription: "Custom asynchronous Discord bot with payment verification and role automation for a high-traffic creator community.",
    estimatedBudget: 850,
    currency: "USD",
    source: "Discord / Direct",
    status: "Completed",
    notes: "Engineered in Python with discord.py, asyncio, and SQLite local cache. 99.98% uptime achieved.",
    followUpDate: "2025-05-01",
    proposalStatus: "Approved",
    isConfirmedClient: true,
    projectStartedAt: "2025-03-01",
    projectCompletedAt: "2025-03-18",
    paymentStatus: "Paid in Full",
    finalProjectValue: 850,
    createdAt: NOW - 24 * ONE_DAY,
    updatedAt: NOW - 15 * ONE_DAY,
    timeline: [
      { timestamp: NOW - 24 * ONE_DAY, title: "Inquiry Received", description: "Discord connection request from portfolio link" },
      { timestamp: NOW - 23 * ONE_DAY, title: "Technical Scoping", description: "Bot architecture & rate limits finalized" },
      { timestamp: NOW - 22 * ONE_DAY, title: "Confirmed Client", description: "Milestone 1 funded" },
      { timestamp: NOW - 15 * ONE_DAY, title: "Deployment Complete", description: "Dockerized bot deployed to VPS" },
    ],
  },
  {
    id: "lead-03",
    clientName: "David Chen",
    email: "david@lumina-studios.co",
    contactMethod: "WhatsApp",
    handleOrPhone: "+65 9123 4567",
    service: "Video Editing & Post-Production",
    projectDescription: "High-paced YouTube tech review series. 4 episodes with kinetic typography and audio transient sync.",
    estimatedBudget: 950,
    currency: "USD",
    source: "Instagram / Video Reel",
    status: "Accepted",
    notes: "Active project in progress. Episode 1 & 2 drafts sent for revision.",
    followUpDate: "2025-04-05",
    proposalStatus: "Approved",
    isConfirmedClient: true,
    projectStartedAt: "2025-03-20",
    paymentStatus: "Partial",
    finalProjectValue: 950,
    createdAt: NOW - 12 * ONE_DAY,
    updatedAt: NOW - 2 * ONE_DAY,
    timeline: [
      { timestamp: NOW - 12 * ONE_DAY, title: "Inquiry Received", description: "Client inquired through Instagram CTA button" },
      { timestamp: NOW - 10 * ONE_DAY, title: "Proposal Sent", description: "Rate card and turnaround time established" },
      { timestamp: NOW - 8 * ONE_DAY, title: "Confirmed Client", description: "Deposit received, raw footage delivered via Google Drive" },
    ],
  },
  {
    id: "lead-04",
    clientName: "Pooja Thapa",
    email: "pooja@himalayancrafts.com",
    contactMethod: "WhatsApp",
    handleOrPhone: "+977 9841987654",
    service: "Web Engineering & Automation",
    projectDescription: "Next.js e-commerce storefront for artisan export goods with WhatsApp order flow like BudgetMandu.",
    estimatedBudget: 1500,
    currency: "USD",
    source: "Project: BudgetMandu",
    status: "Negotiating",
    notes: "Client loved the BudgetMandu UX and wants similar frictionless catalog browsing for international buyers.",
    followUpDate: "2025-04-03",
    proposalStatus: "Sent",
    isConfirmedClient: false,
    paymentStatus: "Unpaid",
    finalProjectValue: 0,
    createdAt: NOW - 5 * ONE_DAY,
    updatedAt: NOW - 1 * ONE_DAY,
    timeline: [
      { timestamp: NOW - 5 * ONE_DAY, title: "Inquiry Received", description: "Inquiry generated after viewing BudgetMandu project case study" },
      { timestamp: NOW - 3 * ONE_DAY, title: "Discovery Call", description: "Clarified scope, wireframes shared" },
      { timestamp: NOW - 1 * ONE_DAY, title: "Proposal Sent", description: "Estimated $1,500 for full build" },
    ],
  },
  {
    id: "lead-05",
    clientName: "Marcus Vance",
    email: "marcus@apexcreator.gg",
    contactMethod: "Discord",
    handleOrPhone: "vance_apex#0001",
    service: "AI Filmmaking & Direction",
    projectDescription: "Esports tournament intro sequence with futuristic cyberpunk aesthetic.",
    estimatedBudget: 750,
    currency: "USD",
    source: "Social / Discord",
    status: "New Inquiry",
    notes: "Looking for 30s teaser clip for streaming event next month.",
    followUpDate: "2025-04-02",
    proposalStatus: "Draft",
    isConfirmedClient: false,
    paymentStatus: "Unpaid",
    finalProjectValue: 0,
    createdAt: NOW - 1 * ONE_DAY,
    updatedAt: NOW - 4 * ONE_HOUR,
    timeline: [
      { timestamp: NOW - 1 * ONE_DAY, title: "Inquiry Received", description: "Discord message initiated from contact section" },
    ],
  },
];

// Seed realistic geographic distribution
export const SEED_COUNTRIES: { name: string; code: string; visitors: number; percentage: number; flag: string }[] = [
  { name: "Nepal", code: "NP", visitors: 482, percentage: 38.6, flag: "🇳🇵" },
  { name: "United States", code: "US", visitors: 294, percentage: 23.5, flag: "🇺🇸" },
  { name: "India", code: "IN", visitors: 168, percentage: 13.4, flag: "🇮🇳" },
  { name: "United Kingdom", code: "GB", visitors: 98, percentage: 7.8, flag: "🇬🇧" },
  { name: "Germany", code: "DE", visitors: 62, percentage: 5.0, flag: "🇩🇪" },
  { name: "Singapore", code: "SG", visitors: 54, percentage: 4.3, flag: "🇸🇬" },
  { name: "Canada", code: "CA", visitors: 48, percentage: 3.8, flag: "🇨🇦" },
  { name: "Others", code: "XX", visitors: 44, percentage: 3.6, flag: "🌐" },
];

// Seed realistic traffic sources
export const SEED_SOURCES = [
  { name: "Direct / Portfolio Link", count: 512, percentage: 41.0, icon: "Compass" },
  { name: "Google & Search", count: 320, percentage: 25.6, icon: "Search" },
  { name: "Instagram", count: 215, percentage: 17.2, icon: "Instagram" },
  { name: "Discord Communities", count: 125, percentage: 10.0, icon: "MessageSquare" },
  { name: "GitHub Referrals", count: 78, percentage: 6.2, icon: "Github" },
];

// Seed project performance
export const SEED_PROJECTS = [
  {
    projectId: "budgetmandu",
    title: "BudgetMandu",
    category: "Web Development",
    views: 742,
    uniqueVisitors: 588,
    avgEngagementSeconds: 142,
    externalClicks: 164,
    githubClicks: 82,
    contactConversions: 9,
    conversionRate: 1.5,
  },
  {
    projectId: "kinetic-reel",
    title: "Kinetic Reel 2025",
    category: "Video Editing",
    views: 520,
    uniqueVisitors: 412,
    avgEngagementSeconds: 98,
    externalClicks: 94,
    githubClicks: 12,
    contactConversions: 6,
    conversionRate: 1.4,
  },
  {
    projectId: "echoes-of-tomorrow",
    title: "Echoes of Tomorrow",
    category: "AI Filmmaking",
    views: 480,
    uniqueVisitors: 366,
    avgEngagementSeconds: 115,
    externalClicks: 110,
    githubClicks: 8,
    contactConversions: 5,
    conversionRate: 1.3,
  },
  {
    projectId: "discord-bot",
    title: "Vortex Bot Engine",
    category: "Discord Bots",
    views: 310,
    uniqueVisitors: 245,
    avgEngagementSeconds: 85,
    externalClicks: 72,
    githubClicks: 56,
    contactConversions: 4,
    conversionRate: 1.6,
  },
];

// Seed Notifications
export const SEED_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "notif-1",
    type: "inquiry",
    title: "New WhatsApp Inquiry",
    message: "Marcus Vance initiated an inquiry for AI Filmmaking & Direction.",
    timestamp: NOW - 2 * ONE_HOUR,
    read: false,
  },
  {
    id: "notif-2",
    type: "payment",
    title: "Milestone Payment Recorded",
    message: "David Chen submitted $475 milestone payment for Video Editing.",
    timestamp: NOW - 1 * ONE_DAY,
    read: false,
  },
  {
    id: "notif-3",
    type: "traffic_spike",
    title: "Traffic Spike Detected",
    message: "Elevated visitors from Kathmandu region (+42% over 24h baseline).",
    timestamp: NOW - 3 * ONE_DAY,
    read: true,
  },
  {
    id: "notif-4",
    type: "client_confirmed",
    title: "Client Confirmed",
    message: "David Chen marked as Confirmed Client with contract value $950.",
    timestamp: NOW - 8 * ONE_DAY,
    read: true,
  },
];

// Generate 30 daily data points for visitor trend chart
export function generateSeedDailyStats() {
  const points = [];
  let baseVisitors = 38;

  for (let i = 29; i >= 0; i--) {
    const dayTimestamp = NOW - i * ONE_DAY;
    const dateObj = new Date(dayTimestamp);
    const dayOfWeek = dateObj.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

    // Slight variance with realistic growth
    const variance = Math.sin(i * 0.4) * 8 + (isWeekend ? 10 : 2);
    const totalVisits = Math.round(baseVisitors + variance + (29 - i) * 0.8);
    const uniqueVisits = Math.round(totalVisits * 0.76);
    const pageViews = Math.round(totalVisits * 2.8);
    const inquiries = totalVisits > 48 ? 1 : (i % 6 === 0 ? 1 : 0);

    points.push({
      date: dateObj.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      timestamp: dayTimestamp,
      totalVisits,
      uniqueVisits,
      pageViews,
      inquiries,
    });
  }

  return points;
}
