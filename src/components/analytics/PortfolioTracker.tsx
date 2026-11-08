"use client";

import React, { useEffect, useRef } from "react";
import { tracker } from "@/lib/analytics/tracker";
import { useRouter } from "next/navigation";

export const PortfolioTracker: React.FC = () => {
  const router = useRouter();
  const observedSections = useRef<Set<string>>(new Set());

  useEffect(() => {
    // 1. Initialize tracker asynchronously
    tracker.init();

    // 2. Track Section Dwell Time via IntersectionObserver
    const sections = [
      "home",
      "about",
      "creative-studio",
      "development-studio",
      "projects",
      "skills",
      "experience",
      "services",
      "contact",
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.4) {
            const sectionId = entry.target.id;
            if (!observedSections.current.has(sectionId)) {
              observedSections.current.add(sectionId);
              tracker.trackEvent("section_view", "scroll_into_view", sectionId);
            }
          }
        });
      },
      { threshold: [0.4] }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    // 3. Global Click Delegation for Contact & Project links
    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const link = target.closest("a, button");
      if (!link) return;

      const href = link.getAttribute("href") || "";
      const text = (link.textContent || "").trim();

      // Track WhatsApp click
      if (href.includes("wa.me") || href.includes("whatsapp")) {
        tracker.trackEvent("contact_interaction", "whatsapp_click", "WhatsApp", { href });
      }
      // Track Instagram click
      else if (href.includes("instagram.com")) {
        tracker.trackEvent("contact_interaction", "instagram_click", "Instagram", { href });
      }
      // Track Discord click
      else if (href.includes("discord")) {
        tracker.trackEvent("contact_interaction", "discord_click", "Discord", { href });
      }
      // Track Resume download
      else if (href.toLowerCase().includes("resume") || text.toLowerCase().includes("resume")) {
        tracker.trackEvent("resume_download", "download", text, { href });
      }
      // Track Project demo / github links
      else if (href.includes("github.com")) {
        tracker.trackEvent("project_click", "github_click", text, { href });
      }
      else if (href.startsWith("http") && !href.includes(window.location.host)) {
        tracker.trackEvent("project_click", "external_demo_click", text, { href });
      }
    };

    document.addEventListener("click", handleDocumentClick, { capture: true });

    // 4. Secret Admin Shortcut: Shift + Alt/Option + A
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.shiftKey && e.altKey && (e.key === "a" || e.key === "A" || e.code === "KeyA")) {
        e.preventDefault();
        router.push("/admin/analytics");
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      observer.disconnect();
      document.removeEventListener("click", handleDocumentClick, { capture: true });
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [router]);

  return null; // Invisible component
};
