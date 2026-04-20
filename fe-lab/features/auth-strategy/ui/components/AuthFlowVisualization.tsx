"use client";

import { SectionHeader, StepFlowBox } from "@shared/ui";
import type { AuthStep } from "../../model/types";

interface AuthFlowVisualizationProps {
  steps: AuthStep[];
  activeStep: number;
}

export function AuthFlowVisualization({
  steps,
  activeStep,
}: AuthFlowVisualizationProps) {
  return (
    <div>
      <SectionHeader>Auth Flow</SectionHeader>
      <StepFlowBox
        steps={steps}
        activeStep={activeStep}
        indentMultiplier={14}
      />
    </div>
  );
}
