import { Topbar } from "@widgets/topbar";
import {
  ConceptSection,
  DemoSection,
  CodeSection,
  InterviewSection,
  InlineCode,
} from "@shared/ui";
import { MemoryManagementDemo } from "@features/memory-management";
import {
  codeExamples,
  interviewQuestions,
} from "@features/memory-management/data";

export default function MemoryManagementPage() {
  return (
    <>
      <Topbar topicId="memory-management" />

      <ConceptSection
        title="메모리 관리"
        description="JavaScript의 메모리 관리와 가비지 컬렉션을 이해하고, 메모리 릭을 방지하는 패턴을 학습합니다."
      >
        <p className="text-sm text-text-secondary leading-[1.8]">
          JavaScript는 <strong>가비지 컬렉션(GC)</strong>을 통해 자동으로
          메모리를 관리하지만, 이벤트 리스너 미해제, 클로저 참조, 분리된 DOM
          노드 등으로 <strong>메모리 릭</strong>이 발생할 수 있습니다.
          <InlineCode size="md">WeakRef</InlineCode>와{" "}
          <InlineCode size="md">WeakMap</InlineCode>을 활용하면 GC 친화적인
          코드를 작성할 수 있습니다.
        </p>
      </ConceptSection>

      <DemoSection
        title="메모리 릭 패턴과 해결 시각화"
        description="각 메모리 릭 패턴을 선택하고, 문제 발생과 해결 과정을 시뮬레이션하세요."
      >
        <MemoryManagementDemo />
      </DemoSection>

      <CodeSection examples={codeExamples} />

      <InterviewSection questions={interviewQuestions} />
    </>
  );
}
