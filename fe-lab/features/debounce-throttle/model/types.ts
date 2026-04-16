export interface TimelineEvent {
  time: number;
  type: "input" | "debounce" | "throttle" | "raw";
  label: string;
}
