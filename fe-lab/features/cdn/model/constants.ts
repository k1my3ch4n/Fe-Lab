import type { EdgeServer, CacheResult } from "./types";

export const EDGE_SERVERS: EdgeServer[] = [
  {
    id: "seoul",
    name: "Seoul",
    region: "Asia",
    x: 78,
    y: 35,
    color: "#00e5ff",
  },
  {
    id: "tokyo",
    name: "Tokyo",
    region: "Asia",
    x: 85,
    y: 38,
    color: "#00e5ff",
  },
  {
    id: "singapore",
    name: "Singapore",
    region: "Asia",
    x: 72,
    y: 58,
    color: "#00e5ff",
  },
  {
    id: "mumbai",
    name: "Mumbai",
    region: "Asia",
    x: 62,
    y: 48,
    color: "#00e5ff",
  },
  {
    id: "frankfurt",
    name: "Frankfurt",
    region: "Europe",
    x: 40,
    y: 30,
    color: "#b388ff",
  },
  {
    id: "london",
    name: "London",
    region: "Europe",
    x: 36,
    y: 28,
    color: "#b388ff",
  },
  {
    id: "virginia",
    name: "Virginia",
    region: "America",
    x: 20,
    y: 35,
    color: "#00e676",
  },
  {
    id: "oregon",
    name: "Oregon",
    region: "America",
    x: 10,
    y: 32,
    color: "#00e676",
  },
  {
    id: "saopaulo",
    name: "São Paulo",
    region: "America",
    x: 22,
    y: 68,
    color: "#00e676",
  },
  {
    id: "sydney",
    name: "Sydney",
    region: "Oceania",
    x: 88,
    y: 72,
    color: "#ffb800",
  },
];

export const ORIGIN_SERVER: EdgeServer = {
  id: "origin",
  name: "Origin",
  region: "US-East",
  x: 22,
  y: 35,
  color: "#ff2d8a",
};

export const CACHE_RESULTS: CacheResult[] = [
  {
    type: "HIT",
    label: "Cache HIT",
    description: "엣지 서버에 캐시된 콘텐츠를 바로 반환 (빠름)",
    color: "#00e676",
  },
  {
    type: "MISS",
    label: "Cache MISS",
    description: "캐시에 없으므로 오리진에서 가져와 캐시 후 반환",
    color: "#ff2d8a",
  },
  {
    type: "STALE",
    label: "Stale-While-Revalidate",
    description: "만료된 캐시를 먼저 반환하고, 백그라운드에서 갱신",
    color: "#ffb800",
  },
];

export const TABS = [
  { id: "flow", label: "요청 흐름" },
  { id: "edge", label: "엣지 서버" },
  { id: "invalidation", label: "캐시 무효화" },
];

export const CDN_FLOW_STEPS = {
  hit: [
    {
      label: "사용자 → 가장 가까운 엣지 서버",
      color: "#00e5ff",
      latency: "5ms",
    },
    { label: "엣지: 캐시 확인 → HIT ✓", color: "#00e676", latency: "1ms" },
    { label: "엣지 → 사용자 (캐시된 응답)", color: "#00e676", latency: "5ms" },
  ],
  miss: [
    {
      label: "사용자 → 가장 가까운 엣지 서버",
      color: "#00e5ff",
      latency: "5ms",
    },
    { label: "엣지: 캐시 확인 → MISS ✗", color: "#ff2d8a", latency: "1ms" },
    { label: "엣지 → 오리진 서버 요청", color: "#ffb800", latency: "100ms" },
    { label: "오리진 → 엣지 (원본 응답)", color: "#ffb800", latency: "100ms" },
    { label: "엣지: 응답 캐시 저장", color: "#b388ff", latency: "1ms" },
    { label: "엣지 → 사용자 (응답 반환)", color: "#00e676", latency: "5ms" },
  ],
};

export const INVALIDATION_STRATEGIES = [
  {
    name: "TTL 기반",
    description: "Cache-Control: max-age=3600 (시간 경과 후 만료)",
    color: "#00e5ff",
  },
  {
    name: "수동 퍼지",
    description: "CDN API로 특정 URL/태그의 캐시 삭제",
    color: "#ff2d8a",
  },
  {
    name: "파일 핑거프린팅",
    description: "app.a1b2c3.js → 파일명에 해시 포함",
    color: "#00e676",
  },
  {
    name: "Stale-While-Revalidate",
    description: "만료된 캐시 반환 후 백그라운드 갱신",
    color: "#ffb800",
  },
];
