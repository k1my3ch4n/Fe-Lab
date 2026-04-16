import { InlineCode } from "@shared/ui";
import type { InterviewQuestion } from "@shared/ui";

export const codeExamples = [
  {
    title: "useEffect 실행 시점",
    code: `function Timer() {
  const [count, setCount] = useState(0);

  // 1. 마운트 시에만 실행 (빈 의존성 배열)
  useEffect(() => {
    console.log('마운트됨');
    const id = setInterval(() => {
      setCount(c => c + 1);
    }, 1000);

    // 언마운트 시 클린업
    return () => {
      console.log('언마운트 - 타이머 정리');
      clearInterval(id);
    };
  }, []);  // [] → componentDidMount + componentWillUnmount

  // 2. count가 변경될 때마다 실행
  useEffect(() => {
    document.title = \`Count: \${count}\`;
    console.log(\`count 변경: \${count}\`);
  }, [count]);  // [count] → count 변경 시마다 실행

  // 3. 매 렌더마다 실행 (의존성 배열 없음)
  useEffect(() => {
    console.log('매 렌더마다 실행');
  });  // 의존성 배열 생략 → 모든 렌더 후 실행

  return <div>{count}</div>;
}`,
  },
  {
    title: "useLayoutEffect vs useEffect",
    code: `function MeasureElement() {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  // useLayoutEffect: DOM 변경 직후, 페인트 전 동기 실행
  // → 레이아웃 측정, DOM 조작에 적합
  // → 깜빡임(flicker) 방지
  useLayoutEffect(() => {
    if (ref.current) {
      const h = ref.current.getBoundingClientRect().height;
      setHeight(h);  // 페인트 전에 반영 → 깜빡임 없음
    }
  }, []);

  // useEffect: 페인트 후 비동기 실행
  // → 데이터 fetching, 이벤트 구독에 적합
  // → 레이아웃 측정에 사용하면 깜빡임 발생 가능
  useEffect(() => {
    // 이미 화면이 그려진 후 실행됨
    console.log('화면이 그려진 후 실행');
    fetchData();
  }, []);

  return <div ref={ref}>높이: {height}px</div>;
}`,
  },
  {
    title: "커스텀 훅 패턴",
    code: `// 커스텀 훅: 라이프사이클 로직을 재사용 가능하게 추출
function useWindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    // Mount: 이벤트 리스너 등록
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    // Unmount: 클린업 - 이벤트 리스너 해제
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);  // 빈 배열 → Mount/Unmount에서만 실행

  return size;
}

// 사용
function App() {
  const { width, height } = useWindowSize();
  return <p>화면: {width} x {height}</p>;
}`,
  },
];

export const interviewQuestions: InterviewQuestion[] = [
  {
    question: "useEffect의 실행 시점은 언제인가요?",
    answer: (
      <>
        <InlineCode>useEffect</InlineCode>는{" "}
        <strong>브라우저가 화면을 페인트한 후</strong> 비동기적으로 실행됩니다.
        의존성 배열에 따라 실행 시점이 달라집니다: 빈 배열{" "}
        <InlineCode>[]</InlineCode>이면 마운트 시 1회, 의존성이 있으면 해당 값
        변경 시마다, 배열을 생략하면 매 렌더 후 실행됩니다. 클린업 함수는 다음
        이펙트 실행 전 또는 언마운트 시 호출됩니다.
      </>
    ),
  },
  {
    question: "useEffect와 useLayoutEffect의 차이는 무엇인가요?",
    answer: (
      <>
        <InlineCode>useEffect</InlineCode>는 브라우저 <strong>페인트 후</strong>{" "}
        비동기 실행되고,
        <InlineCode>useLayoutEffect</InlineCode>는 DOM 변경 직후{" "}
        <strong>페인트 전</strong> 동기 실행됩니다.
        <InlineCode>useLayoutEffect</InlineCode>는 DOM 측정이나 레이아웃 기반
        업데이트에 적합하며, 깜빡임(flicker) 없이 동기적으로 DOM을 조작할 수
        있습니다. 대부분의 경우 <InlineCode>useEffect</InlineCode>를 사용하고,
        레이아웃 측정이 필요한 경우에만 <InlineCode>useLayoutEffect</InlineCode>
        를 사용합니다.
      </>
    ),
  },
  {
    question: "클린업 함수의 역할은 무엇인가요?",
    answer: (
      <>
        클린업 함수는 <InlineCode>useEffect</InlineCode>에서 반환하는 함수로,
        <strong>이전 이펙트를 정리</strong>하는 역할을 합니다. 타이머 해제(
        <InlineCode>clearInterval</InlineCode>), 이벤트 리스너 제거, 구독 해제,
        네트워크 요청 취소 등에 사용됩니다. 컴포넌트가 <strong>언마운트</strong>
        되거나 의존성이 변경되어
        <strong>다음 이펙트가 실행되기 전</strong>에 호출됩니다. 클린업을
        누락하면 메모리 누수나 예상치 못한 동작이 발생할 수 있습니다.
      </>
    ),
  },
  {
    question: "리액트 렌더링 라이프사이클에서 커밋 단계는 어떻게 동작하나요?",
    answer: (
      <>
        React의 렌더링은 <strong>렌더 단계</strong>와 <strong>커밋 단계</strong>
        로 나뉩니다. 렌더 단계에서는 Virtual DOM을 생성하고 이전과
        비교(diffing)합니다. 이 단계는{" "}
        <strong>순수하고 부수효과가 없어야</strong> 합니다.
        <br />
        <br />
        커밋 단계에서는 실제 DOM에 변경을 적용하고,{" "}
        <InlineCode>useLayoutEffect</InlineCode> → DOM 업데이트 → 브라우저
        페인트 → <InlineCode>useEffect</InlineCode> 순서로 실행됩니다. Fiber
        아키텍처에서 렌더 단계는 중단 가능하지만, 커밋 단계는{" "}
        <strong>동기적으로 한 번에 실행</strong>됩니다.
      </>
    ),
  },
  {
    question: "useEffect의 클린업 함수가 언제 실행되며, 왜 필요한가요?",
    answer: (
      <>
        클린업 함수는 <strong>두 가지 시점</strong>에 실행됩니다: 1. 컴포넌트가{" "}
        <strong>언마운트</strong>될 때 2. 의존성이 변경되어{" "}
        <strong>다음 이펙트가 실행되기 직전</strong>에
        <br />
        <br />
        필요한 이유: 타이머(<InlineCode>setInterval</InlineCode>), 이벤트
        리스너, 구독(subscription), WebSocket 연결 등
        <strong>외부 리소스를 정리</strong>하지 않으면 메모리 누수가 발생합니다.
        또한 이전 이펙트의 상태가 남아 <strong>stale closure</strong> 문제를
        일으킬 수 있습니다.
      </>
    ),
  },
];
