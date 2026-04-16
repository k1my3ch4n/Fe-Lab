import dynamic from "next/dynamic";
import { InlineCode } from "@shared/ui";
import type { FeatureConfig } from "./types";

export const typescriptConfigs: Record<string, FeatureConfig> = {
  generics: {
    Demo: dynamic(() => import("@features/generics/ui/GenericsDemo")),
    getData: () => import("@features/generics/model/data"),
    concept: {
      title: "제네릭과 유틸리티 타입",
      description:
        "제네릭은 타입을 매개변수로 받아 재사용 가능한 컴포넌트를 만드는 TypeScript의 핵심 기능입니다.",
      children: (
        <p className="text-sm text-text-secondary leading-[1.8]">
          제네릭을 사용하면 <strong>타입 안전성</strong>을 유지하면서{" "}
          <strong>유연한 코드</strong>를 작성할 수 있습니다. TypeScript는{" "}
          <InlineCode size="md">{"Partial<T>"}</InlineCode>,{" "}
          <InlineCode size="md">{"Pick<T,K>"}</InlineCode>,{" "}
          <InlineCode size="md">{"Omit<T,K>"}</InlineCode>,{" "}
          <InlineCode size="md">{"Record<K,V>"}</InlineCode> 등 다양한 내장
          유틸리티 타입을 제공하며, 조건부 타입과{" "}
          <InlineCode size="md">infer</InlineCode>를 활용해 커스텀 유틸리티
          타입도 만들 수 있습니다.
        </p>
      ),
    },
    demo: {
      title: "제네릭 타입 변환 시각화",
      description:
        "각 유틸리티 타입을 선택하고 실행하여 타입 변환 과정을 확인하세요.",
    },
  },

  "type-guard": {
    Demo: dynamic(() => import("@features/type-guard/ui/TypeGuardDemo")),
    getData: () => import("@features/type-guard/model/data"),
    concept: {
      title: "타입 가드와 타입 좁히기",
      description:
        "타입 가드는 런타임 검사를 통해 TypeScript가 특정 스코프 내에서 타입을 더 구체적으로 추론하도록 합니다.",
      children: (
        <p className="text-sm text-text-secondary leading-[1.8]">
          TypeScript는 <InlineCode size="md">typeof</InlineCode>,{" "}
          <InlineCode size="md">instanceof</InlineCode>,{" "}
          <InlineCode size="md">in</InlineCode> 연산자를 타입 가드로 인식합니다.
          더 복잡한 타입 구분이 필요할 때는{" "}
          <InlineCode size="md">is</InlineCode> 키워드를 사용한{" "}
          <strong>사용자 정의 타입 가드</strong>를 만들 수 있으며,{" "}
          <strong>Discriminated Union</strong> 패턴으로 안전한 분기 처리가
          가능합니다.
        </p>
      ),
    },
    demo: {
      title: "타입 좁히기 시각화",
      description:
        "각 타입 가드를 선택하고 실행하여 타입이 어떻게 좁혀지는지 확인하세요.",
    },
  },
};
