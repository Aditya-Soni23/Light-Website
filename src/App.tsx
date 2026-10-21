/**
 * LIGHT — Lightweight Voice Chat for Gamers
 * Website Skeleton and Complete Interactive Product Experience
 */

import React, { useEffect, useState } from "react";
import { SectionId } from "./config";
import { CinematicBackground } from "./components/CinematicBackground";
import { Navigation } from "./components/Navigation";
import { HeroSection } from "./components/HeroSection";
import { InterfaceSection } from "./components/InterfaceSection";
import { ConnectionSection } from "./components/ConnectionSection";
import { VoiceSection } from "./components/VoiceSection";
import { DownloadSection } from "./components/DownloadSection";

export default function App() {
  const [activeSection, setActiveSection] = useState<SectionId>("experience");

  // Track the active section via standard lightweight IntersectionObserver
  useEffect(() => {
    const sectionIds: SectionId[] = [
      "experience",
      "interface",
      "connection",
      "voice",
      "download",
    ];

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id") as SectionId;
          if (id && sectionIds.includes(id)) {
            setActiveSection(id);
          }
        }
      });
    };

    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: "-30% 0px -40% 0px", // triggers when section is comfortably in view
      threshold: 0,
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId: SectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const lenis = (window as any).lenis;
      if (lenis && typeof lenis.scrollTo === "function") {
        lenis.scrollTo(element, { duration: 1.2 });
      } else {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-transparent text-[#1A1A1A]">
      {/* 
        CRITICAL ARCHITECTURE REQUIREMENT:
        Single dedicated background wrapper (.cinematic-background) behind the website content.
        Never intercepts pointer events.
        Canvas or frame-animation element will be mounted here later.
      */}
      <CinematicBackground activeSection={activeSection} />

      {/* Floating Global Navigation */}
      <Navigation
        activeSection={activeSection}
        onNavigate={scrollToSection}
        onGetLightClick={() => scrollToSection("download")}
      />

      {/* Foreground Content Layer: Stacking order z-10 */}
      <main className="relative z-10 flex flex-col w-full">
        {/* Section 1: The Problem and the Promise */}
        <HeroSection
          onDiscoverClick={() => scrollToSection("interface")}
          onMeetVoiceChatClick={() => scrollToSection("voice")}
        />

        {/* Section 2: The Interface */}
        <InterfaceSection />

        {/* Section 3: The Feeling of Connection */}
        <ConnectionSection />

        {/* Section 4: Voice Chat, Made Simple */}
        <VoiceSection />

        {/* Section 5: The Product Reveal */}
        <DownloadSection onFeaturesClick={() => scrollToSection("interface")} />
      </main>
    </div>
  );
}
