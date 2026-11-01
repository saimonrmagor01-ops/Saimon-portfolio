export interface SocialItem {
  id: "instagram" | "discord" | "whatsapp";
  name: string;
  url: string;
  placeholderHint: string;
  label: string;
}

export const SOCIAL_LINKS = {
  INSTAGRAM_URL: "[ADD_INSTAGRAM_URL]",
  DISCORD_URL: "[ADD_DISCORD_PROFILE_OR_INVITE]",
  WHATSAPP_URL: "[ADD_WHATSAPP_LINK]", // e.g. https://wa.me/977XXXXXXXXXX
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
