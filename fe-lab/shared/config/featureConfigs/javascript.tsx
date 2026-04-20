import dynamic from "next/dynamic";
import { InlineCode, PhaseChip } from "@shared/ui";
import type { FeatureConfig } from "./types";

export const javascriptConfigs: Record<string, FeatureConfig> = {
  closure: {
    Demo: dynamic(() => import("@features/closure/ui/ClosureDemo")),
    getData: () => import("@features/closure/model/data"),
    concept: {
      title: "클로저 (Closure)",
      description:
        "클로저는 함수와 그 함수가 선언된 렉시컬 환경의 조합입니다. 내부 함수가 외부 함수의 변수를 기억하는 현상입니다.",
      children: (
        <p className="text-sm text-text-secondary leading-[1.8]">
          JavaScript에서 함수는 자신이 <strong>생성된 시점</strong>의 스코프를
          기억합니다. 외부 함수가 종료된 후에도 내부 함수는 외부 함수의 변수에
          접근할 수 있습니다. 이것이 <InlineCode size="md">클로저</InlineCode>
          입니다. React의 <InlineCode size="md">useState</InlineCode>,{" "}
          <InlineCode size="md">useEffect</InlineCode> 등 훅도 내부적으로
          클로저를 활용합니다.
        </p>
      ),
    },
    demo: {
      title: "스코프 체인과 클로저 시각화",
      description:
        "각 예제를 선택하고 실행하여 클로저가 어떻게 외부 변수를 기억하는지 확인하세요.",
    },
  },

  "event-bubbling": {
    Demo: dynamic(
      () => import("@features/event-bubbling/ui/EventBubblingDemo"),
    ),
    getData: () => import("@features/event-bubbling/model/data"),
    concept: {
      title: "이벤트 전파 (Event Propagation)",
      description:
        "DOM 이벤트는 단순히 타겟 요소에서만 발생하지 않습니다. 이벤트는 캡쳐링 → 타겟 → 버블링 3단계를 거쳐 전파됩니다.",
      children: (
        <>
          <p className="text-sm text-text-secondary leading-[1.8]">
            사용자가 버튼을 클릭하면, 이벤트는 먼저{" "}
            <InlineCode size="md">window</InlineCode>에서 시작해 타겟까지
            내려갑니다 (캡쳐링). 타겟에 도달한 후, 다시{" "}
            <InlineCode size="md">window</InlineCode>까지 올라갑니다 (버블링).
          </p>
          <div className="flex gap-3 mt-4 flex-wrap">
            <PhaseChip
              label="① 캡쳐링 (Capturing) — window → target"
              variant="capture"
            />
            <PhaseChip
              label="② 타겟 (Target) — 이벤트 발생 지점"
              variant="target"
            />
            <PhaseChip
              label="③ 버블링 (Bubbling) — target → window"
              variant="bubble"
            />
          </div>
        </>
      ),
    },
    demo: {
      title: "직접 클릭해 보세요",
      description:
        "중첩된 요소를 클릭하면 이벤트가 어떻게 전파되는지 실시간으로 확인할 수 있습니다.",
    },
  },

  "prototype-chain": {
    Demo: dynamic(
      () => import("@features/prototype-chain/ui/PrototypeChainDemo"),
    ),
    getData: () => import("@features/prototype-chain/model/data"),
    concept: {
      title: "프로토타입 체인 (Prototype Chain)",
      description:
        "JavaScript는 프로토타입 기반 언어입니다. 객체의 프로퍼티를 찾을 때 프로토타입 체인을 따라 탐색합니다.",
      children: (
        <p className="text-sm text-text-secondary leading-[1.8]">
          모든 JavaScript 객체는{" "}
          <InlineCode size="md">[[Prototype]]</InlineCode>이라는 내부 슬롯을
          통해 다른 객체를 참조합니다. 객체에서 프로퍼티를 찾지 못하면,{" "}
          <InlineCode size="md">__proto__</InlineCode>를 따라 상위
          프로토타입에서 탐색을 계속합니다. 이 체인은{" "}
          <InlineCode size="md">Object.prototype</InlineCode>을 거쳐{" "}
          <InlineCode size="md">null</InlineCode>에서 끝납니다. ES6의{" "}
          <InlineCode size="md">class</InlineCode> 문법도 내부적으로 이
          프로토타입 체인 위에서 동작합니다.
        </p>
      ),
    },
    demo: {
      title: "프로토타입 체인 탐색 시각화",
      description:
        "객체를 선택하고 프로퍼티를 입력하면, 체인을 따라 탐색하는 과정을 확인할 수 있습니다.",
    },
  },

  "event-loop": {
    Demo: dynamic(() => import("@features/event-loop/ui/EventLoopDemo")),
    getData: () => import("@features/event-loop/model/data"),
    concept: {
      title: "이벤트 루프 (Event Loop)",
      description:
        "이벤트 루프는 JavaScript의 비동기 실행을 관리하는 핵심 메커니즘입니다. 콜 스택, 마이크로태스크 큐, 태스크 큐의 상호작용을 이해하는 것이 중요합니다.",
      children: (
        <p className="text-sm text-text-secondary leading-[1.8]">
          JavaScript는 <strong>싱글 스레드</strong> 언어이지만, 이벤트 루프를
          통해 비동기 작업을 효율적으로 처리합니다. 콜 스택이 비면 이벤트 루프가{" "}
          <InlineCode size="md">마이크로태스크 큐</InlineCode>를 먼저 확인하고,
          그 다음 <InlineCode size="md">태스크 큐</InlineCode>에서 작업을 꺼내
          실행합니다. <InlineCode size="md">Promise.then</InlineCode>과{" "}
          <InlineCode size="md">setTimeout</InlineCode>의 실행 순서가 다른
          이유가 바로 이것입니다.
        </p>
      ),
    },
    demo: {
      title: "이벤트 루프 시각화",
      description:
        "시나리오를 선택하고 단계별로 진행하여 콜 스택, 마이크로태스크 큐, 태스크 큐의 변화를 관찰하세요.",
    },
  },

  "scope-context": {
    Demo: dynamic(() => import("@features/scope-context/ui/ScopeContextDemo")),
    getData: () => import("@features/scope-context/model/data"),
    concept: {
      title: "스코프와 실행 컨텍스트",
      description:
        "스코프는 변수의 접근 범위를, 실행 컨텍스트는 코드 실행에 필요한 환경 정보를 담고 있습니다.",
      children: (
        <p className="text-sm text-text-secondary leading-[1.8]">
          JavaScript는 <strong>렉시컬 스코핑</strong>을 따르며, 함수가 선언된
          위치에 따라 스코프 체인이 결정됩니다.
          <InlineCode size="md">this</InlineCode>는 함수의 호출 방식에 따라
          동적으로 바인딩되며, 화살표 함수는 상위 스코프의 this를 상속합니다.
          <InlineCode size="md">IIFE</InlineCode>는 전역 스코프 오염을 방지하는
          전통적인 패턴입니다.
        </p>
      ),
    },
    demo: {
      title: "this 바인딩과 스코프 체인 시각화",
      description:
        "각 바인딩 방식을 선택하고 실행하여 this가 어떻게 결정되는지 확인하세요.",
    },
  },

  promise: {
    Demo: dynamic(() => import("@features/promise/ui/PromiseDemo")),
    getData: () => import("@features/promise/model/data"),
    concept: {
      title: "Promise",
      description:
        "Promise는 비동기 작업의 결과를 나타내는 객체로, 콜백 헬을 해결하고 체이닝을 통한 가독성 향상을 제공합니다.",
      children: (
        <p className="text-sm text-text-secondary leading-[1.8]">
          Promise는 <InlineCode size="md">pending</InlineCode>,{" "}
          <InlineCode size="md">fulfilled</InlineCode>,{" "}
          <InlineCode size="md">rejected</InlineCode> 세 가지 상태를 가집니다.
          <InlineCode size="md">async/await</InlineCode>는 Promise를 동기
          코드처럼 작성할 수 있게 해주는 문법적 설탕입니다.
          <InlineCode size="md">Promise.all</InlineCode>,{" "}
          <InlineCode size="md">race</InlineCode>,{" "}
          <InlineCode size="md">allSettled</InlineCode>,{" "}
          <InlineCode size="md">any</InlineCode>로 여러 비동기 작업을
          조합합니다.
        </p>
      ),
    },
    demo: {
      title: "Promise 상태 전이와 메서드 시뮬레이션",
      description:
        "각 Promise 메서드를 선택하고 시뮬레이션하여 동작 차이를 확인하세요.",
    },
  },

  "deep-shallow-copy": {
    Demo: dynamic(
      () => import("@features/deep-shallow-copy/ui/DeepShallowCopyDemo"),
    ),
    getData: () => import("@features/deep-shallow-copy/model/data"),
    concept: {
      title: "깊은 복사 / 얕은 복사",
      description:
        "JavaScript에서 객체를 복사할 때 참조 공유 여부에 따라 얕은 복사와 깊은 복사로 나뉩니다.",
      children: (
        <p className="text-sm text-text-secondary leading-[1.8]">
          <InlineCode size="md">Spread</InlineCode>와{" "}
          <InlineCode size="md">Object.assign</InlineCode>은 1단계만 복사하는
          얕은 복사를 수행합니다. 중첩 객체의 완전한 독립을 위해서는{" "}
          <InlineCode size="md">structuredClone</InlineCode>이나{" "}
          <InlineCode size="md">JSON.parse(JSON.stringify())</InlineCode>를
          사용합니다. 원시 타입은 값이 복제되지만, 참조 타입은 메모리 주소가
          공유됩니다.
        </p>
      ),
    },
    demo: {
      title: "객체 복사와 참조 비교 시각화",
      description:
        "각 복사 방식을 선택하고 원시값/참조값 변경 시 원본에 미치는 영향을 확인하세요.",
    },
  },

  "memory-management": {
    Demo: dynamic(
      () => import("@features/memory-management/ui/MemoryManagementDemo"),
    ),
    getData: () => import("@features/memory-management/model/data"),
    concept: {
      title: "메모리 관리",
      description:
        "JavaScript의 메모리 관리와 가비지 컬렉션을 이해하고, 메모리 릭을 방지하는 패턴을 학습합니다.",
      children: (
        <p className="text-sm text-text-secondary leading-[1.8]">
          JavaScript는 <strong>가비지 컬렉션(GC)</strong>을 통해 자동으로
          메모리를 관리하지만, 이벤트 리스너 미해제, 클로저 참조, 분리된 DOM
          노드 등으로 <strong>메모리 릭</strong>이 발생할 수 있습니다.
          <InlineCode size="md">WeakRef</InlineCode>와{" "}
          <InlineCode size="md">WeakMap</InlineCode>을 활용하면 GC 친화적인
          코드를 작성할 수 있습니다.
        </p>
      ),
    },
    demo: {
      title: "메모리 릭 패턴과 해결 시각화",
      description:
        "각 메모리 릭 패턴을 선택하고, 문제 발생과 해결 과정을 시뮬레이션하세요.",
    },
  },

  "debounce-throttle": {
    Demo: dynamic(
      () => import("@features/debounce-throttle/ui/DebounceThrottleDemo"),
    ),
    getData: () => import("@features/debounce-throttle/model/data"),
    concept: {
      title: "디바운스 / 쓰로틀",
      description:
        "빈번한 이벤트 호출을 제어하여 성능을 최적화하는 두 가지 핵심 기법입니다.",
      children: (
        <p className="text-sm text-text-secondary leading-[1.8]">
          <InlineCode size="md">디바운스</InlineCode>는 이벤트가 멈춘 후 일정
          시간이 지나야 실행되고, <InlineCode size="md">쓰로틀</InlineCode>은
          일정 간격으로 최대 1회 실행을 보장합니다. 검색 입력, 스크롤 이벤트,
          리사이즈 이벤트 등에서 불필요한 함수 호출을 줄여{" "}
          <strong>성능 최적화</strong>에 활용됩니다.
        </p>
      ),
    },
    demo: {
      title: "호출 횟수 비교 및 타임라인",
      description:
        "이벤트 영역을 빠르게 클릭하여 원본, 디바운스, 쓰로틀의 호출 횟수 차이를 확인하세요.",
    },
  },

  "currying-composition": {
    Demo: dynamic(
      () => import("@features/currying-composition/ui/CurryingCompositionDemo"),
    ),
    getData: () => import("@features/currying-composition/model/data"),
    concept: {
      title: "커링과 함수 합성",
      description:
        "커링은 다중 인자 함수를 단일 인자 함수 체인으로 변환하고, 함수 합성은 여러 함수를 결합하여 새로운 함수를 만듭니다.",
      children: (
        <p className="text-sm text-text-secondary leading-[1.8]">
          <InlineCode size="md">커링(Currying)</InlineCode>은 함수의 인자를
          하나씩 받아 <strong>부분 적용(Partial Application)</strong>을 가능하게
          합니다. <InlineCode size="md">함수 합성(Composition)</InlineCode>은{" "}
          <InlineCode size="md">pipe</InlineCode>와{" "}
          <InlineCode size="md">compose</InlineCode>를 통해 작은 함수들을
          결합하여 복잡한 데이터 변환 파이프라인을 구축합니다.
        </p>
      ),
    },
    demo: {
      title: "부분 적용 및 함수 체이닝 시각화",
      description:
        "각 예제를 선택하고 단계별로 실행하여 커링과 합성 과정을 확인하세요.",
    },
  },
};
