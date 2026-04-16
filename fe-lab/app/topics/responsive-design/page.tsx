import { TopicPageLayout, InlineCode } from "@shared/ui";
import dynamic from "next/dynamic";
const ResponsiveDesignDemo = dynamic(
  () => import("@features/responsive-design/ui/ResponsiveDesignDemo"),
);
import {
  codeExamples,
  interviewQuestions,
} from "@features/responsive-design/model/data";

export default function ResponsiveDesignPage() {
  return (
    <TopicPageLayout
      topicId="responsive-design"
      concept={{
        title: "반응형 디자인",
        description:
          "다양한 화면 크기와 디바이스에 최적화된 레이아웃을 구현하는 CSS 전략입니다.",
        children: (
          <p className="text-sm text-text-secondary leading-[1.8]">
            반응형 디자인은 <InlineCode size="md">미디어 쿼리</InlineCode>,{" "}
            <InlineCode size="md">clamp()</InlineCode>,{" "}
            <InlineCode size="md">Container Query</InlineCode> 등을 활용하여
            viewport 크기에 따라 레이아웃을 조정합니다.{" "}
            <strong>모바일 퍼스트</strong> 접근이 권장되며, 최신 CSS 기능을 통해
            breakpoint 없이도 유동적인 디자인이 가능합니다.
          </p>
        ),
      }}
      demo={{
        title: "뷰포트별 레이아웃 변화",
        description:
          "슬라이더를 조절하거나 프리셋을 선택하여 뷰포트 크기에 따른 레이아웃 변화를 확인하세요.",
        children: <ResponsiveDesignDemo />,
      }}
      codeExamples={codeExamples}
      interviewQuestions={interviewQuestions}
    />
  );
}
