import type { CRPScenario, TimelineResource } from "./types";

export const RESOURCE_COLORS: Record<TimelineResource["type"], string> = {
  html: "#60a5fa", // blue
  css: "#f472b6", // pink
  js: "#fbbf24", // amber
  render: "#34d399", // green
};

export const RESOURCE_LABELS: Record<TimelineResource["type"], string> = {
  html: "HTML 파싱",
  css: "CSS 다운로드/파싱",
  js: "JS 다운로드/실행",
  render: "렌더",
};

export const CRP_SCENARIOS: CRPScenario[] = [
  {
    id: "before",
    label: "최적화 전",
    description:
      "렌더 차단 CSS와 파서 차단 JS가 모두 <head>에 위치. CSS와 JS가 순차적으로 로드되어 렌더링이 크게 지연됩니다.",
    resources: [
      { label: "HTML 파싱 (1차)", type: "html", start: 0, end: 10 },
      { label: "CSS 다운로드 (blocking)", type: "css", start: 10, end: 30 },
      { label: "CSS 파싱 (CSSOM)", type: "css", start: 30, end: 35 },
      { label: "JS 다운로드 (blocking)", type: "js", start: 35, end: 55 },
      { label: "JS 실행", type: "js", start: 55, end: 65 },
      { label: "HTML 파싱 (재개)", type: "html", start: 65, end: 75 },
      { label: "렌더 트리 구성 + 페인트", type: "render", start: 75, end: 90 },
    ],
    fcp: 90,
  },
  {
    id: "css-optimized",
    label: "CSS 최적화",
    description:
      "Critical CSS를 인라인으로 삽입하고, 나머지 CSS는 preload로 비동기 로드. 초기 렌더링에 필요한 CSS만 즉시 적용됩니다.",
    resources: [
      { label: "HTML 파싱 + inline CSS", type: "html", start: 0, end: 12 },
      { label: "CSS preload (비동기)", type: "css", start: 5, end: 25 },
      { label: "JS 다운로드 (blocking)", type: "js", start: 12, end: 32 },
      { label: "JS 실행", type: "js", start: 32, end: 42 },
      { label: "HTML 파싱 (재개)", type: "html", start: 42, end: 50 },
      { label: "렌더 트리 구성 + 페인트", type: "render", start: 50, end: 62 },
    ],
    fcp: 62,
  },
  {
    id: "js-optimized",
    label: "JS 최적화",
    description:
      "JS에 async/defer 속성을 적용하여 HTML 파싱을 차단하지 않음. JS 다운로드가 HTML 파싱과 병렬로 진행됩니다.",
    resources: [
      { label: "HTML 파싱 (1차)", type: "html", start: 0, end: 10 },
      { label: "CSS 다운로드 (blocking)", type: "css", start: 10, end: 30 },
      { label: "CSS 파싱 (CSSOM)", type: "css", start: 30, end: 35 },
      { label: "JS 다운로드 (async)", type: "js", start: 10, end: 30 },
      { label: "HTML 파싱 (재개)", type: "html", start: 35, end: 45 },
      { label: "렌더 트리 구성 + 페인트", type: "render", start: 45, end: 57 },
      { label: "JS 실행 (defer)", type: "js", start: 57, end: 67 },
    ],
    fcp: 57,
  },
  {
    id: "fully-optimized",
    label: "전체 최적화",
    description:
      "Critical CSS 인라인 + preload + async/defer JS + preconnect. 모든 최적화를 적용하여 FCP를 최소화합니다.",
    resources: [
      { label: "HTML 파싱 + inline CSS", type: "html", start: 0, end: 12 },
      { label: "CSS preload (비동기)", type: "css", start: 3, end: 20 },
      { label: "JS 다운로드 (async)", type: "js", start: 3, end: 18 },
      { label: "렌더 트리 구성 + 페인트", type: "render", start: 12, end: 24 },
      { label: "JS 실행 (defer)", type: "js", start: 24, end: 32 },
    ],
    fcp: 24,
  },
];

export const TIMELINE_MAX = 100;
