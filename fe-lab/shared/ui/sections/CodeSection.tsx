import SectionLabel from "./SectionLabel";
import CodeSectionTabs from "./CodeSectionTabs";
import { highlightCode } from "@shared/lib/highlightCode";

interface CodeExample {
  title: string;
  code: string;
  language?: string;
}

interface CodeSectionProps {
  examples: CodeExample[];
}

export default async function CodeSection({ examples }: CodeSectionProps) {
  const highlighted = await Promise.all(
    examples.map(async (example) => ({
      title: example.title,
      html: await highlightCode(example.code, example.language ?? "typescript"),
    })),
  );

  return (
    <section className="mb-14">
      <SectionLabel number="03" label="Code Example" variant="code" />
      <h2 className="font-display text-section-title font-bold tracking-tight mb-3">
        코드 예시
      </h2>
      <p className="text-sm text-text-secondary leading-[1.7] max-w-full lg:max-w-[700px]">
        실제 코드로 동작 원리를 확인하세요.
      </p>
      <CodeSectionTabs examples={highlighted} />
    </section>
  );
}
