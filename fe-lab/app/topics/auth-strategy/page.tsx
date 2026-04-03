import { Topbar } from "@widgets/topbar";
import {
  ConceptSection,
  DemoSection,
  CodeSection,
  InterviewSection,
  InlineCode,
} from "@shared/ui";
import { AuthStrategyDemo } from "@features/auth-strategy";
import { codeExamples, interviewQuestions } from "@features/auth-strategy/data";

export default function AuthStrategyPage() {
  return (
    <>
      <Topbar topicId="auth-strategy" />

      <ConceptSection
        title="인증/인가 전략"
        description="Session, JWT, OAuth 2.0 — 세 가지 핵심 인증 방식의 동작 원리와 트레이드오프를 비교합니다."
      >
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
      </ConceptSection>

      <DemoSection
        title="인증 흐름 비교 다이어그램"
        description="각 인증 방식의 단계별 흐름을 시뮬레이션하고 장단점을 비교하세요."
      >
        <AuthStrategyDemo />
      </DemoSection>

      <CodeSection examples={codeExamples} />

      <InterviewSection questions={interviewQuestions} />
    </>
  );
}
