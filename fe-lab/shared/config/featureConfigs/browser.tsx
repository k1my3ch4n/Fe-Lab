import dynamic from "next/dynamic";
import { InlineCode } from "@shared/ui";
import type { FeatureConfig } from "./types";

export const browserConfigs: Record<string, FeatureConfig> = {
  "rendering-pipeline": {
    Demo: dynamic(
      () => import("@features/rendering-pipeline/ui/RenderPipelineDemo"),
    ),
    getData: () => import("@features/rendering-pipeline/model/data"),
    concept: {
      title: "브라우저 렌더링 과정",
      description:
        "URL을 입력한 순간부터 화면에 픽셀이 그려지기까지, 브라우저는 일련의 정교한 파이프라인을 수행합니다.",
      children: (
        <p className="text-sm text-text-secondary leading-[1.8]">
          브라우저가 웹페이지를 렌더링하는 과정은 크게{" "}
          <strong>네트워크 단계</strong>와 <strong>렌더링 단계</strong>로
          나뉩니다. 네트워크 단계에서 리소스를 받아오고, 렌더링 엔진이 이를
          파싱하여 화면에 그립니다. 각 단계를 이해하면{" "}
          <InlineCode size="md">성능 최적화</InlineCode>의 핵심 포인트를 잡을 수
          있습니다.
        </p>
      ),
    },
    demo: {
      title: "렌더링 파이프라인 시각화",
      description:
        "각 단계를 순서대로 살펴보며 브라우저가 어떻게 화면을 그리는지 확인하세요.",
    },
  },

  "reflow-repaint": {
    Demo: dynamic(
      () => import("@features/reflow-repaint/ui/ReflowRepaintDemo"),
    ),
    getData: () => import("@features/reflow-repaint/model/data"),
    concept: {
      title: "리플로우와 리페인트 (Reflow & Repaint)",
      description:
        "브라우저가 CSS 변경 시 어떤 렌더링 단계를 다시 실행하는지 이해하면 성능 최적화의 핵심을 파악할 수 있습니다.",
      children: (
        <p className="text-sm text-text-secondary leading-[1.8]">
          CSS 속성 변경은 <strong>렌더링 파이프라인</strong>의 서로 다른 단계를
          트리거합니다. <InlineCode size="md">width</InlineCode>,{" "}
          <InlineCode size="md">margin</InlineCode> 등 레이아웃 속성은{" "}
          <strong>리플로우</strong>(Layout 재계산)를 발생시키고,{" "}
          <InlineCode size="md">color</InlineCode>,{" "}
          <InlineCode size="md">background</InlineCode> 등은{" "}
          <strong>리페인트</strong>(Paint만 재실행)를 트리거합니다.{" "}
          <InlineCode size="md">transform</InlineCode>,{" "}
          <InlineCode size="md">opacity</InlineCode>는 GPU 컴포지트 단계에서만
          처리되어 가장 효율적입니다.
        </p>
      ),
    },
    demo: {
      title: "CSS 속성별 렌더링 파이프라인 시각화",
      description:
        "CSS 속성을 선택하면 어떤 렌더링 단계가 실행되는지 확인할 수 있습니다.",
    },
  },

  "critical-rendering-path": {
    Demo: dynamic(
      () =>
        import("@features/critical-rendering-path/ui/CriticalRenderingPathDemo"),
    ),
    getData: () => import("@features/critical-rendering-path/model/data"),
    concept: {
      title: "크리티컬 렌더링 패스 (Critical Rendering Path)",
      description:
        "브라우저가 HTML, CSS, JS를 받아 화면에 첫 픽셀을 그리기까지의 과정을 이해하고 최적화하는 방법을 학습합니다.",
      children: (
        <p className="text-sm text-text-secondary leading-[1.8]">
          크리티컬 렌더링 패스(CRP)는 브라우저가 서버로부터 받은 리소스를 화면에
          렌더링하기까지의 <strong>핵심 경로</strong>입니다.{" "}
          <InlineCode size="md">DOM</InlineCode> 생성,{" "}
          <InlineCode size="md">CSSOM</InlineCode> 생성, 렌더 트리 구성,
          레이아웃, 페인트 단계를 거칩니다. CRP에 포함된 리소스의 수와 크기를
          최소화하면 <InlineCode size="md">FCP</InlineCode>(First Contentful
          Paint)를 크게 단축할 수 있습니다.
        </p>
      ),
    },
    demo: {
      title: "CRP 최적화 시나리오 비교",
      description:
        "각 최적화 전략을 선택하여 리소스 로딩 타임라인과 FCP가 어떻게 변하는지 비교하세요.",
    },
  },

  "rendering-patterns": {
    Demo: dynamic(
      () => import("@features/rendering-patterns/ui/RenderingPatternsDemo"),
    ),
    getData: () => import("@features/rendering-patterns/model/data"),
    concept: {
      title: "CSR / SSR / ISR / SSG",
      description:
        "웹 페이지를 렌더링하는 4가지 방식을 비교합니다. 각 방식은 렌더링 시점과 장소가 다르며, 성능과 SEO에 큰 영향을 미칩니다.",
      children: (
        <p className="text-sm text-text-secondary leading-[1.8]">
          <InlineCode size="md">CSR</InlineCode>은 클라이언트에서,{" "}
          <InlineCode size="md">SSR</InlineCode>은 서버에서 매 요청마다,{" "}
          <InlineCode size="md">SSG</InlineCode>는 빌드 시점에,{" "}
          <InlineCode size="md">ISR</InlineCode>은 빌드 + 주기적 재생성으로
          HTML을 생성합니다. Next.js는 이 4가지 방식을 모두 지원하며, 페이지
          특성에 맞게 선택할 수 있습니다.
        </p>
      ),
    },
    demo: {
      title: "렌더링 방식별 타임라인 비교",
      description:
        "각 방식의 서버 처리, HTML 전송, JS 실행, 화면 표시 시점을 비교하세요.",
    },
  },

  "web-worker": {
    Demo: dynamic(() => import("@features/web-worker/ui/WebWorkerDemo")),
    getData: () => import("@features/web-worker/model/data"),
    concept: {
      title: "웹 워커 (Web Worker)",
      description:
        "웹 워커는 메인 스레드와 별도의 백그라운드 스레드에서 스크립트를 실행할 수 있게 해주는 API입니다.",
      children: (
        <p className="text-sm text-text-secondary leading-[1.8]">
          JavaScript는 기본적으로 <strong>싱글 스레드</strong>입니다. 무거운
          연산이 메인 스레드에서 실행되면 UI가 멈추게 됩니다.{" "}
          <InlineCode size="md">Web Worker</InlineCode>를 사용하면 별도
          스레드에서 연산을 수행하여 UI 응답성을 유지할 수 있습니다.{" "}
          <InlineCode size="md">postMessage</InlineCode>를 통해 메인 스레드와
          데이터를 주고받습니다.
        </p>
      ),
    },
    demo: {
      title: "메인 스레드 vs 워커 스레드 비교",
      description:
        "같은 연산을 메인 스레드와 워커에서 실행하여 UI 블로킹 여부를 비교하세요.",
    },
  },
};
