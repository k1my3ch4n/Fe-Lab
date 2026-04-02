import { Topbar } from "@widgets/topbar";
import {
  ConceptSection,
  DemoSection,
  CodeSection,
  InterviewSection,
  InlineCode,
} from "@shared/ui";
import { WebSocketSseDemo } from "@features/websocket-sse";
import { codeExamples, interviewQuestions } from "@features/websocket-sse/data";

export default function WebSocketSsePage() {
  return (
    <>
      <Topbar topicId="websocket-sse" />

      <ConceptSection
        title="WebSocket vs SSE (Server-Sent Events)"
        description="실시간 통신을 위한 두 가지 접근 방식을 비교합니다. WebSocket은 양방향, SSE는 서버에서 클라이언트로의 단방향 스트리밍을 제공합니다."
      >
        <p className="text-sm text-text-secondary leading-[1.8]">
          전통적인 HTTP는 <strong>요청-응답</strong> 모델입니다. 서버가
          클라이언트에게 먼저 데이터를 보낼 수 없죠. 이를 해결하기 위해{" "}
          <InlineCode size="md">WebSocket</InlineCode>과{" "}
          <InlineCode size="md">SSE (Server-Sent Events)</InlineCode>가
          등장했습니다. WebSocket은 <strong>양방향 전이중 통신</strong>을, SSE는{" "}
          <strong>서버→클라이언트 단방향 스트리밍</strong>을 제공합니다.
          ChatGPT의 응답 스트리밍이 SSE를 사용하는 대표적인 예입니다.
        </p>
      </ConceptSection>

      <DemoSection
        title="실시간 통신 시뮬레이션"
        description="WebSocket과 SSE의 메시지 흐름을 시각적으로 비교해보세요. 시뮬레이션을 실행하여 양방향/단방향 차이를 확인하세요."
      >
        <WebSocketSseDemo />
      </DemoSection>

      <CodeSection examples={codeExamples} />

      <InterviewSection questions={interviewQuestions} />
    </>
  );
}
