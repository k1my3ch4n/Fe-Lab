import type { Breakpoint, LayoutMode } from "./types";

export const BREAKPOINTS: Breakpoint[] = [
  {
    name: "xs",
    minWidth: 0,
    maxWidth: 479,
    label: "Mobile S",
    color: "#ff2d8a",
    icon: "📱",
  },
  {
    name: "sm",
    minWidth: 480,
    maxWidth: 639,
    label: "Mobile L",
    color: "#ffb800",
    icon: "📱",
  },
  {
    name: "md",
    minWidth: 640,
    maxWidth: 767,
    label: "Tablet",
    color: "#00e676",
    icon: "📱",
  },
  {
    name: "lg",
    minWidth: 768,
    maxWidth: 1023,
    label: "Laptop",
    color: "#00e5ff",
    icon: "💻",
  },
  {
    name: "xl",
    minWidth: 1024,
    maxWidth: 1279,
    label: "Desktop",
    color: "#b388ff",
    icon: "🖥",
  },
  {
    name: "2xl",
    minWidth: 1280,
    maxWidth: 9999,
    label: "Wide",
    color: "#00e5ff",
    icon: "🖥",
  },
];

export const VIEWPORT_PRESETS = [
  { label: "iPhone SE", width: 375 },
  { label: "iPhone 14", width: 390 },
  { label: "iPad Mini", width: 744 },
  { label: "iPad Pro", width: 1024 },
  { label: "MacBook", width: 1440 },
] as const;

export const LAYOUT_MODES: LayoutMode[] = [
  {
    id: "media-query",
    label: "미디어 쿼리",
    description: "전통적인 breakpoint 기반 반응형",
  },
  { id: "clamp", label: "clamp()", description: "유동적 타이포그래피와 간격" },
  {
    id: "container",
    label: "Container Query",
    description: "부모 컨테이너 기반 반응형",
  },
];
