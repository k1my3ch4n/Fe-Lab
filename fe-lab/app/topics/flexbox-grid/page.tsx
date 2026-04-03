import { Topbar } from "@widgets/topbar";
import {
  ConceptSection,
  DemoSection,
  CodeSection,
  InterviewSection,
  InlineCode,
} from "@shared/ui";
import { FlexboxGridDemo } from "@features/flexbox-grid";
import { codeExamples, interviewQuestions } from "@features/flexbox-grid/data";

export default function FlexboxGridPage() {
  return (
    <>
      <Topbar topicId="flexbox-grid" />

      <ConceptSection
        title="Flexbox vs Grid"
        description="CSS의 두 가지 핵심 레이아웃 시스템인 Flexbox(1차원)와 Grid(2차원)를 비교합니다."
      >
        <p className="text-sm text-text-secondary leading-[1.8]">
          <InlineCode size="md">Flexbox</InlineCode>는 행 또는 열 한 방향으로
          아이템을 배치하는 <strong>1차원 레이아웃</strong> 시스템이고,{" "}
          <InlineCode size="md">Grid</InlineCode>는 행과 열을 동시에 제어하는{" "}
          <strong>2차원 레이아웃</strong> 시스템입니다. 각 속성을 조절하며
          레이아웃 변화를 실시간으로 확인해보세요.
        </p>
      </ConceptSection>

      <DemoSection
        title="레이아웃 속성 비교"
        description="Flexbox와 Grid 탭을 전환하고 속성을 조절하여 레이아웃 변화를 확인하세요."
      >
        <FlexboxGridDemo />
      </DemoSection>

      <CodeSection examples={codeExamples} />

      <InterviewSection questions={interviewQuestions} />
    </>
  );
}
