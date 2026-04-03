import { InlineCode } from "@shared/ui";
import type { InterviewQuestion } from "@shared/ui";

export const codeExamples = [
  {
    title: "Performance API 활용",
    code: `// Resource Timing API
const resources = performance.getEntriesByType('resource');

resources.forEach(entry => {
  console.log(entry.name);
  console.log('DNS:', entry.domainLookupEnd
    - entry.domainLookupStart, 'ms');
  console.log('TCP:', entry.connectEnd
    - entry.connectStart, 'ms');
  console.log('TLS:', entry.connectEnd
    - entry.secureConnectionStart, 'ms');
  console.log('TTFB:', entry.responseStart
    - entry.requestStart, 'ms');
  console.log('Download:', entry.responseEnd
    - entry.responseStart, 'ms');
  console.log('Total:', entry.duration, 'ms');
});

// Navigation Timing
const nav = performance.getEntriesByType('navigation')[0];
console.log('DOM Interactive:', nav.domInteractive);
console.log('DOM Complete:', nav.domComplete);
console.log('Load Event:', nav.loadEventEnd);`,
  },
  {
    title: "Resource Timing 분석",
    code: `// 느린 리소스 자동 탐지
function findSlowResources(threshold = 1000) {
  return performance
    .getEntriesByType('resource')
    .filter(e => e.duration > threshold)
    .map(e => ({
      name: e.name,
      duration: Math.round(e.duration),
      ttfb: Math.round(
        e.responseStart - e.requestStart
      ),
      download: Math.round(
        e.responseEnd - e.responseStart
      ),
      size: e.transferSize,
    }))
    .sort((a, b) => b.duration - a.duration);
}

// PerformanceObserver로 실시간 모니터링
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    if (entry.duration > 500) {
      console.warn('Slow resource:', entry.name,
        entry.duration + 'ms');
    }
  }
});
observer.observe({ type: 'resource', buffered: true });`,
  },
  {
    title: "Lighthouse 핵심 지표 (Core Web Vitals)",
    code: `// LCP (Largest Contentful Paint)
// → 가장 큰 콘텐츠가 렌더링되는 시간
new PerformanceObserver((list) => {
  const entries = list.getEntries();
  const lcp = entries[entries.length - 1];
  console.log('LCP:', lcp.startTime); // < 2.5s 권장
}).observe({ type: 'largest-contentful-paint' });

// FID → INP (Interaction to Next Paint)
// → 사용자 상호작용 응답 시간
new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    console.log('INP:', entry.duration); // < 200ms 권장
  }
}).observe({ type: 'event', buffered: true });

// CLS (Cumulative Layout Shift)
// → 레이아웃 변경 누적 점수
let cls = 0;
new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    if (!entry.hadRecentInput) {
      cls += entry.value;
    }
  }
  console.log('CLS:', cls); // < 0.1 권장
}).observe({ type: 'layout-shift', buffered: true });`,
  },
];

export const interviewQuestions: InterviewQuestion[] = [
  {
    question: "네트워크 병목과 CPU 병목을 어떻게 구분하나요?",
    answer: (
      <>
        <strong>네트워크 병목</strong>은 DevTools Network 탭에서 TTFB가 길거나,
        Download 시간이 긴 경우, 많은 요청이 Stalled 상태인 경우에 나타납니다.
        <strong>CPU 병목</strong>은 네트워크는 빠르지만 렌더링이 느리고,
        Performance 탭에서 Long Task(50ms+)가 감지되며 메인 스레드가 블로킹되는
        경우입니다. 네트워크 병목은 CDN, 압축, 코드 스플리팅으로, CPU 병목은
        코드 최적화, Web Worker, 지연 로딩으로 해결합니다.
      </>
    ),
  },
  {
    question: "개발자 도구 네트워크 탭의 워터폴을 어떻게 읽나요?",
    answer: (
      <>
        워터폴의 각 막대는 리소스 로딩 단계를 나타냅니다.
        <strong>DNS</strong>: 도메인 → IP 변환,
        <strong>TCP</strong>: 3-way handshake,
        <strong>TLS</strong>: 암호화 핸드셰이크,
        <strong>TTFB</strong>(Time to First Byte): 서버 처리 시간,
        <strong>Download</strong>: 콘텐츠 다운로드입니다. TTFB가 길면 서버
        최적화가, Download가 길면 파일 크기 최적화가 필요합니다.
        <InlineCode size="md">Stalled</InlineCode>는 브라우저 커넥션 제한으로
        대기하는 시간입니다.
      </>
    ),
  },
  {
    question: "HTTP 상태 코드별 응답 흐름을 설명해주세요.",
    answer: (
      <>
        <strong>2xx (성공)</strong>: 200 OK, 201 Created, 204 No Content.
        <strong>3xx (리다이렉트)</strong>: 301 영구 이동(캐시됨), 302 임시 이동,
        304 Not Modified(캐시 사용).
        <strong>4xx (클라이언트 오류)</strong>: 400 잘못된 요청, 401 인증 필요,
        403 권한 없음, 404 리소스 없음.
        <strong>5xx (서버 오류)</strong>: 500 서버 내부 오류, 502 게이트웨이
        오류, 503 서비스 중단. 특히 401(인증 안 됨)과 403(인증됨, 권한 없음)의
        차이를 명확히 알아야 합니다.
      </>
    ),
  },
];
