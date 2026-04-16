import { TopicPageLayout, InlineCode } from "@shared/ui";
import dynamic from "next/dynamic";
const RenderPipelineDemo = dynamic(
  () => import("@features/rendering-pipeline/ui/RenderPipelineDemo"),
);
import {
  codeExamples,
  interviewQuestions,
} from "@features/rendering-pipeline/model/data";

export default function RenderingPipelinePage() {
  return (
    <TopicPageLayout
      topicId="rendering-pipeline"
      concept={{
        title: "브라우저 렌더링 과정",
        description:
          "URL을 입력한 순간부터 화면에 픽셀이 그려지기까지, 브라우저는 일련의 정교한 파이프라인을 수행합니다.",
        children: (
          <p className="text-sm text-text-secondary leading-[1.8]">
            브라우저가 웹페이지를 렌더링하는 과정은 크게{" "}
            <strong>네트워크 단계</strong>와 <strong>렌더링 단계</strong>로
            나뉩니다. 네트워크 단계에서 리소스를 받아오고, 렌더링 엔진이 이를
            파싱하여 화면에 그립니다. 각 단계를 이해하면{" "}
            <InlineCode size="md">성능 최적화</InlineCode>의 핵심 포인트를 잡을
            수 있습니다.
          </p>
        ),
      }}
      demo={{
        title: "렌더링 파이프라인 시각화",
        description:
          "각 단계를 순서대로 살펴보며 브라우저가 어떻게 화면을 그리는지 확인하세요.",
        children: <RenderPipelineDemo />,
      }}
      codeExamples={codeExamples}
      interviewQuestions={interviewQuestions}
    />
  );
}
