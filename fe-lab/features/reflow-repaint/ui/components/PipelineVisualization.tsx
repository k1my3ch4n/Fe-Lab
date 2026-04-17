import type { PipelineStage } from "../../model/types";

interface PipelineVisualizationProps {
  stages: { id: PipelineStage; label: string }[];
  triggeredStages: PipelineStage[];
}

function stageColor(triggered: boolean) {
  if (!triggered) {
    return {
      bg: "var(--accent-green-dim)",
      border: "var(--accent-green-dim)",
      text: "var(--accent-green)",
    };
  }

  return {
    bg: "#ffb80022",
    border: "#ffb80066",
    text: "var(--accent-amber)",
  };
}

export function PipelineVisualization({
  stages,
  triggeredStages,
}: PipelineVisualizationProps) {
  return (
    <div className="flex items-center gap-2">
      {stages.map((stage, i) => {
        const triggered = triggeredStages.includes(stage.id);
        const colors = stageColor(triggered);
        return (
          <div key={stage.id} className="flex items-center gap-2">
            <div
              className="rounded-lg border px-4 py-3 transition-all duration-300 text-center min-w-[90px]"
              style={{
                background: colors.bg,
                borderColor: colors.border,
              }}
            >
              <div
                className="font-[family-name:var(--font-mono)] text-[11px] font-semibold"
                style={{ color: colors.text }}
              >
                {stage.label}
              </div>
              <div
                className="font-[family-name:var(--font-mono)] text-[9px] mt-1"
                style={{ color: colors.text, opacity: 0.7 }}
              >
                {triggered ? "실행됨" : "건너뜀"}
              </div>
            </div>
            {i < stages.length - 1 && (
              <span className="text-text-muted text-xs">→</span>
            )}
          </div>
        );
      })}
    </div>
  );
}
