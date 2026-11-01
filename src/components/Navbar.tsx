"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowUpRight, Menu, X, 
  Home, User, Briefcase, Film, Code, FolderGit2, Wrench, Mail 
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

  // Nav items with icons matching reference layout
  const navItems = [
    { label: "Home", href: "#home", id: "home", icon: Home },
    { label: "About", href: "#about", id: "about", icon: User },
    { label: "Experience", href: "#experience", id: "experience", icon: Briefcase },
    { label: "Creative", href: "#creative-studio", id: "creative-studio", icon: Film },
    { label: "Dev", href: "#development-studio", id: "development-studio", icon: Code },
    { label: "Projects", href: "#projects", id: "projects", icon: FolderGit2 },
    { label: "Skills", href: "#skills", id: "skills", icon: Wrench },
    { label: "Contact", href: "#contact", id: "contact", icon: Mail },
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
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-3 sm:py-4 px-3 sm:px-6 flex justify-center"
      >
        <div
          className={`w-full max-w-7xl mx-auto flex items-center justify-between px-3 sm:px-5 py-2 sm:py-2.5 rounded-full border transition-all duration-300 ${
            isScrolled
              ? "bg-[#101525]/90 backdrop-blur-xl border-[#202A40] shadow-[0_12px_40px_rgba(5,8,23,0.8)]"
              : "bg-[#101525]/70 backdrop-blur-md border-[#202A40]/80"
          }`}
        >
          {/* Brand with illustrated avatar and live green dot (Reference Style) */}
          <a
            href="#home"
            className="flex items-center gap-2.5 group focus-visible:ring-1 focus-visible:ring-[#2563EB] rounded-full shrink-0"
            aria-label="Saimon Rana Magar Home"
          >
            <div className="relative w-8 h-8 rounded-full overflow-hidden bg-[#080C1E] border border-[#202A40] flex items-center justify-center p-0.5">
              <Image
                src="/portrait.png"
                alt="Saimon Avatar"
                width={32}
                height={32}
                className="w-full h-full object-contain sticker-outline"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 font-bold tracking-tight text-xs sm:text-sm text-white font-heading">
                <span>Saimon Rana Magar</span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-[#94A3B8]">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                </span>
                <span className="hidden sm:inline">Digital Creator &amp; Dev</span>
              </div>
            </div>
          </a>

          {/* Desktop Nav Links (Reference Screenshot Pill Style) */}
          <nav className="hidden xl:flex items-center gap-1 px-3 py-1 rounded-full bg-[#080C1E]/80 border border-[#202A40]/80 text-xs font-medium text-[#94A3B8]">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              const Icon = item.icon;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-colors duration-200 hover:text-white ${
                    isActive ? "text-white font-semibold" : "text-[#94A3B8]"
                  }`}
                >
                  <Icon size={12} className={isActive ? "text-[#2563EB]" : "text-[#64748B]"} />
                  <span>{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-[#2563EB]/15 rounded-full border border-[#2563EB]/40 -z-10"
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
            <div className="hidden md:block">
              <SocialLinks size="sm" />
            </div>

            {/* Direct CTA (Reference Accent Blue) with Magnetic Hover */}
            <Magnetic strength={0.25}>
              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold bg-[#2563EB] text-white hover:bg-[#1D4ED8] transition-all duration-200 font-heading shadow-[0_0_15px_rgba(37,99,235,0.35)] shrink-0"
              >
                <span>Let&apos;s Talk</span>
                <ArrowUpRight size={13} />
              </a>
            </Magnetic>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="xl:hidden p-2 text-white hover:text-[#2563EB] transition-colors"
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
            className="fixed inset-x-4 top-20 z-40 bg-[#101525]/95 backdrop-blur-2xl border border-[#202A40] rounded-2xl p-6 shadow-2xl xl:hidden flex flex-col gap-4"
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#202A40]">
              <span className="text-xs uppercase tracking-widest text-[#64748B] font-mono">Navigation</span>
              <span className="text-[11px] text-[#2563EB] font-mono font-medium">Saimon Rana Magar</span>
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
                    className={`text-xs py-2 px-3 rounded-lg transition-colors flex items-center gap-2 ${
                      isActive
                        ? "bg-[#2563EB]/20 border border-[#2563EB]/40 text-white font-medium"
                        : "text-[#94A3B8] hover:text-white hover:bg-[#161D33]"
                    }`}
                  >
                    <Icon size={14} className={isActive ? "text-[#2563EB]" : "text-[#64748B]"} />
                    <span>{item.label}</span>
                  </a>
                );
              })}
            </div>

            <div className="pt-3 border-t border-[#202A40] flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#94A3B8] font-mono">Direct Connect:</span>
                <SocialLinks size="sm" />
              </div>
              <a
                href="#contact"
                onClick={closeMenu}
                className="w-full text-center py-2.5 rounded-full text-xs font-semibold bg-[#2563EB] text-white hover:bg-[#1D4ED8] transition-colors font-heading shadow-[0_0_15px_rgba(37,99,235,0.4)]"
              >
                Let&apos;s Collaborate ↗
              </a>
              <div className="text-center text-[11px] text-[#64748B] font-mono">
                Based in Nepal • Available Worldwide
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
