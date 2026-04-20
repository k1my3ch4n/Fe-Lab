import { InlineCode } from "@shared/ui";
import type { InterviewQuestion } from "@shared/ui";

export const codeExamples = [
  {
    title: "XSS 방지 코드",
    code: `// 1. 입력 이스케이프 함수
function escapeHtml(str: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
  };
  return str.replace(/[&<>"']/g, (c) => map[c]);
}

// 2. React는 JSX에서 자동 이스케이프
function SafeComponent({ userInput }: { userInput: string }) {
  // ✅ 안전: React가 자동 이스케이프
  return <div>{userInput}</div>;
}

// 3. DOMPurify로 HTML 정제 (필요 시)
import DOMPurify from 'dompurify';

function RichContent({ html }: { html: string }) {
  const clean = DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a'],
    ALLOWED_ATTR: ['href'],
  });
  return <div dangerouslySetInnerHTML={{ __html: clean }} />;
}

// 4. HttpOnly 쿠키 설정 (서버)
// Set-Cookie: session=abc123; HttpOnly; Secure; SameSite=Strict`,
  },
  {
    title: "CSRF 토큰 구현",
    code: `// 서버 (Node.js / Express)
import crypto from 'crypto';

// CSRF 토큰 생성 미들웨어
function csrfProtection(req, res, next) {
  if (req.method === 'GET') {
    // GET 요청: 토큰 생성 및 세션에 저장
    const token = crypto.randomBytes(32).toString('hex');
    req.session.csrfToken = token;
    res.locals.csrfToken = token;
    return next();
  }

  // POST/PUT/DELETE: 토큰 검증
  const token = req.body._csrf || req.headers['x-csrf-token'];
  if (token !== req.session.csrfToken) {
    return res.status(403).json({ error: 'Invalid CSRF token' });
  }
  next();
}

// 클라이언트 (React)
function TransferForm({ csrfToken }: { csrfToken: string }) {
  return (
    <form action="/api/transfer" method="POST">
      <input type="hidden" name="_csrf" value={csrfToken} />
      <input name="to" placeholder="받는 사람" />
      <input name="amount" type="number" />
      <button type="submit">송금</button>
    </form>
  );
}

// SameSite 쿠키 설정
// Set-Cookie: session=abc; SameSite=Strict; Secure; HttpOnly`,
  },
  {
    title: "CSP 헤더 설정",
    code: `// Next.js middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64');

  const cspHeader = \`
    default-src 'self';
    script-src 'self' 'nonce-\${nonce}' 'strict-dynamic';
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data:;
    font-src 'self';
    connect-src 'self' https://api.example.com;
    frame-ancestors 'none';
    base-uri 'self';
    form-action 'self';
    report-uri /api/csp-report;
  \`.replace(/\\n/g, '');

  const response = NextResponse.next();
  response.headers.set('Content-Security-Policy', cspHeader);
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');

  return response;
}

// CSP 위반 리포트 API
// POST /api/csp-report
export async function POST(req: Request) {
  const report = await req.json();
  console.log('CSP Violation:', report);
  // → Sentry, DataDog 등으로 전송
}`,
  },
];

export const interviewQuestions: InterviewQuestion[] = [
  {
    question: "XSS(Cross-Site Scripting)란 무엇이고 어떻게 방지하나요?",
    answer: (
      <>
        XSS는 공격자가 웹 페이지에 <strong>악성 스크립트를 삽입</strong>하여
        다른 사용자의 브라우저에서 실행시키는 공격입니다. Stored XSS(DB 저장),
        Reflected XSS(URL 파라미터 반영), DOM-based XSS(클라이언트 DOM 조작)로
        분류됩니다.
        <br />
        <br />
        방지: 1) 입력값 이스케이프(<InlineCode>escapeHtml</InlineCode>) 2)
        React의 자동 이스케이프 활용 3){" "}
        <InlineCode>dangerouslySetInnerHTML</InlineCode> 사용 시{" "}
        <InlineCode>DOMPurify</InlineCode>로 정제 4) CSP 헤더 설정 5) HttpOnly
        쿠키로 JS 접근 차단
      </>
    ),
  },
  {
    question: "CSRF(Cross-Site Request Forgery)란 무엇이고 어떻게 방지하나요?",
    answer: (
      <>
        CSRF는 인증된 사용자의 브라우저를 이용해{" "}
        <strong>의도하지 않은 요청을 위조</strong>하는 공격입니다. 사용자가
        로그인된 상태에서 악성 사이트를 방문하면, 브라우저가 자동으로 쿠키를
        첨부하여 요청을 전송합니다.
        <br />
        <br />
        방지: 1) <strong>CSRF 토큰</strong> — 폼마다 고유 토큰 발급 후 서버에서
        검증 2) <InlineCode>SameSite=Strict</InlineCode> 쿠키 — cross-origin
        요청에 쿠키 미전송 3) <InlineCode>Origin</InlineCode>/
        <InlineCode>Referer</InlineCode> 헤더 검증 4) Custom 헤더 요구
      </>
    ),
  },
  {
    question: "CSP(Content Security Policy)란 무엇인가요?",
    answer: (
      <>
        CSP는 브라우저에게{" "}
        <strong>허용된 리소스 출처를 알려주는 HTTP 헤더</strong>입니다.{" "}
        <InlineCode>Content-Security-Policy</InlineCode> 헤더로 스크립트,
        스타일, 이미지 등 각 리소스 유형별 허용 출처를 지정합니다. 인라인
        스크립트를 차단하여 XSS를 근본적으로 방지하며,{" "}
        <InlineCode>nonce</InlineCode> 또는 <InlineCode>hash</InlineCode>
        기반으로 특정 스크립트만 허용할 수 있습니다.{" "}
        <InlineCode>Content-Security-Policy-Report-Only</InlineCode>로 먼저
        테스트한 후 점진적으로 적용하는 것이 권장됩니다.
      </>
    ),
  },
];
