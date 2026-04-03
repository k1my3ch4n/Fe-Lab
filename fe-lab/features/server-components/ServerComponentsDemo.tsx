"use client";

import { useState, useCallback } from "react";
import { COMPONENT_TYPES } from "./constants";

export default function ServerComponentsDemo() {
  const [activeTab, setActiveTab] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [activePhase, setActivePhase] = useState(-1);

  const compType = COMPONENT_TYPES[activeTab];

  const addLog = useCallback((text: string) => {
    setLogs((prev) => [...prev, text]);
  }, []);

  const handleTabChange = (index: number) => {
    setActiveTab(index);
    setLogs([]);
    setActivePhase(-1);
  };

  const handleReset = () => {
    setLogs([]);
    setActivePhase(-1);
  };

  const handleSimulate = () => {
    setLogs([]);
    setActivePhase(0);
    const phases = compType.phases;
    let step = 0;

    const runStep = () => {
      if (step < phases.length) {
        setActivePhase(step);
        addLog(
          `${step + 1}. [${phases[step].label}] ${phases[step].description}`,
        );
        step++;
        setTimeout(runStep, 600);
      } else {
        addLog(`--- 번들 사이즈: ${compType.bundleSize}`);
        addLog(`--- 렌더 위치: ${compType.renderLocation}`);
      }
    };
    runStep();
  };

  const handleCompare = () => {
    setLogs([]);
    addLog("=== Server vs Client 비교 ===");
    setTimeout(() => {
      addLog("Server: DB 직접 접근 ✓ | useState ✗");
      setTimeout(() => {
        addLog("Client: useState ✓ | DB 직접 접근 ✗");
        setTimeout(() => {
          addLog("Server: 번들 0KB | Client: 2-10KB+");
          setTimeout(() => {
            addLog("→ 인터랙션 없으면 Server Component 권장");
          }, 400);
        }, 400);
      }, 400);
    }, 400);
  };

  return (
    <>
      {/* Toolbar */}
      <div className="flex items-center gap-0 border-b border-border-subtle bg-bg-elevated">
        {COMPONENT_TYPES.map((ct, i) => (
          <button
            key={ct.id}
            onClick={() => handleTabChange(i)}
            className={`font-[family-name:var(--font-mono)] text-[11px] px-4 py-3 border-b-2 transition-all duration-200 cursor-pointer ${
              i === activeTab
                ? "border-accent-cyan text-accent-cyan bg-bg-surface"
                : "border-transparent text-text-muted hover:text-text-secondary"
            }`}
          >
            {ct.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-[1fr_280px] min-h-[420px]">
        {/* Left */}
        <div className="p-6 flex flex-col gap-5">
          {/* Code */}
          <pre className="font-[family-name:var(--font-mono)] text-[12px] text-accent-cyan bg-bg-deep p-4 rounded-lg leading-[1.8] overflow-x-auto">
            {compType.code}
          </pre>

          {/* Phase Visualization */}
          <div>
            <div className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted uppercase tracking-wider mb-3">
              Render Flow
            </div>
            <div className="flex flex-col gap-2">
              {compType.phases.map((phase, i) => (
                <div
                  key={i}
                  className="rounded-lg border p-3 transition-all duration-300"
                  style={{
                    borderColor:
                      activePhase >= i
                        ? `${phase.color}88`
                        : `${phase.color}22`,
                    background:
                      activePhase >= i
                        ? `${phase.color}15`
                        : `${phase.color}05`,
                    marginLeft: `${i * 16}px`,
                  }}
                >
                  <div
                    className="font-[family-name:var(--font-mono)] text-[10px] font-semibold"
                    style={{ color: phase.color }}
                  >
                    {i + 1}. {phase.label}
                  </div>
                  <div className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted mt-1">
                    {phase.description}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bundle Size Indicator */}
          <div className="flex items-center gap-3 bg-bg-deep rounded-lg p-3">
            <span className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted">
              Bundle:
            </span>
            <div className="flex-1 h-2 bg-bg-surface rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width:
                    compType.id === "server"
                      ? "2%"
                      : compType.id === "client"
                        ? "60%"
                        : "2%",
                  background: compType.id === "client" ? "#ff2d8a" : "#00e676",
                }}
              />
            </div>
            <span className="font-[family-name:var(--font-mono)] text-[10px] text-text-secondary">
              {compType.bundleSize}
            </span>
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
              렌더 흐름 시뮬레이션
            </button>
            <button
              onClick={handleCompare}
              className="w-full font-[family-name:var(--font-mono)] text-[12px] px-4 py-2.5 rounded-lg border border-accent-amber text-accent-amber bg-accent-amber-dim cursor-pointer transition-all duration-200 hover:bg-[#ffb80033]"
            >
              Server vs Client 비교
            </button>
          </div>

          {/* Log */}
          <div className="flex-1 overflow-y-auto p-3 font-[family-name:var(--font-mono)] text-[11px] leading-relaxed">
            {logs.length === 0 ? (
              <div className="text-text-muted text-center px-4 py-8 text-xs leading-[1.8]">
                버튼을 클릭하여
                <br />
                RSC 렌더링 흐름을
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
