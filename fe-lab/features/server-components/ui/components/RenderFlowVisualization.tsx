"use client";

import { SectionHeader } from "@shared/ui";
import type { RenderPhase } from "../../model/types";

interface RenderFlowVisualizationProps {
  phases: RenderPhase[];
  activePhase: number;
}

export function RenderFlowVisualization({
  phases,
  activePhase,
}: RenderFlowVisualizationProps) {
  return (
    <div>
      <SectionHeader>Render Flow</SectionHeader>
      <div className="flex flex-col gap-2">
        {phases.map((phase, index) => (
          <div
            key={index}
            className="rounded-lg border p-3 transition-all duration-300"
            style={{
              borderColor:
                activePhase >= index ? `${phase.color}88` : `${phase.color}22`,
              background:
                activePhase >= index ? `${phase.color}15` : `${phase.color}05`,
              marginLeft: `${index * 16}px`,
            }}
          >
            <div
              className="font-[family-name:var(--font-mono)] text-[10px] font-semibold"
              style={{ color: phase.color }}
            >
              {index + 1}. {phase.label}
            </div>
            <div className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted mt-1">
              {phase.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
