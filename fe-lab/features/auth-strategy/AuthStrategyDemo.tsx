"use client";

import { useState, useCallback } from "react";
import { AUTH_METHODS } from "./constants";

export default function AuthStrategyDemo() {
  const [activeTab, setActiveTab] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [activeStep, setActiveStep] = useState(-1);

  const method = AUTH_METHODS[activeTab];

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
    const steps = method.steps;
    let step = 0;

    const runStep = () => {
      if (step < steps.length) {
        setActiveStep(step);
        addLog(
          `${step + 1}. [${steps[step].label}] ${steps[step].description}`,
        );
        step++;
        setTimeout(runStep, 500);
      } else {
        addLog("--- 인증 완료! ✓");
      }
    };
    runStep();
  };

  const handleCompare = () => {
    setLogs([]);
    addLog("=== Session vs JWT vs OAuth ===");
    setTimeout(() => {
      addLog("Session: 서버 상태 ✓ | 확장성 ✗ | 즉시 무효화 ✓");
      setTimeout(() => {
        addLog("JWT: Stateless ✓ | 확장성 ✓ | 즉시 무효화 ✗");
        setTimeout(() => {
          addLog("OAuth: 소셜 로그인 ✓ | 구현 복잡도 ✗ | 표준 ✓");
          setTimeout(() => {
            addLog("→ 실무: JWT(Access) + 리프레시 토큰 조합 권장");
          }, 400);
        }, 400);
      }, 400);
    }, 400);
  };

  const handleRefreshFlow = () => {
    setLogs([]);
    addLog("=== 리프레시 토큰 흐름 ===");
    setTimeout(() => {
      addLog("1. Access Token 만료 (15분)");
      setTimeout(() => {
        addLog("2. API 응답: 401 Unauthorized");
        setTimeout(() => {
          addLog("3. Refresh Token으로 새 Access Token 발급");
          setTimeout(() => {
            addLog("4. 원래 요청 재시도 → 성공");
            setTimeout(() => {
              addLog("5. Refresh Token도 만료 시 → 재로그인");
            }, 400);
          }, 400);
        }, 400);
      }, 400);
    }, 400);
  };

  return (
    <>
      {/* Toolbar */}
      <div className="flex items-center gap-0 border-b border-border-subtle bg-bg-elevated">
        {AUTH_METHODS.map((m, i) => (
          <button
            key={m.id}
            onClick={() => handleTabChange(i)}
            className={`font-[family-name:var(--font-mono)] text-[11px] px-4 py-3 border-b-2 transition-all duration-200 cursor-pointer ${
              i === activeTab
                ? "border-accent-cyan text-accent-cyan bg-bg-surface"
                : "border-transparent text-text-muted hover:text-text-secondary"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-[1fr_280px] min-h-[420px]">
        {/* Left */}
        <div className="p-6 flex flex-col gap-5">
          {/* Code */}
          <pre className="font-[family-name:var(--font-mono)] text-[12px] text-accent-cyan bg-bg-deep p-4 rounded-lg leading-[1.8] overflow-x-auto">
            {method.code}
          </pre>

          {/* Auth Flow Visualization */}
          <div>
            <div className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted uppercase tracking-wider mb-3">
              Auth Flow
            </div>
            <div className="flex flex-col gap-2">
              {method.steps.map((step, i) => (
                <div
                  key={i}
                  className="rounded-lg border p-3 transition-all duration-300"
                  style={{
                    borderColor:
                      activeStep >= i ? `${step.color}88` : `${step.color}22`,
                    background:
                      activeStep >= i ? `${step.color}15` : `${step.color}05`,
                    marginLeft: `${i * 14}px`,
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
              인증 흐름 시뮬레이션
            </button>
            <button
              onClick={handleCompare}
              className="w-full font-[family-name:var(--font-mono)] text-[12px] px-4 py-2.5 rounded-lg border border-accent-amber text-accent-amber bg-accent-amber-dim cursor-pointer transition-all duration-200 hover:bg-[#ffb80033]"
            >
              3가지 방식 비교
            </button>
            <button
              onClick={handleRefreshFlow}
              className="w-full font-[family-name:var(--font-mono)] text-[12px] px-4 py-2.5 rounded-lg border border-accent-green text-accent-green bg-accent-green-dim cursor-pointer transition-all duration-200 hover:bg-[#00e67633]"
            >
              리프레시 토큰 흐름
            </button>

            {/* Pros / Cons */}
            <div className="mt-2">
              <div className="font-[family-name:var(--font-mono)] text-[10px] text-accent-green mb-1">
                장점
              </div>
              {method.pros.map((p, i) => (
                <div
                  key={i}
                  className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted leading-[1.8]"
                >
                  + {p}
                </div>
              ))}
              <div className="font-[family-name:var(--font-mono)] text-[10px] text-accent-magenta mt-2 mb-1">
                단점
              </div>
              {method.cons.map((c, i) => (
                <div
                  key={i}
                  className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted leading-[1.8]"
                >
                  - {c}
                </div>
              ))}
            </div>
          </div>

          {/* Log */}
          <div className="flex-1 overflow-y-auto p-3 font-[family-name:var(--font-mono)] text-[11px] leading-relaxed">
            {logs.length === 0 ? (
              <div className="text-text-muted text-center px-4 py-8 text-xs leading-[1.8]">
                버튼을 클릭하여
                <br />
                인증 흐름을 확인하세요
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
