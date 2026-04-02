export interface RenderingStep {
  label: string;
  color: string;
  start: number; // percentage
  end: number;
}

export interface RenderingPattern {
  id: string;
  label: string;
  description: string;
  steps: RenderingStep[];
  flow: string[];
}

export const RENDERING_PATTERNS: RenderingPattern[] = [
  {
    id: "csr",
    label: "CSR",
    description:
      "클라이언트 사이드 렌더링 — 빈 HTML을 받고, JS가 모든 렌더링을 담당",
    steps: [
      { label: "서버 처리", color: "#b388ff", start: 0, end: 5 },
      { label: "빈 HTML 전송", color: "#00e5ff", start: 5, end: 15 },
      { label: "JS 번들 다운로드", color: "#ffb800", start: 15, end: 50 },
      { label: "JS 실행 & 렌더링", color: "#ff2d8a", start: 50, end: 80 },
      { label: "인터랙티브", color: "#00e676", start: 80, end: 100 },
    ],
    flow: [
      "브라우저 → 서버 요청",
      "서버 → 빈 HTML + JS 번들 링크",
      "브라우저 → JS 다운로드 & 실행",
      "React → DOM 생성 & 렌더링",
      "화면 표시 + 인터랙티브",
    ],
  },
  {
    id: "ssr",
    label: "SSR",
    description: "서버 사이드 렌더링 — 서버에서 완성된 HTML을 생성하여 전송",
    steps: [
      { label: "서버 렌더링", color: "#b388ff", start: 0, end: 30 },
      { label: "완성 HTML 전송", color: "#00e5ff", start: 30, end: 45 },
      { label: "화면 표시 (FCP)", color: "#00e676", start: 45, end: 55 },
      { label: "JS Hydration", color: "#ffb800", start: 55, end: 85 },
      { label: "인터랙티브 (TTI)", color: "#00e676", start: 85, end: 100 },
    ],
    flow: [
      "브라우저 → 서버 요청",
      "서버 → React 렌더링 (renderToString)",
      "서버 → 완성된 HTML 전송",
      "브라우저 → 즉시 화면 표시",
      "JS Hydration → 인터랙티브",
    ],
  },
  {
    id: "ssg",
    label: "SSG",
    description:
      "정적 사이트 생성 — 빌드 시점에 HTML을 미리 생성, CDN에서 배포",
    steps: [
      { label: "CDN 응답", color: "#b388ff", start: 0, end: 5 },
      { label: "완성 HTML 전송", color: "#00e5ff", start: 5, end: 15 },
      { label: "화면 표시 (FCP)", color: "#00e676", start: 15, end: 25 },
      { label: "JS Hydration", color: "#ffb800", start: 25, end: 55 },
      { label: "인터랙티브 (TTI)", color: "#00e676", start: 55, end: 100 },
    ],
    flow: [
      "빌드 시 → HTML 미리 생성",
      "브라우저 → CDN에서 즉시 응답",
      "브라우저 → 완성된 HTML 표시",
      "JS Hydration → 인터랙티브",
      "데이터 변경 시 → 재빌드 필요",
    ],
  },
  {
    id: "isr",
    label: "ISR",
    description: "증분 정적 재생성 — SSG + 주기적 재생성으로 최신 데이터 반영",
    steps: [
      { label: "CDN 캐시 응답", color: "#b388ff", start: 0, end: 5 },
      { label: "완성 HTML 전송", color: "#00e5ff", start: 5, end: 15 },
      { label: "화면 표시 (FCP)", color: "#00e676", start: 15, end: 25 },
      { label: "JS Hydration", color: "#ffb800", start: 25, end: 55 },
      { label: "백그라운드 재생성", color: "#ff2d8a", start: 60, end: 85 },
    ],
    flow: [
      "빌드 시 → HTML 미리 생성 + revalidate 설정",
      "브라우저 → CDN 캐시에서 즉시 응답",
      "revalidate 시간 경과 → 백그라운드 재생성",
      "다음 요청 → 새로운 HTML 제공",
      "재빌드 없이 최신 데이터 반영",
    ],
  },
];
