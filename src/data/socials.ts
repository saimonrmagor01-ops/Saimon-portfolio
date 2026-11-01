export interface ContactChannel {
  handle: string;
  url: string;
  cta: string;
  description: string;
  color: string;
  accentBg: string;
  borderHover: string;
}

export interface DirectContactConfig {
  instagram: ContactChannel;
  whatsapp: ContactChannel;
  discord: ContactChannel & { username: string };
  meta: {
    location: string;
    timezone: string;
    responseTime: string;
    availability: string;
  };
}

/**
 * DIRECT CONTACT CONFIGURATION
 * 
 * Supply your genuine links/handles below.
 * Leave as empty string "" or "[ADD_...]" until provided.
 * The UI automatically verifies configuration and will never publish broken placeholder links.
 */
export const DIRECT_CONTACT_CONFIG: DirectContactConfig = {
  instagram: {
    handle: "@shymoneyyyyyy",
    url: "https://www.instagram.com/shymoneyyyyyy?exln=ZWkyazFmZ2QzdnI5",
    cta: "Message me on Instagram",
    description: "Direct messaging for creative collaborations, video direction, and visual inquiries.",
    color: "#E4405F",
    accentBg: "rgba(228, 64, 95, 0.12)",
    borderHover: "rgba(228, 64, 95, 0.5)",
  },
  whatsapp: {
    handle: "+977 9869113247",
    url: "https://wa.me/9779869113247",
    cta: "Let’s discuss your project",
    description: "Instant chat and voice messaging for rapid project discussions and timeline estimates.",
    color: "#25D366",
    accentBg: "rgba(37, 211, 102, 0.12)",
    borderHover: "rgba(37, 211, 102, 0.5)",
  },
  discord: {
    username: "1385452498931945627",
    handle: "1385452498931945627",
    url: "https://discordapp.com/users/1385452498931945627",
    cta: "Connect with me on Discord",
    description: "Real-time communication for bot development, web engineering, and asset reviews.",
    color: "#5865F2",
    accentBg: "rgba(88, 101, 242, 0.12)",
    borderHover: "rgba(88, 101, 242, 0.5)",
  },
  meta: {
    location: "Kathmandu, Nepal",
    timezone: "Asia/Kathmandu (NPT, GMT+5:45)",
    responseTime: "Within 24 Hours",
    availability: "Available for select freelance & commissions",
  },
};

// Backward-compatibility references for existing components
export const SOCIAL_LINKS = {
  INSTAGRAM_URL: DIRECT_CONTACT_CONFIG.instagram.url,
  DISCORD_URL: DIRECT_CONTACT_CONFIG.discord.url,
  WHATSAPP_URL: DIRECT_CONTACT_CONFIG.whatsapp.url,
};

export const CONTACT_CONFIG = {
  LOCATION: DIRECT_CONTACT_CONFIG.meta.location,
  TIMEZONE: DIRECT_CONTACT_CONFIG.meta.timezone,
  RESPONSE_TIME: DIRECT_CONTACT_CONFIG.meta.responseTime,
};

export const isValueConfigured = (value?: string): boolean => {
  if (!value) return false;
  const trimmed = value.trim();
  return trimmed.length > 0 && !trimmed.startsWith("[ADD_");
};

export const isSocialConfigured = isValueConfigured;
