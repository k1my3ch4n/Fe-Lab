export interface HeaderPair {
  name: string;
  value: string;
  side: "request" | "response";
  color: string;
}

export interface CorsStep {
  label: string;
  direction: "right" | "left";
  headers: HeaderPair[];
  description: string;
}

export interface CorsScenario {
  id: string;
  label: string;
  success: boolean;
  steps: CorsStep[];
  summary: string;
}

export const CORS_SCENARIOS: CorsScenario[] = [
  {
    id: "simple",
    label: "Simple Request",
    success: true,
    steps: [
      {
        label: "GET 요청 전송",
        direction: "right",
        headers: [
          {
            name: "Origin",
            value: "https://app.example.com",
            side: "request",
            color: "#00e5ff",
          },
          { name: "Method", value: "GET", side: "request", color: "#00e5ff" },
        ],
        description:
          "브라우저가 Origin 헤더를 자동으로 포함하여 요청을 전송합니다.",
      },
      {
        label: "응답 + CORS 허용",
        direction: "left",
        headers: [
          {
            name: "Access-Control-Allow-Origin",
            value: "https://app.example.com",
            side: "response",
            color: "#00e676",
          },
        ],
        description:
          "서버가 Access-Control-Allow-Origin 헤더로 허용된 출처를 응답합니다.",
      },
    ],
    summary: "GET, HEAD, POST(단순) 요청은 Preflight 없이 바로 전송됩니다.",
  },
  {
    id: "preflight",
    label: "Preflight (OPTIONS)",
    success: true,
    steps: [
      {
        label: "OPTIONS Preflight 전송",
        direction: "right",
        headers: [
          {
            name: "Origin",
            value: "https://app.example.com",
            side: "request",
            color: "#00e5ff",
          },
          {
            name: "Access-Control-Request-Method",
            value: "PUT",
            side: "request",
            color: "#b388ff",
          },
          {
            name: "Access-Control-Request-Headers",
            value: "Content-Type, Authorization",
            side: "request",
            color: "#b388ff",
          },
        ],
        description:
          "브라우저가 실제 요청 전에 OPTIONS 메서드로 사전 확인 요청을 보냅니다.",
      },
      {
        label: "Preflight 응답",
        direction: "left",
        headers: [
          {
            name: "Access-Control-Allow-Origin",
            value: "https://app.example.com",
            side: "response",
            color: "#00e676",
          },
          {
            name: "Access-Control-Allow-Methods",
            value: "GET, PUT, DELETE",
            side: "response",
            color: "#00e676",
          },
          {
            name: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization",
            side: "response",
            color: "#00e676",
          },
          {
            name: "Access-Control-Max-Age",
            value: "86400",
            side: "response",
            color: "#ffb800",
          },
        ],
        description: "서버가 허용된 메서드, 헤더, 캐시 시간을 응답합니다.",
      },
      {
        label: "실제 PUT 요청 전송",
        direction: "right",
        headers: [
          {
            name: "Origin",
            value: "https://app.example.com",
            side: "request",
            color: "#00e5ff",
          },
          { name: "Method", value: "PUT", side: "request", color: "#00e5ff" },
          {
            name: "Authorization",
            value: "Bearer token...",
            side: "request",
            color: "#b388ff",
          },
        ],
        description: "Preflight 허용 후, 브라우저가 실제 요청을 전송합니다.",
      },
      {
        label: "실제 응답",
        direction: "left",
        headers: [
          {
            name: "Access-Control-Allow-Origin",
            value: "https://app.example.com",
            side: "response",
            color: "#00e676",
          },
        ],
        description: "서버가 정상적으로 응답합니다.",
      },
    ],
    summary:
      "PUT, DELETE, 커스텀 헤더 등 '비단순' 요청은 사전 검증(Preflight)이 필요합니다.",
  },
  {
    id: "error",
    label: "CORS 에러",
    success: false,
    steps: [
      {
        label: "GET 요청 전송",
        direction: "right",
        headers: [
          {
            name: "Origin",
            value: "https://app.example.com",
            side: "request",
            color: "#00e5ff",
          },
          { name: "Method", value: "GET", side: "request", color: "#00e5ff" },
        ],
        description: "브라우저가 Origin 헤더를 포함하여 요청을 전송합니다.",
      },
      {
        label: "CORS 헤더 누락 응답",
        direction: "left",
        headers: [
          {
            name: "Access-Control-Allow-Origin",
            value: "(없음)",
            side: "response",
            color: "#ff2d8a",
          },
        ],
        description:
          "서버가 CORS 헤더 없이 응답하거나 다른 Origin을 허용합니다.",
      },
    ],
    summary:
      "서버가 적절한 CORS 헤더를 포함하지 않으면 브라우저가 응답을 차단합니다.",
  },
];
