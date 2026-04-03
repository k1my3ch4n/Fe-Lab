import { TopicPageLayout, InlineCode } from "@shared/ui";
import { GraphqlRestDemo } from "@features/graphql-rest";
import { codeExamples, interviewQuestions } from "@features/graphql-rest/data";

export default function GraphqlRestPage() {
  return (
    <TopicPageLayout
      topicId="graphql-rest"
      concept={{
        title: "GraphQL vs REST",
        description:
          "REST와 GraphQL은 API를 설계하는 두 가지 주요 패러다임입니다. 각각의 장단점과 적합한 사용 사례를 이해해야 합니다.",
        children: (
          <p className="text-sm text-text-secondary leading-[1.8]">
            <InlineCode size="md">REST</InlineCode>는 리소스 기반 URL로
            직관적이지만, Over-fetching(불필요한 데이터 수신)과
            Under-fetching(추가 요청 필요) 문제가 있습니다.
            <InlineCode size="md">GraphQL</InlineCode>은 클라이언트가 필요한
            데이터를 정확히 쿼리하여 이 문제를 해결하지만, N+1 문제나 캐싱 전략
            등 새로운 과제가 생깁니다.
          </p>
        ),
      }}
      demo={{
        title: "REST vs GraphQL 요청/응답 비교",
        description:
          "Over-fetching, Under-fetching 문제를 시각적으로 비교하세요.",
        children: <GraphqlRestDemo />,
      }}
      codeExamples={codeExamples}
      interviewQuestions={interviewQuestions}
    />
  );
}
