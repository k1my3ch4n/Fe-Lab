"use client";

import { useState, useCallback } from "react";
import { LEAK_PATTERNS, SEVERITY_COLORS, GC_PHASES } from "./constants";

export default function MemoryManagementDemo() {
  const [activeTab, setActiveTab] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [gcPhase, setGcPhase] = useState<number | null>(null);

  const pattern = LEAK_PATTERNS[activeTab];

  const addLog = useCallback((text: string) => {
    setLogs((prev) => [...prev, text]);
  }, []);

  const handleReset = () => {
    setLogs([]);
    setGcPhase(null);
  };

  const handleTabChange = (index: number) => {
    setActiveTab(index);
    setLogs([]);
    setGcPhase(null);
  };

  const simulateLeak = () => {
    setLogs([]);
    if (activeTab === 0) {
      addLog("// 이벤트 리스너 등록 (해제 없음)");
      addLog("addEventListener('click', handler)");
      addLog("→ handler 클로저가 data(10000) 참조 유지");
      addLog("→ 컴포넌트 언마운트 후에도 메모리 유지 ✗");
      addLog("");
      addLog("// 메모리: 10KB → 20KB → 30KB... (누적)");
    } else if (activeTab === 1) {
      addLog("// replaceThing() 반복 호출");
      addLog("호출 1: longStr(1MB) + originalThing 참조 유지");
      addLog("호출 2: longStr(1MB) + 이전 theThing 참조 유지");
      addLog("호출 3: longStr(1MB) + 체인 계속 증가...");
      addLog("");
      addLog("// 메모리: 1MB → 2MB → 3MB... (누적)");
    } else {
      addLog("// DOM 노드 생성 및 JS 참조 저장");
      addLog("elements.myDiv = div");
      addLog("document.body.removeChild(div)");
      addLog("→ DOM에서 제거했지만 elements.myDiv가 참조 유지");
      addLog("→ Detached DOM Tree: GC 불가 ✗");
    }
  };

  const simulateFix = () => {
    setLogs([]);
    if (activeTab === 0) {
      addLog("// cleanup 함수로 리스너 해제");
      addLog("removeEventListener('click', handler)");
      addLog("→ handler 참조 해제 → data도 GC 대상");
      addLog("→ 메모리 정상 해제 ✓");
    } else if (activeTab === 1) {
      addLog("// 불필요한 클로저 제거");
      addLog("→ unused 클로저 삭제");
      addLog("→ originalThing이 함수 종료 시 GC 대상");
      addLog("→ 메모리 안정적 유지 ✓");
    } else {
      addLog("// JS 참조도 함께 제거");
      addLog("delete elements.myDiv");
      addLog("→ DOM 노드 + JS 참조 모두 해제");
      addLog("→ GC가 메모리 회수 가능 ✓");
      addLog("");
      addLog("// 또는 WeakRef 사용");
      addLog("new WeakRef(div) → GC가 자동으로 수거");
    }
  };

  const simulateGC = () => {
    setLogs([]);
    addLog("// Garbage Collection 시작");
    setGcPhase(0);

    setTimeout(() => {
      addLog("1. Mark: 루트에서 도달 가능한 객체 탐색");
      setGcPhase(1);
    }, 800);

    setTimeout(() => {
      addLog("2. Sweep: 마킹되지 않은 객체 메모리 해제");
      setGcPhase(2);
    }, 1600);

    setTimeout(() => {
      addLog("3. Compact: 메모리 압축 (V8 선택적)");
      addLog("");
      addLog("// GC 완료 — 도달 불가 객체 수거됨");
      setGcPhase(null);
    }, 2400);
  };

  return (
    <>
      {/* Toolbar */}
      <div className="flex items-center gap-0 border-b border-border-subtle bg-bg-elevated">
        {LEAK_PATTERNS.map((p, i) => (
          <button
            key={p.id}
            onClick={() => handleTabChange(i)}
            className={`font-[family-name:var(--font-mono)] text-[11px] px-4 py-3 border-b-2 transition-all duration-200 cursor-pointer ${
              i === activeTab
                ? "border-accent-cyan text-accent-cyan bg-bg-surface"
                : "border-transparent text-text-muted hover:text-text-secondary"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-[1fr_280px] min-h-[420px]">
        {/* Left: Code + GC Visualization */}
        <div className="p-6 flex flex-col gap-5">
          {/* Code */}
          <pre className="font-[family-name:var(--font-mono)] text-[12px] text-accent-cyan bg-bg-deep p-4 rounded-lg leading-[1.8] overflow-x-auto">
            {pattern.code}
          </pre>

          {/* Severity + GC Phases */}
          <div className="flex gap-4">
            {/* Severity */}
            <div className="flex items-center gap-2 p-3 rounded-lg border border-border-subtle bg-bg-surface">
              <span className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted uppercase">
                위험도:
              </span>
              <span
                className="font-[family-name:var(--font-mono)] text-[11px] font-semibold"
                style={{ color: SEVERITY_COLORS[pattern.severity] }}
              >
                {pattern.severity.toUpperCase()}
              </span>
            </div>

            {/* GC Phase Indicator */}
            <div className="flex-1 flex items-center gap-2">
              {GC_PHASES.map((phase, i) => (
                <div
                  key={phase.name}
                  className="flex-1 rounded-lg border p-2 text-center transition-all duration-500"
                  style={{
                    borderColor:
                      gcPhase === i ? `${phase.color}88` : `${phase.color}22`,
                    background:
                      gcPhase === i ? `${phase.color}18` : "transparent",
                    transform: gcPhase === i ? "scale(1.05)" : "scale(1)",
                  }}
                >
                  <div
                    className="font-[family-name:var(--font-mono)] text-[10px] font-semibold"
                    style={{
                      color: gcPhase === i ? phase.color : `${phase.color}66`,
                    }}
                  >
                    {phase.name}
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
          <div className="p-4 border-b border-border-subtle">
            <div className="flex flex-col gap-2">
              <button
                onClick={simulateLeak}
                className="w-full font-[family-name:var(--font-mono)] text-[12px] px-4 py-2.5 rounded-lg border border-accent-magenta text-accent-magenta bg-accent-magenta-dim cursor-pointer transition-all duration-200 hover:bg-[#ff2d8a33]"
              >
                릭 시뮬레이션 (문제)
              </button>
              <button
                onClick={simulateFix}
                className="w-full font-[family-name:var(--font-mono)] text-[12px] px-4 py-2.5 rounded-lg border border-accent-green text-accent-green bg-accent-green-dim cursor-pointer transition-all duration-200 hover:bg-[#00e67633]"
              >
                해결 패턴 실행
              </button>
              <button
                onClick={simulateGC}
                className="w-full font-[family-name:var(--font-mono)] text-[12px] px-4 py-2.5 rounded-lg border border-accent-cyan text-accent-cyan bg-accent-cyan-dim cursor-pointer transition-all duration-200 hover:bg-[#00e5ff33]"
              >
                GC 사이클 시각화
              </button>
            </div>
          </div>

          {/* Description */}
          <div className="p-4 border-b border-border-subtle">
            <div className="text-[11px] text-text-secondary leading-[1.8]">
              {pattern.description}
            </div>
          </div>

          {/* Log */}
          <div className="flex-1 overflow-y-auto p-3 font-[family-name:var(--font-mono)] text-[11px] leading-relaxed">
            {logs.length === 0 ? (
              <div className="text-text-muted text-center px-4 py-8 text-xs leading-[1.8]">
                버튼을 클릭하여
                <br />
                메모리 릭 패턴을 확인하세요
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
