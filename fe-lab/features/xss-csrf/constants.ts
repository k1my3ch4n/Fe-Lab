export interface AttackStep {
  label: string;
  color: string;
  description: string;
}

export interface SecurityScenario {
  id: string;
  label: string;
  steps: AttackStep[];
  code: string;
}

export const SECURITY_SCENARIOS: SecurityScenario[] = [
  {
    id: "xss",
    label: "XSS 공격",
    steps: [
      {
        label: "악성 입력",
        color: "#ff2d8a",
        description: "공격자가 <script> 태그를 입력 필드에 삽입",
      },
      {
        label: "저장/반영",
        color: "#ffb800",
        description: "서버가 이스케이프 없이 저장 또는 반영",
      },
      {
        label: "실행",
        color: "#ff2d8a",
        description: "피해자 브라우저에서 스크립트 실행",
      },
      {
        label: "탈취",
        color: "#b388ff",
        description: "쿠키, 세션, 개인정보 탈취",
      },
    ],
    code: `// ❌ 취약한 코드
element.innerHTML = userInput;
// userInput = '<img src=x onerror="steal(document.cookie)">'

// ✅ 안전한 코드
element.textContent = userInput;  // 자동 이스케이프

// React는 기본적으로 XSS 방지
return <div>{userInput}</div>;  // 자동 이스케이프
// ❌ 위험: dangerouslySetInnerHTML 사용 시 주의
return <div dangerouslySetInnerHTML={{ __html: userInput }} />;`,
  },
  {
    id: "csrf",
    label: "CSRF 공격",
    steps: [
      {
        label: "로그인 상태",
        color: "#00e5ff",
        description: "사용자가 은행 사이트에 로그인 (쿠키 보유)",
      },
      {
        label: "악성 사이트 방문",
        color: "#ff2d8a",
        description: "공격자의 사이트에 접속",
      },
      {
        label: "위조 요청",
        color: "#ffb800",
        description: "악성 사이트가 은행 API에 자동 요청 전송",
      },
      {
        label: "실행",
        color: "#ff2d8a",
        description: "브라우저가 쿠키를 자동 첨부 → 인증 통과",
      },
    ],
    code: `// ❌ CSRF 공격 (악성 사이트)
<img src="https://bank.com/transfer?to=hacker&amount=1000000" />
<form action="https://bank.com/transfer" method="POST">
  <input name="to" value="hacker" />
  <input name="amount" value="1000000" />
</form>
<script>document.forms[0].submit();</script>

// ✅ CSRF 토큰으로 방어
// 서버: 폼 렌더 시 고유 토큰 발급
<form action="/transfer" method="POST">
  <input type="hidden" name="_csrf" value={csrfToken} />
  <input name="to" /><input name="amount" />
</form>
// 서버: 요청 시 토큰 검증`,
  },
  {
    id: "csp",
    label: "CSP",
    steps: [
      {
        label: "CSP 헤더 설정",
        color: "#00e676",
        description: "서버가 Content-Security-Policy 헤더 전송",
      },
      {
        label: "브라우저 파싱",
        color: "#00e5ff",
        description: "브라우저가 허용된 리소스 출처 목록 저장",
      },
      {
        label: "리소스 요청",
        color: "#ffb800",
        description: "페이지 내 스크립트/스타일/이미지 로드 시도",
      },
      {
        label: "차단/허용",
        color: "#b388ff",
        description: "허용 목록에 없는 출처 → 차단 + 리포트",
      },
    ],
    code: `// Content-Security-Policy 헤더
Content-Security-Policy:
  default-src 'self';
  script-src 'self' 'nonce-abc123';
  style-src 'self' 'unsafe-inline';
  img-src 'self' https://cdn.example.com;
  connect-src 'self' https://api.example.com;
  report-uri /csp-report;

// Next.js에서 CSP 설정
// next.config.js
const cspHeader = \`
  default-src 'self';
  script-src 'self' 'nonce-\${nonce}';
  style-src 'self' 'unsafe-inline';
\`;

// middleware.ts
response.headers.set(
  'Content-Security-Policy',
  cspHeader
);`,
  },
];

export const XSS_EXAMPLES = {
  input: '<img src=x onerror="alert(document.cookie)">',
  escaped: "&lt;img src=x onerror=&quot;alert(document.cookie)&quot;&gt;",
  safe: '<img src=x onerror="alert(document.cookie)">',
};
