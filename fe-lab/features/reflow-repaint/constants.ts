import type { CostLevel, CSSPropertyInfo, PipelineStage } from "./types";

/** Layout properties -- trigger reflow (Style → Layout → Paint → Composite) */
const LAYOUT_PROPERTIES: CSSPropertyInfo[] = [
  {
    name: "width",
    label: "width",
    triggeredStages: ["style", "layout", "paint", "composite"],
    cost: "expensive",
    category: "layout",
  },
  {
    name: "margin",
    label: "margin",
    triggeredStages: ["style", "layout", "paint", "composite"],
    cost: "expensive",
    category: "layout",
  },
  {
    name: "padding",
    label: "padding",
    triggeredStages: ["style", "layout", "paint", "composite"],
    cost: "expensive",
    category: "layout",
  },
];

/** Paint-only properties -- trigger repaint (Style → Paint → Composite) */
const PAINT_PROPERTIES: CSSPropertyInfo[] = [
  {
    name: "color",
    label: "color",
    triggeredStages: ["style", "paint", "composite"],
    cost: "moderate",
    category: "paint",
  },
  {
    name: "background",
    label: "background-color",
    triggeredStages: ["style", "paint", "composite"],
    cost: "moderate",
    category: "paint",
  },
  {
    name: "boxShadow",
    label: "box-shadow",
    triggeredStages: ["style", "paint", "composite"],
    cost: "moderate",
    category: "paint",
  },
];

/** Composite-only properties -- GPU accelerated (Style → Composite) */
const COMPOSITE_PROPERTIES: CSSPropertyInfo[] = [
  {
    name: "transform",
    label: "transform",
    triggeredStages: ["style", "composite"],
    cost: "good",
    category: "composite",
  },
  {
    name: "opacity",
    label: "opacity",
    triggeredStages: ["style", "composite"],
    cost: "good",
    category: "composite",
  },
];

export const CSS_PROPERTIES: CSSPropertyInfo[] = [
  ...LAYOUT_PROPERTIES,
  ...PAINT_PROPERTIES,
  ...COMPOSITE_PROPERTIES,
];

export const PIPELINE_STAGES: { id: PipelineStage; label: string }[] = [
  { id: "style", label: "Style" },
  { id: "layout", label: "Layout" },
  { id: "paint", label: "Paint" },
  { id: "composite", label: "Composite" },
];

export const CATEGORY_META: Record<
  CSSPropertyInfo["category"],
  { label: string; color: string }
> = {
  layout: { label: "Layout (리플로우)", color: "#ff2d8a" },
  paint: { label: "Paint (리페인트)", color: "#ffb800" },
  composite: { label: "Composite (GPU)", color: "#00e676" },
};

export const COST_META: Record<CostLevel, { label: string; color: string }> = {
  expensive: { label: "비용 높음", color: "#ff2d8a" },
  moderate: { label: "보통", color: "#ffb800" },
  good: { label: "최적", color: "#00e676" },
};
