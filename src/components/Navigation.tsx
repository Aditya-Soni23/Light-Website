import React, { useState } from "react";
import { ArrowDown, Menu, X } from "lucide-react";
import { DOWNLOAD_URL, SectionId } from "../config";

interface NavigationProps {
  activeSection: SectionId;
  onNavigate: (sectionId: SectionId) => void;
  onGetLightClick: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeSection,
  onNavigate,
  onGetLightClick,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { label: string; id: SectionId }[] = [
    { label: "Experience", id: "experience" },
    { label: "Features", id: "interface" },
    { label: "Connection", id: "connection" },
    { label: "Voice", id: "voice" },
    { label: "Download", id: "download" },
  ];

  const handleLinkClick = (id: SectionId) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-4 md:top-6 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
      <nav
        aria-label="Primary navigation"
        className="pointer-events-auto w-full max-w-3xl rounded-full px-4 py-2 md:px-5 md:py-2.5 transition-all duration-300 backdrop-blur-xl bg-white/80 border border-neutral-200/90 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06)] flex items-center justify-between gap-6"
      >
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#experience"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick("experience");
          }}
          className="group flex items-center gap-2 whitespace-nowrap shrink-0 text-slate-900 tracking-tight font-semibold text-sm md:text-base select-none"
        >
          {/* Subtle minimal geometric mark */}
          <span className="w-2.5 h-2.5 rounded-full bg-[#1A1A1A] group-hover:scale-110 transition-transform duration-200" />
          <span>LIGHT</span>
        </a>

        {/* Zone 2: Clean single-line nav links with active state indicator */}
        <div className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.id);
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 relative ${
                  isActive
                    ? "text-[#111827] font-semibold bg-neutral-100/90"
                    : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50/80"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </div>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onGetLightClick}
            className="px-3.5 py-1.5 md:px-4 md:py-1.5 text-xs font-medium text-white bg-[#1A1A1A] hover:bg-[#2A2A2A] active:scale-[0.98] rounded-full transition-all duration-150 shadow-xs whitespace-nowrap flex items-center gap-1.5 cursor-pointer"
          >
            <span>Get LIGHT</span>
            <ArrowDown className="w-3 h-3 text-neutral-300" />
          </button>

          {/* Mobile hamburger button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-neutral-600 hover:text-neutral-900 rounded-full hover:bg-neutral-100 transition-colors cursor-pointer"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          className="pointer-events-auto md:hidden fixed top-20 inset-x-4 max-w-sm mx-auto rounded-2xl p-3 backdrop-blur-xl bg-white/95 border border-neutral-200/90 shadow-xl flex flex-col gap-1 z-50 animate-in fade-in zoom-in-95 duration-150"
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                type="button"
                onClick={() => handleLinkClick(link.id)}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-sm transition-colors flex items-center justify-between cursor-pointer ${
                  isActive
                    ? "font-semibold text-neutral-900 bg-neutral-100"
                    : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50"
                }`}
              >
                <span>{link.label}</span>
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-neutral-900" />}
              </button>
            );
          })}
          <div className="pt-2 border-t border-neutral-100 mt-1">
            <a
              href={DOWNLOAD_URL}
              download="LIGHT_0.1.3_x64-setup.exe"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full py-2.5 text-xs font-medium text-white bg-[#1A1A1A] hover:bg-[#2A2A2A] rounded-xl text-center cursor-pointer no-underline"
            >
              Get LIGHT for Windows (v0.1.3 · 5.1 MB)
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
