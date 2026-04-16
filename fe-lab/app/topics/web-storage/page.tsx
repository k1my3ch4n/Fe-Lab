import { TopicPageLayout, InlineCode } from "@shared/ui";
import dynamic from "next/dynamic";
const WebStorageDemo = dynamic(
  () => import("@features/web-storage/ui/WebStorageDemo"),
);
import { codeExamples, interviewQuestions } from "@features/web-storage/model/data";

export default function WebStoragePage() {
  return (
    <TopicPageLayout
      topicId="web-storage"
      concept={{
        title: "Web Storage",
        description:
          "Web Storage API는 브라우저에 키-값 쌍을 저장하는 메커니즘을 제공합니다. localStorage, sessionStorage, IndexedDB를 비교합니다.",
        children: (
          <p className="text-sm text-text-secondary leading-[1.8]">
            <InlineCode size="md">localStorage</InlineCode>는 영구 저장,{" "}
            <InlineCode size="md">sessionStorage</InlineCode>는 세션(탭) 단위
            저장을 제공합니다. 둘 다 동기적이며 문자열만 저장 가능합니다.{" "}
            <InlineCode size="md">IndexedDB</InlineCode>는 비동기적으로 대용량
            구조화 데이터를 저장할 수 있는 로우레벨 API입니다. 용도와 데이터
            특성에 따라 적절한 스토리지를 선택해야 합니다.
          </p>
        ),
      }}
      demo={{
        title: "Storage CRUD 시뮬레이션",
        description:
          "각 스토리지에 데이터를 저장, 조회, 삭제하며 동작 차이를 확인하세요.",
        children: <WebStorageDemo />,
      }}
      codeExamples={codeExamples}
      interviewQuestions={interviewQuestions}
    />
  );
}
