import type { RefExample } from "./types";

export const REF_EXAMPLES: RefExample[] = [
  {
    id: "ref-vs-state",
    label: "useRef vs useState",
    description: "useRef는 값이 변경되어도 리렌더링을 트리거하지 않습니다.",
    code: `function Counter() {
  const [stateCount, setStateCount] = useState(0);
  const refCount = useRef(0);

  const handleState = () => {
    setStateCount(c => c + 1);  // 리렌더링 O
  };

  const handleRef = () => {
    refCount.current += 1;       // 리렌더링 X
    console.log(refCount.current);
  };

  console.log('렌더링 발생!');
  return (/* ... */);
}`,
  },
  {
    id: "dom-ref",
    label: "DOM 참조",
    description: "useRef로 DOM 요소에 직접 접근할 수 있습니다.",
    code: `function TextInput() {
  const inputRef = useRef(null);

  const focusInput = () => {
    inputRef.current.focus();      // DOM 직접 접근
  };

  const scrollToInput = () => {
    inputRef.current.scrollIntoView({
      behavior: 'smooth'
    });
  };

  return (
    <input ref={inputRef} placeholder="클릭하면 포커스" />
  );
}`,
  },
  {
    id: "previous-value",
    label: "이전 값 저장",
    description: "useRef로 이전 렌더링의 값을 기억할 수 있습니다.",
    code: `function PreviousValue({ value }) {
  const prevRef = useRef();

  useEffect(() => {
    prevRef.current = value;  // 렌더링 후 업데이트
  });

  return (
    <div>
      <p>현재 값: {value}</p>
      <p>이전 값: {prevRef.current}</p>
    </div>
  );
}

// 커스텀 훅으로 추출
function usePrevious(value) {
  const ref = useRef();
  useEffect(() => { ref.current = value; });
  return ref.current;
}`,
  },
];
