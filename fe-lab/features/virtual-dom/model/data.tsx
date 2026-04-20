import { InlineCode } from "@shared/ui";
import type { InterviewQuestion } from "@shared/ui";

export const codeExamples = [
  {
    title: "Virtual DOM 개념",
    code: `// Virtual DOM은 실제 DOM의 가벼운 JS 객체 표현입니다
const vNode = {
  type: 'div',
  props: { className: 'container' },
  children: [
    {
      type: 'h1',
      props: {},
      children: ['Hello World']
    },
    {
      type: 'p',
      props: { style: { color: 'blue' } },
      children: ['Virtual DOM은 빠릅니다']
    }
  ]
};

// React.createElement가 이런 객체를 생성합니다
// JSX → React.createElement() → Virtual DOM 객체
const element = <div className="container">
  <h1>Hello World</h1>
</div>;
// 내부적으로 위와 같은 JS 객체가 됩니다`,
  },
  {
    title: "React의 재조정",
    code: `// React의 재조정(Reconciliation) 알고리즘
// 1. 두 트리의 루트 요소부터 비교 시작

// Case 1: 타입이 다르면 → 전체 서브트리 교체
<div> → <span>  // 완전히 새로 마운트

// Case 2: 같은 타입의 DOM 요소 → 속성만 비교
<div className="old" />
<div className="new" />
// → className만 업데이트

// Case 3: 같은 타입의 컴포넌트
<MyComponent name="old" />
<MyComponent name="new" />
// → props 전달 후 render() 비교

// 자식 요소는 재귀적으로 비교
// 리스트는 key를 사용해 효율적으로 매칭
<ul>
  <li key="a">A</li>  {/* 유지 */}
  <li key="b">B</li>  {/* 유지 */}
  <li key="c">C</li>  {/* 새로 추가 */}
</ul>`,
  },
  {
    title: "key prop의 중요성",
    code: `// ❌ 안티패턴: index를 key로 사용
{items.map((item, index) => (
  <ListItem key={index} data={item} />
))}
// 문제: 리스트 중간에 삽입/삭제 시
// 모든 뒤의 요소가 불필요하게 리렌더링됨

// ✅ 올바른 패턴: 고유한 식별자 사용
{items.map((item) => (
  <ListItem key={item.id} data={item} />
))}
// 장점: 삽입/삭제 시에도 기존 요소 재사용

// 왜 key가 중요한가?
// React는 key로 이전/이후 노드를 매칭합니다
// Before: [A:1] [B:2] [C:3]
// After:  [A:1] [D:4] [B:2] [C:3]
//
// key=index → B,C가 변경된 것으로 인식 (비효율)
// key=id   → D만 새로 삽입된 것으로 인식 (효율)`,
  },
];

export const interviewQuestions: InterviewQuestion[] = [
  {
    question: "Virtual DOM이란 무엇이고 왜 사용하나요?",
    answer: (
      <>
        Virtual DOM은 <strong>실제 DOM의 가벼운 JavaScript 객체 복사본</strong>
        입니다. 실제 DOM 조작은 비용이 크기 때문에, 변경 사항을 먼저 Virtual
        DOM에 반영하고 <strong>
          이전 Virtual DOM과 비교(Diffing)
        </strong>하여 <strong>실제로 변경된 부분만</strong> Real DOM에
        반영합니다. 이를 통해 불필요한 리플로우/리페인트를 최소화하고, 개발자는{" "}
        <InlineCode size="md">선언적 UI</InlineCode>를 작성할 수 있어 생산성이
        향상됩니다.
      </>
    ),
  },
  {
    question: "React의 Diffing 알고리즘은 어떻게 동작하나요?",
    answer: (
      <>
        React는 두 가지 가정으로 O(n) 복잡도의 휴리스틱 알고리즘을 사용합니다.{" "}
        1. <strong>다른 타입의 요소는 다른 트리를 생성</strong>합니다 —{" "}
        <InlineCode size="md">&lt;div&gt;</InlineCode>에서{" "}
        <InlineCode size="md">&lt;span&gt;</InlineCode>으로 바뀌면 전체
        서브트리를 교체합니다. 2.{" "}
        <strong>key prop으로 자식 요소의 안정적 식별</strong>이 가능합니다 —
        같은 key를 가진 요소는 동일한 요소로 인식하여 재사용합니다. 비교는
        루트부터 재귀적으로 진행되며, 같은 타입이면 속성만 비교하고 다른
        타입이면 전체를 교체합니다.
      </>
    ),
  },
  {
    question: "리스트 렌더링에서 key가 중요한 이유는 무엇인가요?",
    answer: (
      <>
        <InlineCode size="md">key</InlineCode>는 React가 리스트의 각 요소를{" "}
        <strong>고유하게 식별</strong>하는 데 사용됩니다. key가 없거나{" "}
        <InlineCode size="md">index</InlineCode>를 key로 사용하면, 리스트 중간에
        요소가 삽입/삭제될 때 뒤의 모든 요소가 변경된 것으로 인식되어{" "}
        <strong>불필요한 리렌더링</strong>이 발생합니다. 고유한{" "}
        <InlineCode size="md">id</InlineCode>를 key로 사용하면 React가 정확히
        어떤 요소가 추가/삭제/이동되었는지 파악하여{" "}
        <strong>최소한의 DOM 조작</strong>만 수행합니다.
      </>
    ),
  },
];
