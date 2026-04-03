export interface ObserverBox {
  id: number;
  label: string;
  color: string;
}

export const OBSERVER_BOXES: ObserverBox[] = [
  { id: 1, label: "Box 1", color: "#00e5ff" },
  { id: 2, label: "Box 2", color: "#b388ff" },
  { id: 3, label: "Box 3", color: "#ffb800" },
  { id: 4, label: "Box 4", color: "#00e676" },
  { id: 5, label: "Box 5", color: "#ff2d8a" },
  { id: 6, label: "Box 6", color: "#00e5ff" },
  { id: 7, label: "Box 7", color: "#b388ff" },
  { id: 8, label: "Box 8", color: "#ffb800" },
];

export const THRESHOLD_OPTIONS = [0, 0.25, 0.5, 0.75, 1.0];

export const TAB_ITEMS = [
  { id: "observe", label: "교차 감지" },
  { id: "lazy", label: "Lazy Loading" },
  { id: "infinite", label: "무한 스크롤" },
] as const;

export type TabId = (typeof TAB_ITEMS)[number]["id"];
