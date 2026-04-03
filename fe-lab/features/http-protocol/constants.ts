import type { ProtocolFlow } from "./types";

export const PROTOCOL_FLOWS: ProtocolFlow[] = [
  {
    version: { id: "http1", label: "HTTP/1.1", color: "#ffb800" },
    description: "순차적 요청, keep-alive로 커넥션 재사용",
    features: ["Keep-Alive", "파이프라이닝 (제한적)", "텍스트 기반 프로토콜"],
    steps: [
      { label: "TCP 연결", duration: 50, color: "#ffb800" },
      { label: "TLS 핸드셰이크", duration: 80, color: "#ff2d8a" },
      { label: "요청 1", duration: 120, color: "#00e5ff" },
      { label: "요청 2 (대기)", duration: 120, color: "#00e5ff" },
      { label: "요청 3 (대기)", duration: 120, color: "#00e5ff" },
    ],
    totalTime: 490,
  },
  {
    version: { id: "http2", label: "HTTP/2", color: "#00e5ff" },
    description: "멀티플렉싱으로 동시 요청 처리",
    features: [
      "멀티플렉싱",
      "헤더 압축 (HPACK)",
      "서버 푸시",
      "바이너리 프레이밍",
    ],
    steps: [
      { label: "TCP 연결", duration: 50, color: "#ffb800" },
      { label: "TLS 핸드셰이크", duration: 80, color: "#ff2d8a" },
      { label: "요청 1·2·3 (동시)", duration: 120, color: "#00e5ff" },
    ],
    totalTime: 250,
  },
  {
    version: { id: "http3", label: "HTTP/3", color: "#00e676" },
    description: "QUIC 기반, 0-RTT 연결 가능",
    features: ["QUIC (UDP 기반)", "0-RTT 연결", "독립 스트림", "내장 TLS 1.3"],
    steps: [
      { label: "QUIC + TLS (통합)", duration: 50, color: "#00e676" },
      { label: "요청 1·2·3 (동시)", duration: 120, color: "#00e5ff" },
    ],
    totalTime: 170,
  },
];

export const TLS_HANDSHAKE_STEPS = [
  {
    label: "Client Hello",
    description: "지원하는 암호화 방식 전송",
    color: "#00e5ff",
  },
  {
    label: "Server Hello",
    description: "인증서 + 선택된 암호화 전송",
    color: "#00e676",
  },
  { label: "키 교환", description: "대칭 키 생성 및 공유", color: "#ffb800" },
  {
    label: "암호화 통신",
    description: "대칭 키로 데이터 암호화",
    color: "#b388ff",
  },
];
