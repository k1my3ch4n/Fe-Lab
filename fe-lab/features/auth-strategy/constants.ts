export interface AuthStep {
  label: string;
  color: string;
  description: string;
}

export interface AuthMethod {
  id: string;
  label: string;
  steps: AuthStep[];
  code: string;
  pros: string[];
  cons: string[];
}

export const AUTH_METHODS: AuthMethod[] = [
  {
    id: "session",
    label: "Session",
    steps: [
      {
        label: "로그인 요청",
        color: "#00e5ff",
        description: "클라이언트 → 서버: ID/PW 전송",
      },
      {
        label: "세션 생성",
        color: "#00e676",
        description: "서버: 세션 ID 생성 → 메모리/DB에 저장",
      },
      {
        label: "쿠키 전송",
        color: "#ffb800",
        description: "서버 → 클라이언트: Set-Cookie: sessionId=abc",
      },
      {
        label: "인증 요청",
        color: "#b388ff",
        description: "클라이언트: 매 요청마다 쿠키 자동 첨부",
      },
      {
        label: "세션 검증",
        color: "#00e676",
        description: "서버: 세션 ID로 사용자 조회 → 인증 확인",
      },
    ],
    code: `// Express + express-session
app.use(session({
  secret: 'my-secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 * 1000, // 24h
  },
}));

app.post('/login', (req, res) => {
  // 인증 후 세션에 저장
  req.session.userId = user.id;
  res.json({ success: true });
});`,
    pros: [
      "서버에서 세션 완전 제어 (즉시 무효화 가능)",
      "쿠키 자동 전송 — 클라이언트 구현 간단",
      "HttpOnly로 XSS 방어",
    ],
    cons: [
      "서버 메모리/DB에 세션 저장 필요",
      "수평 확장 시 세션 공유 문제 (Redis 필요)",
      "CSRF 취약점 주의",
    ],
  },
  {
    id: "jwt",
    label: "JWT",
    steps: [
      {
        label: "로그인 요청",
        color: "#00e5ff",
        description: "클라이언트 → 서버: ID/PW 전송",
      },
      {
        label: "JWT 발급",
        color: "#00e676",
        description: "서버: Header.Payload.Signature 토큰 생성",
      },
      {
        label: "토큰 저장",
        color: "#ffb800",
        description: "클라이언트: 메모리 또는 httpOnly 쿠키에 저장",
      },
      {
        label: "인증 요청",
        color: "#b388ff",
        description: "Authorization: Bearer <token> 헤더 첨부",
      },
      {
        label: "토큰 검증",
        color: "#00e676",
        description: "서버: 서명 검증만으로 인증 (DB 조회 불필요)",
      },
    ],
    code: `import jwt from 'jsonwebtoken';

// 토큰 발급
app.post('/login', (req, res) => {
  const token = jwt.sign(
    { userId: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '15m' }  // 짧은 만료
  );
  const refreshToken = jwt.sign(
    { userId: user.id },
    process.env.REFRESH_SECRET,
    { expiresIn: '7d' }
  );
  res.json({ token, refreshToken });
});

// 토큰 검증 미들웨어
function auth(req, res, next) {
  const token = req.headers.authorization
    ?.split(' ')[1];
  const decoded = jwt.verify(token, SECRET);
  req.userId = decoded.userId;
  next();
}`,
    pros: [
      "Stateless — 서버 저장소 불필요",
      "수평 확장 용이 (서명 검증만 필요)",
      "마이크로서비스 간 인증 공유 쉬움",
    ],
    cons: [
      "토큰 즉시 무효화 어려움 (블랙리스트 필요)",
      "페이로드 노출 (Base64 — 암호화 아님)",
      "토큰 크기가 세션 ID보다 큼",
    ],
  },
  {
    id: "oauth",
    label: "OAuth 2.0",
    steps: [
      {
        label: "인가 요청",
        color: "#00e5ff",
        description: "클라이언트 → 인가 서버: 로그인 페이지 리다이렉트",
      },
      {
        label: "사용자 동의",
        color: "#b388ff",
        description: "사용자: Google/GitHub 등에서 권한 동의",
      },
      {
        label: "인가 코드",
        color: "#ffb800",
        description: "인가 서버 → 클라이언트: code 파라미터 전달",
      },
      {
        label: "토큰 교환",
        color: "#00e676",
        description: "서버 → 인가 서버: code → access_token 교환",
      },
      {
        label: "리소스 접근",
        color: "#00e5ff",
        description: "서버 → 리소스 서버: access_token으로 API 호출",
      },
    ],
    code: `// Next.js + NextAuth.js (Auth.js)
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const { handlers, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
});`,
    pros: [
      "비밀번호 관리 불필요 (소셜 로그인)",
      "표준 프로토콜 — 다양한 라이브러리 지원",
      "세분화된 권한 범위(scope) 지정 가능",
    ],
    cons: [
      "구현 복잡도 높음 (인가 코드 흐름)",
      "외부 서비스 의존 (다운타임 영향)",
      "리다이렉트 흐름 — UX 중단",
    ],
  },
];
