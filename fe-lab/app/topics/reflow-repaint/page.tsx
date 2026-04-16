import { TopicPageLayout, InlineCode } from "@shared/ui";
import dynamic from "next/dynamic";
const ReflowRepaintDemo = dynamic(
  () => import("@features/reflow-repaint/ui/ReflowRepaintDemo"),
);
import {
  codeExamples,
  interviewQuestions,
} from "@features/reflow-repaint/model/data";

export default function ReflowRepaintPage() {
  return (
    <TopicPageLayout
      topicId="reflow-repaint"
      concept={{
        title: "리플로우와 리페인트 (Reflow & Repaint)",
        description:
          "브라우저가 CSS 변경 시 어떤 렌더링 단계를 다시 실행하는지 이해하면 성능 최적화의 핵심을 파악할 수 있습니다.",
        children: (
          <p className="text-sm text-text-secondary leading-[1.8]">
            CSS 속성 변경은 <strong>렌더링 파이프라인</strong>의 서로 다른
            단계를 트리거합니다. <InlineCode size="md">width</InlineCode>,{" "}
            <InlineCode size="md">margin</InlineCode> 등 레이아웃 속성은{" "}
            <strong>리플로우</strong>(Layout 재계산)를 발생시키고,{" "}
            <InlineCode size="md">color</InlineCode>,{" "}
            <InlineCode size="md">background</InlineCode> 등은{" "}
            <strong>리페인트</strong>(Paint만 재실행)를 트리거합니다.{" "}
            <InlineCode size="md">transform</InlineCode>,{" "}
            <InlineCode size="md">opacity</InlineCode>는 GPU 컴포지트 단계에서만
            처리되어 가장 효율적입니다.
          </p>
        ),
      }}
      demo={{
        title: "CSS 속성별 렌더링 파이프라인 시각화",
        description:
          "CSS 속성을 선택하면 어떤 렌더링 단계가 실행되는지 확인할 수 있습니다.",
        children: <ReflowRepaintDemo />,
      }}
      codeExamples={codeExamples}
      interviewQuestions={interviewQuestions}
    />
  );
}
