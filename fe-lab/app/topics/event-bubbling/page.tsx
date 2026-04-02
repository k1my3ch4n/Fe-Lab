import { Topbar } from "@widgets/topbar";
import {
  ConceptSection,
  DemoSection,
  CodeSection,
  InterviewSection,
  InlineCode,
  PhaseChip,
} from "@shared/ui";
import { EventBubblingDemo } from "@features/event-bubbling";
import {
  codeExamples,
  interviewQuestions,
} from "@features/event-bubbling/data";

export default function EventBubblingPage() {
  return (
    <>
      <Topbar topicId="event-bubbling" />

      <ConceptSection
        title="이벤트 전파 (Event Propagation)"
        description="DOM 이벤트는 단순히 타겟 요소에서만 발생하지 않습니다. 이벤트는 캡쳐링 → 타겟 → 버블링 3단계를 거쳐 전파됩니다."
      >
        <p className="text-sm text-text-secondary leading-[1.8]">
          사용자가 버튼을 클릭하면, 이벤트는 먼저{" "}
          <InlineCode size="md">window</InlineCode>에서 시작해 타겟까지
          내려갑니다 (캡쳐링). 타겟에 도달한 후, 다시{" "}
          <InlineCode size="md">window</InlineCode>까지 올라갑니다 (버블링).
        </p>
        <div className="flex gap-3 mt-4 flex-wrap">
          <PhaseChip
            label="① 캡쳐링 (Capturing) — window → target"
            variant="capture"
          />
          <PhaseChip
            label="② 타겟 (Target) — 이벤트 발생 지점"
            variant="target"
          />
          <PhaseChip
            label="③ 버블링 (Bubbling) — target → window"
            variant="bubble"
          />
        </div>
      </ConceptSection>

      <DemoSection
        title="직접 클릭해 보세요"
        description="중첩된 요소를 클릭하면 이벤트가 어떻게 전파되는지 실시간으로 확인할 수 있습니다."
      >
        <EventBubblingDemo />
      </DemoSection>

      <CodeSection examples={codeExamples} />

      <InterviewSection questions={interviewQuestions} />
    </>
  );
}
