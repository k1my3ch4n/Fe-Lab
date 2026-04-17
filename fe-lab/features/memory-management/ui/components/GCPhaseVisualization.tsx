import { GC_PHASES, SEVERITY_COLORS } from "../../model/constants";

interface GCPhaseVisualizationProps {
  gcPhase: number | null;
  severity: "high" | "medium" | "low";
}

export function GCPhaseVisualization({
  gcPhase,
  severity,
}: GCPhaseVisualizationProps) {
  return (
    <div className="flex gap-4">
      {/* Severity */}
      <div className="flex items-center gap-2 p-3 rounded-lg border border-border-subtle bg-bg-surface">
        <span className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted uppercase">
          위험도:
        </span>
        <span
          className="font-[family-name:var(--font-mono)] text-[11px] font-semibold"
          style={{ color: SEVERITY_COLORS[severity] }}
        >
          {severity.toUpperCase()}
        </span>
      </div>

      {/* GC Phase Indicator */}
      <div className="flex-1 flex items-center gap-2">
        {GC_PHASES.map((phase, i) => (
          <div
            key={phase.name}
            className="flex-1 rounded-lg border p-2 text-center transition-all duration-500"
            style={{
              borderColor:
                gcPhase === i ? `${phase.color}88` : `${phase.color}22`,
              background:
                gcPhase === i ? `${phase.color}18` : "transparent",
              transform: gcPhase === i ? "scale(1.05)" : "scale(1)",
            }}
          >
            <div
              className="font-[family-name:var(--font-mono)] text-[10px] font-semibold"
              style={{
                color: gcPhase === i ? phase.color : `${phase.color}66`,
              }}
            >
              {phase.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
