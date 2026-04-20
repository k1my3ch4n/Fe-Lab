import dynamic from "next/dynamic";
import { InlineCode } from "@shared/ui";
import type { FeatureConfig } from "./types";

export const cssConfigs: Record<string, FeatureConfig> = {
  "flexbox-grid": {
    Demo: dynamic(() => import("@features/flexbox-grid/ui/FlexboxGridDemo")),
    getData: () => import("@features/flexbox-grid/model/data"),
    concept: {
      title: "Flexbox vs Grid",
      description:
        "CSS의 두 가지 핵심 레이아웃 시스템인 Flexbox(1차원)와 Grid(2차원)를 비교합니다.",
      children: (
        <p className="text-sm text-text-secondary leading-[1.8]">
          <InlineCode size="md">Flexbox</InlineCode>는 행 또는 열 한 방향으로
          아이템을 배치하는 <strong>1차원 레이아웃</strong> 시스템이고,{" "}
          <InlineCode size="md">Grid</InlineCode>는 행과 열을 동시에 제어하는{" "}
          <strong>2차원 레이아웃</strong> 시스템입니다. 각 속성을 조절하며
          레이아웃 변화를 실시간으로 확인해보세요.
        </p>
      ),
    },
    demo: {
      title: "레이아웃 속성 비교",
      description:
        "Flexbox와 Grid 탭을 전환하고 속성을 조절하여 레이아웃 변화를 확인하세요.",
    },
  },

  "responsive-design": {
    Demo: dynamic(
      () => import("@features/responsive-design/ui/ResponsiveDesignDemo"),
    ),
    getData: () => import("@features/responsive-design/model/data"),
    concept: {
      title: "반응형 디자인",
      description:
        "다양한 화면 크기와 디바이스에 최적화된 레이아웃을 구현하는 CSS 전략입니다.",
      children: (
        <p className="text-sm text-text-secondary leading-[1.8]">
          반응형 디자인은 <InlineCode size="md">미디어 쿼리</InlineCode>,{" "}
          <InlineCode size="md">clamp()</InlineCode>,{" "}
          <InlineCode size="md">Container Query</InlineCode> 등을 활용하여
          viewport 크기에 따라 레이아웃을 조정합니다.{" "}
          <strong>모바일 퍼스트</strong> 접근이 권장되며, 최신 CSS 기능을 통해
          breakpoint 없이도 유동적인 디자인이 가능합니다.
        </p>
      ),
    },
    demo: {
      title: "뷰포트별 레이아웃 변화",
      description:
        "슬라이더를 조절하거나 프리셋을 선택하여 뷰포트 크기에 따른 레이아웃 변화를 확인하세요.",
    },
  },
};
