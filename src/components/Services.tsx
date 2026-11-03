"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  AudioLines,
  Bot,
  CheckCircle2,
  Code2,
  Film,
  LucideIcon,
  Sliders,
  Sparkles,
} from "lucide-react";
import { projects } from "@/data/projects";
import { Service, services } from "@/data/services";
import { ServiceDetailModal } from "./ServiceDetailModal";

interface ServicesProps {
  onSelectService?: (serviceTitle: string) => void;
}

interface ServiceVisual {
  Icon: LucideIcon;
  accent: string;
  caption: string;
}

interface ServiceCardProps {
  service: Service;
  index: number;
  onOpenDetails: (service: Service, origin: HTMLElement) => void;
  onInquire: (serviceTitle: string) => void;
}

const serviceVisuals: Record<string, ServiceVisual> = {
  "ai-filmmaking": { Icon: Film, accent: "#67c8ff", caption: "CINEMATIC DIRECTION" },
  "short-form-video-editing": { Icon: AudioLines, accent: "#b69aff", caption: "RHYTHM & PACING" },
  "website-development": { Icon: Code2, accent: "#5ec9ff", caption: "DIGITAL EXPERIENCES" },
  "discord-bot-automation": { Icon: Bot, accent: "#76e0b0", caption: "INTELLIGENT AUTOMATION" },
};

const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  index,
  onOpenDetails,
  onInquire,
}) => {
  const cardRef = useRef<HTMLElement>(null);
  const surfaceRef = useRef<HTMLDivElement>(null);
  const visual = serviceVisuals[service.id] ?? {
    Icon: Sparkles,
    accent: "#67c8ff",
    caption: service.category.toUpperCase(),
  };
  const relatedProject = service.relatedProjectId
    ? projects.find((project) => project.id === service.relatedProjectId)
    : undefined;
  const visualStyle: React.CSSProperties & {
    "--service-accent": string;
    "--service-stagger": string;
  } = {
    "--service-accent": visual.accent,
    "--service-stagger": `${index * 100}ms`,
  };

  useEffect(() => {
    const card = cardRef.current;
    if (!card || !window.matchMedia("(hover: hover) and (pointer: fine)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const handlePointerMove = (event: PointerEvent) => {
      const bounds = card.getBoundingClientRect();
      if (bounds.width === 0 || bounds.height === 0) return;
      const x = (event.clientX - bounds.left) / bounds.width;
      const y = (event.clientY - bounds.top) / bounds.height;
      card.style.setProperty("--tilt-x", `${(0.5 - y) * 3}deg`);
      card.style.setProperty("--tilt-y", `${(x - 0.5) * 3}deg`);
      card.style.setProperty("--pointer-x", `${x * 100}%`);
      card.style.setProperty("--pointer-y", `${y * 100}%`);
    };
    const resetTilt = () => {
      card.style.setProperty("--tilt-x", "0deg");
      card.style.setProperty("--tilt-y", "0deg");
      card.style.setProperty("--pointer-x", "50%");
      card.style.setProperty("--pointer-y", "50%");
    };

    card.addEventListener("pointermove", handlePointerMove, { passive: true });
    card.addEventListener("pointerleave", resetTilt);
    return () => {
      card.removeEventListener("pointermove", handlePointerMove);
      card.removeEventListener("pointerleave", resetTilt);
    };
  }, []);

  return (
    <article
      ref={cardRef}
      className="service-scroll-card group"
      style={visualStyle}
    >
      <div className="service-card-aura" aria-hidden="true" />

      <div ref={surfaceRef} className="service-card-surface">
        <div className="service-card-topline">
          <span className="service-card-index">{service.number}</span>
          <span className="service-card-category">{service.category}</span>
          <span className="service-card-arrow" aria-hidden="true">
            <ArrowUpRight size={15} />
          </span>
        </div>

        <div className="service-card-visual" aria-hidden="true">
          {relatedProject?.thumbnailUrl ? (
            <img
              src={relatedProject.thumbnailUrl}
              alt=""
              loading="lazy"
            />
          ) : (
            <div className="service-card-abstract">
              <span className="service-card-orbit service-card-orbit-one" />
              <span className="service-card-orbit service-card-orbit-two" />
              <visual.Icon size={34} strokeWidth={1.2} />
            </div>
          )}
          <div className="service-card-visual-shade" />
          <span className="service-card-caption">{relatedProject?.title ?? visual.caption}</span>
        </div>

        <div className="service-card-heading">
          <h3>{service.title}</h3>
        </div>

        <div className="service-card-details">
          <p className="service-card-tagline">{service.tagline}</p>
          <p className="service-card-description">{service.description}</p>

          <div className="service-card-scope">
            <span className="service-card-eyebrow">Included scope</span>
            <ul>
              {service.deliverables.map((item) => (
                <li key={item}>
                  <CheckCircle2 size={13} aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="service-card-footer">
            <div className="service-card-tools" aria-label="Tools">
              {service.tools.map((tool) => <span key={tool}>{tool}</span>)}
            </div>
            <div className="service-card-actions">
              <button
                type="button"
                onClick={(event) => onOpenDetails(service, event.currentTarget)}
                aria-label={`View details for ${service.title}`}
                aria-haspopup="dialog"
              >
                View details <ArrowUpRight size={13} />
              </button>
              <button
                type="button"
                onClick={() => onInquire(service.title)}
                aria-label={`Inquire about ${service.title}`}
              >
                Inquire <ArrowUpRight size={13} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRowRef = useRef<HTMLDivElement>(null);
  const [selectedModalService, setSelectedModalService] = useState<Service | null>(null);
  const originCardRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const row = cardRowRef.current;
    if (
      !section ||
      !row ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) return;

    const cards = Array.from(row.querySelectorAll<HTMLElement>(".service-scroll-card"));
    if (cards.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-revealed");
        entry.target.removeAttribute("inert");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.15 });

    cards.forEach((card) => {
      card.setAttribute("inert", "");
      observer.observe(card);
    });
    section.classList.add("services-reveal-ready");

    return () => {
      observer.disconnect();
      section.classList.remove("services-reveal-ready");
      cards.forEach((card) => {
        card.classList.remove("is-revealed");
        card.removeAttribute("inert");
      });
    };
  }, []);

  const handleInquiry = (serviceTitle: string) => {
    onSelectService?.(serviceTitle);
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const openServiceModal = (service: Service, origin: HTMLElement) => {
    originCardRef.current = origin;
    setSelectedModalService(service);
  };

  const handleCloseModal = () => {
    setSelectedModalService(null);
    window.setTimeout(() => originCardRef.current?.focus(), 50);
  };

  return (
    <section ref={sectionRef} id="services" className="services-scroll-section">
      <div className="services-scroll-stage">
        <div className="services-stage-inner">
          <header className="services-editorial-header">
            <div className="services-heading-block">
              <div className="services-kicker">
                <Sliders size={12} />
                <span>07 / SERVICES &amp; COLLABORATION</span>
              </div>
              <h2>
                Capabilities &amp; <br />
                <span>Freelance Offerings.</span>
              </h2>
            </div>
            <div className="services-header-description">
              <p>
                I work directly with founders, creators, and brands as an independent creative developer. Here is what I can genuinely deliver.
              </p>
              <div className="services-timeline" aria-hidden="true">
                <span />
              </div>
              <span className="services-scroll-instruction">SCROLL TO EXPLORE</span>
            </div>
          </header>

          <div ref={cardRowRef} className="services-card-row">
            {services.map((service, index) => (
              <ServiceCard
                key={service.id}
                service={service}
                index={index}
                onOpenDetails={openServiceModal}
                onInquire={handleInquiry}
              />
            ))}
          </div>
          <div className="services-floor-glow" aria-hidden="true" />
        </div>
      </div>

      <ServiceDetailModal
        service={selectedModalService}
        onClose={handleCloseModal}
        onSelectService={onSelectService}
      />
    </section>
  );
};
