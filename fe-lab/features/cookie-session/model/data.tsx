import { InlineCode } from "@shared/ui";
import type { InterviewQuestion } from "@shared/ui";

export const codeExamples = [
  {
    title: "쿠키 설정 옵션",
    code: `// 서버에서 쿠키 설정 (Express)
res.cookie('sessionId', 'abc123', {
  httpOnly: true,    // JS에서 접근 불가 (XSS 방지)
  secure: true,      // HTTPS에서만 전송
  sameSite: 'strict', // 같은 사이트에서만 전송 (CSRF 방지)
  maxAge: 3600000,   // 1시간 (밀리초)
  path: '/',         // 쿠키 전송 경로
  domain: '.example.com', // 서브도메인 포함
});

// 클라이언트에서 쿠키 읽기
document.cookie; // "theme=dark; lang=ko"
// HttpOnly 쿠키는 여기에 표시되지 않음!`,
  },
  {
    title: "세션 관리 (Express + Redis)",
    code: `const session = require('express-session');
const RedisStore = require('connect-redis').default;
const redis = require('redis');

const redisClient = redis.createClient();

app.use(session({
  store: new RedisStore({ client: redisClient }),
  secret: 'my-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true,
    httpOnly: true,
    maxAge: 1000 * 60 * 60, // 1시간
  }
}));

// 세션 사용
app.post('/login', (req, res) => {
  req.session.userId = user.id;
  req.session.role = user.role;
});`,
  },
  {
    title: "JWT 토큰 구조",
    code: `// JWT 구조: Header.Payload.Signature
// eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjF9.abc123

// Header (Base64)
{ "alg": "HS256", "typ": "JWT" }

// Payload (Base64) — 민감 정보 X
{ "userId": 1, "role": "admin", "exp": 1700000000 }

// Signature
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  secret
)

// 생성 및 검증
const jwt = require('jsonwebtoken');
const token = jwt.sign({ userId: 1 }, 'secret', {
  expiresIn: '1h'
});
const decoded = jwt.verify(token, 'secret');`,
  },
];

export const interviewQuestions: InterviewQuestion[] = [
  {
    question: "쿠키와 세션의 차이점은 무엇인가요?",
    answer: (
      <>
        <strong>쿠키</strong>는 클라이언트(브라우저)에 저장되는 작은 데이터이며,
        매 요청마다 서버에 자동으로 전송됩니다.
        <strong>세션</strong>은 서버에 저장되는 사용자 상태 정보이며, 세션 ID만
        쿠키로 클라이언트에 전달합니다. 쿠키는 용량 제한(4KB)이 있고
        클라이언트에서 조작 가능하지만, 세션은 서버 메모리를 사용하며 보안적으로
        더 안전합니다.
      </>
    ),
  },
  {
    question: "JWT(JSON Web Token)란 무엇인가요?",
    answer: (
      <>
        JWT는 <strong>Header.Payload.Signature</strong> 구조의 자가
        포함(self-contained) 토큰입니다. 서버에 상태를 저장하지 않는{" "}
        <strong>무상태(stateless) 인증</strong>을 가능하게 합니다. Payload에
        사용자 정보를 담지만 Base64 인코딩일 뿐 암호화가 아니므로
        <strong>민감 정보를 담으면 안 됩니다</strong>. Signature로 변조를
        감지하며, <InlineCode size="md">exp</InlineCode> 클레임으로 만료 시간을
        설정합니다.
      </>
    ),
  },
  {
    question: "SameSite 쿠키 속성에 대해 설명해주세요.",
    answer: (
      <>
        <InlineCode size="md">SameSite</InlineCode>는 크로스 사이트 요청 시 쿠키
        전송을 제어하는 속성입니다.
        <strong>Strict</strong>: 같은 사이트 요청에서만 쿠키 전송 (가장 엄격).
        <strong>Lax</strong>: 탑레벨 네비게이션(링크 클릭)에서는 허용 (기본값).
        <strong>None</strong>: 모든 크로스 사이트에서 허용 (Secure 필수). CSRF
        공격 방지에 효과적이며, Chrome은 기본값을{" "}
        <InlineCode size="md">Lax</InlineCode>로 설정합니다.
      </>
    ),
  },
];
