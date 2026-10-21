import React, { useState } from "react";
import { Download, CheckCircle2, Info, ArrowUpRight } from "lucide-react";
import { DOWNLOAD_URL, PRODUCT_CONFIG } from "../config";
import { PrivacyModal } from "./PrivacyModal";

interface DownloadSectionProps {
  onFeaturesClick: () => void;
}

export const DownloadSection: React.FC<DownloadSectionProps> = ({ onFeaturesClick }) => {
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const currentYear = new Date().getFullYear();

  const handleDownloadClick = () => {
    if (DOWNLOAD_URL && DOWNLOAD_URL.trim() !== "") {
      const a = document.createElement("a");
      a.href = DOWNLOAD_URL;
      a.download = "LIGHT_0.1.3_x64-setup.exe";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } else {
      // Friendly temporary state for unconfigured installer URL
      setShowStatusModal(true);
    }
  };

  return (
    <section
      id="download"
      data-section="download"
      className="relative min-h-screen pt-28 pb-12 px-6 sm:px-8 md:px-12 max-w-7xl mx-auto flex flex-col justify-between"
    >
      <div className="flex-1 flex flex-col items-center justify-center text-center max-w-4xl mx-auto w-full">
        {/* Main Section Header */}
        <p className="text-xs uppercase tracking-[0.2em] font-medium text-neutral-500 mb-3">
          The Product
        </p>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-[-0.03em] text-[#111827] mb-6 text-balance">
          Small footprint. Big presence.
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-neutral-600 font-normal leading-relaxed text-pretty max-w-2xl mb-12">
          Everything essential for your conversations, in a download designed to stay out of your way.
        </p>

        {/* Metaphorical Visual: Sleek, compact Mac mini-inspired hardware object */}
        <div className="relative mb-14 group select-none">
          {/* Subtle pedestal studio reflection / drop shadow */}
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-black/10 blur-xl rounded-full pointer-events-none" />

          {/* Anodized Dark Monolith Block */}
          <div
            className="relative w-64 sm:w-72 h-20 sm:h-22 rounded-2xl bg-gradient-to-b from-[#24272C] via-[#1B1D21] to-[#121316] border border-neutral-700/60 shadow-[0_20px_50px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.15)] flex items-center justify-between px-6 transition-transform duration-300 group-hover:-translate-y-1"
          >
            {/* Debossed Wordmark */}
            <div className="flex items-center gap-2.5">
              <span className="w-3 h-3 rounded-full bg-white/20 flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-white/90" />
              </span>
              <span className="text-xs tracking-[0.25em] font-semibold text-neutral-300">
                LIGHT
              </span>
            </div>

            {/* Micro power & link LED */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-neutral-400 tabular-nums">16 MB</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/90 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            </div>
          </div>

          <p className="text-[11px] text-neutral-400 mt-4 tracking-wide font-normal">
            Physical metaphor for lightweight software architecture. No hardware required.
          </p>
        </div>

        {/* Core Product Specifications Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-2xl w-full mb-14 text-center sm:text-left border border-neutral-200/80 rounded-2xl p-6 sm:p-8 backdrop-blur-md bg-white/80 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
          <div>
            <div className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 mb-1">
              16 MB
            </div>
            <p className="text-xs text-neutral-500">
              A lightweight download. Designed to stay lightweight while you play.
            </p>
          </div>

          <div>
            <div className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 mb-1">
              Built for gaming
            </div>
            <p className="text-xs text-neutral-500">
              Made to fit alongside your games without frame drops or competing overlays.
            </p>
          </div>

          <div>
            <div className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 mb-1">
              Windows
            </div>
            <p className="text-xs text-neutral-500">
              A dedicated desktop experience engineered for Windows 10 & 11.
            </p>
          </div>
        </div>

        {/* The Giant Download CTA */}
        <div className="w-full max-w-md flex flex-col items-center">
          <button
            type="button"
            onClick={handleDownloadClick}
            aria-describedby="download-subtext"
            className="group w-full py-4 sm:py-5 px-8 rounded-2xl bg-[#1A1A1A] hover:bg-[#282828] active:scale-[0.99] text-white transition-all duration-200 shadow-[0_10px_35px_-5px_rgba(0,0,0,0.2)] hover:shadow-[0_16px_45px_-8px_rgba(0,0,0,0.3)] flex flex-col items-center justify-center gap-1 cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <Download className="w-5 h-5 text-neutral-300 group-hover:translate-y-0.5 transition-transform duration-200" />
              <span className="text-base sm:text-lg font-semibold tracking-tight">
                Get LIGHT for Windows
              </span>
            </div>
            <span
              id="download-subtext"
              className="text-xs text-neutral-400 group-hover:text-neutral-300 transition-colors font-normal"
            >
              Lightweight download · v{PRODUCT_CONFIG.version} (5.1 MB)
            </span>
          </button>
        </div>
      </div>

      {/* Restrained Footer */}
      <footer className="mt-20 pt-8 border-t border-neutral-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-neutral-800 tracking-tight">LIGHT</span>
          <span aria-hidden="true" className="text-neutral-300">·</span>
          <span>Built to stay out of your way.</span>
        </div>

        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={onFeaturesClick}
            className="hover:text-neutral-900 transition-colors cursor-pointer"
          >
            Features
          </button>
          <a
            href="#download"
            className="hover:text-neutral-900 transition-colors"
          >
            Download
          </a>
          <button
            type="button"
            onClick={() => setShowPrivacyModal(true)}
            className="hover:text-neutral-900 transition-colors cursor-pointer"
          >
            Privacy
          </button>
          <span aria-hidden="true" className="text-neutral-300">·</span>
          <span className="tabular-nums">© {currentYear} LIGHT</span>
        </div>
      </footer>

      {/* Friendly Preparation Modal for Unconfigured DOWNLOAD_URL */}
      {showStatusModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200"
        >
          <div className="relative w-full max-w-md bg-white rounded-2xl p-6 sm:p-7 shadow-2xl border border-neutral-200 text-left">
            <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center mb-4 text-neutral-800">
              <Info className="w-5 h-5" />
            </div>

            <h3 className="text-base font-semibold text-neutral-900 mb-2">
              The download is being prepared.
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-6">
              The official 16 MB Windows installer binary will be published when public release opens. The configuration constant <code className="px-1.5 py-0.5 rounded bg-neutral-100 font-mono text-neutral-800 text-xs">DOWNLOAD_URL</code> in <code className="px-1.5 py-0.5 rounded bg-neutral-100 font-mono text-neutral-800 text-xs">src/config.ts</code> is ready for your download link.
            </p>

            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowStatusModal(false)}
                className="px-4 py-2 rounded-xl bg-neutral-900 text-white text-xs font-medium hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Privacy Policy Modal */}
      <PrivacyModal
        isOpen={showPrivacyModal}
        onClose={() => setShowPrivacyModal(false)}
      />
    </section>
  );
};
