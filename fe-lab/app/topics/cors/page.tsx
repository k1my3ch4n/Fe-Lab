import { TopicPageLayout, InlineCode } from "@shared/ui";
import dynamic from "next/dynamic";
const CorsDemo = dynamic(() => import("@features/cors/ui/CorsDemo"));
import { codeExamples, interviewQuestions } from "@features/cors/model/data";

export default function CorsPage() {
  return (
    <TopicPageLayout
      topicId="cors"
      concept={{
        title: "CORS (Cross-Origin Resource Sharing)",
        description:
          "CORS는 브라우저의 동일 출처 정책을 제어하여 다른 출처의 리소스 접근을 허용하는 HTTP 헤더 기반 메커니즘입니다.",
        children: (
          <p className="text-sm text-text-secondary leading-[1.8]">
            브라우저는 보안을 위해{" "}
            <strong>동일 출처 정책(Same-Origin Policy)</strong>을 적용하여 다른
            출처의 리소스 접근을 기본적으로 차단합니다. 출처(Origin)는{" "}
            <InlineCode size="md">프로토콜</InlineCode> +{" "}
            <InlineCode size="md">호스트</InlineCode> +{" "}
            <InlineCode size="md">포트</InlineCode>의 조합으로 결정되며, CORS는
            서버가 HTTP 헤더를 통해 특정 출처의 접근을 허용하는 방식으로 이
            제한을 완화합니다.
          </p>
        ),
      }}
      demo={{
        title: "CORS 요청 흐름 시각화",
        description:
          "각 시나리오를 선택하고 단계별로 재생하여 브라우저와 서버 간의 CORS 헤더 교환 과정을 확인하세요.",
        children: <CorsDemo />,
      }}
      codeExamples={codeExamples}
      interviewQuestions={interviewQuestions}
    />
  );
}
