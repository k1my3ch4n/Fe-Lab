import { TopicPageLayout, InlineCode } from "@shared/ui";
import dynamic from "next/dynamic";
import { codeExamples, interviewQuestions } from "@features/cdn/model/data";
const CdnDemo = dynamic(() => import("@features/cdn/ui/CdnDemo"));

export default function CdnPage() {
  return (
    <TopicPageLayout
      topicId="cdn"
      concept={{
        title: "CDN (Content Delivery Network)",
        description:
          "CDN은 전 세계에 분산된 엣지 서버를 통해 사용자에게 가장 가까운 위치에서 콘텐츠를 제공하여 성능을 최적화합니다.",
        children: (
          <p className="text-sm text-text-secondary leading-[1.8]">
            CDN은 정적 에셋(이미지, CSS, JS)뿐 아니라 API 응답까지 캐싱할 수
            있습니다.
            <InlineCode size="md">Cache HIT</InlineCode>이면 엣지에서 바로
            응답하고,
            <InlineCode size="md">Cache MISS</InlineCode>이면 오리진에서 가져와
            캐시 후 응답합니다. 캐시 무효화 전략과{" "}
            <InlineCode size="md">Cache-Control</InlineCode> 헤더 설정이
            핵심입니다.
          </p>
        ),
      }}
      demo={{
        title: "CDN 요청 흐름과 캐시 전략",
        description: "CDN의 Cache HIT/MISS 흐름과 엣지 서버 분포를 확인하세요.",
        children: <CdnDemo />,
      }}
      codeExamples={codeExamples}
      interviewQuestions={interviewQuestions}
    />
  );
}
