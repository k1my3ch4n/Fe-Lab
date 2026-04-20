import { InlineCode } from "@shared/ui";
import type { InterviewQuestion } from "@shared/ui";

export const codeExamples = [
  {
    title: "디바운스 구현",
    code: `function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;

  return function (...args: Parameters<T>) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

// 사용 예
const handleSearch = debounce((query: string) => {
  fetch(\`/api/search?q=\${query}\`);
}, 300);

input.addEventListener("input", (e) => {
  handleSearch(e.target.value);
});`,
  },
  {
    title: "쓰로틀 구현",
    code: `function throttle<T extends (...args: any[]) => any>(
  fn: T,
  limit: number
): (...args: Parameters<T>) => void {
  let lastCall = 0;

  return function (...args: Parameters<T>) {
    const now = Date.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      fn(...args);
    }
  };
}

// trailing 포함 쓰로틀
function throttleWithTrailing<T extends (...args: any[]) => any>(
  fn: T,
  limit: number
) {
  let lastCall = 0;
  let timer: ReturnType<typeof setTimeout> | null = null;

  return function (...args: Parameters<T>) {
    const now = Date.now();
    const remaining = limit - (now - lastCall);

    if (remaining <= 0) {
      if (timer) { clearTimeout(timer); timer = null; }
      lastCall = now;
      fn(...args);
    } else if (!timer) {
      timer = setTimeout(() => {
        lastCall = Date.now();
        timer = null;
        fn(...args);
      }, remaining);
    }
  };
}`,
  },
  {
    title: "lodash 활용",
    code: `import { debounce, throttle } from "lodash";

// 디바운스: leading/trailing 옵션
const search = debounce(
  (query) => fetchResults(query),
  300,
  { leading: false, trailing: true }
);

// 쓰로틀: 스크롤 이벤트
const handleScroll = throttle(
  () => updateScrollPosition(),
  100,
  { leading: true, trailing: true }
);

// React에서 사용 시 주의
function SearchInput() {
  // useMemo로 디바운스 함수 캐싱
  const debouncedSearch = useMemo(
    () => debounce((q: string) => search(q), 300),
    []
  );

  // 컴포넌트 언마운트 시 정리
  useEffect(() => {
    return () => debouncedSearch.cancel();
  }, [debouncedSearch]);

  return <input onChange={e => debouncedSearch(e.target.value)} />;
}`,
  },
];

export const interviewQuestions: InterviewQuestion[] = [
  {
    question: "디바운스와 쓰로틀의 차이를 설명해주세요.",
    answer: (
      <>
        <strong>디바운스(Debounce)</strong>는 이벤트가 멈춘 후 일정 시간이
        지나야 실행됩니다. 연속 이벤트 중에는 타이머가 계속 리셋됩니다. 검색
        입력, 윈도우 리사이즈 완료 후 처리에 적합합니다.{" "}
        <strong>쓰로틀(Throttle)</strong>은 일정 간격으로{" "}
        <strong>최대 1회</strong> 실행을 보장합니다. 스크롤 이벤트, 버튼 연타
        방지에 적합합니다. 디바운스는 &quot;마지막 이벤트 후&quot;, 쓰로틀은
        &quot;일정 간격마다&quot; 실행됩니다.
      </>
    ),
  },
  {
    question: "디바운스 함수를 직접 구현해보세요.",
    answer: (
      <>
        핵심 원리: <InlineCode>setTimeout</InlineCode>과{" "}
        <InlineCode>clearTimeout</InlineCode>을 클로저로 관리합니다. 함수가
        호출될 때마다 이전 타이머를 취소하고 새 타이머를 설정합니다. 지정된{" "}
        <InlineCode>delay</InlineCode> 동안 추가 호출이 없으면 실제 함수가
        실행됩니다. <InlineCode>leading</InlineCode> 옵션을 추가하면 첫 호출 시
        즉시 실행하고, 이후 연속 호출을 무시할 수 있습니다.
      </>
    ),
  },
  {
    question: "디바운스/쓰로틀의 실제 사용 사례는?",
    answer: (
      <>
        <strong>디바운스</strong>: 1. 검색 자동완성 (타이핑 멈춘 후 API 호출) 2.
        윈도우 리사이즈 후 레이아웃 재계산 3. 폼 유효성 검사 (입력 완료 후 검증){" "}
        <strong>쓰로틀</strong>: 1. 무한 스크롤 (스크롤 위치 확인) 2.{" "}
        <InlineCode>mousemove</InlineCode> 이벤트 처리 3. 버튼 연타 방지 (결제
        버튼) 4. 게임에서 FPS 제한
      </>
    ),
  },
];
