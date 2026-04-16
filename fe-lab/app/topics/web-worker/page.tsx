import { TopicPageLayout, InlineCode } from "@shared/ui";
import dynamic from "next/dynamic";
const WebWorkerDemo = dynamic(
  () => import("@features/web-worker/ui/WebWorkerDemo"),
);
import { codeExamples, interviewQuestions } from "@features/web-worker/model/data";

export default function WebWorkerPage() {
  return (
    <TopicPageLayout
      topicId="web-worker"
      concept={{
        title: "웹 워커 (Web Worker)",
        description:
          "웹 워커는 메인 스레드와 별도의 백그라운드 스레드에서 스크립트를 실행할 수 있게 해주는 API입니다.",
        children: (
          <p className="text-sm text-text-secondary leading-[1.8]">
            JavaScript는 기본적으로 <strong>싱글 스레드</strong>입니다. 무거운
            연산이 메인 스레드에서 실행되면 UI가 멈추게 됩니다.
            <InlineCode size="md">Web Worker</InlineCode>를 사용하면 별도
            스레드에서 연산을 수행하여 UI 응답성을 유지할 수 있습니다.
            <InlineCode size="md">postMessage</InlineCode>를 통해 메인 스레드와
            데이터를 주고받습니다.
          </p>
        ),
      }}
      demo={{
        title: "메인 스레드 vs 워커 스레드 비교",
        description:
          "같은 연산을 메인 스레드와 워커에서 실행하여 UI 블로킹 여부를 비교하세요.",
        children: <WebWorkerDemo />,
      }}
      codeExamples={codeExamples}
      interviewQuestions={interviewQuestions}
    />
  );
}
