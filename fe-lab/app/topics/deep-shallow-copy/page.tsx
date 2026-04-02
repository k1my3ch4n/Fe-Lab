import { Topbar } from "@widgets/topbar";
import {
  ConceptSection,
  DemoSection,
  CodeSection,
  InterviewSection,
  InlineCode,
} from "@shared/ui";
import { DeepShallowCopyDemo } from "@features/deep-shallow-copy";
import {
  codeExamples,
  interviewQuestions,
} from "@features/deep-shallow-copy/data";

export default function DeepShallowCopyPage() {
  return (
    <>
      <Topbar topicId="deep-shallow-copy" />

      <ConceptSection
        title="깊은 복사 / 얕은 복사"
        description="JavaScript에서 객체를 복사할 때 참조 공유 여부에 따라 얕은 복사와 깊은 복사로 나뉩니다."
      >
        <p className="text-sm text-text-secondary leading-[1.8]">
          <InlineCode size="md">Spread</InlineCode>와{" "}
          <InlineCode size="md">Object.assign</InlineCode>은 1단계만 복사하는
          얕은 복사를 수행합니다. 중첩 객체의 완전한 독립을 위해서는{" "}
          <InlineCode size="md">structuredClone</InlineCode>이나{" "}
          <InlineCode size="md">JSON.parse(JSON.stringify())</InlineCode>를
          사용합니다. 원시 타입은 값이 복제되지만, 참조 타입은 메모리 주소가
          공유됩니다.
        </p>
      </ConceptSection>

      <DemoSection
        title="객체 복사와 참조 비교 시각화"
        description="각 복사 방식을 선택하고 원시값/참조값 변경 시 원본에 미치는 영향을 확인하세요."
      >
        <DeepShallowCopyDemo />
      </DemoSection>

      <CodeSection examples={codeExamples} />

      <InterviewSection questions={interviewQuestions} />
    </>
  );
}
