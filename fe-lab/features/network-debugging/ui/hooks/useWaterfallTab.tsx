"use client";

import { useState } from "react";
import { WATERFALL_RESOURCES, PHASE_LEGEND } from "../../model/constants";
import { ActionButton } from "@shared/ui";

interface UseWaterfallTabOptions {
  addLog: (text: string) => void;
  clearLogs: () => void;
}

export function useWaterfallTab({ addLog, clearLogs }: UseWaterfallTabOptions) {
  const [selectedResource, setSelectedResource] = useState<number | null>(null);

  const maxTime = Math.max(...WATERFALL_RESOURCES.map((r) => r.totalTime));

  const reset = () => {
    setSelectedResource(null);
  };

  const actions = (
    <>
      <ActionButton
        variant="cyan"
        onClick={() => {
          clearLogs();
          addLog("병목 분석:");
          addLog("");
          addLog("api/data — TTFB 200ms ⚠️");
          addLog("  → 서버 처리 시간이 병목");
          addLog("  → DB 쿼리 최적화 필요");
          addLog("");
          addLog("app.js — Download 120ms ⚠️");
          addLog("  → 파일 크기가 병목 (245KB)");
          addLog("  → 코드 스플리팅 권장");
          addLog("");
          addLog("hero.webp — Download 90ms");
          addLog("  → 이미지 최적화 (WebP/AVIF)");
        }}
      >
        병목 자동 분석
      </ActionButton>
      <ActionButton
        variant="amber"
        onClick={() => {
          clearLogs();
          addLog("네트워크 병목 vs CPU 병목:");
          addLog("");
          addLog("네트워크 병목 징후:");
          addLog("  - TTFB가 긴 경우");
          addLog("  - Download 시간이 긴 경우");
          addLog("  - 많은 요청이 Stalled 상태");
          addLog("");
          addLog("CPU 병목 징후:");
          addLog("  - 네트워크 빠르지만 렌더링 느림");
          addLog("  - Long Task (50ms+) 감지");
          addLog("  - 메인 스레드 블로킹");
        }}
      >
        네트워크 vs CPU 병목
      </ActionButton>
      <ActionButton
        variant="green"
        onClick={() => {
          clearLogs();
          addLog("Performance API 측정:");
          addLog("");
          addLog("const entries = performance");
          addLog("  .getEntriesByType('resource');");
          addLog("");
          addLog("entries.forEach(e => {");
          addLog("  DNS: " + "e.domainLookupEnd - Start");
          addLog("  TCP: " + "e.connectEnd - connectStart");
          addLog("  TLS: " + "e.connectEnd - secureStart");
          addLog("  TTFB: " + "e.responseStart - requestStart");
          addLog("  DL: " + "e.responseEnd - responseStart");
          addLog("});");
        }}
      >
        Performance API
      </ActionButton>
    </>
  );

  const content = (
    <>
      {/* Phase legend */}
      <div className="flex gap-3">
        {PHASE_LEGEND.map((p) => (
          <div key={p.name} className="flex items-center gap-1.5">
            <div
              className="w-3 h-1.5 rounded-sm"
              style={{ backgroundColor: p.color }}
            />
            <span className="font-mono text-[9px] text-text-muted">
              {p.name}
            </span>
          </div>
        ))}
      </div>

      {/* Waterfall chart */}
      <div className="overflow-x-auto">
        <div className="rounded-lg border border-border-subtle bg-bg-deep overflow-hidden min-w-[500px]">
          {/* Header */}
          <div className="grid grid-cols-[140px_60px_1fr_60px] border-b border-border-subtle px-3 py-2">
            <span className="font-mono text-[9px] text-text-muted uppercase">
              Name
            </span>
            <span className="font-mono text-[9px] text-text-muted uppercase">
              Type
            </span>
            <span className="font-mono text-[9px] text-text-muted uppercase">
              Waterfall
            </span>
            <span className="font-mono text-[9px] text-text-muted uppercase text-right">
              Size
            </span>
          </div>

          {/* Rows */}
          {WATERFALL_RESOURCES.map((resource, i) => {
            const isSelected = selectedResource === i;

            let offset = 0;

            if (i > 0) {
              offset = i === 1 ? 155 : i === 2 ? 155 : i === 3 ? 160 : 165;
            }

            const totalWidth = offset + resource.totalTime;
            const scale = maxTime + 200;

            return (
              <div
                key={resource.name}
                className={`grid grid-cols-[140px_60px_1fr_60px] items-center px-3 py-2 cursor-pointer transition-all duration-200 ${
                  isSelected ? "bg-bg-surface" : "hover:bg-bg-surface/50"
                } ${i < WATERFALL_RESOURCES.length - 1 ? "border-b border-border-subtle" : ""}`}
                onClick={() => {
                  setSelectedResource(isSelected ? null : i);
                  if (!isSelected) {
                    clearLogs();
                    addLog(`${resource.name} (${resource.size})`);
                    resource.phases.forEach((p) => {
                      addLog(`  ${p.name}: ${p.duration}ms — ${p.description}`);
                    });
                    addLog(`  총: ${resource.totalTime}ms`);
                  }
                }}
              >
                <span className="font-mono text-[10px] text-text-primary truncate">
                  {resource.name}
                </span>
                <span className="font-mono text-[9px] text-text-muted">
                  {resource.type}
                </span>
                <div className="h-4 relative">
                  {resource.phases.map((phase, j) => {
                    const left =
                      ((offset +
                        resource.phases
                          .slice(0, j)
                          .reduce((a, p) => a + p.duration, 0)) /
                        scale) *
                      100;
                    const width = (phase.duration / scale) * 100;
                    return (
                      <div
                        key={j}
                        className="absolute top-0.5 h-3 rounded-sm transition-all duration-300"
                        style={{
                          left: `${left}%`,
                          width: `${Math.max(width, 0.5)}%`,
                          backgroundColor: phase.color,
                          opacity: isSelected ? 1 : 0.7,
                        }}
                        title={`${phase.name}: ${phase.duration}ms`}
                      />
                    );
                  })}
                  {/* Total time label */}
                  <span
                    className="absolute top-0 font-mono text-[8px] text-text-muted"
                    style={{ left: `${(totalWidth / scale) * 100 + 1}%` }}
                  >
                    {resource.totalTime}ms
                  </span>
                </div>
                <span className="font-mono text-[9px] text-text-muted text-right">
                  {resource.size}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected resource detail */}
      {selectedResource !== null && (
        <div className="rounded-lg border border-border-subtle bg-bg-deep p-4">
          <div className="font-mono text-[11px] text-text-primary font-semibold mb-2">
            {WATERFALL_RESOURCES[selectedResource].name}
          </div>
          <div className="flex gap-2 flex-wrap">
            {WATERFALL_RESOURCES[selectedResource].phases.map((phase, i) => (
              <div
                key={i}
                className="flex items-center gap-1.5 bg-bg-surface rounded px-2 py-1"
              >
                <div
                  className="w-2 h-2 rounded-sm"
                  style={{ backgroundColor: phase.color }}
                />
                <span
                  className="font-mono text-[10px]"
                  style={{ color: phase.color }}
                >
                  {phase.name}
                </span>
                <span className="font-mono text-[10px] text-text-muted">
                  {phase.duration}ms
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );

  return { actions, content, reset };
}
