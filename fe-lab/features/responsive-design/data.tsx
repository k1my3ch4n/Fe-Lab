import { InlineCode } from "@shared/ui";
import type { InterviewQuestion } from "@shared/ui";

export const codeExamples = [
  {
    title: "미디어 쿼리",
    code: `/* 모바일 퍼스트 접근 */
.container {
  padding: 1rem;
}

/* 태블릿 이상 */
@media (min-width: 768px) {
  .container {
    padding: 2rem;
    max-width: 720px;
    margin: 0 auto;
  }
}

/* 데스크톱 이상 */
@media (min-width: 1024px) {
  .container {
    max-width: 960px;
  }
  .sidebar {
    display: block; /* 모바일에서 숨겨진 사이드바 표시 */
  }
}`,
  },
  {
    title: "clamp / min / max",
    code: `/* clamp(최소값, 선호값, 최대값) */

/* 유동적 폰트 크기 */
h1 {
  font-size: clamp(1.5rem, 4vw, 3rem);
}

/* 유동적 여백 */
.section {
  padding: clamp(1rem, 5vw, 4rem);
}

/* 유동적 컨테이너 너비 */
.container {
  width: min(90%, 1200px);
  /* = min(90vw, 1200px) */
}

/* 최소 높이 보장 */
.hero {
  min-height: max(50vh, 400px);
}`,
  },
  {
    title: "Container Query",
    code: `/* 컨테이너 정의 */
.card-wrapper {
  container-type: inline-size;
  container-name: card;
}

/* 컨테이너 너비에 따라 반응 */
@container card (min-width: 400px) {
  .card {
    display: flex;
    gap: 1rem;
  }
  .card-image {
    width: 120px;
    flex-shrink: 0;
  }
}

@container card (max-width: 399px) {
  .card {
    display: block;
  }
  .card-image {
    width: 100%;
    aspect-ratio: 16/9;
  }
}`,
  },
];

export const interviewQuestions: InterviewQuestion[] = [
  {
    question: "반응형 디자인 전략에는 어떤 것들이 있나요?",
    answer: (
      <>
        1. <strong>미디어 쿼리</strong> — viewport 크기에 따른 breakpoint 기반
        스타일 변경 2. <strong>유동적 단위</strong> —{" "}
        <InlineCode>vw</InlineCode>, <InlineCode>vh</InlineCode>,{" "}
        <InlineCode>%</InlineCode>, <InlineCode>rem</InlineCode> 등 상대 단위
        사용 3. <strong>CSS 함수</strong> — <InlineCode>clamp()</InlineCode>,{" "}
        <InlineCode>min()</InlineCode>, <InlineCode>max()</InlineCode>로 유동적
        값 설정 4. <strong>Container Query</strong> — 부모 컨테이너 크기 기반
        반응형 (최신) 5. <strong>반응형 이미지</strong> —{" "}
        <InlineCode>srcset</InlineCode>,{" "}
        <InlineCode>{"<picture>"}</InlineCode> 태그 활용
      </>
    ),
  },
  {
    question: "clamp()와 Container Query를 설명해주세요.",
    answer: (
      <>
        <InlineCode>clamp(min, preferred, max)</InlineCode>는 CSS 함수로,{" "}
        <strong>최솟값과 최댓값 사이에서 선호 값</strong>을 사용합니다. 미디어
        쿼리 없이 유동적 타이포그래피나 간격을 구현할 수 있습니다.{" "}
        <strong>Container Query</strong>는 viewport가 아닌{" "}
        <strong>부모 컨테이너</strong>의 크기에 반응하는 기능입니다.{" "}
        <InlineCode>container-type: inline-size</InlineCode>로 컨테이너를
        정의하고 <InlineCode>@container</InlineCode> 규칙으로 스타일을
        적용합니다.
      </>
    ),
  },
  {
    question: "모바일 퍼스트 vs 데스크톱 퍼스트의 차이는?",
    answer: (
      <>
        <strong>모바일 퍼스트</strong>는 기본 스타일을 모바일용으로 작성하고{" "}
        <InlineCode>min-width</InlineCode> 미디어 쿼리로 확장합니다.{" "}
        <strong>데스크톱 퍼스트</strong>는 기본 스타일을 데스크톱용으로 작성하고{" "}
        <InlineCode>max-width</InlineCode> 미디어 쿼리로 축소합니다. 모바일
        퍼스트가 권장되는 이유: 1. 모바일 사용자가 더 많음 2. 성능 최적화 (작은
        화면에 불필요한 스타일 로드 방지) 3. 점진적 향상 원칙에 부합
      </>
    ),
  },
];
