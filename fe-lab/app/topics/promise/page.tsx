import { TopicPageLayout, InlineCode } from "@shared/ui";
import { PromiseDemo } from "@features/promise";
import { codeExamples, interviewQuestions } from "@features/promise/data";

export default function PromisePage() {
  return (
    <TopicPageLayout
      topicId="promise"
      concept={{
        title: "Promise",
        description:
          "Promise는 비동기 작업의 결과를 나타내는 객체로, 콜백 헬을 해결하고 체이닝을 통한 가독성 향상을 제공합니다.",
        children: (
          <p className="text-sm text-text-secondary leading-[1.8]">
            Promise는 <InlineCode size="md">pending</InlineCode>,{" "}
            <InlineCode size="md">fulfilled</InlineCode>,{" "}
            <InlineCode size="md">rejected</InlineCode> 세 가지 상태를 가집니다.
            <InlineCode size="md">async/await</InlineCode>는 Promise를 동기
            코드처럼 작성할 수 있게 해주는 문법적 설탕입니다.
            <InlineCode size="md">Promise.all</InlineCode>,{" "}
            <InlineCode size="md">race</InlineCode>,{" "}
            <InlineCode size="md">allSettled</InlineCode>,{" "}
            <InlineCode size="md">any</InlineCode>로 여러 비동기 작업을
            조합합니다.
          </p>
        ),
      }}
      demo={{
        title: "Promise 상태 전이와 메서드 시뮬레이션",
        description:
          "각 Promise 메서드를 선택하고 시뮬레이션하여 동작 차이를 확인하세요.",
        children: <PromiseDemo />,
      }}
      codeExamples={codeExamples}
      interviewQuestions={interviewQuestions}
    />
  );
}
