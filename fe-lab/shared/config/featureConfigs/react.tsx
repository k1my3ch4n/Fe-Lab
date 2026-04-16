import dynamic from "next/dynamic";
import { InlineCode } from "@shared/ui";
import type { FeatureConfig } from "./types";

export const reactConfigs: Record<string, FeatureConfig> = {
  "virtual-dom": {
    Demo: dynamic(() => import("@features/virtual-dom/ui/VirtualDomDemo")),
    getData: () => import("@features/virtual-dom/model/data"),
    concept: {
      title: "Virtual DOM",
      description:
        "Virtual DOM은 실제 DOM의 가벼운 JavaScript 객체 표현으로, 효율적인 UI 업데이트를 가능하게 합니다.",
      children: (
        <p className="text-sm text-text-secondary leading-[1.8]">
          React는 상태가 변경되면 새로운{" "}
          <InlineCode size="md">Virtual DOM</InlineCode> 트리를 생성하고, 이전
          트리와 비교(<InlineCode size="md">Diffing</InlineCode>)하여{" "}
          <strong>실제로 변경된 부분만</strong> Real DOM에 반영합니다. 이 과정을{" "}
          <InlineCode size="md">재조정(Reconciliation)</InlineCode>이라 하며,
          O(n) 복잡도의 휴리스틱 알고리즘으로 동작합니다. 덕분에 개발자는
          선언적으로 UI를 작성하면서도 높은 성능을 유지할 수 있습니다.
        </p>
      ),
    },
    demo: {
      title: "Virtual DOM Diffing 시각화",
      description:
        "단계별로 진행하며 Virtual DOM이 어떻게 변경 사항을 감지하고 최소한의 DOM 조작으로 업데이트하는지 확인하세요.",
    },
  },

  reconciliation: {
    Demo: dynamic(
      () => import("@features/reconciliation/ui/ReconciliationDemo"),
    ),
    getData: () => import("@features/reconciliation/model/data"),
    concept: {
      title: "재조정 (Reconciliation)",
      description:
        "React가 Virtual DOM의 이전 트리와 새 트리를 비교하여 최소한의 DOM 변경만 수행하는 핵심 알고리즘입니다.",
      children: (
        <p className="text-sm text-text-secondary leading-[1.8]">
          React는 <InlineCode size="md">render()</InlineCode>가 호출될 때마다
          새로운 React 엘리먼트 트리를 생성합니다. 이전 트리와 새 트리의 차이를
          효율적으로 계산하기 위해 <strong>O(n) 휴리스틱 알고리즘</strong>을
          사용합니다. 두 가지 핵심 가정이 있습니다: 다른 타입의 엘리먼트는 다른
          트리를 생성하며, <InlineCode size="md">key</InlineCode> prop으로 자식
          엘리먼트를 안정적으로 식별합니다.
        </p>
      ),
    },
    demo: {
      title: "재조정 알고리즘 시각화",
      description:
        "각 시나리오를 선택하고 단계별로 진행하여 React가 트리를 어떻게 비교하는지 확인하세요.",
    },
  },

  "hooks-lifecycle": {
    Demo: dynamic(
      () => import("@features/hooks-lifecycle/ui/HooksLifecycleDemo"),
    ),
    getData: () => import("@features/hooks-lifecycle/model/data"),
    concept: {
      title: "Hooks 라이프사이클",
      description:
        "React 함수형 컴포넌트에서 훅이 실행되는 순서와 타이밍을 이해합니다.",
      children: (
        <p className="text-sm text-text-secondary leading-[1.8]">
          함수형 컴포넌트는 클래스 컴포넌트의 라이프사이클 메서드 대신{" "}
          <InlineCode size="md">useEffect</InlineCode>,{" "}
          <InlineCode size="md">useLayoutEffect</InlineCode> 등의 훅으로 사이드
          이펙트를 관리합니다. 각 훅이 <strong>Mount, Update, Unmount</strong>{" "}
          단계에서 어떤 순서로 실행되는지 정확히 아는 것이 면접에서 자주
          출제되는 핵심 주제입니다.
        </p>
      ),
    },
    demo: {
      title: "훅 실행 순서 시각화",
      description:
        "각 라이프사이클 단계를 실행하여 훅이 어떤 순서로 호출되는지 확인하세요.",
    },
  },

  "react-memo": {
    Demo: dynamic(() => import("@features/react-memo/ui/ReactMemoDemo")),
    getData: () => import("@features/react-memo/model/data"),
    concept: {
      title: "React 메모이제이션",
      description:
        "React에서 불필요한 리렌더링을 방지하는 메모이제이션 기법을 학습합니다.",
      children: (
        <p className="text-sm text-text-secondary leading-[1.8]">
          <InlineCode size="md">React.memo</InlineCode>는 props가 변경되지
          않으면 리렌더링을 건너뛰는 고차 컴포넌트입니다.{" "}
          <InlineCode size="md">useMemo</InlineCode>는 값을,{" "}
          <InlineCode size="md">useCallback</InlineCode>은 함수 참조를
          메모이제이션합니다. React Compiler는 이러한 최적화를 자동으로 수행하는
          차세대 도구입니다.
        </p>
      ),
    },
    demo: {
      title: "리렌더링 카운터 — memo 적용 전후 비교",
      description:
        "부모 컴포넌트가 리렌더링될 때 자식의 렌더링 여부를 확인하세요.",
    },
  },

  "use-ref": {
    Demo: dynamic(() => import("@features/use-ref/ui/UseRefDemo")),
    getData: () => import("@features/use-ref/model/data"),
    concept: {
      title: "useRef",
      description:
        "useRef는 렌더링 사이에 값을 유지하면서도 리렌더링을 트리거하지 않는 React 훅입니다.",
      children: (
        <p className="text-sm text-text-secondary leading-[1.8]">
          <InlineCode size="md">useRef</InlineCode>는{" "}
          <InlineCode size="md">.current</InlineCode> 속성을 가진 가변 객체를
          반환합니다. DOM 요소에 직접 접근하거나, 타이머 ID, 이전 렌더링 값 등{" "}
          <strong>리렌더링과 무관한 값</strong>을 저장할 때 사용합니다.{" "}
          <InlineCode size="md">useState</InlineCode>와 달리 값을 변경해도
          컴포넌트가 다시 렌더링되지 않습니다.
        </p>
      ),
    },
    demo: {
      title: "useRef vs useState 비교",
      description:
        "값 변경 시 리렌더링 여부와 DOM 참조, 이전 값 저장을 직접 확인하세요.",
    },
  },

  "module-bundling": {
    Demo: dynamic(
      () => import("@features/module-bundling/ui/ModuleBundlingDemo"),
    ),
    getData: () => import("@features/module-bundling/model/data"),
    concept: {
      title: "모듈 번들링과 최적화",
      description:
        "번들러가 모듈을 하나로 합치고, 트리 쉐이킹과 코드 스플릿팅으로 최적화하는 과정을 학습합니다.",
      children: (
        <p className="text-sm text-text-secondary leading-[1.8]">
          모던 웹 앱은 수백 개의 모듈로 구성됩니다.{" "}
          <InlineCode size="md">번들러</InlineCode>는 이를 최적화된 파일로
          합치고, <InlineCode size="md">트리 쉐이킹</InlineCode>으로 미사용
          코드를 제거하며, <InlineCode size="md">코드 스플릿팅</InlineCode>
          으로 필요한 코드만 로드합니다. ESM의 정적 분석 특성이 이러한 최적화를
          가능하게 합니다.
        </p>
      ),
    },
    demo: {
      title: "번들 사이즈 비교와 최적화",
      description:
        "트리 쉐이킹, 코드 스플릿팅, ESM vs CJS의 번들 사이즈 차이를 확인하세요.",
    },
  },

  "state-management": {
    Demo: dynamic(
      () => import("@features/state-management/ui/StateManagementDemo"),
    ),
    getData: () => import("@features/state-management/model/data"),
    concept: {
      title: "상태 관리 패턴",
      description:
        "React 앱에서 전역 상태를 효율적으로 관리하는 다양한 패턴과 라이브러리를 비교합니다.",
      children: (
        <p className="text-sm text-text-secondary leading-[1.8]">
          React의 기본 상태 관리(<InlineCode size="md">useState</InlineCode> +{" "}
          <InlineCode size="md">props</InlineCode>)는 컴포넌트 트리가 깊어지면{" "}
          <strong>prop drilling</strong> 문제를 일으킵니다.{" "}
          <InlineCode size="md">Context API</InlineCode>,{" "}
          <InlineCode size="md">Redux Toolkit</InlineCode>,{" "}
          <InlineCode size="md">Zustand</InlineCode> 등 다양한 해법이 있으며,
          각각의 트레이드오프를 이해하는 것이 중요합니다.
        </p>
      ),
    },
    demo: {
      title: "상태 관리 패턴 비교",
      description:
        "각 접근법의 아키텍처를 비교하고, prop drilling 문제를 시각적으로 확인하세요.",
    },
  },

  "suspense-error-boundary": {
    Demo: dynamic(
      () =>
        import("@features/suspense-error-boundary/ui/SuspenseErrorBoundaryDemo"),
    ),
    getData: () => import("@features/suspense-error-boundary/model/data"),
    concept: {
      title: "Suspense / Error Boundary",
      description:
        "React에서 로딩과 에러 상태를 선언적으로 처리하는 두 가지 핵심 패턴입니다.",
      children: (
        <p className="text-sm text-text-secondary leading-[1.8]">
          <InlineCode size="md">Suspense</InlineCode>는 비동기 데이터 로딩 시
          fallback UI를 선언적으로 표시합니다.{" "}
          <InlineCode size="md">Error Boundary</InlineCode>는 렌더링 중 발생한
          에러를 catch하여 앱 크래시를 방지합니다. React 19의{" "}
          <InlineCode size="md">use()</InlineCode> 훅과 함께 사용하면 Promise를
          직접 읽으면서도 로딩/에러 상태를 자동으로 처리할 수 있습니다.
        </p>
      ),
    },
    demo: {
      title: "Suspense / Error Boundary 흐름 시각화",
      description: "각 패턴의 동작 흐름을 단계별로 시뮬레이션하여 확인하세요.",
    },
  },

  "server-components": {
    Demo: dynamic(
      () => import("@features/server-components/ui/ServerComponentsDemo"),
    ),
    getData: () => import("@features/server-components/model/data"),
    concept: {
      title: "React Server Components",
      description:
        "서버에서 렌더링되어 클라이언트 번들을 줄이는 새로운 컴포넌트 패러다임입니다.",
      children: (
        <p className="text-sm text-text-secondary leading-[1.8]">
          RSC는 <InlineCode size="md">서버에서만 실행</InlineCode>되는
          컴포넌트로, DB 접근과 파일시스템 사용이 가능하지만{" "}
          <InlineCode size="md">useState</InlineCode>나 이벤트 핸들러는 사용할
          수 없습니다. <InlineCode size="md">{'"use client"'}</InlineCode>로
          Client Component를 선언하고,{" "}
          <InlineCode size="md">{'"use server"'}</InlineCode>로 Server Actions를
          정의합니다. Next.js App Router에서 기본값은 Server Component입니다.
        </p>
      ),
    },
    demo: {
      title: "Server / Client Component 렌더링 흐름",
      description:
        "각 컴포넌트 유형의 렌더링 과정과 번들 사이즈 차이를 확인하세요.",
    },
  },
};
