import type { InterviewQuestion } from "@shared/ui";

type CodeExample = { title: string; code: string };

export type FeatureData = {
  codeExamples: CodeExample[];
  interviewQuestions: InterviewQuestion[];
};

export type FeatureConfig = {
  Demo: React.ComponentType;
  getData: () => Promise<FeatureData>;
  concept: { title: string; description: string; children: React.ReactNode };
  demo: { title: string; description: string };
};
