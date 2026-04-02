import SectionLabel from "./SectionLabel";
import InterviewCard from "../interview/InterviewCard";

export interface InterviewQuestion {
  question: string;
  answer: React.ReactNode;
}

interface InterviewSectionProps {
  questions: InterviewQuestion[];
}

export default function InterviewSection({ questions }: InterviewSectionProps) {
  return (
    <section className="mb-10">
      <SectionLabel number="04" label="Interview Point" variant="interview" />
      <h2 className="font-[family-name:var(--font-display)] text-[28px] font-bold tracking-tight mb-2">
        면접 핵심 질문
      </h2>
      <div className="grid gap-3 mt-4">
        {questions.map((q, i) => (
          <InterviewCard key={i} index={i + 1} question={q.question}>
            {q.answer}
          </InterviewCard>
        ))}
      </div>
    </section>
  );
}
