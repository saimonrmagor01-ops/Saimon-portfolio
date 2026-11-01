"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { SocialLinks } from "./SocialLinks";

interface NavbarProps {
  activeSection?: string;
}

export const Navbar: React.FC<NavbarProps> = () => {
  const [activeSection, setActiveSection] = useState<string>("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Nav items
  const navItems = [
    { label: "Home", href: "#home", id: "home" },
    { label: "About", href: "#about", id: "about" },
    { label: "Creative", href: "#creative-studio", id: "creative-studio" },
    { label: "Development", href: "#development-studio", id: "development-studio" },
    { label: "Projects", href: "#projects", id: "projects" },
    { label: "Skills", href: "#skills", id: "skills" },
    { label: "Experience", href: "#experience", id: "experience" },
    { label: "Services", href: "#services", id: "services" },
    { label: "Contact", href: "#contact", id: "contact" },
  ];

  // Scroll listener for sticky background & active section
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = navItems.map((item) => document.getElementById(item.id));
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        if (sec && sec.offsetTop <= scrollPos) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-3 sm:py-4 px-4 sm:px-8 flex justify-center"
      >
        <div
          className={`w-full max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 py-2.5 sm:py-3 rounded-full border transition-all duration-300 ${
            isScrolled
              ? "bg-[#09090b]/85 backdrop-blur-xl border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
              : "bg-[#09090b]/60 backdrop-blur-md border-white/[0.06]"
          }`}
        >
          {/* Brand */}
          <a
            href="#home"
            className="flex items-center gap-2.5 group focus-visible:ring-1 focus-visible:ring-accent-blue rounded-full"
            aria-label="Saimon Rana Magar Home"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#9fbdff] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#9fbdff]"></span>
            </span>
            <div className="flex items-baseline gap-1.5 font-bold tracking-wider text-xs sm:text-sm text-white font-heading">
              <span>SAIMON</span>
              <span className="text-[#686868] font-normal tracking-normal text-[11px] hidden sm:inline font-sans">
                / PORTFOLIO
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 text-xs font-medium text-[#92928f]">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  className={`relative px-3 py-1.5 rounded-full transition-colors duration-200 hover:text-white ${
                    isActive ? "text-white font-semibold" : "text-[#8e8e93]"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-white/[0.08] rounded-full border border-white/[0.12] -z-10"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Actions: Social Icons & Contact CTA */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Header Social Icons */}
            <div className="hidden sm:block">
              <SocialLinks size="sm" />
            </div>

            {/* Direct CTA */}
            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold bg-white text-black hover:bg-[#9fbdff] hover:text-black transition-all duration-200 font-heading"
            >
              <span>Let&apos;s Talk</span>
              <ArrowUpRight size={13} />
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="lg:hidden p-2 text-white hover:text-[#9fbdff] transition-colors"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-4 top-20 z-40 bg-[#0e0e12]/95 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 shadow-2xl lg:hidden flex flex-col gap-4"
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-xs uppercase tracking-widest text-[#777777] font-mono">Navigation</span>
              <span className="text-[11px] text-[#9fbdff] font-mono">Saimon Rana Magar</span>
            </div>

            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={closeMenu}
                  className={`text-sm py-2 px-3 rounded-lg transition-colors flex items-center justify-between ${
                    activeSection === item.id
                      ? "bg-white/10 text-white font-medium"
                      : "text-[#a0a0a0] hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span>{item.label}</span>
                  <span className="text-[10px] text-[#555555]">↗</span>
                </a>
              ))}
            </div>

            <div className="pt-3 border-t border-white/10 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#777777] font-mono">Connect:</span>
                <SocialLinks size="sm" />
              </div>
              <a
                href="#contact"
                onClick={closeMenu}
                className="w-full text-center py-2.5 rounded-full text-xs font-semibold bg-white text-black hover:bg-[#9fbdff] transition-colors font-heading"
              >
                Let&apos;s Collaborate ↗
              </a>
              <div className="text-center text-[11px] text-[#666666] font-mono">
                Based in Nepal • Available Worldwide
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
