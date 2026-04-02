"use client";

import { useState } from "react";
import { MEMO_EXAMPLES } from "./constants";

interface RenderLog {
  component: string;
  reason: string;
  color: string;
}

export default function ReactMemoDemo() {
  const [activeExample, setActiveExample] = useState(0);
  const [parentCount, setParentCount] = useState(0);
  const [renderLogs, setRenderLogs] = useState<RenderLog[]>([]);

  const example = MEMO_EXAMPLES[activeExample];

  const handleParentRender = () => {
    setParentCount((c) => c + 1);
    const newLog: RenderLog = {
      component: "Parent",
      reason: "state 변경",
      color: "#00e5ff",
    };

    if (activeExample === 0) {
      setRenderLogs((prev) => [
        ...prev,
        newLog,
        {
          component: "Child",
          reason: "부모 리렌더링 (props 변경 없음)",
          color: "#ff2d8a",
        },
      ]);
    } else if (activeExample === 1) {
      setRenderLogs((prev) => [
        ...prev,
        newLog,
        {
          component: "MemoChild",
          reason: "SKIP — props 동일",
          color: "#00e676",
        },
      ]);
    } else {
      setRenderLogs((prev) => [
        ...prev,
        newLog,
        {
          component: "MemoChild",
          reason: "리렌더링 — 새 객체 참조",
          color: "#ffb800",
        },
      ]);
    }
  };

  const handleReset = () => {
    setParentCount(0);
    setRenderLogs([]);
  };

  const handleExampleChange = (index: number) => {
    setActiveExample(index);
    handleReset();
  };

  return (
    <>
      {/* Toolbar */}
      <div className="flex items-center gap-0 border-b border-border-subtle bg-bg-elevated">
        {MEMO_EXAMPLES.map((ex, i) => (
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
        {/* Left: Code + Render Visualization */}
        <div className="p-6 flex flex-col gap-5">
          {/* Description */}
          <div className="text-sm text-text-secondary leading-[1.8]">
            {example.description}
          </div>

          {/* Code */}
          <pre className="font-[family-name:var(--font-mono)] text-[12px] text-accent-cyan bg-bg-deep p-4 rounded-lg leading-[1.8] overflow-x-auto">
            {example.code}
          </pre>

          {/* Render Counter Visualization */}
          <div>
            <div className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted uppercase tracking-wider mb-3">
              Render Count
            </div>
            <div className="flex gap-4">
              <div
                className="flex-1 rounded-lg border p-3"
                style={{ borderColor: "#00e5ff44", background: "#00e5ff08" }}
              >
                <div className="font-[family-name:var(--font-mono)] text-[10px] font-semibold text-accent-cyan mb-1">
                  Parent
                </div>
                <div className="font-[family-name:var(--font-mono)] text-[24px] font-bold text-accent-cyan">
                  {parentCount}
                </div>
              </div>
              <div
                className="flex-1 rounded-lg border p-3"
                style={{
                  borderColor: activeExample === 1 ? "#00e67644" : "#ff2d8a44",
                  background: activeExample === 1 ? "#00e67608" : "#ff2d8a08",
                }}
              >
                <div
                  className="font-[family-name:var(--font-mono)] text-[10px] font-semibold mb-1"
                  style={{
                    color: activeExample === 1 ? "#00e676" : "#ff2d8a",
                  }}
                >
                  Child
                </div>
                <div
                  className="font-[family-name:var(--font-mono)] text-[24px] font-bold"
                  style={{
                    color: activeExample === 1 ? "#00e676" : "#ff2d8a",
                  }}
                >
                  {activeExample === 1 ? 0 : parentCount}
                </div>
              </div>
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

          <div className="p-4 border-b border-border-subtle">
            <button
              onClick={handleParentRender}
              className="w-full font-[family-name:var(--font-mono)] text-[12px] px-4 py-2.5 rounded-lg border border-accent-cyan text-accent-cyan bg-accent-cyan-dim cursor-pointer transition-all duration-200 hover:bg-[#00e5ff33]"
            >
              Parent 리렌더링 트리거
            </button>
          </div>

          {/* Render Log */}
          <div className="flex-1 overflow-y-auto p-3 font-[family-name:var(--font-mono)] text-[11px] leading-relaxed">
            {renderLogs.length === 0 ? (
              <div className="text-text-muted text-center px-4 py-8 text-xs leading-[1.8]">
                버튼을 클릭하여
                <br />
                리렌더링 동작을 확인하세요
              </div>
            ) : (
              renderLogs.map((log, i) => (
                <div
                  key={i}
                  className="px-2 py-1 rounded mb-0.5 animate-[logSlide_0.3s_ease]"
                  style={{ color: log.color }}
                >
                  [{log.component}] {log.reason}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}
