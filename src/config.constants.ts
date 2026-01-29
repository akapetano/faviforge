import type { IconConfig } from "./config.js";

export const DEFAULT_SIZES: IconConfig[] = [
  { name: "icon-16x16.png", size: 16 },
  { name: "icon-32x32.png", size: 32 },
  { name: "apple-touch-icon.png", size: 180 },
  { name: "android-chrome-192x192.png", size: 192 },
  { name: "android-chrome-512x512.png", size: 512 },
];

// Optional: Add dark mode sizes as a separate export
export const DARK_MODE_SIZES: IconConfig[] = [
  { name: "apple-touch-icon-dark.png", size: 180 },
  { name: "android-chrome-192x192-dark.png", size: 192 },
  { name: "android-chrome-512x512-dark.png", size: 512 },
];
