import dynamic from "next/dynamic";
import { InlineCode } from "@shared/ui";
import type { FeatureConfig } from "./types";

export const networkConfigs: Record<string, FeatureConfig> = {
  cors: {
    Demo: dynamic(() => import("@features/cors/ui/CorsDemo")),
    getData: () => import("@features/cors/model/data"),
    concept: {
      title: "CORS (Cross-Origin Resource Sharing)",
      description:
        "CORS는 브라우저의 동일 출처 정책을 제어하여 다른 출처의 리소스 접근을 허용하는 HTTP 헤더 기반 메커니즘입니다.",
      children: (
        <p className="text-sm text-text-secondary leading-[1.8]">
          브라우저는 보안을 위해{" "}
          <strong>동일 출처 정책(Same-Origin Policy)</strong>을 적용하여 다른
          출처의 리소스 접근을 기본적으로 차단합니다. 출처(Origin)는{" "}
          <InlineCode size="md">프로토콜</InlineCode> +{" "}
          <InlineCode size="md">호스트</InlineCode> +{" "}
          <InlineCode size="md">포트</InlineCode>의 조합으로 결정되며, CORS는
          서버가 HTTP 헤더를 통해 특정 출처의 접근을 허용하는 방식으로 이 제한을
          완화합니다.
        </p>
      ),
    },
    demo: {
      title: "CORS 요청 흐름 시각화",
      description:
        "각 시나리오를 선택하고 단계별로 재생하여 브라우저와 서버 간의 CORS 헤더 교환 과정을 확인하세요.",
    },
  },

  "http-cache": {
    Demo: dynamic(() => import("@features/http-cache/ui/HttpCacheDemo")),
    getData: () => import("@features/http-cache/model/data"),
    concept: {
      title: "HTTP 캐시 전략",
      description:
        "HTTP 캐시는 네트워크 요청을 줄이고 웹 성능을 극대화하는 핵심 메커니즘입니다. 올바른 캐시 전략은 사용자 경험과 서버 부하 모두에 큰 영향을 미칩니다.",
      children: (
        <p className="text-sm text-text-secondary leading-[1.8]">
          브라우저는 <InlineCode size="md">Cache-Control</InlineCode> 헤더를
          통해 리소스의 캐싱 방식을 결정합니다.{" "}
          <InlineCode size="md">max-age</InlineCode>로 유효 시간을 설정하고,{" "}
          <InlineCode size="md">ETag</InlineCode>와{" "}
          <InlineCode size="md">Last-Modified</InlineCode>로 리소스 변경 여부를
          검증합니다. <InlineCode size="md">stale-while-revalidate</InlineCode>
          는 만료된 캐시를 즉시 반환하면서 백그라운드에서 갱신하여 빠른 응답과
          데이터 신선도를 모두 확보합니다.
        </p>
      ),
    },
    demo: {
      title: "캐시 시나리오 시뮬레이션",
      description:
        "각 캐시 전략의 요청-응답 흐름을 단계별로 확인하세요. 브라우저, 캐시, 서버 간의 HTTP 헤더 교환을 시각적으로 이해할 수 있습니다.",
    },
  },

  "websocket-sse": {
    Demo: dynamic(() => import("@features/websocket-sse/ui/WebSocketSseDemo")),
    getData: () => import("@features/websocket-sse/model/data"),
    concept: {
      title: "WebSocket vs SSE (Server-Sent Events)",
      description:
        "실시간 통신을 위한 두 가지 접근 방식을 비교합니다. WebSocket은 양방향, SSE는 서버에서 클라이언트로의 단방향 스트리밍을 제공합니다.",
      children: (
        <p className="text-sm text-text-secondary leading-[1.8]">
          전통적인 HTTP는 <strong>요청-응답</strong> 모델입니다. 서버가
          클라이언트에게 먼저 데이터를 보낼 수 없죠. 이를 해결하기 위해{" "}
          <InlineCode size="md">WebSocket</InlineCode>과{" "}
          <InlineCode size="md">SSE (Server-Sent Events)</InlineCode>가
          등장했습니다. WebSocket은 <strong>양방향 전이중 통신</strong>을, SSE는{" "}
          <strong>서버→클라이언트 단방향 스트리밍</strong>을 제공합니다.
          ChatGPT의 응답 스트리밍이 SSE를 사용하는 대표적인 예입니다.
        </p>
      ),
    },
    demo: {
      title: "실시간 통신 시뮬레이션",
      description:
        "WebSocket과 SSE의 메시지 흐름을 시각적으로 비교해보세요. 시뮬레이션을 실행하여 양방향/단방향 차이를 확인하세요.",
    },
  },

  "http-protocol": {
    Demo: dynamic(() => import("@features/http-protocol/ui/HttpProtocolDemo")),
    getData: () => import("@features/http-protocol/model/data"),
    concept: {
      title: "HTTP 프로토콜",
      description:
        "HTTP는 웹에서 데이터를 주고받기 위한 애플리케이션 계층 프로토콜입니다. HTTP/1.1, HTTP/2, HTTP/3로 발전하면서 성능이 크게 향상되었습니다.",
      children: (
        <p className="text-sm text-text-secondary leading-[1.8]">
          <InlineCode size="md">HTTP/1.1</InlineCode>은 keep-alive로 커넥션을
          재사용하지만 순차적 요청 처리가 한계입니다.
          <InlineCode size="md">HTTP/2</InlineCode>는 멀티플렉싱, 헤더 압축,
          서버 푸시를 도입했습니다.
          <InlineCode size="md">HTTP/3</InlineCode>는 QUIC(UDP 기반) 프로토콜
          위에서 동작하며, 0-RTT 연결과 독립 스트림으로 성능을 극대화합니다.
        </p>
      ),
    },
    demo: {
      title: "HTTP 버전별 연결 흐름 비교",
      description:
        "HTTP/1.1, HTTP/2, HTTP/3의 요청 처리 방식 차이를 시각적으로 비교하세요.",
    },
  },

  "cookie-session": {
    Demo: dynamic(
      () => import("@features/cookie-session/ui/CookieSessionDemo"),
    ),
    getData: () => import("@features/cookie-session/model/data"),
    concept: {
      title: "쿠키와 세션",
      description:
        "HTTP는 무상태(stateless) 프로토콜이므로, 사용자 인증 상태를 유지하기 위해 쿠키, 세션, JWT 등의 메커니즘을 사용합니다.",
      children: (
        <p className="text-sm text-text-secondary leading-[1.8]">
          <InlineCode size="md">쿠키</InlineCode>는 브라우저에 저장되어 매
          요청마다 자동 전송되는 작은 데이터입니다.
          <InlineCode size="md">세션</InlineCode>은 서버에 상태를 저장하고 세션
          ID만 쿠키로 전달합니다.
          <InlineCode size="md">JWT</InlineCode>는 토큰 자체에 정보를 담아
          무상태 인증을 구현합니다. 각 방식의 보안 속성과 트레이드오프를
          이해하는 것이 중요합니다.
        </p>
      ),
    },
    demo: {
      title: "쿠키/세션/JWT 인증 흐름 비교",
      description: "각 인증 방식의 요청-응답 흐름을 단계별로 확인하세요.",
    },
  },

  "graphql-rest": {
    Demo: dynamic(() => import("@features/graphql-rest/ui/GraphqlRestDemo")),
    getData: () => import("@features/graphql-rest/model/data"),
    concept: {
      title: "GraphQL vs REST",
      description:
        "REST와 GraphQL은 API를 설계하는 두 가지 주요 패러다임입니다. 각각의 장단점과 적합한 사용 사례를 이해해야 합니다.",
      children: (
        <p className="text-sm text-text-secondary leading-[1.8]">
          <InlineCode size="md">REST</InlineCode>는 리소스 기반 URL로
          직관적이지만, Over-fetching(불필요한 데이터 수신)과
          Under-fetching(추가 요청 필요) 문제가 있습니다.
          <InlineCode size="md">GraphQL</InlineCode>은 클라이언트가 필요한
          데이터를 정확히 쿼리하여 이 문제를 해결하지만, N+1 문제나 캐싱 전략 등
          새로운 과제가 생깁니다.
        </p>
      ),
    },
    demo: {
      title: "REST vs GraphQL 요청/응답 비교",
      description:
        "Over-fetching, Under-fetching 문제를 시각적으로 비교하세요.",
    },
  },
};
