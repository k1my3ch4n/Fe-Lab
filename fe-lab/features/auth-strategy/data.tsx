import { InlineCode } from "@shared/ui";
import type { InterviewQuestion } from "@shared/ui";

export const codeExamples = [
  {
    title: "JWT 인증",
    code: `import jwt from 'jsonwebtoken';

// 토큰 발급
function generateTokens(user) {
  const accessToken = jwt.sign(
    { userId: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '15m' }
  );

  const refreshToken = jwt.sign(
    { userId: user.id },
    process.env.REFRESH_SECRET,
    { expiresIn: '7d' }
  );

  return { accessToken, refreshToken };
}

// 인증 미들웨어
function authenticate(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'No token' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired' });
    }
    return res.status(403).json({ error: 'Invalid token' });
  }
}

// 클라이언트: Axios 인터셉터
api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) config.headers.Authorization = \`Bearer \${token}\`;
  return config;
});`,
  },
  {
    title: "OAuth 2.0 (Authorization Code Flow)",
    code: `// 1. 인가 URL 생성
const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
authUrl.searchParams.set('client_id', CLIENT_ID);
authUrl.searchParams.set('redirect_uri', REDIRECT_URI);
authUrl.searchParams.set('response_type', 'code');
authUrl.searchParams.set('scope', 'openid email profile');
authUrl.searchParams.set('state', generateState()); // CSRF 방지

// 2. 콜백 처리 — 인가 코드 → 토큰 교환
app.get('/auth/callback', async (req, res) => {
  const { code, state } = req.query;

  // state 검증 (CSRF 방지)
  if (state !== req.session.oauthState) {
    return res.status(403).send('Invalid state');
  }

  // 인가 코드 → 토큰 교환
  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    body: new URLSearchParams({
      code,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      redirect_uri: REDIRECT_URI,
      grant_type: 'authorization_code',
    }),
  });

  const { access_token, id_token } = await tokenRes.json();

  // 3. 사용자 정보 조회
  const userInfo = await fetch(
    'https://www.googleapis.com/oauth2/v2/userinfo',
    { headers: { Authorization: \`Bearer \${access_token}\` } }
  ).then(r => r.json());

  // 세션 생성 또는 JWT 발급
  req.session.user = userInfo;
  res.redirect('/dashboard');
});`,
  },
  {
    title: "리프레시 토큰 전략",
    code: `// 서버: 리프레시 토큰 엔드포인트
app.post('/auth/refresh', async (req, res) => {
  const { refreshToken } = req.body;

  try {
    const decoded = jwt.verify(refreshToken, REFRESH_SECRET);

    // DB에서 리프레시 토큰 유효성 확인 (탈취 방지)
    const stored = await db.refreshToken.findUnique({
      where: { token: refreshToken },
    });

    if (!stored || stored.revoked) {
      return res.status(403).json({ error: 'Token revoked' });
    }

    // 새 토큰 쌍 발급 (Rotation)
    const newTokens = generateTokens(decoded);

    // 기존 리프레시 토큰 무효화
    await db.refreshToken.update({
      where: { token: refreshToken },
      data: { revoked: true },
    });

    // 새 리프레시 토큰 저장
    await db.refreshToken.create({
      data: { token: newTokens.refreshToken, userId: decoded.userId },
    });

    res.json(newTokens);
  } catch (err) {
    res.status(403).json({ error: 'Invalid refresh token' });
  }
});

// 클라이언트: 자동 갱신 인터셉터
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error.response?.status === 401 && !error.config._retry) {
      error.config._retry = true;
      const { accessToken } = await refreshTokens();
      error.config.headers.Authorization = \`Bearer \${accessToken}\`;
      return api(error.config);  // 원래 요청 재시도
    }
    return Promise.reject(error);
  }
);`,
  },
];

export const interviewQuestions: InterviewQuestion[] = [
  {
    question: "Session 기반 인증과 JWT 인증의 차이를 설명해주세요.",
    answer: (
      <>
        <strong>Session</strong>: 서버가 세션 데이터를 메모리/DB에 저장하고,
        클라이언트에는 세션 ID만 쿠키로 전송합니다. <strong>Stateful</strong>
        하여 즉시 무효화가 가능하지만, 서버 확장 시 세션 공유(Redis)가
        필요합니다.
        <br />
        <br />
        <strong>JWT</strong>: 서버가 서명된 토큰을 발급하고, 검증 시 DB 조회가
        불필요합니다. <strong>Stateless</strong>하여 수평 확장이 쉽지만, 토큰
        즉시 무효화가 어렵습니다(블랙리스트 필요). 실무에서는{" "}
        <InlineCode>Access Token(15분) + Refresh Token(7일)</InlineCode> 조합이
        일반적입니다.
      </>
    ),
  },
  {
    question: "OAuth 2.0 Authorization Code Flow를 설명해주세요.",
    answer: (
      <>
        1) 클라이언트가 인가 서버(Google 등)로 리다이렉트 2) 사용자가 권한 동의
        3) 인가 서버가 <strong>인가 코드(code)</strong>를 콜백 URL로 전달 4)
        서버가 인가 코드 + client_secret으로 <strong>access_token 교환</strong>{" "}
        5) access_token으로 리소스 서버 API 호출
        <br />
        <br />
        <InlineCode>state</InlineCode> 파라미터로 CSRF를 방지하고,{" "}
        <InlineCode>PKCE</InlineCode>(Proof Key for Code Exchange)로 인가 코드
        탈취를 방지합니다. client_secret이 서버에서만 사용되어{" "}
        <strong>보안이 강화</strong>됩니다.
      </>
    ),
  },
  {
    question: "리프레시 토큰 전략은 어떻게 구현하나요?",
    answer: (
      <>
        Access Token은 <strong>짧은 만료(15분)</strong>, Refresh Token은{" "}
        <strong>긴 만료(7-30일)</strong>로 설정합니다. Access Token 만료 시
        Refresh Token으로 새 Access Token을 발급받습니다.
        <br />
        <br />
        보안 강화: 1) <strong>Refresh Token Rotation</strong> — 갱신 시 새
        Refresh Token 발급 + 이전 토큰 무효화 2){" "}
        <strong>Absolute Expiry</strong> — Refresh Token도 절대 만료 시간 설정
        3) <strong>DB 저장</strong> — Refresh Token을 DB에 저장하여 즉시 무효화
        가능 4) <InlineCode>httpOnly</InlineCode> 쿠키에 저장하여 XSS 방지
      </>
    ),
  },
];
