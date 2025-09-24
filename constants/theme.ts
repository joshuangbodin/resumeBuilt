import { Platform } from "react-native";

const tintColorLight = "#2563EB"; // primary blue
const tintColorDark = "#3B82F6"; // softer blue for dark
const accentLight = "#EC4899"; // pink
const accentDark = "#F472B6"; // softer pink

export const Colors = {
  light: {
    text: "#11181C",
    textMuted: "#6B7280",
    subtleText: "#9CA3AF", // lighter gray for placeholders & subtle labels
    background: "#FFFFFF",
    card: "#F9FAFB",
    border: "#E5E7EB", // subtle gray border
    tint: tintColorLight,
    accent: accentLight,
    icon: "#687076",
    tabIconDefault: "#9CA3AF",
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: "#ECEDEE",
    textMuted: "#9CA3AF",
    subtleText: "#6B7280", // darker muted gray for placeholders in dark mode
    background: "#0F1115",
    card: "#151718",
    border: "#2A2D34", // subtle neutral border for dark mode
    tint: tintColorDark,
    accent: accentDark,
    icon: "#9BA1A6",
    tabIconDefault: "#6B7280",
    tabIconSelected: tintColorDark,
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: "system-ui",
    serif: "ui-serif",
    rounded: "ui-rounded",
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
