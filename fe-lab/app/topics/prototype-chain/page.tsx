import { TopicPageLayout, InlineCode } from "@shared/ui";
import { PrototypeChainDemo } from "@features/prototype-chain";
import {
  codeExamples,
  interviewQuestions,
} from "@features/prototype-chain/data";

export default function PrototypeChainPage() {
  return (
    <TopicPageLayout
      topicId="prototype-chain"
      concept={{
        title: "프로토타입 체인 (Prototype Chain)",
        description:
          "JavaScript는 프로토타입 기반 언어입니다. 객체의 프로퍼티를 찾을 때 프로토타입 체인을 따라 탐색합니다.",
        children: (
          <p className="text-sm text-text-secondary leading-[1.8]">
            모든 JavaScript 객체는{" "}
            <InlineCode size="md">[[Prototype]]</InlineCode>이라는 내부 슬롯을
            통해 다른 객체를 참조합니다. 객체에서 프로퍼티를 찾지 못하면,{" "}
            <InlineCode size="md">__proto__</InlineCode>를 따라 상위
            프로토타입에서 탐색을 계속합니다. 이 체인은{" "}
            <InlineCode size="md">Object.prototype</InlineCode>을 거쳐{" "}
            <InlineCode size="md">null</InlineCode>에서 끝납니다. ES6의{" "}
            <InlineCode size="md">class</InlineCode> 문법도 내부적으로 이
            프로토타입 체인 위에서 동작합니다.
          </p>
        ),
      }}
      demo={{
        title: "프로토타입 체인 탐색 시각화",
        description:
          "객체를 선택하고 프로퍼티를 입력하면, 체인을 따라 탐색하는 과정을 확인할 수 있습니다.",
        children: <PrototypeChainDemo />,
      }}
      codeExamples={codeExamples}
      interviewQuestions={interviewQuestions}
    />
  );
}
