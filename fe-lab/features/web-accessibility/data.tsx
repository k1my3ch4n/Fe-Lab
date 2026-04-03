import { InlineCode } from "@shared/ui";
import type { InterviewQuestion } from "@shared/ui";

export const codeExamples = [
  {
    title: "시맨틱 HTML",
    code: `// 시맨틱 태그로 문서 구조를 명확하게 전달
<header>
  <h1>사이트 제목</h1>
  <nav aria-label="메인 네비게이션">
    <ul>
      <li><a href="/">홈</a></li>
      <li><a href="/about">소개</a></li>
    </ul>
  </nav>
</header>

<main>
  <article>
    <h2>글 제목</h2>
    <time datetime="2024-01-01">2024년 1월 1일</time>
    <p>본문 내용...</p>
    <figure>
      <img src="chart.png" alt="2024년 매출 현황 차트" />
      <figcaption>2024년 분기별 매출</figcaption>
    </figure>
  </article>

  <aside>
    <h3>관련 글</h3>
    <ul>...</ul>
  </aside>
</main>

<footer>
  <p>© 2024 Company. All rights reserved.</p>
</footer>`,
  },
  {
    title: "ARIA 레이블",
    code: `// aria-label: 보이지 않는 접근 가능한 이름
<button aria-label="검색">
  <svg>...</svg> {/* 아이콘만 있는 버튼 */}
</button>

// aria-labelledby: 다른 요소를 레이블로 참조
<h2 id="section-title">설정</h2>
<form aria-labelledby="section-title">
  ...
</form>

// aria-describedby: 추가 설명 연결
<input
  type="password"
  aria-describedby="pw-help"
/>
<p id="pw-help">8자 이상, 특수문자 포함</p>

// aria-live: 동적 콘텐츠 변화 알림
<div aria-live="polite" aria-atomic="true">
  {status} {/* 변경 시 스크린 리더가 읽어줌 */}
</div>

// role: 요소의 역할 명시
<div role="alert">오류가 발생했습니다!</div>
<div role="progressbar" aria-valuenow={75}>75%</div>`,
  },
  {
    title: "포커스 관리",
    code: `// 포커스 트랩 — 모달 내부에 포커스 가두기
function useFocusTrap(ref: RefObject<HTMLElement>) {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const focusable = element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0] as HTMLElement;
    const last = focusable[focusable.length - 1] as HTMLElement;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    element.addEventListener('keydown', handleKeyDown);
    first?.focus(); // 모달 열릴 때 첫 요소에 포커스

    return () => {
      element.removeEventListener('keydown', handleKeyDown);
    };
  }, [ref]);
}

// Skip Navigation 링크
<a href="#main" className="skip-link">
  본문으로 건너뛰기
</a>`,
  },
];

export const interviewQuestions: InterviewQuestion[] = [
  {
    question: "웹 접근성(Web Accessibility)이란 무엇인가요?",
    answer: (
      <>
        웹 접근성은{" "}
        <strong>
          장애인, 고령자 등 모든 사용자가 웹 콘텐츠를 동등하게 이용할 수 있도록
          보장
        </strong>
        하는 것입니다. 시각, 청각, 운동, 인지 장애를 가진 사용자도 스크린 리더,
        키보드, 음성 인식 등의 보조 기술로 웹을 사용할 수 있어야 합니다.
        <strong>WCAG (Web Content Accessibility Guidelines)</strong>가 국제
        표준이며, 한국은 &quot;한국형 웹 콘텐츠 접근성 지침 2.2&quot;를
        따릅니다.
      </>
    ),
  },
  {
    question: "ARIA의 역할(role)과 속성(attribute)에 대해 설명해주세요.",
    answer: (
      <>
        <strong>ARIA (Accessible Rich Internet Applications)</strong>는 HTML의
        접근성을 보완하는 속성 집합입니다.
        <br />
        1. <strong>역할(role)</strong> — 요소의 목적을 정의합니다:{" "}
        <InlineCode>role=&quot;navigation&quot;</InlineCode>,{" "}
        <InlineCode>role=&quot;alert&quot;</InlineCode>,{" "}
        <InlineCode>role=&quot;dialog&quot;</InlineCode> 등.
        <br />
        2. <strong>속성(properties)</strong> — 요소의 특성을 설명합니다:{" "}
        <InlineCode>aria-label</InlineCode>,{" "}
        <InlineCode>aria-describedby</InlineCode>.
        <br />
        3. <strong>상태(states)</strong> — 현재 상태를 전달합니다:{" "}
        <InlineCode>aria-expanded</InlineCode>,{" "}
        <InlineCode>aria-hidden</InlineCode>,{" "}
        <InlineCode>aria-disabled</InlineCode>.
        <br />
        <br />
        <strong>첫 번째 규칙</strong>: 네이티브 HTML 요소로 충분하면 ARIA를
        사용하지 마세요. <InlineCode>&lt;button&gt;</InlineCode>이{" "}
        <InlineCode>div role=&quot;button&quot;</InlineCode>보다 항상 낫습니다.
      </>
    ),
  },
  {
    question: "키보드 접근성을 보장하는 방법을 설명해주세요.",
    answer: (
      <>
        1. <strong>모든 인터랙티브 요소</strong>에 <InlineCode>Tab</InlineCode>
        으로 접근 가능해야 합니다. 네이티브 요소(
        <InlineCode>&lt;button&gt;</InlineCode>,{" "}
        <InlineCode>&lt;a&gt;</InlineCode>)를 우선 사용하세요.
        <br />
        2. <strong>포커스 표시(focus indicator)</strong>를 제거하지 마세요.{" "}
        <InlineCode>:focus-visible</InlineCode>로 키보드 포커스만 스타일링할 수
        있습니다.
        <br />
        3. <strong>포커스 트랩</strong> — 모달, 드롭다운 등에서 포커스가 밖으로
        빠져나가지 않도록 합니다.
        <br />
        4. <strong>Skip Navigation</strong> — 반복되는 네비게이션을 건너뛸 수
        있는 링크를 제공합니다.
        <br />
        5. <strong>Roving tabindex</strong> — 그룹 내에서 Arrow 키로 이동하고
        하나만 <InlineCode>tabIndex=0</InlineCode>을 유지합니다.
      </>
    ),
  },
];
