export interface TimelineEvent {
  time: number;
  type: "input" | "debounce" | "throttle" | "raw";
  label: string;
}

export const DEMO_MODES = [
  {
    id: "comparison",
    label: "비교",
    description: "원본 vs 디바운스 vs 쓰로틀 호출 횟수 비교",
  },
  {
    id: "debounce",
    label: "디바운스",
    description: "마지막 이벤트 후 일정 시간 뒤 실행",
  },
  {
    id: "throttle",
    label: "쓰로틀",
    description: "일정 간격으로 최대 1회 실행",
  },
] as const;

export const DELAY_OPTIONS = [
  { label: "200ms", value: 200 },
  { label: "500ms", value: 500 },
  { label: "1000ms", value: 1000 },
] as const;
