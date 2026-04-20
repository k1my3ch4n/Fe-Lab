import dynamic from "next/dynamic";
import { InlineCode } from "@shared/ui";
import type { FeatureConfig } from "./types";

export const webApiConfigs: Record<string, FeatureConfig> = {
  "intersection-observer": {
    Demo: dynamic(
      () =>
        import("@features/intersection-observer/ui/IntersectionObserverDemo"),
    ),
    getData: () => import("@features/intersection-observer/model/data"),
    concept: {
      title: "Intersection Observer",
      description:
        "Intersection Observer는 요소가 뷰포트 또는 특정 부모 요소와 교차하는 것을 비동기적으로 감지하는 Web API입니다.",
      children: (
        <p className="text-sm text-text-secondary leading-[1.8]">
          기존 <InlineCode size="md">scroll</InlineCode> 이벤트와{" "}
          <InlineCode size="md">getBoundingClientRect()</InlineCode>를 사용하는
          방식은 매 프레임마다 레이아웃을 재계산하여 성능 문제를 일으킵니다.
          Intersection Observer는 브라우저가 내부적으로 최적화하여{" "}
          <strong>비동기적</strong>으로 교차 상태를 알려주므로, lazy loading,
          무한 스크롤, 광고 노출 추적 등에 널리 사용됩니다.
        </p>
      ),
    },
    demo: {
      title: "Intersection Observer 시각화",
      description:
        "스크롤하며 요소의 뷰포트 진입/이탈을 실시간으로 확인하세요. threshold를 조절해보세요.",
    },
  },

  "web-storage": {
    Demo: dynamic(() => import("@features/web-storage/ui/WebStorageDemo")),
    getData: () => import("@features/web-storage/model/data"),
    concept: {
      title: "Web Storage",
      description:
        "Web Storage API는 브라우저에 키-값 쌍을 저장하는 메커니즘을 제공합니다. localStorage, sessionStorage, IndexedDB를 비교합니다.",
      children: (
        <p className="text-sm text-text-secondary leading-[1.8]">
          <InlineCode size="md">localStorage</InlineCode>는 영구 저장,{" "}
          <InlineCode size="md">sessionStorage</InlineCode>는 세션(탭) 단위
          저장을 제공합니다. 둘 다 동기적이며 문자열만 저장 가능합니다.{" "}
          <InlineCode size="md">IndexedDB</InlineCode>는 비동기적으로 대용량
          구조화 데이터를 저장할 수 있는 로우레벨 API입니다. 용도와 데이터
          특성에 따라 적절한 스토리지를 선택해야 합니다.
        </p>
      ),
    },
    demo: {
      title: "Storage CRUD 시뮬레이션",
      description:
        "각 스토리지에 데이터를 저장, 조회, 삭제하며 동작 차이를 확인하세요.",
    },
  },
};
