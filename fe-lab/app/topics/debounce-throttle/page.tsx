import { Topbar } from "@widgets/topbar";
import {
  ConceptSection,
  DemoSection,
  CodeSection,
  InterviewSection,
  InlineCode,
} from "@shared/ui";
import { DebounceThrottleDemo } from "@features/debounce-throttle";
import {
  codeExamples,
  interviewQuestions,
} from "@features/debounce-throttle/data";

export default function DebounceThrottlePage() {
  return (
    <>
      <Topbar topicId="debounce-throttle" />

      <ConceptSection
        title="디바운스 / 쓰로틀"
        description="빈번한 이벤트 호출을 제어하여 성능을 최적화하는 두 가지 핵심 기법입니다."
      >
        <p className="text-sm text-text-secondary leading-[1.8]">
          <InlineCode size="md">디바운스</InlineCode>는 이벤트가 멈춘 후 일정
          시간이 지나야 실행되고, <InlineCode size="md">쓰로틀</InlineCode>은
          일정 간격으로 최대 1회 실행을 보장합니다. 검색 입력, 스크롤 이벤트,
          리사이즈 이벤트 등에서 불필요한 함수 호출을 줄여{" "}
          <strong>성능 최적화</strong>에 활용됩니다.
        </p>
      </ConceptSection>

      <DemoSection
        title="호출 횟수 비교 및 타임라인"
        description="이벤트 영역을 빠르게 클릭하여 원본, 디바운스, 쓰로틀의 호출 횟수 차이를 확인하세요."
      >
        <DebounceThrottleDemo />
      </DemoSection>

      <CodeSection examples={codeExamples} />

      <InterviewSection questions={interviewQuestions} />
    </>
  );
}
