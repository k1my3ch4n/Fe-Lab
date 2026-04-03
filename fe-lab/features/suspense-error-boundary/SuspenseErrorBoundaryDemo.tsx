"use client";

import { useState, useCallback } from "react";
import { SUSPENSE_SCENARIOS } from "./constants";

export default function SuspenseErrorBoundaryDemo() {
  const [activeTab, setActiveTab] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [activeStep, setActiveStep] = useState(-1);

  const scenario = SUSPENSE_SCENARIOS[activeTab];

  const addLog = useCallback((text: string) => {
    setLogs((prev) => [...prev, text]);
  }, []);

  const handleTabChange = (index: number) => {
    setActiveTab(index);
    setLogs([]);
    setActiveStep(-1);
  };

  const handleReset = () => {
    setLogs([]);
    setActiveStep(-1);
  };

  const handleSimulate = () => {
    setLogs([]);
    setActiveStep(0);
    const steps = scenario.steps;
    let step = 0;

    const runStep = () => {
      if (step < steps.length) {
        setActiveStep(step);
        addLog(
          `${step + 1}. [${steps[step].label}] ${steps[step].description}`,
        );
        step++;
        setTimeout(runStep, 600);
      } else {
        if (scenario.id === "suspense") {
          addLog("--- 로딩 완료! 컴포넌트가 정상 렌더됩니다 ✓");
        } else if (scenario.id === "error-boundary") {
          addLog("--- 에러가 안전하게 처리되었습니다 ✓");
        } else {
          addLog("--- 로딩 + 에러 모두 선언적으로 처리 ✓");
        }
      }
    };
    runStep();
  };

  const handleErrorScenario = () => {
    setLogs([]);
    if (scenario.id === "suspense") {
      addLog("❌ Suspense 없이 use() 호출 시:");
      setTimeout(() => {
        addLog("→ Unhandled Promise — 앱 크래시!");
        setTimeout(() => {
          addLog("→ 반드시 <Suspense>로 감싸야 합니다");
        }, 400);
      }, 400);
    } else if (scenario.id === "error-boundary") {
      addLog("❌ Error Boundary 없이 에러 발생 시:");
      setTimeout(() => {
        addLog("→ 전체 컴포넌트 트리 언마운트!");
        setTimeout(() => {
          addLog("→ 사용자에게 빈 화면 표시됨");
        }, 400);
      }, 400);
    } else {
      addLog("❌ 조합 없이 사용 시:");
      setTimeout(() => {
        addLog("→ 로딩 중 에러 발생 → 처리 불가!");
        setTimeout(() => {
          addLog("→ 항상 Error Boundary + Suspense 조합 권장");
        }, 400);
      }, 400);
    }
  };

  return (
    <>
      {/* Toolbar */}
      <div className="flex items-center gap-0 border-b border-border-subtle bg-bg-elevated">
        {SUSPENSE_SCENARIOS.map((s, i) => (
          <button
            key={s.id}
            onClick={() => handleTabChange(i)}
            className={`font-[family-name:var(--font-mono)] text-[11px] px-4 py-3 border-b-2 transition-all duration-200 cursor-pointer ${
              i === activeTab
                ? "border-accent-cyan text-accent-cyan bg-bg-surface"
                : "border-transparent text-text-muted hover:text-text-secondary"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-[1fr_280px] min-h-[420px]">
        {/* Left */}
        <div className="p-6 flex flex-col gap-5">
          {/* Code */}
          <pre className="font-[family-name:var(--font-mono)] text-[12px] text-accent-cyan bg-bg-deep p-4 rounded-lg leading-[1.8] overflow-x-auto">
            {scenario.code}
          </pre>

          {/* Flow Visualization */}
          <div>
            <div className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted uppercase tracking-wider mb-3">
              Flow
            </div>
            <div className="flex flex-col gap-2">
              {scenario.steps.map((step, i) => (
                <div
                  key={i}
                  className="rounded-lg border p-3 transition-all duration-300"
                  style={{
                    borderColor:
                      activeStep >= i ? `${step.color}88` : `${step.color}22`,
                    background:
                      activeStep >= i ? `${step.color}15` : `${step.color}05`,
                    marginLeft: `${i * 16}px`,
                  }}
                >
                  <div
                    className="font-[family-name:var(--font-mono)] text-[10px] font-semibold"
                    style={{ color: step.color }}
                  >
                    {i + 1}. {step.label}
                  </div>
                  <div className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted mt-1">
                    {step.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel */}
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

          <div className="p-4 border-b border-border-subtle flex flex-col gap-2">
            <button
              onClick={handleSimulate}
              className="w-full font-[family-name:var(--font-mono)] text-[12px] px-4 py-2.5 rounded-lg border border-accent-cyan text-accent-cyan bg-accent-cyan-dim cursor-pointer transition-all duration-200 hover:bg-[#00e5ff33]"
            >
              정상 흐름 시뮬레이션
            </button>
            <button
              onClick={handleErrorScenario}
              className="w-full font-[family-name:var(--font-mono)] text-[12px] px-4 py-2.5 rounded-lg border border-accent-magenta text-accent-magenta bg-accent-magenta-dim cursor-pointer transition-all duration-200 hover:bg-[#ff2d8a33]"
            >
              에러 시나리오
            </button>
          </div>

          {/* Log */}
          <div className="flex-1 overflow-y-auto p-3 font-[family-name:var(--font-mono)] text-[11px] leading-relaxed">
            {logs.length === 0 ? (
              <div className="text-text-muted text-center px-4 py-8 text-xs leading-[1.8]">
                버튼을 클릭하여
                <br />
                Suspense / Error Boundary
                <br />
                동작을 확인하세요
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
