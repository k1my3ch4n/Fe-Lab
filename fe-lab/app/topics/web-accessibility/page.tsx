import { TopicPageLayout, InlineCode } from "@shared/ui";
import { WebAccessibilityDemo } from "@features/web-accessibility";
import {
  codeExamples,
  interviewQuestions,
} from "@features/web-accessibility/data";

export default function WebAccessibilityPage() {
  return (
    <TopicPageLayout
      topicId="web-accessibility"
      concept={{
        title: "웹 접근성 (Web Accessibility)",
        description:
          "웹 접근성은 모든 사용자가 장애 여부와 관계없이 웹 콘텐츠를 동등하게 이용할 수 있도록 보장하는 것입니다.",
        children: (
          <p className="text-sm text-text-secondary leading-[1.8]">
            시맨틱 HTML을 사용하면 브라우저와 보조 기술이 문서 구조를 올바르게
            해석할 수 있습니다. <InlineCode size="md">ARIA</InlineCode> 속성은
            동적 UI의 역할, 상태, 관계를 보조 기술에 전달합니다. 키보드 접근성을
            보장하면 마우스를 사용할 수 없는 사용자도 모든 기능에 접근할 수
            있습니다. WCAG 2.1 AA 수준을 목표로 구현하는 것이 권장됩니다.
          </p>
        ),
      }}
      demo={{
        title: "접근성 시각화",
        description:
          "시맨틱 HTML vs div 비교, ARIA 속성 적용, 키보드 네비게이션을 테스트하세요.",
        children: <WebAccessibilityDemo />,
      }}
      codeExamples={codeExamples}
      interviewQuestions={interviewQuestions}
    />
  );
}
