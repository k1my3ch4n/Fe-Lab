interface FlowStep {
  from: "client" | "server";
  label: string;
  detail: string;
  color: string;
}

interface AuthFlow {
  method: { id: string; label: string; color: string };
  description: string;
  steps: FlowStep[];
  pros: string[];
  cons: string[];
}

interface AuthFlowDiagramProps {
  flows: AuthFlow[];
  activeFlow: number;
  onFlowChange: (index: number) => void;
  activeStep: number;
}

export function AuthFlowDiagram({
  flows,
  activeFlow,
  onFlowChange,
  activeStep,
}: AuthFlowDiagramProps) {
  const flow = flows[activeFlow];

  return (
    <>
      {/* Method selector */}
      <div className="flex gap-2">
        {flows.map((f, i) => (
          <button
            key={f.method.id}
            onClick={() => onFlowChange(i)}
            className={`font-[family-name:var(--font-mono)] text-[11px] px-3 py-1.5 rounded-lg border transition-all duration-200 cursor-pointer ${
              i === activeFlow
                ? "bg-bg-surface"
                : "border-transparent bg-bg-deep text-text-muted hover:text-text-secondary"
            }`}
            style={
              i === activeFlow
                ? {
                    borderColor: `${f.method.color}66`,
                    color: f.method.color,
                  }
                : {}
            }
          >
            {f.method.label}
          </button>
        ))}
      </div>

      {/* Flow diagram */}
      <div className="rounded-lg border border-border-subtle bg-bg-deep p-4">
        <div className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted mb-1">
          {flow.description}
        </div>

        <div className="flex gap-6 mt-4">
          {/* Client */}
          <div className="w-20 text-center">
            <div className="font-[family-name:var(--font-mono)] text-[11px] text-accent-cyan font-semibold px-2 py-1.5 rounded-lg bg-accent-cyan-dim border border-accent-cyan/30">
              Client
            </div>
          </div>

          {/* Steps */}
          <div className="flex-1 flex flex-col gap-2">
            {flow.steps.map((step, i) => {
              const isActive = i <= activeStep;
              const isCurrent = i === activeStep;
              return (
                <div
                  key={i}
                  className={`flex items-center gap-3 rounded-lg p-2.5 transition-all duration-300 ${
                    isCurrent ? "bg-bg-surface border border-border-subtle" : ""
                  }`}
                  style={{ opacity: isActive ? 1 : 0.3 }}
                >
                  <span
                    className="font-[family-name:var(--font-mono)] text-[12px] w-5 text-center"
                    style={{ color: step.color }}
                  >
                    {step.from === "client" ? "→" : "←"}
                  </span>
                  <div>
                    <div
                      className="font-[family-name:var(--font-mono)] text-[11px] font-semibold"
                      style={{ color: step.color }}
                    >
                      {step.label}
                    </div>
                    <div className="font-[family-name:var(--font-mono)] text-[9px] text-text-muted">
                      {step.detail}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Server */}
          <div className="w-20 text-center">
            <div className="font-[family-name:var(--font-mono)] text-[11px] text-accent-green font-semibold px-2 py-1.5 rounded-lg bg-accent-green-dim border border-accent-green/30">
              Server
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
