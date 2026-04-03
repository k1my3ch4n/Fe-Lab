"use client";

import { useState } from "react";
import { CDN_FLOW_STEPS, CACHE_RESULTS } from "../constants";
import { ActionButton } from "@shared/ui";

interface UseFlowTabOptions {
  addLog: (text: string) => void;
}

export function useFlowTab({ addLog }: UseFlowTabOptions) {
  const [activeFlow, setActiveFlow] = useState<"hit" | "miss">("hit");
  const [activeStep, setActiveStep] = useState(-1);

  const steps = CDN_FLOW_STEPS[activeFlow];

  const reset = () => {
    setActiveFlow("hit");
    setActiveStep(-1);
  };

  const actions = (
    <>
      <ActionButton
        variant="cyan"
        onClick={() => {
          const next = activeStep + 1;
          if (next < steps.length) {
            setActiveStep(next);
            addLog(`[${steps[next].latency}] ${steps[next].label}`);
          }
        }}
        disabled={activeStep >= steps.length - 1}
      >
        다음 단계 →
      </ActionButton>
      <ActionButton
        variant="amber"
        onClick={() => {
          setActiveStep(-1);
          steps.forEach((step) => {
            addLog(`[${step.latency}] ${step.label}`);
          });
          setActiveStep(steps.length - 1);
        }}
      >
        전체 흐름 실행
      </ActionButton>
    </>
  );

  const content = (
    <>
      {/* HIT/MISS selector */}
      <div className="flex gap-2">
        {(["hit", "miss"] as const).map((type) => {
          const result = CACHE_RESULTS.find(
            (r) => r.type === type.toUpperCase(),
          );
          return (
            <button
              key={type}
              onClick={() => {
                setActiveFlow(type);
                setActiveStep(-1);
              }}
              className={`font-[family-name:var(--font-mono)] text-[11px] px-3 py-1.5 rounded-lg border transition-all duration-200 cursor-pointer ${
                activeFlow === type
                  ? "bg-bg-surface"
                  : "border-transparent bg-bg-deep text-text-muted hover:text-text-secondary"
              }`}
              style={
                activeFlow === type
                  ? {
                      borderColor: `${result?.color}66`,
                      color: result?.color,
                    }
                  : {}
              }
            >
              {result?.label}
            </button>
          );
        })}
      </div>

      {/* Flow steps */}
      <div className="rounded-lg border border-border-subtle bg-bg-deep p-4">
        <div className="flex flex-col gap-2">
          {steps.map((step, i) => {
            const isActive = i <= activeStep;
            const isCurrent = i === activeStep;
            return (
              <div
                key={i}
                className={`flex items-center gap-3 rounded-lg p-3 transition-all duration-300 ${
                  isCurrent ? "bg-bg-surface border border-border-subtle" : ""
                }`}
                style={{ opacity: isActive ? 1 : 0.3 }}
              >
                <span
                  className="font-[family-name:var(--font-mono)] text-[10px] font-bold w-12 text-right shrink-0"
                  style={{ color: step.color }}
                >
                  {step.latency}
                </span>
                <div
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: step.color }}
                />
                <span className="font-[family-name:var(--font-mono)] text-[11px] text-text-secondary">
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Total latency */}
        {activeStep >= steps.length - 1 && (
          <div className="mt-3 pt-3 border-t border-border-subtle text-center">
            <span
              className="font-[family-name:var(--font-mono)] text-[12px] font-bold"
              style={{
                color: activeFlow === "hit" ? "#00e676" : "#ffb800",
              }}
            >
              총 지연: {activeFlow === "hit" ? "~11ms" : "~212ms"}
            </span>
          </div>
        )}
      </div>

      {/* Cache result descriptions */}
      <div className="flex gap-3">
        {CACHE_RESULTS.map((r) => (
          <div
            key={r.type}
            className="flex-1 rounded-lg border border-border-subtle bg-bg-deep p-3"
          >
            <div
              className="font-[family-name:var(--font-mono)] text-[10px] font-bold mb-1"
              style={{ color: r.color }}
            >
              {r.label}
            </div>
            <div className="font-[family-name:var(--font-mono)] text-[9px] text-text-muted leading-[1.6]">
              {r.description}
            </div>
          </div>
        ))}
      </div>
    </>
  );

  return { actions, content, reset };
}
