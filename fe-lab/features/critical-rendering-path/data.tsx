import { InlineCode } from "@shared/ui";
import type { InterviewQuestion } from "@shared/ui";

export const codeExamples = [
  {
    title: "렌더 차단 리소스 분석",
    code: `<!-- 렌더 차단: CSS는 기본적으로 렌더를 차단합니다 -->
<head>
  <!-- ❌ 렌더 차단 CSS -->
  <link rel="stylesheet" href="/styles/main.css" />
  <link rel="stylesheet" href="/styles/fonts.css" />

  <!-- ❌ 파서 차단 JS (HTML 파싱 중단) -->
  <script src="/js/app.js"></script>
</head>

<!-- 개선: media 쿼리로 조건부 로드 -->
<head>
  <!-- 모든 화면에서 렌더 차단 -->
  <link rel="stylesheet" href="/styles/main.css" />

  <!-- print 시에만 렌더 차단 (화면 렌더링 비차단) -->
  <link rel="stylesheet" href="/styles/print.css"
        media="print" />

  <!-- 큰 화면에서만 렌더 차단 -->
  <link rel="stylesheet" href="/styles/desktop.css"
        media="(min-width: 1024px)" />
</head>`,
  },
  {
    title: "리소스 힌트 (preload/prefetch)",
    code: `<head>
  <!-- preload: 현재 페이지에서 곧 필요한 리소스 -->
  <!-- 높은 우선순위로 즉시 다운로드 시작 -->
  <link rel="preload" href="/fonts/main.woff2"
        as="font" type="font/woff2" crossorigin />
  <link rel="preload" href="/styles/critical.css"
        as="style" />

  <!-- prefetch: 다음 페이지에서 필요할 리소스 -->
  <!-- 낮은 우선순위로 브라우저 유휴 시간에 다운로드 -->
  <link rel="prefetch" href="/js/next-page.js" />

  <!-- preconnect: 외부 도메인 사전 연결 -->
  <!-- DNS + TCP + TLS 핸드셰이크를 미리 수행 -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://cdn.example.com"
        crossorigin />

  <!-- dns-prefetch: DNS만 미리 조회 (preconnect 폴백) -->
  <link rel="dns-prefetch"
        href="https://analytics.example.com" />
</head>`,
  },
  {
    title: "Critical CSS 추출",
    code: `<!-- 1단계: Critical CSS를 인라인으로 삽입 -->
<head>
  <style>
    /* Above-the-fold에 필요한 최소 CSS만 인라인 */
    body { margin: 0; font-family: sans-serif; }
    .header { background: #1a1a2e; color: white; }
    .hero { min-height: 100vh; display: flex; }
  </style>

  <!-- 2단계: 나머지 CSS를 비동기로 로드 -->
  <link rel="preload" href="/styles/full.css"
        as="style"
        onload="this.onload=null;this.rel='stylesheet'" />

  <!-- JS 비활성화 폴백 -->
  <noscript>
    <link rel="stylesheet" href="/styles/full.css" />
  </noscript>
</head>

<!-- Next.js에서는 자동으로 Critical CSS를 처리 -->
<!-- next/head + CSS Modules 사용 시 최적화됨 -->`,
  },
];

export const interviewQuestions: InterviewQuestion[] = [
  {
    question: "크리티컬 렌더링 패스(CRP)란 무엇인가요?",
    answer: (
      <>
        크리티컬 렌더링 패스는 브라우저가 HTML, CSS, JavaScript를 받아{" "}
        <strong>화면에 첫 픽셀을 그리기까지</strong>의 과정입니다. 주요 단계는:
        1) HTML을 파싱하여 <InlineCode>DOM</InlineCode> 트리 생성 2) CSS를
        파싱하여 <InlineCode>CSSOM</InlineCode> 트리 생성 3) DOM + CSSOM을
        결합하여 <strong>렌더 트리</strong> 구성 4) Layout(리플로우)으로
        위치/크기 계산 5) Paint로 실제 픽셀 그리기. CRP를 최적화하면{" "}
        <InlineCode>FCP</InlineCode>(First Contentful Paint)를 단축할 수
        있습니다.
      </>
    ),
  },
  {
    question: "렌더 차단 리소스를 최소화하는 방법을 설명해주세요.",
    answer: (
      <>
        <strong>CSS 최적화</strong>: 1) Critical CSS를{" "}
        <InlineCode>{"<style>"}</InlineCode> 태그로 인라인 2) 나머지 CSS는{" "}
        <InlineCode>preload</InlineCode>로 비동기 로드 3){" "}
        <InlineCode>media</InlineCode> 속성으로 조건부 로드 (print, screen
        크기별).
        <br />
        <br />
        <strong>JS 최적화</strong>: 1) <InlineCode>async</InlineCode> 속성 —
        다운로드 중 파싱 계속, 다운로드 완료 시 즉시 실행 2){" "}
        <InlineCode>defer</InlineCode> 속성 — 다운로드 중 파싱 계속, HTML 파싱
        완료 후 실행 3) 중요하지 않은 JS는 <InlineCode>{"<body>"}</InlineCode>{" "}
        끝에 배치.
      </>
    ),
  },
  {
    question: "preload, prefetch, preconnect의 차이를 설명해주세요.",
    answer: (
      <>
        <InlineCode>preload</InlineCode>: <strong>현재 페이지</strong>에서 곧
        필요한 리소스를 높은 우선순위로 즉시 다운로드합니다. 폰트, Critical CSS,
        히어로 이미지 등에 사용합니다.
        <br />
        <br />
        <InlineCode>prefetch</InlineCode>:{" "}
        <strong>다음 탐색(네비게이션)</strong>에서 필요할 리소스를 낮은
        우선순위로 유휴 시간에 미리 다운로드합니다. 다음 페이지의 JS 번들,
        사용자가 클릭할 가능성이 높은 페이지 등에 사용합니다.
        <br />
        <br />
        <InlineCode>preconnect</InlineCode>: 외부 도메인에 대해{" "}
        <strong>DNS 조회 + TCP 연결 + TLS 핸드셰이크</strong>를 미리 수행합니다.
        CDN, 폰트 서버, API 서버 등 외부 출처에 사용합니다.
      </>
    ),
  },
];
