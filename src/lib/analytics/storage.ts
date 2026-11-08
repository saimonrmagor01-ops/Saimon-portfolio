import { 
  VisitorSession, 
  AnalyticsEvent, 
  ClientLead, 
  DashboardSettings, 
  VerifiedClientSummary, 
  FunnelStage,
  TrafficQualityMetrics,
  NotificationItem,
  TimeRange 
} from "./types";
import { 
  DEFAULT_SETTINGS, 
  SEED_LEADS, 
  SEED_COUNTRIES, 
  SEED_SOURCES, 
  SEED_PROJECTS, 
  SEED_NOTIFICATIONS, 
  generateSeedDailyStats 
} from "./mockSeed";

const SESSIONS_KEY = "saimon_portfolio_sessions_v1";
const EVENTS_KEY = "saimon_portfolio_events_v1";
const LEADS_KEY = "saimon_portfolio_leads_v1";
const SETTINGS_KEY = "saimon_portfolio_settings_v1";
const NOTIFICATIONS_KEY = "saimon_portfolio_notifications_v1";
const ADMIN_AUTH_KEY = "saimon_portfolio_admin_auth_v1";

const BROADCAST_CHANNEL_NAME = "saimon_portfolio_analytics_channel";

// Broadcast helper for real-time sync across browser tabs
export function broadcastAnalyticsEvent(type: string, payload?: any) {
  if (typeof window === "undefined") return;
  try {
    if ("BroadcastChannel" in window) {
      const channel = new BroadcastChannel(BROADCAST_CHANNEL_NAME);
      channel.postMessage({ type, payload, timestamp: Date.now() });
      channel.close();
    }
  } catch (e) {
    // Graceful fallback
  }
}

// ----------------------------------------------------
// SETTINGS
// ----------------------------------------------------
export function getSettings(): DashboardSettings {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(DEFAULT_SETTINGS));
      return DEFAULT_SETTINGS;
    }
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveSettings(settings: Partial<DashboardSettings>): DashboardSettings {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;
  const current = getSettings();
  const updated = { ...current, ...settings };
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(updated));
  broadcastAnalyticsEvent("settings_updated");
  return updated;
}

// ----------------------------------------------------
// AUTHENTICATION
// ----------------------------------------------------
export function isDashboardAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const raw = sessionStorage.getItem(ADMIN_AUTH_KEY);
    if (!raw) return false;
    const auth = JSON.parse(raw);
    // 8 hour session expiry
    if (Date.now() - auth.timestamp > 8 * 60 * 60 * 1000) {
      sessionStorage.removeItem(ADMIN_AUTH_KEY);
      return false;
    }
    return auth.authenticated === true;
  } catch {
    return false;
  }
}

export function setDashboardAuthenticated(authenticated: boolean): void {
  if (typeof window === "undefined") return;
  if (authenticated) {
    sessionStorage.setItem(
      ADMIN_AUTH_KEY,
      JSON.stringify({ authenticated: true, timestamp: Date.now() })
    );
  } else {
    sessionStorage.removeItem(ADMIN_AUTH_KEY);
  }
}

// Simple SHA-256 helper for client verification
export async function sha256(str: string): Promise<string> {
  if (typeof window === "undefined" || !crypto?.subtle) {
    return str; // Fallback
  }
  const utf8 = new TextEncoder().encode(str);
  const hashBuffer = await crypto.subtle.digest("SHA-256", utf8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

// ----------------------------------------------------
// SESSIONS & REAL-TIME
// ----------------------------------------------------
export function getStoredSessions(): VisitorSession[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(SESSIONS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveSession(session: VisitorSession): void {
  if (typeof window === "undefined") return;
  try {
    const sessions = getStoredSessions();
    const idx = sessions.findIndex((s) => s.sessionId === session.sessionId);
    if (idx >= 0) {
      sessions[idx] = session;
    } else {
      sessions.unshift(session);
    }
    // Cap stored sessions at 500 for storage efficiency
    if (sessions.length > 500) sessions.length = 500;
    localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));
    broadcastAnalyticsEvent("session_updated", { sessionId: session.sessionId });
  } catch (e) {
    console.error("Failed to save session", e);
  }
}

export function getActiveVisitorsCount(timeoutMinutes = 3): number {
  if (typeof window === "undefined") return 0;
  const sessions = getStoredSessions();
  const threshold = Date.now() - timeoutMinutes * 60 * 1000;
  return sessions.filter(
    (s) => s.lastActiveAt > threshold && s.quality !== "likely_bot"
  ).length;
}

// ----------------------------------------------------
// EVENTS
// ----------------------------------------------------
export function getStoredEvents(): AnalyticsEvent[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(EVENTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function recordEvent(event: Omit<AnalyticsEvent, "id">): AnalyticsEvent {
  const fullEvent: AnalyticsEvent = {
    ...event,
    id: `ev-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
  };

  if (typeof window === "undefined") return fullEvent;

  try {
    const events = getStoredEvents();
    events.unshift(fullEvent);
    if (events.length > 1000) events.length = 1000;
    localStorage.setItem(EVENTS_KEY, JSON.stringify(events));
    broadcastAnalyticsEvent("event_recorded", fullEvent);
  } catch (e) {
    console.error("Failed to record event", e);
  }

  return fullEvent;
}

// ----------------------------------------------------
// CRM & LEADS
// ----------------------------------------------------
export function getLeads(): ClientLead[] {
  if (typeof window === "undefined") return SEED_LEADS;
  try {
    const raw = localStorage.getItem(LEADS_KEY);
    if (!raw) {
      localStorage.setItem(LEADS_KEY, JSON.stringify(SEED_LEADS));
      return SEED_LEADS;
    }
    return JSON.parse(raw);
  } catch {
    return SEED_LEADS;
  }
}

export function saveLead(lead: ClientLead): void {
  if (typeof window === "undefined") return;
  const leads = getLeads();
  const idx = leads.findIndex((l) => l.id === lead.id);
  if (idx >= 0) {
    leads[idx] = { ...lead, updatedAt: Date.now() };
  } else {
    leads.unshift({ ...lead, updatedAt: Date.now() });
  }
  localStorage.setItem(LEADS_KEY, JSON.stringify(leads));
  broadcastAnalyticsEvent("lead_updated", lead);
}

export function createLead(newLead: Omit<ClientLead, "id" | "createdAt" | "updatedAt">): ClientLead {
  const lead: ClientLead = {
    ...newLead,
    id: `lead-${Date.now()}`,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
  saveLead(lead);

  // Add notification
  addNotification({
    type: "lead",
    title: `New Lead: ${lead.clientName}`,
    message: `${lead.service} via ${lead.contactMethod} (Est. $${lead.estimatedBudget})`,
  });

  return lead;
}

export function deleteLead(leadId: string): void {
  if (typeof window === "undefined") return;
  const leads = getLeads().filter((l) => l.id !== leadId);
  localStorage.setItem(LEADS_KEY, JSON.stringify(leads));
  broadcastAnalyticsEvent("lead_deleted", { leadId });
}

// ----------------------------------------------------
// NOTIFICATIONS
// ----------------------------------------------------
export function getNotifications(): NotificationItem[] {
  if (typeof window === "undefined") return SEED_NOTIFICATIONS;
  try {
    const raw = localStorage.getItem(NOTIFICATIONS_KEY);
    if (!raw) {
      localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(SEED_NOTIFICATIONS));
      return SEED_NOTIFICATIONS;
    }
    return JSON.parse(raw);
  } catch {
    return SEED_NOTIFICATIONS;
  }
}

export function addNotification(notif: Omit<NotificationItem, "id" | "timestamp" | "read">): void {
  if (typeof window === "undefined") return;
  const items = getNotifications();
  const newItem: NotificationItem = {
    ...notif,
    id: `notif-${Date.now()}`,
    timestamp: Date.now(),
    read: false,
  };
  items.unshift(newItem);
  if (items.length > 50) items.length = 50;
  localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(items));
  broadcastAnalyticsEvent("notification_added", newItem);
}

export function markNotificationRead(id: string): void {
  if (typeof window === "undefined") return;
  const items = getNotifications().map((n) => (n.id === id ? { ...n, read: true } : n));
  localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(items));
  broadcastAnalyticsEvent("notifications_updated");
}

export function markAllNotificationsRead(): void {
  if (typeof window === "undefined") return;
  const items = getNotifications().map((n) => ({ ...n, read: true }));
  localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(items));
  broadcastAnalyticsEvent("notifications_updated");
}

// ----------------------------------------------------
// AGGREGATED METRICS & KPI ENGINE
// ----------------------------------------------------
export function getAggregatedKpiMetrics() {
  const leads = getLeads();
  const dailyStats = generateSeedDailyStats();
  
  // Totals from 30d seed + live stored
  const totalVisits = dailyStats.reduce((acc, curr) => acc + curr.totalVisits, 0) + getStoredSessions().length;
  const uniqueVisitors = Math.round(totalVisits * 0.74);
  const activeVisitors = getActiveVisitorsCount();
  
  const totalInquiries = leads.length + 3; // including raw form touchpoints
  const confirmedClientsList = leads.filter((l) => l.isConfirmedClient);
  const confirmedClientsCount = confirmedClientsList.length;
  
  const totalRevenue = confirmedClientsList.reduce((acc, curr) => acc + (curr.finalProjectValue || 0), 0);
  const pendingPayments = confirmedClientsList
    .filter((l) => l.paymentStatus === "Partial" || l.paymentStatus === "Unpaid")
    .reduce((acc, curr) => acc + (curr.estimatedBudget - (curr.finalProjectValue || 0)), 0);

  return {
    totalVisits,
    uniqueVisitors,
    activeVisitors,
    totalInquiries,
    confirmedClientsCount,
    totalRevenue,
    pendingPayments,
    avgProjectValue: confirmedClientsCount > 0 ? Math.round(totalRevenue / confirmedClientsCount) : 0,
    conversionRate: Number(((confirmedClientsCount / totalVisits) * 100).toFixed(2)),
  };
}

export function getFunnelMetrics(): FunnelStage[] {
  const kpi = getAggregatedKpiMetrics();
  const leads = getLeads();

  const totalVisits = kpi.totalVisits;
  const projectViews = Math.round(totalVisits * 0.58);
  const contactInteractions = Math.round(totalVisits * 0.16);
  const inquiries = leads.length + 3;
  const qualifiedLeads = leads.filter((l) => ["Negotiating", "Proposal Sent", "Accepted", "Completed"].includes(l.status)).length;
  const confirmedClients = leads.filter((l) => l.isConfirmedClient).length;
  const completedProjects = leads.filter((l) => l.status === "Completed").length;

  const stages: { id: string; name: string; count: number }[] = [
    { id: "visits", name: "Portfolio Visits", count: totalVisits },
    { id: "projects", name: "Project Exploration", count: projectViews },
    { id: "interactions", name: "Contact Interactions", count: contactInteractions },
    { id: "inquiries", name: "Inquiries Submitted", count: inquiries },
    { id: "qualified", name: "Qualified Leads", count: qualifiedLeads },
    { id: "confirmed", name: "Confirmed Clients", count: confirmedClients },
    { id: "completed", name: "Completed Projects", count: completedProjects },
  ];

  return stages.map((stage, idx) => {
    const prevCount = idx === 0 ? stage.count : stages[idx - 1].count;
    const conversionRate = totalVisits > 0 ? Number(((stage.count / totalVisits) * 100).toFixed(1)) : 0;
    const stepConversionRate = prevCount > 0 ? Number(((stage.count / prevCount) * 100).toFixed(1)) : 0;
    const dropOffRate = Number((100 - stepConversionRate).toFixed(1));

    return {
      id: stage.id,
      name: stage.name,
      count: stage.count,
      conversionRate,
      stepConversionRate,
      dropOffRate: idx === 0 ? 0 : dropOffRate,
      comparisonDelta: Number(((Math.random() * 4) + 1.2).toFixed(1)),
    };
  });
}

// ----------------------------------------------------
// EXPORT TO CSV
// ----------------------------------------------------
export function exportToCsv(filename: string, rows: Record<string, any>[]): void {
  if (rows.length === 0) return;
  const headers = Object.keys(rows[0]);
  const csvContent = [
    headers.join(","),
    ...rows.map((row) =>
      headers
        .map((header) => {
          const val = row[header] ?? "";
          const str = String(val).replace(/"/g, '""');
          return `"${str}"`;
        })
        .join(",")
    ),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `${filename}_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
