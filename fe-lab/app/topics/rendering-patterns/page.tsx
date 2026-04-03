import { TopicPageLayout, InlineCode } from "@shared/ui";
import dynamic from "next/dynamic";
const RenderingPatternsDemo = dynamic(
  () => import("@features/rendering-patterns/RenderingPatternsDemo"),
);
import {
  codeExamples,
  interviewQuestions,
} from "@features/rendering-patterns/data";

export default function RenderingPatternsPage() {
  return (
    <TopicPageLayout
      topicId="rendering-patterns"
      concept={{
        title: "CSR / SSR / ISR / SSG",
        description:
          "웹 페이지를 렌더링하는 4가지 방식을 비교합니다. 각 방식은 렌더링 시점과 장소가 다르며, 성능과 SEO에 큰 영향을 미칩니다.",
        children: (
          <p className="text-sm text-text-secondary leading-[1.8]">
            <InlineCode size="md">CSR</InlineCode>은 클라이언트에서,{" "}
            <InlineCode size="md">SSR</InlineCode>은 서버에서 매 요청마다,{" "}
            <InlineCode size="md">SSG</InlineCode>는 빌드 시점에,{" "}
            <InlineCode size="md">ISR</InlineCode>은 빌드 + 주기적 재생성으로
            HTML을 생성합니다. Next.js는 이 4가지 방식을 모두 지원하며, 페이지
            특성에 맞게 선택할 수 있습니다.
          </p>
        ),
      }}
      demo={{
        title: "렌더링 방식별 타임라인 비교",
        description:
          "각 방식의 서버 처리, HTML 전송, JS 실행, 화면 표시 시점을 비교하세요.",
        children: <RenderingPatternsDemo />,
      }}
      codeExamples={codeExamples}
      interviewQuestions={interviewQuestions}
    />
  );
}
