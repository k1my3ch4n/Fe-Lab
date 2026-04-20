import { InlineCode } from "@shared/ui";
import type { InterviewQuestion } from "@shared/ui";

export const codeExamples = [
  {
    title: "DOMContentLoaded vs load",
    code: `// DOM 트리 구성 완료 시 (이미지/스타일시트 로딩 전)
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM 준비 완료!');
  // DOM 조작 가능
  document.querySelector('#app').textContent = 'Hello';
});

// 모든 리소스(이미지, 스타일시트 등) 로딩 완료 시
window.addEventListener('load', () => {
  console.log('모든 리소스 로딩 완료!');
  // 이미지 크기 등 접근 가능
  const img = document.querySelector('img');
  console.log(img.naturalWidth);
});`,
  },
  {
    title: "defer / async 스크립트",
    code: `<!-- 렌더 차단: 파싱 중단 후 즉시 실행 -->
<script src="blocking.js"></script>

<!-- async: 다운로드 병렬, 다운로드 완료 즉시 실행 -->
<!-- 실행 순서 보장 X → 독립적 스크립트에 적합 -->
<script async src="analytics.js"></script>
<script async src="ads.js"></script>

<!-- defer: 다운로드 병렬, DOM 파싱 완료 후 실행 -->
<!-- 실행 순서 보장 O → 의존성 있는 스크립트에 적합 -->
<script defer src="vendor.js"></script>
<script defer src="app.js"></script>`,
  },
  {
    title: "Critical CSS 인라인",
    code: `<!-- ❌ 외부 CSS는 렌더 차단 리소스 -->
<link rel="stylesheet" href="styles.css">

<!-- ✅ Critical CSS를 인라인으로 삽입 -->
<head>
  <style>
    /* 첫 화면에 필요한 최소 CSS만 인라인 */
    body { margin: 0; font: 16px sans-serif; }
    .hero { min-height: 100vh; display: flex; }
    .nav { position: fixed; top: 0; width: 100%; }
  </style>
  <!-- 나머지 CSS는 비동기 로드 -->
  <link rel="preload" href="full.css" as="style"
        onload="this.rel='stylesheet'">
</head>`,
  },
];

export const interviewQuestions: InterviewQuestion[] = [
  {
    question: "브라우저 주소창에 URL을 입력하면 어떤 일이 일어나나요?",
    answer: (
      <>
        1. DNS 조회로 도메인을 IP로 변환 → 2. TCP 3-way handshake (HTTPS면 TLS
        핸드셰이크 추가) → 3. HTTP 요청 전송 → 4. HTML 응답 수신 → 5. HTML
        파싱하여 DOM 트리 구성 → 6. CSS 파싱하여 CSSOM 구성 → 7. DOM + CSSOM
        결합하여 렌더 트리 생성 → 8. 레이아웃(각 요소의 위치/크기 계산) → 9.
        페인트(픽셀 그리기) → 10. 합성(레이어 조합하여 화면 표시)
      </>
    ),
  },
  {
    question: "리플로우(Reflow)와 리페인트(Repaint)의 차이와 성능 영향은?",
    answer: (
      <>
        <strong>리플로우</strong>는 레이아웃(위치/크기)이 변경될 때 발생합니다.
        리플로우가 발생하면 반드시 리페인트도 뒤따릅니다.{" "}
        <InlineCode>width</InlineCode>, <InlineCode>height</InlineCode>,{" "}
        <InlineCode>margin</InlineCode> 변경 시 발생합니다.
        <br />
        <br />
        <strong>리페인트</strong>는 시각적 속성만 변경될 때 발생합니다.{" "}
        <InlineCode>color</InlineCode>, <InlineCode>background</InlineCode>,{" "}
        <InlineCode>visibility</InlineCode> 변경 시 리플로우 없이 리페인트만
        발생합니다.
        <br />
        <br />
        최적화: <InlineCode>transform</InlineCode>과{" "}
        <InlineCode>opacity</InlineCode>는 합성(Composite) 단계에서만 처리되어
        리플로우/리페인트를 건너뜁니다.
      </>
    ),
  },
  {
    question: "크리티컬 렌더링 패스(Critical Rendering Path) 최적화 방법은?",
    answer: (
      <>
        1. CSS는 <InlineCode>{"<head>"}</InlineCode>에 배치 (렌더 차단 리소스){" "}
        2. JS는 <InlineCode>{"<body>"}</InlineCode> 하단 또는{" "}
        <InlineCode>defer/async</InlineCode> 사용 3. 중요 CSS를 인라인으로 삽입{" "}
        4. 불필요한 CSS/JS를 제거하여 크리티컬 리소스 최소화 5. 리소스 압축
        (gzip/brotli) 및 캐시 활용 6. <InlineCode>preload</InlineCode>,{" "}
        <InlineCode>prefetch</InlineCode>로 중요 리소스 우선 로드
      </>
    ),
  },
];
