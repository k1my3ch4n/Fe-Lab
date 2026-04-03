import { TopicPageLayout, InlineCode } from "@shared/ui";
import dynamic from "next/dynamic";
const ServerComponentsDemo = dynamic(
  () => import("@features/server-components/ServerComponentsDemo"),
);
import {
  codeExamples,
  interviewQuestions,
} from "@features/server-components/data";

export default function ServerComponentsPage() {
  return (
    <TopicPageLayout
      topicId="server-components"
      concept={{
        title: "React Server Components",
        description:
          "서버에서 렌더링되어 클라이언트 번들을 줄이는 새로운 컴포넌트 패러다임입니다.",
        children: (
          <p className="text-sm text-text-secondary leading-[1.8]">
            RSC는 <InlineCode size="md">서버에서만 실행</InlineCode>되는
            컴포넌트로, DB 접근과 파일시스템 사용이 가능하지만{" "}
            <InlineCode size="md">useState</InlineCode>나 이벤트 핸들러는 사용할
            수 없습니다.{" "}
            <InlineCode size="md">&quot;use client&quot;</InlineCode>로 Client
            Component를 선언하고,{" "}
            <InlineCode size="md">&quot;use server&quot;</InlineCode>로 Server
            Actions를 정의합니다. Next.js App Router에서 기본값은 Server
            Component입니다.
          </p>
        ),
      }}
      demo={{
        title: "Server / Client Component 렌더링 흐름",
        description:
          "각 컴포넌트 유형의 렌더링 과정과 번들 사이즈 차이를 확인하세요.",
        children: <ServerComponentsDemo />,
      }}
      codeExamples={codeExamples}
      interviewQuestions={interviewQuestions}
    />
  );
}
