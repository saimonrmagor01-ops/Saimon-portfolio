"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { CustomCursor } from "@/components/CustomCursor";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { CreativeStudio } from "@/components/CreativeStudio";
import { DevelopmentStudio } from "@/components/DevelopmentStudio";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { Experience } from "@/components/Experience";
import { Services } from "@/components/Services";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  const [selectedService, setSelectedService] = useState<string>("");

  const handleSelectService = (serviceTitle: string) => {
    setSelectedService(serviceTitle);
  };

  return (
    <div className="relative min-h-screen bg-[#050505] text-[#f4f4f1] selection:bg-[#9fbdff] selection:text-[#050505]">
      {/* Desktop Custom Cursor */}
      <CustomCursor />

      {/* Navigation Header */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="relative z-10 flex flex-col">
        {/* Section A: Home / Hero */}
        <Hero />

        {/* Section B: About Me */}
        <About />

        {/* Section C: Creative Studio */}
        <CreativeStudio />

        {/* Section D: Development Studio */}
        <DevelopmentStudio />

        {/* Section E: Featured Projects */}
        <Projects />

        {/* Section F: Skills & Technologies */}
        <Skills />

        {/* Section G: Experience & Education */}
        <Experience />

        {/* Section H: Services */}
        <Services onSelectService={handleSelectService} />

        {/* Section I: Contact */}
        <Contact
          selectedService={selectedService}
          onServiceChange={(s) => setSelectedService(s)}
        />
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
