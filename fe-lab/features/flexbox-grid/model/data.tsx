import { InlineCode } from "@shared/ui";
import type { InterviewQuestion } from "@shared/ui";

export const codeExamples = [
  {
    title: "Flexbox 패턴",
    code: `/* 가운데 정렬 */
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 네비게이션 바 */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
}

/* 카드 레이아웃 */
.card-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.card {
  flex: 1 1 300px;  /* grow shrink basis */
  /* 최소 300px, 남은 공간 균등 분배 */
}`,
  },
  {
    title: "Grid 패턴",
    code: `/* 기본 그리드 */
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

/* Holy Grail 레이아웃 */
.layout {
  display: grid;
  grid-template-columns: 200px 1fr 200px;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header header header"
    "sidebar main aside"
    "footer footer footer";
  min-height: 100vh;
}

/* 자동 맞춤 반응형 */
.auto-fit {
  display: grid;
  grid-template-columns:
    repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}`,
  },
  {
    title: "반응형 그리드",
    code: `/* auto-fill vs auto-fit */

/* auto-fill: 빈 트랙 유지 */
.auto-fill {
  grid-template-columns:
    repeat(auto-fill, minmax(200px, 1fr));
}

/* auto-fit: 빈 트랙 축소 → 아이템 확장 */
.auto-fit {
  grid-template-columns:
    repeat(auto-fit, minmax(200px, 1fr));
}

/* subgrid (최신) */
.parent {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
.child {
  grid-column: span 3;
  display: grid;
  grid-template-columns: subgrid;
}`,
  },
];

export const interviewQuestions: InterviewQuestion[] = [
  {
    question: "Flexbox와 Grid의 차이는 무엇인가요?",
    answer: (
      <>
        <InlineCode>Flexbox</InlineCode>는 <strong>1차원</strong> 레이아웃
        시스템으로, 행 또는 열 한 방향으로 아이템을 배치합니다.{" "}
        <InlineCode>Grid</InlineCode>는 <strong>2차원</strong> 레이아웃
        시스템으로, 행과 열을 동시에 제어합니다. Flexbox는 콘텐츠 기반(아이템
        크기에 따라 유동적), Grid는 레이아웃 기반(미리 정의된 그리드
        구조)입니다. 일반적으로 <strong>컴포넌트 내부 정렬은 Flexbox</strong>,{" "}
        <strong>페이지 레이아웃은 Grid</strong>를 사용합니다.
      </>
    ),
  },
  {
    question: "flex-grow, flex-shrink, flex-basis를 설명해주세요.",
    answer: (
      <>
        <InlineCode>flex-basis</InlineCode>는 아이템의{" "}
        <strong>초기 크기</strong>를 설정합니다 (width/height 대신 사용).{" "}
        <InlineCode>flex-grow</InlineCode>는 <strong>남은 공간</strong>을 아이템
        간에 분배하는 비율입니다 (0이면 확장 안 함).{" "}
        <InlineCode>flex-shrink</InlineCode>는 공간이{" "}
        <strong>부족할 때 축소</strong>되는 비율입니다 (0이면 축소 안 함).
        축약형: <InlineCode>flex: grow shrink basis</InlineCode> (예:{" "}
        <InlineCode>flex: 1 1 300px</InlineCode>).
      </>
    ),
  },
  {
    question: "언제 Flexbox를, 언제 Grid를 사용하나요?",
    answer: (
      <>
        <strong>Flexbox 사용</strong>: 네비게이션 바, 버튼 그룹, 카드 내부 정렬,
        아이콘+텍스트 정렬 등 <strong>1차원 배치</strong>가 필요할 때.{" "}
        <strong>Grid 사용</strong>: 페이지 전체 레이아웃, 대시보드, 갤러리 등{" "}
        <strong>2차원 배치</strong>가 필요할 때. 실무에서는 둘을 함께 사용합니다
        — Grid로 큰 레이아웃을 잡고, 각 영역 내부는 Flexbox로 정렬합니다.
      </>
    ),
  },
];
