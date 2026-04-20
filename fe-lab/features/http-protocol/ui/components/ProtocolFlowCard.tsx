import type { ProtocolFlow } from "../../model/types";

interface ProtocolFlowCardProps {
  flow: ProtocolFlow;
  progress: number;
}

export function ProtocolFlowCard({ flow, progress }: ProtocolFlowCardProps) {
  return (
    <div className="rounded-lg border border-border-subtle bg-bg-deep p-4">
      <div className="flex items-center gap-3 mb-3">
        <span
          className="font-mono text-[13px] font-bold"
          style={{ color: flow.version.color }}
        >
          {flow.version.label}
        </span>
        <span className="font-mono text-caption text-text-muted">
          {flow.description}
        </span>
      </div>

      <div className="relative h-8 bg-bg-surface rounded overflow-hidden mb-2">
        {flow.steps.map((step, j) => {
          const widthPct = (step.duration / flow.totalTime) * 100;
          const leftPct = flow.steps
            .slice(0, j)
            .reduce(
              (accumulator, s) =>
                accumulator + (s.duration / flow.totalTime) * 100,
              0,
            );
          const isActive = progress > (j / flow.steps.length) * 100;
          return (
            <div
              key={j}
              className="absolute top-0 h-full flex items-center justify-center transition-opacity duration-300"
              style={{
                left: `${leftPct}%`,
                width: `${widthPct}%`,
                backgroundColor: `${step.color}${isActive ? "44" : "15"}`,
                borderRight:
                  j < flow.steps.length - 1
                    ? "1px solid var(--bg-deep)"
                    : undefined,
              }}
            >
              <span className="font-mono text-[9px] text-text-muted truncate px-1">
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-1.5">
        {flow.features.map((feature) => (
          <span
            key={feature}
            className="font-mono text-[9px] px-2 py-0.5 rounded bg-bg-surface text-text-muted"
          >
            {feature}
          </span>
        ))}
      </div>
    </div>
  );
}
