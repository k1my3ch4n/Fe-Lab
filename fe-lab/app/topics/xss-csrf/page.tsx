import { TopicPageLayout, InlineCode } from "@shared/ui";
import dynamic from "next/dynamic";
const XssCsrfDemo = dynamic(() => import("@features/xss-csrf/XssCsrfDemo"));
import { codeExamples, interviewQuestions } from "@features/xss-csrf/data";

export default function XssCsrfPage() {
  return (
    <TopicPageLayout
      topicId="xss-csrf"
      concept={{
        title: "XSS / CSRF 방지",
        description:
          "웹 애플리케이션의 가장 흔한 두 가지 보안 취약점과 방어 전략을 학습합니다.",
        children: (
          <p className="text-sm text-text-secondary leading-[1.8]">
            <InlineCode size="md">XSS</InlineCode>는 악성 스크립트를 삽입하여
            사용자의 데이터를 탈취하고, <InlineCode size="md">CSRF</InlineCode>
            는 인증된 사용자의 권한으로 위조된 요청을 보냅니다. 이스케이프, CSRF
            토큰, <InlineCode size="md">CSP</InlineCode> 헤더 등 다층 방어가
            필수적입니다. React는 JSX에서 자동 이스케이프를 제공하지만{" "}
            <InlineCode size="md">dangerouslySetInnerHTML</InlineCode> 사용 시
            주의가 필요합니다.
          </p>
        ),
      }}
      demo={{
        title: "보안 공격 / 방어 시각화",
        description:
          "XSS, CSRF 공격 흐름을 시뮬레이션하고, 방어 전략을 확인하세요.",
        children: <XssCsrfDemo />,
      }}
      codeExamples={codeExamples}
      interviewQuestions={interviewQuestions}
    />
  );
}
