import type { MemoExample } from "./types";

export const MEMO_EXAMPLES: MemoExample[] = [
  {
    id: "without-memo",
    label: "memo 없음",
    description: "부모가 리렌더링되면 자식도 무조건 리렌더링됩니다.",
    code: `function Parent() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}>
        count: {count}
      </button>
      <Child name="Kim" />  {/* 매번 리렌더링! */}
    </div>
  );
}

function Child({ name }) {
  console.log('Child 렌더링');  // 매번 출력
  return <div>Hello {name}</div>;
}`,
  },
  {
    id: "with-memo",
    label: "React.memo",
    description: "props가 변경되지 않으면 리렌더링을 건너뜁니다.",
    code: `function Parent() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}>
        count: {count}
      </button>
      <MemoChild name="Kim" />  {/* props 동일 → 스킵! */}
    </div>
  );
}

const MemoChild = React.memo(function Child({ name }) {
  console.log('Child 렌더링');  // props 변경 시만 출력
  return <div>Hello {name}</div>;
});`,
  },
  {
    id: "shallow-compare",
    label: "얕은 비교 한계",
    description: "객체/배열 props는 매번 새 참조가 생겨 memo가 무효화됩니다.",
    code: `function Parent() {
  const [count, setCount] = useState(0);
  // ❌ 매 렌더링마다 새 객체 생성 → memo 무효화
  const style = { color: 'red' };
  const onClick = () => console.log('click');

  return (
    <MemoChild style={style} onClick={onClick} />
  );
}

// ✅ 해결: useMemo + useCallback
function Parent() {
  const [count, setCount] = useState(0);
  const style = useMemo(() => ({ color: 'red' }), []);
  const onClick = useCallback(() => console.log('click'), []);

  return (
    <MemoChild style={style} onClick={onClick} />
  );
}`,
  },
];
