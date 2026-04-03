import type { ResourceEntry, StatusCode } from "./types";

export const WATERFALL_RESOURCES: ResourceEntry[] = [
  {
    name: "index.html",
    type: "document",
    phases: [
      {
        name: "DNS",
        duration: 20,
        color: "#00e676",
        description: "도메인 → IP 변환",
      },
      {
        name: "TCP",
        duration: 15,
        color: "#ffb800",
        description: "TCP 3-way handshake",
      },
      {
        name: "TLS",
        duration: 30,
        color: "#ff2d8a",
        description: "TLS 핸드셰이크",
      },
      {
        name: "TTFB",
        duration: 80,
        color: "#b388ff",
        description: "서버 처리 시간",
      },
      {
        name: "Download",
        duration: 10,
        color: "#00e5ff",
        description: "콘텐츠 다운로드",
      },
    ],
    totalTime: 155,
    size: "5.2KB",
  },
  {
    name: "style.css",
    type: "stylesheet",
    phases: [
      { name: "Stalled", duration: 5, color: "#666", description: "연결 대기" },
      {
        name: "TTFB",
        duration: 45,
        color: "#b388ff",
        description: "서버 처리 시간",
      },
      {
        name: "Download",
        duration: 15,
        color: "#00e5ff",
        description: "콘텐츠 다운로드",
      },
    ],
    totalTime: 65,
    size: "18KB",
  },
  {
    name: "app.js",
    type: "script",
    phases: [
      { name: "Stalled", duration: 8, color: "#666", description: "연결 대기" },
      {
        name: "TTFB",
        duration: 60,
        color: "#b388ff",
        description: "서버 처리 시간",
      },
      {
        name: "Download",
        duration: 120,
        color: "#00e5ff",
        description: "콘텐츠 다운로드",
      },
    ],
    totalTime: 188,
    size: "245KB",
  },
  {
    name: "api/data",
    type: "xhr",
    phases: [
      {
        name: "Stalled",
        duration: 10,
        color: "#666",
        description: "연결 대기",
      },
      {
        name: "TTFB",
        duration: 200,
        color: "#b388ff",
        description: "서버 처리 시간",
      },
      {
        name: "Download",
        duration: 5,
        color: "#00e5ff",
        description: "콘텐츠 다운로드",
      },
    ],
    totalTime: 215,
    size: "1.8KB",
  },
  {
    name: "hero.webp",
    type: "image",
    phases: [
      {
        name: "Stalled",
        duration: 15,
        color: "#666",
        description: "연결 대기",
      },
      {
        name: "TTFB",
        duration: 30,
        color: "#b388ff",
        description: "서버 처리 시간",
      },
      {
        name: "Download",
        duration: 90,
        color: "#00e5ff",
        description: "콘텐츠 다운로드",
      },
    ],
    totalTime: 135,
    size: "85KB",
  },
];

export const STATUS_CODES: StatusCode[] = [
  {
    code: 200,
    name: "OK",
    category: "Success",
    description: "요청 성공",
    color: "#00e676",
  },
  {
    code: 201,
    name: "Created",
    category: "Success",
    description: "리소스 생성 완료",
    color: "#00e676",
  },
  {
    code: 204,
    name: "No Content",
    category: "Success",
    description: "성공하나 응답 본문 없음",
    color: "#00e676",
  },
  {
    code: 301,
    name: "Moved Permanently",
    category: "Redirect",
    description: "영구 이동 (캐시됨)",
    color: "#00e5ff",
  },
  {
    code: 302,
    name: "Found",
    category: "Redirect",
    description: "임시 이동",
    color: "#00e5ff",
  },
  {
    code: 304,
    name: "Not Modified",
    category: "Redirect",
    description: "캐시 사용 (변경 없음)",
    color: "#00e5ff",
  },
  {
    code: 400,
    name: "Bad Request",
    category: "Client Error",
    description: "잘못된 요청",
    color: "#ffb800",
  },
  {
    code: 401,
    name: "Unauthorized",
    category: "Client Error",
    description: "인증 필요",
    color: "#ffb800",
  },
  {
    code: 403,
    name: "Forbidden",
    category: "Client Error",
    description: "권한 없음 (인증됨)",
    color: "#ffb800",
  },
  {
    code: 404,
    name: "Not Found",
    category: "Client Error",
    description: "리소스 없음",
    color: "#ffb800",
  },
  {
    code: 500,
    name: "Internal Server Error",
    category: "Server Error",
    description: "서버 내부 오류",
    color: "#ff2d8a",
  },
  {
    code: 502,
    name: "Bad Gateway",
    category: "Server Error",
    description: "게이트웨이 오류",
    color: "#ff2d8a",
  },
  {
    code: 503,
    name: "Service Unavailable",
    category: "Server Error",
    description: "서비스 일시 중단",
    color: "#ff2d8a",
  },
];

export const PHASE_LEGEND: { name: string; color: string }[] = [
  { name: "DNS", color: "#00e676" },
  { name: "TCP", color: "#ffb800" },
  { name: "TLS", color: "#ff2d8a" },
  { name: "TTFB", color: "#b388ff" },
  { name: "Download", color: "#00e5ff" },
  { name: "Stalled", color: "#666" },
];
