import { FETCH_EXAMPLES } from "../../model/constants";
import { SectionHeader } from "@shared/ui";

export function OverfetchComparison() {
  return (
    <>
      <SectionHeader>필요한 데이터: name, email만 필요</SectionHeader>

      <div className="grid grid-cols-2 gap-4">
        {FETCH_EXAMPLES.map((ex) => (
          <div
            key={ex.style.id}
            className="rounded-lg border border-border-subtle bg-bg-deep p-4 flex flex-col gap-3"
          >
            <div
              className="font-[family-name:var(--font-mono)] text-[12px] font-bold"
              style={{ color: ex.style.color }}
            >
              {ex.style.label}
            </div>

            {/* Request */}
            <div>
              <div className="font-[family-name:var(--font-mono)] text-[9px] text-text-muted uppercase mb-1">
                Request
              </div>
              <pre className="font-[family-name:var(--font-mono)] text-[10px] text-accent-cyan bg-bg-surface p-2 rounded leading-[1.6] overflow-x-auto">
                {ex.request}
              </pre>
            </div>

            {/* Response */}
            <div>
              <div className="font-[family-name:var(--font-mono)] text-[9px] text-text-muted uppercase mb-1">
                Response
              </div>
              <pre className="font-[family-name:var(--font-mono)] text-[10px] text-accent-green bg-bg-surface p-2 rounded leading-[1.6] overflow-x-auto">
                {ex.response}
              </pre>
            </div>

            {/* Data efficiency */}
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 rounded-full bg-bg-surface overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${(ex.neededFields / ex.totalFields) * 100}%`,
                    backgroundColor:
                      ex.neededFields === ex.totalFields
                        ? "#00e676"
                        : "#ff2d8a",
                  }}
                />
              </div>
              <span className="font-[family-name:var(--font-mono)] text-[9px] text-text-muted">
                {ex.neededFields}/{ex.totalFields} 필드
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Waste indicator */}
      <div className="rounded-lg border border-accent-magenta/30 bg-accent-magenta-dim p-3 text-center">
        <span className="font-[family-name:var(--font-mono)] text-[11px] text-accent-magenta">
          REST: 불필요한 6개 필드 전송 (Over-fetching)
        </span>
      </div>
    </>
  );
}
