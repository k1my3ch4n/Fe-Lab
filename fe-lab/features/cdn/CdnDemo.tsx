"use client";

import { useState, useCallback } from "react";
import {
  EDGE_SERVERS,
  ORIGIN_SERVER,
  CACHE_RESULTS,
  CDN_FLOW_STEPS,
  INVALIDATION_STRATEGIES,
} from "./constants";

export default function CdnDemo() {
  const [activeTab, setActiveTab] = useState<"flow" | "edge" | "invalidation">(
    "flow",
  );
  const [activeFlow, setActiveFlow] = useState<"hit" | "miss">("hit");
  const [activeStep, setActiveStep] = useState(-1);
  const [highlightEdge, setHighlightEdge] = useState<string | null>(null);
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = useCallback((text: string) => {
    setLogs((prev) => [...prev, text]);
  }, []);

  const handleReset = () => {
    setActiveStep(-1);
    setHighlightEdge(null);
    setLogs([]);
  };

  const steps = CDN_FLOW_STEPS[activeFlow];

  const handleStepForward = () => {
    const next = activeStep + 1;

    if (next < steps.length) {
      setActiveStep(next);
      addLog(`[${steps[next].latency}] ${steps[next].label}`);
    }
  };

  return (
    <>
      {/* Toolbar */}
      <div className="flex items-center gap-0 border-b border-border-subtle bg-bg-elevated">
        {(["flow", "edge", "invalidation"] as const).map((tab) => (
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
            {tab === "flow"
              ? "요청 흐름"
              : tab === "edge"
                ? "엣지 서버"
                : "캐시 무효화"}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-[1fr_280px] min-h-[420px]">
        {/* Left */}
        <div className="p-6 flex flex-col gap-5">
          {activeTab === "flow" ? (
            <>
              {/* HIT/MISS selector */}
              <div className="flex gap-2">
                {(["hit", "miss"] as const).map((type) => {
                  const result = CACHE_RESULTS.find(
                    (r) => r.type === type.toUpperCase(),
                  );
                  return (
                    <button
                      key={type}
                      onClick={() => {
                        setActiveFlow(type);
                        handleReset();
                      }}
                      className={`font-[family-name:var(--font-mono)] text-[11px] px-3 py-1.5 rounded-lg border transition-all duration-200 cursor-pointer ${
                        activeFlow === type
                          ? "bg-bg-surface"
                          : "border-transparent bg-bg-deep text-text-muted hover:text-text-secondary"
                      }`}
                      style={
                        activeFlow === type
                          ? {
                              borderColor: `${result?.color}66`,
                              color: result?.color,
                            }
                          : {}
                      }
                    >
                      {result?.label}
                    </button>
                  );
                })}
              </div>

              {/* Flow steps */}
              <div className="rounded-lg border border-border-subtle bg-bg-deep p-4">
                <div className="flex flex-col gap-2">
                  {steps.map((step, i) => {
                    const isActive = i <= activeStep;
                    const isCurrent = i === activeStep;
                    return (
                      <div
                        key={i}
                        className={`flex items-center gap-3 rounded-lg p-3 transition-all duration-300 ${
                          isCurrent
                            ? "bg-bg-surface border border-border-subtle"
                            : ""
                        }`}
                        style={{ opacity: isActive ? 1 : 0.3 }}
                      >
                        <span
                          className="font-[family-name:var(--font-mono)] text-[10px] font-bold w-12 text-right shrink-0"
                          style={{ color: step.color }}
                        >
                          {step.latency}
                        </span>
                        <div
                          className="w-2 h-2 rounded-full shrink-0"
                          style={{ backgroundColor: step.color }}
                        />
                        <span className="font-[family-name:var(--font-mono)] text-[11px] text-text-secondary">
                          {step.label}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Total latency */}
                {activeStep >= steps.length - 1 && (
                  <div className="mt-3 pt-3 border-t border-border-subtle text-center">
                    <span
                      className="font-[family-name:var(--font-mono)] text-[12px] font-bold"
                      style={{
                        color: activeFlow === "hit" ? "#00e676" : "#ffb800",
                      }}
                    >
                      총 지연: {activeFlow === "hit" ? "~11ms" : "~212ms"}
                    </span>
                  </div>
                )}
              </div>

              {/* Cache result descriptions */}
              <div className="flex gap-3">
                {CACHE_RESULTS.map((r) => (
                  <div
                    key={r.type}
                    className="flex-1 rounded-lg border border-border-subtle bg-bg-deep p-3"
                  >
                    <div
                      className="font-[family-name:var(--font-mono)] text-[10px] font-bold mb-1"
                      style={{ color: r.color }}
                    >
                      {r.label}
                    </div>
                    <div className="font-[family-name:var(--font-mono)] text-[9px] text-text-muted leading-[1.6]">
                      {r.description}
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : activeTab === "edge" ? (
            <>
              {/* World map (simplified) */}
              <div
                className="rounded-lg border border-border-subtle bg-bg-deep p-4 relative"
                style={{ minHeight: "280px" }}
              >
                <div className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted uppercase tracking-wider mb-3">
                  전 세계 엣지 서버 분포
                </div>
                <div className="relative w-full" style={{ height: "220px" }}>
                  {/* Origin server */}
                  <div
                    className="absolute w-3 h-3 rounded-full transition-all duration-300 cursor-pointer"
                    style={{
                      left: `${ORIGIN_SERVER.x}%`,
                      top: `${ORIGIN_SERVER.y}%`,
                      backgroundColor: ORIGIN_SERVER.color,
                      boxShadow: `0 0 8px ${ORIGIN_SERVER.color}`,
                    }}
                    title={`Origin: ${ORIGIN_SERVER.name}`}
                  />

                  {/* Edge servers */}
                  {EDGE_SERVERS.map((edge) => (
                    <div
                      key={edge.id}
                      className="absolute w-2 h-2 rounded-full transition-all duration-300 cursor-pointer hover:scale-150"
                      style={{
                        left: `${edge.x}%`,
                        top: `${edge.y}%`,
                        backgroundColor:
                          highlightEdge === edge.id ? "#fff" : edge.color,
                        boxShadow:
                          highlightEdge === edge.id
                            ? `0 0 12px ${edge.color}`
                            : `0 0 4px ${edge.color}66`,
                      }}
                      onMouseEnter={() => setHighlightEdge(edge.id)}
                      onMouseLeave={() => setHighlightEdge(null)}
                      title={`${edge.name} (${edge.region})`}
                    />
                  ))}

                  {/* Tooltip */}
                  {highlightEdge &&
                    (() => {
                      const edge = EDGE_SERVERS.find(
                        (e) => e.id === highlightEdge,
                      );
                      if (!edge) return null;
                      return (
                        <div
                          className="absolute bg-bg-elevated border border-border-subtle rounded px-2 py-1 pointer-events-none z-10"
                          style={{
                            left: `${edge.x + 2}%`,
                            top: `${edge.y - 8}%`,
                          }}
                        >
                          <div className="font-[family-name:var(--font-mono)] text-[10px] text-text-primary">
                            {edge.name}
                          </div>
                          <div className="font-[family-name:var(--font-mono)] text-[8px] text-text-muted">
                            {edge.region}
                          </div>
                        </div>
                      );
                    })()}
                </div>

                {/* Legend */}
                <div className="flex gap-4 mt-2">
                  <div className="flex items-center gap-1.5">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: "#ff2d8a" }}
                    />
                    <span className="font-[family-name:var(--font-mono)] text-[9px] text-text-muted">
                      Origin
                    </span>
                  </div>
                  {[
                    { label: "Asia", color: "#00e5ff" },
                    { label: "Europe", color: "#b388ff" },
                    { label: "America", color: "#00e676" },
                    { label: "Oceania", color: "#ffb800" },
                  ].map((r) => (
                    <div key={r.label} className="flex items-center gap-1.5">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: r.color }}
                      />
                      <span className="font-[family-name:var(--font-mono)] text-[9px] text-text-muted">
                        {r.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            /* Invalidation strategies */
            <div className="flex flex-col gap-3">
              <div className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted uppercase tracking-wider">
                캐시 무효화 전략
              </div>
              {INVALIDATION_STRATEGIES.map((strategy) => (
                <div
                  key={strategy.name}
                  className="rounded-lg border border-border-subtle bg-bg-deep p-4"
                >
                  <div
                    className="font-[family-name:var(--font-mono)] text-[12px] font-bold mb-1"
                    style={{ color: strategy.color }}
                  >
                    {strategy.name}
                  </div>
                  <div className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted leading-[1.6]">
                    {strategy.description}
                  </div>
                </div>
              ))}

              {/* Fingerprinting example */}
              <div className="rounded-lg border border-border-subtle bg-bg-deep p-4">
                <div className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted uppercase tracking-wider mb-2">
                  에셋 핑거프린팅 예시
                </div>
                <pre className="font-[family-name:var(--font-mono)] text-[10px] text-accent-cyan leading-[1.8]">
                  {`// 빌드 시 파일명에 해시 포함
app.js      → app.a1b2c3d4.js
style.css   → style.e5f6g7h8.css

// HTML에서 참조
<script src="/app.a1b2c3d4.js"></script>

// Cache-Control: max-age=31536000 (1년)
// → 파일 변경 시 해시가 바뀌므로 새로운 URL
// → 캐시 무효화 없이 항상 최신 파일 제공`}
                </pre>
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
            {activeTab === "flow" ? (
              <>
                <button
                  onClick={handleStepForward}
                  disabled={activeStep >= steps.length - 1}
                  className="w-full font-[family-name:var(--font-mono)] text-[12px] px-4 py-2.5 rounded-lg border border-accent-cyan text-accent-cyan bg-accent-cyan-dim cursor-pointer transition-all duration-200 hover:bg-[#00e5ff33] disabled:opacity-50"
                >
                  다음 단계 →
                </button>
                <button
                  onClick={() => {
                    handleReset();
                    steps.forEach((step) => {
                      addLog(`[${step.latency}] ${step.label}`);
                    });
                    setActiveStep(steps.length - 1);
                  }}
                  className="w-full font-[family-name:var(--font-mono)] text-[12px] px-4 py-2.5 rounded-lg border border-accent-amber text-accent-amber bg-accent-amber-dim cursor-pointer transition-all duration-200 hover:bg-[#ffb80033]"
                >
                  전체 흐름 실행
                </button>
              </>
            ) : activeTab === "edge" ? (
              <>
                <button
                  onClick={() => {
                    setLogs([]);
                    addLog("서울 사용자 → Seoul 엣지 (~5ms)");
                    addLog("도쿄 사용자 → Tokyo 엣지 (~8ms)");
                    addLog("뉴욕 사용자 → Virginia 엣지 (~10ms)");
                    addLog("");
                    addLog("CDN 없이 (Origin 직접):");
                    addLog("서울 → Virginia Origin (~200ms)");
                  }}
                  className="w-full font-[family-name:var(--font-mono)] text-[12px] px-4 py-2.5 rounded-lg border border-accent-cyan text-accent-cyan bg-accent-cyan-dim cursor-pointer transition-all duration-200 hover:bg-[#00e5ff33]"
                >
                  지연 시간 비교
                </button>
                <button
                  onClick={() => {
                    setLogs([]);
                    addLog("엣지 서버 수: 10개 리전");
                    addLog("Asia: Seoul, Tokyo, Singapore, Mumbai");
                    addLog("Europe: Frankfurt, London");
                    addLog("America: Virginia, Oregon, São Paulo");
                    addLog("Oceania: Sydney");
                  }}
                  className="w-full font-[family-name:var(--font-mono)] text-[12px] px-4 py-2.5 rounded-lg border border-accent-green text-accent-green bg-accent-green-dim cursor-pointer transition-all duration-200 hover:bg-[#00e67633]"
                >
                  서버 목록 확인
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    setLogs([]);
                    addLog("Cache-Control: public, max-age=3600");
                    addLog("→ 1시간 동안 엣지에서 캐시");
                    addLog("→ 만료 후 오리진에 재검증");
                    addLog("");
                    addLog("CDN-Cache-Control: max-age=86400");
                    addLog("→ CDN 전용 캐시 정책 분리 가능");
                  }}
                  className="w-full font-[family-name:var(--font-mono)] text-[12px] px-4 py-2.5 rounded-lg border border-accent-cyan text-accent-cyan bg-accent-cyan-dim cursor-pointer transition-all duration-200 hover:bg-[#00e5ff33]"
                >
                  Cache-Control 설정
                </button>
                <button
                  onClick={() => {
                    setLogs([]);
                    addLog("퍼지 요청: /api/cdn/purge");
                    addLog("→ 대상: /assets/style.css");
                    addLog("→ 전 세계 엣지 서버에서 삭제");
                    addLog("→ 다음 요청 시 오리진에서 갱신 ✓");
                  }}
                  className="w-full font-[family-name:var(--font-mono)] text-[12px] px-4 py-2.5 rounded-lg border border-accent-magenta text-accent-magenta bg-accent-magenta-dim cursor-pointer transition-all duration-200 hover:bg-[#ff2d8a33]"
                >
                  캐시 퍼지 시뮬레이션
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
                CDN 동작을 확인하세요
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
