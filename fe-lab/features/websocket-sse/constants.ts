export type ProtocolType = "websocket" | "sse" | "long-polling";

export interface ProtocolInfo {
  id: ProtocolType;
  label: string;
  fullName: string;
  direction: string;
  protocol: string;
  connectionFlow: string[];
  messagePattern: string;
  useCases: string[];
  pros: string[];
  cons: string[];
  color: string;
}

export const PROTOCOLS: ProtocolInfo[] = [
  {
    id: "websocket",
    label: "WebSocket",
    fullName: "WebSocket (RFC 6455)",
    direction: "양방향 (Full-Duplex)",
    protocol: "ws:// / wss://",
    connectionFlow: [
      "클라이언트 → HTTP Upgrade 요청",
      "서버 → 101 Switching Protocols 응답",
      "TCP 연결 위에 WebSocket 프레임 교환",
      "양쪽 모두 자유롭게 메시지 전송 가능",
    ],
    messagePattern: "클라이언트 ↔ 서버 (양방향 실시간)",
    useCases: [
      "채팅 애플리케이션",
      "실시간 게임",
      "공동 편집 (Google Docs)",
      "실시간 트레이딩",
    ],
    pros: [
      "양방향 통신 가능",
      "낮은 지연 시간 (Low Latency)",
      "프레임 기반으로 오버헤드 적음",
    ],
    cons: [
      "구현 복잡도 높음",
      "로드 밸런서 설정 필요",
      "Stateful 연결 관리 필요",
    ],
    color: "#00e5ff",
  },
  {
    id: "sse",
    label: "SSE",
    fullName: "Server-Sent Events (SSE)",
    direction: "단방향 (서버 → 클라이언트)",
    protocol: "HTTP/HTTPS (text/event-stream)",
    connectionFlow: [
      "클라이언트 → 일반 HTTP GET 요청",
      "서버 → Content-Type: text/event-stream 응답",
      "서버가 연결을 열어두고 이벤트 스트리밍",
      "클라이언트는 EventSource API로 수신",
    ],
    messagePattern: "서버 → 클라이언트 (단방향 스트리밍)",
    useCases: [
      "실시간 알림/피드",
      "주식 시세 업데이트",
      "빌드/배포 로그 스트리밍",
      "AI 응답 스트리밍 (ChatGPT)",
    ],
    pros: [
      "HTTP 기반으로 구현 간단",
      "자동 재연결 내장",
      "기존 인프라 그대로 사용",
    ],
    cons: [
      "서버→클라이언트 단방향만 가능",
      "텍스트 데이터만 전송",
      "브라우저당 연결 수 제한 (6개)",
    ],
    color: "#00e676",
  },
  {
    id: "long-polling",
    label: "Long Polling",
    fullName: "Long Polling (HTTP)",
    direction: "유사 양방향 (반이중)",
    protocol: "HTTP/HTTPS",
    connectionFlow: [
      "클라이언트 → HTTP 요청 전송",
      "서버 → 새 데이터가 올 때까지 응답 보류",
      "데이터 발생 시 응답 전송",
      "클라이언트 → 즉시 다음 요청 전송 (반복)",
    ],
    messagePattern: "클라이언트 → 요청 → 서버 대기 → 응답 (반복)",
    useCases: [
      "WebSocket/SSE 미지원 환경 폴백",
      "간헐적 업데이트 (이메일 알림)",
      "레거시 시스템 호환",
    ],
    pros: [
      "모든 브라우저/서버 지원",
      "구현이 직관적",
      "HTTP 인프라 그대로 사용",
    ],
    cons: [
      "매 응답마다 HTTP 헤더 오버헤드",
      "서버 리소스 낭비 (대기 연결)",
      "지연 시간 불안정",
    ],
    color: "#ffb800",
  },
];

export interface ComparisonRow {
  label: string;
  websocket: string;
  sse: string;
  longPolling: string;
}

export const COMPARISON_TABLE: ComparisonRow[] = [
  {
    label: "통신 방향",
    websocket: "양방향 (Full-Duplex)",
    sse: "단방향 (서버→클라이언트)",
    longPolling: "유사 양방향 (Half-Duplex)",
  },
  {
    label: "프로토콜",
    websocket: "ws:// / wss://",
    sse: "HTTP (text/event-stream)",
    longPolling: "HTTP",
  },
  {
    label: "자동 재연결",
    websocket: "직접 구현 필요",
    sse: "내장 지원",
    longPolling: "직접 구현 필요",
  },
  {
    label: "바이너리 데이터",
    websocket: "지원",
    sse: "미지원 (텍스트만)",
    longPolling: "지원",
  },
  {
    label: "HTTP 헤더 오버헤드",
    websocket: "최초 핸드셰이크만",
    sse: "최초 연결만",
    longPolling: "매 요청마다",
  },
  {
    label: "브라우저 지원",
    websocket: "모든 모던 브라우저",
    sse: "IE 제외 모든 브라우저",
    longPolling: "모든 브라우저",
  },
  {
    label: "적합한 사용",
    websocket: "채팅, 게임, 협업 도구",
    sse: "알림, 피드, AI 스트리밍",
    longPolling: "폴백, 레거시 시스템",
  },
];

export interface SimMessage {
  id: number;
  from: "client" | "server";
  text: string;
  timestamp: number;
}

export const WS_SCENARIO: Omit<SimMessage, "id" | "timestamp">[] = [
  { from: "client", text: "connect: ws://api.example.com" },
  { from: "server", text: "101 Switching Protocols" },
  { from: "client", text: '{"type":"join","room":"chat-1"}' },
  { from: "server", text: '{"type":"welcome","users":3}' },
  { from: "client", text: '{"type":"msg","text":"안녕하세요!"}' },
  { from: "server", text: '{"type":"msg","from":"Kim","text":"안녕하세요!"}' },
  { from: "server", text: '{"type":"msg","from":"Lee","text":"반갑습니다!"}' },
  { from: "client", text: '{"type":"msg","text":"실시간 통신!"}' },
  { from: "server", text: '{"type":"broadcast","text":"실시간 통신!"}' },
];

export const SSE_SCENARIO: Omit<SimMessage, "id" | "timestamp">[] = [
  { from: "client", text: "GET /events (Accept: text/event-stream)" },
  { from: "server", text: "200 OK (Content-Type: text/event-stream)" },
  { from: "server", text: "event: notification\ndata: 새 알림이 도착했습니다" },
  { from: "server", text: 'event: price\ndata: {"AAPL": 178.50}' },
  { from: "server", text: 'event: price\ndata: {"AAPL": 179.20}' },
  { from: "server", text: ": heartbeat (keep-alive)" },
  { from: "server", text: "event: notification\ndata: 주문이 완료되었습니다" },
  { from: "server", text: 'event: price\ndata: {"AAPL": 179.85}' },
];
