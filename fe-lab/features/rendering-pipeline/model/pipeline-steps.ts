import type { PipelineStep } from "./types";

export const pipelineData: PipelineStep[] = [
  {
    icon: "\u{1F50D}",
    name: "DNS 조회",
    time: "~20-120ms",
    color: "#00e5ff",
    title: "DNS 조회 (DNS Lookup)",
    desc: "브라우저가 도메인 이름(예: google.com)을 IP 주소로 변환합니다. 먼저 브라우저 캐시 → OS 캐시 → 라우터 캐시 → ISP DNS 서버 순으로 확인하고, 없으면 재귀적 DNS 조회를 수행합니다.",
    visual:
      "google.com\n    ↓ 브라우저 캐시 ❌\n    ↓ OS 캐시 ❌\n    ↓ ISP DNS 서버\n    ↓ Root → .com → google.com\n    → 142.250.196.110 ✓",
  },
  {
    icon: "\u{1F91D}",
    name: "TCP 연결",
    time: "~30-100ms",
    color: "#b388ff",
    title: "TCP 연결 (3-way Handshake)",
    desc: "클라이언트와 서버 간 신뢰할 수 있는 연결을 수립합니다. HTTPS의 경우 추가로 TLS 핸드셰이크가 진행되어 암호화 통신 채널을 만듭니다.",
    visual:
      "Client          Server\n  ├── SYN ──────→│\n  │←── SYN+ACK ──┤\n  ├── ACK ──────→│\n  │   연결 수립 ✓   │\n  ├── TLS Hello →│  (HTTPS)\n  │←── 인증서 ────┤\n  │   암호화 완료 ✓  │",
  },
  {
    icon: "\u{1F4E8}",
    name: "HTTP 요청",
    time: "~10-50ms",
    color: "#ffb800",
    title: "HTTP 요청/응답",
    desc: "브라우저가 서버에 HTML 문서를 요청합니다. 서버는 요청을 처리하고 HTML 응답을 보냅니다. 응답 헤더에는 캐시 정책, 콘텐츠 타입 등 메타데이터가 포함됩니다.",
    visual:
      "GET / HTTP/2\nHost: google.com\nAccept: text/html\n\n← HTTP/2 200 OK\n← Content-Type: text/html\n← Cache-Control: max-age=3600\n← Content-Length: 45KB\n← [HTML 데이터...]",
  },
  {
    icon: "\u{1F333}",
    name: "DOM 파싱",
    time: "~50-200ms",
    color: "#00e676",
    title: "HTML 파싱 → DOM 트리",
    desc: "HTML 바이트를 토큰화하고, 토큰을 노드로 변환하여 DOM 트리를 구성합니다. <script> 태그를 만나면 파싱을 중단하고 JS를 실행합니다 (렌더 차단).",
    visual:
      "   document\n   ├── html\n   │   ├── head\n   │   │   ├── meta\n   │   │   ├── title\n   │   │   └── link[stylesheet]\n   │   └── body\n   │       ├── div#app\n   │       │   ├── h1\n   │       │   └── p\n   │       └── script[src]",
  },
  {
    icon: "\u{1F3A8}",
    name: "CSSOM",
    time: "~30-100ms",
    color: "#ff2d8a",
    title: "CSS 파싱 → CSSOM 트리",
    desc: "CSS를 파싱하여 CSSOM(CSS Object Model) 트리를 구성합니다. CSS는 렌더 차단 리소스이므로, CSSOM이 완성되기 전까지 렌더링이 진행되지 않습니다.",
    visual:
      "   CSSOM\n   ├── body\n   │   font-size: 16px\n   │   color: #333\n   ├── h1\n   │   font-size: 2em\n   │   font-weight: bold\n   ├── .container\n   │   max-width: 1200px\n   │   margin: 0 auto\n   └── #app\n       display: flex",
  },
  {
    icon: "\u{1F517}",
    name: "렌더 트리",
    time: "~10-30ms",
    color: "#00e5ff",
    title: "DOM + CSSOM → 렌더 트리",
    desc: "DOM과 CSSOM을 결합하여 화면에 실제로 표시될 요소만 포함하는 렌더 트리를 생성합니다. display: none인 요소는 포함되지 않습니다.",
    visual:
      "   DOM          CSSOM\n    │              │\n    └──── 결합 ────┘\n           ↓\n     Render Tree\n     ├── body {font: 16px}\n     │   ├── h1 {font: 2em, bold}\n     │   └── p {color: #333}\n     │\n     ✕ display:none 제외\n     ✕ <head> 내용 제외",
  },
  {
    icon: "\u{1F4D0}",
    name: "레이아웃",
    time: "~10-50ms",
    color: "#b388ff",
    title: "레이아웃 (Layout / Reflow)",
    desc: "렌더 트리의 각 노드에 대해 뷰포트 내 정확한 위치와 크기를 계산합니다. 상대적 단위(%,em)를 절대적 픽셀 값으로 변환합니다.",
    visual:
      "  ┌─ viewport: 1920 x 1080 ──────┐\n  │                                │\n  │  ┌─ body: 1920 x auto ──────┐ │\n  │  │                            │ │\n  │  │  ┌─ h1: 1920 x 44px ──┐  │ │\n  │  │  └─ x:0, y:0 ─────────┘  │ │\n  │  │  ┌─ p: 1920 x 24px ───┐  │ │\n  │  │  └─ x:0, y:52px ──────┘  │ │\n  │  └────────────────────────────┘ │\n  └────────────────────────────────┘",
  },
  {
    icon: "\u{1F58C}\u{FE0F}",
    name: "페인트",
    time: "~10-50ms",
    color: "#ffb800",
    title: "페인트 (Paint)",
    desc: "레이아웃 결과를 바탕으로 실제 픽셀을 그립니다. 텍스트, 색상, 이미지, 그림자, 보더 등 시각적 요소를 레이어별로 래스터화합니다.",
    visual:
      "  Paint Order:\n  1. 배경색/이미지    ████████████\n  2. 보더             ┌──────────┐\n  3. 텍스트           Hello World\n  4. 그림자           ░░░░░░░░░░░\n  5. 아웃라인         ╔══════════╗\n\n  → Layer 1: 배경\n  → Layer 2: 콘텐츠\n  → Layer 3: 오버레이",
  },
  {
    icon: "\u{1F9E9}",
    name: "합성",
    time: "~5-10ms",
    color: "#00e676",
    title: "합성 (Compositing)",
    desc: "여러 레이어를 올바른 순서로 합성하여 최종 화면을 만듭니다. GPU가 이 작업을 처리하며, transform/opacity 애니메이션이 여기서 처리되어 성능이 좋습니다.",
    visual:
      "  ┌── Layer 3 (overlay) ──────┐\n  │  z-index: 100, opacity: 0.8│\n  ├── Layer 2 (content) ──────┤\n  │  position: relative        │\n  ├── Layer 1 (background) ───┤\n  │  will-change: transform    │\n  └───────────────────────────┘\n         ↓ GPU 합성\n  ┌── Final Frame ────────────┐\n  │  ██████ 완성된 화면 ██████  │\n  └───────────────────────────┘",
  },
  {
    icon: "\u{2705}",
    name: "완료",
    time: "FCP",
    color: "#00e676",
    title: "First Contentful Paint (FCP)",
    desc: "사용자가 처음으로 의미 있는 콘텐츠를 볼 수 있는 시점입니다! 이 시점까지의 시간을 줄이는 것이 웹 성능 최적화의 핵심 목표입니다.",
    visual:
      "  Performance Metrics:\n  ┌─────────────────────────────┐\n  │ TTFB         ████░░░░░░░░░  │\n  │ FCP          ████████░░░░░  │\n  │ LCP          ██████████░░░  │\n  │ TTI          ████████████░  │\n  │ CLS          ░░░░░░░░░░░░░  │\n  └─────────────────────────────┘\n  목표: FCP < 1.8s, LCP < 2.5s",
  },
];
