import { TopicPageLayout, InlineCode } from "@shared/ui";
import dynamic from "next/dynamic";
const ReactMemoDemo = dynamic(
  () => import("@features/react-memo/ui/ReactMemoDemo"),
);
import { codeExamples, interviewQuestions } from "@features/react-memo/model/data";

export default function ReactMemoPage() {
  return (
    <TopicPageLayout
      topicId="react-memo"
      concept={{
        title: "React 메모이제이션",
        description:
          "React에서 불필요한 리렌더링을 방지하는 메모이제이션 기법을 학습합니다.",
        children: (
          <p className="text-sm text-text-secondary leading-[1.8]">
            <InlineCode size="md">React.memo</InlineCode>는 props가 변경되지
            않으면 리렌더링을 건너뛰는 고차 컴포넌트입니다.{" "}
            <InlineCode size="md">useMemo</InlineCode>는 값을,{" "}
            <InlineCode size="md">useCallback</InlineCode>은 함수 참조를
            메모이제이션합니다. React Compiler는 이러한 최적화를 자동으로
            수행하는 차세대 도구입니다.
          </p>
        ),
      }}
      demo={{
        title: "리렌더링 카운터 — memo 적용 전후 비교",
        description:
          "부모 컴포넌트가 리렌더링될 때 자식의 렌더링 여부를 확인하세요.",
        children: <ReactMemoDemo />,
      }}
      codeExamples={codeExamples}
      interviewQuestions={interviewQuestions}
    />
  );
}
