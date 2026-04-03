import { TopicPageLayout, InlineCode } from "@shared/ui";
import dynamic from "next/dynamic";
const TypeGuardDemo = dynamic(() => import("@features/type-guard/TypeGuardDemo"));
import { codeExamples, interviewQuestions } from "@features/type-guard/data";

export default function TypeGuardPage() {
  return (
    <TopicPageLayout
      topicId="type-guard"
      concept={{
        title: "타입 가드와 타입 좁히기",
        description:
          "타입 가드는 런타임 검사를 통해 TypeScript가 특정 스코프 내에서 타입을 더 구체적으로 추론하도록 합니다.",
        children: (
          <p className="text-sm text-text-secondary leading-[1.8]">
            TypeScript는 <InlineCode size="md">typeof</InlineCode>,{" "}
            <InlineCode size="md">instanceof</InlineCode>,{" "}
            <InlineCode size="md">in</InlineCode> 연산자를 타입 가드로
            인식합니다. 더 복잡한 타입 구분이 필요할 때는{" "}
            <InlineCode size="md">is</InlineCode> 키워드를 사용한{" "}
            <strong>사용자 정의 타입 가드</strong>를 만들 수 있으며,{" "}
            <strong>Discriminated Union</strong> 패턴으로 안전한 분기 처리가
            가능합니다.
          </p>
        ),
      }}
      demo={{
        title: "타입 좁히기 시각화",
        description:
          "각 타입 가드를 선택하고 실행하여 타입이 어떻게 좁혀지는지 확인하세요.",
        children: <TypeGuardDemo />,
      }}
      codeExamples={codeExamples}
      interviewQuestions={interviewQuestions}
    />
  );
}
