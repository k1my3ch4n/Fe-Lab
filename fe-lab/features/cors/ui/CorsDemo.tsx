"use client";

import { useState, useCallback, useRef } from "react";
import { CORS_SCENARIOS, TABS } from "../model/constants";
import { TabBar, DemoLayout, RightPanel, ActionButton } from "@shared/ui";
import { StepRow, BrowserServerBox } from "./components";

export default function CorsDemo() {
  const [activeScenario, setActiveScenario] = useState(0);
  const [currentStep, setCurrentStep] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scenario = CORS_SCENARIOS[activeScenario];

  const resetDemo = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    setCurrentStep(-1);
    setIsPlaying(false);
  }, []);

  const handleScenarioChange = (index: number) => {
    resetDemo();
    setActiveScenario(index);
  };

  const playSteps = useCallback(() => {
    resetDemo();
    setIsPlaying(true);
    const steps = CORS_SCENARIOS[activeScenario].steps;

    steps.forEach((_, i) => {
      const timer = setTimeout(
        () => {
          setCurrentStep(i);
          if (i === steps.length - 1) {
            setIsPlaying(false);
          }
        },
        (i + 1) * 1200,
      );
      if (i === 0) timerRef.current = timer;
    });
  }, [activeScenario, resetDemo]);

  const stepForward = () => {
    if (currentStep < scenario.steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
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
            label="제어"
            onReset={resetDemo}
            actions={
              <>
                <ActionButton
                  variant="cyan"
                  onClick={playSteps}
                  disabled={isPlaying}
                >
                  {isPlaying ? "재생 중..." : "▶ 전체 재생"}
                </ActionButton>
                <ActionButton
                  variant="amber"
                  onClick={stepForward}
                  disabled={
                    isPlaying || currentStep >= scenario.steps.length - 1
                  }
                >
                  다음 단계 →
                </ActionButton>
              </>
            }
          >
            {/* Current step detail */}
            <div className="flex-1 overflow-y-auto p-3 font-[family-name:var(--font-mono)] text-[11px] leading-relaxed">
              {currentStep === -1 ? (
                <div className="text-text-muted text-center px-4 py-8 text-xs leading-[1.8]">
                  버튼을 클릭하여
                  <br />
                  CORS 요청 흐름을
                  <br />
                  단계별로 확인하세요
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <div className="text-accent-cyan font-semibold text-[12px]">
                    {scenario.steps[currentStep].label}
                  </div>
                  <div className="text-text-secondary text-[11px] leading-[1.8]">
                    {scenario.steps[currentStep].description}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    {scenario.steps[currentStep].headers.map((h, j) => (
                      <div
                        key={j}
                        className="bg-bg-deep rounded px-2 py-1.5 animate-[logSlide_0.3s_ease]"
                      >
                        <span style={{ color: h.color }}>{h.name}</span>
                        <span className="text-text-muted">: </span>
                        <span className="text-text-primary text-[10px]">
                          {h.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </RightPanel>
        }
      >
        <BrowserServerBox
          currentStep={currentStep}
          totalSteps={scenario.steps.length}
        />

        {/* Step-by-step flow */}
        <div className="flex flex-col gap-3">
          {scenario.steps.map((step, i) => (
            <StepRow
              key={i}
              step={step}
              index={i}
              active={i <= currentStep}
              current={i === currentStep}
              isError={!scenario.success && i === scenario.steps.length - 1}
            />
          ))}
        </div>

        {/* Result */}
        {currentStep === scenario.steps.length - 1 && (
          <div
            className={`rounded-lg border p-3 text-center font-[family-name:var(--font-mono)] text-[12px] transition-all duration-300 animate-[logSlide_0.3s_ease] ${
              scenario.success
                ? "border-accent-green/40 bg-accent-green/10 text-accent-green"
                : "border-accent-magenta/40 bg-accent-magenta/10 text-accent-magenta"
            }`}
          >
            {scenario.success
              ? "✓ 요청 성공 — 브라우저가 응답을 수신했습니다"
              : "✕ CORS 에러 — 브라우저가 응답을 차단했습니다"}
          </div>
        )}

        {/* Summary */}
        <div className="font-[family-name:var(--font-mono)] text-[11px] text-text-muted bg-bg-deep rounded-lg p-3 leading-[1.8]">
          {scenario.summary}
        </div>
      </DemoLayout>
    </>
  );
}
