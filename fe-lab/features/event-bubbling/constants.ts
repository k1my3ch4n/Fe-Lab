export type LogType = "capture" | "target" | "bubble" | "info" | "stopped";

export interface LogEntry {
  text: string;
  type: LogType;
}

export const LOG_TYPE_STYLES: Record<LogType, string> = {
  capture: "text-accent-violet bg-accent-violet-dim",
  target: "text-accent-amber bg-accent-amber-dim",
  bubble: "text-accent-green bg-accent-green-dim",
  info: "text-text-muted",
  stopped: "text-accent-magenta bg-accent-magenta-dim",
};

export const ELEMENTS = [
  { id: "box-window", name: "window" },
  { id: "box-document", name: "document" },
  { id: "box-parent", name: "div.parent" },
  { id: "box-button", name: "button" },
] as const;

export const ANIM_DELAY = 300;

interface BoxConfig {
  id: string;
  label: string;
  color: string;
  size: string;
  defaultBorder: string;
  defaultBg: string;
  flashBorder: string;
  flashShadow: string;
  flashBg: string;
}

export const BOX_CONFIGS: BoxConfig[] = [
  {
    id: "box-window",
    label: "window",
    color: "text-accent-violet",
    size: "w-[340px] h-[310px]",
    defaultBorder: "border-[#b388ff44]",
    defaultBg: "bg-[#1e1044]",
    flashBorder: "border-accent-violet",
    flashShadow: "shadow-[0_0_30px_#b388ff22]",
    flashBg: "bg-[#b388ff18]",
  },
  {
    id: "box-document",
    label: "document",
    color: "text-accent-cyan",
    size: "w-[280px] h-[250px]",
    defaultBorder: "border-[#00e5ff33]",
    defaultBg: "bg-[#0d2a3a]",
    flashBorder: "border-accent-cyan",
    flashShadow: "shadow-[0_0_30px_#00e5ff22]",
    flashBg: "bg-[#00e5ff12]",
  },
  {
    id: "box-parent",
    label: "div.parent",
    color: "text-accent-green",
    size: "w-[220px] h-[190px]",
    defaultBorder: "border-[#00e67633]",
    defaultBg: "bg-[#1a2e1a]",
    flashBorder: "border-accent-green",
    flashShadow: "shadow-[0_0_30px_#00e67622]",
    flashBg: "bg-[#00e67612]",
  },
];
