import { Topbar } from "@widgets/topbar";
import {
  ConceptSection,
  DemoSection,
  CodeSection,
  InterviewSection,
  InlineCode,
} from "@shared/ui";
import { EventLoopDemo } from "@features/event-loop";
import { codeExamples, interviewQuestions } from "@features/event-loop/data";

export default function EventLoopPage() {
  return (
    <>
      <Topbar topicId="event-loop" />

      <ConceptSection
        title="이벤트 루프 (Event Loop)"
        description="이벤트 루프는 JavaScript의 비동기 실행을 관리하는 핵심 메커니즘입니다. 콜 스택, 마이크로태스크 큐, 태스크 큐의 상호작용을 이해하는 것이 중요합니다."
      >
        <p className="text-sm text-text-secondary leading-[1.8]">
          JavaScript는 <strong>싱글 스레드</strong> 언어이지만, 이벤트 루프를
          통해 비동기 작업을 효율적으로 처리합니다. 콜 스택이 비면 이벤트 루프가{" "}
          <InlineCode size="md">마이크로태스크 큐</InlineCode>를 먼저 확인하고,
          그 다음 <InlineCode size="md">태스크 큐</InlineCode>에서 작업을 꺼내
          실행합니다. <InlineCode size="md">Promise.then</InlineCode>과{" "}
          <InlineCode size="md">setTimeout</InlineCode>의 실행 순서가 다른
          이유가 바로 이것입니다.
        </p>
      </ConceptSection>

      <DemoSection
        title="이벤트 루프 시각화"
        description="시나리오를 선택하고 단계별로 진행하여 콜 스택, 마이크로태스크 큐, 태스크 큐의 변화를 관찰하세요."
      >
        <EventLoopDemo />
      </DemoSection>

      <CodeSection examples={codeExamples} />

      <InterviewSection questions={interviewQuestions} />
    </>
  );
}
