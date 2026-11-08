import { VisitorSession, DeviceType, TrafficSourceType, TrafficQuality } from "./types";
import { saveSession, getStoredSessions, recordEvent, sha256 } from "./storage";

const VISITOR_ID_KEY = "saimon_portfolio_vid_v1";
const SESSION_ID_KEY = "saimon_portfolio_sid_v1";

// Simple non-invasive device detector
export function detectDevice(): DeviceType {
  if (typeof window === "undefined") return "unknown";
  const ua = navigator.userAgent;
  if (/iPad|tablet|(android(?!.*mobile))/i.test(ua)) return "tablet";
  if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated/i.test(ua)) return "mobile";
  return "desktop";
}

// Simple browser detector
export function detectBrowser(): string {
  if (typeof window === "undefined") return "Unknown";
  const ua = navigator.userAgent;
  if (ua.includes("Firefox/")) return "Firefox";
  if (ua.includes("Edg/")) return "Edge";
  if (ua.includes("Chrome/")) return "Chrome";
  if (ua.includes("Safari/")) return "Safari";
  if (ua.includes("Opera/") || ua.includes("OPR/")) return "Opera";
  return "Browser";
}

// OS detector
export function detectOS(): string {
  if (typeof window === "undefined") return "Unknown";
  const ua = navigator.userAgent;
  if (ua.includes("Mac OS")) return "macOS";
  if (ua.includes("Windows")) return "Windows";
  if (ua.includes("Android")) return "Android";
  if (ua.includes("iPhone") || ua.includes("iPad")) return "iOS";
  if (ua.includes("Linux")) return "Linux";
  return "OS";
}

// Referrer parser
export function parseTrafficSource(): { source: TrafficSourceType; referrer: string; utmCampaign?: string; utmSource?: string } {
  if (typeof window === "undefined") {
    return { source: "direct", referrer: "" };
  }

  const searchParams = new URLSearchParams(window.location.search);
  const utmSource = searchParams.get("utm_source") || undefined;
  const utmCampaign = searchParams.get("utm_campaign") || undefined;

  const referrer = document.referrer;

  if (utmSource || utmCampaign) {
    return { source: "campaign", referrer, utmCampaign, utmSource };
  }

  if (!referrer) {
    return { source: "direct", referrer: "" };
  }

  try {
    const url = new URL(referrer);
    const host = url.hostname.toLowerCase();

    if (host.includes("google") || host.includes("bing") || host.includes("duckduckgo")) {
      return { source: "google", referrer };
    }
    if (host.includes("instagram") || host.includes("twitter") || host.includes("x.com") || host.includes("linkedin")) {
      return { source: "social", referrer };
    }
    if (host.includes("discord")) {
      return { source: "discord", referrer };
    }
    return { source: "referral", referrer };
  } catch {
    return { source: "referral", referrer };
  }
}

// Bot detector
export function detectTrafficQuality(): TrafficQuality {
  if (typeof window === "undefined") return "unknown";
  const ua = navigator.userAgent.toLowerCase();

  // Common bot signatures
  const botSignatures = [
    "bot", "crawler", "spider", "headless", "phantomjs", "puppeteer", 
    "lighthouse", "googlebot", "bingbot", "yandex", "baiduspider", "pingdom"
  ];

  if (botSignatures.some((sig) => ua.includes(sig))) {
    return "likely_bot";
  }

  if ((navigator as any).webdriver) {
    return "likely_bot";
  }

  return "verified_human";
}

// Get or create anonymous visitor ID
export async function getOrCreateVisitorId(): Promise<{ visitorId: string; isReturning: boolean }> {
  if (typeof window === "undefined") return { visitorId: "anon", isReturning: false };
  let vid = localStorage.getItem(VISITOR_ID_KEY);
  if (vid) {
    return { visitorId: vid, isReturning: true };
  }

  // Generate anonymous seed from random numbers + current timestamp
  const rawSeed = `${Math.random()}-${Date.now()}-${navigator.userAgent}`;
  vid = await sha256(rawSeed);
  const shortened = vid.substring(0, 16);
  localStorage.setItem(VISITOR_ID_KEY, shortened);
  return { visitorId: shortened, isReturning: false };
}

// Approximate Geo lookup (privacy-friendly, non-blocking)
async function fetchApproximateGeo(): Promise<{ country: string; countryCode: string; city: string; flagEmoji: string }> {
  // Fast default based on user timezone
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
  let country = "Nepal";
  let countryCode = "NP";
  let city = "Kathmandu";
  let flagEmoji = "🇳🇵";

  if (tz.includes("America") || tz.includes("US")) {
    country = "United States";
    countryCode = "US";
    city = "San Francisco";
    flagEmoji = "🇺🇸";
  } else if (tz.includes("Europe/London")) {
    country = "United Kingdom";
    countryCode = "GB";
    city = "London";
    flagEmoji = "🇬🇧";
  } else if (tz.includes("Europe/Berlin")) {
    country = "Germany";
    countryCode = "DE";
    city = "Berlin";
    flagEmoji = "🇩🇪";
  } else if (tz.includes("Asia/Kolkata")) {
    country = "India";
    countryCode = "IN";
    city = "Delhi";
    flagEmoji = "🇮🇳";
  } else if (tz.includes("Asia/Singapore")) {
    country = "Singapore";
    countryCode = "SG";
    city = "Singapore";
    flagEmoji = "🇸🇬";
  }

  return { country, countryCode, city, flagEmoji };
}

class PortfolioTrackerEngine {
  private currentSession: VisitorSession | null = null;
  private heartbeatInterval: any = null;
  private isInitialized = false;

  public async init() {
    if (typeof window === "undefined" || this.isInitialized) return;
    this.isInitialized = true;

    try {
      const { visitorId, isReturning } = await getOrCreateVisitorId();
      const traffic = parseTrafficSource();
      const device = detectDevice();
      const browser = detectBrowser();
      const os = detectOS();
      const quality = detectTrafficQuality();
      const geo = await fetchApproximateGeo();

      const sessionId = `sess-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;
      sessionStorage.setItem(SESSION_ID_KEY, sessionId);

      const session: VisitorSession = {
        sessionId,
        visitorId,
        startedAt: Date.now(),
        lastActiveAt: Date.now(),
        isActive: true,
        landingPage: window.location.pathname + window.location.hash,
        currentPage: window.location.pathname + window.location.hash || "/#home",
        referrer: traffic.referrer,
        source: traffic.source,
        utmCampaign: traffic.utmCampaign,
        utmSource: traffic.utmSource,
        device,
        browser,
        os,
        geo,
        pageViews: 1,
        durationSeconds: 0,
        quality,
        isReturning,
      };

      this.currentSession = session;
      saveSession(session);

      // Record first page view
      recordEvent({
        sessionId: session.sessionId,
        visitorId: session.visitorId,
        timestamp: Date.now(),
        category: "page_view",
        action: "view",
        label: session.currentPage,
        quality,
      });

      // Start periodic heartbeat (every 25 seconds)
      this.startHeartbeat();

      // Listen for window beforeunload to mark session
      window.addEventListener("beforeunload", () => {
        this.updateActivity(false);
      });

      // Listen for visibility change
      document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "visible") {
          this.updateActivity(true);
        }
      });
    } catch (e) {
      console.warn("Tracker initialization completed with graceful fallback", e);
    }
  }

  private startHeartbeat() {
    if (this.heartbeatInterval) clearInterval(this.heartbeatInterval);
    this.heartbeatInterval = setInterval(() => {
      if (document.visibilityState === "visible") {
        this.updateActivity(true);
      }
    }, 25000);
  }

  public updateActivity(isActive = true) {
    if (!this.currentSession) return;
    const now = Date.now();
    const duration = Math.round((now - this.currentSession.startedAt) / 1000);
    this.currentSession.lastActiveAt = now;
    this.currentSession.isActive = isActive;
    this.currentSession.durationSeconds = duration;
    this.currentSession.currentPage = window.location.pathname + window.location.hash;
    saveSession(this.currentSession);
  }

  public trackEvent(
    category: any,
    action: string,
    label?: string,
    metadata?: Record<string, any>
  ) {
    if (!this.currentSession) return;
    this.updateActivity(true);
    recordEvent({
      sessionId: this.currentSession.sessionId,
      visitorId: this.currentSession.visitorId,
      timestamp: Date.now(),
      category,
      action,
      label,
      metadata,
      quality: this.currentSession.quality,
    });
  }
}

export const tracker = new PortfolioTrackerEngine();
