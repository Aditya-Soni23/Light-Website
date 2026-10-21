import React, { useState } from "react";
import {
  Mic,
  MicOff,
  Headphones,
  PhoneOff,
  RotateCcw,
  Volume2,
  VolumeX,
  Sliders,
} from "lucide-react";

export const VoiceSection: React.FC = () => {
  const [isConnected, setIsConnected] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isDeafened, setIsDeafened] = useState(false);
  const [inputVolume, setInputVolume] = useState(85);

  const handleToggleMic = () => {
    if (!isConnected) return;
    setIsMuted((prev) => !prev);
  };

  const handleToggleDeafen = () => {
    if (!isConnected) return;
    setIsDeafened((prev) => !prev);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
  };

  const handleReconnect = () => {
    setIsConnected(true);
  };

  return (
    <section
      id="voice"
      data-section="voice"
      className="relative min-h-screen py-28 px-6 sm:px-8 md:px-12 max-w-7xl mx-auto flex flex-col justify-center items-center"
    >
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <p className="text-xs uppercase tracking-[0.2em] font-medium text-neutral-500 mb-3">
          Instant Control
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-[-0.03em] text-[#111827] mb-4 text-balance">
          Your voice. Your game. Your flow.
        </h2>
        <p className="text-base sm:text-lg text-neutral-600 font-normal leading-relaxed text-pretty">
          Join the conversation, control your audio, and get straight back to playing.
        </p>
      </div>

      {/* Hero Foreground Element: THE LIGHT VOICE-CHAT PILL */}
      <div className="w-full max-w-xl mx-auto flex flex-col items-center mb-16">
        <div
          role="region"
          aria-label="Interactive voice control bar demonstration"
          className={`w-full p-2.5 sm:p-3 rounded-2xl sm:rounded-full transition-all duration-300 backdrop-blur-2xl border shadow-[0_12px_40px_-8px_rgba(0,0,0,0.08)] flex flex-col sm:flex-row items-center justify-between gap-3 ${
            isConnected
              ? "bg-white/90 border-neutral-200/90"
              : "bg-neutral-100/90 border-neutral-300/80 opacity-90"
          }`}
        >
          {/* Identity & Status Zone */}
          <div className="flex items-center gap-3 px-2 sm:px-3 w-full sm:w-auto justify-between sm:justify-start">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center text-xs font-bold tracking-tight">
                L
              </span>
              <div className="text-left">
                <p className="text-xs font-semibold text-neutral-900 tracking-tight leading-tight">
                  {isConnected ? "Apex Squad" : "Disconnected"}
                </p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isConnected ? "bg-emerald-500 animate-pulse" : "bg-neutral-400"
                    }`}
                  />
                  <span className="text-[10px] text-neutral-500 font-mono">
                    {isConnected ? (isMuted ? "Muted" : "4 active · 18ms") : "Session ended"}
                  </span>
                </div>
              </div>
            </div>

            {/* Simulated Live Audio Waveform Bars (only when connected & unmuted) */}
            {isConnected && !isMuted && (
              <div
                className="flex items-center gap-0.5 h-4 px-2"
                aria-label="Simulated voice level animation"
              >
                <span className="w-1 bg-emerald-500/80 rounded-full h-2 animate-[pulse_0.8s_ease-in-out_infinite]" />
                <span className="w-1 bg-emerald-500/80 rounded-full h-3.5 animate-[pulse_0.6s_ease-in-out_infinite_0.1s]" />
                <span className="w-1 bg-emerald-500/80 rounded-full h-2.5 animate-[pulse_0.9s_ease-in-out_infinite_0.2s]" />
                <span className="w-1 bg-emerald-500/80 rounded-full h-4 animate-[pulse_0.7s_ease-in-out_infinite_0.15s]" />
                <span className="w-1 bg-emerald-500/80 rounded-full h-1.5 animate-[pulse_0.5s_ease-in-out_infinite_0.3s]" />
              </div>
            )}
          </div>

          {/* Action Controls Cluster */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end border-t sm:border-t-0 pt-2 sm:pt-0 border-neutral-100">
            {isConnected ? (
              <>
                {/* Microphone Mute Toggle */}
                <button
                  type="button"
                  onClick={handleToggleMic}
                  aria-pressed={isMuted}
                  aria-label={isMuted ? "Unmute microphone (currently muted)" : "Mute microphone (currently live)"}
                  className={`p-2.5 rounded-full transition-all duration-150 cursor-pointer flex items-center gap-1.5 ${
                    isMuted
                      ? "bg-red-500 text-white hover:bg-red-600 shadow-xs"
                      : "bg-neutral-100 text-neutral-800 hover:bg-neutral-200"
                  }`}
                  title={isMuted ? "Click to unmute" : "Click to mute"}
                >
                  {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </button>

                {/* Speaker / Deafen Toggle */}
                <button
                  type="button"
                  onClick={handleToggleDeafen}
                  aria-pressed={isDeafened}
                  aria-label={isDeafened ? "Undeafen headset (currently deafened)" : "Deafen headset"}
                  className={`p-2.5 rounded-full transition-all duration-150 cursor-pointer flex items-center gap-1.5 ${
                    isDeafened
                      ? "bg-red-500 text-white hover:bg-red-600 shadow-xs"
                      : "bg-neutral-100 text-neutral-800 hover:bg-neutral-200"
                  }`}
                  title={isDeafened ? "Click to enable audio" : "Click to deafen audio"}
                >
                  {isDeafened ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>

                {/* Disconnect Control */}
                <button
                  type="button"
                  onClick={handleDisconnect}
                  aria-label="Disconnect from voice channel"
                  className="p-2.5 rounded-full bg-neutral-100 text-neutral-600 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                  title="Disconnect"
                >
                  <PhoneOff className="w-4 h-4" />
                </button>
              </>
            ) : (
              /* Reconnect Control when Disconnected */
              <button
                type="button"
                onClick={handleReconnect}
                className="px-4 py-2 rounded-full bg-[#1A1A1A] hover:bg-[#2B2B2B] text-white text-xs font-medium transition-all duration-150 shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reconnect to Squad</span>
              </button>
            )}
          </div>
        </div>

        {/* Tactile Micro Helper Cue */}
        <p className="text-xs text-neutral-400 mt-3 text-center">
          Interactive test: Click the mic, speaker, or disconnect buttons to test the interface states.
        </p>
      </div>

      {/* Three Compact Feature Statements */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl w-full rounded-2xl p-6 sm:p-8 backdrop-blur-md bg-white/70 border border-neutral-200/80 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
        <div className="text-left">
          <h3 className="text-base font-semibold text-neutral-900 tracking-tight mb-2">
            One-tap control
          </h3>
          <p className="text-sm text-neutral-600 leading-relaxed">
            Keep essential voice controls close at hand without toggling back into an oversized window.
          </p>
        </div>

        <div className="text-left">
          <h3 className="text-base font-semibold text-neutral-900 tracking-tight mb-2">
            Out of your way
          </h3>
          <p className="text-sm text-neutral-600 leading-relaxed">
            A compact interface designed to avoid unnecessary clutter, staying invisible until you need it.
          </p>
        </div>

        <div className="text-left">
          <h3 className="text-base font-semibold text-neutral-900 tracking-tight mb-2">
            Ready when you are
          </h3>
          <p className="text-sm text-neutral-600 leading-relaxed">
            Make the essential actions easy to find with zero learning curve or confusing menus.
          </p>
        </div>
      </div>
    </section>
  );
};
