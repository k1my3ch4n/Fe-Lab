"use client";

import { useState, useCallback } from "react";
import { WATERFALL_RESOURCES, STATUS_CODES, PHASE_LEGEND } from "./constants";

export default function NetworkDebuggingDemo() {
  const [activeTab, setActiveTab] = useState<"waterfall" | "status">(
    "waterfall",
  );
  const [selectedResource, setSelectedResource] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = useCallback((text: string) => {
    setLogs((prev) => [...prev, text]);
  }, []);

  const handleReset = () => {
    setSelectedResource(null);
    setSelectedCategory(null);
    setLogs([]);
  };

  const maxTime = Math.max(...WATERFALL_RESOURCES.map((r) => r.totalTime));
  const categories = [...new Set(STATUS_CODES.map((s) => s.category))];

  return (
    <>
      {/* Toolbar */}
      <div className="flex items-center gap-0 border-b border-border-subtle bg-bg-elevated">
        {(["waterfall", "status"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              handleReset();
            }}
            className={`font-[family-name:var(--font-mono)] text-[11px] px-4 py-3 border-b-2 transition-all duration-200 cursor-pointer ${
              activeTab === tab
                ? "border-accent-cyan text-accent-cyan bg-bg-surface"
                : "border-transparent text-text-muted hover:text-text-secondary"
            }`}
          >
            {tab === "waterfall" ? "워터폴 차트" : "HTTP 상태 코드"}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-[1fr_280px] min-h-[420px]">
        {/* Left */}
        <div className="p-6 flex flex-col gap-5">
          {activeTab === "waterfall" ? (
            <>
              {/* Phase legend */}
              <div className="flex gap-3">
                {PHASE_LEGEND.map((p) => (
                  <div key={p.name} className="flex items-center gap-1.5">
                    <div
                      className="w-3 h-1.5 rounded-sm"
                      style={{ backgroundColor: p.color }}
                    />
                    <span className="font-[family-name:var(--font-mono)] text-[9px] text-text-muted">
                      {p.name}
                    </span>
                  </div>
                ))}
              </div>

              {/* Waterfall chart */}
              <div className="rounded-lg border border-border-subtle bg-bg-deep overflow-hidden">
                {/* Header */}
                <div className="grid grid-cols-[140px_60px_1fr_60px] border-b border-border-subtle px-3 py-2">
                  <span className="font-[family-name:var(--font-mono)] text-[9px] text-text-muted uppercase">
                    Name
                  </span>
                  <span className="font-[family-name:var(--font-mono)] text-[9px] text-text-muted uppercase">
                    Type
                  </span>
                  <span className="font-[family-name:var(--font-mono)] text-[9px] text-text-muted uppercase">
                    Waterfall
                  </span>
                  <span className="font-[family-name:var(--font-mono)] text-[9px] text-text-muted uppercase text-right">
                    Size
                  </span>
                </div>

                {/* Rows */}
                {WATERFALL_RESOURCES.map((resource, i) => {
                  const isSelected = selectedResource === i;
                  let offset = 0;
                  if (i > 0) {
                    offset =
                      i === 1 ? 155 : i === 2 ? 155 : i === 3 ? 160 : 165;
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
                          setLogs([]);
                          addLog(`${resource.name} (${resource.size})`);
                          resource.phases.forEach((p) => {
                            addLog(
                              `  ${p.name}: ${p.duration}ms — ${p.description}`,
                            );
                          });
                          addLog(`  총: ${resource.totalTime}ms`);
                        }
                      }}
                    >
                      <span className="font-[family-name:var(--font-mono)] text-[10px] text-text-primary truncate">
                        {resource.name}
                      </span>
                      <span className="font-[family-name:var(--font-mono)] text-[9px] text-text-muted">
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
                          className="absolute top-0 font-[family-name:var(--font-mono)] text-[8px] text-text-muted"
                          style={{ left: `${(totalWidth / scale) * 100 + 1}%` }}
                        >
                          {resource.totalTime}ms
                        </span>
                      </div>
                      <span className="font-[family-name:var(--font-mono)] text-[9px] text-text-muted text-right">
                        {resource.size}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Selected resource detail */}
              {selectedResource !== null && (
                <div className="rounded-lg border border-border-subtle bg-bg-deep p-4">
                  <div className="font-[family-name:var(--font-mono)] text-[11px] text-text-primary font-semibold mb-2">
                    {WATERFALL_RESOURCES[selectedResource].name}
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {WATERFALL_RESOURCES[selectedResource].phases.map(
                      (phase, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-1.5 bg-bg-surface rounded px-2 py-1"
                        >
                          <div
                            className="w-2 h-2 rounded-sm"
                            style={{ backgroundColor: phase.color }}
                          />
                          <span
                            className="font-[family-name:var(--font-mono)] text-[10px]"
                            style={{ color: phase.color }}
                          >
                            {phase.name}
                          </span>
                          <span className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted">
                            {phase.duration}ms
                          </span>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              )}
            </>
          ) : (
            /* HTTP Status codes */
            <>
              {/* Category filter */}
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`font-[family-name:var(--font-mono)] text-[10px] px-2.5 py-1 rounded border transition-all duration-200 cursor-pointer ${
                    selectedCategory === null
                      ? "border-accent-cyan text-accent-cyan bg-accent-cyan-dim"
                      : "border-transparent bg-bg-deep text-text-muted hover:text-text-secondary"
                  }`}
                >
                  전체
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`font-[family-name:var(--font-mono)] text-[10px] px-2.5 py-1 rounded border transition-all duration-200 cursor-pointer ${
                      selectedCategory === cat
                        ? "border-accent-cyan text-accent-cyan bg-accent-cyan-dim"
                        : "border-transparent bg-bg-deep text-text-muted hover:text-text-secondary"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Status codes grid */}
              <div className="grid grid-cols-2 gap-2">
                {STATUS_CODES.filter(
                  (s) => !selectedCategory || s.category === selectedCategory,
                ).map((status) => (
                  <div
                    key={status.code}
                    className="rounded-lg border border-border-subtle bg-bg-deep p-3 cursor-pointer hover:bg-bg-surface transition-all duration-200"
                    onClick={() => {
                      addLog(`${status.code} ${status.name}`);
                      addLog(`  → ${status.description}`);
                      addLog(`  카테고리: ${status.category}`);
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="font-[family-name:var(--font-mono)] text-[14px] font-bold"
                        style={{ color: status.color }}
                      >
                        {status.code}
                      </span>
                      <span className="font-[family-name:var(--font-mono)] text-[10px] text-text-secondary">
                        {status.name}
                      </span>
                    </div>
                    <div className="font-[family-name:var(--font-mono)] text-[9px] text-text-muted mt-1">
                      {status.description}
                    </div>
                  </div>
                ))}
              </div>
            </>
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
            {activeTab === "waterfall" ? (
              <>
                <button
                  onClick={() => {
                    setLogs([]);
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
                  className="w-full font-[family-name:var(--font-mono)] text-[12px] px-4 py-2.5 rounded-lg border border-accent-cyan text-accent-cyan bg-accent-cyan-dim cursor-pointer transition-all duration-200 hover:bg-[#00e5ff33]"
                >
                  병목 자동 분석
                </button>
                <button
                  onClick={() => {
                    setLogs([]);
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
                  className="w-full font-[family-name:var(--font-mono)] text-[12px] px-4 py-2.5 rounded-lg border border-accent-amber text-accent-amber bg-accent-amber-dim cursor-pointer transition-all duration-200 hover:bg-[#ffb80033]"
                >
                  네트워크 vs CPU 병목
                </button>
                <button
                  onClick={() => {
                    setLogs([]);
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
                  className="w-full font-[family-name:var(--font-mono)] text-[12px] px-4 py-2.5 rounded-lg border border-accent-green text-accent-green bg-accent-green-dim cursor-pointer transition-all duration-200 hover:bg-[#00e67633]"
                >
                  Performance API
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    setLogs([]);
                    addLog("200 OK → 성공적으로 처리됨");
                    addLog("301 → 영구 이동 (브라우저 캐시)");
                    addLog("302 → 임시 이동 (캐시 안 함)");
                    addLog("304 → 변경 없음 (캐시 사용)");
                    addLog("");
                    addLog("캐시 흐름:");
                    addLog("요청 → ETag/If-None-Match 확인");
                    addLog("→ 변경 없으면 304 (빈 응답)");
                    addLog("→ 브라우저가 로컬 캐시 사용 ✓");
                  }}
                  className="w-full font-[family-name:var(--font-mono)] text-[12px] px-4 py-2.5 rounded-lg border border-accent-cyan text-accent-cyan bg-accent-cyan-dim cursor-pointer transition-all duration-200 hover:bg-[#00e5ff33]"
                >
                  리다이렉트/캐시 흐름
                </button>
                <button
                  onClick={() => {
                    setLogs([]);
                    addLog("401 vs 403 차이:");
                    addLog("  401: 인증되지 않음 (로그인 필요)");
                    addLog("  403: 인증됨 but 권한 없음");
                    addLog("");
                    addLog("500 vs 502 vs 503:");
                    addLog("  500: 서버 코드 오류");
                    addLog("  502: 프록시/게이트웨이 뒤 서버 오류");
                    addLog("  503: 서비스 일시 중단 (과부하)");
                  }}
                  className="w-full font-[family-name:var(--font-mono)] text-[12px] px-4 py-2.5 rounded-lg border border-accent-magenta text-accent-magenta bg-accent-magenta-dim cursor-pointer transition-all duration-200 hover:bg-[#ff2d8a33]"
                >
                  에러 코드 구분
                </button>
              </>
            )}
          </div>

          {/* Log */}
          <div className="flex-1 overflow-y-auto p-3 font-[family-name:var(--font-mono)] text-[11px] leading-relaxed">
            {logs.length === 0 ? (
              <div className="text-text-muted text-center px-4 py-8 text-xs leading-[1.8]">
                리소스를 클릭하거나
                <br />
                버튼으로 분석을 실행하세요
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
