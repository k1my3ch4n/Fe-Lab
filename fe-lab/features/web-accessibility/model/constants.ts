export const A11Y_TABS = [
  { id: "semantic", label: "시맨틱 HTML" },
  { id: "aria", label: "ARIA 속성" },
  { id: "keyboard", label: "키보드 접근성" },
] as const;

export const SEMANTIC_COMPARISON = {
  bad: {
    label: "div 남용 (Bad)",
    code: `<div class="header">
  <div class="logo">사이트명</div>
  <div class="nav">
    <div class="nav-item">홈</div>
    <div class="nav-item">소개</div>
  </div>
</div>
<div class="main">
  <div class="article">
    <div class="title">제목</div>
    <div class="content">본문...</div>
  </div>
</div>
<div class="footer">© 2024</div>`,
  },
  good: {
    label: "시맨틱 HTML (Good)",
    code: `<header>
  <h1>사이트명</h1>
  <nav>
    <a href="/">홈</a>
    <a href="/about">소개</a>
  </nav>
</header>
<main>
  <article>
    <h2>제목</h2>
    <p>본문...</p>
  </article>
</main>
<footer>© 2024</footer>`,
  },
} as const;

export const ARIA_EXAMPLES = [
  {
    id: "before",
    label: "ARIA 적용 전",
    html: `<div onclick="toggle()">메뉴 열기</div>
<div class="hidden">
  <div onclick="navigate('/')">홈</div>
  <div onclick="navigate('/about')">소개</div>
</div>`,
    issues: [
      "스크린 리더가 역할을 인식하지 못함",
      "키보드로 접근 불가",
      "상태 변화를 알 수 없음",
    ],
  },
  {
    id: "after",
    label: "ARIA 적용 후",
    html: `<button
  aria-expanded="false"
  aria-controls="menu"
  aria-label="메뉴 열기"
>메뉴 열기</button>
<nav id="menu" role="navigation" aria-hidden="true">
  <a href="/" role="menuitem">홈</a>
  <a href="/about" role="menuitem">소개</a>
</nav>`,
    issues: [],
  },
] as const;
