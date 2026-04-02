import { Topbar } from "@widgets/topbar";
import {
  ConceptSection,
  DemoSection,
  CodeSection,
  InterviewSection,
  InlineCode,
} from "@shared/ui";
import { NetworkDebuggingDemo } from "@features/network-debugging";
import {
  codeExamples,
  interviewQuestions,
} from "@features/network-debugging/data";

export default function NetworkDebuggingPage() {
  return (
    <>
      <Topbar topicId="network-debugging" />

      <ConceptSection
        title="네트워크 디버깅"
        description="웹 성능 최적화의 첫 단계는 네트워크 병목을 정확히 진단하는 것입니다. 워터폴 차트와 HTTP 상태 코드를 읽는 능력이 핵심입니다."
      >
        <p className="text-sm text-text-secondary leading-[1.8]">
          브라우저 DevTools의 네트워크 탭은 각 리소스의{" "}
          <InlineCode size="md">DNS</InlineCode>,{" "}
          <InlineCode size="md">TCP</InlineCode>,{" "}
          <InlineCode size="md">TLS</InlineCode>,{" "}
          <InlineCode size="md">TTFB</InlineCode>,{" "}
          <InlineCode size="md">Download</InlineCode> 단계를 워터폴로
          시각화합니다.
          <InlineCode size="md">Performance API</InlineCode>를 활용하면
          프로그래밍적으로 네트워크 성능을 측정하고 모니터링할 수 있습니다.
        </p>
      </ConceptSection>

      <DemoSection
        title="워터폴 차트와 HTTP 상태 코드"
        description="리소스별 로딩 단계와 HTTP 상태 코드의 의미를 확인하세요."
      >
        <NetworkDebuggingDemo />
      </DemoSection>

      <CodeSection examples={codeExamples} />

      <InterviewSection questions={interviewQuestions} />
    </>
  );
}
