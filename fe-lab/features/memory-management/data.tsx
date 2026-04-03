import { InlineCode } from "@shared/ui";
import type { InterviewQuestion } from "@shared/ui";

export const codeExamples = [
  {
    title: "메모리 릭 방지 패턴",
    code: `// React 컴포넌트에서의 cleanup
useEffect(() => {
  const controller = new AbortController();

  fetch('/api/data', { signal: controller.signal })
    .then(res => res.json())
    .then(setData);

  const handler = () => console.log('resize');
  window.addEventListener('resize', handler);

  const timer = setInterval(() => tick(), 1000);

  // ✅ cleanup: 모든 비동기 작업 정리
  return () => {
    controller.abort();                        // fetch 취소
    window.removeEventListener('resize', handler); // 리스너 해제
    clearInterval(timer);                      // 타이머 해제
  };
}, []);

// ✅ 전역 참조 관리
let cache = new Map();
function clearCache() {
  cache.clear(); // 명시적 해제
  cache = null;  // 참조 끊기
}`,
  },
  {
    title: "GC 최적화",
    code: `// 객체 풀링 (Object Pooling)
class ObjectPool {
  #pool = [];

  acquire() {
    return this.#pool.pop() || this.#createNew();
  }

  release(obj) {
    this.#reset(obj);
    this.#pool.push(obj); // GC 대신 재사용
  }

  #createNew() { return { x: 0, y: 0, active: false }; }
  #reset(obj) { obj.x = 0; obj.y = 0; obj.active = false; }
}

// ✅ 큰 배열 처리 후 참조 해제
function processLargeData() {
  let data = new Array(1_000_000).fill(0);
  const result = data.reduce((a, b) => a + b, 0);
  data = null; // 명시적으로 GC 대상으로 만듦
  return result;
}

// ✅ 단명 객체 최소화 (루프 내 객체 생성 지양)
// ❌ for (let i = 0; i < 1000; i++) { const p = { x: i }; }
// ✅ const p = { x: 0 };
//    for (let i = 0; i < 1000; i++) { p.x = i; }`,
  },
  {
    title: "WeakRef / WeakMap 활용",
    code: `// WeakMap: 키가 GC될 수 있는 Map
const metadata = new WeakMap();

function track(element) {
  metadata.set(element, {
    clickCount: 0,
    createdAt: Date.now(),
  });
}

// element가 DOM에서 제거되면
// → WeakMap의 엔트리도 자동으로 GC 대상

// WeakRef: 약한 참조
class Cache {
  #cache = new Map();

  set(key, value) {
    this.#cache.set(key, new WeakRef(value));
  }

  get(key) {
    const ref = this.#cache.get(key);
    if (!ref) return undefined;

    const value = ref.deref(); // GC되었으면 undefined
    if (!value) {
      this.#cache.delete(key); // 정리
      return undefined;
    }
    return value;
  }
}

// FinalizationRegistry: GC 시 콜백
const registry = new FinalizationRegistry((key) => {
  console.log(\`\${key} has been garbage collected\`);
});

let obj = { data: 'important' };
registry.register(obj, 'myObj');
obj = null; // GC 시 콜백 실행됨`,
  },
];

export const interviewQuestions: InterviewQuestion[] = [
  {
    question: "JavaScript에서 메모리 릭이 발생하는 주요 원인은 무엇인가요?",
    answer: (
      <>
        1. <strong>해제되지 않은 이벤트 리스너</strong> — 등록 후
        removeEventListener를 호출하지 않음 2.{" "}
        <strong>클로저의 의도치 않은 참조</strong> — 불필요한 변수를 계속
        참조하는 클로저 3. <strong>분리된 DOM 노드</strong> — DOM에서 제거했지만
        JS 변수가 참조 유지 4. <strong>전역 변수</strong> — 실수로 전역에 할당된
        변수 5. <strong>해제되지 않은 타이머/인터벌</strong> — clearInterval,
        clearTimeout 미호출 6. <strong>콘솔 로그</strong> — 개발자 도구가 열린
        상태에서 console.log의 참조 유지
      </>
    ),
  },
  {
    question: "가비지 컬렉션(GC)의 동작 방식을 설명해주세요.",
    answer: (
      <>
        현대 JavaScript 엔진(V8)은 <strong>Mark-and-Sweep</strong> 알고리즘을
        사용합니다.
        <strong>Mark 단계</strong>에서 루트(전역 객체, 스택)에서 시작하여 도달
        가능한 모든 객체를 마킹합니다.
        <strong>Sweep 단계</strong>에서 마킹되지 않은 객체의 메모리를
        해제합니다. V8은 세대별 GC(Generational GC)를 사용하여 Young
        Generation(Minor GC, Scavenge)과 Old Generation(Major GC,
        Mark-Sweep-Compact)으로 나누어 효율적으로 관리합니다.
      </>
    ),
  },
  {
    question: "WeakRef와 WeakMap의 사용 사례를 설명해주세요.",
    answer: (
      <>
        <InlineCode>WeakMap</InlineCode>은 키 객체가 다른 곳에서 참조되지 않으면{" "}
        <strong>자동으로 GC될 수 있게</strong> 합니다. DOM 요소에 메타데이터를
        연결하거나, 프라이빗 데이터 저장에 활용합니다.
        <br />
        <br />
        <InlineCode>WeakRef</InlineCode>는 객체에 대한{" "}
        <strong>약한 참조</strong>를 생성합니다. GC가 해당 객체를 수거해도
        에러가 발생하지 않으며, <InlineCode>deref()</InlineCode>로 확인합니다.
        캐시 구현 시 메모리 압박이 있으면 자동으로 정리되는 패턴에 유용합니다.
        <InlineCode>FinalizationRegistry</InlineCode>와 함께 사용하여 GC 시 정리
        로직을 실행할 수 있습니다.
      </>
    ),
  },
];
