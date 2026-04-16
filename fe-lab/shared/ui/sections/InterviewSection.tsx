import SectionLabel from "./SectionLabel";
import InterviewCard from "./InterviewCard";
import type { InterviewQuestion } from "./types";

interface InterviewSectionProps {
  questions: InterviewQuestion[];
}

export default function InterviewSection({ questions }: InterviewSectionProps) {
  return (
    <section className="mb-14">
      <SectionLabel number="04" label="Interview Point" variant="interview" />
      <h2 className="font-[family-name:var(--font-display)] text-[28px] font-bold tracking-tight mb-3">
        면접 핵심 질문
      </h2>
      <div className="grid gap-4 mt-6">
        {questions.map((q, i) => (
          <InterviewCard key={i} index={i + 1} question={q.question}>
            {q.answer}
          </InterviewCard>
        ))}
      </div>
    </section>
  );
}
