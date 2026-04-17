import { ACTOR_CONFIG, STATUS_COLORS } from "../../model/constants";
import type { CacheStatus } from "../../model/types";

interface StepHeader {
  key: string;
  value: string;
}

interface Step {
  actor: "browser" | "cache" | "server";
  label: string;
  description: string;
  status?: CacheStatus;
  headers?: StepHeader[];
}

interface StepVisualizationProps {
  steps: Step[];
  currentStep: number;
}

function StatusBadge({ status }: { status: CacheStatus }) {
  const config = STATUS_COLORS[status];
  return (
    <span
      className={`${config.bg} ${config.text} font-[family-name:var(--font-mono)] text-[10px] px-2 py-0.5 rounded-full font-semibold`}
    >
      {config.label}
    </span>
  );
}

export function StepVisualization({ steps, currentStep }: StepVisualizationProps) {
  return (
    <>
      {/* Actor Columns Header */}
      <div className="grid grid-cols-3 gap-4 mb-1">
        {(["browser", "cache", "server"] as const).map((actor) => (
          <div key={actor} className="text-center">
            <div
              className="font-[family-name:var(--font-mono)] text-[11px] font-semibold px-3 py-1.5 rounded-lg inline-block"
              style={{
                color: ACTOR_CONFIG[actor].color,
                background: `${ACTOR_CONFIG[actor].color}15`,
                border: `1px solid ${ACTOR_CONFIG[actor].color}33`,
              }}
            >
              {ACTOR_CONFIG[actor].label}
            </div>
          </div>
        ))}
      </div>

      {/* Vertical Lines + Steps */}
      <div className="relative">
        {/* Vertical guide lines */}
        <div className="absolute inset-0 grid grid-cols-3 gap-4 pointer-events-none">
          {[0, 1, 2].map((col) => (
            <div key={col} className="flex justify-center">
              <div
                className="w-px h-full"
                style={{
                  background: `${Object.values(ACTOR_CONFIG)[col].color}20`,
                }}
              />
            </div>
          ))}
        </div>

        {/* Steps */}
        <div className="flex flex-col gap-3 relative">
          {steps.map((step, i) => {
            const isActive = i <= currentStep;
            const isCurrent = i === currentStep;
            const colIndex =
              step.actor === "browser" ? 0 : step.actor === "cache" ? 1 : 2;
            const actorConfig = ACTOR_CONFIG[step.actor];

            return (
              <div key={i} className="grid grid-cols-3 gap-4">
                {[0, 1, 2].map((col) => (
                  <div key={col} className="flex justify-center">
                    {col === colIndex ? (
                      <div
                        className={`w-full rounded-lg border p-3 transition-all duration-500 ${
                          isActive ? "opacity-100" : "opacity-30"
                        } ${isCurrent ? "ring-1" : ""}`}
                        style={{
                          borderColor: isActive
                            ? `${actorConfig.color}55`
                            : `${actorConfig.color}20`,
                          background: isActive
                            ? `${actorConfig.color}10`
                            : `${actorConfig.color}05`,
                          ...(isCurrent
                            ? { ringColor: `${actorConfig.color}66` }
                            : {}),
                        }}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className="font-[family-name:var(--font-mono)] text-[11px] font-semibold"
                            style={{ color: actorConfig.color }}
                          >
                            {step.label}
                          </span>
                          {step.status && isActive && (
                            <StatusBadge status={step.status} />
                          )}
                        </div>
                        <div className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted leading-relaxed">
                          {step.description}
                        </div>
                        {step.headers && isActive && (
                          <div className="mt-2 flex flex-col gap-0.5">
                            {step.headers.map((h, j) => (
                              <div
                                key={j}
                                className="font-[family-name:var(--font-mono)] text-[10px] bg-bg-deep px-2 py-1 rounded"
                              >
                                <span className="text-accent-cyan">{h.key}</span>
                                <span className="text-text-muted">: </span>
                                <span className="text-text-primary">{h.value}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="w-px" />
                    )}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
