import React, { useState } from "react";
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Send,
  MessageSquare,
  Radio,
  Wifi,
  Hash,
  ChevronRight,
  Sparkles,
} from "lucide-react";

interface Message {
  id: string;
  sender: string;
  avatarColor: string;
  time: string;
  text: string;
  isSelf?: boolean;
}

interface ChannelData {
  id: string;
  name: string;
  topic: string;
  voiceActiveCount: number;
  messages: Message[];
  voiceMembers: { name: string; status: string; isSpeaking: boolean; muted?: boolean }[];
}

const SAMPLE_CHANNELS: Record<string, ChannelData> = {
  "raid-prep": {
    id: "raid-prep",
    name: "raid-prep",
    topic: "Encounter timing & loadout notes",
    voiceActiveCount: 3,
    messages: [
      {
        id: "m1",
        sender: "Kaelen",
        avatarColor: "bg-stone-300",
        time: "10:41 PM",
        text: "Boss enrage timer is 6:30. We hold supers until the second stun phase.",
      },
      {
        id: "m2",
        sender: "Vesper",
        avatarColor: "bg-emerald-200",
        time: "10:42 PM",
        text: "I swapped to heavy ammo finder. We should have clean rotation now.",
      },
      {
        id: "m3",
        sender: "You",
        avatarColor: "bg-neutral-800",
        time: "10:43 PM",
        text: "Copy that. Audio is locked in. Let's run it.",
        isSelf: true,
      },
    ],
    voiceMembers: [
      { name: "Kaelen", status: "Speaking", isSpeaking: true },
      { name: "Vesper", status: "Connected", isSpeaking: false },
      { name: "You", status: "Connected", isSpeaking: false },
    ],
  },
  "casual-duos": {
    id: "casual-duos",
    name: "casual-duos",
    topic: "Chill drop spots & weekly challenges",
    voiceActiveCount: 2,
    messages: [
      {
        id: "m4",
        sender: "Milo",
        avatarColor: "bg-amber-200",
        time: "9:15 PM",
        text: "Dropping observatory east side, grabbing shield batteries first.",
      },
      {
        id: "m5",
        sender: "You",
        avatarColor: "bg-neutral-800",
        time: "9:16 PM",
        text: "Covering your roof flank right now.",
        isSelf: true,
      },
    ],
    voiceMembers: [
      { name: "Milo", status: "Speaking", isSpeaking: true },
      { name: "You", status: "Connected", isSpeaking: false },
    ],
  },
  "scrim-review": {
    id: "scrim-review",
    name: "scrim-review",
    topic: "Vod timestamps & positioning debrief",
    voiceActiveCount: 1,
    messages: [
      {
        id: "m6",
        sender: "Aria",
        avatarColor: "bg-indigo-200",
        time: "7:20 PM",
        text: "Round 4 rotation was 4 seconds late because of the crossfire.",
      },
      {
        id: "m7",
        sender: "Aria",
        avatarColor: "bg-indigo-200",
        time: "7:21 PM",
        text: "Next time we smoke the catwalk before taking the site.",
      },
    ],
    voiceMembers: [
      { name: "Aria", status: "Listening", isSpeaking: false, muted: true },
      { name: "You", status: "Connected", isSpeaking: false },
    ],
  },
};

export const InterfaceSection: React.FC = () => {
  const [activeChannelId, setActiveChannelId] = useState<string>("raid-prep");
  const [activeTab, setActiveTab] = useState<"messages" | "voice">("messages");
  const [composerText, setComposerText] = useState("");
  const [channelsData, setChannelsData] = useState(SAMPLE_CHANNELS);
  const [isSelfMuted, setIsSelfMuted] = useState(false);
  const [isDeafened, setIsDeafened] = useState(false);

  const currentChannel = channelsData[activeChannelId] || channelsData["raid-prep"];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!composerText.trim()) return;

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      sender: "You",
      avatarColor: "bg-neutral-800",
      time: "Just now",
      text: composerText.trim(),
      isSelf: true,
    };

    setChannelsData((prev) => ({
      ...prev,
      [activeChannelId]: {
        ...prev[activeChannelId],
        messages: [...prev[activeChannelId].messages, newMessage],
      },
    }));

    setComposerText("");
  };

  return (
    <section
      id="interface"
      data-section="interface"
      className="relative min-h-screen py-24 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto flex flex-col justify-center items-center"
    >
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <p className="text-xs uppercase tracking-[0.2em] font-medium text-neutral-500 mb-3">
          Designed for Clarity
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-[-0.03em] text-[#111827] mb-4 text-balance">
          Everything you need. Nothing you don't.
        </h2>
        <p className="text-base sm:text-lg text-neutral-600 font-normal leading-relaxed text-pretty">
          Your conversations, your people, your games — brought together in one beautifully simple place.
        </p>
      </div>

      {/* Realistic Desktop App Mock Window */}
      <div className="w-full max-w-4xl bg-[#FFFFFF] rounded-2xl border border-neutral-200/90 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08),0_1px_3px_rgba(0,0,0,0.04)] overflow-hidden transition-all duration-300">
        {/* Window Chrome / Titlebar */}
        <div className="h-10 px-4 bg-neutral-50/90 border-b border-neutral-200/80 flex items-center justify-between select-none">
          {/* Window control dots */}
          <div className="flex items-center gap-1.5 w-20">
            <span className="w-2.5 h-2.5 rounded-full bg-neutral-300 hover:bg-red-400 transition-colors" />
            <span className="w-2.5 h-2.5 rounded-full bg-neutral-300 hover:bg-amber-400 transition-colors" />
            <span className="w-2.5 h-2.5 rounded-full bg-neutral-300 hover:bg-emerald-400 transition-colors" />
          </div>

          {/* Window Title & Connection Status */}
          <div className="flex items-center gap-2 text-xs font-medium text-neutral-600">
            <span className="text-neutral-900 font-semibold tracking-tight">LIGHT</span>
            <span className="text-neutral-300">/</span>
            <span className="truncate max-w-[140px] sm:max-w-xs text-neutral-500">#{currentChannel.name}</span>
          </div>

          {/* Audio latency indicator */}
          <div className="flex items-center gap-1.5 text-[11px] text-neutral-500 font-mono tabular-nums">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="hidden sm:inline">18ms</span>
          </div>
        </div>

        {/* Application Body */}
        <div className="grid grid-cols-1 md:grid-cols-12 min-h-[460px]">
          {/* Left Column: Channels & Squad Rooms */}
          <div className="md:col-span-4 bg-[#F8F9FA] border-b md:border-b-0 md:border-r border-neutral-200/80 p-3 sm:p-4 flex flex-col justify-between">
            <div>
              {/* Squad Header */}
              <div className="flex items-center justify-between px-2 py-1.5 mb-3">
                <span className="text-xs font-semibold text-neutral-800 tracking-tight">SQUAD CHANNELS</span>
                <span className="text-[10px] text-neutral-400 uppercase font-mono">Sample</span>
              </div>

              {/* Channel Selector Buttons */}
              <div className="space-y-1" role="tablist" aria-label="Channels">
                {Object.values(channelsData).map((ch) => {
                  const isSelected = activeChannelId === ch.id;
                  return (
                    <button
                      key={ch.id}
                      type="button"
                      role="tab"
                      aria-selected={isSelected}
                      onClick={() => setActiveChannelId(ch.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs transition-all duration-150 cursor-pointer ${
                        isSelected
                          ? "bg-white text-neutral-900 font-medium shadow-xs border border-neutral-200/80"
                          : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100/60"
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <Hash className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                        <span className="truncate">{ch.name}</span>
                      </div>
                      <span className="text-[10px] text-neutral-400 font-mono tabular-nums">
                        {ch.voiceActiveCount} voice
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Subtle Direct Voice Box */}
              <div className="mt-6 pt-4 border-t border-neutral-200/70">
                <div className="text-[11px] font-medium text-neutral-500 uppercase tracking-wider px-2 mb-2">
                  Voice Room
                </div>
                <div className="p-2.5 bg-white rounded-xl border border-neutral-200/80 space-y-2">
                  <div className="flex items-center justify-between text-xs font-medium text-neutral-800">
                    <span className="flex items-center gap-1.5">
                      <Radio className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{currentChannel.name}</span>
                    </span>
                    <span className="text-[10px] text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-sm font-medium">
                      Live
                    </span>
                  </div>

                  {/* Active voice speakers */}
                  <div className="space-y-1.5 pt-1">
                    {currentChannel.voiceMembers.map((member, i) => (
                      <div key={i} className="flex items-center justify-between text-[11px] text-neutral-600">
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-2 h-2 rounded-full transition-transform ${
                              member.isSpeaking
                                ? "bg-emerald-500 ring-2 ring-emerald-200 scale-110"
                                : "bg-neutral-300"
                            }`}
                          />
                          <span className={member.name === "You" ? "font-semibold text-neutral-900" : ""}>
                            {member.name}
                          </span>
                        </div>
                        <span className="text-neutral-400 text-[10px]">{member.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom User Audio Bar inside Mock App */}
            <div className="mt-4 pt-3 border-t border-neutral-200/80 flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-neutral-800 text-white text-[10px] font-medium flex items-center justify-center">
                  U
                </div>
                <div className="text-left">
                  <p className="text-xs font-semibold text-neutral-900 leading-none">You</p>
                  <p className="text-[10px] text-neutral-500 leading-tight">Ready</p>
                </div>
              </div>

              {/* Functional mock toggles */}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setIsSelfMuted(!isSelfMuted)}
                  className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                    isSelfMuted
                      ? "text-red-600 bg-red-50 hover:bg-red-100"
                      : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/70"
                  }`}
                  title={isSelfMuted ? "Unmute microphone" : "Mute microphone"}
                  aria-label={isSelfMuted ? "Unmute microphone" : "Mute microphone"}
                >
                  {isSelfMuted ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
                </button>
                <button
                  type="button"
                  onClick={() => setIsDeafened(!isDeafened)}
                  className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                    isDeafened
                      ? "text-red-600 bg-red-50 hover:bg-red-100"
                      : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/70"
                  }`}
                  title={isDeafened ? "Undeafen audio" : "Deafen audio"}
                  aria-label={isDeafened ? "Undeafen audio" : "Deafen audio"}
                >
                  {isDeafened ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Chat & Conversation View */}
          <div className="md:col-span-8 bg-white flex flex-col justify-between p-4 sm:p-6">
            {/* Top Channel Subheader & Interactive Tab Switcher */}
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                <div>
                  <h3 className="text-sm font-semibold text-neutral-900 flex items-center gap-1.5">
                    <span>#{currentChannel.name}</span>
                  </h3>
                  <p className="text-xs text-neutral-500">{currentChannel.topic}</p>
                </div>

                {/* Tab Switcher: Messages vs Voice */}
                <div className="flex items-center gap-1 p-0.5 bg-neutral-100 rounded-lg text-xs">
                  <button
                    type="button"
                    onClick={() => setActiveTab("messages")}
                    className={`px-2.5 py-1 rounded-md transition-all duration-150 cursor-pointer flex items-center gap-1.5 ${
                      activeTab === "messages"
                        ? "bg-white text-neutral-900 font-medium shadow-xs"
                        : "text-neutral-500 hover:text-neutral-800"
                    }`}
                  >
                    <MessageSquare className="w-3 h-3" />
                    <span>Messages</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("voice")}
                    className={`px-2.5 py-1 rounded-md transition-all duration-150 cursor-pointer flex items-center gap-1.5 ${
                      activeTab === "voice"
                        ? "bg-white text-neutral-900 font-medium shadow-xs"
                        : "text-neutral-500 hover:text-neutral-800"
                    }`}
                  >
                    <Radio className="w-3 h-3" />
                    <span>Voice ({currentChannel.voiceMembers.length})</span>
                  </button>
                </div>
              </div>

              {/* View Content: Messages OR Voice Overview */}
              {activeTab === "messages" ? (
                <div className="py-4 space-y-4 max-h-[260px] overflow-y-auto pr-1">
                  {currentChannel.messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex items-start gap-2.5 ${msg.isSelf ? "justify-end" : "justify-start"}`}
                    >
                      {!msg.isSelf && (
                        <div
                          className={`w-7 h-7 rounded-full ${msg.avatarColor} text-neutral-800 text-[10px] font-semibold flex items-center justify-center shrink-0`}
                        >
                          {msg.sender[0]}
                        </div>
                      )}
                      <div className={`max-w-[80%] ${msg.isSelf ? "text-right" : "text-left"}`}>
                        <div className="flex items-baseline gap-2 mb-1">
                          <span className="text-xs font-medium text-neutral-800">{msg.sender}</span>
                          <span className="text-[10px] text-neutral-400 font-mono tabular-nums">{msg.time}</span>
                        </div>
                        <div
                          className={`text-xs px-3 py-2 rounded-xl inline-block leading-relaxed ${
                            msg.isSelf
                              ? "bg-neutral-900 text-white rounded-br-xs"
                              : "bg-[#F3F4F6] text-neutral-800 rounded-bl-xs"
                          }`}
                        >
                          {msg.text}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* Voice Channel Room View */
                <div className="py-6 space-y-3">
                  <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200/70">
                    <div className="flex items-center justify-between text-xs text-neutral-700 mb-2">
                      <span className="font-medium">Active Room Participants</span>
                      <span className="text-[10px] text-neutral-500">Sub-20ms Opus Engine</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {currentChannel.voiceMembers.map((member, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between p-2.5 bg-white rounded-lg border border-neutral-200/80"
                        >
                          <div className="flex items-center gap-2">
                            <div className="relative">
                              <div className="w-7 h-7 rounded-full bg-neutral-200 flex items-center justify-center text-xs font-semibold text-neutral-700">
                                {member.name[0]}
                              </div>
                              {member.isSpeaking && (
                                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
                              )}
                            </div>
                            <span className="text-xs font-medium text-neutral-800">{member.name}</span>
                          </div>
                          <span className="text-[11px] text-neutral-500">{member.status}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <p className="text-[11px] text-neutral-500 italic text-center">
                    LIGHT runs cleanly in the tray. No overlay interference, no dropped frames.
                  </p>
                </div>
              )}
            </div>

            {/* Message Composer (interactive local demo) */}
            <form onSubmit={handleSendMessage} className="mt-4 pt-3 border-t border-neutral-100 flex items-center gap-2">
              <input
                type="text"
                value={composerText}
                onChange={(e) => setComposerText(e.target.value)}
                placeholder={`Message #${currentChannel.name}...`}
                className="flex-1 px-3.5 py-2 text-xs rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-900 placeholder:text-neutral-400 focus:bg-white focus:border-neutral-400 focus:outline-none transition-colors"
              />
              <button
                type="submit"
                disabled={!composerText.trim()}
                aria-label="Send sample message"
                className="p-2 rounded-xl bg-neutral-900 text-white hover:bg-neutral-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
