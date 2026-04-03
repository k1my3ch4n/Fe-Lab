import type { AuthFlow } from "./types";

export const AUTH_FLOWS: AuthFlow[] = [
  {
    method: { id: "cookie", label: "쿠키 기반 세션", color: "#ffb800" },
    description: "서버에 세션을 저장하고, 쿠키로 세션 ID 전달",
    pros: [
      "서버에서 세션 관리 가능",
      "쿠키 만료로 자동 로그아웃",
      "HttpOnly로 XSS 방지",
    ],
    cons: ["서버 메모리 사용", "수평 확장 시 세션 공유 필요", "CSRF 공격 취약"],
    steps: [
      {
        from: "client",
        label: "로그인 요청",
        detail: "POST /login { id, pw }",
        color: "#00e5ff",
      },
      {
        from: "server",
        label: "세션 생성",
        detail: "sessions[sessionId] = user",
        color: "#00e676",
      },
      {
        from: "server",
        label: "쿠키 설정",
        detail: "Set-Cookie: sid=abc; HttpOnly",
        color: "#ffb800",
      },
      {
        from: "client",
        label: "이후 요청",
        detail: "Cookie: sid=abc (자동 전송)",
        color: "#b388ff",
      },
      {
        from: "server",
        label: "세션 확인",
        detail: "sessions['abc'] → user 정보",
        color: "#00e676",
      },
    ],
  },
  {
    method: { id: "jwt", label: "JWT 토큰", color: "#00e5ff" },
    description: "토큰 자체에 사용자 정보를 포함, 무상태(stateless)",
    pros: [
      "서버 메모리 불필요 (무상태)",
      "수평 확장 용이",
      "마이크로서비스에 적합",
    ],
    cons: ["토큰 무효화 어려움", "페이로드 노출 가능", "토큰 크기가 큼"],
    steps: [
      {
        from: "client",
        label: "로그인 요청",
        detail: "POST /login { id, pw }",
        color: "#00e5ff",
      },
      {
        from: "server",
        label: "JWT 생성",
        detail: "jwt.sign({ userId, role }, secret)",
        color: "#00e676",
      },
      {
        from: "server",
        label: "토큰 전달",
        detail: "{ token: 'eyJhb...' }",
        color: "#ffb800",
      },
      {
        from: "client",
        label: "이후 요청",
        detail: "Authorization: Bearer eyJhb...",
        color: "#b388ff",
      },
      {
        from: "server",
        label: "토큰 검증",
        detail: "jwt.verify(token, secret)",
        color: "#00e676",
      },
    ],
  },
  {
    method: {
      id: "session-store",
      label: "세션 스토어 (Redis)",
      color: "#00e676",
    },
    description: "외부 스토어에 세션 저장, 수평 확장 대응",
    pros: [
      "서버 재시작에도 세션 유지",
      "수평 확장 대응",
      "세션 만료 자동 관리",
    ],
    cons: ["추가 인프라 필요", "네트워크 지연 추가", "Redis 장애 시 영향"],
    steps: [
      {
        from: "client",
        label: "로그인 요청",
        detail: "POST /login { id, pw }",
        color: "#00e5ff",
      },
      {
        from: "server",
        label: "Redis에 저장",
        detail: "redis.set(sid, userData, EX 3600)",
        color: "#00e676",
      },
      {
        from: "server",
        label: "쿠키 설정",
        detail: "Set-Cookie: sid=abc; HttpOnly",
        color: "#ffb800",
      },
      {
        from: "client",
        label: "이후 요청",
        detail: "Cookie: sid=abc (자동 전송)",
        color: "#b388ff",
      },
      {
        from: "server",
        label: "Redis 조회",
        detail: "redis.get('abc') → userData",
        color: "#00e676",
      },
    ],
  },
];

export const COOKIE_ATTRIBUTES = [
  {
    name: "HttpOnly",
    description: "JavaScript에서 접근 불가 (XSS 방지)",
    color: "#00e676",
  },
  { name: "Secure", description: "HTTPS에서만 전송", color: "#00e5ff" },
  {
    name: "SameSite=Strict",
    description: "같은 사이트에서만 전송 (CSRF 방지)",
    color: "#ffb800",
  },
  {
    name: "SameSite=Lax",
    description: "탑레벨 네비게이션에서만 허용",
    color: "#b388ff",
  },
  {
    name: "SameSite=None",
    description: "크로스 사이트 허용 (Secure 필수)",
    color: "#ff2d8a",
  },
  {
    name: "Max-Age / Expires",
    description: "쿠키 수명 설정",
    color: "#ffb800",
  },
];
