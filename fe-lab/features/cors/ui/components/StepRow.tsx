import type { CorsStep } from "../../model/types";

interface StepRowProps {
  step: CorsStep;
  index: number;
  active: boolean;
  current: boolean;
  isError: boolean;
}

export function StepRow({
  step,
  index,
  active,
  current,
  isError,
}: StepRowProps) {
  const isRight = step.direction === "right";

  return (
    <div
      className={`flex items-center gap-3 rounded-lg border p-3 transition-all duration-300 ${
        current
          ? isError
            ? "border-accent-magenta/40 bg-accent-magenta/5"
            : "border-accent-cyan/40 bg-accent-cyan/5"
          : active
            ? "border-border-subtle bg-bg-surface opacity-70"
            : "border-border-subtle bg-bg-deep opacity-40"
      }`}
    >
      <div
        className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center font-[family-name:var(--font-mono)] text-[10px] font-bold ${
          current
            ? isError
              ? "bg-accent-magenta/20 text-accent-magenta"
              : "bg-accent-cyan/20 text-accent-cyan"
            : active
              ? "bg-bg-elevated text-text-muted"
              : "bg-bg-deep text-text-muted"
        }`}
      >
        {index + 1}
      </div>

      <div
        className={`font-[family-name:var(--font-mono)] text-[12px] flex-shrink-0 ${
          current
            ? isError
              ? "text-accent-magenta"
              : "text-accent-cyan"
            : "text-text-muted"
        }`}
      >
        {isRight ? "→" : "←"}
      </div>

      <div className="flex-1 min-w-0">
        <div
          className={`font-[family-name:var(--font-mono)] text-[11px] font-semibold ${
            current
              ? isError
                ? "text-accent-magenta"
                : "text-accent-cyan"
              : "text-text-secondary"
          }`}
        >
          {step.label}
        </div>
        {active && (
          <div className="flex flex-wrap gap-1.5 mt-1.5">
            {step.headers.map((header, j) => (
              <span
                key={j}
                className="font-[family-name:var(--font-mono)] text-[9px] bg-bg-deep px-1.5 py-0.5 rounded"
              >
                <span style={{ color: header.color }}>{header.name}</span>
              </span>
            ))}
          </div>
        )}
      </div>

      <div
        className={`font-[family-name:var(--font-mono)] text-[9px] flex-shrink-0 uppercase tracking-wider ${
          isRight
            ? "text-accent-cyan"
            : isError
              ? "text-accent-magenta"
              : "text-accent-green"
        }`}
      >
        {isRight ? "REQ" : "RES"}
      </div>
    </div>
  );
}
