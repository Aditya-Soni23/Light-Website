import React, { useState } from "react";

interface SquadMember {
  id: string;
  name: string;
  role: string;
  status: string;
  angle: number; // in degrees for circular layout
  description: string;
}

const SQUAD_MEMBERS: SquadMember[] = [
  {
    id: "maya",
    name: "Maya",
    role: "Pilot",
    status: "In the lobby",
    angle: 315, // top-left
    description: "One place to meet before the next match.",
  },
  {
    id: "devin",
    name: "Devin",
    role: "Tactics",
    status: "Ready to play",
    angle: 45, // top-right
    description: "Instant squad check-in without taking your eyes off the strategy map.",
  },
  {
    id: "ren",
    name: "Ren",
    role: "Sniper",
    status: "On a call",
    angle: 135, // bottom-right
    description: "Zero background chatter when pin-drop sound cues decide the round.",
  },
  {
    id: "sora",
    name: "Sora",
    role: "Support",
    status: "In game",
    angle: 225, // bottom-left
    description: "Effortless coordination keeping the whole team synchronized.",
  },
];

export const ConnectionSection: React.FC = () => {
  const [selectedMember, setSelectedMember] = useState<SquadMember>(SQUAD_MEMBERS[0]);
  const [hoveredMember, setHoveredMember] = useState<SquadMember | null>(null);

  const activeFocus = hoveredMember || selectedMember;

  // Geometry for orbit: Center (200, 200), radius 120
  const cx = 200;
  const cy = 200;
  const radius = 120;

  const getCoordinates = (angleDeg: number) => {
    const rad = (angleDeg * Math.PI) / 180;
    return {
      x: cx + radius * Math.cos(rad),
      y: cy + radius * Math.sin(rad),
    };
  };

  return (
    <section
      id="connection"
      data-section="connection"
      className="relative min-h-screen py-28 px-6 sm:px-8 md:px-12 max-w-7xl mx-auto flex flex-col justify-center items-center"
    >
      {/* Header Copy */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <p className="text-xs uppercase tracking-[0.2em] font-medium text-neutral-500 mb-3">
          Presence & Flow
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-[-0.03em] text-[#111827] mb-4 text-balance">
          Together, without the noise.
        </h2>
        <p className="text-base sm:text-lg text-neutral-600 font-normal leading-relaxed text-pretty">
          Stay close to your squad, keep the conversation flowing, and let the moments that matter take centre stage.
        </p>
      </div>

      {/* THE CONNECTION ORBIT Interactive Visual */}
      <div className="w-full max-w-md mx-auto flex flex-col items-center">
        <div className="relative w-[340px] h-[340px] sm:w-[400px] sm:h-[400px] select-none flex items-center justify-center">
          {/* SVG Connection Lines & Orbit Guide */}
          <svg
            viewBox="0 0 400 400"
            className="absolute inset-0 w-full h-full pointer-events-none"
            aria-hidden="true"
          >
            {/* Faint orbit circle */}
            <circle
              cx={cx}
              cy={cy}
              r={radius}
              fill="none"
              stroke="rgba(0, 0, 0, 0.05)"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />

            {/* Fine connection lines from center to nodes */}
            {SQUAD_MEMBERS.map((member) => {
              const { x, y } = getCoordinates(member.angle);
              const isSelected = selectedMember.id === member.id;
              const isHovered = hoveredMember?.id === member.id;
              const isHighlight = isSelected || isHovered;

              return (
                <line
                  key={member.id}
                  x1={cx}
                  y1={cy}
                  x2={x}
                  y2={y}
                  stroke={isHighlight ? "rgba(22, 101, 52, 0.4)" : "rgba(0, 0, 0, 0.1)"}
                  strokeWidth={isHighlight ? "2" : "1"}
                  className="transition-all duration-300"
                />
              );
            })}
          </svg>

          {/* Center Hub: "Your squad" */}
          <div
            className="relative z-10 w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white border border-neutral-200/90 shadow-[0_8px_30px_rgba(0,0,0,0.06)] flex flex-col items-center justify-center p-2 text-center transition-transform duration-300"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 mb-1.5 ring-4 ring-emerald-50" />
            <span className="text-xs font-semibold text-neutral-900 tracking-tight leading-tight">
              Your squad
            </span>
            <span className="text-[10px] text-neutral-500 font-mono mt-0.5">4 online</span>
          </div>

          {/* Interactive Participant Nodes */}
          {SQUAD_MEMBERS.map((member) => {
            const { x, y } = getCoordinates(member.angle);
            const isSelected = selectedMember.id === member.id;
            const isHovered = hoveredMember?.id === member.id;

            // Positioning as percentage of 400x400 container
            const leftPct = `${(x / 400) * 100}%`;
            const topPct = `${(y / 400) * 100}%`;

            return (
              <div
                key={member.id}
                style={{ left: leftPct, top: topPct }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
              >
                <button
                  type="button"
                  onClick={() => setSelectedMember(member)}
                  onMouseEnter={() => setHoveredMember(member)}
                  onMouseLeave={() => setHoveredMember(null)}
                  onFocus={() => setHoveredMember(member)}
                  onBlur={() => setHoveredMember(null)}
                  aria-label={`${member.name}, ${member.role}: ${member.status}`}
                  className={`group relative p-2 rounded-full transition-all duration-200 cursor-pointer ${
                    isSelected || isHovered ? "scale-110" : "scale-100 hover:scale-105"
                  }`}
                >
                  {/* Node Avatar Circle */}
                  <div
                    className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full flex flex-col items-center justify-center transition-all duration-200 ${
                      isSelected
                        ? "bg-[#1A1A1A] text-white shadow-md ring-2 ring-emerald-500/50"
                        : isHovered
                        ? "bg-neutral-800 text-white shadow-sm"
                        : "bg-white text-neutral-800 border border-neutral-200/90 shadow-xs"
                    }`}
                  >
                    <span className="text-xs font-semibold tracking-tight">{member.name[0]}</span>
                    <span className="text-[9px] opacity-75 leading-none">{member.role}</span>
                  </div>

                  {/* Micro Presence Pill On Node */}
                  <div
                    className={`absolute -bottom-1 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] px-2 py-0.5 rounded-full font-medium transition-all duration-200 shadow-xs ${
                      isSelected
                        ? "bg-emerald-600 text-white"
                        : "bg-white text-neutral-600 border border-neutral-200/80"
                    }`}
                  >
                    {member.status}
                  </div>
                </button>
              </div>
            );
          })}
        </div>

        {/* Dynamic Contextual Statement Underneath */}
        <div className="mt-8 text-center min-h-[56px] flex flex-col items-center justify-center transition-all duration-300 px-4">
          <p className="text-sm sm:text-base font-medium text-neutral-800 max-w-sm transition-opacity duration-200">
            "{activeFocus.description}"
          </p>
          <p className="text-xs text-neutral-400 mt-1">
            Interacting with <span className="font-semibold text-neutral-700">{activeFocus.name}</span> · {activeFocus.status}
          </p>
        </div>
      </div>
    </section>
  );
};
