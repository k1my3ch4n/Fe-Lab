import dynamic from "next/dynamic";
import { InlineCode } from "@shared/ui";
import type { FeatureConfig } from "./types";

export const securityConfigs: Record<string, FeatureConfig> = {
  "xss-csrf": {
    Demo: dynamic(() => import("@features/xss-csrf/ui/XssCsrfDemo")),
    getData: () => import("@features/xss-csrf/model/data"),
    concept: {
      title: "XSS / CSRF 방지",
      description:
        "웹 애플리케이션의 가장 흔한 두 가지 보안 취약점과 방어 전략을 학습합니다.",
      children: (
        <p className="text-sm text-text-secondary leading-[1.8]">
          <InlineCode size="md">XSS</InlineCode>는 악성 스크립트를 삽입하여
          사용자의 데이터를 탈취하고, <InlineCode size="md">CSRF</InlineCode>는
          인증된 사용자의 권한으로 위조된 요청을 보냅니다. 이스케이프, CSRF
          토큰, <InlineCode size="md">CSP</InlineCode> 헤더 등 다층 방어가
          필수적입니다. React는 JSX에서 자동 이스케이프를 제공하지만{" "}
          <InlineCode size="md">dangerouslySetInnerHTML</InlineCode> 사용 시
          주의가 필요합니다.
        </p>
      ),
    },
    demo: {
      title: "보안 공격 / 방어 시각화",
      description:
        "XSS, CSRF 공격 흐름을 시뮬레이션하고, 방어 전략을 확인하세요.",
    },
  },

  "auth-strategy": {
    Demo: dynamic(() => import("@features/auth-strategy/ui/AuthStrategyDemo")),
    getData: () => import("@features/auth-strategy/model/data"),
    concept: {
      title: "인증/인가 전략",
      description:
        "Session, JWT, OAuth 2.0 — 세 가지 핵심 인증 방식의 동작 원리와 트레이드오프를 비교합니다.",
      children: (
        <p className="text-sm text-text-secondary leading-[1.8]">
          <InlineCode size="md">Session</InlineCode>은 서버에 상태를 저장하는
          전통적인 방식이고, <InlineCode size="md">JWT</InlineCode>는
          Stateless한 토큰 기반 인증입니다.{" "}
          <InlineCode size="md">OAuth 2.0</InlineCode>은 제3자 인증(소셜
          로그인)을 위한 표준 프로토콜입니다. 실무에서는 JWT Access Token +
          Refresh Token 조합이 가장 널리 사용되며, 보안을 위해{" "}
          <InlineCode size="md">Refresh Token Rotation</InlineCode>과{" "}
          <InlineCode size="md">httpOnly</InlineCode> 쿠키를 함께 적용합니다.
        </p>
      ),
    },
    demo: {
      title: "인증 흐름 비교 다이어그램",
      description:
        "각 인증 방식의 단계별 흐름을 시뮬레이션하고 장단점을 비교하세요.",
    },
  },
};
