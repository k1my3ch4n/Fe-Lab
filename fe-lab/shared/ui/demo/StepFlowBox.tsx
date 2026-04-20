interface StepItem {
  color: string;
  label: string;
  description: string;
}

interface StepFlowBoxProps {
  steps: StepItem[];
  activeStep: number;
  indentMultiplier?: number;
}

export default function StepFlowBox({
  steps,
  activeStep,
  indentMultiplier = 14,
}: StepFlowBoxProps) {
  return (
    <div className="flex flex-col gap-2">
      {steps.map((step, i) => (
        <div
          key={i}
          className="rounded-lg border p-3 transition-all duration-300"
          style={{
            borderColor:
              activeStep >= i ? `${step.color}88` : `${step.color}22`,
            background: activeStep >= i ? `${step.color}15` : `${step.color}05`,
            marginLeft: `${i * indentMultiplier}px`,
          }}
        >
          <div
            className="font-mono text-[10px] font-semibold"
            style={{ color: step.color }}
          >
            {i + 1}. {step.label}
          </div>
          <div className="font-mono text-[10px] text-text-muted mt-1">
            {step.description}
          </div>
        </div>
      ))}
    </div>
  );
}
