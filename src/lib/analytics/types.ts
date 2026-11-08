export type TimeRange = "24h" | "7d" | "30d" | "90d" | "12m" | "custom";

export type DeviceType = "desktop" | "mobile" | "tablet" | "unknown";

export type TrafficSourceType = "direct" | "google" | "social" | "discord" | "referral" | "campaign";

export type TrafficQuality = "verified_human" | "likely_bot" | "suspicious" | "unknown";

export interface GeoLocation {
  country: string;
  countryCode: string;
  region?: string;
  city?: string;
  flagEmoji?: string;
}

export interface VisitorSession {
  sessionId: string;
  visitorId: string; // anonymized SHA-256 hash
  startedAt: number;
  lastActiveAt: number;
  isActive: boolean;
  landingPage: string;
  currentPage: string;
  referrer: string;
  source: TrafficSourceType;
  utmCampaign?: string;
  utmSource?: string;
  device: DeviceType;
  browser: string;
  os: string;
  geo: GeoLocation;
  pageViews: number;
  durationSeconds: number;
  quality: TrafficQuality;
  isReturning: boolean;
}

export type EventCategory = 
  | "page_view"
  | "section_view"
  | "project_view"
  | "project_click"
  | "contact_interaction"
  | "inquiry_submit"
  | "resume_download"
  | "custom";

export interface AnalyticsEvent {
  id: string;
  sessionId: string;
  visitorId: string;
  timestamp: number;
  category: EventCategory;
  action: string;
  label?: string;
  metadata?: Record<string, any>;
  quality: TrafficQuality;
}

export interface ProjectAnalytics {
  projectId: string;
  title: string;
  category: string;
  views: number;
  uniqueVisitors: number;
  avgEngagementSeconds: number;
  externalClicks: number;
  githubClicks: number;
  contactConversions: number;
  conversionRate: number;
}

export type LeadStatus =
  | "New Inquiry"
  | "Contacted"
  | "Negotiating"
  | "Proposal Sent"
  | "Awaiting Response"
  | "Accepted"
  | "Rejected"
  | "Completed";

export type ContactMethod = "WhatsApp" | "Instagram" | "Discord" | "Direct Form" | "Email";

export interface ClientLead {
  id: string;
  clientName: string;
  email?: string;
  contactMethod: ContactMethod;
  handleOrPhone?: string;
  service: string;
  projectDescription: string;
  estimatedBudget: number; // in USD
  currency: string;
  source: string;
  status: LeadStatus;
  notes: string;
  followUpDate?: string;
  proposalStatus?: "Draft" | "Sent" | "Approved" | "Declined";
  isConfirmedClient: boolean;
  projectStartedAt?: string;
  projectCompletedAt?: string;
  paymentStatus: "Unpaid" | "Partial" | "Paid in Full";
  finalProjectValue: number;
  createdAt: number;
  updatedAt: number;
  timeline: {
    timestamp: number;
    title: string;
    description: string;
  }[];
}

export interface VerifiedClientSummary {
  totalInquiries: number;
  qualifiedLeads: number;
  confirmedClients: number;
  activeProjects: number;
  completedProjects: number;
  rejectedInquiries: number;
  totalRevenue: number;
  outstandingPayments: number;
  avgProjectValue: number;
  conversionRate: number;
}

export interface FunnelStage {
  id: string;
  name: string;
  count: number;
  conversionRate: number; // % of total initial visits
  stepConversionRate: number; // % from previous step
  dropOffRate: number; // % drop-off from previous step
  comparisonDelta?: number; // % change compared to prior period
}

export interface TrafficQualityMetrics {
  totalRequests: number;
  verifiedHuman: number;
  likelyBot: number;
  suspicious: number;
  botPercentage: number;
  detectedCrawlers: { name: string; count: number }[];
}

export interface NotificationItem {
  id: string;
  type: "inquiry" | "lead" | "payment" | "traffic_spike" | "client_confirmed";
  title: string;
  message: string;
  timestamp: number;
  read: boolean;
  link?: string;
}

export interface DashboardSettings {
  adminPinHash: string; // SHA-256 hash of access PIN
  discordWebhookUrl?: string;
  enableDiscordNotifications: boolean;
  enableEmailAlerts: boolean;
  privacyMode: "strict" | "standard";
  retentionDays: number;
  filterKnownBots: boolean;
  activeSessionTimeoutMinutes: number;
}
