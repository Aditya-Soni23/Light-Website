/**
 * LIGHT Website Configuration
 * Central configuration for product links, downloads, and section metadata.
 */

/**
 * DOWNLOAD_URL
 * Leave empty or set to the official installer URL when ready.
 * If empty, the download button provides a friendly notification that the release candidate is preparing.
 */
export const DOWNLOAD_URL: string = "/LIGHT_0.1.3_x64-setup.exe";

/**
 * Product metadata and confirmed specifications
 */
export const PRODUCT_CONFIG = {
  name: "LIGHT",
  tagline: "Voice chat that feels effortless.",
  brandStatement: "Less in the way. More in the game.",
  installerSize: "Approx. 5 MB",
  platform: "Windows 10 / 11 (64-bit)",
  version: "0.1.3",
  privacyStatement:
    "LIGHT is designed with data minimalism. No telemetry trackers, no background voice sampling, and no bloat.",
};

export interface NavItem {
  label: string;
  targetId: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Experience", targetId: "experience" },
  { label: "Features", targetId: "interface" },
  { label: "Connection", targetId: "connection" },
  { label: "Voice", targetId: "voice" },
  { label: "Download", targetId: "download" },
];

export const SECTIONS = [
  { id: "experience", title: "The Problem and the Promise" },
  { id: "interface", title: "The Interface" },
  { id: "connection", title: "The Feeling of Connection" },
  { id: "voice", title: "Voice Chat, Made Simple" },
  { id: "download", title: "The Product Reveal" },
] as const;

export type SectionId = (typeof SECTIONS)[number]["id"];
