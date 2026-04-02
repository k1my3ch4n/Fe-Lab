import { InlineCode } from "@shared/ui";
import type { InterviewQuestion } from "@shared/ui";

export const codeExamples = [
  {
    title: "CORS 헤더 설정 (서버)",
    code: `// Express.js 서버 예시
app.use((req, res, next) => {
  // 허용할 출처 지정 (* 는 모든 출처 허용)
  res.setHeader('Access-Control-Allow-Origin',
    'https://app.example.com');

  // 허용할 HTTP 메서드
  res.setHeader('Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS');

  // 허용할 요청 헤더
  res.setHeader('Access-Control-Allow-Headers',
    'Content-Type, Authorization');

  // Preflight 캐시 시간 (초)
  res.setHeader('Access-Control-Max-Age', '86400');

  // OPTIONS 요청에 대한 빠른 응답
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});`,
  },
  {
    title: "Preflight 요청 조건",
    code: `// ✅ Simple Request — Preflight 없음
fetch('https://api.example.com/data');
// GET, HEAD, POST(단순) + 기본 헤더만 사용

// ❌ Preflight 발생 — 커스텀 헤더
fetch('https://api.example.com/data', {
  headers: {
    'Authorization': 'Bearer token',  // 커스텀 헤더
    'Content-Type': 'application/json' // 비단순 타입
  }
});

// ❌ Preflight 발생 — PUT 메서드
fetch('https://api.example.com/data', {
  method: 'PUT',  // GET, HEAD, POST 외의 메서드
  body: JSON.stringify({ name: 'test' })
});

// ❌ Preflight 발생 — DELETE 메서드
fetch('https://api.example.com/data/1', {
  method: 'DELETE'
});`,
  },
  {
    title: "credentials 설정",
    code: `// 쿠키/인증정보 포함 요청
fetch('https://api.example.com/user', {
  credentials: 'include'  // 쿠키 포함
});

// 서버 측 설정 (필수)
res.setHeader('Access-Control-Allow-Origin',
  'https://app.example.com');  // '*' 사용 불가!
res.setHeader('Access-Control-Allow-Credentials',
  'true');

// XMLHttpRequest 방식
const xhr = new XMLHttpRequest();
xhr.withCredentials = true;
xhr.open('GET', 'https://api.example.com/user');
xhr.send();

// ⚠️ credentials: 'include' 사용 시
// Access-Control-Allow-Origin에 '*' 불가
// 반드시 구체적인 출처를 명시해야 함`,
  },
];

export const interviewQuestions: InterviewQuestion[] = [
  {
    question: "CORS란 무엇인가요?",
    answer: (
      <>
        CORS(Cross-Origin Resource Sharing)는{" "}
        <strong>브라우저의 동일 출처 정책(Same-Origin Policy)을 우회</strong>
        하여 다른 출처의 리소스에 접근할 수 있게 하는 HTTP 헤더 기반
        메커니즘입니다. 출처(Origin)는{" "}
        <InlineCode>프로토콜 + 호스트 + 포트</InlineCode>의 조합으로 결정됩니다.
        CORS는 <strong>브라우저가 강제</strong>하는 보안 정책이며, 서버 간
        통신에서는 적용되지 않습니다.
      </>
    ),
  },
  {
    question: "Simple Request와 Preflight Request의 차이는 무엇인가요?",
    answer: (
      <>
        <strong>Simple Request</strong>는 <InlineCode>GET</InlineCode>,{" "}
        <InlineCode>HEAD</InlineCode>, <InlineCode>POST</InlineCode> 메서드 중
        하나이고, 허용된 헤더(<InlineCode>Accept</InlineCode>,{" "}
        <InlineCode>Content-Type</InlineCode> 등)만 사용하며,{" "}
        <InlineCode>Content-Type</InlineCode>이{" "}
        <InlineCode>text/plain</InlineCode>,{" "}
        <InlineCode>multipart/form-data</InlineCode>,{" "}
        <InlineCode>application/x-www-form-urlencoded</InlineCode> 중 하나인
        경우입니다. 이 조건을 만족하지 않으면 브라우저가{" "}
        <strong>OPTIONS 메서드로 Preflight 요청</strong>을 먼저 보내 서버의 허용
        여부를 확인한 후 실제 요청을 전송합니다.
      </>
    ),
  },
  {
    question: "CORS 에러를 해결하는 방법은?",
    answer: (
      <>
        1. <strong>서버 측 CORS 헤더 설정</strong> —{" "}
        <InlineCode>Access-Control-Allow-Origin</InlineCode>,{" "}
        <InlineCode>Access-Control-Allow-Methods</InlineCode>,{" "}
        <InlineCode>Access-Control-Allow-Headers</InlineCode> 등을 적절히
        설정합니다. 2. <strong>프록시 서버 사용</strong> — 개발 환경에서{" "}
        <InlineCode>next.config.js</InlineCode>의{" "}
        <InlineCode>rewrites</InlineCode>나 webpack의{" "}
        <InlineCode>devServer.proxy</InlineCode>를 활용합니다. 3.{" "}
        <strong>credentials 설정 시</strong> —{" "}
        <InlineCode>Access-Control-Allow-Origin</InlineCode>에{" "}
        <InlineCode>*</InlineCode> 대신 구체적인 출처를 명시하고{" "}
        <InlineCode>Access-Control-Allow-Credentials: true</InlineCode>를
        설정합니다.
      </>
    ),
  },
];
