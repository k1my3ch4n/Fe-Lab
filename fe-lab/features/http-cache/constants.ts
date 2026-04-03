import type { CacheScenario, CacheStatus } from "./types";

export const CACHE_SCENARIOS: CacheScenario[] = [
  {
    id: "no-cache",
    label: "캐시 없음",
    description:
      "매 요청마다 서버에서 새로운 응답을 받습니다. Cache-Control: no-store 헤더로 캐싱을 완전히 비활성화합니다.",
    steps: [
      {
        actor: "browser",
        label: "GET /data",
        headers: [{ key: "Cache-Control", value: "no-store" }],
        description: "브라우저가 서버에 요청을 보냅니다.",
      },
      {
        actor: "cache",
        label: "캐시 건너뜀",
        status: "MISS",
        description: "no-store 지시어로 인해 캐시를 저장하지 않습니다.",
      },
      {
        actor: "server",
        label: "200 OK",
        headers: [
          { key: "Cache-Control", value: "no-store" },
          { key: "Content-Type", value: "application/json" },
        ],
        description: "서버가 새로운 응답을 반환합니다.",
      },
      {
        actor: "browser",
        label: "두 번째 GET /data",
        description: "다시 요청 시에도 서버로 직접 전달됩니다.",
      },
      {
        actor: "server",
        label: "200 OK (매번 새 응답)",
        status: "MISS",
        headers: [{ key: "Cache-Control", value: "no-store" }],
        description: "항상 서버에서 최신 데이터를 가져옵니다.",
      },
    ],
  },
  {
    id: "max-age",
    label: "Cache-Control: max-age",
    description:
      "지정된 시간(초) 동안 캐시된 응답을 사용합니다. 만료 전에는 서버 요청 없이 즉시 응답합니다.",
    steps: [
      {
        actor: "browser",
        label: "GET /data",
        description: "첫 번째 요청을 서버에 보냅니다.",
      },
      {
        actor: "server",
        label: "200 OK",
        headers: [
          { key: "Cache-Control", value: "max-age=3600" },
          { key: "Content-Type", value: "application/json" },
        ],
        description: "서버가 1시간(3600초) 캐시를 지시합니다.",
      },
      {
        actor: "cache",
        label: "응답 저장",
        status: "MISS",
        description: "캐시에 응답을 저장합니다. TTL: 3600초",
      },
      {
        actor: "browser",
        label: "GET /data (30분 후)",
        description: "캐시가 아직 유효한 상태에서 재요청합니다.",
      },
      {
        actor: "cache",
        label: "캐시에서 응답",
        status: "HIT",
        headers: [{ key: "Age", value: "1800" }],
        description: "서버 요청 없이 캐시된 응답을 즉시 반환합니다.",
      },
    ],
  },
  {
    id: "etag",
    label: "ETag 검증",
    description:
      'ETag와 If-None-Match 헤더를 사용한 조건부 요청입니다. 리소스가 변경되지 않았으면 "304 Not Modified"로 응답합니다.',
    steps: [
      {
        actor: "browser",
        label: "GET /data",
        description: "첫 번째 요청을 서버에 보냅니다.",
      },
      {
        actor: "server",
        label: "200 OK",
        headers: [
          { key: "ETag", value: '"abc123"' },
          { key: "Cache-Control", value: "no-cache" },
        ],
        description: "서버가 ETag 값과 함께 응답합니다.",
      },
      {
        actor: "cache",
        label: "응답 + ETag 저장",
        status: "MISS",
        description: "캐시에 응답과 ETag를 함께 저장합니다.",
      },
      {
        actor: "browser",
        label: "GET /data (재요청)",
        headers: [{ key: "If-None-Match", value: '"abc123"' }],
        description: "저장된 ETag를 조건부 요청 헤더로 전송합니다.",
      },
      {
        actor: "server",
        label: "304 Not Modified",
        status: "REVALIDATE",
        headers: [{ key: "ETag", value: '"abc123"' }],
        description: "리소스가 변경되지 않아 본문 없이 응답합니다.",
      },
    ],
  },
  {
    id: "swr",
    label: "stale-while-revalidate",
    description:
      "만료된 캐시를 즉시 반환하면서 백그라운드에서 새로운 데이터를 가져옵니다. 사용자 경험과 데이터 신선도를 모두 확보합니다.",
    steps: [
      {
        actor: "browser",
        label: "GET /data",
        description: "첫 번째 요청을 서버에 보냅니다.",
      },
      {
        actor: "server",
        label: "200 OK",
        headers: [
          {
            key: "Cache-Control",
            value: "max-age=60, stale-while-revalidate=120",
          },
        ],
        description: "60초간 신선, 이후 120초간 재검증하며 사용 가능합니다.",
      },
      {
        actor: "cache",
        label: "응답 저장",
        status: "MISS",
        description: "캐시에 응답을 저장합니다. fresh: 60초, stale: 120초",
      },
      {
        actor: "browser",
        label: "GET /data (90초 후)",
        description: "캐시가 stale 상태에서 요청합니다.",
      },
      {
        actor: "cache",
        label: "stale 캐시 즉시 반환",
        status: "REVALIDATE",
        description:
          "만료된 캐시를 먼저 반환하고 백그라운드에서 서버에 재검증 요청을 보냅니다.",
      },
    ],
  },
];

export const TABS = CACHE_SCENARIOS.map((x) => ({ id: x.id, label: x.label }));

export const STATUS_COLORS: Record<
  CacheStatus,
  { bg: string; text: string; label: string }
> = {
  HIT: { bg: "bg-accent-green-dim", text: "text-accent-green", label: "HIT" },
  MISS: {
    bg: "bg-accent-magenta-dim",
    text: "text-accent-magenta",
    label: "MISS",
  },
  REVALIDATE: {
    bg: "bg-accent-amber-dim",
    text: "text-accent-amber",
    label: "REVALIDATE",
  },
};

export const ACTOR_CONFIG: Record<string, { label: string; color: string }> = {
  browser: { label: "Browser", color: "#00e5ff" },
  cache: { label: "Cache", color: "#ffb800" },
  server: { label: "Server", color: "#b388ff" },
};
