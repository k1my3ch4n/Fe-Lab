import { TopicPageLayout, InlineCode } from "@shared/ui";
import { CurryingCompositionDemo } from "@features/currying-composition";
import {
  codeExamples,
  interviewQuestions,
} from "@features/currying-composition/data";

export default function CurryingCompositionPage() {
  return (
    <TopicPageLayout
      topicId="currying-composition"
      concept={{
        title: "커링과 함수 합성",
        description:
          "커링은 다중 인자 함수를 단일 인자 함수 체인으로 변환하고, 함수 합성은 여러 함수를 결합하여 새로운 함수를 만듭니다.",
        children: (
          <p className="text-sm text-text-secondary leading-[1.8]">
            <InlineCode size="md">커링(Currying)</InlineCode>은 함수의 인자를
            하나씩 받아 <strong>부분 적용(Partial Application)</strong>을
            가능하게 합니다.{" "}
            <InlineCode size="md">함수 합성(Composition)</InlineCode>은{" "}
            <InlineCode size="md">pipe</InlineCode>와{" "}
            <InlineCode size="md">compose</InlineCode>를 통해 작은 함수들을
            결합하여 복잡한 데이터 변환 파이프라인을 구축합니다.
          </p>
        ),
      }}
      demo={{
        title: "부분 적용 및 함수 체이닝 시각화",
        description:
          "각 예제를 선택하고 단계별로 실행하여 커링과 합성 과정을 확인하세요.",
        children: <CurryingCompositionDemo />,
      }}
      codeExamples={codeExamples}
      interviewQuestions={interviewQuestions}
    />
  );
}
