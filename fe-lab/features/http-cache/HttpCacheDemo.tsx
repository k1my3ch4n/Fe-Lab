"use client";

import { useState, useCallback } from "react";
import { CACHE_SCENARIOS, STATUS_COLORS, ACTOR_CONFIG } from "./constants";
import type { CacheStatus } from "./constants";

export default function HttpCacheDemo() {
  const [activeScenario, setActiveScenario] = useState(0);
  const [currentStep, setCurrentStep] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  const scenario = CACHE_SCENARIOS[activeScenario];

  const addLog = useCallback((text: string) => {
    setLogs((prev) => [...prev, text]);
  }, []);

  const handleScenarioChange = (index: number) => {
    setActiveScenario(index);
    setCurrentStep(-1);
    setIsPlaying(false);
    setLogs([]);
  };

  const handleNextStep = () => {
    const nextStep = currentStep + 1;
    if (nextStep < scenario.steps.length) {
      setCurrentStep(nextStep);

      const step = scenario.steps[nextStep];
      const actor = ACTOR_CONFIG[step.actor];

      addLog(`[${actor.label}] ${step.label}`);

      if (step.headers) {
        step.headers.forEach((h) => {
          addLog(`  ${h.key}: ${h.value}`);
        });
      }

      if (step.status) {
        addLog(`  → Cache ${step.status}`);
      }
    }
  };

  const handlePlayAll = async () => {
    setCurrentStep(-1);
    setLogs([]);
    setIsPlaying(true);

    for (let i = 0; i < scenario.steps.length; i++) {
      await new Promise((r) => setTimeout(r, 800));
      const step = scenario.steps[i];
      const actor = ACTOR_CONFIG[step.actor];

      setCurrentStep(i);
      setLogs((prev) => {
        const newLogs = [...prev, `[${actor.label}] ${step.label}`];

        if (step.headers) {
          step.headers.forEach((h) => {
            newLogs.push(`  ${h.key}: ${h.value}`);
          });
        }

        if (step.status) {
          newLogs.push(`  → Cache ${step.status}`);
        }

        return newLogs;
      });
    }

    setIsPlaying(false);
  };

  const handleReset = () => {
    setCurrentStep(-1);
    setIsPlaying(false);
    setLogs([]);
  };

  const renderStatusBadge = (status: CacheStatus) => {
    const config = STATUS_COLORS[status];
    return (
      <span
        className={`${config.bg} ${config.text} font-[family-name:var(--font-mono)] text-[10px] px-2 py-0.5 rounded-full font-semibold`}
      >
        {config.label}
      </span>
    );
  };

  return (
    <>
      {/* Scenario Tabs */}
      <div className="flex items-center gap-0 border-b border-border-subtle bg-bg-elevated">
        {CACHE_SCENARIOS.map((s, i) => (
          <button
            key={s.id}
            onClick={() => handleScenarioChange(i)}
            className={`font-[family-name:var(--font-mono)] text-[11px] px-4 py-3 border-b-2 transition-all duration-200 cursor-pointer ${
              i === activeScenario
                ? "border-accent-cyan text-accent-cyan bg-bg-surface"
                : "border-transparent text-text-muted hover:text-text-secondary"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-[1fr_280px] min-h-[420px]">
        {/* Left: Flow Diagram */}
        <div className="p-6 flex flex-col gap-5">
          {/* Scenario Description */}
          <div className="text-sm text-text-secondary leading-[1.8]">
            {scenario.description}
          </div>

          {/* Actor Columns Header */}
          <div className="grid grid-cols-3 gap-4 mb-1">
            {(["browser", "cache", "server"] as const).map((actor) => (
              <div key={actor} className="text-center">
                <div
                  className="font-[family-name:var(--font-mono)] text-[11px] font-semibold px-3 py-1.5 rounded-lg inline-block"
                  style={{
                    color: ACTOR_CONFIG[actor].color,
                    background: `${ACTOR_CONFIG[actor].color}15`,
                    border: `1px solid ${ACTOR_CONFIG[actor].color}33`,
                  }}
                >
                  {ACTOR_CONFIG[actor].label}
                </div>
              </div>
            ))}
          </div>

          {/* Vertical Lines + Steps */}
          <div className="relative">
            {/* Vertical guide lines */}
            <div className="absolute inset-0 grid grid-cols-3 gap-4 pointer-events-none">
              {[0, 1, 2].map((col) => (
                <div key={col} className="flex justify-center">
                  <div
                    className="w-px h-full"
                    style={{
                      background: `${Object.values(ACTOR_CONFIG)[col].color}20`,
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Steps */}
            <div className="flex flex-col gap-3 relative">
              {scenario.steps.map((step, i) => {
                const isActive = i <= currentStep;
                const isCurrent = i === currentStep;
                const colIndex =
                  step.actor === "browser" ? 0 : step.actor === "cache" ? 1 : 2;
                const actorConfig = ACTOR_CONFIG[step.actor];

                return (
                  <div key={i} className="grid grid-cols-3 gap-4">
                    {[0, 1, 2].map((col) => (
                      <div key={col} className="flex justify-center">
                        {col === colIndex ? (
                          <div
                            className={`w-full rounded-lg border p-3 transition-all duration-500 ${
                              isActive ? "opacity-100" : "opacity-30"
                            } ${isCurrent ? "ring-1" : ""}`}
                            style={{
                              borderColor: isActive
                                ? `${actorConfig.color}55`
                                : `${actorConfig.color}20`,
                              background: isActive
                                ? `${actorConfig.color}10`
                                : `${actorConfig.color}05`,
                              ...(isCurrent
                                ? { ringColor: `${actorConfig.color}66` }
                                : {}),
                            }}
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <span
                                className="font-[family-name:var(--font-mono)] text-[11px] font-semibold"
                                style={{ color: actorConfig.color }}
                              >
                                {step.label}
                              </span>
                              {step.status &&
                                isActive &&
                                renderStatusBadge(step.status)}
                            </div>
                            <div className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted leading-relaxed">
                              {step.description}
                            </div>
                            {step.headers && isActive && (
                              <div className="mt-2 flex flex-col gap-0.5">
                                {step.headers.map((h, j) => (
                                  <div
                                    key={j}
                                    className="font-[family-name:var(--font-mono)] text-[10px] bg-bg-deep px-2 py-1 rounded"
                                  >
                                    <span className="text-accent-cyan">
                                      {h.key}
                                    </span>
                                    <span className="text-text-muted">: </span>
                                    <span className="text-text-primary">
                                      {h.value}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="w-px" />
                        )}
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Controls + Log */}
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

          {/* Action Buttons */}
          <div className="p-4 border-b border-border-subtle flex flex-col gap-2">
            <button
              onClick={handlePlayAll}
              disabled={isPlaying}
              className={`w-full font-[family-name:var(--font-mono)] text-[12px] px-4 py-2.5 rounded-lg border transition-all duration-200 cursor-pointer ${
                isPlaying
                  ? "border-border-subtle text-text-muted bg-bg-elevated cursor-not-allowed"
                  : "border-accent-cyan text-accent-cyan bg-accent-cyan-dim hover:bg-[#00e5ff33]"
              }`}
            >
              {isPlaying ? "재생 중..." : "전체 재생"}
            </button>
            <button
              onClick={handleNextStep}
              disabled={isPlaying || currentStep >= scenario.steps.length - 1}
              className={`w-full font-[family-name:var(--font-mono)] text-[12px] px-4 py-2.5 rounded-lg border transition-all duration-200 cursor-pointer ${
                isPlaying || currentStep >= scenario.steps.length - 1
                  ? "border-border-subtle text-text-muted bg-bg-elevated cursor-not-allowed"
                  : "border-accent-green text-accent-green bg-accent-green-dim hover:bg-[#00e67633]"
              }`}
            >
              다음 단계 →
            </button>
          </div>

          {/* Status Legend */}
          <div className="px-4 py-3 border-b border-border-subtle flex items-center gap-3">
            {(
              Object.entries(STATUS_COLORS) as [
                CacheStatus,
                (typeof STATUS_COLORS)[CacheStatus],
              ][]
            ).map(([key, config]) => (
              <span
                key={key}
                className={`${config.bg} ${config.text} font-[family-name:var(--font-mono)] text-[9px] px-2 py-0.5 rounded-full font-semibold`}
              >
                {config.label}
              </span>
            ))}
          </div>

          {/* Log */}
          <div className="flex-1 overflow-y-auto p-3 font-[family-name:var(--font-mono)] text-[11px] leading-relaxed">
            {logs.length === 0 ? (
              <div className="text-text-muted text-center px-4 py-8 text-xs leading-[1.8]">
                버튼을 클릭하여
                <br />
                캐시 흐름을 확인하세요
              </div>
            ) : (
              logs.map((log, i) => (
                <div
                  key={i}
                  className={`px-2 py-1 rounded mb-0.5 animate-[logSlide_0.3s_ease] ${
                    log.startsWith("  →")
                      ? log.includes("HIT")
                        ? "text-accent-green"
                        : log.includes("MISS")
                          ? "text-accent-magenta"
                          : "text-accent-amber"
                      : log.startsWith("  ")
                        ? "text-text-muted"
                        : "text-accent-cyan"
                  }`}
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
