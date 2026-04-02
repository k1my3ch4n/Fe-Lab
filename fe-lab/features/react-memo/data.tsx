import { InlineCode } from "@shared/ui";
import type { InterviewQuestion } from "@shared/ui";

export const codeExamples = [
  {
    title: "React.memo 기본",
    code: `import { memo } from 'react';

// props가 변경되지 않으면 리렌더링 스킵
const ExpensiveList = memo(function ExpensiveList({ items }) {
  console.log('ExpensiveList 렌더링');
  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
});

// 커스텀 비교 함수
const DeepMemoChild = memo(
  function Child({ data }) {
    return <div>{data.value}</div>;
  },
  (prevProps, nextProps) => {
    // true 반환 → 리렌더링 스킵
    return prevProps.data.value === nextProps.data.value;
  }
);`,
  },
  {
    title: "useMemo / useCallback",
    code: `import { useMemo, useCallback, memo } from 'react';

function SearchPage({ query, onSelect }) {
  // 비용이 큰 계산 결과를 메모이제이션
  const filtered = useMemo(() => {
    return hugeList.filter(item =>
      item.name.includes(query)
    );
  }, [query]); // query가 변경될 때만 재계산

  // 콜백 함수 참조 유지
  const handleClick = useCallback((id) => {
    onSelect(id);
  }, [onSelect]);

  return (
    <MemoList items={filtered} onClick={handleClick} />
  );
}

const MemoList = memo(function List({ items, onClick }) {
  return items.map(item => (
    <div key={item.id} onClick={() => onClick(item.id)}>
      {item.name}
    </div>
  ));
});`,
  },
  {
    title: "React Compiler (자동 메모이제이션)",
    code: `// React Compiler (React 19+)가 자동으로 메모이제이션을 적용
// 수동 memo, useMemo, useCallback이 필요 없어짐

// ❌ 이전: 수동 메모이제이션
const MemoChild = memo(function Child({ data }) {
  const processed = useMemo(() => expensiveCalc(data), [data]);
  const onClick = useCallback(() => handle(data), [data]);
  return <div onClick={onClick}>{processed}</div>;
});

// ✅ React Compiler: 자동 처리
function Child({ data }) {
  // 컴파일러가 자동으로 메모이제이션 삽입
  const processed = expensiveCalc(data);
  const onClick = () => handle(data);
  return <div onClick={onClick}>{processed}</div>;
}

// next.config.js에서 활성화
// module.exports = {
//   experimental: { reactCompiler: true }
// };`,
  },
];

export const interviewQuestions: InterviewQuestion[] = [
  {
    question: "React.memo의 동작 원리와 얕은 비교의 한계를 설명해주세요.",
    answer: (
      <>
        <InlineCode>React.memo</InlineCode>는 컴포넌트를 감싸서 props가 변경되지
        않으면 리렌더링을 스킵하는 고차 컴포넌트입니다. 기본적으로{" "}
        <strong>얕은 비교(shallow comparison)</strong>를 수행합니다.
        <br />
        <br />
        한계: 객체나 배열 props는 매 렌더링마다 새 참조가 생성되므로 얕은
        비교에서 항상 &ldquo;변경됨&rdquo;으로 판단됩니다. 이를 해결하려면{" "}
        <InlineCode>useMemo</InlineCode>/<InlineCode>useCallback</InlineCode>
        으로 참조를 유지하거나 커스텀 비교 함수를 전달해야 합니다.
      </>
    ),
  },
  {
    question: "useMemo와 useCallback의 차이점은?",
    answer: (
      <>
        <InlineCode>useMemo</InlineCode>는 <strong>값</strong>을
        메모이제이션합니다 — 비용이 큰 계산 결과를 캐싱하여 의존성이 변경될 때만
        재계산합니다.
        <InlineCode>useCallback</InlineCode>은 <strong>함수 참조</strong>를
        메모이제이션합니다 — 의존성이 변경되지 않으면 동일한 함수 참조를
        반환합니다.
        <br />
        <br />
        사실 <InlineCode>useCallback(fn, deps)</InlineCode>는
        <InlineCode>useMemo(() =&gt; fn, deps)</InlineCode>의 축약형입니다. 주로{" "}
        <InlineCode>React.memo</InlineCode>로 감싼 자식 컴포넌트에 콜백을 전달할
        때 사용합니다.
      </>
    ),
  },
  {
    question: "React Compiler(자동 메모이제이션)의 원리를 설명해주세요.",
    answer: (
      <>
        React Compiler는 <strong>빌드 타임에 코드를 분석</strong>하여 자동으로
        메모이제이션을 삽입합니다. 개발자가 수동으로{" "}
        <InlineCode>memo</InlineCode>, <InlineCode>useMemo</InlineCode>,
        <InlineCode>useCallback</InlineCode>을 작성할 필요가 없어집니다.
        <br />
        <br />
        컴파일러는 React의 규칙(순수 함수, 불변성 등)을 따르는 코드를 감지하고,
        값과 함수의 의존성을 분석하여 최적의 메모이제이션 코드를 자동
        생성합니다. React 19부터 실험적으로 지원됩니다.
      </>
    ),
  },
];
