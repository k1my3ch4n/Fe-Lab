import { Topbar } from "@widgets/topbar";
import {
  ConceptSection,
  DemoSection,
  CodeSection,
  InterviewSection,
  InlineCode,
} from "@shared/ui";
import { ReconciliationDemo } from "@features/reconciliation";
import {
  codeExamples,
  interviewQuestions,
} from "@features/reconciliation/data";

export default function ReconciliationPage() {
  return (
    <>
      <Topbar topicId="reconciliation" />

      <ConceptSection
        title="재조정 (Reconciliation)"
        description="React가 Virtual DOM의 이전 트리와 새 트리를 비교하여 최소한의 DOM 변경만 수행하는 핵심 알고리즘입니다."
      >
        <p className="text-sm text-text-secondary leading-[1.8]">
          React는 <InlineCode size="md">render()</InlineCode>가 호출될 때마다
          새로운 React 엘리먼트 트리를 생성합니다. 이전 트리와 새 트리의 차이를
          효율적으로 계산하기 위해 <strong>O(n) 휴리스틱 알고리즘</strong>을
          사용합니다. 두 가지 핵심 가정이 있습니다: 다른 타입의 엘리먼트는 다른
          트리를 생성하며, <InlineCode size="md">key</InlineCode> prop으로 자식
          엘리먼트를 안정적으로 식별합니다.
        </p>
      </ConceptSection>

      <DemoSection
        title="재조정 알고리즘 시각화"
        description="각 시나리오를 선택하고 단계별로 진행하여 React가 트리를 어떻게 비교하는지 확인하세요."
      >
        <ReconciliationDemo />
      </DemoSection>

      <CodeSection examples={codeExamples} />

      <InterviewSection questions={interviewQuestions} />
    </>
  );
}
