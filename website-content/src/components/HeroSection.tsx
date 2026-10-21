import React from "react";
import { ArrowDown } from "lucide-react";
import { PRODUCT_CONFIG } from "../config";

interface HeroSectionProps {
  onDiscoverClick: () => void;
  onMeetVoiceChatClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onDiscoverClick,
  onMeetVoiceChatClick,
}) => {
  return (
    <section
      id="experience"
      data-section="experience"
      className="relative min-h-screen flex flex-col justify-between pt-32 pb-12 px-6 sm:px-8 md:px-12 max-w-7xl mx-auto w-full"
    >
      {/* Top brand statement kicker */}
      <div className="pt-8">
        <p className="text-xs uppercase tracking-[0.2em] font-medium text-neutral-500">
          {PRODUCT_CONFIG.brandStatement}
        </p>
      </div>

      {/* Main Narrative Block: Left/Center-aligned with controlled width to leave room for background composition */}
      <div className="max-w-2xl py-12 md:py-20">
        <h1
          className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-[-0.03em] text-[#111827] leading-[1.08] text-balance mb-6"
        >
          Your game deserves your full attention.
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-neutral-600 font-normal leading-relaxed text-pretty max-w-xl mb-10">
          Voice chat shouldn't mean extra clutter, unnecessary complexity, or another heavyweight app running in the background.
        </p>

        {/* CTA cluster: Tactile primary charcoal button + minimal secondary text link */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
          <button
            type="button"
            onClick={onDiscoverClick}
            className="group px-6 py-3.5 rounded-full bg-[#1A1A1A] hover:bg-[#2B2B2B] text-white text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md active:scale-[0.98] flex items-center gap-2 cursor-pointer"
          >
            <span>Discover LIGHT</span>
            <ArrowDown className="w-4 h-4 text-neutral-400 group-hover:translate-y-0.5 transition-transform duration-200" />
          </button>

          <button
            type="button"
            onClick={onMeetVoiceChatClick}
            className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors py-2 px-1 relative after:content-[''] after:absolute after:bottom-1 after:left-1 after:right-1 after:h-[1px] after:bg-neutral-300 hover:after:bg-neutral-800 after:transition-colors cursor-pointer"
          >
            Meet your new voice chat
          </button>
        </div>
      </div>

      {/* Understated scroll indicator */}
      <div className="pt-8 flex flex-col items-center justify-center">
        <div className="flex flex-col items-center gap-2 select-none pointer-events-none opacity-60 hover:opacity-100 transition-opacity">
          <span className="text-[10px] tracking-[0.25em] uppercase font-medium text-neutral-500">
            Scroll to explore
          </span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-neutral-400 to-transparent animate-pulse" />
        </div>
      </div>
    </section>
  );
};
