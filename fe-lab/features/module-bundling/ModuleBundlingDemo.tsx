"use client";

import { useState } from "react";
import { BUNDLE_EXAMPLES } from "./constants";

export default function ModuleBundlingDemo() {
  const [activeExample, setActiveExample] = useState(0);
  const [showOptimized, setShowOptimized] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  const example = BUNDLE_EXAMPLES[activeExample];

  const handleToggleOptimize = () => {
    const next = !showOptimized;

    setShowOptimized(next);

    if (next) {
      if (activeExample === 0) {
        setLogs((prev) => [
          ...prev,
          "트리 쉐이킹 적용: 미사용 함수 제거",
          `번들 사이즈: ${example.totalSize}KB → ${example.optimizedSize}KB (${Math.round((1 - example.optimizedSize / example.totalSize) * 100)}% 감소)`,
        ]);
      } else if (activeExample === 1) {
        setLogs((prev) => [
          ...prev,
          "코드 스플릿팅 적용: 라우트별 청크 분리",
          `초기 로드: ${example.totalSize}KB → ${example.optimizedSize}KB`,
        ]);
      } else {
        setLogs((prev) => [
          ...prev,
          "ESM 정적 분석으로 dead code 제거",
          `ESM: ${example.optimizedSize}KB vs CJS: ${example.totalSize}KB`,
        ]);
      }
    }
  };

  const handleReset = () => {
    setShowOptimized(false);
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
        {BUNDLE_EXAMPLES.map((ex, i) => (
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
        {/* Left: Bundle Visualization */}
        <div className="p-6 flex flex-col gap-5">
          {/* Description */}
          <div className="text-sm text-text-secondary leading-[1.8]">
            {example.description}
          </div>

          {/* Module Blocks */}
          <div>
            <div className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted uppercase tracking-wider mb-3">
              {activeExample === 2
                ? "Module Format Comparison"
                : "Bundle Analysis"}
            </div>
            <div className="flex flex-col gap-2">
              {example.modules.map((mod, i) => {
                const isHidden = showOptimized && !mod.used;
                return (
                  <div
                    key={i}
                    className="rounded-lg border p-3 transition-all duration-500"
                    style={{
                      borderColor: `${mod.color}44`,
                      background: `${mod.color}08`,
                      opacity: isHidden ? 0.2 : 1,
                      transform: isHidden ? "scaleY(0.5)" : "scaleY(1)",
                      transformOrigin: "top",
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span
                          className="font-[family-name:var(--font-mono)] text-[11px] font-semibold"
                          style={{ color: mod.color }}
                        >
                          {mod.name}
                        </span>
                        {isHidden && (
                          <span className="font-[family-name:var(--font-mono)] text-[9px] px-1.5 py-0.5 rounded bg-[#ff2d8a22] text-[#ff2d8a]">
                            REMOVED
                          </span>
                        )}
                      </div>
                      {mod.size > 0 && (
                        <span className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted">
                          {mod.size}KB
                        </span>
                      )}
                    </div>
                    {/* Size bar */}
                    {mod.size > 0 && (
                      <div className="mt-2 h-2 bg-bg-deep rounded overflow-hidden">
                        <div
                          className="h-full rounded transition-all duration-500"
                          style={{
                            width: `${(mod.size / Math.max(...example.modules.map((m) => m.size))) * 100}%`,
                            background: isHidden
                              ? "#ffffff11"
                              : `${mod.color}66`,
                          }}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Size Summary */}
          <div className="flex gap-4">
            <div
              className="flex-1 rounded-lg border p-3"
              style={{ borderColor: "#ff2d8a44", background: "#ff2d8a08" }}
            >
              <div className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted mb-1">
                최적화 전
              </div>
              <div
                className="font-[family-name:var(--font-mono)] text-[20px] font-bold"
                style={{ color: "#ff2d8a" }}
              >
                {example.totalSize}KB
              </div>
            </div>
            <div
              className="flex-1 rounded-lg border p-3 transition-all duration-300"
              style={{
                borderColor: showOptimized ? "#00e67644" : "#ffffff11",
                background: showOptimized ? "#00e67608" : "#ffffff04",
              }}
            >
              <div className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted mb-1">
                최적화 후
              </div>
              <div
                className="font-[family-name:var(--font-mono)] text-[20px] font-bold transition-colors duration-300"
                style={{ color: showOptimized ? "#00e676" : "#ffffff33" }}
              >
                {showOptimized ? `${example.optimizedSize}KB` : "—"}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Action Panel */}
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
              onClick={handleToggleOptimize}
              className={`w-full font-[family-name:var(--font-mono)] text-[12px] px-4 py-2.5 rounded-lg border cursor-pointer transition-all duration-200 ${
                showOptimized
                  ? "border-accent-magenta text-accent-magenta bg-accent-magenta-dim hover:bg-[#ff2d8a33]"
                  : "border-accent-green text-accent-green bg-accent-green-dim hover:bg-[#00e67633]"
              }`}
            >
              {showOptimized ? "최적화 해제" : "최적화 적용"}
            </button>
          </div>

          {/* Log */}
          <div className="flex-1 overflow-y-auto p-3 font-[family-name:var(--font-mono)] text-[11px] leading-relaxed">
            {logs.length === 0 ? (
              <div className="text-text-muted text-center px-4 py-8 text-xs leading-[1.8]">
                최적화를 적용하여
                <br />
                번들 변화를 확인하세요
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
