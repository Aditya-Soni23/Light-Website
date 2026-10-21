import React from "react";
import { X, ShieldCheck } from "lucide-react";
import { PRODUCT_CONFIG } from "../config";

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="privacy-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-lg bg-white rounded-2xl p-6 sm:p-8 shadow-2xl border border-neutral-200">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close privacy notice"
          className="absolute top-5 right-5 p-1.5 rounded-full text-neutral-400 hover:text-neutral-800 hover:bg-neutral-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <h3 id="privacy-modal-title" className="text-lg font-semibold text-neutral-900">
            Privacy & Architecture
          </h3>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-neutral-600 leading-relaxed">
          <p>
            {PRODUCT_CONFIG.privacyStatement}
          </p>

          <div className="space-y-2 pt-2 border-t border-neutral-100">
            <p className="font-semibold text-neutral-900">Our Core Privacy Commitments:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-neutral-600">
              <li>
                <span className="font-medium text-neutral-800">No Audio Storage:</span> Audio streams are routed peer-to-peer or through low-latency relays without voice recording or speech analysis.
              </li>
              <li>
                <span className="font-medium text-neutral-800">Zero Analytics Telemetry:</span> We do not monitor your active games, keystrokes, or background software.
              </li>
              <li>
                <span className="font-medium text-neutral-800">Minimal Local Footprint:</span> Application configuration is stored locally on your device in plain readable format.
              </li>
            </ul>
          </div>

          <p className="text-[11px] text-neutral-400 pt-2">
            The full legal privacy policy URL will be linked here upon official release.
          </p>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-neutral-900 text-white text-xs font-medium hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            Understood
          </button>
        </div>
      </div>
    </div>
  );
};
