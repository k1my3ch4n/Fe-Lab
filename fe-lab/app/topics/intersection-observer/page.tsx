import { TopicPageLayout, InlineCode } from "@shared/ui";
import dynamic from "next/dynamic";
const IntersectionObserverDemo = dynamic(
  () => import("@features/intersection-observer/ui/IntersectionObserverDemo"),
);
import {
  codeExamples,
  interviewQuestions,
} from "@features/intersection-observer/model/data";

export default function IntersectionObserverPage() {
  return (
    <TopicPageLayout
      topicId="intersection-observer"
      concept={{
        title: "Intersection Observer",
        description:
          "Intersection Observer는 요소가 뷰포트 또는 특정 부모 요소와 교차하는 것을 비동기적으로 감지하는 Web API입니다.",
        children: (
          <p className="text-sm text-text-secondary leading-[1.8]">
            기존 <InlineCode size="md">scroll</InlineCode> 이벤트와{" "}
            <InlineCode size="md">getBoundingClientRect()</InlineCode>를
            사용하는 방식은 매 프레임마다 레이아웃을 재계산하여 성능 문제를
            일으킵니다. Intersection Observer는 브라우저가 내부적으로 최적화하여{" "}
            <strong>비동기적</strong>으로 교차 상태를 알려주므로, lazy loading,
            무한 스크롤, 광고 노출 추적 등에 널리 사용됩니다.
          </p>
        ),
      }}
      demo={{
        title: "Intersection Observer 시각화",
        description:
          "스크롤하며 요소의 뷰포트 진입/이탈을 실시간으로 확인하세요. threshold를 조절해보세요.",
        children: <IntersectionObserverDemo />,
      }}
      codeExamples={codeExamples}
      interviewQuestions={interviewQuestions}
    />
  );
}
