"use client";

import { CRP_SCENARIOS } from "../../model/constants";

interface CrpScenarioStatsProps {
  activeScenario: number;
  onScenarioChange: (index: number) => void;
}

export function CrpScenarioStats({
  activeScenario,
  onScenarioChange,
}: CrpScenarioStatsProps) {
  const baselineFcp = CRP_SCENARIOS[0].fcp;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {CRP_SCENARIOS.map((scenario, index) => {
        const isActive = index === activeScenario;
        const improvement =
          index === 0
            ? null
            : Math.round(((baselineFcp - scenario.fcp) / baselineFcp) * 100);

        return (
          <div
            key={scenario.id}
            onClick={() => onScenarioChange(index)}
            className={`rounded-lg border p-3 cursor-pointer transition-all duration-200 ${
              isActive
                ? "border-accent-cyan bg-accent-cyan-dim"
                : "border-border-subtle bg-bg-elevated hover:border-text-muted"
            }`}
          >
            <div
              className={`font-[family-name:var(--font-mono)] text-[10px] mb-1 ${
                isActive ? "text-accent-cyan" : "text-text-muted"
              }`}
            >
              {scenario.label}
            </div>
            <div
              className={`font-[family-name:var(--font-mono)] text-[18px] font-bold ${
                isActive ? "text-accent-cyan" : "text-text-primary"
              }`}
            >
              {scenario.fcp}
              <span className="text-[11px] font-normal text-text-muted ml-0.5">
                ms
              </span>
            </div>
            {improvement !== null && (
              <div className="font-[family-name:var(--font-mono)] text-[10px] text-accent-green mt-0.5">
                -{improvement}% 개선
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
