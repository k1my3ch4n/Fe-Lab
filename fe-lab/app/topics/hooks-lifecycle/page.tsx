import { TopicPageLayout, InlineCode } from "@shared/ui";
import dynamic from "next/dynamic";
const HooksLifecycleDemo = dynamic(
  () => import("@features/hooks-lifecycle/ui/HooksLifecycleDemo"),
);
import {
  codeExamples,
  interviewQuestions,
} from "@features/hooks-lifecycle/model/data";

export default function HooksLifecyclePage() {
  return (
    <TopicPageLayout
      topicId="hooks-lifecycle"
      concept={{
        title: "Hooks 라이프사이클",
        description:
          "React 함수형 컴포넌트에서 훅이 실행되는 순서와 타이밍을 이해합니다.",
        children: (
          <p className="text-sm text-text-secondary leading-[1.8]">
            함수형 컴포넌트는 클래스 컴포넌트의 라이프사이클 메서드 대신{" "}
            <InlineCode size="md">useEffect</InlineCode>,{" "}
            <InlineCode size="md">useLayoutEffect</InlineCode> 등의 훅으로
            사이드 이펙트를 관리합니다. 각 훅이{" "}
            <strong>Mount, Update, Unmount</strong> 단계에서 어떤 순서로
            실행되는지 정확히 아는 것이 면접에서 자주 출제되는 핵심 주제입니다.
          </p>
        ),
      }}
      demo={{
        title: "훅 실행 순서 시각화",
        description:
          "각 라이프사이클 단계를 실행하여 훅이 어떤 순서로 호출되는지 확인하세요.",
        children: <HooksLifecycleDemo />,
      }}
      codeExamples={codeExamples}
      interviewQuestions={interviewQuestions}
    />
  );
}
