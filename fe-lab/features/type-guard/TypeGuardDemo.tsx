"use client";

import { useState, useCallback } from "react";
import { TYPE_GUARD_EXAMPLES } from "./constants";

export default function TypeGuardDemo() {
  const [activeExample, setActiveExample] = useState(0);
  const [narrowedType, setNarrowedType] = useState<string | null>(null);
  const [logs, setLogs] = useState<string[]>([]);

  const example = TYPE_GUARD_EXAMPLES[activeExample];

  const addLog = useCallback((text: string) => {
    setLogs((prev) => [...prev, text]);
  }, []);

  const handleExampleChange = (index: number) => {
    setActiveExample(index);
    setNarrowedType(null);
    setLogs([]);
  };

  const handleReset = () => {
    setNarrowedType(null);
    setLogs([]);
  };

  const handleGuardCheck = (inputLabel: string, resultType: string) => {
    setNarrowedType(resultType);
    addLog(`${example.guardMethod} 검사`);
    addLog(`입력: ${inputLabel}`);
    addLog(`→ 타입 좁히기: ${resultType}`);
  };

  return (
    <>
      {/* Toolbar */}
      <div className="flex items-center gap-0 border-b border-border-subtle bg-bg-elevated overflow-x-auto">
        {TYPE_GUARD_EXAMPLES.map((ex, i) => (
          <button
            key={ex.id}
            onClick={() => handleExampleChange(i)}
            className={`font-[family-name:var(--font-mono)] text-[11px] px-4 py-3 border-b-2 transition-all duration-200 cursor-pointer whitespace-nowrap ${
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
        {/* Left: Code + Type Narrowing Visualization */}
        <div className="p-6 flex flex-col gap-5">
          {/* Code */}
          <pre className="font-[family-name:var(--font-mono)] text-[12px] text-accent-cyan bg-bg-deep p-4 rounded-lg leading-[1.8] overflow-x-auto">
            {example.code}
          </pre>

          {/* Type Narrowing Visualization */}
          <div>
            <div className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted uppercase tracking-wider mb-3">
              Type Narrowing
            </div>
            <div className="flex items-center gap-3">
              {/* Before Guard */}
              <div
                className="flex-1 rounded-lg border p-3"
                style={{
                  borderColor: "#666",
                  background: "#ffffff08",
                }}
              >
                <div className="font-[family-name:var(--font-mono)] text-[10px] font-semibold mb-1 text-text-muted">
                  Before Guard
                </div>
                <div className="font-[family-name:var(--font-mono)] text-[11px] text-text-primary">
                  {example.beforeType}
                </div>
              </div>

              {/* Guard */}
              <div className="flex flex-col items-center gap-1">
                <div
                  className="font-[family-name:var(--font-mono)] text-[9px] px-2 py-1 rounded"
                  style={{
                    color: example.color,
                    background: `${example.color}22`,
                  }}
                >
                  guard
                </div>
                <div className="text-text-muted text-lg">→</div>
              </div>

              {/* After Guard */}
              <div
                className="flex-1 rounded-lg border p-3"
                style={{
                  borderColor: `${example.color}44`,
                  background: `${example.color}08`,
                }}
              >
                <div
                  className="font-[family-name:var(--font-mono)] text-[10px] font-semibold mb-1"
                  style={{ color: example.color }}
                >
                  After Guard
                </div>
                <div className="font-[family-name:var(--font-mono)] text-[11px] text-text-primary whitespace-pre-line">
                  {narrowedType ?? example.afterType}
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

          {/* Action buttons */}
          <div className="p-4 border-b border-border-subtle">
            {activeExample === 0 && (
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => handleGuardCheck('"hello" (string)', "string")}
                  className="w-full font-[family-name:var(--font-mono)] text-[12px] px-4 py-2.5 rounded-lg border border-accent-cyan text-accent-cyan bg-accent-cyan-dim cursor-pointer transition-all duration-200 hover:bg-[#00e5ff33]"
                >
                  format(&quot;hello&quot;)
                </button>
                <button
                  onClick={() => handleGuardCheck("3.14159 (number)", "number")}
                  className="w-full font-[family-name:var(--font-mono)] text-[12px] px-4 py-2.5 rounded-lg border border-accent-amber text-accent-amber bg-accent-amber-dim cursor-pointer transition-all duration-200 hover:bg-[#ffb80033]"
                >
                  format(3.14159)
                </button>
              </div>
            )}
            {activeExample === 1 && (
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => handleGuardCheck("new Dog()", "Dog → bark()")}
                  className="w-full font-[family-name:var(--font-mono)] text-[12px] px-4 py-2.5 rounded-lg border border-accent-violet text-accent-violet bg-accent-violet-dim cursor-pointer transition-all duration-200 hover:bg-[#b388ff33]"
                >
                  speak(new Dog())
                </button>
                <button
                  onClick={() => handleGuardCheck("new Cat()", "Cat → meow()")}
                  className="w-full font-[family-name:var(--font-mono)] text-[12px] px-4 py-2.5 rounded-lg border border-accent-green text-accent-green bg-accent-green-dim cursor-pointer transition-all duration-200 hover:bg-[#00e67633]"
                >
                  speak(new Cat())
                </button>
              </div>
            )}
            {activeExample === 2 && (
              <div className="flex flex-col gap-2">
                <button
                  onClick={() =>
                    handleGuardCheck("{ swim() }", "Fish → swim()")
                  }
                  className="w-full font-[family-name:var(--font-mono)] text-[12px] px-4 py-2.5 rounded-lg border border-accent-cyan text-accent-cyan bg-accent-cyan-dim cursor-pointer transition-all duration-200 hover:bg-[#00e5ff33]"
                >
                  move(fish)
                </button>
                <button
                  onClick={() => handleGuardCheck("{ fly() }", "Bird → fly()")}
                  className="w-full font-[family-name:var(--font-mono)] text-[12px] px-4 py-2.5 rounded-lg border border-accent-green text-accent-green bg-accent-green-dim cursor-pointer transition-all duration-200 hover:bg-[#00e67633]"
                >
                  move(bird)
                </button>
              </div>
            )}
            {activeExample === 3 && (
              <div className="flex flex-col gap-2">
                <button
                  onClick={() =>
                    handleGuardCheck('{ role: "admin" }', "Admin → permissions")
                  }
                  className="w-full font-[family-name:var(--font-mono)] text-[12px] px-4 py-2.5 rounded-lg border border-accent-amber text-accent-amber bg-accent-amber-dim cursor-pointer transition-all duration-200 hover:bg-[#ffb80033]"
                >
                  getInfo(admin)
                </button>
                <button
                  onClick={() =>
                    handleGuardCheck('{ role: "user" }', "User → email")
                  }
                  className="w-full font-[family-name:var(--font-mono)] text-[12px] px-4 py-2.5 rounded-lg border border-accent-magenta text-accent-magenta bg-accent-magenta-dim cursor-pointer transition-all duration-200 hover:bg-[#ff2d8a33]"
                >
                  getInfo(user)
                </button>
              </div>
            )}
            {activeExample === 4 && (
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => {
                    handleGuardCheck('{ kind: "circle" }', "circle → radius");
                    addLog("area = π × r²");
                  }}
                  className="w-full font-[family-name:var(--font-mono)] text-[12px] px-4 py-2.5 rounded-lg border border-accent-cyan text-accent-cyan bg-accent-cyan-dim cursor-pointer transition-all duration-200 hover:bg-[#00e5ff33]"
                >
                  area(circle)
                </button>
                <button
                  onClick={() => {
                    handleGuardCheck(
                      '{ kind: "rectangle" }',
                      "rectangle → w, h",
                    );
                    addLog("area = w × h");
                  }}
                  className="w-full font-[family-name:var(--font-mono)] text-[12px] px-4 py-2.5 rounded-lg border border-accent-amber text-accent-amber bg-accent-amber-dim cursor-pointer transition-all duration-200 hover:bg-[#ffb80033]"
                >
                  area(rectangle)
                </button>
                <button
                  onClick={() => {
                    handleGuardCheck(
                      '{ kind: "triangle" }',
                      "triangle → base, height",
                    );
                    addLog("area = (base × height) / 2");
                  }}
                  className="w-full font-[family-name:var(--font-mono)] text-[12px] px-4 py-2.5 rounded-lg border border-accent-magenta text-accent-magenta bg-accent-magenta-dim cursor-pointer transition-all duration-200 hover:bg-[#ff2d8a33]"
                >
                  area(triangle)
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
                타입 가드 동작을 확인하세요
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
