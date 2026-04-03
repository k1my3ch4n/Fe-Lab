import { TopicPageLayout, InlineCode } from "@shared/ui";
import { ScopeContextDemo } from "@features/scope-context";
import { codeExamples, interviewQuestions } from "@features/scope-context/data";

export default function ScopeContextPage() {
  return (
    <TopicPageLayout
      topicId="scope-context"
      concept={{
        title: "스코프와 실행 컨텍스트",
        description:
          "스코프는 변수의 접근 범위를, 실행 컨텍스트는 코드 실행에 필요한 환경 정보를 담고 있습니다.",
        children: (
          <p className="text-sm text-text-secondary leading-[1.8]">
            JavaScript는 <strong>렉시컬 스코핑</strong>을 따르며, 함수가 선언된
            위치에 따라 스코프 체인이 결정됩니다.
            <InlineCode size="md">this</InlineCode>는 함수의 호출 방식에 따라
            동적으로 바인딩되며, 화살표 함수는 상위 스코프의 this를 상속합니다.
            <InlineCode size="md">IIFE</InlineCode>는 전역 스코프 오염을
            방지하는 전통적인 패턴입니다.
          </p>
        ),
      }}
      demo={{
        title: "this 바인딩과 스코프 체인 시각화",
        description:
          "각 바인딩 방식을 선택하고 실행하여 this가 어떻게 결정되는지 확인하세요.",
        children: <ScopeContextDemo />,
      }}
      codeExamples={codeExamples}
      interviewQuestions={interviewQuestions}
    />
  );
}
