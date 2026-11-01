export interface SocialItem {
  id: "instagram" | "discord" | "whatsapp";
  name: string;
  url: string;
  placeholderHint: string;
  label: string;
}

// Configurable contact details:
// To connect your genuine accounts, update these placeholders with your real URLs/email.
export const SOCIAL_LINKS = {
  INSTAGRAM_URL: "[ADD_INSTAGRAM_URL]", // e.g. "https://instagram.com/saimon_creates"
  DISCORD_URL: "[ADD_DISCORD_PROFILE_OR_INVITE]", // e.g. "https://discord.gg/yourinvite"
  WHATSAPP_URL: "[ADD_WHATSAPP_LINK]", // e.g. "https://wa.me/97798XXXXXXXX"
};

export const CONTACT_CONFIG = {
  EMAIL: "[ADD_EMAIL_ADDRESS]", // e.g. "saimon@yourdomain.com"
  LOCATION: "Kathmandu, Nepal",
  TIMEZONE: "Asia/Kathmandu (NPT, GMT+5:45)",
  RESPONSE_TIME: "Within 24 Hours",
};

export const isSocialConfigured = (url: string): boolean => {
  return Boolean(url && !url.startsWith("[ADD_") && url.trim().length > 0);
};

export const socialItems: SocialItem[] = [
  {
    id: "instagram",
    name: "Instagram",
    url: SOCIAL_LINKS.INSTAGRAM_URL,
    placeholderHint: "https://instagram.com/yourhandle",
    label: "Follow on Instagram",
  },
  {
    id: "discord",
    name: "Discord",
    url: SOCIAL_LINKS.DISCORD_URL,
    placeholderHint: "https://discord.gg/yourinvite",
    label: "Connect on Discord",
  },
  {
    id: "whatsapp",
    name: "WhatsApp",
    url: SOCIAL_LINKS.WHATSAPP_URL,
    placeholderHint: "https://wa.me/977XXXXXXXXXX",
    label: "Chat on WhatsApp",
  },
];
