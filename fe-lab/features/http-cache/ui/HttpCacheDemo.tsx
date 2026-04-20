"use client";

import { useState, useCallback } from "react";
import { ACTOR_CONFIG, CACHE_SCENARIOS, TABS } from "../model/constants";
import { TabBar, DemoLayout, RightPanel, ActionButton } from "@shared/ui";
import { StatusLegend } from "./components/StatusLegend";
import { StepVisualization } from "./components/StepVisualization";

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
                  disabled={
                    isPlaying || currentStep >= scenario.steps.length - 1
                  }
                >
                  다음 단계 →
                </ActionButton>
              </>
            }
          >
            <StatusLegend />

            {/* Log */}
            <div className="flex-1 overflow-y-auto p-3 font-mono text-[11px] leading-relaxed">
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

        <StepVisualization steps={scenario.steps} currentStep={currentStep} />
      </DemoLayout>
    </>
  );
}
