import { Topbar } from "@widgets/topbar";
import ConceptSection from "./sections/ConceptSection";
import DemoSection from "./sections/DemoSection";
import CodeSection from "./sections/CodeSection";
import InterviewSection from "./sections/InterviewSection";
import type { InterviewQuestion } from "./sections/types";

interface CodeExample {
  title: string;
  code: string;
}

interface TopicPageLayoutProps {
  topicId: string;
  concept: {
    title: string;
    description: string;
    children: React.ReactNode;
  };
  demo: {
    title: string;
    description: string;
    children: React.ReactNode;
  };
  codeExamples: CodeExample[];
  interviewQuestions: InterviewQuestion[];
}

export default function TopicPageLayout({
  topicId,
  concept,
  demo,
  codeExamples,
  interviewQuestions,
}: TopicPageLayoutProps) {
  return (
    <div className="animate-[fadeIn_0.3s_ease]">
      <Topbar topicId={topicId} />

      <ConceptSection title={concept.title} description={concept.description}>
        {concept.children}
      </ConceptSection>

      <DemoSection title={demo.title} description={demo.description}>
        {demo.children}
      </DemoSection>

      <CodeSection examples={codeExamples} />

      <InterviewSection questions={interviewQuestions} />
    </div>
  );
}
