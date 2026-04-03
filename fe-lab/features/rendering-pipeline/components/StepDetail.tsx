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
      <pre className="mt-4 font-[family-name:var(--font-mono)] text-[11px] text-accent-cyan bg-bg-deep p-4 rounded-lg leading-[1.8] overflow-x-auto">
        {step.visual}
      </pre>
    </>
  );
}
