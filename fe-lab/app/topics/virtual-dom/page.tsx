import { TopicPageLayout, InlineCode } from "@shared/ui";
import dynamic from "next/dynamic";
const VirtualDomDemo = dynamic(
  () => import("@features/virtual-dom/ui/VirtualDomDemo"),
);
import { codeExamples, interviewQuestions } from "@features/virtual-dom/model/data";

export default function VirtualDomPage() {
  return (
    <TopicPageLayout
      topicId="virtual-dom"
      concept={{
        title: "Virtual DOM",
        description:
          "Virtual DOM은 실제 DOM의 가벼운 JavaScript 객체 표현으로, 효율적인 UI 업데이트를 가능하게 합니다.",
        children: (
          <p className="text-sm text-text-secondary leading-[1.8]">
            React는 상태가 변경되면 새로운{" "}
            <InlineCode size="md">Virtual DOM</InlineCode> 트리를 생성하고, 이전
            트리와 비교(<InlineCode size="md">Diffing</InlineCode>)하여{" "}
            <strong>실제로 변경된 부분만</strong> Real DOM에 반영합니다. 이
            과정을 <InlineCode size="md">재조정(Reconciliation)</InlineCode>이라
            하며, O(n) 복잡도의 휴리스틱 알고리즘으로 동작합니다. 덕분에
            개발자는 선언적으로 UI를 작성하면서도 높은 성능을 유지할 수
            있습니다.
          </p>
        ),
      }}
      demo={{
        title: "Virtual DOM Diffing 시각화",
        description:
          "단계별로 진행하며 Virtual DOM이 어떻게 변경 사항을 감지하고 최소한의 DOM 조작으로 업데이트하는지 확인하세요.",
        children: <VirtualDomDemo />,
      }}
      codeExamples={codeExamples}
      interviewQuestions={interviewQuestions}
    />
  );
}
