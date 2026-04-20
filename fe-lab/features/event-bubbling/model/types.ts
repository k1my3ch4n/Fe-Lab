export type LogType = "capture" | "target" | "bubble" | "info" | "stopped";

export interface LogEntry {
  text: string;
  type: LogType;
}

export interface BoxConfig {
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
