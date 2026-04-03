import { TopicPageLayout, InlineCode } from "@shared/ui";
import dynamic from "next/dynamic";
const ModuleBundlingDemo = dynamic(() => import("@features/module-bundling/ModuleBundlingDemo"));
import {
  codeExamples,
  interviewQuestions,
} from "@features/module-bundling/data";

export default function ModuleBundlingPage() {
  return (
    <TopicPageLayout
      topicId="module-bundling"
      concept={{
        title: "모듈 번들링과 최적화",
        description:
          "번들러가 모듈을 하나로 합치고, 트리 쉐이킹과 코드 스플릿팅으로 최적화하는 과정을 학습합니다.",
        children: (
          <p className="text-sm text-text-secondary leading-[1.8]">
            모던 웹 앱은 수백 개의 모듈로 구성됩니다.{" "}
            <InlineCode size="md">번들러</InlineCode>는 이를 최적화된 파일로
            합치고, <InlineCode size="md">트리 쉐이킹</InlineCode>으로 미사용
            코드를 제거하며, <InlineCode size="md">코드 스플릿팅</InlineCode>
            으로 필요한 코드만 로드합니다. ESM의 정적 분석 특성이 이러한
            최적화를 가능하게 합니다.
          </p>
        ),
      }}
      demo={{
        title: "번들 사이즈 비교와 최적화",
        description:
          "트리 쉐이킹, 코드 스플릿팅, ESM vs CJS의 번들 사이즈 차이를 확인하세요.",
        children: <ModuleBundlingDemo />,
      }}
      codeExamples={codeExamples}
      interviewQuestions={interviewQuestions}
    />
  );
}
