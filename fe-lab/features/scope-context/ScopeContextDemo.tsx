"use client";

import { useState, useCallback } from "react";
import { BINDING_EXAMPLES, SCOPE_CHAIN_LEVELS } from "./constants";

export default function ScopeContextDemo() {
  const [activeTab, setActiveTab] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [highlightedScope, setHighlightedScope] = useState<number | null>(null);

  const example = BINDING_EXAMPLES[activeTab];

  const addLog = useCallback((text: string) => {
    setLogs((prev) => [...prev, text]);
  }, []);

  const handleReset = () => {
    setLogs([]);
    setHighlightedScope(null);
  };

  const handleTabChange = (index: number) => {
    setActiveTab(index);
    setLogs([]);
    setHighlightedScope(null);
  };

  return (
    <>
      {/* Toolbar */}
      <div className="flex items-center gap-0 border-b border-border-subtle bg-bg-elevated">
        {BINDING_EXAMPLES.map((ex, i) => (
          <button
            key={ex.id}
            onClick={() => handleTabChange(i)}
            className={`font-[family-name:var(--font-mono)] text-[11px] px-4 py-3 border-b-2 transition-all duration-200 cursor-pointer ${
              i === activeTab
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

          {/* this Value Indicator */}
          <div className="flex items-center gap-3 p-3 rounded-lg border border-border-subtle bg-bg-surface">
            <span className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted uppercase tracking-wider">
              this →
            </span>
            <span
              className="font-[family-name:var(--font-mono)] text-[12px] font-semibold"
              style={{ color: example.color }}
            >
              {example.thisValue}
            </span>
          </div>

          {/* Scope Chain Animation */}
          {activeTab === 3 ? null : (
            <div>
              <div className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted uppercase tracking-wider mb-3">
                Scope Chain
              </div>
              <div className="flex flex-col gap-2">
                {SCOPE_CHAIN_LEVELS.map((scope, i) => (
                  <div
                    key={i}
                    onMouseEnter={() => setHighlightedScope(i)}
                    onMouseLeave={() => setHighlightedScope(null)}
                    className="rounded-lg border p-3 transition-all duration-300 cursor-pointer"
                    style={{
                      borderColor:
                        highlightedScope === i
                          ? `${scope.color}88`
                          : `${scope.color}44`,
                      background:
                        highlightedScope === i
                          ? `${scope.color}18`
                          : `${scope.color}08`,
                      marginLeft: `${i * 20}px`,
                      transform:
                        highlightedScope === i ? "scale(1.02)" : "scale(1)",
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
                          <span className="text-text-primary">{v.value}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
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
                  onClick={() => addLog("obj.greet() → 'Kim'  // this === obj")}
                  className="w-full font-[family-name:var(--font-mono)] text-[12px] px-4 py-2.5 rounded-lg border border-accent-cyan text-accent-cyan bg-accent-cyan-dim cursor-pointer transition-all duration-200 hover:bg-[#00e5ff33]"
                >
                  obj.greet() 호출
                </button>
                <button
                  onClick={() =>
                    addLog("fn() → undefined  // this === window/undefined")
                  }
                  className="w-full font-[family-name:var(--font-mono)] text-[12px] px-4 py-2.5 rounded-lg border border-accent-magenta text-accent-magenta bg-accent-magenta-dim cursor-pointer transition-all duration-200 hover:bg-[#ff2d8a33]"
                >
                  fn() 단독 호출
                </button>
              </div>
            )}
            {activeTab === 1 && (
              <div className="flex flex-col gap-2">
                <button
                  onClick={() =>
                    addLog("obj.greet() → undefined  // 화살표 함수: 상위 this")
                  }
                  className="w-full font-[family-name:var(--font-mono)] text-[12px] px-4 py-2.5 rounded-lg border border-accent-magenta text-accent-magenta bg-accent-magenta-dim cursor-pointer transition-all duration-200 hover:bg-[#ff2d8a33]"
                >
                  obj.greet() (화살표)
                </button>
                <button
                  onClick={() =>
                    addLog("obj.delayGreet() → 'Kim'  // 콜백이 this 상속")
                  }
                  className="w-full font-[family-name:var(--font-mono)] text-[12px] px-4 py-2.5 rounded-lg border border-accent-green text-accent-green bg-accent-green-dim cursor-pointer transition-all duration-200 hover:bg-[#00e67633]"
                >
                  obj.delayGreet() (화살표 콜백)
                </button>
              </div>
            )}
            {activeTab === 2 && (
              <div className="flex flex-col gap-2">
                <button
                  onClick={() =>
                    addLog("introduce.call(user, 'Hello', '!') → 'Hello, Kim!'")
                  }
                  className="w-full font-[family-name:var(--font-mono)] text-[12px] px-4 py-2.5 rounded-lg border border-accent-cyan text-accent-cyan bg-accent-cyan-dim cursor-pointer transition-all duration-200 hover:bg-[#00e5ff33]"
                >
                  call() 실행
                </button>
                <button
                  onClick={() =>
                    addLog("introduce.apply(user, ['Hi', '.']) → 'Hi, Kim.'")
                  }
                  className="w-full font-[family-name:var(--font-mono)] text-[12px] px-4 py-2.5 rounded-lg border border-accent-amber text-accent-amber bg-accent-amber-dim cursor-pointer transition-all duration-200 hover:bg-[#ffb80033]"
                >
                  apply() 실행
                </button>
                <button
                  onClick={() =>
                    addLog("boundFn('~') → 'Hey, Kim~'  // bind로 this 고정")
                  }
                  className="w-full font-[family-name:var(--font-mono)] text-[12px] px-4 py-2.5 rounded-lg border border-accent-green text-accent-green bg-accent-green-dim cursor-pointer transition-all duration-200 hover:bg-[#00e67633]"
                >
                  bind() 후 호출
                </button>
              </div>
            )}
            {activeTab === 3 && (
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => {
                    setLogs([]);
                    addLog("// IIFE 실행");
                    addLog("secret = 'hidden'");
                    addLog("// 외부에서 접근 불가 → ReferenceError");
                  }}
                  className="w-full font-[family-name:var(--font-mono)] text-[12px] px-4 py-2.5 rounded-lg border border-accent-violet text-accent-violet bg-accent-violet-dim cursor-pointer transition-all duration-200 hover:bg-[#b388ff33]"
                >
                  IIFE 실행
                </button>
                <button
                  onClick={() => {
                    setLogs([]);
                    addLog("module.increment() → 1");
                    addLog("module.increment() → 2");
                    addLog("module.getCount() → 2");
                  }}
                  className="w-full font-[family-name:var(--font-mono)] text-[12px] px-4 py-2.5 rounded-lg border border-accent-amber text-accent-amber bg-accent-amber-dim cursor-pointer transition-all duration-200 hover:bg-[#ffb80033]"
                >
                  모듈 패턴 실행
                </button>
              </div>
            )}
          </div>

          {/* Explanation */}
          <div className="p-4 border-b border-border-subtle">
            <div className="text-[11px] text-text-secondary leading-[1.8]">
              {example.explanation}
            </div>
          </div>

          {/* Log */}
          <div className="flex-1 overflow-y-auto p-3 font-[family-name:var(--font-mono)] text-[11px] leading-relaxed">
            {logs.length === 0 ? (
              <div className="text-text-muted text-center px-4 py-8 text-xs leading-[1.8]">
                버튼을 클릭하여
                <br />
                this 바인딩을 확인하세요
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
