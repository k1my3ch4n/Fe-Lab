import { TopicPageLayout, InlineCode } from "@shared/ui";
import { HttpCacheDemo } from "@features/http-cache";
import { codeExamples, interviewQuestions } from "@features/http-cache/data";

export default function HttpCachePage() {
  return (
    <TopicPageLayout
      topicId="http-cache"
      concept={{
        title: "HTTP 캐시 전략",
        description:
          "HTTP 캐시는 네트워크 요청을 줄이고 웹 성능을 극대화하는 핵심 메커니즘입니다. 올바른 캐시 전략은 사용자 경험과 서버 부하 모두에 큰 영향을 미칩니다.",
        children: (
          <p className="text-sm text-text-secondary leading-[1.8]">
            브라우저는 <InlineCode size="md">Cache-Control</InlineCode> 헤더를
            통해 리소스의 캐싱 방식을 결정합니다.{" "}
            <InlineCode size="md">max-age</InlineCode>로 유효 시간을 설정하고,{" "}
            <InlineCode size="md">ETag</InlineCode>와{" "}
            <InlineCode size="md">Last-Modified</InlineCode>로 리소스 변경
            여부를 검증합니다.{" "}
            <InlineCode size="md">stale-while-revalidate</InlineCode>는 만료된
            캐시를 즉시 반환하면서 백그라운드에서 갱신하여 빠른 응답과 데이터
            신선도를 모두 확보합니다.
          </p>
        ),
      }}
      demo={{
        title: "캐시 시나리오 시뮬레이션",
        description:
          "각 캐시 전략의 요청-응답 흐름을 단계별로 확인하세요. 브라우저, 캐시, 서버 간의 HTTP 헤더 교환을 시각적으로 이해할 수 있습니다.",
        children: <HttpCacheDemo />,
      }}
      codeExamples={codeExamples}
      interviewQuestions={interviewQuestions}
    />
  );
}
