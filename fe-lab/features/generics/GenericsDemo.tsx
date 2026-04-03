"use client";

import { useState, useCallback } from "react";
import { GENERIC_EXAMPLES, UTILITY_TYPE_MAP } from "./constants";

export default function GenericsDemo() {
  const [activeExample, setActiveExample] = useState(0);
  const [resolvedType, setResolvedType] = useState<string | null>(null);
  const [logs, setLogs] = useState<string[]>([]);

  const example = GENERIC_EXAMPLES[activeExample];

  const addLog = useCallback((text: string) => {
    setLogs((prev) => [...prev, text]);
  }, []);

  const handleExampleChange = (index: number) => {
    setActiveExample(index);
    setResolvedType(null);
    setLogs([]);
  };

  const handleReset = () => {
    setResolvedType(null);
    setLogs([]);
  };

  const handleTypeCall = (typeArg: string) => {
    setResolvedType(typeArg);
    addLog(`identity<${typeArg}>(value) → ${typeArg}`);
  };

  const handleUtilityApply = (utilName: string) => {
    addLog(`${utilName} 적용됨`);
    addLog(`입력: ${example.inputType}`);
    addLog(`출력: ${example.outputType}`);
  };

  return (
    <>
      {/* Toolbar */}
      <div className="flex items-center gap-0 border-b border-border-subtle bg-bg-elevated overflow-x-auto">
        {GENERIC_EXAMPLES.map((ex, i) => (
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
        {/* Left: Code + Type Visualization */}
        <div className="p-6 flex flex-col gap-5">
          {/* Code */}
          <pre className="font-[family-name:var(--font-mono)] text-[12px] text-accent-cyan bg-bg-deep p-4 rounded-lg leading-[1.8] overflow-x-auto">
            {example.code}
          </pre>

          {/* Type Transformation Visualization */}
          <div>
            <div className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted uppercase tracking-wider mb-3">
              Type Transformation
            </div>
            <div className="flex items-center gap-3">
              {/* Input Type */}
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
                  Input Type
                </div>
                <div className="font-[family-name:var(--font-mono)] text-[11px] text-text-primary">
                  {example.inputType}
                </div>
              </div>

              {/* Arrow */}
              <div className="text-text-muted text-lg">→</div>

              {/* Output Type */}
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
                  Output Type
                </div>
                <div className="font-[family-name:var(--font-mono)] text-[11px] text-text-primary">
                  {resolvedType ?? example.outputType}
                </div>
              </div>
            </div>
          </div>

          {/* Utility Type Map */}
          {activeExample === 1 || activeExample === 2 || activeExample === 3 ? (
            <div>
              <div className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted uppercase tracking-wider mb-3">
                Utility Types
              </div>
              <div className="grid grid-cols-2 gap-2">
                {UTILITY_TYPE_MAP.map((ut) => (
                  <div
                    key={ut.name}
                    className="rounded border px-3 py-2 flex items-center justify-between"
                    style={{
                      borderColor: `${ut.color}33`,
                      background: `${ut.color}08`,
                    }}
                  >
                    <span
                      className="font-[family-name:var(--font-mono)] text-[10px] font-semibold"
                      style={{ color: ut.color }}
                    >
                      {ut.name}
                    </span>
                    <span className="font-[family-name:var(--font-mono)] text-[9px] text-text-muted">
                      {ut.desc}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
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
                  onClick={() => handleTypeCall("string")}
                  className="w-full font-[family-name:var(--font-mono)] text-[12px] px-4 py-2.5 rounded-lg border border-accent-cyan text-accent-cyan bg-accent-cyan-dim cursor-pointer transition-all duration-200 hover:bg-[#00e5ff33]"
                >
                  identity&lt;string&gt;()
                </button>
                <button
                  onClick={() => handleTypeCall("number")}
                  className="w-full font-[family-name:var(--font-mono)] text-[12px] px-4 py-2.5 rounded-lg border border-accent-amber text-accent-amber bg-accent-amber-dim cursor-pointer transition-all duration-200 hover:bg-[#ffb80033]"
                >
                  identity&lt;number&gt;()
                </button>
                <button
                  onClick={() => handleTypeCall("boolean")}
                  className="w-full font-[family-name:var(--font-mono)] text-[12px] px-4 py-2.5 rounded-lg border border-accent-green text-accent-green bg-accent-green-dim cursor-pointer transition-all duration-200 hover:bg-[#00e67633]"
                >
                  identity&lt;boolean&gt;()
                </button>
              </div>
            )}
            {activeExample === 1 && (
              <button
                onClick={() => handleUtilityApply("Partial<User>")}
                className="w-full font-[family-name:var(--font-mono)] text-[12px] px-4 py-2.5 rounded-lg border border-accent-violet text-accent-violet bg-accent-violet-dim cursor-pointer transition-all duration-200 hover:bg-[#b388ff33]"
              >
                Partial&lt;User&gt; 적용
              </button>
            )}
            {activeExample === 2 && (
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => {
                    addLog('Pick<User, "name" | "email">');
                    addLog("→ { name: string; email: string }");
                  }}
                  className="w-full font-[family-name:var(--font-mono)] text-[12px] px-4 py-2.5 rounded-lg border border-accent-green text-accent-green bg-accent-green-dim cursor-pointer transition-all duration-200 hover:bg-[#00e67633]"
                >
                  Pick 적용
                </button>
                <button
                  onClick={() => {
                    addLog('Omit<User, "password">');
                    addLog("→ { name: string; age: number; email: string }");
                  }}
                  className="w-full font-[family-name:var(--font-mono)] text-[12px] px-4 py-2.5 rounded-lg border border-accent-magenta text-accent-magenta bg-accent-magenta-dim cursor-pointer transition-all duration-200 hover:bg-[#ff2d8a33]"
                >
                  Omit 적용
                </button>
              </div>
            )}
            {activeExample === 3 && (
              <button
                onClick={() => {
                  addLog("Record<Status, string> 적용");
                  addLog(
                    "→ { loading: string; success: string; error: string }",
                  );
                }}
                className="w-full font-[family-name:var(--font-mono)] text-[12px] px-4 py-2.5 rounded-lg border border-accent-amber text-accent-amber bg-accent-amber-dim cursor-pointer transition-all duration-200 hover:bg-[#ffb80033]"
              >
                Record 적용
              </button>
            )}
            {activeExample === 4 && (
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => {
                    addLog('IsString<string> → "yes"');
                    addLog('string extends string ? ✓ → "yes"');
                  }}
                  className="w-full font-[family-name:var(--font-mono)] text-[12px] px-4 py-2.5 rounded-lg border border-accent-cyan text-accent-cyan bg-accent-cyan-dim cursor-pointer transition-all duration-200 hover:bg-[#00e5ff33]"
                >
                  IsString&lt;string&gt;
                </button>
                <button
                  onClick={() => {
                    addLog('IsString<number> → "no"');
                    addLog('number extends string ? ✗ → "no"');
                  }}
                  className="w-full font-[family-name:var(--font-mono)] text-[12px] px-4 py-2.5 rounded-lg border border-accent-magenta text-accent-magenta bg-accent-magenta-dim cursor-pointer transition-all duration-200 hover:bg-[#ff2d8a33]"
                >
                  IsString&lt;number&gt;
                </button>
                <button
                  onClick={() => {
                    addLog("ReturnType<() => number>");
                    addLog("infer R → number");
                  }}
                  className="w-full font-[family-name:var(--font-mono)] text-[12px] px-4 py-2.5 rounded-lg border border-accent-amber text-accent-amber bg-accent-amber-dim cursor-pointer transition-all duration-200 hover:bg-[#ffb80033]"
                >
                  ReturnType 추론
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
                제네릭 타입 동작을 확인하세요
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
