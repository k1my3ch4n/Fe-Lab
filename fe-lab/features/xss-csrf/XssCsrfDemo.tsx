"use client";

import { useState, useCallback } from "react";
import { SECURITY_SCENARIOS, XSS_EXAMPLES } from "./constants";

export default function XssCsrfDemo() {
  const [activeTab, setActiveTab] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [activeStep, setActiveStep] = useState(-1);
  const [xssInput, setXssInput] = useState("");
  const [showEscaped, setShowEscaped] = useState(false);

  const scenario = SECURITY_SCENARIOS[activeTab];

  const addLog = useCallback((text: string) => {
    setLogs((prev) => [...prev, text]);
  }, []);

  const handleTabChange = (index: number) => {
    setActiveTab(index);
    setLogs([]);
    setActiveStep(-1);
    setXssInput("");
    setShowEscaped(false);
  };

  const handleReset = () => {
    setLogs([]);
    setActiveStep(-1);
    setXssInput("");
    setShowEscaped(false);
  };

  const handleAttackSimulate = () => {
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
        if (scenario.id === "xss") {
          addLog("--- 공격 성공: 쿠키 탈취됨!");
        } else if (scenario.id === "csrf") {
          addLog("--- 공격 성공: 무단 송금 실행!");
        } else {
          addLog("--- CSP가 악성 스크립트를 차단했습니다 ✓");
        }
      }
    };
    runStep();
  };

  const handleXssDemo = () => {
    const malicious = XSS_EXAMPLES.input;
    setXssInput(malicious);
    setShowEscaped(false);
    setLogs([]);
    addLog(`입력: ${malicious}`);
    setTimeout(() => {
      addLog("innerHTML 사용 시 → 스크립트 실행됨! ❌");
      setTimeout(() => {
        setShowEscaped(true);
        addLog("textContent 사용 시 → 문자열로 표시 ✓");
        setTimeout(() => {
          addLog(`이스케이프 결과: ${XSS_EXAMPLES.escaped}`);
        }, 400);
      }, 600);
    }, 400);
  };

  const handleDefense = () => {
    setLogs([]);
    if (scenario.id === "xss") {
      addLog("=== XSS 방어 전략 ===");
      setTimeout(() => {
        addLog("1. 입력 검증 + 이스케이프 (서버/클라이언트)");
        setTimeout(() => {
          addLog("2. CSP 헤더로 인라인 스크립트 차단");
          setTimeout(() => {
            addLog("3. HttpOnly 쿠키로 JS 접근 차단");
            setTimeout(() => {
              addLog("4. React는 JSX에서 자동 이스케이프 ✓");
            }, 400);
          }, 400);
        }, 400);
      }, 400);
    } else if (scenario.id === "csrf") {
      addLog("=== CSRF 방어 전략 ===");
      setTimeout(() => {
        addLog("1. CSRF 토큰 — 폼마다 고유 토큰 발급/검증");
        setTimeout(() => {
          addLog("2. SameSite 쿠키 — cross-origin 요청에 쿠키 미전송");
          setTimeout(() => {
            addLog("3. Origin/Referer 헤더 검증");
            setTimeout(() => {
              addLog("4. Custom 헤더 (X-Requested-With)");
            }, 400);
          }, 400);
        }, 400);
      }, 400);
    } else {
      addLog("=== CSP 설정 가이드 ===");
      setTimeout(() => {
        addLog("1. default-src 'self' — 기본 차단");
        setTimeout(() => {
          addLog("2. script-src 'nonce-xxx' — nonce 기반 허용");
          setTimeout(() => {
            addLog("3. report-uri — 위반 리포팅");
            setTimeout(() => {
              addLog("4. 점진적 적용: Report-Only → Enforce");
            }, 400);
          }, 400);
        }, 400);
      }, 400);
    }
  };

  return (
    <>
      {/* Toolbar */}
      <div className="flex items-center gap-0 border-b border-border-subtle bg-bg-elevated">
        {SECURITY_SCENARIOS.map((s, i) => (
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

          {/* XSS Input Demo (only for XSS tab) */}
          {activeTab === 0 && xssInput && (
            <div className="bg-bg-deep rounded-lg p-4">
              <div className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted uppercase tracking-wider mb-2">
                XSS 시뮬레이션
              </div>
              <div className="flex flex-col gap-2">
                <div className="rounded border border-accent-magenta/30 p-2 bg-accent-magenta-dim">
                  <span className="font-[family-name:var(--font-mono)] text-[10px] text-accent-magenta">
                    innerHTML:
                  </span>
                  <span className="font-[family-name:var(--font-mono)] text-[11px] text-text-primary ml-2">
                    {xssInput}
                  </span>
                </div>
                {showEscaped && (
                  <div className="rounded border border-accent-green/30 p-2 bg-accent-green-dim">
                    <span className="font-[family-name:var(--font-mono)] text-[10px] text-accent-green">
                      textContent:
                    </span>
                    <span className="font-[family-name:var(--font-mono)] text-[11px] text-text-primary ml-2">
                      {XSS_EXAMPLES.escaped}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Attack Flow Visualization */}
          <div>
            <div className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted uppercase tracking-wider mb-3">
              Attack Flow
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
              onClick={handleAttackSimulate}
              className="w-full font-[family-name:var(--font-mono)] text-[12px] px-4 py-2.5 rounded-lg border border-accent-magenta text-accent-magenta bg-accent-magenta-dim cursor-pointer transition-all duration-200 hover:bg-[#ff2d8a33]"
            >
              공격 시뮬레이션
            </button>
            {activeTab === 0 && (
              <button
                onClick={handleXssDemo}
                className="w-full font-[family-name:var(--font-mono)] text-[12px] px-4 py-2.5 rounded-lg border border-accent-amber text-accent-amber bg-accent-amber-dim cursor-pointer transition-all duration-200 hover:bg-[#ffb80033]"
              >
                XSS 이스케이프 비교
              </button>
            )}
            <button
              onClick={handleDefense}
              className="w-full font-[family-name:var(--font-mono)] text-[12px] px-4 py-2.5 rounded-lg border border-accent-green text-accent-green bg-accent-green-dim cursor-pointer transition-all duration-200 hover:bg-[#00e67633]"
            >
              방어 전략
            </button>
          </div>

          {/* Log */}
          <div className="flex-1 overflow-y-auto p-3 font-[family-name:var(--font-mono)] text-[11px] leading-relaxed">
            {logs.length === 0 ? (
              <div className="text-text-muted text-center px-4 py-8 text-xs leading-[1.8]">
                버튼을 클릭하여
                <br />
                보안 공격과 방어를
                <br />
                확인하세요
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
