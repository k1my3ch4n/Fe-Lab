export const JUSTIFY_OPTIONS = [
  "flex-start",
  "flex-end",
  "center",
  "space-between",
  "space-around",
  "space-evenly",
] as const;

export const ALIGN_OPTIONS = [
  "flex-start",
  "flex-end",
  "center",
  "stretch",
  "baseline",
] as const;

export const DIRECTION_OPTIONS = [
  "row",
  "row-reverse",
  "column",
  "column-reverse",
] as const;

export const WRAP_OPTIONS = ["nowrap", "wrap", "wrap-reverse"] as const;

export const GRID_TEMPLATE_OPTIONS = [
  { label: "1fr 1fr 1fr", value: "1fr 1fr 1fr" },
  { label: "1fr 2fr 1fr", value: "1fr 2fr 1fr" },
  { label: "repeat(4, 1fr)", value: "repeat(4, 1fr)" },
  { label: "200px 1fr", value: "200px 1fr" },
  { label: "auto 1fr auto", value: "auto 1fr auto" },
] as const;

export const DEMO_ITEMS = [
  { label: "A", color: "#00e5ff" },
  { label: "B", color: "#b388ff" },
  { label: "C", color: "#00e676" },
  { label: "D", color: "#ffb800" },
  { label: "E", color: "#ff2d8a" },
  { label: "F", color: "#00e5ff" },
];
