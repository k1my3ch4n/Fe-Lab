"use client";

import { useState, useRef } from "react";
import { REF_EXAMPLES } from "./constants";

export default function UseRefDemo() {
  const [activeExample, setActiveExample] = useState(0);
  const [stateCount, setStateCount] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [refDisplay, setRefDisplay] = useState(0);
  const [prevDisplay, setPrevDisplay] = useState<number | undefined>(undefined);
  const refCount = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState(0);

  const example = REF_EXAMPLES[activeExample];

  // stateCount가 변경될 때마다 렌더링이 발생하므로 stateCount 자체가 렌더 카운트
  const renderCount = stateCount;

  const addLog = (text: string) => {
    setLogs((prev) => [...prev, text]);
  };

  const handleReset = () => {
    setStateCount(0);
    refCount.current = 0;
    setRefDisplay(0);
    setInputValue(0);
    setPrevDisplay(undefined);
    setLogs([]);
  };

  const handleExampleChange = (index: number) => {
    setActiveExample(index);
    handleReset();
  };

  return (
    <>
      {/* Toolbar */}
      <div className="flex items-center gap-0 border-b border-border-subtle bg-bg-elevated">
        {REF_EXAMPLES.map((ex, i) => (
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
        {/* Left: Code + Visualization */}
        <div className="p-6 flex flex-col gap-5">
          {/* Description */}
          <div className="text-sm text-text-secondary leading-[1.8]">
            {example.description}
          </div>

          {/* Code */}
          <pre className="font-[family-name:var(--font-mono)] text-[12px] text-accent-cyan bg-bg-deep p-4 rounded-lg leading-[1.8] overflow-x-auto">
            {example.code}
          </pre>

          {/* Visualization */}
          {activeExample === 0 && (
            <div>
              <div className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted uppercase tracking-wider mb-3">
                Value Comparison
              </div>
              <div className="flex gap-4">
                <div
                  className="flex-1 rounded-lg border p-3"
                  style={{ borderColor: "#00e5ff44", background: "#00e5ff08" }}
                >
                  <div className="font-[family-name:var(--font-mono)] text-[10px] font-semibold text-accent-cyan mb-1">
                    useState
                  </div>
                  <div className="font-[family-name:var(--font-mono)] text-[24px] font-bold text-accent-cyan">
                    {stateCount}
                  </div>
                  <div className="font-[family-name:var(--font-mono)] text-[9px] text-text-muted mt-1">
                    렌더링 횟수: {renderCount}
                  </div>
                </div>
                <div
                  className="flex-1 rounded-lg border p-3"
                  style={{ borderColor: "#b388ff44", background: "#b388ff08" }}
                >
                  <div
                    className="font-[family-name:var(--font-mono)] text-[10px] font-semibold mb-1"
                    style={{ color: "#b388ff" }}
                  >
                    useRef
                  </div>
                  <div
                    className="font-[family-name:var(--font-mono)] text-[24px] font-bold"
                    style={{ color: "#b388ff" }}
                  >
                    {refDisplay}
                  </div>
                  <div className="font-[family-name:var(--font-mono)] text-[9px] text-text-muted mt-1">
                    리렌더링 없음
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeExample === 1 && (
            <div>
              <div className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted uppercase tracking-wider mb-3">
                DOM Reference
              </div>
              <div
                className="rounded-lg border p-4"
                style={{ borderColor: "#00e67644", background: "#00e67608" }}
              >
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="useRef로 포커스 대상"
                  className="w-full bg-bg-deep text-text-primary font-[family-name:var(--font-mono)] text-[12px] px-3 py-2 rounded border border-border-subtle outline-none focus:border-accent-cyan transition-colors"
                />
              </div>
            </div>
          )}

          {activeExample === 2 && (
            <div>
              <div className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted uppercase tracking-wider mb-3">
                Previous Value Tracking
              </div>
              <div className="flex gap-4">
                <div
                  className="flex-1 rounded-lg border p-3"
                  style={{ borderColor: "#00e5ff44", background: "#00e5ff08" }}
                >
                  <div className="font-[family-name:var(--font-mono)] text-[10px] font-semibold text-accent-cyan mb-1">
                    현재 값
                  </div>
                  <div className="font-[family-name:var(--font-mono)] text-[24px] font-bold text-accent-cyan">
                    {inputValue}
                  </div>
                </div>
                <div
                  className="flex-1 rounded-lg border p-3"
                  style={{ borderColor: "#ffb80044", background: "#ffb80008" }}
                >
                  <div className="font-[family-name:var(--font-mono)] text-[10px] font-semibold text-accent-amber mb-1">
                    이전 값 (ref)
                  </div>
                  <div className="font-[family-name:var(--font-mono)] text-[24px] font-bold text-accent-amber">
                    {prevDisplay ?? "—"}
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

          <div className="p-4 border-b border-border-subtle flex flex-col gap-2">
            {activeExample === 0 && (
              <>
                <button
                  onClick={() => {
                    setStateCount((c) => c + 1);
                    addLog(`setState → ${stateCount + 1} (리렌더링 O)`);
                  }}
                  className="w-full font-[family-name:var(--font-mono)] text-[12px] px-4 py-2.5 rounded-lg border border-accent-cyan text-accent-cyan bg-accent-cyan-dim cursor-pointer transition-all duration-200 hover:bg-[#00e5ff33]"
                >
                  setState +1
                </button>
                <button
                  onClick={() => {
                    refCount.current += 1;
                    addLog(`ref.current → ${refCount.current} (리렌더링 X)`);
                  }}
                  className="w-full font-[family-name:var(--font-mono)] text-[12px] px-4 py-2.5 rounded-lg border text-[#b388ff] bg-[#b388ff11] cursor-pointer transition-all duration-200 hover:bg-[#b388ff33]"
                  style={{ borderColor: "#b388ff" }}
                >
                  ref.current +1
                </button>
              </>
            )}
            {activeExample === 1 && (
              <>
                <button
                  onClick={() => {
                    inputRef.current?.focus();
                    addLog("inputRef.current.focus()");
                  }}
                  className="w-full font-[family-name:var(--font-mono)] text-[12px] px-4 py-2.5 rounded-lg border border-accent-green text-accent-green bg-accent-green-dim cursor-pointer transition-all duration-200 hover:bg-[#00e67633]"
                >
                  focus()
                </button>
                <button
                  onClick={() => {
                    inputRef.current?.blur();
                    addLog("inputRef.current.blur()");
                  }}
                  className="w-full font-[family-name:var(--font-mono)] text-[12px] px-4 py-2.5 rounded-lg border border-accent-amber text-accent-amber bg-accent-amber-dim cursor-pointer transition-all duration-200 hover:bg-[#ffb80033]"
                >
                  blur()
                </button>
              </>
            )}
            {activeExample === 2 && (
              <>
                <button
                  onClick={() => {
                    const next = inputValue + 1;
                    addLog(
                      `값 변경: ${inputValue} → ${next} (이전 값: ${prevDisplay ?? "없음"})`,
                    );
                    setPrevDisplay(inputValue);
                    setInputValue(next);
                  }}
                  className="w-full font-[family-name:var(--font-mono)] text-[12px] px-4 py-2.5 rounded-lg border border-accent-cyan text-accent-cyan bg-accent-cyan-dim cursor-pointer transition-all duration-200 hover:bg-[#00e5ff33]"
                >
                  값 +1
                </button>
                <button
                  onClick={() => {
                    const next = inputValue + 10;
                    addLog(
                      `값 변경: ${inputValue} → ${next} (이전 값: ${prevDisplay ?? "없음"})`,
                    );
                    setPrevDisplay(inputValue);
                    setInputValue(next);
                  }}
                  className="w-full font-[family-name:var(--font-mono)] text-[12px] px-4 py-2.5 rounded-lg border border-accent-amber text-accent-amber bg-accent-amber-dim cursor-pointer transition-all duration-200 hover:bg-[#ffb80033]"
                >
                  값 +10
                </button>
              </>
            )}
          </div>

          {/* Log */}
          <div className="flex-1 overflow-y-auto p-3 font-[family-name:var(--font-mono)] text-[11px] leading-relaxed">
            {logs.length === 0 ? (
              <div className="text-text-muted text-center px-4 py-8 text-xs leading-[1.8]">
                버튼을 클릭하여
                <br />
                useRef 동작을 확인하세요
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
