"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { EVENT_LOOP_SCENARIOS } from "../model/constants";
import { LogPanel } from "@shared/ui";
import { EventLoopToolbar, QueueColumn } from "./components";

export default function EventLoopDemo() {
  const [activeScenario, setActiveScenario] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const scenario = EVENT_LOOP_SCENARIOS[activeScenario];
  const step = scenario.steps[currentStep];
  const totalSteps = scenario.steps.length;

  const stopAutoplay = useCallback(() => {
    setIsPlaying(false);

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const handleScenarioChange = (index: number) => {
    stopAutoplay();
    setActiveScenario(index);
    setCurrentStep(0);
  };

  const handlePrev = () => {
    stopAutoplay();
    setCurrentStep((s) => Math.max(0, s - 1));
  };

  const handleNext = () => {
    stopAutoplay();
    setCurrentStep((s) => Math.min(totalSteps - 1, s + 1));
  };

  const handleReset = () => {
    stopAutoplay();
    setCurrentStep(0);
  };

  const handleAutoplay = () => {
    if (isPlaying) {
      stopAutoplay();
      return;
    }
    if (currentStep >= totalSteps - 1) {
      setCurrentStep(0);
    }
    setIsPlaying(true);
  };

  useEffect(() => {
    if (!isPlaying) return;

    intervalRef.current = setInterval(() => {
      setCurrentStep((s) => {
        if (s >= totalSteps - 1) {
          stopAutoplay();
          return s;
        }
        return s + 1;
      });
    }, 1200);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, totalSteps, stopAutoplay]);

  const consoleLogs = step.console.map((line) => ({
    text: `> ${line}`,
    color: "#00e676",
  }));

  return (
    <>
      <EventLoopToolbar
        scenarios={EVENT_LOOP_SCENARIOS}
        activeScenario={activeScenario}
        currentStep={currentStep}
        totalSteps={totalSteps}
        isPlaying={isPlaying}
        onScenarioChange={handleScenarioChange}
        onPrev={handlePrev}
        onNext={handleNext}
        onAutoplay={handleAutoplay}
        onReset={handleReset}
      />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] lg:min-h-[520px]">
        {/* Left: Visualization */}
        <div className="p-6 flex flex-col gap-5">
          {/* Step indicator */}
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] text-text-muted uppercase tracking-wider">
              Step {currentStep + 1} / {totalSteps}
            </span>
            <div className="flex-1 h-1 bg-bg-deep rounded-full overflow-hidden">
              <div
                className="h-full bg-accent-cyan rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
              />
            </div>
          </div>

          {/* Description */}
          <div className="font-mono text-[12px] text-text-secondary leading-[1.8] bg-bg-deep px-4 py-3 rounded-lg border border-border-subtle">
            {step.description}
          </div>

          <div className="grid grid-cols-3 gap-4 flex-1">
            <QueueColumn
              title="Call Stack"
              items={[...step.callStack].reverse()}
              borderColor="#00e5ff"
              stepKey={`${currentStep}-cs`}
              justify="end"
            />
            <QueueColumn
              title="Microtask Queue"
              items={step.microtaskQueue}
              borderColor="#b388ff"
              stepKey={`${currentStep}-mq`}
              hint="Promise.then, queueMicrotask"
            />
            <QueueColumn
              title="Task Queue"
              items={step.taskQueue}
              borderColor="#ffb800"
              stepKey={`${currentStep}-tq`}
              hint="setTimeout, setInterval"
            />
          </div>
        </div>

        {/* Right: Code + Console */}
        <div className="border-l border-border-subtle flex flex-col">
          <div className="px-4 py-3 border-b border-border-subtle">
            <span className="font-mono text-[11px] font-semibold text-text-secondary uppercase tracking-wider">
              코드
            </span>
          </div>
          <pre className="font-mono text-[11px] text-accent-cyan leading-[1.8] p-4 overflow-x-auto flex-shrink-0 border-b border-border-subtle bg-bg-deep">
            {scenario.code}
          </pre>

          <div className="px-4 py-3 border-b border-border-subtle flex items-center justify-between">
            <span className="font-mono text-[11px] font-semibold text-text-secondary uppercase tracking-wider">
              Console
            </span>
            <span className="font-mono text-[9px] text-text-muted">
              {step.console.length > 0 ? `${step.console.length}개 출력` : ""}
            </span>
          </div>
          <div className="flex-1 overflow-y-auto bg-bg-deep">
            <LogPanel
              logs={consoleLogs}
              emptyMessage={"단계를 진행하여\n실행 결과를 확인하세요"}
            />
          </div>
        </div>
      </div>
    </>
  );
}
