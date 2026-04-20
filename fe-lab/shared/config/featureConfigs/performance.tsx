import dynamic from "next/dynamic";
import { InlineCode } from "@shared/ui";
import type { FeatureConfig } from "./types";

export const performanceConfigs: Record<string, FeatureConfig> = {
  cdn: {
    Demo: dynamic(() => import("@features/cdn/ui/CdnDemo")),
    getData: () => import("@features/cdn/model/data"),
    concept: {
      title: "CDN (Content Delivery Network)",
      description:
        "CDN은 전 세계에 분산된 엣지 서버를 통해 사용자에게 가장 가까운 위치에서 콘텐츠를 제공하여 성능을 최적화합니다.",
      children: (
        <p className="text-sm text-text-secondary leading-[1.8]">
          CDN은 정적 에셋(이미지, CSS, JS)뿐 아니라 API 응답까지 캐싱할 수
          있습니다.
          <InlineCode size="md">Cache HIT</InlineCode>이면 엣지에서 바로
          응답하고,
          <InlineCode size="md">Cache MISS</InlineCode>이면 오리진에서 가져와
          캐시 후 응답합니다. 캐시 무효화 전략과{" "}
          <InlineCode size="md">Cache-Control</InlineCode> 헤더 설정이
          핵심입니다.
        </p>
      ),
    },
    demo: {
      title: "CDN 요청 흐름과 캐시 전략",
      description: "CDN의 Cache HIT/MISS 흐름과 엣지 서버 분포를 확인하세요.",
    },
  },

  "network-debugging": {
    Demo: dynamic(
      () => import("@features/network-debugging/ui/NetworkDebuggingDemo"),
    ),
    getData: () => import("@features/network-debugging/model/data"),
    concept: {
      title: "네트워크 디버깅",
      description:
        "웹 성능 최적화의 첫 단계는 네트워크 병목을 정확히 진단하는 것입니다. 워터폴 차트와 HTTP 상태 코드를 읽는 능력이 핵심입니다.",
      children: (
        <p className="text-sm text-text-secondary leading-[1.8]">
          브라우저 DevTools의 네트워크 탭은 각 리소스의{" "}
          <InlineCode size="md">DNS</InlineCode>,{" "}
          <InlineCode size="md">TCP</InlineCode>,{" "}
          <InlineCode size="md">TLS</InlineCode>,{" "}
          <InlineCode size="md">TTFB</InlineCode>,{" "}
          <InlineCode size="md">Download</InlineCode> 단계를 워터폴로
          시각화합니다.
          <InlineCode size="md">Performance API</InlineCode>를 활용하면
          프로그래밍적으로 네트워크 성능을 측정하고 모니터링할 수 있습니다.
        </p>
      ),
    },
    demo: {
      title: "워터폴 차트와 HTTP 상태 코드",
      description: "리소스별 로딩 단계와 HTTP 상태 코드의 의미를 확인하세요.",
    },
  },
};
