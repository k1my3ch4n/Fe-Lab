"use client";

import { useState, useCallback, useRef } from "react";
import {
  PROMISE_METHODS,
  STATE_COLORS,
  DEFAULT_PROMISES,
  type PromiseState,
  type PromiseItem,
} from "./constants";

export default function PromiseDemo() {
  const [activeTab, setActiveTab] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [promises, setPromises] = useState<PromiseItem[]>(
    DEFAULT_PROMISES.map((p) => ({ ...p, state: "pending" as PromiseState })),
  );
  const [isRunning, setIsRunning] = useState(false);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const method = PROMISE_METHODS[activeTab];

  const addLog = useCallback((text: string) => {
    setLogs((prev) => [...prev, text]);
  }, []);

  const handleReset = () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    setLogs([]);
    setIsRunning(false);
    setPromises(
      DEFAULT_PROMISES.map((p) => ({ ...p, state: "pending" as PromiseState })),
    );
  };

  const handleTabChange = (index: number) => {
    handleReset();
    setActiveTab(index);
  };

  const runSimulation = () => {
    handleReset();
    setIsRunning(true);

    const newPromises = DEFAULT_PROMISES.map((p) => ({
      ...p,
      state: "pending" as PromiseState,
    }));
    setPromises(newPromises);

    addLog("// 시뮬레이션 시작...");

    DEFAULT_PROMISES.forEach((p, i) => {
      const timer = setTimeout(() => {
        const state: PromiseState = p.shouldReject ? "rejected" : "fulfilled";
        const value = p.shouldReject
          ? `Error: ${p.label} 실패`
          : `${p.label} 완료`;

        setPromises((prev) =>
          prev.map((item, idx) =>
            idx === i ? { ...item, state, value } : item,
          ),
        );

        addLog(
          `${p.label} → ${state === "fulfilled" ? "✓ fulfilled" : "✗ rejected"} (${p.delay}ms)`,
        );

        // Check method result after all settle
        if (i === DEFAULT_PROMISES.length - 1 || (activeTab === 2 && i === 0)) {
          const resultTimer = setTimeout(() => {
            if (activeTab === 1) {
              addLog("→ Promise.all: ✗ rejected (C가 실패)");
            } else if (activeTab === 2) {
              addLog(
                `→ Promise.race: 결과 = '${DEFAULT_PROMISES[0].label} 완료' (가장 빠름)`,
              );
            } else if (activeTab === 3) {
              addLog("→ Promise.allSettled: [fulfilled, fulfilled, rejected]");
            } else if (activeTab === 4) {
              addLog(
                `→ Promise.any: '${DEFAULT_PROMISES[0].label} 완료' (첫 성공)`,
              );
            }
            setIsRunning(false);
          }, 500);
          timersRef.current.push(resultTimer);
        }
      }, p.delay);
      timersRef.current.push(timer);
    });
  };

  return (
    <>
      {/* Toolbar */}
      <div className="flex items-center gap-0 border-b border-border-subtle bg-bg-elevated overflow-x-auto">
        {PROMISE_METHODS.map((m, i) => (
          <button
            key={m.id}
            onClick={() => handleTabChange(i)}
            className={`font-[family-name:var(--font-mono)] text-[11px] px-4 py-3 border-b-2 transition-all duration-200 cursor-pointer whitespace-nowrap ${
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
        {/* Left: Code + State Visualization */}
        <div className="p-6 flex flex-col gap-5">
          {/* Code */}
          <pre className="font-[family-name:var(--font-mono)] text-[12px] text-accent-cyan bg-bg-deep p-4 rounded-lg leading-[1.8] overflow-x-auto">
            {method.code}
          </pre>

          {/* Promise State Visualization */}
          {activeTab > 0 && (
            <div>
              <div className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted uppercase tracking-wider mb-3">
                Promise States
              </div>
              <div className="flex flex-col gap-2">
                {promises.map((p) => (
                  <div
                    key={p.id}
                    className="rounded-lg border p-3 transition-all duration-500 flex items-center justify-between"
                    style={{
                      borderColor: `${STATE_COLORS[p.state]}44`,
                      background: `${STATE_COLORS[p.state]}08`,
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-2 h-2 rounded-full transition-all duration-500"
                        style={{
                          backgroundColor: STATE_COLORS[p.state],
                          boxShadow:
                            p.state !== "pending"
                              ? `0 0 8px ${STATE_COLORS[p.state]}66`
                              : "none",
                        }}
                      />
                      <span className="font-[family-name:var(--font-mono)] text-[11px] text-text-primary">
                        {p.label}
                      </span>
                      <span className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted">
                        ({p.delay}ms)
                      </span>
                    </div>
                    <span
                      className="font-[family-name:var(--font-mono)] text-[10px] font-semibold"
                      style={{ color: STATE_COLORS[p.state] }}
                    >
                      {p.state}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* State Transition Diagram for basic tab */}
          {activeTab === 0 && (
            <div>
              <div className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted uppercase tracking-wider mb-3">
                State Transition
              </div>
              <div className="flex items-center gap-4 p-4 bg-bg-deep rounded-lg">
                <div className="flex flex-col items-center gap-1">
                  <div className="w-20 h-10 rounded-lg border border-[#ffb80044] bg-[#ffb80008] flex items-center justify-center">
                    <span className="font-[family-name:var(--font-mono)] text-[11px] text-accent-amber">
                      pending
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-6">
                  <div className="flex items-center gap-2">
                    <span className="text-text-muted text-xs">→ resolve()</span>
                    <div className="w-24 h-10 rounded-lg border border-[#00e67644] bg-[#00e67608] flex items-center justify-center">
                      <span className="font-[family-name:var(--font-mono)] text-[11px] text-accent-green">
                        fulfilled
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-text-muted text-xs">
                      → reject() &nbsp;
                    </span>
                    <div className="w-24 h-10 rounded-lg border border-[#ff2d8a44] bg-[#ff2d8a08] flex items-center justify-center">
                      <span className="font-[family-name:var(--font-mono)] text-[11px] text-accent-magenta">
                        rejected
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
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
            {activeTab === 0 && (
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => {
                    setLogs([]);
                    addLog("new Promise(resolve => ...)");
                    setTimeout(
                      () => addLog("→ resolve('성공!') → fulfilled"),
                      1000,
                    );
                    setTimeout(() => addLog(".then(v => '성공!')"), 1200);
                  }}
                  className="w-full font-[family-name:var(--font-mono)] text-[12px] px-4 py-2.5 rounded-lg border border-accent-green text-accent-green bg-accent-green-dim cursor-pointer transition-all duration-200 hover:bg-[#00e67633]"
                >
                  resolve() 실행
                </button>
                <button
                  onClick={() => {
                    setLogs([]);
                    addLog("new Promise((_, reject) => ...)");
                    setTimeout(
                      () => addLog("→ reject('실패!') → rejected"),
                      1000,
                    );
                    setTimeout(() => addLog(".catch(e => '실패!')"), 1200);
                  }}
                  className="w-full font-[family-name:var(--font-mono)] text-[12px] px-4 py-2.5 rounded-lg border border-accent-magenta text-accent-magenta bg-accent-magenta-dim cursor-pointer transition-all duration-200 hover:bg-[#ff2d8a33]"
                >
                  reject() 실행
                </button>
              </div>
            )}
            {activeTab > 0 && (
              <button
                onClick={runSimulation}
                disabled={isRunning}
                className={`w-full font-[family-name:var(--font-mono)] text-[12px] px-4 py-2.5 rounded-lg border transition-all duration-200 ${
                  isRunning
                    ? "border-border-subtle text-text-muted bg-bg-surface cursor-not-allowed"
                    : "border-accent-cyan text-accent-cyan bg-accent-cyan-dim cursor-pointer hover:bg-[#00e5ff33]"
                }`}
              >
                {isRunning ? "실행 중..." : `${method.label} 시뮬레이션`}
              </button>
            )}
          </div>

          {/* Description */}
          <div className="p-4 border-b border-border-subtle">
            <div className="text-[11px] text-text-secondary leading-[1.8]">
              {method.description}
            </div>
          </div>

          {/* Log */}
          <div className="flex-1 overflow-y-auto p-3 font-[family-name:var(--font-mono)] text-[11px] leading-relaxed">
            {logs.length === 0 ? (
              <div className="text-text-muted text-center px-4 py-8 text-xs leading-[1.8]">
                버튼을 클릭하여
                <br />
                Promise 동작을 확인하세요
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
