"use client";

import { SectionHeader } from "@shared/ui";
import type { FlowStep } from "../../model/types";

interface SuspenseFlowVisualizationProps {
  steps: FlowStep[];
  activeStep: number;
}

export function SuspenseFlowVisualization({
  steps,
  activeStep,
}: SuspenseFlowVisualizationProps) {
  return (
    <div>
      <SectionHeader>Flow</SectionHeader>
      <div className="flex flex-col gap-2">
        {steps.map((step, index) => (
          <div
            key={index}
            className="rounded-lg border p-3 transition-all duration-300"
            style={{
              borderColor:
                activeStep >= index ? `${step.color}88` : `${step.color}22`,
              background:
                activeStep >= index ? `${step.color}15` : `${step.color}05`,
              marginLeft: `${index * 16}px`,
            }}
          >
            <div
              className="font-[family-name:var(--font-mono)] text-[10px] font-semibold"
              style={{ color: step.color }}
            >
              {index + 1}. {step.label}
            </div>
            <div className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted mt-1">
              {step.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
