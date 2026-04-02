import { Topbar } from "@widgets/topbar";
import {
  ConceptSection,
  DemoSection,
  CodeSection,
  InterviewSection,
  InlineCode,
} from "@shared/ui";
import { HttpProtocolDemo } from "@features/http-protocol";
import { codeExamples, interviewQuestions } from "@features/http-protocol/data";

export default function HttpProtocolPage() {
  return (
    <>
      <Topbar topicId="http-protocol" />

      <ConceptSection
        title="HTTP 프로토콜"
        description="HTTP는 웹에서 데이터를 주고받기 위한 애플리케이션 계층 프로토콜입니다. HTTP/1.1, HTTP/2, HTTP/3로 발전하면서 성능이 크게 향상되었습니다."
      >
        <p className="text-sm text-text-secondary leading-[1.8]">
          <InlineCode size="md">HTTP/1.1</InlineCode>은 keep-alive로 커넥션을
          재사용하지만 순차적 요청 처리가 한계입니다.
          <InlineCode size="md">HTTP/2</InlineCode>는 멀티플렉싱, 헤더 압축,
          서버 푸시를 도입했습니다.
          <InlineCode size="md">HTTP/3</InlineCode>는 QUIC(UDP 기반) 프로토콜
          위에서 동작하며, 0-RTT 연결과 독립 스트림으로 성능을 극대화합니다.
        </p>
      </ConceptSection>

      <DemoSection
        title="HTTP 버전별 연결 흐름 비교"
        description="HTTP/1.1, HTTP/2, HTTP/3의 요청 처리 방식 차이를 시각적으로 비교하세요."
      >
        <HttpProtocolDemo />
      </DemoSection>

      <CodeSection examples={codeExamples} />

      <InterviewSection questions={interviewQuestions} />
    </>
  );
}
