"use client";

import { useState } from "react";
import {
  TabBar,
  DemoLayout,
  PanelHeader,
  LogPanel,
  SectionHeader,
  ActionButton,
} from "@shared/ui";
import { BUNDLE_EXAMPLES, TABS } from "./constants";

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

  const rightPanel = (
    <>
      <PanelHeader label="실행" onReset={handleReset} />

      <div className="p-4 border-b border-border-subtle">
        <ActionButton
          variant={showOptimized ? "magenta" : "green"}
          onClick={handleToggleOptimize}
        >
          {showOptimized ? "최적화 해제" : "최적화 적용"}
        </ActionButton>
      </div>

      {/* Log */}
      <LogPanel
        logs={logs}
        emptyMessage={"최적화를 적용하여\n번들 변화를 확인하세요"}
      />
    </>
  );

  return (
    <>
      {/* Toolbar */}
      <TabBar
        tabs={TABS}
        activeIndex={activeExample}
        onTabChange={handleExampleChange}
      />

      <DemoLayout rightPanel={rightPanel}>
        {/* Description */}
        <div className="text-sm text-text-secondary leading-[1.8]">
          {example.description}
        </div>

        {/* Module Blocks */}
        <div>
          <SectionHeader>
            {activeExample === 2
              ? "Module Format Comparison"
              : "Bundle Analysis"}
          </SectionHeader>
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
                          background: isHidden ? "#ffffff11" : `${mod.color}66`,
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
      </DemoLayout>
    </>
  );
}
