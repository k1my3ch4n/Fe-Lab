"use client";

import { useState, useCallback } from "react";
import { CLOSURE_EXAMPLES } from "./constants";

export default function ClosureDemo() {
  const [activeExample, setActiveExample] = useState(0);
  const [counterValue, setCounterValue] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);

  const example = CLOSURE_EXAMPLES[activeExample];

  const addLog = useCallback((text: string) => {
    setLogs((prev) => [...prev, text]);
  }, []);

  const handleCounterClick = () => {
    const next = counterValue + 1;
    setCounterValue(next);
    addLog(`counter() → ${next}  // count가 ${next}로 증가`);
  };

  const handleReset = () => {
    setCounterValue(0);
    setLogs([]);
  };

  const handleExampleChange = (index: number) => {
    setActiveExample(index);
    setCounterValue(0);
    setLogs([]);
  };

  return (
    <>
      {/* Toolbar */}
      <div className="flex items-center gap-0 border-b border-border-subtle bg-bg-elevated">
        {CLOSURE_EXAMPLES.map((ex, i) => (
          <button
            key={ex.id}
            onClick={() => handleExampleChange(i)}
            className={`font-[family-name:var(--font-mono)] text-[11px] px-4 py-3 border-b-2 transition-all duration-200 cursor-pointer ${
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
        {/* Left: Code + Scope Visualization */}
        <div className="p-6 flex flex-col gap-5">
          {/* Code */}
          <pre className="font-[family-name:var(--font-mono)] text-[12px] text-accent-cyan bg-bg-deep p-4 rounded-lg leading-[1.8] overflow-x-auto">
            {example.code}
          </pre>

          {/* Scope Chain Visualization */}
          <div>
            <div className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted uppercase tracking-wider mb-3">
              Scope Chain
            </div>
            <div className="flex flex-col gap-2">
              {example.scopes.map((scope, i) => (
                <div
                  key={i}
                  className="rounded-lg border p-3 transition-all duration-300"
                  style={{
                    borderColor: `${scope.color}44`,
                    background: `${scope.color}08`,
                    marginLeft: `${i * 20}px`,
                  }}
                >
                  <div
                    className="font-[family-name:var(--font-mono)] text-[10px] font-semibold mb-1.5"
                    style={{ color: scope.color }}
                  >
                    {scope.name}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {scope.variables.map((v, j) => (
                      <span
                        key={j}
                        className="font-[family-name:var(--font-mono)] text-[10px] bg-bg-deep px-2 py-1 rounded"
                      >
                        <span style={{ color: scope.color }}>{v.name}</span>
                        <span className="text-text-muted"> = </span>
                        <span className="text-text-primary">
                          {v.name === "count" && activeExample === 0
                            ? String(counterValue)
                            : v.value}
                        </span>
                      </span>
                    ))}
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
            {activeExample === 0 && (
              <button
                onClick={handleCounterClick}
                className="w-full font-[family-name:var(--font-mono)] text-[12px] px-4 py-2.5 rounded-lg border border-accent-cyan text-accent-cyan bg-accent-cyan-dim cursor-pointer transition-all duration-200 hover:bg-[#00e5ff33]"
              >
                counter() 호출
              </button>
            )}
            {activeExample === 1 && (
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => addLog("wallet.deposit(500) → 1500")}
                  className="w-full font-[family-name:var(--font-mono)] text-[12px] px-4 py-2.5 rounded-lg border border-accent-green text-accent-green bg-accent-green-dim cursor-pointer transition-all duration-200 hover:bg-[#00e67633]"
                >
                  wallet.deposit(500)
                </button>
                <button
                  onClick={() => addLog("wallet.getBalance() → 1500")}
                  className="w-full font-[family-name:var(--font-mono)] text-[12px] px-4 py-2.5 rounded-lg border border-accent-amber text-accent-amber bg-accent-amber-dim cursor-pointer transition-all duration-200 hover:bg-[#ffb80033]"
                >
                  wallet.getBalance()
                </button>
                <button
                  onClick={() => addLog("wallet.balance → undefined ❌")}
                  className="w-full font-[family-name:var(--font-mono)] text-[12px] px-4 py-2.5 rounded-lg border border-accent-magenta text-accent-magenta bg-accent-magenta-dim cursor-pointer transition-all duration-200 hover:bg-[#ff2d8a33]"
                >
                  wallet.balance (직접 접근)
                </button>
              </div>
            )}
            {activeExample === 2 && (
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => {
                    setLogs([]);
                    addLog("// var 사용 (문제)");
                    addLog("→ 3, 3, 3");
                  }}
                  className="w-full font-[family-name:var(--font-mono)] text-[12px] px-4 py-2.5 rounded-lg border border-accent-magenta text-accent-magenta bg-accent-magenta-dim cursor-pointer transition-all duration-200 hover:bg-[#ff2d8a33]"
                >
                  var로 실행 (버그)
                </button>
                <button
                  onClick={() => {
                    setLogs([]);
                    addLog("// IIFE 클로저 사용");
                    addLog("→ 0, 1, 2 ✓");
                  }}
                  className="w-full font-[family-name:var(--font-mono)] text-[12px] px-4 py-2.5 rounded-lg border border-accent-green text-accent-green bg-accent-green-dim cursor-pointer transition-all duration-200 hover:bg-[#00e67633]"
                >
                  IIFE로 실행 (해결)
                </button>
                <button
                  onClick={() => {
                    setLogs([]);
                    addLog("// let 블록 스코프 사용");
                    addLog("→ 0, 1, 2 ✓");
                  }}
                  className="w-full font-[family-name:var(--font-mono)] text-[12px] px-4 py-2.5 rounded-lg border border-accent-cyan text-accent-cyan bg-accent-cyan-dim cursor-pointer transition-all duration-200 hover:bg-[#00e5ff33]"
                >
                  let으로 실행 (해결)
                </button>
              </div>
            )}
          </div>

          {/* Log */}
          <div className="flex-1 overflow-y-auto p-3 font-[family-name:var(--font-mono)] text-[11px] leading-relaxed">
            {logs.length === 0 ? (
              <div className="text-text-muted text-center px-4 py-8 text-xs leading-[1.8]">
                버튼을 클릭하여
                <br />
                클로저 동작을 확인하세요
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
