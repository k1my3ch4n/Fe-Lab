import { StepFlowBox, SectionHeader } from "@shared/ui";

type StepFlowBoxProps = React.ComponentProps<typeof StepFlowBox>;

interface AttackFlowSectionProps {
  steps: StepFlowBoxProps["steps"];
  activeStep: number;
}

export function AttackFlowSection({ steps, activeStep }: AttackFlowSectionProps) {
  return (
    <div>
      <SectionHeader>Attack Flow</SectionHeader>
      <StepFlowBox
        steps={steps}
        activeStep={activeStep}
        indentMultiplier={16}
      />
    </div>
  );
}
