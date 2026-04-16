import { TopicPageLayout, InlineCode } from "@shared/ui";
import dynamic from "next/dynamic";
const GenericsDemo = dynamic(
  () => import("@features/generics/ui/GenericsDemo"),
);
import {
  codeExamples,
  interviewQuestions,
} from "@features/generics/model/data";

export default function GenericsPage() {
  return (
    <TopicPageLayout
      topicId="generics"
      concept={{
        title: "제네릭과 유틸리티 타입",
        description:
          "제네릭은 타입을 매개변수로 받아 재사용 가능한 컴포넌트를 만드는 TypeScript의 핵심 기능입니다.",
        children: (
          <p className="text-sm text-text-secondary leading-[1.8]">
            제네릭을 사용하면 <strong>타입 안전성</strong>을 유지하면서{" "}
            <strong>유연한 코드</strong>를 작성할 수 있습니다. TypeScript는{" "}
            <InlineCode size="md">{"Partial<T>"}</InlineCode>,{" "}
            <InlineCode size="md">{"Pick<T,K>"}</InlineCode>,{" "}
            <InlineCode size="md">{"Omit<T,K>"}</InlineCode>,{" "}
            <InlineCode size="md">{"Record<K,V>"}</InlineCode> 등 다양한 내장
            유틸리티 타입을 제공하며, 조건부 타입과{" "}
            <InlineCode size="md">infer</InlineCode>를 활용해 커스텀 유틸리티
            타입도 만들 수 있습니다.
          </p>
        ),
      }}
      demo={{
        title: "제네릭 타입 변환 시각화",
        description:
          "각 유틸리티 타입을 선택하고 실행하여 타입 변환 과정을 확인하세요.",
        children: <GenericsDemo />,
      }}
      codeExamples={codeExamples}
      interviewQuestions={interviewQuestions}
    />
  );
}
