import { TopicPageLayout, InlineCode } from "@shared/ui";
import { SuspenseErrorBoundaryDemo } from "@features/suspense-error-boundary";
import {
  codeExamples,
  interviewQuestions,
} from "@features/suspense-error-boundary/data";

export default function SuspenseErrorBoundaryPage() {
  return (
    <TopicPageLayout
      topicId="suspense-error-boundary"
      concept={{
        title: "Suspense / Error Boundary",
        description:
          "React에서 로딩과 에러 상태를 선언적으로 처리하는 두 가지 핵심 패턴입니다.",
        children: (
          <p className="text-sm text-text-secondary leading-[1.8]">
            <InlineCode size="md">Suspense</InlineCode>는 비동기 데이터 로딩 시
            fallback UI를 선언적으로 표시합니다.{" "}
            <InlineCode size="md">Error Boundary</InlineCode>는 렌더링 중 발생한
            에러를 catch하여 앱 크래시를 방지합니다. React 19의{" "}
            <InlineCode size="md">use()</InlineCode> 훅과 함께 사용하면
            Promise를 직접 읽으면서도 로딩/에러 상태를 자동으로 처리할 수
            있습니다.
          </p>
        ),
      }}
      demo={{
        title: "Suspense / Error Boundary 흐름 시각화",
        description:
          "각 패턴의 동작 흐름을 단계별로 시뮬레이션하여 확인하세요.",
        children: <SuspenseErrorBoundaryDemo />,
      }}
      codeExamples={codeExamples}
      interviewQuestions={interviewQuestions}
    />
  );
}
