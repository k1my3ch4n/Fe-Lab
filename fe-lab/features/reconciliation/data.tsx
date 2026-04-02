import { InlineCode } from "@shared/ui";
import type { InterviewQuestion } from "@shared/ui";

export const codeExamples = [
  {
    title: "재조정 알고리즘 기본",
    code: `// React는 두 트리를 비교할 때 O(n) 휴리스틱을 사용합니다.

// 규칙 1: 다른 타입의 엘리먼트 → 트리를 버리고 새로 구축
// Before
<div>
  <Counter />
</div>

// After — div → span 변경 시 Counter도 언마운트
<span>
  <Counter />  // 새로운 인스턴스 (state 초기화)
</span>

// 규칙 2: 같은 타입의 엘리먼트 → 속성만 비교
// Before
<div className="old" title="stuff" />

// After — className만 변경
<div className="new" title="stuff" />
// → DOM에서 className만 업데이트`,
  },
  {
    title: "key를 사용한 리스트 최적화",
    code: `// ❌ key 없이 — 앞에 추가하면 전부 변경
<ul>
  <li>Apple</li>     {/* index 0: Apple → Cherry */}
  <li>Banana</li>    {/* index 1: Banana → Apple */}
                     {/* index 2: Banana 새로 생성 */}
</ul>

// ✅ key 사용 — 기존 항목 재사용
<ul>
  <li key="c">Cherry</li>  {/* 새로 삽입 */}
  <li key="a">Apple</li>   {/* 재사용 (이동만) */}
  <li key="b">Banana</li>  {/* 재사용 (이동만) */}
</ul>

// ⚠️ index를 key로 사용하면 key가 없는 것과 동일
// → 항목 순서가 변하면 불필요한 리렌더링 발생
{items.map((item, index) => (
  <li key={index}>{item}</li>  // 안티패턴
))}`,
  },
  {
    title: "shouldComponentUpdate / React.memo",
    code: `// 재조정을 최적화하는 방법들

// 1. React.memo — props가 같으면 리렌더링 스킵
const ExpensiveList = React.memo(({ items }) => {
  return items.map(item => <Item key={item.id} {...item} />);
});

// 2. useMemo — 계산 결과 메모이제이션
function Parent({ data }) {
  const processed = useMemo(
    () => data.filter(d => d.active).sort(byDate),
    [data]
  );
  return <ExpensiveList items={processed} />;
}

// 3. 상태를 최대한 아래로 내리기
// Before — 전체 리렌더링
function App() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <Counter count={count} setCount={setCount} />
      <ExpensiveTree />  {/* 불필요한 리렌더링 */}
    </div>
  );
}

// After — Counter만 리렌더링
function Counter() {
  const [count, setCount] = useState(0);
  return <button>{count}</button>;
}`,
  },
];

export const interviewQuestions: InterviewQuestion[] = [
  {
    question: "React의 재조정(Reconciliation)이란 무엇인가요?",
    answer: (
      <>
        재조정은 React가{" "}
        <strong>Virtual DOM의 이전 트리와 새 트리를 비교</strong>
        하여 실제 DOM에 최소한의 변경만 적용하는 알고리즘입니다. 일반적인 트리
        비교 알고리즘은 <InlineCode size="md">O(n³)</InlineCode>이지만, React는
        두 가지 휴리스틱으로 <InlineCode size="md">O(n)</InlineCode>으로
        최적화합니다: 1) 다른 타입의 엘리먼트는 다른 트리를 생성한다고 가정 2){" "}
        <InlineCode size="md">key</InlineCode> prop으로 자식 엘리먼트의 안정적
        식별
      </>
    ),
  },
  {
    question: "리스트에서 key의 역할은 무엇인가요?",
    answer: (
      <>
        <InlineCode size="md">key</InlineCode>는 React가 리스트의 각 항목을{" "}
        <strong>고유하게 식별</strong>할 수 있게 해줍니다. key가 없으면 인덱스
        기반으로 비교하여 앞에 항목을 추가할 때 모든 항목이 변경된 것으로
        간주됩니다. key가 있으면 같은 key끼리 비교하므로 기존 DOM 노드를{" "}
        <strong>재사용</strong>하고 새 항목만 삽입합니다.
        <br />
        <br />
        주의: <InlineCode size="md">index</InlineCode>를 key로 사용하면 순서
        변경 시 key가 없는 것과 동일한 문제가 발생하며, 컴포넌트의 state가 꼬일
        수 있습니다.
      </>
    ),
  },
  {
    question: "Fiber 아키텍처와 재조정의 관계를 설명해주세요.",
    answer: (
      <>
        <strong>Fiber</strong>는 React 16에서 도입된 새로운 재조정 엔진입니다.
        기존 Stack Reconciler는 트리를 동기적으로 순회하여 렌더링이 오래 걸리면
        메인 스레드를 블로킹했습니다. Fiber는 작업을{" "}
        <InlineCode size="md">작은 단위(unit of work)</InlineCode>로 나누고,
        우선순위에 따라 <strong>작업을 중단하고 재개</strong>할 수 있습니다.
        이를 통해 애니메이션, 사용자 입력 등 긴급한 업데이트를 먼저 처리하는{" "}
        <InlineCode size="md">Concurrent Mode</InlineCode>의 기반이 됩니다. 각
        Fiber 노드는 컴포넌트의 상태, 작업 유형, 부모/자식/형제 참조를 가진 연결
        리스트 구조입니다.
      </>
    ),
  },
];
