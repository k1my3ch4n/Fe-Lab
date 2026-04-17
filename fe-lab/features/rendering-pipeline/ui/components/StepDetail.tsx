import { CodeBlock } from "@shared/ui";

interface StepDetailProps {
  step: {
    icon: string;
    title: string;
    desc: string;
    visual: string;
    color: string;
  };
}

export default function StepDetail({ step }: StepDetailProps) {
  return (
    <>
      <div
        className="font-[family-name:var(--font-display)] text-base font-semibold mb-2 flex items-center gap-2"
        style={{ color: step.color }}
      >
        {step.icon} {step.title}
      </div>
      <div className="text-[13px] text-text-secondary leading-[1.8]">
        {step.desc}
      </div>
      <CodeBlock className="mt-4 text-[11px]">
        {step.visual}
      </CodeBlock>
    </>
  );
}
