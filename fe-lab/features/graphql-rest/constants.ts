import type { ApiStyle, RequestExample } from "./types";

export const API_STYLES: ApiStyle[] = [
  { id: "rest", label: "REST", color: "#ffb800" },
  { id: "graphql", label: "GraphQL", color: "#00e5ff" },
];

export const FETCH_EXAMPLES: RequestExample[] = [
  {
    style: API_STYLES[0],
    endpoint: "GET /api/users/1",
    request: `GET /api/users/1 HTTP/1.1
Host: api.example.com
Accept: application/json`,
    response: `{
  "id": 1,
  "name": "Kim",
  "email": "kim@example.com",
  "phone": "010-1234-5678",
  "address": "Seoul, Korea",
  "company": "FE Lab",
  "website": "felab.dev",
  "createdAt": "2024-01-01"
}`,
    dataSize: 8,
    neededFields: 2,
    totalFields: 8,
  },
  {
    style: API_STYLES[1],
    endpoint: "POST /graphql",
    request: `POST /graphql HTTP/1.1
Content-Type: application/json

{
  "query": "{ user(id: 1) { name, email } }"
}`,
    response: `{
  "data": {
    "user": {
      "name": "Kim",
      "email": "kim@example.com"
    }
  }
}`,
    dataSize: 2,
    neededFields: 2,
    totalFields: 2,
  },
];

export const UNDER_FETCH_EXAMPLE = {
  rest: {
    label: "REST: 3번 요청 필요 (Under-fetching)",
    requests: [
      "GET /api/users/1",
      "GET /api/users/1/posts",
      "GET /api/users/1/followers",
    ],
    color: "#ff2d8a",
  },
  graphql: {
    label: "GraphQL: 1번 요청으로 해결",
    query: `query {
  user(id: 1) {
    name
    posts { title }
    followers { name }
  }
}`,
    color: "#00e676",
  },
};

export const COMPARISON_TABLE = [
  {
    aspect: "엔드포인트",
    rest: "리소스마다 다른 URL",
    graphql: "단일 엔드포인트 /graphql",
  },
  {
    aspect: "데이터 크기",
    rest: "서버가 결정 (고정)",
    graphql: "클라이언트가 선택 (유연)",
  },
  {
    aspect: "타입 시스템",
    rest: "별도 문서화 필요",
    graphql: "스키마로 자동 문서화",
  },
  {
    aspect: "캐싱",
    rest: "HTTP 캐시 활용 용이",
    graphql: "별도 캐싱 전략 필요",
  },
  { aspect: "학습 곡선", rest: "낮음", graphql: "높음 (스키마, 리졸버)" },
  {
    aspect: "실시간",
    rest: "WebSocket 별도 구현",
    graphql: "Subscription 내장",
  },
];
