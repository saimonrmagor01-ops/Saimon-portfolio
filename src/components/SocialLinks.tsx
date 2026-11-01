"use client";

import React, { useState } from "react";
import { SOCIAL_LINKS } from "@/data/socials";

interface SocialLinksProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

export const SocialLinks: React.FC<SocialLinksProps> = ({
  className = "",
  size = "md",
  showLabel = false,
}) => {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  const iconSizes = {
    sm: "w-7 h-7 text-xs",
    md: "w-9 h-9 text-sm",
    lg: "w-11 h-11 text-base",
  };

  const svgSizes = {
    sm: 14,
    md: 17,
    lg: 20,
  };

  const currentSvgSize = svgSizes[size];

  const socials = [
    {
      id: "instagram",
      name: "Instagram",
      url: SOCIAL_LINKS.INSTAGRAM_URL,
      hoverColor: "hover:text-[#f43f5e] hover:border-[#f43f5e]/40",
      icon: (
        <svg
          width={currentSvgSize}
          height={currentSvgSize}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      ),
    },
    {
      id: "discord",
      name: "Discord",
      url: SOCIAL_LINKS.DISCORD_URL,
      hoverColor: "hover:text-[#818cf8] hover:border-[#818cf8]/40",
      icon: (
        <svg
          width={currentSvgSize}
          height={currentSvgSize}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.893.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
        </svg>
      ),
    },
    {
      id: "whatsapp",
      name: "WhatsApp",
      url: SOCIAL_LINKS.WHATSAPP_URL,
      hoverColor: "hover:text-[#4ade80] hover:border-[#4ade80]/40",
      icon: (
        <svg
          width={currentSvgSize}
          height={currentSvgSize}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12.004 2c-5.518 0-9.998 4.48-9.998 9.998 0 1.763.458 3.486 1.33 5.006l-1.415 5.17 5.289-1.388a9.948 9.948 0 0 0 4.794 1.212h.004c5.517 0 9.997-4.48 9.997-9.998 0-2.67-1.04-5.18-2.93-7.07a9.932 9.932 0 0 0-7.071-2.93zm5.82 14.372c-.24.675-1.398 1.29-1.93 1.344-.492.05-1.127.075-3.645-.968-3.218-1.332-5.286-4.605-5.447-4.819-.16-.214-1.306-1.74-1.306-3.32 0-1.579.827-2.355 1.12-2.678.293-.323.64-.403.854-.403.213 0 .427.002.614.011.198.01.464-.075.726.554.267.64.908 2.217.988 2.378.08.16.134.348.027.562-.107.214-.16.348-.32.535-.16.188-.337.42-.48.563-.16.16-.327.334-.14.654.187.32.83 1.371 1.782 2.22 1.226 1.092 2.26 1.43 2.58 1.59.32.16.507.134.694-.08.187-.214.8-0.934 1.014-1.254.214-.32.427-.267.72-.16.294.107 1.868.88 2.188 1.04.32.16.534.24.614.374.08.134.08.774-.16 1.449z" />
        </svg>
      ),
    },
  ];

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, name: string, url: string) => {
    if (url.startsWith("[ADD_")) {
      e.preventDefault();
      alert(`The ${name} profile link is currently being configured.`);
    }
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {socials.map((item) => (
        <div key={item.id} className="relative">
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => handleClick(e, item.name, item.url)}
            onMouseEnter={() => setActiveTooltip(item.id)}
            onMouseLeave={() => setActiveTooltip(null)}
            className={`inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-[#a0a0a0] transition-all duration-200 hover:scale-105 hover:bg-white/[0.08] hover:text-white ${iconSizes[size]} ${item.hoverColor}`}
            aria-label={`Saimon Rana Magar on ${item.name}`}
          >
            {item.icon}
          </a>

          {/* Minimal Tooltip */}
          {activeTooltip === item.id && (
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded bg-[#16161c] border border-white/10 text-[10px] font-mono text-white pointer-events-none whitespace-nowrap shadow-xl z-50 animate-fadeIn">
              {item.name}
              <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#16161c]" />
            </div>
          )}

          {showLabel && (
            <span className="text-xs text-[#8e8e93] font-medium ml-2">{item.name}</span>
          )}
        </div>
      ))}
    </div>
  );
};
