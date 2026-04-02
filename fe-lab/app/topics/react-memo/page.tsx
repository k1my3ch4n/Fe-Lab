import { Topbar } from "@widgets/topbar";
import {
  ConceptSection,
  DemoSection,
  CodeSection,
  InterviewSection,
  InlineCode,
} from "@shared/ui";
import { ReactMemoDemo } from "@features/react-memo";
import { codeExamples, interviewQuestions } from "@features/react-memo/data";

export default function ReactMemoPage() {
  return (
    <>
      <Topbar topicId="react-memo" />

      <ConceptSection
        title="React 메모이제이션"
        description="React에서 불필요한 리렌더링을 방지하는 메모이제이션 기법을 학습합니다."
      >
        <p className="text-sm text-text-secondary leading-[1.8]">
          <InlineCode size="md">React.memo</InlineCode>는 props가 변경되지
          않으면 리렌더링을 건너뛰는 고차 컴포넌트입니다.{" "}
          <InlineCode size="md">useMemo</InlineCode>는 값을,{" "}
          <InlineCode size="md">useCallback</InlineCode>은 함수 참조를
          메모이제이션합니다. React Compiler는 이러한 최적화를 자동으로 수행하는
          차세대 도구입니다.
        </p>
      </ConceptSection>

      <DemoSection
        title="리렌더링 카운터 — memo 적용 전후 비교"
        description="부모 컴포넌트가 리렌더링될 때 자식의 렌더링 여부를 확인하세요."
      >
        <ReactMemoDemo />
      </DemoSection>

      <CodeSection examples={codeExamples} />

      <InterviewSection questions={interviewQuestions} />
    </>
  );
}
