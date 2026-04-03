"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { EVENT_LOOP_SCENARIOS } from "./constants";
import { LogPanel } from "@shared/ui";

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
      {/* Toolbar - custom layout with playback controls */}
      <div className="flex items-center justify-between border-b border-border-subtle bg-bg-elevated">
        <div className="flex items-center gap-0">
          {EVENT_LOOP_SCENARIOS.map((sc, i) => (
            <button
              key={sc.id}
              onClick={() => handleScenarioChange(i)}
              className={`font-[family-name:var(--font-mono)] text-[11px] px-4 py-3 border-b-2 transition-all duration-200 cursor-pointer ${
                i === activeScenario
                  ? "border-accent-cyan text-accent-cyan bg-bg-surface"
                  : "border-transparent text-text-muted hover:text-text-secondary"
              }`}
            >
              {sc.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1 pr-3">
          <button
            onClick={handlePrev}
            disabled={currentStep === 0}
            className="font-[family-name:var(--font-mono)] text-[10px] px-2.5 py-1.5 rounded cursor-pointer bg-transparent border-none text-text-muted transition-all duration-200 hover:text-text-primary hover:bg-bg-hover disabled:opacity-30 disabled:cursor-not-allowed"
          >
            ◀ 이전
          </button>
          <button
            onClick={handleAutoplay}
            className={`font-[family-name:var(--font-mono)] text-[10px] px-3 py-1.5 rounded cursor-pointer border transition-all duration-200 ${
              isPlaying
                ? "border-accent-magenta text-accent-magenta bg-accent-magenta-dim"
                : "border-accent-green text-accent-green bg-accent-green-dim hover:bg-[#00e67633]"
            }`}
          >
            {isPlaying ? "⏸ 정지" : "▶ 자동재생"}
          </button>
          <button
            onClick={handleNext}
            disabled={currentStep >= totalSteps - 1}
            className="font-[family-name:var(--font-mono)] text-[10px] px-2.5 py-1.5 rounded cursor-pointer bg-transparent border-none text-text-muted transition-all duration-200 hover:text-text-primary hover:bg-bg-hover disabled:opacity-30 disabled:cursor-not-allowed"
          >
            다음 ▶
          </button>
          <button
            onClick={handleReset}
            className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted cursor-pointer bg-transparent border-none px-2 py-1.5 rounded transition-all duration-200 hover:text-accent-magenta hover:bg-accent-magenta-dim"
          >
            리셋
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] lg:min-h-[520px]">
        {/* Left: Visualization */}
        <div className="p-6 flex flex-col gap-5">
          {/* Step indicator */}
          <div className="flex items-center gap-3">
            <span className="font-[family-name:var(--font-mono)] text-[10px] text-text-muted uppercase tracking-wider">
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
          <div className="font-[family-name:var(--font-mono)] text-[12px] text-text-secondary leading-[1.8] bg-bg-deep px-4 py-3 rounded-lg border border-border-subtle">
            {step.description}
          </div>

          {/* Three columns: Call Stack, Microtask Queue, Task Queue */}
          <div className="grid grid-cols-3 gap-4 flex-1">
            {/* Call Stack */}
            <div className="flex flex-col">
              <div className="font-[family-name:var(--font-mono)] text-[10px] font-semibold text-accent-cyan uppercase tracking-wider mb-3 text-center">
                Call Stack
              </div>
              <div className="flex-1 bg-bg-deep rounded-lg border border-[#00e5ff22] p-3 flex flex-col justify-end gap-1.5 min-h-[240px]">
                {step.callStack.length === 0 ? (
                  <div className="text-center text-text-muted font-[family-name:var(--font-mono)] text-[10px] py-4 opacity-50">
                    (비어있음)
                  </div>
                ) : (
                  [...step.callStack].reverse().map((item, i) => (
                    <div
                      key={`${currentStep}-cs-${i}`}
                      className="font-[family-name:var(--font-mono)] text-[10px] px-3 py-2 rounded border text-center animate-[logSlide_0.3s_ease]"
                      style={{
                        color: item.color,
                        borderColor: `${item.color}44`,
                        background: `${item.color}12`,
                      }}
                    >
                      {item.label}
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Microtask Queue */}
            <div className="flex flex-col">
              <div className="font-[family-name:var(--font-mono)] text-[10px] font-semibold text-accent-violet uppercase tracking-wider mb-3 text-center">
                Microtask Queue
              </div>
              <div className="flex-1 bg-bg-deep rounded-lg border border-[#b388ff22] p-3 flex flex-col gap-1.5 min-h-[240px]">
                {step.microtaskQueue.length === 0 ? (
                  <div className="text-center text-text-muted font-[family-name:var(--font-mono)] text-[10px] py-4 opacity-50">
                    (비어있음)
                  </div>
                ) : (
                  step.microtaskQueue.map((item, i) => (
                    <div
                      key={`${currentStep}-mq-${i}`}
                      className="font-[family-name:var(--font-mono)] text-[10px] px-3 py-2 rounded border text-center animate-[logSlide_0.3s_ease]"
                      style={{
                        color: item.color,
                        borderColor: `${item.color}44`,
                        background: `${item.color}12`,
                      }}
                    >
                      {item.label}
                    </div>
                  ))
                )}
              </div>
              <div className="font-[family-name:var(--font-mono)] text-[9px] text-text-muted text-center mt-1.5">
                Promise.then, queueMicrotask
              </div>
            </div>

            {/* Task Queue */}
            <div className="flex flex-col">
              <div className="font-[family-name:var(--font-mono)] text-[10px] font-semibold text-accent-amber uppercase tracking-wider mb-3 text-center">
                Task Queue
              </div>
              <div className="flex-1 bg-bg-deep rounded-lg border border-[#ffb80022] p-3 flex flex-col gap-1.5 min-h-[240px]">
                {step.taskQueue.length === 0 ? (
                  <div className="text-center text-text-muted font-[family-name:var(--font-mono)] text-[10px] py-4 opacity-50">
                    (비어있음)
                  </div>
                ) : (
                  step.taskQueue.map((item, i) => (
                    <div
                      key={`${currentStep}-tq-${i}`}
                      className="font-[family-name:var(--font-mono)] text-[10px] px-3 py-2 rounded border text-center animate-[logSlide_0.3s_ease]"
                      style={{
                        color: item.color,
                        borderColor: `${item.color}44`,
                        background: `${item.color}12`,
                      }}
                    >
                      {item.label}
                    </div>
                  ))
                )}
              </div>
              <div className="font-[family-name:var(--font-mono)] text-[9px] text-text-muted text-center mt-1.5">
                setTimeout, setInterval
              </div>
            </div>
          </div>
        </div>

        {/* Right: Code + Console */}
        <div className="border-l border-border-subtle flex flex-col">
          <div className="px-4 py-3 border-b border-border-subtle">
            <span className="font-[family-name:var(--font-mono)] text-[11px] font-semibold text-text-secondary uppercase tracking-wider">
              코드
            </span>
          </div>
          <pre className="font-[family-name:var(--font-mono)] text-[11px] text-accent-cyan leading-[1.8] p-4 overflow-x-auto flex-shrink-0 border-b border-border-subtle bg-bg-deep">
            {scenario.code}
          </pre>

          <div className="px-4 py-3 border-b border-border-subtle flex items-center justify-between">
            <span className="font-[family-name:var(--font-mono)] text-[11px] font-semibold text-text-secondary uppercase tracking-wider">
              Console
            </span>
            <span className="font-[family-name:var(--font-mono)] text-[9px] text-text-muted">
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
