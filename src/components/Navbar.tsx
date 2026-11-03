"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowUpRight, Menu, X, 
  Home, User, Film, Code, FolderGit2, Wrench, Briefcase, Sliders, Mail 
} from "lucide-react";
import { SocialLinks } from "./SocialLinks";
import { Magnetic } from "./Magnetic";

interface NavbarProps {
  activeSection?: string;
}

export const Navbar: React.FC<NavbarProps> = () => {
  const [activeSection, setActiveSection] = useState<string>("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Nav items matching page flow
  const navItems = [
    { label: "Home", href: "#home", id: "home", icon: Home },
    { label: "About", href: "#about", id: "about", icon: User },
    { label: "Creative", href: "#creative-studio", id: "creative-studio", icon: Film },
    { label: "Dev", href: "#development-studio", id: "development-studio", icon: Code },
    { label: "Projects", href: "#projects", id: "projects", icon: FolderGit2 },
    { label: "Skills", href: "#skills", id: "skills", icon: Wrench },
    { label: "Experience", href: "#experience", id: "experience", icon: Briefcase },
    { label: "Services", href: "#services", id: "services", icon: Sliders },
    { label: "Contact", href: "#contact", id: "contact", icon: Mail },
  ];

  // Scroll listener for sticky background & active section detection
  useEffect(() => {
    let frameId = 0;

    const handleScroll = () => {
      if (frameId !== 0) return;

      frameId = window.requestAnimationFrame(() => {
        frameId = 0;
        const scrolled = window.scrollY > 20;
        setIsScrolled((current) => current === scrolled ? current : scrolled);

        const sections = navItems.map((item) => document.getElementById(item.id));
        const scrollPos = window.scrollY + 220;

        for (let i = sections.length - 1; i >= 0; i--) {
          const sec = sections[i];
          if (sec && sec.offsetTop <= scrollPos) {
            const nextSection = navItems[i].id;
            setActiveSection((current) => current === nextSection ? current : nextSection);
            break;
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (frameId !== 0) window.cancelAnimationFrame(frameId);
    };
  }, []);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-3 sm:py-4 px-3 sm:px-6 flex justify-center">
        <div
          className={`w-full max-w-7xl mx-auto flex items-center justify-between px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full border transition-all duration-300 ${
            isScrolled
              ? "bg-[#080C18]/90 backdrop-blur-2xl border-white/15 shadow-[0_16px_45px_rgba(2,4,12,0.9),inset_0_1px_1px_rgba(255,255,255,0.14)]"
              : "bg-[#080C18]/75 backdrop-blur-xl border-white/10 shadow-[0_8px_30px_rgba(2,4,12,0.5),inset_0_1px_1px_rgba(255,255,255,0.1)]"
          }`}
        >
          {/* Brand with face-focused avatar and status indicator */}
          <a
            href="#home"
            className="flex items-center gap-2.5 group focus-visible:ring-2 focus-visible:ring-[#2563EB] rounded-full shrink-0"
            aria-label="Saimon Rana Magar Home"
          >
            <div className="relative w-8 h-8 rounded-full overflow-hidden bg-[#070B18] border border-white/15 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform">
              <Image
                src="/saimon-avatar.png"
                alt="Saimon Rana Magar Avatar"
                width={32}
                height={32}
                className="w-full h-full object-cover select-none"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 font-bold tracking-tight text-xs sm:text-sm text-white font-heading">
                <span>Saimon Rana Magar</span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.8)]"></span>
                </span>
                <span className="hidden sm:inline">Creator &amp; Developer</span>
              </div>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center gap-1 px-3 py-1 rounded-full bg-[#050817]/85 border border-white/10 text-xs font-medium text-slate-400 shadow-inner">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              const Icon = item.icon;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-colors duration-200 hover:text-white ${
                    isActive ? "text-white font-semibold" : "text-slate-400"
                  }`}
                >
                  <Icon size={12} className={isActive ? "text-[#38BDF8]" : "text-slate-500"} />
                  <span>{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-[#2563EB]/20 rounded-full border border-[#2563EB]/50 -z-10 shadow-[0_0_15px_rgba(37,99,235,0.3)]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Header Social Icons & Contact CTA */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden md:block">
              <SocialLinks size="sm" />
            </div>

            <Magnetic strength={0.15}>
              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] text-white hover:from-[#3B82F6] hover:to-[#2563EB] transition-all duration-200 font-heading shadow-[0_0_15px_rgba(37,99,235,0.4)] hover:shadow-[0_0_20px_rgba(37,99,235,0.6)] shrink-0 min-h-[36px]"
              >
                <span>Get in Touch</span>
                <ArrowUpRight size={13} />
              </a>
            </Magnetic>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="xl:hidden w-9 h-9 rounded-full flex items-center justify-center border border-white/15 bg-[#070B18] text-white hover:text-[#38BDF8] hover:border-white/30 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="fixed inset-x-4 top-20 z-40 bg-[#080C18]/95 backdrop-blur-3xl border border-white/15 rounded-3xl p-6 shadow-[0_24px_60px_rgba(0,0,0,0.9),inset_0_1px_1px_rgba(255,255,255,0.15)] xl:hidden flex flex-col gap-4"
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-xs uppercase tracking-widest text-slate-400 font-mono">Navigation</span>
              <span className="text-[11px] text-[#38BDF8] font-mono font-medium">Saimon Rana Magar</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={closeMenu}
                    className={`text-xs py-2.5 px-3 rounded-xl transition-all flex items-center gap-2 ${
                      isActive
                        ? "bg-[#2563EB]/25 border border-[#2563EB]/50 text-white font-medium shadow-[0_0_15px_rgba(37,99,235,0.25)]"
                        : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
                    }`}
                  >
                    <Icon size={14} className={isActive ? "text-[#38BDF8]" : "text-slate-500"} />
                    <span>{item.label}</span>
                  </a>
                );
              })}
            </div>

            <div className="pt-3 border-t border-white/10 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 font-mono">Connect:</span>
                <SocialLinks size="sm" />
              </div>
              <a
                href="#contact"
                onClick={closeMenu}
                className="w-full text-center py-3 rounded-full text-xs font-semibold bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] text-white hover:from-[#3B82F6] hover:to-[#2563EB] transition-all font-heading shadow-[0_0_20px_rgba(37,99,235,0.4)]"
              >
                Let&apos;s Collaborate ↗
              </a>
              <div className="text-center text-[11px] text-slate-500 font-mono">
                Kathmandu, Nepal • Available Worldwide
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
