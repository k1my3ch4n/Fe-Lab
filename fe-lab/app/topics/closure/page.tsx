import { TopicPageLayout, InlineCode } from "@shared/ui";
import dynamic from "next/dynamic";
const ClosureDemo = dynamic(() => import("@features/closure/ui/ClosureDemo"));
import { codeExamples, interviewQuestions } from "@features/closure/model/data";

export default function ClosurePage() {
  return (
    <TopicPageLayout
      topicId="closure"
      concept={{
        title: "클로저 (Closure)",
        description:
          "클로저는 함수와 그 함수가 선언된 렉시컬 환경의 조합입니다. 내부 함수가 외부 함수의 변수를 기억하는 현상입니다.",
        children: (
          <p className="text-sm text-text-secondary leading-[1.8]">
            JavaScript에서 함수는 자신이 <strong>생성된 시점</strong>의 스코프를
            기억합니다. 외부 함수가 종료된 후에도 내부 함수는 외부 함수의 변수에
            접근할 수 있습니다. 이것이 <InlineCode size="md">클로저</InlineCode>
            입니다. React의 <InlineCode size="md">useState</InlineCode>,{" "}
            <InlineCode size="md">useEffect</InlineCode> 등 훅도 내부적으로
            클로저를 활용합니다.
          </p>
        ),
      }}
      demo={{
        title: "스코프 체인과 클로저 시각화",
        description:
          "각 예제를 선택하고 실행하여 클로저가 어떻게 외부 변수를 기억하는지 확인하세요.",
        children: <ClosureDemo />,
      }}
      codeExamples={codeExamples}
      interviewQuestions={interviewQuestions}
    />
  );
}
