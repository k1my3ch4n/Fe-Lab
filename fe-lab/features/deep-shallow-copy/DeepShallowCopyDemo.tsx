"use client";

import { useState, useCallback } from "react";
import { COPY_METHODS, ORIGINAL_OBJECT } from "./constants";

export default function DeepShallowCopyDemo() {
  const [activeTab, setActiveTab] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [mutated, setMutated] = useState<Record<string, boolean>>({});

  const method = COPY_METHODS[activeTab];

  const addLog = useCallback((text: string) => {
    setLogs((prev) => [...prev, text]);
  }, []);

  const handleReset = () => {
    setLogs([]);
    setMutated({});
  };

  const handleTabChange = (index: number) => {
    setActiveTab(index);
    setLogs([]);
    setMutated({});
  };

  const simulatePrimitiveMutation = () => {
    addLog("copy.name = 'Lee'");
    addLog("→ 원본 name: 'Kim' (영향 없음) ✓");
    addLog("→ 복사본 name: 'Lee'");
    setMutated((prev) => ({ ...prev, primitive: true }));
  };

  const simulateReferenceMutation = () => {
    const isDeep = method.isDeep;

    addLog("copy.address.city = 'Busan'");

    if (isDeep) {
      addLog("→ 원본 address.city: 'Seoul' (영향 없음) ✓");
      addLog("→ 복사본 address.city: 'Busan'");
      addLog(`// ${method.label}: 깊은 복사 — 참조 분리됨`);
    } else {
      addLog("→ 원본 address.city: 'Busan' (같이 변경!) ✗");
      addLog("→ 복사본 address.city: 'Busan'");
      addLog("// 얕은 복사: 중첩 객체는 참조를 공유");
    }

    setMutated((prev) => ({ ...prev, reference: true, isDeep }));
  };

  return (
    <>
      {/* Toolbar */}
      <div className="flex items-center gap-0 border-b border-border-subtle bg-bg-elevated">
        {COPY_METHODS.map((m, i) => (
          <button
            key={m.id}
            onClick={() => handleTabChange(i)}
            className={`font-[family-name:var(--font-mono)] text-[11px] px-4 py-3 border-b-2 transition-all duration-200 cursor-pointer ${
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
        {/* Left: Code + Object Visualization */}
        <div className="p-6 flex flex-col gap-5">
          {/* Code */}
          <pre className="font-[family-name:var(--font-mono)] text-[12px] text-accent-cyan bg-bg-deep p-4 rounded-lg leading-[1.8] overflow-x-auto">
            {method.code}
          </pre>

          {/* Object Reference Visualization */}
          <div>
            <div className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted uppercase tracking-wider mb-3">
              Reference Diagram
            </div>
            <div className="grid grid-cols-2 gap-4">
              {/* Original */}
              <div className="rounded-lg border border-[#00e5ff44] bg-[#00e5ff08] p-3">
                <div className="font-[family-name:var(--font-mono)] text-[10px] font-semibold text-accent-cyan mb-2">
                  original
                </div>
                {ORIGINAL_OBJECT.map((node) => (
                  <div key={node.key} className="flex items-center gap-2 mb-1">
                    <span className="font-[family-name:var(--font-mono)] text-[10px] bg-bg-deep px-2 py-0.5 rounded">
                      <span style={{ color: node.color }}>{node.key}</span>
                      <span className="text-text-muted">: </span>
                      <span className="text-text-primary">
                        {mutated.reference &&
                        !mutated.isDeep &&
                        node.key === "address"
                          ? "{ city: 'Busan' }"
                          : node.value}
                      </span>
                    </span>
                    {node.isReference && (
                      <span
                        className="text-[10px]"
                        style={{ color: node.color }}
                      >
                        {mutated.reference
                          ? method.isDeep
                            ? "◇"
                            : "◆→"
                          : "◆→"}
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {/* Copy */}
              <div
                className="rounded-lg border p-3"
                style={{
                  borderColor: `${method.color}44`,
                  background: `${method.color}08`,
                }}
              >
                <div
                  className="font-[family-name:var(--font-mono)] text-[10px] font-semibold mb-2"
                  style={{ color: method.color }}
                >
                  copy ({method.isDeep ? "깊은 복사" : "얕은 복사"})
                </div>
                {ORIGINAL_OBJECT.map((node) => (
                  <div key={node.key} className="flex items-center gap-2 mb-1">
                    <span className="font-[family-name:var(--font-mono)] text-[10px] bg-bg-deep px-2 py-0.5 rounded">
                      <span style={{ color: node.color }}>{node.key}</span>
                      <span className="text-text-muted">: </span>
                      <span className="text-text-primary">
                        {mutated.primitive && node.key === "name"
                          ? "'Lee'"
                          : mutated.reference && node.key === "address"
                            ? "{ city: 'Busan' }"
                            : node.value}
                      </span>
                    </span>
                    {node.isReference && !method.isDeep && (
                      <span
                        className="text-[10px]"
                        style={{ color: node.color }}
                      >
                        ←◆
                      </span>
                    )}
                    {node.isReference && method.isDeep && (
                      <span className="text-[10px] text-accent-green">
                        ◇ 독립
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Legend */}
            <div className="flex gap-4 mt-3">
              <span className="font-[family-name:var(--font-mono)] text-[9px] text-text-muted">
                ◆→ 참조 공유 (얕은 복사)
              </span>
              <span className="font-[family-name:var(--font-mono)] text-[9px] text-text-muted">
                ◇ 독립 복사 (깊은 복사)
              </span>
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
                onClick={simulatePrimitiveMutation}
                className="w-full font-[family-name:var(--font-mono)] text-[12px] px-4 py-2.5 rounded-lg border border-accent-cyan text-accent-cyan bg-accent-cyan-dim cursor-pointer transition-all duration-200 hover:bg-[#00e5ff33]"
              >
                원시값 변경 (name)
              </button>
              <button
                onClick={simulateReferenceMutation}
                className="w-full font-[family-name:var(--font-mono)] text-[12px] px-4 py-2.5 rounded-lg border border-accent-amber text-accent-amber bg-accent-amber-dim cursor-pointer transition-all duration-200 hover:bg-[#ffb80033]"
              >
                중첩 객체 변경 (address)
              </button>
            </div>
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
                복사 동작을 비교하세요
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
