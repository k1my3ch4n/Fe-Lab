"use client";

import { SectionHeader } from "@shared/ui";
import { CLASS_TO_HOOKS_MAP } from "../constants";

const FLOW_STEPS = [
  { label: "useState init", color: "#00e5ff" },
  { label: "useMemo", color: "#b388ff" },
  { label: "Render", color: "#ffffff" },
  { label: "DOM Update", color: "#888" },
  { label: "useLayoutEffect", color: "#ff2d8a" },
  { label: "Paint", color: "#888" },
  { label: "useEffect", color: "#00e676" },
] as const;

export default function ComparisonView() {
  return (
    <div className="p-6">
      <SectionHeader>Class Lifecycle vs Hooks 매핑</SectionHeader>

      <div className="rounded-lg border border-border-subtle overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-[1fr_1fr_1.2fr] bg-bg-elevated border-b border-border-subtle">
          <div className="px-4 py-2.5 font-[family-name:var(--font-mono)] text-[10px] text-accent-magenta font-semibold uppercase tracking-wider">
            Class Method
          </div>
          <div className="px-4 py-2.5 font-[family-name:var(--font-mono)] text-[10px] text-accent-cyan font-semibold uppercase tracking-wider">
            Hook Equivalent
          </div>
          <div className="px-4 py-2.5 font-[family-name:var(--font-mono)] text-[10px] text-text-muted font-semibold uppercase tracking-wider">
            설명
          </div>
        </div>

        {/* Rows */}
        {CLASS_TO_HOOKS_MAP.map((mapping, i) => (
          <div
            key={i}
            className={`grid grid-cols-[1fr_1fr_1.2fr] transition-all duration-200 hover:bg-bg-surface ${
              i < CLASS_TO_HOOKS_MAP.length - 1
                ? "border-b border-border-subtle"
                : ""
            }`}
          >
            <div className="px-4 py-3 font-[family-name:var(--font-mono)] text-[11px] text-accent-magenta">
              {mapping.classMethod}
            </div>
            <div className="px-4 py-3 font-[family-name:var(--font-mono)] text-[11px] text-accent-cyan">
              {mapping.hookEquivalent}
            </div>
            <div className="px-4 py-3 font-[family-name:var(--font-mono)] text-[11px] text-text-secondary">
              {mapping.description}
            </div>
          </div>
        ))}
      </div>

      {/* Visual flow diagram */}
      <div className="mt-8">
        <SectionHeader>Hooks 실행 흐름</SectionHeader>
        <div className="flex items-center gap-2 flex-wrap">
          {FLOW_STEPS.map((step, i, arr) => (
            <div key={i} className="flex items-center gap-2">
              <span
                className="font-[family-name:var(--font-mono)] text-[10px] px-2.5 py-1.5 rounded-md border"
                style={{
                  color: step.color,
                  borderColor: `${step.color}44`,
                  background: `${step.color}10`,
                }}
              >
                {step.label}
              </span>
              {i < arr.length - 1 && (
                <span className="text-text-muted text-[10px]">&rarr;</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
