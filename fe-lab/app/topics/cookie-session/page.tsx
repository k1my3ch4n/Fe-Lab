import { Topbar } from "@widgets/topbar";
import {
  ConceptSection,
  DemoSection,
  CodeSection,
  InterviewSection,
  InlineCode,
} from "@shared/ui";
import { CookieSessionDemo } from "@features/cookie-session";
import {
  codeExamples,
  interviewQuestions,
} from "@features/cookie-session/data";

export default function CookieSessionPage() {
  return (
    <>
      <Topbar topicId="cookie-session" />

      <ConceptSection
        title="쿠키와 세션"
        description="HTTP는 무상태(stateless) 프로토콜이므로, 사용자 인증 상태를 유지하기 위해 쿠키, 세션, JWT 등의 메커니즘을 사용합니다."
      >
        <p className="text-sm text-text-secondary leading-[1.8]">
          <InlineCode size="md">쿠키</InlineCode>는 브라우저에 저장되어 매
          요청마다 자동 전송되는 작은 데이터입니다.
          <InlineCode size="md">세션</InlineCode>은 서버에 상태를 저장하고 세션
          ID만 쿠키로 전달합니다.
          <InlineCode size="md">JWT</InlineCode>는 토큰 자체에 정보를 담아
          무상태 인증을 구현합니다. 각 방식의 보안 속성과 트레이드오프를
          이해하는 것이 중요합니다.
        </p>
      </ConceptSection>

      <DemoSection
        title="쿠키/세션/JWT 인증 흐름 비교"
        description="각 인증 방식의 요청-응답 흐름을 단계별로 확인하세요."
      >
        <CookieSessionDemo />
      </DemoSection>

      <CodeSection examples={codeExamples} />

      <InterviewSection questions={interviewQuestions} />
    </>
  );
}
