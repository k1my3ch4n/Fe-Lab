import { TopicPageLayout, InlineCode } from "@shared/ui";
import dynamic from "next/dynamic";
const CriticalRenderingPathDemo = dynamic(
  () =>
    import("@features/critical-rendering-path/ui/CriticalRenderingPathDemo"),
);
import {
  codeExamples,
  interviewQuestions,
} from "@features/critical-rendering-path/model/data";

export default function CriticalRenderingPathPage() {
  return (
    <TopicPageLayout
      topicId="critical-rendering-path"
      concept={{
        title: "크리티컬 렌더링 패스 (Critical Rendering Path)",
        description:
          "브라우저가 HTML, CSS, JS를 받아 화면에 첫 픽셀을 그리기까지의 과정을 이해하고 최적화하는 방법을 학습합니다.",
        children: (
          <p className="text-sm text-text-secondary leading-[1.8]">
            크리티컬 렌더링 패스(CRP)는 브라우저가 서버로부터 받은 리소스를
            화면에 렌더링하기까지의 <strong>핵심 경로</strong>입니다.{" "}
            <InlineCode size="md">DOM</InlineCode> 생성,{" "}
            <InlineCode size="md">CSSOM</InlineCode> 생성, 렌더 트리 구성,
            레이아웃, 페인트 단계를 거칩니다. CRP에 포함된 리소스의 수와 크기를
            최소화하면 <InlineCode size="md">FCP</InlineCode>(First Contentful
            Paint)를 크게 단축할 수 있습니다.
          </p>
        ),
      }}
      demo={{
        title: "CRP 최적화 시나리오 비교",
        description:
          "각 최적화 전략을 선택하여 리소스 로딩 타임라인과 FCP가 어떻게 변하는지 비교하세요.",
        children: <CriticalRenderingPathDemo />,
      }}
      codeExamples={codeExamples}
      interviewQuestions={interviewQuestions}
    />
  );
}
