import { TopicPageLayout, InlineCode } from "@shared/ui";
import dynamic from "next/dynamic";
const UseRefDemo = dynamic(() => import("@features/use-ref/ui/UseRefDemo"));
import { codeExamples, interviewQuestions } from "@features/use-ref/model/data";

export default function UseRefPage() {
  return (
    <TopicPageLayout
      topicId="use-ref"
      concept={{
        title: "useRef",
        description:
          "useRef는 렌더링 사이에 값을 유지하면서도 리렌더링을 트리거하지 않는 React 훅입니다.",
        children: (
          <p className="text-sm text-text-secondary leading-[1.8]">
            <InlineCode size="md">useRef</InlineCode>는{" "}
            <InlineCode size="md">.current</InlineCode> 속성을 가진 가변 객체를
            반환합니다. DOM 요소에 직접 접근하거나, 타이머 ID, 이전 렌더링 값 등
            <strong> 리렌더링과 무관한 값</strong>을 저장할 때 사용합니다.
            <InlineCode size="md">useState</InlineCode>와 달리 값을 변경해도
            컴포넌트가 다시 렌더링되지 않습니다.
          </p>
        ),
      }}
      demo={{
        title: "useRef vs useState 비교",
        description:
          "값 변경 시 리렌더링 여부와 DOM 참조, 이전 값 저장을 직접 확인하세요.",
        children: <UseRefDemo />,
      }}
      codeExamples={codeExamples}
      interviewQuestions={interviewQuestions}
    />
  );
}
