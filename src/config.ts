/**
 * LIGHT Website Configuration
 * Central configuration for product links, downloads, and section metadata.
 */

/**
 * DOWNLOAD_URL
 * Points to the verified LIGHT Windows installer binary.
 * Automatically resolves relative to the current site base URL.
 */
const rawBase = import.meta.env.BASE_URL || "./";
const base = rawBase.endsWith("/") ? rawBase : `${rawBase}/`;
export const DOWNLOAD_URL: string = `${base}LIGHT_0.1.3_x64-setup.exe`;

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
