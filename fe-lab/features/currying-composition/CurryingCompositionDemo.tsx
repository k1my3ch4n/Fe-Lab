"use client";

import { useState, useCallback } from "react";
import { DEMO_EXAMPLES } from "./constants";

export default function CurryingCompositionDemo() {
  const [activeExample, setActiveExample] = useState(0);
  const [currentStep, setCurrentStep] = useState(-1);
  const [logs, setLogs] = useState<string[]>([]);

  const example = DEMO_EXAMPLES[activeExample];

  const addLog = useCallback((text: string) => {
    setLogs((prev) => [...prev, text]);
  }, []);

  const handleExampleChange = (index: number) => {
    setActiveExample(index);
    setCurrentStep(-1);
    setLogs([]);
  };

  const handleReset = () => {
    setCurrentStep(-1);
    setLogs([]);
  };

  const handleNextStep = () => {
    const nextStep = currentStep + 1;

    if (nextStep < example.steps.length) {
      setCurrentStep(nextStep);

      const step = example.steps[nextStep];

      addLog(`Step ${nextStep + 1}: ${step.description}`);
      addLog(`  args: ${step.args.join(", ")}`);
      addLog(`  → ${step.result}`);
    }
  };

  const handleRunAll = () => {
    setCurrentStep(-1);
    setLogs([]);

    let stepIndex = 0;
    const runStep = () => {
      if (stepIndex < example.steps.length) {
        const step = example.steps[stepIndex];
        setCurrentStep(stepIndex);
        setLogs((prev) => [
          ...prev,
          `Step ${stepIndex + 1}: ${step.description}`,
          `  → ${step.result}`,
        ]);
        stepIndex++;
        setTimeout(runStep, 600);
      }
    };
    runStep();
  };

  return (
    <>
      {/* Toolbar */}
      <div className="flex items-center gap-0 border-b border-border-subtle bg-bg-elevated overflow-x-auto">
        {DEMO_EXAMPLES.map((ex, i) => (
          <button
            key={ex.id}
            onClick={() => handleExampleChange(i)}
            className={`font-[family-name:var(--font-mono)] text-[11px] px-4 py-3 border-b-2 transition-all duration-200 cursor-pointer whitespace-nowrap ${
              i === activeExample
                ? "border-accent-cyan text-accent-cyan bg-bg-surface"
                : "border-transparent text-text-muted hover:text-text-secondary"
            }`}
          >
            {ex.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-[1fr_280px] min-h-[420px]">
        {/* Left: Code + Step Visualization */}
        <div className="p-6 flex flex-col gap-5">
          {/* Code */}
          <pre className="font-[family-name:var(--font-mono)] text-[12px] text-accent-cyan bg-bg-deep p-4 rounded-lg leading-[1.8] overflow-x-auto">
            {example.code}
          </pre>

          {/* Step Visualization */}
          <div>
            <div className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted uppercase tracking-wider mb-3">
              {activeExample <= 1 ? "Partial Application" : "Function Pipeline"}
            </div>
            <div className="flex flex-col gap-2">
              {example.steps.map((step, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 transition-all duration-300"
                  style={{
                    opacity: currentStep >= i ? 1 : 0.3,
                  }}
                >
                  {/* Step number */}
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center font-[family-name:var(--font-mono)] text-[10px] font-bold flex-shrink-0"
                    style={{
                      background:
                        currentStep >= i ? `${example.color}33` : "#ffffff08",
                      color: currentStep >= i ? example.color : "#666",
                    }}
                  >
                    {i + 1}
                  </div>

                  {/* Arrow + args */}
                  <div
                    className="flex-1 rounded-lg border p-2 transition-all duration-300"
                    style={{
                      borderColor:
                        currentStep >= i ? `${example.color}44` : "#333",
                      background:
                        currentStep >= i ? `${example.color}08` : "transparent",
                    }}
                  >
                    <div className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted">
                      {step.args.join(" → ")}
                    </div>
                    <div
                      className="font-[family-name:var(--font-mono)] text-[11px] font-semibold"
                      style={{
                        color: currentStep >= i ? example.color : "#666",
                      }}
                    >
                      → {step.result}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Interactive Panel */}
        <div className="border-l border-border-subtle flex flex-col">
          <div className="px-4 py-3 border-b border-border-subtle flex items-center justify-between">
            <span className="font-[family-name:var(--font-mono)] text-[11px] font-semibold text-text-secondary uppercase tracking-wider">
              실행
            </span>
            <button
              onClick={handleReset}
              className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted cursor-pointer bg-transparent border-none px-2 py-1 rounded transition-all duration-200 hover:text-accent-magenta hover:bg-accent-magenta-dim"
            >
              Reset
            </button>
          </div>

          {/* Action buttons */}
          <div className="p-4 border-b border-border-subtle flex flex-col gap-2">
            <button
              onClick={handleNextStep}
              disabled={currentStep >= example.steps.length - 1}
              className={`w-full font-[family-name:var(--font-mono)] text-[12px] px-4 py-2.5 rounded-lg border cursor-pointer transition-all duration-200 ${
                currentStep >= example.steps.length - 1
                  ? "border-border-subtle text-text-muted opacity-50 cursor-not-allowed"
                  : "border-accent-cyan text-accent-cyan bg-accent-cyan-dim hover:bg-[#00e5ff33]"
              }`}
            >
              다음 단계 →
            </button>
            <button
              onClick={handleRunAll}
              className="w-full font-[family-name:var(--font-mono)] text-[12px] px-4 py-2.5 rounded-lg border border-accent-green text-accent-green bg-accent-green-dim cursor-pointer transition-all duration-200 hover:bg-[#00e67633]"
            >
              전체 실행 ▶
            </button>
          </div>

          {/* Log */}
          <div className="flex-1 overflow-y-auto p-3 font-[family-name:var(--font-mono)] text-[11px] leading-relaxed">
            {logs.length === 0 ? (
              <div className="text-text-muted text-center px-4 py-8 text-xs leading-[1.8]">
                버튼을 클릭하여
                <br />
                단계별 실행을 확인하세요
              </div>
            ) : (
              logs.map((log, i) => (
                <div
                  key={i}
                  className="px-2 py-1 rounded mb-0.5 text-accent-cyan animate-[logSlide_0.3s_ease]"
                >
                  {log}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}
