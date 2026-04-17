"use client";

import { useState, useCallback } from "react";
import {
  CACHE_SCENARIOS,
  TABS,
  STATUS_COLORS,
  ACTOR_CONFIG,
} from "../model/constants";
import type { CacheStatus } from "../model/types";
import { TabBar, DemoLayout, RightPanel, ActionButton } from "@shared/ui";

export default function HttpCacheDemo() {
  const [activeScenario, setActiveScenario] = useState(0);
  const [currentStep, setCurrentStep] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [logs, setLogs] = useState<{ text: string; color?: string }[]>([]);

  const scenario = CACHE_SCENARIOS[activeScenario];

  const addLog = useCallback((text: string, color?: string) => {
    setLogs((prev) => [...prev, { text, color }]);
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
        const newLogs = [...prev, { text: `[${actor.label}] ${step.label}` }];

        if (step.headers) {
          step.headers.forEach((h) => {
            newLogs.push({ text: `  ${h.key}: ${h.value}` });
          });
        }

        if (step.status) {
          newLogs.push({ text: `  → Cache ${step.status}` });
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
      <TabBar
        tabs={TABS}
        activeIndex={activeScenario}
        onTabChange={handleScenarioChange}
      />

      <DemoLayout
        rightPanel={
          <RightPanel
            onReset={handleReset}
            actions={
              <>
                <ActionButton
                  variant="cyan"
                  onClick={handlePlayAll}
                  disabled={isPlaying}
                >
                  {isPlaying ? "재생 중..." : "전체 재생"}
                </ActionButton>
                <ActionButton
                  variant="green"
                  onClick={handleNextStep}
                  disabled={isPlaying || currentStep >= scenario.steps.length - 1}
                >
                  다음 단계 →
                </ActionButton>
              </>
            }
          >
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
                <div className="text-text-muted text-center px-4 py-8 text-xs leading-[1.8] whitespace-pre-line">
                  {"버튼을 클릭하여\n캐시 흐름을 확인하세요"}
                </div>
              ) : (
                logs.map((log, i) => (
                  <div
                    key={i}
                    className={`px-2 py-1 rounded mb-0.5 animate-[logSlide_0.3s_ease] ${
                      log.text.startsWith("  →")
                        ? log.text.includes("HIT")
                          ? "text-accent-green"
                          : log.text.includes("MISS")
                            ? "text-accent-magenta"
                            : "text-accent-amber"
                        : log.text.startsWith("  ")
                          ? "text-text-muted"
                          : "text-accent-cyan"
                    }`}
                  >
                    {log.text}
                  </div>
                ))
              )}
            </div>
          </RightPanel>
        }
      >
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
      </DemoLayout>
    </>
  );
}
