"use client";

import { SectionHeader } from "@shared/ui";
import type { CurryStep } from "../../model/types";

interface CurryingStepVisualizationProps {
  activeExample: number;
  steps: CurryStep[];
  currentStep: number;
  color: string;
}

export function CurryingStepVisualization({
  activeExample,
  steps,
  currentStep,
  color,
}: CurryingStepVisualizationProps) {
  return (
    <div>
      <SectionHeader>
        {activeExample <= 1 ? "Partial Application" : "Function Pipeline"}
      </SectionHeader>
      <div className="flex flex-col gap-2">
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex items-center gap-3 transition-all duration-300"
            style={{ opacity: currentStep >= index ? 1 : 0.3 }}
          >
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center font-mono text-caption font-bold flex-shrink-0"
              style={{
                background: currentStep >= index ? `${color}33` : "#ffffff08",
                color: currentStep >= index ? color : "#666",
              }}
            >
              {index + 1}
            </div>

            <div
              className="flex-1 rounded-lg border p-2 transition-all duration-300"
              style={{
                borderColor: currentStep >= index ? `${color}44` : "#333",
                background:
                  currentStep >= index ? `${color}08` : "transparent",
              }}
            >
              <div className="font-mono text-caption text-text-muted">
                {step.args.join(" → ")}
              </div>
              <div
                className="font-mono text-label font-semibold"
                style={{ color: currentStep >= index ? color : "#666" }}
              >
                → {step.result}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
