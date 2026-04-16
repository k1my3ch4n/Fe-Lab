import { TopicPageLayout, InlineCode } from "@shared/ui";
import dynamic from "next/dynamic";
const StateManagementDemo = dynamic(
  () => import("@features/state-management/ui/StateManagementDemo"),
);
import {
  codeExamples,
  interviewQuestions,
} from "@features/state-management/model/data";

export default function StateManagementPage() {
  return (
    <TopicPageLayout
      topicId="state-management"
      concept={{
        title: "상태 관리 패턴",
        description:
          "React 앱에서 전역 상태를 효율적으로 관리하는 다양한 패턴과 라이브러리를 비교합니다.",
        children: (
          <p className="text-sm text-text-secondary leading-[1.8]">
            React의 기본 상태 관리(<InlineCode size="md">useState</InlineCode> +{" "}
            <InlineCode size="md">props</InlineCode>)는 컴포넌트 트리가 깊어지면{" "}
            <strong>prop drilling</strong> 문제를 일으킵니다.{" "}
            <InlineCode size="md">Context API</InlineCode>,{" "}
            <InlineCode size="md">Redux Toolkit</InlineCode>,{" "}
            <InlineCode size="md">Zustand</InlineCode> 등 다양한 해법이 있으며,
            각각의 트레이드오프를 이해하는 것이 중요합니다.
          </p>
        ),
      }}
      demo={{
        title: "상태 관리 패턴 비교",
        description:
          "각 접근법의 아키텍처를 비교하고, prop drilling 문제를 시각적으로 확인하세요.",
        children: <StateManagementDemo />,
      }}
      codeExamples={codeExamples}
      interviewQuestions={interviewQuestions}
    />
  );
}
